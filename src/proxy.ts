import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

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

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // Continue with next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|go|robots\\.txt|sitemap\\.xml|llms\\.txt|.*\\..*).*)",
  ],
};
