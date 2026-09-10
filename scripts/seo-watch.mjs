#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(root, "data", "seo", "config.json");
const watchwordsPath = join(root, "data", "seo", "watchwords.json");
const runtimeRoot = join(root, ".runtime", "seo");

function parseArgs(argv) {
  const args = { command: argv[0] || "report", values: {} };
  for (const token of argv.slice(1)) {
    if (!token.startsWith("--")) continue;
    const [key, ...rest] = token.slice(2).split("=");
    args.values[key] = rest.length ? rest.join("=") : true;
  }
  return args;
}

function usage() {
  console.log(`SEO Rank Watch (VPN Advisor)

Commands:
  npm run seo:collect -- --csv=PATH --date=YYYY-MM-DD [--start=YYYY-MM-DD --end=YYYY-MM-DD]
  npm run seo:report [--json]
  npm run seo:review

The collector accepts a Google Search Console CSV export. It never writes
credentials, calls a search engine, or changes site content.`);
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function normalizeHeader(value) {
  return value
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[%]/g, "percent")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function parseCsvLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const character = line[i];
    if (character === '"') {
      if (quoted && line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell);
  return cells;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  const rows = lines.map(parseCsvLine);
  const headerIndex = rows.findIndex((row) =>
    row.some((value) => ["query", "top queries", "page", "top pages"].includes(normalizeHeader(value))),
  );
  if (headerIndex === -1) throw new Error("CSV başlığı Query veya Page sütununu içermiyor");
  const headers = rows[headerIndex].map(normalizeHeader);
  return rows.slice(headerIndex + 1).map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, (row[index] ?? "").trim()])),
  );
}

function valueFor(row, aliases) {
  for (const alias of aliases) {
    const value = row[normalizeHeader(alias)];
    if (value !== undefined && value !== "") return value;
  }
  return null;
}

function numberValue(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number.parseFloat(String(value).replace(/[%\s]/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function ctrValue(value) {
  const parsed = numberValue(value);
  if (parsed === null) return null;
  return String(value).includes("%") ? parsed / 100 : parsed;
}

function canonicalPath(value) {
  if (!value) return null;
  try {
    const url = new URL(value, "https://vpnadvisor.net");
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

function dateValue(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ""))) {
    throw new Error(`${label} YYYY-MM-DD biçiminde olmalı`);
  }
  return value;
}

function runId(date, hash) {
  return `gsc-${date}-${hash.slice(0, 12)}`;
}

function normalizeRecord(row) {
  const query = valueFor(row, ["query", "top queries", "search query", "sorgu"]);
  const page = valueFor(row, ["page", "top pages", "landing page", "sayfa"]);
  if (!query && !page) return null;
  return {
    query: query?.trim() || null,
    page: canonicalPath(page),
    country: valueFor(row, ["country", "ülke"]),
    device: valueFor(row, ["device", "cihaz"]),
    clicks: numberValue(valueFor(row, ["clicks", "tıklamalar"])),
    impressions: numberValue(valueFor(row, ["impressions", "gösterimler"])),
    ctr: ctrValue(valueFor(row, ["ctr", "click through rate"])),
    position: numberValue(valueFor(row, ["position", "average position", "ortalama konum"])),
  };
}

async function collect(values) {
  if (!values.csv || !values.date) throw new Error("collect için --csv=PATH ve --date=YYYY-MM-DD gerekli");
  const date = dateValue(values.date, "date");
  const csvPath = resolve(root, values.csv);
  const text = await readFile(csvPath, "utf8");
  const rows = parseCsv(text).map(normalizeRecord).filter(Boolean);
  const hash = createHash("sha256").update(text).digest("hex");
  const observation = {
    schemaVersion: 1,
    runId: runId(date, hash),
    source: "gsc-csv-export",
    property: values.property || (await readJson(configPath)).site.property,
    filters: {
      country: values.country || null,
      device: values.device || null,
      searchType: values.searchType || "web",
    },
    dateRange: {
      start: values.start ? dateValue(values.start, "start") : date,
      end: values.end ? dateValue(values.end, "end") : date,
    },
    dataState: "final-or-exported",
    fetchedAt: new Date().toISOString(),
    sourceSha256: hash,
    rows,
  };
  const outputDir = join(runtimeRoot, "observations", date);
  await mkdir(outputDir, { recursive: true });
  const outputPath = join(outputDir, `${observation.runId}.json`);
  await writeFile(outputPath, `${JSON.stringify(observation, null, 2)}\n`, "utf8");
  console.log(`GSC gözlemi kaydedildi: ${outputPath}`);
  console.log(`Satır: ${rows.length}; kaynak SHA-256: ${hash}`);
}

async function observationFiles(directory = runtimeRoot) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) files.push(...(await observationFiles(path)));
      else if (entry.name.endsWith(".json") && path.includes(`${join("observations", "")}`)) files.push(path);
    }
    return files;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function candidateScore(candidate, row) {
  const impressions = row?.impressions ?? 0;
  const position = row?.position;
  if (position !== null && position >= 2 && position <= 10 && impressions > 0) return 400 - position;
  if (position !== null && position > 10 && position <= 20 && impressions > 0) return 300 + Math.min(impressions, 1000) / 1000;
  if (impressions > 0) return 200 + Math.min(impressions, 1000) / 1000;
  return 100 - candidate.priority;
}

async function report(values) {
  const config = await readJson(configPath);
  const candidates = await readJson(watchwordsPath);
  const files = await observationFiles();
  const observations = await Promise.all(files.map(readJson));
  const latest = new Map();
  for (const observation of observations) {
    for (const row of observation.rows ?? []) {
      const key = [row.query?.toLowerCase() || "", row.page || "", row.country || "", row.device || ""].join("|");
      const previous = latest.get(key);
      const stamp = `${observation.dateRange?.end || ""}|${observation.fetchedAt || ""}`;
      const previousStamp = previous ? `${previous.observation.dateRange?.end || ""}|${previous.observation.fetchedAt || ""}` : "";
      if (!previous || stamp > previousStamp) latest.set(key, { row, observation });
    }
  }

  const results = candidates.map((candidate) => {
    const matches = [...latest.values()].filter(({ row }) =>
      row.query?.toLowerCase() === candidate.query.toLowerCase() &&
      (!row.page || row.page === candidate.canonicalPath),
    );
    const best = matches.sort((a, b) => (b.row.impressions ?? 0) - (a.row.impressions ?? 0))[0];
    return {
      ...candidate,
      rank: best?.row.position ?? null,
      clicks: best?.row.clicks ?? null,
      impressions: best?.row.impressions ?? null,
      ctr: best?.row.ctr ?? null,
      observedThrough: best?.observation.dateRange?.end ?? null,
      source: best?.observation.source ?? null,
      score: candidateScore(candidate, best?.row),
    };
  }).sort((a, b) => b.score - a.score || a.priority - b.priority);

  const output = {
    generatedAt: new Date().toISOString(),
    property: config.site.property,
    observationCount: observations.length,
    dataAvailable: observations.length > 0,
    candidates: results,
  };
  if (values.json) {
    console.log(JSON.stringify(output, null, 2));
    return;
  }
  console.log(`SEO Rank Watch — ${config.site.property}`);
  console.log(`Gözlem dosyası: ${observations.length}; gerçek GSC verisi: ${output.dataAvailable ? "var" : "yok"}`);
  if (!observations.length) {
    console.log("Henüz GSC gözlemi yok. Sıralama veya etki sonucu üretilmedi.");
  }
  for (const item of results) {
    const rank = item.rank === null ? "bilinmiyor" : item.rank.toFixed(2);
    const impressions = item.impressions === null ? "—" : String(item.impressions);
    console.log(`${item.query} | ${item.canonicalPath} | konum ${rank} | gösterim ${impressions} | durum ${item.status}`);
  }
  console.log("Aday seçimi yalnızca gerçek gözlem satırı varsa sıralama ve gösterimle desteklenir; içerik otomatik değiştirilmedi.");
}

async function review() {
  const path = join(runtimeRoot, "experiments.json");
  try {
    const experiments = await readJson(path);
    console.log(`Kayıtlı deney: ${experiments.length}`);
    console.log("İnceleme komutu içerik değiştirmez; vadesi gelen deneyler sonraki uygulama adımında değerlendirilir.");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Kayıtlı deney yok; değişiklik veya sonuç üretilmedi.");
      return;
    }
    throw error;
  }
}

const args = parseArgs(process.argv.slice(2));
try {
  if (args.command === "help" || args.command === "--help") usage();
  else if (args.command === "collect") await collect(args.values);
  else if (args.command === "report") await report(args.values);
  else if (args.command === "review") await review();
  else throw new Error(`Bilinmeyen komut: ${args.command}`);
} catch (error) {
  console.error(`SEO Rank Watch hatası: ${error.message}`);
  process.exitCode = 1;
}
