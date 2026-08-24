import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
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
  return [{ locale: "en" }];
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "en";
  return buildRootMetadata(locale);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;

  if (rawLocale !== "en") {
    notFound();
  }
  const locale: Locale = "en";

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
