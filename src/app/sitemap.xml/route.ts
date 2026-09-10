import { getIndexableBlogPosts } from "@/lib/blog";
import { CONTENT_REGISTRY } from "@/lib/i18n-paths";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

// Only pages changed in the current editorial release use this date. Keeping
// lastmod explicit avoids telling crawlers that every URL changed on every
// request while still making the latest release discoverable.
const CURRENT_EDITORIAL_RELEASE = "2026-09-06";

const staticEntries = [
  ["/", 1, "daily", CURRENT_EDITORIAL_RELEASE],
  ["/guide", 0.85, "weekly", CURRENT_EDITORIAL_RELEASE],
  ["/blog", 0.85, "daily", CURRENT_EDITORIAL_RELEASE],
  ["/methodology", 0.75, "monthly", "2026-08-31"],
  ["/research", 0.9, "weekly", "2026-08-31"],
  ["/research/evidence-ledger", 0.85, "weekly", CURRENT_EDITORIAL_RELEASE],
  ["/research/transparency-index", 0.88, "monthly", CURRENT_EDITORIAL_RELEASE],
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
    const root = "guide";
    add(
      `/${root}/${translation.slug}`,
      0.75,
      "monthly",
      "2026-08-24",
    );
  }

  for (const post of posts) {
    add(`/blog/${post.slug}`, 0.7, "monthly", post.updatedAt);
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
