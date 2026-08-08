import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/seo";
import { topRankedProducts } from "@/data/products";
import { absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  tr: {
    title: "VPN Sağlayıcı Rehberi 2026 — Özellik, Denetim ve Fiyat Karşılaştırması",
    description: "VPN sağlayıcılarını puan vermeden; gizlilik politikası, bağımsız denetim, cihaz desteği, yargı yetkisi ve fiyat bilgileriyle karşılaştırın.",
    breadcrumb: "VPN Rehberi",
    h1: "VPN sağlayıcılarını doğrulanabilir bilgilerle karşılaştırın",
    intro: "Bu sayfa bir kalite sıralaması değildir. Sağlayıcıları aynı bilgi alanlarıyla yan yana getirir; fiyat, denetim ve teknik özelliklerin güncel durumunu resmi kaynaklardan doğrulamanızı öneririz.",
    home: "Ana sayfa",
  },
  en: {
    title: "VPN Provider Guide 2026 — Features, Audits and Pricing",
    description: "Compare VPN providers without invented ratings: privacy policy, independent audits, device support, jurisdiction and pricing information.",
    breadcrumb: "VPN Guide",
    h1: "Compare VPN providers with verifiable information",
    intro: "This page is not a quality ranking. Providers are presented with the same information fields; verify current pricing, audits and technical terms at the official source.",
    home: "Home",
  },
  de: {
    title: "VPN-Anbieter-Ratgeber 2026 — Funktionen, Audits und Preise",
    description: "VPN-Anbieter ohne erfundene Bewertungen vergleichen: Datenschutz, unabhängige Audits, Geräteunterstützung, Zuständigkeit und Preise.",
    breadcrumb: "VPN-Ratgeber",
    h1: "VPN-Anbieter mit überprüfbaren Informationen vergleichen",
    intro: "Diese Seite ist keine Qualitätsrangliste. Anbieter werden anhand derselben Informationsfelder dargestellt; aktuelle Preise, Audits und technische Angaben sollten bei der offiziellen Quelle geprüft werden.",
    home: "Startseite",
  },
} as const;

function copyFor(locale: string) {
  return locale === "en" || locale === "de" ? COPY[locale] : COPY.tr;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = copyFor(locale);
  return {
    title: copy.title,
    description: copy.description,
    alternates: localizedAlternates("/en-iyi-vpn", locale),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl("/en-iyi-vpn", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const copy = copyFor(locale);
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={itemListSchema(topRankedProducts(locale), locale)} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: copy.home, path: "/" },
            { name: copy.breadcrumb, path: "/en-iyi-vpn" },
          ],
          locale,
        )}
      />

      <Container className="pt-12 sm:pt-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-brand-700">{copy.breadcrumb}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {copy.h1}
          </h1>
          <p className="mt-5 text-lg text-ink-muted">{copy.intro}</p>
        </header>
      </Container>

      <TopVPNList />
    </>
  );
}
