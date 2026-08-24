import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import type { Locale } from "@/lib/site";
import type { Metadata } from "next";
import { buildRootMetadata, rootViewport } from "@/lib/root-metadata";
import { GoogleAdsense } from "@/components/analytics/google-adsense";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ThemeScript } from "@/components/theme/theme-script";
import { EditorialNotice } from "@/components/legal/editorial-notice";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = rootViewport;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : "tr";
  const metadata = buildRootMetadata(locale);

  if (locale !== "de") return metadata;

  return {
    ...metadata,
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;

  if (!routing.locales.includes(rawLocale as Locale)) {
    notFound();
  }
  const locale = rawLocale as Locale;

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <NextIntlClientProvider>
          <SkipToContent />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <EditorialNotice locale={locale} />
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
        <GoogleAnalytics locale={locale} />
        <GoogleAdsense />
      </body>
    </html>
  );
}
