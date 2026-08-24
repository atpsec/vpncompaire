// "Yurt dışındaki Türkler için VPN" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/guide/yurt-disindaki-turkler-icin-vpn/page.tsx) bu
// modülden render eder; yerelleştirilmiş URL'ler (/guide/yurt-disindaki-turkler-icin-vpn,
// /en/guide/vpn-for-turks-abroad, /de/ratgeber/vpn-fuer-tuerken-im-ausland)
// proxy rewrite ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

type PickContent = { slug: string; label: string; reason: string };

export type VpnForTurksAbroadContent = {
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
  scenariosH2: string;
  scenario1: { h3: string; p: string };
  scenario2: { h3: string; p: string; note: BoldItem };
  scenario3: { h3: string; p: string };
  scenario4: { h3: string; p: string };
  countryTable: { h2: string; head: string[]; rows: string[][] };
  turkeyServers: {
    h2: string;
    intro: string;
    items: { href: string; linkText: string; text: string }[];
    outro: string;
  };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cards: { title: string; desc: string }[];
  relatedLabel: string;
  relatedLinks: { href: string; text: string }[];
};

const tr: VpnForTurksAbroadContent = {
  metaTitle:
    "Yurt Dışındaki Türkler İçin En İyi VPN (2026) — BluTV, Exxen, Bankacılık",
  metaDescription:
    "Yurt dışında BluTV, Exxen, TRT, Türk bankacılığı ve devlet servisleri için Türkiye sunucusu belgeleyen VPN profilleri. Güncel uyumluluğu resmi kaynaklardan kontrol edin.",
  keywords: [
    "yurt dışından türkiye vpn",
    "almanya türkiye vpn",
    "blutv yurt dışı",
    "exxen yurt dışı vpn",
    "türk bankası yurt dışı erişim",
    "trt izle yurt dışından",
  ],
  ogTitle: "Yurt Dışındaki Türkler İçin En İyi VPN (2026)",
  ogDescription:
    "BluTV, Exxen ve Türk bankacılığı senaryoları için Türkiye sunucusu belgeleyen VPN profilleri.",
  badge: "Diaspora",
  h1: "Yurt dışındaki Türkler için VPN",
  lede: "Almanya, ABD, İngiltere ve Hollanda'dan Türkiye bağlantısı arayanlar için sağlayıcıların belgelediği Türkiye sunucularını inceliyoruz. BluTV, Exxen, TRT, bankacılık ve e-Devlet uyumluluğunu kullanmadan önce kendi hesabınızla kontrol edin.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Yurt dışındaki Türkler",
  },
  picksHeading: "Yurt dışındaki Türkler için karşılaştırılabilecek sağlayıcı profilleri",
  picksSubheading: "Sağlayıcıların belgelediği Türkiye konumu, protokol ve cihaz politikalarına göre.",
  picks: [
    {
      slug: "nordvpn",
      label: "Genel kullanım için aday",
      reason:
        "Sağlayıcı verisine göre Türkiye sanal sunucusu ve NordLynx protokolü mevcut. BluTV, Exxen ve TRT uyumluluğu IP havuzu, bölge ve platform politikalarına göre değişebilir; güncel durumu resmi kaynaklardan ve kendi hesabınızla kontrol edin.",
    },
    {
      slug: "expressvpn",
      label: "Türkiye erişimi için değerlendirilebilir",
      reason:
        "Sağlayıcının Lightway protokolü hızlı bağlantı kurulumu hedefler. Türkiye sunucusu ve platform uyumluluğu bölge, IP havuzu ve ağ koşullarına göre değişir. Premium fiyat seviyesinde değerlendirme gerektirebilir.",
    },
    {
      slug: "surfshark",
      label: "Bütçe + çoklu cihaz",
      reason:
        "Sağlayıcı politikasına göre sınırsız eşzamanlı cihaz desteği ile tüm aile cihazları tek hesapla yönetilebilir. Sağlayıcı verisine göre Türkiye sunucusu mevcut.",
    },
  ],
  scenariosH2: "Yurt dışından Türkiye'ye bağlanma senaryoları",
  scenario1: {
    h3: "1. Türk dizilerini izlemek",
    p: "BluTV, Exxen, GAİN, TabiiGo ve TRT katalogları yayın haklarına ve bölgeye göre değişebilir. Türkiye konumu sunan bir VPN farklı bir IP sağlayabilir; ancak platformlar VPN IP'lerini engelleyebildiği için erişim garanti değildir. Güncel koşulları resmi hizmet sayfasından ve kendi hesabınızla kontrol edin.",
  },
  scenario2: {
    h3: "2. Türk bankacılığı",
    p: "Akbank, İş Bankası, Garanti BBVA, Ziraat gibi bankalar yurt dışı IP'leri risk olarak değerlendirir. Bazı işlemler (havale, yüksek tutarlı ödemeler) ek doğrulama veya tamamen engelleme ile karşılaşabilir. Türkiye IP'si bu sürtüşmeyi azaltır.",
    note: {
      bold: "Önemli:",
      text: " Bazı bankalar VPN tespiti yapar (özellikle mobil bankacılık uygulamaları). Bu durumda VPN'i kapatıp mobil veriye geçmen gerekebilir.",
    },
  },
  scenario3: {
    h3: "3. e-Devlet ve resmi servisler",
    p: "e-Devlet portalı yabancı IP'den açılabilir; bazı işlemler ek doğrulama isteyebilir. Türkiye sunucusu bağlantı koşullarını değiştirebilir, ancak erişim veya doğrulama sonucu garanti etmez.",
  },
  scenario4: {
    h3: "4. WhatsApp/Telegram/sosyal medya kısıtlamaları",
    p: "Bazı ülkelerde (Çin, BAE, Rusya) Türkiye'deki yakınlarınla iletişim için kullandığın servisler engelli. VPN, herhangi bir ülke sunucusuna bağlanarak bu engeli aşar.",
  },
  countryTable: {
    h2: "Hangi şehirden hangi VPN?",
    head: ["Yaşadığın ülke", "Önerilen VPN", "Neden"],
    rows: [
      [
        "Almanya, Avusturya, Hollanda",
        "NordVPN",
        "Sağlayıcı Türkiye sanal konumu ve NordLynx desteği belgeliyor; gecikmeyi kendi hattında ölç",
      ],
      [
        "İngiltere, İrlanda",
        "ExpressVPN",
        "Sağlayıcı Lightway ve Türkiye konumu belgeliyor; rotayı kendi bağlantında kontrol et",
      ],
      [
        "ABD, Kanada",
        "ExpressVPN veya NordVPN",
        "Her iki sağlayıcı da Türkiye konumu belgeliyor; Atlantik rotası ve gecikme kullanıcıya göre değişir",
      ],
      [
        "Körfez (BAE, Suudi Arabistan)",
        "Surfshark + NoBorders modu",
        "Sağlayıcı NoBorders ve Türkiye konumu belgeliyor; erişim sonucunu ayrıca kontrol et",
      ],
      [
        "Bütçe öncelikli (her yerden)",
        "Surfshark",
        "Sınırsız cihaz — tüm aile kullanabilir",
      ],
    ],
  },
  turkeyServers: {
    h2: "Türkiye sunucusu olan VPN'ler",
    intro:
      "Mevcut sağlayıcı sunucu dizinleri ve profillerinde Türkiye konumu belgeleyen örnekler aşağıdadır. Dizinler ve sanal konumlar değişebileceği için abone olmadan önce sağlayıcının güncel listesini kontrol edin:",
    items: [
      {
        href: "/reviews/nordvpn",
        linkText: "NordVPN",
        text: " — sağlayıcının güncel dizininde sanal Türkiye konumu listeleniyor",
      },
      {
        href: "/reviews/expressvpn",
        linkText: "ExpressVPN",
        text: " — sağlayıcının sunucu dizininde sanal Türkiye konumu listeleniyor",
      },
      {
        href: "/reviews/surfshark",
        linkText: "Surfshark",
        text: " — sağlayıcı Türkiye konumu ve sınırsız eşzamanlı cihaz politikasını belgeliyor",
      },
      {
        href: "/reviews/cyberghost",
        linkText: "CyberGhost",
        text: " — sağlayıcının sunucu dizininde Türkiye konumu listeleniyor",
      },
      {
        href: "/reviews/pia",
        linkText: "PIA",
        text: " — sağlayıcının dizininde Türkiye konumu listeleniyor; port forwarding kapsamını ayrıca doğrulayın",
      },
    ],
    outro:
      "Sunucu dizinleri zamanla değişir. Listede olmayan bir sağlayıcı için de güncel resmi sunucu dizinini ve Türkiye konumunun fiziksel mi sanal mı olduğunu kontrol edin.",
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Almanya'dan BluTV'yi izleyebilir miyim?",
      a: "Türkiye sunucusu olan bir VPN değerlendirilebilir. NordVPN, ExpressVPN ve Surfshark Türkiye sanal sunucusu sunduğunu belirtir; BluTV uyumluluğu IP havuzu ve platform politikaları nedeniyle zamanla değişebilir.",
    },
    {
      q: "Türk bankası yabancı IP'den giriş engellemiyor mu?",
      a: "Bazı bankalar (Akbank, İş Bankası, Garanti BBVA) yurt dışı IP'leri risk olarak işaretler ve ek doğrulama isteyebilir. Türkiye sunuculu VPN ile bağlanmak bu sürtüşmeyi azaltır. Ancak bazı bankalar VPN tespiti yapabilir — bu durumda mobil veriye geçmek gerekebilir.",
    },
    {
      q: "Hangi ülkelerde Türk içeriklere erişim sorun?",
      a: "Almanya, ABD, İngiltere, Hollanda, Fransa gibi Türk diasporasının yoğun olduğu ülkelerde BluTV, Exxen, TRT coğrafi olarak kısıtlanmıştır. Türk kanalları (TV+ üzerinden) ve devlet servisleri (e-Devlet) de yabancı IP'den sorun çıkarabilir.",
    },
    {
      q: "TRT canlı yayın yurt dışından çalışır mı?",
      a: "TRT içeriğinin kullanılabilirliği yayın haklarına, bölgeye ve güncel IP politikalarına göre değişebilir. Türkiye konumu sunan bir VPN erişim seçeneği sağlayabilir, ancak sonucu garanti etmez; resmi TRT sayfasını ve kendi hesabınızı kontrol edin.",
    },
    {
      q: "e-Devlet'e yurt dışından VPN'le bağlanmak yasal mı?",
      a: "Hukuki ve teknik durum bulunduğun ülkeye, güncel kurallara ve e-Devlet'in güvenlik politikalarına bağlıdır. Resmi erişim yöntemlerini kullan, güncel koşulları kontrol et ve gerekirse hukuki görüş al; bu rehber hukuki tavsiye değildir.",
    },
  ],
  cards: [
    { title: "BluTV & Exxen", desc: "Türk dizileri, maçlar, canlı yayın." },
    { title: "Bankacılık", desc: "Türk bankası login'i kolaylaştır." },
    { title: "e-Devlet", desc: "Resmi işlemler için Türkiye IP'si." },
  ],
  relatedLabel: "İlgili sayfalar",
  relatedLinks: [
    {
      href: "/best-vpn/turks-abroad",
      text: "Diaspora kullanım senaryosu",
    },
    { href: "/best-vpn/streaming", text: "Streaming için en iyi" },
    { href: "/quiz", text: "Quiz: Sana uygun VPN" },
  ],
};

const en: VpnForTurksAbroadContent = {
  metaTitle: "Best VPN for Turks Abroad (2026) — BluTV, Exxen, Banking",
  metaDescription:
    "Provider profiles documenting Türkiye servers for accessing BluTV, Exxen, TRT, Turkish banking and government services from abroad. Check current compatibility on official sources.",
  keywords: [
    "turkey vpn from abroad",
    "germany turkey vpn",
    "blutv abroad",
    "exxen abroad vpn",
    "turkish bank access abroad",
    "watch trt from abroad",
  ],
  ogTitle: "Best VPN for Turks Abroad (2026)",
  ogDescription:
    "VPN profiles documenting Türkiye servers for BluTV, Exxen and Turkish banking scenarios.",
  badge: "Diaspora",
  h1: "VPN information guide for Turks abroad",
  lede: "A review of provider-documented Türkiye server options for people connecting from Germany, the US, the UK and the Netherlands. Check BluTV, Exxen, TRT, banking and e-Devlet compatibility with your own account before use.",
  breadcrumb: { home: "Home", guides: "Guides", current: "Turks abroad" },
  picksHeading: "Provider profiles to compare for Turks abroad",
  picksSubheading: "Based on provider-documented Türkiye locations, protocols and device policies.",
  picks: [
    {
      slug: "nordvpn",
      label: "Candidate for general use",
      reason:
        "According to provider data, a virtual Türkiye server and NordLynx protocol are available. BluTV, Exxen and TRT compatibility depends on the current IP pool and platform policy; check the official service before subscribing.",
    },
    {
      slug: "expressvpn",
      label: "Türkiye location to evaluate",
      reason:
        "The provider documents Lightway as a fast-setup protocol. Türkiye coverage and platform compatibility depend on the current IP pool, route and network; its premium price point may require consideration.",
    },
    {
      slug: "surfshark",
      label: "Budget + multi-device",
      reason:
        "According to the provider's policy, unlimited simultaneous device support lets you manage all family devices with a single account. According to provider data, a Türkiye server is available.",
    },
  ],
  scenariosH2: "Scenarios for connecting to Türkiye from abroad",
  scenario1: {
    h3: "1. Watching Turkish series",
    p: "BluTV, Exxen, GAİN, TabiiGo and TRT catalogs can vary by licensing rights and region. A VPN offering a Türkiye location can provide a different IP, but platforms may block VPN addresses, so access is not guaranteed. Check the service's current terms and your own account before subscribing.",
  },
  scenario2: {
    h3: "2. Turkish banking",
    p: "Banks like Akbank, İş Bankası, Garanti BBVA and Ziraat treat foreign IPs as a risk. Some transactions (transfers, high-value payments) may face extra verification or outright blocking. A Türkiye IP reduces that friction.",
    note: {
      bold: "Important:",
      text: " Some banks detect VPNs (especially mobile banking apps). In that case you may need to turn off the VPN and switch to mobile data.",
    },
  },
  scenario3: {
    h3: "3. e-Devlet and official services",
    p: "The e-Devlet portal may open from a foreign IP, while some transactions can require extra verification. A Türkiye server changes the connection route but does not guarantee access or the verification outcome.",
  },
  scenario4: {
    h3: "4. WhatsApp/Telegram/social media restrictions",
    p: "In some countries (China, UAE, Russia) the services you use to stay in touch with loved ones in Türkiye are blocked. A VPN gets around the block by connecting to a server in any country.",
  },
  countryTable: {
    h2: "Which VPN from which country?",
    head: ["Country you live in", "Recommended VPN", "Why"],
    rows: [
      [
        "Germany, Austria, Netherlands",
        "NordVPN",
        "The provider documents a virtual Türkiye location and NordLynx; measure latency on your own line",
      ],
      [
        "UK, Ireland",
        "ExpressVPN",
        "The provider documents Lightway and a Türkiye location; check the route on your own connection",
      ],
      [
        "US, Canada",
        "ExpressVPN or NordVPN",
        "Both providers document a Türkiye location; transatlantic routing and latency vary by user",
      ],
      [
        "Gulf (UAE, Saudi Arabia)",
        "Surfshark + NoBorders mode",
        "The provider documents NoBorders and a Türkiye location; verify the current access result",
      ],
      [
        "Budget first (from anywhere)",
        "Surfshark",
        "Unlimited devices — the whole family can use it",
      ],
    ],
  },
  turkeyServers: {
    h2: "VPNs with a Türkiye server",
    intro:
      "The current provider server directories and profiles below document a Türkiye location. Directories and virtual locations can change, so verify the provider's latest list before subscribing:",
    items: [
      {
        href: "/reviews/nordvpn",
        linkText: "NordVPN",
        text: " — the provider's current directory lists a virtual Türkiye location",
      },
      {
        href: "/reviews/expressvpn",
        linkText: "ExpressVPN",
        text: " — the provider's server directory lists a virtual Türkiye location",
      },
      {
        href: "/reviews/surfshark",
        linkText: "Surfshark",
        text: " — the provider documents a Türkiye location and unlimited simultaneous devices",
      },
      {
        href: "/reviews/cyberghost",
        linkText: "CyberGhost",
        text: " — the provider's server directory lists a Türkiye location",
      },
      {
        href: "/reviews/pia",
        linkText: "PIA",
        text: " — the provider's directory lists a Türkiye location; verify port-forwarding coverage separately",
      },
    ],
    outro:
      "Server directories change over time. For any unlisted provider, check its current official directory and whether the Türkiye location is physical or virtual.",
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Can I watch BluTV from Germany?",
      a: "A VPN with a Türkiye location may be an option. NordVPN, ExpressVPN and Surfshark document Türkiye locations, but BluTV compatibility changes with IP pools and platform policy; check the official service and your own account before subscribing.",
    },
    {
      q: "Don't Turkish banks block logins from foreign IPs?",
      a: "Some banks (Akbank, İş Bankası, Garanti BBVA) flag foreign IPs as a risk and may ask for extra verification. Connecting through a VPN with a Türkiye server reduces that friction. However, some banks can detect VPNs — in that case you may need to switch to mobile data.",
    },
    {
      q: "In which countries is access to Turkish content a problem?",
      a: "In countries with a large Turkish diaspora — Germany, the US, the UK, the Netherlands, France — BluTV, Exxen and TRT are geo-restricted. Turkish channels (via TV+) and government services (e-Devlet) can also cause problems from a foreign IP.",
    },
    {
      q: "Does TRT live streaming work from abroad?",
      a: "TRT availability can vary by licensing rights, region and current IP policy. A VPN offering a Türkiye location may provide an access option, but it cannot guarantee the result; check the official TRT service and your own account.",
    },
    {
      q: "Is it legal to connect to e-Devlet from abroad with a VPN?",
      a: "The legal and technical position depends on your location, current rules and e-Devlet security policy. Use official access methods, check current conditions and seek legal advice when needed; this guide is not legal advice.",
    },
  ],
  cards: [
    { title: "BluTV & Exxen", desc: "Turkish series, matches, live TV." },
    { title: "Banking", desc: "Make Turkish bank logins easier." },
    { title: "e-Devlet", desc: "A Türkiye IP for official transactions." },
  ],
  relatedLabel: "Related pages",
  relatedLinks: [
    { href: "/best-vpn/turks-abroad", text: "Diaspora use case" },
    { href: "/best-vpn/streaming", text: "Best for streaming" },
    { href: "/quiz", text: "Quiz: the right VPN for you" },
  ],
};

const de: VpnForTurksAbroadContent = {
  metaTitle:
    "Das beste VPN für Türken im Ausland (2026) — BluTV, Exxen, Banking",
  metaDescription:
    "Anbieterprofile mit dokumentierten Türkei-Servern für BluTV, Exxen, TRT, türkisches Banking und Behördendienste aus dem Ausland. Aktuelle Kompatibilität selbst prüfen.",
  keywords: [
    "türkei vpn aus dem ausland",
    "deutschland türkei vpn",
    "blutv im ausland",
    "exxen ausland vpn",
    "türkische bank zugriff ausland",
    "trt aus dem ausland schauen",
  ],
  ogTitle: "Das beste VPN für Türken im Ausland (2026)",
  ogDescription:
    "VPN-Profile mit dokumentiertem Türkei-Standort für BluTV, Exxen und türkische Banking-Szenarien.",
  badge: "Diaspora",
  h1: "VPN-Informationsratgeber für Türken im Ausland",
  lede: "Ein Überblick über von Anbietern dokumentierte Türkei-Server für Verbindungen aus Deutschland, den USA, Großbritannien und den Niederlanden. Prüfe die aktuelle Kompatibilität mit BluTV, Exxen, TRT, Banking und e-Devlet vor der Nutzung selbst.",
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "Türken im Ausland",
  },
  picksHeading: "Vergleichbare Anbieterprofile für Türken im Ausland",
  picksSubheading: "Nach dokumentiertem Türkei-Standort, Protokollen und Geräterichtlinien der Anbieter.",
  picks: [
    {
      slug: "nordvpn",
      label: "Kandidat für den Alltag",
      reason:
        "Laut Anbieterdaten sind ein virtueller Türkei-Standort und NordLynx verfügbar. Die Kompatibilität mit BluTV, Exxen und TRT hängt vom aktuellen IP-Pool und der Plattformrichtlinie ab; prüfe den Dienst vor dem Abschluss selbst.",
    },
      {
        slug: "expressvpn",
        label: "Zu prüfender Türkei-Standort",
        reason:
          "Der Anbieter beschreibt Lightway als Protokoll für schnellen Verbindungsaufbau. Türkei-Abdeckung und Plattformkompatibilität hängen vom aktuellen IP-Pool, der Route und dem Netz ab; das Premium-Preisniveau will abgewogen sein.",
    },
    {
      slug: "surfshark",
      label: "Budget + viele Geräte",
      reason:
        "Laut Anbieterrichtlinie lassen sich dank unbegrenzter gleichzeitiger Geräte alle Familiengeräte mit einem einzigen Konto verwalten. Laut Anbieterdaten ist ein Türkei-Server verfügbar.",
    },
  ],
  scenariosH2: "Szenarien für die Verbindung in die Türkei aus dem Ausland",
  scenario1: {
    h3: "1. Türkische Serien schauen",
    p: "Die Kataloge von BluTV, Exxen, GAİN, TabiiGo und TRT können je nach Lizenzrechten und Region variieren. Ein VPN mit Türkei-Standort kann eine andere IP bereitstellen; Plattformen können VPN-Adressen jedoch sperren, daher ist der Zugriff nicht garantiert. Prüfe vor dem Abo die aktuellen Dienstbedingungen und dein eigenes Konto.",
  },
  scenario2: {
    h3: "2. Türkisches Banking",
    p: "Banken wie Akbank, İş Bankası, Garanti BBVA und Ziraat stufen ausländische IPs als Risiko ein. Manche Transaktionen (Überweisungen, hohe Zahlungen) können auf zusätzliche Verifizierung oder komplette Sperrung stoßen. Eine Türkei-IP reduziert diese Reibung.",
    note: {
      bold: "Wichtig:",
      text: " Manche Banken erkennen VPNs (besonders Mobile-Banking-Apps). In dem Fall musst du das VPN eventuell ausschalten und auf mobile Daten wechseln.",
    },
  },
  scenario3: {
    h3: "3. e-Devlet und offizielle Dienste",
    p: "Das e-Devlet-Portal kann sich von einer ausländischen IP öffnen; manche Vorgänge verlangen zusätzliche Verifizierung. Ein Türkei-Server ändert die Verbindungsroute, garantiert aber weder den Zugriff noch das Verifizierungsergebnis.",
  },
  scenario4: {
    h3: "4. WhatsApp/Telegram/Social-Media-Einschränkungen",
    p: "In manchen Ländern (China, VAE, Russland) sind die Dienste gesperrt, mit denen du mit deinen Liebsten in der Türkei in Kontakt bleibst. Ein VPN umgeht die Sperre, indem es sich mit einem Server in einem beliebigen Land verbindet.",
  },
  countryTable: {
    h2: "Welches VPN aus welchem Land?",
    head: ["Land, in dem du lebst", "Empfohlenes VPN", "Warum"],
    rows: [
      [
        "Deutschland, Österreich, Niederlande",
        "NordVPN",
        "Der Anbieter dokumentiert einen virtuellen Türkei-Standort und NordLynx; miss die Latenz auf deiner eigenen Leitung",
      ],
      [
        "Großbritannien, Irland",
        "ExpressVPN",
        "Der Anbieter dokumentiert Lightway und einen Türkei-Standort; prüfe die Route mit deiner eigenen Verbindung",
      ],
      [
        "USA, Kanada",
        "ExpressVPN oder NordVPN",
        "Beide Anbieter dokumentieren einen Türkei-Standort; Atlantik-Route und Latenz variieren je nach Nutzer",
      ],
      [
        "Golf (VAE, Saudi-Arabien)",
        "Surfshark + NoBorders-Modus",
        "Der Anbieter dokumentiert NoBorders und einen Türkei-Standort; prüfe das aktuelle Zugriffsergebnis",
      ],
      [
        "Budget zuerst (von überall)",
        "Surfshark",
        "Unbegrenzte Geräte — die ganze Familie kann es nutzen",
      ],
    ],
  },
  turkeyServers: {
    h2: "VPNs mit Türkei-Server",
    intro:
      "Die folgenden aktuellen Serververzeichnisse und Anbieterprofile dokumentieren einen Türkei-Standort. Verzeichnisse und virtuelle Standorte können sich ändern; prüfe vor dem Abo die neueste Anbieterliste:",
    items: [
      {
        href: "/reviews/nordvpn",
        linkText: "NordVPN",
        text: " — das aktuelle Anbieterverzeichnis listet einen virtuellen Türkei-Standort",
      },
      {
        href: "/reviews/expressvpn",
        linkText: "ExpressVPN",
        text: " — das Serververzeichnis des Anbieters listet einen virtuellen Türkei-Standort",
      },
      {
        href: "/reviews/surfshark",
        linkText: "Surfshark",
        text: " — der Anbieter dokumentiert einen Türkei-Standort und unbegrenzt viele gleichzeitige Geräte",
      },
      {
        href: "/reviews/cyberghost",
        linkText: "CyberGhost",
        text: " — das Serververzeichnis des Anbieters listet einen Türkei-Standort",
      },
      {
        href: "/reviews/pia",
        linkText: "PIA",
        text: " — das Anbieterverzeichnis listet einen Türkei-Standort; Port-Forwarding-Abdeckung separat prüfen",
      },
    ],
    outro:
      "Serververzeichnisse ändern sich. Prüfe bei jedem nicht aufgeführten Anbieter das aktuelle offizielle Verzeichnis und ob der Türkei-Standort physisch oder virtuell ist.",
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Kann ich BluTV aus Deutschland schauen?",
      a: "Ein VPN mit Türkei-Standort kann eine Option sein. NordVPN, ExpressVPN und Surfshark dokumentieren Türkei-Standorte; die BluTV-Kompatibilität ändert sich jedoch mit IP-Pools und Plattformrichtlinien. Prüfe vor dem Abo den offiziellen Dienst und dein eigenes Konto.",
    },
    {
      q: "Blockieren türkische Banken den Login von ausländischen IPs nicht?",
      a: "Manche Banken (Akbank, İş Bankası, Garanti BBVA) markieren ausländische IPs als Risiko und können zusätzliche Verifizierung verlangen. Die Verbindung über ein VPN mit Türkei-Server reduziert diese Reibung. Manche Banken können VPNs jedoch erkennen — dann musst du eventuell auf mobile Daten wechseln.",
    },
    {
      q: "In welchen Ländern ist der Zugriff auf türkische Inhalte ein Problem?",
      a: "In Ländern mit großer türkischer Diaspora wie Deutschland, den USA, Großbritannien, den Niederlanden und Frankreich sind BluTV, Exxen und TRT geo-beschränkt. Auch türkische Sender (über TV+) und Behördendienste (e-Devlet) können von einer ausländischen IP Probleme machen.",
    },
    {
      q: "Funktioniert der TRT-Livestream aus dem Ausland?",
      a: "Die TRT-Verfügbarkeit kann je nach Lizenzrechten, Region und aktueller IP-Richtlinie variieren. Ein VPN mit Türkei-Standort kann eine Zugriffsoption bieten, garantiert das Ergebnis aber nicht; prüfe den offiziellen TRT-Dienst und dein eigenes Konto.",
    },
    {
      q: "Ist es legal, sich aus dem Ausland per VPN mit e-Devlet zu verbinden?",
      a: "Ja. Ein VPN, das ein türkischer Staatsbürger nutzt, um auf sein eigenes Behördenportal zuzugreifen, ist völlig legal — keine verbotene Aktivität, nur ein geografischer Bypass.",
    },
  ],
  cards: [
    { title: "BluTV & Exxen", desc: "Türkische Serien, Spiele, Live-TV." },
    {
      title: "Banking",
      desc: "Mach den Login bei türkischen Banken leichter.",
    },
    { title: "e-Devlet", desc: "Eine Türkei-IP für offizielle Vorgänge." },
  ],
  relatedLabel: "Verwandte Seiten",
  relatedLinks: [
    {
      href: "/best-vpn/turks-abroad",
      text: "Diaspora-Anwendungsfall",
    },
    { href: "/best-vpn/streaming", text: "Die besten fürs Streaming" },
    { href: "/quiz", text: "Quiz: Das passende VPN für dich" },
  ],
};

const CONTENT: Record<AppLocale, VpnForTurksAbroadContent> = { tr, en, de };

export function getVpnForTurksAbroadContent(
  locale: string,
): VpnForTurksAbroadContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
