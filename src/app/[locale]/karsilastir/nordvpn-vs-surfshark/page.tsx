import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getProduct } from "@/data/products";
import { contentAlternates, type Locale } from "@/lib/site";
import { FactualComparison } from "@/components/comparison/factual-comparison";

const CONTENT_ID = "nordvpn-vs-surfshark";
type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: { title: "NordVPN vs Surfshark: Özellik, Gizlilik ve Fiyat Karşılaştırması", description: "NordVPN ve Surfshark'ı editoryal puan vermeden; fiyat, yargı yetkisi, bağımsız denetimler, cihaz desteği ve sağlayıcı bilgileri üzerinden yan yana karşılaştırın." },
  en: { title: "NordVPN vs Surfshark: Features, Privacy and Pricing Comparison", description: "Compare NordVPN and Surfshark without editorial scores, using pricing, jurisdiction, independent audits, device support and verifiable provider information." },
  de: { title: "NordVPN vs Surfshark: Funktionen, Datenschutz und Preise", description: "NordVPN und Surfshark ohne redaktionelle Punktzahlen anhand von Preisen, Rechtsraum, unabhängigen Audits, Geräteunterstützung und überprüfbaren Anbieterinformationen vergleichen." },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = copy[locale];
  const alternates = contentAlternates(CONTENT_ID, locale);
  return { title: t.title, description: t.description, alternates, openGraph: { title: t.title, description: t.description, url: alternates.canonical, type: "article" } };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  setRequestLocale(locale);
  const productLocale = locale === "tr" ? "tr" : "en";
  const left = getProduct("nordvpn", productLocale)!;
  const right = getProduct("surfshark", productLocale)!;
  const t = copy[locale];
  return <FactualComparison locale={locale} title={t.title} description={t.description} left={left} right={right} />;
}
