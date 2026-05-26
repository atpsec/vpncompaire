import { ArrowRight, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";

export type UseCasePick = {
  slug: string;
  why: string;
  bestFor: string;
};

export type UseCaseFAQ = { q: string; a: string };

export type UseCasePageProps = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  Icon: LucideIcon;
  badgeLabel: string;
  picks: readonly UseCasePick[];
  faqs: readonly UseCaseFAQ[];
  considerations: { title: string; body: string }[];
  relatedLinks: { label: string; href: string }[];
};

export function UseCasePage({
  slug,
  title,
  tagline,
  summary,
  Icon,
  badgeLabel,
  picks,
  faqs,
  considerations,
  relatedLinks,
}: UseCasePageProps) {
  const t = useTranslations("useCase");
  const locale = useLocale() as "tr" | "en";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t("breadcrumb.home"), path: "/" },
          { name: t("breadcrumb.hub"), path: "/en-iyi" },
          { name: title, path: `/en-iyi/${slug}` },
        ])}
      />
      <JsonLd data={faqSchema([...faqs])} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {t("breadcrumb.home")}
          </Link>{" "}
          ›{" "}
          <Link href="/en-iyi" className="hover:text-ink">
            {t("breadcrumb.hub")}
          </Link>{" "}
          › <span className="text-ink-strong">{badgeLabel}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Icon className="size-3" /> {badgeLabel}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {title}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{tagline}</p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
            <ShieldCheck className="size-5 text-brand-600" /> {t("summaryTitle")}
          </h2>
          <p className="mt-3 text-ink leading-relaxed">{summary}</p>
        </Card>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            {t("picksHeading", { count: picks.length })}
          </h2>
          <div className="mt-6 space-y-4">
            {picks.map((pick, idx) => {
              const product = getProduct(pick.slug, locale);
              if (!product) return null;
              return (
                <Card key={pick.slug} className="p-6">
                  <div className="flex flex-wrap items-start gap-4">
                    <VPNLogo slug={product.slug} size={56} />
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                          #{idx + 1}
                        </span>
                        <h3 className="text-xl font-semibold text-ink-strong">
                          {product.brand}
                        </h3>
                        <Badge variant="brand">{pick.bestFor}</Badge>
                      </div>
                      <p className="mt-3 text-ink leading-relaxed">
                        {pick.why}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button
                          asChild
                          variant={
                            product.hasAffiliate ? "primary" : "secondary"
                          }
                          size="sm"
                        >
                          <a
                            href={affiliatePath(product.slug)}
                            rel="sponsored nofollow"
                          >
                            {product.hasAffiliate
                              ? t("ctaAffiliate", { brand: product.brand })
                              : t("ctaOfficial", { brand: product.brand })}
                            <ArrowRight className="size-4" />
                          </a>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/inceleme/${product.slug}`}>
                            {t("readReview")}
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-ink-subtle">
                        {t("scoreLabel")}
                      </div>
                      <div className="text-2xl font-bold text-brand-700">
                        {product.score.toFixed(1)}
                        <span className="text-xs text-ink-subtle font-normal">
                          /10
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {considerations.length > 0 && (
          <section className="mt-16 prose prose-stone max-w-none">
            <h2>{t("considerationsHeading")}</h2>
            {considerations.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>{t("faqHeading")}</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("relatedHeading")}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
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

