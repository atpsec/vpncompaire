// "ExpressVPN vs NordVPN" karşılaştırmasının locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/karsilastir/expressvpn-vs-nordvpn/page.tsx) bu
// modülden render eder; yerelleştirilmiş URL'ler (/karsilastir/...,
// /en/comparison/..., /de/vergleich/...) proxy rewrite ile aynı sayfaya düşer.
// A = ExpressVPN, B = NordVPN.

import type { AppLocale } from "@/lib/i18n-paths";

export type AbWinner = "a" | "b" | "tie";

export type AbCategory = {
  name: string;
  winner: AbWinner;
  aDetail: string;
  bDetail: string;
  reasoning: string;
};

export type ExpressvpnVsNordvpnContent = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: { home: string; hub: string; current: string };
  badge: string;
  h1: string;
  tagline: string;
  ctaOfficial: { a: string; b: string };
  categoriesH2: string;
  categoriesIntro: string;
  reasonLabel: string;
  winnerTie: string;
  winnerLeads: { a: string; b: string };
  categories: AbCategory[];
  whyA: { title: string; bullets: string[]; cta: string };
  whyB: { title: string; bullets: string[]; cta: string };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  related: { title: string; links: { href: string; text: string }[] };
};

const tr: ExpressvpnVsNordvpnContent = {
  metaTitle: "ExpressVPN vs NordVPN Karşılaştırması (2026)",
  metaDescription:
    "ExpressVPN ve NordVPN'i 6 kritere göre karşılaştırdık: hız, denetimler, streaming, fiyat ve daha fazlası. İki premium devin yan yana analizi.",
  breadcrumb: {
    home: "Ana sayfa",
    hub: "Karşılaştırma",
    current: "ExpressVPN vs NordVPN",
  },
  badge: "Yan yana karşılaştırma",
  h1: "ExpressVPN vs NordVPN: 2026 Karşılaştırması",
  tagline:
    "İki premium sağlayıcının özellik, denetim geçmişi ve kullanım koşulları üzerinden kaynak temelli karşılaştırması.",
  ctaOfficial: {
    a: "ExpressVPN sitesini ziyaret et",
    b: "NordVPN sitesini ziyaret et",
  },
  categoriesH2: "Kategori bazında öne çıkan özellikler",
  categoriesIntro:
    'Her satırdaki etiket, sağlayıcının o kriterde nasıl konumlandığını gösterir — kategorik bir "kazanan" ilan etmez.',
  reasonLabel: "Neden:",
  winnerTie: "İkisi de güçlü",
  winnerLeads: {
    a: "ExpressVPN bu kriterde öne çıkıyor",
    b: "NordVPN bu kriterde öne çıkıyor",
  },
  categories: [
    {
      name: "Gizlilik ve yargı yetkisi",
      winner: "tie",
      aDetail:
        "İngiliz Virjin Adaları merkezli; 2017 sunucu olayı kamuya yansıyan tarihsel bir veri noktasıdır",
      bDetail: "Panama merkezli; sağlayıcı no-logs politikası ve denetim raporları yayımlar",
      reasoning:
        "Bir merkez ülke veya geçmiş olay, güncel veri uygulamasını tek başına kanıtlamaz. Karar verirken güncel gizlilik politikası, bağımsız denetim kapsamı ve veri talebi şeffaflığı birlikte incelenmelidir.",
    },
    {
      name: "Bağımsız denetimler",
      winner: "b",
      aDetail: "KPMG + Cure53 + PWC denetimleri",
      bDetail: "Tekrarlanan Deloitte no-logs incelemeleri + Cure53 istemci denetimleri",
      reasoning:
        "NordVPN yayımlanmış tekrarlı no-logs incelemelerinin sıklığıyla öne çıkıyor. Denetimlerin tarihini, kapsamını ve rapora erişim koşullarını sağlayıcıların güncel şeffaflık sayfalarından doğrulayın.",
    },
    {
      name: "Hız performansı",
      winner: "tie",
      aDetail: "Lightway protokolü — açık kaynak; sonuçlar ağ ve cihaza göre değişir",
      bDetail: "NordLynx — WireGuard tabanlı; sonuçlar ağ ve cihaza göre değişir",
      reasoning:
        "VPN Advisor doğrudan karşılaştırılabilir laboratuvar ölçümü yayımlamadığı için sayısal bir hız kazananı ilan etmiyor. Kendi rota, cihaz ve ISP koşullarınızda deneme yapın.",
    },
    {
      name: "Streaming uyumluluğu",
      winner: "tie",
      aDetail: "Sağlayıcının destek belgelerinde çeşitli streaming senaryoları ve MediaStreamer açıklanır",
      bDetail: "Sağlayıcının destek belgelerinde çeşitli streaming senaryoları ve SmartPlay açıklanır",
      reasoning:
        "Platformların VPN ve DNS politikaları değişebilir; hiçbir servis için sürekli erişim garanti edilemez. Güncel cihaz ve hizmet desteğini satın almadan önce kontrol edin.",
    },
    {
      name: "Fiyat (uzun dönem)",
      winner: "tie",
      aDetail: "Plan, kampanya, para birimi ve yenileme fiyatını resmi ödeme ekranında kontrol edin",
      bDetail: "Plan, kampanya, para birimi ve yenileme fiyatını resmi ödeme ekranında kontrol edin",
      reasoning:
        "Fiyatlar pazara, kampanyaya, vergiye ve abonelik dönemine göre değişir. İlk dönem fiyatıyla otomatik yenileme fiyatını ayrı karşılaştırın.",
    },
    {
      name: "Sahiplik şeffaflığı",
      winner: "b",
      aDetail: "Kape Technologies (PIA, CyberGhost ile aynı ana şirket)",
      bDetail: "Nord Security (Surfshark ile aynı ana şirket)",
      reasoning:
        "Her iki sahiplik yapısı da bazı eleştirmenlerce çıkar çatışması olarak değerlendiriliyor. NordVPN/Surfshark birleşmesi (Mart 2022) daha yeni; Kape'nin VPN sektöründeki yoğunlaşması (4+ büyük VPN) daha geniş. Hangisinin daha rahatsız ettiği kişisel değerlendirme.",
    },
  ],
  whyA: {
    title: "ExpressVPN'i seç eğer...",
    bullets: [
      "Premium fiyat kabul edilebilir; sürtünmesiz deneyim önemli",
      "Akıllı TV / konsol kullanıyorsun (MediaStreamer DNS için)",
      "Lightway protokolünün hızlı bağlantı kurulumunu istiyorsun",
      "2017 Türkiye sunucu olayı gibi kamuya açık tarihsel kayıtları önemsiyorsun",
      "Sürekli sık ülke değiştiriyorsan (seyahat)",
    ],
    cta: "ExpressVPN'i incele",
  },
  whyB: {
    title: "NordVPN'i seç eğer...",
    bullets: [
      "Güncel resmi ödeme ekranında NordVPN bütçene daha uygun görünüyor",
      "Düzenli ve tekrarlanan denetim geçmişi kritik",
      "Threat Protection, Meshnet, Onion over VPN gibi ek özellikler değerli",
      "10 cihaz limiti yeterli",
      "Maksimum throughput (büyük dosya indirme, 4K streaming)",
    ],
    cta: "NordVPN'i incele",
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "ExpressVPN mi NordVPN mi daha iyi?",
      a: "Bütçe ve denetim sürekliliği önemliyse NordVPN'in güncel koşullarını; MediaStreamer ve Lightway gibi özellikler önemliyse ExpressVPN'in güncel koşullarını karşılaştırın. Tek bir seçenek herkes için daha iyi değildir.",
    },
    {
      q: "İki VPN'in hızı arasında ne kadar fark var?",
      a: "Doğrudan karşılaştırılabilir laboratuvar ölçümümüz olmadığı için güvenilir bir yüzde veremiyoruz. Sonuç; konum, ISP, cihaz, protokol ve sunucu yüküne göre değişir.",
    },
    {
      q: "İkisi de Türkiye'de çalışıyor mu?",
      a: "Erişilebilirlik ve ağ engelleri zamanla değişebilir. Sağlayıcıların güncel bağlantı ve obfuscation belgelerini kontrol edin; satın almadan önce kendi ağınızda deneme ve iade koşullarını değerlendirin.",
    },
    {
      q: "Kape Technologies vs Nord Security sahipliği — hangisi daha rahatsız edici?",
      a: "Sahiplik yapısını tek başına güvenlik kanıtı olarak görmeyin. Güncel kurumsal açıklamalarla birlikte bağımsız denetimleri, gizlilik politikasını ve şeffaflık raporlarını değerlendirin.",
    },
  ],
  related: {
    title: "Diğer sayfalar",
    links: [
      {
        href: "/karsilastir/nordvpn-vs-surfshark",
        text: "NordVPN vs Surfshark",
      },
      { href: "/inceleme/expressvpn", text: "ExpressVPN incelemesi" },
      { href: "/inceleme/nordvpn", text: "NordVPN incelemesi" },
      { href: "/en-iyi-vpn", text: "En iyi VPN 2026" },
    ],
  },
};

const en: ExpressvpnVsNordvpnContent = {
  metaTitle: "ExpressVPN vs NordVPN Comparison (2026)",
  metaDescription:
    "We compared ExpressVPN and NordVPN across 6 criteria: speed, audits, streaming, price and more. A side-by-side analysis of two premium giants.",
  breadcrumb: {
    home: "Home",
    hub: "Compare",
    current: "ExpressVPN vs NordVPN",
  },
  badge: "Side-by-side comparison",
  h1: "ExpressVPN vs NordVPN: 2026 Comparison",
  tagline:
    "A source-based comparison of two premium providers across features, audit history and subscription terms.",
  ctaOfficial: {
    a: "Visit ExpressVPN",
    b: "Visit NordVPN",
  },
  categoriesH2: "Category-by-category highlights",
  categoriesIntro:
    'Each row indicates how a provider is positioned for that criterion — it does not crown a categorical "winner".',
  reasonLabel: "Why:",
  winnerTie: "Both are strong",
  winnerLeads: {
    a: "ExpressVPN leads on this criterion",
    b: "NordVPN leads on this criterion",
  },
  categories: [
    {
      name: "Privacy and jurisdiction",
      winner: "tie",
      aDetail:
        "Based in the British Virgin Islands; the reported 2017 server incident is a historical data point",
      bDetail: "Based in Panama; the provider publishes a no-logs policy and audit information",
      reasoning:
        "A jurisdiction or historical incident does not by itself prove current data practices. Review the current privacy policy, independent-audit scope and transparency around data requests together.",
    },
    {
      name: "Independent audits",
      winner: "b",
      aDetail: "KPMG + Cure53 + PWC audits",
      bDetail: "Repeated Deloitte no-logs reviews + Cure53 client audits",
      reasoning:
        "NordVPN stands out for the frequency of its published no-logs reviews. Verify the latest date, scope and access conditions on each provider's current transparency pages.",
    },
    {
      name: "Speed performance",
      winner: "tie",
      aDetail: "Lightway protocol — open source; results vary by network and device",
      bDetail: "NordLynx — WireGuard-based; results vary by network and device",
      reasoning:
        "VPN Advisor does not publish a directly comparable lab sample for these products, so we do not name a numerical speed winner. Test on your own route, device and ISP.",
    },
    {
      name: "Streaming compatibility",
      winner: "tie",
      aDetail: "The provider's support documents describe several streaming scenarios and MediaStreamer",
      bDetail: "The provider's support documents describe several streaming scenarios and SmartPlay",
      reasoning:
        "Streaming services can change their VPN and DNS policies, so continuous access cannot be guaranteed. Check current device and service support before buying.",
    },
    {
      name: "Price (long term)",
      winner: "tie",
      aDetail: "Check the term, promotion, currency and renewal price at the official checkout",
      bDetail: "Check the term, promotion, currency and renewal price at the official checkout",
      reasoning:
        "Prices vary by market, promotion, tax and subscription term. Compare the introductory total and the automatic-renewal price separately.",
    },
    {
      name: "Ownership transparency",
      winner: "b",
      aDetail: "Kape Technologies (same parent company as PIA and CyberGhost)",
      bDetail: "Nord Security (same parent company as Surfshark)",
      reasoning:
        "Some critics see both ownership structures as a conflict of interest. The NordVPN/Surfshark merger (March 2022) is more recent; Kape's concentration in the VPN industry (4+ major VPNs) is broader. Which one bothers you more is a personal judgment.",
    },
  ],
  whyA: {
    title: "Choose ExpressVPN if...",
    bullets: [
      "A premium price is acceptable and a frictionless experience matters to you",
      "You use a smart TV / console (for MediaStreamer DNS)",
      "You want the Lightway protocol's fast connection setup",
      "You value public historical records such as the reported 2017 Turkey server incident",
      "You constantly switch countries (travel)",
    ],
    cta: "Read the ExpressVPN review",
  },
  whyB: {
    title: "Choose NordVPN if...",
    bullets: [
      "NordVPN is the better fit at the price shown in your current official checkout",
      "A history of regular, repeated audits is critical",
      "Extra features like Threat Protection, Meshnet and Onion over VPN are valuable to you",
      "A 10-device limit is enough",
      "You want maximum throughput (large downloads, 4K streaming)",
    ],
    cta: "Read the NordVPN review",
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Is ExpressVPN or NordVPN better?",
      a: "If budget and audit continuity matter, compare NordVPN's current terms; if MediaStreamer and Lightway matter, compare ExpressVPN's current terms. No single option is better for everyone.",
    },
    {
      q: "How big is the speed difference between the two VPNs?",
      a: "We do not have a directly comparable lab sample, so we cannot support a reliable percentage. Results vary by location, ISP, device, protocol and server load.",
    },
    {
      q: "Do both work in Turkey?",
      a: "Availability and network blocking can change over time. Check each provider's current connection and obfuscation documentation, then consider testing on your own network under the refund terms.",
    },
    {
      q: "Kape Technologies vs Nord Security ownership — which is more concerning?",
      a: "Do not treat ownership structure alone as proof of security. Review current corporate disclosures alongside independent audits, privacy policies and transparency reports.",
    },
  ],
  related: {
    title: "Other pages",
    links: [
      {
        href: "/comparison/nordvpn-vs-surfshark",
        text: "NordVPN vs Surfshark",
      },
      { href: "/inceleme/expressvpn", text: "ExpressVPN review" },
      { href: "/inceleme/nordvpn", text: "NordVPN review" },
      { href: "/en-iyi-vpn", text: "Best VPNs 2026" },
    ],
  },
};

const de: ExpressvpnVsNordvpnContent = {
  metaTitle: "ExpressVPN vs NordVPN im Vergleich (2026)",
  metaDescription:
    "Wir haben ExpressVPN und NordVPN anhand von 6 Kriterien verglichen: Geschwindigkeit, Audits, Streaming, Preis und mehr. Zwei Premium-Schwergewichte in der Direktanalyse.",
  breadcrumb: {
    home: "Startseite",
    hub: "Vergleich",
    current: "ExpressVPN vs NordVPN",
  },
  badge: "Direktvergleich",
  h1: "ExpressVPN vs NordVPN: Vergleich 2026",
  tagline:
    "Ein quellenbasierter Vergleich zweier Premium-Anbieter nach Funktionen, Audit-Historie und Vertragsbedingungen.",
  ctaOfficial: {
    a: "Zur ExpressVPN-Website",
    b: "Zur NordVPN-Website",
  },
  categoriesH2: "Highlights nach Kategorien",
  categoriesIntro:
    'Das Label in jeder Zeile zeigt, wie ein Anbieter bei diesem Kriterium positioniert ist — es kürt keinen kategorischen "Sieger".',
  reasonLabel: "Warum:",
  winnerTie: "Beide sind stark",
  winnerLeads: {
    a: "ExpressVPN liegt bei diesem Kriterium vorn",
    b: "NordVPN liegt bei diesem Kriterium vorn",
  },
  categories: [
    {
      name: "Datenschutz und Gerichtsbarkeit",
      winner: "tie",
      aDetail:
        "Sitz auf den Britischen Jungferninseln; der gemeldete Server-Vorfall von 2017 ist ein historischer Datenpunkt",
      bDetail: "Sitz in Panama; der Anbieter veröffentlicht No-Logs- und Audit-Informationen",
      reasoning:
        "Ein Gerichtsstand oder historischer Vorfall beweist nicht allein die heutige Datenpraxis. Prüfe aktuelle Datenschutzrichtlinien, Audit-Umfang und Transparenz zu Behördenanfragen gemeinsam.",
    },
    {
      name: "Unabhängige Audits",
      winner: "b",
      aDetail: "KPMG- + Cure53- + PWC-Audits",
      bDetail: "Wiederholte Deloitte-No-Logs-Prüfungen + Cure53-Client-Audits",
      reasoning:
        "NordVPN fällt durch die Häufigkeit veröffentlichter No-Logs-Prüfungen auf. Datum, Umfang und Zugangsbedingungen sollten auf den aktuellen Transparenzseiten beider Anbieter geprüft werden.",
    },
    {
      name: "Geschwindigkeit",
      winner: "tie",
      aDetail: "Lightway-Protokoll — Open Source; Ergebnisse hängen von Netzwerk und Gerät ab",
      bDetail: "NordLynx — WireGuard-basiert; Ergebnisse hängen von Netzwerk und Gerät ab",
      reasoning:
        "VPN Advisor veröffentlicht für diese Produkte keine direkt vergleichbare Labormessung und nennt daher keinen numerischen Geschwindigkeitssieger. Teste auf deiner eigenen Route und Verbindung.",
    },
    {
      name: "Streaming-Kompatibilität",
      winner: "tie",
      aDetail: "Die Support-Dokumentation beschreibt verschiedene Streaming-Szenarien und MediaStreamer",
      bDetail: "Die Support-Dokumentation beschreibt verschiedene Streaming-Szenarien und SmartPlay",
      reasoning:
        "Streaming-Dienste können ihre VPN- und DNS-Regeln ändern; dauerhafter Zugriff ist nicht garantiert. Prüfe die aktuelle Geräte- und Dienstunterstützung vor dem Kauf.",
    },
    {
      name: "Preis (langfristig)",
      winner: "tie",
      aDetail: "Laufzeit, Aktion, Währung und Verlängerungspreis im offiziellen Checkout prüfen",
      bDetail: "Laufzeit, Aktion, Währung und Verlängerungspreis im offiziellen Checkout prüfen",
      reasoning:
        "Preise hängen von Markt, Aktion, Steuer und Laufzeit ab. Vergleiche Einstiegsgesamtpreis und automatische Verlängerung getrennt.",
    },
    {
      name: "Transparenz der Eigentümerstruktur",
      winner: "b",
      aDetail:
        "Kape Technologies (gleiche Muttergesellschaft wie PIA, CyberGhost)",
      bDetail: "Nord Security (gleiche Muttergesellschaft wie Surfshark)",
      reasoning:
        "Manche Kritiker werten beide Eigentümerstrukturen als Interessenkonflikt. Die NordVPN/Surfshark-Fusion (März 2022) ist jünger; Kapes Konzentration im VPN-Sektor (4+ große VPNs) ist breiter. Was dich mehr stört, ist eine persönliche Einschätzung.",
    },
  ],
  whyA: {
    title: "Wähle ExpressVPN, wenn...",
    bullets: [
      "ein Premium-Preis okay ist und dir ein reibungsloses Erlebnis wichtig ist",
      "du Smart-TV / Konsole nutzt (wegen MediaStreamer DNS)",
      "du den schnellen Verbindungsaufbau des Lightway-Protokolls willst",
      "du öffentliche historische Hinweise wie den gemeldeten Türkei-Server-Vorfall 2017 wichtig findest",
      "du ständig das Land wechselst (Reisen)",
    ],
    cta: "Zum ExpressVPN-Test",
  },
  whyB: {
    title: "Wähle NordVPN, wenn...",
    bullets: [
      "NordVPN beim aktuell angezeigten offiziellen Checkout besser in dein Budget passt",
      "eine regelmäßige, wiederholte Audit-Historie entscheidend ist",
      "Zusatzfunktionen wie Threat Protection, Meshnet und Onion over VPN wertvoll sind",
      "dir ein Limit von 10 Geräten reicht",
      "du maximalen Durchsatz willst (große Downloads, 4K-Streaming)",
    ],
    cta: "Zum NordVPN-Test",
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Ist ExpressVPN oder NordVPN besser?",
      a: "Wenn Budget und Audit-Kontinuität zählen, vergleiche NordVPNs aktuelle Bedingungen; wenn MediaStreamer und Lightway zählen, vergleiche ExpressVPNs aktuelle Bedingungen. Keine Option ist für alle besser.",
    },
    {
      q: "Wie groß ist der Geschwindigkeitsunterschied zwischen den beiden VPNs?",
      a: "Uns fehlt eine direkt vergleichbare Laborstichprobe, daher nennen wir keinen belastbaren Prozentwert. Das Ergebnis hängt von Standort, ISP, Gerät, Protokoll und Serverlast ab.",
    },
    {
      q: "Funktionieren beide in der Türkei?",
      a: "Erreichbarkeit und Netzsperren können sich ändern. Prüfe die aktuellen Verbindungs- und Obfuskationshinweise beider Anbieter und teste nach Möglichkeit im Rahmen der Rückerstattungsbedingungen im eigenen Netz.",
    },
    {
      q: "Kape Technologies vs. Nord Security — welche Eigentümerstruktur ist bedenklicher?",
      a: "Die Eigentümerstruktur allein ist kein Sicherheitsnachweis. Prüfe aktuelle Unternehmensangaben zusammen mit unabhängigen Audits, Datenschutzrichtlinien und Transparenzberichten.",
    },
  ],
  related: {
    title: "Weitere Seiten",
    links: [
      {
        href: "/vergleich/nordvpn-vs-surfshark",
        text: "NordVPN vs Surfshark",
      },
      { href: "/inceleme/expressvpn", text: "ExpressVPN im Test" },
      { href: "/inceleme/nordvpn", text: "NordVPN im Test" },
      { href: "/en-iyi-vpn", text: "Die besten VPNs 2026" },
    ],
  },
};

const CONTENT: Record<AppLocale, ExpressvpnVsNordvpnContent> = { tr, en, de };

export function getExpressvpnVsNordvpnContent(
  locale: string,
): ExpressvpnVsNordvpnContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
