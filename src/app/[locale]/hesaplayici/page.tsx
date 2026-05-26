import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Calculator } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { CostCalculator } from "@/components/calc/cost-calculator";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "VPN Toplam Maliyet Hesaplayıcı (2026) — Yenileme Dahil Gerçek Fiyat",
  description:
    "1, 2 veya 3 yıl için 10 VPN'in toplam maliyetini karşılaştır. İlk dönem indirimi + yenileme fiyatı dahil. Etkin aylık fiyat ve tasarruf hesabı.",
  alternates: { canonical: absoluteUrl("/hesaplayici") },
  openGraph: {
    title: "VPN Maliyet Hesaplayıcı",
    description: "Yenileme dahil gerçek 3 yıllık VPN maliyetini hesapla.",
    url: absoluteUrl("/hesaplayici"),
    type: "website",
  },
  keywords: [
    "vpn fiyat karşılaştırma",
    "vpn maliyet hesaplayıcı",
    "vpn yenileme fiyatı",
    "ucuz vpn",
    "uzun dönem vpn",
  ],
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Maliyet hesaplayıcı", path: "/hesaplayici" },
        ])}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Maliyet hesaplayıcı</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Calculator className="size-3" /> Araç
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN toplam maliyet hesaplayıcı
          </h1>
          <p className="mt-4 text-lg text-ink-muted max-w-3xl">
            Çoğu VPN ilk dönemde ucuz, yenilemede pahalı. Burada gerçek 1-2-3
            yıllık toplam maliyeti görürsün — &quot;etkin aylık&quot; fiyatla
            adil karşılaştırma yap.
          </p>
        </header>

        <CostCalculator />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>Hesaplama nasıl çalışıyor?</h2>
          <p>
            Her VPN için &quot;en iyi değer&quot; planı (genelde 2-3 yıllık)
            referans alınır. Plan süresi boyunca indirimli fiyat geçerli, plan
            bittikten sonra aylık plan fiyatına yenileme yapıldığı varsayılır.
            Bu, Trustpilot şikayetlerinin büyük çoğunluğunun nedeni —
            kullanıcılar &quot;ilk yıl $30 ödedim, ikinci yıl $120 kesildi&quot;
            diyor.
          </p>

          <h2>Yenileme tuzağından nasıl kaçınılır?</h2>
          <ol>
            <li>
              <strong>Otomatik yenilemeyi kapat</strong> — VPN hesabına gir,
              ödeme ayarlarından otomatik yenilemeyi devre dışı bırak.
            </li>
            <li>
              <strong>Süre bitmeden 1-2 hafta önce</strong> aynı sağlayıcı veya
              başka sağlayıcıdan yeni bir indirimli plan al.
            </li>
            <li>
              <strong>Mullvad istisnasına dikkat</strong> — Sabit €5/ay,
              indirim/yenileme tuzağı yok. Uzun dönemde tasarruf etmek yerine
              tutarlılık istiyorsan ideal.
            </li>
          </ol>

          <h2>Hangi süre en mantıklı?</h2>
          <ul>
            <li>
              <strong>1 yıl:</strong> Çoğu kullanıcı için ideal denge —
              indirim makul, taahhüt katlanılabilir.
            </li>
            <li>
              <strong>2-3 yıl:</strong> En düşük etkin aylık fiyat ama 3 yıl
              boyunca aynı sağlayıcıda kalma taahhüdü. VPN sektörü hızlı
              değişiyor — ucuz olsa bile risk.
            </li>
            <li>
              <strong>Aylık:</strong> Esneklik için ama 2-3x daha pahalı. Sadece
              kısa süreli ihtiyaç için.
            </li>
          </ul>
        </article>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">Diğer araçlar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/sana-uygun-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Quiz: Sana uygun VPN
            </Link>
            <Link
              href="/karsilastir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              İki VPN&apos;i karşılaştır
            </Link>
            <Link
              href="/sunucu-haritasi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Özellik filtresi
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
