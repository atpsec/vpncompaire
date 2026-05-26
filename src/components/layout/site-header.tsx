"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Terminal, Search } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-sm font-semibold text-ink-strong"
              aria-label="vpncompaire home"
            >
              <Terminal className="size-4 text-brand-600" aria-hidden="true" />
              <span>vpncompaire</span>
              <span className="hidden sm:inline text-ink-faint">/</span>
              <span className="hidden sm:inline text-ink-subtle font-normal">
                v2026.05
              </span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-0.5"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded px-2.5 py-1.5 text-[13px] font-medium text-ink-muted hover:text-ink-strong hover:bg-surface-muted"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-2 rounded border border-border bg-surface-subtle/70 px-2 py-1 text-[11px] text-ink-subtle">
              <Search className="size-3" />
              <span className="font-mono">{t("search")}</span>
              <kbd className="font-mono rounded bg-background border border-border px-1 text-[10px] text-ink-muted">
                ⌘K
              </kbd>
            </div>
            <LanguageSwitcher />
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 rounded bg-ink-strong px-2.5 py-1.5 text-[12px] font-medium text-surface-base hover:bg-ink"
            >
              {t("reviews")}
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("menu")}
            aria-expanded={open}
            className="lg:hidden rounded p-1.5 text-ink hover:bg-surface-muted"
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
            <nav className="flex flex-col gap-0.5 pb-3 pt-1" aria-label="Mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded px-2.5 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="mt-2 border-t border-border pt-3 px-2.5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
                  Language
                </p>
                <LanguageSwitcher className="mt-1.5" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
