import { useLocale, useTranslations } from "next-intl";
import {
  BookOpen,
  ExternalLink,
  Info,
  Link2,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { SiteMark } from "@/components/brand/site-mark";
import { getLocalizedLinkHref, type AppLocale } from "@/lib/i18n-paths";
import { SocialLinks, SOCIAL_LINKS_ENABLED } from "@/components/layout/social-links";
import { DomainRatingBadge } from "@/components/layout/domain-rating-badge";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tDisclosure = useTranslations("disclosure");
  const locale = useLocale() as AppLocale;
  const comparisonHref = getLocalizedLinkHref({ locale, section: "comparison" });
  const guideHref = getLocalizedLinkHref({ locale, section: "guide" });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface-subtle/60">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          <div className="col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-ink-strong"
            >
              <SiteMark className="size-5 text-brand-600" />
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-ink-muted">
              {t("tagline")}
            </p>

            <div className="mt-6 space-y-4">
              <section
                aria-labelledby="external-profiles-heading"
                className="rounded-2xl border border-brand-100/80 bg-gradient-to-br from-background via-background to-brand-50/60 p-4 shadow-sm dark:border-brand-900/70 dark:from-surface-base dark:via-surface-base dark:to-brand-950/30"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                    <Link2 className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 id="external-profiles-heading" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                      {t("trust.profilesTitle")}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      {t("trust.profilesSubtitle")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex min-h-[68px] min-w-0 items-center justify-center rounded-xl border border-border/80 bg-background/75 px-2 py-2 shadow-sm transition hover:border-brand-200 hover:shadow-md dark:bg-surface-base/70">
                    <DomainRatingBadge />
                  </div>
                  <a
                    className="group flex min-h-[68px] min-w-0 items-center justify-center rounded-xl border border-border/80 bg-background/75 px-2 py-2 shadow-sm transition hover:border-brand-200 hover:shadow-md dark:bg-surface-base/70"
                    href="https://www.scrolllaunch.com/products/vpn-advisor?ref=badge"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("trust.scrollLaunchLabel")}
                  >
                    {/* Keep the partner-provided embed exact so it remains in the server HTML. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-12 w-auto max-w-full" src="https://www.scrolllaunch.com/api/badge/vpn-advisor" alt="Featured on ScrollLaunch" width="220" height="48" loading="lazy" />
                  </a>
                </div>
              </section>

              <section
                aria-labelledby="independent-resources-heading"
                className="rounded-xl border border-border/80 bg-background/60 p-4"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-ink-muted" aria-hidden="true" />
                  <h2 id="independent-resources-heading" className="text-sm font-semibold text-ink-strong">
                    {t("trust.resourcesTitle")}
                  </h2>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  {t("trust.resourcesSubtitle")}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  <li>
                    <a className="inline-flex items-center gap-1 font-medium text-brand-700 hover:underline" href="https://www.privacyguides.org/en/vpn/" target="_blank" rel="noopener noreferrer">
                      {t("trust.privacyGuides")} <ExternalLink className="size-3" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a className="inline-flex items-center gap-1 font-medium text-brand-700 hover:underline" href="https://www.av-comparatives.org/tests/vpn-report-2020-35-services/" target="_blank" rel="noopener noreferrer">
                      {t("trust.avComparatives")} <ExternalLink className="size-3" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a className="inline-flex items-center gap-1 font-medium text-brand-700 hover:underline" href="https://ssd.eff.org/" target="_blank" rel="noopener noreferrer">
                      {t("trust.eff")} <ExternalLink className="size-3" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </section>
            </div>

            {SOCIAL_LINKS_ENABLED && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {t("sections.follow")}
                </p>
                <div className="mt-2">
                  <SocialLinks />
                </div>
                <p className="mt-2 text-[11px] text-ink-subtle">
                  {t("socialSoon")}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-strong">
              {t("sections.site")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/vpn-reviews"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("reviews")}
                </Link>
              </li>
              <li>
                <Link
                  href={comparisonHref}
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("compare")}
                </Link>
              </li>
              <li>
                <Link
                  href="/devices"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("devices")}
                </Link>
              </li>
              <li>
                <Link
                  href={guideHref}
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("guides")}
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("methodology")}
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("research")}
                </Link>
              </li>
              <li>
                <Link
                  href="/research/evidence-ledger"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.evidenceLedger")}
                </Link>
              </li>
              <li>
                <Link
                  href="/research/transparency-index"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.transparencyIndex")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-strong">
              {t("sections.tools")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/quiz"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("quiz")}
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("calculator")}
                </Link>
              </li>
              <li>
                <Link
                  href="/server-map"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("filter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/glossary"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("glossary")}
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.cancel")}
                </Link>
              </li>
              <li>
                <Link
                  href="/security-tools"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.security")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-strong">
              {t("sections.legal")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.disclosure")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal-notice"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.legalNotice")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.cookies")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclosure — moved here from top banner: visible but not in the way */}
        <div className="mt-10 rounded-lg border border-border/70 bg-background/60 p-4">
          <div className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted">
            <Info
              className="mt-0.5 size-4 shrink-0 text-accent-600"
              aria-hidden="true"
            />
            <p>
              <span className="font-semibold text-ink">
                {t("disclosureTitle")}
              </span>{" "}
              {tDisclosure("banner")}{" "}
              <Link
                href="/affiliate-disclosure"
                className="font-medium text-brand-700 hover:underline whitespace-nowrap"
              >
                {tDisclosure("learnMore")} →
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-subtle sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t("copyright")}
          </p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
