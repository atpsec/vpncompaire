import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Gamepad2 } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle: "Oyun İçin VPN Bilgi Rehberi (2026)",
    metaDescription:
      "Düşük gecikme, DDoS koruması, bölgesel oyun sunucusu erişimi ve geographic price arbitrage için en iyi VPN seçimleri.",
    title: "Oyun için VPN bilgi rehberi",
    tagline:
      "Düşük gecikme, DDoS kapsamı ve bölgesel sunucu bilgilerini nasıl karşılaştıracağınızı öğrenin.",
    summary:
      "Oyun için VPN seçerken gecikme, rota kararlılığı, IP gizleme ve oyun kuralları birlikte değerlendirilmelidir. Burada doğrudan karşılaştırılabilir bir laboratuvar ölçümü sunmuyoruz; en sağlıklı seçim, aynı cihaz ve oyun sunucusunda VPN'siz ve VPN'li sonuçları karşılaştırmaktır.",
    badgeLabel: "Oyun",
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Lightway + yakın sunucu seçenekleri",
        why: "Lightway, oyun için denenebilecek modern protokol seçeneklerinden biri. Gerçek gecikme ve rota kararlılığı konuma, ISS'ye, sunucu yüküne ve oyun sunucusuna göre değişir; yakın birkaç sunucuyu aynı koşullarda karşılaştırın.",
      },
      {
        slug: "nordvpn",
        bestFor: "NordLynx + geniş sunucu seçimi",
        why: "NordLynx, indirme ve oyun rotalarında karşılaştırılabilecek WireGuard tabanlı bir seçenektir. Throughput için doğrudan karşılaştırılabilir laboratuvar ölçümümüz yoktur; Meshnet'in uygunluğu da oyun ve platform desteğine göre kontrol edilmelidir.",
      },
      {
        slug: "pia",
        bestFor: "Port forwarding + ileri konfigürasyon",
        why: "Port yönlendirme, bazı kendi sunucunu barındırma senaryolarında yararlı olabilir. Kullanılabilirlik sunucu bölgesine, platforma ve sağlayıcının güncel desteğine bağlı olduğundan kurulumdan önce belgeleri kontrol edin.",
      },
    ],
    considerations: [
      {
        title: "Gecikme (latency / ping)",
        body: "VPN, trafiği ek bir sunucudan geçirir ve gecikmeyi değiştirebilir. Etki rota ve sunucu yüküne bağlıdır. Yakın birkaç sunucuda temel ping, VPN ping'i, jitter ve paket kaybını aynı oyun bölgesine karşı ölçün.",
      },
      {
        title: "DDoS koruması",
        body: "Twitch yayıncıları veya rekabetçi oyuncular DDoS saldırılarına maruz kalabilir. VPN gerçek IP'yi oyun oturumundan gizleyerek riski azaltabilir; sağlayıcının DDoS filtreleme kapsamı ve sınırlamaları ayrıca doğrulanmalıdır.",
      },
      {
        title: "Bölgesel oyun sunucusu erişimi",
        body: "Bazı oyunların ASYA, NA-East, EU-West gibi bölgesel sunucuları var. Farklı bir VPN bölgesi eşleştirmeyi etkileyebilir, ancak sonuç oyun politikalarına, hesap bölgesine ve sunucu tarafındaki kontrollerine bağlıdır.",
      },
      {
        title: "Oyun mağazalarında bölge fiyatlandırması",
        body: "Steam, PlayStation Store, Microsoft Store gibi mağazalarda bazı oyunlar farklı bölgelerde daha ucuz olabilir. VPN ile farklı bölge mağazasına erişmek bazen mümkün ama platformların kullanım koşullarına aykırı olabilir.",
      },
    ],
    faqs: [
      {
        q: "VPN oyun performansını düşürür mü?",
        a: "VPN şifreleme ve ek rota nedeniyle hız ile gecikmeyi değiştirebilir; bazen farklı yönlendirme daha iyi sonuç da verebilir. Bu sayfada doğrudan karşılaştırılabilir bir laboratuvar ölçümü yoktur. Aynı cihaz, oyun bölgesi ve saat aralığında VPN'siz temel değerleri; ardından yakın sunucularda ping, jitter, paket kaybı ve indirme hızını karşılaştırın.",
      },
      {
        q: "Hangi protokolü kullanmalıyım?",
        a: "Önce WireGuard veya WireGuard tabanlı bir seçeneği deneyin; sorun yaşarsanız IKEv2 ya da OpenVPN UDP ile aynı koşullarda karşılaştırın. En iyi sonuç cihaz, ağ ve rotaya göre değişir.",
      },
      {
        q: "VPN ile DDoS koruması nasıl çalışır?",
        a: "VPN aktifken oyun sunucusu senin gerçek IP'ni değil VPN'in sunucu IP'sini görür. DDoS saldırganının elinde sadece VPN IP'si olur. VPN sağlayıcısı bu trafiği filtreler veya farklı bir IP'ye geçirir.",
      },
      {
        q: "Çocuğum oyun oynarken VPN kullanmalı mı?",
        a: "Açık ağda (örn. okul Wi-Fi'si) güvenli oyun için VPN faydalı. Ancak bazı oyun sunucuları VPN trafiğini engelleyebilir veya hesabınızı askıya alabilir; oyun şartlarını kontrol et.",
      },
    ],
    relatedLinks: [
      { label: "Streaming için", href: "/best-vpn/streaming" },
      { label: "Gizlilik için", href: "/best-vpn/privacy" },
      { label: "PIA incelemesi", href: "/reviews/pia" },
    ],
  },
  en: {
    metaTitle: "VPN Information Guide for Gaming (2026)",
    metaDescription:
      "Low latency, DDoS protection, regional game-server access and geographic price arbitrage — the best VPN picks for gamers.",
    title: "VPN information guide for gaming",
    tagline:
      "Learn how to compare latency, DDoS scope and regional server information for gaming.",
    summary:
      "When choosing a VPN for gaming, consider latency, route consistency, IP exposure and the game's rules together. We do not publish directly comparable lab measurements here; compare the VPN-off baseline with VPN-on results on the same device and game server.",
    badgeLabel: "Gaming",
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Lightway + nearby server options",
        why: "Lightway is one modern protocol option worth testing for gaming. Actual latency and route consistency depend on location, ISP, server load and the game server, so compare several nearby servers under the same conditions.",
      },
      {
        slug: "nordvpn",
        bestFor: "NordLynx + broad server choice",
        why: "NordLynx is a WireGuard-based option to compare for downloads and game routes. We do not have directly comparable lab throughput measurements; also check whether Meshnet fits the game and platform you use.",
      },
      {
        slug: "pia",
        bestFor: "Port forwarding + advanced config",
        why: "Port forwarding can help in some self-hosted multiplayer scenarios. Availability depends on server region, platform and the provider's current support, so verify the documentation before setup.",
      },
    ],
    considerations: [
      {
        title: "Latency / ping",
        body: "A VPN routes traffic through an extra server and can change latency. The impact depends on routing and server load. Measure baseline ping, VPN ping, jitter and packet loss against the same game region on several nearby servers.",
      },
      {
        title: "DDoS protection",
        body: "Twitch streamers and competitive players can face DDoS attacks. A VPN may reduce exposure by hiding the real IP from the game session; verify the provider's DDoS filtering scope and limitations separately.",
      },
      {
        title: "Regional game-server access",
        body: "Some games have regional servers (ASIA, NA-East, EU-West). A different VPN region may affect matchmaking, but the outcome depends on game rules, account region and server-side checks.",
      },
      {
        title: "Regional pricing on game stores",
        body: "On Steam, PlayStation Store and Microsoft Store, certain games are cheaper in different regions. A VPN can sometimes get you into another store region, but it may violate the platform's terms of use.",
      },
    ],
    faqs: [
      {
        q: "Does a VPN hurt gaming performance?",
        a: "Encryption and an extra route can change speed and latency, though different routing can occasionally improve a poor path. We do not publish directly comparable lab measurements here. On the same device, game region and time window, compare the VPN-off baseline with ping, jitter, packet loss and download speed across nearby VPN servers.",
      },
      {
        q: "Which protocol should I use?",
        a: "Try WireGuard or a WireGuard-based option first, then compare IKEv2 or OpenVPN UDP under the same conditions if needed. The best result depends on the device, network and route.",
      },
      {
        q: "How does DDoS protection via VPN work?",
        a: "With the VPN on, the game server sees the VPN's server IP, not your real one. A DDoS attacker only has the VPN IP to target. The VPN provider filters that traffic or moves you to a different IP.",
      },
      {
        q: "Should my child use a VPN while gaming?",
        a: "On open networks (e.g. school Wi-Fi) a VPN is useful for safer play. But some game servers block VPN traffic or may suspend accounts; check the game's terms first.",
      },
    ],
    relatedLinks: [
      { label: "Best for streaming", href: "/best-vpn/streaming" },
      { label: "Best for privacy", href: "/best-vpn/privacy" },
      { label: "PIA review", href: "/reviews/pia" },
    ],
  },
  de: {
    metaTitle: "VPN-Informationsratgeber für Gaming (2026)",
    metaDescription:
      "Latenz, DDoS-Schutz, regionale Spielserver und Preise — VPN-Auswahl für Gamer.",
    title: "VPN-Informationsratgeber für Gaming",
    tagline:
      "Lernen Sie, Latenz, DDoS-Umfang und regionale Serverinformationen für Gaming zu vergleichen.",
    summary:
      "Bei der VPN-Auswahl für Gaming sollten Latenz, Routenstabilität, IP-Sichtbarkeit und die Spielregeln gemeinsam betrachtet werden. Wir veröffentlichen hier keine direkt vergleichbaren Labormessungen; vergleichen Sie VPN-aus- und VPN-an-Werte auf demselben Gerät und im selben Spielserver.",
    badgeLabel: "Gaming",
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Lightway und nahe Server",
        why: "Lightway ist ein moderner Protokollkandidat für Gaming. Die tatsächliche Latenz und Routenstabilität hängen von Standort, ISP, Serverlast und Spielserver ab; vergleichen Sie mehrere nahe Server unter denselben Bedingungen.",
      },
      {
        slug: "nordvpn",
        bestFor: "NordLynx und große Serverauswahl",
        why: "NordLynx ist eine WireGuard-basierte Option für Downloads und Spielrouten. Wir haben hier keine direkt vergleichbaren Durchsatzmessungen; prüfen Sie zusätzlich, ob Meshnet zu Ihrem Spiel und Ihrer Plattform passt.",
      },
      {
        slug: "pia",
        bestFor: "Portweiterleitung und Konfiguration",
        why: "Portweiterleitung kann in manchen selbst gehosteten Mehrspieler-Szenarien helfen. Die Verfügbarkeit hängt von Serverregion, Plattform und aktueller Anbieterunterstützung ab; prüfen Sie die Dokumentation vor der Einrichtung.",
      },
    ],
    considerations: [
      {
        title: "Latenz und Ping",
        body: "Ein VPN führt den Datenverkehr über einen zusätzlichen Server und kann die Latenz verändern. Messen Sie Basis-Ping, VPN-Ping, Jitter und Paketverlust zur gleichen Spielregion über mehrere nahe Server.",
      },
      {
        title: "DDoS-Schutz",
        body: "Streamer und kompetitive Spieler können DDoS-Angriffen ausgesetzt sein. Ein VPN kann die echte IP-Adresse aus einer Spielsitzung heraushalten; prüfen Sie den dokumentierten Filterumfang und seine Grenzen separat.",
      },
      {
        title: "Zugang zu regionalen Spielservern",
        body: "Einige Spiele nutzen Regionen wie ASIA, NA-East oder EU-West. Eine andere VPN-Region kann das Matchmaking beeinflussen; das Ergebnis hängt von Spielregeln, Kontoregion und serverseitigen Prüfungen ab.",
      },
      {
        title: "Regionale Preise in Spiele-Stores",
        body: "Spiele können in Steam, PlayStation Store oder Microsoft Store regional unterschiedlich bepreist sein. Der Zugriff auf eine andere Store-Region kann jedoch gegen die Nutzungsbedingungen der Plattform verstoßen.",
      },
    ],
    faqs: [
      {
        q: "Verschlechtert ein VPN die Gaming-Leistung?",
        a: "Verschlüsselung und ein zusätzlicher Netzwerkweg können Geschwindigkeit und Latenz verändern; eine andere Route kann gelegentlich auch besser sein. Vergleichen Sie auf demselben Gerät und in derselben Spielregion VPN-aus-Werte mit Ping, Jitter, Paketverlust und Downloadgeschwindigkeit über nahe Server.",
      },
      {
        q: "Welches Protokoll sollte ich verwenden?",
        a: "WireGuard oder eine WireGuard-basierte Option ist oft ein sinnvoller erster Versuch. Vergleichen Sie bei Problemen IKEv2 oder OpenVPN UDP unter denselben Bedingungen. Das beste Ergebnis hängt von Gerät, Netzwerk und Route ab.",
      },
      {
        q: "Wie funktioniert DDoS-Schutz über ein VPN?",
        a: "Mit aktivem VPN sieht der Spielserver die IP des VPN-Servers statt Ihrer echten IP. Ein Angreifer kann dann nur die VPN-IP angreifen; der Anbieter kann den Datenverkehr filtern oder eine andere IP zuweisen. Umfang und Schutz sind anbieterabhängig.",
      },
      {
        q: "Sollte mein Kind beim Gaming ein VPN nutzen?",
        a: "In offenen Netzwerken kann ein VPN die lokale Sichtbarkeit reduzieren. Einige Spielserver blockieren VPN-Datenverkehr oder sperren Konten; prüfen Sie daher zuerst die Spielregeln und die Vorgaben des Netzbetreibers.",
      },
    ],
    relatedLinks: [
      { label: "VPN für Streaming", href: "/best-vpn/streaming" },
      { label: "VPN für Datenschutz", href: "/best-vpn/privacy" },
      { label: "PIA-Testbericht", href: "/reviews/pia" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "en" ? "en" : locale === "de" ? "de" : "tr"];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates("/best-vpn/gaming", locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl("/best-vpn/gaming", locale),
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
      slug="oyun"
      title={c.title}
      tagline={c.tagline}
      summary={c.summary}
      Icon={Gamepad2}
      badgeLabel={c.badgeLabel}
      picks={c.picks}
      faqs={c.faqs}
      considerations={[...c.considerations]}
      relatedLinks={[...c.relatedLinks]}
    />
  );
}
