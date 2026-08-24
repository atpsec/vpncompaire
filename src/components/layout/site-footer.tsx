import { useLocale, useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { SiteMark } from "@/components/brand/site-mark";
import { getLocalizedLinkHref, type AppLocale } from "@/lib/i18n-paths";
import { SocialLinks, SOCIAL_LINKS_ENABLED } from "@/components/layout/social-links";

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
