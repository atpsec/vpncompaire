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
const blogSource = fs.readFileSync(path.join(root, "src", "lib", "blog.ts"), "utf8");
const mappingSource = registrySource
  .split("const articleReferenceIds:")[1]
  ?.split("\n};")[0];

if (!mappingSource) {
  throw new Error("Could not locate articleReferenceIds in blog reference registry.");
}

const publishableSource = blogSource.match(
  /PUBLISHABLE_BLOG_SLUGS\s*=\s*new Set\(\[([\s\S]*?)\]\)/,
)?.[1];
if (!publishableSource) {
  throw new Error("Could not locate PUBLISHABLE_BLOG_SLUGS in blog publishing controls.");
}
const publishableSlugs = new Set(
  [...publishableSource.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
);

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
    const thresholdEligible =
      data.indexing === "index" ||
      (data.indexing !== "noindex" && wordCount >= 500);
    return {
      file,
      slug: data.slug,
      source,
      wordCount,
      indexable: publishableSlugs.has(data.slug) && thresholdEligible,
      thresholdEligible,
    };
  })
  .filter((post) => post.indexable);

const availableSlugs = new Set(
  fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => matter(fs.readFileSync(path.join(contentDir, file), "utf8")).data.slug),
);
const missingPublishableFiles = [...publishableSlugs].filter(
  (slug) => !availableSlugs.has(slug),
);
const publishableWithoutReferences = [...publishableSlugs].filter(
  (slug) => (mappedCounts.get(slug) ?? 0) < 2,
);

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

const commercialSurfaces = [
  "src/app/[locale]/inceleme/[slug]/page.tsx",
  "src/app/[locale]/iptal-ve-iade/_body.tsx",
  "src/components/audience/audience-picks.tsx",
  "src/components/comparison/comparison-page.tsx",
  "src/components/comparison/factual-comparison.tsx",
  "src/components/device/device-page.tsx",
  "src/components/filter/feature-filter.tsx",
  "src/components/home/compare-picker.tsx",
  "src/components/home/popular-provider-discovery.tsx",
  "src/components/home/top-three-podium.tsx",
  "src/components/home/top-vpn-list.tsx",
  "src/components/quiz/vpn-quiz.tsx",
  "src/components/use-case/use-case-page.tsx",
];

const missingInlineDisclosure = commercialSurfaces.filter((relativePath) => {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  return !source.includes("<AffiliateNotice");
});

const englishMessages = fs.readFileSync(path.join(root, "messages", "en.json"), "utf8");
const hasClearCommissionLanguage =
  englishMessages.includes("we may earn a commission") &&
  englishMessages.includes("This does not change our comparison criteria");

if (
  missingReferences.length > 0 ||
  missingPublishableFiles.length > 0 ||
  publishableWithoutReferences.length > 0 ||
  riskyMatches.length > 0 ||
  missingInlineDisclosure.length > 0 ||
  !hasClearCommissionLanguage
) {
  if (missingReferences.length > 0) {
    console.error("Indexable articles missing at least two primary references:");
    for (const post of missingReferences) {
      console.error(`- ${post.slug} (${mappedCounts.get(post.slug) ?? 0})`);
    }
  }
  if (missingPublishableFiles.length > 0) {
    console.error("Curated publishable slugs without an English MDX file:");
    for (const slug of missingPublishableFiles) console.error(`- ${slug}`);
  }
  if (publishableWithoutReferences.length > 0) {
    console.error("Curated publishable articles missing at least two primary references:");
    for (const slug of publishableWithoutReferences) console.error(`- ${slug}`);
  }
  if (riskyMatches.length > 0) {
    console.error("Risky or stale claims detected:");
    for (const match of riskyMatches) console.error(`- ${match}`);
  }
  if (missingInlineDisclosure.length > 0) {
    console.error("Commercial surfaces missing a visible inline affiliate disclosure:");
    for (const relativePath of missingInlineDisclosure) {
      console.error("- " + relativePath);
    }
  }
  if (!hasClearCommissionLanguage) {
    console.error("English affiliate notice must clearly state commission and editorial independence.");
  }
  process.exit(1);
}

console.log(
  `Editorial audit passed: ${indexablePosts.length} curated indexable English articles have at least two visible primary references; ${commercialSurfaces.length} commercial surfaces have inline disclosures.`,
);
