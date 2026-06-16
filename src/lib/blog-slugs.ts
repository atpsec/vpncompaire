// Cross-language slug map for hreflang/sitemap + geo locale redirects.
//
// Bu dosya BİLEREK saf veri + saf fonksiyondur (fs / MDX importu yok) ki
// `proxy.ts` (Edge runtime) buradan import edebilsin. `src/lib/blog.ts`
// bunları re-export eder; mevcut importerlar değişmeden çalışmaya devam eder.
//
// Key = canonical id (eski yazılar için TR slug ile eşleşir).
// TR/EN slug'ı farklı yeni yazı eklerken buraya giriş ekle.
export type BlogLocale = "tr" | "en" | "de";

export type BlogSlugEntry = {
  tr: string;
  en: string;
  /**
   * German content currently reuses the English slug for URL stability unless
   * a localized German slug is explicitly provided.
   */
  de?: string;
};

export const BLOG_SLUG_MAP: Record<string, BlogSlugEntry> = {
  "vpn-nedir-neden-gerekli": {
    tr: "vpn-nedir-neden-gerekli",
    en: "what-is-vpn-why-you-need-it",
  },
  "vpn-gizlilik-ve-guvenlik": {
    tr: "vpn-gizlilik-ve-guvenlik",
    en: "vpn-privacy-and-security",
  },
  "seyahatte-vpn-kullanimi": {
    tr: "seyahatte-vpn-kullanimi",
    en: "vpn-for-travel",
  },
  "is-ve-uzaktan-calisma-icin-vpn": {
    tr: "is-ve-uzaktan-calisma-icin-vpn",
    en: "vpn-for-remote-work",
  },
  "vpn-streaming-ve-icerik-erisimi": {
    tr: "vpn-streaming-ve-icerik-erisimi",
    en: "vpn-streaming-and-content-access",
  },
  "vpn-protokolleri-karsilastirmasi": {
    tr: "vpn-protokolleri-karsilastirmasi",
    en: "vpn-protocols-comparison",
  },
  "ucretsiz-vs-ucretli-vpn": {
    tr: "ucretsiz-vs-ucretli-vpn",
    en: "free-vs-paid-vpn",
  },
  "vpn-ve-hiz-performans-optimizasyonu": {
    tr: "vpn-ve-hiz-performans-optimizasyonu",
    en: "vpn-speed-optimization",
  },
  "vpn-secerken-dikkat-edilmesi-gerekenler": {
    tr: "vpn-secerken-dikkat-edilmesi-gerekenler",
    en: "how-to-choose-vpn",
  },
  "vpn-yasal-mi-ulkelere-gore-durum": {
    tr: "vpn-yasal-mi-ulkelere-gore-durum",
    en: "is-vpn-legal",
  },
  "kill-switch-nedir-vpn": {
    tr: "kill-switch-nedir-vpn",
    en: "vpn-kill-switch-explained",
  },
  "dns-leak-test-vpn": {
    tr: "dns-leak-test-vpn",
    en: "dns-leak-test-vpn",
  },
  "split-tunneling-vpn": {
    tr: "split-tunneling-vpn",
    en: "split-tunneling-vpn-explained",
  },
  "double-vpn-multihop": {
    tr: "double-vpn-multihop",
    en: "double-vpn-multihop-explained",
  },
  "ram-only-sunucu-vpn": {
    tr: "ram-only-sunucu-vpn",
    en: "ram-only-servers-vpn",
  },
  "disney-bbc-iplayer-vpn": {
    tr: "disney-bbc-iplayer-vpn",
    en: "disney-bbc-iplayer-vpn",
  },
  "canli-spor-yayinlari-vpn": {
    tr: "canli-spor-yayinlari-vpn",
    en: "live-sports-streaming-vpn",
  },
  "anime-crunchyroll-vpn": {
    tr: "anime-crunchyroll-vpn",
    en: "anime-crunchyroll-vpn",
  },
  "ucak-bileti-fiyat-vpn": {
    tr: "ucak-bileti-fiyat-vpn",
    en: "flight-tickets-vpn-savings",
  },
  "otel-rezervasyon-vpn": {
    tr: "otel-rezervasyon-vpn",
    en: "hotel-booking-vpn-savings",
  },
  "router-uzerinde-vpn-kurulum": {
    tr: "router-uzerinde-vpn-kurulum",
    en: "router-vpn-setup-guide",
  },
  "apple-tv-vpn-kurulum": {
    tr: "apple-tv-vpn-kurulum",
    en: "apple-tv-vpn-setup",
  },
  "xbox-playstation-vpn": {
    tr: "xbox-playstation-vpn",
    en: "xbox-playstation-vpn-setup",
  },
  "linux-vpn-kurulum-rehberi": {
    tr: "linux-vpn-kurulum-rehberi",
    en: "linux-vpn-setup-guide",
  },
  "macos-vpn-kurulum": {
    tr: "macos-vpn-kurulum",
    en: "macos-vpn-setup",
  },
  "ios-vpn-shortcuts-otomasyon": {
    tr: "ios-vpn-shortcuts-otomasyon",
    en: "ios-vpn-shortcuts-automation",
  },
  "cin-rusya-ai-erisim-vpn": {
    tr: "cin-rusya-ai-erisim-vpn",
    en: "china-russia-ai-access-vpn",
  },
  "online-kurs-udemy-vpn": {
    tr: "online-kurs-udemy-vpn",
    en: "online-courses-udemy-vpn",
  },
  "yazilim-abonelik-vpn-tasarruf": {
    tr: "yazilim-abonelik-vpn-tasarruf",
    en: "software-subscription-vpn-savings",
  },
  "youtube-premium-ucuz-vpn": {
    tr: "youtube-premium-ucuz-vpn",
    en: "youtube-premium-cheap-vpn",
  },
  "spotify-bolgesel-fiyat-vpn": {
    tr: "spotify-bolgesel-fiyat-vpn",
    en: "spotify-regional-pricing-vpn",
  },
  "playstation-xbox-store-vpn": {
    tr: "playstation-xbox-store-vpn",
    en: "playstation-xbox-store-vpn",
  },
  "ai-araclari-gizlilik-vpn": {
    tr: "ai-araclari-gizlilik-vpn",
    en: "ai-tools-privacy-vpn",
  },
  "chatgpt-plus-fiyat-vpn-tasarruf": {
    tr: "chatgpt-plus-fiyat-vpn-tasarruf",
    en: "chatgpt-plus-pricing-vpn-savings",
  },
  "ai-icerik-uretimi-vpn": {
    tr: "ai-icerik-uretimi-vpn",
    en: "ai-content-creation-vpn",
  },
  "ai-phishing-deepfake-vpn-koruma": {
    tr: "ai-phishing-deepfake-vpn-koruma",
    en: "ai-phishing-deepfake-vpn-protection",
  },
  "chatgpt-turkiye-erisim-vpn": {
    tr: "chatgpt-turkiye-erisim-vpn",
    en: "chatgpt-access-turkey-vpn",
  },
  "steam-bolgesel-fiyat-vpn": {
    tr: "steam-bolgesel-fiyat-vpn",
    en: "steam-regional-pricing-vpn",
  },
  "netflix-bolgesel-kutuphane-vpn": {
    tr: "netflix-bolgesel-kutuphane-vpn",
    en: "netflix-regional-libraries-vpn",
  },
  "wireguard-vs-openvpn-karsilastirma": {
    tr: "wireguard-vs-openvpn-karsilastirma",
    en: "wireguard-vs-openvpn-comparison",
  },
  "freelancer-icin-vpn": {
    tr: "freelancer-icin-vpn",
    en: "vpn-for-freelancers",
  },
  "yatirimci-trader-vpn": {
    tr: "yatirimci-trader-vpn",
    en: "vpn-for-investors-traders",
  },
  "gazeteci-aktivist-vpn": {
    tr: "gazeteci-aktivist-vpn",
    en: "vpn-for-journalists-activists",
  },
  "egitimci-ogretmen-vpn": {
    tr: "egitimci-ogretmen-vpn",
    en: "vpn-for-educators-teachers",
  },
  "nordvpn-vs-surfshark-karsilastirma": {
    tr: "nordvpn-vs-surfshark-karsilastirma",
    en: "nordvpn-vs-surfshark-comparison",
  },
  "expressvpn-vs-protonvpn-karsilastirma": {
    tr: "expressvpn-vs-protonvpn-karsilastirma",
    en: "expressvpn-vs-protonvpn-comparison",
  },
  "turkiye-icin-en-hizli-vpn-2026": {
    tr: "turkiye-icin-en-hizli-vpn-2026",
    en: "fastest-vpn-turkey-2026",
  },
  "vpn-abonelik-donemi-aylik-vs-yillik": {
    tr: "vpn-abonelik-donemi-aylik-vs-yillik",
    en: "vpn-subscription-monthly-vs-yearly",
  },
  "dijital-guvenlikten-korkanlar-icin-vpn": {
    tr: "dijital-guvenlikten-korkanlar-icin-vpn",
    en: "vpn-for-internet-security-anxiety",
  },
  "sahte-kargo-sms-e-devlet-linki-vpn": {
    tr: "sahte-kargo-sms-e-devlet-linki-vpn",
    en: "fake-delivery-sms-e-government-link-vpn",
  },
  "aile-icin-internet-guvenligi-vpn": {
    tr: "aile-icin-internet-guvenligi-vpn",
    en: "family-internet-safety-vpn",
  },
  "dns-webrtc-ip-sizintisi-ev-testi": {
    tr: "dns-webrtc-ip-sizintisi-ev-testi",
    en: "dns-webrtc-ip-leak-home-test",
  },
  "guvenilir-vpn-nasil-secilir-2026": {
    tr: "guvenilir-vpn-nasil-secilir-2026",
    en: "how-to-pick-trustworthy-vpn-2026",
  },
  "chatgpt-gemini-deepfake-dolandiricilik": {
    tr: "chatgpt-gemini-deepfake-dolandiricilik",
    en: "chatgpt-gemini-deepfake-scams",
  },
  "sahte-canli-yayin-film-izle-vpn": {
    tr: "sahte-canli-yayin-film-izle-vpn",
    en: "fake-live-streaming-sites-vpn",
  },
  "gram-altin-alisveris-fiyat-takibi-vpn": {
    tr: "gram-altin-alisveris-fiyat-takibi-vpn",
    en: "gold-shopping-price-tracking-vpn-privacy",
  },
  "android-iphone-spam-arama-vpn-guvenlik": {
    tr: "android-iphone-spam-arama-vpn-guvenlik",
    en: "android-iphone-spam-call-vpn-security",
  },
  "planckvpn-bagimsiz-vpn-analizi": {
    tr: "planckvpn-bagimsiz-vpn-analizi",
    en: "planckvpn-independent-vpn-analysis",
  },
  "halka-acik-wifi-vpn-guvenligi": {
    tr: "halka-acik-wifi-vpn-guvenligi",
    en: "public-wifi-vpn-security",
  },
  "iss-hiz-kisitlama-vpn": {
    tr: "iss-hiz-kisitlama-vpn",
    en: "isp-throttling-vpn",
  },
  "vpn-bagli-ama-calismiyor": {
    tr: "vpn-bagli-ama-calismiyor",
    en: "vpn-connected-but-not-working",
  },
  "webrtc-leak-vpn-cozum": {
    tr: "webrtc-leak-vpn-cozum",
    en: "webrtc-leak-vpn-fix",
  },
  "vpn-iki-faktorlu-dogrulama": {
    tr: "vpn-iki-faktorlu-dogrulama",
    en: "vpn-two-factor-authentication",
  },
  "tarayici-fingerprint-vpn": {
    tr: "tarayici-fingerprint-vpn",
    en: "browser-fingerprint-vpn",
  },
  "seyahatte-bankacilik-vpn": {
    tr: "seyahatte-bankacilik-vpn",
    en: "banking-while-traveling-vpn",
  },
  "vpn-birden-fazla-cihaz": {
    tr: "vpn-birden-fazla-cihaz",
    en: "vpn-multiple-devices-guide",
  },
  "uzaktan-calisma-gunluk-guvenlik": {
    tr: "uzaktan-calisma-gunluk-guvenlik",
    en: "remote-work-daily-security-vpn",
  },
  "vpn-mtu-optimizasyon": {
    tr: "vpn-mtu-optimizasyon",
    en: "vpn-mtu-optimization",
  },
  "ipv6-vpn-teknik-rehber": {
    tr: "ipv6-vpn-teknik-rehber",
    en: "ipv6-vpn-technical-guide",
  },
  "openvpn-manuel-kurulum": {
    tr: "openvpn-manuel-kurulum",
    en: "openvpn-manual-setup",
  },
  "vpn-deneme-para-iade": {
    tr: "vpn-deneme-para-iade",
    en: "vpn-trial-money-back-guide",
  },
  "vpn-yargi-yetkisi-secimi": {
    tr: "vpn-yargi-yetkisi-secimi",
    en: "vpn-jurisdiction-selection-guide",
  },
  "vpn-denetim-raporu-okuma": {
    tr: "vpn-denetim-raporu-okuma",
    en: "vpn-audit-report-guide",
  },
  "claude-anthropic-erisim-vpn": {
    tr: "claude-anthropic-erisim-vpn",
    en: "claude-anthropic-access-vpn",
  },
  "ai-api-anahtar-guvenlik-vpn": {
    tr: "ai-api-anahtar-guvenlik-vpn",
    en: "ai-api-keys-security-vpn",
  },
  "perplexity-ai-arama-vpn": {
    tr: "perplexity-ai-arama-vpn",
    en: "perplexity-ai-search-vpn",
  },
};

export function slugForLocale(entry: BlogSlugEntry, locale: BlogLocale): string {
  return locale === "de" ? entry.de ?? entry.en : entry[locale];
}

export function getBlogSlugEntry(
  slug: string,
  locale: BlogLocale,
): BlogSlugEntry | null {
  for (const entry of Object.values(BLOG_SLUG_MAP)) {
    if (slugForLocale(entry, locale) === slug) return entry;
  }
  return null;
}

export function getLocalizedBlogSlug(
  slug: string,
  fromLocale: BlogLocale,
  toLocale: BlogLocale,
): string | null {
  const entry = getBlogSlugEntry(slug, fromLocale);
  return entry ? slugForLocale(entry, toLocale) : null;
}

export function getCounterpartSlug(
  slug: string,
  fromLocale: BlogLocale,
  toLocale?: BlogLocale,
): string | null {
  const targetLocale = toLocale ?? (fromLocale === "tr" ? "en" : "tr");
  return getLocalizedBlogSlug(slug, fromLocale, targetLocale);
}
