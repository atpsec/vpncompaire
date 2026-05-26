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
    <header className="border-b-[3px] border-ink-strong bg-surface-base">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-0"
            aria-label="vpncompaire home"
          >
            <span className="bg-ink-strong text-accent-400 font-bold text-base uppercase tracking-tight px-2.5 py-1.5">
              vpn
            </span>
            <span className="bg-accent-400 text-ink-strong font-bold text-base uppercase tracking-tight px-2.5 py-1.5 border-r-[3px] border-y-[3px] border-ink-strong">
              compaire
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink-strong px-3.5 py-2 hover:bg-accent-400"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 bg-ink-strong text-surface-base px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest border-[2px] border-ink-strong hover:bg-accent-400 hover:text-ink-strong"
            >
              {t("reviews")} →
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("menu")}
            aria-expanded={open}
            className="lg:hidden p-2 border-[2px] border-ink-strong text-ink-strong hover:bg-accent-400"
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
              className="flex flex-col gap-0 pb-3 pt-3 border-t-[3px] border-ink-strong"
              aria-label="Mobile"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-widest font-bold text-ink-strong px-2.5 py-2.5 border-b-[2px] border-ink-strong last:border-b-0 hover:bg-accent-400"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t-[2px] border-ink-strong px-2.5">
                <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-ink-strong">
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
