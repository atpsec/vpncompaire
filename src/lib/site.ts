import { env } from "@/env";
import {
  availableLocales,
  getLocalizedPath,
  getLocalizedSectionPath,
  CONTENT_REGISTRY,
  SECTION_HUB_SERVED,
  DEFAULT_LOCALE,
  canonicalEnglishPath,
  type AppLocale,
  type SectionKey,
} from "@/lib/i18n-paths";

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  brand: env.NEXT_PUBLIC_SITE_BRAND,
  url: env.NEXT_PUBLIC_SITE_URL,
  defaultLocale: "en" as const,
  locales: ["en"] as const,
  gaId: env.NEXT_PUBLIC_GA_ID || undefined,
  bingSiteVerification: env.BING_SITE_VERIFICATION || undefined,
  // ads.txt ile aynı publisher; env override edebilir.
  adsenseClientId:
    env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-8715861903175610",
  description: {
    tr: "VPN sağlayıcılarını resmi belgeler, bağımsız denetimler ve güncel fiyat kaynaklarıyla karşılaştıran kaynak temelli rehber.",
    en: "A source-based guide comparing VPN providers through privacy policies, independent audit records, security features and current pricing sources.",
    de: "Ein quellenbasierter Ratgeber, der VPN-Anbieter anhand offizieller Dokumente, unabhängiger Audits und aktueller Preisquellen vergleicht.",
  },
  author: {
    name: "VPN Advisor Editorial Team",
    url: "/about",
  },
  social: {
    twitter: "",
    github: "",
  },
  /** Locale-aware social sharing image route. */
  ogImage: `${env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/og/default`,
} as const;

// Legacy locale values remain in the type because old data and URL migration
// code still need to understand them, although only English is public.
export type Locale = AppLocale;

/**
 * Search'te yayınlanmaya hazır diller. Almanca sürüm kullanıcılar için
 * erişilebilir kalır; editoryal çeviri tamamlanana kadar noindex tutulur.
 */
export const SEO_LOCALES = ["en"] as const;
export type SeoLocale = (typeof SEO_LOCALES)[number];

export function isSeoLocale(locale: string): locale is SeoLocale {
  return locale === "en";
}

/**
 * Mutlak URL üretir. `locale` verilir ve default locale değilse
 * (`as-needed` routing'e uygun olarak) yola `/${locale}` prefix'i eklenir.
 * locale verilmezse eski davranış korunur (prefix yok).
 */
export function absoluteUrl(path = "", locale?: string): string {
  void locale;
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${canonicalEnglishPath(normalized)}`;
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
  void locale;
  const canonical = absoluteUrl(path, "en");
  return {
    canonical,
    languages: {
      en: canonical,
      "x-default": canonical,
    },
  };
}

/**
 * TR/EN içerik taşıyan sayfalar için alternates. DE isteği, ilgili sayfanın
 * gerçek veri diline göre verilen fallback locale'e canonical edilir; böylece
 * Almanca URL için sahte bir hreflang üretilmez.
 */
export function bilingualAlternates(
  path = "",
  _locale: string,
  _fallbackLocale: "tr" | "en",
) {
  void _locale;
  void _fallbackLocale;
  const canonical = absoluteUrl(path, "en");
  return {
    canonical,
    languages: {
      en: canonical,
      "x-default": canonical,
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
      en: canonical,
      "x-default": canonical,
    },
  };
}

/**
 * CONTENT_REGISTRY'de kayıtlı bir içerik için alternates üretir. Canonical,
 * aktif locale'in (o dilde servis ediliyorsa) yerelleştirilmiş URL'sini;
 * hreflang yalnızca gerçekten servis edilen dilleri işaret eder.
 * x-default daima TR.
 */
export function contentAlternates(contentId: string, locale: string) {
  const entry = CONTENT_REGISTRY[contentId];
  const served = availableLocales(contentId).filter(isSeoLocale);
  const activeLocale: AppLocale = served.includes(locale as SeoLocale)
    ? (locale as SeoLocale)
    : served.includes("en")
      ? "en"
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

/**
 * Section hub sayfaları (/rehber, /karsilastir, ...) için alternates. Canonical
 * aktif dilin YERELLEŞTİRİLMİŞ hub slug'ını işaret eder (örn. en -> /en/guide);
 * hreflang yalnızca SECTION_HUB_SERVED'daki dilleri içerir.
 */
export function sectionHubAlternates(section: SectionKey, locale: string) {
  const served = (SECTION_HUB_SERVED[section] ?? [DEFAULT_LOCALE]).filter(
    isSeoLocale,
  );
  const activeLocale: AppLocale = served.includes(locale as SeoLocale)
    ? (locale as SeoLocale)
    : served.includes("en")
      ? "en"
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
