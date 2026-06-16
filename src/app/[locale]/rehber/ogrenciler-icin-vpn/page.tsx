import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GraduationCap, BookOpen, Globe, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { AudiencePicks } from "@/components/audience/audience-picks";
import { absoluteUrl, contentAlternates } from "@/lib/site";
import {
  getLocalizedPath,
  getLocalizedSectionPath,
  SECTION_HUB_SERVED,
  SECTION_SLUGS,
  DEFAULT_LOCALE,
  type AppLocale,
} from "@/lib/i18n-paths";
import { getVpnForStudentsContent } from "@/content/guides/vpn-for-students";

type Props = { params: Promise<{ locale: string }> };

function asAppLocale(locale: string): AppLocale {
  return locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = asAppLocale(locale);
  const c = getVpnForStudentsContent(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    // Canonical aktif dilin yerelleştirilmiş URL'si; hreflang yalnızca gerçekten
    // servis edilen dilleri işaret eder (bkz. CONTENT_REGISTRY.served).
    alternates: contentAlternates("vpn-for-students", locale),
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: absoluteUrl(
        getLocalizedPath({
          locale: appLocale,
          section: "guide",
          contentId: "vpn-for-students",
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
  const c = getVpnForStudentsContent(locale);

  // Rehber hub'ı bu dilde yerelleştirilmiş slug ile servis ediliyorsa onu
  // kullan (örn. en -> /guide); aksi halde mevcut TR-slug davranışını koru.
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
        contentId: "vpn-for-students",
      }),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbPaths, locale)} />
      <JsonLd data={faqSchema(c.faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: c.howToName,
          step: c.howToSteps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        }}
      />

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
            <GraduationCap className="size-3" /> {c.badge}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{c.lede}</p>
        </header>

        <AudiencePicks
          heading={c.picksHeading}
          subheading={c.picksSubheading}
          picks={c.picks}
        />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>{c.whyNeed.h2}</h2>
          <p>{c.whyNeed.p}</p>

          <h3>{c.scenarios.h3}</h3>
          <ul>
            {c.scenarios.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h2>{c.pricing.h2}</h2>
          <table>
            <thead>
              <tr>
                {c.pricing.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.pricing.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h2>{c.academic.h2}</h2>
          <p>
            <strong>{c.academic.p1.bold}</strong>
            {c.academic.p1.text}
          </p>
          <p>
            <strong>{c.academic.p2.bold}</strong>
            {c.academic.p2.text}
          </p>

          <h2>{c.abroad.h2}</h2>
          <p>{c.abroad.intro}</p>
          <ul>
            {c.abroad.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h2>{c.stepsHeading}</h2>
          <ol>
            {c.howToSteps.map((s) => (
              <li key={s.name}>
                <strong>{s.name}:</strong> {s.text}
              </li>
            ))}
          </ol>

          <h2>{c.faqHeading}</h2>
          {c.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <section className="mt-12 grid sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <BookOpen className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              {c.cards[0].title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{c.cards[0].desc}</p>
          </Card>
          <Card className="p-5">
            <Globe className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              {c.cards[1].title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{c.cards[1].desc}</p>
          </Card>
          <Card className="p-5">
            <ShieldCheck className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              {c.cards[2].title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{c.cards[2].desc}</p>
          </Card>
        </section>

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
