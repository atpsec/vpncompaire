import type { Locale, Localized } from "@/i18n/pick";
import { extendedRawProducts } from "./products-extended";

type LocText = Localized<string>;

export type ProductHighlights = {
  audits?: LocText;
  servers?: LocText;
  devices?: LocText;
  jurisdiction?: LocText;
  openSource?: boolean;
  moneyBackDays?: number;
};

type RawPricingPlan = {
  name: LocText;
  durationMonths: number;
  monthlyPriceUsd: number;
  totalPriceUsd: number;
  savingsPercent?: number;
  campaign?: LocText;
  isBestValue?: boolean;
};

export type PricingPlan = {
  name: string;
  durationMonths: number;
  monthlyPriceUsd: number;
  totalPriceUsd: number;
  savingsPercent?: number;
  campaign?: string;
  isBestValue?: boolean;
};

export type PriceCurrency = "USD" | "EUR";

export type TestEnvironment = {
  testerLocation: string;
  vpnVersion: string;
  testDuration: string;
};

export type RawProduct = {
  slug: string;
  brand: string;
  positioning: LocText;
  summary: LocText;
  score: number;
  priceFromUsd: number;
  priceCurrency?: PriceCurrency;
  rank: number;
  pros: LocText[];
  cons: LocText[];
  highlights: ProductHighlights;
  hasAffiliate: boolean;
  pricingUrl: string;
  pricingVerifiedAt: string;
  plans: RawPricingPlan[];
  lastTestedAt: string;
  testEnvironment: TestEnvironment;
  editorNotes: LocText;
};

export type Product = {
  slug: string;
  brand: string;
  positioning: string;
  summary: string;
  score: number;
  priceFromUsd: number;
  priceCurrency: PriceCurrency;
  rank: number;
  pros: string[];
  cons: string[];
  highlights: {
    audits?: string;
    servers?: string;
    devices?: string;
    jurisdiction?: string;
    openSource?: boolean;
    moneyBackDays?: number;
  };
  hasAffiliate: boolean;
  pricingUrl: string;
  pricingVerifiedAt: string;
  plans: PricingPlan[];
  lastTestedAt: string;
  testEnvironment: TestEnvironment;
  editorNotes: string;
};

const VERIFIED = "2026-08-22";

const L = (tr: string, en: string): LocText => ({ tr, en });

export const rawProducts: RawProduct[] = [
  {
    slug: "nordvpn",
    brand: "NordVPN",
    positioning: L(
      "Genel kullanım için dengeli seçenek",
      "A balanced choice for general use",
    ),
    summary: L(
      "Geniş sunucu ağı, tekrarlanan bağımsız denetim geçmişi ve sağlayıcının açıkladığı streaming desteği ile genel kullanım için değerlendirilebilecek seçeneklerden biri.",
      "A wide server network, a repeated track record of independent audits and provider-documented streaming support make this worth considering for general use.",
    ),
    score: 9.6,
    priceFromUsd: 3.39,
    rank: 1,
    pros: [
      L(
        "Sağlayıcı raporlarına göre 2025'te altıncı kez Deloitte tarafından no-logs denetimi yapıldı",
        "Per provider reports, audited by Deloitte for no-logs for the sixth time in 2025",
      ),
      L(
        "Sağlayıcı verisine göre 6,400+ sunucu, 110+ ülke",
        "Per provider data, 6,400+ servers across 110+ countries",
      ),
      L(
        "Sağlayıcının belgelerinde başlıca streaming platformu desteği belirtiliyor; uyumluluk zamanla değişebilir",
        "The provider documents support for major streaming platforms; compatibility can change over time",
      ),
      L(
        "Threat Protection özelliği reklam/zararlı yazılım engelleme sunar",
        "Threat Protection offers ad/malware blocking",
      ),
    ],
    cons: [
      L(
        "Yenileme dönemi fiyatı belirgin biçimde yükseliyor",
        "Renewal-period pricing climbs noticeably",
      ),
      L("Aynı anda 10 cihaz sınırı", "Simultaneous-device cap of 10"),
      L(
        "Mobil uygulamada gelişmiş ayarlar sınırlı",
        "Advanced settings are limited in the mobile app",
      ),
    ],
    highlights: {
      audits: L(
        "Deloitte no-logs (6 kez, son: 2025)",
        "Deloitte no-logs (6 times, latest: 2025)",
      ),
      servers: L("6,400+ sunucu · 110+ ülke", "6,400+ servers · 110+ countries"),
      devices: L("10 cihaz", "10 devices"),
      jurisdiction: L("Panama", "Panama"),
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://nordvpn.com/tr/pricing/",
    pricingVerifiedAt: VERIFIED,
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Threat Protection Pro sağlayıcının sunduğu bir özelliktir; ping ve streaming performansı ağ koşullarına göre değişir. Bu profil için laboratuvar ölçümü yapılmamıştır.",
      "Threat Protection Pro is a provider-documented feature; ping and streaming performance vary by network conditions. No laboratory measurement was performed for this profile.",
    ),
    plans: [
      {
        name: L("2 yıllık", "2-year"),
        durationMonths: 24,
        monthlyPriceUsd: 3.39,
        totalPriceUsd: 81.36,
        savingsPercent: 70,
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: 12.99,
        totalPriceUsd: 12.99,
      },
    ],
  },
  {
    slug: "surfshark",
    brand: "Surfshark",
    positioning: L(
      "Bütçe ve çoklu cihaz odaklı seçenek",
      "Budget-friendly, multi-device focused",
    ),
    summary: L(
      "Sınırsız eşzamanlı cihaz desteği ve uygun fiyatlandırma ile bütçeye dikkat eden ve çok cihaz korumak isteyen kullanıcılar için değerlendirilebilecek bir seçenek.",
      "Unlimited simultaneous devices and accessible pricing make this a sensible option for budget-conscious users who want to cover many devices.",
    ),
    score: 9.3,
    priceFromUsd: 2.49,
    rank: 2,
    pros: [
      L(
        "Sağlayıcının açıkladığına göre sınırsız eşzamanlı cihaz kullanımı",
        "Per provider, unlimited simultaneous devices",
      ),
      L(
        "Sağlayıcı verisine göre Türkiye dahil 100+ ülkede sunucu",
        "Per provider, servers in 100+ countries including Türkiye",
      ),
      L(
        "CleanWeb özelliği reklam/izleyici engelleme sunar",
        "CleanWeb offers ad/tracker blocking",
      ),
      L(
        "Cure53 ve Deloitte tarafından bağımsız denetim raporları yayınlandı",
        "Independent audit reports published by Cure53 and Deloitte",
      ),
    ],
    cons: [
      L(
        "En düşük tanıtım fiyatı uzun dönemli abonelik gerektirir",
        "The lowest introductory price requires a long-term subscription",
      ),
      L(
        "Bazı gelişmiş özelliklerin platforma göre kullanılabilirliği değişir",
        "Some advanced features vary by platform",
      ),
      L(
        "Mart 2022'de Nord Security ile birleşti",
        "Merged with Nord Security in March 2022",
      ),
    ],
    highlights: {
      audits: L("Cure53 + Deloitte denetimleri", "Cure53 + Deloitte audits"),
      servers: L("3,200+ sunucu · 100+ ülke", "3,200+ servers · 100+ countries"),
      devices: L("Sınırsız", "Unlimited"),
      jurisdiction: L("Hollanda", "Netherlands"),
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://surfshark.com/pricing",
    pricingVerifiedAt: VERIFIED,
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Sağlayıcının sınırsız cihaz ve CleanWeb özellikleri sunduğu belirtiliyor; gerçek hız ve sayfa yükleme davranışı cihaz, sunucu ve ağ koşullarına göre değişir.",
      "The provider documents unlimited devices and CleanWeb; real-world speed and page-load behaviour vary by device, server and network conditions.",
    ),
    plans: [
      {
        name: L("2 yıllık + 3 ay bedava", "2-year + 3 months free"),
        durationMonths: 27,
        monthlyPriceUsd: 2.49,
        totalPriceUsd: 67.23,
        savingsPercent: 76,
        campaign: L(
          "Starter paketi, +3 ay bedava",
          "Starter bundle, +3 months free",
        ),
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: 15.45,
        totalPriceUsd: 15.45,
      },
    ],
  },
  {
    slug: "expressvpn",
    brand: "ExpressVPN",
    positioning: L(
      "Premium kullanım ve sade arayüz odaklı",
      "Premium focus with a polished interface",
    ),
    summary: L(
      "Sade arayüz ve sağlayıcının açıkladığı TrustedServer (RAM-only) mimarisi ile premium fiyat seviyesinde değerlendirilebilecek bir seçenek; performans ağ koşullarına bağlıdır.",
      "A clean interface and the provider's documented TrustedServer (RAM-only) architecture make this worth considering at premium price points; performance depends on network conditions.",
    ),
    score: 9.1,
    priceFromUsd: 2.99,
    rank: 3,
    pros: [
      L(
        "Lightway protokolü hızlı bağlantı kurulumu için tasarlanmıştır; gerçek süre ağ koşullarına bağlıdır",
        "The Lightway protocol is designed for fast connection setup; actual times depend on network conditions",
      ),
      L(
        "Sağlayıcının açıkladığına göre TrustedServer (RAM-only) altyapısı",
        "Per provider, TrustedServer (RAM-only) infrastructure",
      ),
      L(
        "Sağlayıcı verisine göre 105 ülkede sunucu",
        "Per provider, servers in 105 countries",
      ),
      L("Kolay kurulum ve sade arayüz", "Easy setup and a clean interface"),
    ],
    cons: [
      L(
        "Premium VPN segmentinde fiyatı yüksek",
        "Priced high within the premium VPN segment",
      ),
      L(
        "Yalnızca 8 cihaz eşzamanlı bağlantı",
        "Only 8 simultaneous device connections",
      ),
      L(
        "Gelişmiş kullanıcılar için özelleştirme sınırlı",
        "Limited customisation for advanced users",
      ),
    ],
    highlights: {
      audits: L("KPMG + Cure53 denetimleri", "KPMG + Cure53 audits"),
      servers: L("3,000+ sunucu · 105 ülke", "3,000+ servers · 105 countries"),
      devices: L("8 cihaz", "8 devices"),
      jurisdiction: L("İngiliz Virjin Adaları", "British Virgin Islands"),
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.expressvpn.com/order",
    pricingVerifiedAt: VERIFIED,
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Lightway protokolü bağlantı kurulumunu hızlandırmayı amaçlar; ping ve throughput için sabit bir editoryal ölçüm sunmuyoruz. Sonuçlar ağ, sunucu ve protokole göre değişir.",
      "Lightway is designed to speed up connection setup; we do not publish a fixed editorial ping or throughput measurement. Results vary by network, server and protocol.",
    ),
    plans: [
      {
        name: L("2 yıllık + 4 ay bedava", "2-year + 4 months free"),
        durationMonths: 28,
        monthlyPriceUsd: 2.99,
        totalPriceUsd: 83.72,
        savingsPercent: 77,
        campaign: L("+4 ay bedava", "+4 months free"),
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: 12.95,
        totalPriceUsd: 12.95,
      },
    ],
  },
  {
    slug: "proton-vpn",
    brand: "Proton VPN",
    positioning: L(
      "Gizlilik odaklı kullanıcılar için",
      "For privacy-focused users",
    ),
    summary: L(
      "İsviçre yargı yetkisi, açık kaynak istemciler ve sağlayıcı tarafından her yıl yayınlanan bağımsız no-logs denetimleri ile gizliliği önceliklendirenler için değerlendirilebilecek seçeneklerden biri.",
      "Swiss jurisdiction, open-source clients and annual independent no-logs audits published by the provider make this a strong option for privacy-first users.",
    ),
    score: 9.0,
    priceFromUsd: 3.59,
    rank: 4,
    pros: [
      L(
        "Sağlayıcı verisine göre tüm istemciler açık kaynak ve GitHub'da denetlenebilir",
        "Per provider, all clients are open source and inspectable on GitHub",
      ),
      L(
        "Sağlayıcı raporlarına göre her yıl bağımsız no-logs denetimi yapılıyor",
        "Per provider reports, an independent no-logs audit is performed annually",
      ),
      L(
        "İsviçre yargı yetkisinde — yerel veri koruma yasaları görece sıkı",
        "Swiss jurisdiction — local data-protection laws are relatively strict",
      ),
      L(
        "Sağlayıcının açıkladığına göre sınırsız bant genişliğine sahip ücretsiz plan",
        "Per provider, a free plan with unlimited bandwidth",
      ),
    ],
    cons: [
      L(
        "Bazı gelişmiş özellikler yalnız ücretli planlarda bulunur",
        "Some advanced features are available only on paid plans",
      ),
      L(
        "Ücretsiz planda konum seçimi sınırlıdır",
        "Location selection is limited on the free plan",
      ),
      L(
        "Yenileme fiyatı belirgin biçimde yükseliyor",
        "Renewal price climbs noticeably",
      ),
    ],
    highlights: {
      audits: L(
        "Yıllık Securitum no-logs denetimi",
        "Annual Securitum no-logs audit",
      ),
      servers: L("5,400+ sunucu · 110+ ülke", "5,400+ servers · 110+ countries"),
      devices: L("10 cihaz", "10 devices"),
      jurisdiction: L("İsviçre", "Switzerland"),
      openSource: true,
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://protonvpn.com/pricing",
    pricingVerifiedAt: "",
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Secure Core, sağlayıcının açıkladığı çift-hop mimarisidir; ek yönlendirme performansı etkileyebilir. Bu profil için laboratuvar hız ölçümü yapılmamıştır.",
      "Secure Core is the provider-documented double-hop architecture; the additional routing can affect performance. No laboratory speed measurement was performed for this profile.",
    ),
    plans: [
      {
        name: L("2 yıllık (VPN Plus)", "2-year (VPN Plus)"),
        durationMonths: 24,
        monthlyPriceUsd: 3.59,
        totalPriceUsd: 86.16,
        savingsPercent: 64,
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: 9.99,
        totalPriceUsd: 9.99,
      },
    ],
  },
  {
    slug: "pia",
    brand: "Private Internet Access",
    positioning: L(
      "Teknik kontrol ve geniş sunucu ağı arayanlar için",
      "For those who want technical control and a large server network",
    ),
    summary: L(
      "Geçmiş federal davalarda no-logs politikasının veri ifşa edemediği raporlanan, ileri düzey ayar seçenekleri ve geniş sunucu ağı sunan bir seçenek. Yargı yetkisi ABD'dir.",
      "An option with a very large server network and advanced settings, with court documents reporting that the provider was unable to produce user data in past US federal cases. Jurisdiction is the US.",
    ),
    score: 8.7,
    priceFromUsd: 2.03,
    rank: 5,
    pros: [
      L(
        "Geçmiş federal davalarda (2016, 2018) sağlayıcının veri ifşa edemediği kamuya açık dava belgelerinde raporlandı",
        "Public court documents from past US federal cases (2016, 2018) reported that the provider could not produce user data",
      ),
      L(
        "Sağlayıcı verisine göre 35,000+ sunucu",
        "Per provider, 35,000+ servers",
      ),
      L(
        "Sağlayıcının açıkladığına göre tüm istemciler açık kaynak",
        "Per provider, all clients are open source",
      ),
      L(
        "Detaylı protokol ve ayar seçenekleri sunulmaktadır",
        "Granular protocol and configuration options",
      ),
    ],
    cons: [
      L("ABD yargı yetkisi (5 Eyes ittifakı)", "US jurisdiction (5 Eyes)"),
      L("Arayüz yeni başlayanlar için karmaşık", "UI is dense for beginners"),
      L(
        "Streaming uyumluluğu hizmete ve güncel IP havuzuna göre değişebilir",
        "Streaming compatibility can vary by service and current IP pool",
      ),
    ],
    highlights: {
      audits: L(
        "Federal davalarda no-logs uygulaması raporlandı",
        "No-logs enforcement reported in federal cases",
      ),
      servers: L("35,000+ sunucu · 91 ülke", "35,000+ servers · 91 countries"),
      devices: L("Sınırsız", "Unlimited"),
      jurisdiction: L("ABD", "United States"),
      openSource: true,
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.privateinternetaccess.com/buy-vpn-online",
    pricingVerifiedAt: VERIFIED,
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "MACE reklam engelleyici ve OpenVPN/WireGuard seçenekleri sağlayıcı tarafından sunuluyor; gelişmiş ayar paneli teknik kullanıcılar için daha uygun, varsayılan profil yeni başlayanlara yoğun gelebilir.",
      "MACE and OpenVPN/WireGuard options are documented provider features; the granular settings panel suits technical users, while the default profile may feel dense for newcomers.",
    ),
    plans: [
      {
        name: L("3 yıllık + 3 ay bedava", "3-year + 3 months free"),
        durationMonths: 39,
        monthlyPriceUsd: 2.03,
        totalPriceUsd: 79.0,
        savingsPercent: 83,
        campaign: L("+3 ay bedava", "+3 months free"),
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: 11.95,
        totalPriceUsd: 11.95,
      },
    ],
  },
  {
    slug: "cyberghost",
    brand: "CyberGhost",
    positioning: L(
      "Yeni başlayan kullanıcılar için sade arayüz",
      "Beginner-friendly with a simple interface",
    ),
    summary: L(
      "Amaca özel optimize sunucular ve 45 günlük iade süresi ile VPN'e yeni başlayanlar için değerlendirilebilecek seçeneklerden biri. Sağlayıcı raporlarındaki bilgilere göre.",
      "Use-case optimised servers and a 45-day refund window make this a reasonable option for newcomers, per the provider's reports.",
    ),
    score: 8.5,
    priceFromUsd: 2.19,
    rank: 6,
    pros: [
      L(
        "Sağlayıcının açıkladığına göre streaming ve oyun için optimize sunucular sunuluyor",
        "Per provider, dedicated streaming and gaming servers",
      ),
      L(
        "Sağlayıcı politikasına göre 45 günlük para iade süresi (sektör standardı 30 gün)",
        "Per provider policy, a 45-day money-back window (industry standard is 30 days)",
      ),
      L(
        "Romanya yargı yetkisi (5/9/14 Eyes ittifakları dışında)",
        "Romanian jurisdiction (outside 5/9/14 Eyes)",
      ),
      L("Sağlayıcı verisine göre geniş sunucu ağı", "Per provider, a large server network"),
    ],
    cons: [
      L(
        "Şeffaflık raporları daha az sıklıkta yayınlanıyor",
        "Transparency reports are published less frequently",
      ),
      L(
        "Optimize sunucu etiketleri konum ve platforma göre değişebilir",
        "Optimised-server labels can vary by location and platform",
      ),
      L(
        "Gelişmiş güvenlik özellikleri sınırlı",
        "Limited advanced-security features",
      ),
    ],
    highlights: {
      servers: L("11,500+ sunucu · 100 ülke", "11,500+ servers · 100 countries"),
      devices: L("7 cihaz", "7 devices"),
      jurisdiction: L("Romanya", "Romania"),
      moneyBackDays: 45,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.cyberghostvpn.com/en_US/plans",
    pricingVerifiedAt: VERIFIED,
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Sağlayıcı streaming-optimize sunucular sunduğunu belirtiyor; Netflix, Disney+, BluTV ve oyun sunucularındaki sonuçlar bölge, IP havuzu ve ağ koşullarına göre değişebilir.",
      "The provider documents streaming-optimised servers; Netflix, Disney+, BluTV and gaming-server results can vary by region, IP pool and network conditions.",
    ),
    plans: [
      {
        name: L("2 yıllık + 2 ay bedava", "2-year + 2 months free"),
        durationMonths: 26,
        monthlyPriceUsd: 2.19,
        totalPriceUsd: 56.94,
        savingsPercent: 84,
        campaign: L("+2 ay bedava", "+2 months free"),
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: 12.99,
        totalPriceUsd: 12.99,
      },
    ],
  },
  {
    slug: "ipvanish",
    brand: "IPVanish",
    positioning: L(
      "ABD merkezli, kendi sunucu donanımını kullandığını belirten sağlayıcı",
      "US-based, claims to operate its own server hardware",
    ),
    summary: L(
      "Sağlayıcının açıklamasına göre kendi sunucu donanımını işleten, sınırsız cihaz desteği sunan ve uzun dönem planlarında indirimli giriş fiyatı sunan ABD merkezli bir seçenek. ABD yargı yetkisi gizliliği önceliklendirenler için değerlendirme gerektirebilir.",
      "A US-based option that, per provider, operates its own server hardware, supports unlimited devices and offers discounted entry pricing on long-term plans. Privacy-focused users should weigh the US jurisdiction.",
    ),
    score: 8.1,
    priceFromUsd: 2.19,
    rank: 8,
    pros: [
      L(
        "Sağlayıcı açıklamasına göre sunucu donanımına doğrudan sahip — üçüncü taraf veri merkezi bağımlılığı azaltılıyor",
        "Per provider, directly owns server hardware — reducing third-party data-centre dependence",
      ),
      L(
        "Sağlayıcının açıkladığına göre sınırsız eşzamanlı cihaz bağlantısı",
        "Per provider, unlimited simultaneous device connections",
      ),
      L(
        "Sağlayıcı raporlarına göre ilk bağımsız no-logs denetimi 2022'de Schellman tarafından yapıldı",
        "Per provider reports, first independent no-logs audit by Schellman in 2022",
      ),
      L(
        "Uzun dönem planlarda indirimli giriş fiyatı sunuluyor",
        "Discounted entry pricing on long-term plans",
      ),
    ],
    cons: [
      L(
        "ABD yargı yetkisi (5 Eyes ittifakı) — adli süreçte veri talebi alabilir",
        "US jurisdiction (5 Eyes) — may receive judicial data requests",
      ),
      L(
        "Yenileme fiyatı belirgin biçimde yükseliyor",
        "Renewal price climbs noticeably",
      ),
      L(
        "Streaming uyumluluğu hizmete ve güncel IP havuzuna göre değişebilir",
        "Streaming compatibility can vary by service and current IP pool",
      ),
      L(
        "Denetim sıklığı yılda bir değil, ad-hoc",
        "Audit cadence is ad-hoc rather than annual",
      ),
    ],
    highlights: {
      audits: L(
        "Schellman bağımsız denetimi (2022)",
        "Schellman independent audit (2022)",
      ),
      servers: L("2,400+ sunucu · 75+ ülke", "2,400+ servers · 75+ countries"),
      devices: L("Sınırsız", "Unlimited"),
      jurisdiction: L("ABD", "United States"),
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.ipvanish.com/buy/",
    pricingVerifiedAt: "",
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Sağlayıcı kendi sunucu donanımı kullandığını belirtiyor; torrent ve streaming performansı seçilen sunucu, IP havuzu ve ağ koşullarına göre değişebilir.",
      "The provider documents the use of its own server hardware; torrenting and streaming performance can vary by server, IP pool and network conditions.",
    ),
    plans: [
      {
        name: L("2 yıllık", "2-year"),
        durationMonths: 24,
        monthlyPriceUsd: 2.19,
        totalPriceUsd: 52.56,
        savingsPercent: 82,
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: 11.99,
        totalPriceUsd: 11.99,
      },
    ],
  },
  {
    slug: "windscribe",
    brand: "Windscribe",
    positioning: L(
      "Ücretsiz plan ve esnek fiyatlandırma sunan seçenek",
      "Offers a free plan and flexible pricing",
    ),
    summary: L(
      "Sağlayıcı politikasına göre aylık 10 GB ücretsiz plan, build-a-plan ile özel ülke seçimi ve R.O.B.E.R.T. ile reklam/izleyici engelleme sunulmaktadır. Kanada yargı yetkisi 5 Eyes ittifakına dahildir.",
      "Per provider policy, a 10 GB/month free plan, custom country picking via Build-a-Plan and ad/tracker blocking via R.O.B.E.R.T. Canadian jurisdiction is inside the 5 Eyes alliance.",
    ),
    score: 7.9,
    priceFromUsd: 5.75,
    rank: 9,
    pros: [
      L(
        "Sağlayıcı politikasına göre 10 GB/ay ücretsiz plan",
        "Per provider policy, a 10 GB/month free plan",
      ),
      L(
        "Sağlayıcının sunduğu build-a-plan ile tek tek ülke seçilebilir (aylık $1'dan başlayan)",
        "Build-a-Plan lets you pick individual countries (from $1/month)",
      ),
      L(
        "R.O.B.E.R.T. özelliği sunucu seviyesinde reklam/izleyici engelleme sağlar",
        "R.O.B.E.R.T. provides server-side ad/tracker blocking",
      ),
      L(
        "Sağlayıcı verisine göre istemciler açık kaynak (Windows, macOS, Linux, mobil)",
        "Per provider, clients are open source (Windows, macOS, Linux, mobile)",
      ),
    ],
    cons: [
      L("Bağımsız no-logs denetimi yok", "No independent no-logs audit"),
      L("Kanada yargı yetkisi (5 Eyes)", "Canadian jurisdiction (5 Eyes)"),
      L(
        "Sunucu sayısı en büyük rakiplerin gerisinde",
        "Server count lags behind the biggest rivals",
      ),
      L(
        "Para iade süresi sadece 3 gün (sektör standardı 30)",
        "Money-back window is only 3 days (industry standard is 30)",
      ),
    ],
    highlights: {
      servers: L("480+ sunucu · 69 ülke", "480+ servers · 69 countries"),
      devices: L("Sınırsız", "Unlimited"),
      jurisdiction: L("Kanada", "Canada"),
      openSource: true,
      moneyBackDays: 3,
    },
    hasAffiliate: true,
    pricingUrl: "https://windscribe.com/upgrade",
    pricingVerifiedAt: VERIFIED,
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "10 GB ücretsiz plan, R.O.B.E.R.T. reklam engelleyici ve Build-a-Plan seçenekleri sağlayıcı belgelerinde yer alıyor; iade koşulları satın almadan önce resmi sayfada kontrol edilmelidir.",
      "The 10 GB free tier, R.O.B.E.R.T. blocker and Build-a-Plan options are documented by the provider; refund terms should be checked on the official site before purchase.",
    ),
    plans: [
      {
        name: L("Yıllık (Pro)", "Annual (Pro)"),
        durationMonths: 12,
        monthlyPriceUsd: 5.75,
        totalPriceUsd: 69.0,
        savingsPercent: 36,
        campaign: L(
          "Ücretsiz plan: 10 GB/ay (kart gerekmez)",
          "Free plan: 10 GB/month (no card needed)",
        ),
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: 9.0,
        totalPriceUsd: 9.0,
      },
    ],
  },
  {
    slug: "tunnelbear",
    brand: "TunnelBear",
    positioning: L(
      "Yeni başlayanlar için sade arayüz odaklı",
      "A simple interface aimed at beginners",
    ),
    summary: L(
      "Sağlayıcı raporlarına göre Cure53 tarafından yıllık olarak denetlenen, basit arayüzlü Kanada merkezli bir seçenek. 2018'den beri McAfee bünyesinde — kullanıcılar bu sahiplik yapısının gizlilik tercihleriyle uyumunu kendileri değerlendirmelidir.",
      "A Canadian-based option with a simple interface that, per provider reports, is audited annually by Cure53. Owned by McAfee since 2018 — users should weigh whether that ownership structure suits their privacy preferences.",
    ),
    score: 7.7,
    priceFromUsd: 3.33,
    rank: 10,
    pros: [
      L(
        "Sağlayıcı raporlarına göre 2017'den beri her yıl Cure53 tarafından kamuya açık denetim",
        "Per provider reports, audited publicly by Cure53 every year since 2017",
      ),
      L("Sade ve kullanıcı dostu arayüz", "Clean, user-friendly interface"),
      L(
        "Sağlayıcı politikasına göre 2 GB/ay ücretsiz plan (kart bilgisi istemez)",
        "Per provider policy, a 2 GB/month free plan (no card required)",
      ),
      L(
        "Sağlayıcının açıkladığı 2024 güncellemesiyle sınırsız eşzamanlı cihaz",
        "Unlimited simultaneous devices per the provider's 2024 update",
      ),
    ],
    cons: [
      L(
        "2018'den beri McAfee bünyesinde — ABD ana şirket = 5 Eyes endişesi",
        "Owned by McAfee since 2018 — US parent = 5 Eyes concern",
      ),
      L(
        "Sunucu özellikleri (sayı, ülke detayı) şeffaf yayınlanmıyor",
        "Server details (count, per-country specifics) aren't transparently published",
      ),
      L("Streaming için optimize değil", "Not optimised for streaming"),
      L(
        "Para iade garantisi yok — sadece ücretsiz plan deneme görevi görür",
        "No money-back guarantee — the free plan serves as the trial",
      ),
    ],
    highlights: {
      audits: L(
        "Yıllık Cure53 denetimi (2017'den beri)",
        "Annual Cure53 audit (since 2017)",
      ),
      servers: L(
        "5,000+ sunucu · 50+ ülke (resmi rakam)",
        "5,000+ servers · 50+ countries (official figure)",
      ),
      devices: L("Sınırsız", "Unlimited"),
      jurisdiction: L(
        "Kanada (McAfee ABD bağlı)",
        "Canada (McAfee, US-affiliated)",
      ),
      moneyBackDays: 0,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.tunnelbear.com/pricing",
    pricingVerifiedAt: VERIFIED,
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Yeni başlayan dostu arayüz ve 2 GB ücretsiz plan sunuluyor; günlük kullanım ve streaming deneyimi cihaz, bölge, ağ ve hizmet politikalarına göre değişir.",
      "A beginner-friendly interface and 2 GB free tier are documented; daily-use and streaming experience varies by device, region, network and service policy.",
    ),
    plans: [
      {
        name: L("3 yıllık (Unlimited)", "3-year (Unlimited)"),
        durationMonths: 36,
        monthlyPriceUsd: 3.33,
        totalPriceUsd: 120.0,
        savingsPercent: 67,
        isBestValue: true,
      },
      {
        name: L("Yıllık (Unlimited)", "Annual (Unlimited)"),
        durationMonths: 12,
        monthlyPriceUsd: 4.99,
        totalPriceUsd: 59.88,
        campaign: L(
          "2 GB/ay ücretsiz plan ayrıca mevcut",
          "A 2 GB/month free plan is also available",
        ),
      },
    ],
  },
  {
    slug: "mullvad",
    brand: "Mullvad",
    positioning: L(
      "Affiliate ilişkisi olmayan, gizlilik odaklı seçenek",
      "Privacy-first option with no affiliate relationship",
    ),
    summary: L(
      "Sağlayıcı politikasına göre anonim hesap sistemi, sabit fiyatlandırma ve affiliate programı sunmama prensibi ile gizliliği önceliklendirenler için değerlendirilebilecek bir seçenek. Bu siteyle finansal bağı yok — sıralamada bilgi vermek için yer alır.",
      "An option for privacy-first users — per provider policy, an anonymous account system, flat pricing and no affiliate programme. No financial link with this site; included in the ranking purely for transparency.",
    ),
    score: 8.3,
    priceFromUsd: 5.0,
    rank: 7,
    pros: [
      L(
        "Sağlayıcı politikasına göre kullanıcı adı veya e-posta istemez — yalnızca hesap numarası",
        "Per provider policy, no username or email required — only an account number",
      ),
      L(
        "Sağlayıcının açıkladığına göre postayla nakit ödeme kabul edilir",
        "Per provider, accepts cash payment by mail",
      ),
      L(
        "Sağlayıcı verisine göre istemciler açık kaynak ve GitHub'da denetlenebilir",
        "Per provider, clients are open source and inspectable on GitHub",
      ),
      L(
        "Sağlayıcı politikası gereği sabit €5/ay fiyatlandırma (indirim/promosyon yok)",
        "Per provider policy, a flat €5/month price (no discounts/promotions)",
      ),
    ],
    cons: [
      L(
        "Sunucu sayısı diğerlerine göre az",
        "Lower server count than rivals",
      ),
      L("Streaming için optimize değil", "Not optimised for streaming"),
      L(
        "Müşteri desteği yalnızca e-posta üzerinden",
        "Customer support is email-only",
      ),
    ],
    highlights: {
      audits: L(
        "Assured AB bağımsız denetimleri",
        "Assured AB independent audits",
      ),
      servers: L("700+ sunucu · 49 ülke", "700+ servers · 49 countries"),
      devices: L("5 cihaz", "5 devices"),
      jurisdiction: L("İsveç", "Sweden"),
      openSource: true,
      moneyBackDays: 30,
    },
    hasAffiliate: false,
    pricingUrl: "https://mullvad.net/en/account/create",
    priceCurrency: "EUR",
    pricingVerifiedAt: "",
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Anonim hesap numarasıyla kayıt ve nakit posta ödeme seçenekleri sağlayıcı tarafından açıklanıyor; küçük ağ yapısı ve streaming uyumluluğu resmi kaynaklardan ayrıca kontrol edilmelidir.",
      "Anonymous account-number signup and cash-by-mail options are documented by the provider; the smaller network and streaming compatibility should be checked against current official sources.",
    ),
    plans: [
      {
        name: L("Aylık (sabit)", "Monthly (flat)"),
        durationMonths: 1,
        monthlyPriceUsd: 5.0,
        totalPriceUsd: 5.0,
        campaign: L("İlke gereği indirim yok", "No discounts by policy"),
        isBestValue: true,
      },
      {
        name: L("Yıllık", "Annual"),
        durationMonths: 12,
        monthlyPriceUsd: 5.0,
        totalPriceUsd: 60.0,
      },
    ],
  },
  ...extendedRawProducts,
];

function pick<T>(field: Localized<T> | undefined, locale: Locale): T | undefined {
  if (!field) return undefined;
  return field[locale] ?? field.en ?? field.tr;
}

function resolveProduct(p: RawProduct, locale: Locale): Product {
  return {
    slug: p.slug,
    brand: p.brand,
    positioning: pick(p.positioning, locale) as string,
    summary: pick(p.summary, locale) as string,
    score: p.score,
    priceFromUsd: p.priceFromUsd,
    priceCurrency: p.priceCurrency ?? "USD",
    rank: p.rank,
    pros: p.pros.map((t) => pick(t, locale) as string),
    cons: p.cons.map((t) => pick(t, locale) as string),
    highlights: {
      audits: pick(p.highlights.audits, locale),
      servers: pick(p.highlights.servers, locale),
      devices: pick(p.highlights.devices, locale),
      jurisdiction: pick(p.highlights.jurisdiction, locale),
      openSource: p.highlights.openSource,
      moneyBackDays: p.highlights.moneyBackDays,
    },
    hasAffiliate: p.hasAffiliate,
    pricingUrl: p.pricingUrl,
    pricingVerifiedAt: p.pricingVerifiedAt,
    plans: p.plans.map((plan) => ({
      name: pick(plan.name, locale) as string,
      durationMonths: plan.durationMonths,
      monthlyPriceUsd: plan.monthlyPriceUsd,
      totalPriceUsd: plan.totalPriceUsd,
      savingsPercent: plan.savingsPercent,
      campaign: pick(plan.campaign, locale),
      isBestValue: plan.isBestValue,
    })),
    lastTestedAt: p.lastTestedAt,
    testEnvironment: p.testEnvironment,
    editorNotes: pick(p.editorNotes, locale) as string,
  };
}

export function getProduct(slug: string, locale: Locale = "tr"): Product | undefined {
  const raw = rawProducts.find((p) => p.slug === slug);
  return raw ? resolveProduct(raw, locale) : undefined;
}

/** Ana karşılaştırma listesinde gösterilecek azami sağlayıcı sayısı. */
export const TOP_RANKED_LIMIT = 20;

export function rankedProducts(locale: Locale = "tr"): Product[] {
  return [...rawProducts]
    .sort((a, b) => a.rank - b.rank)
    .map((p) => resolveProduct(p, locale));
}

/** Sıralama hub, ana sayfa ve karşılaştırma seçicisi için ilk N VPN. */
export function topRankedProducts(locale: Locale = "tr"): Product[] {
  return rankedProducts(locale).slice(0, TOP_RANKED_LIMIT);
}

export const products: Product[] = rankedProducts("tr");
