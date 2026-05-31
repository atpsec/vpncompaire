import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getBlogPost, getBlogPosts, getRelatedPosts } from "@/lib/blog";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContent } from "@/components/blog/blog-content";
import { UnsplashImage } from "@/components/blog/unsplash-image";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ViewCounter } from "@/components/blog/view-counter";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { getBlogImage } from "@/lib/unsplash";
import { absoluteUrl, siteConfig } from "@/lib/site";
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

  const { frontmatter } = result;
  const localePath = locale === "tr" ? "" : `/${locale}`;
  const canonical = absoluteUrl(`${localePath}/blog/${frontmatter.slug}`);
  const ogImage = absoluteUrl(`/og/blog/${frontmatter.slug}`);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: canonical,
      type: "article",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      siteName: siteConfig.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
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

  const heroImage = getBlogImage(frontmatter.coverImage, "hero");
  const localePath = locale === "tr" ? "" : `/${locale}`;
  const blogIndexPath = `${localePath}/blog`;

  const articleLd = articleSchema({
    title: frontmatter.title,
    description: frontmatter.description,
    slug: frontmatter.slug,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    author: frontmatter.author,
    imageUrl: heroImage.url,
    locale: locale as "tr" | "en",
  });

  const breadcrumbLd = breadcrumbSchema([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", path: `${localePath}/` },
    { name: "Blog", path: blogIndexPath },
    { name: frontmatter.title, path: `${blogIndexPath}/${frontmatter.slug}` },
  ]);

  return (
    <article className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Container size="md">
        <BlogHeader post={frontmatter} />

        <div className="mt-4 mb-8">
          <ViewCounter slug={frontmatter.slug} locale={locale as "tr" | "en"} />
        </div>

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
