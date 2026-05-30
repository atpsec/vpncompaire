import { setRequestLocale, getTranslations } from "next-intl/server";
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
  const post = await getBlogPost(slug, locale as "tr" | "en");

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getBlogPost(slug, locale as "tr" | "en");

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(
    post.slug,
    post.category,
    locale as "tr" | "en"
  );

  return (
    <article className="py-12 sm:py-16">
      <Container size="md">
        <BlogHeader post={post} />

        <UnsplashImage
          keyword={post.unsplashKeyword}
          alt={post.title}
          className="my-8"
        />

        <BlogContent content={post.content} />

        <RelatedPosts posts={relatedPosts} />
      </Container>
    </article>
  );
}
