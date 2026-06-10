// "Öğrenciler için VPN" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/rehber/ogrenciler-icin-vpn/page.tsx) bu modülden
// render eder; yerelleştirilmiş URL'ler (/rehber/ogrenciler-icin-vpn,
// /en/guide/vpn-for-students, /de/ratgeber/vpn-fuer-studenten) proxy rewrite
// ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

type PickContent = { slug: string; label: string; reason: string };

export type VpnForStudentsContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  badge: string;
  h1: string;
  lede: string;
  breadcrumb: { home: string; guides: string; current: string };
  howToName: string;
  picksHeading: string;
  picksSubheading: string;
  picks: [PickContent, PickContent, PickContent];
  whyNeed: { h2: string; p: string };
  scenarios: { h3: string; items: BoldItem[] };
  pricing: { h2: string; head: string[]; rows: string[][] };
  academic: { h2: string; p1: BoldItem; p2: BoldItem };
  abroad: { h2: string; intro: string; items: BoldItem[] };
  stepsHeading: string;
  howToSteps: { name: string; text: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cards: { title: string; desc: string }[];
  relatedLabel: string;
  relatedLinks: { href: string; text: string }[];
};

const tr: VpnForStudentsContent = {
  metaTitle:
    "Öğrenciler İçin En İyi VPN (2026) — Kampüs, JSTOR ve İndirim Rehberi",
  metaDescription:
    "Öğrenciler için VPN seçimi: kampüs Wi-Fi güvenliği, akademik veritabanı erişimi (JSTOR, ScienceDirect), öğrenci indirimleri ve bütçeye uygun en iyi 3 VPN.",
  keywords: [
    "öğrenci vpn",
    "ucuz vpn",
    "öğrenci indirimi vpn",
    "kampüs wifi güvenliği",
    "jstor erişim vpn",
    "akademik veritabanı vpn",
  ],
  ogTitle: "Öğrenciler İçin En İyi VPN (2026)",
  ogDescription:
    "Kampüs Wi-Fi, akademik veritabanı erişimi ve öğrenci indirimleri için en iyi VPN önerileri.",
  badge: "Öğrenciler",
  h1: "Öğrenciler için en iyi VPN",
  lede: "Kampüs Wi-Fi güvenliği, yurt dışı staj/değişim, akademik kaynak erişimi ve öğrenci bütçesine uygun en iyi 3 VPN — bağımsız test sonuçlarımıza dayalı.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Öğrenciler için VPN",
  },
  howToName: "Öğrenci olarak VPN nasıl seçilir?",
  picksHeading: "Öğrenciler için en iyi 3 VPN",
  picksSubheading: "Fiyat, çoklu cihaz desteği ve denetim geçmişine göre.",
  picks: [
    {
      slug: "surfshark",
      label: "Bütçe odaklı seçenek",
      reason:
        "Sağlayıcı politikasına göre sınırsız eşzamanlı cihaz desteği ile tek hesap birden fazla kullanıcıyı kapsayabilir. Sağlayıcının uzun dönem plan fiyatı öğrenci bütçesine uygun bir seçenek olarak değerlendirilebilir.",
    },
    {
      slug: "nordvpn",
      label: "Türkiye sunucusu + hız",
      reason:
        "Sağlayıcı verisine göre Türkiye sunucusu mevcut; Erasmus/değişimde Türk bankacılığı ve BluTV erişimi için değerlendirilebilir. Testlerimizde kampüs Wi-Fi koşullarında tutarlı hız gözlendi.",
    },
    {
      slug: "proton-vpn",
      label: "Ücretsiz plan seçeneği",
      reason:
        "Sağlayıcı politikasına göre ücretsiz plan veri satmaz ve açık kaynak istemci sunar. Hafif kullanım için değerlendirilebilir; satın alma öncesi sağlayıcının resmi koşullarını kontrol etmen önerilir.",
    },
  ],
  whyNeed: {
    h2: "Öğrenci olarak neden VPN'e ihtiyacın var?",
    p: "Üniversite hayatı, gizlilik açısından özellikle riskli bir dönemdir. Yurt, kampüs ve kütüphane Wi-Fi ağları açık veya zayıf şifrelidir; aynı ağdaki diğer kullanıcılar trafiği pasif olarak dinleyebilir. 2025 EDUCAUSE araştırmasına göre kampüs ağlarında yapılan ortalama siber saldırı sayısı, kurumsal ağlara göre %38 daha yüksek.",
  },
  scenarios: {
    h3: "Tipik öğrenci senaryoları",
    items: [
      {
        bold: "Kütüphanede ödev yaparken:",
        text: " Google Drive, e-posta, banka hesabı login bilgileri açık Wi-Fi'de risk altında.",
      },
      {
        bold: "Yurtta torrent indirirken:",
        text: " Üniversite ağ yöneticisi IP üzerinden takip edebilir; bazı üniversitelerde uyarı/disiplin cezası riskine yol açar.",
      },
      {
        bold: "Yurt dışı staj/Erasmus:",
        text: " Türkiye'deki banka, BluTV, Exxen, TRT erişimi için Türkiye sunucusu şart.",
      },
      {
        bold: "VPN engellenen ağlarda:",
        text: " Bazı kampüs ağları belli siteleri engeller — VPN bu kısıtlamaları aşmana yardımcı olur.",
      },
    ],
  },
  pricing: {
    h2: "Öğrenci bütçesine en uygun fiyatlandırma",
    head: ["VPN", "İlk dönem aylık", "Cihaz", "Türkiye sunucusu"],
    rows: [
      ["Surfshark (2 yıl)", "$2.19", "Sınırsız", "✓"],
      ["NordVPN (2 yıl + 3 ay)", "$3.39", "10", "✓"],
      ["Proton VPN ücretsiz", "$0", "1", "✗"],
    ],
  },
  academic: {
    h2: "Akademik veritabanlarına erişim — ne yapar, ne yapmaz?",
    p1: {
      bold: "VPN yapamaz:",
      text: " JSTOR, ScienceDirect, IEEE Xplore gibi ücretli veritabanlarına ücretsiz erişim sağlamaz. Bunlar üniversitenin abonelik IP'leri üzerinden çalışır.",
    },
    p2: {
      bold: "VPN yapar:",
      text: ' Üniversitenin sunduğu kurumsal VPN\'e (genelde "OpenVPN" veya "Pulse Secure") bağlanırsan kampüs IP\'si gibi davranır ve erişim açılır. Ticari VPN ise hızlı, güvenli ama akademik abonelik yerine geçmez.',
    },
  },
  abroad: {
    h2: "Yurt dışı değişim/staj programı senaryosu",
    intro: "Erasmus, Mevlana veya benzeri bir programda yurt dışındaysan:",
    items: [
      {
        bold: "Türk bankacılığı:",
        text: " Bazı bankalar yabancı IP'den giriş izin vermez. Türkiye sunucusu olan bir VPN şart.",
      },
      {
        bold: "BluTV, Exxen, TRT:",
        text: " Coğrafi kısıtlı — Türkiye sunucusundan bağlanırsan erişim açılır.",
      },
      {
        bold: "WhatsApp/Telegram engeli:",
        text: " Bazı ülkelerde (Çin, BAE) engelliyse VPN ile bypass yapabilirsin.",
      },
    ],
  },
  stepsHeading: "Yapılması gereken adımlar",
  howToSteps: [
    {
      name: "Bütçeni belirle",
      text: "Aylık 50 TL altı için 2-3 yıllık plan al; aylık plan öğrenci bütçesi için çok pahalı.",
    },
    {
      name: "Cihaz sayını say",
      text: "Telefon + dizüstü + tablet en az 3 cihaz demek. Surfshark sınırsız, NordVPN 10 cihaz destekler.",
    },
    {
      name: "Yurt dışına gidecek misin kontrol et",
      text: "Erasmus, staj, değişim programında Türkiye sunucusu şart. NordVPN ve Surfshark sunuyor.",
    },
    {
      name: "Otomatik yenilemeyi kapat",
      text: "Yenileme dönemi fiyatı 2-3 katına çıkıyor. İlk dönem bitince elle yenile veya başka sağlayıcıya geç.",
    },
  ],
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Öğrencilere özel VPN indirimi var mı?",
      a: "Doğrudan öğrenci indirimi nadirdir. Bunun yerine 2-3 yıllık planlar en uygun fiyatı sunar — Surfshark $2.19/ay (2 yıl) ve NordVPN $3.39/ay (2 yıl + 3 ay) öğrenci bütçesine en uygun seçenekler. Yenileme döneminde fiyat yükseldiği için otomatik yenilemeyi kapatmak önemli.",
    },
    {
      q: "VPN ile JSTOR ve ScienceDirect'e erişebilir miyim?",
      a: "Hayır, ücretli akademik veritabanları üniversite IP'leri üzerinden çalışır. VPN üniversite ağına bağlanmak için kullanılabilir (üniversitenizin sunduğu kurumsal VPN), ama ticari bir VPN size üniversitenin abonelik haklarını vermez.",
    },
    {
      q: "Kampüs Wi-Fi'de VPN kullanmam gerekir mi?",
      a: "Evet. Kampüs ve yurt ağları açık veya zayıf şifrelidir; aynı ağdaki diğer kullanıcılar trafiğinizi pasif olarak dinleyebilir. VPN, login bilgilerinizi ve gezinti geçmişinizi şifreler.",
    },
    {
      q: "Ücretsiz VPN öğrenci için yeterli mi?",
      a: "Çoğu ücretsiz VPN gelirini veri satışından sağlar — öğrenci kimliği gibi hassas bilgilerinizin ele geçirildiği ağlarda bu risk artar. Proton VPN'in ücretsiz planı istisnadır; sınırlı (3 ülke, tek cihaz) ama güvenlidir.",
    },
    {
      q: "Yurt dışı staj/değişim programında VPN gerekli mi?",
      a: "Evet — Türkiye'deki bankacılık, TRT, BluTV gibi servislere yurt dışından erişmek için Türkiye sunucusu olan bir VPN şart. NordVPN, Surfshark ve ExpressVPN Türkiye sanal sunucusu sunar.",
    },
  ],
  cards: [
    { title: "Kampüs Wi-Fi", desc: "Açık ağda login bilgilerini şifrele." },
    {
      title: "Yurt dışı erişim",
      desc: "Erasmus'ta Türkiye bankacılığı ve BluTV.",
    },
    { title: "Kişisel veri", desc: "ISP tarama geçmişini görmesin." },
  ],
  relatedLabel: "İlgili rehberler",
  relatedLinks: [
    { href: "/rehber/vpn-nedir", text: "VPN nedir?" },
    { href: "/rehber/ucretsiz-vs-ucretli-vpn", text: "Ücretsiz vs Ücretli" },
    { href: "/sana-uygun-vpn", text: "Quiz: Sana uygun VPN" },
  ],
};

const en: VpnForStudentsContent = {
  metaTitle: "Best VPN for Students (2026) — Campus, JSTOR & Discount Guide",
  metaDescription:
    "Choosing a VPN as a student: campus Wi-Fi security, academic database access (JSTOR, ScienceDirect), student discounts and the 3 best budget-friendly VPNs.",
  keywords: [
    "student vpn",
    "cheap vpn",
    "vpn student discount",
    "campus wifi security",
    "jstor access vpn",
    "academic database vpn",
  ],
  ogTitle: "Best VPN for Students (2026)",
  ogDescription:
    "The best VPN picks for campus Wi-Fi, academic database access and student discounts.",
  badge: "Students",
  h1: "The best VPN for students",
  lede: "Campus Wi-Fi security, internships and exchanges abroad, academic resource access and the 3 best VPNs for a student budget — based on our independent test results.",
  breadcrumb: { home: "Home", guides: "Guides", current: "VPN for students" },
  howToName: "How to choose a VPN as a student",
  picksHeading: "The 3 best VPNs for students",
  picksSubheading: "Based on price, multi-device support and audit history.",
  picks: [
    {
      slug: "surfshark",
      label: "Budget-focused option",
      reason:
        "According to the provider's policy, unlimited simultaneous device support means a single account can cover multiple users. The provider's long-term plan price can be considered a good fit for a student budget.",
    },
    {
      slug: "nordvpn",
      label: "Türkiye server + speed",
      reason:
        "According to provider data, a Türkiye server is available; worth considering for Turkish banking and BluTV access during Erasmus/exchange. In our tests we observed consistent speeds under campus Wi-Fi conditions.",
    },
    {
      slug: "proton-vpn",
      label: "Free plan option",
      reason:
        "According to the provider's policy, the free plan doesn't sell data and offers an open-source client. Worth considering for light use; we recommend checking the provider's official terms before buying.",
    },
  ],
  whyNeed: {
    h2: "Why do you need a VPN as a student?",
    p: "University life is a particularly risky period for privacy. Dorm, campus and library Wi-Fi networks are open or weakly encrypted; other users on the same network can passively monitor traffic. According to a 2025 EDUCAUSE study, the average number of cyberattacks on campus networks is 38% higher than on corporate networks.",
  },
  scenarios: {
    h3: "Typical student scenarios",
    items: [
      {
        bold: "Doing homework at the library:",
        text: " Google Drive, email and bank account login details are at risk on open Wi-Fi.",
      },
      {
        bold: "Torrenting in the dorm:",
        text: " The university network admin can track you by IP; at some universities this carries a risk of warnings or disciplinary action.",
      },
      {
        bold: "Internship/Erasmus abroad:",
        text: " A Türkiye server is a must for accessing banks in Türkiye, BluTV, Exxen and TRT.",
      },
      {
        bold: "On networks with blocks:",
        text: " Some campus networks block certain sites — a VPN helps you get around these restrictions.",
      },
    ],
  },
  pricing: {
    h2: "The best pricing for a student budget",
    head: ["VPN", "First-term monthly", "Devices", "Türkiye server"],
    rows: [
      ["Surfshark (2 years)", "$2.19", "Unlimited", "✓"],
      ["NordVPN (2 years + 3 months)", "$3.39", "10", "✓"],
      ["Proton VPN free", "$0", "1", "✗"],
    ],
  },
  academic: {
    h2: "Access to academic databases — what works, what doesn't?",
    p1: {
      bold: "A VPN can't:",
      text: " give you free access to paid databases like JSTOR, ScienceDirect or IEEE Xplore. These work through your university's subscription IPs.",
    },
    p2: {
      bold: "A VPN can:",
      text: ' If you connect to your university\'s institutional VPN (usually "OpenVPN" or "Pulse Secure"), you appear with a campus IP and access opens up. A commercial VPN is fast and secure, but it is no substitute for an academic subscription.',
    },
  },
  abroad: {
    h2: "The exchange/internship abroad scenario",
    intro: "If you're abroad on Erasmus, Mevlana or a similar program:",
    items: [
      {
        bold: "Turkish banking:",
        text: " Some banks don't allow logins from foreign IPs. A VPN with a Türkiye server is a must.",
      },
      {
        bold: "BluTV, Exxen, TRT:",
        text: " Geo-restricted — connect through a Türkiye server and access opens up.",
      },
      {
        bold: "WhatsApp/Telegram blocks:",
        text: " If they're blocked in some countries (China, UAE), you can bypass the block with a VPN.",
      },
    ],
  },
  stepsHeading: "Steps to take",
  howToSteps: [
    {
      name: "Set your budget",
      text: "For under 50 TL a month, get a 2-3 year plan; the monthly plan is far too expensive for a student budget.",
    },
    {
      name: "Count your devices",
      text: "Phone + laptop + tablet means at least 3 devices. Surfshark supports unlimited devices, NordVPN 10.",
    },
    {
      name: "Check whether you're going abroad",
      text: "On Erasmus, an internship or an exchange program a Türkiye server is a must. NordVPN and Surfshark offer one.",
    },
    {
      name: "Turn off auto-renewal",
      text: "The renewal price climbs to 2-3x. When the first term ends, renew manually or switch to another provider.",
    },
  ],
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Are there VPN discounts specifically for students?",
      a: "Direct student discounts are rare. Instead, 2-3 year plans offer the best price — Surfshark at $2.19/mo (2 years) and NordVPN at $3.39/mo (2 years + 3 months) are the best fits for a student budget. Since the price rises at renewal, turning off auto-renewal matters.",
    },
    {
      q: "Can I access JSTOR and ScienceDirect with a VPN?",
      a: "No — paid academic databases work through university IPs. A VPN can be used to connect to the university network (the institutional VPN your university provides), but a commercial VPN doesn't give you the university's subscription rights.",
    },
    {
      q: "Do I need to use a VPN on campus Wi-Fi?",
      a: "Yes. Campus and dorm networks are open or weakly encrypted; other users on the same network can passively monitor your traffic. A VPN encrypts your login details and browsing history.",
    },
    {
      q: "Is a free VPN enough for a student?",
      a: "Most free VPNs make their money by selling data — on networks where sensitive information like your student credentials can be intercepted, that risk grows. Proton VPN's free plan is the exception; it's limited (3 countries, one device) but safe.",
    },
    {
      q: "Do I need a VPN for an internship/exchange program abroad?",
      a: "Yes — to access services in Türkiye like banking, TRT and BluTV from abroad, a VPN with a Türkiye server is a must. NordVPN, Surfshark and ExpressVPN offer virtual Türkiye servers.",
    },
  ],
  cards: [
    {
      title: "Campus Wi-Fi",
      desc: "Encrypt your login details on open networks.",
    },
    {
      title: "Access from abroad",
      desc: "Turkish banking and BluTV on Erasmus.",
    },
    {
      title: "Personal data",
      desc: "Keep your ISP from seeing your browsing history.",
    },
  ],
  relatedLabel: "Related guides",
  relatedLinks: [
    { href: "/guide/what-is-a-vpn", text: "What is a VPN?" },
    { href: "/guide/free-vs-paid-vpn", text: "Free vs paid" },
    { href: "/sana-uygun-vpn", text: "Quiz: the right VPN for you" },
  ],
};

const de: VpnForStudentsContent = {
  metaTitle:
    "Das beste VPN für Studenten (2026) — Campus, JSTOR & Rabatt-Guide",
  metaDescription:
    "VPN-Wahl für Studenten: Campus-WLAN-Sicherheit, Zugriff auf akademische Datenbanken (JSTOR, ScienceDirect), Studentenrabatte und die 3 besten budgetfreundlichen VPNs.",
  keywords: [
    "studenten vpn",
    "günstiges vpn",
    "vpn studentenrabatt",
    "campus wlan sicherheit",
    "jstor zugriff vpn",
    "akademische datenbank vpn",
  ],
  ogTitle: "Das beste VPN für Studenten (2026)",
  ogDescription:
    "Die besten VPN-Empfehlungen für Campus-WLAN, akademische Datenbanken und Studentenrabatte.",
  badge: "Studenten",
  h1: "Das beste VPN für Studenten",
  lede: "Campus-WLAN-Sicherheit, Auslandspraktikum und Austausch, Zugriff auf akademische Quellen und die 3 besten VPNs fürs Studentenbudget — basierend auf unseren unabhängigen Testergebnissen.",
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "VPN für Studenten",
  },
  howToName: "Wie wählst du als Student ein VPN aus?",
  picksHeading: "Die 3 besten VPNs für Studenten",
  picksSubheading: "Nach Preis, Multi-Geräte-Support und Audit-Historie.",
  picks: [
    {
      slug: "surfshark",
      label: "Budget-Option",
      reason:
        "Laut Anbieterrichtlinie deckt ein einziges Konto dank unbegrenzter gleichzeitiger Geräte mehrere Nutzer ab. Der Langzeitplan-Preis des Anbieters kann als gute Option fürs Studentenbudget gelten.",
    },
    {
      slug: "nordvpn",
      label: "Türkei-Server + Tempo",
      reason:
        "Laut Anbieterdaten ist ein Türkei-Server verfügbar; für türkisches Banking und BluTV-Zugriff während Erasmus/Austausch eine Überlegung wert. In unseren Tests zeigte sich unter Campus-WLAN-Bedingungen konstantes Tempo.",
    },
    {
      slug: "proton-vpn",
      label: "Kostenloser Tarif",
      reason:
        "Laut Anbieterrichtlinie verkauft der kostenlose Tarif keine Daten und bietet einen Open-Source-Client. Für leichte Nutzung eine Überlegung wert; prüfe vor dem Kauf die offiziellen Bedingungen des Anbieters.",
    },
  ],
  whyNeed: {
    h2: "Warum brauchst du als Student ein VPN?",
    p: "Das Unileben ist in Sachen Privatsphäre eine besonders riskante Zeit. WLAN-Netze in Wohnheim, Campus und Bibliothek sind offen oder schwach verschlüsselt; andere Nutzer im selben Netz können den Datenverkehr passiv mitlesen. Laut einer EDUCAUSE-Studie von 2025 liegt die durchschnittliche Zahl der Cyberangriffe auf Campus-Netze um 38 % höher als bei Unternehmensnetzen.",
  },
  scenarios: {
    h3: "Typische Studenten-Szenarien",
    items: [
      {
        bold: "Hausarbeiten in der Bibliothek:",
        text: " Login-Daten für Google Drive, E-Mail und Bankkonto sind im offenen WLAN gefährdet.",
      },
      {
        bold: "Torrents im Wohnheim:",
        text: " Der Netzwerk-Admin der Uni kann dich über die IP verfolgen; an manchen Unis drohen Verwarnungen oder Disziplinarmaßnahmen.",
      },
      {
        bold: "Auslandspraktikum/Erasmus:",
        text: " Für den Zugriff auf Banken in der Türkei, BluTV, Exxen und TRT ist ein Türkei-Server Pflicht.",
      },
      {
        bold: "In Netzwerken mit Sperren:",
        text: " Manche Campus-Netze blockieren bestimmte Seiten — ein VPN hilft dir, diese Einschränkungen zu umgehen.",
      },
    ],
  },
  pricing: {
    h2: "Die besten Preise fürs Studentenbudget",
    head: ["VPN", "Erste Laufzeit, monatlich", "Geräte", "Türkei-Server"],
    rows: [
      ["Surfshark (2 Jahre)", "$2.19", "Unbegrenzt", "✓"],
      ["NordVPN (2 Jahre + 3 Monate)", "$3.39", "10", "✓"],
      ["Proton VPN kostenlos", "$0", "1", "✗"],
    ],
  },
  academic: {
    h2: "Zugriff auf akademische Datenbanken — was geht, was nicht?",
    p1: {
      bold: "Ein VPN kann nicht:",
      text: " dir kostenlosen Zugriff auf kostenpflichtige Datenbanken wie JSTOR, ScienceDirect oder IEEE Xplore verschaffen. Diese laufen über die Abo-IPs deiner Universität.",
    },
    p2: {
      bold: "Ein VPN kann:",
      text: " Wenn du dich mit dem institutionellen VPN deiner Uni verbindest (meist \u201eOpenVPN\u201c oder \u201ePulse Secure\u201c), trittst du mit einer Campus-IP auf und der Zugriff öffnet sich. Ein kommerzielles VPN ist schnell und sicher, ersetzt aber kein akademisches Abo.",
    },
  },
  abroad: {
    h2: "Das Szenario Auslandsaustausch/Praktikum",
    intro:
      "Wenn du mit Erasmus, Mevlana oder einem ähnlichen Programm im Ausland bist:",
    items: [
      {
        bold: "Türkisches Banking:",
        text: " Manche Banken erlauben keinen Login von ausländischen IPs. Ein VPN mit Türkei-Server ist Pflicht.",
      },
      {
        bold: "BluTV, Exxen, TRT:",
        text: " Geo-beschränkt — verbinde dich über einen Türkei-Server und der Zugriff öffnet sich.",
      },
      {
        bold: "WhatsApp/Telegram-Sperren:",
        text: " Sind sie in manchen Ländern (China, VAE) blockiert, kannst du die Sperre per VPN umgehen.",
      },
    ],
  },
  stepsHeading: "Diese Schritte solltest du gehen",
  howToSteps: [
    {
      name: "Lege dein Budget fest",
      text: "Für unter 50 TL im Monat nimm einen 2-3-Jahres-Plan; der Monatsplan ist fürs Studentenbudget viel zu teuer.",
    },
    {
      name: "Zähle deine Geräte",
      text: "Handy + Laptop + Tablet heißt mindestens 3 Geräte. Surfshark unterstützt unbegrenzt viele Geräte, NordVPN 10.",
    },
    {
      name: "Prüfe, ob du ins Ausland gehst",
      text: "Bei Erasmus, Praktikum oder Austauschprogramm ist ein Türkei-Server Pflicht. NordVPN und Surfshark bieten ihn an.",
    },
    {
      name: "Schalte die automatische Verlängerung aus",
      text: "Der Verlängerungspreis steigt auf das 2-3-Fache. Verlängere nach der ersten Laufzeit manuell oder wechsle zu einem anderen Anbieter.",
    },
  ],
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Gibt es spezielle VPN-Rabatte für Studenten?",
      a: "Direkte Studentenrabatte sind selten. Stattdessen bieten 2-3-Jahres-Pläne den besten Preis — Surfshark mit $2.19/Monat (2 Jahre) und NordVPN mit $3.39/Monat (2 Jahre + 3 Monate) passen am besten zum Studentenbudget. Da der Preis bei der Verlängerung steigt, ist das Abschalten der automatischen Verlängerung wichtig.",
    },
    {
      q: "Kann ich mit einem VPN auf JSTOR und ScienceDirect zugreifen?",
      a: "Nein, kostenpflichtige akademische Datenbanken laufen über Universitäts-IPs. Ein VPN kann genutzt werden, um dich mit dem Uni-Netz zu verbinden (das institutionelle VPN deiner Universität), aber ein kommerzielles VPN gibt dir nicht die Abo-Rechte der Universität.",
    },
    {
      q: "Brauche ich im Campus-WLAN ein VPN?",
      a: "Ja. Campus- und Wohnheimnetze sind offen oder schwach verschlüsselt; andere Nutzer im selben Netz können deinen Verkehr passiv mitlesen. Ein VPN verschlüsselt deine Login-Daten und deinen Browserverlauf.",
    },
    {
      q: "Reicht ein kostenloses VPN für Studenten?",
      a: "Die meisten kostenlosen VPNs verdienen ihr Geld mit Datenverkauf — in Netzen, in denen sensible Daten wie deine Studienzugänge abgegriffen werden können, steigt dieses Risiko. Der kostenlose Tarif von Proton VPN ist die Ausnahme; er ist begrenzt (3 Länder, ein Gerät), aber sicher.",
    },
    {
      q: "Brauche ich für Auslandspraktikum/Austausch ein VPN?",
      a: "Ja — um aus dem Ausland auf Dienste in der Türkei wie Banking, TRT und BluTV zuzugreifen, ist ein VPN mit Türkei-Server Pflicht. NordVPN, Surfshark und ExpressVPN bieten virtuelle Türkei-Server.",
    },
  ],
  cards: [
    {
      title: "Campus-WLAN",
      desc: "Verschlüssele deine Login-Daten im offenen Netz.",
    },
    {
      title: "Zugriff aus dem Ausland",
      desc: "Türkisches Banking und BluTV im Erasmus.",
    },
    {
      title: "Persönliche Daten",
      desc: "Dein ISP soll deinen Verlauf nicht sehen.",
    },
  ],
  relatedLabel: "Verwandte Ratgeber",
  relatedLinks: [
    { href: "/ratgeber/was-ist-ein-vpn", text: "Was ist ein VPN?" },
    {
      href: "/ratgeber/kostenloses-vs-kostenpflichtiges-vpn",
      text: "Kostenlos vs. kostenpflichtig",
    },
    { href: "/sana-uygun-vpn", text: "Quiz: Das passende VPN für dich" },
  ],
};

const CONTENT: Record<AppLocale, VpnForStudentsContent> = { tr, en, de };

export function getVpnForStudentsContent(
  locale: string,
): VpnForStudentsContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
