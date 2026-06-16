import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Wallet, AlertTriangle, Check, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { absoluteUrl, contentAlternates } from "@/lib/site";
import {
  getLocalizedPath,
  getLocalizedSectionPath,
  SECTION_HUB_SERVED,
  SECTION_SLUGS,
  DEFAULT_LOCALE,
  type AppLocale,
} from "@/lib/i18n-paths";
import { getFreeVsPaidVpnContent } from "@/content/guides/free-vs-paid-vpn";

type Props = { params: Promise<{ locale: string }> };

function asAppLocale(locale: string): AppLocale {
  return locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = getFreeVsPaidVpnContent(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    // Canonical aktif dilin yerelleştirilmiş URL'si; hreflang yalnızca gerçekten
    // servis edilen dilleri işaret eder (bkz. CONTENT_REGISTRY.served).
    alternates: contentAlternates("free-vs-paid-vpn", locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl(
        getLocalizedPath({
          locale: asAppLocale(locale),
          section: "guide",
          contentId: "free-vs-paid-vpn",
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
  const c = getFreeVsPaidVpnContent(locale);

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
      name: c.breadcrumb.current,
      path: getLocalizedPath({
        locale,
        section: "guide",
        contentId: "free-vs-paid-vpn",
      }),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbPaths, locale)} />
      <JsonLd data={faqSchema(c.faqs)} />

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
            <Wallet className="size-3" /> {c.badge}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{c.lede}</p>
        </header>

        <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">{c.verdict.title}</p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                {c.verdict.before}
                <strong>{c.verdict.bold}</strong>
                {c.verdict.after}
              </p>
            </div>
          </div>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>{c.howMoney.h2}</h2>
          <p>{c.howMoney.intro}</p>
        </article>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {c.howMoney.cards.map((card) => (
            <Card key={card.title} className="p-5 border-danger-500/30 bg-danger-500/5">
              <X className="size-5 text-danger-500" />
              <h3 className="mt-3 font-semibold text-ink-strong">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{card.desc}</p>
            </Card>
          ))}
        </div>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>{c.protonException.h2}</h2>
          <p>{c.protonException.intro}</p>
          <ul>
            {c.protonException.whyList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{c.protonException.limitsIntro}</p>
          <ul>
            {c.protonException.limitsList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{c.whenPaid.h2}</h2>
        </article>

        <Card className="mt-6 p-6">
          <h3 className="font-semibold text-ink-strong">{c.whenPaid.cardTitle}</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink">
            {c.whenPaid.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="size-4 text-success-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>{c.pricing.h2}</h2>
          <p>{c.pricing.intro}</p>
          <ul>
            {c.pricing.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h2>{c.matrix.h2}</h2>
          <table>
            <thead>
              <tr>
                <th>{c.matrix.colScenario}</th>
                <th>{c.matrix.colRecommendation}</th>
              </tr>
            </thead>
            <tbody>
              {c.matrix.rows.map((row) => (
                <tr key={row.scenario}>
                  <td>{row.scenario}</td>
                  <td>
                    {row.recommendation.map((part, i) =>
                      typeof part === "string" ? (
                        part
                      ) : (
                        <Link key={`${part.href}-${i}`} href={part.href}>
                          {part.label}
                        </Link>
                      ),
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>{c.faqHeading}</h2>
          {c.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
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
