import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getBlogPost, getBlogPosts, getRelatedPosts } from "@/lib/blog";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContent } from "@/components/blog/blog-content";
import { UnsplashImage } from "@/components/blog/unsplash-image";
import { RelatedPosts } from "@/components/blog/related-posts";
import { SocialShare } from "@/components/blog/social-share";
import { EditorialReferences } from "@/components/blog/editorial-references";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { getBlogImage } from "@/lib/unsplash";
import {
  absoluteUrl,
  siteConfig,
  type Locale,
} from "@/lib/site";
import type { Metadata } from "next";
import { getLocalizedLinkHref } from "@/lib/i18n-paths";
import {
  BLOG_REFERENCES_VERIFIED_AT,
  getBlogReferences,
} from "@/data/blog-references";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const OG_LOCALE: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
};

const NEXT_STEP_COPY = {
  tr: {
    title: "Karar vermeye hazırsan",
    body: "Kaynak temelli sağlayıcı profillerini ve kullanım senaryolarına göre karşılaştırmaları incele.",
    profiles: "VPN profillerini incele",
    compare: "Karşılaştırmaları aç",
    guide: "Başlangıç rehberine dön",
  },
  en: {
    title: "Ready to make a decision?",
    body: "Explore source-based provider profiles and comparisons organized by real-world use case.",
    profiles: "Browse VPN profiles",
    compare: "Open comparisons",
    guide: "Read the starter guide",
  },
  de: {
    title: "Bereit für die Entscheidung?",
    body: "Entdecke quellenbasierte Anbieterprofile und Vergleiche nach praktischen Einsatzszenarien.",
    profiles: "VPN-Profile ansehen",
    compare: "Vergleiche öffnen",
    guide: "Einsteigerleitfaden lesen",
  },
} as const;

type ContextualNextStep = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

/**
 * Search Console currently surfaces these English articles most often. Keep
 * the next step specific to the reader's intent instead of sending every
 * visitor to the same generic comparison hub.
 */
const EN_CONTEXTUAL_NEXT_STEPS: Record<string, ContextualNextStep> = {
  "apple-tv-vpn-setup": {
    title: "Choose a VPN path for your TV setup",
    body: "Compare the practical setup options for smart TVs, then check provider profiles before choosing a plan.",
    primaryLabel: "Open smart TV VPN guide",
    primaryHref: "/devices/smart-tv",
    secondaryLabel: "Compare streaming VPNs",
    secondaryHref: "/best-vpn/streaming",
  },
  "android-tv-vpn-setup": {
    title: "Compare Android TV-friendly options",
    body: "Use the device guide for setup constraints and the streaming comparison for provider-level trade-offs.",
    primaryLabel: "Open smart TV device guide",
    primaryHref: "/devices/smart-tv",
    secondaryLabel: "Compare streaming VPNs",
    secondaryHref: "/best-vpn/streaming",
  },
  "fire-tv-stick-vpn-setup": {
    title: "Find the right VPN setup for Fire TV",
    body: "Start with the device-level setup route, then compare providers that document streaming and multi-device support.",
    primaryLabel: "Open device VPN guides",
    primaryHref: "/devices",
    secondaryLabel: "Compare streaming VPNs",
    secondaryHref: "/best-vpn/streaming",
  },
  "vpn-connected-but-not-working": {
    title: "Fix the connection before switching providers",
    body: "Run the relevant leak checks and compare documented DNS, kill-switch and protocol features before buying another plan.",
    primaryLabel: "Open VPN security tools",
    primaryHref: "/security-tools",
    secondaryLabel: "Compare privacy-focused VPNs",
    secondaryHref: "/best-vpn/privacy",
  },
  "ios-vpn-shortcuts-automation": {
    title: "Choose an iPhone-friendly VPN",
    body: "Check iPhone setup coverage and compare providers that document mobile support, automation and privacy controls.",
    primaryLabel: "Open iPhone VPN guide",
    primaryHref: "/devices/iphone",
    secondaryLabel: "Compare privacy-focused VPNs",
    secondaryHref: "/best-vpn/privacy",
  },
  "nordvpn-vs-surfshark-comparison": {
    title: "Verify the two providers before you choose",
    body: "Review the provider profiles and current comparison fields, including device limits, pricing and renewal terms.",
    primaryLabel: "Open NordVPN profile",
    primaryHref: "/reviews/nordvpn",
    secondaryLabel: "Open Surfshark profile",
    secondaryHref: "/reviews/surfshark",
  },
};

async function blogAlternates(slug: string) {
  const canonical = absoluteUrl(`/blog/${slug}`, "en");
  return { canonical, languages: { en: canonical, "x-default": canonical } };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts("en");
  return posts.map((post) => ({ locale: "en", slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const result = await getBlogPost(slug, locale);

  if (!result) {
    return {};
  }

  const { frontmatter } = result;
  const alternates = await blogAlternates(frontmatter.slug);
  const ogImage = absoluteUrl(`/og/blog/${frontmatter.slug}?locale=${locale}`);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates,
    robots: !frontmatter.indexable ? { index: false, follow: true } : undefined,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: alternates.canonical,
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
  const editorialReferences = getBlogReferences(frontmatter.slug);
  const nextSteps = NEXT_STEP_COPY[locale];
  const contextualNextStep =
    locale === "en" ? EN_CONTEXTUAL_NEXT_STEPS[frontmatter.slug] : undefined;
  const comparisonHref = getLocalizedLinkHref({
    locale,
    section: "comparison",
  });
  const guideHref = getLocalizedLinkHref({
    locale,
    section: "guide",
    contentId: "what-is-vpn",
  });

  const relatedPosts = await getRelatedPosts(
    frontmatter.slug,
    frontmatter.category,
    locale
  );

  const heroImage = getBlogImage(frontmatter.coverImage, "hero", frontmatter.slug);
  const localePath = "";
  const blogIndexPath = `${localePath}/blog`;

  const articleLd = articleSchema({
    title: frontmatter.title,
    description: frontmatter.description,
    slug: frontmatter.slug,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    author: frontmatter.author,
    imageUrl: heroImage.url.startsWith("/")
      ? absoluteUrl(heroImage.url, locale)
      : heroImage.url,
    locale,
    category: frontmatter.category,
    tags: frontmatter.tags,
    citations: editorialReferences.map((reference) => reference.url),
  });

  const homeName = "Home";
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
          imageKey={frontmatter.slug}
          position="hero"
          alt={frontmatter.title}
          className="my-8"
          preload
        />

        <BlogContent content={contentParts.first} />

        <UnsplashImage
          coverImage={frontmatter.coverImage}
          imageKey={frontmatter.slug}
          position="mid"
          className="my-10"
        />

        <BlogContent content={contentParts.second} />

        <EditorialReferences
          references={editorialReferences}
          verifiedAt={BLOG_REFERENCES_VERIFIED_AT}
        />

        {contextualNextStep ? (
          <Card className="mt-12 border-accent-200 bg-accent-50/40 p-6">
            <h2 className="text-xl font-semibold text-ink-strong">
              {contextualNextStep.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {contextualNextStep.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={contextualNextStep.primaryHref}
                className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {contextualNextStep.primaryLabel}
              </Link>
              <Link
                href={contextualNextStep.secondaryHref}
                className="rounded-full border border-border bg-surface-base px-4 py-2 text-sm font-semibold text-ink-strong transition-colors hover:border-brand-300"
              >
                {contextualNextStep.secondaryLabel}
              </Link>
            </div>
          </Card>
        ) : null}

        <UnsplashImage
          coverImage={frontmatter.coverImage}
          imageKey={frontmatter.slug}
          position="end"
          className="my-10"
        />

        <Card className="mt-12 border-brand-200 bg-brand-50/40 p-6">
          <h2 className="text-xl font-semibold text-ink-strong">{nextSteps.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{nextSteps.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/vpn-reviews"
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {nextSteps.profiles}
            </Link>
            <Link
              href={comparisonHref}
              className="rounded-full border border-border bg-surface-base px-4 py-2 text-sm font-semibold text-ink-strong transition-colors hover:border-brand-300"
            >
              {nextSteps.compare}
            </Link>
            <Link
              href={guideHref}
              className="rounded-full border border-border bg-surface-base px-4 py-2 text-sm font-semibold text-ink-strong transition-colors hover:border-brand-300"
            >
              {nextSteps.guide}
            </Link>
          </div>
        </Card>

        <RelatedPosts posts={relatedPosts} />
      </Container>
    </article>
  );
}
