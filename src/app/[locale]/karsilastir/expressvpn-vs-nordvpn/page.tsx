import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getProduct } from "@/data/products";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { contentAlternates, type Locale } from "@/lib/site";
import { FactualComparison } from "@/components/comparison/factual-comparison";

const CONTENT_ID = "expressvpn-vs-nordvpn";
type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: { title: "ExpressVPN vs NordVPN: Özellik, Gizlilik ve Fiyat Karşılaştırması", description: "ExpressVPN ve NordVPN'i editoryal puan vermeden; fiyat, yargı yetkisi, bağımsız denetimler, cihaz desteği ve sağlayıcı bilgileri üzerinden karşılaştırın." },
  en: { title: "ExpressVPN vs NordVPN: Features, Privacy and Pricing Comparison", description: "Compare ExpressVPN and NordVPN without editorial scores, using pricing, jurisdiction, independent audits, device support and verifiable provider information." },
  de: { title: "ExpressVPN vs NordVPN: Funktionen, Datenschutz und Preise", description: "ExpressVPN und NordVPN ohne redaktionelle Punktzahlen anhand von Preisen, Rechtsraum, unabhängigen Audits, Geräteunterstützung und überprüfbaren Anbieterinformationen vergleichen." },
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
  const left = getProduct("expressvpn", productLocale)!;
  const right = getProduct("nordvpn", productLocale)!;
  const t = copy[locale];
  const alternates = contentAlternates(CONTENT_ID, locale);
  return <><JsonLd data={breadcrumbSchema([{ name: locale === "tr" ? "Ana sayfa" : locale === "de" ? "Startseite" : "Home", path: "/" }, { name: t.title, path: alternates.canonical }], locale)} /><FactualComparison locale={locale} title={t.title} description={t.description} left={left} right={right} /></>;
}

