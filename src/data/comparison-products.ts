import { getProduct, type Product } from "@/data/products";
import type { Locale } from "@/lib/site";

/**
 * Products that are safe to show in a comparison without becoming part of
 * the source-based 30-provider directory. Opera's free feature is browser-scoped,
 * so it must not be presented as equivalent to a device-wide VPN plan.
 */
const OPERA_COMPARISON_PRODUCT: Record<Locale, Product> = {
  tr: {
    slug: "opera-vpn",
    brand: "Opera VPN",
    positioning: "Tarayıcıya entegre ücretsiz VPN",
    summary: "Opera tarayıcısının içindeki ücretsiz VPN seçeneği; cihaz genelinde koruma için ayrı bir VPN Pro katmanı bulunur.",
    score: 0,
    priceFromUsd: 0,
    priceCurrency: "USD",
    rank: 0,
    pros: [
      "Opera tarayıcısına entegre",
      "Ücretsiz tarayıcı düzeyinde gizlilik katmanı",
      "Sağlayıcı tarafından yayımlanan denetim özeti mevcut",
    ],
    cons: [
      "Opera dışındaki uygulamaları kapsamaz",
      "Ücretsiz katmanda genel konumlar sunulur",
      "Tarayıcı VPN'i tüm cihaz VPN'i değildir",
    ],
    highlights: {
      audits: "Sağlayıcı kaynaklı Deloitte inceleme özeti (2024)",
      servers: "100+ sunucu · 3 genel konum (sağlayıcı bildirimi)",
      devices: "Opera tarayıcısı trafiği; VPN Pro ayrı bir katmandır",
      jurisdiction: "Opera'nın gizlilik belgelerine bakın",
    },
    hasAffiliate: false,
    pricingUrl: "https://www.opera.com/features/free-vpn",
    pricingVerifiedAt: "",
    plans: [],
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "Uygulanamaz",
      vpnVersion: "Sağlayıcı belgeleri",
      testDuration: "Laboratuvar testi değildir",
    },
    editorNotes: "Bu, sağlayıcı kaynaklarına dayalı bir karşılaştırma profilidir; VPN Advisor laboratuvar testi değildir.",
  },
  en: {
    slug: "opera-vpn",
    brand: "Opera VPN",
    positioning: "Browser-integrated free VPN",
    summary: "A free VPN feature built into Opera. Its browser-only scope must be kept separate from the device-wide coverage described for VPN Pro.",
    score: 0,
    priceFromUsd: 0,
    priceCurrency: "USD",
    rank: 0,
    pros: [
      "Built into Opera",
      "Free browser-level privacy layer",
      "Provider-published audit summary available",
    ],
    cons: [
      "Does not cover apps outside Opera",
      "General locations on the free tier",
      "A browser VPN is not a whole-device VPN",
    ],
    highlights: {
      audits: "Provider-published Deloitte review summary (2024)",
      servers: "100+ servers · 3 general locations (provider-reported)",
      devices: "Opera browser traffic; VPN Pro is a separate tier",
      jurisdiction: "See Opera's privacy documentation",
    },
    hasAffiliate: false,
    pricingUrl: "https://www.opera.com/features/free-vpn",
    pricingVerifiedAt: "",
    plans: [],
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "Not applicable",
      vpnVersion: "Provider documentation",
      testDuration: "Not a laboratory test",
    },
    editorNotes: "This is a provider-source comparison profile, not a VPN Advisor laboratory test.",
  },
  de: {
    slug: "opera-vpn",
    brand: "Opera VPN",
    positioning: "Kostenloses, in den Browser integriertes VPN",
    summary: "Eine kostenlose VPN-Funktion im Opera-Browser. Der browserbasierte Umfang muss von der geräteweiten Abdeckung des separaten VPN-Pro-Tarifs unterschieden werden.",
    score: 0,
    priceFromUsd: 0,
    priceCurrency: "USD",
    rank: 0,
    pros: [
      "Direkt in Opera integriert",
      "Kostenlose Datenschutzebene im Browser",
      "Eine vom Anbieter veröffentlichte Prüfungszusammenfassung ist verfügbar",
    ],
    cons: [
      "Deckt keine Apps außerhalb von Opera ab",
      "Allgemeine Standorte im kostenlosen Tarif",
      "Ein Browser-VPN ist kein VPN für das gesamte Gerät",
    ],
    highlights: {
      audits: "Vom Anbieter veröffentlichte Deloitte-Prüfungszusammenfassung (2024)",
      servers: "100+ Server · 3 allgemeine Standorte (Anbieterangabe)",
      devices: "Opera-Browserverkehr; VPN Pro ist ein separater Tarif",
      jurisdiction: "Siehe Operas Datenschutzdokumentation",
    },
    hasAffiliate: false,
    pricingUrl: "https://www.opera.com/features/free-vpn",
    pricingVerifiedAt: "",
    plans: [],
    lastTestedAt: "",
    testEnvironment: {
      testerLocation: "Nicht zutreffend",
      vpnVersion: "Anbieterdokumentation",
      testDuration: "Kein Labortest",
    },
    editorNotes: "Dies ist ein auf Anbieterquellen basierendes Vergleichsprofil und kein Labortest von VPN Advisor.",
  },
};

export function getComparisonProduct(slug: string, locale: Locale): Product | undefined {
  if (slug === "opera-vpn") return OPERA_COMPARISON_PRODUCT[locale];
  return getProduct(slug, locale);
}
