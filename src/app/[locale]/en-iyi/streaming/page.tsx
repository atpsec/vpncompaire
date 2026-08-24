import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Tv } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle: "Streaming İçin VPN Bilgi Rehberi (2026)",
    metaDescription:
      "Streaming için VPN seçerken sunucu konumu, cihaz desteği, hız ve değişebilen platform politikalarını kaynaklarla karşılaştırın.",
    title: "Streaming için VPN bilgi rehberi",
    tagline:
      "Sunucu konumu, cihaz desteği ve sağlayıcı belgelerini karşılaştırın; sürekli platform erişimi garanti edilemez.",
    summary:
      "Streaming için VPN seçerken kullanılacak bölgelerde sunucu varlığını, cihaz uygulamalarını, Smart DNS kapsamını ve kendi bağlantınızdaki performansı değerlendirin. Platformların VPN politikaları değişebildiği için sağlayıcı beyanı, gelecekteki erişim garantisi değildir.",
    badgeLabel: "Streaming",
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Geniş sunucu ve destek dokümantasyonu arayanlar",
        why: "Sağlayıcı; sunucu ağı, SmartPlay ve çeşitli streaming kullanım senaryoları hakkında destek belgeleri yayımlar. Belirli bir platformun güncel uyumluluğunu kendi hesabınız ve ağınızda doğrulayın.",
      },
      {
        slug: "expressvpn",
        bestFor: "Premium kullanıcı + akıllı TV / konsol",
        why: "Sağlayıcı Lightway, cihaz uygulamaları ve MediaStreamer DNS hakkında resmi belgeler yayımlar. MediaStreamer tam VPN şifrelemesi sağlamaz; hizmet ve cihaz uyumluluğu değişebilir.",
      },
      {
        slug: "surfshark",
        bestFor: "Bütçe + Türkiye sunucusu",
        why: "Sağlayıcı ülke sunucuları ve çoklu cihaz politikası yayımlar. Türkiye konumunun ve kullandığınız platform desteğinin güncel envanterde bulunduğunu resmi sayfadan kontrol edin.",
      },
    ],
    considerations: [
      {
        title: "IP havuzunun büyüklüğü",
        body: "Streaming hizmetleri bilinen VPN çıkışlarını sınırlayabilir. Sağlayıcının ağ açıklamalarını kontrol edin; ham sunucu veya IP sayısı tek başına erişim garantisi değildir.",
      },
      {
        title: "Bölgesel sunucu çeşitliliği",
        body: "İhtiyaç duyduğunuz ülke konumlarının güncel sunucu listesinde bulunup bulunmadığını kontrol edin. Konum bulunması, platformun o IP'yi kabul edeceği anlamına gelmez.",
      },
      {
        title: "VPN dışı cihaz çözümü",
        body: "Uygulama desteği cihaz ve işletim sistemi sürümüne göre değişir. Smart DNS yalnız DNS yönlendirmesi yapar; VPN tüneli gibi trafiği şifrelemez veya genel IP'yi gizlemez.",
      },
      {
        title: "Hız",
        body: "Kullandığınız platformun yayımladığı bant genişliği önerisini kontrol edin ve VPN açıkken yeterli pay bırakın. Sonuç rota, ISP, cihaz, protokol ve sunucu yüküne göre değişir.",
      },
    ],
    faqs: [
      {
        q: "Netflix VPN'leri neden engelliyor?",
        a: "Netflix'in lisans anlaşmaları bölgesel bazlı. Kullanıcıların VPN ile bölge atlamasına karşı önlem almak, lisans yükümlülüklerinin bir gereği. Bu nedenle bilinen VPN IP'leri proaktif olarak engelleniyor.",
      },
      {
        q: "Engellenmiş bir sunucuya denk geldim, ne yapmalıyım?",
        a: "Sağlayıcının güncel destek sayfasını kontrol et, aynı bölgede önerilen farklı bir sunucuyu dene ve gerekirse destek ekibine sor. Bir gün çalışan sunucu gelecekte aynı sonucu garanti etmez.",
      },
      {
        q: "VPN streaming için yasal mı?",
        a: "VPN ve bölgesel erişim kuralları yargı alanına göre değişebilir; ayrıca platformun kullanım koşulları ayrı kısıtlamalar içerebilir. Güncel yerel kuralları ve hizmet şartlarını kontrol et; bu sayfa hukuki tavsiye değildir.",
      },
      {
        q: "BluTV ve Exxen yurt dışından nasıl izlenir?",
        a: "Türkiye konumlu bir sunucu farklı bir çıkış IP'si sağlayabilir; ancak platformlar VPN IP'lerini engelleyebilir ve lisans koşulları değişebilir. Güncel sunucu, hesap ve hizmet şartlarını kontrol et; erişim garanti edilemez.",
      },
    ],
    relatedLinks: [
      { label: "Yurt dışı Türkler için", href: "/best-vpn/turks-abroad" },
      { label: "Türkiye için", href: "/best-vpn/turkey" },
      { label: "NordVPN vs Surfshark", href: "/comparison/nordvpn-vs-surfshark" },
    ],
  },
  en: {
    metaTitle: "VPN Information Guide for Streaming (2026)",
    metaDescription:
      "Compare server location, device support, performance and changing platform policies when evaluating a VPN for streaming.",
    title: "VPN information guide for streaming",
    tagline:
      "Compare server locations, device support and provider documentation; continuous platform access cannot be guaranteed.",
    summary:
      "When evaluating a VPN for streaming, consider servers in the regions you use, device apps, Smart DNS scope and performance on your own connection. Platform VPN policies change, so provider support claims are not a future-access guarantee.",
    badgeLabel: "Streaming",
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Users seeking broad server and support documentation",
        why: "The provider publishes documentation about its server network, SmartPlay and several streaming scenarios. Verify current compatibility for your platform, account and network.",
      },
      {
        slug: "expressvpn",
        bestFor: "Premium use + smart TVs / consoles",
        why: "The provider publishes documentation for Lightway, device apps and MediaStreamer DNS. MediaStreamer is not a full encrypted VPN tunnel, and service or device compatibility can change.",
      },
      {
        slug: "surfshark",
        bestFor: "Budget + Turkish server",
        why: "The provider publishes country-server and multi-device policies. Confirm that a Türkiye location and support for your platform remain in the current official documentation.",
      },
    ],
    considerations: [
      {
        title: "Size of the IP pool",
        body: "Streaming services can restrict known VPN exits. Review provider network documentation; a raw server or IP count alone does not guarantee access.",
      },
      {
        title: "Regional server coverage",
        body: "Check whether the countries you need appear in the current server inventory. A listed location does not mean a platform will accept every associated IP.",
      },
      {
        title: "Non-VPN devices",
        body: "App support varies by device and operating-system version. Smart DNS changes DNS routing only; it does not encrypt traffic or hide the public IP like a VPN tunnel.",
      },
      {
        title: "Speed",
        body: "Check your platform's published bandwidth recommendation and leave enough headroom with the VPN enabled. Results vary with route, ISP, device, protocol and server load.",
      },
    ],
    faqs: [
      {
        q: "Why does Netflix block VPNs?",
        a: "Netflix's licensing deals are region-specific. Preventing users from hopping regions via VPN is part of those licensing obligations. So known VPN IPs are proactively blocked.",
      },
      {
        q: "I hit a blocked server, what should I do?",
        a: "Check the provider's current support page, try another recommended server in the same region and contact support if needed. A server that works today may not produce the same result later.",
      },
      {
        q: "Is streaming over a VPN legal?",
        a: "VPN and regional-access rules vary by jurisdiction, and platform terms may impose separate restrictions. Check current local rules and service terms; this page is not legal advice.",
      },
      {
        q: "How do I watch BluTV and Exxen from abroad?",
        a: "A Türkiye-located server may provide a different exit IP, but platforms can block VPN addresses and licensing terms can change. Check current server, account and service conditions; access is not guaranteed.",
      },
    ],
    relatedLinks: [
      { label: "For Turks abroad", href: "/best-vpn/turks-abroad" },
      { label: "Best in Turkey", href: "/best-vpn/turkey" },
      { label: "NordVPN vs Surfshark", href: "/comparison/nordvpn-vs-surfshark" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "tr" ? "tr" : "en"];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates("/best-vpn/streaming", locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl("/best-vpn/streaming", locale),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale === "tr" ? "tr" : "en"];

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
