import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

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

export async function getBlogPosts(locale: "tr" | "en"): Promise<BlogPost[]> {
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
}

export async function getBlogPost(
  slug: string,
  locale: "tr" | "en"
): Promise<{ frontmatter: BlogPostFrontmatter; content: React.ReactElement } | null> {
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

  const { content } = await compileMDX({
    source: rawContent,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

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
    content,
  };
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  locale: "tr" | "en",
  limit = 3
): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts(locale);

  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
