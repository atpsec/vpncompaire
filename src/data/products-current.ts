import type { Product } from "./products";

export const currentSupplementProducts: Product[] = [
  {
    slug: "mysterium-vpn",
    brand: "Mysterium VPN",
    positioning: "Merkeziyetsiz ağ ve residential IP odaklı VPN",
    summary:
      "Mysterium VPN, merkeziyetsiz node ağı üzerinden residential IP erişimi sunan WireGuard tabanlı bir VPN hizmetidir. Sağlayıcının güncel belgelerine göre 100+ ülkede 7.500+ residential IP ve 15 eşzamanlı cihaz desteği sunar.",
    score: 0,
    priceFromUsd: 0,
    priceCurrency: "USD",
    rank: 51,
    pros: [
      "Sağlayıcı verisine göre 100+ ülkede 7.500+ residential IP",
      "WireGuard, kill switch ve DNS leak protection desteği",
      "Tek abonelikle 15 cihaza kadar kullanım",
    ],
    cons: [
      "Residential node modeli klasik veri merkezi VPN'lerinden farklı bir güven modeli gerektirir",
      "Fiyat ve kampanyalar resmi sayfadan doğrulanmalıdır",
    ],
    highlights: {
      servers: "7.500+ residential IP · 100+ ülke",
      devices: "15 cihaz",
      audits: "Bağımsız denetim bilgisi resmi kaynaklardan ayrıca doğrulanmalı",
    },
    hasAffiliate: false,
    pricingUrl: "https://www.mysteriumvpn.com/",
    pricingVerifiedAt: "",
    plans: [],
    lastTestedAt: "",
    testEnvironment: { testerLocation: "", vpnVersion: "", testDuration: "" },
    editorNotes:
      "Bilgilendirme profili; VPN Advisor tarafından laboratuvar testi yapılmamıştır.",
  },
];

export const archivedProducts: Product[] = [
  {
    slug: "atlas-vpn",
    brand: "Atlas VPN",
    positioning: "Hizmeti sonlandırılmış VPN (arşiv)",
    summary:
      "Atlas VPN hizmeti 24 Nisan 2024 itibarıyla kalıcı olarak kapatıldı. Bu sayfa yalnızca tarihsel referans amacıyla korunur; Atlas VPN yeni abonelik veya aktif VPN hizmeti sunmamaktadır.",
    score: 0,
    priceFromUsd: 0,
    priceCurrency: "USD",
    rank: 999,
    pros: [
      "Eski kullanıcılar için kapanış ve geçiş bilgileri resmi Atlas VPN kaynaklarında yayımlandı",
    ],
    cons: [
      "VPN hizmeti Nisan 2024'ten beri kullanılamıyor",
      "Yeni abonelik veya aktif ürün desteği bulunmuyor",
    ],
    highlights: {
      servers: "Hizmet sonlandırıldı",
      devices: "Hizmet sonlandırıldı",
      jurisdiction: "Arşiv kaydı",
    },
    hasAffiliate: false,
    pricingUrl: "https://atlasvpn.com/",
    pricingVerifiedAt: "",
    plans: [],
    lastTestedAt: "",
    testEnvironment: { testerLocation: "", vpnVersion: "", testDuration: "" },
    editorNotes:
      "Arşiv profili; aktif sağlayıcı kataloğuna dahil değildir.",
  },
];

export function getArchivedProduct(slug: string): Product | undefined {
  return archivedProducts.find((item) => item.slug === slug);
}
