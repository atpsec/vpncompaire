import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/seo";
import { topRankedProducts } from "@/data/products";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: {
    title: "VPN Karşılaştırması 2026 — Fiyat, Gizlilik, Denetim ve Özellikler",
    description: "VPN sağlayıcılarını puan yerine doğrulanabilir özelliklerle karşılaştırın: fiyat, gizlilik politikası, bağımsız denetim, protokoller, cihaz desteği ve yargı yetkisi.",
    breadcrumb: "VPN karşılaştırma rehberi",
    h1: "VPN sağlayıcılarını özelliklerine göre karşılaştırın",
    intro: "Bu sayfa bir 'en iyi VPN' laboratuvar sıralaması değildir. Sağlayıcıları aynı bilgi alanlarında yan yana göstererek ihtiyacınıza uygun seçeneği araştırmanızı kolaylaştırır.",
    home: "Ana sayfa",
    here: "VPN karşılaştırmaları",
  },
  en: {
    title: "VPN Comparison 2026 — Pricing, Privacy, Audits and Features",
    description: "Compare VPN providers using verifiable features instead of editorial scores: pricing, privacy policies, independent audits, protocols, device support and jurisdiction.",
    breadcrumb: "VPN comparison guide",
    h1: "Compare VPN providers by verifiable features",
    intro: "This is not a laboratory ranking of the 'best VPN'. Providers are shown side by side using consistent information fields so you can research the option that fits your needs.",
    home: "Home",
    here: "VPN comparisons",
  },
  de: {
    title: "VPN-Vergleich 2026 — Preise, Datenschutz, Audits und Funktionen",
    description: "VPN-Anbieter anhand überprüfbarer Merkmale statt redaktioneller Punktzahlen vergleichen: Preise, Datenschutz, unabhängige Audits, Protokolle, Geräte und Rechtsraum.",
    breadcrumb: "VPN-Vergleichsratgeber",
    h1: "VPN-Anbieter anhand überprüfbarer Merkmale vergleichen",
    intro: "Dies ist keine Labor-Rangliste des 'besten VPN'. Anbieter werden anhand einheitlicher Informationsfelder gegenübergestellt, damit Sie die passende Option recherchieren können.",
    home: "Startseite",
    here: "VPN-Vergleiche",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = copy[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: localizedAlternates("/en-iyi-vpn", locale),
    openGraph: { title: t.title, description: t.description, url: absoluteUrl("/en-iyi-vpn", locale), type: "website" },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  setRequestLocale(locale);
  const t = copy[locale];

  return (
    <>
      <JsonLd data={itemListSchema(topRankedProducts(locale), locale)} />
      <JsonLd data={breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.here, path: "/en-iyi-vpn" }], locale)} />
      <Container className="pt-12 sm:pt-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-brand-700">{t.breadcrumb}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{t.h1}</h1>
          <p className="mt-5 text-lg text-ink-muted">{t.intro}</p>
        </header>
        <DataDisclaimer />
      </Container>
      <TopVPNList />
    </>
  );
}
