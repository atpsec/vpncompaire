import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getBlogPost, getBlogPosts, getRelatedPosts } from "@/lib/blog";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContent } from "@/components/blog/blog-content";
import { UnsplashImage } from "@/components/blog/unsplash-image";
import { RelatedPosts } from "@/components/blog/related-posts";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const trPosts = await getBlogPosts("tr");
  const enPosts = await getBlogPosts("en");

  return [
    ...trPosts.map((post) => ({ locale: "tr", slug: post.slug })),
    ...enPosts.map((post) => ({ locale: "en", slug: post.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getBlogPost(slug, locale as "tr" | "en");

  if (!result) {
    return {};
  }

  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = await getBlogPost(slug, locale as "tr" | "en");

  if (!result) {
    notFound();
  }

  const { frontmatter, contentParts } = result;

  const relatedPosts = await getRelatedPosts(
    frontmatter.slug,
    frontmatter.category,
    locale as "tr" | "en"
  );

  return (
    <article className="py-12 sm:py-16">
      <Container size="md">
        <BlogHeader post={frontmatter} />

        <UnsplashImage
          coverImage={frontmatter.coverImage}
          position="hero"
          alt={frontmatter.title}
          className="my-8"
          priority
        />

        <BlogContent content={contentParts.first} />

        <UnsplashImage
          coverImage={frontmatter.coverImage}
          position="mid"
          className="my-10"
        />

        <BlogContent content={contentParts.second} />

        <UnsplashImage
          coverImage={frontmatter.coverImage}
          position="end"
          className="my-10"
        />

        <RelatedPosts posts={relatedPosts} />
      </Container>
    </article>
  );
}
