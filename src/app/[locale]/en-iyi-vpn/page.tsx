import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { ReferenceVPNDirectory } from "@/components/provider/reference-vpn-directory";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/seo";
import { topRankedProducts } from "@/data/products";
import { featuredReferenceProducts } from "@/data/products-reference-localized";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const EVALUATED_PROFILE_COUNT = topRankedProducts("tr").filter(
  (product) => product.slug !== "atlas-vpn",
).length;
const REFERENCE_RECORD_COUNT = featuredReferenceProducts.length;
const GLOBAL_CORE_COUNT = EVALUATED_PROFILE_COUNT + REFERENCE_RECORD_COUNT;
const copy = {
  tr: {
    title: `Global Core ${GLOBAL_CORE_COUNT} VPN Sağlayıcı Rehberi (2026)`,
    description: `${GLOBAL_CORE_COUNT} görünür VPN sağlayıcısını; ${EVALUATED_PROFILE_COUNT} ayrıntılı kaynak profili ve ${REFERENCE_RECORD_COUNT} seçilmiş pazar referansı olarak inceleyin.`,
    breadcrumb: "VPN sağlayıcı bilgi rehberi",
    h1: `Global Core ${GLOBAL_CORE_COUNT} VPN sağlayıcı bilgi rehberi`,
    intro: `Bu sayfa bir 'en iyi VPN' laboratuvar sıralaması değildir. Görünür katalog, büyük karşılaştırma ve araştırma kaynaklarında tekrar eden pazar görünürlüğüne göre seçilmiştir: ${EVALUATED_PROFILE_COUNT} sağlayıcı kaynakları ayrı ayrı değerlendirilmiş ayrıntılı profillerdir; ${REFERENCE_RECORD_COUNT} sağlayıcı ise seçilmiş pazar referansıdır.`,
    home: "Ana sayfa",
    here: "VPN karşılaştırmaları",
  },
  en: {
    title: `Global Core ${GLOBAL_CORE_COUNT} VPN Provider Guide (2026)`,
    description: `Review ${GLOBAL_CORE_COUNT} visible VPN providers: ${EVALUATED_PROFILE_COUNT} detailed source-reviewed profiles and ${REFERENCE_RECORD_COUNT} selected market references.`,
    breadcrumb: "VPN provider information guide",
    h1: `Global Core ${GLOBAL_CORE_COUNT} VPN provider information guide`,
    intro: `This is not a laboratory ranking of the 'best VPN'. The visible catalog is selected through repeated market visibility across major comparison and research sources: ${EVALUATED_PROFILE_COUNT} providers have detailed source-reviewed profiles, while ${REFERENCE_RECORD_COUNT} are selected market references.`,
    home: "Home",
    here: "VPN comparisons",
  },
  de: {
    title: `Global Core ${GLOBAL_CORE_COUNT} VPN-Anbieterleitfaden (2026)`,
    description: `${GLOBAL_CORE_COUNT} sichtbare VPN-Anbieter prüfen: ${EVALUATED_PROFILE_COUNT} ausführliche quellengeprüfte Profile und ${REFERENCE_RECORD_COUNT} ausgewählte Marktreferenzen.`,
    breadcrumb: "VPN-Anbieter-Informationsratgeber",
    h1: `Global Core ${GLOBAL_CORE_COUNT} VPN-Anbieter-Informationsratgeber`,
    intro: `Dies ist keine Labor-Rangliste des 'besten VPN'. Das sichtbare Verzeichnis wurde anhand wiederholter Marktpräsenz in großen Vergleichs- und Forschungsquellen ausgewählt: ${EVALUATED_PROFILE_COUNT} Anbieter haben ausführliche quellengeprüfte Profile, ${REFERENCE_RECORD_COUNT} sind ausgewählte Marktreferenzen.`,
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
    alternates: localizedAlternates("/vpn-reviews", locale),
    openGraph: { title: t.title, description: t.description, url: absoluteUrl("/vpn-reviews", locale), type: "website" },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  setRequestLocale(locale);
  const t = copy[locale];
  const evaluatedProfiles = topRankedProducts(locale).filter((p) => p.slug !== "atlas-vpn");

  return (
    <>
      <JsonLd data={itemListSchema(evaluatedProfiles, locale)} />
      <JsonLd data={breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.here, path: "/vpn-reviews" }], locale)} />
      <Container className="pt-12 sm:pt-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-brand-700">{t.breadcrumb}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{t.h1}</h1>
          <p className="mt-5 text-lg text-ink-muted">{t.intro}</p>
        </header>
        <DataDisclaimer />
      </Container>
      <TopVPNList />
      <ReferenceVPNDirectory />
    </>
  );
}
