import { products } from "@/data/products";
import { getBlogPosts } from "@/lib/blog";
import { CONTENT_REGISTRY } from "@/lib/i18n-paths";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

const staticEntries = [
  ["/", 1, "daily", "2026-08-27"],
  ["/vpn-reviews", 0.95, "weekly", "2026-08-27"],
  ["/best-vpn", 0.85, "weekly", "2026-08-24"],
  ["/comparison", 0.9, "weekly", "2026-08-27"],
  ["/guide", 0.85, "weekly", "2026-08-27"],
  ["/blog", 0.85, "daily", "2026-08-27"],
  ["/ai", 0.9, "weekly", "2026-08-27"],
  ["/devices", 0.8, "weekly", "2026-08-24"],
  ["/tools", 0.8, "weekly", "2026-08-27"],
  ["/methodology", 0.75, "monthly", "2026-08-24"],
  ["/research", 0.9, "weekly", "2026-08-27"],
  ["/research/evidence-ledger", 0.85, "weekly", "2026-08-28"],
  ["/about", 0.5, "monthly", "2026-08-24"],
  ["/contact", 0.4, "yearly", "2026-08-24"],
  ["/affiliate-disclosure", 0.5, "monthly", "2026-08-24"],
  ["/legal-notice", 0.5, "monthly", "2026-08-24"],
  ["/privacy-policy", 0.4, "yearly", "2026-08-27"],
  ["/terms", 0.4, "yearly", "2026-08-24"],
  ["/cookie-policy", 0.4, "yearly", "2026-08-24"],
  ["/refund-policy", 0.4, "monthly", "2026-08-24"],
  ["/calculator", 0.7, "monthly", "2026-08-24"],
  ["/server-map", 0.7, "monthly", "2026-08-24"],
  ["/glossary", 0.65, "monthly", "2026-08-24"],
  ["/security-tools", 0.75, "monthly", "2026-08-24"],
] as const;

const useCaseEntries = [
  ["privacy", "2026-08-27"],
  ["streaming", "2026-08-27"],
  ["gaming", "2026-08-27"],
  ["travel", "2026-08-27"],
  ["turkey", "2026-08-27"],
  ["turks-abroad", "2026-08-27"],
] as const;

const deviceEntries = ["android", "iphone", "ipad", "smart-tv"] as const;

const toolEntries = [
  ["/tools/email-security-check", 0.7, "monthly", "2026-08-27"],
  ["/tools/my-ip", 0.65, "monthly", "2026-08-27"],
  ["/tools/dns-leak-test", 0.65, "monthly", "2026-08-27"],
  ["/tools/webrtc-leak-test", 0.65, "monthly", "2026-08-27"],
  ["/tools/vpn-speed-test", 0.65, "monthly", "2026-08-27"],
  ["/tools/what-websites-can-see", 0.8, "monthly", "2026-08-28"],
  ["/vpn-test", 0.7, "monthly", "2026-08-27"],
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
  const posts = await getBlogPosts("en");
  const paths = new Map<string, string>();

  const add = (path: string, priority: number, changefreq: string, lastmod?: string) => {
    if (!paths.has(path)) paths.set(path, urlEntry(path, priority, changefreq, lastmod));
  };

  for (const [path, priority, changefreq, lastmod] of staticEntries) {
    add(path, priority, changefreq, lastmod);
  }

  for (const product of products) {
    add(
      `/reviews/${product.slug}`,
      0.82,
      "weekly",
      product.pricingVerifiedAt || "2026-08-27",
    );
  }

  for (const [slug, lastmod] of useCaseEntries) {
    add(`/best-vpn/${slug}`, 0.8, "weekly", lastmod);
  }

  for (const slug of deviceEntries) {
    add(`/devices/${slug}`, 0.75, "monthly", "2026-08-24");
  }

  for (const [path, priority, changefreq, lastmod] of toolEntries) {
    add(path, priority, changefreq, lastmod);
  }

  for (const entry of Object.values(CONTENT_REGISTRY)) {
    const translation = entry.translations.en;
    if (!translation || entry.id === "is-vpn-legal-in-turkey") continue;
    const root = translation.section === "guide" ? "guide" : "comparison";
    add(
      `/${root}/${translation.slug}`,
      root === "comparison" ? 0.8 : 0.75,
      "monthly",
      root === "comparison" ? "2026-08-27" : "2026-08-24",
    );
  }

  for (const post of posts.filter((post) => post.indexable)) {
    add(`/blog/${post.slug}`, 0.7, "monthly", post.updatedAt);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(
    paths.values(),
  ).join("\n")}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
