import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { sectionHubAlternates, type Locale } from "@/lib/site";
import { getLocalizedSectionPath, SECTION_SLUGS, DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n-paths";
import { formatProductPriceShort } from "@/lib/product-price";

type Props = { params: Promise<{ locale: string }> };

type Comparison = {
  slug: string;
  title: string;
  available: boolean;
  tag: "Popular" | "Privacy" | "Premium" | "Soon";
  pair?: readonly [string, string];
};

const comparisons: readonly Comparison[] = [
  { slug: "nordvpn-vs-surfshark", title: "NordVPN vs Surfshark", available: true, tag: "Popular", pair: ["nordvpn", "surfshark"] },
  { slug: "expressvpn-vs-nordvpn", title: "ExpressVPN vs NordVPN", available: true, tag: "Premium", pair: ["expressvpn", "nordvpn"] },
  { slug: "proton-vs-mullvad", title: "Proton VPN vs Mullvad", available: true, tag: "Privacy", pair: ["proton-vpn", "mullvad"] },
  { slug: "ucretsiz-vs-ucretli-vpn", title: "Ücretsiz vs Ücretli VPN", available: false, tag: "Soon" },
] as const;

const pageCopy = {
  tr: { title: "VPN Karşılaştırmaları — Özellikleri Yan Yana İnceleyin", description: "VPN sağlayıcılarını editoryal puan veya kazanan ilan etmeden; fiyat, gizlilik, denetim, cihaz desteği ve doğrulanabilir teknik bilgiler üzerinden karşılaştırın.", h1: "VPN sağlayıcılarını yan yana karşılaştırın", lede: "Karşılaştırmalar, aynı bilgi alanlarını iki sağlayıcı için görünür hale getirir. Amaç bir 'kazanan' ilan etmek değil; farkları kaynak temelli biçimde görmenizi sağlamaktır.", home: "Ana sayfa", here: "Karşılaştırmalar", read: "Karşılaştırmayı aç", footer: "Tüm sağlayıcı profillerini gör", price: "Başlangıç", audit: "Denetim" },
  en: { title: "VPN Comparisons — Compare Features Side by Side", description: "Compare VPN providers without editorial scores or declared winners, using pricing, privacy, audits, device support and verifiable technical information.", h1: "Compare VPN providers side by side", lede: "Each comparison exposes the same information fields for two providers. The goal is not to declare a winner, but to make source-based differences easier to inspect.", home: "Home", here: "Comparisons", read: "Open comparison", footer: "View all provider profiles", price: "From", audit: "Audit" },
  de: { title: "VPN-Vergleiche — Funktionen direkt gegenüberstellen", description: "VPN-Anbieter ohne redaktionelle Punktzahlen oder erklärte Sieger anhand von Preisen, Datenschutz, Audits, Geräteunterstützung und überprüfbaren technischen Informationen vergleichen.", h1: "VPN-Anbieter direkt vergleichen", lede: "Jeder Vergleich stellt dieselben Informationsfelder für zwei Anbieter gegenüber. Ziel ist kein Sieger, sondern ein transparenter, quellenbasierter Überblick über die Unterschiede.", home: "Startseite", here: "Vergleiche", read: "Vergleich öffnen", footer: "Alle Anbieterprofile ansehen", price: "Ab", audit: "Audit" },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = pageCopy[locale];
  return { title: t.title, description: t.description, alternates: sectionHubAlternates("comparison", locale) };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const appLocale: AppLocale = rawLocale === "en" || rawLocale === "de" ? rawLocale : DEFAULT_LOCALE;
  const locale = appLocale as Locale;
  const t = pageCopy[locale];
  const comparisonBase = `/${SECTION_SLUGS[appLocale].comparison}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: t.home, path: appLocale === DEFAULT_LOCALE ? "/" : `/${appLocale}` }, { name: t.here, path: getLocalizedSectionPath(appLocale, "comparison") }], appLocale)} />
      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">{t.home}</Link>{" "}› <span className="text-ink-strong">{t.here}</span></p>
        <header className="mt-6 max-w-3xl"><h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{t.h1}</h1><p className="mt-4 text-lg text-ink-muted">{t.lede}</p></header>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {comparisons.map((c) => {
            const productLocale = locale === "tr" ? "tr" : "en";
            const a = c.pair ? getProduct(c.pair[0], productLocale) : null;
            const b = c.pair ? getProduct(c.pair[1], productLocale) : null;
            const inner = (
              <Card className={"p-5 h-full " + (c.available ? "hover:border-brand-300 hover:shadow-md transition-all" : "opacity-60 cursor-not-allowed")}>
                <div className="flex items-center gap-4">
                  {a && b ? <div className="flex items-center -space-x-2 shrink-0"><VPNLogo slug={a.slug} size={44} className="ring-2 ring-white" /><VPNLogo slug={b.slug} size={44} className="ring-2 ring-white" /></div> : null}
                  <div className="flex-1 min-w-0"><div className="flex items-center justify-between gap-2 flex-wrap"><h2 className="text-lg font-semibold text-ink-strong group-hover:text-brand-700">{c.title}</h2><Badge variant={c.available ? "brand" : "neutral"}>{c.tag}</Badge></div></div>
                </div>
                {a && b ? <dl className="mt-4 grid grid-cols-2 gap-3 text-xs"><FactCell brand={a.brand} price={a.priceFromUsd} currency={a.priceCurrency} pricingVerifiedAt={a.pricingVerifiedAt} audit={a.highlights.audits} priceLabel={t.price} auditLabel={t.audit} official={locale === "tr" ? "Resmi site" : locale === "de" ? "Offizielle Website" : "Official site"} /><FactCell brand={b.brand} price={b.priceFromUsd} currency={b.priceCurrency} pricingVerifiedAt={b.pricingVerifiedAt} audit={b.highlights.audits} priceLabel={t.price} auditLabel={t.audit} official={locale === "tr" ? "Resmi site" : locale === "de" ? "Offizielle Website" : "Official site"} /></dl> : null}
                {c.available && <div className="mt-4 inline-flex items-center text-xs font-medium text-brand-700">{t.read} <ArrowRight className="ml-1 size-3" /></div>}
              </Card>
            );
            return c.available ? <Link key={c.slug} href={`${comparisonBase}/${c.slug}`} className="group">{inner}</Link> : <div key={c.slug}>{inner}</div>;
          })}
        </div>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center"><Link href="/vpn-reviews" className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:underline">{t.footer} <ArrowRight className="size-4" /></Link></section>
      </Container>
    </>
  );
}

function FactCell({ brand, price, currency, pricingVerifiedAt, audit, priceLabel, auditLabel, official }: { brand: string; price: number; currency: "USD" | "EUR"; pricingVerifiedAt: string; audit?: string; priceLabel: string; auditLabel: string; official: string }) {
  return <div className="rounded-md bg-surface-subtle/60 px-3 py-2"><div className="text-[10px] uppercase tracking-wider text-ink-subtle font-medium line-clamp-1">{brand}</div><div className="mt-1 text-sm font-semibold text-ink-strong">{priceLabel}: {pricingVerifiedAt ? formatProductPriceShort(price, currency) : official}</div><div className="mt-1 text-[11px] text-ink-muted line-clamp-2">{auditLabel}: {audit ?? "—"}</div></div>;
}
