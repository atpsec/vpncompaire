import { NextResponse, type NextRequest } from "next/server";
import { getTotalBlogViewCount } from "@/lib/blog-views";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";
import { isCrossSiteRequest } from "@/lib/request-security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
  "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  Vary: "Sec-Fetch-Site, Origin",
};

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: RESPONSE_HEADERS });
}

export async function GET(request: NextRequest) {
  if (isCrossSiteRequest(request)) {
    return errorResponse("same_origin_only", 403);
  }

  const limiter = await rateLimit(
    `blog-views:total:read:${clientIpFrom(request.headers)}`,
    120,
    60,
  );
  if (!limiter.allowed) return errorResponse("rate_limited", 429);

  const result = await getTotalBlogViewCount();
  return NextResponse.json(result, { headers: RESPONSE_HEADERS });
}
