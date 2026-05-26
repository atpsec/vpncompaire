import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/seo";
import { rankedProducts } from "@/data/products";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";

export const metadata: Metadata = {
  title: "2026'da En İyi 10 VPN — Karşılaştırma ve Editör Sıralaması",
  description:
    "Bağımsız denetim raporları, kendi hız testlerimiz ve fiyat şeffaflığı kriterleri ile 2026 için editör sıralamamız. Sıralama bilgi amaçlıdır; kullanıcı kendi önceliklerine göre değerlendirmelidir.",
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
            2026&apos;da En İyi 10 VPN — Editör Sıralaması
          </h1>
          <p className="mt-5 text-lg text-ink-muted">
            On VPN&apos;i altı kritere göre değerlendirdik. Aşağıdaki sıralama
            bağımsız denetim raporları, hız testlerimiz ve fiyat şeffaflığına
            dayalı editör değerlendirmesidir. Kullanıcılar kendi önceliklerine
            göre değerlendirme yapmalıdır.
          </p>
        </header>
        <DataDisclaimer />
      </Container>

      <TopVPNList />
    </>
  );
}
