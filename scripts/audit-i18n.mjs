#!/usr/bin/env node
// English-only routing, canonical URL and indexing audit.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)));
const SRC = join(ROOT, "src");
const errors = [];
const warnings = [];
const passes = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);
const pass = (message) => passes.push(message);

const source = (file) => readFileSync(join(ROOT, file), "utf8");

if (
  source("src/i18n/routing.ts").includes('locales: ["en"]') &&
  source("src/i18n/routing.ts").includes('defaultLocale: "en"')
) {
  pass("Runtime routing supports English only");
} else {
  fail("Runtime routing exposes a non-English locale");
}

const messageFiles = readdirSync(join(ROOT, "messages")).filter((file) => file.endsWith(".json"));
if (messageFiles.length === 1 && messageFiles[0] === "en.json") {
  pass("Only the English message catalog remains");
} else {
  fail(`Non-English message catalogs remain: ${messageFiles.join(", ")}`);
}

const blogContentRoot = join(SRC, "content", "blog");
const blogLocales = readdirSync(blogContentRoot).filter((name) => {
  const localePath = join(blogContentRoot, name);
  return statSync(localePath).isDirectory() &&
    readdirSync(localePath).some((file) => file.endsWith(".mdx"));
});
if (blogLocales.length === 1 && blogLocales[0] === "en") {
  pass("Only the English blog collection remains");
} else {
  fail(`Non-English blog collections remain: ${blogLocales.join(", ")}`);
}

if (source("src/lib/site.ts").includes('SEO_LOCALES = ["en"]')) {
  pass("Only English is included in SEO locale discovery");
} else {
  fail("SEO_LOCALES is not restricted to English");
}

if (source("src/app/[locale]/layout.tsx").includes('rawLocale !== "en"')) {
  pass("Non-English locale pages are rejected at the layout boundary");
} else {
  fail("Locale layout does not enforce English-only rendering");
}

const sitemap = source("src/app/sitemap.xml/route.ts");
if (sitemap.includes('getIndexableBlogPosts("en")') && sitemap.includes('"/ai"')) {
  pass("Sitemap contains English-only content and the AI hub");
} else {
  fail("Sitemap is missing English-only blog loading or AI hub coverage");
}

const forbiddenPublicRoots = [
  "/en-iyi",
  "/inceleme",
  "/karsilastir",
  "/rehber",
  "/cihazlar",
  "/araclar",
  "/metodoloji",
  "/hakkimizda",
  "/iptal-ve-iade",
  "/gizlilik",
  "/cerez-politikasi",
  "/sartlar",
  "/reklam-aciklamasi",
  "/yasal-uyari",
  "/sana-uygun-vpn",
];
const ignored = new Set([
  join(SRC, "lib", "i18n-paths.ts"),
  join(SRC, "proxy.ts"),
  join(SRC, "app", "[locale]", "rehber", "page.tsx"),
  join(SRC, "app", "[locale]", "rehber", "_body.tsx"),
]);

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      if (!new Set(["node_modules", ".next", ".git"]).has(name)) files.push(...walk(full));
    } else if (/\.(ts|tsx|mdx)$/.test(name)) {
      files.push(full);
    }
  }
  return files;
}

let legacyLinks = 0;
for (const file of walk(SRC)) {
  if (ignored.has(file)) continue;
  const text = readFileSync(file, "utf8");
  for (const root of forbiddenPublicRoots) {
    if (text.includes(`href="${root}`) || text.includes(`href={"${root}`)) {
      legacyLinks += 1;
      fail(`Legacy public link in ${relative(ROOT, file).split(sep).join("/")}: ${root}`);
    }
  }
}
if (legacyLinks === 0) pass("No legacy Turkish public links remain in rendered source");

const sitemapArg = process.argv.find((arg) => arg.startsWith("--sitemap="));
if (sitemapArg) {
  try {
    const response = await fetch(sitemapArg.slice("--sitemap=".length));
    if (!response.ok) {
      warn(`Live sitemap returned HTTP ${response.status}`);
    } else {
      const xml = await response.text();
      const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
      const bad = locs.filter((url) => /\/((tr|de|en)(\/|$)|en-iyi|inceleme|karsilastir|rehber|cihazlar|araclar)(\/|$)/.test(url));
      if (bad.length) bad.forEach((url) => fail(`Legacy URL in live sitemap: ${url}`));
      else pass(`Live sitemap is clean (${locs.length} URLs)`);
    }
  } catch (error) {
    warn(`Live sitemap check skipped: ${error.message}`);
  }
}

console.log("\n=== English-only routing / SEO audit ===\n");
for (const message of passes) console.log(`  PASS  ${message}`);
for (const message of warnings) console.log(`  WARN  ${message}`);
for (const message of errors) console.log(`  FAIL  ${message}`);
console.log(`\n${passes.length} passed, ${warnings.length} warnings, ${errors.length} errors\n`);
process.exitCode = errors.length ? 1 : 0;
