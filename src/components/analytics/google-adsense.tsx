"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const SEO_LOCALES = new Set(["en"]);
const EXCLUDED_EXACT_PATHS = new Set([
  "/cookie-policy",
  "/cookie-policy",
  "/privacy-policy",
  "/privacy-policy",
  "/legal-notice",
  "/legal-notice",
  "/terms",
  "/terms",
  "/affiliate-disclosure",
  "/affiliate-disclosure",
  "/refund-policy",
  "/refund-policy",
  "/contact",
  "/contact",
]);
const EXCLUDED_PREFIXES = [
  "/tools",
  "/tools",
  "/vpn-test",
  "/calculator",
  "/calculator",
  "/quiz",
  "/quiz",
  "/server-map",
  "/server-map",
  "/security-tools",
  "/security-tools",
];

/**
 * Auto Ads'i içerik yerine araç, yasal ve kısa yardımcı ekranlarda yüklemeyiz.
 * Bu hem kullanıcı deneyimini korur hem de reklamı düşük değerli içerikten
 * uzak tutar. Google AdSense panelindeki sayfa hariç tutmalarıyla birlikte
 * güvenli bir uygulama katmanı olarak çalışır.
 */
function isAdExcluded(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0] ?? "";

  const normalized = SEO_LOCALES.has(first)
    ? `/${parts.slice(1).join("/")}` || "/"
    : pathname;

  return (
    EXCLUDED_EXACT_PATHS.has(normalized) ||
    EXCLUDED_PREFIXES.some(
      (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
    )
  );
}

/**
 * Google AdSense (Auto Ads) — tek script, yerleşimi Google otomatik seçer.
 * Root layout'ta hydration sonrasında yüklenir; ilk boya yolunu bloke etmez.
 *
 * Çerez davranışı: reklam rızası AdSense'in yayınlanmış Google CMP mesajı
 * tarafından yönetilir. Sitedeki özel banner yalnızca analytics_storage için
 * çalışır; reklam sinyallerini ikinci bir banner ile ezmez.
 */
export function GoogleAdsense() {
  const pathname = usePathname();
  const id = siteConfig.adsenseClientId;

  if (!pathname || isAdExcluded(pathname)) return null;

  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
      crossOrigin="anonymous"
    />
  );
}
