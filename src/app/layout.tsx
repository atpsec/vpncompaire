import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { getLocale } from "next-intl/server";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

type SupportedLocale = "tr" | "en";

const isSupported = (l: string): l is SupportedLocale =>
  l === "tr" || l === "en";

const TITLES: Record<SupportedLocale, string> = {
  tr: `${siteConfig.name} — Bağımsız VPN Karşılaştırmaları (2026)`,
  en: `${siteConfig.name} — Independent VPN Comparisons (2026)`,
};

const TITLE_SHORT: Record<SupportedLocale, string> = {
  tr: `${siteConfig.name} — Bağımsız VPN Karşılaştırmaları`,
  en: `${siteConfig.name} — Independent VPN Comparisons`,
};

const OG_LOCALE: Record<SupportedLocale, string> = {
  tr: "tr_TR",
  en: "en_US",
};

export async function generateMetadata(): Promise<Metadata> {
  const raw = await getLocale();
  const locale = isSupported(raw) ? raw : "tr";
  const description = siteConfig.description[locale];
  const url =
    locale === siteConfig.defaultLocale
      ? siteConfig.url
      : `${siteConfig.url}/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: TITLES[locale],
      template: `%s · ${siteConfig.name}`,
    },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author.name }],
    alternates: {
      canonical: url,
      languages: {
        tr: siteConfig.url,
        en: `${siteConfig.url}/en`,
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
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE_SHORT[locale],
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const raw = await getLocale();
  const locale = isSupported(raw) ? raw : "tr";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
