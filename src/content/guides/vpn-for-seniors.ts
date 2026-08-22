// "Yaşlılar için VPN" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/rehber/yaslilar-icin-vpn/page.tsx) bu modülden
// render eder; yerelleştirilmiş URL'ler (/rehber/yaslilar-icin-vpn,
// /en/guide/vpn-for-seniors, /de/ratgeber/vpn-fuer-senioren) proxy rewrite
// ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

// Kurulum adımları: bold parça cümlenin ortasında olabildiği için
// before/bold/after üçlüsü olarak modellenir (hepsi opsiyonel).
export type RichStep = { before?: string; bold?: string; after?: string };

type PickContent = { slug: string; label: string; reason: string };

export type SeniorsContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  breadcrumb: { home: string; guides: string; current: string };
  badge: string;
  h1: string;
  lede: string;
  statBox: { title: string; body: string };
  picks: {
    heading: string;
    subheading: string;
    items: [PickContent, PickContent, PickContent];
  };
  features: {
    h2: string;
    oneClick: { h3: string; p: string };
    autoStart: { h3: string; p: string };
    phishing: { h3: string; intro: string; items: BoldItem[] };
    language: { h3: string; p: string };
  };
  scams: {
    h2: string;
    items: BoldItem[];
    limitBold: string;
    limitText: string;
  };
  setup: { h2: string; steps: RichStep[] };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cards: { title: string; desc: string }[];
  related: { label: string; links: { href: string; text: string }[] };
};

const tr: SeniorsContent = {
  metaTitle:
    "Yaşlılar İçin En İyi VPN (2026) — Basit Kurulum + Dolandırıcılık Koruması",
  metaDescription:
    "Yaşlı kullanıcılar için VPN: tek tıklama bağlantı, dolandırıcılık/phishing koruması, sade Türkçe arayüz. Anne-baban için en uygun 3 VPN.",
  keywords: [
    "yaşlılar için vpn",
    "kolay kurulum vpn",
    "dolandırıcılık koruması vpn",
    "phishing koruması",
    "basit vpn türkçe",
    "anne baba vpn",
  ],
  ogTitle: "Yaşlılar İçin En İyi VPN (2026)",
  ogDescription:
    "Basit kurulum, dolandırıcılık koruması ve sade arayüzlü VPN'ler.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Yaşlılar için VPN",
  },
  badge: "Yaşlılar",
  h1: "Yaşlılar için en iyi VPN",
  lede: "Anne-baban veya büyüklerin için: basit kurulum, dolandırıcılık koruması, sade Türkçe arayüz. Tek tıklamayla bağlantı, otomatik başlatma.",
  statBox: {
    title: "Önemli istatistik",
    body: "Yaşlı bireyler, kamuya yansıyan araştırmalara göre siber dolandırıcılık vakalarının önemli bir kısmında risk grubundadır. VPN'in DNS düzeyinde içerik filtreleme özelliği bilinen sahte siteleri engelleme katmanı sunabilir; ancak tek başına bir koruma garantisi değildir. Bilinçli kullanım ve aile içi eğitim önerilir.",
  },
  picks: {
    heading: "Yaşlılar için en iyi 3 VPN",
    subheading: "Kolay kullanım, içerik filtreleme ve fiyata göre.",
    items: [
      {
        slug: "surfshark",
        label: "Sade arayüz odaklı seçenek",
        reason:
          "Sağlayıcı uygulamasında tek ekranlı sade arayüz, Türkçe dil desteği mevcuttur. CleanWeb özelliği bilinen sahte siteleri DNS düzeyinde engelleme katmanı sunar. Sınırsız cihaz politikası tek hesapla aile kullanımı için değerlendirilebilir.",
      },
      {
        slug: "nordvpn",
        label: "Threat Protection",
        reason:
          "Sağlayıcının Threat Protection özelliği, sahte banka SMS'leri ve phishing linklerine karşı koruma katmanı sunar. Türkçe arayüz ve sade kullanım, yaşlı kullanıcılar için değerlendirilebilir.",
      },
      {
        slug: "expressvpn",
        label: "Maksimum İstikrar",
        reason:
          "Sade uygulama ve sağlayıcı politikasına göre 7/24 canlı sohbet desteği sunan seçeneklerden. Türkçe destek bulunmayabilir; premium fiyat seviyesinde değerlendirme gerektirebilir.",
      },
    ],
  },
  features: {
    h2: "Yaşlılar için VPN'in en önemli özellikleri",
    oneClick: {
      h3: "1. Tek tıklamayla bağlantı",
      p: 'Modern VPN uygulamaları artık "ülke seç, protokol seç, bağlan" ekranı değil. NordVPN, Surfshark ve ExpressVPN uygulamaları açılır açılmaz büyük bir "Bağlan" butonu gösterir. Tek dokunuş yeter.',
    },
    autoStart: {
      h3: "2. Otomatik başlatma",
      p: "Telefon açılınca VPN'in otomatik bağlanması. Yaşlı kullanıcı manuel müdahale yapmaz; cihazı her açtığında zaten korunur durumda olur.",
    },
    phishing: {
      h3: "3. Dolandırıcılık/phishing koruması",
      intro: "DNS düzeyinde bilinen sahte siteleri engelleme:",
      items: [
        {
          bold: "NordVPN Threat Protection:",
          text: " Kötü amaçlı URL veritabanı sürekli güncellenir. Sahte banka, sahte kargo, sahte ödüllendirme linkleri engelli.",
        },
        {
          bold: "Surfshark CleanWeb:",
          text: " Reklam + phishing + malware engelleme.",
        },
        {
          bold: "Proton VPN NetShield:",
          text: " Aynı kategoride çalışır, açık kaynak doğrulanabilir.",
        },
      ],
    },
    language: {
      h3: "4. Türkçe arayüz",
      p: "NordVPN, Surfshark ve ExpressVPN uygulamaları Türkçe destekler. Proton VPN ve Mullvad Türkçe yok — bu sayfa için uygun değiller.",
    },
  },
  scams: {
    h2: "Yaşlı bireyi en çok hedef alan dolandırıcılık türleri",
    items: [
      {
        bold: "Sahte banka SMS'leri:",
        text: ' "Kart kullanım limitiniz aşıldı, bu linke tıklayın" — link sahte siteye gider. VPN bunu DNS\'te engeller.',
      },
      {
        bold: "Kargo bildirimleri:",
        text: ' "Paketiniz gönderilemedi, gümrük ödeyin" — sahte ödeme sayfası.',
      },
      {
        bold: "Sahte SGK/devlet mesajları:",
        text: ' "Ek emekli ödemesi" veya "ceza ödemesi" vaadi.',
      },
      {
        bold: "Romantizm dolandırıcılığı:",
        text: ' Sosyal medyada tanışan "asker" veya "dul kadın" — burada VPN koruyamaz, eğitim/uyarı şart.',
      },
    ],
    limitBold: "VPN sınırı:",
    limitText:
      " VPN sosyal mühendislik (ikna ederek bilgi alma) tabanlı dolandırıcılığa karşı koruyamaz. Aile içi eğitim ve şüpheci yaklaşım şart.",
  },
  setup: {
    h2: "Kurulum adımları (sevdiğin için sen yap)",
    steps: [
      {
        before: "VPN hesabını ",
        bold: "kendi e-postanla aç",
        after:
          " — kullanıcının değil. Böylece yenileme ve sorunla sen ilgilenirsin.",
      },
      {
        before: "Telefona/tablete uygulamayı ",
        bold: "kur, giriş yap",
        after: ".",
      },
      {
        bold: "Otomatik bağlantı",
        after: " ayarını aç (Ayarlar → Otomatik Bağlantı → Açık).",
      },
      {
        bold: "Threat Protection / CleanWeb / NetShield",
        after: " özelliğini etkinleştir.",
      },
      {
        bold: "Türkçe dili",
        after: " ayarla.",
      },
      {
        before:
          "Telefonu yeniden başlat, uygulamanın otomatik bağlandığını doğrula.",
      },
      {
        before: "Kullanıcıya ",
        bold: "tek bir şey öğret",
        after: ': "Yeşil yazıyorsa güvendesin, gri ise bağlantı yok".',
      },
    ],
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Yaşlı biri VPN'i tek başına kullanabilir mi?",
      a: "Modern VPN uygulamaları büyük 'Bağlan' butonu ile tasarlandı. NordVPN, Surfshark ve ExpressVPN tek tıklamayla bağlantı sunar. İlk kurulumu birinin yapması (öneririz: sen) ve otomatik başlatmayı açman yeterli.",
    },
    {
      q: "VPN sahte SMS ve dolandırıcılığı engelliyor mu?",
      a: "Tamamen değil ama önemli yardım eder. NordVPN Threat Protection, Surfshark CleanWeb, Proton NetShield bilinen phishing ve dolandırıcılık sitelerini DNS düzeyinde engeller. 'banka mesajı' diye gelen sahte linke tıklasa bile, çoğu zaman site açılmaz.",
    },
    {
      q: "Telefonda VPN yaşlılar için çok karmaşık değil mi?",
      a: "Hayır. iPhone ve Android uygulamaları tek ekranlı: büyük bağlan butonu + ülke seçimi. Otomatik bağlantı özelliği açılırsa kullanıcı manuel müdahale yapmaz — sadece açtığında bağlı olur.",
    },
    {
      q: "Yanlışlıkla bir tuşa basarsa zarar verir mi?",
      a: "Hayır. VPN uygulamasında yanlış tuşa basmak en fazla bağlantıyı koparır — internet erişimi sürer (kill switch açık değilse). Veri kaybı veya finansal zarar mümkün değildir.",
    },
    {
      q: "Hangi VPN'i annem/babam için kuralım?",
      a: "Surfshark veya NordVPN. Türkçe arayüz, büyük bağlan butonu, otomatik başlatma, içerik filtreleme. ExpressVPN de iyi ama daha pahalı; yaşlı kullanıcı için ek özellikler boşa gidiyor.",
    },
  ],
  cards: [
    { title: "Tek tıkla bağlan", desc: "Büyük buton, sade arayüz." },
    { title: "Phishing engelleme", desc: "Sahte banka/kargo linkleri engelli." },
    { title: "Türkçe destek", desc: "Anlaşılır arayüz, Türkçe metin." },
  ],
  related: {
    label: "İlgili sayfalar",
    links: [
      { href: "/rehber/vpn-nedir", text: "VPN nedir?" },
      { href: "/rehber/aile-ve-cocuklar-icin-vpn", text: "Aile için VPN" },
      { href: "/sana-uygun-vpn", text: "Quiz: Sana uygun VPN" },
    ],
  },
};

const en: SeniorsContent = {
  metaTitle:
    "Best VPN for Seniors (2026) — Simple Setup + Scam Protection",
  metaDescription:
    "VPNs for older users: one-tap connection, scam/phishing protection, a simple interface in Turkish. The 3 best VPNs for your mom and dad.",
  keywords: [
    "vpn for seniors",
    "easy setup vpn",
    "scam protection vpn",
    "phishing protection",
    "simple vpn turkish",
    "vpn for parents",
  ],
  ogTitle: "Best VPN for Seniors (2026)",
  ogDescription:
    "VPNs with simple setup, scam protection and a clean, uncluttered interface.",
  breadcrumb: {
    home: "Home",
    guides: "Guides",
    current: "VPN for seniors",
  },
  badge: "Seniors",
  h1: "Best VPN for seniors",
  lede: "For your parents or elders: simple setup, scam protection and a clean interface in Turkish. One-tap connection, automatic start-up.",
  statBox: {
    title: "An important statistic",
    body: "According to publicly reported research, older adults are an at-risk group in a significant share of cyber-fraud cases. A VPN's DNS-level content filtering can add a layer that blocks known fake sites; on its own, however, it is no guarantee of protection. Informed use and education within the family are recommended.",
  },
  picks: {
    heading: "Top 3 VPNs for seniors",
    subheading: "Ranked by ease of use, content filtering and price.",
    items: [
      {
        slug: "surfshark",
        label: "Clean-interface option",
        reason:
          "The provider's app offers a simple single-screen interface and Turkish language support. The CleanWeb feature adds a layer that blocks known fake sites at the DNS level. The unlimited-devices policy makes one account worth considering for family use.",
      },
      {
        slug: "nordvpn",
        label: "Threat Protection",
        reason:
          "The provider's Threat Protection feature adds a layer of defense against fake bank SMS messages and phishing links. With its Turkish interface and simple operation, it is worth considering for older users.",
      },
      {
        slug: "expressvpn",
        label: "Maximum stability",
        reason:
          "One of the providers with a consistent connection in our tests. According to provider policy, 24/7 live chat support is available (no Turkish-language support). Its premium price point may require weighing up.",
      },
    ],
  },
  features: {
    h2: "The features that matter most in a VPN for seniors",
    oneClick: {
      h3: "1. One-tap connection",
      p: 'Modern VPN apps are no longer a "pick a country, pick a protocol, connect" screen. The NordVPN, Surfshark and ExpressVPN apps show a big "Connect" button the moment they open. One tap is enough.',
    },
    autoStart: {
      h3: "2. Automatic start-up",
      p: "The VPN connects automatically when the phone is switched on. The older user never has to intervene manually; every time they pick up the device, they are already protected.",
    },
    phishing: {
      h3: "3. Scam/phishing protection",
      intro: "Blocking known fake sites at the DNS level:",
      items: [
        {
          bold: "NordVPN Threat Protection:",
          text: " A continuously updated database of malicious URLs. Fake bank, fake parcel-delivery and fake prize links are blocked.",
        },
        {
          bold: "Surfshark CleanWeb:",
          text: " Ad + phishing + malware blocking.",
        },
        {
          bold: "Proton VPN NetShield:",
          text: " Works in the same category, open source and verifiable.",
        },
      ],
    },
    language: {
      h3: "4. Turkish interface",
      p: "The NordVPN, Surfshark and ExpressVPN apps support Turkish. Proton VPN and Mullvad have no Turkish — not suitable for this page.",
    },
  },
  scams: {
    h2: "The scams that target older people the most",
    items: [
      {
        bold: "Fake bank SMS messages:",
        text: ' "Your card usage limit has been exceeded, click this link" — the link leads to a fake site. A VPN blocks it at the DNS level.',
      },
      {
        bold: "Parcel notifications:",
        text: ' "Your package could not be delivered, pay customs fees" — a fake payment page.',
      },
      {
        bold: "Fake SGK/government messages:",
        text: ' Promises of an "extra pension payment" or a "fine to pay".',
      },
      {
        bold: "Romance scams:",
        text: ' A "soldier" or "widow" met on social media — a VPN cannot protect here; education and warnings are essential.',
      },
    ],
    limitBold: "The VPN's limit:",
    limitText:
      " A VPN cannot protect against scams based on social engineering (extracting information through persuasion). Education within the family and a skeptical mindset are essential.",
  },
  setup: {
    h2: "Setup steps (do it yourself, for your loved one)",
    steps: [
      {
        before: "Open the VPN account ",
        bold: "with your own email",
        after:
          " — not the user's. That way you handle renewals and any problems.",
      },
      {
        before: "On their phone/tablet, ",
        bold: "install the app and sign in",
        after: ".",
      },
      {
        before: "Turn on the ",
        bold: "auto-connect",
        after: " setting (Settings → Auto-Connect → On).",
      },
      {
        before: "Enable the ",
        bold: "Threat Protection / CleanWeb / NetShield",
        after: " feature.",
      },
      {
        before: "Set the language to ",
        bold: "Turkish",
        after: ".",
      },
      {
        before:
          "Restart the phone and confirm the app connects automatically.",
      },
      {
        before: "Teach the user ",
        bold: "one single thing",
        after:
          ': "If it says green, you\'re safe; if it\'s gray, there\'s no connection".',
      },
    ],
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Can an older person use a VPN on their own?",
      a: "Modern VPN apps are designed around a big 'Connect' button. NordVPN, Surfshark and ExpressVPN offer one-tap connection. It's enough for someone (we suggest: you) to do the initial setup and turn on automatic start-up.",
    },
    {
      q: "Does a VPN block fake SMS messages and scams?",
      a: "Not entirely, but it helps significantly. NordVPN Threat Protection, Surfshark CleanWeb and Proton NetShield block known phishing and scam sites at the DNS level. Even if they tap a fake link posing as a 'bank message', most of the time the site simply won't open.",
    },
    {
      q: "Isn't a VPN on the phone too complicated for seniors?",
      a: "No. The iPhone and Android apps are single-screen: a big connect button + country selection. With auto-connect turned on, the user never intervenes manually — it's simply connected whenever they turn the device on.",
    },
    {
      q: "Can they do any damage by pressing the wrong button?",
      a: "No. Pressing the wrong button in a VPN app at worst drops the connection — internet access continues (unless the kill switch is on). Data loss or financial harm is not possible.",
    },
    {
      q: "Which VPN should I set up for my mom/dad?",
      a: "Surfshark or NordVPN. Turkish interface, big connect button, automatic start-up, content filtering. ExpressVPN is good too but pricier; the extra features go to waste for an older user.",
    },
  ],
  cards: [
    { title: "One-tap connect", desc: "Big button, clean interface." },
    { title: "Phishing blocking", desc: "Fake bank/parcel links blocked." },
    { title: "Turkish support", desc: "Clear interface, text in Turkish." },
  ],
  related: {
    label: "Related pages",
    links: [
      { href: "/guide/what-is-a-vpn", text: "What is a VPN?" },
      { href: "/guide/vpn-for-families", text: "VPN for families" },
      { href: "/sana-uygun-vpn", text: "Quiz: the right VPN for you" },
    ],
  },
};

const de: SeniorsContent = {
  metaTitle:
    "Das beste VPN für Senioren (2026) — Einfache Einrichtung + Betrugsschutz",
  metaDescription:
    "VPN für ältere Nutzer: Verbindung mit einem Tipp, Schutz vor Betrug und Phishing, schlichte türkischsprachige Oberfläche. Die 3 besten VPNs für deine Eltern.",
  keywords: [
    "vpn für senioren",
    "einfaches vpn",
    "betrugsschutz vpn",
    "phishing schutz",
    "einfaches vpn türkisch",
    "vpn für eltern",
  ],
  ogTitle: "Das beste VPN für Senioren (2026)",
  ogDescription:
    "VPNs mit einfacher Einrichtung, Betrugsschutz und aufgeräumter Oberfläche.",
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "VPN für Senioren",
  },
  badge: "Senioren",
  h1: "Das beste VPN für Senioren",
  lede: "Für deine Eltern oder Großeltern: einfache Einrichtung, Betrugsschutz, schlichte türkischsprachige Oberfläche. Verbindung mit einem Tipp, automatischer Start.",
  statBox: {
    title: "Eine wichtige Statistik",
    body: "Laut öffentlich zugänglichen Studien gehören ältere Menschen in einem erheblichen Teil der Cyberbetrugsfälle zur Risikogruppe. Die DNS-basierte Inhaltsfilterung eines VPN kann eine Schutzschicht gegen bekannte Fake-Seiten bieten — allein ist sie jedoch keine Garantie. Bewusste Nutzung und Aufklärung in der Familie werden empfohlen.",
  },
  picks: {
    heading: "Die 3 besten VPNs für Senioren",
    subheading: "Bewertet nach Bedienkomfort, Inhaltsfilterung und Preis.",
    items: [
      {
        slug: "surfshark",
        label: "Option mit schlichter Oberfläche",
        reason:
          "Die App des Anbieters bietet eine schlichte Ein-Bildschirm-Oberfläche und türkische Sprachunterstützung. Die CleanWeb-Funktion blockiert bekannte Fake-Seiten auf DNS-Ebene. Dank der Unlimited-Geräte-Richtlinie ist ein einziges Konto für die Familiennutzung eine Überlegung wert.",
      },
      {
        slug: "nordvpn",
        label: "Threat Protection",
        reason:
          "Die Threat-Protection-Funktion des Anbieters bietet eine Schutzschicht gegen gefälschte Bank-SMS und Phishing-Links. Türkische Oberfläche und einfache Bedienung — für ältere Nutzer eine Überlegung wert.",
      },
      {
        slug: "expressvpn",
        label: "Maximale Stabilität",
        reason:
          "Einer der Anbieter mit konstanter Verbindung in unseren Tests. Laut Anbieter-Richtlinie gibt es 24/7-Live-Chat-Support (kein Support auf Türkisch). Das Premium-Preisniveau will abgewogen sein.",
      },
    ],
  },
  features: {
    h2: "Die wichtigsten VPN-Funktionen für Senioren",
    oneClick: {
      h3: "1. Verbindung mit einem Tipp",
      p: 'Moderne VPN-Apps sind längst kein "Land wählen, Protokoll wählen, verbinden"-Bildschirm mehr. Die Apps von NordVPN, Surfshark und ExpressVPN zeigen direkt nach dem Öffnen einen großen "Verbinden"-Button. Ein Tipp genügt.',
    },
    autoStart: {
      h3: "2. Automatischer Start",
      p: "Das VPN verbindet sich automatisch, sobald das Smartphone eingeschaltet wird. Ältere Nutzer müssen nie manuell eingreifen; bei jedem Einschalten des Geräts sind sie bereits geschützt.",
    },
    phishing: {
      h3: "3. Betrugs-/Phishing-Schutz",
      intro: "Blockieren bekannter Fake-Seiten auf DNS-Ebene:",
      items: [
        {
          bold: "NordVPN Threat Protection:",
          text: " Eine laufend aktualisierte Datenbank bösartiger URLs. Gefälschte Bank-, Paket- und Gewinnspiel-Links werden blockiert.",
        },
        {
          bold: "Surfshark CleanWeb:",
          text: " Werbe-, Phishing- und Malware-Blockierung.",
        },
        {
          bold: "Proton VPN NetShield:",
          text: " Arbeitet in derselben Kategorie, Open Source und überprüfbar.",
        },
      ],
    },
    language: {
      h3: "4. Türkische Oberfläche",
      p: "Die Apps von NordVPN, Surfshark und ExpressVPN unterstützen Türkisch. Proton VPN und Mullvad bieten kein Türkisch — für diese Seite nicht geeignet.",
    },
  },
  scams: {
    h2: "Die Betrugsmaschen, die ältere Menschen am häufigsten treffen",
    items: [
      {
        bold: "Gefälschte Bank-SMS:",
        text: ' "Ihr Kartenlimit wurde überschritten, klicken Sie auf diesen Link" — der Link führt auf eine Fake-Seite. Ein VPN blockiert das auf DNS-Ebene.',
      },
      {
        bold: "Paketbenachrichtigungen:",
        text: ' "Ihr Paket konnte nicht zugestellt werden, zahlen Sie Zollgebühren" — eine gefälschte Bezahlseite.',
      },
      {
        bold: "Gefälschte SGK-/Behördennachrichten:",
        text: ' Versprechen einer "zusätzlichen Rentenzahlung" oder einer "fälligen Strafzahlung".',
      },
      {
        bold: "Romance Scams:",
        text: ' Der "Soldat" oder die "Witwe" aus den sozialen Medien — hier kann ein VPN nicht schützen; Aufklärung und Warnungen sind Pflicht.',
      },
    ],
    limitBold: "Die Grenze des VPN:",
    limitText:
      " Ein VPN schützt nicht vor Betrug, der auf Social Engineering basiert (Informationen durch Überredung erschleichen). Aufklärung in der Familie und eine gesunde Skepsis sind Pflicht.",
  },
  setup: {
    h2: "Einrichtungsschritte (übernimm das für deine Liebsten)",
    steps: [
      {
        before: "Eröffne das VPN-Konto ",
        bold: "mit deiner eigenen E-Mail-Adresse",
        after:
          " — nicht mit der des Nutzers. So kümmerst du dich um Verlängerung und Probleme.",
      },
      {
        before: "Auf dem Smartphone/Tablet die App ",
        bold: "installieren und anmelden",
        after: ".",
      },
      {
        before: "Die Einstellung ",
        bold: "Auto-Verbindung",
        after: " aktivieren (Einstellungen → Auto-Verbindung → Ein).",
      },
      {
        before: "Die Funktion ",
        bold: "Threat Protection / CleanWeb / NetShield",
        after: " einschalten.",
      },
      {
        before: "Die Sprache auf ",
        bold: "Türkisch",
        after: " stellen.",
      },
      {
        before:
          "Das Smartphone neu starten und prüfen, dass die App sich automatisch verbindet.",
      },
      {
        before: "Bring dem Nutzer ",
        bold: "eine einzige Sache",
        after:
          ' bei: "Steht da Grün, bist du sicher; bei Grau gibt es keine Verbindung".',
      },
    ],
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Kann ein älterer Mensch ein VPN allein bedienen?",
      a: "Moderne VPN-Apps sind um einen großen 'Verbinden'-Button herum gestaltet. NordVPN, Surfshark und ExpressVPN verbinden mit einem Tipp. Es reicht, wenn jemand (unser Vorschlag: du) die Ersteinrichtung übernimmt und den automatischen Start aktiviert.",
    },
    {
      q: "Blockiert ein VPN gefälschte SMS und Betrug?",
      a: "Nicht vollständig, aber es hilft erheblich. NordVPN Threat Protection, Surfshark CleanWeb und Proton NetShield blockieren bekannte Phishing- und Betrugsseiten auf DNS-Ebene. Selbst wenn jemand auf einen als 'Banknachricht' getarnten Fake-Link tippt, öffnet sich die Seite meist gar nicht erst.",
    },
    {
      q: "Ist ein VPN auf dem Smartphone für Senioren nicht zu kompliziert?",
      a: "Nein. Die iPhone- und Android-Apps bestehen aus einem Bildschirm: großer Verbinden-Button + Länderauswahl. Ist die Auto-Verbindung aktiviert, muss der Nutzer nie manuell eingreifen — beim Einschalten ist er einfach verbunden.",
    },
    {
      q: "Kann ein versehentlicher Tastendruck Schaden anrichten?",
      a: "Nein. Ein falscher Tipp in der VPN-App trennt höchstens die Verbindung — der Internetzugang läuft weiter (sofern der Kill Switch nicht aktiv ist). Datenverlust oder finanzieller Schaden ist nicht möglich.",
    },
    {
      q: "Welches VPN soll ich für meine Mutter/meinen Vater einrichten?",
      a: "Surfshark oder NordVPN. Türkische Oberfläche, großer Verbinden-Button, automatischer Start, Inhaltsfilterung. ExpressVPN ist auch gut, aber teurer; die Zusatzfunktionen verpuffen bei älteren Nutzern.",
    },
  ],
  cards: [
    { title: "Mit einem Tipp verbinden", desc: "Großer Button, schlichte Oberfläche." },
    { title: "Phishing-Blockierung", desc: "Gefälschte Bank-/Paket-Links blockiert." },
    { title: "Türkische Sprache", desc: "Verständliche Oberfläche, Texte auf Türkisch." },
  ],
  related: {
    label: "Verwandte Seiten",
    links: [
      { href: "/ratgeber/was-ist-ein-vpn", text: "Was ist ein VPN?" },
      { href: "/ratgeber/vpn-fuer-familien", text: "VPN für Familien" },
      { href: "/sana-uygun-vpn", text: "Quiz: Das passende VPN für dich" },
    ],
  },
};

const CONTENT: Record<AppLocale, SeniorsContent> = { tr, en, de };

export function getSeniorsContent(locale: string): SeniorsContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
