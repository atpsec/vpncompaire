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
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { getBlogImage } from "@/lib/unsplash";
import {
  absoluteUrl,
  SEO_LOCALES,
  siteConfig,
  type Locale,
  type SeoLocale,
} from "@/lib/site";
import {
  getBlogSlugEntry,
  slugForLocale,
  type BlogLocale,
} from "@/lib/blog-slugs";
import type { Metadata } from "next";
import { getLocalizedLinkHref } from "@/lib/i18n-paths";

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
    primaryHref: "/cihazlar/smart-tv",
    secondaryLabel: "Compare streaming VPNs",
    secondaryHref: "/en-iyi/streaming",
  },
  "android-tv-vpn-setup": {
    title: "Compare Android TV-friendly options",
    body: "Use the device guide for setup constraints and the streaming comparison for provider-level trade-offs.",
    primaryLabel: "Open smart TV device guide",
    primaryHref: "/cihazlar/smart-tv",
    secondaryLabel: "Compare streaming VPNs",
    secondaryHref: "/en-iyi/streaming",
  },
  "fire-tv-stick-vpn-setup": {
    title: "Find the right VPN setup for Fire TV",
    body: "Start with the device-level setup route, then compare providers that document streaming and multi-device support.",
    primaryLabel: "Open device VPN guides",
    primaryHref: "/cihazlar",
    secondaryLabel: "Compare streaming VPNs",
    secondaryHref: "/en-iyi/streaming",
  },
  "vpn-connected-but-not-working": {
    title: "Fix the connection before switching providers",
    body: "Run the relevant leak checks and compare documented DNS, kill-switch and protocol features before buying another plan.",
    primaryLabel: "Open VPN security tools",
    primaryHref: "/guvenlik-araclari",
    secondaryLabel: "Compare privacy-focused VPNs",
    secondaryHref: "/en-iyi/gizlilik",
  },
  "ios-vpn-shortcuts-automation": {
    title: "Choose an iPhone-friendly VPN",
    body: "Check iPhone setup coverage and compare providers that document mobile support, automation and privacy controls.",
    primaryLabel: "Open iPhone VPN guide",
    primaryHref: "/cihazlar/iphone",
    secondaryLabel: "Compare privacy-focused VPNs",
    secondaryHref: "/en-iyi/gizlilik",
  },
  "nordvpn-vs-surfshark-comparison": {
    title: "Verify the two providers before you choose",
    body: "Review the provider profiles and current comparison fields, including device limits, pricing and renewal terms.",
    primaryLabel: "Open NordVPN profile",
    primaryHref: "/inceleme/nordvpn",
    secondaryLabel: "Open Surfshark profile",
    secondaryHref: "/inceleme/surfshark",
  },
};

async function blogAlternates(slug: string, locale: BlogLocale) {
  const entry = getBlogSlugEntry(slug, locale);
  const selfCanonical = absoluteUrl(`/blog/${slug}`, locale);

  const [trPosts, enPosts] = await Promise.all([
    getBlogPosts("tr"),
    getBlogPosts("en"),
  ]);
  const indexableSlugs: Record<SeoLocale, Set<string>> = {
    tr: new Set(trPosts.filter((post) => post.indexable).map((post) => post.slug)),
    en: new Set(enPosts.filter((post) => post.indexable).map((post) => post.slug)),
  };
  const existingSlugs: Record<SeoLocale, Set<string>> = {
    tr: new Set(trPosts.map((post) => post.slug)),
    en: new Set(enPosts.map((post) => post.slug)),
  };
  const counterpartSlug = (targetLocale: SeoLocale): string | null => {
    const candidate = entry ? slugForLocale(entry, targetLocale) : slug;
    return existingSlugs[targetLocale].has(candidate) ? candidate : null;
  };
  const languages: Record<string, string> = {};

  for (const targetLocale of SEO_LOCALES) {
    const targetSlug = counterpartSlug(targetLocale);

    if (targetSlug && indexableSlugs[targetLocale].has(targetSlug)) {
      languages[targetLocale] = absoluteUrl(`/blog/${targetSlug}`, targetLocale);
    }
  }

  const enCounterpart = counterpartSlug("en");
  const trCounterpart = counterpartSlug("tr");
  const canonical =
    locale === "de"
      ? enCounterpart && indexableSlugs.en.has(enCounterpart)
        ? absoluteUrl(`/blog/${enCounterpart}`, "en")
        : trCounterpart && indexableSlugs.tr.has(trCounterpart)
          ? absoluteUrl(`/blog/${trCounterpart}`, "tr")
          : selfCanonical
      : selfCanonical;

  if (Object.keys(languages).length === 0) {
    return { canonical };
  }

  languages["x-default"] = languages.tr ?? languages.en;

  return {
    canonical,
    languages,
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
  const alternates = await blogAlternates(frontmatter.slug, locale);
  const ogImage = absoluteUrl(`/og/blog/${frontmatter.slug}?locale=${locale}`);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates,
    robots:
      !frontmatter.indexable || locale === "de"
        ? { index: false, follow: true }
        : undefined,
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
    imageUrl: heroImage.url.startsWith("/")
      ? absoluteUrl(heroImage.url, locale)
      : heroImage.url,
    locale,
    category: frontmatter.category,
    tags: frontmatter.tags,
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
          preload
        />

        <BlogContent content={contentParts.first} />

        <UnsplashImage
          coverImage={frontmatter.coverImage}
          position="mid"
          className="my-10"
        />

        <BlogContent content={contentParts.second} />

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
          position="end"
          className="my-10"
        />

        <Card className="mt-12 border-brand-200 bg-brand-50/40 p-6">
          <h2 className="text-xl font-semibold text-ink-strong">{nextSteps.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{nextSteps.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/en-iyi-vpn"
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
