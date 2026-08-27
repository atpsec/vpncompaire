import { env } from "@/env";

/**
 * Distributed fixed-window rate limiter backed by an Upstash-compatible Redis
 * REST API. Dependency-free — talks to the Redis REST endpoint via `fetch`, so
 * it works in both the Node.js and Edge runtimes.
 *
 * Credentials (`KV_REST_API_URL` / `KV_REST_API_TOKEN`) can be set as Hostinger
 * environment variables. When they are absent (local dev, or the store is not
 * provisioned yet), a bounded in-memory fallback protects the current process.
 *
 * Fails over to the same bounded local limiter on any network/KV error: an
 * outage must never block real users, while a missing store must not leave
 * public diagnostics and redirects completely unprotected.
 */

export type RateLimitResult = {
  /** True if the request is within the limit. */
  allowed: boolean;
  /** True when KV credentials are present and the check actually ran. */
  configured: boolean;
};

const localRateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();

function localRateLimit(
  key: string,
  max: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();

  if (localRateLimitMap.size > 10_000) {
    for (const [entryKey, entry] of localRateLimitMap) {
      if (entry.resetTime <= now) localRateLimitMap.delete(entryKey);
    }
  }

  const existing = localRateLimitMap.get(key);
  if (!existing || existing.resetTime <= now) {
    localRateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowSeconds * 1000,
    });
    return { allowed: true, configured: false };
  }

  existing.count += 1;
  return { allowed: existing.count <= max, configured: false };
}

async function kv(command: string[]): Promise<number | null> {
  const url = env.KV_REST_API_URL;
  const token = env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const path = command.map((c) => encodeURIComponent(c)).join("/");
  const res = await fetch(`${url.replace(/\/$/, "")}/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV ${command[0]} ${res.status}`);
  const data = (await res.json()) as { result?: number };
  return data.result ?? null;
}

/**
 * Increment a per-key counter and report whether it is within `max` hits per
 * `windowSeconds`. Window starts on the first hit (EXPIRE set once, NX-style).
 */
export async function rateLimit(
  key: string,
  max: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  if (!env.KV_REST_API_URL || !env.KV_REST_API_TOKEN) {
    return localRateLimit(key, max, windowSeconds);
  }

  const redisKey = `rl:${key}`;
  try {
    const count = await kv(["incr", redisKey]);
    if (count === null) return localRateLimit(key, max, windowSeconds);
    // Set the TTL only on the first hit so the window doesn't slide forward.
    if (count === 1) {
      await kv(["expire", redisKey, String(windowSeconds)]);
    }
    return { allowed: count <= max, configured: true };
  } catch {
    // Keep users unblocked during a store outage while retaining local abuse
    // protection for this process.
    const fallback = localRateLimit(key, max, windowSeconds);
    return { ...fallback, configured: true };
  }
}

/** Best-effort client IP from standard proxy headers. */
export function clientIpFrom(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
