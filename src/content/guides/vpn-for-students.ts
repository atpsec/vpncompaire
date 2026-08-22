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
  lede: "Kampüs Wi-Fi güvenliği, yurt dışı staj/değişim, akademik kaynak erişimi ve öğrenci bütçesi için 3 VPN profili — resmi kaynaklar ve özellik karşılaştırmasına dayalı.",
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
      label: "Türkiye konumu + protokol seçenekleri",
      reason:
        "Sağlayıcı verisine göre Türkiye sunucusu mevcut; Erasmus/değişimde Türk bankacılığı ve BluTV erişimi için değerlendirilebilir. Kampüs Wi-Fi performansı ağ yöneticisi, rota ve sunucu yüküne göre değişir.",
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
    p: "Yurt, kampüs ve kütüphane Wi-Fi ağları çok sayıda cihaz tarafından paylaşılır ve ağ yapılandırması kurumdan kuruma değişir. VPN, cihaz ile VPN sunucusu arasındaki trafiğe şifreli bir tünel ekleyebilir; DNS, kill switch ve otomatik bağlantı davranışını kendi kampüs ağında ve cihazında doğrulamalısın.",
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
        text: " Sağlayıcının güncel Türkiye konumu bazı hizmetlerde değerlendirilebilir; banka ve yayın servisleri ek konum, hesap ve VPN kontrolleri uygulayabilir.",
      },
      {
        bold: "VPN engellenen ağlarda:",
        text: " Bazı kampüs ağları siteleri veya VPN protokollerini kısıtlar. Kurum politikasını ve sağlayıcının obfuscation desteğini kontrol edip bağlantıyı kendi ağında dene.",
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
      text: " Üniversitenin kurumsal VPN'i, kütüphane belgelerinde bu amaçla yapılandırılmışsa kampüs IP'si üzerinden abonelik erişimi sağlayabilir. Ticari VPN akademik abonelik vermez; hesap yetkini ve kurulum adımlarını üniversitenin resmi belgelerinde doğrula.",
    },
  },
  abroad: {
    h2: "Yurt dışı değişim/staj programı senaryosu",
    intro: "Erasmus, Mevlana veya benzeri bir programda yurt dışındaysan:",
    items: [
      {
        bold: "Türk bankacılığı:",
        text: " Bankalar yabancı veya VPN IP'lerinde ek doğrulama isteyebilir. Türkiye konumunun hesabınla çalışacağını varsayma; bankanın güvenlik politikasını ve kendi hesabındaki davranışı doğrula.",
      },
      {
        bold: "BluTV, Exxen, TRT:",
        text: " Türkiye konumu bölgesel erişimde değerlendirilebilir; sağlayıcının konum listesini, yayın servisinin koşullarını ve hesabınla uyumluluğu kontrol et.",
      },
      {
        bold: "WhatsApp/Telegram engeli:",
        text: " Bazı ağlarda VPN protokolleri de engellenebilir. Sağlayıcının obfuscation belgelerini, yerel kuralları ve bağlantıyı kendi ağında kontrol et.",
      },
    ],
  },
  stepsHeading: "Yapılması gereken adımlar",
  howToSteps: [
    {
      name: "Bütçeni belirle",
      text: "Uzun dönem planın toplam maliyetini, iptal süresini ve yenileme fiyatını sağlayıcının ödeme ekranında karşılaştır; düşük tanıtım fiyatını sabit fiyat olarak varsayma.",
    },
    {
      name: "Cihaz sayını say",
      text: "Telefon + dizüstü + tablet en az 3 cihaz demek. Surfshark sınırsız, NordVPN 10 cihaz destekler.",
    },
    {
      name: "Yurt dışına gidecek misin kontrol et",
      text: "Erasmus, staj veya değişim öncesinde sağlayıcının güncel Türkiye konumunu ve kullanacağın banka/yayın hesaplarıyla uyumluluğunu doğrula.",
    },
    {
      name: "Otomatik yenilemeyi kapat",
      text: "Tanıtım ve yenileme fiyatları farklı olabilir. Güncel yenileme tutarını sağlayıcının resmi hesabında kontrol et ve hatırlatıcı kur.",
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
      a: "Bu, ağın yapılandırmasına ve tehdit modeline bağlıdır. VPN cihaz ile VPN sunucusu arasındaki trafiği şifreleyebilir; kimlik avı, zararlı yazılım veya yanlış hesap izinlerini çözmez. Kurum politikasını kontrol et ve DNS/kill switch davranışını kendi ağında doğrula.",
    },
    {
      q: "Ücretsiz VPN öğrenci için yeterli mi?",
      a: "Ücretsiz planların veri kullanımı, hız, konum ve cihaz sınırları sağlayıcıya göre değişir. Proton VPN ücretsiz planı için sağlayıcının güncel gizlilik politikasını, açık kaynak istemci bilgisini ve resmi limitleri kontrol et; hiçbir planı yalnızca ücretsiz olduğu için güvenli veya güvensiz sayma.",
    },
    {
      q: "Yurt dışı staj/değişim programında VPN gerekli mi?",
      a: "Türkiye konumu bazı banka ve yayın hizmetlerinde değerlendirilebilir, ancak erişim garantisi vermez. Sağlayıcının güncel sunucu listesini, hizmet koşullarını ve kendi hesabındaki ek doğrulama davranışını seyahatten önce kontrol et.",
    },
  ],
  cards: [
    { title: "Kampüs Wi-Fi", desc: "Açık ağda login bilgilerini şifrele." },
    {
      title: "Yurt dışı erişim",
      desc: "Erasmus'ta Türkiye bankacılığı ve BluTV.",
    },
    { title: "Kişisel veri", desc: "Trafiği ISP ile VPN sunucusu arasında tünelle." },
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
  lede: "Three VPN profiles for campus Wi-Fi, internships and exchanges abroad, academic resource access and a student budget — based on official features and policy comparisons.",
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
      label: "Türkiye location + protocol options",
      reason:
        "Provider data lists a Türkiye location, which may be worth considering for Turkish banking and BluTV during an exchange. Campus performance varies with network policy, route and server load; verify the location and test it on your own network and accounts.",
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
    p: "Dorm, campus and library Wi-Fi networks are shared by many devices, and their configuration varies by institution. A VPN can add an encrypted tunnel between your device and the VPN server; verify DNS, kill-switch and auto-connect behavior on your own campus network and device.",
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
        text: " A current Türkiye location may be worth considering, but banks and streaming services can apply additional location, account and VPN checks.",
      },
      {
        bold: "On networks with blocks:",
        text: " Some campus networks restrict sites or VPN protocols. Check institutional policy and provider obfuscation support, then test the connection on your own network.",
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
      text: " Your university's institutional VPN may provide access through a campus IP when the library documents it for that purpose. A commercial VPN does not grant an academic subscription; verify your entitlement and setup in official university documentation.",
    },
  },
  abroad: {
    h2: "The exchange/internship abroad scenario",
    intro: "If you're abroad on Erasmus, Mevlana or a similar program:",
    items: [
      {
        bold: "Turkish banking:",
        text: " Banks may request extra verification for foreign or VPN IPs. Do not assume a Türkiye location will work with your account; check the bank's security policy and test your own account.",
      },
      {
        bold: "BluTV, Exxen, TRT:",
        text: " A Türkiye location may be relevant to regional access; check the provider's location list, the service terms and compatibility with your account.",
      },
      {
        bold: "WhatsApp/Telegram blocks:",
        text: " Some networks also block VPN protocols. Review the provider's obfuscation documentation, local rules and connection behavior on your own network.",
      },
    ],
  },
  stepsHeading: "Steps to take",
  howToSteps: [
    {
      name: "Set your budget",
      text: "Compare the total cost, cancellation window and renewal price on the provider's checkout page; do not treat an introductory monthly equivalent as a fixed price.",
    },
    {
      name: "Count your devices",
      text: "Phone + laptop + tablet means at least 3 devices. Surfshark supports unlimited devices, NordVPN 10.",
    },
    {
      name: "Check whether you're going abroad",
      text: "Before an exchange or internship, verify the provider's current Türkiye location and compatibility with the banking or streaming accounts you plan to use.",
    },
    {
      name: "Turn off auto-renewal",
      text: "Introductory and renewal prices can differ. Check the current renewal amount in the provider's official account area and set a reminder.",
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
      a: "It depends on the network configuration and your threat model. A VPN can encrypt traffic between your device and the VPN server, but it does not solve phishing, malware or incorrect account permissions. Check campus policy and verify DNS and kill-switch behavior on your network.",
    },
    {
      q: "Is a free VPN enough for a student?",
      a: "Data practices, speed, locations and device limits vary among free plans. For Proton VPN's free plan, review the provider's current privacy policy, open-source client information and official limits; do not treat any plan as safe or unsafe solely because it is free.",
    },
    {
      q: "Do I need a VPN for an internship/exchange program abroad?",
      a: "A Türkiye location may be useful for some banking or streaming services, but it does not guarantee access. Before traveling, check the provider's current server list, service terms and any extra verification on your own account.",
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
      desc: "Tunnel traffic between your ISP and the VPN server.",
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
  lede: "Drei VPN-Profile für Campus-WLAN, Auslandspraktikum und Austausch, akademische Quellen und das Studentenbudget — auf Basis offizieller Funktionen und Richtlinien.",
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
      label: "Türkei-Standort + Protokolloptionen",
      reason:
        "Laut Anbieterdaten ist ein Türkei-Standort verfügbar; für türkisches Banking und BluTV während Erasmus oder Austausch kann er relevant sein. Die Campus-Leistung hängt von Netzregeln, Route und Serverlast ab; prüfe Standort und Verhalten im eigenen Netz und Konto.",
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
    p: "WLAN-Netze in Wohnheim, Campus und Bibliothek werden von vielen Geräten geteilt und sind je nach Einrichtung unterschiedlich konfiguriert. Ein VPN kann einen verschlüsselten Tunnel zwischen Gerät und VPN-Server ergänzen; prüfe DNS, Kill Switch und Auto-Verbindung in deinem Campus-Netz und auf deinem Gerät.",
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
        text: " Ein aktueller Türkei-Standort kann relevant sein; Banken und Streamingdienste können zusätzliche Standort-, Konto- und VPN-Prüfungen einsetzen.",
      },
      {
        bold: "In Netzwerken mit Sperren:",
        text: " Manche Campus-Netze sperren Seiten oder VPN-Protokolle. Prüfe Hochschulrichtlinie und Verschleierungsunterstützung des Anbieters und teste die Verbindung im eigenen Netz.",
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
      text: " Das institutionelle VPN deiner Universität kann über eine Campus-IP Zugriff bieten, wenn die Bibliothek es dafür dokumentiert. Ein kommerzielles VPN gewährt kein akademisches Abo; prüfe Berechtigung und Einrichtung in der offiziellen Uni-Dokumentation.",
    },
  },
  abroad: {
    h2: "Das Szenario Auslandsaustausch/Praktikum",
    intro:
      "Wenn du mit Erasmus, Mevlana oder einem ähnlichen Programm im Ausland bist:",
    items: [
      {
        bold: "Türkisches Banking:",
        text: " Banken können bei ausländischen oder VPN-IPs zusätzliche Prüfungen verlangen. Setze nicht voraus, dass ein Türkei-Standort mit deinem Konto funktioniert; prüfe Bankrichtlinie und Konto selbst.",
      },
      {
        bold: "BluTV, Exxen, TRT:",
        text: " Ein Türkei-Standort kann für regionalen Zugriff relevant sein; prüfe Standortliste, Nutzungsbedingungen und Kompatibilität mit deinem Konto.",
      },
      {
        bold: "WhatsApp/Telegram-Sperren:",
        text: " Manche Netze blockieren auch VPN-Protokolle. Prüfe Verschleierungsdokumentation, lokale Regeln und das Verhalten in deinem eigenen Netz.",
      },
    ],
  },
  stepsHeading: "Diese Schritte solltest du gehen",
  howToSteps: [
    {
      name: "Lege dein Budget fest",
      text: "Vergleiche Gesamtkosten, Widerrufsfrist und Verlängerungspreis auf der Zahlungsseite des Anbieters; behandle einen Einführungspreis nicht als festen Monatspreis.",
    },
    {
      name: "Zähle deine Geräte",
      text: "Handy + Laptop + Tablet heißt mindestens 3 Geräte. Surfshark unterstützt unbegrenzt viele Geräte, NordVPN 10.",
    },
    {
      name: "Prüfe, ob du ins Ausland gehst",
      text: "Prüfe vor Erasmus, Praktikum oder Austausch den aktuellen Türkei-Standort des Anbieters und die Kompatibilität mit deinen Bank- und Streamingkonten.",
    },
    {
      name: "Schalte die automatische Verlängerung aus",
      text: "Einführungs- und Verlängerungspreis können abweichen. Prüfe den aktuellen Betrag im offiziellen Kundenkonto und setze eine Erinnerung.",
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
      a: "Das hängt von Netzkonfiguration und Bedrohungsmodell ab. Ein VPN kann den Verkehr zwischen Gerät und VPN-Server verschlüsseln, löst aber weder Phishing noch Malware oder falsche Kontorechte. Prüfe Campus-Richtlinie sowie DNS und Kill Switch in deinem Netz.",
    },
    {
      q: "Reicht ein kostenloses VPN für Studenten?",
      a: "Datenpraxis, Tempo, Standorte und Gerätelimits unterscheiden sich bei kostenlosen Tarifen. Prüfe für Proton VPN die aktuelle Datenschutzrichtlinie, Angaben zum Open-Source-Client und offizielle Limits; bewerte keinen Tarif allein wegen seines Preises als sicher oder unsicher.",
    },
    {
      q: "Brauche ich für Auslandspraktikum/Austausch ein VPN?",
      a: "Ein Türkei-Standort kann bei manchen Bank- oder Streamingdiensten nützlich sein, garantiert aber keinen Zugriff. Prüfe vor der Reise die aktuelle Serverliste, Nutzungsbedingungen und zusätzliche Verifizierung in deinem Konto.",
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
      desc: "Tunnel den Verkehr zwischen ISP und VPN-Server.",
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
