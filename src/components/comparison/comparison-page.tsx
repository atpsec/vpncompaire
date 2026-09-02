import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getComparisonProduct } from "@/data/comparison-products";
import { cn } from "@/lib/utils";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";
import { LastTestedBadge } from "@/components/product/last-tested-badge";
import { getLocalizedLinkHref, getLocalizedPath, type AppLocale } from "@/lib/i18n-paths";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate-public";

export type ComparisonCategory = {
  name: string;
  winner: "a" | "b" | "tie";
  aDetail: string;
  bDetail: string;
  reasoning: string;
};

export type ComparisonFAQ = { q: string; a: string };

export type ComparisonPageProps = {
  slug: string;
  locale: string;
  productSlugA: string;
  productSlugB: string;
  tagline: string;
  categories: readonly ComparisonCategory[];
  whyA: { title: string; reasons: readonly string[] };
  whyB: { title: string; reasons: readonly string[] };
  faqs: readonly ComparisonFAQ[];
  relatedLinks: readonly { label: string; href: string }[];
};

export async function ComparisonPage({
  slug,
  locale,
  productSlugA,
  productSlugB,
  tagline,
  categories,
  whyA,
  whyB,
  faqs,
  relatedLinks,
}: ComparisonPageProps) {
  const a = getComparisonProduct(productSlugA, locale as AppLocale);
  const b = getComparisonProduct(productSlugB, locale as AppLocale);
  if (!a || !b) return null;
  const t = await getTranslations({ locale, namespace: "comparison" });
  const appLocale = locale as AppLocale;
  const hubPath = getLocalizedPath({ locale: appLocale, section: "comparison" });
  const detailPath = getLocalizedPath({
    locale: appLocale,
    section: "comparison",
    contentId: slug,
  });
  const hubHref = getLocalizedLinkHref({ locale: appLocale, section: "comparison" });

  const title = `${a.brand} vs ${b.brand}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbHub"), path: hubPath },
            { name: title, path: detailPath },
          ],
          locale as "tr" | "en" | "de",
        )}
      />
      <JsonLd data={faqSchema([...faqs])} />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {t("breadcrumbHome")}
          </Link>{" "}
          ›{" "}
          <Link href={hubHref} className="hover:text-ink">
            {t("breadcrumbHub")}
          </Link>{" "}
          › <span className="text-ink-strong">{title}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">{t("badge")}</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("titleTemplate", { title })}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{tagline}</p>
        </header>

        <DataDisclaimer verifiedAt={a.pricingVerifiedAt} />

        {(a.lastTestedAt || b.lastTestedAt) && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <LastTestedBadge
              lastTestedAt={a.lastTestedAt}
              testEnvironment={a.testEnvironment}
              editorNotes={a.editorNotes}
              className="mt-0"
            />
            <LastTestedBadge
              lastTestedAt={b.lastTestedAt}
              testEnvironment={b.testEnvironment}
              editorNotes={b.editorNotes}
              className="mt-0"
            />
          </div>
        )}

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <VPNLogo slug={a.slug} size={52} />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-ink-strong">{a.brand}</h2>
                <p className="text-sm text-ink-muted">{a.positioning}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink leading-relaxed">{a.summary}</p>
            <Button asChild variant="primary" className="mt-4 w-full">
              <ProviderLink
                href={providerOutboundHref({ slug: a.slug, fallbackUrl: a.pricingUrl, hasAffiliate: a.hasAffiliate, source: "comparison-a" })}
                rel={providerOutboundRel(a.slug, a.hasAffiliate)}
                target="_blank"
                provider={a.slug}
                placement="comparison-a"
              >
                {t("ctaOfficial", { brand: a.brand })}{" "}
                <ArrowRight className="size-4" />
              </ProviderLink>
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <VPNLogo slug={b.slug} size={52} />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-ink-strong">{b.brand}</h2>
                <p className="text-sm text-ink-muted">{b.positioning}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink leading-relaxed">{b.summary}</p>
            <Button asChild variant="primary" className="mt-4 w-full">
              <ProviderLink
                href={providerOutboundHref({ slug: b.slug, fallbackUrl: b.pricingUrl, hasAffiliate: b.hasAffiliate, source: "comparison-b" })}
                rel={providerOutboundRel(b.slug, b.hasAffiliate)}
                target="_blank"
                provider={b.slug}
                placement="comparison-b"
              >
                {t("ctaOfficial", { brand: b.brand })}
                <ArrowRight className="size-4" />
              </ProviderLink>
            </Button>
          </Card>
        </div>
        <AffiliateNotice className="mt-4" variant="surface" />

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            {t("categoriesH2")}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            {t("categoriesIntro")}
          </p>
          <div className="mt-6 space-y-4">
            {categories.map((cat) => (
              <Card key={cat.name} className="p-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold text-ink-strong">
                    {cat.name}
                  </h3>
                  <DocumentedEdgeBadge
                    winner={cat.winner}
                    aBrand={a.brand}
                    bBrand={b.brand}
                  />
                </div>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      cat.winner === "a"
                        ? "bg-success-50 border border-success-100"
                        : "bg-surface-subtle border border-border",
                    )}
                  >
                    <div className="font-medium text-ink-strong flex items-center gap-1">
                      {a.brand}
                    </div>
                    <p className="mt-1 text-ink-muted">{cat.aDetail}</p>
                  </div>
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      cat.winner === "b"
                        ? "bg-success-50 border border-success-100"
                        : "bg-surface-subtle border border-border",
                    )}
                  >
                    <div className="font-medium text-ink-strong flex items-center gap-1">
                      {b.brand}
                    </div>
                    <p className="mt-1 text-ink-muted">{cat.bDetail}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink leading-relaxed">
                  <span className="font-medium text-ink-strong">
                    {t("reasonLabel")}{" "}
                  </span>
                  {cat.reasoning}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 grid sm:grid-cols-2 gap-6">
          <Card className="p-6 border-brand-200 bg-brand-50/40">
            <h3 className="text-xl font-bold text-ink-strong flex items-center gap-2">
              <Check className="size-5 text-brand-600" />
              {whyA.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {whyA.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <Button asChild variant="primary" className="mt-5 w-full">
              <Link href={`/reviews/${a.slug}`}>
                {t("reviewLink", { brand: a.brand })}
              </Link>
            </Button>
          </Card>

          <Card className="p-6 border-accent-300 bg-accent-50/40">
            <h3 className="text-xl font-bold text-ink-strong flex items-center gap-2">
              <Check className="size-5 text-accent-600" />
              {whyB.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {whyB.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <Button asChild variant="primary" className="mt-5 w-full">
              <Link href={`/reviews/${b.slug}`}>
                {t("reviewLink", { brand: b.brand })}
              </Link>
            </Button>
          </Card>
        </section>

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>{t("faqH2")}</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("relatedTitle")}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

function DocumentedEdgeBadge({
  winner,
  aBrand,
  bBrand,
}: {
  winner: "a" | "b" | "tie";
  aBrand: string;
  bBrand: string;
}) {
  const t = useTranslations("comparison");
  if (winner === "tie") {
    return <Badge variant="neutral">{t("winnerTie")}</Badge>;
  }
  return (
    <Badge variant="brand">
      {t("winnerLeads", { brand: winner === "a" ? aBrand : bBrand })}
    </Badge>
  );
}
