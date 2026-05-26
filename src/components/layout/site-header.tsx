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
    <header className="border-b border-ink-strong/80 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-2xl font-medium tracking-tight text-ink-strong italic"
            aria-label="vpncompaire home"
          >
            vpncompaire
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium uppercase tracking-[0.15em] text-ink-muted hover:text-ink-strong"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <span aria-hidden="true" className="h-4 w-px bg-border" />
            <Link
              href="/en-iyi-vpn"
              className="border-b border-ink-strong pb-0.5 text-[13px] font-medium uppercase tracking-[0.15em] text-ink-strong hover:border-brand-600 hover:text-brand-700"
            >
              {t("reviews")} →
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("menu")}
            aria-expanded={open}
            className="lg:hidden rounded-sm p-2 text-ink hover:bg-surface-subtle"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
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
              className="flex flex-col gap-1 pb-6 pt-2"
              aria-label="Mobile"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-1 py-3 text-base font-medium uppercase tracking-[0.12em] text-ink hover:text-brand-700"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="mt-3 border-t border-border pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
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
