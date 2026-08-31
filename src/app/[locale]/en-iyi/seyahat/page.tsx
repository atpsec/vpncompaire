import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Plane } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle: "Seyahat İçin VPN Bilgi Rehberi (2026)",
    metaDescription:
      "Halka açık Wi-Fi güvenliği, kısıtlayıcı ülkelerde erişim, evdeki içeriklere uzaktan ulaşma — seyahat eden için en iyi VPN seçimleri.",
    title: "Seyahat için VPN bilgi rehberi",
    tagline:
      "Halka açık Wi-Fi güvenliği, kısıtlayıcı ülkelerde erişim ve evdeki içeriklere uzaktan ulaşma.",
    summary:
      "Seyahatte VPN dört şey için kritik: halka açık Wi-Fi'de trafik şifreleme, kısıtlayıcı ülkelerde obfuscation, evdeki içeriğe (özellikle Türk medyası) uzaktan erişim ve sık ağ değişiminde otomatik koruma. ExpressVPN kapsam, NordVPN obfuscation, Surfshark cihaz sayısı ile öne çıkıyor.",
    badgeLabel: "Seyahat",
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Geniş ülke kapsamı (105 ülke)",
        why: "105 ülkede sunucu — gittiğin neredeyse her yerden hem evdeki içeriğe ulaşma hem de yerel ağdan güvenli çıkış imkanı. Lightway protokolünün hızlı bağlantı kurulumu, sık ağ değiştiren seyahatlerde pratik.",
      },
      {
        slug: "nordvpn",
        bestFor: "Otomatik koruma + obfuscation",
        why: "Auto-Connect özelliği güvensiz Wi-Fi tespit ettiğinde otomatik aktive oluyor. Obfuscation sunucuları, kısıtlayıcı ağlarda VPN trafiğini gizliyor — özellikle Çin, BAE, İran gibi VPN engellemesi yapan ülkelerde.",
      },
      {
        slug: "surfshark",
        bestFor: "Sınırsız cihaz + Camouflage Mode",
        why: "Telefon, tablet, dizüstü — seyahatte taşıdığın tüm cihazları aynı abonelikten koruyabilirsin. Camouflage Mode (DPI bypass) Türkiye dahil VPN tespiti yapan ülkelerde işe yarıyor.",
      },
    ],
    considerations: [
      {
        title: "Halka açık Wi-Fi güvenliği",
        body: "Otel, kafe, havaalanı Wi-Fi'leri genelde şifresiz veya zayıf şifreli. Bu ağlardaki diğer kullanıcılar trafiğini görebilir (paket sniffing). VPN, bu ağda dahi trafiğini şifreleyerek pasif saldırılara karşı korur.",
      },
      {
        title: "Kısıtlayıcı ülkelerde VPN engellemesi",
        body: "Çin (Great Firewall), İran, Birleşik Arap Emirlikleri, Belarus, Türkmenistan gibi ülkelerde VPN trafiği aktif olarak tespit ve engellenir. Obfuscation/Camouflage özellikleri olan VPN'ler bu engellemelere karşı dirençli.",
      },
      {
        title: "Evdeki içeriklere uzaktan erişim",
        body: "Yurt dışındayken Türkiye'ye dönmek için TR sunucusu, BluTV/Exxen/Netflix TR için kritik. Surfshark TR sunucusu sunuyor; çoğu rakip sunmuyor.",
      },
      {
        title: "Kurulum öncesinde indirme",
        body: "Bazı ülkeler VPN sağlayıcılarının web sitelerini engelliyor — yani uygulamayı oradayken indiremeyebilirsin. Seyahat öncesi tüm cihazlarına VPN'i kur.",
      },
    ],
    faqs: [
      {
        q: "Hangi ülkelerde VPN kullanmak yasak?",
        a: "VPN kuralları ülkeye ve zamana göre hızla değişebilir; bazı ülkelerde yalnız onaylı hizmetlere izin verilir veya kullanım kısıtlanır. Seyahatten önce resmi güncel kaynakları ve gerekiyorsa yerel hukuk uzmanını kontrol edin; bu sayfa hukuki tavsiye değildir.",
      },
      {
        q: "Otelde VPN gerçekten gerekli mi?",
        a: "Evet. Otel Wi-Fi'leri genelde paylaşımlı, şifresiz veya zayıf şifreli. Aynı ağdaki diğer misafirler trafiğini görebilir. Bankacılık veya hassas iletişim yapacaksan VPN minimum güvenlik gereksinimi.",
      },
      {
        q: "Seyahatte VPN olmadan hangi riskler var?",
        a: "Paket sniffing (trafik dinleme), man-in-the-middle saldırıları (sahte Wi-Fi hotspot'ları), oturum çalma (cookie hijacking) ve DNS poisoning. VPN bu saldırı yüzeylerinin tümünü ortadan kaldırır.",
      },
      {
        q: "Çin'e gidiyorum, hangi VPN'i kullanmalıyım?",
        a: "ExpressVPN ve NordVPN, Great Firewall'a karşı en istikrarlı sağlayıcılardan. Çin'e gitmeden önce uygulamayı indir — Çin'de sağlayıcı web siteleri engelli. Obfuscation özelliği aktif olmalı.",
      },
    ],
    relatedLinks: [
      { label: "Yurt dışı Türkler için", href: "/best-vpn/turks-abroad" },
      { label: "Türkiye için", href: "/best-vpn/turkey" },
      { label: "Gizlilik için", href: "/best-vpn/privacy" },
    ],
  },
  en: {
    metaTitle: "VPN Information Guide for Travel (2026)",
    metaDescription:
      "Public Wi-Fi safety, access in restrictive countries and remote access to home content — a source-based VPN guide for travellers.",
    title: "VPN information guide for travel",
    tagline:
      "Public Wi-Fi safety, access in restrictive countries and remote access to home content.",
    summary:
      "While travelling, a VPN matters for four things: encrypting traffic on public Wi-Fi, obfuscation in restrictive countries, remote access to home content (Turkish media in particular) and auto-protection as you hop networks. This guide organizes provider-published coverage, obfuscation and device-support information; it is not a lab ranking.",
    badgeLabel: "Travel",
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Broad country coverage (105 countries)",
        why: "Servers in 105 countries — from almost anywhere you go you can both reach home content and exit the local network safely. Lightway's fast setup is handy when you change networks often.",
      },
      {
        slug: "nordvpn",
        bestFor: "Auto-protect + obfuscation",
        why: "Auto-Connect activates when an unsafe Wi-Fi is detected. Obfuscation servers hide VPN traffic on restrictive networks — especially in countries like China, UAE and Iran that block VPNs.",
      },
      {
        slug: "surfshark",
        bestFor: "Unlimited devices + Camouflage Mode",
        why: "Phone, tablet, laptop — protect every device you travel with under one subscription. Camouflage Mode (DPI bypass) helps in countries (including Türkiye at times) that try to detect VPN traffic.",
      },
    ],
    considerations: [
      {
        title: "Public Wi-Fi safety",
        body: "Hotel, café and airport Wi-Fi is usually unencrypted or weakly encrypted. Other users on the network can sniff your traffic. A VPN encrypts your traffic even there, defending against passive attacks.",
      },
      {
        title: "VPN blocking in restrictive countries",
        body: "Countries like China (Great Firewall), Iran, UAE, Belarus and Turkmenistan actively detect and block VPN traffic. VPNs with obfuscation/camouflage features hold up better against these blocks.",
      },
      {
        title: "Remote access to home content",
        body: "Outside Türkiye, a Turkish server is critical for BluTV/Exxen/Netflix TR. Surfshark offers a TR server; most rivals don't.",
      },
      {
        title: "Install before you travel",
        body: "Some countries block VPN providers' websites — meaning you may not be able to download the app once you're there. Install on every device before you leave.",
      },
    ],
    faqs: [
      {
        q: "Where is VPN use banned?",
        a: "VPN rules can change quickly by country; some jurisdictions restrict use or allow only approved services. Before travel, check current official sources and, where needed, local legal advice. This page is not legal advice.",
      },
      {
        q: "Is a VPN really necessary at a hotel?",
        a: "Yes. Hotel Wi-Fi is usually shared, unencrypted or weakly encrypted. Other guests on the same network can see your traffic. For banking or sensitive comms, a VPN is the minimum.",
      },
      {
        q: "What are the risks of travelling without a VPN?",
        a: "Packet sniffing, man-in-the-middle attacks (fake Wi-Fi hotspots), session hijacking (cookie theft) and DNS poisoning. A VPN closes nearly all of these vectors.",
      },
      {
        q: "I'm going to China — which VPN should I use?",
        a: "ExpressVPN and NordVPN are the most consistent against the Great Firewall. Install the app before you go — provider websites are blocked inside China. Make sure obfuscation is on.",
      },
    ],
    relatedLinks: [
      { label: "For Turks abroad", href: "/best-vpn/turks-abroad" },
      { label: "Best in Turkey", href: "/best-vpn/turkey" },
      { label: "Best for privacy", href: "/best-vpn/privacy" },
    ],
  },
  de: {
    metaTitle: "VPN-Informationsratgeber für Reisen (2026)",
    metaDescription:
      "Sicherheit in öffentlichen WLANs, Zugang in restriktiven Ländern und Zugriff auf Inhalte zu Hause — VPN-Auswahl für Reisende.",
    title: "VPN-Informationsratgeber für Reisen",
    tagline:
      "Sicherheit in öffentlichen WLANs, Zugang in restriktiven Ländern und Zugriff auf Inhalte zu Hause.",
    summary:
      "Auf Reisen ist ein VPN vor allem für vier Dinge relevant: verschlüsselten Datenverkehr in öffentlichen WLANs, Obfuscation in restriktiven Ländern, den Fernzugriff auf Inhalte zu Hause und automatischen Schutz beim Wechsel zwischen Netzwerken. ExpressVPN punktet bei der Abdeckung, NordVPN bei Obfuscation und Surfshark bei der Gerätezahl.",
    badgeLabel: "Reisen",
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Große Länderabdeckung",
        why: "ExpressVPN dokumentiert Server in 105 Ländern. Dadurch können Reisende von vielen Orten aus auf Inhalte zu Hause zugreifen und das lokale Netzwerk mit einem VPN verlassen. Die schnelle Verbindungseinrichtung von Lightway ist bei häufigen Netzwechseln praktisch.",
      },
      {
        slug: "nordvpn",
        bestFor: "Automatischer Schutz und Obfuscation",
        why: "Auto-Connect kann sich bei unsicheren WLANs automatisch aktivieren. Obfuscation-Server verbergen VPN-Datenverkehr in restriktiven Netzwerken, wobei die tatsächliche Verfügbarkeit von Land, Netzwerk und aktueller Anbieterunterstützung abhängt.",
      },
      {
        slug: "surfshark",
        bestFor: "Viele Geräte und Camouflage Mode",
        why: "Telefon, Tablet und Laptop lassen sich mit einem Konto verbinden. Der Camouflage Mode kann in Netzwerken helfen, die VPN-Datenverkehr erkennen wollen; prüfen Sie vor der Reise die aktuellen Tarif- und Gerätebedingungen.",
      },
    ],
    considerations: [
      {
        title: "Sicherheit in öffentlichen WLANs",
        body: "Hotel-, Café- und Flughafen-WLANs sind oft unverschlüsselt oder schwach geschützt. Andere Nutzer im Netzwerk können Datenverkehr beobachten. Ein VPN verschlüsselt unterstützten Datenverkehr zusätzlich, ersetzt aber HTTPS und aktuelle Gerätesicherheit nicht.",
      },
      {
        title: "VPN-Sperren in restriktiven Ländern",
        body: "Länder wie China, Iran, die Vereinigten Arabischen Emirate, Belarus und Turkmenistan erkennen und blockieren VPN-Datenverkehr teilweise aktiv. Obfuscation- oder Camouflage-Funktionen können helfen, garantieren aber keinen Zugang und müssen die lokalen Regeln beachten.",
      },
      {
        title: "Zugriff auf Inhalte zu Hause",
        body: "Außerhalb Deutschlands kann ein Server im gewünschten Heimatland für regionale Dienste relevant sein. Streaming-Kataloge und Zugänge ändern sich häufig; prüfen Sie den exakten Dienst, das Konto, den Server und die aktuellen Nutzungsbedingungen.",
      },
      {
        title: "Vor der Reise installieren",
        body: "Manche Länder blockieren VPN-Websites. Installieren und aktualisieren Sie die App deshalb vor der Abreise auf jedem benötigten Gerät und speichern Sie die offiziellen Support-Informationen.",
      },
    ],
    faqs: [
      {
        q: "Wo ist die Nutzung eines VPN eingeschränkt?",
        a: "VPN-Regeln können sich nach Land und Zeitpunkt schnell ändern. Prüfen Sie vor der Reise aktuelle offizielle Quellen und holen Sie bei Bedarf lokale Rechtsberatung ein. Dieser Ratgeber ist keine Rechtsberatung.",
      },
      {
        q: "Ist ein VPN im Hotel wirklich nötig?",
        a: "Hotel-WLANs sind meist geteilt, unverschlüsselt oder schwach geschützt. Für Banking oder sensible Kommunikation kann ein VPN die Sichtbarkeit im lokalen Netzwerk reduzieren; HTTPS, Geräteschutz und sichere Konten bleiben ebenfalls wichtig.",
      },
      {
        q: "Welche Risiken gibt es ohne VPN auf Reisen?",
        a: "Mögliche Risiken sind das Beobachten von Datenverkehr, gefälschte WLAN-Hotspots, Sitzungsdiebstahl und DNS-Manipulation. Ein VPN reduziert bestimmte Netzwerk-Sichtbarkeit, beseitigt aber nicht Phishing, unsichere Apps oder einen nicht vertrauenswürdigen Anbieter.",
      },
      {
        q: "Welchen VPN sollte ich für China wählen?",
        a: "Zugang zur Great Firewall ist nicht garantiert und kann sich kurzfristig ändern. Prüfen Sie aktuelle offizielle Anbieterinformationen, installieren Sie die App vor der Reise und beachten Sie die lokalen Vorschriften.",
      },
    ],
    relatedLinks: [
      { label: "VPN für Reisende", href: "/best-vpn/travel" },
      { label: "VPN für Datenschutz", href: "/best-vpn/privacy" },
      { label: "VPN für Android", href: "/devices/android" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "en" ? "en" : locale === "de" ? "de" : "tr"];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates("/best-vpn/travel", locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl("/best-vpn/travel", locale),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale === "en" ? "en" : locale === "de" ? "de" : "tr"];

  return (
    <UseCasePage
      slug="seyahat"
      title={c.title}
      tagline={c.tagline}
      summary={c.summary}
      Icon={Plane}
      badgeLabel={c.badgeLabel}
      picks={c.picks}
      faqs={c.faqs}
      considerations={[...c.considerations]}
      relatedLinks={[...c.relatedLinks]}
    />
  );
}
