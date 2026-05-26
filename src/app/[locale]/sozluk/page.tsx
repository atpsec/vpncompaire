import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { BookA } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { glossary, categories } from "@/data/glossary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "glossary" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: absoluteUrl("/sozluk") },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: absoluteUrl("/sozluk"),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GlossaryPageView />;
}

function GlossaryPageView() {
  const t = useTranslations("glossary");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: t("schemaName"),
    inLanguage: locale === "en" ? "en" : "tr-TR",
    hasDefinedTerm: glossary.map((term) => ({
      "@type": "DefinedTerm",
      "@id": absoluteUrl(`/sozluk#${term.id}`),
      name: term.term,
      description: term.long,
      inDefinedTermSet: absoluteUrl("/sozluk"),
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), path: "/" },
          { name: t("breadcrumb"), path: "/sozluk" },
        ])}
      />
      <JsonLd data={definedTermSet} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {tNav("home")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumb")}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <BookA className="size-3" /> {t("badgeLabel")}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1")}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{t("intro")}</p>
        </header>

        <nav aria-label={t("categoriesAria")} className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#cat-${cat}`}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              {cat}
            </a>
          ))}
        </nav>

        {categories.map((cat) => {
          const terms = glossary.filter((term) => term.category === cat);
          if (terms.length === 0) return null;
          return (
            <section key={cat} id={`cat-${cat}`} className="mt-12 scroll-mt-20">
              <h2 className="text-2xl font-bold text-ink-strong">{cat}</h2>
              <div className="mt-4 grid gap-3">
                {terms.map((term) => (
                  <Card
                    key={term.id}
                    id={term.id}
                    className="p-5 scroll-mt-20 hover:border-brand-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-ink-strong">
                          {term.term}
                        </h3>
                        <p className="mt-1 text-sm text-ink-muted">
                          {term.short}
                        </p>
                      </div>
                      <Badge variant="outline">{term.category}</Badge>
                    </div>
                    <p className="mt-3 text-sm text-ink leading-relaxed">
                      {term.long}
                    </p>
                    {term.related && term.related.length > 0 ? (
                      <p className="mt-3 text-xs text-ink-muted">
                        {t("relatedLabel")}
                        {term.related.map((rid, i) => {
                          const r = glossary.find((g) => g.id === rid);
                          if (!r) return null;
                          return (
                            <span key={rid}>
                              <a
                                href={`#${rid}`}
                                className="text-brand-700 hover:underline"
                              >
                                {r.term}
                              </a>
                              {i < (term.related!.length - 1) ? ", " : ""}
                            </span>
                          );
                        })}
                      </p>
                    ) : null}
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("relatedPagesHeading")}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/rehber/vpn-nedir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("relatedLinks.whatIsVpn")}
            </Link>
            <Link
              href="/rehber/vpn-guvenlik-kontrol-listesi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("relatedLinks.checklist")}
            </Link>
            <Link
              href="/metodoloji"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("relatedLinks.methodology")}
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
