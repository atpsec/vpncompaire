import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Local in-memory fallback — only used when Vercel KV is NOT configured.
// NOTE: state resets on cold start and is per-instance; the KV-backed
// `rateLimit` above is the distributed primary.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 submissions / minute / IP

function rateLimitLocal(ip: string): boolean {
  const now = Date.now();

  if (rateLimitMap.size > 10000) {
    const cutoff = now - RATE_LIMIT_WINDOW * 2;
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < cutoff) rateLimitMap.delete(key);
    }
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

const BodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  // Honeypot: real users leave this empty. If filled, silently succeed.
  website: z.string().max(200).optional().default(""),
});

function isSameOrigin(request: NextRequest): boolean {
  const host = request.headers.get("host");
  if (!host) return false;
  // Prefer Origin; fall back to Referer. Reject when neither is present
  // (a missing Origin must NOT bypass the CSRF check).
  const candidate =
    request.headers.get("origin") ?? request.headers.get("referer");
  if (!candidate) return false;
  try {
    return new URL(candidate).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 },
    );
  }

  const ip = getClientIp(request);
  // Distributed limit (Vercel KV) first; fall back to the in-memory limiter
  // only when KV is not configured.
  const kv = await rateLimit(`nl:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW / 1000);
  const limited = kv.configured ? !kv.allowed : !rateLimitLocal(ip);
  if (limited) {
    return NextResponse.json(
      { success: false, message: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Invalid email" },
      { status: 400 },
    );
  }

  const { email, website } = parsed.data;

  // Honeypot tripped — pretend success so bots don't probe.
  if (website && website.length > 0) {
    return NextResponse.json({
      success: true,
      message: "ok",
    });
  }

  // No DB in this project — log only. Vercel function logs capture this.
  // PII: do NOT log the full email. Only the domain (non-identifying) is
  // recorded so logs can't leak subscriber addresses (GDPR data minimisation).
  const domain = email.split("@")[1] ?? "unknown";
  console.log(
    `[newsletter] signup domain=${domain} ip=${ip} ts=${new Date().toISOString()}`,
  );

  return NextResponse.json({
    success: true,
    message: "Subscribed",
  });
}
