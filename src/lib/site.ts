import { env } from "@/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  brand: env.NEXT_PUBLIC_SITE_BRAND,
  url: env.NEXT_PUBLIC_SITE_URL,
  defaultLocale: "tr" as const,
  locales: ["tr", "en"] as const,
  gaId: env.NEXT_PUBLIC_GA_ID || undefined,
  adsenseClientId: env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || undefined,
  description: {
    tr: "Bağımsız test metodolojisine dayalı, ayrıntılı VPN incelemeleri ve karşılaştırmaları. Gizlilik, streaming, seyahat ve günlük güvenlik senaryolarını değerlendirir. Gönüllü inceleme projesidir; resmi bir kuruluş değildir.",
    en: "Independent, methodology-driven VPN reviews and comparisons. Covers privacy, streaming, travel and everyday-security scenarios. A volunteer review project — not an official organisation.",
  },
  author: {
    name: "VPN Advisor Editör Ekibi",
    url: "/hakkimizda",
  },
  social: {
    twitter: "",
    github: "",
  },
  ogImage: "/og-default.png",
} as const;

export type Locale = (typeof siteConfig.locales)[number];

/**
 * Mutlak URL üretir. `locale` verilir ve default locale değilse
 * (`as-needed` routing'e uygun olarak) yola `/${locale}` prefix'i eklenir.
 * locale verilmezse eski davranış korunur (prefix yok).
 */
export function absoluteUrl(path = "", locale?: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const prefix =
    locale && locale !== siteConfig.defaultLocale ? `/${locale}` : "";
  if (!path) return `${base}${prefix}`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${normalized}`;
}

/**
 * Bir sayfanın `alternates` metadata bloğunu locale-aware üretir:
 * canonical aktif locale'i işaret eder, languages tr/en/x-default hreflang verir.
 * `path` her zaman locale-prefix'siz verilir (örn. "/sozluk").
 */
export function localizedAlternates(path = "", locale?: string) {
  return {
    canonical: absoluteUrl(path, locale),
    languages: {
      tr: absoluteUrl(path, "tr"),
      en: absoluteUrl(path, "en"),
      "x-default": absoluteUrl(path, siteConfig.defaultLocale),
    },
  };
}
