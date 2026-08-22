// "Gamerlar için VPN" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/rehber/gamerlar-icin-vpn/page.tsx) bu modülden
// render eder; yerelleştirilmiş URL'ler (/rehber/gamerlar-icin-vpn,
// /en/guide/vpn-for-gamers, /de/ratgeber/vpn-fuer-gamer) proxy rewrite ile
// aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

type PickContent = { slug: string; label: string; reason: string };

export type GamersContent = {
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
  whenMakesSense: {
    h2: string;
    good: { h3: string; items: BoldItem[] };
    bad: { h3: string; items: BoldItem[] };
  };
  pingImpact: {
    h2: string;
    intro: string;
    headers: string[];
    rows: string[][];
    resultBold: string;
    resultText: string;
  };
  ddos: {
    h2: string;
    intro: string;
    layers: BoldItem[];
    outro: string;
  };
  regionHopping: { h2: string; paragraphs: BoldItem[] };
  console: { h2: string; intro: string; steps: BoldItem[] };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cards: { title: string; desc: string }[];
  related: { label: string; links: { href: string; text: string }[] };
};

const tr: GamersContent = {
  metaTitle:
    "Gamerlar İçin En İyi VPN (2026) — Düşük Ping, DDoS Koruması, Bölge Atlama",
  metaDescription:
    "Oyuncular için VPN: ping/jitter öz-kontrolü, DDoS koruması, oyun sunucusu bölge değişimi (Valorant, CS2, LoL). 2026 gaming VPN rehberi.",
  keywords: [
    "gaming vpn",
    "oyun vpn",
    "düşük ping vpn",
    "ddos koruması",
    "valorant vpn",
    "cs2 vpn",
    "league of legends vpn bölge",
  ],
  ogTitle: "Gamerlar İçin En İyi VPN (2026)",
  ogDescription:
    "Düşük ping, DDoS koruması ve bölge bypass için en iyi gaming VPN'leri.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Gamerlar için VPN",
  },
  badge: "Gaming",
  h1: "Gamerlar için en iyi VPN",
  lede: "Düşük ping hedefi, DDoS koruması ve bölge seçenekleri için 3 VPN profili. Valorant, CS2, League of Legends ve Fortnite gibi senaryolarda karar verirken ağ koşullarını ayrıca değerlendirin.",
  picks: {
    heading: "Gamerlar için en iyi 3 VPN",
    subheading: "Sağlayıcı belgeleri, protokol özellikleri ve öz-test ölçütlerine göre.",
    items: [
      {
        slug: "nordvpn",
        label: "Düşük gecikme hedefleyen protokol",
        reason:
          "NordLynx, WireGuard tabanlı bir protokol olarak düşük gecikme hedefleyen oyuncular için değerlendirilebilir. Gerçek ping artışı rota, sunucu yükü ve ISP'ye göre değişir. Threat Protection ek bir güvenlik katmanı sunar.",
      },
      {
        slug: "expressvpn",
        label: "Düşük gecikme hedefleyen protokol",
        reason:
          "Lightway protokolü hızlı bağlantı kurulumu hedefler. Sağlayıcı verisine göre 105+ ülkede sunucu bulunur; Pazifik veya Asya sunucularına bağlanırken rota ve gecikme ayrıca kontrol edilmelidir.",
      },
      {
        slug: "pia",
        label: "Port forwarding + uzun dönem fiyat",
        reason:
          "Sağlayıcı politikasına göre port forwarding (peer-to-peer oyunlar için) ve açık kaynak istemci sunulmaktadır. Uzun dönem planda aylık $2.03 fiyatla gamer bütçesine uygun bir seçenek olabilir.",
      },
    ],
  },
  whenMakesSense: {
    h2: "Gaming için VPN — ne zaman mantıklı, ne zaman değil?",
    good: {
      h3: "Mantıklı senaryolar",
      items: [
        {
          bold: "DDoS saldırısına maruz kaldıysan:",
          text: " Rakip oyuncu IP'ni öğrendi — VPN yeni IP verir, saldırı VPN sunucusuna gider.",
        },
        {
          bold: "ISP throttling:",
          text: " Bazı ISP'ler oyun trafiğini yavaşlatır. VPN bu davranışı bypass edebilir.",
        },
        {
          bold: "Bölge bazlı oyun erişimi:",
          text: " Çin'e özel oyunlar veya bölge kısıtlı sunucular.",
        },
        {
          bold: "Erken erişim:",
          text: " Yeni oyunlar bazı bölgelerde önce çıkar.",
        },
        {
          bold: "Halka açık Wi-Fi'den oynamak:",
          text: " Yurtta, kafede, otelde — DDoS riski artar.",
        },
      ],
    },
    bad: {
      h3: "Mantıksız/zararlı senaryolar",
      items: [
        {
          bold: "Daha düşük ping için:",
          text: " VPN ek hop ekler — neredeyse her zaman ping'i yükseltir. ISP routing'in çok kötüyse ender istisna.",
        },
        {
          bold: "Hile için:",
          text: " VPN aim-bot, wallhack gibi hileleri gizlemez. Oyun yayıncısı tespit ederse hesap banlanır.",
        },
        {
          bold: "Sıralı/turnuva maçlarında:",
          text: " Riot Games gibi yayıncılar bölge değişimi tespit ederse hesabı askıya alır.",
        },
      ],
    },
  },
  pingImpact: {
    h2: "Ping etkisi — kendi bağlantında nasıl kontrol edilir?",
    intro:
      "Aynı cihaz, bağlantı türü ve oyun sunucusunda VPN kapalı ve açık ölçümleri art arda karşılaştırın; sonuçları farklı saatlerde tekrarlayın:",
    headers: ["Kontrol", "Nasıl ölçülür?", "Ne aranır?"],
    rows: [
      [
        "Baz ping (VPN kapalı)",
        "Aynı oyun sunucusunda birkaç tekrar yapın; saat ve bağlantı türünü not edin.",
        "VPN ölçümleri için kararlı bir referans oluşturun.",
      ],
      [
        "VPN ping'i",
        "Aynı koşullarda en yakın ve hedef bölgedeki VPN sunucularını ayrı ayrı deneyin.",
        "Baz değere göre değişimi ve tekrarlar arasındaki tutarlılığı karşılaştırın.",
      ],
      [
        "Jitter",
        "Tek bir anlık değer yerine art arda örnekler alın.",
        "Daha az dalgalanma, oyun sırasında daha istikrarlı gecikmeye işaret eder.",
      ],
      [
        "Paket kaybı / rota tutarlılığı",
        "Paket kaybını ve farklı saatlerde rotanın değişip değişmediğini kontrol edin.",
        "Paket kaybı olmayan, tekrar edilebilir bir rota tercih edin.",
      ],
    ],
    resultBold: "Sonuç:",
    resultText:
      " Sağlayıcı belgeleri tek başına ping sıralaması kanıtlamaz. Yakınlık, sunucu yükü, protokol ve ISP rotası sonucu değiştirir; karar vermeden önce kendi oyun sunucunuzda ping, jitter ve paket kaybını karşılaştırın.",
  },
  ddos: {
    h2: "DDoS koruması — gerçek koruma seviyesi",
    intro: "VPN DDoS koruması iki katmanda çalışır:",
    layers: [
      {
        bold: "IP gizleme:",
        text: " Saldırgan gerçek IP'ni göremez, sadece VPN sunucusunun IP'sini.",
      },
      {
        bold: "VPN sağlayıcı altyapısı:",
        text: " Büyük sağlayıcıların (NordVPN, ExpressVPN) sunucu altyapısı DDoS koruma katmanı içerir.",
      },
    ],
    outro:
      "Hardcore esports oyuncuları için VPN tek başına yeterli değil — Cloudflare Spectrum veya benzeri kurumsal koruma da gerekebilir. Casual streaming ve ranked oyunlar için VPN yeterli.",
  },
  regionHopping: {
    h2: "Bölge atlama — riskleri ve sınırlamaları",
    paragraphs: [
      {
        bold: "Riot Games (Valorant, LoL):",
        text: " Bölge tespit sistemi agresif. Hesap askıya alma riski yüksek. Sadece DDoS koruması için kendi bölgendeki sunucuyu kullan.",
      },
      {
        bold: "Steam:",
        text: " Bölge bazlı fiyat farkı 2022'ye göre çok azaldı. Bölge değiştirme hesap askıya alma sebebi.",
      },
      {
        bold: "PlayStation/Xbox Store:",
        text: " Bölge değişimi tespit edilirse hesap askıya alınabilir; ödeme yöntemleri farklı bölgelerde çalışmaz.",
      },
      {
        bold: "Genel öneri:",
        text: " Bölge atlama yerine VPN'i DDoS koruması ve kendi bölgendeki ağ kalitesi için kullan.",
      },
    ],
  },
  console: {
    h2: "Konsol kurulumu — router yöntemi",
    intro: "PlayStation, Xbox ve Switch'te doğrudan VPN uygulaması yok. Çözüm:",
    steps: [
      {
        bold: "Router'a kur:",
        text: " ASUS, GL.iNet, OPNsense gibi router'lar VPN istemci destekler.",
      },
      {
        bold: "PC paylaşımı:",
        text: " PC'de VPN aç → Mobil hotspot veya ethernet paylaşımıyla konsola ver.",
      },
      {
        bold: "Smart DNS:",
        text: " NordVPN SmartDNS özelliği ile konsoldan DNS değiştirerek bazı kısıtlamaları aşabilirsin (DDoS koruması olmaz).",
      },
    ],
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "VPN oyunda ping'i düşürür mü yoksa yükseltir mi?",
      a: "Genelde ek bir hop eklediği için yükseltir. ISP'nin kötü yönlendirme yaptığı bazı rotalarda farklı bir VPN rotası daha iyi sonuç verebilir; ancak bunu sağlayıcı adına genellemek mümkün değildir. Deneme süresi içinde aynı oyun sunucusunda kendi bağlantınızı karşılaştırın.",
    },
    {
      q: "VPN kullanmak yasak mı? Hesap banlanır mı?",
      a: "Çoğu oyun yayıncısının kullanım şartlarında 'farklı bölgeden oynamak' yasak ama VPN tespiti zayıf. Riot Games (Valorant, LoL) en agresif denetim yapar — bölge değiştirmek için VPN kullanırken yakalanırsan ban riski var. Sadece DDoS koruması için kullanıyorsan risk minimum.",
    },
    {
      q: "DDoS saldırısına karşı VPN nasıl korur?",
      a: "Saldırgan gerçek IP'ni göremez — VPN sunucusunun IP'sini görür. DDoS saldırısı VPN sunucusuna yapılır, sen değil. Sıralı maçlarda (CS2, Valorant, Fortnite turnuvaları) sürekli yenilen IP'lerle korunursun.",
    },
    {
      q: "Hangi VPN PlayStation/Xbox'ta çalışır?",
      a: "Konsollar VPN uygulamasını desteklemez. Çözüm: VPN'i router'a kur (ExpressVPN, NordVPN, Surfshark router kılavuzları sunar). Veya PC'de VPN açıp internet paylaşımı yap.",
    },
    {
      q: "Türkiye sunucu fiyatları daha ucuz mu?",
      a: "Bazı oyunlarda evet — Steam bölge fiyatlandırması Türkiye'de daha düşüktü ama 2022'den sonra büyük ölçüde dolarize oldu. PlayStation Store ve Xbox Store'da bazı oyunlar hâlâ ucuz, ama VPN ile bölge değiştirmek hesap askıya alınmasına yol açabilir.",
    },
  ],
  cards: [
    { title: "Düşük gecikme", desc: "WireGuard tabanlı protokoller." },
    { title: "DDoS koruması", desc: "IP gizleme + altyapı koruma." },
    { title: "105+ ülke", desc: "Bölge bypass (riske dikkat)." },
  ],
  related: {
    label: "İlgili sayfalar",
    links: [
      { href: "/en-iyi/oyun", text: "Oyun için en iyi VPN" },
      {
        href: "/rehber/vpn-guvenlik-kontrol-listesi",
        text: "Güvenlik kontrol listesi",
      },
      { href: "/sana-uygun-vpn", text: "Quiz: Sana uygun VPN" },
    ],
  },
};

const en: GamersContent = {
  metaTitle:
    "Best VPN for Gamers (2026) — Low Ping, DDoS Protection, Region Hopping",
  metaDescription:
    "VPNs for gamers: self-checking ping and jitter, DDoS protection and switching game server regions (Valorant, CS2, LoL). A 2026 gaming VPN guide.",
  keywords: [
    "gaming vpn",
    "vpn for games",
    "low ping vpn",
    "ddos protection",
    "valorant vpn",
    "cs2 vpn",
    "league of legends vpn region",
  ],
  ogTitle: "Best VPN for Gamers (2026)",
  ogDescription:
    "The best gaming VPNs for low ping, DDoS protection and region bypass.",
  breadcrumb: {
    home: "Home",
    guides: "Guides",
    current: "VPN for gamers",
  },
  badge: "Gaming",
  h1: "Best VPN for gamers",
  lede: "Three VPN profiles to consider for latency, DDoS protection and region options. Compare them against your own route and game-server conditions.",
  picks: {
    heading: "Top 3 VPNs for gamers",
    subheading: "Selected using provider documentation, protocol features and self-test criteria.",
    items: [
      {
        slug: "nordvpn",
        label: "Protocol designed for low overhead",
        reason:
          "NordLynx is documented as a WireGuard-based protocol and can be considered when minimizing protocol overhead matters. Actual latency depends on the route, server load and ISP; compare it on your own game server.",
      },
      {
        slug: "expressvpn",
        label: "Protocol designed for fast setup",
        reason:
          "The provider documents Lightway as a protocol designed for fast connection setup. Its directory lists servers in 105+ countries; route quality and latency still need to be checked on your own connection.",
      },
      {
        slug: "pia",
        label: "Port forwarding + long-term price",
        reason:
          "According to provider policy, port forwarding (for peer-to-peer games) and an open-source client are offered. At $2.03 per month on the long-term plan, it can be a budget-friendly option for gamers.",
      },
    ],
  },
  whenMakesSense: {
    h2: "A VPN for gaming — when does it make sense, and when not?",
    good: {
      h3: "Sensible scenarios",
      items: [
        {
          bold: "If you've been hit by a DDoS attack:",
          text: " A rival player got hold of your IP — a VPN gives you a new one, and the attack goes to the VPN server instead.",
        },
        {
          bold: "ISP throttling:",
          text: " Some ISPs slow down gaming traffic. A VPN can bypass this behavior.",
        },
        {
          bold: "Region-locked game access:",
          text: " China-exclusive games or region-restricted servers.",
        },
        {
          bold: "Early access:",
          text: " New games launch earlier in some regions.",
        },
        {
          bold: "Playing on public Wi-Fi:",
          text: " In a dorm, café or hotel — the DDoS risk increases.",
        },
      ],
    },
    bad: {
      h3: "Pointless or harmful scenarios",
      items: [
        {
          bold: "For lower ping:",
          text: " A VPN adds an extra hop — it almost always raises ping. The rare exception is when your ISP's routing is very bad.",
        },
        {
          bold: "For cheating:",
          text: " A VPN doesn't hide cheats like aim bots or wallhacks. If the game publisher detects it, your account gets banned.",
        },
        {
          bold: "In ranked/tournament matches:",
          text: " Publishers like Riot Games suspend accounts if they detect a region switch.",
        },
      ],
    },
  },
  pingImpact: {
    h2: "Ping impact — how to self-test your connection",
    intro:
      "Compare VPN-off and VPN-on measurements back to back on the same device, connection type and game server, then repeat at different times:",
    headers: ["Check", "How to measure", "What to look for"],
    rows: [
      [
        "Baseline ping (VPN off)",
        "Run several checks on the same game server; note the time and connection type.",
        "Create a stable reference for the VPN measurements.",
      ],
      [
        "VPN ping",
        "Under the same conditions, test the nearest VPN server and the target-region server separately.",
        "Compare the change from baseline and consistency across repeats.",
      ],
      [
        "Jitter",
        "Collect consecutive samples instead of relying on one instant reading.",
        "Lower variation indicates more consistent latency during play.",
      ],
      [
        "Packet loss / route consistency",
        "Check packet loss and whether the route changes at different times.",
        "Prefer a repeatable route without packet loss.",
      ],
    ],
    resultBold: "Bottom line:",
    resultText:
      " Provider documentation alone cannot prove a ping ranking. Distance, server load, protocol and ISP routing change the result; compare ping, jitter and packet loss on your own game server before deciding.",
  },
  ddos: {
    h2: "DDoS protection — the real level of protection",
    intro: "VPN DDoS protection works in two layers:",
    layers: [
      {
        bold: "IP masking:",
        text: " The attacker can't see your real IP, only the VPN server's.",
      },
      {
        bold: "VPN provider infrastructure:",
        text: " The server infrastructure of major providers (NordVPN, ExpressVPN) includes a DDoS protection layer.",
      },
    ],
    outro:
      "For hardcore esports players a VPN alone isn't enough — Cloudflare Spectrum or similar enterprise-grade protection may also be needed. For casual streaming and ranked games, a VPN is sufficient.",
  },
  regionHopping: {
    h2: "Region hopping — risks and limitations",
    paragraphs: [
      {
        bold: "Riot Games (Valorant, LoL):",
        text: " Aggressive region-detection system. High risk of account suspension. Use a server in your own region, purely for DDoS protection.",
      },
      {
        bold: "Steam:",
        text: " Regional price differences have shrunk a lot compared to 2022. Switching regions is grounds for account suspension.",
      },
      {
        bold: "PlayStation/Xbox Store:",
        text: " If a region switch is detected, the account can be suspended; payment methods don't work across regions.",
      },
      {
        bold: "General advice:",
        text: " Instead of region hopping, use the VPN for DDoS protection and better network quality within your own region.",
      },
    ],
  },
  console: {
    h2: "Console setup — the router method",
    intro:
      "There's no native VPN app on PlayStation, Xbox or Switch. The solution:",
    steps: [
      {
        bold: "Install it on the router:",
        text: " Routers like ASUS, GL.iNet and OPNsense support VPN clients.",
      },
      {
        bold: "Share from a PC:",
        text: " Turn the VPN on on your PC → share it with the console via mobile hotspot or ethernet sharing.",
      },
      {
        bold: "Smart DNS:",
        text: " With NordVPN's SmartDNS feature you can change the DNS on the console to get around some restrictions (no DDoS protection).",
      },
    ],
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Does a VPN lower or raise ping in games?",
      a: "It usually raises it because it adds another hop. On a route where the ISP has poor peering, a different VPN route may perform better, but that cannot be generalized to one provider. Compare the same game server on your own connection during the trial period.",
    },
    {
      q: "Is using a VPN against the rules? Will I get banned?",
      a: "Most game publishers' terms of service prohibit 'playing from a different region', but VPN detection is weak. Riot Games (Valorant, LoL) enforces this most aggressively — if you're caught using a VPN to switch regions, there's a ban risk. If you only use it for DDoS protection, the risk is minimal.",
    },
    {
      q: "How does a VPN protect against DDoS attacks?",
      a: "The attacker can't see your real IP — they see the VPN server's IP. The DDoS attack hits the VPN server, not you. In ranked matches (CS2, Valorant, Fortnite tournaments) you stay protected with constantly refreshed IPs.",
    },
    {
      q: "Which VPN works on PlayStation/Xbox?",
      a: "Consoles don't support VPN apps. The solution: install the VPN on your router (ExpressVPN, NordVPN and Surfshark provide router guides). Or turn the VPN on on a PC and share the internet connection.",
    },
    {
      q: "Are server prices cheaper in Türkiye?",
      a: "For some games, yes — Steam regional pricing used to be lower in Türkiye, but after 2022 it became largely dollarized. Some games are still cheaper on the PlayStation Store and Xbox Store, but switching regions with a VPN can get the account suspended.",
    },
  ],
  cards: [
    { title: "Low latency", desc: "WireGuard-based protocols." },
    { title: "DDoS protection", desc: "IP masking + infrastructure defense." },
    { title: "105+ countries", desc: "Region bypass (mind the risk)." },
  ],
  related: {
    label: "Related pages",
    links: [
      { href: "/en-iyi/oyun", text: "Best VPN for gaming" },
      {
        href: "/guide/vpn-security-checklist",
        text: "Security checklist",
      },
      { href: "/sana-uygun-vpn", text: "Quiz: the right VPN for you" },
    ],
  },
};

const de: GamersContent = {
  metaTitle:
    "Das beste VPN für Gamer (2026) — Niedriger Ping, DDoS-Schutz, Region wechseln",
  metaDescription:
    "VPN für Gamer: Ping und Jitter selbst prüfen, DDoS-Schutz und Wechsel der Spielserver-Region (Valorant, CS2, LoL). Gaming-VPN-Ratgeber 2026.",
  keywords: [
    "gaming vpn",
    "vpn für spiele",
    "niedriger ping vpn",
    "ddos schutz",
    "valorant vpn",
    "cs2 vpn",
    "league of legends vpn region",
  ],
  ogTitle: "Das beste VPN für Gamer (2026)",
  ogDescription:
    "Die besten Gaming-VPNs für niedrigen Ping, DDoS-Schutz und Region-Bypass.",
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "VPN für Gamer",
  },
  badge: "Gaming",
  h1: "Das beste VPN für Gamer",
  lede: "Drei VPN-Profile für Latenz, DDoS-Schutz und Regionsoptionen. Vergleiche sie mit deiner eigenen Route und den Bedingungen deines Spielservers.",
  picks: {
    heading: "Die 3 besten VPNs für Gamer",
    subheading: "Ausgewählt nach Anbieterdokumentation, Protokollmerkmalen und Selbsttest-Kriterien.",
    items: [
      {
        slug: "nordvpn",
        label: "Protokoll mit geringem Overhead als Ziel",
        reason:
          "NordLynx ist laut Anbieter ein WireGuard-basiertes Protokoll und kommt infrage, wenn geringer Protokoll-Overhead wichtig ist. Die tatsächliche Latenz hängt von Route, Serverlast und ISP ab; prüfe sie auf deinem eigenen Spielserver.",
      },
      {
        slug: "expressvpn",
        label: "Protokoll für schnellen Verbindungsaufbau",
        reason:
          "Der Anbieter beschreibt Lightway als Protokoll für einen schnellen Verbindungsaufbau. Das Verzeichnis nennt Server in mehr als 105 Ländern; Routenqualität und Latenz musst du dennoch mit deiner eigenen Verbindung prüfen.",
      },
      {
        slug: "pia",
        label: "Port-Forwarding + Langzeitpreis",
        reason:
          "Laut Anbieter-Richtlinie werden Port-Forwarding (für Peer-to-Peer-Spiele) und ein Open-Source-Client angeboten. Mit $2.03 pro Monat im Langzeittarif kann es eine budgetfreundliche Option für Gamer sein.",
      },
    ],
  },
  whenMakesSense: {
    h2: "VPN fürs Gaming — wann ist es sinnvoll, wann nicht?",
    good: {
      h3: "Sinnvolle Szenarien",
      items: [
        {
          bold: "Wenn du Ziel eines DDoS-Angriffs warst:",
          text: " Ein gegnerischer Spieler hat deine IP herausgefunden — das VPN gibt dir eine neue, der Angriff trifft den VPN-Server.",
        },
        {
          bold: "ISP-Throttling:",
          text: " Manche ISPs drosseln Gaming-Traffic. Ein VPN kann dieses Verhalten umgehen.",
        },
        {
          bold: "Regionsgebundener Spielezugang:",
          text: " China-exklusive Spiele oder regional beschränkte Server.",
        },
        {
          bold: "Early Access:",
          text: " Neue Spiele erscheinen in manchen Regionen früher.",
        },
        {
          bold: "Spielen im öffentlichen WLAN:",
          text: " Im Wohnheim, Café oder Hotel — das DDoS-Risiko steigt.",
        },
      ],
    },
    bad: {
      h3: "Sinnlose oder schädliche Szenarien",
      items: [
        {
          bold: "Für niedrigeren Ping:",
          text: " Ein VPN fügt einen zusätzlichen Hop hinzu — es erhöht den Ping fast immer. Die seltene Ausnahme: wenn das Routing deines ISP sehr schlecht ist.",
        },
        {
          bold: "Zum Cheaten:",
          text: " Ein VPN verbirgt keine Cheats wie Aim-Bots oder Wallhacks. Erkennt der Spielepublisher das, wird dein Konto gebannt.",
        },
        {
          bold: "In Ranked-/Turnier-Matches:",
          text: " Publisher wie Riot Games sperren das Konto, wenn sie einen Regionswechsel erkennen.",
        },
      ],
    },
  },
  pingImpact: {
    h2: "Ping-Einfluss — die eigene Verbindung prüfen",
    intro:
      "Vergleiche Messungen mit und ohne VPN direkt nacheinander auf demselben Gerät, Verbindungstyp und Spielserver und wiederhole sie zu verschiedenen Zeiten:",
    headers: ["Prüfung", "So misst du", "Worauf du achtest"],
    rows: [
      [
        "Basis-Ping (VPN aus)",
        "Führe mehrere Prüfungen auf demselben Spielserver durch und notiere Uhrzeit sowie Verbindungstyp.",
        "Erstelle eine stabile Referenz für die VPN-Messungen.",
      ],
      [
        "VPN-Ping",
        "Teste unter denselben Bedingungen den nächstgelegenen und den Zielregions-VPN-Server getrennt.",
        "Vergleiche die Änderung zur Basis und die Konstanz der Wiederholungen.",
      ],
      [
        "Jitter",
        "Sammle mehrere aufeinanderfolgende Werte statt nur einer Momentaufnahme.",
        "Geringere Schwankungen deuten auf eine gleichmäßigere Latenz beim Spielen hin.",
      ],
      [
        "Paketverlust / Routenkonstanz",
        "Prüfe Paketverlust und ob sich die Route zu verschiedenen Zeiten ändert.",
        "Bevorzuge eine wiederholbare Route ohne Paketverlust.",
      ],
    ],
    resultBold: "Fazit:",
    resultText:
      " Anbieterdokumentation allein belegt keine Ping-Rangfolge. Entfernung, Serverlast, Protokoll und ISP-Routing verändern das Ergebnis; vergleiche vor der Entscheidung Ping, Jitter und Paketverlust auf deinem eigenen Spielserver.",
  },
  ddos: {
    h2: "DDoS-Schutz — das tatsächliche Schutzniveau",
    intro: "Der DDoS-Schutz eines VPN arbeitet auf zwei Ebenen:",
    layers: [
      {
        bold: "IP-Maskierung:",
        text: " Der Angreifer sieht nicht deine echte IP, sondern nur die des VPN-Servers.",
      },
      {
        bold: "Infrastruktur des VPN-Anbieters:",
        text: " Die Serverinfrastruktur großer Anbieter (NordVPN, ExpressVPN) enthält eine DDoS-Schutzschicht.",
      },
    ],
    outro:
      "Für Hardcore-Esports-Spieler reicht ein VPN allein nicht — Cloudflare Spectrum oder vergleichbarer Enterprise-Schutz kann zusätzlich nötig sein. Für Casual-Streaming und Ranked-Spiele genügt ein VPN.",
  },
  regionHopping: {
    h2: "Region wechseln — Risiken und Grenzen",
    paragraphs: [
      {
        bold: "Riot Games (Valorant, LoL):",
        text: " Aggressives Regions-Erkennungssystem. Hohes Risiko einer Kontosperrung. Nutze nur einen Server in deiner eigenen Region — rein für den DDoS-Schutz.",
      },
      {
        bold: "Steam:",
        text: " Die regionalen Preisunterschiede sind im Vergleich zu 2022 stark geschrumpft. Ein Regionswechsel ist ein Grund für eine Kontosperrung.",
      },
      {
        bold: "PlayStation/Xbox Store:",
        text: " Wird ein Regionswechsel erkannt, kann das Konto gesperrt werden; Zahlungsmethoden funktionieren nicht über Regionen hinweg.",
      },
      {
        bold: "Generelle Empfehlung:",
        text: " Nutze das VPN statt für Region-Hopping lieber für DDoS-Schutz und bessere Netzqualität in deiner eigenen Region.",
      },
    ],
  },
  console: {
    h2: "Konsolen-Setup — die Router-Methode",
    intro:
      "Auf PlayStation, Xbox und Switch gibt es keine native VPN-App. Die Lösung:",
    steps: [
      {
        bold: "Auf dem Router installieren:",
        text: " Router wie ASUS, GL.iNet und OPNsense unterstützen VPN-Clients.",
      },
      {
        bold: "Über den PC teilen:",
        text: " VPN auf dem PC aktivieren → per mobilem Hotspot oder Ethernet-Freigabe an die Konsole weitergeben.",
      },
      {
        bold: "Smart DNS:",
        text: " Mit NordVPNs SmartDNS-Funktion kannst du auf der Konsole den DNS ändern und so manche Beschränkungen umgehen (kein DDoS-Schutz).",
      },
    ],
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Senkt oder erhöht ein VPN den Ping im Spiel?",
      a: "Meist erhöht es ihn wegen des zusätzlichen Hops. Bei schlechtem Peering des ISP kann eine andere VPN-Route besser abschneiden; das lässt sich jedoch nicht pauschal einem Anbieter zuschreiben. Vergleiche denselben Spielserver während der Testphase mit deiner eigenen Verbindung.",
    },
    {
      q: "Ist die VPN-Nutzung verboten? Wird mein Konto gebannt?",
      a: "Die Nutzungsbedingungen der meisten Spielepublisher verbieten das 'Spielen aus einer anderen Region', aber die VPN-Erkennung ist schwach. Riot Games (Valorant, LoL) kontrolliert am aggressivsten — wirst du beim Regionswechsel per VPN erwischt, besteht Ban-Risiko. Nutzt du es nur für DDoS-Schutz, ist das Risiko minimal.",
    },
    {
      q: "Wie schützt ein VPN vor DDoS-Angriffen?",
      a: "Der Angreifer sieht deine echte IP nicht — er sieht die IP des VPN-Servers. Der DDoS-Angriff trifft den VPN-Server, nicht dich. In Ranked-Matches (CS2, Valorant, Fortnite-Turniere) bist du durch ständig erneuerte IPs geschützt.",
    },
    {
      q: "Welches VPN funktioniert auf PlayStation/Xbox?",
      a: "Konsolen unterstützen keine VPN-Apps. Die Lösung: das VPN auf dem Router installieren (ExpressVPN, NordVPN und Surfshark bieten Router-Anleitungen). Oder auf dem PC das VPN aktivieren und die Internetverbindung teilen.",
    },
    {
      q: "Sind die Preise auf türkischen Servern günstiger?",
      a: "Bei manchen Spielen ja — die Steam-Regionalpreise waren in der Türkei niedriger, wurden nach 2022 aber weitgehend dollarisiert. Im PlayStation Store und Xbox Store sind manche Spiele noch günstiger, aber ein Regionswechsel per VPN kann zur Kontosperrung führen.",
    },
  ],
  cards: [
    { title: "Niedrige Latenz", desc: "WireGuard-basierte Protokolle." },
    { title: "DDoS-Schutz", desc: "IP-Maskierung + Infrastruktur-Schutz." },
    { title: "105+ Länder", desc: "Region-Bypass (Risiko beachten)." },
  ],
  related: {
    label: "Verwandte Seiten",
    links: [
      { href: "/en-iyi/oyun", text: "Das beste VPN fürs Gaming" },
      {
        href: "/ratgeber/vpn-sicherheits-checkliste",
        text: "Sicherheits-Checkliste",
      },
      { href: "/sana-uygun-vpn", text: "Quiz: Das passende VPN für dich" },
    ],
  },
};

const CONTENT: Record<AppLocale, GamersContent> = { tr, en, de };

export function getGamersContent(locale: string): GamersContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
