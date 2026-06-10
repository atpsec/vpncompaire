import { env } from "@/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  brand: env.NEXT_PUBLIC_SITE_BRAND,
  url: env.NEXT_PUBLIC_SITE_URL,
  defaultLocale: "tr" as const,
  locales: ["tr", "en", "de"] as const,
  gaId: env.NEXT_PUBLIC_GA_ID || undefined,
  adsenseClientId: env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || undefined,
  description: {
    tr: "Bağımsız test metodolojisine dayalı, ayrıntılı VPN incelemeleri ve karşılaştırmaları. Gizlilik, streaming, seyahat ve günlük güvenlik senaryolarını değerlendirir. Gönüllü inceleme projesidir; resmi bir kuruluş değildir.",
    en: "Independent, methodology-driven VPN reviews and comparisons. Covers privacy, streaming, travel and everyday-security scenarios. A volunteer review project — not an official organisation.",
    de: "Unabhängige, methodisch geprüfte VPN-Tests und Vergleiche. Mit Fokus auf Datenschutz, Streaming, Reisen und Sicherheit im Alltag. Ein freiwilliges Review-Projekt — keine offizielle Organisation.",
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
 *
 * UYARI: Yalnızca üç dilde de GERÇEK içeriği olan sayfalarda kullan. İçeriği
 * yalnızca Türkçe olan sayfalar için `defaultLocaleAlternates` kullan; aksi
 * halde EN/DE hreflang'leri 301'lenen/var olmayan URL'leri işaret eder.
 */
export function localizedAlternates(path = "", locale?: string) {
  return {
    canonical: absoluteUrl(path, locale),
    languages: {
      tr: absoluteUrl(path, "tr"),
      en: absoluteUrl(path, "en"),
      de: absoluteUrl(path, "de"),
      "x-default": absoluteUrl(path, siteConfig.defaultLocale),
    },
  };
}

/**
 * İçeriği yalnızca varsayılan dilde (TR) servis edilen sayfalar için alternates.
 * Canonical ve x-default daima TR URL'sini işaret eder; sahte EN/DE hreflang
 * üretmez. Bu sayfalarda EN/DE istekleri proxy.ts ile TR'ye 301'lenir.
 */
export function defaultLocaleAlternates(path = "") {
  const canonical = absoluteUrl(path, siteConfig.defaultLocale);
  return {
    canonical,
    languages: {
      tr: canonical,
      "x-default": canonical,
    },
  };
}
