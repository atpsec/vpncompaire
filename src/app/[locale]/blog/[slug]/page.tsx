import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getBlogPost, getBlogPosts, getRelatedPosts } from "@/lib/blog";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContent } from "@/components/blog/blog-content";
import { UnsplashImage } from "@/components/blog/unsplash-image";
import { RelatedPosts } from "@/components/blog/related-posts";
import { SocialShare } from "@/components/blog/social-share";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { getBlogImage } from "@/lib/unsplash";
import { absoluteUrl, siteConfig, type Locale } from "@/lib/site";
import {
  getBlogSlugEntry,
  slugForLocale,
  type BlogLocale,
} from "@/lib/blog-slugs";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const OG_LOCALE: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
};

function blogAlternates(slug: string, locale: BlogLocale) {
  const entry = getBlogSlugEntry(slug, locale);
  const canonical = absoluteUrl(`/blog/${slug}`, locale);

  // Untranslated posts intentionally expose only the locale that actually exists.
  // This prevents hreflang links from pointing to non-existent EN/DE pages.
  if (!entry) {
    return {
      canonical,
      languages: {
        [locale]: canonical,
        "x-default": canonical,
      },
    };
  }

  const pathFor = (target: BlogLocale) =>
    `/blog/${slugForLocale(entry, target)}`;

  return {
    canonical,
    languages: {
      tr: absoluteUrl(pathFor("tr"), "tr"),
      en: absoluteUrl(pathFor("en"), "en"),
      de: absoluteUrl(pathFor("de"), "de"),
      "x-default": absoluteUrl(pathFor("tr"), "tr"),
    },
  };
}

export async function generateStaticParams() {
  const [trPosts, enPosts, dePosts] = await Promise.all([
    getBlogPosts("tr"),
    getBlogPosts("en"),
    getBlogPosts("de"),
  ]);

  return [
    ...trPosts.map((post) => ({ locale: "tr", slug: post.slug })),
    ...enPosts.map((post) => ({ locale: "en", slug: post.slug })),
    ...dePosts.map((post) => ({ locale: "de", slug: post.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const result = await getBlogPost(slug, locale);

  if (!result) {
    return {};
  }

  const { frontmatter } = result;
  const canonical = absoluteUrl(`/blog/${frontmatter.slug}`, locale);
  const ogImage = absoluteUrl(`/og/blog/${frontmatter.slug}?locale=${locale}`);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: blogAlternates(frontmatter.slug, locale),
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: canonical,
      type: "article",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      siteName: siteConfig.name,
      locale: OG_LOCALE[locale],
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
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const result = await getBlogPost(slug, locale);

  if (!result) {
    notFound();
  }

  const { frontmatter, contentParts } = result;

  const relatedPosts = await getRelatedPosts(
    frontmatter.slug,
    frontmatter.category,
    locale
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
    locale,
  });

  const homeName =
    locale === "tr" ? "Ana Sayfa" : locale === "de" ? "Startseite" : "Home";
  const breadcrumbLd = breadcrumbSchema(
    [
      { name: homeName, path: `${localePath}/` },
      { name: "Blog", path: blogIndexPath },
      { name: frontmatter.title, path: `${blogIndexPath}/${frontmatter.slug}` },
    ],
    locale,
  );

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

        <div className="mt-4 mb-6 flex flex-wrap items-center justify-end gap-4">
          <SocialShare
            url={absoluteUrl(`${localePath}/blog/${frontmatter.slug}`)}
            title={frontmatter.title}
            description={frontmatter.description}
          />
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
