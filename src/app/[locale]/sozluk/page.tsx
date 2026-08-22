import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { BookA } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { getGlossary, getCategories } from "@/data/glossary";
import { GlossarySearch } from "@/components/glossary/glossary-search";
import { getLocalizedLinkHref, type AppLocale } from "@/lib/i18n-paths";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "glossary" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/sozluk", locale),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: absoluteUrl("/sozluk", locale),
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
  const localeKey = locale as "tr" | "en";
  const guideWhatIsVpnHref = getLocalizedLinkHref({
    locale: locale as AppLocale,
    section: "guide",
    contentId: "what-is-vpn",
  });
  const guideChecklistHref = getLocalizedLinkHref({
    locale: locale as AppLocale,
    section: "guide",
    contentId: "vpn-security-checklist",
  });
  const glossary = getGlossary(localeKey);
  const categories = getCategories(localeKey);

  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: t("schemaName"),
    inLanguage:
      locale === "en" ? "en" : locale === "de" ? "de" : "tr-TR",
    hasDefinedTerm: glossary.map((term) => ({
      "@type": "DefinedTerm",
      "@id": absoluteUrl(`/sozluk#${term.id}`, locale),
      name: term.term,
      description: term.long,
      inDefinedTermSet: absoluteUrl("/sozluk", locale),
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: t("breadcrumb"), path: "/sozluk" },
          ],
          locale as "tr" | "en" | "de",
        )}
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

        {/* Interactive search + filterable list */}
        <GlossarySearch
          terms={glossary}
          categories={categories}
          locale={localeKey}
        />

        {/* SEO: full static list rendered for crawlers, hidden from visual users */}
        <div className="sr-only" aria-hidden="true">
          {categories.map((cat) => {
            const terms = glossary.filter((term) => term.category === cat);
            if (terms.length === 0) return null;
            return (
              <section key={`seo-${cat}`}>
                <h2>{cat}</h2>
                <dl>
                  {terms.map((term) => (
                    <div key={`seo-${term.id}`}>
                      <dt>{term.term}</dt>
                      <dd>{term.long}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}
        </div>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("relatedPagesHeading")}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href={guideWhatIsVpnHref}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("relatedLinks.whatIsVpn")}
            </Link>
            <Link
              href={guideChecklistHref}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("relatedLinks.checklist")}
            </Link>
            <Link
              href="/metodoloji"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("relatedLinks.methodology")}
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}

