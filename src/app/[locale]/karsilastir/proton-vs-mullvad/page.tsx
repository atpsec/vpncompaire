import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getProduct } from "@/data/products";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { contentAlternates, type Locale } from "@/lib/site";
import { FactualComparison } from "@/components/comparison/factual-comparison";

const CONTENT_ID = "proton-vs-mullvad";
type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: { title: "Proton VPN vs Mullvad: Gizlilik, Özellik ve Fiyat Karşılaştırması", description: "Proton VPN ve Mullvad'ı editoryal puan vermeden; gizlilik, fiyat, bağımsız denetimler, açık kaynak bilgisi, cihaz desteği ve yargı yetkisi üzerinden karşılaştırın." },
  en: { title: "Proton VPN vs Mullvad: Privacy, Features and Pricing Comparison", description: "Compare Proton VPN and Mullvad without editorial scores, using privacy, pricing, independent audits, open-source information, device support and jurisdiction." },
  de: { title: "Proton VPN vs Mullvad: Datenschutz, Funktionen und Preise", description: "Proton VPN und Mullvad ohne redaktionelle Punktzahlen anhand von Datenschutz, Preisen, unabhängigen Audits, Open-Source-Informationen, Geräteunterstützung und Rechtsraum vergleichen." },
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
  const left = getProduct("proton-vpn", productLocale)!;
  const right = getProduct("mullvad", productLocale)!;
  const t = copy[locale];
  const alternates = contentAlternates(CONTENT_ID, locale);
  return <><JsonLd data={breadcrumbSchema([{ name: locale === "tr" ? "Ana sayfa" : locale === "de" ? "Startseite" : "Home", path: "/" }, { name: t.title, path: alternates.canonical }], locale)} /><FactualComparison locale={locale} title={t.title} description={t.description} left={left} right={right} /></>;
}
