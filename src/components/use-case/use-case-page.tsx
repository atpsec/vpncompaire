import { ArrowRight, ShieldCheck, FileSearch } from "lucide-react";
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
import type { Locale } from "@/lib/site";
import { referenceCopy } from "@/lib/reference-copy";

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

const LABELS = {
  tr: {
    profilesHeading: "Karşılaştırılabilecek sağlayıcı profilleri",
    documentation: "Belgelendirme",
    profile: "Bilgi profili",
    official: "Resmi kaynağı kontrol et",
    note: "Aşağıdaki sağlayıcılar kalite sırasına göre listelenmez. Hangi özelliklerin kullanım senaryonuzla ilişkili olduğunu göstermek için örnek profiller olarak sunulur.",
  },
  en: {
    profilesHeading: "Provider profiles to compare",
    documentation: "Documentation",
    profile: "Information profile",
    official: "Check official source",
    note: "Providers below are not ordered by quality. They are example profiles showing which documented fields may matter for this use case.",
  },
  de: {
    profilesHeading: "Anbieterprofile zum Vergleichen",
    documentation: "Dokumentation",
    profile: "Informationsprofil",
    official: "Offizielle Quelle prüfen",
    note: "Die Anbieter unten sind nicht nach Qualität geordnet. Sie dienen als Beispielprofile dafür, welche dokumentierten Merkmale für diesen Anwendungsfall relevant sein können.",
  },
} as const;

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
  const rawLocale = useLocale();
  const locale: Locale = rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr";
  const labels = LABELS[locale];
  const ref = referenceCopy(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("breadcrumb.home"), path: "/" },
            { name: t("breadcrumb.hub"), path: "/en-iyi" },
            { name: title, path: `/en-iyi/${slug}` },
          ],
          locale,
        )}
      />
      <JsonLd data={faqSchema([...faqs])} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">{t("breadcrumb.home")}</Link>{" "}›{" "}
          <Link href="/en-iyi" className="hover:text-ink">{t("breadcrumb.hub")}</Link>{" "}› <span className="text-ink-strong">{badgeLabel}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand"><Icon className="size-3" /> {badgeLabel}</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{title}</h1>
          <p className="mt-4 text-lg text-ink-muted">{tagline}</p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
            <ShieldCheck className="size-5 text-brand-600" /> {t("summaryTitle")}
          </h2>
          <p className="mt-3 text-ink leading-relaxed">{summary}</p>
        </Card>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">{labels.profilesHeading}</h2>
          <p className="mt-3 text-sm text-ink-muted">{labels.note}</p>
          <div className="mt-6 space-y-4">
            {picks.map((pick) => {
              const product = getProduct(pick.slug, locale === "de" ? "en" : locale);
              if (!product) return null;
              return (
                <Card key={pick.slug} className="p-6">
                  <div className="flex flex-wrap items-start gap-4">
                    <VPNLogo slug={product.slug} size={56} />
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                          <FileSearch className="mr-1 size-3" /> {labels.profile}
                        </span>
                        <h3 className="text-xl font-semibold text-ink-strong">{product.brand}</h3>
                        <Badge variant="brand">{pick.bestFor}</Badge>
                      </div>
                      <p className="mt-3 text-ink leading-relaxed">{pick.why}</p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button asChild variant="primary" size="sm">
                          <a href={product.pricingUrl} rel="noopener nofollow" target="_blank">
                            {labels.official}<ArrowRight className="size-4" />
                          </a>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/inceleme/${product.slug}`}>{ref.profileLink}</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="max-w-[180px] text-right">
                      <div className="text-xs text-ink-subtle">{labels.documentation}</div>
                      <div className="mt-1 text-sm font-semibold text-brand-700">
                        {product.highlights.audits ?? "—"}
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
            {considerations.map((c) => <div key={c.title}><h3>{c.title}</h3><p>{c.body}</p></div>)}
          </section>
        )}

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>{t("faqHeading")}</h2>
          {faqs.map((f) => <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("relatedHeading")}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {relatedLinks.map((l) => <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">{l.label}</Link>)}
          </div>
        </section>
      </Container>
    </>
  );
}
