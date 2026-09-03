import { NextResponse, type NextRequest } from "next/server";
import { getBlogViewAuditSnapshot } from "@/lib/blog-views";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RESPONSE_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Accept",
  "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
  "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  "Cross-Origin-Resource-Policy": "cross-origin",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  Vary: "Accept",
};

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: RESPONSE_HEADERS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: RESPONSE_HEADERS });
}

export async function GET(request: NextRequest) {
  const limiter = await rateLimit(
    `blog-readership-audit:${clientIpFrom(request.headers)}`,
    60,
    60,
  );
  if (!limiter.allowed) return errorResponse("rate_limited", 429);

  try {
    const snapshot = await getBlogViewAuditSnapshot();
    return NextResponse.json(snapshot, { headers: RESPONSE_HEADERS });
  } catch {
    return errorResponse("audit_snapshot_unavailable", 503);
  }
}
