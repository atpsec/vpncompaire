import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check, Trophy, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { cn } from "@/lib/utils";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { absoluteUrl, contentAlternates } from "@/lib/site";
import {
  getLocalizedPath,
  getLocalizedSectionPath,
  SECTION_SLUGS,
  DEFAULT_LOCALE,
  type AppLocale,
} from "@/lib/i18n-paths";
import {
  getNordvpnVsSurfsharkContent,
  type NordSurfWinner,
  type NordvpnVsSurfsharkContent,
} from "@/content/comparisons/nordvpn-vs-surfshark";

const CONTENT_ID = "nordvpn-vs-surfshark";

type Props = { params: Promise<{ locale: string }> };

function asAppLocale(locale: string): AppLocale {
  return locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = asAppLocale(locale);
  const c = getNordvpnVsSurfsharkContent(appLocale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: contentAlternates(CONTENT_ID, locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl(
        getLocalizedPath({
          locale: appLocale,
          section: "comparison",
          contentId: CONTENT_ID,
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
  const c = getNordvpnVsSurfsharkContent(locale);
  const nord = getProduct("nordvpn", locale)!;
  const surf = getProduct("surfshark", locale)!;

  // next-intl Link aktif locale prefix'ini kendisi ekler — href prefix'siz.
  const hubHref = `/${SECTION_SLUGS[locale].comparison}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            {
              name: c.breadcrumb.home,
              path: locale === DEFAULT_LOCALE ? "/" : `/${locale}`,
            },
            {
              name: c.breadcrumb.hub,
              path: getLocalizedSectionPath(locale, "comparison"),
            },
            {
              name: c.breadcrumb.current,
              path: getLocalizedPath({
                locale,
                section: "comparison",
                contentId: CONTENT_ID,
              }),
            },
          ],
          locale,
        )}
      />
      <JsonLd data={faqSchema(c.faqs)} />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {c.breadcrumb.home}
          </Link>{" "}
          ›{" "}
          <Link href={hubHref} className="hover:text-ink">
            {c.breadcrumb.hub}
          </Link>{" "}
          ›{" "}
          <span className="text-ink-strong">{c.breadcrumb.current}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">{c.badge}</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{c.lede}</p>
        </header>

        <DataDisclaimer verifiedAt={nord.pricingVerifiedAt} />

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-ink-strong">
                {nord.brand}
              </h2>
              <span className="text-2xl font-bold text-brand-700">
                {nord.score}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{nord.positioning}</p>
            <p className="mt-4 text-sm text-ink leading-relaxed">
              {nord.summary}
            </p>
            <Button asChild variant="primary" className="mt-4 w-full">
              <a
                href={nord.pricingUrl}
                rel="noopener nofollow"
                target="_blank"
              >
                {c.ctaOfficial.nordvpn} <ArrowRight className="size-4" />
              </a>
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-ink-strong">
                {surf.brand}
              </h2>
              <span className="text-2xl font-bold text-brand-700">
                {surf.score}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{surf.positioning}</p>
            <p className="mt-4 text-sm text-ink leading-relaxed">
              {surf.summary}
            </p>
            <Button asChild variant="primary" className="mt-4 w-full">
              <a
                href={surf.pricingUrl}
                rel="noopener nofollow"
                target="_blank"
              >
                {c.ctaOfficial.surfshark} <ArrowRight className="size-4" />
              </a>
            </Button>
          </Card>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            {c.categoriesH2}
          </h2>

          <div className="mt-6 space-y-4">
            {c.categories.map((cat) => (
              <Card key={cat.name} className="p-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold text-ink-strong">
                    {cat.name}
                  </h3>
                  <WinnerBadge winner={cat.winner} content={c} />
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      cat.winner === "nordvpn"
                        ? "bg-success-50 border border-success-100"
                        : "bg-surface-subtle border border-border",
                    )}
                  >
                    <div className="font-medium text-ink-strong flex items-center gap-1">
                      {cat.winner === "nordvpn" && (
                        <Trophy className="size-3.5 text-success-600" />
                      )}
                      NordVPN
                    </div>
                    <p className="mt-1 text-ink-muted">{cat.nord}</p>
                  </div>
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      cat.winner === "surfshark"
                        ? "bg-success-50 border border-success-100"
                        : "bg-surface-subtle border border-border",
                    )}
                  >
                    <div className="font-medium text-ink-strong flex items-center gap-1">
                      {cat.winner === "surfshark" && (
                        <Trophy className="size-3.5 text-success-600" />
                      )}
                      Surfshark
                    </div>
                    <p className="mt-1 text-ink-muted">{cat.surf}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-ink leading-relaxed">
                  <span className="font-medium text-ink-strong">
                    {c.reasonLabel}{" "}
                  </span>
                  {cat.reasoning}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 grid sm:grid-cols-2 gap-6">
          <Card className="p-6 border-brand-200 bg-brand-50/40">
            <h3 className="text-xl font-bold text-ink-strong flex items-center gap-2">
              <Check className="size-5 text-brand-600" />
              {c.chooseNord.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {c.chooseNord.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button asChild variant="primary" className="mt-5 w-full">
              <Link href="/inceleme/nordvpn">{c.chooseNord.cta}</Link>
            </Button>
          </Card>

          <Card className="p-6 border-accent-300 bg-accent-50/40">
            <h3 className="text-xl font-bold text-ink-strong flex items-center gap-2">
              <Check className="size-5 text-accent-600" />
              {c.chooseSurf.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {c.chooseSurf.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button asChild variant="primary" className="mt-5 w-full">
              <Link href="/inceleme/surfshark">{c.chooseSurf.cta}</Link>
            </Button>
          </Card>
        </section>

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>{c.faqHeading}</h2>
          {c.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{c.related.title}</p>
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
            <Link
              href={c.related.allLink.href}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {c.related.allLink.text} <ArrowRight className="size-3" />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}

function WinnerBadge({
  winner,
  content,
}: {
  winner: NordSurfWinner;
  content: NordvpnVsSurfsharkContent;
}) {
  if (winner === "tie") {
    return <Badge variant="neutral">{content.winnerTie}</Badge>;
  }
  return (
    <Badge variant="brand">
      <Trophy className="size-3" /> {content.winnerLeads[winner]}
    </Badge>
  );
}
