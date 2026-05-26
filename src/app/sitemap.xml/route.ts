import { siteConfig } from "@/lib/site";
import { products } from "@/data/products";

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
];

export function GET() {
  const today = new Date().toISOString().split("T")[0];

  type Entry = { path: string; priority: number; changefreq: string };

  const staticPaths: Entry[] = [
    { path: "/", priority: 1.0, changefreq: "daily" },
    { path: "/en-iyi-vpn", priority: 0.95, changefreq: "weekly" },
    { path: "/en-iyi", priority: 0.8, changefreq: "weekly" },
    { path: "/karsilastir", priority: 0.85, changefreq: "weekly" },
    { path: "/cihazlar", priority: 0.8, changefreq: "weekly" },
    { path: "/rehber", priority: 0.8, changefreq: "weekly" },
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

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (u) => `  <url>
    <loc>${siteConfig.url}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(2)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
