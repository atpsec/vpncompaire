import { getIndexableBlogPosts } from "@/lib/blog";
import { getDetailedProviderProducts } from "@/data/provider-catalog";
import { CONTENT_REGISTRY } from "@/lib/i18n-paths";
import { siteConfig } from "@/lib/site";
import {
  getResearchProviders,
  getResearchSources,
  getQuestionEvidence,
  getResearchChanges,
  RESEARCH_QUESTIONS,
  researchEdition,
} from "@/data/research";

export const revalidate = 3600;

// Only pages changed in the current editorial release use this date. Keeping
// lastmod explicit avoids telling crawlers that every URL changed on every
// request while still making the latest release discoverable.
const CURRENT_EDITORIAL_RELEASE = "2026-09-17";

// These pages remain useful navigational/legal destinations, but their route
// metadata deliberately says noindex. Keeping them out of the sitemap avoids
// the Search Console "submitted URL marked noindex" warning.
const NON_INDEXABLE_GUIDE_SLUGS = new Set(["is-vpn-legal-in-turkey"]);
const COMPARISON_SLUGS = [
  "nordvpn-vs-surfshark",
  "expressvpn-vs-nordvpn",
  "proton-vs-mullvad",
  "opera-vpn-vs-proton-vpn",
] as const;

const staticEntries = [
  ["/", 1, "daily", CURRENT_EDITORIAL_RELEASE],
  ["/guide", 0.85, "weekly", CURRENT_EDITORIAL_RELEASE],
  ["/blog", 0.85, "daily", CURRENT_EDITORIAL_RELEASE],
  ["/comparison", 0.88, "weekly", CURRENT_EDITORIAL_RELEASE],
  ["/vpn-reviews", 0.86, "weekly", CURRENT_EDITORIAL_RELEASE],
  ["/best-vpn", 0.78, "weekly", CURRENT_EDITORIAL_RELEASE],
  ["/tools", 0.7, "monthly", CURRENT_EDITORIAL_RELEASE],
  ["/ai", 0.72, "weekly", CURRENT_EDITORIAL_RELEASE],
  ["/methodology", 0.75, "monthly", researchEdition()],
  ["/research", 0.9, "weekly", researchEdition()],
  ["/research/evidence-ledger", 0.85, "weekly", CURRENT_EDITORIAL_RELEASE],
  ["/research/transparency-index", 0.88, "monthly", CURRENT_EDITORIAL_RELEASE],
  ["/research/providers", 0.86, "weekly", researchEdition()],
  ["/research/questions", 0.86, "weekly", researchEdition()],
  ["/research/sources", 0.72, "monthly", researchEdition()],
  ["/research/ai-citation-watch", 0.78, "monthly", "2026-09-21"],
  // The change log is intentionally omitted while it has no published
  // entries; an empty indexable page is not a useful search destination.
  ["/about", 0.5, "monthly", "2026-08-31"],
] as const;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(
  path: string,
  priority: number,
  changefreq: string,
  lastmod?: string,
): string {
  const loc = `${siteConfig.url.replace(/\/$/, "")}${path}`;
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>${
    lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : ""
  }\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(
    2,
  )}</priority>\n  </url>`;
}

export async function GET() {
  const posts = await getIndexableBlogPosts("en");
  const paths = new Map<string, string>();

  const add = (path: string, priority: number, changefreq: string, lastmod?: string) => {
    if (!paths.has(path)) paths.set(path, urlEntry(path, priority, changefreq, lastmod));
  };

  for (const [path, priority, changefreq, lastmod] of staticEntries) {
    add(path, priority, changefreq, lastmod);
  }

  for (const entry of Object.values(CONTENT_REGISTRY)) {
    const translation = entry.translations.en;
    if (!translation || translation.section !== "guide") continue;
    if (NON_INDEXABLE_GUIDE_SLUGS.has(translation.slug)) continue;
    const root = "guide";
    add(
      `/${root}/${translation.slug}`,
      0.75,
      "monthly",
      "2026-08-24",
    );
  }

  for (const product of getDetailedProviderProducts("en")) {
    add(`/reviews/${product.slug}`, 0.76, "monthly", product.pricingVerifiedAt || CURRENT_EDITORIAL_RELEASE);
  }

  for (const slug of COMPARISON_SLUGS) {
    add(`/comparison/${slug}`, 0.78, "monthly", CURRENT_EDITORIAL_RELEASE);
  }

  for (const post of posts) {
    add(`/blog/${post.slug}`, 0.7, "monthly", post.updatedAt);
  }

  for (const provider of getResearchProviders()) {
    add(`/research/providers/${provider.slug}`, 0.82, "monthly", provider.updatedAt);
  }

  for (const question of RESEARCH_QUESTIONS) {
    if (!getQuestionEvidence(question).some((item) => item.value !== null)) continue;
    add(`/research/questions/${question.slug}`, 0.8, "monthly", researchEdition());
  }

  if (getResearchChanges().some((change) => change.status === "published")) {
    add("/research/changes", 0.7, "weekly", researchEdition());
  }

  for (const source of getResearchSources()) {
    add(`/research/sources/${source.id}`, 0.55, "monthly", source.lastChecked ?? researchEdition());
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(
    paths.values(),
  ).join("\n")}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Keep sitemap changes discoverable shortly after a content or domain
      // update while still allowing a short shared-cache lifetime.
      "Cache-Control": "public, max-age=0, s-maxage=600, must-revalidate",
    },
  });
}
