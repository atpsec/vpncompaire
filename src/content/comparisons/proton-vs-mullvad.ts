// "Proton VPN vs Mullvad" karşılaştırmasının locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/comparison/proton-vs-mullvad/page.tsx) bu modülden
// render eder; yerelleştirilmiş URL'ler (/comparison/..., /en/comparison/...,
// /de/vergleich/...) proxy rewrite ile aynı sayfaya düşer.
// A = Proton VPN, B = Mullvad.

import type { AppLocale } from "@/lib/i18n-paths";

export type AbWinner = "a" | "b" | "tie";

export type AbCategory = {
  name: string;
  winner: AbWinner;
  aDetail: string;
  bDetail: string;
  reasoning: string;
};

export type ProtonVsMullvadContent = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: { home: string; hub: string; current: string };
  badge: string;
  h1: string;
  tagline: string;
  ctaOfficial: { a: string; b: string };
  categoriesH2: string;
  categoriesIntro: string;
  reasonLabel: string;
  winnerTie: string;
  winnerLeads: { a: string; b: string };
  categories: AbCategory[];
  whyA: { title: string; bullets: string[]; cta: string };
  whyB: { title: string; bullets: string[]; cta: string };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  related: { title: string; links: { href: string; text: string }[] };
};

const tr: ProtonVsMullvadContent = {
  metaTitle: "Proton VPN vs Mullvad Karşılaştırması (2026)",
  metaDescription:
    "Proton VPN ve Mullvad'ı 6 kritere göre karşılaştırdık: gizlilik felsefesi, denetimler, fiyat ve kullanım modeli. Gizlilik puristleri için.",
  breadcrumb: {
    home: "Ana sayfa",
    hub: "Karşılaştırma",
    current: "Proton VPN vs Mullvad",
  },
  badge: "Yan yana karşılaştırma",
  h1: "Proton VPN vs Mullvad: 2026 Karşılaştırması",
  tagline:
    "İki gizlilik öncülü — açık kaynak, denetimli ve felsefe olarak gizliliğe adanmış. Hangisi sana uygun?",
  ctaOfficial: {
    a: "Proton VPN sitesini ziyaret et",
    b: "Mullvad sitesini ziyaret et",
  },
  categoriesH2: "Kategori bazında öne çıkan özellikler",
  categoriesIntro:
    'Her satırdaki etiket, sağlayıcının o kriterde nasıl konumlandığını gösterir — kategorik bir "kazanan" ilan etmez.',
  reasonLabel: "Neden:",
  winnerTie: "İkisi de güçlü",
  winnerLeads: {
    a: "Proton VPN bu kriterde öne çıkıyor",
    b: "Mullvad bu kriterde öne çıkıyor",
  },
  categories: [
    {
      name: "Gizlilik felsefesi",
      winner: "b",
      aDetail: "Hesap için e-posta gerekli; ücretsiz plan mevcut",
      bDetail: "Anonim hesap — sadece rastgele numara; e-posta bile gerekmez",
      reasoning:
        "Mullvad'ın anonim hesap modeli, sektörde benzersiz. Proton VPN'in gizlilik kaydı da sağlam ama Mullvad'ın 'minimum bilgi' felsefesi daha radikal.",
    },
    {
      name: "Yargı yetkisi",
      winner: "a",
      aDetail: "İsviçre — AB ve ABD ittifakları dışı, federal gizlilik yasaları",
      bDetail: "İsveç — AB üyesi, 14 Eyes ittifakının çevresel üyesi",
      reasoning:
        "İsviçre, yargı yetkisi olarak Mullvad'ın İsveç merkezinden daha güçlü. Mullvad bu durumu 'saklamadığın veriyi paylaşamazsın' yaklaşımıyla telafi ediyor — yine de jurisdiction açısından Proton avantajlı.",
    },
    {
      name: "Bağımsız denetimler",
      winner: "tie",
      aDetail: "Yıllık Securitum no-logs denetimi + düzenli güvenlik denetimleri",
      bDetail: "Assured AB tekrarlanan güvenlik ve no-logs denetimleri (2018-2024)",
      reasoning:
        "Her ikisi de düzenli ve şeffaf denetim raporları yayınlıyor. Proton VPN yıllık, Mullvad biraz daha sık aralıklarla. İkisi de açık kaynak istemciler sunduğu için kod düzeyinde de denetlenebilir.",
    },
    {
      name: "Streaming uyumluluğu",
      winner: "a",
      aDetail: "Plus planda Netflix US/UK/JP, Disney+, BBC iPlayer, BluTV",
      bDetail: "Streaming için optimize değil — çoğu platform engelliyor",
      reasoning:
        "Proton VPN Plus planı sağlam streaming bypass'ı sunuyor. Mullvad kasıtlı olarak streaming odaklı değil — gizlilik aracı olarak konumlanıyor. Streaming önemliyse Proton VPN açık tercih.",
    },
    {
      name: "Fiyatlandırma modeli",
      winner: "tie",
      aDetail: "Ücretsiz plan + Plus $4.49/ay (2 yıl) + yenileme tuzağı var",
      bDetail: "Sabit €5/ay — indirim yok, yenileme tuzağı yok, promosyon yok",
      reasoning:
        "Proton VPN ücretsiz plan ve uzun dönem indirim sunuyor — ama yenileme dönemine girince fiyat yükseliyor. Mullvad sabit ve şeffaf fiyatlandırma — ama uzun dönem indirim yok. Hangisi avantajlı olduğu kullanım süresine bağlı.",
    },
    {
      name: "Ekosistem entegrasyonu",
      winner: "a",
      aDetail:
        "ProtonMail, Proton Drive, Calendar, Pass — birleşik gizlilik ekosistemi",
      bDetail: "Yalnızca VPN — diğer Mullvad ürünleri yok",
      reasoning:
        "Proton AG, gizlilik odaklı bir ürün ailesi sunuyor (e-posta, depolama, parola, takvim). Hepsi tek hesapla ve aynı gizlilik felsefesiyle çalışıyor. Mullvad sadeliği seçti — yalnızca VPN.",
    },
  ],
  whyA: {
    title: "Proton VPN'i seç eğer...",
    bullets: [
      "Streaming bypass'ı (BluTV, Netflix vb.) önemli",
      "ProtonMail, Proton Drive kullanıyorsan (ekosistem entegrasyonu)",
      "Uzun dönem indirimli fiyat avantajını kullanmak istiyorsan",
      "İsviçre yargı yetkisi senin için belirleyici",
      "Ücretsiz plan ile başlamak istiyorsan",
    ],
    cta: "Proton VPN'i incele",
  },
  whyB: {
    title: "Mullvad'ı seç eğer...",
    bullets: [
      "Anonim hesap modeli (e-posta bile vermek istemiyorsan) çekiciyse",
      "Affiliate ekosisteminden bağımsız bir seçenek arıyorsan",
      "Pazarlama tuzaklarından (indirim, yenileme, promosyon) uzak durmak istiyorsan",
      "Maksimum sadelik — sadece VPN, başka bir şey yok",
      "Streaming için VPN aramıyorsan",
    ],
    cta: "Mullvad'ı incele",
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Hangisi daha gizlilik dostu?",
      a: "İkisi de sektörün en gizlilik dostu seçimleri. Mullvad'ın anonim hesap modeli (e-posta bile gerekmez) daha radikal; Proton VPN'in İsviçre yargı yetkisi ve ekosistem entegrasyonu daha kapsamlı. Hangisinin daha 'iyi' olduğu, gizlilik tanımına göre değişir.",
    },
    {
      q: "Streaming için hangisi?",
      a: "Açıkça Proton VPN. Mullvad streaming için optimize değil — bu kasıtlı bir tasarım kararı.",
    },
    {
      q: "İkisi de açık kaynak mı?",
      a: "Evet. Hem Proton VPN hem Mullvad tüm istemcilerini açık kaynak olarak yayınlıyor (GitHub'da). Bağımsız güvenlik araştırmacıları kodu inceleyebilir.",
    },
    {
      q: "Hangisi daha pahalı?",
      a: "Aylık bazda Mullvad sabit €5; Proton VPN ilk dönemde $4.49 ama yenileme dönemine yükselir. 2-3 yıllık kullanım toplamında Proton VPN daha pahalı olabilir; ancak kullandığın özellikler (ekosistem, streaming) farklı.",
    },
  ],
  related: {
    title: "Diğer sayfalar",
    links: [
      { href: "/best-vpn/privacy", text: "Gizlilik için en iyi VPN" },
      { href: "/reviews/proton-vpn", text: "Proton VPN incelemesi" },
      { href: "/reviews/mullvad", text: "Mullvad incelemesi" },
      { href: "/comparison", text: "Tüm karşılaştırmalar" },
    ],
  },
};

const en: ProtonVsMullvadContent = {
  metaTitle: "Proton VPN vs Mullvad Comparison (2026)",
  metaDescription:
    "We compared Proton VPN and Mullvad across 6 criteria: privacy philosophy, audits, price and usage model. For privacy purists.",
  breadcrumb: {
    home: "Home",
    hub: "Compare",
    current: "Proton VPN vs Mullvad",
  },
  badge: "Side-by-side comparison",
  h1: "Proton VPN vs Mullvad: 2026 Comparison",
  tagline:
    "Two privacy pioneers — open source, audited and philosophically devoted to privacy. Which one is right for you?",
  ctaOfficial: {
    a: "Visit Proton VPN",
    b: "Visit Mullvad",
  },
  categoriesH2: "Category-by-category highlights",
  categoriesIntro:
    'Each row indicates how a provider is positioned for that criterion — it does not crown a categorical "winner".',
  reasonLabel: "Why:",
  winnerTie: "Both are strong",
  winnerLeads: {
    a: "Proton VPN leads on this criterion",
    b: "Mullvad leads on this criterion",
  },
  categories: [
    {
      name: "Privacy philosophy",
      winner: "b",
      aDetail: "Email required for an account; free plan available",
      bDetail:
        "Anonymous account — just a random number; not even an email is needed",
      reasoning:
        "Mullvad's anonymous account model is unique in the industry. Proton VPN's privacy record is solid too, but Mullvad's 'minimum information' philosophy is more radical.",
    },
    {
      name: "Jurisdiction",
      winner: "a",
      aDetail:
        "Switzerland — outside EU and US alliances, federal privacy laws",
      bDetail: "Sweden — EU member, peripheral member of the 14 Eyes alliance",
      reasoning:
        "Switzerland is a stronger jurisdiction than Mullvad's Swedish home base. Mullvad compensates with its 'you can't hand over data you don't store' approach — still, on jurisdiction Proton has the edge.",
    },
    {
      name: "Independent audits",
      winner: "tie",
      aDetail: "Annual Securitum no-logs audit + regular security audits",
      bDetail:
        "Repeated Assured AB security and no-logs audits (2018-2024)",
      reasoning:
        "Both publish regular, transparent audit reports. Proton VPN annually, Mullvad at somewhat shorter intervals. Since both offer open-source clients, they can also be audited at the code level.",
    },
    {
      name: "Streaming compatibility",
      winner: "a",
      aDetail: "On the Plus plan: Netflix US/UK/JP, Disney+, BBC iPlayer, BluTV",
      bDetail: "Not optimized for streaming — most platforms block it",
      reasoning:
        "Proton VPN's Plus plan offers solid streaming bypass. Mullvad deliberately doesn't focus on streaming — it positions itself as a privacy tool. If streaming matters, Proton VPN is the clear pick.",
    },
    {
      name: "Pricing model",
      winner: "tie",
      aDetail: "Free plan + Plus $4.49/mo (2 years) + a renewal trap exists",
      bDetail:
        "Flat €5/mo — no discounts, no renewal trap, no promotions",
      reasoning:
        "Proton VPN offers a free plan and long-term discounts — but the price rises once renewal kicks in. Mullvad has flat, transparent pricing — but no long-term discount. Which is the better deal depends on how long you use it.",
    },
    {
      name: "Ecosystem integration",
      winner: "a",
      aDetail:
        "ProtonMail, Proton Drive, Calendar, Pass — a unified privacy ecosystem",
      bDetail: "VPN only — no other Mullvad products",
      reasoning:
        "Proton AG offers a privacy-focused product family (email, storage, passwords, calendar). Everything runs on a single account and the same privacy philosophy. Mullvad chose simplicity — VPN only.",
    },
  ],
  whyA: {
    title: "Choose Proton VPN if...",
    bullets: [
      "Streaming bypass (BluTV, Netflix, etc.) matters to you",
      "You use ProtonMail or Proton Drive (ecosystem integration)",
      "You want to take advantage of long-term discounted pricing",
      "Swiss jurisdiction is decisive for you",
      "You want to start with a free plan",
    ],
    cta: "Read the Proton VPN review",
  },
  whyB: {
    title: "Choose Mullvad if...",
    bullets: [
      "The anonymous account model appeals to you (if you don't even want to give an email)",
      "You're looking for an option independent of the affiliate ecosystem",
      "You want to stay away from marketing traps (discounts, renewals, promotions)",
      "Maximum simplicity — just a VPN, nothing else",
      "You're not looking for a VPN for streaming",
    ],
    cta: "Read the Mullvad review",
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Which is more privacy-friendly?",
      a: "Both are among the most privacy-friendly choices in the industry. Mullvad's anonymous account model (not even an email is required) is more radical; Proton VPN's Swiss jurisdiction and ecosystem integration are more comprehensive. Which is 'better' depends on how you define privacy.",
    },
    {
      q: "Which one for streaming?",
      a: "Clearly Proton VPN. Mullvad isn't optimized for streaming — that's a deliberate design decision.",
    },
    {
      q: "Are both open source?",
      a: "Yes. Both Proton VPN and Mullvad publish all of their clients as open source (on GitHub). Independent security researchers can review the code.",
    },
    {
      q: "Which is more expensive?",
      a: "Monthly, Mullvad is a flat €5; Proton VPN starts at $4.49 but rises at renewal. Over 2-3 years of use, Proton VPN can end up more expensive; but the features you use (ecosystem, streaming) differ.",
    },
  ],
  related: {
    title: "Other pages",
    links: [
      { href: "/best-vpn/privacy", text: "Best VPNs for privacy" },
      { href: "/reviews/proton-vpn", text: "Proton VPN review" },
      { href: "/reviews/mullvad", text: "Mullvad review" },
      { href: "/comparison", text: "All comparisons" },
    ],
  },
};

const de: ProtonVsMullvadContent = {
  metaTitle: "Proton VPN vs Mullvad im Vergleich (2026)",
  metaDescription:
    "Wir haben Proton VPN und Mullvad anhand von 6 Kriterien verglichen: Datenschutz-Philosophie, Audits, Preis und Nutzungsmodell. Für Datenschutz-Puristen.",
  breadcrumb: {
    home: "Startseite",
    hub: "Vergleich",
    current: "Proton VPN vs Mullvad",
  },
  badge: "Direktvergleich",
  h1: "Proton VPN vs Mullvad: Vergleich 2026",
  tagline:
    "Zwei Datenschutz-Pioniere — Open Source, auditiert und der Privatsphäre aus Überzeugung verschrieben. Welcher passt zu dir?",
  ctaOfficial: {
    a: "Zur Proton-VPN-Website",
    b: "Zur Mullvad-Website",
  },
  categoriesH2: "Highlights nach Kategorien",
  categoriesIntro:
    'Das Label in jeder Zeile zeigt, wie ein Anbieter bei diesem Kriterium positioniert ist — es kürt keinen kategorischen "Sieger".',
  reasonLabel: "Warum:",
  winnerTie: "Beide sind stark",
  winnerLeads: {
    a: "Proton VPN liegt bei diesem Kriterium vorn",
    b: "Mullvad liegt bei diesem Kriterium vorn",
  },
  categories: [
    {
      name: "Datenschutz-Philosophie",
      winner: "b",
      aDetail: "E-Mail für das Konto erforderlich; kostenloser Tarif verfügbar",
      bDetail:
        "Anonymes Konto — nur eine Zufallsnummer; nicht einmal eine E-Mail nötig",
      reasoning:
        "Mullvads anonymes Kontomodell ist einzigartig in der Branche. Auch Proton VPNs Datenschutzbilanz ist solide, aber Mullvads Philosophie des 'Minimums an Informationen' ist radikaler.",
    },
    {
      name: "Gerichtsbarkeit",
      winner: "a",
      aDetail:
        "Schweiz — außerhalb der EU- und US-Allianzen, föderale Datenschutzgesetze",
      bDetail:
        "Schweden — EU-Mitglied, peripheres Mitglied der 14-Eyes-Allianz",
      reasoning:
        "Die Schweiz ist als Gerichtsbarkeit stärker als Mullvads schwedischer Sitz. Mullvad kompensiert das mit dem Ansatz 'Daten, die du nicht speicherst, kannst du nicht herausgeben' — bei der Gerichtsbarkeit liegt Proton dennoch vorn.",
    },
    {
      name: "Unabhängige Audits",
      winner: "tie",
      aDetail:
        "Jährliches Securitum-No-Logs-Audit + regelmäßige Sicherheitsaudits",
      bDetail:
        "Wiederholte Sicherheits- und No-Logs-Audits von Assured AB (2018-2024)",
      reasoning:
        "Beide veröffentlichen regelmäßige, transparente Audit-Berichte. Proton VPN jährlich, Mullvad in etwas kürzeren Abständen. Da beide Open-Source-Clients anbieten, lässt sich auch der Code prüfen.",
    },
    {
      name: "Streaming-Kompatibilität",
      winner: "a",
      aDetail: "Im Plus-Tarif: Netflix US/UK/JP, Disney+, BBC iPlayer, BluTV",
      bDetail:
        "Nicht für Streaming optimiert — die meisten Plattformen blockieren",
      reasoning:
        "Proton VPNs Plus-Tarif bietet soliden Streaming-Bypass. Mullvad setzt bewusst nicht auf Streaming — es positioniert sich als Datenschutz-Werkzeug. Wenn Streaming wichtig ist, ist Proton VPN die klare Wahl.",
    },
    {
      name: "Preismodell",
      winner: "tie",
      aDetail:
        "Kostenloser Tarif + Plus $4.49/Monat (2 Jahre) + Verlängerungsfalle vorhanden",
      bDetail:
        "Fix €5/Monat — kein Rabatt, keine Verlängerungsfalle, keine Aktionen",
      reasoning:
        "Proton VPN bietet einen Gratis-Tarif und Langzeitrabatte — bei der Verlängerung steigt der Preis aber. Mullvad hat feste, transparente Preise — aber keinen Langzeitrabatt. Was günstiger ist, hängt von der Nutzungsdauer ab.",
    },
    {
      name: "Ökosystem-Integration",
      winner: "a",
      aDetail:
        "ProtonMail, Proton Drive, Calendar, Pass — ein einheitliches Datenschutz-Ökosystem",
      bDetail: "Nur VPN — keine weiteren Mullvad-Produkte",
      reasoning:
        "Proton AG bietet eine datenschutzorientierte Produktfamilie (E-Mail, Speicher, Passwörter, Kalender). Alles läuft mit einem Konto und derselben Datenschutz-Philosophie. Mullvad hat sich für Einfachheit entschieden — nur VPN.",
    },
  ],
  whyA: {
    title: "Wähle Proton VPN, wenn...",
    bullets: [
      "Streaming-Bypass (BluTV, Netflix usw.) wichtig ist",
      "du ProtonMail oder Proton Drive nutzt (Ökosystem-Integration)",
      "du den Langzeitrabatt nutzen willst",
      "die Schweizer Gerichtsbarkeit für dich entscheidend ist",
      "du mit einem kostenlosen Tarif starten willst",
    ],
    cta: "Zum Proton-VPN-Test",
  },
  whyB: {
    title: "Wähle Mullvad, wenn...",
    bullets: [
      "dich das anonyme Kontomodell reizt (wenn du nicht einmal eine E-Mail angeben willst)",
      "du eine vom Affiliate-Ökosystem unabhängige Option suchst",
      "du Marketing-Fallen (Rabatte, Verlängerungen, Aktionen) aus dem Weg gehen willst",
      "maximale Einfachheit zählt — nur VPN, sonst nichts",
      "du kein VPN fürs Streaming suchst",
    ],
    cta: "Zum Mullvad-Test",
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Welcher ist datenschutzfreundlicher?",
      a: "Beide gehören zu den datenschutzfreundlichsten Optionen der Branche. Mullvads anonymes Kontomodell (nicht einmal eine E-Mail nötig) ist radikaler; Proton VPNs Schweizer Gerichtsbarkeit und Ökosystem-Integration sind umfassender. Was 'besser' ist, hängt von deiner Definition von Privatsphäre ab.",
    },
    {
      q: "Welcher fürs Streaming?",
      a: "Eindeutig Proton VPN. Mullvad ist nicht für Streaming optimiert — das ist eine bewusste Designentscheidung.",
    },
    {
      q: "Sind beide Open Source?",
      a: "Ja. Sowohl Proton VPN als auch Mullvad veröffentlichen alle ihre Clients als Open Source (auf GitHub). Unabhängige Sicherheitsforscher können den Code prüfen.",
    },
    {
      q: "Welcher ist teurer?",
      a: "Monatlich kostet Mullvad fix €5; Proton VPN startet bei $4.49, steigt aber bei der Verlängerung. Über 2-3 Jahre Nutzung kann Proton VPN insgesamt teurer sein; allerdings unterscheiden sich die genutzten Funktionen (Ökosystem, Streaming).",
    },
  ],
  related: {
    title: "Weitere Seiten",
    links: [
      { href: "/best-vpn/privacy", text: "Die besten VPNs für Datenschutz" },
      { href: "/reviews/proton-vpn", text: "Proton VPN im Test" },
      { href: "/reviews/mullvad", text: "Mullvad im Test" },
      { href: "/vergleich", text: "Alle Vergleiche" },
    ],
  },
};

const CONTENT: Record<AppLocale, ProtonVsMullvadContent> = { tr, en, de };

export function getProtonVsMullvadContent(
  locale: string,
): ProtonVsMullvadContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
