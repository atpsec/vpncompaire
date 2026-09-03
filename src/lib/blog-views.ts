import { createHmac, randomBytes } from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { env } from "@/env";
import { hasKvRest, kvRestCommand } from "@/lib/kv-rest";
import { clientIpFrom } from "@/lib/rate-limit";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LENGTH = 160;
const SEEN_TTL_SECONDS = 48 * 60 * 60;
const LOCAL_SEEN_MAX_ENTRIES = 20_000;
const PERSISTED_SEEN_MAX_ENTRIES = 20_000;
const MAX_PERSISTED_STORE_BYTES = 5 * 1024 * 1024;
const processSecret = randomBytes(32).toString("hex");
const blogContentDirectory = path.join(process.cwd(), "src", "content", "blog", "en");
const blogViewTotalKey = "blog:views:total";
const blogViewTotalInitializedKey = "blog:views:total:initialized";
const persistentStorePath = env.BLOG_VIEW_STORE_PATH
  ? path.isAbsolute(env.BLOG_VIEW_STORE_PATH)
    ? env.BLOG_VIEW_STORE_PATH
    : path.join(/* turbopackIgnore: true */ process.cwd(), env.BLOG_VIEW_STORE_PATH)
  : path.join(process.cwd(), ".runtime", "blog-views.json");

type BlogViewResult = {
  views: number;
  durable: boolean;
};

const localCounts = new Map<string, number>();
const localSeen = new Map<string, number>();
let persistentStoreQueue: Promise<unknown> = Promise.resolve();

type PersistedBlogViews = {
  counts: Record<string, number>;
  seen: Record<string, number>;
};

function emptyPersistedStore(): PersistedBlogViews {
  return { counts: {}, seen: {} };
}

function withPersistentStore<T>(task: () => Promise<T>): Promise<T> {
  const next = persistentStoreQueue.then(
    () => task(),
    () => task(),
  );
  persistentStoreQueue = next.then(() => undefined, () => undefined);
  return next;
}

function sanitizePersistedStore(value: unknown): PersistedBlogViews {
  if (!value || typeof value !== "object") return emptyPersistedStore();

  const candidate = value as { counts?: unknown; seen?: unknown };
  const counts: Record<string, number> = {};
  const seen: Record<string, number> = {};

  if (candidate.counts && typeof candidate.counts === "object") {
    for (const [slug, count] of Object.entries(candidate.counts)) {
      if (isValidBlogSlug(slug)) counts[slug] = parseCount(count);
    }
  }

  if (candidate.seen && typeof candidate.seen === "object") {
    for (const [key, expiresAt] of Object.entries(candidate.seen)) {
      const numericExpiry = Number(expiresAt);
      if (Number.isSafeInteger(numericExpiry) && numericExpiry > 0) {
        seen[key] = numericExpiry;
      }
    }
  }

  return { counts, seen };
}

async function readPersistedStore(): Promise<PersistedBlogViews> {
  try {
    const stats = await fsPromises.stat(persistentStorePath);
    if (stats.size > MAX_PERSISTED_STORE_BYTES) {
      throw new Error("blog view store is larger than the safety limit");
    }
    const raw = await fsPromises.readFile(persistentStorePath, "utf8");
    return sanitizePersistedStore(JSON.parse(raw));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return emptyPersistedStore();
    }
    throw error;
  }
}

function prunePersistedStore(store: PersistedBlogViews, now: number): boolean {
  let changed = false;

  for (const [key, expiresAt] of Object.entries(store.seen)) {
    if (expiresAt <= now) {
      delete store.seen[key];
      changed = true;
    }
  }

  const seenEntries = Object.entries(store.seen);
  if (seenEntries.length > PERSISTED_SEEN_MAX_ENTRIES) {
    seenEntries
      .sort(([, leftExpiry], [, rightExpiry]) => rightExpiry - leftExpiry)
      .slice(PERSISTED_SEEN_MAX_ENTRIES)
      .forEach(([key]) => delete store.seen[key]);
    changed = true;
  }

  return changed;
}

async function writePersistedStore(store: PersistedBlogViews): Promise<void> {
  const directory = path.dirname(persistentStorePath);
  const temporaryPath = `${persistentStorePath}.${process.pid}.${Date.now()}.tmp`;

  await fsPromises.mkdir(directory, { recursive: true, mode: 0o700 });
  try {
    await fsPromises.writeFile(
      temporaryPath,
      JSON.stringify(store),
      { encoding: "utf8", mode: 0o600 },
    );
    await fsPromises.rename(temporaryPath, persistentStorePath);
  } finally {
    await fsPromises.unlink(temporaryPath).catch(() => undefined);
  }
}

async function getPersistedBlogViewCount(slug: string): Promise<BlogViewResult> {
  return withPersistentStore(async () => {
    const store = await readPersistedStore();
    if (prunePersistedStore(store, Date.now())) await writePersistedStore(store);
    const views = parseCount(store.counts[slug]);
    localCounts.set(slug, views);
    return { views, durable: true };
  });
}

async function getPersistedBlogViewTotal(): Promise<BlogViewResult> {
  return withPersistentStore(async () => {
    const store = await readPersistedStore();
    if (prunePersistedStore(store, Date.now())) await writePersistedStore(store);
    const views = Object.values(store.counts).reduce(
      (total, count) => total + parseCount(count),
      0,
    );
    return { views, durable: true };
  });
}

async function recordPersistedBlogView(
  slug: string,
  readerToken: string,
): Promise<BlogViewResult> {
  return withPersistentStore(async () => {
    const store = await readPersistedStore();
    const now = Date.now();
    const changedByPrune = prunePersistedStore(store, now);
    const seenKey = `${slug}:${readerToken}`;
    const seenUntil = store.seen[seenKey] ?? 0;

    if (seenUntil <= now) {
      store.seen[seenKey] = now + SEEN_TTL_SECONDS * 1000;
      store.counts[slug] = parseCount(store.counts[slug]) + 1;
    }

    if (changedByPrune || seenUntil <= now) await writePersistedStore(store);

    const views = parseCount(store.counts[slug]);
    localCounts.set(slug, views);
    return { views, durable: true };
  });
}

export function isValidBlogSlug(slug: string): boolean {
  return slug.length <= MAX_SLUG_LENGTH && SLUG_PATTERN.test(slug);
}

export function blogSlugExists(slug: string): boolean {
  if (!isValidBlogSlug(slug)) return false;
  return fs.existsSync(path.join(blogContentDirectory, `${slug}.mdx`));
}

function getBlogViewSlugs(): string[] {
  try {
    return fs
      .readdirSync(blogContentDirectory)
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => filename.slice(0, -4))
      .filter(isValidBlogSlug);
  } catch {
    return [];
  }
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

  try {
    return await getPersistedBlogViewCount(slug);
  } catch {
    // A read-only or unavailable filesystem must not break the article page.
  }

  return { views: localCounts.get(slug) ?? 0, durable: false };
}

async function getKvBlogViewTotal(): Promise<number> {
  const slugs = getBlogViewSlugs();
  if (slugs.length === 0) return 0;

  const chunks = Array.from({ length: Math.ceil(slugs.length / 50) }, (_, index) =>
    slugs.slice(index * 50, index * 50 + 50),
  );
  const values = await Promise.all(
    chunks.map((chunk) =>
      kvRestCommand(["mget", ...chunk.map((slug) => `blog:views:${slug}`)]),
    ),
  );

  return values.reduce<number>((total, result) => {
    if (!Array.isArray(result)) return total;
    return total + result.reduce((chunkTotal, value) => chunkTotal + parseCount(value), 0);
  }, 0);
}

async function ensureKvBlogViewTotalInitialized(): Promise<void> {
  const initialized = await kvRestCommand(["get", blogViewTotalInitializedKey]);
  if (initialized !== null) return;

  const views = await getKvBlogViewTotal();
  await kvRestCommand(["set", blogViewTotalKey, String(views), "nx"]);
  await kvRestCommand(["set", blogViewTotalInitializedKey, "1", "nx"]);
}

export async function getTotalBlogViewCount(): Promise<BlogViewResult> {
  if (hasKvRest()) {
    try {
      const initialized = await kvRestCommand(["get", blogViewTotalInitializedKey]);
      if (initialized !== null) {
        const current = await kvRestCommand(["get", blogViewTotalKey]);
        return { views: parseCount(current), durable: true };
      }

      // Older deployments only stored per-article keys. Backfill the aggregate
      // once from those keys, without overwriting a concurrent new increment.
      const views = await getKvBlogViewTotal();
      await kvRestCommand(["set", blogViewTotalKey, String(views), "nx"]);
      await kvRestCommand(["set", blogViewTotalInitializedKey, "1", "nx"]);
      const current = await kvRestCommand(["get", blogViewTotalKey]);
      return { views: parseCount(current ?? views), durable: true };
    } catch {
      // Keep the blog index available during a short KV outage.
    }
  }

  try {
    return await getPersistedBlogViewTotal();
  } catch {
    // Fall through to the bounded process-local counter if disk is unavailable.
  }

  const views = Array.from(localCounts.values()).reduce(
    (total, count) => total + parseCount(count),
    0,
  );
  return { views, durable: false };
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
      if (claimed === "OK") {
        // Initialize from historical per-article keys before the first new
        // increment so the aggregate never starts below the existing total.
        await ensureKvBlogViewTotalInitialized().catch(() => undefined);
      }
      const value = claimed === "OK"
        ? await kvRestCommand(["incr", `blog:views:${slug}`])
        : await kvRestCommand(["get", `blog:views:${slug}`]);
      if (claimed === "OK") {
        // A transient total-key failure must not make us count the article twice.
        await kvRestCommand(["incr", blogViewTotalKey]).catch(() => undefined);
      }
      const views = parseCount(value);
      localCounts.set(slug, views);
      return { views, durable: true };
    } catch {
      // Fall through to the bounded process-local counter.
    }
  }

  try {
    return await recordPersistedBlogView(slug, readerToken);
  } catch {
    // Fall through to the bounded process-local counter if disk persistence is unavailable.
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
