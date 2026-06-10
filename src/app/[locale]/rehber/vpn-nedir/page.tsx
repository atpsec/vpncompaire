import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BookOpen, Lock, Globe, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { contentAlternates } from "@/lib/site";
import {
  getLocalizedPath,
  getLocalizedSectionPath,
  SECTION_HUB_SERVED,
  SECTION_SLUGS,
  DEFAULT_LOCALE,
  type AppLocale,
} from "@/lib/i18n-paths";
import { getWhatIsVpnContent } from "@/content/guides/what-is-vpn";

type Props = { params: Promise<{ locale: string }> };

function asAppLocale(locale: string): AppLocale {
  return locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = getWhatIsVpnContent(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    // Canonical aktif dilin yerelleştirilmiş URL'si; hreflang yalnızca gerçekten
    // servis edilen dilleri işaret eder (bkz. CONTENT_REGISTRY.served).
    alternates: contentAlternates("what-is-vpn", locale),
  };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = asAppLocale(rawLocale);
  const c = getWhatIsVpnContent(locale);

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
      path: getLocalizedPath({ locale, section: "guide", contentId: "what-is-vpn" }),
    },
  ];

  const protectIcons = [Lock, Globe, ShieldCheck];

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
            <BookOpen className="size-3" /> {c.badge}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{c.lede}</p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
            <ShieldCheck className="size-5 text-brand-600" /> {c.oneLine.title}
          </h2>
          <p className="mt-3 text-ink leading-relaxed">{c.oneLine.body}</p>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>{c.howItWorks.h2}</h2>
          <p>{c.howItWorks.intro}</p>
          <ul>
            {c.howItWorks.beforeList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{c.howItWorks.afterIntro}</p>
          <ol>
            {c.howItWorks.afterList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          <h2>{c.protects.h2}</h2>
        </article>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {c.protects.cards.map((card, i) => {
            const Icon = protectIcons[i] ?? ShieldCheck;
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
        </div>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>{c.cantProtect.h2}</h2>
          <p>{c.cantProtect.intro}</p>
          <ul>
            {c.cantProtect.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h2>{c.whenUse.h2}</h2>
          <ul>
            {c.whenUse.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h2>{c.whenNoNeed.h2}</h2>
          <ul>
            {c.whenNoNeed.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{c.protocols.h2}</h2>
          <p>{c.protocols.intro}</p>
          <ul>
            {c.protocols.items.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <h2>{c.choosing.h2}</h2>
          <p>{c.choosing.intro}</p>
          <ol>
            {c.choosing.criteria.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.text}
              </li>
            ))}
          </ol>
          <p>
            {c.choosing.closingBefore}
            <Link href="/en-iyi-vpn">{c.choosing.closingLink}</Link>
            {c.choosing.closingAfter}
          </p>

          <h2>{c.faqHeading}</h2>
          {c.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{c.nextStepLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {c.nextStepLinks.map((link) => (
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
