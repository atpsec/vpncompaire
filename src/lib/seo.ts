import { siteConfig, absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/site";
import type { FAQ } from "@/data/home-faqs";

type JsonLdObject = Record<string, unknown>;

function inLanguageOf(locale: Locale): string {
  if (locale === "en") return "en-US";
  if (locale === "de") return "de-DE";
  return "tr-TR";
}

export function organizationSchema(locale: Locale = "en"): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description[locale],
    inLanguage: inLanguageOf(locale),
    knowsAbout: [
      "Virtual private networks",
      "VPN protocols",
      "Digital privacy",
      "Network security",
      "Independent security audits",
      "VPN pricing and subscription terms",
    ],
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/favicon.svg"),
    },
    sameAs: [siteConfig.social.twitter, siteConfig.social.github].filter(Boolean),
  };
}

export function websiteSchema(locale: Locale = "en"): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("", locale)}/#website`,
    name: siteConfig.name,
    url: absoluteUrl("", locale),
    description: siteConfig.description[locale],
    inLanguage: inLanguageOf(locale),
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqSchema(items: FAQ[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function itemListSchema(
  items: { slug: string; brand: string }[],
  locale: Locale = "en",
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name:
      locale === "tr"
        ? "VPN sağlayıcı profilleri"
        : locale === "de"
          ? "VPN-Anbieterprofile"
          : "VPN provider profiles",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/reviews/${p.slug}`, locale),
      name: p.brand,
    })),
  };
}

function breadcrumbItemUrl(path: string, locale?: Locale): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // getLocalizedPath() zaten /en/... veya /de/... prefix'i içerir; tekrar ekleme.
  if (/^\/(?:en|de)(?:\/|$)/.test(path)) {
    return absoluteUrl(path);
  }
  return absoluteUrl(path, locale);
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
  locale?: Locale,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: breadcrumbItemUrl(t.path, locale),
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  imageUrl: string;
  locale: Locale;
  category?: string;
  tags?: string[];
}): JsonLdObject {
  const articleUrl = absoluteUrl(`/blog/${post.slug}`, "en");

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: inLanguageOf(post.locale),
    articleSection: post.category,
    keywords: post.tags,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Person",
      name: post.author,
      url: absoluteUrl("/about", "en"),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.svg"),
      },
    },
    image: {
      "@type": "ImageObject",
      url: post.imageUrl,
      width: 1200,
      height: 630,
    },
    url: articleUrl,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${absoluteUrl("", post.locale)}/#website`,
    },
  };
}

export function blogCollectionSchema(params: {
  locale: Locale;
  title: string;
  description: string;
  url: string;
  posts: { slug: string; title: string }[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.title,
    description: params.description,
    url: params.url,
    inLanguage: inLanguageOf(params.locale),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: params.posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/blog/${post.slug}`, params.locale),
        name: post.title,
      })),
    },
  };
}
