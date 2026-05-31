import { siteConfig } from "@/lib/site";
import { products } from "@/data/products";
import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

const comparisonSlugs = [
  "nordvpn-vs-surfshark",
  "expressvpn-vs-nordvpn",
  "proton-vs-mullvad",
];

const useCaseSlugs = [
  "gizlilik",
  "streaming",
  "oyun",
  "seyahat",
  "turkiye",
  "yurt-disindaki-turkler",
];

const deviceSlugs = ["android", "iphone", "ipad", "smart-tv"];

const guideSlugs = [
  "vpn-nedir",
  "ucretsiz-vs-ucretli-vpn",
  "vpn-guvenlik-kontrol-listesi",
  "turkiye-de-vpn-yasal-mi",
  "ogrenciler-icin-vpn",
  "yurt-disindaki-turkler-icin-vpn",
  "aile-ve-cocuklar-icin-vpn",
  "uzaktan-calisanlar-icin-vpn",
  "yaslilar-icin-vpn",
  "gamerlar-icin-vpn",
];

const toolPaths = [
  { path: "/sana-uygun-vpn", priority: 0.9, changefreq: "weekly" },
  { path: "/hesaplayici", priority: 0.85, changefreq: "weekly" },
  { path: "/sunucu-haritasi", priority: 0.8, changefreq: "weekly" },
  { path: "/sozluk", priority: 0.7, changefreq: "monthly" },
  { path: "/iptal-ve-iade", priority: 0.8, changefreq: "monthly" },
  { path: "/guvenlik-araclari", priority: 0.75, changefreq: "monthly" },
];

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  type Entry = { path: string; priority: number; changefreq: string };

  const staticPaths: Entry[] = [
    { path: "/", priority: 1.0, changefreq: "daily" },
    { path: "/en-iyi-vpn", priority: 0.95, changefreq: "weekly" },
    { path: "/en-iyi", priority: 0.8, changefreq: "weekly" },
    { path: "/karsilastir", priority: 0.85, changefreq: "weekly" },
    { path: "/cihazlar", priority: 0.8, changefreq: "weekly" },
    { path: "/rehber", priority: 0.8, changefreq: "weekly" },
    { path: "/blog", priority: 0.85, changefreq: "daily" },
    { path: "/metodoloji", priority: 0.8, changefreq: "monthly" },
    { path: "/hakkimizda", priority: 0.5, changefreq: "monthly" },
    { path: "/iletisim", priority: 0.4, changefreq: "yearly" },
    { path: "/reklam-aciklamasi", priority: 0.5, changefreq: "monthly" },
    { path: "/yasal-uyari", priority: 0.5, changefreq: "monthly" },
    { path: "/gizlilik", priority: 0.4, changefreq: "yearly" },
    { path: "/sartlar", priority: 0.4, changefreq: "yearly" },
  ];

  const reviewPaths: Entry[] = products.map((p) => ({
    path: `/inceleme/${p.slug}`,
    priority: 0.85,
    changefreq: "weekly",
  }));

  const comparisonPaths: Entry[] = comparisonSlugs.map((slug) => ({
    path: `/karsilastir/${slug}`,
    priority: 0.8,
    changefreq: "weekly",
  }));

  const useCasePaths: Entry[] = useCaseSlugs.map((slug) => ({
    path: `/en-iyi/${slug}`,
    priority: 0.8,
    changefreq: "weekly",
  }));

  const devicePaths: Entry[] = deviceSlugs.map((slug) => ({
    path: `/cihazlar/${slug}`,
    priority: 0.8,
    changefreq: "monthly",
  }));

  const guidePaths: Entry[] = guideSlugs.map((slug) => ({
    path: `/rehber/${slug}`,
    priority: 0.75,
    changefreq: "monthly",
  }));

  const all: Entry[] = [
    ...staticPaths,
    ...reviewPaths,
    ...comparisonPaths,
    ...useCasePaths,
    ...devicePaths,
    ...guidePaths,
    ...toolPaths,
  ];

  // Build hreflang alternates per URL. TR is default (no prefix); EN at /en
  function altLinks(path: string): string {
    const trUrl = `${siteConfig.url}${path}`;
    const enUrl = `${siteConfig.url}/en${path === "/" ? "" : path}`;
    return `    <xhtml:link rel="alternate" hreflang="tr" href="${trUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${trUrl}"/>`;
  }

  // Blog posts: TR/EN slugs differ, paired via slug-counterpart lookup.
  const [trPosts, enPosts] = await Promise.all([
    getBlogPosts("tr"),
    getBlogPosts("en"),
  ]);

  const sharedPathsXml = all
    .flatMap((u) => {
      const trUrl = `${siteConfig.url}${u.path}`;
      const enUrl = `${siteConfig.url}/en${u.path === "/" ? "" : u.path}`;
      return [
        `  <url>
    <loc>${trUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(2)}</priority>
${altLinks(u.path)}
  </url>`,
        `  <url>
    <loc>${enUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${(u.priority * 0.9).toFixed(2)}</priority>
${altLinks(u.path)}
  </url>`,
      ];
    })
    .join("\n");

  function blogAltLinks(trSlug: string | null, enSlug: string | null): string {
    const lines: string[] = [];
    if (trSlug) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="tr" href="${siteConfig.url}/blog/${trSlug}"/>`);
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${siteConfig.url}/blog/${trSlug}"/>`);
    }
    if (enSlug) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}/en/blog/${enSlug}"/>`);
    }
    return lines.join("\n");
  }

  const blogXml = [
    ...trPosts.map((p) => {
      const counterpart = enPosts.find((e) =>
        e.title.toLowerCase().replace(/\s+/g, "") ===
        p.title.toLowerCase().replace(/\s+/g, "")
      );
      const enSlug = counterpart?.slug ?? null;
      return `  <url>
    <loc>${siteConfig.url}/blog/${p.slug}</loc>
    <lastmod>${p.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
${blogAltLinks(p.slug, enSlug)}
  </url>`;
    }),
    ...enPosts.map((p) => {
      const counterpart = trPosts.find((t) =>
        t.title.toLowerCase().replace(/\s+/g, "") ===
        p.title.toLowerCase().replace(/\s+/g, "")
      );
      const trSlug = counterpart?.slug ?? null;
      return `  <url>
    <loc>${siteConfig.url}/en/blog/${p.slug}</loc>
    <lastmod>${p.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>
${blogAltLinks(trSlug, p.slug)}
  </url>`;
    }),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sharedPathsXml}
${blogXml}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
