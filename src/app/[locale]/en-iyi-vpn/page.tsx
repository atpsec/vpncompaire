import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/seo";
import { rankedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "2026'nın En İyi 10 VPN'i — Karşılaştırma ve Sıralama",
  description:
    "Bağımsız denetim, gerçek hız testi ve şeffaf fiyat analizi ile 2026'nın en iyi VPN'leri. Genel en iyi, en uygun bütçe, premium ve gizlilik seçimleri.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={itemListSchema(rankedProducts())} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "En İyi VPN'ler", path: "/en-iyi-vpn" },
        ])}
      />

      <Container className="pt-12 sm:pt-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-brand-700">
            Ana sayfa › En İyi VPN&apos;ler
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            2026&apos;nın En İyi 10 VPN&apos;i
          </h1>
          <p className="mt-5 text-lg text-ink-muted">
            On VPN&apos;i altı kritere göre tek tek test ettik. İşte sonuçlar
            — bağımsız denetim kanıtı, gerçek hız ölçümleri ve fiyat
            şeffaflığı dahil.
          </p>
        </header>
      </Container>

      <TopVPNList />
    </>
  );
}
