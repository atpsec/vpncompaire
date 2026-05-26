export type ProductHighlights = {
  audits?: string;
  servers?: string;
  devices?: string;
  jurisdiction?: string;
  openSource?: boolean;
  moneyBackDays?: number;
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

export type Product = {
  slug: string;
  brand: string;
  positioning: string;
  summary: string;
  score: number;
  priceFromUsd: number;
  rank: number;
  pros: string[];
  cons: string[];
  highlights: ProductHighlights;
  hasAffiliate: boolean;
  pricingUrl: string;
  pricingVerifiedAt: string;
  plans: PricingPlan[];
};

const VERIFIED = "2026-05-25";

export const products: Product[] = [
  {
    slug: "nordvpn",
    brand: "NordVPN",
    positioning: "Genel kullanım için dengeli seçenek",
    summary:
      "Geniş sunucu ağı, tekrarlanan bağımsız denetim geçmişi ve testlerimizde tutarlı streaming uyumluluğu ile genel kullanım için sıkça önerilen seçeneklerden biri.",
    score: 9.6,
    priceFromUsd: 3.39,
    rank: 1,
    pros: [
      "Sağlayıcı raporlarına göre 2025'te altıncı kez Deloitte tarafından no-logs denetimi yapıldı",
      "Sağlayıcı verisine göre 6,400+ sunucu, 110+ ülke",
      "Testlerimizde başlıca streaming platformlarında uyumlu çalıştığı gözlendi",
      "Threat Protection özelliği reklam/zararlı yazılım engelleme sunar",
    ],
    cons: [
      "Yenileme dönemi fiyatı belirgin biçimde yükseliyor",
      "Aynı anda 10 cihaz sınırı",
      "Mobil uygulamada gelişmiş ayarlar sınırlı",
    ],
    highlights: {
      audits: "Deloitte no-logs (6 kez, son: 2025)",
      servers: "6,400+ sunucu · 110+ ülke",
      devices: "10 cihaz",
      jurisdiction: "Panama",
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://nordvpn.com/tr/pricing/",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "2 yıllık + 3 ay bedava",
        durationMonths: 27,
        monthlyPriceUsd: 3.39,
        totalPriceUsd: 91.53,
        savingsPercent: 74,
        campaign: "+3 ay bedava",
        isBestValue: true,
      },
      {
        name: "Aylık",
        durationMonths: 1,
        monthlyPriceUsd: 12.99,
        totalPriceUsd: 12.99,
      },
    ],
  },
  {
    slug: "surfshark",
    brand: "Surfshark",
    positioning: "Bütçe ve çoklu cihaz odaklı seçenek",
    summary:
      "Sınırsız eşzamanlı cihaz desteği ve uygun fiyatlandırma ile bütçeye dikkat eden ve çok cihaz korumak isteyen kullanıcılar için değerlendirilebilecek bir seçenek.",
    score: 9.3,
    priceFromUsd: 2.19,
    rank: 2,
    pros: [
      "Sağlayıcının açıkladığına göre sınırsız eşzamanlı cihaz kullanımı",
      "Sağlayıcı verisine göre Türkiye dahil 100+ ülkede sunucu",
      "CleanWeb özelliği reklam/izleyici engelleme sunar",
      "Cure53 ve Deloitte tarafından bağımsız denetim raporları yayınlandı",
    ],
    cons: [
      "Hız üst seviye rakiplere göre biraz daha düşük",
      "Yoğun saatlerde bazı sunucularda gecikme",
      "Mart 2022'de Nord Security ile birleşti",
    ],
    highlights: {
      audits: "Cure53 + Deloitte denetimleri",
      servers: "3,200+ sunucu · 100+ ülke",
      devices: "Sınırsız",
      jurisdiction: "Hollanda",
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://surfshark.com/pricing",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "2 yıllık + 3 ay bedava",
        durationMonths: 27,
        monthlyPriceUsd: 1.99,
        totalPriceUsd: 53.73,
        savingsPercent: 87,
        campaign: "Starter paketi, +3 ay bedava",
        isBestValue: true,
      },
      {
        name: "Aylık",
        durationMonths: 1,
        monthlyPriceUsd: 15.45,
        totalPriceUsd: 15.45,
      },
    ],
  },
  {
    slug: "expressvpn",
    brand: "ExpressVPN",
    positioning: "Premium kullanım ve sade arayüz odaklı",
    summary:
      "Sade arayüz, testlerimizde kararlı hız ve sağlayıcının açıkladığı TrustedServer (RAM-only) mimarisi ile premium fiyat seviyesinde değerlendirilebilecek bir seçenek.",
    score: 9.1,
    priceFromUsd: 6.67,
    rank: 3,
    pros: [
      "Lightway protokolü testlerimizde hızlı bağlantı kurulumu sağladı",
      "Sağlayıcının açıkladığına göre TrustedServer (RAM-only) altyapısı",
      "Sağlayıcı verisine göre 105 ülkede sunucu",
      "Kolay kurulum ve sade arayüz",
    ],
    cons: [
      "Premium VPN segmentinde fiyatı yüksek",
      "Yalnızca 8 cihaz eşzamanlı bağlantı",
      "Gelişmiş kullanıcılar için özelleştirme sınırlı",
    ],
    highlights: {
      audits: "KPMG + Cure53 denetimleri",
      servers: "3,000+ sunucu · 105 ülke",
      devices: "8 cihaz",
      jurisdiction: "İngiliz Virjin Adaları",
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.expressvpn.com/order",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "15 ay (12 + 3 bedava)",
        durationMonths: 15,
        monthlyPriceUsd: 6.67,
        totalPriceUsd: 99.95,
        savingsPercent: 49,
        campaign: "+3 ay bedava",
        isBestValue: true,
      },
      {
        name: "Aylık",
        durationMonths: 1,
        monthlyPriceUsd: 12.95,
        totalPriceUsd: 12.95,
      },
    ],
  },
  {
    slug: "proton-vpn",
    brand: "Proton VPN",
    positioning: "Gizlilik odaklı kullanıcılar için",
    summary:
      "İsviçre yargı yetkisi, açık kaynak istemciler ve sağlayıcı tarafından her yıl yayınlanan bağımsız no-logs denetimleri ile gizliliği önceliklendirenler için değerlendirilebilecek seçeneklerden biri.",
    score: 9.0,
    priceFromUsd: 3.59,
    rank: 4,
    pros: [
      "Sağlayıcı verisine göre tüm istemciler açık kaynak ve GitHub'da denetlenebilir",
      "Sağlayıcı raporlarına göre her yıl bağımsız no-logs denetimi yapılıyor",
      "İsviçre yargı yetkisinde — yerel veri koruma yasaları görece sıkı",
      "Sağlayıcının açıkladığına göre sınırsız bant genişliğine sahip ücretsiz plan",
    ],
    cons: [
      "Sunucu ağı en büyük rakiplere göre küçük",
      "Streaming uyumluluğu bazen sınırlı",
      "Yenileme fiyatı belirgin biçimde yükseliyor",
    ],
    highlights: {
      audits: "Yıllık Securitum no-logs denetimi",
      servers: "5,400+ sunucu · 110+ ülke",
      devices: "10 cihaz",
      jurisdiction: "İsviçre",
      openSource: true,
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://protonvpn.com/pricing",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "2 yıllık (VPN Plus)",
        durationMonths: 24,
        monthlyPriceUsd: 3.59,
        totalPriceUsd: 86.16,
        savingsPercent: 64,
        isBestValue: true,
      },
      {
        name: "Aylık",
        durationMonths: 1,
        monthlyPriceUsd: 9.99,
        totalPriceUsd: 9.99,
      },
    ],
  },
  {
    slug: "pia",
    brand: "Private Internet Access",
    positioning: "Teknik kontrol ve geniş sunucu ağı arayanlar için",
    summary:
      "Geçmiş federal davalarda no-logs politikasının veri ifşa edemediği raporlanan, ileri düzey ayar seçenekleri ve geniş sunucu ağı sunan bir seçenek. Yargı yetkisi ABD'dir.",
    score: 8.7,
    priceFromUsd: 2.03,
    rank: 5,
    pros: [
      "Geçmiş federal davalarda (2016, 2018) sağlayıcının veri ifşa edemediği kamuya açık dava belgelerinde raporlandı",
      "Sağlayıcı verisine göre 35,000+ sunucu",
      "Sağlayıcının açıkladığına göre tüm istemciler açık kaynak",
      "Detaylı protokol ve ayar seçenekleri sunulmaktadır",
    ],
    cons: [
      "ABD yargı yetkisi (5 Eyes ittifakı)",
      "Arayüz yeni başlayanlar için karmaşık",
      "Bazı bölgelerde streaming bypass'ı sorunlu",
    ],
    highlights: {
      audits: "Federal davalarda no-logs uygulaması raporlandı",
      servers: "35,000+ sunucu · 91 ülke",
      devices: "Sınırsız",
      jurisdiction: "ABD",
      openSource: true,
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.privateinternetaccess.com/buy-vpn-online",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "3 yıllık + 3 ay bedava",
        durationMonths: 39,
        monthlyPriceUsd: 2.03,
        totalPriceUsd: 79.0,
        savingsPercent: 83,
        campaign: "+3 ay bedava",
        isBestValue: true,
      },
      {
        name: "Aylık",
        durationMonths: 1,
        monthlyPriceUsd: 11.95,
        totalPriceUsd: 11.95,
      },
    ],
  },
  {
    slug: "cyberghost",
    brand: "CyberGhost",
    positioning: "Yeni başlayan kullanıcılar için sade arayüz",
    summary:
      "Amaca özel optimize sunucular ve 45 günlük iade süresi ile VPN'e yeni başlayanlar için değerlendirilebilecek seçeneklerden biri. Sağlayıcı raporlarındaki bilgilere göre.",
    score: 8.5,
    priceFromUsd: 2.03,
    rank: 6,
    pros: [
      "Sağlayıcının açıkladığına göre streaming ve oyun için optimize sunucular sunuluyor",
      "Sağlayıcı politikasına göre 45 günlük para iade süresi (sektör standardı 30 gün)",
      "Romanya yargı yetkisi (5/9/14 Eyes ittifakları dışında)",
      "Sağlayıcı verisine göre geniş sunucu ağı",
    ],
    cons: [
      "Şeffaflık raporları daha az sıklıkta yayınlanıyor",
      "Bazı sunucularda performans dalgalanması",
      "Gelişmiş güvenlik özellikleri sınırlı",
    ],
    highlights: {
      servers: "11,500+ sunucu · 100 ülke",
      devices: "7 cihaz",
      jurisdiction: "Romanya",
      moneyBackDays: 45,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.cyberghostvpn.com/en_US/plans",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "2 yıllık + 4 ay bedava",
        durationMonths: 28,
        monthlyPriceUsd: 2.03,
        totalPriceUsd: 56.94,
        savingsPercent: 84,
        campaign: "+4 ay bedava",
        isBestValue: true,
      },
      {
        name: "Aylık",
        durationMonths: 1,
        monthlyPriceUsd: 12.99,
        totalPriceUsd: 12.99,
      },
    ],
  },
  {
    slug: "ipvanish",
    brand: "IPVanish",
    positioning: "ABD merkezli, kendi sunucu donanımını kullandığını belirten sağlayıcı",
    summary:
      "Sağlayıcının açıklamasına göre kendi sunucu donanımını işleten, sınırsız cihaz desteği sunan ve uzun dönem planlarında indirimli giriş fiyatı sunan ABD merkezli bir seçenek. ABD yargı yetkisi gizliliği önceliklendirenler için değerlendirme gerektirebilir.",
    score: 8.1,
    priceFromUsd: 2.19,
    rank: 8,
    pros: [
      "Sağlayıcı açıklamasına göre sunucu donanımına doğrudan sahip — üçüncü taraf veri merkezi bağımlılığı azaltılıyor",
      "Sağlayıcının açıkladığına göre sınırsız eşzamanlı cihaz bağlantısı",
      "Sağlayıcı raporlarına göre ilk bağımsız no-logs denetimi 2022'de Schellman tarafından yapıldı",
      "Uzun dönem planlarda indirimli giriş fiyatı sunuluyor",
    ],
    cons: [
      "ABD yargı yetkisi (5 Eyes ittifakı) — adli süreçte veri talebi alabilir",
      "Yenileme fiyatı belirgin biçimde yükseliyor",
      "Streaming uyumluluğu rakiplerinin gerisinde",
      "Denetim sıklığı yılda bir değil, ad-hoc",
    ],
    highlights: {
      audits: "Schellman bağımsız denetimi (2022)",
      servers: "2,400+ sunucu · 75+ ülke",
      devices: "Sınırsız",
      jurisdiction: "ABD",
      moneyBackDays: 30,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.ipvanish.com/buy/",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "2 yıllık",
        durationMonths: 24,
        monthlyPriceUsd: 2.19,
        totalPriceUsd: 52.56,
        savingsPercent: 82,
        isBestValue: true,
      },
      {
        name: "Aylık",
        durationMonths: 1,
        monthlyPriceUsd: 11.99,
        totalPriceUsd: 11.99,
      },
    ],
  },
  {
    slug: "windscribe",
    brand: "Windscribe",
    positioning: "Ücretsiz plan ve esnek fiyatlandırma sunan seçenek",
    summary:
      "Sağlayıcı politikasına göre aylık 10 GB ücretsiz plan, build-a-plan ile özel ülke seçimi ve R.O.B.E.R.T. ile reklam/izleyici engelleme sunulmaktadır. Kanada yargı yetkisi 5 Eyes ittifakına dahildir.",
    score: 7.9,
    priceFromUsd: 5.75,
    rank: 9,
    pros: [
      "Sağlayıcı politikasına göre 10 GB/ay ücretsiz plan",
      "Sağlayıcının sunduğu build-a-plan ile tek tek ülke seçilebilir (aylık $1'dan başlayan)",
      "R.O.B.E.R.T. özelliği sunucu seviyesinde reklam/izleyici engelleme sağlar",
      "Sağlayıcı verisine göre istemciler açık kaynak (Windows, macOS, Linux, mobil)",
    ],
    cons: [
      "Bağımsız no-logs denetimi yok",
      "Kanada yargı yetkisi (5 Eyes)",
      "Sunucu sayısı en büyük rakiplerin gerisinde",
      "Para iade süresi sadece 3 gün (sektör standardı 30)",
    ],
    highlights: {
      servers: "480+ sunucu · 69 ülke",
      devices: "Sınırsız",
      jurisdiction: "Kanada",
      openSource: true,
      moneyBackDays: 3,
    },
    hasAffiliate: true,
    pricingUrl: "https://windscribe.com/upgrade",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "Yıllık (Pro)",
        durationMonths: 12,
        monthlyPriceUsd: 5.75,
        totalPriceUsd: 69.0,
        savingsPercent: 36,
        campaign: "Ücretsiz plan: 10 GB/ay (kart gerekmez)",
        isBestValue: true,
      },
      {
        name: "Aylık",
        durationMonths: 1,
        monthlyPriceUsd: 9.0,
        totalPriceUsd: 9.0,
      },
    ],
  },
  {
    slug: "tunnelbear",
    brand: "TunnelBear",
    positioning: "Yeni başlayanlar için sade arayüz odaklı",
    summary:
      "Sağlayıcı raporlarına göre Cure53 tarafından yıllık olarak denetlenen, basit arayüzlü Kanada merkezli bir seçenek. 2018'den beri McAfee bünyesinde — kullanıcılar bu sahiplik yapısının gizlilik tercihleriyle uyumunu kendileri değerlendirmelidir.",
    score: 7.7,
    priceFromUsd: 3.33,
    rank: 10,
    pros: [
      "Sağlayıcı raporlarına göre 2017'den beri her yıl Cure53 tarafından kamuya açık denetim",
      "Sade ve kullanıcı dostu arayüz",
      "Sağlayıcı politikasına göre 2 GB/ay ücretsiz plan (kart bilgisi istemez)",
      "Sağlayıcının açıkladığı 2024 güncellemesiyle sınırsız eşzamanlı cihaz",
    ],
    cons: [
      "2018'den beri McAfee bünyesinde — ABD ana şirket = 5 Eyes endişesi",
      "Sunucu özellikleri (sayı, ülke detayı) şeffaf yayınlanmıyor",
      "Streaming için optimize değil",
      "Para iade garantisi yok — sadece ücretsiz plan deneme görevi görür",
    ],
    highlights: {
      audits: "Yıllık Cure53 denetimi (2017'den beri)",
      servers: "5,000+ sunucu · 50+ ülke (resmi rakam)",
      devices: "Sınırsız",
      jurisdiction: "Kanada (McAfee ABD bağlı)",
      moneyBackDays: 0,
    },
    hasAffiliate: true,
    pricingUrl: "https://www.tunnelbear.com/pricing",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "3 yıllık (Unlimited)",
        durationMonths: 36,
        monthlyPriceUsd: 3.33,
        totalPriceUsd: 120.0,
        savingsPercent: 67,
        isBestValue: true,
      },
      {
        name: "Yıllık (Unlimited)",
        durationMonths: 12,
        monthlyPriceUsd: 4.99,
        totalPriceUsd: 59.88,
        campaign: "2 GB/ay ücretsiz plan ayrıca mevcut",
      },
    ],
  },
  {
    slug: "mullvad",
    brand: "Mullvad",
    positioning: "Affiliate ilişkisi olmayan, gizlilik odaklı seçenek",
    summary:
      "Sağlayıcı politikasına göre anonim hesap sistemi, sabit fiyatlandırma ve affiliate programı sunmama prensibi ile gizliliği önceliklendirenler için değerlendirilebilecek bir seçenek. Bu siteyle finansal bağı yok — sıralamada bilgi vermek için yer alır.",
    score: 8.3,
    priceFromUsd: 5.0,
    rank: 7,
    pros: [
      "Sağlayıcı politikasına göre kullanıcı adı veya e-posta istemez — yalnızca hesap numarası",
      "Sağlayıcının açıkladığına göre postayla nakit ödeme kabul edilir",
      "Sağlayıcı verisine göre istemciler açık kaynak ve GitHub'da denetlenebilir",
      "Sağlayıcı politikası gereği sabit €5/ay fiyatlandırma (indirim/promosyon yok)",
    ],
    cons: [
      "Sunucu sayısı diğerlerine göre az",
      "Streaming için optimize değil",
      "Müşteri desteği yalnızca e-posta üzerinden",
    ],
    highlights: {
      audits: "Assured AB bağımsız denetimleri",
      servers: "700+ sunucu · 49 ülke",
      devices: "5 cihaz",
      jurisdiction: "İsveç",
      openSource: true,
      moneyBackDays: 30,
    },
    hasAffiliate: false,
    pricingUrl: "https://mullvad.net/en/account/create",
    pricingVerifiedAt: VERIFIED,
    plans: [
      {
        name: "Aylık (sabit)",
        durationMonths: 1,
        monthlyPriceUsd: 5.0,
        totalPriceUsd: 5.0,
        campaign: "İlke gereği indirim yok",
        isBestValue: true,
      },
      {
        name: "Yıllık",
        durationMonths: 12,
        monthlyPriceUsd: 5.0,
        totalPriceUsd: 60.0,
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function rankedProducts(): Product[] {
  return [...products].sort((a, b) => a.rank - b.rank);
}
