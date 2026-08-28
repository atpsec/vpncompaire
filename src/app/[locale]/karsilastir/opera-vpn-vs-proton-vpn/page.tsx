import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getComparisonProduct } from "@/data/comparison-products";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { contentAlternates, type Locale } from "@/lib/site";
import { FactualComparison } from "@/components/comparison/factual-comparison";

const CONTENT_ID = "opera-vpn-vs-proton-vpn";
type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: {
    title: "Opera VPN vs Proton VPN: Kapsam, Gizlilik ve Fiyat Karşılaştırması",
    description: "Opera'nın tarayıcıya entegre VPN özelliğini Proton VPN ile kapsam, gizlilik belgeleri, denetimler, cihaz desteği ve fiyat bilgileri üzerinden karşılaştırın.",
  },
  en: {
    title: "Opera VPN vs Proton VPN: Browser Scope, Privacy and Pricing Comparison",
    description: "Compare Opera's built-in browser VPN with Proton VPN using scope, privacy documentation, audits, device coverage and pricing information.",
  },
  de: {
    title: "Opera VPN vs Proton VPN: Browserumfang, Datenschutz und Preise",
    description: "Vergleichen Sie Operas integriertes Browser-VPN mit Proton VPN anhand von Umfang, Datenschutzdokumentation, Audits, Geräteabdeckung und Preisinformationen.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = copy[locale];
  const alternates = contentAlternates(CONTENT_ID, locale);
  return {
    title: t.title,
    description: t.description,
    alternates,
    openGraph: { title: t.title, description: t.description, url: alternates.canonical, type: "article" },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  setRequestLocale(locale);
  const left = getComparisonProduct("opera-vpn", locale)!;
  const right = getComparisonProduct("proton-vpn", locale)!;
  const t = copy[locale];
  const alternates = contentAlternates(CONTENT_ID, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: locale === "tr" ? "Ana sayfa" : locale === "de" ? "Startseite" : "Home", path: "/" },
            { name: t.title, path: alternates.canonical },
          ],
          locale,
        )}
      />
      <FactualComparison locale={locale} title={t.title} description={t.description} left={left} right={right} />
    </>
  );
}
