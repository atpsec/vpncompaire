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
      "Oyun için VPN seçerken üç şey kritik: düşük gecikme (yakın sunucu + modern protokol), DDoS koruması (gerçek IP gizleme) ve bölgesel oyun sunucusu erişimi. ExpressVPN gecikme, NordVPN hız, PIA port forwarding ile öne çıkıyor.",
    badgeLabel: "Oyun",
    picks: [
      {
        slug: "expressvpn",
        bestFor: "En düşük gecikme + premium istikrar",
        why: "Lightway protokolünün hızlı bağlantı kurulumu ve düşük gecikmesi, gerçek zamanlı oyunlarda en az dezavantaj sağlıyor. 105 ülkede sunucu — istediğin oyun bölgesine genelde yakın bir sunucu bulabiliyorsun.",
      },
      {
        slug: "nordvpn",
        bestFor: "Geniş sunucu + güçlü throughput",
        why: "NordLynx protokolü ile yüksek bant genişliği — Steam indirme veya büyük güncellemeler için hız kaybı minimum. Meshnet özelliği ise arkadaşlarınla özel şifreli ağ kurmana izin veriyor (LAN parti tarzı).",
      },
      {
        slug: "pia",
        bestFor: "Port forwarding + ileri konfigürasyon",
        why: "Port forwarding, host olduğun multiplayer oyunlar için (Minecraft, ARK vb.) kritik özellik. PIA bu özelliği hâlâ sunan az sayıdaki üst seviye VPN'den biri.",
      },
    ],
    considerations: [
      {
        title: "Gecikme (latency / ping)",
        body: "VPN, trafiği ek bir sunucudan geçirir — bu doğal olarak gecikme ekler. Yakın bir VPN sunucusu seçmek bu eki minimuma indirir. 50 ms üzeri ek gecikme, rekabetçi FPS oyunlarda hissedilir.",
      },
      {
        title: "DDoS koruması",
        body: "Twitch yayıncıları veya rekabetçi oyuncular DDoS saldırılarına maruz kalabilir. VPN, gerçek IP'ni gizleyerek bu saldırılara karşı bir koruma sağlar — saldırı VPN sunucusuna yönlenir, VPN sağlayıcısı bunu filtreler.",
      },
      {
        title: "Bölgesel oyun sunucusu erişimi",
        body: "Bazı oyunların ASYA, NA-East, EU-West gibi bölgesel sunucuları var. VPN ile farklı bir bölgeye bağlanarak o bölgenin sunucularına erişebilirsin (matchmaking veya geographic arbitrage).",
      },
      {
        title: "Oyun mağazalarında bölge fiyatlandırması",
        body: "Steam, PlayStation Store, Microsoft Store gibi mağazalarda bazı oyunlar farklı bölgelerde daha ucuz olabilir. VPN ile farklı bölge mağazasına erişmek bazen mümkün ama platformların kullanım koşullarına aykırı olabilir.",
      },
    ],
    faqs: [
      {
        q: "VPN oyun performansını düşürür mü?",
        a: "Modern bir VPN ile %5-15 hız kaybı normaldir. Yakın sunucu seçtiğinde gecikme artışı 10-30 ms civarında kalır — çoğu oyunda hissedilmez. ExpressVPN'in Lightway ve NordVPN'in NordLynx protokolleri bu açıdan en iyi performansı sergiliyor.",
      },
      {
        q: "Hangi protokolü kullanmalıyım?",
        a: "WireGuard veya WireGuard tabanlı protokoller (NordLynx) düşük gecikme için en iyisi. OpenVPN daha eski ve daha yavaş; günümüzde tercih edilmez.",
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
      "Three things matter when picking a VPN for gaming: low latency (a nearby server + a modern protocol), DDoS protection (hiding your real IP) and access to regional game servers. ExpressVPN leads on latency, NordVPN on raw speed, PIA on port forwarding.",
    badgeLabel: "Gaming",
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Lowest latency + premium stability",
        why: "Lightway's fast connection setup and low latency keep the penalty in real-time games to a minimum. Servers in 105 countries — you can usually find one close to the game region you want.",
      },
      {
        slug: "nordvpn",
        bestFor: "Big network + strong throughput",
        why: "NordLynx delivers high bandwidth — minimal speed loss for Steam downloads or large updates. Meshnet lets you build an encrypted private network with friends (LAN-party style).",
      },
      {
        slug: "pia",
        bestFor: "Port forwarding + advanced config",
        why: "Port forwarding matters when you host multiplayer (Minecraft, ARK, etc.). PIA is one of the few top-tier VPNs that still supports it.",
      },
    ],
    considerations: [
      {
        title: "Latency / ping",
        body: "A VPN routes traffic through one extra server — naturally adding some latency. Picking a nearby VPN server keeps that overhead minimal. Above ~50 ms of added latency you'll feel it in competitive FPS games.",
      },
      {
        title: "DDoS protection",
        body: "Twitch streamers and competitive players sometimes get DDoS'd. A VPN hides your real IP, redirecting any attack to the VPN server, where the provider can filter it.",
      },
      {
        title: "Regional game-server access",
        body: "Some games have regional servers (ASIA, NA-East, EU-West). With a VPN you can connect to a different region and reach those servers (matchmaking or geographic arbitrage).",
      },
      {
        title: "Regional pricing on game stores",
        body: "On Steam, PlayStation Store and Microsoft Store, certain games are cheaper in different regions. A VPN can sometimes get you into another store region, but it may violate the platform's terms of use.",
      },
    ],
    faqs: [
      {
        q: "Does a VPN hurt gaming performance?",
        a: "With a modern VPN, 5-15% speed loss is normal. Pick a nearby server and added latency stays in the 10-30 ms range — unnoticeable in most games. ExpressVPN's Lightway and NordVPN's NordLynx lead on this.",
      },
      {
        q: "Which protocol should I use?",
        a: "WireGuard or WireGuard-based protocols (NordLynx) are best for low latency. OpenVPN is older and slower; not preferred today.",
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
