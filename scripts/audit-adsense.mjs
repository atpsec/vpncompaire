#!/usr/bin/env node

// Rendered AdSense safety audit.
// Usage:
//   npm run audit:adsense -- --base=http://localhost:3000
//   npm run audit:adsense -- --base=https://vpnadvisor.net --expect-publisher=ca-pub-XXXXXXXXXXXXXXXX

const requestedBase = process.argv.find((arg) => arg.startsWith("--base="))?.slice(7);
const expectedPublisher = process.argv
  .find((arg) => arg.startsWith("--expect-publisher="))
  ?.slice("--expect-publisher=".length);
const baseUrl = new URL(requestedBase || process.env.SEO_BASE_URL || "http://localhost:3000");
baseUrl.pathname = baseUrl.pathname.replace(/\/$/, "");

const passes = [];
const warnings = [];
const errors = [];

const pass = (message) => passes.push(message);
const warn = (message) => warnings.push(message);
const fail = (message) => errors.push(message);

const contentPages = [
  "/",
  "/blog",
  "/vpn-reviews",
  "/comparison",
  "/methodology",
  "/about",
  "/reviews/nordvpn",
];

const excludedPages = [
  "/calculator",
  "/quiz",
  "/security-tools",
  "/server-map",
  "/vpn-test",
  "/privacy-policy",
  "/cookie-policy",
  "/affiliate-disclosure",
  "/legal-notice",
  "/terms",
  "/refund-policy",
  "/contact",
];

function absolutePath(pathname) {
  return new URL(pathname, `${baseUrl.href}/`).href;
}

function hasAdsenseScript(html) {
  return /pagead\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i.test(html);
}

function hasPublisher(html, publisher) {
  return publisher ? html.includes(publisher) : false;
}

async function fetchPage(pathname) {
  const url = absolutePath(pathname);
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "VPNAdvisor-AdSense-Audit/1.0",
    },
  });
  return {
    url,
    status: response.status,
    body: await response.text(),
  };
}

async function auditPage(pathname, expectedAds) {
  let result;
  try {
    result = await fetchPage(pathname);
  } catch (error) {
    fail(`${pathname} — fetch hatası: ${error.message}`);
    return;
  }

  if (result.status < 200 || result.status >= 300) {
    fail(`${pathname} — HTTP ${result.status}`);
    return;
  }

  const hasScript = hasAdsenseScript(result.body);
  if (expectedAds && expectedPublisher) {
    if (!hasScript) fail(`${pathname} — AdSense scripti bulunamadı`);
    else if (!hasPublisher(result.body, expectedPublisher)) {
      fail(`${pathname} — beklenen publisher ID bulunamadı`);
    } else {
      pass(`${pathname} — AdSense scripti ve publisher ID doğru`);
    }
  } else if (expectedAds && !expectedPublisher) {
    if (hasScript) warn(`${pathname} — publisher beklenmediği halde AdSense scripti var`);
    else pass(`${pathname} — yerel/staging build'de AdSense scripti yüklenmedi`);
  } else if (hasScript) {
    fail(`${pathname} — reklam hariç sayfada AdSense scripti bulundu`);
  } else {
    pass(`${pathname} — reklam hariç`);
  }

  return result.body;
}

console.log(`AdSense audit base: ${baseUrl.origin}`);

for (const pathname of contentPages) {
  await auditPage(pathname, true);
}

for (const pathname of excludedPages) {
  await auditPage(pathname, false);
}

try {
  const adsTxt = await fetchPage("/ads.txt");
  if (adsTxt.status !== 200) {
    fail(`/ads.txt — HTTP ${adsTxt.status}`);
  } else if (!/^google\.com,\s*pub-\d{16},\s*(DIRECT|RESELLER),\s*[a-f0-9]{16}\s*$/im.test(adsTxt.body)) {
    fail("/ads.txt — geçerli Google publisher satırı bulunamadı");
  } else if (expectedPublisher && !adsTxt.body.includes(expectedPublisher.replace("ca-", ""))) {
    fail("/ads.txt — beklenen publisher ID ile eşleşmiyor");
  } else {
    pass("/ads.txt — Google publisher satırı geçerli");
  }
} catch (error) {
  fail(`/ads.txt — fetch hatası: ${error.message}`);
}

try {
  const home = await fetchPage("/");
  if (!home.body.includes("Advertising and affiliate disclosure")) {
    fail("Ana sayfa — reklam/ortaklık açıklaması bulunamadı");
  } else {
    pass("Ana sayfa — reklam/ortaklık açıklaması görünür");
  }
} catch (error) {
  fail(`Ana sayfa disclosure kontrolü — fetch hatası: ${error.message}`);
}

for (const message of passes) console.log(`  PASS  ${message}`);
for (const message of warnings) console.log(`  WARN  ${message}`);
for (const message of errors) console.log(`  FAIL  ${message}`);
console.log(`\nÖzet: ${passes.length} geçti, ${warnings.length} uyarı, ${errors.length} hata`);
process.exitCode = errors.length > 0 ? 1 : 0;
