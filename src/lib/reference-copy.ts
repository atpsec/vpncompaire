import type { Locale } from "@/lib/site";

export type ReferenceCopy = {
  navProfiles: string;
  navMethodology: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimary: string;
  heroSecondary: string;
  heroStats: [string, string, string];
  profilesKicker: string;
  profilesTitle: string;
  profilesSubtitle: string;
  profileLabel: string;
  sourceStatus: string;
  officialSource: string;
  profileLink: string;
  methodologyBadge: string;
  methodologyTitle: string;
  methodologyBody: string;
  methodologyCta: string;
  criteria: [string, string, string, string, string, string];
};

const COPY: Record<Locale, ReferenceCopy> = {
  tr: {
    navProfiles: "VPN Rehberi",
    navMethodology: "Kaynak Politikası",
    heroBadge: "Kaynak gösteren VPN bilgi rehberi",
    heroTitle: "VPN'leri iddialarla değil, doğrulanabilir bilgilerle karşılaştırın",
    heroSubtitle:
      "Sağlayıcı belgeleri, gizlilik politikaları, bağımsız denetimler, fiyatlandırma ve cihaz desteğini tek yerde karşılaştırın. Laboratuvar testi veya sahte editoryal puan iddiasında bulunmuyoruz.",
    heroPrimary: "VPN profillerini karşılaştır",
    heroSecondary: "Kaynak politikamızı oku",
    heroStats: ["sağlayıcı profili", "denetim kaydı", "kaynak temelli kriter"],
    profilesKicker: "Karşılaştırma rehberi",
    profilesTitle: "VPN sağlayıcı profilleri",
    profilesSubtitle:
      "Aşağıdaki sıra bir kalite puanı değildir. Sağlayıcıları aynı bilgi başlıklarıyla yan yana getirir; güncel koşulları resmi kaynaklardan doğrulamanızı öneririz.",
    profileLabel: "Bilgi profili",
    sourceStatus: "Belgelendirme",
    officialSource: "Resmi fiyatı kontrol et",
    profileLink: "Detaylı bilgi profili",
    methodologyBadge: "Şeffaf araştırma yaklaşımı",
    methodologyTitle: "Nasıl araştırıyoruz?",
    methodologyBody:
      "VPN Advisor kendi laboratuvarında sürekli hız veya streaming testi yaptığını iddia etmez. Karşılaştırmalar, kamuya açık ve mümkün olduğunda birincil kaynaklardan derlenen doğrulanabilir bilgilere dayanır.",
    methodologyCta: "Araştırma ve kaynak politikasını oku",
    criteria: [
      "Gizlilik politikası ve şirket bilgileri",
      "Bağımsız denetimler ve güvenlik raporları",
      "Protokoller ve teknik dokümantasyon",
      "Cihaz ve platform desteği",
      "Fiyat, yenileme ve iade koşulları",
      "Bilginin tarihi ve kaynak sınırlamaları",
    ],
  },
  en: {
    navProfiles: "VPN Guide",
    navMethodology: "Source Policy",
    heroBadge: "Source-based VPN reference",
    heroTitle: "Compare VPNs with verifiable information, not invented scores",
    heroSubtitle:
      "Compare provider documentation, privacy policies, independent audits, pricing and device support in one place. We do not claim lab testing or editorial ratings that did not happen.",
    heroPrimary: "Compare VPN profiles",
    heroSecondary: "Read our source policy",
    heroStats: ["provider profiles", "audit records", "evidence criteria"],
    profilesKicker: "Comparison reference",
    profilesTitle: "VPN provider profiles",
    profilesSubtitle:
      "The order below is not a quality ranking. Providers are presented with the same information fields, and current terms should be verified at the official source.",
    profileLabel: "Information profile",
    sourceStatus: "Documentation",
    officialSource: "Check official pricing",
    profileLink: "Detailed provider profile",
    methodologyBadge: "Transparent research approach",
    methodologyTitle: "How we research",
    methodologyBody:
      "VPN Advisor does not claim continuous in-house speed or streaming lab tests. Comparisons are built from verifiable public information, prioritising primary sources where possible.",
    methodologyCta: "Read the research and source policy",
    criteria: [
      "Privacy policy and company information",
      "Independent audits and security reports",
      "Protocols and technical documentation",
      "Device and platform support",
      "Pricing, renewal and refund terms",
      "Freshness and source limitations",
    ],
  },
  de: {
    navProfiles: "VPN-Ratgeber",
    navMethodology: "Quellenrichtlinie",
    heroBadge: "Quellenbasierter VPN-Ratgeber",
    heroTitle: "VPNs mit überprüfbaren Informationen statt erfundenen Bewertungen vergleichen",
    heroSubtitle:
      "Vergleichen Sie Anbieterdokumentation, Datenschutzrichtlinien, unabhängige Audits, Preise und Geräteunterstützung. Wir behaupten keine Labortests oder redaktionellen Bewertungen, die nicht durchgeführt wurden.",
    heroPrimary: "VPN-Profile vergleichen",
    heroSecondary: "Quellenrichtlinie lesen",
    heroStats: ["Anbieterprofile", "Audit-Nachweise", "Quellenkriterien"],
    profilesKicker: "Vergleichsreferenz",
    profilesTitle: "VPN-Anbieterprofile",
    profilesSubtitle:
      "Die Reihenfolge ist keine Qualitätsrangliste. Anbieter werden nach denselben Informationsfeldern dargestellt; aktuelle Bedingungen sollten bei der offiziellen Quelle geprüft werden.",
    profileLabel: "Informationsprofil",
    sourceStatus: "Dokumentation",
    officialSource: "Offizielle Preise prüfen",
    profileLink: "Detailliertes Anbieterprofil",
    methodologyBadge: "Transparenter Rechercheansatz",
    methodologyTitle: "Wie wir recherchieren",
    methodologyBody:
      "VPN Advisor behauptet keine laufenden eigenen Geschwindigkeits- oder Streaming-Labortests. Vergleiche basieren auf überprüfbaren öffentlichen Informationen und möglichst auf Primärquellen.",
    methodologyCta: "Recherche- und Quellenrichtlinie lesen",
    criteria: [
      "Datenschutzrichtlinie und Unternehmensdaten",
      "Unabhängige Audits und Sicherheitsberichte",
      "Protokolle und technische Dokumentation",
      "Geräte- und Plattformunterstützung",
      "Preise, Verlängerung und Erstattung",
      "Aktualität und Quellenbeschränkungen",
    ],
  },
};

export function referenceCopy(locale: string): ReferenceCopy {
  const safeLocale: Locale = locale === "en" || locale === "de" ? locale : "tr";
  return COPY[safeLocale];
}
