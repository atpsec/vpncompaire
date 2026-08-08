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

const copy = {
  tr: {
    title: "50 VPN Sağlayıcı Karşılaştırması 2026 — Gizlilik, Özellikler ve Kaynaklar",
    description: "50 aktif VPN sağlayıcı profilini puan yerine doğrulanabilir özelliklerle araştırın: gizlilik politikası, bağımsız denetim, protokoller, cihaz desteği, ağ bilgisi ve resmi kaynaklar.",
    breadcrumb: "VPN karşılaştırma rehberi",
    h1: "50 aktif VPN sağlayıcısını özelliklerine göre araştırın",
    intro: "Bu sayfa bir 'en iyi VPN' laboratuvar sıralaması değildir. 50 aktif sağlayıcıyı aynı bilgi mimarisinde göstererek ihtiyaçlarınıza uygun seçenekleri kaynaklar üzerinden araştırmanızı kolaylaştırır.",
    home: "Ana sayfa",
    here: "VPN karşılaştırmaları",
  },
  en: {
    title: "50 Active VPN Provider Comparison 2026 — Privacy, Features and Sources",
    description: "Research 50 active VPN provider profiles using verifiable information instead of editorial scores: privacy policies, audits, protocols, device support, network data and primary sources.",
    breadcrumb: "VPN comparison guide",
    h1: "Research 50 active VPN providers by verifiable features",
    intro: "This is not a laboratory ranking of the 'best VPN'. It places 50 active providers in a consistent information architecture so you can research options using source-based evidence.",
    home: "Home",
    here: "VPN comparisons",
  },
  de: {
    title: "50 aktive VPN-Anbieter im Vergleich 2026 — Datenschutz, Funktionen und Quellen",
    description: "50 aktive VPN-Anbieterprofile anhand überprüfbarer Informationen statt Punktzahlen recherchieren: Datenschutz, Audits, Protokolle, Geräte, Netzwerkdaten und Primärquellen.",
    breadcrumb: "VPN-Vergleichsratgeber",
    h1: "50 aktive VPN-Anbieter anhand überprüfbarer Merkmale recherchieren",
    intro: "Dies ist keine Labor-Rangliste des 'besten VPN'. 50 aktive Anbieter werden in einer einheitlichen Informationsstruktur dargestellt, damit Sie Optionen anhand von Quellen recherchieren können.",
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
  const activeCore = topRankedProducts(locale).filter((p) => p.slug !== "atlas-vpn");
  const catalogForSchema = [...activeCore, ...referenceProducts];

  return (
    <>
      <JsonLd data={itemListSchema(catalogForSchema, locale)} />
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
      <ReferenceVPNDirectory />
    </>
  );
}
