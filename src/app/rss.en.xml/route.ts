import { siteConfig } from "@/lib/site";
import { getBlogPosts } from "@/lib/blog";
import { generateRssFeed, type RssItem } from "@/lib/rss";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const posts = await getBlogPosts("en");

  const items: RssItem[] = posts.slice(0, 50).map((p) => {
    const url = `${siteConfig.url}/en/blog/${p.slug}`;
    return {
      title: p.title,
      link: url,
      guid: url,
      description: p.description,
      pubDate: new Date(p.publishedAt),
      author: p.author,
      categories: [p.category, ...(p.tags ?? [])].filter(Boolean),
    };
  });

  const xml = generateRssFeed({
    title: `${siteConfig.name} — Blog (EN)`,
    description: siteConfig.description.en,
    link: `${siteConfig.url}/en/blog`,
    feedUrl: `${siteConfig.url}/rss.en.xml`,
    language: "en-US",
    items,
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
