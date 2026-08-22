import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Scale, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import {
  getLocalizedPath,
  getLocalizedSectionPath,
  SECTION_HUB_SERVED,
  SECTION_SLUGS,
  DEFAULT_LOCALE,
  type AppLocale,
} from "@/lib/i18n-paths";
import { getIsVpnLegalInTurkeyContent } from "@/content/guides/is-vpn-legal-in-turkey";

type Props = { params: Promise<{ locale: string }> };

function asAppLocale(locale: string): AppLocale {
  return locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = getIsVpnLegalInTurkeyContent(locale);
  const canonicalPath = getLocalizedPath({
    locale: asAppLocale(locale),
    section: "guide",
    contentId: "is-vpn-legal-in-turkey",
  });
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    // Hukuki içerik güncel mevzuat ve uzman incelemesi tamamlanana kadar
    // kullanıcıya açık kalır; arama dizinine ve hreflang kümesine girmez.
    alternates: { canonical: absoluteUrl(canonicalPath) },
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl(canonicalPath),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = asAppLocale(rawLocale);
  const c = getIsVpnLegalInTurkeyContent(locale);

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
        contentId: "is-vpn-legal-in-turkey",
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
            <Scale className="size-3" /> {c.badge}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            {c.lede.before}
            <strong>{c.lede.bold}</strong>
            {c.lede.after}
          </p>
        </header>

        <Card className="mt-8 p-6 bg-success-50/60">
          <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
            <ShieldCheck className="size-5" /> {c.quickAnswer.h2}
          </h2>
          <ul className="mt-3 space-y-2 text-ink leading-relaxed">
            {c.quickAnswer.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>{c.legalFramework.h2}</h2>
          <p>{c.legalFramework.p1}</p>
          <p>{c.legalFramework.p2}</p>

          <h2>{c.btk.h2}</h2>
          <p>{c.btk.intro}</p>
          <ul>
            {c.btk.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>{c.btk.notice.bold}</strong>
            {c.btk.notice.text}
          </p>

          <h2>{c.illegal.h2}</h2>
          <p>{c.illegal.intro}</p>
          <ul>
            {c.illegal.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{c.illegal.outro}</p>

          <h2>{c.practical.h2}</h2>
          <ul>
            {c.practical.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h2>{c.advice.h2}</h2>
          <ul>
            {c.advice.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
                {item.link ? (
                  <Link href={item.link.href}>{item.link.label}</Link>
                ) : null}
                {item.afterLink}
              </li>
            ))}
          </ul>

          <h2>{c.faqHeading}</h2>
          {c.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <Card className="mt-12 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                {c.disclaimer.title}
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                {c.disclaimer.body}
              </p>
            </div>
          </div>
        </Card>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{c.relatedLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {c.relatedLinks.map((link, i) => {
              const content = (
                <>
                  {link.text}
                  {i === c.relatedLinks.length - 1 ? (
                    <ArrowRight className="size-3" />
                  ) : null}
                </>
              );
              return link.href === "/en-iyi/turkiye" ||
                link.href === "/en-iyi/yurt-disindaki-turkler" ? (
                <a key={link.href} href={link.href} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">
                  {content}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      </Container>
    </>
  );
}
