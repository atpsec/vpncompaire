"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/layout/social-links";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { referenceCopy } from "@/lib/reference-copy";

const navItems = [
  { href: "/en-iyi-vpn", key: "profiles" },
  { href: "/karsilastir", key: "compare" },
  { href: "/blog", key: "blog" },
  { href: "/sana-uygun-vpn", key: "quiz" },
  { href: "/cihazlar", key: "devices" },
  { href: "/araclar", key: "tools" },
  { href: "/rehber", key: "guides" },
] as const;

const LABELS = {
  tr: { compare: "Karşılaştırma", blog: "Blog", quiz: "Seçim Aracı", devices: "Cihazlar", tools: "Araçlar", guides: "Rehberler", menu: "Menü", close: "Menüyü kapat", language: "Dil / Language", follow: "Bizi takip et", primary: "Ana navigasyon", mobile: "Mobil menü", home: "VPN Advisor ana sayfa" },
  en: { compare: "Compare", blog: "Blog", quiz: "Selection Tool", devices: "Devices", tools: "Tools", guides: "Guides", menu: "Menu", close: "Close menu", language: "Language", follow: "Follow us", primary: "Primary navigation", mobile: "Mobile menu", home: "VPN Advisor home" },
  de: { compare: "Vergleichen", blog: "Blog", quiz: "Auswahlhilfe", devices: "Geräte", tools: "Tools", guides: "Ratgeber", menu: "Menü", close: "Menü schließen", language: "Sprache", follow: "Folgen", primary: "Hauptnavigation", mobile: "Mobiles Menü", home: "VPN Advisor Startseite" },
} as const;

export function SiteHeader() {
  const rawLocale = useLocale();
  const locale = rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr";
  const labels = LABELS[locale];
  const ref = referenceCopy(locale);
  const [open, setOpen] = useState(false);
  const labelFor = (key: (typeof navItems)[number]["key"]) => key === "profiles" ? ref.navProfiles : labels[key];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-ink-strong font-semibold tracking-tight" aria-label={labels.home}>
            <ShieldCheck className="size-6 text-brand-600" aria-hidden="true" />
            <span className="text-lg">VPN Advisor</span>
          </Link>

          <nav aria-label={labels.primary} className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-subtle transition">{labelFor(item.key)}</Link>)}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle /><LanguageSwitcher /><SocialLinks variant="header" /><span aria-hidden="true" className="h-5 w-px bg-border" />
            <Button asChild variant="primary" size="sm"><Link href="/en-iyi-vpn">{ref.navProfiles} →</Link></Button>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button type="button" aria-label={open ? labels.close : labels.menu} aria-expanded={open} className="rounded-md p-2 text-ink hover:bg-surface-subtle" onClick={() => setOpen((v) => !v)}>{open ? <X className="size-6" /> : <Menu className="size-6" />}</button>
          </div>
        </div>

        <div className={cn("lg:hidden grid transition-[grid-template-rows] duration-200", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-1 pb-4 pt-2" aria-label={labels.mobile}>
              {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-surface-subtle">{labelFor(item.key)}</Link>)}
              <Button asChild variant="primary" size="md" className="mt-2"><Link href="/en-iyi-vpn" onClick={() => setOpen(false)}>{ref.navProfiles}</Link></Button>
              <div className="px-3 mt-3"><p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{labels.language}</p><LanguageSwitcher className="mt-2" /></div>
              <div className="px-3"><p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{labels.follow}</p><SocialLinks variant="menu" className="mt-0 border-t-0 pt-2" /></div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
