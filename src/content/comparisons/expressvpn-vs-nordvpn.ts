// "ExpressVPN vs NordVPN" karşılaştırmasının locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/karsilastir/expressvpn-vs-nordvpn/page.tsx) bu
// modülden render eder; yerelleştirilmiş URL'ler (/karsilastir/...,
// /en/comparison/..., /de/vergleich/...) proxy rewrite ile aynı sayfaya düşer.
// A = ExpressVPN, B = NordVPN.

import type { AppLocale } from "@/lib/i18n-paths";

export type AbWinner = "a" | "b" | "tie";

export type AbCategory = {
  name: string;
  winner: AbWinner;
  aDetail: string;
  bDetail: string;
  reasoning: string;
};

export type ExpressvpnVsNordvpnContent = {
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

const tr: ExpressvpnVsNordvpnContent = {
  metaTitle: "ExpressVPN vs NordVPN Karşılaştırması (2026)",
  metaDescription:
    "ExpressVPN ve NordVPN'i 6 kritere göre karşılaştırdık: hız, denetimler, streaming, fiyat ve daha fazlası. İki premium devin yan yana analizi.",
  breadcrumb: {
    home: "Ana sayfa",
    hub: "Karşılaştırma",
    current: "ExpressVPN vs NordVPN",
  },
  badge: "Yan yana karşılaştırma",
  h1: "ExpressVPN vs NordVPN: 2026 Karşılaştırması",
  tagline:
    "İki premium devin yan yana karşılaştırması — sürtünmesiz deneyim ile altı kez denetlenmiş istikrarın karşılaşması.",
  ctaOfficial: {
    a: "ExpressVPN sitesini ziyaret et",
    b: "NordVPN sitesini ziyaret et",
  },
  categoriesH2: "Kategori bazında öne çıkan özellikler",
  categoriesIntro:
    'Her satırdaki etiket, sağlayıcının o kriterde nasıl konumlandığını gösterir — kategorik bir "kazanan" ilan etmez.',
  reasonLabel: "Neden:",
  winnerTie: "İkisi de güçlü",
  winnerLeads: {
    a: "ExpressVPN bu kriterde öne çıkıyor",
    b: "NordVPN bu kriterde öne çıkıyor",
  },
  categories: [
    {
      name: "Gizlilik ve yargı yetkisi",
      winner: "a",
      aDetail:
        "İngiliz Virjin Adaları — 14 Eyes dışı, mahkemede kanıtlanmış no-logs (2017 Türkiye olayı)",
      bDetail: "Panama — 14 Eyes dışı, zorunlu veri saklama yok",
      reasoning:
        "İkisi de güçlü yargı yetkilerinde. ExpressVPN'in 2017'de Türk yetkililerinin sunucu el koymasına rağmen kayıt ifşa edememesi, gerçek dünyada kanıtlanmış no-logs için sektördeki en güçlü örneklerden biri.",
    },
    {
      name: "Bağımsız denetimler",
      winner: "b",
      aDetail: "KPMG + Cure53 + PWC denetimleri",
      bDetail:
        "Deloitte no-logs (6 defa, son: 2025) + Cure53 istemci denetimleri (3x)",
      reasoning:
        "NordVPN'in tekrarlanan altı kez Deloitte denetimi, sektörün ulaşabildiği en kapsamlı no-logs ispat serisi. ExpressVPN'in audit portföyü de güçlü ama sıklık açısından NordVPN önde.",
    },
    {
      name: "Hız performansı",
      winner: "tie",
      aDetail:
        "Lightway protokolü — %90-95 yakın, %75-82 uzak; en hızlı bağlantı kurulumu",
      bDetail:
        "NordLynx (WireGuard) — %91-96 yakın, %72-80 uzak; en yüksek throughput",
      reasoning:
        "Lightway hızlı bağlantı kurulumunda, NordLynx ham throughput'ta önde. Pratikte fark günlük kullanımda hissedilmiyor. İkisi de sektörün üst dilimi.",
    },
    {
      name: "Streaming uyumluluğu",
      winner: "tie",
      aDetail:
        "Netflix US/UK/JP/TR/BR/DE, Disney+, BBC iPlayer, BluTV, Exxen — sektörün en stabili",
      bDetail:
        "Netflix US/UK/JP/TR, Disney+, BBC iPlayer, BluTV, Exxen — stabil",
      reasoning:
        "ExpressVPN'in MediaStreamer DNS özelliği akıllı TV/konsolda VPN olmadan bölge bypass'ı sunuyor — önemli bir nüans. NordVPN bunu sunmuyor ama IP havuzu daha geniş.",
    },
    {
      name: "Fiyat (uzun dönem)",
      winner: "b",
      aDetail: "12 aylık + 3 ay ücretsiz: etkin ~$4.99/ay",
      bDetail: "2 yıllık plan: ~$3.39/ay",
      reasoning:
        "NordVPN, ExpressVPN'den %30-40 daha ucuz uzun dönem planlarında. ExpressVPN'in premium fiyatı, sunduğu ekstra özelliklerle (MediaStreamer, Lightway, müşteri desteği) gerekçelendiriliyor.",
    },
    {
      name: "Sahiplik şeffaflığı",
      winner: "b",
      aDetail: "Kape Technologies (PIA, CyberGhost ile aynı ana şirket)",
      bDetail: "Nord Security (Surfshark ile aynı ana şirket)",
      reasoning:
        "Her iki sahiplik yapısı da bazı eleştirmenlerce çıkar çatışması olarak değerlendiriliyor. NordVPN/Surfshark birleşmesi (Mart 2022) daha yeni; Kape'nin VPN sektöründeki yoğunlaşması (4+ büyük VPN) daha geniş. Hangisinin daha rahatsız ettiği kişisel değerlendirme.",
    },
  ],
  whyA: {
    title: "ExpressVPN'i seç eğer...",
    bullets: [
      "Premium fiyat kabul edilebilir; sürtünmesiz deneyim önemli",
      "Akıllı TV / konsol kullanıyorsun (MediaStreamer DNS için)",
      "Lightway protokolünün hızlı bağlantı kurulumunu istiyorsun",
      "2017 Türkiye olayı gibi gerçek dünya no-logs kanıtı senin için belirleyici",
      "Sürekli sık ülke değiştiriyorsan (seyahat)",
    ],
    cta: "ExpressVPN'i incele",
  },
  whyB: {
    title: "NordVPN'i seç eğer...",
    bullets: [
      "Bütçe önemli — NordVPN %30-40 daha ucuz",
      "Düzenli/tekrarlanan denetimler kritik (6x Deloitte)",
      "Threat Protection, Meshnet, Onion over VPN gibi ek özellikler değerli",
      "10 cihaz limiti yeterli",
      "Maksimum throughput (büyük dosya indirme, 4K streaming)",
    ],
    cta: "NordVPN'i incele",
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "ExpressVPN mi NordVPN mi daha iyi?",
      a: "Bütçe önemliyse ve denetim sürekliliği kritikse NordVPN. Premium deneyim, akıllı TV/konsol kullanımı veya kanıtlanmış no-logs senin için belirleyiciyse ExpressVPN. İkisi de sektörün üst dilimi.",
    },
    {
      q: "İki VPN'in hızı arasında ne kadar fark var?",
      a: "Gerçek dünya kullanımında çok küçük (%2-5 throughput farkı). ExpressVPN'in Lightway protokolü daha hızlı bağlantı kurar; NordVPN'in NordLynx'i daha yüksek pik throughput verir. Çoğu kullanıcı farkı hissetmez.",
    },
    {
      q: "İkisi de Türkiye'de çalışıyor mu?",
      a: "Evet, ikisi de Türkiye'den erişilebilir ve obfuscation özelliklerine sahip. Hiçbiri Türkiye sunucusu sunmuyor — Türkiye sunucusu için Surfshark.",
    },
    {
      q: "Kape Technologies vs Nord Security sahipliği — hangisi daha rahatsız edici?",
      a: "Kape, 2019'da PIA'yı, sonra CyberGhost'u, ExpressVPN'i ve birçok VPN inceleme sitesini satın aldı — yoğunlaşma daha geniş. Nord Security ise NordVPN + Surfshark'tan oluşuyor. Hangisinin daha endişe verici olduğu kişisel değerlendirme; tekniksel olarak ikisi de operasyonel bağımsızlığı koruduğunu söylüyor.",
    },
  ],
  related: {
    title: "Diğer sayfalar",
    links: [
      {
        href: "/karsilastir/nordvpn-vs-surfshark",
        text: "NordVPN vs Surfshark",
      },
      { href: "/inceleme/expressvpn", text: "ExpressVPN incelemesi" },
      { href: "/inceleme/nordvpn", text: "NordVPN incelemesi" },
      { href: "/en-iyi-vpn", text: "En iyi VPN 2026" },
    ],
  },
};

const en: ExpressvpnVsNordvpnContent = {
  metaTitle: "ExpressVPN vs NordVPN Comparison (2026)",
  metaDescription:
    "We compared ExpressVPN and NordVPN across 6 criteria: speed, audits, streaming, price and more. A side-by-side analysis of two premium giants.",
  breadcrumb: {
    home: "Home",
    hub: "Compare",
    current: "ExpressVPN vs NordVPN",
  },
  badge: "Side-by-side comparison",
  h1: "ExpressVPN vs NordVPN: 2026 Comparison",
  tagline:
    "Two premium giants compared side by side — a frictionless experience meets six-times-audited consistency.",
  ctaOfficial: {
    a: "Visit ExpressVPN",
    b: "Visit NordVPN",
  },
  categoriesH2: "Category-by-category highlights",
  categoriesIntro:
    'Each row indicates how a provider is positioned for that criterion — it does not crown a categorical "winner".',
  reasonLabel: "Why:",
  winnerTie: "Both are strong",
  winnerLeads: {
    a: "ExpressVPN leads on this criterion",
    b: "NordVPN leads on this criterion",
  },
  categories: [
    {
      name: "Privacy and jurisdiction",
      winner: "a",
      aDetail:
        "British Virgin Islands — outside 14 Eyes, no-logs proven in court (2017 Turkey incident)",
      bDetail: "Panama — outside 14 Eyes, no mandatory data retention",
      reasoning:
        "Both sit in strong jurisdictions. ExpressVPN being unable to disclose logs even when Turkish authorities seized a server in 2017 is one of the industry's strongest examples of real-world-proven no-logs.",
    },
    {
      name: "Independent audits",
      winner: "b",
      aDetail: "KPMG + Cure53 + PWC audits",
      bDetail:
        "Deloitte no-logs (6 times, most recent: 2025) + Cure53 client audits (3x)",
      reasoning:
        "NordVPN's six repeated Deloitte audits are the most comprehensive no-logs proof series the industry has achieved. ExpressVPN's audit portfolio is strong too, but NordVPN leads on frequency.",
    },
    {
      name: "Speed performance",
      winner: "tie",
      aDetail:
        "Lightway protocol — 90-95% nearby, 75-82% long-distance; fastest connection setup",
      bDetail:
        "NordLynx (WireGuard) — 91-96% nearby, 72-80% long-distance; highest throughput",
      reasoning:
        "Lightway leads on connection setup speed, NordLynx on raw throughput. In practice the difference isn't noticeable in daily use. Both are in the industry's top tier.",
    },
    {
      name: "Streaming compatibility",
      winner: "tie",
      aDetail:
        "Netflix US/UK/JP/TR/BR/DE, Disney+, BBC iPlayer, BluTV, Exxen — the most stable in the industry",
      bDetail:
        "Netflix US/UK/JP/TR, Disney+, BBC iPlayer, BluTV, Exxen — stable",
      reasoning:
        "ExpressVPN's MediaStreamer DNS feature offers region bypass on smart TVs/consoles without a VPN — an important nuance. NordVPN doesn't offer that, but its IP pool is larger.",
    },
    {
      name: "Price (long term)",
      winner: "b",
      aDetail: "12 months + 3 free: effectively ~$4.99/mo",
      bDetail: "2-year plan: ~$3.39/mo",
      reasoning:
        "NordVPN is 30-40% cheaper than ExpressVPN on long-term plans. ExpressVPN justifies its premium price with the extras it offers (MediaStreamer, Lightway, customer support).",
    },
    {
      name: "Ownership transparency",
      winner: "b",
      aDetail: "Kape Technologies (same parent company as PIA and CyberGhost)",
      bDetail: "Nord Security (same parent company as Surfshark)",
      reasoning:
        "Some critics see both ownership structures as a conflict of interest. The NordVPN/Surfshark merger (March 2022) is more recent; Kape's concentration in the VPN industry (4+ major VPNs) is broader. Which one bothers you more is a personal judgment.",
    },
  ],
  whyA: {
    title: "Choose ExpressVPN if...",
    bullets: [
      "A premium price is acceptable and a frictionless experience matters to you",
      "You use a smart TV / console (for MediaStreamer DNS)",
      "You want the Lightway protocol's fast connection setup",
      "Real-world no-logs proof like the 2017 Turkey incident is decisive for you",
      "You constantly switch countries (travel)",
    ],
    cta: "Read the ExpressVPN review",
  },
  whyB: {
    title: "Choose NordVPN if...",
    bullets: [
      "Budget matters — NordVPN is 30-40% cheaper",
      "Regular, repeated audits are critical (6x Deloitte)",
      "Extra features like Threat Protection, Meshnet and Onion over VPN are valuable to you",
      "A 10-device limit is enough",
      "You want maximum throughput (large downloads, 4K streaming)",
    ],
    cta: "Read the NordVPN review",
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Is ExpressVPN or NordVPN better?",
      a: "If budget matters and audit continuity is critical, NordVPN. If a premium experience, smart TV/console use or proven no-logs is decisive for you, ExpressVPN. Both are in the industry's top tier.",
    },
    {
      q: "How big is the speed difference between the two VPNs?",
      a: "Very small in real-world use (a 2-5% throughput difference). ExpressVPN's Lightway protocol connects faster; NordVPN's NordLynx delivers higher peak throughput. Most users won't feel the difference.",
    },
    {
      q: "Do both work in Turkey?",
      a: "Yes, both are accessible from Turkey and offer obfuscation features. Neither offers a Türkiye server — for a Türkiye server, see Surfshark.",
    },
    {
      q: "Kape Technologies vs Nord Security ownership — which is more concerning?",
      a: "Kape acquired PIA in 2019, then CyberGhost, ExpressVPN and several VPN review sites — its concentration is broader. Nord Security consists of NordVPN + Surfshark. Which is more concerning is a personal judgment; technically, both say they maintain operational independence.",
    },
  ],
  related: {
    title: "Other pages",
    links: [
      {
        href: "/comparison/nordvpn-vs-surfshark",
        text: "NordVPN vs Surfshark",
      },
      { href: "/inceleme/expressvpn", text: "ExpressVPN review" },
      { href: "/inceleme/nordvpn", text: "NordVPN review" },
      { href: "/en-iyi-vpn", text: "Best VPNs 2026" },
    ],
  },
};

const de: ExpressvpnVsNordvpnContent = {
  metaTitle: "ExpressVPN vs NordVPN im Vergleich (2026)",
  metaDescription:
    "Wir haben ExpressVPN und NordVPN anhand von 6 Kriterien verglichen: Geschwindigkeit, Audits, Streaming, Preis und mehr. Zwei Premium-Schwergewichte in der Direktanalyse.",
  breadcrumb: {
    home: "Startseite",
    hub: "Vergleich",
    current: "ExpressVPN vs NordVPN",
  },
  badge: "Direktvergleich",
  h1: "ExpressVPN vs NordVPN: Vergleich 2026",
  tagline:
    "Zwei Premium-Schwergewichte im Direktvergleich — reibungsloses Erlebnis trifft auf sechsfach auditierte Beständigkeit.",
  ctaOfficial: {
    a: "Zur ExpressVPN-Website",
    b: "Zur NordVPN-Website",
  },
  categoriesH2: "Highlights nach Kategorien",
  categoriesIntro:
    'Das Label in jeder Zeile zeigt, wie ein Anbieter bei diesem Kriterium positioniert ist — es kürt keinen kategorischen "Sieger".',
  reasonLabel: "Warum:",
  winnerTie: "Beide sind stark",
  winnerLeads: {
    a: "ExpressVPN liegt bei diesem Kriterium vorn",
    b: "NordVPN liegt bei diesem Kriterium vorn",
  },
  categories: [
    {
      name: "Datenschutz und Gerichtsbarkeit",
      winner: "a",
      aDetail:
        "Britische Jungferninseln — außerhalb der 14 Eyes, No-Logs vor Gericht bewiesen (Türkei-Vorfall 2017)",
      bDetail:
        "Panama — außerhalb der 14 Eyes, keine Vorratsdatenspeicherung",
      reasoning:
        "Beide sitzen in starken Gerichtsbarkeiten. Dass ExpressVPN 2017 trotz Server-Beschlagnahmung durch türkische Behörden keine Logs offenlegen konnte, ist eines der stärksten Beispiele der Branche für in der Praxis bewiesenes No-Logs.",
    },
    {
      name: "Unabhängige Audits",
      winner: "b",
      aDetail: "KPMG- + Cure53- + PWC-Audits",
      bDetail:
        "Deloitte-No-Logs-Audit (6-mal, zuletzt: 2025) + Cure53-Client-Audits (3x)",
      reasoning:
        "NordVPNs sechs wiederholte Deloitte-Audits sind die umfassendste No-Logs-Nachweisserie, die die Branche erreicht hat. ExpressVPNs Audit-Portfolio ist ebenfalls stark, aber bei der Häufigkeit liegt NordVPN vorn.",
    },
    {
      name: "Geschwindigkeit",
      winner: "tie",
      aDetail:
        "Lightway-Protokoll — 90-95 % nah, 75-82 % fern; schnellster Verbindungsaufbau",
      bDetail:
        "NordLynx (WireGuard) — 91-96 % nah, 72-80 % fern; höchster Durchsatz",
      reasoning:
        "Lightway liegt beim Verbindungsaufbau vorn, NordLynx beim reinen Durchsatz. In der Praxis ist der Unterschied im Alltag nicht spürbar. Beide gehören zur Spitzengruppe der Branche.",
    },
    {
      name: "Streaming-Kompatibilität",
      winner: "tie",
      aDetail:
        "Netflix US/UK/JP/TR/BR/DE, Disney+, BBC iPlayer, BluTV, Exxen — das stabilste der Branche",
      bDetail:
        "Netflix US/UK/JP/TR, Disney+, BBC iPlayer, BluTV, Exxen — stabil",
      reasoning:
        "ExpressVPNs MediaStreamer-DNS-Funktion bietet Regions-Bypass auf Smart-TVs/Konsolen ganz ohne VPN — eine wichtige Nuance. NordVPN bietet das nicht, hat aber den größeren IP-Pool.",
    },
    {
      name: "Preis (langfristig)",
      winner: "b",
      aDetail: "12 Monate + 3 gratis: effektiv ~$4.99/Monat",
      bDetail: "2-Jahres-Plan: ~$3.39/Monat",
      reasoning:
        "NordVPN ist bei langfristigen Tarifen 30-40 % günstiger als ExpressVPN. ExpressVPN rechtfertigt seinen Premium-Preis mit den gebotenen Extras (MediaStreamer, Lightway, Kundensupport).",
    },
    {
      name: "Transparenz der Eigentümerstruktur",
      winner: "b",
      aDetail:
        "Kape Technologies (gleiche Muttergesellschaft wie PIA, CyberGhost)",
      bDetail: "Nord Security (gleiche Muttergesellschaft wie Surfshark)",
      reasoning:
        "Manche Kritiker werten beide Eigentümerstrukturen als Interessenkonflikt. Die NordVPN/Surfshark-Fusion (März 2022) ist jünger; Kapes Konzentration im VPN-Sektor (4+ große VPNs) ist breiter. Was dich mehr stört, ist eine persönliche Einschätzung.",
    },
  ],
  whyA: {
    title: "Wähle ExpressVPN, wenn...",
    bullets: [
      "ein Premium-Preis okay ist und dir ein reibungsloses Erlebnis wichtig ist",
      "du Smart-TV / Konsole nutzt (wegen MediaStreamer DNS)",
      "du den schnellen Verbindungsaufbau des Lightway-Protokolls willst",
      "Praxisbeweise für No-Logs wie der Türkei-Vorfall 2017 für dich entscheidend sind",
      "du ständig das Land wechselst (Reisen)",
    ],
    cta: "Zum ExpressVPN-Test",
  },
  whyB: {
    title: "Wähle NordVPN, wenn...",
    bullets: [
      "das Budget zählt — NordVPN ist 30-40 % günstiger",
      "regelmäßige, wiederholte Audits entscheidend sind (6x Deloitte)",
      "Zusatzfunktionen wie Threat Protection, Meshnet und Onion over VPN wertvoll sind",
      "dir ein Limit von 10 Geräten reicht",
      "du maximalen Durchsatz willst (große Downloads, 4K-Streaming)",
    ],
    cta: "Zum NordVPN-Test",
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Ist ExpressVPN oder NordVPN besser?",
      a: "Wenn das Budget zählt und Audit-Kontinuität entscheidend ist: NordVPN. Wenn Premium-Erlebnis, Smart-TV/Konsolen-Nutzung oder bewiesenes No-Logs für dich ausschlaggebend sind: ExpressVPN. Beide gehören zur Spitzengruppe der Branche.",
    },
    {
      q: "Wie groß ist der Geschwindigkeitsunterschied zwischen den beiden VPNs?",
      a: "In der Praxis sehr klein (2-5 % Durchsatzunterschied). ExpressVPNs Lightway-Protokoll baut Verbindungen schneller auf; NordVPNs NordLynx liefert höheren Spitzendurchsatz. Die meisten Nutzer spüren den Unterschied nicht.",
    },
    {
      q: "Funktionieren beide in der Türkei?",
      a: "Ja, beide sind aus der Türkei erreichbar und bieten Obfuskations-Funktionen. Keines der beiden bietet einen Türkei-Server — für einen Türkei-Server: Surfshark.",
    },
    {
      q: "Kape Technologies vs. Nord Security — welche Eigentümerstruktur ist bedenklicher?",
      a: "Kape kaufte 2019 PIA, dann CyberGhost, ExpressVPN und mehrere VPN-Testseiten — die Konzentration ist breiter. Nord Security besteht aus NordVPN + Surfshark. Was bedenklicher ist, bleibt eine persönliche Einschätzung; technisch betonen beide ihre operative Unabhängigkeit.",
    },
  ],
  related: {
    title: "Weitere Seiten",
    links: [
      {
        href: "/vergleich/nordvpn-vs-surfshark",
        text: "NordVPN vs Surfshark",
      },
      { href: "/inceleme/expressvpn", text: "ExpressVPN im Test" },
      { href: "/inceleme/nordvpn", text: "NordVPN im Test" },
      { href: "/en-iyi-vpn", text: "Die besten VPNs 2026" },
    ],
  },
};

const CONTENT: Record<AppLocale, ExpressvpnVsNordvpnContent> = { tr, en, de };

export function getExpressvpnVsNordvpnContent(
  locale: string,
): ExpressvpnVsNordvpnContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
