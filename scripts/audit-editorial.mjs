import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentDir = path.join(root, "src", "content", "blog", "en");
const registryPath = path.join(root, "src", "data", "blog-references.ts");

function countEditorialWords(content) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~|=\-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

const registrySource = fs.readFileSync(registryPath, "utf8");
const mappingSource = registrySource
  .split("const articleReferenceIds:")[1]
  ?.split("\n};")[0];

if (!mappingSource) {
  throw new Error("Could not locate articleReferenceIds in blog reference registry.");
}

const mappedCounts = new Map();
for (const match of mappingSource.matchAll(/^\s*"([^"]+)":\s*\[([^\]]*)\],?$/gm)) {
  const count = [...match[2].matchAll(/"[^"]+"/g)].length;
  mappedCounts.set(match[1], count);
}

const indexablePosts = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => {
    const source = fs.readFileSync(path.join(contentDir, file), "utf8");
    const { data, content } = matter(source);
    const wordCount = countEditorialWords(content);
    const indexable =
      data.indexing === "index" ||
      (data.indexing !== "noindex" && wordCount >= 500);
    return { file, slug: data.slug, source, wordCount, indexable };
  })
  .filter((post) => post.indexable);

const missingReferences = indexablePosts.filter(
  (post) => (mappedCounts.get(post.slug) ?? 0) < 2,
);

const riskyPatterns = [
  /VPN almost completely eliminates all risks/i,
  /as secure as at home/i,
  /libraries differ 5-10x/i,
  /which providers Netflix doesn't block/i,
  /Argentina[^.\n]{0,80}(?:is|remains)[^.\n]{0,40}peso-denominated/i,
  /Turkey[^.\n]{0,80}(?:is|remains)[^.\n]{0,40}lira-denominated/i,
  /Claude completely banned in Turkey/i,
  /VPN typically solves/i,
];

const riskyMatches = indexablePosts.flatMap((post) =>
  riskyPatterns
    .filter((pattern) => pattern.test(post.source))
    .map((pattern) => `${post.file}: ${pattern}`),
);

if (missingReferences.length > 0 || riskyMatches.length > 0) {
  if (missingReferences.length > 0) {
    console.error("Indexable articles missing at least two primary references:");
    for (const post of missingReferences) {
      console.error(`- ${post.slug} (${mappedCounts.get(post.slug) ?? 0})`);
    }
  }
  if (riskyMatches.length > 0) {
    console.error("Risky or stale claims detected:");
    for (const match of riskyMatches) console.error(`- ${match}`);
  }
  process.exit(1);
}

console.log(
  `Editorial audit passed: ${indexablePosts.length} indexable English articles have at least two visible primary references.`,
);
