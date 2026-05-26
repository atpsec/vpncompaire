import type { Locale, Localized } from "@/i18n/pick";

type Cat = "protocol" | "security" | "privacy" | "infrastructure" | "legal" | "performance";

const CATEGORY_LABELS: Record<Cat, Localized<string>> = {
  protocol: { tr: "Protokol", en: "Protocol" },
  security: { tr: "Güvenlik", en: "Security" },
  privacy: { tr: "Gizlilik", en: "Privacy" },
  infrastructure: { tr: "Altyapı", en: "Infrastructure" },
  legal: { tr: "Yasal", en: "Legal" },
  performance: { tr: "Performans", en: "Performance" },
};

export type Term = {
  id: string;
  term: string;
  short: string;
  long: string;
  category: string;
  related?: string[];
};

type RawTerm = {
  id: string;
  term: Localized<string>;
  short: Localized<string>;
  long: Localized<string>;
  category: Cat;
  related?: string[];
};

const rawGlossary: RawTerm[] = [
  {
    id: "no-logs",
    term: { tr: "No-logs politikası", en: "No-logs policy" },
    short: {
      tr: "VPN sağlayıcının kullanıcı aktivitesi kaydı tutmadığı taahhüt",
      en: "A pledge that the VPN provider keeps no record of user activity",
    },
    long: {
      tr: "VPN sağlayıcının ziyaret edilen siteler, IP adresleri, bağlantı zaman damgaları veya bant genişliği gibi kullanıcı aktivitelerini kaydetmediğini belirten politika. Üçüncü taraf denetimlerle (Deloitte, KPMG, Cure53) doğrulanması idealdir.",
      en: "A policy stating that the VPN provider does not record user activity such as visited sites, IP addresses, connection timestamps or bandwidth. Ideally verified by third-party audits (Deloitte, KPMG, Cure53).",
    },
    category: "privacy",
    related: ["audit", "ram-only"],
  },
  {
    id: "audit",
    term: { tr: "Bağımsız denetim", en: "Independent audit" },
    short: {
      tr: "VPN no-logs/güvenlik iddiasının üçüncü taraf doğrulaması",
      en: "Third-party verification of a VPN's no-logs / security claim",
    },
    long: {
      tr: "Deloitte, KPMG, Cure53, Securitum gibi tanınmış güvenlik firmalarının VPN altyapısını ve loglarını inceleyerek hazırladığı kamuya açık rapor. Tek seferlik denetim zayıf — tekrarlanan denetimler güçlü güven sinyalidir. NordVPN 6 kez denetim geçirmiştir.",
      en: "A public report by well-known security firms (Deloitte, KPMG, Cure53, Securitum) that inspect a VPN's infrastructure and logs. A single audit is weak — repeated audits are a stronger trust signal. NordVPN has been audited six times.",
    },
    category: "privacy",
    related: ["no-logs"],
  },
  {
    id: "wireguard",
    term: { tr: "WireGuard", en: "WireGuard" },
    short: {
      tr: "Modern, hızlı, küçük kod tabanlı VPN protokolü",
      en: "A modern, fast VPN protocol with a small codebase",
    },
    long: {
      tr: "2018'de yayınlanan modern VPN protokolü. Kod tabanı sadece ~4,000 satır (OpenVPN ~100,000+), denetlenmesi kolay. ChaCha20-Poly1305 şifreleme kullanır. NordVPN'in NordLynx ve Surfshark'ın WireGuard varyantı bu protokole dayanır.",
      en: "A modern VPN protocol released in 2018. Its codebase is only ~4,000 lines (vs OpenVPN's ~100,000+), so it is easy to audit. Uses ChaCha20-Poly1305 encryption. NordVPN's NordLynx and Surfshark's WireGuard variant are built on it.",
    },
    category: "protocol",
    related: ["openvpn", "lightway"],
  },
  {
    id: "openvpn",
    term: { tr: "OpenVPN", en: "OpenVPN" },
    short: {
      tr: "Açık kaynak, olgun ama daha yavaş VPN protokolü",
      en: "An open-source, mature but slower VPN protocol",
    },
    long: {
      tr: "2001'de yayınlanan, en yaygın desteklenen açık kaynak VPN protokolü. UDP ve TCP üzerinden çalışır. WireGuard'a göre daha yavaş ama daha esnek (port ve protokol seçimi). Bazı kısıtlayıcı ağları aşmada TCP modu kullanışlıdır.",
      en: "The most widely supported open-source VPN protocol, released in 2001. Runs over both UDP and TCP. Slower than WireGuard but more flexible (port and protocol choice). TCP mode is useful for bypassing restrictive networks.",
    },
    category: "protocol",
    related: ["wireguard", "lightway"],
  },
  {
    id: "lightway",
    term: { tr: "Lightway", en: "Lightway" },
    short: {
      tr: "ExpressVPN'in açık kaynak özel protokolü",
      en: "ExpressVPN's open-source proprietary protocol",
    },
    long: {
      tr: "ExpressVPN tarafından geliştirilen, WolfSSL tabanlı modern protokol. Kod tabanı küçük, hızlı bağlantı kurulumu (post-quantum şifreleme dahil). 2022'den itibaren açık kaynak — kamuya açık denetlenebilir.",
      en: "A modern WolfSSL-based protocol developed by ExpressVPN. Small codebase, fast connection setup (with post-quantum encryption). Open source since 2022 — publicly auditable.",
    },
    category: "protocol",
    related: ["wireguard", "openvpn"],
  },
  {
    id: "kill-switch",
    term: { tr: "Kill switch", en: "Kill switch" },
    short: {
      tr: "VPN koparsa internet trafiğini otomatik kesen güvenlik özelliği",
      en: "A safety feature that cuts internet traffic if the VPN drops",
    },
    long: {
      tr: "VPN bağlantısı koptuğunda tüm internet trafiğini otomatik olarak keser; gerçek IP'nin sızmasını engeller. Sistem genelinde (system-wide) kill switch tercih edilir — sadece uygulama bazlı kill switch zayıftır.",
      en: "Automatically cuts all internet traffic when the VPN connection drops, preventing your real IP from leaking. A system-wide kill switch is preferred — app-only kill switches are weaker.",
    },
    category: "security",
    related: ["dns-leak"],
  },
  {
    id: "dns-leak",
    term: { tr: "DNS sızıntısı", en: "DNS leak" },
    short: {
      tr: "DNS sorgularının VPN dışına sızması",
      en: "DNS queries escaping the VPN tunnel",
    },
    long: {
      tr: "VPN aktif olduğunda DNS sorgularının VPN sağlayıcısı yerine ISS'ye gitmesi. Bu sızıntı ISS'nin hangi siteleri ziyaret ettiğini görmesine yol açar. Güvenilir VPN'ler kendi DNS sunucularını kullanır ve sızıntı koruması sunar. Test için: dnsleaktest.com.",
      en: "DNS queries going to the ISP instead of the VPN provider while the VPN is active. The leak lets the ISP see which sites you visit. Trustworthy VPNs use their own DNS servers and provide leak protection. Test at dnsleaktest.com.",
    },
    category: "security",
    related: ["kill-switch"],
  },
  {
    id: "ram-only",
    term: { tr: "RAM-only sunucu", en: "RAM-only server" },
    short: {
      tr: "Yalnızca RAM üzerinde çalışan, kalıcı log tutamayan sunucu",
      en: "A server that runs only in RAM and cannot persist logs",
    },
    long: {
      tr: "Sunucu yeniden başlatıldığında tüm veriyi kaybeden, sabit disk olmadan RAM üzerinde çalışan VPN sunucusu. Kalıcı log fiziksel olarak imkânsız hale gelir. NordVPN, ExpressVPN, Surfshark tüm altyapısını RAM-only'e geçirmiştir.",
      en: "A VPN server that runs only in RAM, with no disk — every reboot wipes all data, making persistent logs physically impossible. NordVPN, ExpressVPN and Surfshark have moved their entire infrastructure to RAM-only.",
    },
    category: "infrastructure",
    related: ["no-logs"],
  },
  {
    id: "obfuscation",
    term: { tr: "Obfuscation (gizleme)", en: "Obfuscation" },
    short: {
      tr: "VPN trafiğini normal HTTPS gibi göstererek tespit engelleme",
      en: "Making VPN traffic look like normal HTTPS to dodge detection",
    },
    long: {
      tr: "VPN trafiğinin DPI (Deep Packet Inspection) ile tespit edilmesini engelleyen teknik. Çin, BAE, İran gibi VPN engelleyen ülkelerde ve bazı işyeri/üniversite ağlarında şart. NordVPN obfuscated servers, Surfshark NoBorders, ExpressVPN otomatik obfuscation sunar.",
      en: "A technique that prevents VPN traffic from being identified by Deep Packet Inspection. Often required in countries that block VPNs (China, UAE, Iran) and on some workplace/university networks. NordVPN offers obfuscated servers, Surfshark NoBorders, ExpressVPN automatic obfuscation.",
    },
    category: "security",
    related: ["wireguard"],
  },
  {
    id: "jurisdiction",
    term: { tr: "Yargı yetkisi (jurisdiction)", en: "Jurisdiction" },
    short: {
      tr: "VPN sağlayıcının hangi ülke yasalarına tabi olduğu",
      en: "Which country's laws the VPN provider is subject to",
    },
    long: {
      tr: "VPN sağlayıcının merkezinin bulunduğu ülke, hangi yasalara tabi olduğunu belirler. 5/9/14 Eyes istihbarat ittifaklarına üye ülkeler (ABD, İngiltere, Almanya, Fransa vb.) yasal baskıya açıktır. Panama (NordVPN), İsviçre (Proton), Romanya, BVI (ExpressVPN) genelde daha güçlü gizlilik koruması sağlar.",
      en: "Where the VPN provider is headquartered determines which laws apply. Countries in the 5/9/14 Eyes intelligence alliances (US, UK, Germany, France, etc.) are exposed to legal pressure. Panama (NordVPN), Switzerland (Proton), Romania, BVI (ExpressVPN) generally offer stronger privacy protection.",
    },
    category: "legal",
    related: ["no-logs"],
  },
  {
    id: "split-tunneling",
    term: { tr: "Split tunneling", en: "Split tunneling" },
    short: {
      tr: "Bazı uygulamaları VPN dışında tutma özelliği",
      en: "Letting some apps stay outside the VPN tunnel",
    },
    long: {
      tr: "Hangi uygulamaların VPN üzerinden, hangilerinin doğrudan internete bağlanacağını seçme özelliği. Türk bankacılık uygulaması direkt internete, Netflix VPN üzerine yönlendirmek için kullanışlıdır. Windows, Android'de yaygın; iOS'ta sınırlı destek.",
      en: "Lets you choose which apps go through the VPN and which connect to the internet directly. Useful, for example, to route a banking app outside the VPN while sending Netflix over it. Common on Windows and Android; limited on iOS.",
    },
    category: "security",
  },
  {
    id: "port-forwarding",
    term: { tr: "Port forwarding", en: "Port forwarding" },
    short: {
      tr: "Belirli port'ları açarak P2P/server bağlantılarını destekleme",
      en: "Opening specific ports to enable P2P / inbound connections",
    },
    long: {
      tr: "Belirli bir port'u dış dünyaya açarak gelen bağlantıları kabul etme. Peer-to-peer dosya paylaşımı, oyun sunucusu host etme veya BitTorrent'te seeding verimliliği için gerekli. PIA, Proton VPN ve Mullvad destekler; NordVPN ve ExpressVPN desteklemez (gizlilik nedeniyle).",
      en: "Opens a specific port to the outside world so the device can accept inbound connections. Needed for peer-to-peer file sharing, hosting a game server or efficient BitTorrent seeding. PIA, Proton VPN and Mullvad support it; NordVPN and ExpressVPN do not (for privacy reasons).",
    },
    category: "infrastructure",
  },
  {
    id: "multi-hop",
    term: { tr: "Multi-hop (çoklu zıplama)", en: "Multi-hop" },
    short: {
      tr: "Trafiği iki VPN sunucusundan ardışık geçirme",
      en: "Routing traffic through two VPN servers in sequence",
    },
    long: {
      tr: "VPN trafiğini bir yerine iki sunucu üzerinden yönlendirme. İlk sunucu yalnızca ikinci sunucunun IP'sini bilir; ikinci sunucu yalnızca ilkinin. Maksimum gizlilik için kullanılır — hız maliyeti vardır. NordVPN Double VPN, Surfshark MultiHop, Proton VPN Secure Core olarak sunar.",
      en: "Routes VPN traffic through two servers instead of one. The first server only sees the second server's IP; the second only sees the first. Used for maximum privacy — at the cost of speed. Offered as Double VPN (NordVPN), MultiHop (Surfshark) and Secure Core (Proton VPN).",
    },
    category: "privacy",
  },
  {
    id: "ikev2",
    term: { tr: "IKEv2/IPsec", en: "IKEv2/IPsec" },
    short: {
      tr: "Mobil cihazlarda yaygın, hızlı yeniden bağlanan protokol",
      en: "A protocol common on mobile, with fast reconnection",
    },
    long: {
      tr: "Microsoft ve Cisco tarafından geliştirilen, özellikle iOS'ta yaygın olan protokol. Wi-Fi'den mobil veriye geçişlerde hızlı yeniden bağlanma sağlar. WireGuard kadar hızlı değil ama mobil için pratik.",
      en: "Developed by Microsoft and Cisco; particularly common on iOS. Reconnects quickly when switching between Wi-Fi and mobile data. Not as fast as WireGuard but practical on mobile.",
    },
    category: "protocol",
    related: ["wireguard", "openvpn"],
  },
  {
    id: "smart-dns",
    term: { tr: "Smart DNS", en: "Smart DNS" },
    short: {
      tr: "Şifrelemesiz, sadece DNS değiştirerek coğrafi bypass",
      en: "A geo-bypass that only swaps DNS — no encryption",
    },
    long: {
      tr: "Tam VPN değil — sadece DNS sunucusu değiştirerek bazı coğrafi kısıtlamaları aşar. Şifreleme yok, IP gizleme yok. Akıllı TV, oyun konsolu gibi VPN uygulaması olmayan cihazlarda Netflix US erişimi için kullanılır.",
      en: "Not a full VPN — only swaps the DNS server to get around some geographic restrictions. No encryption, no IP masking. Used to reach Netflix US on devices without a VPN app, like smart TVs and game consoles.",
    },
    category: "infrastructure",
  },
  {
    id: "throttling",
    term: { tr: "ISP throttling", en: "ISP throttling" },
    short: {
      tr: "İnternet servis sağlayıcısının trafik türünü yavaşlatması",
      en: "Your ISP slowing down a specific type of traffic",
    },
    long: {
      tr: "ISP'nin streaming, oyun veya torrent gibi belirli trafik türlerini yavaşlatması. VPN trafik tipini gizlediği için throttling'i bypass edebilir — ama ISP'nin paket türü tespiti gelişmişse hızda artış olmayabilir.",
      en: "When the ISP slows down specific types of traffic such as streaming, gaming or torrenting. A VPN can bypass throttling by hiding the traffic type — but if the ISP's packet detection is advanced, you may not see a speed bump.",
    },
    category: "performance",
  },
  {
    id: "encryption-aes256",
    term: { tr: "AES-256-GCM", en: "AES-256-GCM" },
    short: {
      tr: "Endüstri standardı 256-bit gelişmiş şifreleme",
      en: "Industry-standard 256-bit encryption",
    },
    long: {
      tr: "Hükümetler, bankalar ve VPN'lerin kullandığı standart şifreleme algoritması. 256-bit anahtar uzunluğu — günümüz hesaplama gücüyle pratik olarak kırılamaz. GCM (Galois Counter Mode) hem şifreleme hem bütünlük doğrulaması sağlar.",
      en: "The standard encryption algorithm used by governments, banks and VPNs. The 256-bit key length is practically unbreakable with current compute. GCM (Galois Counter Mode) provides both encryption and integrity verification.",
    },
    category: "security",
  },
  {
    id: "five-eyes",
    term: { tr: "5/9/14 Eyes", en: "5/9/14 Eyes" },
    short: {
      tr: "İstihbarat paylaşım ittifakları",
      en: "Intelligence-sharing alliances",
    },
    long: {
      tr: "Veri paylaşan ülke ittifakları: 5 Eyes (ABD, İngiltere, Kanada, Avustralya, Yeni Zelanda); 9 Eyes (+ Danimarka, Fransa, Hollanda, Norveç); 14 Eyes (+ Almanya, Belçika, İtalya, İspanya, İsveç). Bu ülkelerdeki VPN sağlayıcıları yasal baskıya açıktır.",
      en: "Country alliances that share intelligence: 5 Eyes (US, UK, Canada, Australia, New Zealand); 9 Eyes (+ Denmark, France, Netherlands, Norway); 14 Eyes (+ Germany, Belgium, Italy, Spain, Sweden). VPN providers in these countries are exposed to legal pressure.",
    },
    category: "legal",
    related: ["jurisdiction"],
  },
  {
    id: "ip-leak",
    term: { tr: "IP sızıntısı", en: "IP leak" },
    short: {
      tr: "Gerçek IP adresinin VPN'e rağmen ortaya çıkması",
      en: "Your real IP showing up despite the VPN being on",
    },
    long: {
      tr: "WebRTC, IPv6 veya DNS sızıntısı ile gerçek IP'nin sızması. Güvenilir VPN'ler hem IPv4 hem IPv6 sızıntı koruması sunar. Test için: ipleak.net, dnsleaktest.com.",
      en: "Your real IP leaking via WebRTC, IPv6 or DNS. Trustworthy VPNs offer both IPv4 and IPv6 leak protection. Test at ipleak.net and dnsleaktest.com.",
    },
    category: "security",
    related: ["dns-leak", "kill-switch"],
  },
  {
    id: "warrant-canary",
    term: { tr: "Warrant canary", en: "Warrant canary" },
    short: {
      tr: "Devlet talebi geldiğinde sessizce kaldırılan beyan",
      en: "A statement quietly removed when a government request arrives",
    },
    long: {
      tr: "VPN sağlayıcı sitesinde \"şu ana kadar hiçbir devlet veri talebi almadık\" gibi bir beyan tutar. Gerçek bir talep gelirse (NDA nedeniyle açıklayamasa bile) bu beyanı sessizce kaldırır. Mullvad ve önceden Proton VPN bu yöntemi kullandı.",
      en: "The VPN provider keeps a statement on its site like \"we have received no government data requests so far\". If one ever arrives (and an NDA prevents disclosure), the statement is quietly removed. Mullvad and previously Proton VPN used this method.",
    },
    category: "legal",
  },
];

function pick(field: Localized<string>, locale: Locale): string {
  return field[locale] ?? field.tr;
}

export function getGlossary(locale: Locale = "tr"): Term[] {
  return rawGlossary.map((t) => ({
    id: t.id,
    term: pick(t.term, locale),
    short: pick(t.short, locale),
    long: pick(t.long, locale),
    category: pick(CATEGORY_LABELS[t.category], locale),
    related: t.related,
  }));
}

export function getCategories(locale: Locale = "tr"): string[] {
  return (Object.keys(CATEGORY_LABELS) as Cat[]).map((c) =>
    pick(CATEGORY_LABELS[c], locale),
  );
}

// Backward-compat exports (TR default)
export const glossary = getGlossary("tr");
export const categories = getCategories("tr");
