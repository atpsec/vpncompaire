// "VPN güvenlik kontrol listesi" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/rehber/vpn-guvenlik-kontrol-listesi/page.tsx) bu
// modülden render eder; yerelleştirilmiş URL'ler
// (/rehber/vpn-guvenlik-kontrol-listesi, /en/guide/vpn-security-checklist,
// /de/ratgeber/vpn-sicherheits-checkliste) proxy rewrite ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type VpnSecurityChecklistContent = {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  lede: string;
  // schemaName: JSON-LD breadcrumb'daki uzun ad; current: görünür kısa etiket.
  breadcrumb: { home: string; guides: string; current: string; schemaName: string };
  items: { title: string; question: string; answer: string }[];
  howToUse: { h2: string; before: string; linkText: string; after: string };
  relatedLabel: string;
  relatedLinks: { href: string; text: string }[];
};

const tr: VpnSecurityChecklistContent = {
  metaTitle: "VPN Güvenlik Kontrol Listesi (12 Madde) (2026)",
  metaDescription:
    "Bir VPN seçmeden önce kontrol etmen gereken 12 madde — gizlilik, denetim, teknik altyapı ve kullanım hakları.",
  badge: "Kontrol listesi",
  h1: "VPN güvenlik kontrol listesi",
  lede: "Bir VPN seçmeden önce kontrol etmen gereken 12 madde. Her madde, sağlayıcının pazarlama söyleminden bağımsız olarak doğrulayabileceğin objektif bir kriter.",
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Güvenlik kontrol listesi",
    schemaName: "VPN güvenlik kontrol listesi",
  },
  items: [
    {
      title: "1. Yargı yetkisi (Jurisdiction)",
      question: "VPN sağlayıcı hangi ülke yasalarına tabi?",
      answer:
        "Beş/Dokuz/On Dört Göz ittifaklarının dışı (Panama, İsviçre, Romanya, BVI) genelde daha güçlü gizlilik koruması sağlar. ABD veya UK merkezli sağlayıcılar — no-logs uygulasa bile — yasal baskıya daha açık.",
    },
    {
      title: "2. Bağımsız denetim kanıtı",
      question: "No-logs iddiası üçüncü taraf tarafından doğrulanmış mı?",
      answer:
        "Deloitte, KPMG, Cure53, Securitum veya Assured AB gibi tanınmış denetim firmalarının raporu olmalı. Tek seferlik denetim yetersiz — tekrarlanan denetimler tercih edilir. NordVPN'in 6x Deloitte örneği referans.",
    },
    {
      title: "3. No-logs politikası",
      question: "Sağlayıcı ne tür log tutuyor?",
      answer:
        "İdeal: ziyaret edilen siteler, IP adresleri, bağlantı zaman damgaları, kullanılan bant genişliği — hiçbiri tutulmamalı. Sadece hesap için gereken minimum bilgi (e-posta, ödeme).",
    },
    {
      title: "4. Şifreleme standardı",
      question: "Hangi şifreleme algoritması ve anahtar uzunluğu?",
      answer:
        "AES-256-GCM endüstri standardı. WireGuard ChaCha20-Poly1305 kullanır (daha hızlı, modern). Eski PPTP veya L2TP/IPsec'i kullanan sağlayıcılardan kaçın.",
    },
    {
      title: "5. Protokol seçenekleri",
      question: "Hangi VPN protokollerini destekliyor?",
      answer:
        "Minimum: WireGuard veya WireGuard tabanlı (NordLynx). OpenVPN seçeneği olsa iyi (esneklik için). Sadece eski protokol sunanları (PPTP, L2TP) eleyin.",
    },
    {
      title: "6. DNS sızıntı koruması",
      question: "VPN aktifken DNS sorguları nereye gidiyor?",
      answer:
        "VPN sağlayıcısının kendi DNS sunucularına gitmeli. ISS'nin DNS sunucusuna sızıntı olursa, ISS hangi siteleri ziyaret ettiğini görür. Sızıntı testi: dnsleaktest.com.",
    },
    {
      title: "7. Kill switch (öldürme anahtarı)",
      question: "VPN bağlantısı koparsa ne olur?",
      answer:
        "Kill switch, VPN bağlantısı koptuğunda tüm internet trafiğini otomatik keser — gerçek IP'nin sızmasını engeller. Sistem geneli (system-wide) kill switch tercih edilir, sadece uygulama bazlı değil.",
    },
    {
      title: "8. RAM-only sunucu altyapısı",
      question: "Sunucular nasıl çalışıyor?",
      answer:
        "Modern üst seviye sağlayıcılar (NordVPN, ExpressVPN, Surfshark) yalnızca RAM üzerinde çalışan sunucular kullanır. Yeniden başlatıldığında tüm veri silinir — kalıcı log fiziksel olarak imkânsız.",
    },
    {
      title: "9. Açık kaynak istemciler",
      question: "VPN uygulamasının kodu kamuya açık mı?",
      answer:
        "Açık kaynak istemciler, bağımsız güvenlik araştırmacılarının kodu incelemesine izin verir — arka kapı veya zafiyet tespit edilebilir. Proton VPN, Mullvad, PIA tüm istemcileri açık kaynak; ExpressVPN Lightway protokolünü açtı.",
    },
    {
      title: "10. Cihaz sayısı sınırı",
      question: "Aynı abonelikten kaç cihazda kullanabilirsin?",
      answer:
        "Aile veya çoklu cihaz senaryolarında 5+ cihaz minimum gereksinim. Surfshark sınırsız sunar; NordVPN 10, ExpressVPN 8 cihaz. Mullvad'da 5 cihaz limiti var.",
    },
    {
      title: "11. Mahkeme kanıtı (varsa)",
      question: "No-logs iddiası bir hukuki davada test edildi mi?",
      answer:
        "Çok az sağlayıcı bu test geçmişine sahip. PIA, 2016 ve 2018 federal davalarında no-logs iddiasını mahkemede doğruladı. ExpressVPN, 2017'de Türkiye'de sunucusuna el konulmasına rağmen veri ifşası yapamadı. Bu, en güçlü kanıt seviyesidir.",
    },
    {
      title: "12. Fiyatlandırma şeffaflığı",
      question: "Yenileme fiyatı belli mi?",
      answer:
        "Çoğu sağlayıcı 'ilk dönem ucuz, yenileme pahalı' modeli kullanır. Bunu önceden bilmek önemli — sürpriz yüksek fişle karşılaşmamak için. Mullvad sabit fiyat sunar, indirim/yenileme tuzağı yok.",
    },
  ],
  howToUse: {
    h2: "Bu listeyi nasıl kullan?",
    before:
      "Bir VPN seçerken bu 12 maddeyi sağlayıcının kendi sitesinde, denetim raporlarında ve bağımsız incelemelerde doğrula. İncelemelerimiz zaten bu kriterleri kullanıyor — kendi sıralamamızı görmek için ",
    linkText: "en iyi 10 VPN",
    after: " sayfasını ziyaret edebilirsin.",
  },
  relatedLabel: "İlgili sayfalar",
  relatedLinks: [
    { href: "/rehber/vpn-nedir", text: "VPN nedir?" },
    {
      href: "/rehber/ucretsiz-vs-ucretli-vpn",
      text: "Ücretsiz vs Ücretli VPN",
    },
    { href: "/metodoloji", text: "Test metodolojimiz" },
  ],
};

const en: VpnSecurityChecklistContent = {
  metaTitle: "VPN Security Checklist (12 Points) (2026)",
  metaDescription:
    "The 12 things to check before choosing a VPN — privacy, audits, technical infrastructure and usage rights.",
  badge: "Checklist",
  h1: "VPN security checklist",
  lede: "The 12 points to check before choosing a VPN. Each one is an objective criterion you can verify independently of the provider's marketing claims.",
  breadcrumb: {
    home: "Home",
    guides: "Guides",
    current: "Security checklist",
    schemaName: "VPN security checklist",
  },
  items: [
    {
      title: "1. Jurisdiction",
      question: "Which country's laws is the VPN provider subject to?",
      answer:
        "Being outside the Five/Nine/Fourteen Eyes alliances (Panama, Switzerland, Romania, BVI) generally means stronger privacy protection. US- or UK-based providers — even with a no-logs policy — are more exposed to legal pressure.",
    },
    {
      title: "2. Proof of independent audits",
      question: "Has the no-logs claim been verified by a third party?",
      answer:
        "There should be a report from a recognized audit firm such as Deloitte, KPMG, Cure53, Securitum or Assured AB. A one-off audit isn't enough — repeated audits are preferable. NordVPN's six Deloitte audits are the reference point.",
    },
    {
      title: "3. No-logs policy",
      question: "What kind of logs does the provider keep?",
      answer:
        "Ideally: visited sites, IP addresses, connection timestamps, bandwidth used — none of it should be stored. Only the minimum needed for your account (email, payment).",
    },
    {
      title: "4. Encryption standard",
      question: "Which encryption algorithm and key length?",
      answer:
        "AES-256-GCM is the industry standard. WireGuard uses ChaCha20-Poly1305 (faster, modern). Avoid providers still using legacy PPTP or L2TP/IPsec.",
    },
    {
      title: "5. Protocol options",
      question: "Which VPN protocols does it support?",
      answer:
        "Minimum: WireGuard or WireGuard-based (NordLynx). An OpenVPN option is nice to have (for flexibility). Rule out anyone offering only legacy protocols (PPTP, L2TP).",
    },
    {
      title: "6. DNS leak protection",
      question: "Where do DNS queries go while the VPN is active?",
      answer:
        "They should go to the VPN provider's own DNS servers. If they leak to your ISP's DNS server, your ISP sees which sites you visit. Leak test: dnsleaktest.com.",
    },
    {
      title: "7. Kill switch",
      question: "What happens if the VPN connection drops?",
      answer:
        "A kill switch automatically cuts all internet traffic when the VPN connection drops — preventing your real IP from leaking. A system-wide kill switch is preferable, not just a per-app one.",
    },
    {
      title: "8. RAM-only server infrastructure",
      question: "How do the servers run?",
      answer:
        "Modern top-tier providers (NordVPN, ExpressVPN, Surfshark) use servers that run entirely in RAM. On reboot all data is wiped — persistent logs are physically impossible.",
    },
    {
      title: "9. Open-source clients",
      question: "Is the VPN app's code public?",
      answer:
        "Open-source clients let independent security researchers review the code — backdoors or vulnerabilities can be spotted. Proton VPN, Mullvad and PIA open-source all their clients; ExpressVPN has opened its Lightway protocol.",
    },
    {
      title: "10. Device limit",
      question: "How many devices can you use on one subscription?",
      answer:
        "For families or multi-device setups, 5+ devices is the minimum requirement. Surfshark offers unlimited; NordVPN 10, ExpressVPN 8 devices. Mullvad has a 5-device limit.",
    },
    {
      title: "11. Court evidence (if any)",
      question: "Has the no-logs claim been tested in a legal case?",
      answer:
        "Very few providers have this track record. PIA proved its no-logs claim in court in 2016 and 2018 federal cases. ExpressVPN couldn't disclose any data even when its server in Türkiye was seized in 2017. This is the strongest level of evidence.",
    },
    {
      title: "12. Pricing transparency",
      question: "Is the renewal price clear?",
      answer:
        "Most providers use a 'cheap intro period, expensive renewal' model. Knowing this up front matters — so you don't get hit with a surprise bill. Mullvad offers a flat price with no discount/renewal trap.",
    },
  ],
  howToUse: {
    h2: "How to use this list",
    before:
      "When picking a VPN, verify these 12 points on the provider's own site, in audit reports and in independent reviews. Our reviews already apply these criteria — to see our own ranking, visit the ",
    linkText: "top 10 VPNs",
    after: " page.",
  },
  relatedLabel: "Related pages",
  relatedLinks: [
    { href: "/guide/what-is-a-vpn", text: "What is a VPN?" },
    {
      href: "/guide/free-vs-paid-vpn",
      text: "Free vs paid VPN",
    },
    { href: "/metodoloji", text: "Our test methodology" },
  ],
};

const de: VpnSecurityChecklistContent = {
  metaTitle: "VPN-Sicherheits-Checkliste (12 Punkte) (2026)",
  metaDescription:
    "Die 12 Punkte, die du vor der Wahl eines VPN prüfen solltest — Datenschutz, Audits, technische Infrastruktur und Nutzungsrechte.",
  badge: "Checkliste",
  h1: "VPN-Sicherheits-Checkliste",
  lede: "Die 12 Punkte, die du vor der Wahl eines VPN prüfen solltest. Jeder Punkt ist ein objektives Kriterium, das du unabhängig vom Marketing des Anbieters überprüfen kannst.",
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "Sicherheits-Checkliste",
    schemaName: "VPN-Sicherheits-Checkliste",
  },
  items: [
    {
      title: "1. Gerichtsbarkeit",
      question: "Welchem Landesrecht unterliegt der VPN-Anbieter?",
      answer:
        "Außerhalb der Five/Nine/Fourteen-Eyes-Allianzen (Panama, Schweiz, Rumänien, BVI) bedeutet in der Regel stärkeren Datenschutz. Anbieter mit Sitz in den USA oder UK sind — selbst mit No-Logs-Richtlinie — rechtlichem Druck stärker ausgesetzt.",
    },
    {
      title: "2. Nachweis unabhängiger Audits",
      question: "Wurde die No-Logs-Behauptung von Dritten geprüft?",
      answer:
        "Es sollte ein Bericht einer anerkannten Prüfungsfirma wie Deloitte, KPMG, Cure53, Securitum oder Assured AB vorliegen. Ein einmaliges Audit reicht nicht — wiederholte Audits sind vorzuziehen. NordVPNs sechs Deloitte-Audits sind die Referenz.",
    },
    {
      title: "3. No-Logs-Richtlinie",
      question: "Welche Logs speichert der Anbieter?",
      answer:
        "Ideal: besuchte Seiten, IP-Adressen, Verbindungszeitstempel, genutzte Bandbreite — nichts davon sollte gespeichert werden. Nur das Minimum fürs Konto (E-Mail, Zahlung).",
    },
    {
      title: "4. Verschlüsselungsstandard",
      question: "Welcher Verschlüsselungsalgorithmus und welche Schlüssellänge?",
      answer:
        "AES-256-GCM ist der Industriestandard. WireGuard nutzt ChaCha20-Poly1305 (schneller, modern). Meide Anbieter, die noch auf das alte PPTP oder L2TP/IPsec setzen.",
    },
    {
      title: "5. Protokoll-Optionen",
      question: "Welche VPN-Protokolle werden unterstützt?",
      answer:
        "Minimum: WireGuard oder WireGuard-basiert (NordLynx). Eine OpenVPN-Option ist gut (für Flexibilität). Anbieter, die nur alte Protokolle (PPTP, L2TP) anbieten, fallen raus.",
    },
    {
      title: "6. DNS-Leak-Schutz",
      question: "Wohin gehen DNS-Anfragen bei aktivem VPN?",
      answer:
        "Sie sollten an die eigenen DNS-Server des VPN-Anbieters gehen. Leaken sie zum DNS-Server deines ISP, sieht dein ISP, welche Seiten du besuchst. Leak-Test: dnsleaktest.com.",
    },
    {
      title: "7. Kill Switch (Notausschalter)",
      question: "Was passiert, wenn die VPN-Verbindung abbricht?",
      answer:
        "Ein Kill Switch kappt bei einem VPN-Abbruch automatisch den gesamten Internetverkehr — und verhindert so, dass deine echte IP durchsickert. Ein systemweiter Kill Switch ist vorzuziehen, nicht nur ein App-basierter.",
    },
    {
      title: "8. RAM-only-Serverinfrastruktur",
      question: "Wie laufen die Server?",
      answer:
        "Moderne Top-Anbieter (NordVPN, ExpressVPN, Surfshark) nutzen Server, die ausschließlich im RAM laufen. Beim Neustart werden alle Daten gelöscht — dauerhafte Logs sind physisch unmöglich.",
    },
    {
      title: "9. Open-Source-Clients",
      question: "Ist der Code der VPN-App öffentlich?",
      answer:
        "Open-Source-Clients erlauben unabhängigen Sicherheitsforschern, den Code zu prüfen — Hintertüren oder Schwachstellen können entdeckt werden. Proton VPN, Mullvad und PIA legen alle Clients offen; ExpressVPN hat sein Lightway-Protokoll geöffnet.",
    },
    {
      title: "10. Gerätelimit",
      question: "Auf wie vielen Geräten kannst du dasselbe Abo nutzen?",
      answer:
        "Für Familien oder Mehrgeräte-Szenarien sind 5+ Geräte das Minimum. Surfshark bietet unbegrenzt viele; NordVPN 10, ExpressVPN 8 Geräte. Bei Mullvad gilt ein Limit von 5 Geräten.",
    },
    {
      title: "11. Gerichtsnachweis (falls vorhanden)",
      question: "Wurde die No-Logs-Behauptung in einem Gerichtsverfahren getestet?",
      answer:
        "Nur sehr wenige Anbieter haben diese Historie. PIA bestätigte seine No-Logs-Behauptung 2016 und 2018 in US-Bundesverfahren vor Gericht. ExpressVPN konnte 2017 trotz Beschlagnahmung seines Servers in der Türkei keine Daten preisgeben. Das ist die stärkste Beweisstufe.",
    },
    {
      title: "12. Preistransparenz",
      question: "Ist der Verlängerungspreis bekannt?",
      answer:
        "Die meisten Anbieter nutzen das Modell 'günstiger Einstieg, teure Verlängerung'. Das vorab zu wissen ist wichtig — damit dich keine überraschend hohe Rechnung trifft. Mullvad bietet einen Festpreis, ohne Rabatt- und Verlängerungsfalle.",
    },
  ],
  howToUse: {
    h2: "Wie nutzt du diese Liste?",
    before:
      "Prüfe diese 12 Punkte bei der VPN-Wahl auf der Website des Anbieters, in Audit-Berichten und in unabhängigen Tests. Unsere Tests wenden genau diese Kriterien an — unser eigenes Ranking findest du auf der Seite ",
    linkText: "Top 10 VPNs",
    after: ".",
  },
  relatedLabel: "Verwandte Seiten",
  relatedLinks: [
    { href: "/ratgeber/was-ist-ein-vpn", text: "Was ist ein VPN?" },
    {
      href: "/ratgeber/kostenloses-vs-kostenpflichtiges-vpn",
      text: "Kostenlos vs. kostenpflichtig",
    },
    { href: "/metodoloji", text: "Unsere Testmethodik" },
  ],
};

const CONTENT: Record<AppLocale, VpnSecurityChecklistContent> = { tr, en, de };

export function getVpnSecurityChecklistContent(
  locale: string,
): VpnSecurityChecklistContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
