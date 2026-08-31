#!/usr/bin/env node
// Weekly source-link health check.
// It validates the official provider, evidence and editorial-reference URLs
// that support user-facing claims. Bot-protected and rate-limited responses
// are reported for manual review; confirmed 404/410 responses fail the audit.

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..");
const reportPath = join(repoRoot, ".link-health-report.md");
const timeoutMs = 15_000;
const concurrency = 8;

const sourceFiles = [
  "src/data/products.ts",
  "src/data/provider-evidence.ts",
  "src/data/blog-references.ts",
  "src/data/editorial-watch.ts",
  "src/data/comparison-products.ts",
];

const urlPattern = /https?:\/\/[^\s"'\x60<>{}\\]+/g;
const sourceByUrl = new Map();
const invalid = [];

function normalizeCandidate(candidate) {
  return candidate
    .replaceAll("&amp;", "&")
    .replace(/[),.;\]]+$/, "");
}

for (const relativePath of sourceFiles) {
  const source = await readFile(join(repoRoot, relativePath), "utf8");
  for (const match of source.matchAll(urlPattern)) {
    const candidate = normalizeCandidate(match[0]);
    try {
      const url = new URL(candidate);
      if (url.protocol !== "https:" && url.protocol !== "http:") continue;
      const sources = sourceByUrl.get(url.href) ?? new Set();
      sources.add(relativePath);
      sourceByUrl.set(url.href, sources);
    } catch {
      invalid.push({ url: candidate, source: relativePath });
    }
  }
}

async function request(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VPNAdvisor-LinkAudit/1.0; +https://vpnadvisor.net)",
        Accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
        ...(method === "GET" ? { Range: "bytes=0-1023" } : {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function check(url) {
  try {
    let response;
    try {
      response = await request(url, "HEAD");
    } catch {
      response = await request(url, "GET");
    }
    if (response.status === 405 || response.status === 501) {
      response = await request(url, "GET");
    }

    const status = response.status;
    const finalUrl = response.url || url;
    if (status >= 200 && status < 400) {
      return { url, finalUrl, status, result: "ok" };
    }
    if (status === 404 || status === 410) {
      return { url, finalUrl, status, result: "broken" };
    }
    if (status === 401 || status === 403 || status === 429 || status === 451) {
      return { url, finalUrl, status, result: "manual review" };
    }
    return { url, finalUrl, status, result: "temporary/server response" };
  } catch (error) {
    return {
      url,
      finalUrl: url,
      status: "—",
      result: "fetch warning",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

async function mapConcurrent(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function consume() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, consume));
  return results;
}

const urls = [...sourceByUrl.keys()].sort();
const results = await mapConcurrent(urls, check);
const broken = results.filter((item) => item.result === "broken");
const warnings = results.filter((item) => item.result !== "ok" && item.result !== "broken");

const lines = [
  "# VPN Advisor source-link health · " + new Date().toISOString().slice(0, 10),
  "",
  "Checked " + urls.length + " unique URLs from provider, evidence and editorial registries.",
  "",
  "| Status | Result | URL | Source |",
  "|---:|---|---|---|",
];

for (const item of results) {
  const sources = [...(sourceByUrl.get(item.url) ?? [])].join(", ");
  const detail = item.detail ? " — " + item.detail.replaceAll("|", "\\|") : "";
  lines.push(
    "| " + item.status + " | " + item.result + detail + " | " + item.url + " | " + sources + " |",
  );
}

if (invalid.length > 0) {
  lines.push("", "## Invalid URL literals", "");
  for (const item of invalid) lines.push("- " + item.url + " — " + item.source);
}

lines.push(
  "",
  "Confirmed 404/410: " + broken.length,
  "",
  "Manual/temporary warnings: " + warnings.length,
  "",
  "_Bot protection, authentication and rate limits are warnings, not automatic proof that a reader-facing link is broken._",
);

await writeFile(reportPath, lines.join("\n") + "\n", "utf8");
console.log(lines.join("\n"));

if (broken.length > 0 || invalid.length > 0) {
  console.error("\nConfirmed broken or invalid source links found.");
  process.exitCode = 1;
}
