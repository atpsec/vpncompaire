import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/lib/site";

export type BlogPostFrontmatter = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
  coverImage: string;
  unsplashKeyword: string;
};

export type BlogPost = BlogPostFrontmatter & {
  content: string;
};

// Slug eşleme tablosu ve karşılık fonksiyonu Edge-safe `./blog-slugs`
// modülüne taşındı (proxy.ts oradan import ediyor). Mevcut importerlar
// için buradan re-export ediliyor.
export { BLOG_SLUG_MAP, getCounterpartSlug } from "./blog-slugs";

export const getBlogPosts = cache(async function getBlogPosts(
  locale: Locale,
): Promise<BlogPost[]> {
  const dir = path.join(process.cwd(), "src/content/blog", locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const filePath = path.join(dir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);

    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      readingTime: data.readingTime,
      coverImage: data.coverImage,
      unsplashKeyword: data.unsplashKeyword,
      content,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
});

function splitMarkdownContent(content: string): { first: string; second: string } {
  const lines = content.split("\n");
  const headingIndices: number[] = [];
  lines.forEach((line, idx) => {
    if (/^##\s/.test(line)) {
      headingIndices.push(idx);
    }
  });

  if (headingIndices.length < 2) {
    const mid = Math.floor(lines.length / 2);
    return {
      first: lines.slice(0, mid).join("\n"),
      second: lines.slice(mid).join("\n"),
    };
  }

  const targetMid = Math.floor(lines.length / 2);
  const splitIndex = headingIndices.reduce((closest, idx) =>
    Math.abs(idx - targetMid) < Math.abs(closest - targetMid) ? idx : closest
  );

  return {
    first: lines.slice(0, splitIndex).join("\n"),
    second: lines.slice(splitIndex).join("\n"),
  };
}

export const getBlogPost = cache(async function getBlogPost(
  slug: string,
  locale: Locale
): Promise<{
  frontmatter: BlogPostFrontmatter;
  contentParts: { first: React.ReactElement; second: React.ReactElement };
} | null> {
  const filePath = path.join(
    process.cwd(),
    "src/content/blog",
    locale,
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(source);

  const { first, second } = splitMarkdownContent(rawContent);

  const [firstResult, secondResult] = await Promise.all([
    compileMDX({
      source: first,
      options: {
        parseFrontmatter: false,
        mdxOptions: { remarkPlugins: [remarkGfm] },
      },
    }),
    compileMDX({
      source: second,
      options: {
        parseFrontmatter: false,
        mdxOptions: { remarkPlugins: [remarkGfm] },
      },
    }),
  ]);

  return {
    frontmatter: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      readingTime: data.readingTime,
      coverImage: data.coverImage,
      unsplashKeyword: data.unsplashKeyword,
    },
    contentParts: {
      first: firstResult.content,
      second: secondResult.content,
    },
  };
});

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  locale: Locale,
  limit = 3
): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts(locale);

  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
