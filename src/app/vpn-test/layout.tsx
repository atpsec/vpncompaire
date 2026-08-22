import { Geist } from "next/font/google";
import { GoogleAdsense } from "@/components/analytics/google-adsense";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ThemeScript } from "@/components/theme/theme-script";
import { buildRootMetadata, rootViewport } from "@/lib/root-metadata";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = buildRootMetadata("tr");
export const viewport = rootViewport;

export default function VpnTestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
        <GoogleAnalytics locale="tr" />
        <GoogleAdsense />
      </body>
    </html>
  );
}
