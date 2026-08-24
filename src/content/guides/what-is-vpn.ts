// "VPN nedir?" flagship rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/guide/vpn-nedir/page.tsx) bu modülden render eder;
// yerelleştirilmiş URL'ler (/guide/vpn-nedir, /en/guide/what-is-a-vpn,
// /de/ratgeber/was-ist-ein-vpn) proxy rewrite ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

export type WhatIsVpnContent = {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  lede: string;
  breadcrumb: { home: string; guides: string; current: string };
  oneLine: { title: string; body: string };
  howItWorks: {
    h2: string;
    intro: string;
    beforeList: string[];
    afterIntro: string;
    afterList: string[];
  };
  protects: { h2: string; cards: { title: string; desc: string }[] };
  cantProtect: { h2: string; intro: string; items: BoldItem[] };
  whenUse: { h2: string; items: BoldItem[] };
  whenNoNeed: { h2: string; items: string[] };
  protocols: { h2: string; intro: string; items: BoldItem[] };
  choosing: {
    h2: string;
    intro: string;
    criteria: BoldItem[];
    closingBefore: string;
    closingLink: string;
    closingAfter: string;
  };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  nextStepLabel: string;
  nextStepLinks: { href: string; text: string }[];
};

const tr: WhatIsVpnContent = {
  metaTitle: "VPN Nedir? 5 Dakikalık Başlangıç Rehberi (2026)",
  metaDescription:
    "VPN'in ne olduğu, nasıl çalıştığı, seni neye karşı koruduğu ve hangi durumlarda kullanman gerektiği — basit ve net anlatım.",
  badge: "Başlangıç rehberi",
  h1: "VPN nedir?",
  lede: "5 dakikada VPN'in ne olduğunu, nasıl çalıştığını ve seni neye karşı koruduğunu net şekilde anlatıyoruz.",
  breadcrumb: { home: "Ana sayfa", guides: "Rehberler", current: "VPN nedir?" },
  oneLine: {
    title: "Tek cümlede VPN",
    body: "VPN (Virtual Private Network), internet trafiğini şifreleyerek bir ara sunucu üzerinden yönlendiren ve böylece kimliğini ve verilerini gizleyen bir teknolojidir.",
  },
  howItWorks: {
    h2: "VPN nasıl çalışır?",
    intro:
      "Normalde internete bağlandığında, cihazından çıkan veri doğrudan internet servis sağlayıcına (ISP'ye) gider; ISP de bu veriyi hedef siteye yönlendirir. Bu süreçte:",
    beforeList: [
      "ISP, hangi siteleri ziyaret ettiğini görür.",
      "Halka açık Wi-Fi'deki diğer kullanıcılar trafiğini izleyebilir.",
      "Hedef site, gerçek IP adresini görür.",
    ],
    afterIntro: "VPN aktifken bu akış değişir:",
    afterList: [
      "Cihazın, VPN uygulaması aracılığıyla VPN sunucusuna şifreli bir tünel kurar.",
      "Tüm internet trafiğin bu tünelden geçer. ISP yalnızca \u201cşifreli veri VPN sunucusuna gidiyor\u201d görür — içeriği göremez.",
      "VPN sunucusu trafiği çözer ve hedef siteye yönlendirir. Hedef site, gerçek IP'ni değil VPN sunucusunun IP'sini görür.",
      "Yanıt aynı yoldan, şifrelenmiş olarak sana döner.",
    ],
  },
  protects: {
    h2: "VPN seni neye karşı korur?",
    cards: [
      {
        title: "ISP gözetimi",
        desc: "ISP'n hangi siteleri ziyaret ettiğini, ne aradığını veya hangi içerikleri tükettiğini göremez.",
      },
      {
        title: "Halka açık Wi-Fi",
        desc: "Otel, kafe, havaalanı ağlarındaki diğer kullanıcılar trafiğini dinleyemez.",
      },
      {
        title: "IP bazlı takip",
        desc: "Web siteleri gerçek IP'n yerine VPN sunucusunun IP'sini görür. Coğrafi konumun maskelenir.",
      },
    ],
  },
  cantProtect: {
    h2: "VPN'in koruyamadığı şeyler",
    intro: "VPN bir sihirli değnek değildir. Şunlara karşı korumaz:",
    items: [
      {
        bold: "Tarayıcı parmak izi:",
        text: " Tarayıcı, ekran çözünürlüğü, tipografi gibi bilgiler birleşince seni hâlâ tanıyabilir.",
      },
      {
        bold: "Cookies (çerezler):",
        text: " Eğer Google'a giriş yaptıysan, Google seni VPN üzerinden de tanır.",
      },
      {
        bold: "Bilinçli verdiğin bilgiler:",
        text: " Bir forma adını yazarsan, VPN bunu engelleyemez.",
      },
      {
        bold: "Zararlı yazılım:",
        text: " VPN, bilgisayarına zararlı yazılım bulaşmasını engellemez (antivirus farklı bir araç).",
      },
      {
        bold: "Phishing:",
        text: " Sahte siteye bilgi girersen, VPN seni bu hatadan kurtaramaz.",
      },
    ],
  },
  whenUse: {
    h2: "Hangi durumlarda VPN kullanmalısın?",
    items: [
      {
        bold: "Halka açık Wi-Fi kullanırken",
        text: " (otel, kafe, havaalanı) — pasif dinlemeye karşı koruma.",
      },
      {
        bold: "Yurt dışındayken",
        text: " — evdeki içeriklere (BluTV, Exxen, Netflix TR, bankacılık) erişim için.",
      },
      {
        bold: "Gizlilik öncelikli",
        text: " olduğunda — ISP'nin tarama geçmişini görmemesi için.",
      },
      {
        bold: "Kısıtlayıcı ağlarda",
        text: " — bazı işyeri/üniversite ağlarında engellenmiş sitelere erişim.",
      },
      {
        bold: "Coğrafi kısıtlamayı aşmak",
        text: " için — Netflix US kütüphanesine erişmek gibi.",
      },
    ],
  },
  whenNoNeed: {
    h2: "Hangi durumlarda VPN'e ihtiyacın yok?",
    items: [
      "Sadece evdeki güvenli Wi-Fi'den, sosyal medyada vakit geçirmek için.",
      "Banka uygulamasında işlem yaparken (bazı bankalar VPN tespit ederse oturumu kapatabilir).",
    ],
  },
  protocols: {
    h2: "VPN protokolleri nedir?",
    intro:
      "Protokol, VPN tünelinin nasıl kurulduğunu belirleyen teknik standardı ifade eder. En yaygın olanlar:",
    items: [
      { bold: "WireGuard:", text: " Modern, hızlı, küçük kod tabanı. 2026'da altın standart." },
      { bold: "OpenVPN:", text: " Daha eski, daha yavaş ama çok yaygın destek." },
      {
        bold: "Lightway",
        text: " (ExpressVPN'in özel protokolü): WireGuard ile rekabetçi, hızlı bağlantı kurulumu.",
      },
      {
        bold: "NordLynx",
        text: " (NordVPN'in özel protokolü): WireGuard tabanlı, optimize edilmiş.",
      },
    ],
  },
  choosing: {
    h2: "İlk VPN'ini seçerken",
    intro: "Üç temel kriter:",
    criteria: [
      {
        bold: "Bağımsız denetim geçmişi:",
        text: " Sağlayıcının no-logs iddiası üçüncü bir taraf tarafından doğrulanmış mı?",
      },
      {
        bold: "Yargı yetkisi:",
        text: " Sağlayıcı hangi ülke yasalarına tabi? 14 Eyes ittifakı dışı (Panama, İsviçre, Romanya) tercih edilir.",
      },
      {
        bold: "Senin kullanım senaryona uyum:",
        text: " Streaming mi, gizlilik mi, çok cihaz mı?",
      },
    ],
    closingBefore: "Bu üç kriteri kaynak temelli inceleyen ",
    closingLink: "VPN bilgi rehberimize",
    closingAfter: " göz at.",
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "VPN'in açılımı ne?",
      a: "VPN, 'Virtual Private Network' (Sanal Özel Ağ) ifadesinin kısaltmasıdır.",
    },
    {
      q: "VPN'i kim kullanmalı?",
      a: "Halka açık Wi-Fi kullanan herkes, gizliliğini önemseyen kullanıcılar, yurt dışındaki Türkler, uzaktan çalışanlar ve seyahat edenler VPN'den fayda görür.",
    },
    {
      q: "VPN ücretsiz mi?",
      a: "Ücretsiz VPN'ler var ama çoğu güvensiz (veri satarlar, reklam enjekte ederler). Proton VPN'in ücretsiz planı istisnadır. Genelde ücretli bir VPN gizlilik ve güvenlik için daha güvenli.",
    },
    {
      q: "VPN internetimi yavaşlatır mı?",
      a: "Sabit bir hız kaybı oranı vermek güvenilir değildir. Sonuç; sunucu mesafesi, protokol, cihaz, ISS rotası ve sunucu yüküne göre değişir; kendi bağlantınızda VPN kapalı/açık karşılaştırması yapın.",
    },
    {
      q: "VPN beni tamamen anonim yapar mı?",
      a: "Hayır. VPN, ISP'nin ve halka açık ağdaki diğer kullanıcıların seni izlemesini engeller ama %100 anonimlik sağlamaz. Tarayıcı parmak izi, cookie ve giriş yaptığın hesaplar üzerinden hâlâ izlenebilirsin.",
    },
  ],
  nextStepLabel: "Sıradaki adım",
  nextStepLinks: [
    { href: "/vpn-reviews", text: "VPN sağlayıcı karşılaştırmaları" },
    { href: "/guide/ucretsiz-vs-ucretli-vpn", text: "Ücretsiz vs Ücretli VPN" },
    {
      href: "/guide/vpn-guvenlik-kontrol-listesi",
      text: "VPN güvenlik kontrol listesi",
    },
  ],
};

const en: WhatIsVpnContent = {
  metaTitle: "What Is a VPN? A 5-Minute Starter Guide (2026)",
  metaDescription:
    "What a VPN is, how it works, what it protects you from and when you should use one — explained simply and clearly.",
  badge: "Starter guide",
  h1: "What is a VPN?",
  lede: "In five minutes we explain clearly what a VPN is, how it works and what it actually protects you from.",
  breadcrumb: { home: "Home", guides: "Guides", current: "What is a VPN?" },
  oneLine: {
    title: "A VPN in one sentence",
    body: "A VPN (Virtual Private Network) is a technology that encrypts your internet traffic and routes it through an intermediary server, hiding your identity and your data.",
  },
  howItWorks: {
    h2: "How does a VPN work?",
    intro:
      "Normally, when you connect to the internet the data leaving your device goes straight to your internet service provider (ISP), which forwards it to the destination site. Along the way:",
    beforeList: [
      "Your ISP sees which sites you visit.",
      "Other users on public Wi-Fi can monitor your traffic.",
      "The destination site sees your real IP address.",
    ],
    afterIntro: "With a VPN active, this flow changes:",
    afterList: [
      "Through the VPN app, your device builds an encrypted tunnel to the VPN server.",
      "All of your internet traffic passes through this tunnel. Your ISP only sees \u201cencrypted data going to a VPN server\u201d — it cannot see the contents.",
      "The VPN server decrypts the traffic and forwards it to the destination site. The site sees the VPN server's IP, not your real one.",
      "The response comes back to you along the same path, encrypted.",
    ],
  },
  protects: {
    h2: "What does a VPN protect you from?",
    cards: [
      {
        title: "ISP surveillance",
        desc: "Your ISP cannot see which sites you visit, what you search for or what content you consume.",
      },
      {
        title: "Public Wi-Fi",
        desc: "Other users on hotel, café or airport networks cannot eavesdrop on your traffic.",
      },
      {
        title: "IP-based tracking",
        desc: "Websites see the VPN server's IP instead of your real one. Your geographic location is masked.",
      },
    ],
  },
  cantProtect: {
    h2: "What a VPN cannot protect you from",
    intro: "A VPN is not a magic wand. It does not protect against:",
    items: [
      {
        bold: "Browser fingerprinting:",
        text: " Combined signals like your browser, screen resolution and typography can still identify you.",
      },
      {
        bold: "Cookies:",
        text: " If you're signed in to Google, Google still recognizes you over a VPN.",
      },
      {
        bold: "Information you knowingly share:",
        text: " If you type your name into a form, a VPN can't stop that.",
      },
      {
        bold: "Malware:",
        text: " A VPN doesn't stop malware from infecting your computer (antivirus is a different tool).",
      },
      {
        bold: "Phishing:",
        text: " If you enter your details on a fake site, a VPN can't save you from that mistake.",
      },
    ],
  },
  whenUse: {
    h2: "When should you use a VPN?",
    items: [
      {
        bold: "On public Wi-Fi",
        text: " (hotel, café, airport) — protection against passive eavesdropping.",
      },
      {
        bold: "When abroad",
        text: " — to reach content from home (BluTV, Exxen, Netflix TR, banking).",
      },
      {
        bold: "When privacy matters",
        text: " — so your ISP can't see your browsing history.",
      },
      {
        bold: "On restrictive networks",
        text: " — to reach sites blocked on some workplace or university networks.",
      },
      {
        bold: "To bypass geo-restrictions",
        text: " — such as accessing the US Netflix library.",
      },
    ],
  },
  whenNoNeed: {
    h2: "When don't you need a VPN?",
    items: [
      "Just spending time on social media over your secure home Wi-Fi.",
      "Doing transactions in a banking app (some banks may end the session if they detect a VPN).",
    ],
  },
  protocols: {
    h2: "What are VPN protocols?",
    intro:
      "A protocol is the technical standard that defines how the VPN tunnel is established. The most common ones are:",
    items: [
      { bold: "WireGuard:", text: " Modern, fast, small code base. The gold standard in 2026." },
      { bold: "OpenVPN:", text: " Older and slower, but very widely supported." },
      {
        bold: "Lightway",
        text: " (ExpressVPN's proprietary protocol): competitive with WireGuard, fast connection setup.",
      },
      {
        bold: "NordLynx",
        text: " (NordVPN's proprietary protocol): WireGuard-based and optimized.",
      },
    ],
  },
  choosing: {
    h2: "Choosing your first VPN",
    intro: "Three core criteria:",
    criteria: [
      {
        bold: "Independent audit history:",
        text: " Has the provider's no-logs claim been verified by a third party?",
      },
      {
        bold: "Jurisdiction:",
        text: " Which country's laws is the provider subject to? Outside the 14 Eyes alliance (Panama, Switzerland, Romania) is preferable.",
      },
      {
        bold: "Fit for your use case:",
        text: " Streaming, privacy or many devices?",
      },
    ],
    closingBefore: "For provider profiles organized around these criteria, read our ",
    closingLink: "VPN information guide",
    closingAfter: ".",
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "What does VPN stand for?",
      a: "VPN is short for 'Virtual Private Network'.",
    },
    {
      q: "Who should use a VPN?",
      a: "Anyone using public Wi-Fi, privacy-conscious users, people living abroad, remote workers and travelers all benefit from a VPN.",
    },
    {
      q: "Is a VPN free?",
      a: "Free VPNs exist, but most are unsafe (they sell data or inject ads). Proton VPN's free plan is an exception. In general a paid VPN is safer for privacy and security.",
    },
    {
      q: "Does a VPN slow down my internet?",
      a: "Modern VPNs usually cause a 5–15% speed loss. Server distance and protocol choice are the biggest factors.",
    },
    {
      q: "Does a VPN make me completely anonymous?",
      a: "No. A VPN stops your ISP and other users on a public network from watching you, but it doesn't provide 100% anonymity. You can still be tracked via browser fingerprinting, cookies and the accounts you log in to.",
    },
  ],
  nextStepLabel: "Next step",
  nextStepLinks: [
    { href: "/vpn-reviews", text: "VPN provider comparisons" },
    { href: "/guide/free-vs-paid-vpn", text: "Free vs paid VPN" },
    {
      href: "/guide/vpn-security-checklist",
      text: "VPN security checklist",
    },
  ],
};

const de: WhatIsVpnContent = {
  metaTitle: "Was ist ein VPN? Ein 5-Minuten-Einsteigerleitfaden (2026)",
  metaDescription:
    "Was ein VPN ist, wie es funktioniert, wovor es dich schützt und wann du es nutzen solltest — einfach und klar erklärt.",
  badge: "Einsteigerleitfaden",
  h1: "Was ist ein VPN?",
  lede: "In fünf Minuten erklären wir klar, was ein VPN ist, wie es funktioniert und wovor es dich tatsächlich schützt.",
  breadcrumb: { home: "Startseite", guides: "Ratgeber", current: "Was ist ein VPN?" },
  oneLine: {
    title: "Ein VPN in einem Satz",
    body: "Ein VPN (Virtual Private Network) ist eine Technologie, die deinen Internetverkehr verschlüsselt und über einen Zwischenserver leitet und so deine Identität und deine Daten verbirgt.",
  },
  howItWorks: {
    h2: "Wie funktioniert ein VPN?",
    intro:
      "Normalerweise gehen die Daten, die dein Gerät verlassen, direkt an deinen Internetanbieter (ISP), der sie an die Zielseite weiterleitet. Dabei gilt:",
    beforeList: [
      "Dein ISP sieht, welche Seiten du besuchst.",
      "Andere Nutzer im öffentlichen WLAN können deinen Datenverkehr mitlesen.",
      "Die Zielseite sieht deine echte IP-Adresse.",
    ],
    afterIntro: "Mit aktivem VPN ändert sich dieser Ablauf:",
    afterList: [
      "Über die VPN-App baut dein Gerät einen verschlüsselten Tunnel zum VPN-Server auf.",
      "Dein gesamter Internetverkehr läuft durch diesen Tunnel. Dein ISP sieht nur \u201everschlüsselte Daten gehen an einen VPN-Server\u201c — den Inhalt sieht er nicht.",
      "Der VPN-Server entschlüsselt den Verkehr und leitet ihn an die Zielseite weiter. Die Seite sieht die IP des VPN-Servers, nicht deine echte.",
      "Die Antwort kommt verschlüsselt auf demselben Weg zu dir zurück.",
    ],
  },
  protects: {
    h2: "Wovor schützt dich ein VPN?",
    cards: [
      {
        title: "ISP-Überwachung",
        desc: "Dein ISP kann nicht sehen, welche Seiten du besuchst, wonach du suchst oder welche Inhalte du nutzt.",
      },
      {
        title: "Öffentliches WLAN",
        desc: "Andere Nutzer in Hotel-, Café- oder Flughafennetzen können deinen Verkehr nicht abhören.",
      },
      {
        title: "IP-basiertes Tracking",
        desc: "Websites sehen die IP des VPN-Servers statt deiner echten. Dein Standort wird maskiert.",
      },
    ],
  },
  cantProtect: {
    h2: "Wovor ein VPN dich nicht schützt",
    intro: "Ein VPN ist kein Zauberstab. Es schützt nicht vor:",
    items: [
      {
        bold: "Browser-Fingerprinting:",
        text: " Kombinierte Merkmale wie Browser, Bildschirmauflösung und Typografie können dich weiterhin identifizieren.",
      },
      {
        bold: "Cookies:",
        text: " Wenn du bei Google angemeldet bist, erkennt Google dich auch über ein VPN.",
      },
      {
        bold: "Bewusst preisgegebene Daten:",
        text: " Wenn du deinen Namen in ein Formular eingibst, kann ein VPN das nicht verhindern.",
      },
      {
        bold: "Schadsoftware:",
        text: " Ein VPN verhindert keine Malware-Infektion deines Rechners (Antivirus ist ein anderes Werkzeug).",
      },
      {
        bold: "Phishing:",
        text: " Wenn du Daten auf einer gefälschten Seite eingibst, kann ein VPN dich vor diesem Fehler nicht bewahren.",
      },
    ],
  },
  whenUse: {
    h2: "Wann solltest du ein VPN nutzen?",
    items: [
      {
        bold: "In öffentlichem WLAN",
        text: " (Hotel, Café, Flughafen) — Schutz vor passivem Mitlesen.",
      },
      {
        bold: "Im Ausland",
        text: " — um auf Inhalte von zu Hause zuzugreifen (BluTV, Exxen, Netflix TR, Banking).",
      },
      {
        bold: "Wenn Datenschutz Priorität hat",
        text: " — damit dein ISP deinen Verlauf nicht sieht.",
      },
      {
        bold: "In restriktiven Netzwerken",
        text: " — um in manchen Arbeits- oder Uni-Netzen gesperrte Seiten zu erreichen.",
      },
      {
        bold: "Zum Umgehen von Geo-Sperren",
        text: " — etwa für die US-Netflix-Bibliothek.",
      },
    ],
  },
  whenNoNeed: {
    h2: "Wann brauchst du kein VPN?",
    items: [
      "Wenn du nur in deinem sicheren Heim-WLAN auf Social Media bist.",
      "Bei Transaktionen in einer Banking-App (manche Banken beenden die Sitzung, wenn sie ein VPN erkennen).",
    ],
  },
  protocols: {
    h2: "Was sind VPN-Protokolle?",
    intro:
      "Ein Protokoll ist der technische Standard, der festlegt, wie der VPN-Tunnel aufgebaut wird. Die gängigsten sind:",
    items: [
      { bold: "WireGuard:", text: " Modern, schnell, kleine Codebasis. Der Goldstandard 2026." },
      { bold: "OpenVPN:", text: " Älter und langsamer, aber sehr weit verbreitet." },
      {
        bold: "Lightway",
        text: " (ExpressVPNs eigenes Protokoll): konkurrenzfähig mit WireGuard, schneller Verbindungsaufbau.",
      },
      {
        bold: "NordLynx",
        text: " (NordVPNs eigenes Protokoll): WireGuard-basiert und optimiert.",
      },
    ],
  },
  choosing: {
    h2: "Dein erstes VPN auswählen",
    intro: "Drei Kernkriterien:",
    criteria: [
      {
        bold: "Unabhängige Audit-Historie:",
        text: " Wurde die No-Logs-Behauptung des Anbieters von Dritten geprüft?",
      },
      {
        bold: "Gerichtsbarkeit:",
        text: " Welchem Landesrecht unterliegt der Anbieter? Außerhalb der 14-Eyes-Allianz (Panama, Schweiz, Rumänien) ist vorzuziehen.",
      },
      {
        bold: "Passend zu deinem Anwendungsfall:",
        text: " Streaming, Datenschutz oder viele Geräte?",
      },
    ],
    closingBefore: "Für quellenbasierte Anbieterprofile zu diesen Kriterien lesen Sie unseren ",
    closingLink: "VPN-Informationsratgeber",
    closingAfter: ".",
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Wofür steht VPN?",
      a: "VPN ist die Abkürzung für 'Virtual Private Network' (virtuelles privates Netzwerk).",
    },
    {
      q: "Wer sollte ein VPN nutzen?",
      a: "Alle, die öffentliches WLAN nutzen, datenschutzbewusste Nutzer, im Ausland lebende Menschen, Remote-Arbeitende und Reisende profitieren von einem VPN.",
    },
    {
      q: "Ist ein VPN kostenlos?",
      a: "Es gibt kostenlose VPNs, aber die meisten sind unsicher (sie verkaufen Daten oder schalten Werbung). Der kostenlose Tarif von Proton VPN ist eine Ausnahme. In der Regel ist ein kostenpflichtiges VPN für Datenschutz und Sicherheit sicherer.",
    },
    {
      q: "Verlangsamt ein VPN mein Internet?",
      a: "Moderne VPNs verursachen meist 5–15 % Geschwindigkeitsverlust. Serverentfernung und Protokollwahl sind die größten Faktoren.",
    },
    {
      q: "Macht mich ein VPN völlig anonym?",
      a: "Nein. Ein VPN hindert deinen ISP und andere Nutzer in einem öffentlichen Netz daran, dich zu beobachten, bietet aber keine 100%ige Anonymität. Über Browser-Fingerprinting, Cookies und angemeldete Konten kannst du weiterhin verfolgt werden.",
    },
  ],
  nextStepLabel: "Nächster Schritt",
  nextStepLinks: [
    { href: "/vpn-reviews", text: "VPN-Anbietervergleich" },
    { href: "/ratgeber/kostenloses-vs-kostenpflichtiges-vpn", text: "Kostenlos vs. kostenpflichtig" },
    {
      href: "/ratgeber/vpn-sicherheits-checkliste",
      text: "VPN-Sicherheits-Checkliste",
    },
  ],
};

const CONTENT: Record<AppLocale, WhatIsVpnContent> = { tr, en, de };

export function getWhatIsVpnContent(locale: string): WhatIsVpnContent {
  return CONTENT[(locale as AppLocale)] ?? CONTENT.tr;
}
