// "Aile ve çocuklar için VPN" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/guide/aile-ve-cocuklar-icin-vpn/page.tsx) bu
// modülden render eder; yerelleştirilmiş URL'ler (/guide/aile-ve-cocuklar-icin-vpn,
// /en/guide/vpn-for-families, /de/ratgeber/vpn-fuer-familien) proxy rewrite
// ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

type PickContent = { slug: string; label: string; reason: string };

export type VpnForFamiliesContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  badge: string;
  h1: string;
  lede: string;
  breadcrumb: { home: string; guides: string; current: string };
  picksHeading: string;
  picksSubheading: string;
  picks: [PickContent, PickContent, PickContent];
  decision: { h2: string; intro: string; criteria: BoldItem[] };
  kidSafety: {
    h2: string;
    doesH3: string;
    doesItems: BoldItem[];
    doesntH3: string;
    doesntItems: BoldItem[];
  };
  router: { h2: string; intro: string; items: string[]; disadvantage: BoldItem };
  multiCountry: { h2: string; p: string };
  costTable: { h2: string; head: string[]; rows: string[][] };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cards: { title: string; desc: string }[];
  relatedLabel: string;
  relatedLinks: { href: string; text: string }[];
};

const tr: VpnForFamiliesContent = {
  metaTitle:
    "Aile ve Çocuklar İçin En İyi VPN (2026) — Ebeveyn Kontrolü + Çoklu Cihaz",
  metaDescription:
    "Aile için VPN: çoklu cihaz desteği, ebeveyn kontrolü, zararlı içerik filtreleme ve çocukların güvenli internet kullanımı için kaynakları karşılaştırma rehberi.",
  keywords: [
    "aile vpn",
    "çocuklar için vpn",
    "ebeveyn kontrolü vpn",
    "zararlı içerik filtreleme",
    "çoklu cihaz vpn",
    "güvenli internet çocuk",
  ],
  ogTitle: "Aile ve Çocuklar İçin En İyi VPN (2026)",
  ogDescription:
    "Çoklu cihaz, ebeveyn kontrolü ve zararlı içerik filtreleme özelliklerini karşılaştırma rehberi.",
  badge: "Aile",
  h1: "Aile ve çocuklar için VPN bilgi rehberi",
  lede: "Çoklu cihaz desteği, zararlı içerik filtreleme ve tüm aile ev ağı koruması için kaynak profillerini karşılaştırın.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Aile ve çocuklar",
  },
  picksHeading: "Aile için karşılaştırılabilecek sağlayıcı profilleri",
  picksSubheading: "Cihaz limiti, içerik filtreleme ve fiyata göre.",
  picks: [
    {
      slug: "surfshark",
      label: "Çoklu cihaz odaklı seçenek",
      reason:
        "Sağlayıcı politikasına göre sınırsız eşzamanlı cihaz desteği — aile içi paylaşım için değerlendirilebilir. CleanWeb özelliği içerik filtreleme katmanı sunar.",
    },
    {
      slug: "nordvpn",
      label: "Threat Protection özelliği",
      reason:
        "Sağlayıcı verisine göre 10 cihaz limiti çoğu aile için yeterli olabilir. Threat Protection özelliği reklam, izleyici ve zararlı yazılım engelleme katmanı sunar; tam ebeveyn kontrolü değildir, ek koruma yazılımı önerilir.",
    },
    {
      slug: "proton-vpn",
      label: "Açık kaynak istemci",
      reason:
        "Sağlayıcı verisine göre NetShield ile reklam/zararlı yazılım filtreleme ve açık kaynak istemciler sunulmaktadır. Kod GitHub'da yayınlanmıştır; bağımsız denetim için referans alınabilir.",
    },
  ],
  decision: {
    h2: "Aile için VPN — basit bir karar matrisi",
    intro:
      "4 kişilik bir ailede ortalama 8-10 cihaz var: telefonlar, dizüstüler, tabletler, akıllı TV. VPN'in aile için anlamlı olması için 3 temel özellik olmalı:",
    criteria: [
      {
        bold: "Yeterli cihaz limiti",
        text: " — minimum 8, ideali sınırsız.",
      },
      {
        bold: "İçerik filtreleme",
        text: " — DNS düzeyinde reklam, izleyici, zararlı içerik engelleme.",
      },
      {
        bold: "Kolay kurulum",
        text: " — eşin/çocuğun teknik bilgisi olmadan kullanabilmeli.",
      },
    ],
  },
  kidSafety: {
    h2: "Çocukların internet güvenliği için VPN ne yapar?",
    doesH3: "Yapar:",
    doesItems: [
      {
        bold: "Halka açık Wi-Fi koruması:",
        text: " Tatilde, alışveriş merkezinde, kafede çocuğun cihazını dinlemeden korur.",
      },
      {
        bold: "Reklam/izleyici engelleme:",
        text: " Surfshark CleanWeb, NordVPN Threat Protection, Proton NetShield bu özelliği sunar.",
      },
      {
        bold: "Zararlı site engelleme:",
        text: " Phishing ve malware dağıtan bilinen domain'leri DNS düzeyinde bloklar.",
      },
      {
        bold: "Coğrafi bypass:",
        text: " Yurt dışında Türkçe çocuk içeriklerine (TRT Çocuk, vb.) erişim.",
      },
    ],
    doesntH3: "Yapmaz:",
    doesntItems: [
      {
        bold: "Detaylı ebeveyn kontrolü:",
        text: " Ekran süresi, uygulama kısıtlaması, içerik kategori bazlı engelleme için Qustodio, Norton Family veya Apple Screen Time gibi araçlar gerekir.",
      },
      {
        bold: "Sosyal medya kullanımı izleme:",
        text: " VPN, mesaj içeriğini görmez — sadece şifreler.",
      },
      {
        bold: "Yaş bazlı içerik kısıtlaması:",
        text: " Google Family Link veya işletim sistemi düzeyinde kontroller daha etkili.",
      },
    ],
  },
  router: {
    h2: "Router'a kurmak: tüm ev ağı korunsun",
    intro:
      "VPN'i ev router'ına kurarak tüm cihazları (akıllı TV, oyun konsolu, IoT cihazlar) tek seferde korumak mümkün. Avantajlar:",
    items: [
      'Tek "cihaz" sayılır — cihaz limiti dert değil.',
      "VPN uygulaması olmayan cihazlar (akıllı TV, eski tablet) da korunur.",
      "Misafirler de otomatik korunur.",
    ],
    disadvantage: {
      bold: "Dezavantaj:",
      text: " Bazı router'lar (özellikle ISP'den verilen) VPN istemci desteklemez. ASUS, GL.iNet veya OPNsense tabanlı router'lar destekler. NordVPN, ExpressVPN ve Surfshark router kurulum kılavuzları sunar.",
    },
  },
  multiCountry: {
    h2: "Aile üyeleri farklı ülkelerden bağlanabilir mi?",
    p: "Evet. Eş Türkiye sunucusunda BluTV izlerken, çocuk Almanya sunucusundan ödev yapabilir, sen ABD sunucusundan Netflix US'te içerik izleyebilirsin — hepsi aynı hesapla, aynı anda.",
  },
  costTable: {
    h2: "Cihaz başına maliyet karşılaştırması",
    head: ["VPN", "Cihaz limiti", "Aylık fiyat", "9 cihaz için cihaz başı"],
    rows: [
      ["Surfshark", "Sınırsız", "$2.19", "$0.24/cihaz"],
      ["NordVPN", "10", "$3.39", "$0.34/cihaz"],
      ["Proton VPN Plus", "10", "$4.99", "$0.50/cihaz"],
      ["ExpressVPN", "8", "$6.67", "$0.83/cihaz"],
    ],
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "VPN çocuğumun zararlı içeriklere erişmesini engelleyebilir mi?",
      a: "Bazıları evet. Surfshark CleanWeb, NordVPN Threat Protection ve Proton VPN NetShield reklam, kötü amaçlı yazılım ve yetişkin içerik kategorilerini DNS düzeyinde engelleyebilir. Tam ebeveyn kontrolü değildir (Qustodio gibi yazılımlar tam çözüm sunar) ama temel filtreleme için yeterli.",
    },
    {
      q: "Bir aile aboneliği kaç cihaz desteklemeli?",
      a: "Tipik bir 4 kişilik ailede: 4 telefon + 2 dizüstü + 1-2 tablet + 1 akıllı TV = en az 8-9 cihaz. Surfshark sınırsız sunar; NordVPN 10, ExpressVPN 8 cihaz. Tek hesap tüm aile için yeterli.",
    },
    {
      q: "Aile üyeleri farklı ülke sunucularına aynı anda bağlanabilir mi?",
      a: "Evet. NordVPN, Surfshark, ExpressVPN tüm aile cihazlarına izin verir ve her cihaz farklı bir ülkeden bağlanabilir — birisi Türkiye, birisi ABD, birisi Almanya sunucusunda olabilir.",
    },
    {
      q: "Çocuğumun akıllı TV'sinde VPN nasıl kullanırım?",
      a: "Android TV uygulaması olan VPN (Surfshark, NordVPN, ExpressVPN) doğrudan kurulabilir. Apple TV veya eski TV'ler için VPN'i router'da kurarak tüm ev ağına uygulayabilirsiniz — bu durumda tek 'cihaz' sayılır.",
    },
    {
      q: "Aile VPN'i ne kadar tutar?",
      a: "Aylık ortalama $2-5 (uzun dönem planlarda). Surfshark $2.19/ay (2 yıl), NordVPN $3.39/ay (2 yıl + 3 ay). 4 kişilik bir aile için ayrı ayrı ödemek yerine tek hesap çok daha ekonomiktir.",
    },
  ],
  cards: [
    { title: "Çoklu cihaz", desc: "Tek hesap, tüm aile." },
    { title: "İçerik filtreleme", desc: "Reklam, izleyici, zararlı site." },
    {
      title: "Halka açık Wi-Fi",
      desc: "Tatil, AVM, kafe — çocuk güvende.",
    },
  ],
  relatedLabel: "İlgili sayfalar",
  relatedLinks: [
    { href: "/devices", text: "Cihaz bazlı kurulum" },
    { href: "/guide/uzaktan-calisanlar-icin-vpn", text: "Uzaktan çalışanlar" },
    { href: "/quiz", text: "Quiz: Sana uygun VPN" },
  ],
};

const en: VpnForFamiliesContent = {
  metaTitle:
    "Best VPN for Families & Kids (2026) — Parental Controls + Multi-Device",
  metaDescription:
    "A family VPN guide covering multi-device support, parental controls, harmful-content filtering and safe internet use for kids.",
  keywords: [
    "family vpn",
    "vpn for kids",
    "parental control vpn",
    "harmful content filtering",
    "multi-device vpn",
    "safe internet for kids",
  ],
  ogTitle: "Best VPN for Families & Kids (2026)",
  ogDescription:
    "The best family VPNs for multi-device support, parental controls and harmful content filtering.",
  badge: "Family",
  h1: "VPN information guide for families and kids",
  lede: "Compare provider documentation for multi-device support, harmful-content filtering and whole-home network protection.",
  breadcrumb: { home: "Home", guides: "Guides", current: "Family and kids" },
  picksHeading: "Provider profiles to compare for families",
  picksSubheading: "Based on device limits, content filtering and price.",
  picks: [
    {
      slug: "surfshark",
      label: "Multi-device option",
      reason:
        "According to the provider's policy, unlimited simultaneous device support — worth considering for sharing within the family. The CleanWeb feature adds a content-filtering layer.",
    },
    {
      slug: "nordvpn",
      label: "Threat Protection feature",
      reason:
        "According to provider data, the 10-device limit can be enough for most families. The Threat Protection feature adds a layer that blocks ads, trackers and malware; it's not full parental control, so additional protection software is recommended.",
    },
    {
      slug: "proton-vpn",
      label: "Open-source client",
      reason:
        "According to provider data, NetShield offers ad/malware filtering and the clients are open source. The code is published on GitHub and can serve as a reference for independent review.",
    },
  ],
  decision: {
    h2: "A VPN for the family — a simple decision matrix",
    intro:
      "A family of four has 8-10 devices on average: phones, laptops, tablets, a smart TV. For a VPN to make sense for a family, it needs 3 core features:",
    criteria: [
      {
        bold: "A sufficient device limit",
        text: " — minimum 8, ideally unlimited.",
      },
      {
        bold: "Content filtering",
        text: " — DNS-level blocking of ads, trackers and harmful content.",
      },
      {
        bold: "Easy setup",
        text: " — your partner/child should be able to use it without technical knowledge.",
      },
    ],
  },
  kidSafety: {
    h2: "What does a VPN do for kids' internet safety?",
    doesH3: "It does:",
    doesItems: [
      {
        bold: "Public Wi-Fi protection:",
        text: " Protects your child's device from eavesdropping on holiday, at the mall or in a café.",
      },
      {
        bold: "Ad/tracker blocking:",
        text: " Surfshark CleanWeb, NordVPN Threat Protection and Proton NetShield offer this feature.",
      },
      {
        bold: "Harmful site blocking:",
        text: " Blocks known phishing and malware-distributing domains at the DNS level.",
      },
      {
        bold: "Geo bypass:",
        text: " Access to Turkish kids' content (TRT Çocuk, etc.) when abroad.",
      },
    ],
    doesntH3: "It doesn't:",
    doesntItems: [
      {
        bold: "Detailed parental controls:",
        text: " For screen time, app restrictions and category-based content blocking you need tools like Qustodio, Norton Family or Apple Screen Time.",
      },
      {
        bold: "Monitoring social media use:",
        text: " A VPN doesn't see message contents — it only encrypts.",
      },
      {
        bold: "Age-based content restrictions:",
        text: " Google Family Link or OS-level controls are more effective.",
      },
    ],
  },
  router: {
    h2: "Installing on the router: protect the whole home network",
    intro:
      "By installing the VPN on your home router you can protect every device (smart TV, game console, IoT devices) in one go. The advantages:",
    items: [
      'It counts as a single "device" — device limits are no longer a worry.',
      "Devices without a VPN app (smart TV, old tablet) are protected too.",
      "Guests are automatically protected as well.",
    ],
    disadvantage: {
      bold: "The downside:",
      text: " Some routers (especially ISP-provided ones) don't support a VPN client. ASUS, GL.iNet or OPNsense-based routers do. NordVPN, ExpressVPN and Surfshark provide router setup guides.",
    },
  },
  multiCountry: {
    h2: "Can family members connect from different countries?",
    p: "Yes. While your partner watches BluTV on a Türkiye server, your child can do homework through a Germany server and you can watch Netflix US content through a US server — all on the same account, at the same time.",
  },
  costTable: {
    h2: "Cost-per-device comparison",
    head: ["VPN", "Device limit", "Monthly price", "Per device for 9 devices"],
    rows: [
      ["Surfshark", "Unlimited", "$2.19", "$0.24/device"],
      ["NordVPN", "10", "$3.39", "$0.34/device"],
      ["Proton VPN Plus", "10", "$4.99", "$0.50/device"],
      ["ExpressVPN", "8", "$6.67", "$0.83/device"],
    ],
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Can a VPN stop my child from reaching harmful content?",
      a: "Some can. Surfshark CleanWeb, NordVPN Threat Protection and Proton VPN NetShield can block ads, malware and adult content categories at the DNS level. It's not full parental control (software like Qustodio offers a complete solution), but it's enough for basic filtering.",
    },
    {
      q: "How many devices should a family subscription support?",
      a: "In a typical family of four: 4 phones + 2 laptops + 1-2 tablets + 1 smart TV = at least 8-9 devices. Surfshark offers unlimited; NordVPN 10, ExpressVPN 8 devices. One account is enough for the whole family.",
    },
    {
      q: "Can family members connect to servers in different countries at the same time?",
      a: "Yes. NordVPN, Surfshark and ExpressVPN allow all family devices, and each device can connect from a different country — one person can be on a Türkiye server, one in the US, one in Germany.",
    },
    {
      q: "How do I use a VPN on my child's smart TV?",
      a: "A VPN with an Android TV app (Surfshark, NordVPN, ExpressVPN) can be installed directly. For Apple TV or older TVs you can install the VPN on the router and apply it to the whole home network — in that case it counts as a single 'device'.",
    },
    {
      q: "How much does a family VPN cost?",
      a: "On average $2-5 a month (on long-term plans). Surfshark $2.19/mo (2 years), NordVPN $3.39/mo (2 years + 3 months). For a family of four, one account is far more economical than paying separately.",
    },
  ],
  cards: [
    { title: "Multi-device", desc: "One account, the whole family." },
    { title: "Content filtering", desc: "Ads, trackers, harmful sites." },
    {
      title: "Public Wi-Fi",
      desc: "Holiday, mall, café — your kid is safe.",
    },
  ],
  relatedLabel: "Related pages",
  relatedLinks: [
    { href: "/devices", text: "Setup by device" },
    { href: "/guide/vpn-for-remote-workers", text: "Remote workers" },
    { href: "/quiz", text: "Quiz: the right VPN for you" },
  ],
};

const de: VpnForFamiliesContent = {
  metaTitle:
    "Das beste VPN für Familien & Kinder (2026) — Kindersicherung + Multi-Gerät",
  metaDescription:
    "VPN für die Familie: Multi-Geräte-Support, Kindersicherung, Filterung schädlicher Inhalte und sicheres Internet für Kinder. Die 3 besten VPNs mit unbegrenzten Geräten.",
  keywords: [
    "familien vpn",
    "vpn für kinder",
    "kindersicherung vpn",
    "schädliche inhalte filtern",
    "multi gerät vpn",
    "sicheres internet kinder",
  ],
  ogTitle: "Das beste VPN für Familien & Kinder (2026)",
  ogDescription:
    "Die besten Familien-VPNs für viele Geräte, Kindersicherung und das Filtern schädlicher Inhalte.",
  badge: "Familie",
  h1: "VPN-Informationsratgeber für Familien und Kinder",
  lede: "Vergleichen Sie Anbieterquellen zu Multi-Geräte-Support, dem Filtern schädlicher Inhalte und dem Schutz des gesamten Heimnetzes.",
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "Familie und Kinder",
  },
  picksHeading: "Vergleichbare Anbieterprofile für Familien",
  picksSubheading: "Nach Gerätelimit, Inhaltsfilter und Preis.",
  picks: [
    {
      slug: "surfshark",
      label: "Multi-Geräte-Option",
      reason:
        "Laut Anbieterrichtlinie unbegrenzte gleichzeitige Geräte — fürs Teilen innerhalb der Familie eine Überlegung wert. Die CleanWeb-Funktion bietet eine Inhaltsfilter-Ebene.",
    },
    {
      slug: "nordvpn",
      label: "Threat-Protection-Funktion",
      reason:
        "Laut Anbieterdaten kann das Limit von 10 Geräten für die meisten Familien reichen. Die Threat-Protection-Funktion blockiert Werbung, Tracker und Schadsoftware; sie ist keine vollständige Kindersicherung, zusätzliche Schutzsoftware wird empfohlen.",
    },
    {
      slug: "proton-vpn",
      label: "Open-Source-Client",
      reason:
        "Laut Anbieterdaten bietet NetShield Werbe-/Malware-Filterung, und die Clients sind Open Source. Der Code ist auf GitHub veröffentlicht und kann als Referenz für unabhängige Prüfung dienen.",
    },
  ],
  decision: {
    h2: "VPN für die Familie — eine einfache Entscheidungsmatrix",
    intro:
      "Eine vierköpfige Familie hat im Schnitt 8-10 Geräte: Handys, Laptops, Tablets, Smart-TV. Damit ein VPN für die Familie Sinn ergibt, braucht es 3 Kernmerkmale:",
    criteria: [
      {
        bold: "Ausreichendes Gerätelimit",
        text: " — mindestens 8, ideal unbegrenzt.",
      },
      {
        bold: "Inhaltsfilterung",
        text: " — Blockieren von Werbung, Trackern und schädlichen Inhalten auf DNS-Ebene.",
      },
      {
        bold: "Einfache Einrichtung",
        text: " — Partner/Kind sollte es ohne technisches Wissen nutzen können.",
      },
    ],
  },
  kidSafety: {
    h2: "Was leistet ein VPN für die Internetsicherheit von Kindern?",
    doesH3: "Das kann es:",
    doesItems: [
      {
        bold: "Schutz im öffentlichen WLAN:",
        text: " Schützt das Gerät deines Kindes im Urlaub, im Einkaufszentrum oder im Café vor Mitlesern.",
      },
      {
        bold: "Werbe-/Tracker-Blocker:",
        text: " Surfshark CleanWeb, NordVPN Threat Protection und Proton NetShield bieten diese Funktion.",
      },
      {
        bold: "Blockieren schädlicher Seiten:",
        text: " Blockiert bekannte Phishing- und Malware-Domains auf DNS-Ebene.",
      },
      {
        bold: "Geo-Bypass:",
        text: " Zugriff auf türkische Kinderinhalte (TRT Çocuk usw.) im Ausland.",
      },
    ],
    doesntH3: "Das kann es nicht:",
    doesntItems: [
      {
        bold: "Detaillierte Kindersicherung:",
        text: " Für Bildschirmzeit, App-Beschränkungen und kategoriebasiertes Blockieren brauchst du Tools wie Qustodio, Norton Family oder Apple Screen Time.",
      },
      {
        bold: "Social-Media-Nutzung überwachen:",
        text: " Ein VPN sieht keine Nachrichteninhalte — es verschlüsselt nur.",
      },
      {
        bold: "Altersbasierte Inhaltsbeschränkung:",
        text: " Google Family Link oder Kontrollen auf Betriebssystemebene sind wirksamer.",
      },
    ],
  },
  router: {
    h2: "Auf dem Router installieren: das ganze Heimnetz schützen",
    intro:
      "Installierst du das VPN auf dem Heimrouter, kannst du alle Geräte (Smart-TV, Spielkonsole, IoT-Geräte) auf einen Schlag schützen. Die Vorteile:",
    items: [
      "Zählt als ein einziges \u201eGerät\u201c — das Gerätelimit ist kein Thema mehr.",
      "Auch Geräte ohne VPN-App (Smart-TV, altes Tablet) sind geschützt.",
      "Gäste sind automatisch mitgeschützt.",
    ],
    disadvantage: {
      bold: "Der Nachteil:",
      text: " Manche Router (besonders die vom ISP gestellten) unterstützen keinen VPN-Client. Router auf ASUS-, GL.iNet- oder OPNsense-Basis schon. NordVPN, ExpressVPN und Surfshark bieten Router-Einrichtungsanleitungen.",
    },
  },
  multiCountry: {
    h2: "Können Familienmitglieder aus verschiedenen Ländern verbinden?",
    p: "Ja. Während dein Partner auf einem Türkei-Server BluTV schaut, kann dein Kind über einen Deutschland-Server Hausaufgaben machen und du über einen US-Server Inhalte auf Netflix US schauen — alles mit demselben Konto, gleichzeitig.",
  },
  costTable: {
    h2: "Kostenvergleich pro Gerät",
    head: ["VPN", "Gerätelimit", "Monatspreis", "Pro Gerät bei 9 Geräten"],
    rows: [
      ["Surfshark", "Unbegrenzt", "$2.19", "$0.24/Gerät"],
      ["NordVPN", "10", "$3.39", "$0.34/Gerät"],
      ["Proton VPN Plus", "10", "$4.99", "$0.50/Gerät"],
      ["ExpressVPN", "8", "$6.67", "$0.83/Gerät"],
    ],
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Kann ein VPN verhindern, dass mein Kind auf schädliche Inhalte zugreift?",
      a: "Manche ja. Surfshark CleanWeb, NordVPN Threat Protection und Proton VPN NetShield können Werbung, Schadsoftware und Kategorien mit Erwachseneninhalten auf DNS-Ebene blockieren. Eine vollständige Kindersicherung ist das nicht (Software wie Qustodio bietet eine Komplettlösung), aber für grundlegende Filterung reicht es.",
    },
    {
      q: "Wie viele Geräte sollte ein Familienabo unterstützen?",
      a: "In einer typischen vierköpfigen Familie: 4 Handys + 2 Laptops + 1-2 Tablets + 1 Smart-TV = mindestens 8-9 Geräte. Surfshark bietet unbegrenzt viele; NordVPN 10, ExpressVPN 8 Geräte. Ein Konto reicht für die ganze Familie.",
    },
    {
      q: "Können sich Familienmitglieder gleichzeitig mit Servern in verschiedenen Ländern verbinden?",
      a: "Ja. NordVPN, Surfshark und ExpressVPN erlauben alle Familiengeräte, und jedes Gerät kann sich aus einem anderen Land verbinden — eine Person kann auf einem Türkei-Server sein, eine in den USA, eine in Deutschland.",
    },
    {
      q: "Wie nutze ich ein VPN auf dem Smart-TV meines Kindes?",
      a: "Ein VPN mit Android-TV-App (Surfshark, NordVPN, ExpressVPN) lässt sich direkt installieren. Für Apple TV oder ältere Fernseher kannst du das VPN auf dem Router einrichten und so aufs ganze Heimnetz anwenden — dann zählt es als ein einziges 'Gerät'.",
    },
    {
      q: "Was kostet ein Familien-VPN?",
      a: "Im Schnitt $2-5 pro Monat (bei Langzeitplänen). Surfshark $2.19/Monat (2 Jahre), NordVPN $3.39/Monat (2 Jahre + 3 Monate). Für eine vierköpfige Familie ist ein gemeinsames Konto deutlich günstiger, als getrennt zu zahlen.",
    },
  ],
  cards: [
    { title: "Viele Geräte", desc: "Ein Konto, die ganze Familie." },
    { title: "Inhaltsfilter", desc: "Werbung, Tracker, schädliche Seiten." },
    {
      title: "Öffentliches WLAN",
      desc: "Urlaub, Einkaufszentrum, Café — dein Kind ist sicher.",
    },
  ],
  relatedLabel: "Verwandte Seiten",
  relatedLinks: [
    { href: "/devices", text: "Einrichtung nach Gerät" },
    { href: "/ratgeber/vpn-fuer-remote-arbeit", text: "Remote-Arbeit" },
    { href: "/quiz", text: "Quiz: Das passende VPN für dich" },
  ],
};

const CONTENT: Record<AppLocale, VpnForFamiliesContent> = { tr, en, de };

export function getVpnForFamiliesContent(
  locale: string,
): VpnForFamiliesContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
