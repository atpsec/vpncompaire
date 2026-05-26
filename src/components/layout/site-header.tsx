"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

const navItems = [
  { href: "/en-iyi-vpn", labelKey: "reviews" },
  { href: "/karsilastir", labelKey: "compare" },
  { href: "/sana-uygun-vpn", labelKey: "quiz" },
  { href: "/cihazlar", labelKey: "devices" },
  { href: "/rehber", labelKey: "guides" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-base/70 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-baseline gap-1 text-ink-strong font-medium tracking-tight"
            aria-label="vpncompaire home"
          >
            <span className="text-lg">vpn</span>
            <span className="font-display italic text-brand-300 text-xl leading-none">
              compaire
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 text-sm text-ink-muted hover:text-ink-strong hover:bg-surface-muted/60 transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 rounded-full bg-ink-strong px-4 py-1.5 text-xs font-medium text-surface-base hover:bg-brand-300 transition-colors"
            >
              {t("reviews")} →
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("menu")}
            aria-expanded={open}
            className="lg:hidden rounded-full p-2 text-ink hover:bg-surface-muted"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <div
          className={cn(
            "lg:hidden grid transition-[grid-template-rows] duration-200",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <nav
              className="flex flex-col gap-1 pb-4 pt-2"
              aria-label="Mobile"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base text-ink hover:bg-surface-muted/60 hover:text-ink-strong"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="mt-2 pt-3 px-3 border-t border-border">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-subtle">
                  Language
                </p>
                <LanguageSwitcher className="mt-2" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
