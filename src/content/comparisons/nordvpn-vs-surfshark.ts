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
      nord: "Panama merkezli; güncel gizlilik politikası ve denetim kapsamı birlikte incelenmeli",
      surf: "Hollanda merkezli; güncel gizlilik politikası ve denetim kapsamı birlikte incelenmeli",
      reasoning:
        "Merkez ülke tek başına gizlilik kanıtı değildir. Sağlayıcı beyanlarını bağımsız denetimler, veri talebi şeffaflığı ve uygulama ayarlarıyla birlikte değerlendirin.",
    },
    {
      name: "Bağımsız denetimler",
      winner: "nordvpn",
      nord: "Tekrarlanan Deloitte no-logs incelemeleri + Cure53 istemci denetimleri",
      surf: "Yayımlanmış Cure53 ve Deloitte incelemeleri",
      reasoning:
        "NordVPN yayımlanmış tekrarlı no-logs incelemelerinin sıklığıyla öne çıkıyor. En son tarih, kapsam ve rapora erişim koşullarını iki sağlayıcının güncel şeffaflık sayfalarından doğrulayın.",
    },
    {
      name: "Hız performansı",
      winner: "tie",
      nord: "NordLynx — WireGuard tabanlı; sonuçlar ağ ve cihaza göre değişir",
      surf: "WireGuard — sonuçlar ağ ve cihaza göre değişir",
      reasoning:
        "VPN Advisor doğrudan karşılaştırılabilir laboratuvar ölçümü yayımlamadığı için sayısal hız kazananı ilan etmiyor. Kendi konumunuz, ISP'niz, cihazınız ve sunucu yükünüzle test edin.",
    },
    {
      name: "Streaming uyumluluğu",
      winner: "tie",
      nord: "Sağlayıcı destek belgelerinde çeşitli streaming senaryoları açıklanır",
      surf: "Sağlayıcı destek belgelerinde çeşitli streaming ve ülke sunucusu senaryoları açıklanır",
      reasoning:
        "Platform politikaları ve sunucu envanteri değişebilir; sürekli erişim garanti edilemez. Güncel hizmet ve Türkiye lokasyonu desteğini resmi sayfalardan kontrol edin.",
    },
    {
      name: "Fiyat (uzun dönem)",
      winner: "tie",
      nord: "İlk dönem toplamını ve yenileme fiyatını resmi ödeme ekranında kontrol edin",
      surf: "İlk dönem toplamını ve yenileme fiyatını resmi ödeme ekranında kontrol edin",
      reasoning:
        "Fiyatlar pazara, kampanyaya, vergiye ve abonelik süresine göre değişir. Aynı para birimi ve aynı toplam dönem üzerinden karşılaştırın.",
    },
    {
      name: "Cihaz desteği",
      winner: "surfshark",
      nord: "Sağlayıcının ilan ettiği eşzamanlı bağlantı sınırı geçerli",
      surf: "Sağlayıcı sınırsız eşzamanlı bağlantı politikası ilan ediyor",
      reasoning:
        "Çok cihazlı kullanımda Surfshark'ın ilan edilen politikası avantaj sağlayabilir. Her iki sağlayıcının güncel cihaz ve adil kullanım koşullarını satın almadan önce doğrulayın.",
    },
  ],
  chooseNord: {
    title: "NordVPN'i seç eğer...",
    bullets: [
      "NordLynx ve NordVPN'in ek özellikleri kullanımına uyuyor",
      "Tekrarlanan bağımsız denetimler kritik",
      "Sağlayıcının güncel streaming desteği ihtiyaçlarınla eşleşiyor",
      "İlan edilen eşzamanlı cihaz sınırı senin için yeterli",
      "Threat Protection, Meshnet, Onion over VPN gibi ek özellikler değerli",
    ],
    cta: "NordVPN'i incele",
  },
  chooseSurf: {
    title: "Surfshark'ı seç eğer...",
    bullets: [
      "Bütçe önemli ve uzun dönem plan tercih ediyorsun",
      "Çok sayıda cihazı korumak istiyorsun (sınırsız)",
      "Güncel envanterde Türkiye lokasyonlu sunucu bulunması önemli",
      "Camouflage Mode gibi bağlantı seçenekleri önemli",
      "Kullandığın hizmetler için güncel destek belgeleri ihtiyaçlarınla eşleşiyor",
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
      a: "Şirketler 2022'de birleşme duyurusu yaptı; ürünler ayrı markalar olarak sunuluyor. Güncel sahiplik ve operasyonel yapı için şirketlerin resmi kurumsal açıklamalarını kontrol edin.",
    },
    {
      q: "Hangisi Türkiye'de daha iyi çalışıyor?",
      a: "Bunu sürekli geçerli tek bir kazananla yanıtlayamayız. Sunucu envanteri, ağ engelleri ve rota performansı değişir; güncel resmi sunucu listelerini kontrol edip kendi bağlantınızda deneyin.",
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
    allLink: { href: "/en-iyi-vpn", text: "Tüm sağlayıcı profilleri" },
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
      nord: "Based in Panama; assess the current privacy policy and audit scope together",
      surf: "Based in the Netherlands; assess the current privacy policy and audit scope together",
      reasoning:
        "Jurisdiction alone is not proof of privacy. Consider provider claims alongside independent audits, data-request transparency and application settings.",
    },
    {
      name: "Independent audits",
      winner: "nordvpn",
      nord: "Repeated Deloitte no-logs reviews + Cure53 client audits",
      surf: "Published Cure53 and Deloitte reviews",
      reasoning:
        "NordVPN stands out for the frequency of its published no-logs reviews. Verify the latest date, scope and report-access conditions on each provider's current transparency pages.",
    },
    {
      name: "Speed performance",
      winner: "tie",
      nord: "NordLynx — WireGuard-based; results vary by network and device",
      surf: "WireGuard — results vary by network and device",
      reasoning:
        "VPN Advisor does not publish a directly comparable lab sample for these products, so we do not name a numerical speed winner. Test on your own route, ISP and device.",
    },
    {
      name: "Streaming compatibility",
      winner: "tie",
      nord: "The provider's support documents describe several streaming scenarios",
      surf: "The provider's support documents describe streaming and country-server scenarios",
      reasoning:
        "Platform policies and server inventories can change; continuous access is not guaranteed. Check current service and Türkiye-location support on official pages.",
    },
    {
      name: "Price (long term)",
      winner: "tie",
      nord: "Check the introductory total and renewal price at the official checkout",
      surf: "Check the introductory total and renewal price at the official checkout",
      reasoning:
        "Prices vary by market, promotion, tax and subscription term. Compare using the same currency and total period.",
    },
    {
      name: "Device support",
      winner: "surfshark",
      nord: "The provider's published simultaneous-connection cap applies",
      surf: "The provider advertises an unlimited simultaneous-connection policy",
      reasoning:
        "Surfshark's advertised policy may benefit multi-device households. Verify both providers' current device and fair-use terms before buying.",
    },
  ],
  chooseNord: {
    title: "Choose NordVPN if...",
    bullets: [
      "NordLynx and NordVPN's additional features fit your use case",
      "Repeated independent audits are critical for you",
      "The provider's current streaming documentation matches your needs",
      "The published simultaneous-device cap is enough for you",
      "Extra features like Threat Protection, Meshnet and Onion over VPN are valuable to you",
    ],
    cta: "Read our NordVPN review",
  },
  chooseSurf: {
    title: "Choose Surfshark if...",
    bullets: [
      "Budget matters and you prefer long-term plans",
      "You want to protect many devices (unlimited)",
      "A Türkiye-located server in the current inventory matters to you",
      "Connection options such as Camouflage Mode matter to you",
      "Current support documentation for your services matches your needs",
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
      a: "The companies announced a merger in 2022, and the products continue as separate brands. Check the companies' current corporate disclosures for ownership and operational details.",
    },
    {
      q: "Which one works better in Turkey?",
      a: "There is no permanently reliable winner. Server inventories, network blocking and route performance change; check current official server lists and test on your own connection.",
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
    allLink: { href: "/en-iyi-vpn", text: "All provider profiles" },
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
      nord: "Sitz in Panama; aktuelle Datenschutzrichtlinie und Audit-Umfang gemeinsam prüfen",
      surf: "Sitz in den Niederlanden; aktuelle Datenschutzrichtlinie und Audit-Umfang gemeinsam prüfen",
      reasoning:
        "Der Gerichtsstand allein ist kein Datenschutzbeweis. Anbieterangaben sollten zusammen mit unabhängigen Audits, Transparenz zu Behördenanfragen und App-Einstellungen bewertet werden.",
    },
    {
      name: "Unabhängige Audits",
      winner: "nordvpn",
      nord: "Wiederholte Deloitte-No-Logs-Prüfungen + Cure53-Client-Audits",
      surf: "Veröffentlichte Cure53- und Deloitte-Prüfungen",
      reasoning:
        "NordVPN fällt durch die Häufigkeit veröffentlichter No-Logs-Prüfungen auf. Datum, Umfang und Zugangsbedingungen sollten auf den aktuellen Transparenzseiten beider Anbieter geprüft werden.",
    },
    {
      name: "Geschwindigkeit",
      winner: "tie",
      nord: "NordLynx — WireGuard-basiert; Ergebnisse hängen von Netzwerk und Gerät ab",
      surf: "WireGuard — Ergebnisse hängen von Netzwerk und Gerät ab",
      reasoning:
        "VPN Advisor veröffentlicht keine direkt vergleichbare Laborstichprobe und nennt daher keinen numerischen Geschwindigkeitssieger. Teste auf deiner eigenen Route, bei deinem ISP und auf deinem Gerät.",
    },
    {
      name: "Streaming-Kompatibilität",
      winner: "tie",
      nord: "Die Support-Dokumentation beschreibt verschiedene Streaming-Szenarien",
      surf: "Die Support-Dokumentation beschreibt Streaming- und Länder-Server-Szenarien",
      reasoning:
        "Plattformregeln und Serverbestände können sich ändern; dauerhafter Zugriff ist nicht garantiert. Prüfe die aktuelle Dienst- und Türkei-Standort-Unterstützung auf den offiziellen Seiten.",
    },
    {
      name: "Preis (langfristig)",
      winner: "tie",
      nord: "Einstiegsgesamtpreis und Verlängerungspreis im offiziellen Checkout prüfen",
      surf: "Einstiegsgesamtpreis und Verlängerungspreis im offiziellen Checkout prüfen",
      reasoning:
        "Preise hängen von Markt, Aktion, Steuer und Laufzeit ab. Vergleiche dieselbe Währung und denselben Gesamtzeitraum.",
    },
    {
      name: "Geräteunterstützung",
      winner: "surfshark",
      nord: "Es gilt das veröffentlichte Limit für gleichzeitige Verbindungen",
      surf: "Der Anbieter bewirbt unbegrenzt viele gleichzeitige Verbindungen",
      reasoning:
        "Surfsharks beworbene Regelung kann Haushalten mit vielen Geräten helfen. Prüfe vor dem Kauf die aktuellen Geräte- und Fair-Use-Bedingungen beider Anbieter.",
    },
  ],
  chooseNord: {
    title: "Wähle NordVPN, wenn...",
    bullets: [
      "NordLynx und NordVPNs Zusatzfunktionen zu deinem Einsatz passen",
      "wiederholte unabhängige Audits für dich entscheidend sind",
      "die aktuelle Streaming-Dokumentation des Anbieters zu deinem Bedarf passt",
      "das veröffentlichte Limit für gleichzeitige Geräte ausreicht",
      "Zusatzfunktionen wie Threat Protection, Meshnet und Onion over VPN für dich wertvoll sind",
    ],
    cta: "Zum NordVPN-Test",
  },
  chooseSurf: {
    title: "Wähle Surfshark, wenn...",
    bullets: [
      "das Budget wichtig ist und du langfristige Tarife bevorzugst",
      "du viele Geräte schützen willst (unbegrenzt)",
      "ein Türkei-Standort im aktuellen Serverbestand wichtig ist",
      "Verbindungsoptionen wie Camouflage Mode wichtig sind",
      "die aktuelle Support-Dokumentation für deine Dienste passt",
    ],
    cta: "Zum Surfshark-Test",
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Ist NordVPN oder Surfshark besser?",
      a: "Ein pauschales 'besser' gibt es nicht. Vergleiche die aktuelle Audit-Historie, Funktionen, Gerätebedingungen und den vollständigen Checkout-Preis anhand deiner Prioritäten.",
    },
    {
      q: "Sind das nicht zwei Produkte derselben Firma?",
      a: "Die Unternehmen kündigten 2022 einen Zusammenschluss an; die Produkte werden weiterhin als getrennte Marken angeboten. Prüfe die aktuellen Unternehmensangaben für Eigentums- und Betriebsdetails.",
    },
    {
      q: "Welches funktioniert in der Türkei besser?",
      a: "Dafür gibt es keinen dauerhaft verlässlichen Sieger. Serverbestand, Netzsperren und Routenleistung ändern sich; prüfe aktuelle offizielle Serverlisten und teste im eigenen Netz.",
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
    allLink: { href: "/en-iyi-vpn", text: "Alle Anbieterprofile" },
  },
};

const CONTENT: Record<AppLocale, NordvpnVsSurfsharkContent> = { tr, en, de };

export function getNordvpnVsSurfsharkContent(
  locale: string,
): NordvpnVsSurfsharkContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
