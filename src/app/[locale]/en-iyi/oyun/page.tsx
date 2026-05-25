import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Gamepad2 } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";

export const metadata: Metadata = {
  title: "Oyun İçin En İyi VPN'ler (2026)",
  description:
    "Düşük gecikme, DDoS koruması, bölgesel oyun sunucusu erişimi ve geographic price arbitrage için en iyi VPN seçimleri.",
};

type Props = { params: Promise<{ locale: string }> };

const picks = [
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
] as const;

const considerations = [
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
];

const faqs = [
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
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <UseCasePage
      slug="oyun"
      title="Oyun İçin En İyi VPN&apos;ler"
      tagline="Düşük gecikme, DDoS koruması ve bölgesel sunucu erişimi — oyuncular için en iyi seçimler."
      summary="Oyun için VPN seçerken üç şey kritik: düşük gecikme (yakın sunucu + modern protokol), DDoS koruması (gerçek IP gizleme) ve bölgesel oyun sunucusu erişimi. ExpressVPN gecikme, NordVPN hız, PIA port forwarding ile öne çıkıyor."
      Icon={Gamepad2}
      badgeLabel="Oyun"
      picks={picks}
      faqs={faqs}
      considerations={considerations}
      relatedLinks={[
        { label: "Streaming için", href: "/en-iyi/streaming" },
        { label: "Gizlilik için", href: "/en-iyi/gizlilik" },
        { label: "PIA incelemesi", href: "/inceleme/pia" },
      ]}
    />
  );
}
