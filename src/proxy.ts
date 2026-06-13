import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import {
  resolveLocalizedRedirect,
  resolveInternalRewrite,
} from "@/lib/i18n-paths";
import { countryCodeFromHeaders } from "@/lib/request-geo";

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 yıl

/**
 * Visitor locale preference for small route-specific decisions.
 * Public canonical pages are not geo-redirected; / and /blog stay Turkish.
 */
function preferredLocale(request: NextRequest): "tr" | "en" | "de" {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie === "tr" || cookie === "en" || cookie === "de") return cookie;

  const country = countryCodeFromHeaders(request.headers);
  if (!country || country === "TR") return "tr";
  if (country === "DE" || country === "AT" || country === "CH") return "de";
  return "en";
}

// Simple in-memory rate limiter (production'da Redis/Vercel KV önerilir)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit config
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute per IP

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old entries (simple memory management)
  if (rateLimitMap.size > 10000) {
    const cutoff = now - RATE_LIMIT_WINDOW * 2;
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < cutoff) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return false;
  }

  // Increment counter
  record.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  // Vercel provides x-forwarded-for and x-real-ip
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

// localeDetection is disabled in routing.ts. Public locale URLs are explicit:
// /, /blog, /en, /en/blog, /de, /de/blog.
const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // i18n slug/locale tutarlılığı: yanlış-dil section/slug kullanan detay
  // URL'lerini (örn. /de/rehber/vpn-nedir, /en/guide/what-is-a-vpn) içeriğin
  // gerçek dilindeki kanonik URL'ye 301 yönlendir. Karar registry üzerinden
  // verilir (bkz. src/lib/i18n-paths.ts). Sorgu parametreleri korunur.
  const redirectTarget = resolveLocalizedRedirect(pathname);
  if (redirectTarget) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTarget;
    return NextResponse.redirect(url, 301);
  }

  // Yerelleştirilmiş slug'ları (örn. /en/guide/what-is-a-vpn, /de/vergleich) iç
  // Türkçe-slug route'una rewrite et. URL değişmez; doğru locale içeriği
  // [locale] segmentinden gelir. (bkz. src/lib/i18n-paths.ts)
  // next-intl middleware'i bypass edildiği için locale header'ı
  // (X-NEXT-INTL-LOCALE) elle kurulur — root layout'taki getLocale() ve
  // <html lang> bunu okur.
  const rewriteTarget = resolveInternalRewrite(pathname);
  if (rewriteTarget) {
    const url = request.nextUrl.clone();
    url.pathname = rewriteTarget;
    // rewriteTarget yalnızca en/de prefix'li üretilir (bkz. i18n-paths.ts).
    const locale = rewriteTarget.split("/")[1];
    const headers = new Headers(request.headers);
    headers.set("X-NEXT-INTL-LOCALE", locale);
    return NextResponse.rewrite(url, { request: { headers } });
  }

  // Apply rate limiting to sensitive routes
  const shouldRateLimit =
    pathname.startsWith("/go/") ||
    pathname.includes("/blog/");

  if (shouldRateLimit) {
    const ip = getClientIp(request);
    const allowed = rateLimit(ip);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        }
      );
    }
  }

  // Public locale URLs are explicit now:
  // / and /blog are Turkish, /en and /en/blog are English, /de and /de/blog are German.
  // Do not geo-redirect unprefixed canonical URLs; otherwise /blog can become /en/blog
  // for users with an English cookie or a non-TR country header.

  // The default-locale public diagnostic route is intentionally unprefixed
  // (/vpn-test). Let the real app/vpn-test route handle it directly.
  if (pathname === "/vpn-test" && preferredLocale(request) === "tr") {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, "tr", {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    return res;
  }

  // Continue with next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|go|og|robots\\.txt|sitemap\\.xml|llms\\.txt|ads\\.txt|favicon\\.ico|favicon\\.svg|apple-touch-icon\\.svg|icon|apple-icon|.*\\..*).*)",
  ],
};
