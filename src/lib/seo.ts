import { siteConfig, absoluteUrl } from "@/lib/site";
import type { FAQ } from "@/data/home-faqs";

type JsonLdObject = Record<string, unknown>;

function inLanguageOf(locale: "tr" | "en"): string {
  return locale === "en" ? "en-US" : "tr-TR";
}

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description.tr,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon"),
    },
    sameAs: [siteConfig.social.twitter, siteConfig.social.github].filter(Boolean),
  };
}

export function websiteSchema(locale: "tr" | "en" = "tr"): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: inLanguageOf(locale),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
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
  items: { slug: string; brand: string; score: number }[],
  locale: "tr" | "en" = "tr",
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/inceleme/${p.slug}`, locale),
      name: p.brand,
    })),
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
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
  locale: "tr" | "en";
}): JsonLdObject {
  const localePath = post.locale === "tr" ? "" : `/${post.locale}`;
  const articleUrl = absoluteUrl(`${localePath}/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: post.locale === "tr" ? "tr-TR" : "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon"),
      },
    },
    image: {
      "@type": "ImageObject",
      url: post.imageUrl,
      width: 1200,
      height: 630,
    },
    url: articleUrl,
  };
}
