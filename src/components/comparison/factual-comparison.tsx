import { ArrowRight, FileSearch, Check, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";
import { CitationSummary } from "@/components/seo/citation-summary";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/site";
import { formatProductPrice } from "@/lib/product-price";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate-public";
import { ComparisonLens } from "@/components/comparison/comparison-lens";

const labels = {
  tr: {
    badge: "Kaynak temelli karşılaştırma",
    note: "Bu karşılaştırma editoryal puan, kazanan veya laboratuvar testi ilan etmez. Kamuya açık ve doğrulanabilir sağlayıcı bilgilerini aynı alanlarda yan yana gösterir.",
    price: "Başlangıç fiyatı",
    jurisdiction: "Yargı yetkisi",
    audits: "Bağımsız denetim",
    servers: "Sunucu / ağ bilgisi",
    devices: "Cihaz desteği",
    openSource: "Açık kaynak",
    refund: "İade süresi",
    yes: "Evet",
    no: "Hayır",
    days: "gün",
    official: "Resmi site",
    profile: "Sağlayıcı profili",
    tableTitle: "Özellikleri yan yana karşılaştırın",
    strengths: "Belgelenen öne çıkan noktalar",
    considerations: "Dikkat edilmesi gerekenler",
    methodology: "Kaynakları ve sınırları inceleyin",
    lensTitle: "Karşılaştırma odağı",
    lensAll: "Tüm alanlar",
    lensPrivacy: "Gizlilik",
    lensValue: "Değer",
    lensSetup: "Kurulum ve cihazlar",
    checked: "Fiyat kontrol tarihi",
  },
  en: {
    badge: "Source-based comparison",
    note: "This comparison does not declare an editorial score, winner or laboratory result. It places public, verifiable provider information side by side using the same fields.",
    price: "Starting price", jurisdiction: "Jurisdiction", audits: "Independent audit", servers: "Server / network information", devices: "Device support", openSource: "Open source", refund: "Refund period", yes: "Yes", no: "No", days: "days", official: "Official site", profile: "Provider profile", tableTitle: "Compare features side by side", strengths: "Documented notable points", considerations: "Points to consider", methodology: "Read sources and limitations", lensTitle: "Comparison focus", lensAll: "All fields", lensPrivacy: "Privacy", lensValue: "Value", lensSetup: "Setup and devices", checked: "Price check date",
  },
  de: {
    badge: "Quellenbasierter Vergleich",
    note: "Dieser Vergleich erklärt keine redaktionelle Punktzahl, keinen Sieger und kein Laborergebnis. Öffentliche, überprüfbare Anbieterinformationen werden anhand derselben Felder gegenübergestellt.",
    price: "Preis ab", jurisdiction: "Rechtsraum", audits: "Unabhängiges Audit", servers: "Server- / Netzwerkinformation", devices: "Geräteunterstützung", openSource: "Open Source", refund: "Erstattungsfrist", yes: "Ja", no: "Nein", days: "Tage", official: "Offizielle Website", profile: "Anbieterprofil", tableTitle: "Funktionen direkt vergleichen", strengths: "Dokumentierte Merkmale", considerations: "Zu beachtende Punkte", methodology: "Quellen und Grenzen lesen", lensTitle: "Vergleichsfokus", lensAll: "Alle Felder", lensPrivacy: "Datenschutz", lensValue: "Preis-Leistung", lensSetup: "Setup und Geräte", checked: "Preis geprüft am",
  },
} as const;

type Props = {
  locale: Locale;
  title: string;
  description: string;
  left: Product;
  right: Product;
};

export function FactualComparison({ locale, title, description, left, right }: Props) {
  const t = labels[locale];
  const sourcePoint = (product: Product) => {
    const price = product.pricingVerifiedAt
      ? formatProductPrice(product.priceFromUsd, product.priceCurrency, locale)
      : t.official;
    const jurisdiction = product.highlights.jurisdiction ?? "—";
    const audit = product.highlights.audits ?? "—";
    if (locale === "tr") {
      return `${product.brand}: fiyat ${price}; yargı yetkisi ${jurisdiction}; denetim alanı ${audit}.`;
    }
    if (locale === "de") {
      return `${product.brand}: Preis ${price}; Rechtsraum ${jurisdiction}; Auditfeld ${audit}.`;
    }
    return `${product.brand}: price ${price}; jurisdiction ${jurisdiction}; audit field ${audit}.`;
  };
  const rows = [
    { key: "price", label: t.price, left: left.pricingVerifiedAt ? formatProductPrice(left.priceFromUsd, left.priceCurrency, locale) : t.official, right: right.pricingVerifiedAt ? formatProductPrice(right.priceFromUsd, right.priceCurrency, locale) : t.official },
    { key: "checked", label: t.checked, left: left.pricingVerifiedAt || "—", right: right.pricingVerifiedAt || "—" },
    { key: "jurisdiction", label: t.jurisdiction, left: left.highlights.jurisdiction ?? "—", right: right.highlights.jurisdiction ?? "—" },
    { key: "audits", label: t.audits, left: left.highlights.audits ?? "—", right: right.highlights.audits ?? "—" },
    { key: "servers", label: t.servers, left: left.highlights.servers ?? "—", right: right.highlights.servers ?? "—" },
    { key: "devices", label: t.devices, left: left.highlights.devices ?? "—", right: right.highlights.devices ?? "—" },
    { key: "openSource", label: t.openSource, left: left.highlights.openSource === undefined ? "—" : left.highlights.openSource ? t.yes : t.no, right: right.highlights.openSource === undefined ? "—" : right.highlights.openSource ? t.yes : t.no },
    { key: "refund", label: t.refund, left: left.highlights.moneyBackDays ? `${left.highlights.moneyBackDays} ${t.days}` : "—", right: right.highlights.moneyBackDays ? `${right.highlights.moneyBackDays} ${t.days}` : "—" },
  ];

  return (
    <Container size="lg" className="py-12 sm:py-16">
      <header>
        <Badge variant="brand">{t.badge}</Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{title}</h1>
        <p className="mt-4 text-lg text-ink-muted">{description}</p>
      </header>

      <CitationSummary
        title={
          locale === "tr"
            ? `${left.brand} ve ${right.brand} için kaynak özeti`
            : locale === "de"
              ? `Quellenübersicht für ${left.brand} und ${right.brand}`
              : `Source summary for ${left.brand} and ${right.brand}`
        }
        intro={
          locale === "tr"
            ? "Bu sayfa iki sağlayıcının kamuya açık belgelerini aynı alanlarda gösterir; tek başına güvenlik, hız veya kalite sonucu üretmez."
            : locale === "de"
              ? "Diese Seite stellt öffentliche Anbieterunterlagen anhand derselben Felder gegenüber; sie ist kein Sicherheits-, Geschwindigkeits- oder Qualitätstest."
              : "This page places public provider documentation side by side using the same fields; it is not a security, speed or quality test."
        }
        points={
          locale === "tr"
            ? [sourcePoint(left), sourcePoint(right), "Belirgin farklar belgelenen özellikler olarak okunmalıdır.", "Satın almadan önce resmi kaynaklardaki güncel şartlar kontrol edilmelidir."]
            : locale === "de"
              ? [sourcePoint(left), sourcePoint(right), "Unterschiede sind als dokumentierte Merkmale zu lesen.", "Vor dem Kauf sollten die aktuellen Bedingungen auf der offiziellen Seite geprüft werden."]
              : [sourcePoint(left), sourcePoint(right), "Differences should be read as documented fields.", "Check current official terms before purchasing."]
        }
      />

      <Card className="mt-6 p-5 bg-brand-50/40">
        <div className="flex items-start gap-3"><FileSearch className="size-5 text-brand-700 mt-0.5 shrink-0" /><div><p className="text-sm text-ink leading-relaxed">{t.note}</p><Link href="/methodology" className="mt-2 inline-flex text-sm font-semibold text-brand-700 hover:underline">{t.methodology}</Link></div></div>
      </Card>

      <DataDisclaimer verifiedAt={left.pricingVerifiedAt} />

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {[left, right].map((product) => (
          <Card key={product.slug} className="p-6">
            <div className="flex items-center gap-4"><VPNLogo slug={product.slug} size={56} /><div><h2 className="text-xl font-bold text-ink-strong">{product.brand}</h2><p className="text-sm text-ink-muted">{product.positioning}</p></div></div>
            <p className="mt-4 text-sm text-ink leading-relaxed">{product.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2"><Button asChild variant="primary"><ProviderLink href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "comparison-card" })} rel={providerOutboundRel(product.slug, product.hasAffiliate)} target="_blank" provider={product.slug} placement="comparison-card">{t.official}<ArrowRight className="size-4" /></ProviderLink></Button><Button asChild variant="ghost"><Link href={product.slug === "opera-vpn" ? "/blog/opera-vpn-browser-vpn-review" : `/reviews/${product.slug}`}>{product.slug === "opera-vpn" ? locale === "tr" ? "Opera VPN analizini oku" : locale === "de" ? "Opera-VPN-Analyse lesen" : "Read Opera VPN analysis" : t.profile}</Link></Button></div>
          </Card>
        ))}
      </div>
      <AffiliateNotice className="mt-4" variant="surface" />

      <section className="mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">{t.tableTitle}</h2>
        <ComparisonLens
          rows={rows}
          leftName={left.brand}
          rightName={right.brand}
          copy={{
            title: t.lensTitle,
            all: t.lensAll,
            privacy: t.lensPrivacy,
            value: t.lensValue,
            setup: t.lensSetup,
          }}
        />
      </section>

      <section className="mt-12 grid sm:grid-cols-2 gap-6">
        {[left, right].map((product) => <Card key={product.slug} className="p-6"><h2 className="text-lg font-semibold text-ink-strong">{product.brand}</h2><h3 className="mt-4 text-sm font-semibold text-success-700 flex items-center gap-2"><Check className="size-4" />{t.strengths}</h3><ul className="mt-2 space-y-2 text-sm text-ink">{product.pros.slice(0, 4).map((item) => <li key={item} className="flex items-start gap-2"><Check className="size-4 text-success-600 mt-0.5 shrink-0" />{item}</li>)}</ul><h3 className="mt-5 text-sm font-semibold text-ink-strong flex items-center gap-2"><AlertTriangle className="size-4 text-amber-600" />{t.considerations}</h3><ul className="mt-2 space-y-2 text-sm text-ink">{product.cons.slice(0, 4).map((item) => <li key={item} className="flex items-start gap-2"><AlertTriangle className="size-4 text-amber-600 mt-0.5 shrink-0" />{item}</li>)}</ul></Card>)}
      </section>
    </Container>
  );
}
