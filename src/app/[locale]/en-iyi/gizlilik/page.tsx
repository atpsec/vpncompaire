import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Lock } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";

export const metadata: Metadata = {
  title: "Gizlilik İçin En İyi VPN'ler (2026)",
  description:
    "Bağımsız denetim, açık kaynak istemciler ve gizlilik dostu yargı yetkisi ile gizlilik öncelikli kullanıcılar için en iyi VPN seçimleri.",
};

type Props = { params: Promise<{ locale: string }> };

const picks = [
  {
    slug: "proton-vpn",
    bestFor: "Açık kaynak ve İsviçre yargı yetkisi",
    why: "Tüm istemciler açık kaynak ve denetlenebilir; yıllık no-logs denetimi Securitum tarafından yapılır; İsviçre yasaları AB ve ABD istihbarat ittifaklarının dışında. Sınırsız ücretsiz plan da var — &quot;dener misin?&quot; testi için ideal.",
  },
  {
    slug: "mullvad",
    bestFor: "Anonim hesap, sabit fiyat, affiliate yok",
    why: "Hesap açarken e-posta bile gerekmiyor — sadece rastgele bir numara. Nakit ödeme kabul ediyor. Bu sitede affiliate olmayan tek seçim — tarafsızlık göstergesi.",
  },
  {
    slug: "nordvpn",
    bestFor: "Denetim sürekliliği (6x Deloitte)",
    why: "2018'den bu yana altı kez Deloitte tarafından no-logs denetiminden geçti. Tekrarlanan bağımsız denetim, sektörün ulaşabildiği en güçlü kanıt seviyesi.",
  },
] as const;

const considerations = [
  {
    title: "Yargı yetkisi (jurisdiction)",
    body: "VPN sağlayıcı hangi ülkenin yasalarına tabi? Beş/Dokuz/On Dört Göz ittifakları dışındaki yargı yetkileri (İsviçre, Panama, İsveç) genelde daha güçlü gizlilik koruması sağlar.",
  },
  {
    title: "Bağımsız denetim kanıtı",
    body: "No-logs iddiası tek başına bir pazarlama ifadesidir. Üçüncü taraf denetim (Deloitte, KPMG, Cure53, Securitum) veya mahkeme kanıtı (PIA 2016/2018), bu iddiayı objektif olarak doğrular.",
  },
  {
    title: "Açık kaynak istemciler",
    body: "Sağlayıcının uygulamasının kodu kamuya açık ise, bağımsız güvenlik araştırmacıları kodu inceleyebilir ve zafiyetleri raporlayabilir. Bu, &quot;arka kapı yok&quot; iddiasının teknik garantisi.",
  },
];

const faqs = [
  {
    q: "Hangi VPN en gizliliği koruyor?",
    a: "Proton VPN, açık kaynak istemciler + İsviçre yargı yetkisi + yıllık denetim kombinasyonuyla en güçlü gizlilik altyapısına sahip. Mullvad, anonim hesap modeli ile farklı bir gizlilik boyutu sunar.",
  },
  {
    q: "Bağımsız denetim ile mahkeme kararı arasında ne fark var?",
    a: "Denetim, sağlayıcının iddialarını üçüncü bir taraf bağımsız olarak inceler. Mahkeme kararı, no-logs iddiasının gerçek bir hukuki talep karşısında nasıl çalıştığını test eder. PIA'nın 2016 ve 2018 davalarında doğrulandığı gibi.",
  },
  {
    q: "Açık kaynak VPN'ler diğerlerinden daha güvenli mi?",
    a: "Açık kaynak, kodun bağımsız olarak denetlenebilir olması anlamına gelir — bu şeffaflık avantajıdır. Ancak kapalı kaynak bir VPN'in mutlaka güvensiz olduğu anlamına gelmez; o noktada denetim raporları kritik olur.",
  },
  {
    q: "Gizlilik için ücretsiz VPN kullanabilir miyim?",
    a: "Çoğu ücretsiz VPN, gelir modeli olarak veri satışı veya reklam enjeksiyonu kullanır — yani gizliliğe karşı. Proton VPN'in ücretsiz planı istisnadır: ücretli ile aynı no-logs politikası ve denetim çerçevesi altında çalışır.",
  },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <UseCasePage
      slug="gizlilik"
      title="Gizlilik İçin En İyi VPN&apos;ler"
      tagline="Açık kaynak, bağımsız denetim ve gizlilik dostu yargı yetkisi — gerçek gizlilik için aranan üç temel."
      summary="Gizlilik öncelikli olduğunda VPN seçimi yalnızca pazarlama vaatlerine bakmaktan ibaret değil. Üç kritik faktör: jurisdiction (yargı yetkisi), tekrarlanan bağımsız denetim ve açık kaynak istemciler. Bu üçünü en sağlam birleştiren seçimleri sıraladık."
      Icon={Lock}
      badgeLabel="Gizlilik"
      picks={picks}
      faqs={faqs}
      considerations={considerations}
      relatedLinks={[
        { label: "Streaming için", href: "/en-iyi/streaming" },
        { label: "Türkiye için", href: "/en-iyi/turkiye" },
        { label: "Mullvad incelemesi", href: "/inceleme/mullvad" },
      ]}
    />
  );
}
