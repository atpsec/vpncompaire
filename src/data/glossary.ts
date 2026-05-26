export type Term = {
  id: string;
  term: string;
  short: string;
  long: string;
  category: "Protokol" | "Güvenlik" | "Gizlilik" | "Altyapı" | "Yasal" | "Performans";
  related?: string[];
};

export const glossary: Term[] = [
  {
    id: "no-logs",
    term: "No-logs politikası",
    short: "VPN sağlayıcının kullanıcı aktivitesi kaydı tutmadığı taahhüt",
    long: "VPN sağlayıcının ziyaret edilen siteler, IP adresleri, bağlantı zaman damgaları veya bant genişliği gibi kullanıcı aktivitelerini kaydetmediğini belirten politika. Üçüncü taraf denetimlerle (Deloitte, KPMG, Cure53) doğrulanması idealdir.",
    category: "Gizlilik",
    related: ["audit", "ram-only"],
  },
  {
    id: "audit",
    term: "Bağımsız denetim",
    short: "VPN no-logs/güvenlik iddiasının üçüncü taraf doğrulaması",
    long: "Deloitte, KPMG, Cure53, Securitum gibi tanınmış güvenlik firmalarının VPN altyapısını ve loglarını inceleyerek hazırladığı kamuya açık rapor. Tek seferlik denetim zayıf — tekrarlanan denetimler güçlü güven sinyalidir. NordVPN 6 kez denetim geçirmiştir.",
    category: "Gizlilik",
    related: ["no-logs"],
  },
  {
    id: "wireguard",
    term: "WireGuard",
    short: "Modern, hızlı, küçük kod tabanlı VPN protokolü",
    long: "2018'de yayınlanan modern VPN protokolü. Kod tabanı sadece ~4,000 satır (OpenVPN ~100,000+), denetlenmesi kolay. ChaCha20-Poly1305 şifreleme kullanır. NordVPN'in NordLynx ve Surfshark'ın WireGuard varyantı bu protokole dayanır.",
    category: "Protokol",
    related: ["openvpn", "lightway"],
  },
  {
    id: "openvpn",
    term: "OpenVPN",
    short: "Açık kaynak, olgun ama daha yavaş VPN protokolü",
    long: "2001'de yayınlanan, en yaygın desteklenen açık kaynak VPN protokolü. UDP ve TCP üzerinden çalışır. WireGuard'a göre daha yavaş ama daha esnek (port ve protokol seçimi). Bazı kısıtlayıcı ağları aşmada TCP modu kullanışlıdır.",
    category: "Protokol",
    related: ["wireguard", "lightway"],
  },
  {
    id: "lightway",
    term: "Lightway",
    short: "ExpressVPN'in açık kaynak özel protokolü",
    long: "ExpressVPN tarafından geliştirilen, WolfSSL tabanlı modern protokol. Kod tabanı küçük, hızlı bağlantı kurulumu (post-quantum şifreleme dahil). 2022'den itibaren açık kaynak — kamuya açık denetlenebilir.",
    category: "Protokol",
    related: ["wireguard", "openvpn"],
  },
  {
    id: "kill-switch",
    term: "Kill switch",
    short: "VPN koparsa internet trafiğini otomatik kesen güvenlik özelliği",
    long: "VPN bağlantısı koptuğunda tüm internet trafiğini otomatik olarak keser; gerçek IP'nin sızmasını engeller. Sistem genelinde (system-wide) kill switch tercih edilir — sadece uygulama bazlı kill switch zayıftır.",
    category: "Güvenlik",
    related: ["dns-leak"],
  },
  {
    id: "dns-leak",
    term: "DNS sızıntısı",
    short: "DNS sorgularının VPN dışına sızması",
    long: "VPN aktif olduğunda DNS sorgularının VPN sağlayıcısı yerine ISS'ye gitmesi. Bu sızıntı ISS'nin hangi siteleri ziyaret ettiğini görmesine yol açar. Güvenilir VPN'ler kendi DNS sunucularını kullanır ve sızıntı koruması sunar. Test için: dnsleaktest.com.",
    category: "Güvenlik",
    related: ["kill-switch"],
  },
  {
    id: "ram-only",
    term: "RAM-only sunucu",
    short: "Yalnızca RAM üzerinde çalışan, kalıcı log tutamayan sunucu",
    long: "Sunucu yeniden başlatıldığında tüm veriyi kaybeden, sabit disk olmadan RAM üzerinde çalışan VPN sunucusu. Kalıcı log fiziksel olarak imkânsız hale gelir. NordVPN, ExpressVPN, Surfshark tüm altyapısını RAM-only'e geçirmiştir.",
    category: "Altyapı",
    related: ["no-logs"],
  },
  {
    id: "obfuscation",
    term: "Obfuscation (gizleme)",
    short: "VPN trafiğini normal HTTPS gibi göstererek tespit engelleme",
    long: "VPN trafiğinin DPI (Deep Packet Inspection) ile tespit edilmesini engelleyen teknik. Çin, BAE, İran gibi VPN engelleyen ülkelerde ve bazı işyeri/üniversite ağlarında şart. NordVPN obfuscated servers, Surfshark NoBorders, ExpressVPN otomatik obfuscation sunar.",
    category: "Güvenlik",
    related: ["wireguard"],
  },
  {
    id: "jurisdiction",
    term: "Yargı yetkisi (jurisdiction)",
    short: "VPN sağlayıcının hangi ülke yasalarına tabi olduğu",
    long: "VPN sağlayıcının merkezinin bulunduğu ülke, hangi yasalara tabi olduğunu belirler. 5/9/14 Eyes istihbarat ittifaklarına üye ülkeler (ABD, İngiltere, Almanya, Fransa vb.) yasal baskıya açıktır. Panama (NordVPN), İsviçre (Proton), Romanya, BVI (ExpressVPN) genelde daha güçlü gizlilik koruması sağlar.",
    category: "Yasal",
    related: ["no-logs"],
  },
  {
    id: "split-tunneling",
    term: "Split tunneling",
    short: "Bazı uygulamaları VPN dışında tutma özelliği",
    long: "Hangi uygulamaların VPN üzerinden, hangilerinin doğrudan internete bağlanacağını seçme özelliği. Türk bankacılık uygulaması direkt internete, Netflix VPN üzerine yönlendirmek için kullanışlıdır. Windows, Android'de yaygın; iOS'ta sınırlı destek.",
    category: "Güvenlik",
  },
  {
    id: "port-forwarding",
    term: "Port forwarding",
    short: "Belirli port'ları açarak P2P/server bağlantılarını destekleme",
    long: "Belirli bir port'u dış dünyaya açarak gelen bağlantıları kabul etme. Peer-to-peer dosya paylaşımı, oyun sunucusu host etme veya BitTorrent'te seeding verimliliği için gerekli. PIA, Proton VPN ve Mullvad destekler; NordVPN ve ExpressVPN desteklemez (gizlilik nedeniyle).",
    category: "Altyapı",
  },
  {
    id: "multi-hop",
    term: "Multi-hop (çoklu zıplama)",
    short: "Trafiği iki VPN sunucusundan ardışık geçirme",
    long: "VPN trafiğini bir yerine iki sunucu üzerinden yönlendirme. İlk sunucu yalnızca ikinci sunucunun IP'sini bilir; ikinci sunucu yalnızca ilkinin. Maksimum gizlilik için kullanılır — hız maliyeti vardır. NordVPN Double VPN, Surfshark MultiHop, Proton VPN Secure Core olarak sunar.",
    category: "Gizlilik",
  },
  {
    id: "ikev2",
    term: "IKEv2/IPsec",
    short: "Mobil cihazlarda yaygın, hızlı yeniden bağlanan protokol",
    long: "Microsoft ve Cisco tarafından geliştirilen, özellikle iOS'ta yaygın olan protokol. Wi-Fi'den mobil veriye geçişlerde hızlı yeniden bağlanma sağlar. WireGuard kadar hızlı değil ama mobil için pratik.",
    category: "Protokol",
    related: ["wireguard", "openvpn"],
  },
  {
    id: "smart-dns",
    term: "Smart DNS",
    short: "Şifrelemesiz, sadece DNS değiştirerek coğrafi bypass",
    long: "Tam VPN değil — sadece DNS sunucusu değiştirerek bazı coğrafi kısıtlamaları aşar. Şifreleme yok, IP gizleme yok. Akıllı TV, oyun konsolu gibi VPN uygulaması olmayan cihazlarda Netflix US erişimi için kullanılır.",
    category: "Altyapı",
  },
  {
    id: "throttling",
    term: "ISP throttling",
    short: "İnternet servis sağlayıcısının trafik türünü yavaşlatması",
    long: "ISP'nin streaming, oyun veya torrent gibi belirli trafik türlerini yavaşlatması. VPN trafik tipini gizlediği için throttling'i bypass edebilir — ama ISP'nin paket türü tespiti gelişmişse hızda artış olmayabilir.",
    category: "Performans",
  },
  {
    id: "encryption-aes256",
    term: "AES-256-GCM",
    short: "Endüstri standardı 256-bit gelişmiş şifreleme",
    long: "Hükümetler, bankalar ve VPN'lerin kullandığı standart şifreleme algoritması. 256-bit anahtar uzunluğu — günümüz hesaplama gücüyle pratik olarak kırılamaz. GCM (Galois Counter Mode) hem şifreleme hem bütünlük doğrulaması sağlar.",
    category: "Güvenlik",
  },
  {
    id: "five-eyes",
    term: "5/9/14 Eyes",
    short: "İstihbarat paylaşım ittifakları",
    long: "Veri paylaşan ülke ittifakları: 5 Eyes (ABD, İngiltere, Kanada, Avustralya, Yeni Zelanda); 9 Eyes (+ Danimarka, Fransa, Hollanda, Norveç); 14 Eyes (+ Almanya, Belçika, İtalya, İspanya, İsveç). Bu ülkelerdeki VPN sağlayıcıları yasal baskıya açıktır.",
    category: "Yasal",
    related: ["jurisdiction"],
  },
  {
    id: "ip-leak",
    term: "IP sızıntısı",
    short: "Gerçek IP adresinin VPN'e rağmen ortaya çıkması",
    long: "WebRTC, IPv6 veya DNS sızıntısı ile gerçek IP'nin sızması. Güvenilir VPN'ler hem IPv4 hem IPv6 sızıntı koruması sunar. Test için: ipleak.net, dnsleaktest.com.",
    category: "Güvenlik",
    related: ["dns-leak", "kill-switch"],
  },
  {
    id: "warrant-canary",
    term: "Warrant canary",
    short: "Devlet talebi geldiğinde sessizce kaldırılan beyan",
    long: "VPN sağlayıcı sitesinde &quot;şu ana kadar hiçbir devlet veri talebi almadık&quot; gibi bir beyan tutar. Gerçek bir talep gelirse (NDA nedeniyle açıklayamasa bile) bu beyanı sessizce kaldırır. Mullvad ve önceden Proton VPN bu yöntemi kullandı.",
    category: "Yasal",
  },
];

export const categories: Term["category"][] = [
  "Protokol",
  "Güvenlik",
  "Gizlilik",
  "Altyapı",
  "Yasal",
  "Performans",
];
