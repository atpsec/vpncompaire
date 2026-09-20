import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";
import { isCrossSiteRequest } from "@/lib/request-security";
import { recommendVpn } from "@/lib/typesafe-vpn-recommendation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};
const MAX_REQUEST_BODY_BYTES = 2_048;

const requestSchema = z
  .object({
    answers: z
      .object({
        priority: z.number().int().min(0).max(3),
        budget: z.number().int().min(0).max(3),
        devices: z.number().int().min(0).max(3),
        location: z.number().int().min(0).max(2),
        trust: z.number().int().min(0).max(3),
        ease: z.number().int().min(0).max(2),
      })
      .strict(),
  })
  .strict();

export async function POST(request: NextRequest) {
  if (isCrossSiteRequest(request)) {
    return NextResponse.json(
      { error: "same_origin_only" },
      { status: 403, headers: NO_STORE_HEADERS },
    );
  }

  const rateLimitResult = await rateLimit(
    `vpn-recommendation:${clientIpFrom(request.headers)}`,
    12,
    60,
  );
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: { ...NO_STORE_HEADERS, "Retry-After": "60" },
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BODY_BYTES) {
    return NextResponse.json(
      { error: "request_too_large" },
      { status: 413, headers: NO_STORE_HEADERS },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { error: "invalid_request" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BODY_BYTES) {
    return NextResponse.json(
      { error: "request_too_large" },
      { status: 413, headers: NO_STORE_HEADERS },
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json(
      { error: "invalid_json" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_answers" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const recommendation = await recommendVpn(parsed.data.answers);
  return NextResponse.json(
    {
      ...recommendation,
      matches: recommendation.matches.map(([slug, score]) => ({ slug, score })),
    },
    { headers: NO_STORE_HEADERS },
  );
}
