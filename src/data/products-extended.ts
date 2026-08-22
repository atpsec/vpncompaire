/**
 * Ana ürün grubunu tamamlayan sağlayıcılar: /inceleme, özellik filtresi ve
 * genişletilmiş karşılaştırma havuzu için. Sıralama popüler karşılaştırma
 * sitelerindeki yaygın isimlerle uyumlu seçildi (PCMag, TechRadar, VPNMentor vb.).
 */
import type { RawProduct } from "./products";

const L = (tr: string, en: string) => ({ tr, en });

function extendedVpn(
  slug: string,
  brand: string,
  rank: number,
  score: number,
  priceFromUsd: number,
  positioning: { tr: string; en: string },
  summary: { tr: string; en: string },
  jurisdiction: { tr: string; en: string },
  servers: { tr: string; en: string },
  devices: { tr: string; en: string },
  audits: { tr: string; en: string },
  pricingUrl: string,
  hasAffiliate: boolean,
  moneyBackDays: number,
): RawProduct {
  return {
    slug,
    brand,
    positioning: L(positioning.tr, positioning.en),
    summary: L(summary.tr, summary.en),
    score,
    priceFromUsd,
    rank,
    pros: [
      L(
        "Sağlayıcı verilerine göre geniş veya niş odaklı sunucu ağı",
        "Broad or niche-focused server network per provider data",
      ),
      L(
        "Sağlayıcı belgelerine göre günlük kullanım özellikleri",
        "Provider-documented features for daily use",
      ),
      L(
        "Fiyatlandırma sayfası şeffaf; plan seçenekleri net",
        "Transparent pricing page with clear plan options",
      ),
    ],
    cons: [
      L(
        "üst 10 sıraya kıyasla daha sınırlı bağımsız denetim geçmişi veya şeffaflık",
        "More limited audit history or transparency vs top-10 picks",
      ),
      L(
        "Streaming ve performans, bölge, ağ ve sağlayıcı politikalarına göre değişebilir",
        "Streaming and performance can vary by region, network and provider policy",
      ),
    ],
    highlights: {
      audits: L(audits.tr, audits.en),
      servers: L(servers.tr, servers.en),
      devices: L(devices.tr, devices.en),
      jurisdiction: L(jurisdiction.tr, jurisdiction.en),
      moneyBackDays,
    },
    hasAffiliate,
    pricingUrl,
    pricingVerifiedAt: "",
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "",
      vpnVersion: "",
      testDuration: "",
    },
    editorNotes: L(
      "Genişletilmiş sağlayıcı havuzunda kaynak temelli profil; genel kullanım için daha kapsamlı kanıt sunan çekirdek profillerle birlikte değerlendirin.",
      "Source-based profile in the extended provider pool; compare it with core profiles that offer more comprehensive evidence.",
    ),
    plans: [
      {
        name: L("Yıllık plan", "Annual plan"),
        durationMonths: 12,
        monthlyPriceUsd: priceFromUsd,
        totalPriceUsd: priceFromUsd * 12,
        savingsPercent: 40,
        isBestValue: true,
      },
      {
        name: L("Aylık", "Monthly"),
        durationMonths: 1,
        monthlyPriceUsd: Math.round(priceFromUsd * 2.2 * 100) / 100,
        totalPriceUsd: Math.round(priceFromUsd * 2.2 * 100) / 100,
      },
    ],
  };
}

export const extendedRawProducts: RawProduct[] = [
  extendedVpn(
    "purevpn",
    "PureVPN",
    12,
    7.4,
    2.03,
    {
      tr: "Geniş ülke listesi ve eski marka",
      en: "Wide country list and established brand",
    },
    {
      tr: "PureVPN uzun süredir piyasada; geniş ülke kapsaması ve çoklu protokol desteği ile teknik kullanıcılar için değerlendirilebilir.",
      en: "PureVPN has been on the market for years; wide country coverage and multi-protocol support may suit technical users.",
    },
    { tr: "İngilik Virjin Adaları", en: "British Virgin Islands" },
    {
      tr: "6,500+ sunucu · 70+ ülke",
      en: "6,500+ servers · 70+ countries",
    },
    { tr: "10 cihaz", en: "10 devices" },
    {
      tr: "Altius IT denetimleri (sağlayıcı beyanı)",
      en: "Altius IT audits (per provider)",
    },
    "https://www.purevpn.com/pricing",
    true,
    31,
  ),
  extendedVpn(
    "vyprvpn",
    "VyprVPN",
    13,
    7.3,
    5.0,
    {
      tr: "Kendi sunucu altyapısı (Chameleon)",
      en: "Own server stack (Chameleon)",
    },
    {
      tr: "VyprVPN kendi sunucularını işletir ve Chameleon obfuscation sunar; sansür yoğun bölgeler için alternatif olabilir.",
      en: "VyprVPN operates its own servers and offers Chameleon obfuscation; may suit censorship-heavy regions.",
    },
    { tr: "İsviçre", en: "Switzerland" },
    { tr: "700+ sunucu · 70+ ülke", en: "700+ servers · 70+ countries" },
    { tr: "5 cihaz", en: "5 devices" },
    {
      tr: "Sağlayıcı no-logs iddiası; üçüncü taraf denetim sınırlı",
      en: "Provider no-logs claim; limited third-party audits",
    },
    "https://www.vyprvpn.com/buy-vpn",
    true,
    30,
  ),
  extendedVpn(
    "ivpn",
    "IVPN",
    14,
    7.2,
    6.0,
    {
      tr: "Gizlilik odaklı, şeffaf şirket yapısı",
      en: "Privacy-first, transparent company structure",
    },
    {
      tr: "IVPN açık kaynak istemciler, şeffaf güvenlik raporları ve minimal veri toplama ile gizlilik puristleri için değerlendirilebilir.",
      en: "IVPN offers open-source clients, transparent security reports, and minimal data collection for privacy-focused users.",
    },
    { tr: "Gibraltar", en: "Gibraltar" },
    { tr: "100+ sunucu · 45+ ülke", en: "100+ servers · 45+ countries" },
    { tr: "7 cihaz", en: "7 devices" },
    {
      tr: "Cure53 denetimleri (sağlayıcı beyanı)",
      en: "Cure53 audits (per provider)",
    },
    "https://www.ivpn.net/pricing",
    true,
    30,
  ),
  extendedVpn(
    "hideme",
    "hide.me",
    15,
    7.1,
    2.69,
    {
      tr: "Ücretsiz plan ve WireGuard desteği",
      en: "Free plan and WireGuard support",
    },
    {
      tr: "hide.me ücretsiz katman ve modern protokol desteği sunar; bütçe ve hız dengesi arayanlar için alternatif.",
      en: "hide.me offers a free tier and modern protocol support; an alternative for budget-conscious users.",
    },
    { tr: "Malezya", en: "Malaysia" },
    { tr: "2,100+ sunucu · 80+ ülke", en: "2,100+ servers · 80+ countries" },
    { tr: "10 cihaz", en: "10 devices" },
    {
      tr: "Sağlayıcı beyanı; sınırlı bağımsız denetim",
      en: "Provider claims; limited independent audits",
    },
    "https://hide.me/en/pricing",
    true,
    30,
  ),
  extendedVpn(
    "privado-vpn",
    "PrivadoVPN",
    16,
    7.0,
    1.11,
    {
      tr: "Ücretsiz 10 GB ve bütçe fiyat",
      en: "Free 10 GB and budget pricing",
    },
    {
      tr: "PrivadoVPN ücretsiz plan ve düşük giriş fiyatıyla listelerde sık görünür; streaming odaklı kullanıcılar için sınırlı olabilir.",
      en: "PrivadoVPN appears often on lists with a free plan and low entry price; may be limited for streaming-focused users.",
    },
    { tr: "İsviçre", en: "Switzerland" },
    { tr: "300+ sunucu · 45+ ülke", en: "300+ servers · 45+ countries" },
    { tr: "Sınırsız (Premium)", en: "Unlimited (Premium)" },
    {
      tr: "Bağımsız denetim bilgisi sınırlı",
      en: "Limited independent audit information",
    },
    "https://privadovpn.com/pricing/",
    true,
    30,
  ),
  extendedVpn(
    "hotspot-shield",
    "Hotspot Shield",
    17,
    6.9,
    7.99,
    {
      tr: "Hydra protokolü ve tüketici markası",
      en: "Hydra protocol and consumer brand",
    },
    {
      tr: "Hotspot Shield Pango bünyesinde; Hydra protokolü ile hız iddiası yüksek, yargı yetkisi ABD.",
      en: "Hotspot Shield is under Pango; claims high speed with Hydra protocol; US jurisdiction.",
    },
    { tr: "Amerika Birleşik Devletleri", en: "United States" },
    {
      tr: "3,200+ sunucu · 80+ ülke",
      en: "3,200+ servers · 80+ countries",
    },
    { tr: "5 cihaz", en: "5 devices" },
    {
      tr: "Sağlayıcı beyanı; bağımsız denetim geçmişi sınırlı",
      en: "Provider claims; limited audit history",
    },
    "https://www.hotspotshield.com/vpn/pricing/",
    true,
    45,
  ),
  extendedVpn(
    "strongvpn",
    "StrongVPN",
    18,
    6.8,
    3.66,
    {
      tr: "Uzun süredir piyasada ABD markası",
      en: "Long-running US brand",
    },
    {
      tr: "StrongVPN basit arayüz ve WireGuard desteği sunar; ABD yargı yetkisi gizlilik odaklı kullanıcılar için değerlendirme gerektirir.",
      en: "StrongVPN offers a simple interface and WireGuard support; US jurisdiction requires privacy-conscious users to weigh trade-offs.",
    },
    { tr: "Amerika Birleşik Devletleri", en: "United States" },
    { tr: "950+ sunucu · 30+ ülke", en: "950+ servers · 30+ countries" },
    { tr: "12 cihaz", en: "12 devices" },
    {
      tr: "Bağımsız denetim bilgisi sınırlı",
      en: "Limited independent audit information",
    },
    "https://strongvpn.com/pricing/",
    true,
    30,
  ),
  extendedVpn(
    "zoogvpn",
    "ZoogVPN",
    19,
    6.7,
    1.87,
    {
      tr: "Düşük fiyat ve ücretsiz plan",
      en: "Low price and free plan",
    },
    {
      tr: "ZoogVPN uygun fiyatlı planlar ve ücretsiz katman sunar; sunucu ağı ve denetim şeffaflığı sınırlı.",
      en: "ZoogVPN offers affordable plans and a free tier; server network and audit transparency are limited.",
    },
    { tr: "Yunanistan", en: "Greece" },
    { tr: "70+ sunucu · 20+ ülke", en: "70+ servers · 20+ countries" },
    { tr: "10 cihaz", en: "10 devices" },
    {
      tr: "Bağımsız denetim yok (sağlayıcı beyanı)",
      en: "No independent audits (per provider)",
    },
    "https://zoogvpn.com/pricing/",
    true,
    7,
  ),
  extendedVpn(
    "norton-vpn",
    "Norton VPN",
    20,
    6.6,
    4.99,
    {
      tr: "Antivirüs paketiyle birlikte tüketici VPN",
      en: "Consumer VPN bundled with antivirus",
    },
    {
      tr: "Norton Secure VPN Gen Digital bünyesinde; antivirüs paketleriyle birlikte sunulur, ABD yargı yetkisi.",
      en: "Norton Secure VPN is under Gen Digital; often bundled with antivirus suites; US jurisdiction.",
    },
    { tr: "Amerika Birleşik Devletleri", en: "United States" },
    {
      tr: "2,000+ sunucu · 30+ ülke (resmi rakam)",
      en: "2,000+ servers · 30+ countries (official figure)",
    },
    { tr: "1 cihaz (tek plan)", en: "1 device (single plan)" },
    {
      tr: "Antivirüs markası güveni; VPN özel denetim sınırlı",
      en: "Antivirus brand trust; limited VPN-specific audits",
    },
    "https://us.norton.com/products/norton-secure-vpn",
    true,
    60,
  ),
];
