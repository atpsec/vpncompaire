import { siteConfig } from "@/lib/site";
import { products } from "@/data/products";
import { getBlogPosts } from "@/lib/blog";
import {
  getBlogSlugEntry,
  slugForLocale,
  type BlogLocale,
  type BlogSlugEntry,
} from "@/lib/blog-slugs";
import {
  CONTENT_REGISTRY,
  SECTION_HUB_SERVED,
  availableLocales,
  getLocalizedPath,
  getLocalizedSectionPath,
  DEFAULT_LOCALE,
  type AppLocale,
  type SectionKey,
} from "@/lib/i18n-paths";

export const revalidate = 3600;

const useCaseSlugs = [
  "gizlilik",
  "streaming",
  "oyun",
  "seyahat",
  "turkiye",
  "yurt-disindaki-turkler",
];

const deviceSlugs = ["android", "iphone", "ipad", "smart-tv"];

const toolPaths = [
  { path: "/araclar", priority: 0.85, changefreq: "weekly" },
  { path: "/araclar/email-guvenlik-kontrolu", priority: 0.82, changefreq: "monthly" },
  { path: "/vpn-test", priority: 0.8, changefreq: "monthly" },
  { path: "/araclar/ip-adresim", priority: 0.7, changefreq: "monthly" },
  { path: "/araclar/dns-leak-test", priority: 0.7, changefreq: "monthly" },
  { path: "/araclar/webrtc-leak-test", priority: 0.7, changefreq: "monthly" },
  { path: "/araclar/vpn-hiz-testi", priority: 0.7, changefreq: "monthly" },
  { path: "/sana-uygun-vpn", priority: 0.9, changefreq: "weekly" },
  { path: "/hesaplayici", priority: 0.85, changefreq: "weekly" },
  { path: "/sunucu-haritasi", priority: 0.8, changefreq: "weekly" },
  { path: "/sozluk", priority: 0.7, changefreq: "monthly" },
  { path: "/iptal-ve-iade", priority: 0.8, changefreq: "monthly" },
  { path: "/guvenlik-araclari", priority: 0.75, changefreq: "monthly" },
];

export async function GET() {
  const allLocales = siteConfig.locales as readonly BlogLocale[];
  const trOnly: BlogLocale[] = ["tr"];

  type Entry = {
    path: string;
    priority: number;
    changefreq: string;
    locales?: BlogLocale[];
  };

  const staticPaths: Entry[] = [
    { path: "/", priority: 1.0, changefreq: "daily" },
    { path: "/en-iyi-vpn", priority: 0.95, changefreq: "weekly" },
    { path: "/en-iyi", priority: 0.8, changefreq: "weekly" },
    { path: "/cihazlar", priority: 0.8, changefreq: "weekly" },
    { path: "/blog", priority: 0.85, changefreq: "daily" },
    { path: "/metodoloji", priority: 0.8, changefreq: "monthly" },
    { path: "/hakkimizda", priority: 0.5, changefreq: "monthly" },
    { path: "/iletisim", priority: 0.4, changefreq: "yearly" },
    { path: "/reklam-aciklamasi", priority: 0.5, changefreq: "monthly" },
    { path: "/yasal-uyari", priority: 0.5, changefreq: "monthly" },
    { path: "/gizlilik", priority: 0.4, changefreq: "yearly" },
    { path: "/sartlar", priority: 0.4, changefreq: "yearly" },
    { path: "/cerez-politikasi", priority: 0.4, changefreq: "yearly" },
  ];

  const reviewPaths: Entry[] = products.map((p) => ({
    path: `/inceleme/${p.slug}`,
    priority: 0.85,
    changefreq: "weekly",
  }));

  const trOnlyUseCases = new Set(["turkiye", "yurt-disindaki-turkler"]);
  const useCasePaths: Entry[] = useCaseSlugs.map((slug) => ({
    path: `/en-iyi/${slug}`,
    priority: 0.8,
    changefreq: "weekly",
    locales: trOnlyUseCases.has(slug) ? trOnly : undefined,
  }));

  const devicePaths: Entry[] = deviceSlugs.map((slug) => ({
    path: `/cihazlar/${slug}`,
    priority: 0.8,
    changefreq: "monthly",
  }));

  const all: Entry[] = [
    ...staticPaths,
    ...reviewPaths,
    ...useCasePaths,
    ...devicePaths,
    ...toolPaths,
  ];

  function localizedUrl(path: string, locale: BlogLocale): string {
    const prefix = locale === siteConfig.defaultLocale ? "" : `/${locale}`;
    const normalized = path === "/" ? "" : path;
    return `${siteConfig.url}${prefix}${normalized}`;
  }

  function altLinks(path: string, pathLocales: readonly BlogLocale[]): string {
    const lines = pathLocales.map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${localizedUrl(path, locale)}"/>`,
    );
    const xDefault = pathLocales.includes(siteConfig.defaultLocale)
      ? siteConfig.defaultLocale
      : pathLocales[0];
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(path, xDefault)}"/>`,
    );
    return lines.join("\n");
  }

  const [trPosts, enPosts, dePosts] = await Promise.all([
    getBlogPosts("tr"),
    getBlogPosts("en"),
    getBlogPosts("de"),
  ]);

  // Do not emit a synthetic lastmod for evergreen/static routes. Search engines
  // should only receive lastmod when we have a real content modification date.
  const sharedPathsXml = all
    .flatMap((u) => {
      const pathLocales = u.locales ?? allLocales;
      return pathLocales.map((locale) => {
        const priority =
          locale === siteConfig.defaultLocale ? u.priority : u.priority * 0.9;
        return `  <url>
    <loc>${localizedUrl(u.path, locale)}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${priority.toFixed(2)}</priority>
${altLinks(u.path, pathLocales)}
  </url>`;
      });
    })
    .join("\n");

  function localizedGroupXml(
    urlFor: (locale: AppLocale) => string,
    locales: readonly AppLocale[],
    priority: number,
    changefreq: string,
  ): string[] {
    const alt = [
      ...locales.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l)}"/>`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(
        locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0],
      )}"/>`,
    ].join("\n");
    return locales.map((locale) => {
      const p = locale === DEFAULT_LOCALE ? priority : priority * 0.9;
      return `  <url>
    <loc>${urlFor(locale)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${p.toFixed(2)}</priority>
${alt}
  </url>`;
    });
  }

  const hubGroups: { section: SectionKey; priority: number; changefreq: string }[] = [
    { section: "guide", priority: 0.8, changefreq: "weekly" },
    { section: "comparison", priority: 0.85, changefreq: "weekly" },
  ];

  const localizedXml = [
    ...hubGroups.flatMap((g) =>
      localizedGroupXml(
        (l) => `${siteConfig.url}${getLocalizedSectionPath(l, g.section)}`,
        SECTION_HUB_SERVED[g.section] ?? [DEFAULT_LOCALE],
        g.priority,
        g.changefreq,
      ),
    ),
    ...Object.values(CONTENT_REGISTRY).flatMap((entry) => {
      const served = availableLocales(entry.id);
      const section = entry.translations[DEFAULT_LOCALE]?.section;
      if (!section || served.length === 0) return [];
      const meta =
        section === "comparison"
          ? { priority: 0.8, changefreq: "weekly" }
          : { priority: 0.75, changefreq: "monthly" };
      return localizedGroupXml(
        (l) =>
          `${siteConfig.url}${getLocalizedPath({ locale: l, section, contentId: entry.id })}`,
        served,
        meta.priority,
        meta.changefreq,
      );
    }),
  ].join("\n");

  function blogUrl(entry: BlogSlugEntry, locale: BlogLocale): string {
    return localizedUrl(`/blog/${slugForLocale(entry, locale)}`, locale);
  }

  function blogAltLinks(
    entry: BlogSlugEntry | null,
    self: { slug: string; locale: BlogLocale },
  ): string {
    if (!entry) {
      const selfUrl = localizedUrl(`/blog/${self.slug}`, self.locale);
      return [
        `    <xhtml:link rel="alternate" hreflang="${self.locale}" href="${selfUrl}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${selfUrl}"/>`,
      ].join("\n");
    }
    const lines = allLocales.map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${blogUrl(entry, locale)}"/>`,
    );
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${blogUrl(entry, siteConfig.defaultLocale)}"/>`,
    );
    return lines.join("\n");
  }

  const blogXml = [
    ...trPosts.map((p) => {
      const entry = getBlogSlugEntry(p.slug, "tr");
      return `  <url>
    <loc>${siteConfig.url}/blog/${p.slug}</loc>
    <lastmod>${p.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
${blogAltLinks(entry, { slug: p.slug, locale: "tr" })}
  </url>`;
    }),
    ...enPosts.map((p) => {
      const entry = getBlogSlugEntry(p.slug, "en");
      return `  <url>
    <loc>${siteConfig.url}/en/blog/${p.slug}</loc>
    <lastmod>${p.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>
${blogAltLinks(entry, { slug: p.slug, locale: "en" })}
  </url>`;
    }),
    ...dePosts.map((p) => {
      const entry = getBlogSlugEntry(p.slug, "de");
      return `  <url>
    <loc>${siteConfig.url}/de/blog/${p.slug}</loc>
    <lastmod>${p.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>
${blogAltLinks(entry, { slug: p.slug, locale: "de" })}
  </url>`;
    }),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sharedPathsXml}
${localizedXml}
${blogXml}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
