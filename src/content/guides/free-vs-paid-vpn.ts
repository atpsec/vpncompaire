// "Ücretsiz vs Ücretli VPN" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/rehber/ucretsiz-vs-ucretli-vpn/page.tsx) bu modülden
// render eder; yerelleştirilmiş URL'ler (/rehber/ucretsiz-vs-ucretli-vpn,
// /en/guide/free-vs-paid-vpn, /de/ratgeber/kostenloses-vs-kostenpflichtiges-vpn)
// proxy rewrite ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

/** Karar matrisi hücresi: düz metin parçası veya iç link. */
export type MatrixPart = string | { href: string; label: string };

export type FreeVsPaidVpnContent = {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  lede: string;
  breadcrumb: { home: string; guides: string; current: string };
  verdict: { title: string; before: string; bold: string; after: string };
  howMoney: { h2: string; intro: string; cards: { title: string; desc: string }[] };
  protonException: {
    h2: string;
    intro: string;
    whyList: string[];
    limitsIntro: string;
    limitsList: string[];
  };
  whenPaid: { h2: string; cardTitle: string; items: string[] };
  pricing: { h2: string; intro: string; items: BoldItem[] };
  matrix: {
    h2: string;
    colScenario: string;
    colRecommendation: string;
    rows: { scenario: string; recommendation: MatrixPart[] }[];
  };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  relatedLabel: string;
  relatedLinks: { href: string; text: string }[];
};

const tr: FreeVsPaidVpnContent = {
  metaTitle: "Ücretsiz vs Ücretli VPN: Gerçekten Değiyor mu? (2026)",
  metaDescription:
    "Ücretsiz VPN'ler gerçekten ücretsiz mi? Gelir modelleri, riskler ve hangi durumlarda hangisini seçmen gerektiğine dair net rehber.",
  badge: "Karar rehberi",
  h1: "Ücretsiz vs Ücretli VPN: Gerçekten değiyor mu?",
  lede: "\u201cÜcretsiz\u201d her zaman bedava demek değil. Çoğu ücretsiz VPN'in gerçek maliyeti gizlilik. İstisnalar var ama nadir.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Ücretsiz vs Ücretli VPN",
  },
  verdict: {
    title: "Tek cümlede karar",
    before: "Ücretsiz VPN istiyorsan ",
    bold: "yalnızca Proton VPN",
    after:
      " kullan. Diğer ücretsiz seçenekler genelde verini satıyor veya güvenliğini risk altına atıyor.",
  },
  howMoney: {
    h2: "Ücretsiz VPN'ler nasıl para kazanıyor?",
    intro:
      "Bir VPN sağlayıcısının altyapı (sunucu, bant genişliği) maliyeti kullanıcı başına aylık $1-3 civarındadır. \u201cÜcretsiz\u201d sunan bir sağlayıcı bu maliyeti farklı bir yerden çıkarmak zorundadır. Tipik gelir modelleri:",
    cards: [
      {
        title: "Veri satışı",
        desc: "Hangi siteleri ziyaret ettiğin, ne aradığın, hangi uygulamaları kullandığın gibi davranış verilerin reklam verici şirketlere satılır. 2017 PureVPN — 2019 Hotspot Shield gibi örnekler var.",
      },
      {
        title: "Reklam enjeksiyonu",
        desc: "VPN sunucusu, ziyaret ettiğin siteye geçişte reklam ekler veya orijinal reklamı kendi reklamıyla değiştirir.",
      },
      {
        title: "Zararlı yazılım",
        desc: "Uygulamanın kendisi zararlı yazılım içerir. CSIRO 2016 araştırması: ücretsiz VPN uygulamalarının %38'i zararlı yazılım barındırıyor.",
      },
      {
        title: "Bant genişliği satışı",
        desc: "Senin cihazını başka kullanıcıların trafiğini taşıyan bir \u201cçıkış noktasına\u201d dönüştürür. Hola VPN 2015 olayı meşhur örnek.",
      },
    ],
  },
  protonException: {
    h2: "İstisna: Proton VPN'in ücretsiz planı",
    intro:
      "Tüm ücretsiz VPN'lere şüpheyle yaklaşmak doğru ama Proton VPN önemli bir istisna. Neden?",
    whyList: [
      "Aynı no-logs politikası ücretsiz ve ücretli planlar için geçerli.",
      "Aynı şifreleme ve teknik altyapı kullanılıyor.",
      "İstemciler açık kaynak; bağımsız olarak denetleniyor.",
      "Gelir modeli ücretli planlardan (Plus, Unlimited) — ücretsiz kullanıcılardan değil.",
      "İsviçre yargı yetkisi ve düzenli no-logs denetimleri.",
    ],
    limitsIntro: "Ücretsiz planın sınırlamaları:",
    limitsList: [
      "Yalnızca 3 ülke seçimi (Hollanda, ABD, Japonya)",
      "Düşük öncelik (yoğun saatlerde hız sınırlı)",
      "Streaming bypass çalışmıyor (kasıtlı)",
      "Birden fazla cihaz desteklenmiyor (tek cihaz)",
    ],
  },
  whenPaid: {
    h2: "Ücretli VPN'e ne zaman geçmeli?",
    cardTitle: "Ücretli VPN şart",
    items: [
      "Sürekli streaming için (Netflix US, BluTV, Disney+ vb.)",
      "Birden fazla cihazı (telefon + dizüstü + tablet + akıllı TV) korumak için",
      "İş veya hassas iletişim için",
      "Tutarlı yüksek hız ihtiyacı (4K streaming, oyun) için",
      "Türkiye sunucusu, port forwarding, multi-hop gibi gelişmiş özellikler için",
    ],
  },
  pricing: {
    h2: "Ücretli VPN ne kadar tutar?",
    intro: "2026'da gerçekçi aralıklar:",
    items: [
      {
        bold: "İlk dönem promosyonu (1-3 yıllık plan):",
        text: " ~$2-5/ay",
      },
      {
        bold: "Yenileme dönemi:",
        text: " ~$5-10/ay (yenileme tuzağına dikkat — otomatik yenilemeyi kapat)",
      },
      {
        bold: "Aylık plan:",
        text: " ~$10-15/ay (çok kötü değer; uzun dönem her zaman daha iyi)",
      },
      {
        bold: "İstisna: Mullvad",
        text: " — sabit €5/ay, indirim yok, yenileme tuzağı yok.",
      },
    ],
  },
  matrix: {
    h2: "Karar matrisi",
    colScenario: "Kullanım senaryon",
    colRecommendation: "Önerim",
    rows: [
      {
        scenario: "Tek seferlik, düşük riskli kullanım",
        recommendation: ["Proton VPN ücretsiz"],
      },
      {
        scenario: "Streaming + birden fazla cihaz",
        recommendation: [
          { href: "/inceleme/surfshark", label: "Surfshark" },
          " veya ",
          { href: "/inceleme/nordvpn", label: "NordVPN" },
        ],
      },
      {
        scenario: "Maksimum gizlilik + anonim",
        recommendation: [
          { href: "/inceleme/mullvad", label: "Mullvad" },
          " veya ",
          { href: "/inceleme/proton-vpn", label: "Proton VPN" },
        ],
      },
      {
        scenario: "Premium istikrar + kolay kullanım",
        recommendation: [{ href: "/inceleme/expressvpn", label: "ExpressVPN" }],
      },
      {
        scenario: "Teknik kontrol + port forwarding",
        recommendation: [{ href: "/inceleme/pia", label: "PIA" }],
      },
    ],
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Ücretsiz VPN'ler güvenli mi?",
      a: "Çoğu değil. Ücretsiz VPN sağlayıcılarının büyük bir kısmı, geliri kullanıcı verisi satışı, reklam enjeksiyonu veya zararlı yazılım dağıtımı üzerinden elde ediyor. Proton VPN'in ücretsiz planı önemli bir istisnadır.",
    },
    {
      q: "Proton VPN gerçekten ücretsiz mi?",
      a: "Evet — sınırsız veri, ücretsiz hesap. Veri satışı, reklam veya zararlı yazılım yok. Gelir modeli, ücretli planlar (Plus, Unlimited) üzerinden çalışıyor. Sınırlamalar: 3 ülke seçeneği ve düşük öncelik (yoğun saatlerde hız sınırlı).",
    },
    {
      q: "Ücretli VPN ne kadar tutar?",
      a: "İlk dönem fiyatları aylık ~$2-5 arasında. Yenileme dönemi $5-10 civarına yükselebilir. Mullvad sabit €5/ay sunar; promosyon yapmaz.",
    },
    {
      q: "Ücretsiz VPN ile streaming yapabilir miyim?",
      a: "Çoğu ücretsiz VPN'in streaming bypass'ı çalışmaz; Netflix, Disney+ gibi platformlar bu IP'leri proaktif olarak engeller. Proton VPN'in ücretsiz planı da streaming için optimize değil — kasıtlı tasarım.",
    },
    {
      q: "Hangi durumlarda ücretsiz VPN yeterli?",
      a: "Tek seferlik düşük riskli kullanım (örn. yurt dışında otel Wi-Fi'sinde e-posta kontrol etmek) için Proton VPN'in ücretsiz planı yeterli. Sürekli streaming, çoklu cihaz veya iş kullanımı için ücretli plan şart.",
    },
  ],
  relatedLabel: "İlgili rehberler",
  relatedLinks: [
    { href: "/rehber/vpn-nedir", text: "VPN nedir?" },
    {
      href: "/rehber/vpn-guvenlik-kontrol-listesi",
      text: "Güvenlik kontrol listesi",
    },
    { href: "/en-iyi-vpn", text: "En iyi 20 VPN" },
  ],
};

const en: FreeVsPaidVpnContent = {
  metaTitle: "Free vs Paid VPN: Is It Really Worth It? (2026)",
  metaDescription:
    "Are free VPNs really free? A clear guide to their revenue models, the risks, and which one to choose in which situation.",
  badge: "Decision guide",
  h1: "Free vs Paid VPN: Is it really worth it?",
  lede: "\u201cFree\u201d doesn't always mean free. For most free VPNs, the real price is your privacy. There are exceptions — but they're rare.",
  breadcrumb: {
    home: "Home",
    guides: "Guides",
    current: "Free vs Paid VPN",
  },
  verdict: {
    title: "The decision in one sentence",
    before: "If you want a free VPN, use ",
    bold: "Proton VPN and nothing else",
    after:
      ". The other free options typically sell your data or put your security at risk.",
  },
  howMoney: {
    h2: "How do free VPNs make money?",
    intro:
      "A VPN provider's infrastructure (servers, bandwidth) costs around $1-3 per user per month. A provider offering it \u201cfor free\u201d has to recover that cost somewhere else. The typical revenue models:",
    cards: [
      {
        title: "Selling your data",
        desc: "Behavioral data such as which sites you visit, what you search for and which apps you use is sold to advertising companies. PureVPN in 2017 and Hotspot Shield in 2019 are well-known examples.",
      },
      {
        title: "Ad injection",
        desc: "The VPN server inserts ads into the sites you visit as your traffic passes through, or replaces the original ads with its own.",
      },
      {
        title: "Malware",
        desc: "The app itself contains malware. A 2016 CSIRO study found that 38% of free VPN apps carry malware.",
      },
      {
        title: "Selling your bandwidth",
        desc: "Your device gets turned into an \u201cexit node\u201d carrying other users' traffic. The 2015 Hola VPN incident is the infamous example.",
      },
    ],
  },
  protonException: {
    h2: "The exception: Proton VPN's free plan",
    intro:
      "Being skeptical of all free VPNs is the right instinct, but Proton VPN is an important exception. Why?",
    whyList: [
      "The same no-logs policy applies to both the free and paid plans.",
      "The same encryption and technical infrastructure is used.",
      "The clients are open source and independently audited.",
      "The revenue model relies on paid plans (Plus, Unlimited) — not on free users.",
      "Swiss jurisdiction and regular no-logs audits.",
    ],
    limitsIntro: "The free plan's limitations:",
    limitsList: [
      "Only 3 country options (Netherlands, US, Japan)",
      "Low priority (speed is limited at peak times)",
      "Streaming bypass doesn't work (by design)",
      "No multi-device support (one device only)",
    ],
  },
  whenPaid: {
    h2: "When should you switch to a paid VPN?",
    cardTitle: "A paid VPN is a must",
    items: [
      "For regular streaming (Netflix US, BluTV, Disney+ etc.)",
      "To protect multiple devices (phone + laptop + tablet + smart TV)",
      "For work or sensitive communication",
      "When you need consistently high speeds (4K streaming, gaming)",
      "For advanced features like a Türkiye server, port forwarding or multi-hop",
    ],
  },
  pricing: {
    h2: "How much does a paid VPN cost?",
    intro: "Realistic ranges in 2026:",
    items: [
      {
        bold: "Intro promo (1-3 year plan):",
        text: " ~$2-5/mo",
      },
      {
        bold: "Renewal period:",
        text: " ~$5-10/mo (watch out for the renewal trap — turn off auto-renewal)",
      },
      {
        bold: "Monthly plan:",
        text: " ~$10-15/mo (very poor value; long-term is always better)",
      },
      {
        bold: "The exception: Mullvad",
        text: " — a flat €5/mo, no discounts, no renewal trap.",
      },
    ],
  },
  matrix: {
    h2: "Decision matrix",
    colScenario: "Your use case",
    colRecommendation: "Our recommendation",
    rows: [
      {
        scenario: "One-off, low-risk use",
        recommendation: ["Proton VPN free"],
      },
      {
        scenario: "Streaming + multiple devices",
        recommendation: [
          { href: "/inceleme/surfshark", label: "Surfshark" },
          " or ",
          { href: "/inceleme/nordvpn", label: "NordVPN" },
        ],
      },
      {
        scenario: "Maximum privacy + anonymity",
        recommendation: [
          { href: "/inceleme/mullvad", label: "Mullvad" },
          " or ",
          { href: "/inceleme/proton-vpn", label: "Proton VPN" },
        ],
      },
      {
        scenario: "Premium reliability + ease of use",
        recommendation: [{ href: "/inceleme/expressvpn", label: "ExpressVPN" }],
      },
      {
        scenario: "Technical control + port forwarding",
        recommendation: [{ href: "/inceleme/pia", label: "PIA" }],
      },
    ],
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Are free VPNs safe?",
      a: "Most aren't. A large share of free VPN providers earn their revenue by selling user data, injecting ads or distributing malware. Proton VPN's free plan is a notable exception.",
    },
    {
      q: "Is Proton VPN really free?",
      a: "Yes — unlimited data on a free account. No data selling, no ads, no malware. The revenue model runs on the paid plans (Plus, Unlimited). The limitations: 3 country options and low priority (speed is limited at peak times).",
    },
    {
      q: "How much does a paid VPN cost?",
      a: "Intro prices run around $2-5 per month. At renewal that can rise to roughly $5-10. Mullvad charges a flat €5/mo and never runs promotions.",
    },
    {
      q: "Can I stream with a free VPN?",
      a: "Most free VPNs' streaming bypass doesn't work; platforms like Netflix and Disney+ proactively block those IPs. Proton VPN's free plan isn't optimized for streaming either — by design.",
    },
    {
      q: "When is a free VPN enough?",
      a: "For one-off, low-risk use (e.g. checking email on hotel Wi-Fi abroad), Proton VPN's free plan is enough. For regular streaming, multiple devices or work use, a paid plan is a must.",
    },
  ],
  relatedLabel: "Related guides",
  relatedLinks: [
    { href: "/guide/what-is-a-vpn", text: "What is a VPN?" },
    {
      href: "/guide/vpn-security-checklist",
      text: "Security checklist",
    },
    { href: "/en-iyi-vpn", text: "Top 20 VPNs" },
  ],
};

const de: FreeVsPaidVpnContent = {
  metaTitle: "Kostenloses vs. kostenpflichtiges VPN: Lohnt es sich wirklich? (2026)",
  metaDescription:
    "Sind kostenlose VPNs wirklich kostenlos? Ein klarer Ratgeber zu Geschäftsmodellen, Risiken und der Frage, wann du welches wählen solltest.",
  badge: "Entscheidungshilfe",
  h1: "Kostenloses vs. kostenpflichtiges VPN: Lohnt es sich wirklich?",
  lede: "\u201eKostenlos\u201c heißt nicht immer gratis. Bei den meisten kostenlosen VPNs ist der wahre Preis deine Privatsphäre. Es gibt Ausnahmen — aber sie sind selten.",
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "Kostenloses vs. kostenpflichtiges VPN",
  },
  verdict: {
    title: "Die Entscheidung in einem Satz",
    before: "Wenn du ein kostenloses VPN willst, nutze ",
    bold: "ausschließlich Proton VPN",
    after:
      ". Andere kostenlose Optionen verkaufen in der Regel deine Daten oder gefährden deine Sicherheit.",
  },
  howMoney: {
    h2: "Wie verdienen kostenlose VPNs Geld?",
    intro:
      "Die Infrastruktur eines VPN-Anbieters (Server, Bandbreite) kostet pro Nutzer etwa $1-3 im Monat. Ein Anbieter, der \u201ekostenlos\u201c anbietet, muss diese Kosten woanders hereinholen. Die typischen Geschäftsmodelle:",
    cards: [
      {
        title: "Datenverkauf",
        desc: "Verhaltensdaten wie besuchte Seiten, Suchanfragen und genutzte Apps werden an Werbefirmen verkauft. PureVPN 2017 und Hotspot Shield 2019 sind bekannte Beispiele.",
      },
      {
        title: "Werbe-Injektion",
        desc: "Der VPN-Server fügt beim Durchleiten Werbung in die besuchte Seite ein oder ersetzt die Original-Werbung durch eigene.",
      },
      {
        title: "Schadsoftware",
        desc: "Die App selbst enthält Malware. Eine CSIRO-Studie von 2016 ergab: 38 % der kostenlosen VPN-Apps enthalten Schadsoftware.",
      },
      {
        title: "Bandbreitenverkauf",
        desc: "Dein Gerät wird zu einem \u201eExit-Knoten\u201c, der den Datenverkehr anderer Nutzer transportiert. Der Hola-VPN-Vorfall von 2015 ist das berüchtigte Beispiel.",
      },
    ],
  },
  protonException: {
    h2: "Die Ausnahme: der kostenlose Tarif von Proton VPN",
    intro:
      "Allen kostenlosen VPNs gegenüber skeptisch zu sein ist richtig — aber Proton VPN ist eine wichtige Ausnahme. Warum?",
    whyList: [
      "Dieselbe No-Logs-Richtlinie gilt für den kostenlosen und die bezahlten Tarife.",
      "Es kommen dieselbe Verschlüsselung und dieselbe technische Infrastruktur zum Einsatz.",
      "Die Clients sind Open Source und werden unabhängig geprüft.",
      "Das Geschäftsmodell basiert auf den Bezahltarifen (Plus, Unlimited) — nicht auf den Gratis-Nutzern.",
      "Schweizer Gerichtsbarkeit und regelmäßige No-Logs-Audits.",
    ],
    limitsIntro: "Die Einschränkungen des kostenlosen Tarifs:",
    limitsList: [
      "Nur 3 Länder zur Auswahl (Niederlande, USA, Japan)",
      "Niedrige Priorität (zu Stoßzeiten begrenzte Geschwindigkeit)",
      "Streaming-Bypass funktioniert nicht (absichtlich)",
      "Keine Unterstützung mehrerer Geräte (nur ein Gerät)",
    ],
  },
  whenPaid: {
    h2: "Wann solltest du zu einem kostenpflichtigen VPN wechseln?",
    cardTitle: "Kostenpflichtiges VPN ist Pflicht",
    items: [
      "Für regelmäßiges Streaming (Netflix US, BluTV, Disney+ usw.)",
      "Um mehrere Geräte zu schützen (Handy + Laptop + Tablet + Smart-TV)",
      "Für die Arbeit oder sensible Kommunikation",
      "Wenn du konstant hohe Geschwindigkeit brauchst (4K-Streaming, Gaming)",
      "Für erweiterte Funktionen wie Türkei-Server, Port-Forwarding oder Multi-Hop",
    ],
  },
  pricing: {
    h2: "Was kostet ein kostenpflichtiges VPN?",
    intro: "Realistische Spannen 2026:",
    items: [
      {
        bold: "Einstiegsangebot (1-3-Jahres-Plan):",
        text: " ~$2-5/Monat",
      },
      {
        bold: "Verlängerungszeitraum:",
        text: " ~$5-10/Monat (Vorsicht vor der Verlängerungsfalle — automatische Verlängerung abschalten)",
      },
      {
        bold: "Monatsplan:",
        text: " ~$10-15/Monat (sehr schlechtes Preis-Leistungs-Verhältnis; langfristig ist immer besser)",
      },
      {
        bold: "Die Ausnahme: Mullvad",
        text: " — fix €5/Monat, keine Rabatte, keine Verlängerungsfalle.",
      },
    ],
  },
  matrix: {
    h2: "Entscheidungsmatrix",
    colScenario: "Dein Szenario",
    colRecommendation: "Unsere Empfehlung",
    rows: [
      {
        scenario: "Einmalige Nutzung mit geringem Risiko",
        recommendation: ["Proton VPN kostenlos"],
      },
      {
        scenario: "Streaming + mehrere Geräte",
        recommendation: [
          { href: "/inceleme/surfshark", label: "Surfshark" },
          " oder ",
          { href: "/inceleme/nordvpn", label: "NordVPN" },
        ],
      },
      {
        scenario: "Maximaler Datenschutz + Anonymität",
        recommendation: [
          { href: "/inceleme/mullvad", label: "Mullvad" },
          " oder ",
          { href: "/inceleme/proton-vpn", label: "Proton VPN" },
        ],
      },
      {
        scenario: "Premium-Stabilität + einfache Bedienung",
        recommendation: [{ href: "/inceleme/expressvpn", label: "ExpressVPN" }],
      },
      {
        scenario: "Technische Kontrolle + Port-Forwarding",
        recommendation: [{ href: "/inceleme/pia", label: "PIA" }],
      },
    ],
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Sind kostenlose VPNs sicher?",
      a: "Die meisten nicht. Ein Großteil der kostenlosen VPN-Anbieter verdient sein Geld mit dem Verkauf von Nutzerdaten, Werbe-Injektion oder der Verbreitung von Schadsoftware. Der kostenlose Tarif von Proton VPN ist eine wichtige Ausnahme.",
    },
    {
      q: "Ist Proton VPN wirklich kostenlos?",
      a: "Ja — unbegrenztes Datenvolumen mit kostenlosem Konto. Kein Datenverkauf, keine Werbung, keine Malware. Das Geschäftsmodell läuft über die Bezahltarife (Plus, Unlimited). Die Einschränkungen: 3 Länder zur Auswahl und niedrige Priorität (zu Stoßzeiten begrenzte Geschwindigkeit).",
    },
    {
      q: "Was kostet ein kostenpflichtiges VPN?",
      a: "Die Einstiegspreise liegen bei etwa $2-5 pro Monat. Bei der Verlängerung kann der Preis auf rund $5-10 steigen. Mullvad verlangt fix €5/Monat und macht keine Aktionen.",
    },
    {
      q: "Kann ich mit einem kostenlosen VPN streamen?",
      a: "Bei den meisten kostenlosen VPNs funktioniert der Streaming-Bypass nicht; Plattformen wie Netflix und Disney+ sperren diese IPs proaktiv. Auch der kostenlose Tarif von Proton VPN ist nicht fürs Streaming optimiert — mit Absicht.",
    },
    {
      q: "Wann reicht ein kostenloses VPN?",
      a: "Für einmalige Nutzung mit geringem Risiko (z. B. im Ausland im Hotel-WLAN E-Mails checken) reicht der kostenlose Tarif von Proton VPN. Für regelmäßiges Streaming, mehrere Geräte oder die Arbeit ist ein Bezahltarif Pflicht.",
    },
  ],
  relatedLabel: "Verwandte Ratgeber",
  relatedLinks: [
    { href: "/ratgeber/was-ist-ein-vpn", text: "Was ist ein VPN?" },
    {
      href: "/ratgeber/vpn-sicherheits-checkliste",
      text: "Sicherheits-Checkliste",
    },
    { href: "/en-iyi-vpn", text: "Top-20-VPNs" },
  ],
};

const CONTENT: Record<AppLocale, FreeVsPaidVpnContent> = { tr, en, de };

export function getFreeVsPaidVpnContent(locale: string): FreeVsPaidVpnContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
