#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://vpnadvisor.net").replace(/\/$/, "");
const site = new URL(siteUrl);
const keyFileName = "6f2c8d4a1b7e4c69a0a8d9f3c1e5b7a2.txt";
const key = (await readFile(resolve("public", keyFileName), "utf8")).trim();
const inputArgs = process.argv.slice(2);

if (inputArgs.length === 0) {
  console.error("Kullanım: npm run seo:indexnow -- --sitemap");
  console.error("veya: npm run seo:indexnow -- /blog/yeni-yazi https://vpnadvisor.net/guide/what-is-a-vpn");
  process.exit(1);
}

let inputUrls = inputArgs;
if (inputArgs.includes("--sitemap")) {
  if (inputArgs.length !== 1) {
    console.error("--sitemap başka URL veya seçeneklerle birlikte kullanılamaz.");
    process.exit(1);
  }

  const response = await fetch(`${siteUrl}/sitemap.xml`);
  if (!response.ok) {
    console.error(`Sitemap alınamadı: ${response.status}`);
    process.exit(1);
  }

  const xml = await response.text();
  inputUrls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => match[1]);
  if (inputUrls.length === 0) {
    console.error("Sitemap içinde URL bulunamadı.");
    process.exit(1);
  }
}

const urls = [...new Set(inputUrls.map((value) => new URL(value, site).href))];
const invalidUrls = urls.filter((url) => new URL(url).origin !== site.origin);

if (invalidUrls.length > 0) {
  console.error(`Yalnızca ${site.origin} adresleri gönderilebilir:`);
  invalidUrls.forEach((url) => console.error(`- ${url}`));
  process.exit(1);
}

if (urls.length > 10_000) {
  console.error("IndexNow tek istekte en fazla 10.000 URL kabul eder.");
  process.exit(1);
}

const response = await fetch("https://www.bing.com/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: site.host,
    key,
    keyLocation: `${siteUrl}/${keyFileName}`,
    urlList: urls,
  }),
});

if (!response.ok) {
  const detail = await response.text().catch(() => "");
  console.error(`IndexNow ${response.status} döndürdü${detail ? `: ${detail}` : ""}`);
  process.exit(1);
}

console.log(`IndexNow kabul etti: ${urls.length} URL (${response.status}).`);
