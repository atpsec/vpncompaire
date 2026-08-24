import type { Locale } from "@/lib/site";

export const editorialPositioning = {
  tr: {
    brand: "VPN bilgi ve karşılaştırma rehberi",
    heroTitle: "VPN'leri doğrulanabilir özelliklerle karşılaştırın",
    heroSubtitle: "Fiyat, gizlilik politikası, bağımsız denetimler, protokoller, cihaz desteği ve resmi teknik belgeler üzerinden karşılaştırma. Laboratuvar testi veya kullanıcı puanı iddiası yok.",
    methodologyTag: "Kaynak temelli karşılaştırma metodolojisi",
    primaryCta: "VPN Karşılaştırmalarını Gör",
    secondaryCta: "Metodolojiyi İncele",
    statProviders: "sağlayıcı profili",
    statAudits: "denetim bilgisi bulunan",
    statSources: "kaynak temelli kriter",
    sectionTitle: "Dünya çapında öne çıkan VPN sağlayıcıları",
    sectionSubtitle: "İlk sıralama, 2025-2026 küresel tüketici araştırmaları, marka görünürlüğü ve bağımsız sektör listelerinde tekrar eden popülerlik sinyallerinden oluşturulmuştur. Bu bir teknik test veya herkes için en iyi listesi değildir.",
    featured: "Küresel popülerlik görünümü",
    profile: "Sağlayıcı profili",
    viewProfile: "Detaylı profili aç",
  },
  en: {
    brand: "VPN information and comparison guide",
    heroTitle: "Compare VPNs using verifiable features",
    heroSubtitle: "Compare pricing, privacy policies, independent audits, protocols, device support and official technical documentation. We do not present unverified lab tests or user ratings.",
    methodologyTag: "Source-based comparison methodology",
    primaryCta: "View VPN Comparisons",
    secondaryCta: "Read Methodology",
    statProviders: "provider profiles",
    statAudits: "with audit information",
    statSources: "source-based criteria",
    sectionTitle: "Globally prominent VPN providers",
    sectionSubtitle: "The opening order reflects recurring popularity signals from 2025-2026 consumer research, brand visibility and independent industry lists. It is not a technical test or a claim that these services are universally best.",
    featured: "Global popularity view",
    profile: "Provider profile",
    viewProfile: "Open detailed profile",
  },
  de: {
    brand: "VPN-Informations- und Vergleichsratgeber",
    heroTitle: "VPNs anhand überprüfbarer Merkmale vergleichen",
    heroSubtitle: "Vergleichen Sie Preise, Datenschutzrichtlinien, unabhängige Audits, Protokolle, Geräteunterstützung und offizielle technische Dokumentation. Wir veröffentlichen keine unbelegten Labortests oder Nutzerbewertungen.",
    methodologyTag: "Quellenbasierte Vergleichsmethodik",
    primaryCta: "VPN-Vergleiche ansehen",
    secondaryCta: "Methodik lesen",
    statProviders: "Anbieterprofile",
    statAudits: "mit Audit-Angaben",
    statSources: "quellenbasierte Kriterien",
    sectionTitle: "Weltweit bekannte VPN-Anbieter",
    sectionSubtitle: "Die Reihenfolge am Anfang spiegelt wiederkehrende Popularitätssignale aus Verbraucherumfragen, Markensichtbarkeit und unabhängigen Branchenlisten 2025-2026 wider. Sie ist kein technischer Test und kein allgemeiner Anspruch auf Überlegenheit.",
    featured: "Globale Popularitätsübersicht",
    profile: "Anbieterprofil",
    viewProfile: "Detailprofil öffnen",
  },
} satisfies Record<Locale, Record<string, string>>;

export function positioningFor(locale: Locale) {
  return editorialPositioning[locale];
}
