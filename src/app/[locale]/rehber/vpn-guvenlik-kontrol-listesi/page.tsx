import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check, ListChecks } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, contentAlternates } from "@/lib/site";
import {
  getLocalizedPath,
  getLocalizedSectionPath,
  SECTION_HUB_SERVED,
  SECTION_SLUGS,
  DEFAULT_LOCALE,
  type AppLocale,
} from "@/lib/i18n-paths";
import { getVpnSecurityChecklistContent } from "@/content/guides/vpn-security-checklist";

type Props = { params: Promise<{ locale: string }> };

function asAppLocale(locale: string): AppLocale {
  return locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = getVpnSecurityChecklistContent(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    // Canonical aktif dilin yerelleştirilmiş URL'si; hreflang yalnızca gerçekten
    // servis edilen dilleri işaret eder (bkz. CONTENT_REGISTRY.served).
    alternates: contentAlternates("vpn-security-checklist", locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl(
        getLocalizedPath({
          locale: asAppLocale(locale),
          section: "guide",
          contentId: "vpn-security-checklist",
        }),
      ),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = asAppLocale(rawLocale);
  const c = getVpnSecurityChecklistContent(locale);

  // next-intl Link, aktif locale prefix'ini kendisi ekler — href prefix'siz.
  const guideHubServed = SECTION_HUB_SERVED.guide?.includes(locale) ?? false;
  const guideHubHref = `/${guideHubServed ? SECTION_SLUGS[locale].guide : SECTION_SLUGS[DEFAULT_LOCALE].guide}`;

  const breadcrumbPaths = [
    { name: c.breadcrumb.home, path: locale === DEFAULT_LOCALE ? "/" : `/${locale}` },
    {
      name: c.breadcrumb.guides,
      path: guideHubServed
        ? getLocalizedSectionPath(locale, "guide")
        : `${locale === DEFAULT_LOCALE ? "" : `/${locale}`}/${SECTION_SLUGS[DEFAULT_LOCALE].guide}`,
    },
    {
      name: c.breadcrumb.schemaName,
      path: getLocalizedPath({
        locale,
        section: "guide",
        contentId: "vpn-security-checklist",
      }),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbPaths, locale)} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {c.breadcrumb.home}
          </Link>{" "}
          ›{" "}
          <Link href={guideHubHref} className="hover:text-ink">
            {c.breadcrumb.guides}
          </Link>{" "}
          › <span className="text-ink-strong">{c.breadcrumb.current}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <ListChecks className="size-3" /> {c.badge}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{c.lede}</p>
        </header>

        <ol className="mt-10 space-y-4">
          {c.items.map((item) => (
            <Card key={item.title} className="p-6">
              <div className="flex items-start gap-3">
                <div className="inline-flex items-center justify-center size-6 rounded-full bg-success-50 text-success-700 shrink-0 mt-0.5">
                  <Check className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-ink-strong">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-ink-muted">
                    {item.question}
                  </p>
                  <p className="mt-2 text-ink leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </ol>

        <Card className="mt-12 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong">
            {c.howToUse.h2}
          </h2>
          <p className="mt-3 text-ink leading-relaxed">
            {c.howToUse.before}
            <Link href="/en-iyi-vpn" className="text-brand-700 underline">
              {c.howToUse.linkText}
            </Link>
            {c.howToUse.after}
          </p>
        </Card>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{c.relatedLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {c.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
