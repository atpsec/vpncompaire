import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import type { Metadata } from "next";
import { buildRootMetadata, rootViewport } from "@/lib/root-metadata";
import { GoogleAdsense } from "@/components/analytics/google-adsense";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { WebVitals } from "@/components/analytics/web-vitals";
import { ThemeScript } from "@/components/theme/theme-script";
import { EditorialNotice } from "@/components/legal/editorial-notice";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = rootViewport;

// Keep the CDN from retaining a statically generated document for Next.js'
// one-year default. Hostinger's edge cache otherwise served old page HTML
// after deploys, which can leave visitors on a stale or broken release.
export const revalidate = 3600;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en") notFound();
  return buildRootMetadata("en");
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;

  if (rawLocale !== "en") {
    notFound();
  }
  const locale = "en" as const;

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
        <WebVitals />
        <GoogleAdsense />
      </body>
    </html>
  );
}
