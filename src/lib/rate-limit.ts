import { hasKvRest, kvRestCommand } from "@/lib/kv-rest";

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

function validIpv4(value: string): boolean {
  const octets = value.split(".");
  return (
    octets.length === 4 &&
    octets.every((octet) => {
      if (!/^\d{1,3}$/.test(octet)) return false;
      const number = Number(octet);
      return number >= 0 && number <= 255;
    })
  );
}

function validIpv6(value: string): boolean {
  if (!/^[0-9a-f:]+$/i.test(value)) return false;
  const sections = value.split("::");
  if (sections.length > 2) return false;
  const count = (section: string) => {
    if (!section) return 0;
    const groups = section.split(":");
    if (groups.some((group) => !/^[0-9a-f]{1,4}$/i.test(group))) return -1;
    return groups.length;
  };
  const used = count(sections[0]) + count(sections[1] ?? "");
  return used >= 0 && (sections.length === 2 ? used < 8 : used === 8);
}

/** Reject malformed forwarded-header values before they reach external APIs. */
export function isValidClientIp(value: string): boolean {
  const trimmed = value.trim().replace(/^\[|\]$/g, "");
  return validIpv4(trimmed) || validIpv6(trimmed);
}

const localRateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();
const LOCAL_RATE_LIMIT_MAX_ENTRIES = 10_000;

function fallbackFingerprint(value: string): string {
  // This is only a last-resort fallback for runtimes without Web Crypto. It
  // keeps raw IPs out of the process-local map while remaining deterministic.
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `f${(hash >>> 0).toString(16)}`;
}

async function fingerprint(value: string): Promise<string> {
  try {
    const digest = await globalThis.crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(value),
    );
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  } catch {
    return fallbackFingerprint(value);
  }
}

function localRateLimit(
  key: string,
  max: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();

  if (localRateLimitMap.size >= LOCAL_RATE_LIMIT_MAX_ENTRIES) {
    for (const [entryKey, entry] of localRateLimitMap) {
      if (entry.resetTime <= now) localRateLimitMap.delete(entryKey);
    }

    // Evict the oldest insertion when every entry is still active. This
    // guarantees attacker-controlled keys cannot grow memory without bound.
    while (localRateLimitMap.size >= LOCAL_RATE_LIMIT_MAX_ENTRIES) {
      const oldestKey = localRateLimitMap.keys().next().value;
      if (typeof oldestKey !== "string") break;
      localRateLimitMap.delete(oldestKey);
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

/**
 * Increment a per-key counter and report whether it is within `max` hits per
 * `windowSeconds`. Window starts on the first hit (EXPIRE set once, NX-style).
 */
export async function rateLimit(
  key: string,
  max: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const safeKey = await fingerprint(key);

  if (!hasKvRest()) {
    return localRateLimit(safeKey, max, windowSeconds);
  }

  const redisKey = `rl:${safeKey}`;
  try {
    const rawCount = await kvRestCommand(["incr", redisKey]);
    const count = typeof rawCount === "number" ? rawCount : Number(rawCount);
    if (!Number.isFinite(count)) return localRateLimit(safeKey, max, windowSeconds);
    // Set the TTL only on the first hit so the window doesn't slide forward.
    if (count === 1) {
      await kvRestCommand(["expire", redisKey, String(windowSeconds)]);
    }
    return { allowed: count <= max, configured: true };
  } catch {
    // Keep users unblocked during a store outage while retaining local abuse
    // protection for this process.
    const fallback = localRateLimit(safeKey, max, windowSeconds);
    return { ...fallback, configured: true };
  }
}

/** Best-effort client IP from standard proxy headers. */
export function clientIpFrom(headers: Headers): string {
  const candidates = [
    headers.get("cf-connecting-ip"),
    headers.get("x-real-ip"),
    headers.get("x-forwarded-for")?.split(",")[0],
  ];
  for (const candidate of candidates) {
    if (candidate && isValidClientIp(candidate)) return candidate.trim();
  }
  return "unknown";
}
