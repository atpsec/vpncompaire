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
        "Merkez ülkenin veri saklama, hukuki talep ve şirket şeffaflığı kurallarını incele. İstihbarat ittifakları bağlam sağlar; tek başına daha iyi gizlilik veya no-logs uygulaması kanıtlamaz.",
    },
    {
      title: "2. Bağımsız denetim kanıtı",
      question: "No-logs iddiası üçüncü taraf tarafından doğrulanmış mı?",
      answer:
        "Tanınmış bir üçüncü tarafın raporunu, tarihini ve kapsamını ara. Tek seferlik inceleme yalnız o dönemi ve kapsamı gösterir; düzenli tekrarlanan denetimler güncel uygulama hakkında daha güçlü sinyal sağlar.",
    },
    {
      title: "3. No-logs politikası",
      question: "Sağlayıcı ne tür log tutuyor?",
      answer:
        "Politikada kaynak IP, hedef, bağlantı zaman damgası, bant genişliği ve hesap verilerinin ayrı ayrı nasıl işlendiğini kontrol et. Pazarlama başlığı yerine saklama süresi, amaç ve üçüncü taraf paylaşım maddelerini oku.",
    },
    {
      title: "4. Şifreleme standardı",
      question: "Hangi şifreleme algoritması ve anahtar uzunluğu?",
      answer:
        "Güncel uygulamanın kullandığı şifre paketini ve protokol yapılandırmasını sağlayıcı belgeleriyle denetim raporlarından doğrula. PPTP gibi eski ve zayıf seçenekleri varsayılan olarak kullanan hizmetlerden kaçın.",
    },
    {
      title: "5. Protokol seçenekleri",
      question: "Hangi VPN protokollerini destekliyor?",
      answer:
        "WireGuard veya güncel bir WireGuard türevi ile gerektiğinde OpenVPN gibi olgun bir alternatif esneklik sağlar. Protokol adı kadar uygulamanın güncelleme ve güvenlik denetimi geçmişini de kontrol et.",
    },
    {
      title: "6. DNS sızıntı koruması",
      question: "VPN aktifken DNS sorguları nereye gidiyor?",
      answer:
        "DNS sorgularının beklenen şifreli tünel ve çözümleyici üzerinden gittiğini kontrol et. Tünel dışına çıkan sorgular alan adı etkinliği hakkında bilgi açığa çıkarabilir; farklı ağ ve uygulamalarda sızıntı testi yap.",
    },
    {
      title: "7. Kill switch (öldürme anahtarı)",
      question: "VPN bağlantısı koparsa ne olur?",
      answer:
        "Kill switch, tünel koptuğunda trafiği durdurarak IP açığa çıkma riskini azaltmak için tasarlanır. Sistem geneli ve uygulama bazlı kapsamı, yeniden bağlanma davranışını ve split-tunneling istisnalarını kullandığın platformda doğrula.",
    },
    {
      title: "8. RAM-only sunucu altyapısı",
      question: "Sunucular nasıl çalışıyor?",
      answer:
        "RAM-only tasarım yerel diskte kalıcılığı azaltabilir ve yeniden başlatmada belleği temizler. Ancak merkezi log aktarımını veya hatalı yapılandırmayı tek başına engellemez; mimari beyanını bağımsız denetimle birlikte değerlendir.",
    },
    {
      title: "9. Açık kaynak istemciler",
      question: "VPN uygulamasının kodu kamuya açık mı?",
      answer:
        "Açık kaynak, araştırmacıların kodu incelemesini ve sorun bildirmesini kolaylaştırır. Tek başına arka kapı bulunmadığını veya dağıtılan uygulamanın kaynakla bire bir eşleştiğini garanti etmez; derleme doğrulaması ve denetim geçmişini de ara.",
    },
    {
      title: "10. Cihaz sayısı sınırı",
      question: "Aynı abonelikten kaç cihazda kullanabilirsin?",
      answer:
        "Kendi eşzamanlı cihaz ihtiyacını belirle; sağlayıcının güncel bağlantı sınırını, yönlendirici kullanımını ve adil kullanım koşullarını resmi plan sayfasından doğrula. Bu rakamlar zamanla değişebilir.",
    },
    {
      title: "11. Kamuya açık hukuki kayıt (varsa)",
      question: "No-logs iddiası bir hukuki davada test edildi mi?",
      answer:
        "Geçmiş davalar veya sunucu el koyma olayları, sağlayıcının belirli bir tarihte talebe nasıl yanıt verdiğine dair ek veri sunabilir. Bunlar güncel politikanın tek başına kanıtı ya da geleceğe dönük garanti değildir; karar ve haber kayıtlarını doğrudan doğrula.",
    },
    {
      title: "12. Fiyatlandırma şeffaflığı",
      question: "Yenileme fiyatı belli mi?",
      answer:
        "İlk dönem toplamını, otomatik yenileme fiyatını, vergiyi, para birimini, uygulama mağazası istisnalarını ve iade koşullarını ödeme öncesinde kontrol et. Kampanya başlığı tek başına toplam maliyeti göstermez.",
    },
  ],
  howToUse: {
    h2: "Bu listeyi nasıl kullan?",
    before:
      "Bir VPN seçerken bu 12 maddeyi sağlayıcının kendi sitesinde, denetim raporlarında ve bağımsız incelemelerde doğrula. Kaynak-temelli karşılaştırma çerçevemiz bu kriterleri sağlayıcı belgeleri ve güncel koşullarla birlikte ele alır — profilleri karşılaştırmak için ",
    linkText: "VPN karşılaştırmaları",
    after: " sayfasını ziyaret edebilirsin.",
  },
  relatedLabel: "İlgili sayfalar",
  relatedLinks: [
    { href: "/rehber/vpn-nedir", text: "VPN nedir?" },
    {
      href: "/rehber/ucretsiz-vs-ucretli-vpn",
      text: "Ücretsiz vs Ücretli VPN",
    },
    { href: "/metodoloji", text: "Kaynak-temelli metodoloji" },
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
        "Review the home country's data-retention, legal-request and corporate-transparency rules. Intelligence alliances add context; they do not by themselves prove better privacy or no-logs implementation.",
    },
    {
      title: "2. Proof of independent audits",
      question: "Has the no-logs claim been verified by a third party?",
      answer:
        "Look for a report from a recognized third party, including its date and scope. A one-off review covers only that period and scope; regular repeated audits provide a stronger signal about current implementation.",
    },
    {
      title: "3. No-logs policy",
      question: "What kind of logs does the provider keep?",
      answer:
        "Check how the policy treats source IPs, destinations, connection timestamps, bandwidth and account data separately. Read retention periods, purposes and third-party sharing terms instead of relying on the marketing headline.",
    },
    {
      title: "4. Encryption standard",
      question: "Which encryption algorithm and key length?",
      answer:
        "Verify the current app's cipher suite and protocol configuration in provider documentation and audit reports. Avoid services that default to obsolete, weak options such as PPTP.",
    },
    {
      title: "5. Protocol options",
      question: "Which VPN protocols does it support?",
      answer:
        "WireGuard or a current WireGuard derivative plus a mature alternative such as OpenVPN can provide flexibility. Check the implementation's update and security-audit history as well as the protocol name.",
    },
    {
      title: "6. DNS leak protection",
      question: "Where do DNS queries go while the VPN is active?",
      answer:
        "Confirm that DNS queries use the expected encrypted tunnel and resolver. Queries leaving the tunnel can expose domain activity; test for leaks across the networks and applications you use.",
    },
    {
      title: "7. Kill switch",
      question: "What happens if the VPN connection drops?",
      answer:
        "A kill switch is designed to stop traffic when the tunnel drops, reducing IP-exposure risk. Verify system-wide versus per-app coverage, reconnect behavior and split-tunneling exceptions on your platform.",
    },
    {
      title: "8. RAM-only server infrastructure",
      question: "How do the servers run?",
      answer:
        "A RAM-only design can reduce local-disk persistence and clears memory on reboot. It does not by itself prevent centralized logging or misconfiguration, so assess the architecture claim alongside independent audits.",
    },
    {
      title: "9. Open-source clients",
      question: "Is the VPN app's code public?",
      answer:
        "Open source makes code review and vulnerability reporting easier. It does not by itself guarantee the absence of backdoors or that the distributed binary matches the source; look for reproducible builds and audit history too.",
    },
    {
      title: "10. Device limit",
      question: "How many devices can you use on one subscription?",
      answer:
        "Estimate your simultaneous-device needs, then verify the provider's current connection cap, router rules and fair-use terms on the official plan page. These limits can change.",
    },
    {
      title: "11. Public legal record (if any)",
      question: "Has the no-logs claim been tested in a legal case?",
      answer:
        "Past cases or server-seizure reports can show how a provider responded to a request at a specific time. They are not standalone proof of the current policy or a future guarantee; verify the underlying decisions and reports directly.",
    },
    {
      title: "12. Pricing transparency",
      question: "Is the renewal price clear?",
      answer:
        "Before paying, check the introductory total, automatic-renewal price, tax, currency, app-store exceptions and refund terms. A promotional headline does not show the full cost.",
    },
  ],
  howToUse: {
    h2: "How to use this list",
    before:
      "When picking a VPN, verify these 12 points on the provider's own site, in audit reports and in independent reviews. Our source-based comparison framework evaluates these criteria alongside provider documentation and current terms — to compare profiles, visit the ",
    linkText: "VPN comparisons",
    after: " page.",
  },
  relatedLabel: "Related pages",
  relatedLinks: [
    { href: "/guide/what-is-a-vpn", text: "What is a VPN?" },
    {
      href: "/guide/free-vs-paid-vpn",
      text: "Free vs paid VPN",
    },
    { href: "/metodoloji", text: "Source-based methodology" },
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
        "Prüfe die Regeln des Sitzlandes zu Datenspeicherung, Behördenanfragen und Unternehmenstransparenz. Nachrichtendienst-Allianzen liefern Kontext, beweisen aber allein weder besseren Datenschutz noch eine No-Logs-Umsetzung.",
    },
    {
      title: "2. Nachweis unabhängiger Audits",
      question: "Wurde die No-Logs-Behauptung von Dritten geprüft?",
      answer:
        "Suche nach Bericht, Datum und Umfang eines anerkannten unabhängigen Prüfers. Eine einmalige Prüfung gilt nur für diesen Zeitraum und Umfang; regelmäßige Wiederholungen sind ein stärkeres Signal für die aktuelle Umsetzung.",
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
        "Ein Kill Switch soll bei Tunnelabbruch den Verkehr stoppen und so das Risiko einer IP-Offenlegung verringern. Prüfe systemweite und App-Abdeckung, Wiederverbindung und Split-Tunneling-Ausnahmen auf deiner Plattform.",
    },
    {
      title: "8. RAM-only-Serverinfrastruktur",
      question: "Wie laufen die Server?",
      answer:
        "RAM-only kann lokale Festplattenpersistenz verringern und leert den Speicher beim Neustart. Zentrale Protokollierung oder Fehlkonfiguration werden dadurch nicht allein verhindert; prüfe die Architekturaussage zusammen mit unabhängigen Audits.",
    },
    {
      title: "9. Open-Source-Clients",
      question: "Ist der Code der VPN-App öffentlich?",
      answer:
        "Open Source erleichtert Codeprüfung und Schwachstellenmeldungen. Es garantiert weder die Abwesenheit von Hintertüren noch die Übereinstimmung der ausgelieferten App mit dem Quellcode; prüfe auch reproduzierbare Builds und Audit-Historie.",
    },
    {
      title: "10. Gerätelimit",
      question: "Auf wie vielen Geräten kannst du dasselbe Abo nutzen?",
      answer:
        "Ermittle deinen Bedarf an gleichzeitigen Geräten und prüfe das aktuelle Verbindungslimit, Router-Regeln und Fair-Use-Bedingungen auf der offiziellen Tarifseite. Diese Grenzen können sich ändern.",
    },
    {
      title: "11. Öffentliche Rechtshistorie (falls vorhanden)",
      question: "Wurde die No-Logs-Behauptung in einem Gerichtsverfahren getestet?",
      answer:
        "Frühere Verfahren oder Berichte über Serverbeschlagnahmen können zeigen, wie ein Anbieter zu einem bestimmten Zeitpunkt reagierte. Sie sind weder alleiniger Nachweis der heutigen Richtlinie noch Zukunftsgarantie; prüfe Originalentscheidungen und Berichte.",
    },
    {
      title: "12. Preistransparenz",
      question: "Ist der Verlängerungspreis bekannt?",
      answer:
        "Prüfe vor der Zahlung Einstiegsgesamtpreis, automatische Verlängerung, Steuern, Währung, App-Store-Ausnahmen und Erstattungsbedingungen. Eine Aktionsüberschrift zeigt nicht die Gesamtkosten.",
    },
  ],
  howToUse: {
    h2: "Wie nutzt du diese Liste?",
    before:
      "Prüfe diese 12 Punkte bei der VPN-Wahl auf der Website des Anbieters, in Audit-Berichten und in unabhängigen Bewertungen. Unser quellenbasierter Vergleichsrahmen betrachtet diese Kriterien zusammen mit Anbieterdokumentation und aktuellen Bedingungen — Profile vergleichst du auf der Seite ",
    linkText: "VPN-Vergleiche",
    after: ".",
  },
  relatedLabel: "Verwandte Seiten",
  relatedLinks: [
    { href: "/ratgeber/was-ist-ein-vpn", text: "Was ist ein VPN?" },
    {
      href: "/ratgeber/kostenloses-vs-kostenpflichtiges-vpn",
      text: "Kostenlos vs. kostenpflichtig",
    },
    { href: "/metodoloji", text: "Quellenbasierte Methodik" },
  ],
};

const CONTENT: Record<AppLocale, VpnSecurityChecklistContent> = { tr, en, de };

export function getVpnSecurityChecklistContent(
  locale: string,
): VpnSecurityChecklistContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
