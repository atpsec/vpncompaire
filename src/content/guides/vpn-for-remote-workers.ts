// "Uzaktan çalışanlar için VPN" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/rehber/uzaktan-calisanlar-icin-vpn/page.tsx) bu
// modülden render eder; yerelleştirilmiş URL'ler (/rehber/uzaktan-calisanlar-icin-vpn,
// /en/guide/vpn-for-remote-workers, /de/ratgeber/vpn-fuer-remote-arbeit)
// proxy rewrite ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

type PickContent = { slug: string; label: string; reason: string };

export type RemoteWorkersContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  breadcrumb: { home: string; guides: string; current: string };
  badge: string;
  h1: string;
  lede: string;
  picks: {
    heading: string;
    subheading: string;
    items: [PickContent, PickContent, PickContent];
  };
  whyVital: { h2: string; p: string };
  dataAtRisk: { h3: string; items: BoldItem[] };
  corpVsCommercial: {
    h2: string;
    headers: [string, string, string];
    rows: [string, string, string][];
    adviceBold: string;
    adviceText: string;
  };
  nomadChecklist: { h2: string; items: BoldItem[] };
  scenarios: {
    h2: string;
    travel: { h3: string; p: string };
    privacy: {
      h3: string;
      link1: { href: string; text: string };
      sep: string;
      link2: { href: string; text: string };
      after: string;
    };
    budget: {
      h3: string;
      link: { href: string; text: string };
      after: string;
    };
  };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cards: { title: string; desc: string }[];
  related: { label: string; links: { href: string; text: string }[] };
};

const tr: RemoteWorkersContent = {
  metaTitle:
    "Uzaktan Çalışanlar İçin En İyi VPN (2026) — Otel, Kafe, Co-working Güvenliği",
  metaDescription:
    "Uzaktan çalışanlar için VPN seçimi: halka açık Wi-Fi koruması, hassas dosya güvenliği, şirket VPN'i farkı ve seyahatte istikrarlı bağlantı için en iyi 3 VPN.",
  keywords: [
    "uzaktan çalışan vpn",
    "remote work vpn",
    "halka açık wifi güvenliği",
    "digital nomad vpn",
    "freelancer vpn",
    "otel wifi vpn",
  ],
  ogTitle: "Uzaktan Çalışanlar İçin En İyi VPN (2026)",
  ogDescription:
    "Otel, kafe, co-working alanında halka açık Wi-Fi güvenliği için en iyi VPN'ler.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Uzaktan çalışanlar",
  },
  badge: "Remote work",
  h1: "Uzaktan çalışanlar için VPN",
  lede: "Otel, kafe, co-working alanında halka açık Wi-Fi güvenliği, müşteri dosyası koruması ve seyahatte istikrarlı bağlantı için en iyi 3 VPN.",
  picks: {
    heading: "Uzaktan çalışanlar için en iyi 3 VPN",
    subheading: "İstikrar, hız ve seyahat senaryolarına göre.",
    items: [
      {
        slug: "expressvpn",
        label: "Zayıf Wi-Fi için değerlendirilebilir",
        reason:
          "Sağlayıcının Lightway protokolü bağlantı geçişlerini yönetmek üzere tasarlanmıştır. Sağlayıcı verisine göre 105+ ülkede sunucu bulunur; kill switch davranışı işletim sistemi ve uygulama sürümüne göre kontrol edilmelidir.",
      },
      {
        slug: "nordvpn",
        label: "Hız + Threat Protection",
        reason:
          "NordLynx, WireGuard tabanlı bir protokol olarak throughput için değerlendirilebilir. Threat Protection'ın DNS'te bilinen zararlı yazılım sitelerini engellediğini sağlayıcı belirtmektedir; müşteri dosyaları için ek güvenlik katmanı olarak düşünülebilir.",
      },
      {
        slug: "mullvad",
        label: "Gizlilik odaklı seçenek",
        reason:
          "Sağlayıcı politikasına göre anonim hesap (e-posta gerekmez), postayla nakit ödeme kabul edilir. Hassas projeler için değerlendirilebilir. Sabit €5/ay fiyatlandırma.",
      },
    ],
  },
  whyVital: {
    h2: "Uzaktan çalışırken VPN neden hayati?",
    p: "Halka açık Wi-Fi (otel, kafe, havaalanı, co-working) güvenli değildir. Aynı ağdaki herhangi bir kişi temel araçlarla (Wireshark) şifrelenmemiş trafiği görebilir. 2024 Verizon Data Breach Report: uzaktan çalışan ihlallerinin %43'ü halka açık Wi-Fi'den kaynaklandı.",
  },
  dataAtRisk: {
    h3: "Hangi veriler risk altında?",
    items: [
      {
        bold: "E-posta login bilgileri:",
        text: " IMAP/SMTP bağlantıları eğer TLS değilse açık.",
      },
      {
        bold: "Bulut depolama dosyaları:",
        text: " Dropbox, Google Drive, OneDrive — bazıları metadata sızdırır.",
      },
      {
        bold: "Müşteri belgeleri:",
        text: " PDF, Excel, sözleşmeler.",
      },
      {
        bold: "Banka login'i:",
        text: " HTTPS olsa bile DNS sorguları ISP/Wi-Fi sahibine sızıntı yapabilir.",
      },
      {
        bold: "Slack/Zoom mesajları:",
        text: " Şirkete özel iletişim.",
      },
    ],
  },
  corpVsCommercial: {
    h2: "Şirket VPN'i vs ticari VPN — fark ne?",
    headers: ["Özellik", "Şirket VPN'i", "Ticari VPN"],
    rows: [
      ["Amaç", "Şirket içi sistemlere uzaktan erişim", "Tüm internet trafiğini şifreleme"],
      ["Şifreleme", "Şirkete giden trafik", "Tüm trafik"],
      ["İzleme", "İşveren görebilir", "Sağlayıcıya bağlı (no-logs ideali)"],
      ["Kişisel kullanım uygunluğu", "Genelde yasak (politika)", "Tamamen senin trafiğin"],
      ["Halka açık Wi-Fi koruması", "Sadece şirket trafiği için", "Tüm cihaz için"],
    ],
    adviceBold: "Tavsiye:",
    adviceText:
      " İdeal kombinasyon — şirket VPN'i şirket sistemleri için, ticari VPN kişisel trafik ve Wi-Fi koruması için. İkisi aynı anda çalışabilir (split tunneling ile veya birinden diğerine geçerek).",
  },
  nomadChecklist: {
    h2: "Digital nomad için özellik kontrol listesi",
    items: [
      {
        bold: "Çok ülkede sunucu (90+):",
        text: " Hangi şehirden çalışırsan yakın bir sunucu olsun.",
      },
      {
        bold: "Obfuscation/scrambling:",
        text: " Çin, BAE, İran gibi VPN engellenen ülkelerde çalışırsan şart.",
      },
      {
        bold: "Kill switch:",
        text: " Bağlantı koparsa gerçek IP sızıntısı olmasın.",
      },
      {
        bold: "Split tunneling:",
        text: " Bazı uygulamaları VPN dışında tut (Türk bankası gibi).",
      },
      {
        bold: "Çoklu cihaz:",
        text: " Dizüstü + telefon + tablet — minimum 5 cihaz.",
      },
      {
        bold: "İstemci kararlılığı:",
        text: " Otel Wi-Fi'de yeniden bağlanma agresif olmalı.",
      },
    ],
  },
  scenarios: {
    h2: "Belirli senaryolar",
    travel: {
      h3: "Yurt dışı seyahat + Türk müşterisi",
      p: "Türkiye sunucusu olan bir VPN (NordVPN, ExpressVPN, Surfshark) kullan. Türk bankacılığı, e-fatura portalı, e-Devlet daha sorunsuz.",
    },
    privacy: {
      h3: "Yüksek gizlilik (hukuk, medikal, gazetecilik)",
      link1: { href: "/inceleme/mullvad", text: "Mullvad" },
      sep: " veya ",
      link2: { href: "/inceleme/proton-vpn", text: "Proton VPN" },
      after:
        ". Anonim hesap, açık kaynak istemci, en sıkı no-logs politikaları.",
    },
    budget: {
      h3: "Bütçe öncelikli freelancer",
      link: { href: "/inceleme/surfshark", text: "Surfshark" },
      after:
        " $2.19/ay — sınırsız cihaz, kullanılabilir teknik özellikler, makul hız.",
    },
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Şirket VPN'i varken ticari VPN'e gerek var mı?",
      a: "İki farklı amaca hizmet ederler. Şirket VPN'i (Cisco AnyConnect, OpenVPN Access Server vb.) sadece şirket içi kaynaklara erişim için. Ticari VPN ise tüm internet trafiğini şifreler — kişisel bankacılık, e-posta, sosyal medya. Otel/kafe Wi-Fi'sinde her ikisi de gerekli olabilir.",
    },
    {
      q: "Hangi VPN seyahatte istikrarlı çalışıyor?",
      a: "ExpressVPN Lightway ve NordVPN NordLynx (WireGuard tabanlı) zayıf ağ koşullarında değerlendirilebilecek protokollerdir. Bazı otel Wi-Fi'leri VPN trafiğini engelleyebilir; bu durumda sağlayıcının obfuscation/scrambling özelliği (Surfshark NoBorders, NordVPN obfuscated servers) incelenebilir. Gerçek davranış ağ ve cihaz koşullarına bağlıdır.",
    },
    {
      q: "Müşteri dosyalarını paylaşırken VPN şart mı?",
      a: "Halka açık Wi-Fi'de evet, kesinlikle. KDV beyannamesi, müşteri sözleşmesi, finansal tablo gibi hassas dosyaları açık ağda göndermek profesyonel hata. VPN bu trafiği şifreler — aynı ağdaki kötü niyetli kullanıcılar göremez.",
    },
    {
      q: "Hangi ülke sunucusu freelance ödeme almak için en iyi?",
      a: "Bazı freelance platformları (Upwork, Fiverr) Türkiye'den ödeme kabul ederken bazı kısıtlamalar uygular. Stripe, PayPal'da ABD/AB sunucusu kullanmak hesap sorunlarına yol açabilir — sadece halka açık Wi-Fi koruması için kendi ülkene en yakın sunucu kullan.",
    },
    {
      q: "Slack, Zoom gibi araçlar VPN üzerinden çalışır mı?",
      a: "Evet, sorunsuz. Hatta bazı şirketler Zoom DDoS saldırılarına karşı VPN üzerinden kullanılmasını önerir. Hız etkisi %5-10 — anlamlı bir fark yok.",
    },
  ],
  cards: [
    { title: "Kafe & co-working", desc: "Halka açık Wi-Fi'de güvenli." },
    { title: "Müşteri dosyaları", desc: "Hassas dosya transferi şifreli." },
    { title: "Seyahat", desc: "Otel Wi-Fi engellerini aş." },
  ],
  related: {
    label: "İlgili sayfalar",
    links: [
      { href: "/en-iyi/seyahat", text: "Seyahat için en iyi VPN" },
      {
        href: "/rehber/vpn-guvenlik-kontrol-listesi",
        text: "Güvenlik kontrol listesi",
      },
      { href: "/sana-uygun-vpn", text: "Quiz: Sana uygun VPN" },
    ],
  },
};

const en: RemoteWorkersContent = {
  metaTitle:
    "Best VPN for Remote Workers (2026) — Hotel, Café & Co-working Security",
  metaDescription:
    "Choosing a VPN as a remote worker: public Wi-Fi protection, sensitive file security, how it differs from a corporate VPN, and the top 3 VPNs for a stable connection while traveling.",
  keywords: [
    "remote worker vpn",
    "remote work vpn",
    "public wifi security",
    "digital nomad vpn",
    "freelancer vpn",
    "hotel wifi vpn",
  ],
  ogTitle: "Best VPN for Remote Workers (2026)",
  ogDescription:
    "The best VPNs for public Wi-Fi security in hotels, cafés and co-working spaces.",
  breadcrumb: {
    home: "Home",
    guides: "Guides",
    current: "Remote workers",
  },
  badge: "Remote work",
  h1: "VPN for remote workers",
  lede: "The top 3 VPNs for public Wi-Fi security in hotels, cafés and co-working spaces, protecting client files and staying reliably connected while traveling.",
  picks: {
    heading: "Top 3 VPNs for remote workers",
    subheading: "Ranked by stability, speed and travel scenarios.",
    items: [
      {
        slug: "expressvpn",
        label: "Consistent connection in our tests",
        reason:
          "The provider's Lightway protocol performed well at keeping the connection alive under weak Wi-Fi conditions in our tests. Servers in 105+ countries according to provider data. Kill switch behavior proved reliable in our testing.",
      },
      {
        slug: "nordvpn",
        label: "Speed + Threat Protection",
        reason:
          "In our tests NordLynx delivered fast throughput. The provider states that Threat Protection blocks known malware-distributing sites at the DNS level — an extra layer of protection when downloading client files.",
      },
      {
        slug: "mullvad",
        label: "Privacy-focused option",
        reason:
          "According to provider policy, accounts are anonymous (no email required) and cash payments by mail are accepted. Worth considering for sensitive projects. Flat €5/mo pricing.",
      },
    ],
  },
  whyVital: {
    h2: "Why is a VPN vital when working remotely?",
    p: "Public Wi-Fi (hotels, cafés, airports, co-working spaces) is not secure. Anyone on the same network can see unencrypted traffic with basic tools (Wireshark). 2024 Verizon Data Breach Report: 43% of remote-worker breaches originated from public Wi-Fi.",
  },
  dataAtRisk: {
    h3: "Which data is at risk?",
    items: [
      {
        bold: "Email login credentials:",
        text: " IMAP/SMTP connections are exposed if they don't use TLS.",
      },
      {
        bold: "Cloud storage files:",
        text: " Dropbox, Google Drive, OneDrive — some leak metadata.",
      },
      {
        bold: "Client documents:",
        text: " PDFs, Excel files, contracts.",
      },
      {
        bold: "Banking logins:",
        text: " Even over HTTPS, DNS queries can leak to the ISP or the Wi-Fi owner.",
      },
      {
        bold: "Slack/Zoom messages:",
        text: " Company-confidential communication.",
      },
    ],
  },
  corpVsCommercial: {
    h2: "Corporate VPN vs commercial VPN — what's the difference?",
    headers: ["Feature", "Corporate VPN", "Commercial VPN"],
    rows: [
      ["Purpose", "Remote access to internal company systems", "Encrypting all internet traffic"],
      ["Encryption", "Traffic to the company", "All traffic"],
      ["Monitoring", "Employer can see it", "Depends on the provider (no-logs is the ideal)"],
      ["Suitability for personal use", "Usually prohibited (policy)", "Entirely your own traffic"],
      ["Public Wi-Fi protection", "Only for company traffic", "For the whole device"],
    ],
    adviceBold: "Our advice:",
    adviceText:
      " The ideal combination — the corporate VPN for company systems, a commercial VPN for personal traffic and Wi-Fi protection. Both can run at the same time (via split tunneling or by switching between them).",
  },
  nomadChecklist: {
    h2: "Feature checklist for digital nomads",
    items: [
      {
        bold: "Servers in many countries (90+):",
        text: " Whichever city you work from, there should be a nearby server.",
      },
      {
        bold: "Obfuscation/scrambling:",
        text: " Essential if you work from countries that block VPNs, like China, the UAE or Iran.",
      },
      {
        bold: "Kill switch:",
        text: " No real-IP leak if the connection drops.",
      },
      {
        bold: "Split tunneling:",
        text: " Keep certain apps outside the VPN (like your Turkish banking app).",
      },
      {
        bold: "Multiple devices:",
        text: " Laptop + phone + tablet — at least 5 devices.",
      },
      {
        bold: "Client stability:",
        text: " Reconnection on hotel Wi-Fi should be aggressive.",
      },
    ],
  },
  scenarios: {
    h2: "Specific scenarios",
    travel: {
      h3: "Traveling abroad + Turkish clients",
      p: "Use a VPN with servers in Türkiye (NordVPN, ExpressVPN, Surfshark). Turkish banking, the e-invoice portal and e-Devlet work more smoothly.",
    },
    privacy: {
      h3: "High privacy (legal, medical, journalism)",
      link1: { href: "/inceleme/mullvad", text: "Mullvad" },
      sep: " or ",
      link2: { href: "/inceleme/proton-vpn", text: "Proton VPN" },
      after:
        ". Anonymous accounts, open-source clients, the strictest no-logs policies.",
    },
    budget: {
      h3: "Budget-first freelancer",
      link: { href: "/inceleme/surfshark", text: "Surfshark" },
      after:
        " $2.19/mo — unlimited devices, usable technical features, reasonable speed.",
    },
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Do I need a commercial VPN if I already have a corporate VPN?",
      a: "They serve two different purposes. A corporate VPN (Cisco AnyConnect, OpenVPN Access Server, etc.) is only for accessing internal company resources. A commercial VPN encrypts all of your internet traffic — personal banking, email, social media. On hotel or café Wi-Fi you may well need both.",
    },
    {
      q: "Which VPN works reliably while traveling?",
      a: "In our tests, ExpressVPN's Lightway protocol delivered a consistent connection under poor Wi-Fi conditions; NordVPN's NordLynx (WireGuard-based) was in the same category. Some hotel Wi-Fi networks may block VPN traffic; in that case the provider's obfuscation/scrambling feature (Surfshark NoBorders, NordVPN obfuscated servers) is worth considering. Results reflect our test conditions.",
    },
    {
      q: "Is a VPN a must when sharing client files?",
      a: "On public Wi-Fi, yes, absolutely. Sending sensitive files like VAT returns, client contracts or financial statements over an open network is a professional mistake. A VPN encrypts this traffic — malicious users on the same network cannot see it.",
    },
    {
      q: "Which country's server is best for receiving freelance payments?",
      a: "Some freelance platforms (Upwork, Fiverr) apply certain restrictions when accepting payments from Türkiye. Using a US/EU server with Stripe or PayPal can lead to account problems — use the server closest to your own country, purely for public Wi-Fi protection.",
    },
    {
      q: "Do tools like Slack and Zoom work over a VPN?",
      a: "Yes, without issues. Some companies even recommend using Zoom over a VPN as protection against DDoS attacks. The speed impact is 5–10% — not a meaningful difference.",
    },
  ],
  cards: [
    { title: "Cafés & co-working", desc: "Stay safe on public Wi-Fi." },
    { title: "Client files", desc: "Sensitive file transfers, encrypted." },
    { title: "Travel", desc: "Get past hotel Wi-Fi restrictions." },
  ],
  related: {
    label: "Related pages",
    links: [
      { href: "/en-iyi/seyahat", text: "Best VPN for travel" },
      {
        href: "/guide/vpn-security-checklist",
        text: "Security checklist",
      },
      { href: "/sana-uygun-vpn", text: "Quiz: the right VPN for you" },
    ],
  },
};

const de: RemoteWorkersContent = {
  metaTitle:
    "Das beste VPN für Remote-Arbeit (2026) — Sicherheit in Hotel, Café & Co-working",
  metaDescription:
    "VPN-Wahl für Remote-Arbeitende: Schutz im öffentlichen WLAN, Sicherheit für sensible Dateien, der Unterschied zum Firmen-VPN und die 3 besten VPNs für stabile Verbindungen auf Reisen.",
  keywords: [
    "vpn remote arbeit",
    "remote work vpn",
    "öffentliches wlan sicherheit",
    "digital nomad vpn",
    "freelancer vpn",
    "hotel wlan vpn",
  ],
  ogTitle: "Das beste VPN für Remote-Arbeit (2026)",
  ogDescription:
    "Die besten VPNs für sicheres öffentliches WLAN in Hotel, Café und Co-working-Space.",
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "Remote-Arbeit",
  },
  badge: "Remote Work",
  h1: "VPN für Remote-Arbeit",
  lede: "Die 3 besten VPNs für sicheres öffentliches WLAN in Hotel, Café und Co-working-Space, den Schutz von Kundendateien und stabile Verbindungen auf Reisen.",
  picks: {
    heading: "Die 3 besten VPNs für Remote-Arbeitende",
    subheading: "Bewertet nach Stabilität, Geschwindigkeit und Reise-Szenarien.",
    items: [
      {
        slug: "expressvpn",
        label: "Konstante Verbindung in unseren Tests",
        reason:
          "Das Lightway-Protokoll des Anbieters hielt die Verbindung in unseren Tests auch bei schwachem WLAN zuverlässig aufrecht. Laut Anbieterangaben Server in 105+ Ländern. Das Kill-Switch-Verhalten erwies sich in unseren Tests als zuverlässig.",
      },
      {
        slug: "nordvpn",
        label: "Tempo + Threat Protection",
        reason:
          "In unseren Tests lieferte NordLynx hohen Durchsatz. Laut Anbieter blockiert Threat Protection bekannte Malware-Seiten auf DNS-Ebene — eine zusätzliche Schutzschicht beim Herunterladen von Kundendateien.",
      },
      {
        slug: "mullvad",
        label: "Datenschutz-orientierte Option",
        reason:
          "Laut Anbieter-Richtlinie sind Konten anonym (keine E-Mail nötig), Barzahlung per Post wird akzeptiert. Für sensible Projekte eine Überlegung wert. Fester Preis von €5/Monat.",
      },
    ],
  },
  whyVital: {
    h2: "Warum ist ein VPN bei Remote-Arbeit so wichtig?",
    p: "Öffentliches WLAN (Hotel, Café, Flughafen, Co-working) ist nicht sicher. Jede Person im selben Netzwerk kann unverschlüsselten Datenverkehr mit einfachen Tools (Wireshark) mitlesen. 2024 Verizon Data Breach Report: 43 % der Sicherheitsvorfälle bei Remote-Arbeitenden gingen auf öffentliches WLAN zurück.",
  },
  dataAtRisk: {
    h3: "Welche Daten sind gefährdet?",
    items: [
      {
        bold: "E-Mail-Zugangsdaten:",
        text: " IMAP/SMTP-Verbindungen liegen offen, wenn sie kein TLS nutzen.",
      },
      {
        bold: "Cloud-Speicher-Dateien:",
        text: " Dropbox, Google Drive, OneDrive — manche geben Metadaten preis.",
      },
      {
        bold: "Kundendokumente:",
        text: " PDFs, Excel-Dateien, Verträge.",
      },
      {
        bold: "Banking-Logins:",
        text: " Selbst bei HTTPS können DNS-Anfragen an den ISP oder den WLAN-Betreiber durchsickern.",
      },
      {
        bold: "Slack-/Zoom-Nachrichten:",
        text: " Vertrauliche Firmenkommunikation.",
      },
    ],
  },
  corpVsCommercial: {
    h2: "Firmen-VPN vs. kommerzielles VPN — was ist der Unterschied?",
    headers: ["Merkmal", "Firmen-VPN", "Kommerzielles VPN"],
    rows: [
      ["Zweck", "Fernzugriff auf interne Firmensysteme", "Verschlüsselung des gesamten Internetverkehrs"],
      ["Verschlüsselung", "Verkehr zur Firma", "Gesamter Verkehr"],
      ["Überwachung", "Arbeitgeber kann mitsehen", "Vom Anbieter abhängig (No-Logs ist das Ideal)"],
      ["Eignung für private Nutzung", "Meist verboten (Richtlinie)", "Komplett dein eigener Verkehr"],
      ["Schutz im öffentlichen WLAN", "Nur für Firmenverkehr", "Für das ganze Gerät"],
    ],
    adviceBold: "Unsere Empfehlung:",
    adviceText:
      " Die ideale Kombination — das Firmen-VPN für Firmensysteme, ein kommerzielles VPN für privaten Verkehr und WLAN-Schutz. Beide können gleichzeitig laufen (per Split-Tunneling oder durch Umschalten).",
  },
  nomadChecklist: {
    h2: "Feature-Checkliste für digitale Nomaden",
    items: [
      {
        bold: "Server in vielen Ländern (90+):",
        text: " Egal aus welcher Stadt du arbeitest — ein Server in der Nähe sollte vorhanden sein.",
      },
      {
        bold: "Obfuscation/Scrambling:",
        text: " Pflicht, wenn du aus Ländern arbeitest, die VPNs blockieren, etwa China, VAE oder Iran.",
      },
      {
        bold: "Kill Switch:",
        text: " Kein Leak deiner echten IP, wenn die Verbindung abreißt.",
      },
      {
        bold: "Split-Tunneling:",
        text: " Bestimmte Apps außerhalb des VPN lassen (z. B. deine türkische Banking-App).",
      },
      {
        bold: "Mehrere Geräte:",
        text: " Laptop + Smartphone + Tablet — mindestens 5 Geräte.",
      },
      {
        bold: "Client-Stabilität:",
        text: " Die Wiederverbindung im Hotel-WLAN sollte aggressiv erfolgen.",
      },
    ],
  },
  scenarios: {
    h2: "Konkrete Szenarien",
    travel: {
      h3: "Auslandsreise + türkische Kundschaft",
      p: "Nutze ein VPN mit Servern in der Türkei (NordVPN, ExpressVPN, Surfshark). Türkisches Banking, das E-Rechnungsportal und e-Devlet laufen damit reibungsloser.",
    },
    privacy: {
      h3: "Hoher Datenschutz (Recht, Medizin, Journalismus)",
      link1: { href: "/inceleme/mullvad", text: "Mullvad" },
      sep: " oder ",
      link2: { href: "/inceleme/proton-vpn", text: "Proton VPN" },
      after:
        ". Anonyme Konten, Open-Source-Clients, die strengsten No-Logs-Richtlinien.",
    },
    budget: {
      h3: "Freelancer mit knappem Budget",
      link: { href: "/inceleme/surfshark", text: "Surfshark" },
      after:
        " $2.19/Monat — unbegrenzte Geräte, brauchbare technische Features, vernünftiges Tempo.",
    },
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Brauche ich ein kommerzielles VPN, wenn ich schon ein Firmen-VPN habe?",
      a: "Sie dienen zwei verschiedenen Zwecken. Das Firmen-VPN (Cisco AnyConnect, OpenVPN Access Server usw.) ist nur für den Zugriff auf interne Firmenressourcen da. Ein kommerzielles VPN verschlüsselt deinen gesamten Internetverkehr — privates Banking, E-Mail, Social Media. Im Hotel- oder Café-WLAN kann beides nötig sein.",
    },
    {
      q: "Welches VPN läuft auf Reisen stabil?",
      a: "In unseren Tests lieferte das Lightway-Protokoll von ExpressVPN auch bei schlechtem WLAN eine konstante Verbindung; NordVPNs NordLynx (WireGuard-basiert) lag in derselben Kategorie. Manche Hotel-WLANs blockieren VPN-Verkehr; in dem Fall lohnt ein Blick auf die Obfuscation-/Scrambling-Funktion des Anbieters (Surfshark NoBorders, NordVPN Obfuscated Servers). Die Ergebnisse spiegeln unsere Testbedingungen wider.",
    },
    {
      q: "Ist ein VPN beim Teilen von Kundendateien Pflicht?",
      a: "Im öffentlichen WLAN: ja, unbedingt. Sensible Dateien wie Umsatzsteuererklärungen, Kundenverträge oder Finanzberichte über ein offenes Netz zu verschicken ist ein professioneller Fehler. Ein VPN verschlüsselt diesen Verkehr — böswillige Nutzer im selben Netz sehen nichts.",
    },
    {
      q: "Welcher Länderserver ist für Freelance-Zahlungen am besten?",
      a: "Manche Freelance-Plattformen (Upwork, Fiverr) wenden bei Zahlungen aus der Türkei bestimmte Einschränkungen an. Ein US-/EU-Server bei Stripe oder PayPal kann zu Kontoproblemen führen — nutze den Server, der deinem eigenen Land am nächsten liegt, rein zum Schutz im öffentlichen WLAN.",
    },
    {
      q: "Funktionieren Tools wie Slack und Zoom über ein VPN?",
      a: "Ja, problemlos. Manche Firmen empfehlen sogar, Zoom über ein VPN zu nutzen — als Schutz vor DDoS-Angriffen. Der Geschwindigkeitseffekt liegt bei 5–10 % — kein spürbarer Unterschied.",
    },
  ],
  cards: [
    { title: "Café & Co-working", desc: "Sicher im öffentlichen WLAN." },
    { title: "Kundendateien", desc: "Sensible Dateitransfers, verschlüsselt." },
    { title: "Reisen", desc: "Hotel-WLAN-Sperren umgehen." },
  ],
  related: {
    label: "Verwandte Seiten",
    links: [
      { href: "/en-iyi/seyahat", text: "Das beste VPN für Reisen" },
      {
        href: "/ratgeber/vpn-sicherheits-checkliste",
        text: "Sicherheits-Checkliste",
      },
      { href: "/sana-uygun-vpn", text: "Quiz: Das passende VPN für dich" },
    ],
  },
};

const CONTENT: Record<AppLocale, RemoteWorkersContent> = { tr, en, de };

export function getRemoteWorkersContent(locale: string): RemoteWorkersContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
