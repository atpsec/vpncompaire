import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/lib/site";
import {
  canonicalEnglishPath,
  localizePathname,
  type AppLocale,
} from "@/lib/i18n-paths";

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
  indexing?: "index" | "noindex";
  wordCount: number;
  indexable: boolean;
};

export type BlogPost = BlogPostFrontmatter & {
  content: string;
};

export type BlogPostSummary = BlogPostFrontmatter;

export type BlogPostCardData = BlogPostSummary & {
  imageUrl: string;
};

// Slug eşleme tablosu ve karşılık fonksiyonu Edge-safe `./blog-slugs`
// modülüne taşındı (proxy.ts oradan import ediyor). Mevcut importerlar
// için buradan re-export ediliyor.
import {
  getBlogSlugEntry,
  slugForLocale,
} from "./blog-slugs";

export { BLOG_SLUG_MAP, getCounterpartSlug } from "./blog-slugs";

/**
 * Editoryal yayın eşiği; bir Google "kelime sayısı kuralı" değildir.
 * Kısa taslakların yeni bir alan adında toplu olarak indexlenmesini önler.
 * Frontmatter'daki `indexing` alanı editöre bilinçli override imkânı verir.
 */
export const MIN_INDEXABLE_BLOG_WORDS = 500;

export function countEditorialWords(content: string): number {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~|=\-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function indexingState(
  content: string,
  indexing?: "index" | "noindex",
): { wordCount: number; indexable: boolean } {
  const wordCount = countEditorialWords(content);
  return {
    wordCount,
    indexable:
      indexing === "index" ||
      (indexing !== "noindex" && wordCount >= MIN_INDEXABLE_BLOG_WORDS),
  };
}

function splitHref(href: string): { path: string; suffix: string } {
  const match = href.match(/^([^?#]*)([?#].*)?$/);
  return { path: match?.[1] ?? href, suffix: match?.[2] ?? "" };
}

function findBlogEntry(slug: string) {
  return (
    getBlogSlugEntry(slug, "en") ??
    getBlogSlugEntry(slug, "tr") ??
    getBlogSlugEntry(slug, "de")
  );
}

function localizeMarkdownLinks(source: string, locale: AppLocale): string {
  return source.replace(/(\]\()((?:\/[^\s)]+))/g, (full, prefix, href) => {
    const { path: hrefPath, suffix } = splitHref(href);
    if (!hrefPath || hrefPath.startsWith("//")) return full;

    const segments = hrefPath.split("/").filter(Boolean);
    const hasLocalePrefix = ["tr", "en", "de"].includes(segments[0]);
    const pathSegments = hasLocalePrefix ? segments.slice(1) : segments;

    if (pathSegments[0] === "blog" && pathSegments[1]) {
      const entry = findBlogEntry(pathSegments[1]);
      if (entry) {
        const slug = slugForLocale(entry, locale);
        const localized = `/blog/${slug}`;
        return `${prefix}${localized}${pathSegments.length > 2 ? `/${pathSegments.slice(2).join("/")}` : ""}${suffix}`;
      }
    }

    const localized = canonicalEnglishPath(localizePathname(hrefPath, locale));
    return `${prefix}${localized}${suffix}`;
  });
}

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

    const indexing = data.indexing as "index" | "noindex" | undefined;

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
      indexing,
      ...indexingState(content, indexing),
      content,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
});

export async function getIndexableBlogPosts(
  locale: Locale,
): Promise<BlogPost[]> {
  return (await getBlogPosts(locale)).filter((post) => post.indexable);
}

/** Almanca koleksiyon noindex olsa da mevcut kullanıcılar için görünür kalır. */
export async function getVisibleBlogPosts(locale: Locale): Promise<BlogPost[]> {
  return locale === "de"
    ? getBlogPosts(locale)
    : getIndexableBlogPosts(locale);
}

function toBlogPostSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    category: post.category,
    tags: post.tags,
    readingTime: post.readingTime,
    coverImage: post.coverImage,
    unsplashKeyword: post.unsplashKeyword,
    indexing: post.indexing,
    wordCount: post.wordCount,
    indexable: post.indexable,
  };
}

/** Client bileşenlerine MDX gövdesini taşımadan kart verisi üretir. */
export async function getVisibleBlogPostSummaries(
  locale: Locale,
): Promise<BlogPostSummary[]> {
  return (await getVisibleBlogPosts(locale)).map(toBlogPostSummary);
}

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
  const indexing = data.indexing as "index" | "noindex" | undefined;

  const localizedContent = localizeMarkdownLinks(rawContent, locale as AppLocale);
  const { first, second } = splitMarkdownContent(localizedContent);
  const [{ compileMDX }, { default: remarkGfm }] = await Promise.all([
    import("next-mdx-remote/rsc"),
    import("remark-gfm"),
  ]);

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
      indexing,
      ...indexingState(rawContent, indexing),
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
  const allPosts = await getVisibleBlogPosts(locale);

  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
