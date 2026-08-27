import { products } from "@/data/products";
import { getBlogPosts } from "@/lib/blog";
import { CONTENT_REGISTRY } from "@/lib/i18n-paths";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

const staticEntries = [
  ["/", 1, "daily"],
  ["/vpn-reviews", 0.95, "weekly"],
  ["/best-vpn", 0.85, "weekly"],
  ["/comparison", 0.9, "weekly"],
  ["/guide", 0.85, "weekly"],
  ["/blog", 0.85, "daily"],
  ["/ai", 0.9, "weekly"],
  ["/devices", 0.8, "weekly"],
  ["/tools", 0.8, "weekly"],
  ["/methodology", 0.75, "monthly"],
  ["/research", 0.9, "weekly"],
  ["/about", 0.5, "monthly"],
  ["/contact", 0.4, "yearly"],
  ["/affiliate-disclosure", 0.5, "monthly"],
  ["/legal-notice", 0.5, "monthly"],
  ["/privacy-policy", 0.4, "yearly"],
  ["/terms", 0.4, "yearly"],
  ["/cookie-policy", 0.4, "yearly"],
  ["/refund-policy", 0.4, "monthly"],
  ["/calculator", 0.7, "monthly"],
  ["/server-map", 0.7, "monthly"],
  ["/glossary", 0.65, "monthly"],
  ["/security-tools", 0.75, "monthly"],
] as const;

const useCaseEntries = [
  "privacy",
  "streaming",
  "gaming",
  "travel",
  "turkey",
  "turks-abroad",
] as const;

const deviceEntries = ["android", "iphone", "ipad", "smart-tv"] as const;

const toolEntries = [
  ["/tools/email-security-check", 0.7, "monthly"],
  ["/tools/my-ip", 0.65, "monthly"],
  ["/tools/dns-leak-test", 0.65, "monthly"],
  ["/tools/webrtc-leak-test", 0.65, "monthly"],
  ["/tools/vpn-speed-test", 0.65, "monthly"],
  ["/vpn-test", 0.7, "monthly"],
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

  for (const [path, priority, changefreq] of staticEntries) {
    add(path, priority, changefreq);
  }

  for (const product of products) {
    add(`/reviews/${product.slug}`, 0.82, "weekly", product.pricingVerifiedAt || undefined);
  }

  for (const slug of useCaseEntries) {
    add(`/best-vpn/${slug}`, 0.8, "weekly");
  }

  for (const slug of deviceEntries) {
    add(`/devices/${slug}`, 0.75, "monthly");
  }

  for (const [path, priority, changefreq] of toolEntries) {
    add(path, priority, changefreq);
  }

  for (const entry of Object.values(CONTENT_REGISTRY)) {
    const translation = entry.translations.en;
    if (!translation || entry.id === "is-vpn-legal-in-turkey") continue;
    const root = translation.section === "guide" ? "guide" : "comparison";
    add(`/${root}/${translation.slug}`, root === "comparison" ? 0.8 : 0.75, "monthly");
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
