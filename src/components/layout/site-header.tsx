"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/layout/social-links";
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-ink-strong font-semibold tracking-tight"
            aria-label="vpncompaire ana sayfa"
          >
            <ShieldCheck className="size-6 text-brand-600" aria-hidden="true" />
            <span className="text-lg">vpncompaire</span>
          </Link>

          <nav
            aria-label="Ana navigasyon"
            className="hidden lg:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-subtle transition"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <SocialLinks variant="header" />
            <span aria-hidden="true" className="h-5 w-px bg-border" />
            <Button asChild variant="primary" size="sm">
              <Link href="/en-iyi-vpn">{t("reviews")} →</Link>
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("menu")}
            aria-expanded={open}
            className="lg:hidden rounded-md p-2 text-ink hover:bg-surface-subtle"
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
            <nav className="flex flex-col gap-1 pb-4 pt-2" aria-label="Mobil menü">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-surface-subtle"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <Button asChild variant="primary" size="md" className="mt-2">
                <Link href="/en-iyi-vpn" onClick={() => setOpen(false)}>
                  En İyi VPN&apos;leri Gör
                </Link>
              </Button>
              <div className="px-3 mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Dil / Language
                </p>
                <LanguageSwitcher className="mt-2" />
              </div>
              <div className="px-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Bizi takip et
                </p>
                <SocialLinks variant="menu" className="mt-0 border-t-0 pt-2" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
