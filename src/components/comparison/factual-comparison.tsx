import { ArrowRight, FileSearch, Check, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/site";
import { formatProductPrice } from "@/lib/product-price";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate";

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
    methodology: "Metodolojiyi inceleyin",
  },
  en: {
    badge: "Source-based comparison",
    note: "This comparison does not declare an editorial score, winner or laboratory result. It places public, verifiable provider information side by side using the same fields.",
    price: "Starting price", jurisdiction: "Jurisdiction", audits: "Independent audit", servers: "Server / network information", devices: "Device support", openSource: "Open source", refund: "Refund period", yes: "Yes", no: "No", days: "days", official: "Official site", profile: "Provider profile", tableTitle: "Compare features side by side", strengths: "Documented notable points", considerations: "Points to consider", methodology: "Read the methodology",
  },
  de: {
    badge: "Quellenbasierter Vergleich",
    note: "Dieser Vergleich erklärt keine redaktionelle Punktzahl, keinen Sieger und kein Laborergebnis. Öffentliche, überprüfbare Anbieterinformationen werden anhand derselben Felder gegenübergestellt.",
    price: "Preis ab", jurisdiction: "Rechtsraum", audits: "Unabhängiges Audit", servers: "Server- / Netzwerkinformation", devices: "Geräteunterstützung", openSource: "Open Source", refund: "Erstattungsfrist", yes: "Ja", no: "Nein", days: "Tage", official: "Offizielle Website", profile: "Anbieterprofil", tableTitle: "Funktionen direkt vergleichen", strengths: "Dokumentierte Merkmale", considerations: "Zu beachtende Punkte", methodology: "Methodik lesen",
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
  const rows = [
    [t.price, left.pricingVerifiedAt ? formatProductPrice(left.priceFromUsd, left.priceCurrency, locale) : t.official, right.pricingVerifiedAt ? formatProductPrice(right.priceFromUsd, right.priceCurrency, locale) : t.official],
    [t.jurisdiction, left.highlights.jurisdiction ?? "—", right.highlights.jurisdiction ?? "—"],
    [t.audits, left.highlights.audits ?? "—", right.highlights.audits ?? "—"],
    [t.servers, left.highlights.servers ?? "—", right.highlights.servers ?? "—"],
    [t.devices, left.highlights.devices ?? "—", right.highlights.devices ?? "—"],
    [t.openSource, left.highlights.openSource === undefined ? "—" : left.highlights.openSource ? t.yes : t.no, right.highlights.openSource === undefined ? "—" : right.highlights.openSource ? t.yes : t.no],
    [t.refund, left.highlights.moneyBackDays ? `${left.highlights.moneyBackDays} ${t.days}` : "—", right.highlights.moneyBackDays ? `${right.highlights.moneyBackDays} ${t.days}` : "—"],
  ];

  return (
    <Container size="lg" className="py-12 sm:py-16">
      <header>
        <Badge variant="brand">{t.badge}</Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{title}</h1>
        <p className="mt-4 text-lg text-ink-muted">{description}</p>
      </header>

      <Card className="mt-6 p-5 bg-brand-50/40">
        <div className="flex items-start gap-3"><FileSearch className="size-5 text-brand-700 mt-0.5 shrink-0" /><div><p className="text-sm text-ink leading-relaxed">{t.note}</p><Link href="/methodology" className="mt-2 inline-flex text-sm font-semibold text-brand-700 hover:underline">{t.methodology}</Link></div></div>
      </Card>

      <DataDisclaimer verifiedAt={left.pricingVerifiedAt} />

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {[left, right].map((product) => (
          <Card key={product.slug} className="p-6">
            <div className="flex items-center gap-4"><VPNLogo slug={product.slug} size={56} /><div><h2 className="text-xl font-bold text-ink-strong">{product.brand}</h2><p className="text-sm text-ink-muted">{product.positioning}</p></div></div>
            <p className="mt-4 text-sm text-ink leading-relaxed">{product.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2"><Button asChild variant="primary"><ProviderLink href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "comparison-card" })} rel={providerOutboundRel(product.slug, product.hasAffiliate)} target="_blank" provider={product.slug} placement="comparison-card">{t.official}<ArrowRight className="size-4" /></ProviderLink></Button><Button asChild variant="ghost"><Link href={`/reviews/${product.slug}`}>{t.profile}</Link></Button></div>
          </Card>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">{t.tableTitle}</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm"><thead className="bg-surface-subtle"><tr><th className="px-4 py-3 text-left"></th><th className="px-4 py-3 text-left text-ink-strong">{left.brand}</th><th className="px-4 py-3 text-left text-ink-strong">{right.brand}</th></tr></thead><tbody className="divide-y divide-border bg-surface-base">{rows.map(([label, a, b]) => <tr key={label}><th className="px-4 py-3 text-left text-ink-muted font-medium">{label}</th><td className="px-4 py-3 text-ink">{a}</td><td className="px-4 py-3 text-ink">{b}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section className="mt-12 grid sm:grid-cols-2 gap-6">
        {[left, right].map((product) => <Card key={product.slug} className="p-6"><h2 className="text-lg font-semibold text-ink-strong">{product.brand}</h2><h3 className="mt-4 text-sm font-semibold text-success-700 flex items-center gap-2"><Check className="size-4" />{t.strengths}</h3><ul className="mt-2 space-y-2 text-sm text-ink">{product.pros.slice(0, 4).map((item) => <li key={item} className="flex items-start gap-2"><Check className="size-4 text-success-600 mt-0.5 shrink-0" />{item}</li>)}</ul><h3 className="mt-5 text-sm font-semibold text-ink-strong flex items-center gap-2"><AlertTriangle className="size-4 text-amber-600" />{t.considerations}</h3><ul className="mt-2 space-y-2 text-sm text-ink">{product.cons.slice(0, 4).map((item) => <li key={item} className="flex items-start gap-2"><AlertTriangle className="size-4 text-amber-600 mt-0.5 shrink-0" />{item}</li>)}</ul></Card>)}
      </section>
    </Container>
  );
}
