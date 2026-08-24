import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { ReferenceVPNDirectory } from "@/components/provider/reference-vpn-directory";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/seo";
import { topRankedProducts } from "@/data/products";
import { referenceProducts } from "@/data/products-reference-localized";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const EVALUATED_PROFILE_COUNT = topRankedProducts("tr").filter(
  (product) => product.slug !== "atlas-vpn",
).length;
const REFERENCE_RECORD_COUNT = referenceProducts.length;
const copy = {
  tr: {
    title: `VPN Sağlayıcı Rehberi (2026): ${EVALUATED_PROFILE_COUNT} Ayrıntılı Profil + ${REFERENCE_RECORD_COUNT} Referans`,
    description: `${EVALUATED_PROFILE_COUNT} kaynakları değerlendirilmiş, indekslenebilir VPN profili ile ${REFERENCE_RECORD_COUNT} referans kaydını ayrı kapsamlarla araştırın.`,
    breadcrumb: "VPN sağlayıcı bilgi rehberi",
    h1: `VPN sağlayıcı bilgi rehberi: ${EVALUATED_PROFILE_COUNT} ayrıntılı profil, ${REFERENCE_RECORD_COUNT} referans`,
    intro: `Bu sayfa bir 'en iyi VPN' laboratuvar sıralaması değildir. İlk ${EVALUATED_PROFILE_COUNT} sağlayıcı kaynakları ayrı ayrı değerlendirilmiş ve arama dizinine dahil edilen ayrıntılı profillerdir. Diğer ${REFERENCE_RECORD_COUNT} kayıt yalnızca pazar referansıdır; ayrıntılı öneri veya indekslenebilir profil değildir.`,
    home: "Ana sayfa",
    here: "VPN karşılaştırmaları",
  },
  en: {
    title: `VPN Provider Guide (2026): ${EVALUATED_PROFILE_COUNT} Detailed Profiles + ${REFERENCE_RECORD_COUNT} References`,
    description: `Research ${EVALUATED_PROFILE_COUNT} source-reviewed, indexable VPN profiles separately from ${REFERENCE_RECORD_COUNT} reference-only market records.`,
    breadcrumb: "VPN provider information guide",
    h1: `VPN provider information guide: ${EVALUATED_PROFILE_COUNT} detailed profiles and ${REFERENCE_RECORD_COUNT} references`,
    intro: `This is not a laboratory ranking of the 'best VPN'. The first ${EVALUATED_PROFILE_COUNT} providers are source-reviewed profiles included in the search index. The other ${REFERENCE_RECORD_COUNT} entries are market references only, not detailed recommendations or indexable profiles.`,
    home: "Home",
    here: "VPN comparisons",
  },
  de: {
    title: `VPN-Anbieterleitfaden (2026): ${EVALUATED_PROFILE_COUNT} Profile + ${REFERENCE_RECORD_COUNT} Referenzen`,
    description: `${EVALUATED_PROFILE_COUNT} quellengeprüfte, indexierbare VPN-Profile getrennt von ${REFERENCE_RECORD_COUNT} reinen Referenzeinträgen recherchieren.`,
    breadcrumb: "VPN-Anbieter-Informationsratgeber",
    h1: `VPN-Anbieter-Informationsratgeber: ${EVALUATED_PROFILE_COUNT} Profile und ${REFERENCE_RECORD_COUNT} Referenzen`,
    intro: `Dies ist keine Labor-Rangliste des 'besten VPN'. Die ersten ${EVALUATED_PROFILE_COUNT} Anbieter sind quellengeprüfte Profile im Suchindex. Die weiteren ${REFERENCE_RECORD_COUNT} Einträge dienen nur als Marktreferenz und sind weder ausführliche Empfehlungen noch indexierbare Profile.`,
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
