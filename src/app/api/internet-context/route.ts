import { NextResponse, type NextRequest } from "next/server";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";
import { resolveRequestGeo } from "@/lib/request-geo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
  "Content-Security-Policy": "default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  Vary: "Sec-Fetch-Site",
};

function rateLimitResponse() {
  return NextResponse.json(
    { error: "rate_limited" },
    {
      status: 429,
      headers: { ...NO_STORE_HEADERS, "Retry-After": "60" },
    },
  );
}

export async function GET(request: NextRequest) {
  // Same-origin browser fetches send this signal. Reject cross-site requests
  // early while still allowing privacy-focused browsers that omit the header.
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json(
      { error: "same_origin_only" },
      { status: 403, headers: NO_STORE_HEADERS },
    );
  }

  const clientIp = clientIpFrom(request.headers);
  const [globalLimit, clientLimit] = await Promise.all([
    rateLimit("internet-context:global", 300, 60),
    rateLimit(`internet-context:${clientIp}`, 20, 60),
  ]);

  if (!globalLimit.allowed || !clientLimit.allowed) return rateLimitResponse();

  const geo = await resolveRequestGeo(request.headers, { enrichDetails: true });
  return NextResponse.json(geo, { headers: NO_STORE_HEADERS });
}
