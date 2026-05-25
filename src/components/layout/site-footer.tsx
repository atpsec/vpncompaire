import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const siteLinks = [
  { href: "/en-iyi-vpn", labelKey: "site" as const, key: "reviews" },
] as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface-subtle/60">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
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

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-subtle sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t("copyright")}
          </p>
          <p>
            Affiliate açıklaması:{" "}
            <Link
              href="/reklam-aciklamasi"
              className="underline hover:text-ink"
            >
              {t("links.disclosure")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
