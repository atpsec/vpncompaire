import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Gamepad2 } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle: "Oyun İçin En İyi VPN'ler (2026)",
    metaDescription:
      "Düşük gecikme, DDoS koruması, bölgesel oyun sunucusu erişimi ve geographic price arbitrage için en iyi VPN seçimleri.",
    title: "Oyun İçin En İyi VPN'ler",
    tagline:
      "Düşük gecikme, DDoS koruması ve bölgesel sunucu erişimi — oyuncular için en iyi seçimler.",
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
      { label: "Streaming için", href: "/en-iyi/streaming" },
      { label: "Gizlilik için", href: "/en-iyi/gizlilik" },
      { label: "PIA incelemesi", href: "/inceleme/pia" },
    ],
  },
  en: {
    metaTitle: "The Best VPNs for Gaming (2026)",
    metaDescription:
      "Low latency, DDoS protection, regional game-server access and geographic price arbitrage — the best VPN picks for gamers.",
    title: "The Best VPNs for Gaming",
    tagline:
      "Low latency, DDoS protection and regional server access — the best picks for gamers.",
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
      { label: "Best for streaming", href: "/en-iyi/streaming" },
      { label: "Best for privacy", href: "/en-iyi/gizlilik" },
      { label: "PIA review", href: "/inceleme/pia" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "en" ? "en" : "tr"];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates("/en-iyi/oyun", locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl("/en-iyi/oyun", locale),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale === "en" ? "en" : "tr"];

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
