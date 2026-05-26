import { useTranslations } from "next-intl";
import { ShieldCheck, Info } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { SocialLinks } from "@/components/layout/social-links";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tDisclosure = useTranslations("disclosure");
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
              <ShieldCheck className="size-5 text-brand-600" />
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-ink-muted">
              {t("tagline")}
            </p>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {t("sections.follow")}
              </p>
              <div className="mt-2">
                <SocialLinks />
              </div>
              <p className="mt-2 text-[11px] text-ink-subtle">
                Sosyal medya hesapları yakında.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-strong">
              {t("sections.site")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/en-iyi-vpn"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("reviews")}
                </Link>
              </li>
              <li>
                <Link
                  href="/karsilastir"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("compare")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cihazlar"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("devices")}
                </Link>
              </li>
              <li>
                <Link
                  href="/rehber"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("guides")}
                </Link>
              </li>
              <li>
                <Link
                  href="/metodoloji"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("methodology")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
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
                  href="/sana-uygun-vpn"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("quiz")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hesaplayici"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("calculator")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sunucu-haritasi"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("filter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sozluk"
                  className="text-ink-muted hover:text-ink"
                >
                  {tNav("glossary")}
                </Link>
              </li>
              <li>
                <Link
                  href="/iptal-ve-iade"
                  className="text-ink-muted hover:text-ink"
                >
                  İptal & İade
                </Link>
              </li>
              <li>
                <Link
                  href="/guvenlik-araclari"
                  className="text-ink-muted hover:text-ink"
                >
                  Güvenlik araçları
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
                  href="/reklam-aciklamasi"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.disclosure")}
                </Link>
              </li>
              <li>
                <Link
                  href="/yasal-uyari"
                  className="text-ink-muted hover:text-ink"
                >
                  Yasal Uyarı
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sartlar"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("links.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
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
                href="/reklam-aciklamasi"
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
