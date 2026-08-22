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
    sectionTitle: "VPN sağlayıcıları: özellik ve kaynak karşılaştırması",
    sectionSubtitle: "Aşağıdaki sıralama bir laboratuvar puanı değildir. Sağlayıcıların yayınladığı bilgiler ve doğrulanabilir üçüncü taraf kaynakları, aynı karşılaştırma alanlarında yan yana gösterilir.",
    featured: "Öne çıkan profil",
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
    sectionTitle: "VPN providers: feature and source comparison",
    sectionSubtitle: "The ordering below is not a laboratory score. Provider-published information and verifiable third-party sources are presented side by side using the same comparison fields.",
    featured: "Featured profile",
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
    sectionTitle: "VPN-Anbieter: Merkmals- und Quellenvergleich",
    sectionSubtitle: "Die Reihenfolge unten ist keine Laborbewertung. Anbieterangaben und überprüfbare Drittquellen werden anhand derselben Vergleichsfelder gegenübergestellt.",
    featured: "Hervorgehobenes Profil",
    profile: "Anbieterprofil",
    viewProfile: "Detailprofil öffnen",
  },
} satisfies Record<Locale, Record<string, string>>;

export function positioningFor(locale: Locale) {
  return editorialPositioning[locale];
}
