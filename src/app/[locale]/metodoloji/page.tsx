import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  ShieldCheck,
  FileSearch,
  Gauge,
  Tv,
  Tag,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Test Metodolojimiz",
  description:
    "vpncompaire, her VPN'i altı objektif kritere göre değerlendirir: gizlilik, bağımsız denetimler, hız, streaming uyumluluğu, fiyat şeffaflığı ve kullanım kolaylığı.",
};

type Props = { params: Promise<{ locale: string }> };

const criteria = [
  {
    Icon: ShieldCheck,
    title: "Gizlilik politikası ve yargı yetkisi",
    body: "VPN sağlayıcının kayıt politikasını, ana ofisinin hangi ülkede olduğunu (5/9/14 Eyes ittifakları, veri saklama yasaları) ve hukuki taleplere nasıl yanıt verdiğini değerlendiriyoruz. Yargı yetkisi, no-logs (kayıt tutmama) iddialarının ne kadar güçlü bir korumayla desteklendiğini belirler.",
  },
  {
    Icon: FileSearch,
    title: "Bağımsız denetimler",
    body: "Üçüncü taraf denetim (Deloitte, KPMG, Cure53, Securitum, Assured AB vb.) raporlarının varlığı, tekrarlanma sıklığı ve kapsamı bu kriterin ağırlığını belirler. Mahkemede kanıtlanmış no-logs (örn. PIA) en yüksek puanı alır.",
  },
  {
    Icon: Gauge,
    title: "Hız",
    body: "Aynı baz hat üzerinden farklı sunucu mesafelerinde (yakın, orta, uzak) gerçek hız testleri yapıyoruz. WireGuard ve özel protokoller (Lightway, NordLynx) ayrı ayrı değerlendirilir. Pik saat performansı da kontrol edilir.",
  },
  {
    Icon: Tv,
    title: "Streaming uyumluluğu",
    body: "Netflix US/UK/TR, Disney+, BBC iPlayer, BluTV, Exxen gibi platformlarda farklı sunucularla erişim testleri. Sürekli engellenen sağlayıcılar düşük puan alır.",
  },
  {
    Icon: Tag,
    title: "Fiyat şeffaflığı",
    body: "Yenileme fiyatı (renewal price) ile ilk satın alma fiyatı arasındaki fark, gizli ek ücretler, gerçek para iade politikası ve uzun dönem planlardaki gerçek aylık maliyet incelenir.",
  },
  {
    Icon: Sparkles,
    title: "Kullanım kolaylığı",
    body: "Uygulama arayüzü, ilk kurulum süresi, sunucu seçimi kolaylığı, otomatik bağlantı kuralları ve müşteri desteği erişilebilirliği (canlı sohbet, yanıt süresi) değerlendirilir.",
  },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container size="md" className="py-16 sm:py-24">
      <header>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          <ShieldCheck className="size-3.5" /> Şeffaf metodoloji
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Test Metodolojimiz
        </h1>
        <p className="mt-6 text-lg text-ink-muted leading-relaxed">
          Sitedeki her VPN aynı altı objektif kritere göre değerlendirilir.
          Affiliate komisyonu, sıralamayı veya puanlamayı etkilemez. Aşağıda
          her kriterin nasıl ölçüldüğünü açıklıyoruz — şeffaflık, güvenin
          ön koşuludur.
        </p>
      </header>

      <ol className="mt-12 space-y-8">
        {criteria.map(({ Icon, title, body }, i) => (
          <li key={title} className="grid grid-cols-[auto_1fr] gap-5">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                <Icon className="size-5" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-ink-strong">
                {i + 1}. {title}
              </h2>
              <p className="mt-2 text-ink leading-relaxed">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6">
        <h2 className="text-xl font-semibold text-ink-strong">
          Editoryal bağımsızlık
        </h2>
        <p className="mt-3 text-ink leading-relaxed">
          Affiliate gelirini şeffaf biçimde açıklarız (bkz.{" "}
          <a href="/reklam-aciklamasi" className="text-brand-700 underline">
            Reklam Açıklaması
          </a>
          ). Affiliate programı bulunmayan VPN sağlayıcıları da sıralamamıza
          dahil edilir; bu, tarafsızlığımızın doğrudan göstergesidir.
        </p>
      </section>
    </Container>
  );
}
