// "NordVPN vs Surfshark" karşılaştırmasının locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/karsilastir/nordvpn-vs-surfshark/page.tsx) bu
// modülden render eder; yerelleştirilmiş URL'ler (/karsilastir/...,
// /en/comparison/..., /de/vergleich/...) proxy rewrite ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type NordSurfWinner = "nordvpn" | "surfshark" | "tie";

export type NordSurfCategory = {
  name: string;
  winner: NordSurfWinner;
  nord: string;
  surf: string;
  reasoning: string;
};

export type NordvpnVsSurfsharkContent = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: { home: string; hub: string; current: string };
  badge: string;
  h1: string;
  lede: string;
  ctaOfficial: { nordvpn: string; surfshark: string };
  categoriesH2: string;
  reasonLabel: string;
  winnerTie: string;
  winnerLeads: { nordvpn: string; surfshark: string };
  categories: NordSurfCategory[];
  chooseNord: { title: string; bullets: string[]; cta: string };
  chooseSurf: { title: string; bullets: string[]; cta: string };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  related: {
    title: string;
    links: { href: string; text: string }[];
    allLink: { href: string; text: string };
  };
};

const tr: NordvpnVsSurfsharkContent = {
  metaTitle: "NordVPN vs Surfshark Karşılaştırması (2026)",
  metaDescription:
    "NordVPN ve Surfshark'ı 6 kritere göre karşılaştırdık: gizlilik, denetimler, hız, streaming, fiyat ve cihaz desteği. Hangisinin sana uygun olabileceğini değerlendir.",
  breadcrumb: {
    home: "Ana sayfa",
    hub: "Karşılaştırma",
    current: "NordVPN vs Surfshark",
  },
  badge: "Yan yana karşılaştırma",
  h1: "NordVPN vs Surfshark: 2026 Karşılaştırması",
  lede: "Aynı şirket çatısı altında çalışan iki büyük VPN — ama farklı önceliklerle. 6 kritere göre yan yana karşılaştırdık. Hangisinin sana uygun olabileceğini değerlendirmen için.",
  ctaOfficial: {
    nordvpn: "NordVPN resmi sitesi",
    surfshark: "Surfshark resmi sitesi",
  },
  categoriesH2: "Kategori bazında karşılaştırma",
  reasonLabel: "Neden:",
  winnerTie: "İkisi de güçlü",
  winnerLeads: {
    nordvpn: "NordVPN bu kriterde öne çıkıyor",
    surfshark: "Surfshark bu kriterde öne çıkıyor",
  },
  categories: [
    {
      name: "Gizlilik ve yargı yetkisi",
      winner: "tie",
      nord: "Panama (14 Eyes dışı, zorunlu veri saklama yok)",
      surf: "Hollanda (14 Eyes ama AB'nin sıkı veri koruma yasaları)",
      reasoning:
        "Her ikisi de güçlü no-logs politikası uyguluyor. Panama hukuki olarak biraz daha avantajlı; Hollanda da AB veri koruma yasaları çerçevesinde güçlü konumda.",
    },
    {
      name: "Bağımsız denetimler",
      winner: "nordvpn",
      nord: "Deloitte no-logs (6 defa, son: 2025) + Cure53 istemci denetimleri (3x)",
      surf: "Cure53 + Deloitte denetimleri (2023)",
      reasoning:
        "NordVPN'in tekrarlanan altı kez Deloitte denetimi, sektördeki en kapsamlı no-logs ispatlarından biri. Surfshark da denetlendi ama süreklilik açısından NordVPN önde.",
    },
    {
      name: "Hız performansı",
      winner: "nordvpn",
      nord: "NordLynx (WireGuard tabanlı) — %91-96 yakın, %72-80 uzak",
      surf: "WireGuard — %85-92 yakın, %65-75 uzak",
      reasoning:
        "NordLynx'in özel optimizasyonu sayesinde Surfshark'ın WireGuard implementasyonundan %5-7 daha yüksek throughput sağlıyor. Pratikte günlük kullanımda fark sınırlı.",
    },
    {
      name: "Streaming uyumluluğu",
      winner: "tie",
      nord: "Netflix US/UK/JP/TR, Disney+, BBC iPlayer, BluTV, Exxen — stabil",
      surf: "Netflix US/UK/JP/TR/BR, Disney+, BBC iPlayer, BluTV, Exxen, HBO Max — stabil",
      reasoning:
        "İkisi de sektörün üst seviye streaming bypass'ına sahip. Surfshark'ın Türkiye sunucusu, yurt dışından Türk içeriklere erişim için somut bir avantaj.",
    },
    {
      name: "Fiyat (uzun dönem)",
      winner: "surfshark",
      nord: "2 yıllık plan: ~$3.39/ay (ilk dönem)",
      surf: "2 yıllık plan: ~$2.19/ay (ilk dönem)",
      reasoning:
        "Surfshark, NordVPN'den yaklaşık %35 daha ucuz. Yenileme dönemi ikisi için de yükseliyor — ancak Surfshark'ın temel fiyatı kalıcı olarak daha düşük.",
    },
    {
      name: "Cihaz desteği",
      winner: "surfshark",
      nord: "10 eşzamanlı cihaz",
      surf: "Sınırsız eşzamanlı cihaz",
      reasoning:
        "Surfshark'ın sınırsız cihaz politikası, aile veya çok cihazlı kullanıcılar için belirleyici avantaj. NordVPN'in 10 cihaz limiti çoğu birey/çekirdek aile için yeterli ama tam aile + akıllı ev senaryosunda yetersiz kalabilir.",
    },
  ],
  chooseNord: {
    title: "NordVPN'i seç eğer...",
    bullets: [
      "Maksimum hız performansı isteğin var",
      "Tekrarlanan bağımsız denetimler kritik",
      "Streaming çok kullanıyorsun ve istikrar arıyorsun",
      "10 cihaz limiti senin için yeterli",
      "Threat Protection, Meshnet, Onion over VPN gibi ek özellikler değerli",
    ],
    cta: "NordVPN'i incele",
  },
  chooseSurf: {
    title: "Surfshark'ı seç eğer...",
    bullets: [
      "Bütçe önemli ve uzun dönem plan tercih ediyorsun",
      "Çok sayıda cihazı korumak istiyorsun (sınırsız)",
      "Türkiye lokasyonlu sunucu lazım",
      "Camouflage Mode (DPI bypass) önemli",
      "BluTV / Exxen erişimi yurt dışından",
    ],
    cta: "Surfshark'ı incele",
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "NordVPN mi Surfshark mı daha iyi?",
      a: "Tek bir 'daha iyi' yok — önceliğine bağlı. Genel performans ve denetim geçmişi konusunda NordVPN, fiyat ve cihaz desteği konusunda Surfshark öne çıkıyor. Bütçe öncelikse ve çok cihaz koruman gerekiyorsa Surfshark; tekrarlanan denetim ve geniş ek özellikler önceliğin ise NordVPN değerlendirilebilir. Satın almadan önce her iki sağlayıcının kendi sitesinden güncel bilgileri kontrol etmeni öneririz.",
    },
    {
      q: "Aynı şirketin iki ürünü değil mi?",
      a: "Mart 2022'de kurumsal olarak birleştiler — Nord Security ana şirket olarak iki markayı da yönetiyor. Ancak ürün geliştirme, altyapı, no-logs denetimleri ve operasyonel ekipler ayrı çalışıyor. Pratik olarak iki farklı VPN olarak davranıyorlar.",
    },
    {
      q: "Hangisi Türkiye'de daha iyi çalışıyor?",
      a: "Surfshark — Türkiye lokasyonlu sunucusu ve Camouflage Mode (DPI bypass) özelliği var. NordVPN Türkiye sunucusu sunmuyor ama yakın Avrupa sunucularıyla iyi performans veriyor.",
    },
    {
      q: "İki abonelik birden almak mantıklı mı?",
      a: "Genelde hayır. Tek bir kaliteli VPN sıradan kullanıcı için yeterli. İki abonelik almak yerine, sana uygun olanı seçip diğerlerine harcayacağın parayı diğer güvenlik araçlarına (parola yöneticisi, şifreli e-posta vb.) yatırabilirsin.",
    },
  ],
  related: {
    title: "Diğer karşılaştırmalar",
    links: [
      { href: "/inceleme/expressvpn", text: "ExpressVPN incelemesi" },
      { href: "/inceleme/proton-vpn", text: "Proton VPN incelemesi" },
    ],
    allLink: { href: "/en-iyi-vpn", text: "Tüm sıralama" },
  },
};

const en: NordvpnVsSurfsharkContent = {
  metaTitle: "NordVPN vs Surfshark Comparison (2026)",
  metaDescription:
    "We compared NordVPN and Surfshark across 6 criteria: privacy, audits, speed, streaming, price and device support. Weigh up which one may suit you.",
  breadcrumb: {
    home: "Home",
    hub: "Compare",
    current: "NordVPN vs Surfshark",
  },
  badge: "Side-by-side comparison",
  h1: "NordVPN vs Surfshark: 2026 Comparison",
  lede: "Two major VPNs operating under the same corporate roof — but with different priorities. We compared them side by side across 6 criteria, so you can judge which one may suit you.",
  ctaOfficial: {
    nordvpn: "NordVPN official site",
    surfshark: "Surfshark official site",
  },
  categoriesH2: "Category-by-category comparison",
  reasonLabel: "Why:",
  winnerTie: "Both are strong",
  winnerLeads: {
    nordvpn: "NordVPN leads on this criterion",
    surfshark: "Surfshark leads on this criterion",
  },
  categories: [
    {
      name: "Privacy and jurisdiction",
      winner: "tie",
      nord: "Panama (outside 14 Eyes, no mandatory data retention)",
      surf: "Netherlands (14 Eyes, but the EU's strict data protection laws)",
      reasoning:
        "Both enforce strong no-logs policies. Panama is legally slightly more advantageous; the Netherlands also holds a strong position under EU data protection law.",
    },
    {
      name: "Independent audits",
      winner: "nordvpn",
      nord: "Deloitte no-logs (6 times, most recent: 2025) + Cure53 client audits (3x)",
      surf: "Cure53 + Deloitte audits (2023)",
      reasoning:
        "NordVPN's six repeated Deloitte audits form one of the most comprehensive no-logs proofs in the industry. Surfshark has been audited too, but NordVPN leads on continuity.",
    },
    {
      name: "Speed performance",
      winner: "nordvpn",
      nord: "NordLynx (WireGuard-based) — 91-96% nearby, 72-80% long-distance",
      surf: "WireGuard — 85-92% nearby, 65-75% long-distance",
      reasoning:
        "Thanks to NordLynx's custom optimization, it delivers 5-7% higher throughput than Surfshark's WireGuard implementation. In everyday use the difference is limited.",
    },
    {
      name: "Streaming compatibility",
      winner: "tie",
      nord: "Netflix US/UK/JP/TR, Disney+, BBC iPlayer, BluTV, Exxen — stable",
      surf: "Netflix US/UK/JP/TR/BR, Disney+, BBC iPlayer, BluTV, Exxen, HBO Max — stable",
      reasoning:
        "Both offer top-tier streaming bypass. Surfshark's Türkiye server is a tangible advantage for reaching Turkish content from abroad.",
    },
    {
      name: "Price (long term)",
      winner: "surfshark",
      nord: "2-year plan: ~$3.39/mo (intro period)",
      surf: "2-year plan: ~$2.19/mo (intro period)",
      reasoning:
        "Surfshark is roughly 35% cheaper than NordVPN. Renewal pricing rises for both — but Surfshark's base price stays permanently lower.",
    },
    {
      name: "Device support",
      winner: "surfshark",
      nord: "10 simultaneous devices",
      surf: "Unlimited simultaneous devices",
      reasoning:
        "Surfshark's unlimited device policy is a decisive advantage for families or multi-device users. NordVPN's 10-device limit is enough for most individuals or small households, but can fall short in a full family + smart home scenario.",
    },
  ],
  chooseNord: {
    title: "Choose NordVPN if...",
    bullets: [
      "You want maximum speed performance",
      "Repeated independent audits are critical for you",
      "You stream a lot and want stability",
      "A 10-device limit is enough for you",
      "Extra features like Threat Protection, Meshnet and Onion over VPN are valuable to you",
    ],
    cta: "Read our NordVPN review",
  },
  chooseSurf: {
    title: "Choose Surfshark if...",
    bullets: [
      "Budget matters and you prefer long-term plans",
      "You want to protect many devices (unlimited)",
      "You need a Türkiye-located server",
      "Camouflage Mode (DPI bypass) matters to you",
      "You want BluTV / Exxen access from abroad",
    ],
    cta: "Read our Surfshark review",
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Is NordVPN or Surfshark better?",
      a: "There's no single 'better' — it depends on your priorities. NordVPN stands out on overall performance and audit history, Surfshark on price and device support. If budget comes first and you need to protect many devices, consider Surfshark; if repeated audits and a broad set of extra features matter most, consider NordVPN. We recommend checking the latest details on each provider's own website before buying.",
    },
    {
      q: "Aren't they two products of the same company?",
      a: "They merged corporately in March 2022 — Nord Security manages both brands as the parent company. However, product development, infrastructure, no-logs audits and operational teams run separately. In practice they behave as two distinct VPNs.",
    },
    {
      q: "Which one works better in Turkey?",
      a: "Surfshark — it has a Türkiye-located server and a Camouflage Mode (DPI bypass) feature. NordVPN doesn't offer a Türkiye server, but performs well via nearby European servers.",
    },
    {
      q: "Does it make sense to buy both subscriptions?",
      a: "Usually no. One quality VPN is enough for the average user. Instead of paying for two subscriptions, pick the one that fits you and invest the money you'd spend on the other into different security tools (a password manager, encrypted email, etc.).",
    },
  ],
  related: {
    title: "More comparisons",
    links: [
      { href: "/inceleme/expressvpn", text: "ExpressVPN review" },
      { href: "/inceleme/proton-vpn", text: "Proton VPN review" },
    ],
    allLink: { href: "/en-iyi-vpn", text: "Full ranking" },
  },
};

const de: NordvpnVsSurfsharkContent = {
  metaTitle: "NordVPN vs Surfshark im Vergleich (2026)",
  metaDescription:
    "Wir haben NordVPN und Surfshark anhand von 6 Kriterien verglichen: Datenschutz, Audits, Geschwindigkeit, Streaming, Preis und Geräteunterstützung. Finde heraus, welches zu dir passt.",
  breadcrumb: {
    home: "Startseite",
    hub: "Vergleich",
    current: "NordVPN vs Surfshark",
  },
  badge: "Direktvergleich",
  h1: "NordVPN vs Surfshark: Vergleich 2026",
  lede: "Zwei große VPNs unter demselben Konzerndach — aber mit unterschiedlichen Prioritäten. Wir haben sie anhand von 6 Kriterien direkt verglichen, damit du einschätzen kannst, welches besser zu dir passt.",
  ctaOfficial: {
    nordvpn: "Offizielle NordVPN-Website",
    surfshark: "Offizielle Surfshark-Website",
  },
  categoriesH2: "Vergleich nach Kategorien",
  reasonLabel: "Warum:",
  winnerTie: "Beide sind stark",
  winnerLeads: {
    nordvpn: "NordVPN liegt bei diesem Kriterium vorn",
    surfshark: "Surfshark liegt bei diesem Kriterium vorn",
  },
  categories: [
    {
      name: "Datenschutz und Gerichtsbarkeit",
      winner: "tie",
      nord: "Panama (außerhalb der 14 Eyes, keine Vorratsdatenspeicherung)",
      surf: "Niederlande (14 Eyes, aber die strengen Datenschutzgesetze der EU)",
      reasoning:
        "Beide setzen eine starke No-Logs-Politik um. Panama ist rechtlich etwas im Vorteil; die Niederlande stehen dank der EU-Datenschutzgesetze ebenfalls solide da.",
    },
    {
      name: "Unabhängige Audits",
      winner: "nordvpn",
      nord: "Deloitte-No-Logs-Audit (6-mal, zuletzt: 2025) + Cure53-Client-Audits (3x)",
      surf: "Cure53- + Deloitte-Audits (2023)",
      reasoning:
        "NordVPNs sechs wiederholte Deloitte-Audits gehören zu den umfassendsten No-Logs-Nachweisen der Branche. Surfshark wurde ebenfalls geprüft, aber bei der Kontinuität liegt NordVPN vorn.",
    },
    {
      name: "Geschwindigkeit",
      winner: "nordvpn",
      nord: "NordLynx (WireGuard-basiert) — 91-96 % nah, 72-80 % fern",
      surf: "WireGuard — 85-92 % nah, 65-75 % fern",
      reasoning:
        "Dank seiner eigenen Optimierung liefert NordLynx 5-7 % mehr Durchsatz als Surfsharks WireGuard-Implementierung. Im Alltag ist der Unterschied begrenzt.",
    },
    {
      name: "Streaming-Kompatibilität",
      winner: "tie",
      nord: "Netflix US/UK/JP/TR, Disney+, BBC iPlayer, BluTV, Exxen — stabil",
      surf: "Netflix US/UK/JP/TR/BR, Disney+, BBC iPlayer, BluTV, Exxen, HBO Max — stabil",
      reasoning:
        "Beide bieten erstklassigen Streaming-Bypass. Surfsharks Türkei-Server ist ein handfester Vorteil, wenn du aus dem Ausland auf türkische Inhalte zugreifen willst.",
    },
    {
      name: "Preis (langfristig)",
      winner: "surfshark",
      nord: "2-Jahres-Plan: ~$3.39/Monat (Einstiegszeitraum)",
      surf: "2-Jahres-Plan: ~$2.19/Monat (Einstiegszeitraum)",
      reasoning:
        "Surfshark ist rund 35 % günstiger als NordVPN. Bei der Verlängerung steigen die Preise bei beiden — Surfsharks Basispreis bleibt aber dauerhaft niedriger.",
    },
    {
      name: "Geräteunterstützung",
      winner: "surfshark",
      nord: "10 gleichzeitige Geräte",
      surf: "Unbegrenzt viele gleichzeitige Geräte",
      reasoning:
        "Surfsharks Unlimited-Geräte-Politik ist für Familien oder Nutzer mit vielen Geräten ein entscheidender Vorteil. NordVPNs 10-Geräte-Limit reicht für die meisten Einzelpersonen und kleinen Haushalte, kann im Szenario ganze Familie + Smart Home aber knapp werden.",
    },
  ],
  chooseNord: {
    title: "Wähle NordVPN, wenn...",
    bullets: [
      "du maximale Geschwindigkeit willst",
      "wiederholte unabhängige Audits für dich entscheidend sind",
      "du viel streamst und Stabilität suchst",
      "dir ein Limit von 10 Geräten reicht",
      "Zusatzfunktionen wie Threat Protection, Meshnet und Onion over VPN für dich wertvoll sind",
    ],
    cta: "Zum NordVPN-Test",
  },
  chooseSurf: {
    title: "Wähle Surfshark, wenn...",
    bullets: [
      "das Budget wichtig ist und du langfristige Tarife bevorzugst",
      "du viele Geräte schützen willst (unbegrenzt)",
      "du einen Server in der Türkei brauchst",
      "der Camouflage Mode (DPI-Bypass) wichtig ist",
      "du BluTV / Exxen aus dem Ausland nutzen willst",
    ],
    cta: "Zum Surfshark-Test",
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Ist NordVPN oder Surfshark besser?",
      a: "Ein pauschales 'besser' gibt es nicht — es hängt von deinen Prioritäten ab. Bei Gesamtleistung und Audit-Historie liegt NordVPN vorn, bei Preis und Geräteunterstützung Surfshark. Wenn das Budget zählt und du viele Geräte schützen musst, ist Surfshark einen Blick wert; wenn wiederholte Audits und viele Zusatzfunktionen Priorität haben, NordVPN. Prüfe vor dem Kauf die aktuellen Angaben auf den Websites beider Anbieter.",
    },
    {
      q: "Sind das nicht zwei Produkte derselben Firma?",
      a: "Im März 2022 haben sie sich unternehmerisch zusammengeschlossen — Nord Security führt als Muttergesellschaft beide Marken. Produktentwicklung, Infrastruktur, No-Logs-Audits und operative Teams arbeiten aber getrennt. In der Praxis verhalten sie sich wie zwei verschiedene VPNs.",
    },
    {
      q: "Welches funktioniert in der Türkei besser?",
      a: "Surfshark — es bietet einen Server in der Türkei und den Camouflage Mode (DPI-Bypass). NordVPN bietet keinen Türkei-Server, liefert über nahe europäische Server aber gute Leistung.",
    },
    {
      q: "Lohnt es sich, beide Abos zu kaufen?",
      a: "Meist nein. Ein einziges hochwertiges VPN reicht für normale Nutzer aus. Statt zwei Abos zu bezahlen, wähle das passende und stecke das gesparte Geld in andere Sicherheitstools (Passwort-Manager, verschlüsselte E-Mail usw.).",
    },
  ],
  related: {
    title: "Weitere Vergleiche",
    links: [
      { href: "/inceleme/expressvpn", text: "ExpressVPN im Test" },
      { href: "/inceleme/proton-vpn", text: "Proton VPN im Test" },
    ],
    allLink: { href: "/en-iyi-vpn", text: "Komplettes Ranking" },
  },
};

const CONTENT: Record<AppLocale, NordvpnVsSurfsharkContent> = { tr, en, de };

export function getNordvpnVsSurfsharkContent(
  locale: string,
): NordvpnVsSurfsharkContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
