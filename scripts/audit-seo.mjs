#!/usr/bin/env node
// Rendered SEO, sitemap and internal-link audit.
// Usage: npm run audit:seo -- --base=http://localhost:3000

const requestedBase = process.argv.find((arg) => arg.startsWith("--base="))?.slice(7);
const baseUrl = new URL(requestedBase || process.env.SEO_BASE_URL || "http://localhost:3000");
baseUrl.pathname = baseUrl.pathname.replace(/\/$/, "");

const errors = [];
const warnings = [];
const passes = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);
const pass = (message) => passes.push(message);

const timeoutMs = 20_000;
const concurrency = 8;
let requestCounter = 0;

function cleanUrl(value) {
  const url = new URL(value, baseUrl);
  url.hash = "";
  url.search = "";
  return url;
}

function mapSitemapUrlToAuditBase(value) {
  const source = new URL(value);
  const mapped = new URL(source.pathname + source.search, baseUrl);
  mapped.hash = "";
  return mapped.href;
}

function normalizeSitemapUrl(value, fallbackBase = baseUrl) {
  const url = new URL(decodeHtml(value.trim()), fallbackBase);
  url.hash = "";
  return url;
}

function isInternalHttpUrl(value) {
  try {
    const url = cleanUrl(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.origin === baseUrl.origin &&
      !url.pathname.startsWith("/_next/")
    );
  } catch {
    return false;
  }
}

function isExpectedInternalRedirect(value) {
  try {
    return cleanUrl(value).pathname.startsWith("/go/");
  } catch {
    return false;
  }
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

async function fetchPage(url) {
  const requestId = requestCounter++;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: {
        "User-Agent": "VPNAdvisor-SEO-Audit/1.0",
        // The local app rate-limits /blog by client IP. Give each audit
        // request an isolated synthetic IP so the audit measures routes,
        // metadata and links rather than the limiter itself.
        "X-Forwarded-For": `seo-audit-${requestId}`,
      },
    });
    return {
      status: response.status,
      location: response.headers.get("location"),
      contentType: response.headers.get("content-type") || "",
      xRobotsTag: response.headers.get("x-robots-tag") || "",
      body: await response.text(),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function mapConcurrent(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function consume() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      try {
        results[index] = await worker(items[index], index);
      } catch (error) {
        results[index] = { error };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, consume));
  return results;
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => match[1]);
}

function extractRobotsSitemaps(body) {
  return body
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*Sitemap\s*:\s*(\S+)\s*$/i)?.[1])
    .filter(Boolean);
}

function extractAttribute(tag, name) {
  for (const match of tag.matchAll(
    /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g,
  )) {
    if (match[1].toLowerCase() === name.toLowerCase()) {
      return decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
    }
  }
  return null;
}

function noindexDirective(value) {
  if (!value) return false;
  return value
    .toLowerCase()
    .split(/[\s,]+/)
    .some((directive) => directive === "noindex" || directive === "none");
}

function extractMetaRobots(html) {
  const values = [];
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const name = extractAttribute(match[0], "name");
    if (name?.toLowerCase() !== "robots") continue;
    const content = extractAttribute(match[0], "content");
    if (content) values.push(content);
  }
  return values;
}

function extractInternalLinks(html) {
  const links = new Set();
  for (const match of html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)) {
    const href = decodeHtml(match[1].trim());
    if (!href || href.startsWith("#") || href.startsWith("//")) continue;
    if (/^(mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    if (isInternalHttpUrl(href)) links.add(cleanUrl(href).href);
  }
  return [...links];
}

function validatePage(result) {
  const { auditUrl: url, sitemapUrl } = result;
  if (result.error) {
    fail(`${url} — fetch hatası: ${result.error.message}`);
    return;
  }
  if (result.status < 200 || result.status >= 300) {
    fail(`${url} — sitemap URL'si ${result.status} döndürdü${result.location ? ` → ${result.location}` : ""}`);
    return;
  }

  const html = result.body;
  const titles = [...html.matchAll(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/gi)];
  const descriptions = [...html.matchAll(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/gi)];
  const canonicals = [...html.matchAll(/<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>/gi)];
  const h1s = [...html.matchAll(/<h1(?:\s[^>]*)?>/gi)];
  const lang = html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1];
  const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const metaRobots = extractMetaRobots(html);

  if (titles.length !== 1 || !titles[0][1].trim()) fail(`${url} — tam olarak bir dolu <title> olmalı`);
  if (descriptions.length !== 1 || !descriptions[0][1].trim()) fail(`${url} — tam olarak bir dolu meta description olmalı`);
  if (canonicals.length !== 1 || !canonicals[0][1].trim()) fail(`${url} — tam olarak bir canonical link olmalı`);
  if (canonicals[0]?.[1]) {
    try {
      const expectedUrl = new URL(sitemapUrl);
      const canonicalUrl = new URL(canonicals[0][1], expectedUrl);
      if (canonicalUrl.origin !== expectedUrl.origin) {
        fail(
          `${url} — canonical origin sitemap origin'iyle uyuşmuyor: ${canonicalUrl.origin} (beklenen ${expectedUrl.origin})`,
        );
      }
      if (canonicalUrl.pathname !== expectedUrl.pathname) {
        warn(`${url} — canonical farklı path gösteriyor: ${canonicalUrl.href}`);
      }
    } catch {
      fail(`${url} — canonical URL geçersiz: ${canonicals[0][1]}`);
    }
  }
  for (const value of metaRobots) {
    if (noindexDirective(value)) {
      fail(`${url} — sitemap URL'sinde meta robots noindex bulundu: ${value}`);
    }
  }
  if (noindexDirective(result.xRobotsTag)) {
    fail(`${url} — sitemap URL'sinde X-Robots-Tag noindex bulundu: ${result.xRobotsTag}`);
  }
  if (!lang) warn(`${url} — html lang niteliği bulunamadı`);
  if (h1s.length !== 1) warn(`${url} — ${h1s.length} adet H1 bulundu; tek ve açıklayıcı bir H1 önerilir`);
  if (jsonLd.length === 0) warn(`${url} — JSON-LD bulunamadı`);
  for (const block of jsonLd) {
    try {
      JSON.parse(block[1]);
    } catch {
      fail(`${url} — geçersiz JSON-LD`);
    }
  }

  return extractInternalLinks(html);
}

console.log(`SEO audit base: ${baseUrl.origin}`);

let robots;
try {
  robots = await fetchPage(new URL("/robots.txt", baseUrl));
} catch (error) {
  fail(`robots.txt alınamadı: ${error.message}`);
}

let sitemapReferences = [];
if (robots?.status !== 200) {
  fail(`robots.txt ${robots?.status ?? "yanıt vermedi"} döndürdü`);
} else {
  sitemapReferences = extractRobotsSitemaps(robots.body);
  if (sitemapReferences.length === 0) {
    fail("robots.txt içinde Sitemap satırı bulunamadı");
  } else {
    pass(`robots.txt: ${sitemapReferences.length} Sitemap satırı`);
  }
}

// Eski tek-sitemap davranışını koru: robots keşfi başarısız olsa bile ana
// sitemap'i denetlemeyi dene; robots hatası yine de audit'i başarısız kılar.
if (sitemapReferences.length === 0) {
  sitemapReferences = [new URL("/sitemap.xml", baseUrl).href];
}

const normalizedSitemapReferences = [];
for (const value of sitemapReferences) {
  try {
    normalizedSitemapReferences.push(normalizeSitemapUrl(value).href);
  } catch {
    fail(`robots.txt içinde geçersiz Sitemap URL'i: ${value}`);
  }
}

const uniqueSitemapReferences = [...new Set(normalizedSitemapReferences)];
if (normalizedSitemapReferences.length !== uniqueSitemapReferences.length) {
  fail(
    `robots.txt içinde ${normalizedSitemapReferences.length - uniqueSitemapReferences.length} yinelenen Sitemap satırı var`,
  );
}

const sitemapResults = await mapConcurrent(uniqueSitemapReferences, async (sitemapUrl) => {
  const auditUrl = mapSitemapUrlToAuditBase(sitemapUrl);
  try {
    return { sitemapUrl, auditUrl, ...(await fetchPage(auditUrl)) };
  } catch (error) {
    return { sitemapUrl, auditUrl, error };
  }
});

const sitemapEntries = [];
for (const result of sitemapResults) {
  if (result.error) {
    fail(`${result.sitemapUrl} — sitemap alınamadı: ${result.error.message}`);
    continue;
  }
  if (result.status !== 200) {
    fail(
      `${result.sitemapUrl} — sitemap ${result.status} döndürdü${result.location ? ` → ${result.location}` : ""}`,
    );
    continue;
  }

  const urls = extractSitemapUrls(result.body);
  if (urls.length === 0) {
    fail(`${result.sitemapUrl} — sitemap boş`);
    continue;
  }

  for (const value of urls) {
    try {
      const productionUrl = normalizeSitemapUrl(value, result.sitemapUrl);
      sitemapEntries.push({
        sitemapUrl: productionUrl.href,
        auditUrl: mapSitemapUrlToAuditBase(productionUrl.href),
        sourceSitemap: result.sitemapUrl,
      });
    } catch {
      fail(`${result.sitemapUrl} — geçersiz <loc> URL'i: ${value}`);
    }
  }
}

const sitemapUrlCounts = new Map();
for (const entry of sitemapEntries) {
  sitemapUrlCounts.set(entry.sitemapUrl, (sitemapUrlCounts.get(entry.sitemapUrl) ?? 0) + 1);
}
const duplicateSitemapUrls = [...sitemapUrlCounts.values()].reduce(
  (total, count) => total + Math.max(0, count - 1),
  0,
);
if (duplicateSitemapUrls > 0) {
  fail(`Sitemap birleşiminde ${duplicateSitemapUrls} yinelenen URL var`);
}

const uniqueSitemapEntries = [
  ...new Map(sitemapEntries.map((entry) => [entry.sitemapUrl, entry])).values(),
];

if (uniqueSitemapEntries.length === 0) {
  fail("Sitemap birleşimi boş");
} else {
  pass(
    `Sitemap birleşimi: ${uniqueSitemapReferences.length} dosya, ${uniqueSitemapEntries.length} benzersiz URL`,
  );

  const productionOrigins = new Set(
    uniqueSitemapEntries.map((entry) => new URL(entry.sitemapUrl).origin),
  );
  if (productionOrigins.size > 1) {
    fail(`Sitemap birleşiminde birden fazla production origin var: ${[...productionOrigins].join(", ")}`);
  }

  const pageResults = await mapConcurrent(uniqueSitemapEntries, async (entry) => {
    try {
      return { ...entry, ...(await fetchPage(entry.auditUrl)) };
    } catch (error) {
      return { ...entry, error };
    }
  });
  const linkedUrls = new Set();
  const linkSources = new Map();
  for (const result of pageResults) {
    const links = validatePage(result);
    for (const link of links || []) {
      linkedUrls.add(link);
      if (!linkSources.has(link)) linkSources.set(link, result.auditUrl);
    }
  }

  const sitemapResultByUrl = new Map(
    pageResults.map((result) => [result.auditUrl, result]),
  );
  for (const link of linkedUrls) {
    if (sitemapResultByUrl.has(link)) continue;
    const result = await fetchPage(link).catch((error) => ({ error }));
    const source = linkSources.get(link);
    if (result.error) fail(`${link} — iç link fetch hatası: ${result.error.message} (kaynak: ${source})`);
    else if (result.status >= 400) fail(`${link} — iç link ${result.status} döndürdü (kaynak: ${source})`);
    else if (result.status >= 300 && !isExpectedInternalRedirect(link)) {
      warn(`${link} — iç link redirect döndürüyor (${result.status}, kaynak: ${source})`);
    }
  }
  pass(`İç link taraması: ${linkedUrls.size} benzersiz site içi URL`);
  pass("Sitemap URL'leri 2xx yanıt ve temel metadata kontrolünden geçti");
}

for (const message of passes) console.log(`  PASS  ${message}`);
for (const message of warnings) console.log(`  WARN  ${message}`);
for (const message of errors) console.log(`  FAIL  ${message}`);
console.log(`\nÖzet: ${passes.length} geçti, ${warnings.length} uyarı, ${errors.length} hata`);
process.exitCode = errors.length > 0 ? 1 : 0;
