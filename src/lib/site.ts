import { env } from "@/env";
import {
  availableLocales,
  getLocalizedPath,
  getLocalizedSectionPath,
  CONTENT_REGISTRY,
  SECTION_HUB_SERVED,
  DEFAULT_LOCALE,
  type AppLocale,
  type SectionKey,
} from "@/lib/i18n-paths";

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  brand: env.NEXT_PUBLIC_SITE_BRAND,
  url: env.NEXT_PUBLIC_SITE_URL,
  defaultLocale: "tr" as const,
  locales: ["tr", "en", "de"] as const,
  gaId: env.NEXT_PUBLIC_GA_ID || undefined,
  adsenseClientId:
    env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-8715861903175610",
  description: {
    tr: "VPN teknolojileri, sağlayıcı özellikleri, gizlilik politikaları, bağımsız denetimler, fiyatlandırma ve cihaz desteği hakkında kaynak gösteren bilgi ve karşılaştırma rehberi.",
    en: "A source-based VPN reference for technology, provider features, privacy policies, independent audits, pricing and device support.",
    de: "Ein quellenbasierter VPN-Ratgeber zu Technik, Anbieterfunktionen, Datenschutzrichtlinien, unabhängigen Audits, Preisen und Geräteunterstützung.",
  },
  author: {
    name: "VPN Advisor",
    url: "/hakkimizda",
  },
  social: {
    twitter: "",
    github: "",
  },
  ogImage: "/opengraph-image",
} as const;

export type Locale = (typeof siteConfig.locales)[number];

export function absoluteUrl(path = "", locale?: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const prefix =
    locale && locale !== siteConfig.defaultLocale ? `/${locale}` : "";
  if (!path) return `${base}${prefix}`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${normalized}`;
}

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

export function contentAlternates(contentId: string, locale: string) {
  const entry = CONTENT_REGISTRY[contentId];
  const served = availableLocales(contentId);
  const activeLocale: AppLocale = served.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : DEFAULT_LOCALE;
  const section = entry.translations[DEFAULT_LOCALE]!.section;

  const pathFor = (l: AppLocale) =>
    absoluteUrl(getLocalizedPath({ locale: l, section, contentId }));

  const languages: Record<string, string> = {};
  for (const l of served) languages[l] = pathFor(l);
  languages["x-default"] = pathFor(DEFAULT_LOCALE);

  return {
    canonical: pathFor(activeLocale),
    languages,
  };
}

export function sectionHubAlternates(section: SectionKey, locale: string) {
  const served = SECTION_HUB_SERVED[section] ?? [DEFAULT_LOCALE];
  const activeLocale: AppLocale = served.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : DEFAULT_LOCALE;

  const pathFor = (l: AppLocale) =>
    absoluteUrl(getLocalizedSectionPath(l, section));

  const languages: Record<string, string> = {};
  for (const l of served) languages[l] = pathFor(l);
  languages["x-default"] = pathFor(DEFAULT_LOCALE);

  return {
    canonical: pathFor(activeLocale),
    languages,
  };
}
