import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checks = [
  [
    "Transparency Index page",
    path.join(root, "src", "app", "[locale]", "arastirma", "transparency-index", "page.tsx"),
    ["VPN Transparency Index 2026", "not a safety certification", "Dataset"],
  ],
  [
    "Transparency Index data distribution",
    path.join(root, "src", "app", "research", "transparency-index", "data.json", "route.ts"),
    ["transparencyIndexDataset", "application/json", "X-Robots-Tag"],
  ],
  [
    "Blog authority card",
    path.join(root, "src", "components", "blog", "blog-header.tsx"),
    ["editorialNote", "meetTeam", "/about"],
  ],
  [
    "Methodology freshness date",
    path.join(root, "src", "app", "[locale]", "metodoloji", "page.tsx"),
    ["2026-08-31"],
  ],
];

const failures = [];
for (const [label, file, needles] of checks) {
  if (!fs.existsSync(file)) {
    failures.push(`${label}: missing ${path.relative(root, file)}`);
    continue;
  }
  const source = fs.readFileSync(file, "utf8");
  for (const needle of needles) {
    if (!source.includes(needle)) failures.push(`${label}: missing "${needle}"`);
  }
}

const messages = JSON.parse(
  fs.readFileSync(path.join(root, "messages", "en.json"), "utf8"),
);
if (!messages.blog?.editorialNote || !messages.blog?.meetTeam) {
  failures.push("English blog messages: editorial authority copy is incomplete");
}

if (failures.length > 0) {
  console.error("Content quality audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Content quality audit passed: research distribution, limitations, blog authority card and freshness guard are present.");
