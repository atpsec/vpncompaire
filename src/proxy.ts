import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import {
  resolveDuplicateLocaleRedirect,
  resolveEnglishLegacyRedirect,
  resolveEnglishPublicRewrite,
  resolveLegacyLocaleRedirect,
  resolveLocalizedRedirect,
  resolveInternalRewrite,
} from "@/lib/i18n-paths";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";

// localeDetection is disabled in routing.ts. Public locale URLs are explicit:
// /, /blog, /en, /en/blog, /de, /de/blog.
const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The phone-like private-space demo is a standalone app route and does not
  // participate in the site's locale URL system.
  if (pathname === "/phone" || pathname.startsWith("/phone/")) {
    return NextResponse.next();
  }

  // The site is now English-only. Keep old Turkish and German URLs useful by
  // redirecting each path to its English equivalent before next-intl runs.
  const legacyLocaleTarget = resolveLegacyLocaleRedirect(pathname);
  if (legacyLocaleTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyLocaleTarget;
    return NextResponse.redirect(url, 301);
  }

  const englishPathTarget = resolveEnglishLegacyRedirect(pathname);
  if (englishPathTarget) {
    const url = request.nextUrl.clone();
    url.pathname = englishPathTarget;
    return NextResponse.redirect(url, 301);
  }

  // Eski dil değiştirici sürümünün ürettiği /de/de/... ve /en/en/...
  // bağlantılarını 404'e bırakma; tek locale önekiyle kanoniğe taşı.
  const duplicateLocaleTarget = resolveDuplicateLocaleRedirect(pathname);
  if (duplicateLocaleTarget) {
    const url = request.nextUrl.clone();
    url.pathname = duplicateLocaleTarget;
    return NextResponse.redirect(url, 301);
  }

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
  // (X-NEXT-INTL-LOCALE) elle kurulur; next-intl request yapılandırması bunu
  // okurken <html lang> doğrudan [locale] route parametresinden üretilir.
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

  const englishRewriteTarget = resolveEnglishPublicRewrite(pathname);
  if (englishRewriteTarget) {
    const url = request.nextUrl.clone();
    url.pathname = englishRewriteTarget;
    const headers = new Headers(request.headers);
    headers.set("X-NEXT-INTL-LOCALE", "en");
    return NextResponse.rewrite(url, { request: { headers } });
  }

  // Apply rate limiting to sensitive routes
  const shouldRateLimit = pathname.includes("/blog/");

  if (shouldRateLimit) {
    const limiter = await rateLimit(`page:${clientIpFrom(request.headers)}`, 120, 60);

    if (!limiter.allowed) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
            "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
            "Cross-Origin-Resource-Policy": "same-origin",
            "Referrer-Policy": "no-referrer",
            "Retry-After": "60",
            "X-Content-Type-Options": "nosniff",
            "X-Robots-Tag": "noindex, nofollow, noarchive",
            "X-RateLimit-Limit": "120",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil((Date.now() + 60_000) / 1000).toString(),
          },
        }
      );
    }
  }

  // Public locale URLs are explicit now:
  // / and /blog are Turkish, /en and /en/blog are English, /de and /de/blog are German.
  // Do not geo-redirect unprefixed canonical URLs; otherwise /blog can become /en/blog
  // for users with an English cookie or a non-TR country header.

  // Continue with next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|go|og|robots\\.txt|sitemap\\.xml|llms\\.txt|ads\\.txt|favicon\\.ico|favicon\\.svg|apple-touch-icon\\.svg|icon|apple-icon|.*\\..*).*)",
  ],
};
