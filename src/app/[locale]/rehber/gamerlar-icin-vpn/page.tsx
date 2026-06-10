import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Gamepad2, Zap, Shield, Globe } from "lucide-react";
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
import { getGamersContent } from "@/content/guides/vpn-for-gamers";

type Props = { params: Promise<{ locale: string }> };

function asAppLocale(locale: string): AppLocale {
  return locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = getGamersContent(locale);
  const url = absoluteUrl(
    getLocalizedPath({
      locale: asAppLocale(locale),
      section: "guide",
      contentId: "vpn-for-gamers",
    }),
  );
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    // Canonical aktif dilin yerelleştirilmiş URL'si; hreflang yalnızca gerçekten
    // servis edilen dilleri işaret eder (bkz. CONTENT_REGISTRY.served).
    alternates: contentAlternates("vpn-for-gamers", locale),
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url,
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = asAppLocale(rawLocale);
  const c = getGamersContent(locale);

  // Rehber hub'ı bu dilde yerelleştirilmiş slug ile servis ediliyorsa onu
  // kullan; next-intl Link, aktif locale prefix'ini kendisi ekler.
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
        contentId: "vpn-for-gamers",
      }),
    },
  ];

  const cardIcons = [Zap, Shield, Globe];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbPaths)} />
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
            <Gamepad2 className="size-3" /> {c.badge}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{c.lede}</p>
        </header>

        <AudiencePicks
          heading={c.picks.heading}
          subheading={c.picks.subheading}
          picks={c.picks.items}
        />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>{c.whenMakesSense.h2}</h2>

          <h3>{c.whenMakesSense.good.h3}</h3>
          <ul>
            {c.whenMakesSense.good.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h3>{c.whenMakesSense.bad.h3}</h3>
          <ul>
            {c.whenMakesSense.bad.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h2>{c.pingImpact.h2}</h2>
          <p>{c.pingImpact.intro}</p>
          <table>
            <thead>
              <tr>
                {c.pingImpact.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.pingImpact.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>{c.pingImpact.resultBold}</strong>
            {c.pingImpact.resultText}
          </p>

          <h2>{c.ddos.h2}</h2>
          <p>{c.ddos.intro}</p>
          <ol>
            {c.ddos.layers.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ol>
          <p>{c.ddos.outro}</p>

          <h2>{c.regionHopping.h2}</h2>
          {c.regionHopping.paragraphs.map((item) => (
            <p key={item.bold}>
              <strong>{item.bold}</strong>
              {item.text}
            </p>
          ))}

          <h2>{c.console.h2}</h2>
          <p>{c.console.intro}</p>
          <ol>
            {c.console.steps.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
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
          {c.cards.map((card, i) => {
            const Icon = cardIcons[i] ?? Zap;
            return (
              <Card key={card.title} className="p-5">
                <Icon className="size-6 text-brand-600" />
                <h3 className="mt-3 font-semibold text-ink-strong">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{card.desc}</p>
              </Card>
            );
          })}
        </section>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{c.related.label}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {c.related.links.map((link) => (
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
