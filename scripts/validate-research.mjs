import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "research", "canonical.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const statuses = new Set(["verified", "partially_verified", "provider_claim_only", "conflicting", "outdated", "unknown"]);
const sourceTypes = new Set(["official_documentation", "privacy_policy", "terms", "independent_audit", "court_record", "transparency_report", "standards_documentation", "reputable_secondary_source"]);
const fields = new Set(["jurisdiction", "ownership", "no_logs_policy", "independent_no_logs_audit", "independent_security_audit", "audit_details", "protocols", "wireguard", "openvpn", "ikev2", "kill_switch", "ram_only_servers", "open_source_apps", "supported_platforms", "simultaneous_devices", "pricing_reference", "refund_period", "free_plan", "server_network", "transparency_reports", "warrant_canary", "court_legal_evidence", "privacy_policy", "terms"]);
const errors = [];
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const providerIds = new Set();
const providerSlugs = new Set();
const sourceIds = new Set();

function checkDate(value, label) {
  if (value === null || value === undefined || value === "") return;
  if (!datePattern.test(value) || Number.isNaN(new Date(value).valueOf())) errors.push(`${label}: invalid date ${value}`);
}

function checkUrl(value, label) {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) errors.push(`${label}: URL must use http(s)`);
  } catch {
    errors.push(`${label}: invalid URL ${value}`);
  }
}

for (const provider of data.providers) {
  if (providerIds.has(provider.id)) errors.push(`duplicate provider id: ${provider.id}`);
  if (providerSlugs.has(provider.slug)) errors.push(`duplicate provider slug: ${provider.slug}`);
  providerIds.add(provider.id);
  providerSlugs.add(provider.slug);
  checkUrl(provider.website, `${provider.slug}.website`);
  checkDate(provider.lastVerified, `${provider.slug}.lastVerified`);
  for (const [field, fact] of Object.entries(provider.facts ?? {})) {
    if (!fields.has(field)) errors.push(`${provider.slug}.${field}: unknown field`);
    const status = fact.status ?? (fact.value == null ? "unknown" : "provider_claim_only");
    if (!statuses.has(status)) errors.push(`${provider.slug}.${field}: invalid status ${status}`);
    if (fact.sourceId && !sourceIds.has(fact.sourceId) && !data.sources.some((source) => source.id === fact.sourceId)) errors.push(`${provider.slug}.${field}: missing source ${fact.sourceId}`);
    checkDate(fact.checkedAt, `${provider.slug}.${field}.checkedAt`);
    checkDate(fact.publishedAt, `${provider.slug}.${field}.publishedAt`);
    checkDate(fact.validFrom, `${provider.slug}.${field}.validFrom`);
    checkDate(fact.validTo, `${provider.slug}.${field}.validTo`);
    if ((status === "verified" || status === "partially_verified") && !fact.sourceId) errors.push(`${provider.slug}.${field}: verified status requires sourceId`);
    if (status === "verified" && !fact.checkedAt) errors.push(`${provider.slug}.${field}: verified status requires checkedAt`);
  }
}

for (const source of data.sources) {
  if (sourceIds.has(source.id)) errors.push(`duplicate source id: ${source.id}`);
  sourceIds.add(source.id);
  if (!providerIds.has(source.providerId)) errors.push(`${source.id}: unknown provider ${source.providerId}`);
  if (!sourceTypes.has(source.type)) errors.push(`${source.id}: invalid source type ${source.type}`);
  checkUrl(source.url, `${source.id}.url`);
  checkDate(source.firstChecked, `${source.id}.firstChecked`);
  checkDate(source.lastChecked, `${source.id}.lastChecked`);
}

for (const provider of data.providers) {
  for (const [field, fact] of Object.entries(provider.facts ?? {})) {
    if (fact.sourceId) {
      const source = data.sources.find((item) => item.id === fact.sourceId);
      if (!source) continue;
      if (source.providerId !== provider.id) errors.push(`${provider.slug}.${field}: source ${fact.sourceId} belongs to another provider`);
    }
  }
}

if (errors.length) {
  console.error(`Research validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const factCount = data.providers.reduce((sum, provider) => sum + Object.keys(provider.facts ?? {}).length, 0);
const sourcedFacts = data.providers.reduce((sum, provider) => sum + Object.values(provider.facts ?? {}).filter((fact) => fact.sourceId).length, 0);
console.log(`Research validation passed: ${data.providers.length} providers, ${factCount} explicit facts, ${sourcedFacts} source-linked facts, ${data.sources.length} sources, ${data.changes.length} published changes.`);
