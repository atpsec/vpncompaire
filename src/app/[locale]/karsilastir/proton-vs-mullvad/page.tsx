import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ComparisonPage } from "@/components/comparison/comparison-page";

export const metadata: Metadata = {
  title: "Proton VPN vs Mullvad Karşılaştırması (2026)",
  description:
    "Proton VPN ve Mullvad'ı 6 kritere göre karşılaştırdık: gizlilik felsefesi, denetimler, fiyat ve kullanım modeli. Gizlilik puristleri için.",
};

type Props = { params: Promise<{ locale: string }> };

const categories = [
  {
    name: "Gizlilik felsefesi",
    winner: "b" as const,
    aDetail: "Hesap için e-posta gerekli; ücretsiz plan mevcut",
    bDetail: "Anonim hesap — sadece rastgele numara; e-posta bile gerekmez",
    reasoning:
      "Mullvad'ın anonim hesap modeli, sektörde benzersiz. Proton VPN'in gizlilik kaydı da sağlam ama Mullvad'ın 'minimum bilgi' felsefesi daha radikal.",
  },
  {
    name: "Yargı yetkisi",
    winner: "a" as const,
    aDetail: "İsviçre — AB ve ABD ittifakları dışı, federal gizlilik yasaları",
    bDetail: "İsveç — AB üyesi, 14 Eyes ittifakının çevresel üyesi",
    reasoning:
      "İsviçre, yargı yetkisi olarak Mullvad'ın İsveç merkezinden daha güçlü. Mullvad bu durumu 'saklamadığın veriyi paylaşamazsın' yaklaşımıyla telafi ediyor — yine de jurisdiction açısından Proton avantajlı.",
  },
  {
    name: "Bağımsız denetimler",
    winner: "tie" as const,
    aDetail: "Yıllık Securitum no-logs denetimi + düzenli güvenlik denetimleri",
    bDetail: "Assured AB tekrarlanan güvenlik ve no-logs denetimleri (2018-2024)",
    reasoning:
      "Her ikisi de düzenli ve şeffaf denetim raporları yayınlıyor. Proton VPN yıllık, Mullvad biraz daha sık aralıklarla. İkisi de açık kaynak istemciler sunduğu için kod düzeyinde de denetlenebilir.",
  },
  {
    name: "Streaming uyumluluğu",
    winner: "a" as const,
    aDetail: "Plus planda Netflix US/UK/JP, Disney+, BBC iPlayer, BluTV",
    bDetail: "Streaming için optimize değil — çoğu platform engelliyor",
    reasoning:
      "Proton VPN Plus planı sağlam streaming bypass'ı sunuyor. Mullvad kasıtlı olarak streaming odaklı değil — gizlilik aracı olarak konumlanıyor. Streaming önemliyse Proton VPN açık tercih.",
  },
  {
    name: "Fiyatlandırma modeli",
    winner: "tie" as const,
    aDetail: "Ücretsiz plan + Plus $4.49/ay (2 yıl) + yenileme tuzağı var",
    bDetail: "Sabit €5/ay — indirim yok, yenileme tuzağı yok, promosyon yok",
    reasoning:
      "Proton VPN ücretsiz plan ve uzun dönem indirim sunuyor — ama yenileme dönemine girince fiyat yükseliyor. Mullvad sabit ve şeffaf fiyatlandırma — ama uzun dönem indirim yok. Hangisi avantajlı olduğu kullanım süresine bağlı.",
  },
  {
    name: "Ekosistem entegrasyonu",
    winner: "a" as const,
    aDetail: "ProtonMail, Proton Drive, Calendar, Pass — birleşik gizlilik ekosistemi",
    bDetail: "Yalnızca VPN — diğer Mullvad ürünleri yok",
    reasoning:
      "Proton AG, gizlilik odaklı bir ürün ailesi sunuyor (e-posta, depolama, parola, takvim). Hepsi tek hesapla ve aynı gizlilik felsefesiyle çalışıyor. Mullvad sadeliği seçti — yalnızca VPN.",
  },
] as const;

const whyA = {
  title: "Proton VPN'i seç eğer...",
  reasons: [
    "Streaming bypass'ı (BluTV, Netflix vb.) önemli",
    "ProtonMail, Proton Drive kullanıyorsan (ekosistem entegrasyonu)",
    "Uzun dönem indirimli fiyat avantajını kullanmak istiyorsan",
    "İsviçre yargı yetkisi senin için belirleyici",
    "Ücretsiz plan ile başlamak istiyorsan",
  ],
} as const;

const whyB = {
  title: "Mullvad'ı seç eğer...",
  reasons: [
    "Anonim hesap modeli (e-posta bile vermek istemiyorsan) çekiciyse",
    "Affiliate ekosisteminden bağımsız bir seçenek arıyorsan",
    "Pazarlama tuzaklarından (indirim, yenileme, promosyon) uzak durmak istiyorsan",
    "Maksimum sadelik — sadece VPN, başka bir şey yok",
    "Streaming için VPN aramıyorsan",
  ],
} as const;

const faqs = [
  {
    q: "Hangisi daha gizlilik dostu?",
    a: "İkisi de sektörün en gizlilik dostu seçimleri. Mullvad'ın anonim hesap modeli (e-posta bile gerekmez) daha radikal; Proton VPN'in İsviçre yargı yetkisi ve ekosistem entegrasyonu daha kapsamlı. Hangisinin daha 'iyi' olduğu, gizlilik tanımına göre değişir.",
  },
  {
    q: "Streaming için hangisi?",
    a: "Açıkça Proton VPN. Mullvad streaming için optimize değil — bu kasıtlı bir tasarım kararı.",
  },
  {
    q: "İkisi de açık kaynak mı?",
    a: "Evet. Hem Proton VPN hem Mullvad tüm istemcilerini açık kaynak olarak yayınlıyor (GitHub'da). Bağımsız güvenlik araştırmacıları kodu inceleyebilir.",
  },
  {
    q: "Hangisi daha pahalı?",
    a: "Aylık bazda Mullvad sabit €5; Proton VPN ilk dönemde $4.49 ama yenileme dönemine yükselir. 2-3 yıllık kullanım toplamında Proton VPN daha pahalı olabilir; ancak kullandığın özellikler (ekosistem, streaming) farklı.",
  },
];

const relatedLinks = [
  { label: "Gizlilik için en iyi VPN", href: "/en-iyi/gizlilik" },
  { label: "Proton VPN incelemesi", href: "/inceleme/proton-vpn" },
  { label: "Mullvad incelemesi", href: "/inceleme/mullvad" },
  { label: "Tüm karşılaştırmalar", href: "/karsilastir" },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ComparisonPage
      slug="proton-vs-mullvad"
      productSlugA="proton-vpn"
      productSlugB="mullvad"
      tagline="İki gizlilik öncülü — açık kaynak, denetimli ve felsefe olarak gizliliğe adanmış. Hangisi sana uygun?"
      categories={categories}
      whyA={whyA}
      whyB={whyB}
      faqs={faqs}
      relatedLinks={relatedLinks}
    />
  );
}
