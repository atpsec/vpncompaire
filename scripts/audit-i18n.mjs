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

// i18n-paths.ts CONTENT_REGISTRY ile senkron olmalı (bağımsız oracle kopyası).
const G = "guide";
const C = "comparison";
// İçerik/routing üç dilde çalışmaya devam eder. SEO keşfi ve hreflang ise
// Almanca editoryal karantinadayken yalnızca TR + EN ile sınırlıdır.
const CONTENT_LOCALES = ["tr", "en", "de"];
const SEO_LOCALES = ["tr", "en"];
const ALL = CONTENT_LOCALES;
const REGISTRY = {
  "what-is-vpn": {
    tr: { section: G, slug: "vpn-nedir" },
    en: { section: G, slug: "what-is-a-vpn" },
    de: { section: G, slug: "was-ist-ein-vpn" },
    served: ALL,
  },
  "free-vs-paid-vpn": {
    tr: { section: G, slug: "ucretsiz-vs-ucretli-vpn" },
    en: { section: G, slug: "free-vs-paid-vpn" },
    de: { section: G, slug: "kostenloses-vs-kostenpflichtiges-vpn" },
    served: ALL,
  },
  "vpn-security-checklist": {
    tr: { section: G, slug: "vpn-guvenlik-kontrol-listesi" },
    en: { section: G, slug: "vpn-security-checklist" },
    de: { section: G, slug: "vpn-sicherheits-checkliste" },
    served: ALL,
  },
  "is-vpn-legal-in-turkey": {
    tr: { section: G, slug: "turkiye-de-vpn-yasal-mi" },
    en: { section: G, slug: "is-vpn-legal-in-turkey" },
    de: { section: G, slug: "ist-vpn-in-der-tuerkei-legal" },
    served: ALL,
  },
  "vpn-for-students": {
    tr: { section: G, slug: "ogrenciler-icin-vpn" },
    en: { section: G, slug: "vpn-for-students" },
    de: { section: G, slug: "vpn-fuer-studenten" },
    served: ALL,
  },
  "vpn-for-turks-abroad": {
    tr: { section: G, slug: "yurt-disindaki-turkler-icin-vpn" },
    en: { section: G, slug: "vpn-for-turks-abroad" },
    de: { section: G, slug: "vpn-fuer-tuerken-im-ausland" },
    served: ALL,
  },
  "vpn-for-families": {
    tr: { section: G, slug: "aile-ve-cocuklar-icin-vpn" },
    en: { section: G, slug: "vpn-for-families" },
    de: { section: G, slug: "vpn-fuer-familien" },
    served: ALL,
  },
  "vpn-for-remote-workers": {
    tr: { section: G, slug: "uzaktan-calisanlar-icin-vpn" },
    en: { section: G, slug: "vpn-for-remote-workers" },
    de: { section: G, slug: "vpn-fuer-remote-arbeit" },
    served: ALL,
  },
  "vpn-for-seniors": {
    tr: { section: G, slug: "yaslilar-icin-vpn" },
    en: { section: G, slug: "vpn-for-seniors" },
    de: { section: G, slug: "vpn-fuer-senioren" },
    served: ALL,
  },
  "vpn-for-gamers": {
    tr: { section: G, slug: "gamerlar-icin-vpn" },
    en: { section: G, slug: "vpn-for-gamers" },
    de: { section: G, slug: "vpn-fuer-gamer" },
    served: ALL,
  },
  "nordvpn-vs-surfshark": {
    tr: { section: C, slug: "nordvpn-vs-surfshark" },
    en: { section: C, slug: "nordvpn-vs-surfshark" },
    de: { section: C, slug: "nordvpn-vs-surfshark" },
    served: ALL,
  },
  "expressvpn-vs-nordvpn": {
    tr: { section: C, slug: "expressvpn-vs-nordvpn" },
    en: { section: C, slug: "expressvpn-vs-nordvpn" },
    de: { section: C, slug: "expressvpn-vs-nordvpn" },
    served: ALL,
  },
  "proton-vs-mullvad": {
    tr: { section: C, slug: "proton-vs-mullvad" },
    en: { section: C, slug: "proton-vs-mullvad" },
    de: { section: C, slug: "proton-vs-mullvad" },
    served: ALL,
  },
};

// Hub'ların lokalize servis edildiği diller (i18n-paths.ts SECTION_HUB_SERVED
// ile senkron olmalı).
const HUB_SERVED = {
  guide: ["tr", "en", "de"],
  comparison: ["tr", "en", "de"],
};

// Section modeli dışındaki TR-only tekil sayfalar (i18n-paths.ts
// TR_ONLY_EXACT_PATHS ile senkron olmalı).
const TR_ONLY_EXACT = new Set([
  "en-iyi/turkiye",
  "en-iyi/yurt-disindaki-turkler",
]);

function resolveDuplicateLocaleRedirect(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];
  if (!locale || !CONTENT_LOCALES.includes(locale) || segments[1] !== locale) {
    return null;
  }
  const rest = segments.slice(2).join("/");
  if (locale === DEFAULT_LOCALE) return rest ? `/${rest}` : "/";
  return rest ? `/${locale}/${rest}` : `/${locale}`;
}

const duplicateLocaleCases = [
  ["/de/de/sana-uygun-vpn", "/de/sana-uygun-vpn"],
  ["/en/en/hesaplayici", "/en/hesaplayici"],
  ["/tr/tr/blog", "/blog"],
  ["/de/ratgeber/was-ist-ein-vpn", null],
];
let duplicateLocaleOk = true;
for (const [input, expected] of duplicateLocaleCases) {
  const got = resolveDuplicateLocaleRedirect(input);
  if (got !== expected) {
    duplicateLocaleOk = false;
    fail(`duplicate locale redirect "${input}" = ${JSON.stringify(got)}, beklenen ${JSON.stringify(expected)}`);
  }
}
if (duplicateLocaleOk) pass(`Çift locale URL temizleme (${duplicateLocaleCases.length} senaryo) geçti`);

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
// 2) İçerik/routing kapsamı ile indexlenebilir hreflang kapsamını ayrı doğrula.
//    DE rotaları çalışır, fakat noindex karantinasındayken hreflang'e girmez.
// ---------------------------------------------------------------------------
function servedLocales(contentId) {
  const e = REGISTRY[contentId];
  if (!e) return [];
  const served = e.served ?? CONTENT_LOCALES;
  return CONTENT_LOCALES.filter((l) => served.includes(l) && e[l]);
}
function seoServedLocales(contentId) {
  const served = servedLocales(contentId);
  return SEO_LOCALES.filter((locale) => served.includes(locale));
}
const contentServed = servedLocales("what-is-vpn");
if (contentServed.join(",") === "tr,en,de") {
  pass('İçerik/routing: "what-is-vpn" TR, EN ve DE dillerinde servis ediliyor');
} else {
  fail(`İçerik/routing: "what-is-vpn" servis edilen diller beklenenden farklı: ${contentServed.join(",")}`);
}
const seoServed = seoServedLocales("what-is-vpn");
if (seoServed.join(",") === "tr,en") {
  pass('SEO/hreflang: "what-is-vpn" yalnız TR + EN; DE noindex karantinasında');
} else {
  fail(`SEO/hreflang: "what-is-vpn" indexlenebilir dilleri beklenenden farklı: ${seoServed.join(",")}`);
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
  if (!rest.length) return null;
  if (urlLocale !== DEFAULT_LOCALE && TR_ONLY_EXACT.has(rest.join("/"))) {
    return `/${rest.join("/")}`;
  }
  const section = sectionForSlug(rest[0]);
  if (!section || !MANAGED.includes(section)) return null;
  // Hub: localized hub slug'ına kanonikleştir (yalnızca hub-served diller).
  if (rest.length === 1) {
    const hubLocales = HUB_SERVED[section];
    if (!hubLocales || !hubLocales.includes(urlLocale)) return null;
    const target = `${prefix(urlLocale)}/${SECTION_SLUGS[urlLocale][section]}`;
    return target === pathname ? null : target;
  }
  const pageSlug = rest[1];
  const found = findContentBySlug(section, pageSlug);
  const target = found
    ? canonicalServed(found.id, urlLocale)
    : `/${SECTION_SLUGS[DEFAULT_LOCALE][section]}/${pageSlug}`;
  if (!target) return null;
  return target === pathname ? null : target;
}
const redirectCases = [
  // Tüm rehber/karşılaştırma detayları 3 dilde servis ediliyor → eski yanlış
  // URL'ler dilin KENDİ lokalize URL'sine 301'lenir.
  ["/de/rehber/vpn-nedir", "/de/ratgeber/was-ist-ein-vpn"],
  ["/en/rehber/vpn-nedir", "/en/guide/what-is-a-vpn"],
  ["/en/guide/what-is-a-vpn", null],
  ["/de/ratgeber/was-ist-ein-vpn", null],
  ["/en/rehber/ogrenciler-icin-vpn", "/en/guide/vpn-for-students"],
  ["/de/rehber/gamerlar-icin-vpn", "/de/ratgeber/vpn-fuer-gamer"],
  ["/de/karsilastir/proton-vs-mullvad", "/de/vergleich/proton-vs-mullvad"],
  ["/en/karsilastir/nordvpn-vs-surfshark", "/en/comparison/nordvpn-vs-surfshark"],
  ["/en/comparison/nordvpn-vs-surfshark", null],
  // Kayıtlı olmayan slug → politika gereği TR kanonik.
  ["/de/kategori/streaming", "/kategori/streaming"],
  ["/en/guide/bilinmeyen-rehber", "/rehber/bilinmeyen-rehber"],
  // Hub kanonikleştirme (üç dil de hub-served).
  ["/en/rehber", "/en/guide"],
  ["/de/rehber", "/de/ratgeber"],
  ["/en/karsilastir", "/en/comparison"],
  ["/de/karsilastir", "/de/vergleich"],
  ["/rehber", null],
  ["/karsilastir", null],
  ["/rehber/vpn-nedir", null],
  ["/karsilastir/proton-vs-mullvad", null],
  // Section modeli dışındaki TR-only tekil sayfalar.
  ["/en/en-iyi/turkiye", "/en-iyi/turkiye"],
  ["/en/en-iyi/yurt-disindaki-turkler", "/en-iyi/yurt-disindaki-turkler"],
  ["/de/en-iyi/yurt-disindaki-turkler", "/en-iyi/yurt-disindaki-turkler"],
  ["/en-iyi/turkiye", null],
  ["/en/en-iyi/gizlilik", null], // lokalize use-case etkilenmez
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
// 3b) Rewrite mapping testleri — localized URL -> iç (TR-slug) route
// ---------------------------------------------------------------------------
function resolveRewrite(pathname) {
  const segs = pathname.split("/").filter(Boolean);
  if (!segs.length) return null;
  const ml = segs[0];
  const urlLocale = ml === "en" || ml === "de" ? ml : DEFAULT_LOCALE;
  const rest = urlLocale === DEFAULT_LOCALE ? segs : segs.slice(1);
  if (!rest.length || urlLocale === DEFAULT_LOCALE) return null;
  const section = sectionForSlug(rest[0]);
  if (!section || !MANAGED.includes(section)) return null;
  const trSection = SECTION_SLUGS[DEFAULT_LOCALE][section];
  if (rest.length === 1) {
    const hubLocales = HUB_SERVED[section];
    if (!hubLocales || !hubLocales.includes(urlLocale)) return null;
    if (rest[0] !== SECTION_SLUGS[urlLocale][section]) return null;
    return `/${urlLocale}/${trSection}`;
  }
  const found = findContentBySlug(section, rest[1]);
  if (!found) return null;
  if (!servedLocales(found.id).includes(urlLocale)) return null;
  const tr = REGISTRY[found.id][DEFAULT_LOCALE];
  if (!tr) return null;
  const target = `/${urlLocale}/${trSection}/${tr.slug}`;
  return target === pathname ? null : target;
}
const rewriteCases = [
  ["/en/guide/what-is-a-vpn", "/en/rehber/vpn-nedir"],
  ["/de/ratgeber/was-ist-ein-vpn", "/de/rehber/vpn-nedir"],
  ["/en/guide/vpn-for-students", "/en/rehber/ogrenciler-icin-vpn"],
  ["/de/ratgeber/vpn-fuer-gamer", "/de/rehber/gamerlar-icin-vpn"],
  ["/en/comparison/proton-vs-mullvad", "/en/karsilastir/proton-vs-mullvad"],
  ["/de/vergleich/nordvpn-vs-surfshark", "/de/karsilastir/nordvpn-vs-surfshark"],
  ["/en/guide", "/en/rehber"],
  ["/de/ratgeber", "/de/rehber"],
  ["/en/comparison", "/en/karsilastir"],
  ["/de/vergleich", "/de/karsilastir"],
  ["/rehber/vpn-nedir", null], // TR zaten iç route
  ["/en/rehber", null], // Türkçe slug rewrite edilmez (301'lenir)
  ["/en/araclar/ip-adresim", null],
];
let rwOk = true;
for (const [input, expected] of rewriteCases) {
  const got = resolveRewrite(input);
  if (got !== expected) {
    rwOk = false;
    fail(`resolveRewrite("${input}") = ${JSON.stringify(got)}, beklenen ${JSON.stringify(expected)}`);
  }
}
if (rwOk) pass(`rewrite mapping sözleşmesi (${rewriteCases.length} senaryo) geçti`);

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
  'slug: "free-vs-paid-vpn"',
  'slug: "kostenloses-vs-kostenpflichtiges-vpn"',
  'slug: "vpn-for-students"',
  'slug: "vpn-fuer-gamer"',
  'slug: "ist-vpn-in-der-tuerkei-legal"',
  'slug: "nordvpn-vs-surfshark"',
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
// 6) Sitemap (statik): detaylar registry-driven mı, statik TR-slug listeleri
//    kaldırıldı mı?
// ---------------------------------------------------------------------------
const sitemapSrc = readFileSync(join(SRC, "app", "sitemap.xml", "route.ts"), "utf8");
const siteSrc = readFileSync(join(SRC, "lib", "site.ts"), "utf8");
const localeLayoutSrc = readFileSync(join(SRC, "app", "[locale]", "layout.tsx"), "utf8");
if (/export const SEO_LOCALES\s*=\s*\[\s*"tr"\s*,\s*"en"\s*\]\s*as const/.test(siteSrc)) {
  pass("SEO locale politikası: yalnız TR + EN indexlenebilir");
} else {
  fail("SEO locale politikası: src/lib/site.ts içinde TR + EN SEO_LOCALES sözleşmesi bulunamadı");
}
if (/locale\s*!==\s*"de"/.test(localeLayoutSrc) && /index:\s*false/.test(localeLayoutSrc)) {
  pass("DE locale layout'u noindex karantinasını uyguluyor");
} else {
  fail("DE locale layout'unda noindex karantinası bulunamadı");
}
if (/const guidePaths|const comparisonPaths|const guideSlugs|const comparisonSlugs/.test(sitemapSrc)) {
  fail("Sitemap: statik guide/comparison listeleri hâlâ mevcut (registry-driven olmalı)");
} else if (sitemapSrc.includes("CONTENT_REGISTRY") && sitemapSrc.includes("SECTION_HUB_SERVED")) {
  pass("Sitemap: guide/comparison detayları + hub'lar registry-driven üretiliyor");
} else {
  fail("Sitemap: CONTENT_REGISTRY/SECTION_HUB_SERVED tabanlı üretim bulunamadı");
}
if (sitemapSrc.includes("SEO_LOCALES") && /const allLocales\s*=\s*SEO_LOCALES/.test(sitemapSrc)) {
  pass("Sitemap: yalnız SEO_LOCALES (TR + EN) URL'lerini yayımlıyor");
} else {
  fail("Sitemap: SEO_LOCALES tabanlı TR + EN filtresi bulunamadı");
}
if (/trOnlyUseCases/.test(sitemapSrc)) {
  pass("Sitemap: TR-only use-case sayfaları (turkiye, yurt-disindaki-turkler) TR-only");
} else {
  warn("Sitemap: trOnlyUseCases bloğu bulunamadı (yapı değişmiş olabilir)");
}

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
      // DE kullanıcılar için erişilebilir, fakat noindex karantinasındayken
      // sitemap/hreflang keşfine dahil edilmemeli.
      /\/de(?:\/|$)/,
      /\/(en|de)\/rehber\//,
      /\/(en|de)\/karsilastir\//,
      /\/(en|de)\/kategori\//,
      // Türkçe-slug hub URL'leri artık localized slug'a 301'leniyor → sitemap'te
      // olmamalı (yerine /en/guide, /en/comparison, /de/vergleich girer).
      /\/(en|de)\/rehber$/,
      /\/(en|de)\/karsilastir$/,
      // TR-only tekil use-case sayfalarının EN/DE varyantları 301'lenir.
      /\/(en|de)\/en-iyi\/(turkiye|yurt-disindaki-turkler)$/,
    ];
    const bad = locs.filter((l) => badPatterns.some((re) => re.test(l)));
    if (bad.length) bad.forEach((l) => fail(`Sitemap'te yanlış-dil veya noindex URL: ${l}`));
    else pass(`Canlı sitemap temiz (${locs.length} URL, yanlış-dil/noindex URL yok)`);
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
  // Let fetch keep-alive handles close naturally on Windows. A hard
  // process.exit() can trip a libuv assertion after a successful live audit.
  process.exitCode = errors.length > 0 ? 1 : 0;
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
