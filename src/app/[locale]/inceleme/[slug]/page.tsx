import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Check, X, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { PricingPlans } from "@/components/product/pricing-plans";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { products, getProduct } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const reviewBodies = {
  nordvpn: () => import("@/content/reviews/nordvpn.mdx"),
  surfshark: () => import("@/content/reviews/surfshark.mdx"),
  expressvpn: () => import("@/content/reviews/expressvpn.mdx"),
  "proton-vpn": () => import("@/content/reviews/proton-vpn.mdx"),
  pia: () => import("@/content/reviews/pia.mdx"),
  cyberghost: () => import("@/content/reviews/cyberghost.mdx"),
  mullvad: () => import("@/content/reviews/mullvad.mdx"),
} as const;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.brand} İncelemesi (2026) — ${product.positioning}`,
    description: product.summary,
    alternates: { canonical: absoluteUrl(`/inceleme/${product.slug}`) },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  const importer = reviewBodies[slug as keyof typeof reviewBodies];
  const ReviewBody = importer ? (await importer()).default : null;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: product.brand,
      applicationCategory: "SecurityApplication",
      operatingSystem: "Windows, macOS, Linux, iOS, Android",
    },
    author: { "@type": "Organization", name: "vpncompaire" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.score,
      bestRating: 10,
    },
    name: `${product.brand} İncelemesi (2026)`,
    reviewBody: product.summary,
    datePublished: "2026-05-01",
  };

  return (
    <>
      <JsonLd data={reviewSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "İncelemeler", path: "/en-iyi-vpn" },
          { name: product.brand, path: `/inceleme/${product.slug}` },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          ›{" "}
          <Link href="/en-iyi-vpn" className="hover:text-ink">
            İncelemeler
          </Link>{" "}
          › <span className="text-ink-strong">{product.brand}</span>
        </p>

        <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <VPNLogo slug={product.slug} size={72} className="sm:mt-2" />
          <div className="flex-1">
            <Badge variant="brand">{product.positioning}</Badge>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
              {product.brand} İncelemesi (2026)
            </h1>
            <p className="mt-4 text-lg text-ink-muted">{product.summary}</p>
          </div>
        </header>

        <Card className="mt-8 p-6">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Stat label="Puan" value={`${product.score}/10`} highlight />
            <Stat
              label="En düşük fiyat"
              value={`$${product.priceFromUsd.toFixed(2)}/ay`}
            />
            <Stat
              label="Yargı yetkisi"
              value={product.highlights.jurisdiction ?? "—"}
            />
            <Stat
              label="Para iade"
              value={
                product.highlights.moneyBackDays
                  ? `${product.highlights.moneyBackDays} gün`
                  : "—"
              }
            />
          </dl>

          <div className="mt-6 border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-ink-strong">
              Fiyatlandırma
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {product.brand} planları ve güncel kampanyalar:
            </p>
            <div className="mt-4 grid sm:grid-cols-[1fr_auto] gap-6">
              <PricingPlans
                plans={product.plans}
                verifiedAt={product.pricingVerifiedAt}
              />
              <div className="flex flex-col gap-2 sm:w-48">
                <Button
                  asChild
                  variant={product.hasAffiliate ? "primary" : "secondary"}
                >
                  <a
                    href={
                      product.hasAffiliate
                        ? affiliatePath(product.slug)
                        : product.pricingUrl
                    }
                    rel={
                      product.hasAffiliate ? "sponsored nofollow" : "noopener"
                    }
                    target={product.hasAffiliate ? "_self" : "_blank"}
                  >
                    {product.hasAffiliate ? "Fırsata Git" : "Resmi Siteye Git"}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <section className="mt-12 grid sm:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
              <Check className="size-5" /> Artıları
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              {product.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="size-4 text-success-600 mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
              <X className="size-5 text-danger-500" /> Eksileri
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              {product.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="size-4 text-danger-500 mt-0.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {ReviewBody && (
          <article className="prose prose-stone prose-lg max-w-none mt-16">
            <ReviewBody />
          </article>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-ink-strong">
            Detaylar
          </h2>
          <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
            {product.highlights.audits && (
              <Row
                label="Bağımsız denetimler"
                value={product.highlights.audits}
              />
            )}
            {product.highlights.servers && (
              <Row label="Sunucular" value={product.highlights.servers} />
            )}
            {product.highlights.devices && (
              <Row
                label="Eşzamanlı cihaz"
                value={product.highlights.devices}
              />
            )}
            {product.highlights.jurisdiction && (
              <Row
                label="Yargı yetkisi"
                value={product.highlights.jurisdiction}
              />
            )}
            {product.highlights.openSource !== undefined && (
              <Row
                label="Açık kaynak istemciler"
                value={product.highlights.openSource ? "Evet" : "Hayır"}
              />
            )}
            {product.highlights.moneyBackDays && (
              <Row
                label="Para iade garantisi"
                value={`${product.highlights.moneyBackDays} gün`}
              />
            )}
          </dl>
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">Tüm karşılaştırmaları gör</p>
          <Link
            href="/en-iyi-vpn"
            className="mt-2 inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:underline"
          >
            En İyi 7 VPN sıralamasına dön <ArrowRight className="size-4" />
          </Link>
        </section>
      </Container>
    </>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-ink-subtle">{label}</dt>
      <dd
        className={
          "mt-0.5 font-semibold " +
          (highlight ? "text-2xl text-brand-700" : "text-ink-strong")
        }
      >
        {value}
      </dd>
    </div>
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
