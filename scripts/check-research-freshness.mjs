#!/usr/bin/env node

// Research freshness audit.
// Usage: node scripts/check-research-freshness.mjs [--max-days=45]
// The audit reports intentionally unknown fields but only fails for dated
// records that have exceeded the freshness window. A missing date is a data
// coverage task, not automatically a stale claim.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "research", "canonical.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const requestedMaxAge = process.argv.find((arg) => arg.startsWith("--max-days="))?.slice(11);
const maxAgeDays = Number(requestedMaxAge ?? process.env.RESEARCH_MAX_AGE_DAYS ?? 45);
const now = new Date();
const localDate = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
// Date-only evidence is editorially checked in the operator's local calendar.
// Using UTC here can mark a just-checked record as future during evening hours.
const asOfInput = process.env.RESEARCH_AS_OF ?? localDate;
const asOf = new Date(`${asOfInput}T00:00:00Z`);

if (!Number.isFinite(maxAgeDays) || maxAgeDays <= 0) {
  console.error(`Invalid freshness window: ${maxAgeDays}`);
  process.exit(1);
}
if (Number.isNaN(asOf.valueOf())) {
  console.error(`Invalid audit date: ${asOfInput}`);
  process.exit(1);
}

const datedRecords = [];
const missingRecords = [];
const invalidRecords = [];

function inspectDate(date, label) {
  if (!date) {
    missingRecords.push(label);
    return;
  }
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf())) {
    invalidRecords.push(`${label}: ${date}`);
    return;
  }
  const ageDays = Math.floor((asOf.valueOf() - parsed.valueOf()) / 86_400_000);
  if (ageDays < 0) {
    invalidRecords.push(`${label}: future date ${date}`);
    return;
  }
  datedRecords.push({ label, date, ageDays, stale: ageDays > maxAgeDays });
}

for (const provider of data.providers ?? []) {
  inspectDate(provider.lastVerified, `${provider.slug}.lastVerified`);
  for (const [field, fact] of Object.entries(provider.facts ?? {})) {
    if (fact.value === null || fact.value === undefined) continue;
    inspectDate(fact.checkedAt, `${provider.slug}.${field}.checkedAt`);
  }
}

for (const source of data.sources ?? []) {
  inspectDate(source.lastChecked, `source:${source.id}.lastChecked`);
}

const stale = datedRecords.filter((record) => record.stale).sort((a, b) => b.ageDays - a.ageDays);
const oldest = [...datedRecords].sort((a, b) => b.ageDays - a.ageDays).slice(0, 10);
const lines = [
  `# Research freshness audit · ${asOfInput}`,
  "",
  `- Freshness window: ${maxAgeDays} days`,
  `- Dated records: ${datedRecords.length}`,
  `- Missing dates: ${missingRecords.length}`,
  `- Stale records: ${stale.length}`,
  `- Invalid/future records: ${invalidRecords.length}`,
  "",
  "## Oldest dated records",
  "",
  "| Record | Checked | Age | State |",
  "|---|---|---:|---|",
  ...oldest.map((record) => `| ${record.label} | ${record.date} | ${record.ageDays} days | ${record.stale ? "STALE" : "current"} |`),
];

if (stale.length) {
  lines.push("", "## Stale records", "", ...stale.map((record) => `- ${record.label}: ${record.date} (${record.ageDays} days old)`));
}
if (missingRecords.length) {
  lines.push("", "## Missing dates", "", ...missingRecords.slice(0, 40).map((label) => `- ${label}`));
  if (missingRecords.length > 40) lines.push(`- …and ${missingRecords.length - 40} more`);
}
if (invalidRecords.length) lines.push("", "## Invalid dates", "", ...invalidRecords.map((record) => `- ${record}`));

fs.writeFileSync(path.join(root, ".research-freshness-report.md"), `${lines.join("\n")}\n`);

for (const record of stale) console.error(`STALE ${record.label}: ${record.date} (${record.ageDays} days old)`);
for (const record of invalidRecords) console.error(`INVALID ${record}`);
console.log(`Research freshness audit: ${datedRecords.length} dated, ${missingRecords.length} missing, ${stale.length} stale, ${invalidRecords.length} invalid.`);

if (stale.length || invalidRecords.length) process.exit(1);
