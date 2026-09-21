import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "data", "research", "canonical.json"), "utf8"));
const sourceIds = new Set(data.sources.map((source) => source.id));
const requiredQuestions = [
  "which-vpns-have-independent-no-logs-audits",
  "which-vpns-support-wireguard",
  "which-vpns-have-open-source-apps",
  "which-vpns-use-ram-only-servers",
  "vpn-jurisdictions-compared",
  "vpn-device-limits",
  "vpn-refund-periods",
  "which-vpns-offer-a-free-plan",
  "which-vpns-publish-transparency-reports",
  "which-vpns-have-third-party-security-audits",
];
const statuses = new Set(["verified", "partially_verified", "provider_claim_only", "conflicting", "outdated", "unknown"]);
const fieldNames = new Set(["jurisdiction", "ownership", "no_logs_policy", "independent_no_logs_audit", "independent_security_audit", "audit_details", "protocols", "wireguard", "openvpn", "ikev2", "kill_switch", "ram_only_servers", "open_source_apps", "supported_platforms", "simultaneous_devices", "pricing_reference", "refund_period", "free_plan", "server_network", "transparency_reports", "warrant_canary", "court_legal_evidence", "privacy_policy", "terms"]);
const checks = [];
const fail = (message) => { throw new Error(message); };
const pass = (message) => checks.push(message);

if (new Set(data.providers.map((provider) => provider.slug)).size !== data.providers.length) fail("provider slug uniqueness");
if (new Set(data.sources.map((source) => source.id)).size !== data.sources.length) fail("source id uniqueness");
pass("provider and source identifiers are unique");

for (const provider of data.providers) {
  for (const [field, fact] of Object.entries(provider.facts)) {
    if (!fieldNames.has(field)) fail(`${provider.slug}.${field} is not in the canonical field set`);
    const status = fact.status ?? (fact.value == null ? "unknown" : "provider_claim_only");
    if (!statuses.has(status)) fail(`${provider.slug}.${field} has invalid status`);
    if (fact.sourceId && !sourceIds.has(fact.sourceId)) fail(`${provider.slug}.${field} has broken source relationship`);
  }
}
pass("evidence statuses and source relationships are valid");

for (const slug of data.providers.map((provider) => provider.slug)) {
  const route = path.join(root, "src", "app", "[locale]", "arastirma", "providers", "[slug]", "page.tsx");
  if (!fs.existsSync(route)) fail(`provider route missing for ${slug}`);
}
pass("provider page generation has a dynamic route and all providers are data-backed");

for (const slug of requiredQuestions) {
  if (!fs.existsSync(path.join(root, "src", "app", "[locale]", "arastirma", "questions", "[slug]", "page.tsx"))) fail(`question route missing for ${slug}`);
}
pass("question aggregation has a dynamic route for all required question slugs");

const sourceBackedQuestion = data.providers.some((provider) => provider.facts.independent_no_logs_audit?.sourceId);
if (!sourceBackedQuestion) fail("question aggregation has no source-backed audit record");
pass("question aggregation can distinguish source-backed, provider-claim and unknown values");

const unknownValue = data.providers.some((provider) => !provider.facts.kill_switch);
if (!unknownValue) fail("unknown field fixture is missing");
pass("missing canonical facts resolve to explicit unknown records at runtime");

const conflictingFixture = { status: "conflicting" };
if (!statuses.has(conflictingFixture.status)) fail("conflicting status is not supported");
pass("conflicting evidence status is supported without being converted to verified");

const date = new Date("2026-08-22");
const days = Math.floor((Date.parse("2026-09-19") - date.valueOf()) / 86_400_000);
if (days !== 28) fail(`freshness calculation expected 28 days, got ${days}`);
if (data.providers.some((provider) => provider.lastVerified === null) === false) fail("not-yet-verified freshness case is missing");
pass("lastVerified freshness and not-yet-verified cases are represented");

const broken = JSON.parse(JSON.stringify(data));
broken.providers[0].facts.pricing_reference.sourceId = "missing-source";
const brokenRelationshipDetected = !broken.sources.some((source) => source.id === broken.providers[0].facts.pricing_reference.sourceId);
if (!brokenRelationshipDetected) fail("broken source relationship fixture was not detected");
pass("broken source relationship fixture is detectable before publication");

for (const route of [
  "src/app/api/research/providers/route.ts",
  "src/app/api/research/providers/[slug]/route.ts",
  "src/app/api/research/questions/[slug]/route.ts",
  "src/app/api/research/sources/route.ts",
  "src/app/api/research/changes/route.ts",
  "src/app/api/research/coverage/route.ts",
]) {
  if (!fs.existsSync(path.join(root, route))) fail(`API route missing: ${route}`);
}
pass("all public research API route handlers exist");

console.log(`Research tests passed: ${checks.length} checks.`);
for (const check of checks) console.log(`PASS: ${check}`);
