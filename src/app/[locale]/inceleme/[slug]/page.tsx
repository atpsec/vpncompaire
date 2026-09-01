import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Check, AlertTriangle, ArrowRight, ExternalLink, FileSearch } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { PricingPlans } from "@/components/product/pricing-plans";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, providerProductSchema } from "@/lib/seo";
import { bilingualAlternates, absoluteUrl, type Locale } from "@/lib/site";
import { rawProducts, getProduct, type Product } from "@/data/products";
import { referenceProducts, getReferenceProduct } from "@/data/products-reference-localized";
import { providerEvidenceRecords, type EvidenceItem } from "@/data/provider-evidence";
import { getArchivedProduct } from "@/data/products-current";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate";
import { isDetailedProviderSlug } from "@/data/provider-catalog";

type Props = { params: Promise<{ locale: string; slug: string }> };

const labels = {
  tr: {
    profile: "VPN sağlayıcı profili",
    reference: "Pazar referansı",
    archived: "Hizmeti sonlandırılmış servis arşivi",
    metaSuffix: "özellikler, fiyat ve kaynak özeti",
    referenceMetaSuffix: "pazar referansı ve kaynak bağlantıları",
    intro: "Bu sayfa laboratuvar incelemesi veya kullanıcı yorumu değildir. Sağlayıcının yayınladığı bilgiler ve doğrulanabilir kaynaklar, karşılaştırmayı kolaylaştırmak için yapılandırılmıştır.",
    referenceIntro: "Bu kısa pazar referansı keşif ve kaynak bağlantısı için korunur. Tamamlanmış editoryal inceleme olarak sunulmaz; bir alana güvenmeden önce sağlayıcının güncel belgelerini kontrol edin.",
    home: "Ana sayfa",
    hub: "VPN karşılaştırmaları",
    price: "Başlangıç fiyatı",
    priceOfficial: "Resmi sitede kontrol et",
    jurisdiction: "Yargı yetkisi",
    refund: "İade süresi",
    days: "gün",
    pricing: "Fiyatlandırma",
    pricingIntro: "Görünen fiyatlar değişebilir; satın almadan önce resmi sayfada ilk dönem ve yenileme koşullarını kontrol edin.",
    official: "Resmi siteyi aç",
    strengths: "Belgelenen öne çıkan özellikler",
    considerations: "Dikkat edilmesi gereken noktalar",
    details: "Doğrulanabilir sağlayıcı bilgileri",
    audits: "Bağımsız denetim / doğrulama",
    servers: "Sunucu / ağ bilgisi",
    devices: "Cihaz desteği",
    openSource: "Açık kaynak bilgisi",
    yes: "Evet",
    no: "Hayır",
    compare: "Diğer VPN sağlayıcılarıyla karşılaştır",
    methodology: "Kaynak temelli metodolojimizi inceleyin",
    sources: "Gösterilen fiyatın birincil kaynağı",
    sourcesIntro: "Bu bağlantı, profilde gösterilen fiyatı kontrol etmek için kullanılan sağlayıcı sayfasıdır. Diğer iddialar metodolojide sağlayıcı beyanı veya bağımsız rapor olarak etiketlenir.",
    pricingSource: "Sağlayıcının fiyat sayfasını aç",
    evidenceTitle: "Kanıt kapsamı",
    evidencePricing: "Fiyat kaydı",
    evidenceAudit: "Denetim kaydı",
    evidenceFields: "Profil alanları",
    evidenceSourceChecked: "Kaynak ve tarih kayıtlı",
    evidenceSourceLinked: "Kaynak bağlantısı var",
    evidenceProviderReported: "Sağlayıcı beyanı",
    evidenceNeedsCheck: "Tarih veya kaynak kontrolü gerekli",
    evidenceLedger: "Kanıt defterinde ayrıntıyı gör",
  },
  en: {
    profile: "VPN provider profile",
    reference: "Market reference",
    archived: "Discontinued service archive",
    metaSuffix: "features, pricing and source record",
    referenceMetaSuffix: "market reference and source links",
    intro: "This page is not a laboratory review or a user testimonial. Provider-published information and verifiable sources are structured to make comparison easier.",
    referenceIntro: "This concise market reference is retained for discovery and source linking. It is not presented as a finished editorial review; verify the provider's current documentation before relying on any field.",
    home: "Home",
    hub: "VPN comparisons",
    price: "Starting price",
    priceOfficial: "Check official site",
    jurisdiction: "Jurisdiction",
    refund: "Refund period",
    days: "days",
    pricing: "Pricing",
    pricingIntro: "Prices can change; verify introductory and renewal terms on the official site before purchasing.",
    official: "Open official site",
    strengths: "Documented notable features",
    considerations: "Points to consider",
    details: "Verifiable provider information",
    audits: "Independent audit / verification",
    servers: "Server / network information",
    devices: "Device support",
    openSource: "Open-source information",
    yes: "Yes",
    no: "No",
    compare: "Compare with other VPN providers",
    methodology: "Read our source-based methodology",
    sources: "Primary source for displayed pricing",
    sourcesIntro: "This is the provider page used to check the price shown on this profile. Other claims are labeled as provider-published or independently reported in the methodology.",
    pricingSource: "Open the provider pricing page",
    evidenceTitle: "Evidence coverage",
    evidencePricing: "Pricing record",
    evidenceAudit: "Audit record",
    evidenceFields: "Profile fields",
    evidenceSourceChecked: "Source and date recorded",
    evidenceSourceLinked: "Source link available",
    evidenceProviderReported: "Provider-reported",
    evidenceNeedsCheck: "Date or source check needed",
    evidenceLedger: "See details in evidence ledger",
  },
  de: {
    profile: "VPN-Anbieterprofil",
    reference: "Marktreferenz",
    archived: "Archiv eines eingestellten Dienstes",
    metaSuffix: "Funktionen, Preise und Quellenübersicht",
    referenceMetaSuffix: "Marktreferenz und Quellenlinks",
    intro: "Diese Seite ist weder ein Labortest noch eine Nutzerbewertung. Anbieterangaben und überprüfbare Quellen werden strukturiert dargestellt, um Vergleiche zu erleichtern.",
    referenceIntro: "Diese kurze Marktreferenz bleibt für Entdeckung und Quellenverknüpfung bestehen. Sie ist kein fertiges redaktionelles Review; prüfen Sie die aktuelle Anbieterdokumentation, bevor Sie Angaben verwenden.",
    home: "Startseite",
    hub: "VPN-Vergleiche",
    price: "Preis ab",
    priceOfficial: "Auf offizieller Website prüfen",
    jurisdiction: "Rechtsraum",
    refund: "Erstattungsfrist",
    days: "Tage",
    pricing: "Preise",
    pricingIntro: "Preise können sich ändern; prüfen Sie Einführungs- und Verlängerungsbedingungen vor dem Kauf auf der offiziellen Website.",
    official: "Offizielle Website öffnen",
    strengths: "Dokumentierte Merkmale",
    considerations: "Zu beachtende Punkte",
    details: "Überprüfbare Anbieterinformationen",
    audits: "Unabhängiges Audit / Verifikation",
    servers: "Server- / Netzwerkinformationen",
    devices: "Geräteunterstützung",
    openSource: "Open-Source-Information",
    yes: "Ja",
    no: "Nein",
    compare: "Mit anderen VPN-Anbietern vergleichen",
    methodology: "Quellenbasierte Methodik lesen",
    sources: "Primärquelle für den angezeigten Preis",
    sourcesIntro: "Dies ist die Anbieter-Seite, auf der der angezeigte Preis geprüft wurde. Andere Angaben werden in der Methodik als Anbieterangaben oder unabhängige Berichte gekennzeichnet.",
    pricingSource: "Preisseite des Anbieters öffnen",
    evidenceTitle: "Evidenzabdeckung",
    evidencePricing: "Preisdatensatz",
    evidenceAudit: "Auditdatensatz",
    evidenceFields: "Profilfelder",
    evidenceSourceChecked: "Quelle und Datum erfasst",
    evidenceSourceLinked: "Quellenlink vorhanden",
    evidenceProviderReported: "Anbieterangabe",
    evidenceNeedsCheck: "Datums- oder Quellenprüfung erforderlich",
    evidenceLedger: "Details im Evidenzregister",
  },
} as const;

function resolveProduct(slug: string, locale: Locale): Product | undefined {
  return getArchivedProduct(slug) ?? getProduct(slug, locale === "tr" ? "tr" : "en") ?? getReferenceProduct(slug, locale);
}

export function generateStaticParams() {
  return [
    ...rawProducts.map((p) => ({ slug: p.slug })),
    ...referenceProducts.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const product = resolveProduct(slug, locale);
  if (!product) return {};
  const l = labels[locale];
  const isArchived = Boolean(getArchivedProduct(slug));
  const isReferenceOnly = referenceProducts.some((p) => p.slug === slug);
  const isDetailedProfile = isDetailedProviderSlug(slug);
  const canonical = absoluteUrl(`/reviews/${product.slug}`, "en");
  const title = `${product.brand} — ${isArchived ? l.archived : isDetailedProfile ? l.metaSuffix : l.referenceMetaSuffix}`;
  const description = isArchived
    ? `${product.brand} is retained as an archived provider record with source links and historical context.`
    : isDetailedProfile
      ? `Check ${product.brand}'s documented privacy, audits, jurisdiction, device support and current pricing in this source-based VPN profile.`
      : `${product.brand} market reference with official source links and a concise record of documented provider information.`;
  return {
    title,
    description,
    alternates: isArchived || isReferenceOnly
      ? { canonical }
      : bilingualAlternates(`/reviews/${product.slug}`, locale, "en"),
    robots:
      isArchived || isReferenceOnly || !isDetailedProfile || locale !== "en"
        ? { index: false, follow: true }
        : undefined,
    openGraph: {
      title,
      description: product.summary,
      url: canonical,
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  setRequestLocale(locale);
  const product = resolveProduct(slug, locale);
  if (!product) notFound();
  const isArchived = Boolean(getArchivedProduct(slug));
  const isReferenceOnly = referenceProducts.some((p) => p.slug === slug);
  const isDetailedProfile = isDetailedProviderSlug(slug);

  const providerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${product.brand} ${isArchived ? labels[locale].archived : isDetailedProfile ? labels[locale].profile : labels[locale].reference}`,
    description: product.summary,
    url: absoluteUrl(`/reviews/${product.slug}`, "en"),
    ...(isArchived
      ? {}
      : {
          about: {
            "@type": "SoftwareApplication",
            name: product.brand,
            applicationCategory: "SecurityApplication",
            operatingSystem: "Windows, macOS, Linux, iOS, Android",
          },
        }),
    isPartOf: { "@type": "WebSite", name: "VPN Advisor", url: absoluteUrl() },
  };

  return <ProviderView product={product} locale={locale} providerSchema={providerSchema} isArchived={isArchived} isReferenceOnly={isReferenceOnly} isDetailedProfile={isDetailedProfile} />;
}

function ProviderView({ product, locale, providerSchema, isArchived, isReferenceOnly, isDetailedProfile }: { product: Product; locale: Locale; providerSchema: Record<string, unknown>; isArchived: boolean; isReferenceOnly: boolean; isDetailedProfile: boolean }) {
  const t = labels[locale];
  const evidence = providerEvidenceRecords(locale).find((record) => record.slug === product.slug);
  const hasStructuredPricing = Boolean(product.pricingVerifiedAt) && product.priceFromUsd > 0 && product.plans.length > 0;
  const productSchema = !isArchived && !isReferenceOnly && isDetailedProfile && locale === "en" && hasStructuredPricing
    ? providerProductSchema(product, locale)
    : null;

  return (
    <>
      <JsonLd data={providerSchema} />
      {productSchema ? <JsonLd data={productSchema} /> : null}
      <JsonLd data={breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.hub, path: "/vpn-reviews" }, { name: product.brand, path: `/reviews/${product.slug}` }], isArchived ? "tr" : locale)} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">{t.home}</Link>{" "}›{" "}<Link href="/vpn-reviews" className="hover:text-ink">{t.hub}</Link>{" "}› <span className="text-ink-strong">{product.brand}</span></p>

        <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <VPNLogo slug={product.slug} size={72} className="sm:mt-2" />
          <div className="flex-1">
            <Badge variant="brand">{isArchived ? t.archived : t.profile}</Badge>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{product.brand}</h1>
            <p className="mt-4 text-lg text-ink-muted">{product.summary}</p>
          </div>
        </header>

        <Card className="mt-6 p-5 bg-brand-50/40">
          <div className="flex items-start gap-3"><FileSearch className="size-5 text-brand-700 mt-0.5 shrink-0" /><div><p className="text-sm text-ink leading-relaxed">{isDetailedProfile ? t.intro : t.referenceIntro}</p><Link href="/methodology" className="mt-2 inline-flex text-sm font-semibold text-brand-700 hover:underline">{t.methodology}</Link></div></div>
        </Card>

        {isArchived ? null : <DataDisclaimer verifiedAt={product.pricingVerifiedAt} />}

        {isArchived ? null : (
          <Card className="mt-4 border-border bg-surface-subtle/30 p-5">
            <h2 className="text-sm font-semibold text-ink-strong">{t.sources}</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t.sourcesIntro}</p>
            <a
              href={product.pricingUrl}
              target="_blank"
              rel="nofollow noopener"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
            >
              {t.pricingSource}
              <ExternalLink className="size-3.5" />
            </a>
          </Card>
        )}

        {isArchived || !evidence ? null : (
          <Card className="mt-4 border-brand-200 bg-brand-50/30 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-ink-strong">{t.evidenceTitle}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t.intro}</p>
              </div>
              <Link href={`/research/evidence-ledger#provider-${product.slug}`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline">
                {t.evidenceLedger} <ArrowRight className="size-4" />
              </Link>
            </div>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              <EvidenceStat label={t.evidencePricing} item={evidence.primarySource} t={t} />
              <EvidenceStat label={t.evidenceAudit} item={evidence.audit} t={t} />
              <EvidenceStat label={t.evidenceFields} item={evidence.profileFields} t={t} />
            </dl>
          </Card>
        )}

        {isArchived ? null : (
          <Card className="mt-8 p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <Stat label={t.price} value={hasStructuredPricing ? `${product.priceCurrency === "EUR" ? "€" : "$"}${product.priceFromUsd.toFixed(2)}` : t.priceOfficial} highlight />
              <Stat label={t.jurisdiction} value={product.highlights.jurisdiction ?? "—"} />
              <Stat label={t.refund} value={product.highlights.moneyBackDays ? `${product.highlights.moneyBackDays} ${t.days}` : "—"} />
            </dl>
            <div className="mt-6 border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-ink-strong">{t.pricing}</h2>
              <p className="mt-1 text-sm text-ink-muted">{t.pricingIntro}</p>
              <div className="mt-4 grid sm:grid-cols-[1fr_auto] gap-6">
                {hasStructuredPricing ? <PricingPlans plans={product.plans} verifiedAt={product.pricingVerifiedAt} currency={product.priceCurrency} /> : <div className="rounded-lg border border-border bg-surface-subtle/40 p-4 text-sm text-ink-muted">{t.priceOfficial}</div>}
                <div className="flex flex-col gap-2 sm:w-56"><Button asChild variant="primary"><ProviderLink href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "provider-profile" })} rel={providerOutboundRel(product.slug, product.hasAffiliate)} target="_blank" provider={product.slug} placement="provider-profile">{t.official}<ExternalLink className="size-4" /></ProviderLink></Button><AffiliateNotice /></div>
              </div>
            </div>
          </Card>
        )}

        <section className="mt-12 grid sm:grid-cols-2 gap-6">
          <Card className="p-6"><h2 className="text-lg font-semibold text-success-700 flex items-center gap-2"><Check className="size-5" /> {t.strengths}</h2><ul className="mt-3 space-y-2 text-sm text-ink">{product.pros.map((p, i) => <li key={i} className="flex items-start gap-2"><Check className="size-4 text-success-600 mt-0.5 shrink-0" /><span>{p}</span></li>)}</ul></Card>
          <Card className="p-6"><h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2"><AlertTriangle className="size-5 text-amber-600" /> {t.considerations}</h2><ul className="mt-3 space-y-2 text-sm text-ink">{product.cons.map((c, i) => <li key={i} className="flex items-start gap-2"><AlertTriangle className="size-4 text-amber-600 mt-0.5 shrink-0" /><span>{c}</span></li>)}</ul></Card>
        </section>

        <section className="mt-12"><h2 className="text-2xl font-bold tracking-tight text-ink-strong">{t.details}</h2><dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface-base">
          {product.highlights.audits && <Row label={t.audits} value={product.highlights.audits} />}
          {product.highlights.servers && <Row label={t.servers} value={product.highlights.servers} />}
          {product.highlights.devices && <Row label={t.devices} value={product.highlights.devices} />}
          {product.highlights.jurisdiction && <Row label={t.jurisdiction} value={product.highlights.jurisdiction} />}
          {product.highlights.openSource !== undefined && <Row label={t.openSource} value={product.highlights.openSource ? t.yes : t.no} />}
        </dl></section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center"><Link href="/vpn-reviews" className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:underline">{t.compare} <ArrowRight className="size-4" /></Link></section>
      </Container>
    </>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div><dt className="text-xs text-ink-subtle">{label}</dt><dd className={"mt-0.5 font-semibold " + (highlight ? "text-2xl text-brand-700" : "text-ink-strong")}>{value}</dd></div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-2 px-4 py-3 text-sm"><dt className="text-ink-muted">{label}</dt><dd className="text-ink-strong font-medium">{value}</dd></div>;
}

function EvidenceStat({ label, item, t }: { label: string; item: EvidenceItem; t: (typeof labels)[Locale] }) {
  const status = item.state === "source-checked"
    ? `${t.evidenceSourceChecked}${item.checkedAt ? ` · ${item.checkedAt}` : ""}`
    : item.state === "source-linked"
      ? t.evidenceSourceLinked
      : item.state === "provider-reported"
        ? t.evidenceProviderReported
        : t.evidenceNeedsCheck;

  return (
    <div className="rounded-lg border border-border bg-surface-base p-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-ink-strong">{status}</dd>
    </div>
  );
}
