import type { Locale, Localized } from "@/i18n/pick";

type Cat =
  | "protocol"
  | "security"
  | "privacy"
  | "infrastructure"
  | "legal"
  | "performance"
  | "modern";

const CATEGORY_LABELS: Record<Cat, Localized<string>> = {
  protocol: { tr: "Protokol", en: "Protocol" },
  security: { tr: "Güvenlik", en: "Security" },
  privacy: { tr: "Gizlilik", en: "Privacy" },
  infrastructure: { tr: "Altyapı", en: "Infrastructure" },
  legal: { tr: "Yasal", en: "Legal" },
  performance: { tr: "Performans", en: "Performance" },
  modern: { tr: "Modern Özellikler", en: "Modern Features" },
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
  // ─── Privacy ───────────────────────────────────────────
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
    related: ["audit", "ram-only", "connection-vs-activity-logs"],
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
    id: "multi-hop",
    term: { tr: "Multi-hop / Double VPN", en: "Multi-hop / Double VPN" },
    short: {
      tr: "Trafiği iki VPN sunucusundan ardışık geçirme",
      en: "Routing traffic through two VPN servers in sequence",
    },
    long: {
      tr: "VPN trafiğini bir yerine iki sunucu üzerinden yönlendirme; çift şifreleme katmanı oluşturur. İlk sunucu yalnızca ikinci sunucunun IP'sini bilir; ikinci sunucu yalnızca ilkinin. Maksimum gizlilik için kullanılır — hız maliyeti vardır. NordVPN Double VPN, Surfshark MultiHop, Proton VPN Secure Core olarak sunar.",
      en: "Routes VPN traffic through two servers instead of one, producing two layers of encryption. The first server only sees the second server's IP; the second only sees the first. Used for maximum privacy — at the cost of speed. Offered as Double VPN (NordVPN), MultiHop (Surfshark) and Secure Core (Proton VPN).",
    },
    category: "privacy",
    related: ["onion-over-vpn", "obfuscation"],
  },
  {
    id: "onion-over-vpn",
    term: { tr: "Onion Over VPN", en: "Onion Over VPN" },
    short: {
      tr: "Trafiği önce VPN'den sonra Tor ağından geçirme",
      en: "Routing traffic first through a VPN, then the Tor network",
    },
    long: {
      tr: "VPN bağlantısının üstüne Tor ağını ekleyerek üç kat anonimlik sağlayan özellik. ISS yalnızca VPN'e bağlandığını görür, Tor giriş düğümü gerçek IP'ni göremez. NordVPN bu özelliği yerleşik sunar; her VPN'de Tor Browser ile elde edilebilir.",
      en: "Stacks the Tor network on top of the VPN connection for triple-layer anonymity. The ISP only sees a VPN connection, while the Tor entry node cannot see your real IP. NordVPN offers it natively; with any VPN it can be replicated by using Tor Browser.",
    },
    category: "privacy",
    related: ["multi-hop", "tor-browser"],
  },
  {
    id: "identity-masking",
    term: { tr: "Kimlik maskeleme", en: "Identity masking" },
    short: {
      tr: "Gerçek kimliği gizleyen takma ad/email/numara üretme",
      en: "Generating aliases for your real identity (email, number, name)",
    },
    long: {
      tr: "VPN sağlayıcılarının sunduğu, gerçek email, isim veya telefon numaranızı paylaşmadan kayıt olmanızı sağlayan kimlik takma adı üretme özelliği. Surfshark Alternative ID ve NordVPN'in kimlik koruma araçları örnek verilebilir. Veri sızıntılarında gerçek kimlik korunur.",
      en: "An alias generator offered by some VPNs that lets you sign up to services without revealing your real email, name or phone number. Surfshark's Alternative ID and NordVPN's identity protection tools are examples. In a data breach, only the alias is exposed.",
    },
    category: "privacy",
    related: ["alternative-id", "email-alias"],
  },
  {
    id: "browser-fingerprinting",
    term: { tr: "Tarayıcı parmak izi", en: "Browser fingerprinting" },
    short: {
      tr: "Tarayıcı özelliklerinden benzersiz kullanıcı kimliği üretme",
      en: "Identifying a user uniquely from browser characteristics",
    },
    long: {
      tr: "Ekran çözünürlüğü, font listesi, eklenti, zaman dilimi, canvas ve WebGL render gibi parametrelerden benzersiz bir kullanıcı imzası oluşturma tekniği. VPN IP'yi gizler ama fingerprint'i değiştirmez — gizlilik için Tor Browser veya Firefox + uBlock Origin gerekir.",
      en: "A technique that builds a unique user signature from screen resolution, fonts, plugins, timezone, canvas and WebGL render output. A VPN hides your IP but does not change your fingerprint — for that you typically need Tor Browser or Firefox with privacy extensions.",
    },
    category: "privacy",
    related: ["webrtc", "tracker-blocker"],
  },
  {
    id: "zero-knowledge-proof",
    term: { tr: "Sıfır bilgi ispatı", en: "Zero-knowledge proof" },
    short: {
      tr: "Bilgiyi paylaşmadan doğruluğunu kanıtlama yöntemi",
      en: "Proving knowledge of a fact without revealing the fact itself",
    },
    long: {
      tr: "Bir tarafın diğerine, ek bilgi vermeden bir önermenin doğru olduğunu kanıtlamasını sağlayan kriptografik yöntem. Proton, Tutanota gibi gizlilik servislerinde parolaların sunucu tarafında hiç görülmemesi için kullanılır.",
      en: "A cryptographic method letting one party prove to another that a statement is true without sharing any additional data. Used by privacy services like Proton and Tutanota so the server never sees the user's password in plaintext.",
    },
    category: "privacy",
  },

  // ─── Protocol ──────────────────────────────────────────
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
    related: ["openvpn", "lightway", "chacha20"],
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
    related: ["wireguard", "openvpn", "post-quantum-cryptography"],
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
    related: ["wireguard", "openvpn", "l2tp-ipsec"],
  },
  {
    id: "l2tp-ipsec",
    term: { tr: "L2TP/IPsec", en: "L2TP/IPsec" },
    short: {
      tr: "Eski, iki katmanlı tünelleme protokolü",
      en: "An older two-layer tunneling protocol",
    },
    long: {
      tr: "L2TP tünelleme ile IPsec şifrelemesinin birleşimi. Yerel cihaz desteği geniş ama çift kapsülleme nedeniyle yavaştır. UDP 500/4500 portlarını kullanır, kolayca engellenebilir. WireGuard ve OpenVPN varken yeni kurulumlarda önerilmez.",
      en: "Combines L2TP tunneling with IPsec encryption. Native device support is broad but double encapsulation makes it slow. Uses UDP ports 500/4500, which are easy to block. Not recommended for new setups when WireGuard or OpenVPN are available.",
    },
    category: "protocol",
    related: ["ikev2", "pptp"],
  },
  {
    id: "pptp",
    term: { tr: "PPTP (kullanılmamalı)", en: "PPTP (deprecated)" },
    short: {
      tr: "Güvensiz kabul edilen eski VPN protokolü",
      en: "An old VPN protocol now considered insecure",
    },
    long: {
      tr: "1990'ların sonunda geliştirilen, MS-CHAPv2 kimlik doğrulamasıyla kullanılan protokol. 2012'den beri pratik olarak kırılabilir — günümüzde yalnızca eski uyumluluk için var. Hiçbir modern VPN sağlayıcısı varsayılan olarak sunmamaktadır.",
      en: "Developed in the late 1990s, paired with MS-CHAPv2 authentication. Practically breakable since 2012 — exists today only for legacy compatibility. No modern VPN provider offers it by default.",
    },
    category: "protocol",
    related: ["l2tp-ipsec"],
  },
  {
    id: "chacha20",
    term: { tr: "ChaCha20-Poly1305", en: "ChaCha20-Poly1305" },
    short: {
      tr: "Mobil cihazlarda AES'ten hızlı modern şifreleme",
      en: "A modern cipher faster than AES on mobile hardware",
    },
    long: {
      tr: "Daniel J. Bernstein'in geliştirdiği akış şifresi; Poly1305 mesaj kimlik doğrulayıcısıyla birlikte kullanılır. AES donanım hızlandırması olmayan cihazlarda (eski telefonlar, IoT) AES-256-GCM'den belirgin şekilde hızlıdır. WireGuard'ın varsayılan şifresidir.",
      en: "A stream cipher designed by Daniel J. Bernstein, paired with the Poly1305 message authenticator. On devices without AES hardware acceleration (older phones, IoT) it is markedly faster than AES-256-GCM. It is WireGuard's default cipher.",
    },
    category: "protocol",
    related: ["wireguard", "encryption-aes256"],
  },

  // ─── Security ──────────────────────────────────────────
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
    related: ["dns-leak", "ip-leak"],
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
    related: ["kill-switch", "dns-over-https"],
  },
  {
    id: "obfuscation",
    term: { tr: "Obfuscation / Stealth VPN", en: "Obfuscation / Stealth VPN" },
    short: {
      tr: "VPN trafiğini normal HTTPS gibi göstererek tespit engelleme",
      en: "Making VPN traffic look like normal HTTPS to dodge detection",
    },
    long: {
      tr: "VPN trafiğinin DPI (Deep Packet Inspection) ile tespit edilmesini engelleyen teknik. Çin, BAE, İran gibi VPN engelleyen ülkelerde ve bazı işyeri/üniversite ağlarında şart. NordVPN obfuscated servers, Surfshark NoBorders, ExpressVPN otomatik obfuscation sunar.",
      en: "A technique that prevents VPN traffic from being identified by Deep Packet Inspection. Often required in countries that block VPNs (China, UAE, Iran) and on some workplace/university networks. NordVPN offers obfuscated servers, Surfshark NoBorders, ExpressVPN automatic obfuscation.",
    },
    category: "security",
    related: ["wireguard", "encrypted-sni"],
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
    related: ["chacha20"],
  },
  {
    id: "perfect-forward-secrecy",
    term: { tr: "Perfect Forward Secrecy (PFS)", en: "Perfect Forward Secrecy (PFS)" },
    short: {
      tr: "Her oturumda yeni şifreleme anahtarı üretme",
      en: "Generating a fresh encryption key for every session",
    },
    long: {
      tr: "Her VPN oturumu için kısa ömürlü, benzersiz şifreleme anahtarları üretilmesi. Uzun vadeli özel anahtar ele geçirilse bile geçmiş trafik çözülemez. Modern protokoller (WireGuard, OpenVPN, IKEv2) Diffie-Hellman değişimiyle PFS sağlar.",
      en: "Generates short-lived, unique encryption keys for every VPN session. Even if a long-term private key is later compromised, past traffic stays unreadable. Modern protocols (WireGuard, OpenVPN, IKEv2) achieve PFS through Diffie-Hellman key exchange.",
    },
    category: "security",
    related: ["wireguard", "openvpn"],
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
    related: ["dns-leak", "kill-switch", "webrtc", "ipv6-leak"],
  },
  {
    id: "webrtc",
    term: { tr: "WebRTC sızıntısı", en: "WebRTC leak" },
    short: {
      tr: "Tarayıcı WebRTC API'sinden gerçek IP'nin sızması",
      en: "Real IP leaking through the browser's WebRTC API",
    },
    long: {
      tr: "Tarayıcıdaki WebRTC (gerçek zamanlı iletişim) özelliği STUN istekleriyle gerçek IP adresini açığa çıkarabilir; VPN aktif olsa bile. Çözüm: WebRTC'yi tarayıcı ayarlarından kapatmak veya uBlock Origin'in WebRTC bloklama opsiyonunu kullanmak.",
      en: "The browser's WebRTC (real-time communication) feature can expose your real IP via STUN requests, even with a VPN on. Fix: disable WebRTC in the browser, or use uBlock Origin's option to block WebRTC peer connections.",
    },
    category: "security",
    related: ["ip-leak", "browser-fingerprinting"],
  },
  {
    id: "ipv6-leak",
    term: { tr: "IPv6 sızıntısı", en: "IPv6 leak" },
    short: {
      tr: "IPv6 trafiğinin VPN tüneli dışına çıkması",
      en: "IPv6 traffic escaping outside the VPN tunnel",
    },
    long: {
      tr: "Birçok VPN yalnızca IPv4 trafiğini tünelliyor; IPv6 trafiği işletim sistemi tarafından doğrudan ISS'ye gönderilir ve gerçek IPv6 adresi açığa çıkar. Çözüm: IPv6'yı kapatan veya tüneline alan bir VPN seçmek. Test için: ipv6leak.com.",
      en: "Many VPNs only tunnel IPv4 traffic; IPv6 traffic is sent directly by the OS to the ISP, exposing your real IPv6 address. Fix: pick a VPN that disables or tunnels IPv6. Test at ipv6leak.com.",
    },
    category: "security",
    related: ["ip-leak", "dns-leak"],
  },
  {
    id: "phishing-protection",
    term: { tr: "Phishing koruması", en: "Phishing protection" },
    short: {
      tr: "Bilinen sahte/dolandırıcı sitelere erişimi engelleme",
      en: "Blocking access to known phishing and scam sites",
    },
    long: {
      tr: "VPN sağlayıcının DNS seviyesinde sürekli güncellenen bir kara liste kullanarak sahte banka, dolandırıcı kripto borsası ve kimlik avı sayfalarına bağlantıyı engellemesi. NordVPN Threat Protection, Surfshark CleanWeb, Proton NetShield bunu içerir.",
      en: "DNS-level blocking by the VPN provider that uses a constantly updated blacklist to stop connections to fake bank pages, scam crypto exchanges and other phishing sites. Built into NordVPN Threat Protection, Surfshark CleanWeb and Proton NetShield.",
    },
    category: "security",
    related: ["threat-intelligence", "netshield"],
  },

  // ─── Infrastructure ────────────────────────────────────
  {
    id: "ram-only",
    term: { tr: "RAM-only sunucu", en: "RAM-only server" },
    short: {
      tr: "Yalnızca RAM üzerinde çalışan, kalıcı log tutamayan sunucu",
      en: "A server that runs only in RAM and cannot persist logs",
    },
    long: {
      tr: "Sunucu yeniden başlatıldığında tüm veriyi kaybeden, sabit disk olmadan RAM üzerinde çalışan VPN sunucusu. Kalıcı log fiziksel olarak imkânsız hale gelir; fiziksel el koymada veri elde edilemez. NordVPN, ExpressVPN, Surfshark tüm altyapısını RAM-only'e geçirmiştir.",
      en: "A VPN server with no disk that runs only in RAM — every reboot wipes all data, making persistent logs physically impossible and rendering physical seizure useless. NordVPN, ExpressVPN and Surfshark have moved their entire infrastructure to RAM-only.",
    },
    category: "infrastructure",
    related: ["no-logs"],
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
    id: "smart-dns",
    term: { tr: "Smart DNS / Akıllı DNS", en: "Smart DNS" },
    short: {
      tr: "Şifrelemesiz, sadece DNS değiştirerek coğrafi bypass",
      en: "A geo-bypass that only swaps DNS — no encryption",
    },
    long: {
      tr: "Tam VPN değil — sadece DNS sunucusu değiştirerek bazı coğrafi kısıtlamaları aşar. Şifreleme yok, IP gizleme yok. Akıllı TV, oyun konsolu gibi VPN uygulaması olmayan cihazlarda Netflix US erişimi için kullanılır.",
      en: "Not a full VPN — only swaps the DNS server to get around some geographic restrictions. No encryption, no IP masking. Used to reach Netflix US on devices without a VPN app, like smart TVs and game consoles.",
    },
    category: "infrastructure",
    related: ["geo-blocking", "dns-over-https"],
  },
  {
    id: "dns-over-https",
    term: { tr: "DNS over HTTPS (DoH)", en: "DNS over HTTPS (DoH)" },
    short: {
      tr: "DNS sorgularını HTTPS üzerinden şifreleyen protokol",
      en: "A protocol that encrypts DNS queries over HTTPS",
    },
    long: {
      tr: "DNS sorgularını standart HTTPS trafiğinin içine yerleştirerek şifreler; ISS'nin sorguları okumasını veya değiştirmesini engeller. Firefox ve Chrome'da yerleşik destek var; Cloudflare 1.1.1.1 ve Google 8.8.8.8 DoH sunucuları sağlar.",
      en: "Encrypts DNS queries by wrapping them inside standard HTTPS traffic, preventing the ISP from reading or tampering with them. Built into Firefox and Chrome; provided by Cloudflare 1.1.1.1 and Google 8.8.8.8 as DoH resolvers.",
    },
    category: "infrastructure",
    related: ["dns-over-tls", "dns-leak"],
  },
  {
    id: "dns-over-tls",
    term: { tr: "DNS over TLS (DoT)", en: "DNS over TLS (DoT)" },
    short: {
      tr: "DNS sorgularını adanmış TLS port'undan şifreleyen protokol",
      en: "A protocol that encrypts DNS queries over a dedicated TLS port",
    },
    long: {
      tr: "DNS sorgularını TLS ile şifreler ve adanmış 853 portundan iletir. DoH'tan farklı olarak DNS trafiği ayırt edilebilir, böylece ağ yöneticileri filtreleme yapabilir. Android 9+ \"Private DNS\" özelliği bunu kullanır.",
      en: "Encrypts DNS queries with TLS and sends them over dedicated port 853. Unlike DoH the DNS traffic is distinguishable, allowing network admins to filter it. Android 9+'s \"Private DNS\" feature uses DoT.",
    },
    category: "infrastructure",
    related: ["dns-over-https", "dns-leak"],
  },
  {
    id: "encrypted-sni",
    term: { tr: "Encrypted SNI (ESNI/ECH)", en: "Encrypted SNI (ESNI/ECH)" },
    short: {
      tr: "HTTPS başlığındaki hostname'i şifreleyen mekanizma",
      en: "Encrypting the hostname inside the HTTPS handshake",
    },
    long: {
      tr: "TLS el sıkışmasında düz metin gönderilen hostname (SNI) alanını şifreleyen mekanizma. Halefi Encrypted Client Hello (ECH) Cloudflare ve Firefox tarafından destekleniyor. Hangi siteye bağlandığınızı ağ gözlemcisinden gizler.",
      en: "Encrypts the hostname (SNI) field that is normally sent in plaintext during the TLS handshake. Its successor Encrypted Client Hello (ECH) is supported by Cloudflare and Firefox. Hides which site you are connecting to from a network observer.",
    },
    category: "infrastructure",
    related: ["dns-over-https", "obfuscation"],
  },
  {
    id: "dedicated-ip",
    term: { tr: "Dedicated IP / Adanmış IP", en: "Dedicated IP" },
    short: {
      tr: "Sadece sana tahsis edilmiş özel VPN IP'si",
      en: "A VPN IP address reserved solely for your account",
    },
    long: {
      tr: "Yalnızca senin kullanımına atanan, başka kimsenin paylaşmadığı VPN IP adresi. Banka oturumlarında, iş VPN'i kuralları olan kurumsal sistemlerde ve CAPTCHA azaltmak için kullanışlıdır. Genelde ek ücretlidir; NordVPN, Surfshark, PureVPN sunar.",
      en: "A VPN IP address assigned exclusively to your account and not shared with anyone else. Useful for banking sessions, corporate systems with VPN whitelists and reducing CAPTCHAs. Usually a paid add-on; offered by NordVPN, Surfshark and PureVPN.",
    },
    category: "infrastructure",
    related: ["shared-ip", "static-ip"],
  },
  {
    id: "shared-ip",
    term: { tr: "Shared IP / Paylaşılan IP", en: "Shared IP" },
    short: {
      tr: "Aynı IP'yi yüzlerce kullanıcıyla paylaşma",
      en: "Sharing the same IP with hundreds of other users",
    },
    long: {
      tr: "Varsayılan VPN davranışı: aynı çıkış IP'si binlerce kullanıcıya tahsis edilir, böylece tek bir kişiye trafik atfetmek zorlaşır. Gizlilik için ideal; ancak bazı siteler bu IP'leri otomatik olarak engelleyebilir.",
      en: "The default VPN behaviour: thousands of users share the same exit IP, making it hard to attribute traffic to one person. Ideal for privacy, but some sites automatically block these IPs.",
    },
    category: "infrastructure",
    related: ["dedicated-ip"],
  },
  {
    id: "static-ip",
    term: { tr: "Static IP / Statik IP", en: "Static IP" },
    short: {
      tr: "Her bağlantıda değişmeyen sabit IP",
      en: "An IP address that does not change between sessions",
    },
    long: {
      tr: "Her VPN bağlantısında sana aynı IP'yi veren sunucu yapılandırması; adanmış IP'ye benzer ama paylaşımlı olabilir. Uzaktan erişim, IP kısıtlamalı servisler ve oyun host etme için kullanışlıdır.",
      en: "A server setup that hands you the same IP on every VPN connection; similar to a dedicated IP but may still be shared. Useful for remote access, IP-restricted services and hosting game sessions.",
    },
    category: "infrastructure",
    related: ["dedicated-ip", "dynamic-ip"],
  },
  {
    id: "dynamic-ip",
    term: { tr: "Dynamic IP / Dinamik IP", en: "Dynamic IP" },
    short: {
      tr: "Her bağlantıda değişen IP adresi",
      en: "An IP address that changes on each new connection",
    },
    long: {
      tr: "VPN sunucusunun her bağlantıda farklı bir IP atadığı varsayılan mod. Takip edilmesi statik IP'den zordur ve daha güçlü gizlilik sağlar — ancak IP whitelist gerektiren servislerde sorun çıkarır.",
      en: "The default mode in which the VPN server assigns a different IP on every connection. Harder to track than a static IP and offers stronger privacy — but breaks services that require an IP whitelist.",
    },
    category: "infrastructure",
    related: ["static-ip", "ip-rotation"],
  },
  {
    id: "ip-rotation",
    term: { tr: "IP rotasyonu", en: "IP rotation" },
    short: {
      tr: "Belirli aralıklarla otomatik IP değiştirme",
      en: "Automatically cycling through IP addresses at intervals",
    },
    long: {
      tr: "VPN'in belirli aralıklarla (örn. her birkaç dakikada bir) çıkış IP'sini otomatik olarak değiştirmesi. Web scraping, fiyat takibi ve gelişmiş gizlilik için kullanılır. Surfshark IP Rotator özelliği örnektir.",
      en: "Automatically cycling the exit IP at set intervals (for example every few minutes). Used for web scraping, price tracking and advanced privacy. Surfshark's IP Rotator is an example.",
    },
    category: "infrastructure",
    related: ["dynamic-ip"],
  },
  {
    id: "meshnet",
    term: { tr: "Meshnet (NordVPN)", en: "Meshnet (NordVPN)" },
    short: {
      tr: "Cihazları özel şifreli ağda birleştirme özelliği",
      en: "Linking devices into a private encrypted network",
    },
    long: {
      tr: "NordVPN'in WireGuard tabanlı, kendi cihazlarını veya davet ettiğin başkalarınınkini sanal LAN içinde birbirine bağlayan özelliği. Dosya paylaşımı, uzak masaüstü ve LAN oyunlarına olanak tanır. Tailscale benzeri ücretsiz alternatif.",
      en: "NordVPN's WireGuard-based feature that joins your own devices (or invited friends') into a virtual LAN. Enables file sharing, remote desktop and LAN gaming. A free alternative similar to Tailscale.",
    },
    category: "infrastructure",
    related: ["wireguard"],
  },

  // ─── Performance ───────────────────────────────────────
  {
    id: "throttling",
    term: { tr: "ISP throttling / Kısıtlama", en: "ISP throttling" },
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
    id: "geo-blocking",
    term: { tr: "Coğrafi engelleme", en: "Geo-blocking" },
    short: {
      tr: "Servislerin coğrafi konuma göre erişim kısıtlaması",
      en: "Services restricting access based on geographic location",
    },
    long: {
      tr: "Bir servisin IP adresinin ülkesine göre içerik veya erişim kısıtlaması. Netflix katalog farklılıkları, BBC iPlayer'ın yalnızca İngiltere'de çalışması, banka uygulamalarının yurtdışı engeli klasik örneklerdir. VPN, hedef ülkeden bir IP sağlayarak bunları aşar.",
      en: "When a service restricts content or access based on the country of your IP address. Classic examples are Netflix catalog differences, BBC iPlayer being UK-only and banking apps blocking foreign IPs. A VPN bypasses these by providing an IP in the target country.",
    },
    category: "performance",
    related: ["smart-dns", "split-tunneling"],
  },
  {
    id: "split-tunneling",
    term: { tr: "Split tunneling / Bölünmüş tünel", en: "Split tunneling" },
    short: {
      tr: "Bazı uygulamaları VPN dışında tutma özelliği",
      en: "Letting some apps stay outside the VPN tunnel",
    },
    long: {
      tr: "Hangi uygulamaların VPN üzerinden, hangilerinin doğrudan internete bağlanacağını seçme özelliği. Türk bankacılık uygulaması direkt internete, Netflix VPN üzerine yönlendirmek için kullanışlıdır. Bant genişliğini de korur — sadece şifrelenmesi gereken trafik VPN'den geçer. Windows, Android'de yaygın; iOS'ta sınırlı destek.",
      en: "Lets you choose which apps go through the VPN and which connect to the internet directly. Useful, for example, to route a banking app outside the VPN while sending Netflix over it. Also saves bandwidth — only traffic that needs encryption uses the tunnel. Common on Windows and Android; limited on iOS.",
    },
    category: "performance",
    related: ["geo-blocking"],
  },

  // ─── Legal ─────────────────────────────────────────────
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
    related: ["no-logs", "five-eyes"],
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
  {
    id: "connection-vs-activity-logs",
    term: {
      tr: "Bağlantı logu vs aktivite logu",
      en: "Connection logs vs activity logs",
    },
    short: {
      tr: "İki ayrı log kategorisi: meta veri ve gerçek aktivite",
      en: "Two distinct log categories: metadata vs actual activity",
    },
    long: {
      tr: "Aktivite logları ziyaret edilen URL'leri ve içerik trafiğini içerir — gizlilik açısından kabul edilemez. Bağlantı logları ise zaman damgası, kullanılan bant genişliği, gerçek IP gibi meta verileri içerir. \"No-logs\" iddiasının ikisini de kapsayıp kapsamadığı kritiktir; bazı sağlayıcılar sadece aktiviteyi tutmadığını söyleyip bağlantı meta verisini saklar.",
      en: "Activity logs record visited URLs and traffic contents — unacceptable for privacy. Connection logs record metadata like timestamps, bandwidth used and real IP. It is critical whether a \"no-logs\" claim covers both; some providers only refrain from activity logs while still keeping connection metadata.",
    },
    category: "legal",
    related: ["no-logs", "audit"],
  },
  {
    id: "tor-browser",
    term: { tr: "Tor Browser", en: "Tor Browser" },
    short: {
      tr: "Onion routing tabanlı anonim tarayıcı",
      en: "An anonymous browser based on onion routing",
    },
    long: {
      tr: "Trafiği gönüllü çalıştırılan üç düğümden (giriş, orta, çıkış) geçirerek anonimleştiren özel Firefox sürümü. .onion sitelerine erişim sağlar. VPN ile birlikte kullanıldığında ISS'nin Tor kullandığını görmesini engeller; ancak yavaştır ve bazı sitelerde CAPTCHA artar.",
      en: "A modified Firefox that anonymises traffic by routing it through three volunteer-run nodes (entry, middle, exit). Provides access to .onion sites. Combined with a VPN it hides Tor usage from the ISP; however it is slow and many sites show extra CAPTCHAs.",
    },
    category: "legal",
    related: ["onion-over-vpn"],
  },
  {
    id: "proxy-vs-vpn",
    term: { tr: "Proxy vs VPN", en: "Proxy vs VPN" },
    short: {
      tr: "Proxy uygulama bazlı, VPN sistem genelinde ve şifreli",
      en: "Proxies are per-app, VPNs are system-wide and encrypted",
    },
    long: {
      tr: "Proxy yalnızca belirli bir uygulamanın trafiğini başka bir sunucu üzerinden yönlendirir; çoğu zaman şifreleme yoktur (HTTP/SOCKS5). VPN ise tüm sistem trafiğini şifreli bir tünelden geçirir. Coğrafi bypass için proxy yeterli olabilir; gizlilik ve güvenlik için VPN gerekir.",
      en: "A proxy only routes the traffic of a specific app through another server, usually without encryption (HTTP/SOCKS5). A VPN encrypts and tunnels the entire system's traffic. A proxy may be enough for geo-bypass; for privacy and security you need a VPN.",
    },
    category: "legal",
    related: ["smart-dns", "tor-browser"],
  },

  // ─── Modern Features ───────────────────────────────────
  {
    id: "post-quantum-cryptography",
    term: {
      tr: "Post-kuantum kriptografi",
      en: "Post-quantum cryptography",
    },
    short: {
      tr: "Kuantum bilgisayarlara dayanıklı yeni nesil şifreleme",
      en: "Next-generation cryptography resistant to quantum computers",
    },
    long: {
      tr: "Yeterince güçlü bir kuantum bilgisayarın bile kıramayacağı şekilde tasarlanmış kriptografik algoritmalar (Kyber, Dilithium gibi NIST seçimleri). \"Harvest now, decrypt later\" saldırılarına karşı koruma sağlar. ExpressVPN Lightway ve NordVPN NordLynx bunu kademeli olarak ekliyor.",
      en: "Cryptographic algorithms designed to resist attacks even from a sufficiently powerful quantum computer (NIST picks such as Kyber and Dilithium). Defends against \"harvest now, decrypt later\" attacks. ExpressVPN Lightway and NordVPN NordLynx are rolling this out.",
    },
    category: "modern",
    related: ["quantum-resistant-encryption", "lightway"],
  },
  {
    id: "quantum-resistant-encryption",
    term: {
      tr: "Kuantum dirençli şifreleme",
      en: "Quantum-resistant encryption",
    },
    short: {
      tr: "Kuantum saldırılarına dayanıklı anahtar değişimi",
      en: "Key exchange resistant to quantum attacks",
    },
    long: {
      tr: "Post-kuantum algoritmaların pratik olarak uygulanması; VPN bağlamında genelde Kyber tabanlı anahtar kapsülleme mekanizmasıyla (KEM) klasik el sıkışmaya katmanlanmış hibrit modeller. Bugünkü trafiği kaydedip yarın çözmeye çalışan saldırganlara karşı koruma.",
      en: "Practical deployment of post-quantum algorithms; in VPNs typically hybrid handshakes where a Kyber-based key encapsulation mechanism (KEM) is layered on top of the classical exchange. Defends against attackers who record traffic today to decrypt it tomorrow.",
    },
    category: "modern",
    related: ["post-quantum-cryptography", "perfect-forward-secrecy"],
  },
  {
    id: "threat-intelligence",
    term: { tr: "Tehdit istihbaratı", en: "Threat intelligence" },
    short: {
      tr: "Bilinen zararlı/dolandırıcı altyapıları gerçek zamanlı engelleme",
      en: "Real-time blocking of known malicious / scam infrastructure",
    },
    long: {
      tr: "Kötü amaçlı yazılım komuta sunucularını, kimlik avı domain'lerini ve dolandırıcılık ağlarını listeleyen sürekli güncellenen veritabanlarını kullanarak DNS veya trafik düzeyinde engelleme. NordVPN Threat Protection, Proton NetShield ve Surfshark CleanWeb bunu temel alır.",
      en: "Blocks at the DNS or traffic layer using continuously updated databases of malware command-and-control servers, phishing domains and scam networks. NordVPN Threat Protection, Proton NetShield and Surfshark CleanWeb are built on this.",
    },
    category: "modern",
    related: ["phishing-protection", "netshield", "tracker-blocker"],
  },
  {
    id: "netshield",
    term: { tr: "NetShield (Proton)", en: "NetShield (Proton)" },
    short: {
      tr: "Proton VPN'in reklam, izleyici ve zararlı yazılım engelleyicisi",
      en: "Proton VPN's ad, tracker and malware blocker",
    },
    long: {
      tr: "Proton VPN'in DNS düzeyinde çalışan filtreleme katmanı. Üç seviye sunar: kapalı, sadece zararlı yazılım/kötü amaçlı domain engelleme, ve tam reklam+izleyici engelleme. Tarayıcı bağımsız çalışır — mobilde de aktif.",
      en: "Proton VPN's DNS-level filtering layer. Three modes: off, malware/malicious domain only, and full ad + tracker blocking. Works independently of the browser — active on mobile too.",
    },
    category: "modern",
    related: ["threat-intelligence", "tracker-blocker"],
  },
  {
    id: "tracker-silencer",
    term: { tr: "TrackerSilencer", en: "TrackerSilencer" },
    short: {
      tr: "Uygulama içi izleyicileri sessizce filtreleyen özellik",
      en: "Silently filters trackers embedded inside apps",
    },
    long: {
      tr: "Mobil uygulamalarda gömülü çalışan analitik ve reklam izleyicilerini (Google Analytics, Facebook SDK vb.) ağ düzeyinde engelleyen özellik. Tarayıcı tabanlı blockerların ulaşamadığı uygulama içi izleyicileri durdurur. Bazı VPN sağlayıcıları paket dahilinde sunar.",
      en: "Network-level feature that blocks analytics and ad trackers embedded inside mobile apps (Google Analytics, Facebook SDK, etc.). Stops in-app trackers that browser-based blockers cannot reach. Bundled by some VPN providers.",
    },
    category: "modern",
    related: ["tracker-blocker", "threat-intelligence"],
  },
  {
    id: "tracker-blocker",
    term: { tr: "Tracker / Reklam engelleyici", en: "Tracker / Ad blocker" },
    short: {
      tr: "Reklam, izleyici ve telemetri domain'lerini engelleme",
      en: "Blocking ad, tracker and telemetry domains",
    },
    long: {
      tr: "DNS düzeyinde veya tarayıcı eklentisiyle reklam sunucularına, üçüncü taraf izleyicilere ve telemetri uç noktalarına yapılan istekleri durdurma. Sayfa yüklemesini hızlandırır, bant genişliğini korur ve davranışsal profil oluşturmayı zorlaştırır.",
      en: "Stops requests to ad servers, third-party trackers and telemetry endpoints at the DNS layer or via a browser extension. Speeds up page loads, saves bandwidth and makes behavioural profiling much harder.",
    },
    category: "modern",
    related: ["tracker-silencer", "netshield", "phishing-protection"],
  },
  {
    id: "scam-call-protection",
    term: { tr: "Dolandırıcı çağrı koruması", en: "Scam call protection" },
    short: {
      tr: "Gelen telefon çağrılarındaki dolandırıcılık tespiti",
      en: "Detecting scams in incoming phone calls",
    },
    long: {
      tr: "NordVPN'in bazı planlara dahil ettiği özellik: bilinen dolandırıcı numaralardan gelen çağrıları işaretler veya engeller. Telefon numarası veritabanlarına dayanır; bölgeye göre etkinlik değişir.",
      en: "A feature bundled with some NordVPN plans: flags or blocks calls from known scam numbers. Relies on phone-number databases; effectiveness varies by region.",
    },
    category: "modern",
    related: ["phishing-protection"],
  },
  {
    id: "alternative-id",
    term: { tr: "Alternative ID (Surfshark)", en: "Alternative ID (Surfshark)" },
    short: {
      tr: "Sahte kimlik bilgileri üretme aracı",
      en: "Generates a fake set of identity details",
    },
    long: {
      tr: "Surfshark'ın sunduğu, sahte isim, soyisim, doğum tarihi ve birden çok email takma adı üreten araç. Gerçek bilgilerinizi paylaşmadan kayıt olmanızı sağlar; tüm email'ler sizin gerçek adresinize yönlendirilir.",
      en: "A Surfshark tool that generates a fake name, surname, birthdate and multiple email aliases. Lets you sign up without revealing your real identity; all email is forwarded to your real address.",
    },
    category: "modern",
    related: ["identity-masking", "email-alias"],
  },
  {
    id: "email-alias",
    term: { tr: "Email takma adı / Anonim email", en: "Email alias / Anonymous email" },
    short: {
      tr: "Gerçek email'i gizleyen geçici/proxy adresler",
      en: "Disposable / proxy addresses that hide your real email",
    },
    long: {
      tr: "Gerçek email adresinizin önünde duran ve gelen postaları size yönlendiren ara adresler. Spam veya veri sızıntısı durumunda takma ad iptal edilir, gerçek hesap etkilenmez. SimpleLogin (Proton bünyesinde), AnonAddy, DuckDuckGo Email Protection bunu sunar.",
      en: "Intermediate addresses that sit in front of your real email and forward incoming mail to it. If spam or a breach hits, you simply disable the alias without affecting the real account. Provided by SimpleLogin (now part of Proton), AnonAddy and DuckDuckGo Email Protection.",
    },
    category: "modern",
    related: ["identity-masking", "alternative-id"],
  },
  {
    id: "data-breach-monitor",
    term: { tr: "Veri sızıntısı izleyici", en: "Data breach monitor" },
    short: {
      tr: "Email/parola sızıntılarını sürekli tarayan uyarı sistemi",
      en: "Alerting system that continuously scans for credential leaks",
    },
    long: {
      tr: "Email adresinin veya parolasının bilinen veri sızıntılarında geçip geçmediğini sürekli kontrol eden ve uyarı gönderen servis. NordVPN'in Dark Web Monitor, Surfshark Alert ve Have I Been Pwned entegrasyonları örnektir.",
      en: "A service that continuously checks whether your email or password appears in known data breaches and alerts you when it does. Examples include NordVPN Dark Web Monitor, Surfshark Alert and integrations with Have I Been Pwned.",
    },
    category: "modern",
    related: ["threat-intelligence", "identity-masking"],
  },
  {
    id: "password-manager",
    term: { tr: "Parola yöneticisi", en: "Password manager" },
    short: {
      tr: "Parolaları şifreli kasada saklayan ve otomatik dolduran araç",
      en: "Tool that stores passwords in an encrypted vault and autofills them",
    },
    long: {
      tr: "Her servis için güçlü, benzersiz parolalar üreten ve şifreli bir kasada saklayan araç. NordPass (NordVPN), Proton Pass, 1Password ve Bitwarden popüler örneklerdir. VPN ile birlikte kullanılması güvenlik hijyeninin temelidir.",
      en: "A tool that generates strong, unique passwords for every service and stores them in an encrypted vault. Popular examples are NordPass (NordVPN), Proton Pass, 1Password and Bitwarden. Pairing it with a VPN is foundational security hygiene.",
    },
    category: "modern",
    related: ["zero-knowledge-proof", "data-breach-monitor"],
  },
  {
    id: "two-factor-auth",
    term: { tr: "İki faktörlü kimlik doğrulama (2FA)", en: "Two-factor authentication (2FA)" },
    short: {
      tr: "Parola dışında ikinci bir doğrulama katmanı",
      en: "A second verification layer beyond the password",
    },
    long: {
      tr: "Hesap girişlerinde parolaya ek olarak tek seferlik kod, donanım anahtarı (YubiKey) veya biyometri isteyen güvenlik katmanı. TOTP (Authy, Google Authenticator) SMS'ten daha güvenlidir. VPN hesabınızı koruyan ilk savunma hattı.",
      en: "A security layer requiring a one-time code, hardware key (YubiKey) or biometric in addition to a password. TOTP apps (Authy, Google Authenticator) are safer than SMS. The first line of defence protecting your VPN account.",
    },
    category: "modern",
    related: ["password-manager"],
  },
  {
    id: "kyc-anonymous-payment",
    term: { tr: "Anonim ödeme", en: "Anonymous payment" },
    short: {
      tr: "Kripto veya nakit ile kimliği açmadan ödeme",
      en: "Paying with crypto or cash without revealing identity",
    },
    long: {
      tr: "VPN abonelikleri için Monero, Bitcoin veya posta yoluyla nakit kullanma seçeneği — sağlayıcı ile kimliğin arasındaki son bağı koparır. Mullvad ve Proton VPN bu seçenekleri açıkça destekler.",
      en: "Paying for a VPN subscription with Monero, Bitcoin or cash sent by mail — severing the last link between your identity and the provider. Mullvad and Proton VPN openly support these options.",
    },
    category: "modern",
    related: ["identity-masking", "jurisdiction"],
  },
  {
    id: "open-source-client",
    term: { tr: "Açık kaynak istemci", en: "Open-source client" },
    short: {
      tr: "Kaynak kodu kamuya açık VPN uygulaması",
      en: "VPN application whose source code is publicly available",
    },
    long: {
      tr: "VPN istemcisinin kaynak kodunun GitHub gibi platformlarda kamuya açık olması — bağımsız güvenlik araştırmacıları arka kapı veya zayıflık olup olmadığını doğrulayabilir. Proton VPN, Mullvad ve IVPN tüm istemcilerini açık kaynak yayınlar.",
      en: "The VPN client's source code is publicly published on platforms like GitHub — independent security researchers can verify the absence of backdoors or weaknesses. Proton VPN, Mullvad and IVPN release all their clients as open source.",
    },
    category: "modern",
    related: ["audit", "wireguard"],
  },
  {
    id: "diskless-boot",
    term: { tr: "Disksiz boot (PXE)", en: "Diskless boot (PXE)" },
    short: {
      tr: "Sunucunun her açılışta ağdan temiz başlaması",
      en: "Server booting fresh from the network on every start",
    },
    long: {
      tr: "RAM-only sunucuların imza süreci: makine her yeniden başlatıldığında imzalanmış bir imajı ağ üzerinden indirir; yerel disk yok, kalıcı değişiklik mümkün değil. Mullvad bu yaklaşımı dokümante eder.",
      en: "The signing process behind RAM-only servers: on every reboot the machine downloads a signed image over the network; there is no local disk, so persistent changes are impossible. Mullvad documents this approach.",
    },
    category: "infrastructure",
    related: ["ram-only"],
  },
  {
    id: "vpn-server-load",
    term: { tr: "Sunucu yükü", en: "Server load" },
    short: {
      tr: "Bir VPN sunucusunun anlık doluluk yüzdesi",
      en: "The current utilisation percentage of a VPN server",
    },
    long: {
      tr: "Bir VPN sunucusunun CPU, bant genişliği ve eş zamanlı bağlantı doygunluğunu yüzde olarak gösteren metrik. Düşük yüklü sunucular daha hızlı verim sunar; çoğu istemci otomatik olarak en az yüklü sunucuya yönlendirir.",
      en: "A metric showing how saturated a VPN server's CPU, bandwidth and concurrent connections are, as a percentage. Lower-loaded servers deliver faster throughput; most clients automatically route to the least-loaded one.",
    },
    category: "performance",
    related: ["throttling"],
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
