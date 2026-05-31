import { getBlogPosts } from "./blog";

export type BlogStats = {
  totalPosts: number;
  postsByLocale: { tr: number; en: number };
  categories: Array<{ name: string; count: number }>;
  tags: Array<{ name: string; count: number }>;
  avgReadingTime: number;
  latestUpdate: string;
};

export type CategoryStat = {
  name: string;
  count: number;
};

export type TagStat = {
  name: string;
  count: number;
};

export async function getBlogStats(locale: "tr" | "en"): Promise<BlogStats> {
  const posts = await getBlogPosts(locale);

  const categoryMap = new Map<string, number>();
  const tagMap = new Map<string, number>();
  let totalReadingTime = 0;
  let latestDate = new Date(0);

  for (const post of posts) {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);

    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }

    totalReadingTime += post.readingTime;

    const updatedDate = new Date(post.updatedAt);
    if (updatedDate > latestDate) {
      latestDate = updatedDate;
    }
  }

  const categories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const tags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const trPosts = await getBlogPosts("tr");
  const enPosts = await getBlogPosts("en");

  return {
    totalPosts: posts.length,
    postsByLocale: {
      tr: trPosts.length,
      en: enPosts.length,
    },
    categories,
    tags,
    avgReadingTime: Math.round(totalReadingTime / posts.length),
    latestUpdate: latestDate.toISOString().split("T")[0],
  };
}

export async function getCategoryStats(locale: "tr" | "en"): Promise<CategoryStat[]> {
  const stats = await getBlogStats(locale);
  return stats.categories;
}

export async function getTagStats(locale: "tr" | "en"): Promise<TagStat[]> {
  const stats = await getBlogStats(locale);
  return stats.tags;
}
