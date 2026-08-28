// Merkezi, locale-aware path / slug altyapısı.
//
// Bu dosya BİLEREK saf veri + saf fonksiyondur (fs / next-intl importu yok) ki
// Edge runtime `proxy.ts`, sunucu component'leri, sitemap route'u ve Node tabanlı
// `scripts/audit-i18n.mjs` aynı kaynaktan beslenebilsin.
//
// Amaç: bir içeriğin (contentId) her dildeki DOĞRU section slug + page slug
// karşılığını tek yerden üretmek. Böylece `/de` altında Türkçe section slug
// (`rehber`), `/en` altında Türkçe section slug gibi tutarsızlıklar engellenir.

export type AppLocale = "tr" | "en" | "de";

export const APP_LOCALES: readonly AppLocale[] = ["tr", "en", "de"] as const;
/** English is the only public/canonical language. TR and DE remain legacy
 * URL signals so the proxy can redirect them without rendering mixed pages. */
export const DEFAULT_LOCALE: AppLocale = "en";

/** Locale-aware bölüm (section) slug'ları. Tek doğruluk kaynağı. */
export type SectionKey = "blog" | "guide" | "comparison" | "category";

export const SECTION_SLUGS: Record<AppLocale, Record<SectionKey, string>> = {
  tr: {
    blog: "blog",
    guide: "rehber",
    comparison: "karsilastir",
    category: "kategori",
  },
  en: {
    blog: "blog",
    guide: "guide",
    comparison: "comparison",
    category: "category",
  },
  de: {
    blog: "blog",
    guide: "ratgeber",
    comparison: "vergleich",
    category: "kategorie",
  },
} as const;

/** İçeriğin tek bir dildeki URL bileşenleri. */
export type ContentTranslation = {
  section: SectionKey;
  slug: string;
  title: string;
};

/** Bir içeriğin (contentId) dil-bağımsız tanımı. */
export type ContentEntry = {
  id: string;
  /**
   * Her dildeki URL bileşenleri (section + slug). `getLocalizedPath` bunları
   * kullanır; yani buraya yazılan slug "URL üretimi için tanımlı"dır.
   */
  translations: Partial<Record<AppLocale, ContentTranslation>>;
  /**
   * O dilde GERÇEKTEN servis edilen (200 dönen, gerçek dilde içerik barındıran)
   * locale listesi. Verilmezse `translations`'taki tüm diller servis ediliyor
   * kabul edilir. Sitemap, hreflang ve redirect kararları BU listeye dayanır.
   *
   * Örn: rehber içerikleri şu an yalnızca Türkçe mevcut; slug'ları EN/DE için
   * tanımlı olsa da `served: ["tr"]`. EN/DE çevirisi + route eklendiğinde
   * buraya o dil eklenir ve URL/canonical/hreflang/sitemap otomatik açılır.
   */
  served?: AppLocale[];
};

// İçerik kayıt defteri. Yeni lokalize içerik eklerken buraya giriş ekle.
// NOT: Şu an site genelinde rehber/karşılaştırma içerikleri yalnızca Türkçe
// mevcut; bu yüzden çoğu giriş yalnızca `tr` taşır. Bir sayfanın EN/DE çevirisi
// eklendiğinde ilgili dil girişi buraya eklenir ve URL/canonical/hreflang/sitemap
// otomatik olarak doğru çalışır.
export const CONTENT_REGISTRY: Record<string, ContentEntry> = {
  "what-is-vpn": {
    id: "what-is-vpn",
    translations: {
      tr: { section: "guide", slug: "vpn-nedir", title: "VPN nedir?" },
      en: { section: "guide", slug: "what-is-a-vpn", title: "What Is a VPN?" },
      de: {
        section: "guide",
        slug: "was-ist-ein-vpn",
        title: "Was ist ein VPN?",
      },
    },
    // Flagship: üç dilde de gerçek lokalize içerik mevcut (locale-aware sayfa).
    served: ["tr", "en", "de"],
  },
  "free-vs-paid-vpn": {
    id: "free-vs-paid-vpn",
    translations: {
      tr: {
        section: "guide",
        slug: "ucretsiz-vs-ucretli-vpn",
        title: "Ücretsiz vs Ücretli VPN",
      },
      en: {
        section: "guide",
        slug: "free-vs-paid-vpn",
        title: "Free vs Paid VPN",
      },
      de: {
        section: "guide",
        slug: "kostenloses-vs-kostenpflichtiges-vpn",
        title: "Kostenloses vs. kostenpflichtiges VPN",
      },
    },
    served: ["tr", "en", "de"],
  },
  "vpn-security-checklist": {
    id: "vpn-security-checklist",
    translations: {
      tr: {
        section: "guide",
        slug: "vpn-guvenlik-kontrol-listesi",
        title: "VPN güvenlik kontrol listesi",
      },
      en: {
        section: "guide",
        slug: "vpn-security-checklist",
        title: "VPN Security Checklist",
      },
      de: {
        section: "guide",
        slug: "vpn-sicherheits-checkliste",
        title: "VPN-Sicherheits-Checkliste",
      },
    },
    served: ["tr", "en", "de"],
  },
  "is-vpn-legal-in-turkey": {
    id: "is-vpn-legal-in-turkey",
    translations: {
      tr: {
        section: "guide",
        slug: "turkiye-de-vpn-yasal-mi",
        title: "Türkiye'de VPN yasal mı?",
      },
      en: {
        section: "guide",
        slug: "is-vpn-legal-in-turkey",
        title: "Is VPN Legal in Turkey?",
      },
      de: {
        section: "guide",
        slug: "ist-vpn-in-der-tuerkei-legal",
        title: "Ist VPN in der Türkei legal?",
      },
    },
    served: ["tr", "en", "de"],
  },
  "vpn-for-students": {
    id: "vpn-for-students",
    translations: {
      tr: {
        section: "guide",
        slug: "ogrenciler-icin-vpn",
        title: "Öğrenciler için VPN",
      },
      en: {
        section: "guide",
        slug: "vpn-for-students",
        title: "VPN for Students",
      },
      de: {
        section: "guide",
        slug: "vpn-fuer-studenten",
        title: "VPN für Studenten",
      },
    },
    served: ["tr", "en", "de"],
  },
  "vpn-for-turks-abroad": {
    id: "vpn-for-turks-abroad",
    translations: {
      tr: {
        section: "guide",
        slug: "yurt-disindaki-turkler-icin-vpn",
        title: "Yurt dışındaki Türkler için VPN",
      },
      en: {
        section: "guide",
        slug: "vpn-for-turks-abroad",
        title: "VPN for Turks Abroad",
      },
      de: {
        section: "guide",
        slug: "vpn-fuer-tuerken-im-ausland",
        title: "VPN für Türken im Ausland",
      },
    },
    served: ["tr", "en", "de"],
  },
  "vpn-for-families": {
    id: "vpn-for-families",
    translations: {
      tr: {
        section: "guide",
        slug: "aile-ve-cocuklar-icin-vpn",
        title: "Aile ve çocuklar için VPN",
      },
      en: {
        section: "guide",
        slug: "vpn-for-families",
        title: "VPN for Families",
      },
      de: {
        section: "guide",
        slug: "vpn-fuer-familien",
        title: "VPN für Familien",
      },
    },
    served: ["tr", "en", "de"],
  },
  "vpn-for-remote-workers": {
    id: "vpn-for-remote-workers",
    translations: {
      tr: {
        section: "guide",
        slug: "uzaktan-calisanlar-icin-vpn",
        title: "Uzaktan çalışanlar için VPN",
      },
      en: {
        section: "guide",
        slug: "vpn-for-remote-workers",
        title: "VPN for Remote Workers",
      },
      de: {
        section: "guide",
        slug: "vpn-fuer-remote-arbeit",
        title: "VPN für Remote-Arbeit",
      },
    },
    served: ["tr", "en", "de"],
  },
  "vpn-for-seniors": {
    id: "vpn-for-seniors",
    translations: {
      tr: {
        section: "guide",
        slug: "yaslilar-icin-vpn",
        title: "Yaşlılar için VPN",
      },
      en: {
        section: "guide",
        slug: "vpn-for-seniors",
        title: "VPN for Seniors",
      },
      de: {
        section: "guide",
        slug: "vpn-fuer-senioren",
        title: "VPN für Senioren",
      },
    },
    served: ["tr", "en", "de"],
  },
  "vpn-for-gamers": {
    id: "vpn-for-gamers",
    translations: {
      tr: {
        section: "guide",
        slug: "gamerlar-icin-vpn",
        title: "Gamerlar için VPN",
      },
      en: {
        section: "guide",
        slug: "vpn-for-gamers",
        title: "VPN for Gamers",
      },
      de: {
        section: "guide",
        slug: "vpn-fuer-gamer",
        title: "VPN für Gamer",
      },
    },
    served: ["tr", "en", "de"],
  },
  // Karşılaştırmalar: marka isimleri evrensel olduğundan slug üç dilde de aynı;
  // yalnızca section slug'ı lokalize olur (/karsilastir, /comparison, /vergleich).
  "nordvpn-vs-surfshark": {
    id: "nordvpn-vs-surfshark",
    translations: {
      tr: {
        section: "comparison",
        slug: "nordvpn-vs-surfshark",
        title: "NordVPN vs Surfshark",
      },
      en: {
        section: "comparison",
        slug: "nordvpn-vs-surfshark",
        title: "NordVPN vs Surfshark",
      },
      de: {
        section: "comparison",
        slug: "nordvpn-vs-surfshark",
        title: "NordVPN vs Surfshark",
      },
    },
    served: ["tr", "en", "de"],
  },
  "expressvpn-vs-nordvpn": {
    id: "expressvpn-vs-nordvpn",
    translations: {
      tr: {
        section: "comparison",
        slug: "expressvpn-vs-nordvpn",
        title: "ExpressVPN vs NordVPN",
      },
      en: {
        section: "comparison",
        slug: "expressvpn-vs-nordvpn",
        title: "ExpressVPN vs NordVPN",
      },
      de: {
        section: "comparison",
        slug: "expressvpn-vs-nordvpn",
        title: "ExpressVPN vs NordVPN",
      },
    },
    served: ["tr", "en", "de"],
  },
  "proton-vs-mullvad": {
    id: "proton-vs-mullvad",
    translations: {
      tr: {
        section: "comparison",
        slug: "proton-vs-mullvad",
        title: "Proton VPN vs Mullvad",
      },
      en: {
        section: "comparison",
        slug: "proton-vs-mullvad",
        title: "Proton VPN vs Mullvad",
      },
      de: {
        section: "comparison",
        slug: "proton-vs-mullvad",
        title: "Proton VPN vs Mullvad",
      },
    },
    served: ["tr", "en", "de"],
  },
  "opera-vpn-vs-proton-vpn": {
    id: "opera-vpn-vs-proton-vpn",
    translations: {
      tr: {
        section: "comparison",
        slug: "opera-vpn-vs-proton-vpn",
        title: "Opera VPN vs Proton VPN",
      },
      en: {
        section: "comparison",
        slug: "opera-vpn-vs-proton-vpn",
        title: "Opera VPN vs Proton VPN",
      },
      de: {
        section: "comparison",
        slug: "opera-vpn-vs-proton-vpn",
        title: "Opera VPN vs Proton VPN",
      },
    },
    served: ["tr", "en", "de"],
  },
};

/**
 * Bölüm (section) modeline girmeyen, içeriği yalnızca Türkçe servis edilen
 * TEKİL sayfalar. EN/DE prefix'li istekleri TR kanoniğe 301'lenir.
 * (Örn. /en/en-iyi/turkiye -> /en-iyi/turkiye. /en-iyi altındaki lokalize
 * use-case sayfaları — gizlilik, streaming, oyun, seyahat — etkilenmez.)
 */
export const TR_ONLY_EXACT_PATHS: ReadonlySet<string> = new Set([
  "en-iyi/turkiye",
  "en-iyi/yurt-disindaki-turkler",
]);

/**
 * Section HUB sayfalarının (örn. /rehber, /karsilastir) hangi dillerde GERÇEK
 * lokalize içeriği var. Yalnızca burada listelenen diller için localized hub
 * slug'ı (örn. /en/guide, /de/vergleich) etkinleştirilir; diğerleri olduğu gibi
 * (Türkçe slug + mevcut davranış) bırakılır.
 *
 *  - guide hub (rehber/page.tsx): tr/en/de içerik var.
 *  - comparison hub (karsilastir/page.tsx): compareHub namespace ile tr/en/de.
 *  - category: hub route'u yok.
 */
export const SECTION_HUB_SERVED: Partial<Record<SectionKey, AppLocale[]>> = {
  guide: ["tr", "en", "de"],
  comparison: ["tr", "en", "de"],
};

function localePrefix(locale: AppLocale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/**
 * Bir bölümün (section) locale-aware hub yolunu üretir.
 * Örn: { locale: "de", section: "guide" } -> "/de/ratgeber"
 */
export function getLocalizedSectionPath(
  locale: AppLocale,
  section: SectionKey,
): string {
  return `${localePrefix(locale)}/${SECTION_SLUGS[locale][section]}`;
}

export type LocalizedPathInput = {
  locale: AppLocale;
  section: SectionKey;
  contentId?: string;
};

/**
 * next-intl `Link` için locale-PREFIX'SİZ yerelleştirilmiş yol üretir
 * (Link aktif locale prefix'ini kendisi ekler). Örn. locale=en, what-is-vpn
 * -> "/guide/what-is-a-vpn"; locale=tr -> "/rehber/vpn-nedir".
 */
export function getLocalizedLinkHref(input: LocalizedPathInput): string {
  const full = getLocalizedPath(input);
  return input.locale === DEFAULT_LOCALE
    ? full
    : full.slice(`/${input.locale}`.length);
}

/**
 * Locale + section + contentId'den DOĞRU, locale-aware tam yolu üretir.
 *
 * getLocalizedPath({ locale: "de", section: "guide", contentId: "what-is-vpn" })
 *   -> "/de/ratgeber/was-ist-ein-vpn"
 * getLocalizedPath({ locale: "en", section: "guide", contentId: "what-is-vpn" })
 *   -> "/en/guide/what-is-a-vpn"
 * getLocalizedPath({ locale: "tr", section: "guide", contentId: "what-is-vpn" })
 *   -> "/rehber/vpn-nedir"
 *
 * `contentId` verilmez veya o dilde çevirisi yoksa section hub yoluna düşülür.
 */
export function getLocalizedPath({
  locale,
  section,
  contentId,
}: LocalizedPathInput): string {
  const hub = getLocalizedSectionPath(locale, section);
  if (!contentId) return hub;

  const entry = CONTENT_REGISTRY[contentId];
  const translation = entry?.translations[locale];
  if (!translation) return hub;

  // Section, contentId'nin kayıtlı section'ı ile çelişirse contentId kazanır.
  const sectionSlug = SECTION_SLUGS[locale][translation.section];
  return `${localePrefix(locale)}/${sectionSlug}/${translation.slug}`;
}

/** Bir slug'ın hangi section'a ait olduğunu (herhangi bir dilde) bulur. */
export function sectionForSlug(slug: string): SectionKey | null {
  for (const locale of APP_LOCALES) {
    const map = SECTION_SLUGS[locale];
    for (const key of Object.keys(map) as SectionKey[]) {
      if (map[key] === slug) return key;
    }
  }
  return null;
}

/** Localized bir section slug'ının ait olduğu dili döndürür (ilk eşleşme). */
export function localeForSectionSlug(slug: string): AppLocale | null {
  for (const locale of APP_LOCALES) {
    const map = SECTION_SLUGS[locale];
    for (const key of Object.keys(map) as SectionKey[]) {
      if (map[key] === slug) return locale;
    }
  }
  return null;
}

/** (section, page slug) -> contentId. Hangi dilde olduğundan bağımsız arar. */
export function findContentBySlug(
  section: SectionKey,
  pageSlug: string,
): { contentId: string; locale: AppLocale } | null {
  for (const [contentId, entry] of Object.entries(CONTENT_REGISTRY)) {
    for (const locale of APP_LOCALES) {
      const t = entry.translations[locale];
      if (t && t.section === section && t.slug === pageSlug) {
        return { contentId, locale };
      }
    }
  }
  return null;
}

/** İçeriğin gerçekten servis edildiği (200 + doğru dilde) locale'leri döndürür. */
export function availableLocales(contentId: string): AppLocale[] {
  const entry = CONTENT_REGISTRY[contentId];
  if (!entry) return [];
  if (entry.served) {
    return APP_LOCALES.filter(
      (l) => entry.served!.includes(l) && Boolean(entry.translations[l]),
    );
  }
  return APP_LOCALES.filter((l) => Boolean(entry.translations[l]));
}

/** İçerik için URL üretilebilen (slug tanımlı) tüm dilleri döndürür. */
export function definedLocales(contentId: string): AppLocale[] {
  const entry = CONTENT_REGISTRY[contentId];
  if (!entry) return [];
  return APP_LOCALES.filter((l) => Boolean(entry.translations[l]));
}

/**
 * Bir içeriğin, verilen istek locale'i için kanonik (servis edilen) URL'sini
 * döndürür. İstek locale'i servis edilmiyorsa default locale'e (yoksa ilk
 * servis edilen dile) düşülür.
 */
export function canonicalServedPath(
  contentId: string,
  requestLocale: AppLocale,
): string | null {
  const served = availableLocales(contentId);
  if (served.length === 0) return null;
  const target = served.includes(requestLocale)
    ? requestLocale
    : served.includes(DEFAULT_LOCALE)
      ? DEFAULT_LOCALE
      : served[0];
  const t = CONTENT_REGISTRY[contentId].translations[target]!;
  return getLocalizedPath({ locale: target, section: t.section, contentId });
}

export type HreflangAlternate = { hreflang: string; href: string };

/**
 * Bir içeriğin hreflang alternatiflerini SADECE gerçekten mevcut diller için
 * üretir. x-default daima default locale (TR) varsa onu işaret eder.
 * `baseUrl` mutlak origin (örn. "https://vpnadvisor.net").
 */
export function buildContentAlternates(
  contentId: string,
  baseUrl: string,
): HreflangAlternate[] {
  const origin = baseUrl.replace(/\/$/, "");
  const locales = availableLocales(contentId);
  const entry = CONTENT_REGISTRY[contentId];
  if (!entry || locales.length === 0) return [];

  const alts: HreflangAlternate[] = locales.map((locale) => {
    const t = entry.translations[locale]!;
    return {
      hreflang: locale,
      href: `${origin}${getLocalizedPath({ locale, section: t.section, contentId })}`,
    };
  });

  const xDefaultLocale = locales.includes(DEFAULT_LOCALE)
    ? DEFAULT_LOCALE
    : locales[0];
  const xt = entry.translations[xDefaultLocale]!;
  alts.push({
    hreflang: "x-default",
    href: `${origin}${getLocalizedPath({ locale: xDefaultLocale, section: xt.section, contentId })}`,
  });

  return alts;
}

/**
 * Yanlış-dil/section URL'leri için 301 hedefini hesaplar (yoksa null).
 *
 * Kapsam: yalnızca locale-aware bölümlerden içeriği şu an Türkçe-merkezli olan
 * `guide` / `comparison` / `category` DETAY sayfaları. (Section hub'ları ve
 * gerçekten lokalize bölümler — blog, araclar, cihazlar, inceleme, en-iyi vb. —
 * dokunulmaz.)
 *
 * Karar registry/slug eşlemesi üzerinden verilir (kör string replace değil):
 *  - Slug registry'de tanımlıysa: içeriğin SERVİS EDİLEN dili kanonik kabul
 *    edilir (istek dili servis ediliyorsa ona, değilse TR'ye).
 *  - Tanımlı değilse (politika gereği TR-only): TR section + aynı page slug.
 */
const REDIRECT_MANAGED_SECTIONS: SectionKey[] = [
  "guide",
  "comparison",
  "category",
];

function parseLocale(segments: string[]): {
  urlLocale: AppLocale;
  rest: string[];
} {
  const maybeLocale = segments[0];
  const hasExplicitLocale = APP_LOCALES.includes(maybeLocale as AppLocale);
  const urlLocale: AppLocale = hasExplicitLocale
    ? (maybeLocale as AppLocale)
    : DEFAULT_LOCALE;
  const rest = hasExplicitLocale ? segments.slice(1) : segments;
  return { urlLocale, rest };
}

/**
 * Permanent migration for the old locale-prefixed site. The old path is
 * stripped first, then passed through the content registry so Turkish and
 * German slugs land on the matching English URL instead of the homepage.
 */
export function resolveLegacyLocaleRedirect(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];
  if (locale !== "tr" && locale !== "de") return null;

  const rest = segments.slice(1).join("/");
  if (!rest) return "/";

  const strippedPath = `/${rest}`;
  return canonicalEnglishPath(resolveLocalizedRedirect(strippedPath) ?? strippedPath);
}

export function resolveLocalizedRedirect(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const { urlLocale, rest } = parseLocale(segments);
  if (rest.length === 0) return null;

  // Section modeli dışındaki TR-only tekil sayfalar (örn. /en-iyi/turkiye):
  // EN/DE prefix'li istekleri TR kanoniğe 301.
  if (urlLocale !== DEFAULT_LOCALE && TR_ONLY_EXACT_PATHS.has(rest.join("/"))) {
    return `/${rest.join("/")}`;
  }

  const sectionSlug = rest[0];
  const section = sectionForSlug(sectionSlug);
  if (!section || !REDIRECT_MANAGED_SECTIONS.includes(section)) return null;

  // HUB (section + slug yok): localized hub slug'ına kanonikleştir.
  // Örn. /en/rehber -> /en/guide, /de/karsilastir -> /de/vergleich.
  if (rest.length === 1) {
    const hubLocales = SECTION_HUB_SERVED[section];
    if (!hubLocales || !hubLocales.includes(urlLocale)) return null;
    const target = getLocalizedSectionPath(urlLocale, section);
    return target === pathname ? null : target;
  }

  // DETAY (section + page slug): içeriğin gerçek dilindeki kanonik URL.
  const pageSlug = rest[1];
  const extra = rest.slice(2).join("/");

  let target: string | null;
  const found = findContentBySlug(section, pageSlug);
  if (found) {
    target = canonicalServedPath(found.contentId, urlLocale);
  } else {
    // Kayıtlı değil → politika gereği TR-only içerik. TR section + page slug.
    target = `/${SECTION_SLUGS[DEFAULT_LOCALE][section]}/${pageSlug}`;
  }

  if (!target) return null;
  if (extra) target = `${target}/${extra}`;

  return target === pathname ? null : target;
}

/**
 * Yerelleştirilmiş (public) URL'yi, sayfayı render eden iç (Türkçe-slug)
 * route'a çevirir (NextResponse.rewrite için). URL değişmez; yalnızca hangi
 * dosyanın render edileceği belirlenir.
 *
 *  /en/guide/what-is-a-vpn   -> /en/rehber/vpn-nedir   (kayıtlı içerik)
 *  /de/ratgeber/was-ist-ein-vpn -> /de/rehber/vpn-nedir
 *  /en/comparison            -> /en/karsilastir        (hub)
 *  /de/vergleich             -> /de/karsilastir
 *
 * Rewrite gerekmiyorsa (zaten iç route, TR slug, veya yönetilmeyen path) null.
 */
export function resolveInternalRewrite(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const { urlLocale, rest } = parseLocale(segments);
  if (rest.length === 0) return null;

  const sectionSlug = rest[0];
  const section = sectionForSlug(sectionSlug);
  if (!section || !REDIRECT_MANAGED_SECTIONS.includes(section)) return null;

  // Route folders retain their original Turkish names internally; public
  // canonical URLs use the English section slug and no /en prefix.
  const internalSection = SECTION_SLUGS.tr[section];
  // The public URL is locale-neutral, but the filesystem route still needs
  // the [locale] segment for Next.js to select the English page.
  const prefix = `/${urlLocale}`;

  // HUB
  if (rest.length === 1) {
    const hubLocales = SECTION_HUB_SERVED[section];
    if (!hubLocales || !hubLocales.includes(urlLocale)) return null;
    // Only the public English slug needs an internal rewrite. Legacy locale
    // prefixes are redirected before this function is reached.
    if (sectionSlug !== SECTION_SLUGS[urlLocale][section]) return null;
    return `${prefix}/${internalSection}`;
  }

  // DETAY
  const pageSlug = rest[1];
  const extra = rest.slice(2).join("/");
  const found = findContentBySlug(section, pageSlug);
  if (!found) return null;
  if (!availableLocales(found.contentId).includes(urlLocale)) return null;

  const internalTranslation = CONTENT_REGISTRY[found.contentId].translations.tr;
  if (!internalTranslation) return null;

  let target = `${prefix}/${internalSection}/${internalTranslation.slug}`;
  if (extra) target = `${target}/${extra}`;
  return target === pathname ? null : target;
}

// Localized section slug'larının bir listesi (audit/redirect için pratik).
export const ALL_SECTION_SLUGS: string[] = Array.from(
  new Set(
    APP_LOCALES.flatMap((l) =>
      (Object.keys(SECTION_SLUGS[l]) as SectionKey[]).map(
        (k) => SECTION_SLUGS[l][k],
      ),
    ),
  ),
);

/** Public English route names. The filesystem keeps its established Turkish
 * route folders to avoid deleting or moving content, while visitors and
 * search engines see consistent English URLs. */
const PUBLIC_ROUTE_MAP: Readonly<Record<string, string>> = {
  reviews: "inceleme",
  comparison: "karsilastir",
  guide: "rehber",
  devices: "cihazlar",
  tools: "araclar",
  quiz: "sana-uygun-vpn",
  "vpn-reviews": "en-iyi-vpn",
  "best-vpn": "en-iyi",
  methodology: "metodoloji",
  research: "arastirma",
  about: "hakkimizda",
  contact: "iletisim",
  "affiliate-disclosure": "reklam-aciklamasi",
  "legal-notice": "yasal-uyari",
  "privacy-policy": "gizlilik",
  "cookie-policy": "cerez-politikasi",
  terms: "sartlar",
  "refund-policy": "iptal-ve-iade",
  calculator: "hesaplayici",
  "server-map": "sunucu-haritasi",
  glossary: "sozluk",
  "security-tools": "guvenlik-araclari",
};

const USE_CASE_PUBLIC_SLUGS: Readonly<Record<string, string>> = {
  gizlilik: "privacy",
  streaming: "streaming",
  oyun: "gaming",
  seyahat: "travel",
  turkiye: "turkey",
  "yurt-disindaki-turkler": "turks-abroad",
};

const USE_CASE_INTERNAL_SLUGS = new Map(
  Object.entries(USE_CASE_PUBLIC_SLUGS).map(([internal, publicSlug]) => [
    publicSlug,
    internal,
  ]),
);

const TOOL_PUBLIC_SLUGS: Readonly<Record<string, string>> = {
  "email-guvenlik-kontrolu": "email-security-check",
  "ip-adresim": "my-ip",
  "vpn-hiz-testi": "vpn-speed-test",
  "internette-sen": "what-websites-can-see",
};

const TOOL_INTERNAL_SLUGS = new Map(
  Object.entries(TOOL_PUBLIC_SLUGS).map(([internal, publicSlug]) => [
    publicSlug,
    internal,
  ]),
);

function stripExplicitEnglishPrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] === "en"
    ? `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/"
    : pathname || "/";
}

/** Convert an internal/legacy path into its public English canonical path. */
export function canonicalEnglishPath(pathname: string): string {
  const normalized = stripExplicitEnglishPrefix(pathname);
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "/";

  const [first, ...rest] = segments;
  if (first === "blog" || first === "go" || first === "vpn-test") {
    return `/${segments.join("/")}`;
  }

  const publicRoot = Object.entries(PUBLIC_ROUTE_MAP).find(
    ([publicSlug]) => publicSlug === first,
  )?.[0];
  if (publicRoot) {
    if (publicRoot === "tools" && rest[0]) {
      return `/tools/${TOOL_PUBLIC_SLUGS[rest[0]] ?? rest[0]}${
        rest.length > 1 ? `/${rest.slice(1).join("/")}` : ""
      }`;
    }
    if (publicRoot === "best-vpn" && rest[0]) {
      return `/best-vpn/${USE_CASE_PUBLIC_SLUGS[rest[0]] ?? rest[0]}${
        rest.length > 1 ? `/${rest.slice(1).join("/")}` : ""
      }`;
    }
    if (publicRoot === "guide" || publicRoot === "comparison") {
      const section = publicRoot === "guide" ? "guide" : "comparison";
      const found = rest[0] ? findContentBySlug(section, rest[0]) : null;
      if (found) return getLocalizedPath({ locale: "en", section, contentId: found.contentId });
    }
    return `/${segments.join("/")}`;
  }

  const publicEntry = Object.entries(PUBLIC_ROUTE_MAP).find(
    ([, internalSlug]) => internalSlug === first,
  );
  if (!publicEntry) return `/${segments.join("/")}`;

  const [publicSlug] = publicEntry;
  if (publicSlug === "tools" && rest[0]) {
    return `/tools/${TOOL_PUBLIC_SLUGS[rest[0]] ?? rest[0]}${
      rest.length > 1 ? `/${rest.slice(1).join("/")}` : ""
    }`;
  }
  if (publicSlug === "best-vpn" && rest[0]) {
    return `/best-vpn/${USE_CASE_PUBLIC_SLUGS[rest[0]] ?? rest[0]}${
      rest.length > 1 ? `/${rest.slice(1).join("/")}` : ""
    }`;
  }

  if (publicSlug === "guide" || publicSlug === "comparison") {
    const section = publicSlug === "guide" ? "guide" : "comparison";
    const found = rest[0] ? findContentBySlug(section, rest[0]) : null;
    if (found) return getLocalizedPath({ locale: "en", section, contentId: found.contentId });
  }

  return `/${publicSlug}${rest.length ? `/${rest.join("/")}` : ""}`;
}

/** Redirect old internal English-site paths to the new English URL system. */
export function resolveEnglishLegacyRedirect(pathname: string): string | null {
  const target = canonicalEnglishPath(pathname);
  return target === pathname ? null : target;
}

/** Rewrite a canonical English public path to the existing route folder. */
export function resolveEnglishPublicRewrite(pathname: string): string | null {
  const normalized = stripExplicitEnglishPrefix(pathname);
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const [first, ...rest] = segments;
  const internalRoot = PUBLIC_ROUTE_MAP[first];
  if (!internalRoot) return null;

  if (first === "best-vpn" && rest[0]) {
    const internalUseCase = USE_CASE_INTERNAL_SLUGS.get(rest[0]) ?? rest[0];
    return `/${DEFAULT_LOCALE}/en-iyi/${internalUseCase}${rest.length > 1 ? `/${rest.slice(1).join("/")}` : ""}`;
  }

  if (first === "tools" && rest[0]) {
    const internalTool = TOOL_INTERNAL_SLUGS.get(rest[0]) ?? rest[0];
    return `/${DEFAULT_LOCALE}/${internalRoot}/${internalTool}${
      rest.length > 1 ? `/${rest.slice(1).join("/")}` : ""
    }`;
  }

  if (first === "guide" || first === "comparison") {
    const section = first === "guide" ? "guide" : "comparison";
    if (!rest[0]) return `/${DEFAULT_LOCALE}/${internalRoot}`;
    const found = findContentBySlug(section, rest[0]);
    const internalSlug = found
      ? CONTENT_REGISTRY[found.contentId].translations.tr?.slug
      : rest[0];
    return `/${DEFAULT_LOCALE}/${internalRoot}/${internalSlug}${rest.length > 1 ? `/${rest.slice(1).join("/")}` : ""}`;
  }

  return `/${DEFAULT_LOCALE}/${internalRoot}${rest.length ? `/${rest.join("/")}` : ""}`;
}

/**
 * Aynı locale'in iki kez yazıldığı eski/bozuk public URL'yi kanoniğe indirger.
 *
 * Örn. `/de/de/sana-uygun-vpn` -> `/de/sana-uygun-vpn`,
 * `/en/en/hesaplayici` -> `/en/hesaplayici`, `/tr/tr/blog` -> `/blog`.
 * Bu kontrol proxy'de diğer i18n kurallarından önce çalışır; böylece eski
 * client-side dil değiştirici linkleri 404 üretmek yerine kalıcı olarak
 * doğru adrese taşınır.
 */
export function resolveDuplicateLocaleRedirect(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];

  if (!locale || !APP_LOCALES.includes(locale as AppLocale)) return null;
  if (segments[1] !== locale) return null;

  const rest = segments.slice(2).join("/");
  if (locale === DEFAULT_LOCALE) return rest ? `/${rest}` : "/";
  return rest ? `/${locale}/${rest}` : `/${locale}`;
}

/**
 * Dil değiştirici için: mevcut pathname'i hedef locale'in doğru public path'ine
 * çevirir. Blog slug'ları language-switcher içinde ayrı işlenir.
 */
export function localizePathname(pathname: string, targetLocale: AppLocale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return normalized;

  // Accept both the locale-prefixed public form (/en/...) and the
  // locale-neutral form used by next-intl links (/...).
  const pathSegments = APP_LOCALES.includes(segments[0] as AppLocale)
    ? segments.slice(1)
    : segments;
  const localeNeutralPath = `/${pathSegments.join("/")}`;

  if (pathSegments.length === 0) {
    return targetLocale === DEFAULT_LOCALE ? "/" : `/${targetLocale}`;
  }

  const sectionSlug = pathSegments[0];
  const section = sectionForSlug(sectionSlug);
  if (!section) {
    // Product and device data currently have TR/EN source content only. Keep
    // German links on the real English page instead of creating a German URL
    // whose visible data is not German.
    if (
      targetLocale === "de" &&
      (pathSegments[0] === "inceleme" || pathSegments[0] === "cihazlar")
    ) {
      return `/en${localeNeutralPath}`;
    }
    // Generic locale-aware routes (reviews, tools, legal pages, etc.) do not
    // have translated slugs, so only the locale prefix changes.
    if (TR_ONLY_EXACT_PATHS.has(pathSegments.join("/"))) {
      return localeNeutralPath;
    }
    return targetLocale === DEFAULT_LOCALE
      ? localeNeutralPath
      : `/${targetLocale}${localeNeutralPath}`;
  }

  if (pathSegments.length === 1) {
    const hubLocales = SECTION_HUB_SERVED[section];
    if (hubLocales?.includes(targetLocale)) {
      return getLocalizedSectionPath(targetLocale, section);
    }
    return normalized;
  }

  const pageSlug = pathSegments[1];
  const found = findContentBySlug(section, pageSlug);
  if (found) {
    const served = availableLocales(found.contentId);
    const effectiveLocale = served.includes(targetLocale)
      ? targetLocale
      : DEFAULT_LOCALE;
    const canonical = canonicalServedPath(found.contentId, effectiveLocale);
    if (canonical) {
      const extra = pathSegments.slice(2);
      return extra.length > 0 ? `${canonical}/${extra.join("/")}` : canonical;
    }
  }

  return targetLocale === DEFAULT_LOCALE
    ? localeNeutralPath
    : `/${targetLocale}${localeNeutralPath}`;
}
