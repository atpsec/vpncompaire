import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "data", "research", "monitored-sources.json");
const runtimeDir = path.join(root, ".runtime", "research-sources");
const reportPath = path.join(root, ".runtime", "research-change-report.json");
const updateSnapshots = process.argv.includes("--update");
const config = JSON.parse(await fs.readFile(configPath, "utf8"));

function normalize(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500_000);
}

await fs.mkdir(runtimeDir, { recursive: true });
const report = [];
for (const item of config) {
  const snapshotPath = path.join(runtimeDir, `${item.sourceId}.txt`);
  try {
    const response = await fetch(item.url, { redirect: "follow", headers: { "user-agent": "VPNAdvisor research change monitor/1.0" } });
    const body = normalize(await response.text());
    const previous = await fs.readFile(snapshotPath, "utf8").catch(() => null);
    const changed = previous !== null && previous !== body;
    const status = previous === null ? "baseline_missing" : changed ? "changed_review_required" : "unchanged";
    report.push({ sourceId: item.sourceId, url: item.url, httpStatus: response.status, status, fetchedAt: new Date().toISOString(), previousLength: previous?.length ?? null, currentLength: body.length });
    if (updateSnapshots || previous === null) await fs.writeFile(snapshotPath, body, "utf8");
  } catch (error) {
    report.push({ sourceId: item.sourceId, url: item.url, status: "fetch_failed_review_required", error: error instanceof Error ? error.message : String(error) });
  }
}

await fs.writeFile(reportPath, JSON.stringify({ generatedAt: new Date().toISOString(), updateSnapshots, reports: report }, null, 2), "utf8");
console.log(JSON.stringify({ reportPath, updateSnapshots, reports: report }, null, 2));
