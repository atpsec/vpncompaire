import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Check, X, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { PricingPlans } from "@/components/product/pricing-plans";
import { LastTestedBadge } from "@/components/product/last-tested-badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { localizedAlternates } from "@/lib/site";
import { rawProducts, getProduct, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";

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
  ipvanish: () => import("@/content/reviews/ipvanish.mdx"),
  windscribe: () => import("@/content/reviews/windscribe.mdx"),
  tunnelbear: () => import("@/content/reviews/tunnelbear.mdx"),
} as const;

export function generateStaticParams() {
  return rawProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug, locale as "tr" | "en");
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: "review" });

  return {
    title: t("metaTitle", {
      brand: product.brand,
      positioning: product.positioning,
    }),
    description: product.summary,
    alternates: localizedAlternates(`/inceleme/${product.slug}`, locale),
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug, locale as "tr" | "en");
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
    author: { "@type": "Organization", name: "VPN Advisor" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.score,
      bestRating: 10,
    },
    name: `${product.brand} Review (2026)`,
    reviewBody: product.summary,
    datePublished: "2026-05-01",
  };

  return (
    <ReviewView product={product} reviewSchema={reviewSchema}>
      {ReviewBody && <ReviewBody />}
    </ReviewView>
  );
}

function ReviewView({
  product,
  reviewSchema,
  children,
}: {
  product: Product;
  reviewSchema: Record<string, unknown>;
  children: React.ReactNode;
}) {
  const t = useTranslations("review");

  return (
    <>
      <JsonLd data={reviewSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: t("breadcrumb.home"), path: "/" },
          { name: t("breadcrumb.reviews"), path: "/en-iyi-vpn" },
          { name: product.brand, path: `/inceleme/${product.slug}` },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {t("breadcrumb.home")}
          </Link>{" "}
          ›{" "}
          <Link href="/en-iyi-vpn" className="hover:text-ink">
            {t("breadcrumb.reviews")}
          </Link>{" "}
          › <span className="text-ink-strong">{product.brand}</span>
        </p>

        <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <VPNLogo slug={product.slug} size={72} className="sm:mt-2" />
          <div className="flex-1">
            <Badge variant="brand">{product.positioning}</Badge>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
              {t("h1", { brand: product.brand })}
            </h1>
            <p className="mt-4 text-lg text-ink-muted">{product.summary}</p>
          </div>
        </header>

        <DataDisclaimer verifiedAt={product.pricingVerifiedAt} />

        <LastTestedBadge
          lastTestedAt={product.lastTestedAt}
          testEnvironment={product.testEnvironment}
          editorNotes={product.editorNotes}
        />

        <Card className="mt-8 p-6">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Stat
              label={t("stats.score")}
              value={`${product.score}/10`}
              highlight
            />
            <Stat
              label={t("stats.priceFrom")}
              value={`$${product.priceFromUsd.toFixed(2)}/${t("stats.perMonth")}`}
            />
            <Stat
              label={t("stats.jurisdiction")}
              value={product.highlights.jurisdiction ?? "—"}
            />
            <Stat
              label={t("stats.moneyBack")}
              value={
                product.highlights.moneyBackDays
                  ? `${product.highlights.moneyBackDays} ${t("stats.days")}`
                  : "—"
              }
            />
          </dl>

          <div className="mt-6 border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-ink-strong">
              {t("pricingTitle")}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {t("pricingIntro", { brand: product.brand })}
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
                    {product.hasAffiliate
                      ? t("ctaAffiliate")
                      : t("ctaOfficial")}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
                {product.hasAffiliate ? <AffiliateNotice /> : null}
              </div>
            </div>
          </div>
        </Card>

        <section className="mt-12 grid sm:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
              <Check className="size-5" /> {t("pros")}
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
              <X className="size-5 text-danger-500" /> {t("cons")}
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

        {children && (
          <article className="prose prose-stone prose-lg max-w-none mt-16">
            {children}
          </article>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-ink-strong">
            {t("detailsTitle")}
          </h2>
          <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface-base">
            {product.highlights.audits && (
              <Row
                label={t("details.audits")}
                value={product.highlights.audits}
              />
            )}
            {product.highlights.servers && (
              <Row
                label={t("details.servers")}
                value={product.highlights.servers}
              />
            )}
            {product.highlights.devices && (
              <Row
                label={t("details.devices")}
                value={product.highlights.devices}
              />
            )}
            {product.highlights.jurisdiction && (
              <Row
                label={t("details.jurisdiction")}
                value={product.highlights.jurisdiction}
              />
            )}
            {product.highlights.openSource !== undefined && (
              <Row
                label={t("details.openSource")}
                value={
                  product.highlights.openSource
                    ? t("details.yes")
                    : t("details.no")
                }
              />
            )}
            {product.highlights.moneyBackDays && (
              <Row
                label={t("details.moneyBackGuarantee")}
                value={`${product.highlights.moneyBackDays} ${t("details.days")}`}
              />
            )}
          </dl>
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("footerCta.kicker")}</p>
          <Link
            href="/en-iyi-vpn"
            className="mt-2 inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:underline"
          >
            {t("footerCta.link")} <ArrowRight className="size-4" />
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
