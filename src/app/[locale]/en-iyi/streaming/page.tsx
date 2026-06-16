import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Tv } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle: "Streaming İçin En İyi VPN'ler (2026)",
    metaDescription:
      "Netflix, Disney+, BBC iPlayer, HBO Max, BluTV ve Exxen için en istikrarlı VPN seçimleri ve bölgesel kütüphane erişim rehberi.",
    title: "Streaming İçin En İyi VPN'ler",
    tagline:
      "Netflix, Disney+, BBC iPlayer, BluTV, Exxen ve daha fazlası — istikrarlı erişim için en iyi seçimler.",
    summary:
      "Streaming için VPN seçerken üç şey kritik: IP havuzunun büyüklüğü (engellenmeye karşı dayanıklılık), istenen bölgelerde sunucu varlığı ve 4K-ready hız. NordVPN istikrar, ExpressVPN premium deneyim, Surfshark fiyat-performans ile öne çıkıyor.",
    badgeLabel: "Streaming",
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Genel en istikrarlı streaming",
        why: "Geniş IP havuzu ve hızlı sunucu rotasyonu sayesinde Netflix (US/UK/JP/TR), Disney+, BBC iPlayer, BluTV ve Exxen'de tutarlı erişim. Streaming için \"optimize sunucu\" konsepti olmasa da, IP çeşitliliği avantajı sağlıyor.",
      },
      {
        slug: "expressvpn",
        bestFor: "Premium kullanıcı + akıllı TV / konsol",
        why: "Lightway protokolünün hızlı bağlantı kurulumu ve sektörün en az engellenen IP havuzlarından biri. MediaStreamer DNS, VPN desteklemeyen cihazlarda (akıllı TV, konsol) bölge bypass'ı yapıyor.",
      },
      {
        slug: "surfshark",
        bestFor: "Bütçe + Türkiye sunucusu",
        why: "Aktif Türkiye sunucusu — yurt dışından BluTV/Exxen erişimi için en doğal seçim. Sınırsız cihazla aile içi tüm ekranları korur. Premium streaming kalitesinin altında ama fiyat-performans liderliği yapıyor.",
      },
    ],
    considerations: [
      {
        title: "IP havuzunun büyüklüğü",
        body: "Streaming sağlayıcıları bilinen VPN IP'lerini engelliyor. Geniş ve sık güncellenen IP havuzu olan sağlayıcılar (NordVPN, ExpressVPN) bu engellemeye karşı daha dayanıklı.",
      },
      {
        title: "Bölgesel sunucu çeşitliliği",
        body: "Netflix US kütüphanesi için US sunucusu, BluTV için TR sunucusu gerekiyor. Sağlayıcının istediğin bölgelerde sunucu sunup sunmadığını kontrol et.",
      },
      {
        title: "VPN dışı cihaz çözümü",
        body: "Akıllı TV, oyun konsolu veya Apple TV gibi cihazlarda VPN uygulaması yüklenmez. ExpressVPN'in MediaStreamer DNS özelliği bu cihazlarda yalnızca DNS yönlendirmesi ile bölge bypass'ı sunar.",
      },
      {
        title: "Hız",
        body: "4K streaming için 25+ Mbps stabil bağlantı gerekir. Yakın bölge sunucularda çoğu üst-seviye VPN bu hızı sağlıyor; uzak mesafelerde (Türkiye → ABD batı) farklar açılıyor.",
      },
    ],
    faqs: [
      {
        q: "Netflix VPN'leri neden engelliyor?",
        a: "Netflix'in lisans anlaşmaları bölgesel bazlı. Kullanıcıların VPN ile bölge atlamasına karşı önlem almak, lisans yükümlülüklerinin bir gereği. Bu nedenle bilinen VPN IP'leri proaktif olarak engelleniyor.",
      },
      {
        q: "Engellenmiş bir sunucuya denk geldim, ne yapmalıyım?",
        a: "Aynı bölgede farklı bir sunucu seç. Üst seviye VPN'lerin geniş IP havuzu sayesinde 1-2 deneme ile çalışan bir sunucu bulursun. CyberGhost gibi 'streaming optimize' sunucu sunan sağlayıcılarda bu süreç daha hızlı.",
      },
      {
        q: "VPN streaming için yasal mı?",
        a: "Türkiye'de VPN kullanımı yasaldır. Streaming platformlarının kullanım koşulları bölgesel kısıtlamayı atlamayı yasaklayabilir — ancak bu sözleşme ihlalidir, yasal suç değildir.",
      },
      {
        q: "BluTV ve Exxen yurt dışından nasıl izlenir?",
        a: "Türkiye lokasyonlu sunucusu olan bir VPN (Surfshark TR sunucusu sunuyor) ile Türkiye'ye bağlanırsan, platform seni Türkiye'den bağlanıyor olarak görür ve içeriklere erişebilirsin.",
      },
    ],
    relatedLinks: [
      { label: "Yurt dışı Türkler için", href: "/en-iyi/yurt-disindaki-turkler" },
      { label: "Türkiye için", href: "/en-iyi/turkiye" },
      { label: "NordVPN vs Surfshark", href: "/karsilastir/nordvpn-vs-surfshark" },
    ],
  },
  en: {
    metaTitle: "The Best VPNs for Streaming (2026)",
    metaDescription:
      "The most reliable VPN picks for Netflix, Disney+, BBC iPlayer, HBO Max, BluTV and Exxen — plus a guide to regional library access.",
    title: "The Best VPNs for Streaming",
    tagline:
      "Netflix, Disney+, BBC iPlayer, BluTV, Exxen and more — the best picks for consistent access.",
    summary:
      "Three things matter when picking a VPN for streaming: the size of the IP pool (resilience against blocks), server coverage in the regions you want, and 4K-ready speed. NordVPN leads on stability, ExpressVPN on premium experience and Surfshark on price-performance.",
    badgeLabel: "Streaming",
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Most consistent streaming overall",
        why: "A large IP pool and fast server rotation keep Netflix (US/UK/JP/TR), Disney+, BBC iPlayer, BluTV and Exxen reliably accessible. Even without dedicated \"streaming-optimised\" servers, the IP diversity is the advantage.",
      },
      {
        slug: "expressvpn",
        bestFor: "Premium use + smart TVs / consoles",
        why: "Lightway brings fast connection setup, and the IP pool is among the least-blocked in the industry. MediaStreamer DNS provides region bypass on devices that can't run a VPN app (smart TVs, consoles).",
      },
      {
        slug: "surfshark",
        bestFor: "Budget + Turkish server",
        why: "An active Turkish server — the most natural pick for BluTV/Exxen from abroad. Unlimited devices covers every screen in the household. Below the premium streaming bar, but the price-performance leader.",
      },
    ],
    considerations: [
      {
        title: "Size of the IP pool",
        body: "Streaming services block known VPN IPs. Providers with a large, frequently rotated IP pool (NordVPN, ExpressVPN) hold up better against blocks.",
      },
      {
        title: "Regional server coverage",
        body: "You need US servers for the US Netflix catalogue, Turkish servers for BluTV. Check that the provider covers the regions you actually want.",
      },
      {
        title: "Non-VPN devices",
        body: "Smart TVs, game consoles and Apple TVs may not run a VPN app. ExpressVPN's MediaStreamer DNS provides region bypass on these devices via DNS routing only.",
      },
      {
        title: "Speed",
        body: "4K streaming needs a stable 25+ Mbps connection. Most top-tier VPNs deliver this on nearby servers; the gap widens on distant routes (e.g. Turkey → US West).",
      },
    ],
    faqs: [
      {
        q: "Why does Netflix block VPNs?",
        a: "Netflix's licensing deals are region-specific. Preventing users from hopping regions via VPN is part of those licensing obligations. So known VPN IPs are proactively blocked.",
      },
      {
        q: "I hit a blocked server, what should I do?",
        a: "Pick a different server in the same region. With top-tier VPNs' large IP pools, a working server is usually 1-2 tries away. Providers offering 'streaming-optimised' servers (like CyberGhost) make the process quicker.",
      },
      {
        q: "Is streaming over a VPN legal?",
        a: "Using a VPN is legal in Türkiye. A streaming service's terms of use may prohibit region-hopping — but that's a contract issue, not a criminal offence.",
      },
      {
        q: "How do I watch BluTV and Exxen from abroad?",
        a: "Use a VPN with Turkish servers (Surfshark offers TR) to connect to Turkey, and the platform will treat you as connecting from Türkiye, giving you access to the catalogue.",
      },
    ],
    relatedLinks: [
      { label: "For Turks abroad", href: "/en-iyi/yurt-disindaki-turkler" },
      { label: "Best in Turkey", href: "/en-iyi/turkiye" },
      { label: "NordVPN vs Surfshark", href: "/karsilastir/nordvpn-vs-surfshark" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "en" ? "en" : "tr"];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates("/en-iyi/streaming", locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl("/en-iyi/streaming", locale),
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
      slug="streaming"
      title={c.title}
      tagline={c.tagline}
      summary={c.summary}
      Icon={Tv}
      badgeLabel={c.badgeLabel}
      picks={c.picks}
      faqs={c.faqs}
      considerations={[...c.considerations]}
      relatedLinks={[...c.relatedLinks]}
    />
  );
}
