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
    title: "Risk ve koruma sınırı",
    body: "Yaşlı kullanıcılar sahte banka, kargo ve destek mesajlarıyla hedef alınabilir. Bazı VPN sağlayıcıları, bilinen zararlı alan adlarını filtreleyen isteğe bağlı araçlar belgeler; bu araçlar her sahte siteyi veya sosyal mühendislik girişimini yakalama garantisi vermez. Özelliği etkinleştirip cihazda doğrulamak ve aile içi eğitimle desteklemek gerekir.",
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
        label: "Sade kullanım seçeneği",
        reason:
          "Sade uygulama ve sağlayıcı politikasına göre 7/24 canlı sohbet desteği sunan seçeneklerden. Türkçe destek bulunmayabilir; premium fiyat seviyesinde değerlendirme gerektirebilir.",
      },
    ],
  },
  features: {
    h2: "Yaşlılar için VPN'in en önemli özellikleri",
    oneClick: {
      h3: "1. Tek tıklamayla bağlantı",
      p: 'Sağlayıcıların resmi uygulama belgeleri NordVPN, Surfshark ve ExpressVPN için hızlı bağlantı düğmeleri gösterir. Arayüz cihaz ve sürüme göre değişebilir; satın almadan önce kullanılacak telefonda düğme boyutunu, ekran okuyucuyu ve bağlantı akışını dene.',
    },
    autoStart: {
      h3: "2. Otomatik başlatma",
      p: "Sağlayıcı belgelerinde otomatik bağlantı, uygulamanın belirli ağlarda tüneli kendiliğinden başlatmasını sağlar. İşletim sistemi güncellemeleri ve pil ayarları davranışı etkileyebilir; telefonu yeniden başlatıp bağlantı göstergesini ve kill switch'i doğrula.",
    },
    phishing: {
      h3: "3. Dolandırıcılık/phishing koruması",
      intro: "Sağlayıcıların belgelediği DNS tabanlı filtreleme seçenekleri:",
      items: [
        {
          bold: "NordVPN Threat Protection:",
          text: " Sağlayıcı, bilinen zararlı alan adlarını kendi tehdit listesine göre filtrelediğini belirtir; özellik ve kapsam plana ve platforma göre kontrol edilmelidir.",
        },
        {
          bold: "Surfshark CleanWeb:",
          text: " Sağlayıcı belgelerine göre reklam, phishing ve zararlı alan adı filtreleme sunar; tüm tehditleri yakaladığı varsayılmamalıdır.",
        },
        {
          bold: "Proton VPN NetShield:",
          text: " Sağlayıcı, DNS tabanlı filtreleme sunduğunu belirtir; platform desteğini ve açık kaynak istemci bilgisini resmi belgelerde doğrula.",
        },
      ],
    },
    language: {
      h3: "4. Türkçe arayüz",
      p: "Dil seçenekleri uygulama ve sürüme göre değişebilir. Sağlayıcının güncel dil listesini kullanılacak cihazın uygulama mağazası sürümünde doğrula; gerekirse deneme veya iade süresinde arayüzü kullanıcıyla birlikte kontrol et.",
    },
  },
  scams: {
    h2: "Yaşlı bireyi en çok hedef alan dolandırıcılık türleri",
    items: [
      {
        bold: "Sahte banka SMS'leri:",
        text: ' "Kart kullanım limitiniz aşıldı, bu linke tıklayın" — link sahte siteye gidebilir. Etkin bir DNS filtresi alan adını yalnızca tehdit listesinde bulunuyorsa engelleyebilir; SMS\'in kendisini doğrulamaz.',
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
        text: ' Sosyal medyada tanışan "asker" veya "dul kadın" — VPN tüneli bu ikna yöntemini tespit etmez; eğitim, hesap gizliliği ve para göndermeden önce bağımsız doğrulama gerekir.',
      },
    ],
    limitBold: "VPN sınırı:",
    limitText:
      " VPN, sosyal mühendislik yoluyla ikna edilip bilgi veya para paylaşılmasını önleyen bir garanti değildir. Aile içi eğitim, şüpheci yaklaşım ve banka/kurumla bağımsız doğrulama gerekir.",
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
        after: ': "Yeşil gösterge yalnızca VPN tünelinin açık olduğunu söyler; linkin veya dosyanın güvenli olduğunu söylemez".',
      },
    ],
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Yaşlı biri VPN'i tek başına kullanabilir mi?",
      a: "Sağlayıcı belgelerine göre NordVPN, Surfshark ve ExpressVPN hızlı bağlantı düğmesi sunar. Ancak arayüz ve otomatik bağlantı davranışı cihaz ve sürüme göre değişebilir; ilk kurulumu birlikte yapıp yeniden başlatma, bağlantı kesilmesi ve güncelleme sonrasını doğrula.",
    },
    {
      q: "VPN sahte SMS ve dolandırıcılığı engelliyor mu?",
      a: "VPN SMS'in sahte olup olmadığını belirlemez. Sağlayıcıların Threat Protection, CleanWeb ve NetShield belgeleri bilinen zararlı alan adları için filtreleme tanımlar; özellik açık olmalı ve alan adı tehdit listesinde bulunmalıdır. Kapsamı cihazda test et ve mesajı banka veya kurumun resmi kanalından ayrıca doğrula.",
    },
    {
      q: "Telefonda VPN yaşlılar için çok karmaşık değil mi?",
      a: "Karmaşıklık kullanıcıya, telefona ve uygulama sürümüne göre değişir. Sağlayıcının güncel ekranlarını cihazda dene; otomatik bağlantının yeniden başlatma ve Wi-Fi/mobil veri geçişinden sonra gerçekten etkin kaldığını doğrula.",
    },
    {
      q: "Yanlışlıkla bir tuşa basarsa zarar verir mi?",
      a: "Bağlantı düğmesine yanlışlıkla dokunmak tüneli kapatabilir; kill switch ayarına göre internet durabilir veya trafik VPN dışında devam edebilir. Veri ya da finansal güvenlik için garanti verilemez; temel ayarları kilitle, bildirimleri açık tut ve bu iki durumu cihazda birlikte dene.",
    },
    {
      q: "Hangi VPN'i annem/babam için kuralım?",
      a: "Surfshark ve NordVPN'in resmi belgelerinde hızlı bağlantı, otomatik bağlantı ve içerik filtreleme seçenekleri yer alır; ExpressVPN de sade kullanım odaklı değerlendirilebilir. Güncel Türkçe dil desteğini, plan kapsamını ve erişilebilirliği kullanılacak telefonda doğrula.",
    },
  ],
  cards: [
    { title: "Tek tıkla bağlan", desc: "Büyük buton, sade arayüz." },
    { title: "Phishing filtreleme", desc: "Bilinen zararlı alan adları için ek katman." },
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
    title: "Risk and protection limits",
    body: "Older users can be targeted by fake bank, delivery and support messages. Some VPN providers document optional tools that filter known malicious domains, but these tools do not guarantee detection of every fake site or social-engineering attempt. Enable and verify the feature on the device, and combine it with family guidance.",
  },
  picks: {
    heading: "Top 3 VPNs for seniors",
    subheading: "Ranked by ease of use, content filtering and price.",
    items: [
      {
        slug: "surfshark",
        label: "Clean-interface option",
        reason:
          "The provider documents a streamlined interface and Turkish language support. It describes CleanWeb as filtering known malicious domains; verify that the feature and language are available on the device and plan. The unlimited-devices policy may suit family use.",
      },
      {
        slug: "nordvpn",
        label: "Threat Protection",
        reason:
          "The provider's Threat Protection feature adds a layer of defense against fake bank SMS messages and phishing links. With its Turkish interface and simple operation, it is worth considering for older users.",
      },
      {
        slug: "expressvpn",
        label: "Simple-use option",
        reason:
          "The provider documents a streamlined app and 24/7 live chat. Turkish-language support may not be available, and the premium price point needs weighing; verify the current language and support options before subscribing.",
      },
    ],
  },
  features: {
    h2: "The features that matter most in a VPN for seniors",
    oneClick: {
      h3: "1. One-tap connection",
      p: 'Official app documentation for NordVPN, Surfshark and ExpressVPN shows quick-connect controls. Interfaces vary by device and version; before subscribing, test button size, screen-reader behavior and the connection flow on the phone that will be used.',
    },
    autoStart: {
      h3: "2. Automatic start-up",
      p: "Provider documentation describes auto-connect as starting the tunnel on selected networks. Operating-system updates and battery settings can affect it; restart the phone and verify the connection indicator and kill-switch behavior.",
    },
    phishing: {
      h3: "3. Scam/phishing protection",
      intro: "Provider-documented DNS-based filtering options:",
      items: [
        {
          bold: "NordVPN Threat Protection:",
          text: " The provider says it filters known malicious domains using its threat lists; feature availability and scope should be checked for the plan and platform.",
        },
        {
          bold: "Surfshark CleanWeb:",
          text: " Provider documentation describes ad, phishing and malicious-domain filtering; do not assume it catches every threat.",
        },
        {
          bold: "Proton VPN NetShield:",
          text: " The provider describes DNS-based filtering; verify platform support and open-source client information in its official documentation.",
        },
      ],
    },
    language: {
      h3: "4. Turkish interface",
      p: "Language options can vary by app and release. Verify the provider's current language list in the app-store version for the device, and review the interface with the user during any trial or refund period.",
    },
  },
  scams: {
    h2: "The scams that target older people the most",
    items: [
      {
        bold: "Fake bank SMS messages:",
        text: ' "Your card usage limit has been exceeded, click this link" — the link may lead to a fake site. An enabled DNS filter can block the domain only if it is on the threat list; it does not verify the SMS itself.',
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
        text: ' A "soldier" or "widow" met on social media — a VPN tunnel does not detect this persuasion tactic; education, account privacy and independent verification before sending money are essential.',
      },
    ],
    limitBold: "The VPN's limit:",
    limitText:
      " A VPN does not guarantee protection when someone is persuaded to share information or money. Family education, skepticism and independent verification with the bank or institution are still required.",
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
          ': "A green indicator only means the VPN tunnel is active; it does not mean a link or file is safe".',
      },
    ],
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Can an older person use a VPN on their own?",
      a: "Provider documentation for NordVPN, Surfshark and ExpressVPN shows quick-connect controls. The interface and auto-connect behavior can vary by device and release, so complete setup together and verify restart, disconnect and post-update behavior.",
    },
    {
      q: "Does a VPN block fake SMS messages and scams?",
      a: "A VPN does not determine whether an SMS is fake. Provider documentation for Threat Protection, CleanWeb and NetShield describes filtering of known malicious domains; the feature must be enabled and the domain must be on its list. Test the scope on the device and verify messages through the bank's or institution's official channel.",
    },
    {
      q: "Isn't a VPN on the phone too complicated for seniors?",
      a: "Complexity depends on the user, phone and app version. Try the current interface on the device, and verify that auto-connect remains active after restart and after switching between Wi-Fi and mobile data.",
    },
    {
      q: "Can they do any damage by pressing the wrong button?",
      a: "Accidentally pressing the connection control can close the tunnel; depending on kill-switch settings, internet access may stop or traffic may continue outside the VPN. No data or financial-safety guarantee is possible, so review the core settings, keep notifications on and test both states together.",
    },
    {
      q: "Which VPN should I set up for my mom/dad?",
      a: "Surfshark and NordVPN document quick connect, auto-connect and content-filtering options; ExpressVPN can also be considered for a streamlined interface. Verify current Turkish-language support, plan coverage and accessibility on the phone that will be used.",
    },
  ],
  cards: [
    { title: "One-tap connect", desc: "Big button, clean interface." },
    { title: "Phishing filtering", desc: "An extra layer for known malicious domains." },
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
    title: "Risiko und Schutzgrenzen",
    body: "Ältere Nutzer können mit gefälschten Bank-, Paket- und Supportnachrichten angegriffen werden. Einige VPN-Anbieter dokumentieren optionale Filter für bekannte schädliche Domains; sie garantieren jedoch nicht, jede Fake-Seite oder jeden Social-Engineering-Versuch zu erkennen. Aktiviere und prüfe die Funktion auf dem Gerät und ergänze sie durch Aufklärung.",
  },
  picks: {
    heading: "Die 3 besten VPNs für Senioren",
    subheading: "Bewertet nach Bedienkomfort, Inhaltsfilterung und Preis.",
    items: [
      {
        slug: "surfshark",
        label: "Option mit schlichter Oberfläche",
        reason:
          "Der Anbieter dokumentiert eine schlichte Oberfläche und türkische Sprachunterstützung. CleanWeb wird als Filter für bekannte schädliche Domains beschrieben; prüfe Funktion und Sprache auf Gerät und Tarif. Die Unlimited-Geräte-Richtlinie kann zur Familiennutzung passen.",
      },
      {
        slug: "nordvpn",
        label: "Threat Protection",
        reason:
          "Die Threat-Protection-Funktion des Anbieters bietet eine Schutzschicht gegen gefälschte Bank-SMS und Phishing-Links. Türkische Oberfläche und einfache Bedienung — für ältere Nutzer eine Überlegung wert.",
      },
      {
        slug: "expressvpn",
        label: "Option mit einfacher Bedienung",
        reason:
          "Der Anbieter dokumentiert eine schlanke App und 24/7-Live-Chat. Türkischsprachiger Support ist möglicherweise nicht verfügbar und der Premiumpreis muss abgewogen werden; prüfe aktuelle Sprach- und Supportoptionen vor dem Abschluss.",
      },
    ],
  },
  features: {
    h2: "Die wichtigsten VPN-Funktionen für Senioren",
    oneClick: {
      h3: "1. Verbindung mit einem Tipp",
      p: 'Die offizielle App-Dokumentation von NordVPN, Surfshark und ExpressVPN zeigt Schnellverbindungs-Schaltflächen. Oberfläche und Bedienung variieren nach Gerät und Version; teste vor dem Abschluss Schaltflächengröße, Screenreader und Verbindungsablauf auf dem verwendeten Smartphone.',
    },
    autoStart: {
      h3: "2. Automatischer Start",
      p: "Laut Anbieterdokumentation startet die Auto-Verbindung den Tunnel in ausgewählten Netzen. Betriebssystem-Updates und Akku-Einstellungen können sie beeinflussen; starte das Smartphone neu und prüfe Verbindungsanzeige sowie Kill Switch.",
    },
    phishing: {
      h3: "3. Betrugs-/Phishing-Schutz",
      intro: "Vom Anbieter dokumentierte DNS-basierte Filteroptionen:",
      items: [
        {
          bold: "NordVPN Threat Protection:",
          text: " Laut Anbieter werden bekannte schädliche Domains anhand eigener Bedrohungslisten gefiltert; Verfügbarkeit und Umfang sind für Tarif und Plattform zu prüfen.",
        },
        {
          bold: "Surfshark CleanWeb:",
          text: " Die Anbieterdokumentation beschreibt Werbe-, Phishing- und Schad-Domain-Filterung; nicht jede Bedrohung wird zwingend erkannt.",
        },
        {
          bold: "Proton VPN NetShield:",
          text: " Der Anbieter beschreibt DNS-basierte Filterung; prüfe Plattformunterstützung und Angaben zum Open-Source-Client in der offiziellen Dokumentation.",
        },
      ],
    },
    language: {
      h3: "4. Türkische Oberfläche",
      p: "Sprachoptionen können je nach App und Version variieren. Prüfe die aktuelle Sprachliste in der App-Store-Version des verwendeten Geräts und teste die Oberfläche während einer Test- oder Erstattungsfrist gemeinsam mit dem Nutzer.",
    },
  },
  scams: {
    h2: "Die Betrugsmaschen, die ältere Menschen am häufigsten treffen",
    items: [
      {
        bold: "Gefälschte Bank-SMS:",
        text: ' "Ihr Kartenlimit wurde überschritten, klicken Sie auf diesen Link" — der Link kann zu einer Fake-Seite führen. Ein aktiver DNS-Filter kann die Domain nur sperren, wenn sie auf der Bedrohungsliste steht; die SMS selbst prüft er nicht.',
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
        text: ' Der "Soldat" oder die "Witwe" aus sozialen Medien — ein VPN-Tunnel erkennt diese Überredungstaktik nicht; Aufklärung, Kontodatenschutz und unabhängige Prüfung vor Geldzahlungen sind nötig.',
      },
    ],
    limitBold: "Die Grenze des VPN:",
    limitText:
      " Ein VPN garantiert keinen Schutz, wenn jemand zur Weitergabe von Informationen oder Geld überredet wird. Aufklärung, Skepsis und unabhängige Prüfung bei Bank oder Institution bleiben erforderlich.",
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
          ' bei: "Eine grüne Anzeige bedeutet nur, dass der VPN-Tunnel aktiv ist; sie bestätigt nicht, dass ein Link oder eine Datei sicher ist".',
      },
    ],
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Kann ein älterer Mensch ein VPN allein bedienen?",
      a: "Die Anbieterdokumentation von NordVPN, Surfshark und ExpressVPN zeigt Schnellverbindungs-Schaltflächen. Oberfläche und Auto-Verbindung können je nach Gerät und Version variieren; richtet die App gemeinsam ein und prüft Neustart, Trennung und Verhalten nach Updates.",
    },
    {
      q: "Blockiert ein VPN gefälschte SMS und Betrug?",
      a: "Ein VPN erkennt nicht, ob eine SMS gefälscht ist. Die Anbieterdokumentation zu Threat Protection, CleanWeb und NetShield beschreibt Filter für bekannte schädliche Domains; die Funktion muss aktiv und die Domain gelistet sein. Teste den Umfang auf dem Gerät und bestätige Nachrichten über den offiziellen Kanal von Bank oder Institution.",
    },
    {
      q: "Ist ein VPN auf dem Smartphone für Senioren nicht zu kompliziert?",
      a: "Die Komplexität hängt von Nutzer, Smartphone und App-Version ab. Teste die aktuelle Oberfläche auf dem Gerät und prüfe, ob die Auto-Verbindung nach Neustart sowie beim Wechsel zwischen WLAN und Mobilfunk aktiv bleibt.",
    },
    {
      q: "Kann ein versehentlicher Tastendruck Schaden anrichten?",
      a: "Ein versehentlicher Tipp kann den Tunnel schließen; je nach Kill-Switch-Einstellung stoppt das Internet oder der Verkehr läuft außerhalb des VPN weiter. Eine Daten- oder Finanzsicherheitsgarantie ist nicht möglich: Prüft die Grundeinstellungen, lasst Hinweise aktiv und testet beide Zustände gemeinsam.",
    },
    {
      q: "Welches VPN soll ich für meine Mutter/meinen Vater einrichten?",
      a: "Surfshark und NordVPN dokumentieren Schnellverbindung, Auto-Verbindung und Inhaltsfilter; ExpressVPN kann ebenfalls wegen seiner schlichten Oberfläche erwogen werden. Prüfe aktuelle türkische Sprachunterstützung, Tarifumfang und Barrierefreiheit auf dem verwendeten Smartphone.",
    },
  ],
  cards: [
    { title: "Mit einem Tipp verbinden", desc: "Großer Button, schlichte Oberfläche." },
    { title: "Phishing-Filterung", desc: "Zusätzliche Schicht für bekannte schädliche Domains." },
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
