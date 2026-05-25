#!/usr/bin/env node
// Best-effort weekly pricing drift check.
// Fetches each VPN pricing URL, attempts to extract a "from" price via regex,
// compares against the stored priceFromUsd, and writes a report. Returns
// non-zero exit if URLs are broken, data is older than STALE_DAYS, or the
// extracted price diverges from the stored price by more than DRIFT_PCT.
//
// Regex extraction is intentionally simple. False positives are expected —
// the report is meant to trigger a human review, not auto-update prices.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const PRODUCTS_PATH = join(REPO_ROOT, "src/data/products.ts");
const REPORT_PATH = join(REPO_ROOT, ".pricing-report.md");

const STALE_DAYS = 30;
const DRIFT_PCT = 0.15;
const TIMEOUT_MS = 15_000;
const UA =
  "Mozilla/5.0 (vpncompaire pricing audit; +https://vpncompaire.vercel.app)";

const text = readFileSync(PRODUCTS_PATH, "utf8");

const verifiedDefaultMatch = text.match(/const VERIFIED = "([^"]+)"/);
const verifiedDefault = verifiedDefaultMatch ? verifiedDefaultMatch[1] : null;

const blocks = text.split(/\n\s*\{\s*\n?\s*slug:/).slice(1);
const products = blocks
  .map((b) => {
    const get = (re) => (b.match(re) || [])[1];
    const slug = get(/^\s*"([^"]+)"/);
    if (!slug) return null;
    const brand = get(/brand:\s*"([^"]+)"/);
    const priceFromUsd = parseFloat(get(/priceFromUsd:\s*([\d.]+)/) || "0");
    const pricingUrl = get(/pricingUrl:\s*"([^"]+)"/);
    const verifiedRaw = get(/pricingVerifiedAt:\s*"([^"]+)"/);
    const usesDefault = /pricingVerifiedAt:\s*VERIFIED/.test(b);
    const verifiedAt = verifiedRaw ?? (usesDefault ? verifiedDefault : null);
    return { slug, brand, priceFromUsd, pricingUrl, verifiedAt };
  })
  .filter(Boolean);

if (products.length === 0) {
  console.error("No products parsed from products.ts");
  process.exit(2);
}

const PRICE_RE = /\$\s*(\d{1,2}(?:[.,]\d{1,2})?)\s*(?:USD|\/)?(?:mo|month|\s*\/\s*ay)?/gi;

async function check(p) {
  const out = {
    slug: p.slug,
    brand: p.brand,
    storedPrice: p.priceFromUsd,
    pricingUrl: p.pricingUrl,
    verifiedAt: p.verifiedAt,
    httpStatus: null,
    extractedPrice: null,
    daysSinceVerified: null,
    issues: [],
  };

  if (p.verifiedAt) {
    const days = (Date.now() - new Date(p.verifiedAt).getTime()) / 86_400_000;
    out.daysSinceVerified = Math.round(days);
    if (days > STALE_DAYS)
      out.issues.push(`stale: ${out.daysSinceVerified}d since verified`);
  } else {
    out.issues.push("no verification date");
  }

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(p.pricingUrl, {
      redirect: "follow",
      headers: { "User-Agent": UA, Accept: "text/html" },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    out.httpStatus = res.status;
    if (!res.ok) {
      out.issues.push(`http ${res.status}`);
      return out;
    }
    const html = await res.text();
    const candidates = [...html.matchAll(PRICE_RE)]
      .map((m) => parseFloat(m[1].replace(",", ".")))
      .filter((n) => n >= 1 && n <= 30);
    if (candidates.length) {
      out.extractedPrice = Math.min(...candidates);
      const diff = Math.abs(out.extractedPrice - p.priceFromUsd) / p.priceFromUsd;
      if (diff > DRIFT_PCT) {
        out.issues.push(
          `drift: stored $${p.priceFromUsd} vs extracted $${out.extractedPrice} (${Math.round(diff * 100)}%)`,
        );
      }
    } else {
      out.issues.push("no price extracted");
    }
  } catch (e) {
    out.issues.push(`fetch error: ${e.message || e}`);
  }
  return out;
}

const results = await Promise.all(products.map(check));

const lines = [
  `# VPN pricing audit · ${new Date().toISOString().slice(0, 10)}`,
  "",
  "| VPN | Stored | Extracted | HTTP | Verified | Issues |",
  "|---|---:|---:|---:|---|---|",
];
for (const r of results) {
  const issues = r.issues.length ? r.issues.join("; ") : "—";
  lines.push(
    `| ${r.brand} | $${r.storedPrice.toFixed(2)} | ${r.extractedPrice ? "$" + r.extractedPrice.toFixed(2) : "—"} | ${r.httpStatus ?? "—"} | ${r.verifiedAt ?? "—"} | ${issues} |`,
  );
}
lines.push("", "## Pricing URLs (for manual review)", "");
for (const r of results) {
  lines.push(`- **${r.brand}** — ${r.pricingUrl}`);
}
lines.push(
  "",
  `Drift threshold: ${Math.round(DRIFT_PCT * 100)}% · Stale threshold: ${STALE_DAYS}d`,
  "",
  "_Regex extraction is best-effort. Always verify manually before updating prices in `src/data/products.ts`._",
);

writeFileSync(REPORT_PATH, lines.join("\n"));

const flagged = results.filter((r) => r.issues.length);
console.log(lines.join("\n"));

if (flagged.length) {
  console.error(`\n${flagged.length} product(s) flagged — see .pricing-report.md`);
  process.exit(1);
}
console.log("\nAll prices verified within thresholds.");
