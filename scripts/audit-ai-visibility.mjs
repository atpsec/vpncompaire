#!/usr/bin/env node
// Checks the crawl, citation and entity surfaces that should remain stable for
// Google AI features, ChatGPT search and Bing/Copilot grounding.
// Usage: npm run audit:ai-visibility -- --base=http://localhost:3000

const requestedBase = process.argv.find((arg) => arg.startsWith("--base="))?.slice(7);
const baseUrl = new URL(requestedBase || process.env.AI_VISIBILITY_BASE_URL || "http://localhost:3000");
baseUrl.pathname = baseUrl.pathname.replace(/\/$/, "");

const errors = [];
const passes = [];
const requiredAgents = ["OAI-SearchBot", "Bingbot", "ClaudeBot", "PerplexityBot"];
const publicPages = [
  "/",
  "/about",
  "/methodology",
  "/research",
  "/research/evidence-ledger",
  "/research/transparency-index",
  "/ai",
  "/blog",
  "/vpn-reviews",
];

function fail(message) { errors.push(message); }
function pass(message) { passes.push(message); }

async function get(pathname, headers = {}) {
  const response = await fetch(new URL(pathname, baseUrl), {
    redirect: "manual",
    headers: { "User-Agent": "VPNAdvisor-AI-Visibility-Audit/1.0", ...headers },
  });
  return { response, body: await response.text() };
}

function hasNoindex(body) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*(?:noindex|none)/i.test(body);
}

function jsonLdBlocks(body) {
  return [...body.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
}

const robotsResult = await get("/robots.txt");
if (robotsResult.response.status !== 200) {
  fail(`robots.txt returned ${robotsResult.response.status}`);
} else {
  for (const agent of requiredAgents) {
    const block = robotsResult.body.match(new RegExp(`User-agent:\\s*${agent}[\\s\\S]*?(?=\\nUser-agent:|$)`, "i"))?.[0] ?? "";
    if (!/Allow:\s*\//i.test(block) || !/Disallow:\s*\/go\//i.test(block)) {
      fail(`${agent} must be allowed to crawl public pages while /go/ stays excluded`);
    }
  }
  if (!/Sitemap:\s*https?:\/\//i.test(robotsResult.body)) fail("robots.txt is missing an absolute Sitemap directive");
  if (!errors.length) pass("robots.txt allows required AI/search crawlers and excludes affiliate redirects");
}

const llmsResult = await get("/llms.txt");
if (llmsResult.response.status !== 200 || !/VPN Advisor/i.test(llmsResult.body)) {
  fail("llms.txt must remain reachable and identify VPN Advisor");
} else {
  pass("llms.txt is reachable (supporting surface; not treated as a Google ranking requirement)");
}

for (const pathname of publicPages) {
  const result = await get(pathname);
  if (result.response.status !== 200) {
    fail(`${pathname} returned ${result.response.status}`);
    continue;
  }
  if (hasNoindex(result.body)) fail(`${pathname} is public but contains noindex`);
  if (!/<title[^>]*>[^<]+<\/title>/i.test(result.body)) fail(`${pathname} is missing a non-empty title`);
  if ((result.body.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length !== 1) fail(`${pathname} must have exactly one H1`);
  const blocks = jsonLdBlocks(result.body);
  if (!blocks.length) fail(`${pathname} is missing JSON-LD`);
  for (const block of blocks) {
    try { JSON.parse(block); } catch { fail(`${pathname} contains invalid JSON-LD`); }
  }
}
if (!errors.some((message) => publicPages.some((page) => message.startsWith(page)))) {
  pass(`${publicPages.length} citation-facing pages are crawlable, indexable and structurally marked up`);
}

const sitemapResult = await get("/sitemap.xml");
if (sitemapResult.response.status !== 200 || !/<loc>[^<]+<\/loc>/i.test(sitemapResult.body)) {
  fail("sitemap.xml must be reachable and contain URLs");
} else {
  pass("sitemap.xml is reachable with indexable URLs");
}

if (errors.length) {
  console.error(`AI visibility audit failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

for (const message of passes) console.log(`PASS: ${message}`);
console.log(`AI visibility audit passed: ${passes.length} checks.`);
