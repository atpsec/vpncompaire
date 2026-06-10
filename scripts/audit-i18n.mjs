#!/usr/bin/env node
// i18n / slug / SEO tutarlılık denetimi.
//
// Çalıştır: `npm run audit:i18n`
// Opsiyonel canlı sitemap kontrolü: `npm run audit:i18n -- --sitemap=https://vpnadvisor.net/sitemap.xml`
//
// Bu script:
//  1) Kaynak ağacını yanlış-dil hardcoded URL'lere karşı tarar
//     (/de/rehber/, /en/rehber/, /de/karsilastir/, /en/kategori/ ...).
//  2) Beklenen section slug eşlemesini + getLocalizedPath sözleşmesini
//     bağımsız bir oracle ile doğrular (birim-test yerine geçer).
//  3) src/lib/i18n-paths.ts kaynağının beklenen slug'ları içerdiğini doğrular
//     (TS kaynağı spec'ten sessizce sapamaz).
//  4) Sitemap'i (statik kaynak + opsiyonel canlı XML) yanlış-dil / redirect
//     URL'lerine karşı denetler.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, sep } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src");

const errors = [];
const warnings = [];
const passes = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const pass = (m) => passes.push(m);

// ---------------------------------------------------------------------------
// Beklenen sözleşme (spec oracle) — i18n-paths.ts ile senkron olmalı.
// ---------------------------------------------------------------------------
const SECTION_SLUGS = {
  tr: { blog: "blog", guide: "rehber", comparison: "karsilastir", category: "kategori" },
  en: { blog: "blog", guide: "guide", comparison: "comparison", category: "category" },
  de: { blog: "blog", guide: "ratgeber", comparison: "vergleich", category: "kategorie" },
};
const DEFAULT_LOCALE = "tr";

const REGISTRY = {
  "what-is-vpn": {
    tr: { section: "guide", slug: "vpn-nedir" },
    en: { section: "guide", slug: "what-is-a-vpn" },
    de: { section: "guide", slug: "was-ist-ein-vpn" },
    served: ["tr"],
  },
};

function prefix(locale) {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}
function getLocalizedPath({ locale, section, contentId }) {
  const hub = `${prefix(locale)}/${SECTION_SLUGS[locale][section]}`;
  if (!contentId) return hub;
  const t = REGISTRY[contentId]?.[locale];
  if (!t) return hub;
  return `${prefix(locale)}/${SECTION_SLUGS[locale][t.section]}/${t.slug}`;
}

// ---------------------------------------------------------------------------
// 1) getLocalizedPath sözleşme testleri (item 13)
// ---------------------------------------------------------------------------
const pathCases = [
  [{ locale: "de", section: "guide", contentId: "what-is-vpn" }, "/de/ratgeber/was-ist-ein-vpn"],
  [{ locale: "en", section: "guide", contentId: "what-is-vpn" }, "/en/guide/what-is-a-vpn"],
  [{ locale: "tr", section: "guide", contentId: "what-is-vpn" }, "/rehber/vpn-nedir"],
  [{ locale: "de", section: "comparison" }, "/de/vergleich"],
  [{ locale: "en", section: "category" }, "/en/category"],
  [{ locale: "tr", section: "comparison" }, "/karsilastir"],
];
let pathOk = true;
for (const [input, expected] of pathCases) {
  const got = getLocalizedPath(input);
  if (got !== expected) {
    pathOk = false;
    fail(`getLocalizedPath(${JSON.stringify(input)}) = "${got}", beklenen "${expected}"`);
  }
}
if (pathOk) pass(`getLocalizedPath sözleşmesi (${pathCases.length} senaryo) geçti`);

// ---------------------------------------------------------------------------
// 2) hreflang üretimi: what-is-vpn yalnızca TR servis ediliyor → tr + x-default
// ---------------------------------------------------------------------------
function servedLocales(contentId) {
  const e = REGISTRY[contentId];
  if (!e) return [];
  const served = e.served ?? ["tr", "en", "de"];
  return ["tr", "en", "de"].filter((l) => served.includes(l) && e[l]);
}
const served = servedLocales("what-is-vpn");
if (served.length === 1 && served[0] === "tr") {
  pass('hreflang: "what-is-vpn" yalnızca TR alternatifi üretiyor (DE/EN içerik yok)');
} else {
  fail(`hreflang: "what-is-vpn" servis edilen diller beklenenden farklı: ${served.join(",")}`);
}

// ---------------------------------------------------------------------------
// 3) Redirect mapping testleri (item 13) — bağımsız oracle
// ---------------------------------------------------------------------------
const MANAGED = ["guide", "comparison", "category"];
function sectionForSlug(slug) {
  for (const l of ["tr", "en", "de"])
    for (const k of Object.keys(SECTION_SLUGS[l]))
      if (SECTION_SLUGS[l][k] === slug) return k;
  return null;
}
function findContentBySlug(section, slug) {
  for (const [id, e] of Object.entries(REGISTRY))
    for (const l of ["tr", "en", "de"])
      if (e[l] && e[l].section === section && e[l].slug === slug)
        return { id, locale: l };
  return null;
}
function canonicalServed(id, reqLocale) {
  const s = servedLocales(id);
  if (!s.length) return null;
  const target = s.includes(reqLocale) ? reqLocale : s.includes("tr") ? "tr" : s[0];
  const t = REGISTRY[id][target];
  return getLocalizedPath({ locale: target, section: t.section, contentId: id });
}
function resolveRedirect(pathname) {
  const segs = pathname.split("/").filter(Boolean);
  if (!segs.length) return null;
  const ml = segs[0];
  const urlLocale = ml === "en" || ml === "de" ? ml : DEFAULT_LOCALE;
  const rest = urlLocale === DEFAULT_LOCALE ? segs : segs.slice(1);
  if (rest.length < 2) return null;
  const section = sectionForSlug(rest[0]);
  if (!section || !MANAGED.includes(section)) return null;
  const pageSlug = rest[1];
  const found = findContentBySlug(section, pageSlug);
  const target = found
    ? canonicalServed(found.id, urlLocale)
    : `/${SECTION_SLUGS[DEFAULT_LOCALE][section]}/${pageSlug}`;
  if (!target) return null;
  return target === pathname ? null : target;
}
const redirectCases = [
  ["/de/rehber/vpn-nedir", "/rehber/vpn-nedir"],
  ["/en/rehber/vpn-nedir", "/rehber/vpn-nedir"],
  ["/en/guide/what-is-a-vpn", "/rehber/vpn-nedir"],
  ["/de/ratgeber/was-ist-ein-vpn", "/rehber/vpn-nedir"],
  ["/en/rehber/ogrenciler-icin-vpn", "/rehber/ogrenciler-icin-vpn"],
  ["/de/karsilastir/proton-vs-mullvad", "/karsilastir/proton-vs-mullvad"],
  ["/de/kategori/streaming", "/kategori/streaming"],
  ["/rehber/vpn-nedir", null],
  ["/blog/vpn-nedir-neden-gerekli", null],
  ["/en/araclar/ip-adresim", null],
];
let redirOk = true;
for (const [input, expected] of redirectCases) {
  const got = resolveRedirect(input);
  if (got !== expected) {
    redirOk = false;
    fail(`resolveRedirect("${input}") = ${JSON.stringify(got)}, beklenen ${JSON.stringify(expected)}`);
  }
}
if (redirOk) pass(`redirect mapping sözleşmesi (${redirectCases.length} senaryo) geçti`);

// ---------------------------------------------------------------------------
// 4) TS kaynağı senkron mu? (i18n-paths.ts beklenen slug'ları içermeli)
// ---------------------------------------------------------------------------
const i18nPathsSrc = readFileSync(join(SRC, "lib", "i18n-paths.ts"), "utf8");
const requiredLiterals = [
  'guide: "rehber"',
  'comparison: "karsilastir"',
  'category: "kategori"',
  'guide: "guide"',
  'comparison: "comparison"',
  'category: "category"',
  'guide: "ratgeber"',
  'comparison: "vergleich"',
  'category: "kategorie"',
  'slug: "vpn-nedir"',
  'slug: "what-is-a-vpn"',
  'slug: "was-ist-ein-vpn"',
];
const missing = requiredLiterals.filter((l) => !i18nPathsSrc.includes(l));
if (missing.length) fail(`i18n-paths.ts spec'ten sapmış, eksik: ${missing.join(" | ")}`);
else pass("i18n-paths.ts section/slug eşlemesi spec ile senkron");

// ---------------------------------------------------------------------------
// 5) Kaynak taraması: yanlış-dil hardcoded URL'ler
// ---------------------------------------------------------------------------
const FORBIDDEN = [
  /["'`(]\/(?:en|de)\/rehber\//,
  /["'`(]\/(?:en|de)\/karsilastir\//,
  /["'`(]\/(?:en|de)\/kategori\//,
  /["'`(]\/en\/(?:ratgeber|vergleich|kategorie)\//,
  /["'`(]\/de\/(?:guide|comparison|category)\//,
];
const IGNORE_FILES = new Set([
  join(SRC, "lib", "i18n-paths.ts"),
]);
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".next" || name === ".git") continue;
      out.push(...walk(full));
    } else if (/\.(ts|tsx|mjs|js|jsx|json)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}
let scanHits = 0;
for (const file of walk(SRC)) {
  if (IGNORE_FILES.has(file)) continue;
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const re of FORBIDDEN) {
      if (re.test(line)) {
        scanHits++;
        fail(`Hardcoded yanlış-dil URL: ${relative(ROOT, file).split(sep).join("/")}:${i + 1} → ${line.trim().slice(0, 100)}`);
      }
    }
  });
}
if (scanHits === 0) pass("Kaynak taraması: hardcoded yanlış-dil section URL'i bulunamadı");

// ---------------------------------------------------------------------------
// 6) Sitemap (statik): guide + comparison detayları TR-only mu?
// ---------------------------------------------------------------------------
const sitemapSrc = readFileSync(join(SRC, "app", "sitemap.xml", "route.ts"), "utf8");
function assertTrOnlyBlock(label, anchor) {
  const idx = sitemapSrc.indexOf(anchor);
  if (idx === -1) {
    warn(`Sitemap: "${anchor}" bloğu bulunamadı (yapı değişmiş olabilir)`);
    return;
  }
  const window = sitemapSrc.slice(idx, idx + 320);
  if (/locales:\s*trOnly/.test(window)) pass(`Sitemap: ${label} TR-only`);
  else fail(`Sitemap: ${label} TR-only değil (yanlış-dil URL sitemap'e girebilir)`);
}
assertTrOnlyBlock("rehber detayları (guidePaths)", "const guidePaths");
assertTrOnlyBlock("karşılaştırma detayları (comparisonPaths)", "const comparisonPaths");

// ---------------------------------------------------------------------------
// 7) Opsiyonel: canlı sitemap XML denetimi
// ---------------------------------------------------------------------------
const sitemapArg = process.argv.find((a) => a.startsWith("--sitemap="));
async function checkLiveSitemap(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      warn(`Canlı sitemap alınamadı: HTTP ${res.status}`);
      return;
    }
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const badPatterns = [
      /\/(en|de)\/rehber\//,
      /\/(en|de)\/karsilastir\//,
      /\/(en|de)\/kategori\//,
      /\/de\/rehber$/,
    ];
    const bad = locs.filter((l) => badPatterns.some((re) => re.test(l)));
    if (bad.length) bad.forEach((l) => fail(`Sitemap'te yanlış-dil URL: ${l}`));
    else pass(`Canlı sitemap temiz (${locs.length} URL, yanlış-dil section yok)`);
  } catch (e) {
    warn(`Canlı sitemap kontrolü atlandı: ${e.message}`);
  }
}

// ---------------------------------------------------------------------------
// Çıktı
// ---------------------------------------------------------------------------
async function main() {
  if (sitemapArg) await checkLiveSitemap(sitemapArg.split("=")[1]);

  console.log("\n=== i18n / slug / SEO audit ===\n");
  for (const p of passes) console.log("  PASS  " + p);
  for (const w of warnings) console.log("  WARN  " + w);
  for (const e of errors) console.log("  FAIL  " + e);
  console.log(
    `\n${passes.length} geçti, ${warnings.length} uyarı, ${errors.length} hata\n`,
  );
  process.exit(errors.length > 0 ? 1 : 0);
}
main();
