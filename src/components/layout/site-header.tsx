"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Activity, Menu, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { SiteMark } from "@/components/brand/site-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { getLocalizedLinkHref, type AppLocale } from "@/lib/i18n-paths";

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale() as AppLocale;
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navItems = [
    { href: "/vpn-reviews", labelKey: "reviews" },
    { href: getLocalizedLinkHref({ locale, section: "comparison" }), labelKey: "compare" },
    { href: "/blog", labelKey: "blog" },
    { href: "/quiz", labelKey: "quiz" },
    { href: "/devices", labelKey: "devices" },
    { href: "/tools", labelKey: "tools" },
    { href: "/tools/what-websites-can-see", labelKey: "snapshot", featured: true },
    { href: "/research", labelKey: "research" },
    { href: getLocalizedLinkHref({ locale, section: "guide" }), labelKey: "guides" },
  ] as const;

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-ink-strong font-semibold tracking-tight"
            aria-label={t("homeAria")}
          >
            <SiteMark className="size-6 text-brand-600" />
            <span className="text-lg">VPN Advisor</span>
          </Link>

          <nav
            aria-label={t("primaryNav")}
            className="hidden lg:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={"featured" in item ? t("snapshotAria") : undefined}
                className={
                  "featured" in item
                    ? "group inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50/70 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm transition hover:border-brand-300 hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-300 dark:hover:border-brand-700 dark:hover:bg-brand-900/50"
                    : "rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface-subtle hover:text-ink"
                }
              >
                {"featured" in item ? (
                  <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-400 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-success-500" />
                  </span>
                ) : null}
                {"featured" in item ? <Activity className="size-3.5" aria-hidden="true" /> : null}
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <span aria-hidden="true" className="h-5 w-px bg-border" />
            <Button asChild variant="primary" size="sm">
              <Link href="/vpn-reviews">{t("reviews")} →</Link>
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? t("closeMenu") : t("menu")}
              aria-expanded={open}
              aria-controls="mobile-primary-navigation"
              className="rounded-md p-2 text-ink hover:bg-surface-subtle"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-primary-navigation" className="lg:hidden">
            <nav className="flex flex-col gap-1 pb-4 pt-2" aria-label={t("mobileNav")}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-label={"featured" in item ? t("snapshotAria") : undefined}
                  className={
                    "featured" in item
                      ? "inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-3 text-base font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-300"
                      : "rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-surface-subtle"
                  }
                >
                  {"featured" in item ? <Activity className="size-4" aria-hidden="true" /> : null}
                  {t(item.labelKey)}
                </Link>
              ))}
              <Button asChild variant="primary" size="md" className="mt-2">
                <Link href="/vpn-reviews" onClick={() => setOpen(false)}>
                  {t("reviews")}
                </Link>
              </Button>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
