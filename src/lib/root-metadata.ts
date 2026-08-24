import type { Metadata, Viewport } from "next";
import { siteConfig, type Locale } from "@/lib/site";

const TITLES: Record<Locale, string> = {
  tr: `${siteConfig.name} — Bağımsız VPN Karşılaştırmaları (2026)`,
  en: `${siteConfig.name} — Independent VPN Comparisons (2026)`,
  de: `${siteConfig.name} — Unabhängige VPN-Vergleiche (2026)`,
};

const TITLE_SHORT: Record<Locale, string> = {
  tr: `${siteConfig.name} — Bağımsız VPN Karşılaştırmaları`,
  en: `${siteConfig.name} — Independent VPN Comparisons`,
  de: `${siteConfig.name} — Unabhängige VPN-Vergleiche`,
};

const OG_LOCALE: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
};

const ALTERNATE_OG_LOCALES: Record<Locale, string[]> = {
  tr: ["en_US"],
  en: ["tr_TR"],
  de: ["tr_TR", "en_US"],
};

// Google Search Console verification tokens are intentionally public and are
// emitted as a harmless meta tag on every locale page.
const GOOGLE_SEARCH_CONSOLE_TOKEN =
  "61Ha0d7XNarVnj3244M0ghLOzvRnhJ5B_5JLWFIi8BI";

export function buildRootMetadata(locale: Locale): Metadata {
  const description = siteConfig.description[locale];
  const socialImage = `${siteConfig.ogImage}?locale=en`;
  const url = siteConfig.url;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: TITLES[locale],
      template: `%s · ${siteConfig.name}`,
    },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.name,
    category: "technology",
    verification: {
      google: GOOGLE_SEARCH_CONSOLE_TOKEN,
    },
    other: {
      "google-adsense-account": siteConfig.adsenseClientId,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
    },
    alternates: {
      canonical: url,
      languages: {
        en: siteConfig.url,
        "x-default": siteConfig.url,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url,
      title: TITLE_SHORT[locale],
      description,
      siteName: siteConfig.name,
      alternateLocale: ALTERNATE_OG_LOCALES[locale],
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: TITLE_SHORT[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE_SHORT[locale],
      description,
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const rootViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
  width: "device-width",
  initialScale: 1,
};
