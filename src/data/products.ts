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
    positioning: "Genel En İyi",
    summary:
      "Geniş sunucu ağı, bağımsız denetim geçmişi ve güvenilir streaming uyumluluğu ile genel kullanım için en dengeli seçim.",
    score: 9.6,
    priceFromUsd: 3.39,
    rank: 1,
    pros: [
      "2025'te altıncı kez Deloitte tarafından no-logs denetiminden geçti",
      "6,400+ sunucu, 110+ ülke",
      "Streaming platformlarında istikrarlı çalışıyor",
      "Threat Protection ile reklam/zararlı yazılım engelleme",
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
    positioning: "En Uygun Bütçe Seçimi",
    summary:
      "Sınırsız cihaz desteği, agresif fiyatlandırma ve iyi performansla bütçe öncelikli kullanıcılar için en mantıklı seçim.",
    score: 9.3,
    priceFromUsd: 2.19,
    rank: 2,
    pros: [
      "Sınırsız sayıda cihazda eşzamanlı kullanım",
      "Türkiye dahil 100+ ülkede sunucu",
      "CleanWeb ile reklam/izleyici engelleme dahil",
      "Cure53 ve Deloitte bağımsız denetimleri",
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
    positioning: "Premium ve Kolay Kullanım",
    summary:
      "Sade arayüz, kararlı hız ve TrustedServer (RAM-only) mimarisi ile teknik bilgisi olmayan kullanıcılar için en akıcı premium deneyim.",
    score: 9.1,
    priceFromUsd: 6.67,
    rank: 3,
    pros: [
      "Lightway protokolü ile yüksek hız",
      "TrustedServer (RAM-only) altyapısı",
      "105 ülkede sunucu",
      "Çok kolay kurulum ve kullanım",
    ],
    cons: [
      "En pahalı premium VPN seçeneklerinden biri",
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
    positioning: "Gizlilik Odaklı Seçim",
    summary:
      "İsviçre yasal yetki alanı, açık kaynak istemciler ve yıllık no-logs denetimleri ile gizlilik konusunda kanıtlanmış güven sağlar.",
    score: 9.0,
    priceFromUsd: 3.59,
    rank: 4,
    pros: [
      "Tüm istemciler açık kaynak ve denetlenebilir",
      "Her yıl bağımsız no-logs denetiminden geçer",
      "İsviçre yasaları altında — güçlü gizlilik koruması",
      "Sınırsız kullanımlı ücretsiz plan mevcut",
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
    positioning: "Teknik Kullanıcı ve Tam Kontrol",
    summary:
      "Mahkemede kanıtlanmış no-logs politikası, ileri düzey ayar seçenekleri ve devasa sunucu ağı ile teknik kontrolü önemseyen kullanıcılar için.",
    score: 8.7,
    priceFromUsd: 2.03,
    rank: 5,
    pros: [
      "Mahkemede kanıtlanmış no-logs (2016, 2018)",
      "35,000+ sunucu",
      "Açık kaynak istemciler",
      "Detaylı protokol ve ayar seçenekleri",
    ],
    cons: [
      "ABD yargı yetkisi (5 Eyes ittifakı)",
      "Arayüz yeni başlayanlar için karmaşık",
      "Bazı bölgelerde streaming bypass'ı sorunlu",
    ],
    highlights: {
      audits: "Mahkeme kanıtlı no-logs",
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
    positioning: "Yeni Başlayanlar İçin",
    summary:
      "Amaca özel optimize sunucular ve 45 günlük iade garantisi ile VPN'e yeni başlayanlar için en kolay giriş seçimi.",
    score: 8.5,
    priceFromUsd: 2.03,
    rank: 6,
    pros: [
      "Streaming ve oyun için özel optimize sunucular",
      "45 günlük para iade garantisi (sektör standardı 30 gün)",
      "Romanya yargı yetkisi (5/9/14 Eyes dışında)",
      "Geniş sunucu ağı",
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
    slug: "mullvad",
    brand: "Mullvad",
    positioning: "Tarafsız ve Etik (Affiliate Yok)",
    summary:
      "Anonim hesap sistemi, sabit fiyat ve affiliate kullanmama prensibi ile gizlilik puristleri için referans seçim. Bu siteyle finansal bağı yok — sıralamada tarafsızlık göstergesi olarak yer alır.",
    score: 8.3,
    priceFromUsd: 5.0,
    rank: 7,
    pros: [
      "Kullanıcı adı veya e-posta gerekmez — yalnızca hesap numarası",
      "Nakit ödeme kabul ediyor (postayla)",
      "Açık kaynak istemciler",
      "Sabit €5/ay fiyat — indirim/promosyon yok",
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
