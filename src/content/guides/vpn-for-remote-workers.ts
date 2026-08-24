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
    "Uzaktan çalışanlar için VPN seçimi: halka açık Wi-Fi koruması, hassas dosya güvenliği, şirket VPN'i farkı ve seyahat bağlantısı kaynaklarını karşılaştırma.",
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
    "Otel, kafe ve co-working alanlarında halka açık Wi-Fi güvenliği için VPN kaynaklarını karşılaştırma.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Uzaktan çalışanlar",
  },
  badge: "Remote work",
  h1: "Uzaktan çalışanlar için VPN",
  lede: "Otel, kafe ve co-working alanlarında halka açık Wi-Fi güvenliği, müşteri dosyası koruması ve seyahat bağlantısı özelliklerini karşılaştırın.",
  picks: {
    heading: "Uzaktan çalışanlar için karşılaştırılabilecek sağlayıcı profilleri",
    subheading: "Protokol özellikleri, güvenlik araçları ve seyahat senaryolarına göre.",
    items: [
      {
        slug: "expressvpn",
        label: "Zayıf Wi-Fi için değerlendirilebilir",
        reason:
          "Sağlayıcının Lightway protokolü bağlantı geçişlerini yönetmek üzere tasarlanmıştır. Sağlayıcı verisine göre 105+ ülkede sunucu bulunur; güncel konum listesini ve kill switch davranışını işletim sistemi ile uygulama sürümünde kontrol et.",
      },
      {
        slug: "nordvpn",
        label: "NordLynx + Threat Protection",
        reason:
          "NordLynx, WireGuard tabanlı hafif bir tünel seçeneğidir. Threat Protection'ın bilinen zararlı alan adlarını filtrelediğini sağlayıcı belirtmektedir; plan kapsamını kontrol et ve throughput'u kendi rota ve cihazında ölç.",
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
    p: "Otel, kafe, havaalanı ve co-working ağları yanlış yapılandırılmış veya güvenilmeyen cihazlarla paylaşılmış olabilir. HTTPS içerik şifrelemesi sağlar; bir VPN ise cihaz ile VPN sunucusu arasına ek bir şifreli tünel koyar. DNS, kill switch ve otomatik bağlantı davranışını kullandığın ağda ve cihazda ayrıca doğrula.",
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
      ["Amaç", "Şirket içi sistemlere uzaktan erişim", "Ayarlarda kapsanan internet trafiğini tünelleme"],
      ["Şifreleme", "Şirkete giden trafik", "Uygulama ayarının kapsadığı trafik"],
      ["İzleme", "İşveren görebilir", "Sağlayıcıya bağlı (no-logs ideali)"],
      ["Kişisel kullanım uygunluğu", "Genelde yasak (politika)", "Tamamen senin trafiğin"],
      ["Halka açık Wi-Fi kapsamı", "Genellikle şirket trafiği", "Sağlayıcı ve split-tunneling ayarına bağlı"],
    ],
    adviceBold: "Tavsiye:",
    adviceText:
      " Şirket VPN'ini işveren politikasına göre şirket sistemleri için kullan. Kişisel trafik için ikinci bir VPN düşünüyorsan iki istemcinin birlikte çalışmasının garanti olmadığını unutma; split-tunneling ve uyumluluğu işveren belgelerinde ve kendi cihazında doğrula.",
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
        text: " VPN trafiğinin kısıtlandığı ağlarda değerlendirilebilir; sağlayıcı desteğini, yerel kuralları ve özelliğin kendi ağındaki davranışını kontrol et.",
      },
      {
        bold: "Kill switch:",
        text: " Sağlayıcının belgelerine göre tünel kesildiğinde trafiği durdurmak üzere tasarlanır; işletim sistemi ve uygulama sürümündeki davranışı test et.",
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
      p: "Sağlayıcının güncel sunucu listesinde Türkiye konumu bulunması, Türk IP'si gerektiren hizmetlerde değerlendirilebilir. Banka, e-fatura ve e-Devlet kendi güvenlik kontrollerini uygulayabilir; hesabınla uyumluluğu ve hizmet koşullarını seyahatten önce doğrula.",
    },
    privacy: {
      h3: "Yüksek gizlilik (hukuk, medikal, gazetecilik)",
      link1: { href: "/inceleme/mullvad", text: "Mullvad" },
      sep: " veya ",
      link2: { href: "/inceleme/proton-vpn", text: "Proton VPN" },
      after:
        ". Sağlayıcıların hesap, açık kaynak istemci ve kayıt tutma açıklamalarını; güncel bağımsız denetim raporlarıyla birlikte kontrol et.",
    },
    budget: {
      h3: "Bütçe öncelikli freelancer",
      link: { href: "/inceleme/surfshark", text: "Surfshark" },
      after:
        " sağlayıcının sınırsız eşzamanlı cihaz politikasını sunuyor. Güncel fiyatı, hesap paylaşım koşullarını ve hız davranışını satın almadan önce kendi bağlantında doğrula.",
    },
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Şirket VPN'i varken ticari VPN'e gerek var mı?",
      a: "İki farklı amaca hizmet ederler. Şirket VPN'i şirket içi kaynaklara erişim sağlar; ticari VPN ise uygulama ve split-tunneling ayarlarının kapsadığı trafiği VPN sunucusuna kadar şifreler. İki istemciyi birlikte kullanmadan önce işveren politikasını ve cihaz uyumluluğunu doğrula.",
    },
    {
      q: "Hangi VPN seyahatte istikrarlı çalışıyor?",
      a: "ExpressVPN Lightway ve NordVPN NordLynx (WireGuard tabanlı) zayıf ağ koşullarında değerlendirilebilecek protokollerdir. Bazı otel Wi-Fi'leri VPN trafiğini engelleyebilir; bu durumda sağlayıcının obfuscation/scrambling özelliği (Surfshark NoBorders, NordVPN obfuscated servers) incelenebilir. Gerçek davranış ağ ve cihaz koşullarına bağlıdır.",
    },
    {
      q: "Müşteri dosyalarını paylaşırken VPN şart mı?",
      a: "Hassas dosyalarda VPN, cihaz ile VPN sunucusu arasındaki trafiğe ek şifreleme sağlar; ancak dosya paylaşım servisinin uçtan uca güvenliğini, erişim izinlerini veya cihaz güvenliğini garanti etmez. Kurum politikanı izle ve DNS/kill switch davranışını kullandığın ağda doğrula.",
    },
    {
      q: "Hangi ülke sunucusu freelance ödeme almak için en iyi?",
      a: "Bazı freelance platformları (Upwork, Fiverr) Türkiye'den ödeme kabul ederken bazı kısıtlamalar uygular. Stripe, PayPal'da ABD/AB sunucusu kullanmak hesap sorunlarına yol açabilir — sadece halka açık Wi-Fi koruması için kendi ülkene en yakın sunucu kullan.",
    },
    {
      q: "Slack, Zoom gibi araçlar VPN üzerinden çalışır mı?",
      a: "Slack ve Zoom standart VPN tünelleri üzerinden genellikle çalışabilir; gecikme, MTU, güvenlik duvarı ve şirket politikası sonucu değiştirebilir. Uygulama belgelerindeki ağ gereksinimlerini kontrol et ve toplantı öncesi kendi bağlantınla ses, video ve ekran paylaşımını dene.",
    },
  ],
  cards: [
    { title: "Kafe & co-working", desc: "Halka açık Wi-Fi için şifreli tünel." },
    { title: "Müşteri dosyaları", desc: "Hassas transferler için şifreli tünel." },
    { title: "Seyahat", desc: "Ağ ve hesap uyumluluğunu önceden kontrol et." },
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
    "Choosing a VPN as a remote worker: compare public Wi-Fi protection, sensitive file security, corporate VPN differences and travel-connectivity sources.",
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
    "A source-based guide to VPN features for public Wi-Fi security in hotels, cafés and co-working spaces.",
  breadcrumb: {
    home: "Home",
    guides: "Guides",
    current: "Remote workers",
  },
  badge: "Remote work",
  h1: "VPN for remote workers",
  lede: "Three VPN profiles for public Wi-Fi in hotels, cafés and co-working spaces, client-file workflows and travel connectivity.",
  picks: {
    heading: "Provider profiles to compare for remote workers",
    subheading: "Compared by protocol features, security tools and travel scenarios.",
    items: [
      {
        slug: "expressvpn",
        label: "Option for changing networks",
        reason:
          "The provider documents Lightway as a protocol designed to handle network changes. Provider data lists servers in 105+ countries; confirm the current locations and test reconnection and kill-switch behavior on your own operating system and Wi-Fi.",
      },
      {
        slug: "nordvpn",
        label: "NordLynx + Threat Protection",
        reason:
          "NordLynx is based on WireGuard and is designed as a lightweight tunneling option. The provider says Threat Protection filters known malicious domains; verify availability for your plan and measure throughput on your own route and device.",
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
    p: "Hotel, café, airport and co-working networks can be misconfigured or shared with untrusted devices. HTTPS encrypts content, while a VPN adds an encrypted tunnel between the device and VPN server. Verify DNS, kill-switch and auto-connect behavior on the network and device you actually use.",
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
      ["Purpose", "Remote access to internal company systems", "Tunneling internet traffic covered by app settings"],
      ["Encryption", "Traffic to the company", "Traffic covered by the app's settings"],
      ["Monitoring", "Employer can see it", "Depends on the provider (no-logs is the ideal)"],
      ["Suitability for personal use", "Usually prohibited (policy)", "Entirely your own traffic"],
      ["Public Wi-Fi scope", "Usually company traffic", "Depends on provider and split-tunneling settings"],
    ],
    adviceBold: "Our advice:",
    adviceText:
      " Use the corporate VPN for company systems according to employer policy. If you consider a second VPN for personal traffic, do not assume both clients will work together; confirm split-tunneling and compatibility in employer documentation and on your device.",
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
        text: " Worth considering on networks that restrict VPN traffic; check provider support, local rules and behavior on your own network.",
      },
      {
        bold: "Kill switch:",
        text: " Provider documentation describes it as stopping traffic when the tunnel drops; test the behavior on your operating system and app version.",
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
      p: "A Türkiye location in the provider's current server list may be useful for services that expect a Turkish IP. Banks, e-invoice services and e-Devlet can apply their own security checks; verify account compatibility and terms before traveling.",
    },
    privacy: {
      h3: "High privacy (legal, medical, journalism)",
      link1: { href: "/inceleme/mullvad", text: "Mullvad" },
      sep: " or ",
      link2: { href: "/inceleme/proton-vpn", text: "Proton VPN" },
      after:
        ". Review each provider's account, open-source client and logging statements together with its latest independent audit reports.",
    },
    budget: {
      h3: "Budget-first freelancer",
      link: { href: "/inceleme/surfshark", text: "Surfshark" },
      after:
        " advertises unlimited simultaneous devices. Check current pricing, account-sharing terms and performance on your own connection before subscribing.",
    },
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Do I need a commercial VPN if I already have a corporate VPN?",
      a: "They serve different purposes. A corporate VPN provides access to internal resources; a commercial VPN encrypts traffic covered by its app and split-tunneling settings up to the VPN server. Before running both clients, verify employer policy and compatibility on your device.",
    },
    {
      q: "Which VPN works reliably while traveling?",
      a: "ExpressVPN documents Lightway as handling network changes, while NordVPN describes NordLynx as its WireGuard-based protocol. Some hotel networks may block VPN traffic, so review provider documentation for obfuscation features and test connection, reconnection and kill-switch behavior on your own device and network.",
    },
    {
      q: "Is a VPN a must when sharing client files?",
      a: "A VPN adds encryption between your device and the VPN server, but it does not guarantee the file-sharing service's end-to-end security, access permissions or endpoint safety. Follow company policy and verify DNS and kill-switch behavior on the network you use.",
    },
    {
      q: "Which country's server is best for receiving freelance payments?",
      a: "Some freelance platforms (Upwork, Fiverr) apply certain restrictions when accepting payments from Türkiye. Using a US/EU server with Stripe or PayPal can lead to account problems — use the server closest to your own country, purely for public Wi-Fi protection.",
    },
    {
      q: "Do tools like Slack and Zoom work over a VPN?",
      a: "Slack and Zoom can generally operate through standard VPN tunnels, but latency, MTU, firewall rules and company policy can change the result. Check the apps' network requirements and test audio, video and screen sharing on your own connection before a meeting.",
    },
  ],
  cards: [
    { title: "Cafés & co-working", desc: "Add an encrypted tunnel on public Wi-Fi." },
    { title: "Client files", desc: "An encrypted tunnel for sensitive transfers." },
    { title: "Travel", desc: "Check network and account compatibility in advance." },
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
    "VPN-Wahl für Remote-Arbeitende: Schutz im öffentlichen WLAN, sensible Dateien, Unterschiede zum Firmen-VPN und Reiseverbindungs-Funktionen der 3 besten VPNs.",
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
  lede: "Vergleichen Sie Anbieterquellen zu öffentlichem WLAN in Hotel, Café und Co-working-Space, Kundendateien und Reiseverbindungen.",
  picks: {
    heading: "Vergleichbare Anbieterprofile für Remote-Arbeitende",
    subheading: "Verglichen nach Protokollmerkmalen, Sicherheitstools und Reise-Szenarien.",
    items: [
      {
        slug: "expressvpn",
        label: "Option bei wechselnden Netzwerken",
        reason:
          "Der Anbieter beschreibt Lightway als Protokoll für den Umgang mit Netzwerkwechseln. Laut Anbieterangaben gibt es Server in 105+ Ländern; prüfe die aktuelle Standortliste sowie Wiederverbindung und Kill Switch auf deinem Betriebssystem und WLAN.",
      },
      {
        slug: "nordvpn",
        label: "NordLynx + Threat Protection",
        reason:
          "NordLynx basiert auf WireGuard und ist als leichtgewichtige Tunneloption konzipiert. Laut Anbieter filtert Threat Protection bekannte schädliche Domains; prüfe die Verfügbarkeit in deinem Tarif und miss den Durchsatz auf deiner eigenen Route und deinem Gerät.",
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
    p: "Netze in Hotels, Cafés, Flughäfen und Co-working-Spaces können falsch konfiguriert oder mit nicht vertrauenswürdigen Geräten geteilt sein. HTTPS verschlüsselt Inhalte; ein VPN ergänzt einen verschlüsselten Tunnel zwischen Gerät und VPN-Server. Prüfe DNS, Kill Switch und Auto-Verbindung im tatsächlich genutzten Netz und auf deinem Gerät.",
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
      ["Zweck", "Fernzugriff auf interne Firmensysteme", "Tunneln des von App-Einstellungen erfassten Verkehrs"],
      ["Verschlüsselung", "Verkehr zur Firma", "Von den App-Einstellungen erfasster Verkehr"],
      ["Überwachung", "Arbeitgeber kann mitsehen", "Vom Anbieter abhängig (No-Logs ist das Ideal)"],
      ["Eignung für private Nutzung", "Meist verboten (Richtlinie)", "Komplett dein eigener Verkehr"],
      ["Umfang im öffentlichen WLAN", "Meist Firmenverkehr", "Abhängig von Anbieter und Split-Tunneling"],
    ],
    adviceBold: "Unsere Empfehlung:",
    adviceText:
      " Nutze das Firmen-VPN gemäß Arbeitgeberrichtlinie für Firmensysteme. Bei einem zweiten VPN für privaten Verkehr ist ein paralleler Betrieb nicht garantiert; prüfe Split-Tunneling und Kompatibilität in der Arbeitgeberdokumentation und auf deinem Gerät.",
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
        text: " Bei Netzen mit VPN-Sperren erwägenswert; prüfe Anbieterunterstützung, lokale Regeln und das Verhalten in deinem eigenen Netz.",
      },
      {
        bold: "Kill Switch:",
        text: " Laut Anbieterdokumentation soll er bei Tunnelabbruch den Verkehr stoppen; teste das Verhalten mit deinem Betriebssystem und deiner App-Version.",
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
      p: "Ein Türkei-Standort in der aktuellen Serverliste kann für Dienste nützlich sein, die eine türkische IP erwarten. Banken, E-Rechnungsdienste und e-Devlet können eigene Sicherheitsprüfungen einsetzen; prüfe Kontokompatibilität und Bedingungen vor der Reise.",
    },
    privacy: {
      h3: "Hoher Datenschutz (Recht, Medizin, Journalismus)",
      link1: { href: "/inceleme/mullvad", text: "Mullvad" },
      sep: " oder ",
      link2: { href: "/inceleme/proton-vpn", text: "Proton VPN" },
      after:
        ". Prüfe Konto-, Open-Source-Client- und Protokollierungsangaben der Anbieter zusammen mit den neuesten unabhängigen Prüfberichten.",
    },
    budget: {
      h3: "Freelancer mit knappem Budget",
      link: { href: "/inceleme/surfshark", text: "Surfshark" },
      after:
        " wirbt mit unbegrenzt vielen gleichzeitigen Geräten. Prüfe aktuelle Preise, Regeln zur Kontonutzung und Leistung vor dem Abschluss in deinem eigenen Netz.",
    },
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Brauche ich ein kommerzielles VPN, wenn ich schon ein Firmen-VPN habe?",
      a: "Sie dienen verschiedenen Zwecken. Das Firmen-VPN ermöglicht Zugriff auf interne Ressourcen; ein kommerzielles VPN verschlüsselt den von App- und Split-Tunneling-Einstellungen erfassten Verkehr bis zum VPN-Server. Prüfe Arbeitgeberrichtlinie und Gerätekompatibilität, bevor beide Clients laufen.",
    },
    {
      q: "Welches VPN läuft auf Reisen stabil?",
      a: "ExpressVPN beschreibt Lightway als Protokoll für Netzwerkwechsel; NordVPN dokumentiert NordLynx als WireGuard-basierte Option. Manche Hotel-WLANs blockieren VPN-Verkehr. Prüfe daher die Anbieterdokumentation zu Verschleierung und teste Verbindung, Wiederverbindung und Kill Switch in deinem eigenen Netz.",
    },
    {
      q: "Ist ein VPN beim Teilen von Kundendateien Pflicht?",
      a: "Ein VPN ergänzt die Verschlüsselung zwischen Gerät und VPN-Server, garantiert aber weder Ende-zu-Ende-Sicherheit des Dateidienstes noch korrekte Zugriffsrechte oder Endgeräteschutz. Befolge die Firmenrichtlinie und prüfe DNS sowie Kill Switch im verwendeten Netz.",
    },
    {
      q: "Welcher Länderserver ist für Freelance-Zahlungen am besten?",
      a: "Manche Freelance-Plattformen (Upwork, Fiverr) wenden bei Zahlungen aus der Türkei bestimmte Einschränkungen an. Ein US-/EU-Server bei Stripe oder PayPal kann zu Kontoproblemen führen — nutze den Server, der deinem eigenen Land am nächsten liegt, rein zum Schutz im öffentlichen WLAN.",
    },
    {
      q: "Funktionieren Tools wie Slack und Zoom über ein VPN?",
      a: "Slack und Zoom können grundsätzlich über Standard-VPN-Tunnel laufen; Latenz, MTU, Firewall-Regeln und Firmenrichtlinien können das Ergebnis verändern. Prüfe die Netzwerkanforderungen und teste Audio, Video und Bildschirmfreigabe vor einem Termin in deinem eigenen Netz.",
    },
  ],
  cards: [
    { title: "Café & Co-working", desc: "Verschlüsselter Tunnel im öffentlichen WLAN." },
    { title: "Kundendateien", desc: "Verschlüsselter Tunnel für sensible Transfers." },
    { title: "Reisen", desc: "Netz- und Kontokompatibilität vorab prüfen." },
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
