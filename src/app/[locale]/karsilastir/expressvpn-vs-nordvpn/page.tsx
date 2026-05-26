import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ComparisonPage } from "@/components/comparison/comparison-page";

export const metadata: Metadata = {
  title: "ExpressVPN vs NordVPN Karşılaştırması (2026)",
  description:
    "ExpressVPN ve NordVPN'i 6 kritere göre karşılaştırdık: hız, denetimler, streaming, fiyat ve daha fazlası. İki premium devin yan yana analizi.",
};

type Props = { params: Promise<{ locale: string }> };

const categories = [
  {
    name: "Gizlilik ve yargı yetkisi",
    winner: "a" as const,
    aDetail: "İngiliz Virjin Adaları — 14 Eyes dışı, mahkemede kanıtlanmış no-logs (2017 Türkiye olayı)",
    bDetail: "Panama — 14 Eyes dışı, zorunlu veri saklama yok",
    reasoning:
      "İkisi de güçlü yargı yetkilerinde. ExpressVPN'in 2017'de Türk yetkililerinin sunucu el koymasına rağmen kayıt ifşa edememesi, gerçek dünyada kanıtlanmış no-logs için sektördeki en güçlü örneklerden biri.",
  },
  {
    name: "Bağımsız denetimler",
    winner: "b" as const,
    aDetail: "KPMG + Cure53 + PWC denetimleri",
    bDetail: "Deloitte no-logs (6 defa, son: 2025) + Cure53 istemci denetimleri (3x)",
    reasoning:
      "NordVPN'in tekrarlanan altı kez Deloitte denetimi, sektörün ulaşabildiği en kapsamlı no-logs ispat serisi. ExpressVPN'in audit portföyü de güçlü ama sıklık açısından NordVPN önde.",
  },
  {
    name: "Hız performansı",
    winner: "tie" as const,
    aDetail: "Lightway protokolü — %90-95 yakın, %75-82 uzak; en hızlı bağlantı kurulumu",
    bDetail: "NordLynx (WireGuard) — %91-96 yakın, %72-80 uzak; en yüksek throughput",
    reasoning:
      "Lightway hızlı bağlantı kurulumunda, NordLynx ham throughput'ta önde. Pratikte fark günlük kullanımda hissedilmiyor. İkisi de sektörün üst dilimi.",
  },
  {
    name: "Streaming uyumluluğu",
    winner: "tie" as const,
    aDetail: "Netflix US/UK/JP/TR/BR/DE, Disney+, BBC iPlayer, BluTV, Exxen — sektörün en stabili",
    bDetail: "Netflix US/UK/JP/TR, Disney+, BBC iPlayer, BluTV, Exxen — stabil",
    reasoning:
      "ExpressVPN'in MediaStreamer DNS özelliği akıllı TV/konsolda VPN olmadan bölge bypass'ı sunuyor — önemli bir nüans. NordVPN bunu sunmuyor ama IP havuzu daha geniş.",
  },
  {
    name: "Fiyat (uzun dönem)",
    winner: "b" as const,
    aDetail: "12 aylık + 3 ay ücretsiz: etkin ~$4.99/ay",
    bDetail: "2 yıllık plan: ~$3.39/ay",
    reasoning:
      "NordVPN, ExpressVPN'den %30-40 daha ucuz uzun dönem planlarında. ExpressVPN'in premium fiyatı, sunduğu ekstra özelliklerle (MediaStreamer, Lightway, müşteri desteği) gerekçelendiriliyor.",
  },
  {
    name: "Sahiplik şeffaflığı",
    winner: "b" as const,
    aDetail: "Kape Technologies (PIA, CyberGhost ile aynı ana şirket)",
    bDetail: "Nord Security (Surfshark ile aynı ana şirket)",
    reasoning:
      "Her iki sahiplik yapısı da bazı eleştirmenlerce çıkar çatışması olarak değerlendiriliyor. NordVPN/Surfshark birleşmesi (Mart 2022) daha yeni; Kape'nin VPN sektöründeki yoğunlaşması (4+ büyük VPN) daha geniş. Hangisinin daha rahatsız ettiği kişisel değerlendirme.",
  },
] as const;

const whyA = {
  title: "ExpressVPN'i seç eğer...",
  reasons: [
    "Premium fiyat kabul edilebilir; sürtünmesiz deneyim önemli",
    "Akıllı TV / konsol kullanıyorsun (MediaStreamer DNS için)",
    "Lightway protokolünün hızlı bağlantı kurulumunu istiyorsun",
    "2017 Türkiye olayı gibi gerçek dünya no-logs kanıtı senin için belirleyici",
    "Sürekli sık ülke değiştiriyorsan (seyahat)",
  ],
} as const;

const whyB = {
  title: "NordVPN'i seç eğer...",
  reasons: [
    "Bütçe önemli — NordVPN %30-40 daha ucuz",
    "Düzenli/tekrarlanan denetimler kritik (6x Deloitte)",
    "Threat Protection, Meshnet, Onion over VPN gibi ek özellikler değerli",
    "10 cihaz limiti yeterli",
    "Maksimum throughput (büyük dosya indirme, 4K streaming)",
  ],
} as const;

const faqs = [
  {
    q: "ExpressVPN mi NordVPN mi daha iyi?",
    a: "Bütçe önemliyse ve denetim sürekliliği kritikse NordVPN. Premium deneyim, akıllı TV/konsol kullanımı veya kanıtlanmış no-logs senin için belirleyiciyse ExpressVPN. İkisi de sektörün üst dilimi.",
  },
  {
    q: "İki VPN'in hızı arasında ne kadar fark var?",
    a: "Gerçek dünya kullanımında çok küçük (%2-5 throughput farkı). ExpressVPN'in Lightway protokolü daha hızlı bağlantı kurar; NordVPN'in NordLynx'i daha yüksek pik throughput verir. Çoğu kullanıcı farkı hissetmez.",
  },
  {
    q: "İkisi de Türkiye'de çalışıyor mu?",
    a: "Evet, ikisi de Türkiye'den erişilebilir ve obfuscation özelliklerine sahip. Hiçbiri Türkiye sunucusu sunmuyor — Türkiye sunucusu için Surfshark.",
  },
  {
    q: "Kape Technologies vs Nord Security sahipliği — hangisi daha rahatsız edici?",
    a: "Kape, 2019'da PIA'yı, sonra CyberGhost'u, ExpressVPN'i ve birçok VPN inceleme sitesini satın aldı — yoğunlaşma daha geniş. Nord Security ise NordVPN + Surfshark'tan oluşuyor. Hangisinin daha endişe verici olduğu kişisel değerlendirme; tekniksel olarak ikisi de operasyonel bağımsızlığı koruduğunu söylüyor.",
  },
];

const relatedLinks = [
  { label: "NordVPN vs Surfshark", href: "/karsilastir/nordvpn-vs-surfshark" },
  { label: "ExpressVPN incelemesi", href: "/inceleme/expressvpn" },
  { label: "NordVPN incelemesi", href: "/inceleme/nordvpn" },
  { label: "En iyi VPN 2026", href: "/en-iyi-vpn" },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ComparisonPage
      slug="expressvpn-vs-nordvpn"
      locale={locale}
      productSlugA="expressvpn"
      productSlugB="nordvpn"
      tagline="İki premium devin yan yana karşılaştırması — sürtünmesiz deneyim ile altı kez denetlenmiş istikrarın karşılaşması."
      categories={categories}
      whyA={whyA}
      whyB={whyB}
      faqs={faqs}
      relatedLinks={relatedLinks}
    />
  );
}
