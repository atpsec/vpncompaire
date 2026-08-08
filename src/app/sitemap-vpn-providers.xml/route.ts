import { siteConfig } from "@/lib/site";
import { referenceProducts } from "@/data/products-reference-localized";

export const revalidate = 3600;

export function GET() {
  const urls = referenceProducts.flatMap((product) =>
    siteConfig.locales.map((locale) => {
      const prefix = locale === siteConfig.defaultLocale ? "" : `/${locale}`;
      const loc = `${siteConfig.url}${prefix}/inceleme/${product.slug}`;
      const alternates = siteConfig.locales
        .map((alt) => {
          const altPrefix = alt === siteConfig.defaultLocale ? "" : `/${alt}`;
          return `    <xhtml:link rel="alternate" hreflang="${alt}" href="${siteConfig.url}${altPrefix}/inceleme/${product.slug}"/>`;
        })
        .concat(
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteConfig.url}/inceleme/${product.slug}"/>`,
        )
        .join("\n");

      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.65</priority>\n${alternates}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
