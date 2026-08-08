import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CheckCircle2, ExternalLink, Info, FileSearch, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { PricingPlans } from "@/components/product/pricing-plans";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";
import { rawProducts, getProduct, type Product } from "@/data/products";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const COPY = {
  tr: {
    suffix: "VPN Bilgi Profili 2026",
    description: "Kaynak temelli VPN sağlayıcı profili: gizlilik, bağımsız denetim, cihaz desteği, yargı yetkisi, fiyatlandırma ve iade koşulları.",
    home: "Ana sayfa",
    hub: "VPN Rehberi",
    badge: "Kaynak temelli bilgi profili",
    intro: "Bu sayfa laboratuvar incelemesi veya puanlama değildir. Kamuya açık sağlayıcı belgeleri, denetim bilgileri ve fiyatlandırma verilerini karşılaştırılabilir biçimde özetler.",
    sourceNote: "Bilgiler zamanla değişebilir. Fiyat, sunucu sayısı, cihaz limiti, denetim kapsamı ve iade şartlarını satın alma öncesinde resmi kaynaktan doğrulayın.",
    facts: "Doğrulanabilir bilgi özeti",
    audit: "Bağımsız denetim / güvence",
    servers: "Sunucu / ülke bilgisi",
    devices: "Cihaz desteği",
    jurisdiction: "Yargı yetkisi",
    openSource: "Açık kaynak istemci",
    refund: "İade süresi",
    yes: "Evet",
    no: "Belirtilmemiş / hayır",
    days: "gün",
    pricing: "Fiyatlandırma bilgisi",
    pricingIntro: "Aşağıdaki fiyatlar son kaydedilen sağlayıcı verileridir; kampanya ve yenileme koşulları değişebilir.",
    official: "Resmi siteyi aç",
    method: "Bu profil nasıl hazırlanıyor?",
    methodBody: "VPN Advisor sağlayıcılara laboratuvar puanı vermez. Bu profil; sağlayıcının resmi sayfaları, gizlilik politikaları, yayınlanan denetim raporları ve kamuya açık teknik dokümantasyon gibi kaynaklardan derlenen bilgileri düzenler.",
    back: "Tüm VPN profillerine dön",
  },
  en: {
    suffix: "VPN Information Profile 2026",
    description: "Source-based VPN provider profile covering privacy, independent audits, device support, jurisdiction, pricing and refund terms.",
    home: "Home",
    hub: "VPN Guide",
    badge: "Source-based information profile",
    intro: "This page is not a lab review or a rating. It organises public provider documentation, audit information and pricing data into comparable fields.",
    sourceNote: "Information changes over time. Verify pricing, server counts, device limits, audit scope and refund terms at the official source before purchasing.",
    facts: "Verifiable information summary",
    audit: "Independent audit / assurance",
    servers: "Server / country information",
    devices: "Device support",
    jurisdiction: "Jurisdiction",
    openSource: "Open-source client",
    refund: "Refund period",
    yes: "Yes",
    no: "Not stated / no",
    days: "days",
    pricing: "Pricing information",
    pricingIntro: "Prices below reflect the last recorded provider data; promotions and renewal terms can change.",
    official: "Open official site",
    method: "How is this profile prepared?",
    methodBody: "VPN Advisor does not assign laboratory scores to providers. This profile organises information from official provider pages, privacy policies, published audit reports and public technical documentation.",
    back: "Back to all VPN profiles",
  },
  de: {
    suffix: "VPN-Informationsprofil 2026",
    description: "Quellenbasiertes VPN-Anbieterprofil zu Datenschutz, unabhängigen Audits, Geräteunterstützung, Zuständigkeit, Preisen und Erstattung.",
    home: "Startseite",
    hub: "VPN-Ratgeber",
    badge: "Quellenbasiertes Informationsprofil",
    intro: "Diese Seite ist kein Labortest und keine Bewertung. Sie ordnet öffentliche Anbieterdokumente, Auditinformationen und Preisdaten in vergleichbare Felder ein.",
    sourceNote: "Angaben können sich ändern. Prüfen Sie Preise, Serverzahlen, Gerätelimits, Auditumfang und Erstattungsbedingungen vor dem Kauf bei der offiziellen Quelle.",
    facts: "Überprüfbare Informationsübersicht",
    audit: "Unabhängiges Audit / Prüfung",
    servers: "Server- / Länderangaben",
    devices: "Geräteunterstützung",
    jurisdiction: "Zuständigkeit",
    openSource: "Open-Source-Client",
    refund: "Erstattungszeitraum",
    yes: "Ja",
    no: "Nicht angegeben / nein",
    days: "Tage",
    pricing: "Preisinformationen",
    pricingIntro: "Die Preise entsprechen den zuletzt erfassten Anbieterangaben; Aktionen und Verlängerungsbedingungen können sich ändern.",
    official: "Offizielle Website öffnen",
    method: "Wie wird dieses Profil erstellt?",
    methodBody: "VPN Advisor vergibt keine Laborbewertungen. Dieses Profil strukturiert Informationen aus offiziellen Anbieterseiten, Datenschutzrichtlinien, veröffentlichten Auditberichten und öffentlicher technischer Dokumentation.",
    back: "Zurück zu allen VPN-Profilen",
  },
} as const;

function safeLocale(value: string): Locale {
  return value === "en" || value === "de" ? value : "tr";
}

function copyFor(locale: Locale) {
  return COPY[locale];
}

export function generateStaticParams() {
  return rawProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = safeLocale(rawLocale);
  const product = getProduct(slug, (locale === "de" ? "en" : locale) as "tr" | "en");
  if (!product) return {};
  const copy = copyFor(locale);
  const title = `${product.brand} — ${copy.suffix}`;
  return {
    title,
    description: `${product.brand}: ${copy.description}`,
    alternates: localizedAlternates(`/inceleme/${product.slug}`, locale),
    openGraph: {
      title,
      description: `${product.brand}: ${copy.description}`,
      url: absoluteUrl(`/inceleme/${product.slug}`, locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = safeLocale(rawLocale);
  setRequestLocale(locale);
  const product = getProduct(slug, (locale === "de" ? "en" : locale) as "tr" | "en");
  if (!product) notFound();
  const copy = copyFor(locale);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.brand,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Windows, macOS, Linux, iOS, Android",
    url: product.pricingUrl,
  };

  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: copy.home, path: "/" },
            { name: copy.hub, path: "/en-iyi-vpn" },
            { name: product.brand, path: `/inceleme/${product.slug}` },
          ],
          locale,
        )}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">{copy.home}</Link>{" "}›{" "}
          <Link href="/en-iyi-vpn" className="hover:text-ink">{copy.hub}</Link>{" "}›{" "}
          <span className="text-ink-strong">{product.brand}</span>
        </p>

        <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <VPNLogo slug={product.slug} size={72} className="sm:mt-2" />
          <div className="flex-1">
            <Badge variant="brand">{copy.badge}</Badge>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
              {product.brand} — {copy.suffix}
            </h1>
            <p className="mt-4 text-lg text-ink-muted">{copy.intro}</p>
          </div>
        </header>

        <div className="mt-6 rounded-lg border border-border bg-surface-subtle/40 p-4">
          <div className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
            <p>{copy.sourceNote}</p>
          </div>
        </div>

        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold text-ink-strong">{copy.facts}</h2>
          <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface-base">
            <Row label={copy.audit} value={product.highlights.audits ?? "—"} />
            <Row label={copy.servers} value={product.highlights.servers ?? "—"} />
            <Row label={copy.devices} value={product.highlights.devices ?? "—"} />
            <Row label={copy.jurisdiction} value={product.highlights.jurisdiction ?? "—"} />
            <Row label={copy.openSource} value={product.highlights.openSource ? copy.yes : copy.no} />
            <Row label={copy.refund} value={product.highlights.moneyBackDays ? `${product.highlights.moneyBackDays} ${copy.days}` : "—"} />
          </dl>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-ink-strong">{copy.pricing}</h2>
            <p className="mt-1 text-sm text-ink-muted">{copy.pricingIntro}</p>
            <div className="mt-4 grid sm:grid-cols-[1fr_auto] gap-6">
              <PricingPlans plans={product.plans} verifiedAt={product.pricingVerifiedAt} />
              <div className="flex flex-col gap-2 sm:w-52">
                <Button asChild variant="primary">
                  <a href={product.pricingUrl} rel="noopener nofollow" target="_blank">
                    {copy.official}<ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <section className="mt-12 grid sm:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
              <FileSearch className="size-5 text-brand-600" /> {copy.method}
            </h2>
            <p className="mt-3 text-sm text-ink leading-relaxed">{copy.methodBody}</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
              <CheckCircle2 className="size-5 text-success-600" /> {copy.sourceNote.split(".")[0]}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• {product.pricingUrl}</li>
              <li>• {product.highlights.audits ?? copy.audit}</li>
              <li>• {product.pricingVerifiedAt}</li>
            </ul>
          </Card>
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <Link href="/en-iyi-vpn" className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:underline">
            {copy.back} <ArrowRight className="size-4" />
          </Link>
        </section>
      </Container>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-2 px-4 py-3 text-sm">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-ink-strong font-medium">{value}</dd>
    </div>
  );
}
