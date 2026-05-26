"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Heart } from "lucide-react";
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
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <div className="rounded-3xl border-2 border-border bg-background/80 backdrop-blur px-4 sm:px-5">
          <div className="flex h-14 items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-ink-strong font-extrabold tracking-tight"
              aria-label="vpncompaire home"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-white">
                <Heart className="size-4 fill-white" aria-hidden="true" />
              </span>
              <span className="text-lg">vpncompaire</span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-1"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3.5 py-1.5 text-sm font-bold text-ink-muted hover:text-ink-strong hover:bg-surface-subtle"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <Link
                href="/en-iyi-vpn"
                className="inline-flex items-center gap-1 rounded-2xl bg-accent-500 px-4 py-1.5 text-sm font-bold text-white hover:bg-accent-600"
              >
                {t("reviews")} →
              </Link>
            </div>

            <button
              type="button"
              aria-label={open ? t("closeMenu") : t("menu")}
              aria-expanded={open}
              className="lg:hidden rounded-2xl p-2 text-ink hover:bg-surface-subtle"
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
                    className="rounded-2xl px-3 py-2.5 text-base font-bold text-ink hover:bg-surface-subtle"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
                <div className="mt-2 px-3 pt-3 border-t border-border">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-subtle">
                    Language
                  </p>
                  <LanguageSwitcher className="mt-2" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
