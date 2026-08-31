#!/usr/bin/env node

// Guards the site's source-based publishing position against accidental
// reintroduction of staff bylines, unperformed tests or contradictory revenue copy.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

const englishBlogDir = path.join(root, "src", "content", "blog", "en");
const englishBlogFiles = walk(englishBlogDir).filter((file) => file.endsWith(".mdx"));
const inspectedFiles = [
  path.join(root, "messages", "en.json"),
  path.join(root, "src", "lib", "site.ts"),
  path.join(root, "src", "lib", "seo.ts"),
  path.join(root, "src", "app", "llms.txt", "route.ts"),
  ...walk(path.join(root, "src", "app")),
  ...walk(path.join(root, "src", "components")),
  ...englishBlogFiles,
];

const patterns = [
  ["legacy staff byline", /VPN Advisor Editorial Team/i],
  ["unperformed platform access test", /Access tests on platforms/i],
  ["unperformed support test", /We (?:run|perform|test) (?:support|response|agent)/i],
  ["unqualified no-commission claim", /we earn no commission/i],
  ["old composite-score formula", /Final score\s*=/i],
  ["old daily-use test claim", /used daily for 14 days/i],
  ["old live-chat test claim", /live chat at least 3 times/i],
];

for (const file of inspectedFiles) {
  const source = fs.readFileSync(file, "utf8");
  for (const [label, pattern] of patterns) {
    if (pattern.test(source)) failures.push(`${label}: ${path.relative(root, file)}`);
  }
}

for (const file of englishBlogFiles) {
  const { data } = matter(fs.readFileSync(file, "utf8"));
  if (data.author !== "VPN Advisor") {
    failures.push(`English article author must be VPN Advisor: ${path.relative(root, file)}`);
  }
}

const englishMessages = fs.readFileSync(path.join(root, "messages", "en.json"), "utf8");
for (const required of [
  "VPN Advisor does not calculate a composite provider score",
  "Revenue may come from Google AdSense and eligible affiliate links",
  "no VPN Advisor laboratory result",
]) {
  if (!englishMessages.includes(required)) {
    failures.push(`Missing source-positioning guard text: ${required}`);
  }
}

if (failures.length) {
  console.error("Source-positioning audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Source-positioning audit passed: ${englishBlogFiles.length} English articles and active publishing surfaces checked.`);
