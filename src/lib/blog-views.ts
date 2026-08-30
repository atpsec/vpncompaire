import { createHmac, randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { env } from "@/env";
import { hasKvRest, kvRestCommand } from "@/lib/kv-rest";
import { clientIpFrom } from "@/lib/rate-limit";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LENGTH = 160;
const SEEN_TTL_SECONDS = 48 * 60 * 60;
const LOCAL_SEEN_MAX_ENTRIES = 20_000;
const processSecret = randomBytes(32).toString("hex");

type BlogViewResult = {
  views: number;
  durable: boolean;
};

const localCounts = new Map<string, number>();
const localSeen = new Map<string, number>();

export function isValidBlogSlug(slug: string): boolean {
  return slug.length <= MAX_SLUG_LENGTH && SLUG_PATTERN.test(slug);
}

export function blogSlugExists(slug: string): boolean {
  if (!isValidBlogSlug(slug)) return false;
  return fs.existsSync(path.join(process.cwd(), "src", "content", "blog", "en", `${slug}.mdx`));
}

function parseCount(value: unknown): number {
  const count = typeof value === "number" ? value : Number(value);
  return Number.isSafeInteger(count) && count >= 0 ? count : 0;
}

function pruneLocalSeen(now: number) {
  if (localSeen.size < LOCAL_SEEN_MAX_ENTRIES) return;

  for (const [key, expiresAt] of localSeen) {
    if (expiresAt <= now) localSeen.delete(key);
  }

  while (localSeen.size >= LOCAL_SEEN_MAX_ENTRIES) {
    const oldestKey = localSeen.keys().next().value;
    if (typeof oldestKey !== "string") break;
    localSeen.delete(oldestKey);
  }
}

/**
 * Daily pseudonymous reader token. Raw IP and browser headers are never
 * written to storage; they are HMACed with a server-only secret first.
 */
export function blogReaderToken(headers: Headers): string {
  const secret = env.KV_REST_API_TOKEN || processSecret;
  const day = new Date().toISOString().slice(0, 10);
  const input = [
    clientIpFrom(headers),
    headers.get("user-agent")?.slice(0, 256) ?? "unknown",
    headers.get("accept-language")?.slice(0, 128) ?? "unknown",
    day,
  ].join("|");

  return createHmac("sha256", secret).update(input).digest("hex").slice(0, 40);
}

export async function getBlogViewCount(slug: string): Promise<BlogViewResult> {
  if (hasKvRest()) {
    try {
      const value = await kvRestCommand(["get", `blog:views:${slug}`]);
      const views = parseCount(value);
      localCounts.set(slug, views);
      return { views, durable: true };
    } catch {
      // The process-local value keeps the UI available during a short KV outage.
    }
  }

  return { views: localCounts.get(slug) ?? 0, durable: false };
}

export async function recordBlogView(
  slug: string,
  readerToken: string,
): Promise<BlogViewResult> {
  const seenKey = `blog:views:seen:${slug}:${readerToken}`;

  if (hasKvRest()) {
    try {
      const claimed = await kvRestCommand([
        "set",
        seenKey,
        "1",
        "ex",
        String(SEEN_TTL_SECONDS),
        "nx",
      ]);
      const value = claimed === "OK"
        ? await kvRestCommand(["incr", `blog:views:${slug}`])
        : await kvRestCommand(["get", `blog:views:${slug}`]);
      const views = parseCount(value);
      localCounts.set(slug, views);
      return { views, durable: true };
    } catch {
      // Fall through to the bounded process-local counter.
    }
  }

  const now = Date.now();
  pruneLocalSeen(now);
  const localSeenKey = `${slug}:${readerToken}`;
  const seenUntil = localSeen.get(localSeenKey) ?? 0;
  if (seenUntil > now) {
    return { views: localCounts.get(slug) ?? 0, durable: false };
  }

  localSeen.set(localSeenKey, now + SEEN_TTL_SECONDS * 1000);
  const views = (localCounts.get(slug) ?? 0) + 1;
  localCounts.set(slug, views);
  return { views, durable: false };
}
