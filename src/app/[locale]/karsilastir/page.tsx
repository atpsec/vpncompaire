import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { sectionHubAlternates } from "@/lib/site";
import {
  getLocalizedSectionPath,
  SECTION_SLUGS,
  DEFAULT_LOCALE,
  type AppLocale,
} from "@/lib/i18n-paths";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "compareHub" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    // Canonical, dilin yerelleştirilmiş hub slug'ını işaret eder
    // (/karsilastir, /en/comparison, /de/vergleich) — bkz. i18n-paths.ts.
    alternates: sectionHubAlternates("comparison", locale),
  };
}

type Comparison = {
  slug: string;
  title?: string;
  titleKey?: string;
  available: boolean;
  tagKey: "popular" | "highVolume" | "privacyFocused" | "comingSoon";
  pair?: readonly [string, string];
};

const comparisons: readonly Comparison[] = [
  {
    slug: "nordvpn-vs-surfshark",
    title: "NordVPN vs Surfshark",
    available: true,
    tagKey: "popular",
    pair: ["nordvpn", "surfshark"],
  },
  {
    slug: "expressvpn-vs-nordvpn",
    title: "ExpressVPN vs NordVPN",
    available: true,
    tagKey: "highVolume",
    pair: ["expressvpn", "nordvpn"],
  },
  {
    slug: "proton-vs-mullvad",
    title: "Proton VPN vs Mullvad",
    available: true,
    tagKey: "privacyFocused",
    pair: ["proton-vpn", "mullvad"],
  },
  {
    slug: "ucretsiz-vs-ucretli-vpn",
    titleKey: "ucretsiz-vs-ucretli-vpn-title",
    available: false,
    tagKey: "comingSoon",
  },
] as const;

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale: AppLocale =
    locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
  const localeKey = appLocale;
  const t = await getTranslations({ locale, namespace: "compareHub" });
  // Aktif dilin yerelleştirilmiş karşılaştırma section slug'ı (Link locale
  // prefix'ini kendisi ekler) — örn. en: /comparison/<slug>.
  const comparisonBase = `/${SECTION_SLUGS[appLocale].comparison}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            {
              name: t("breadcrumbHome"),
              path: appLocale === DEFAULT_LOCALE ? "/" : `/${appLocale}`,
            },
            {
              name: t("breadcrumbHere"),
              path: getLocalizedSectionPath(appLocale, "comparison"),
            },
          ],
          appLocale,
        )}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {t("breadcrumbHome")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumbHere")}</span>
        </p>

        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1")}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{t("lede")}</p>
        </header>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {comparisons.map((c) => {
            const a = c.pair ? getProduct(c.pair[0], localeKey) : null;
            const b = c.pair ? getProduct(c.pair[1], localeKey) : null;
            const title = c.titleKey
              ? t(`items.${c.titleKey}`)
              : (c.title as string);
            const desc = t(`items.${c.slug}`);

            const inner = (
              <Card
                className={
                  "p-5 h-full " +
                  (c.available
                    ? "hover:border-brand-300 hover:shadow-md transition-all"
                    : "opacity-60 cursor-not-allowed")
                }
              >
                <div className="flex items-center gap-4">
                  {a && b ? (
                    <div className="flex items-center -space-x-2 shrink-0">
                      <VPNLogo
                        slug={a.slug}
                        size={44}
                        className="ring-2 ring-white"
                      />
                      <VPNLogo
                        slug={b.slug}
                        size={44}
                        className="ring-2 ring-white"
                      />
                    </div>
                  ) : null}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h2
                        className={
                          "text-lg font-semibold " +
                          (c.available
                            ? "text-ink-strong group-hover:text-brand-700"
                            : "text-ink-strong")
                        }
                      >
                        {title}
                      </h2>
                      <Badge variant={c.available ? "brand" : "neutral"}>
                        {t(`tags.${c.tagKey}`)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-ink-muted">{desc}</p>

                {a && b ? (
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <ScoreCell brand={a.brand} score={a.score} />
                    <ScoreCell brand={b.brand} score={b.score} />
                  </dl>
                ) : null}

                {c.available && (
                  <div className="mt-4 inline-flex items-center text-xs font-medium text-brand-700">
                    {t("readComparison")} <ArrowRight className="ml-1 size-3" />
                  </div>
                )}
              </Card>
            );

            return c.available ? (
              <Link
                key={c.slug}
                href={`${comparisonBase}/${c.slug}`}
                className="group"
              >
                {inner}
              </Link>
            ) : (
              <div key={c.slug}>{inner}</div>
            );
          })}
        </div>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("footerKicker")}</p>
          <Link
            href="/en-iyi-vpn"
            className="mt-2 inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:underline"
          >
            {t("footerLink")} <ArrowRight className="size-4" />
          </Link>
        </section>
      </Container>
    </>
  );
}

function ScoreCell({ brand, score }: { brand: string; score: number }) {
  return (
    <div className="rounded-md bg-surface-subtle/60 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-ink-subtle font-medium line-clamp-1">
        {brand}
      </div>
      <div className="mt-0.5 flex items-baseline gap-0.5">
        <span className="text-base font-bold text-ink-strong tabular-nums">
          {score.toFixed(1)}
        </span>
        <span className="text-[10px] text-ink-subtle">/10</span>
      </div>
    </div>
  );
}
