"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { getLocalizedBlogSlug, type BlogLocale } from "@/lib/blog-slugs";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "tr", label: "TR", name: "Türkçe" },
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
] as const;

// Açık dil seçimini cookie'ye yaz — proxy.ts'teki geo (IP) yönlendirmesi bu
// cookie'yi her şeyin üstünde tutar, aksi halde TR'ye geçen yurt dışı
// ziyaretçi sürekli /en'e geri atılırdı. (Modül seviyesinde: component
// içinde document.cookie ataması immutability lint kuralını tetikliyor.)
function persistLocaleCookie(target: string) {
  document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
}

type Props = {
  className?: string;
};

export function LanguageSwitcher({ className }: Props) {
  const locale = useLocale() as BlogLocale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("a11y");

  function localizedPathFor(target: BlogLocale) {
    const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
    if (!blogMatch) return pathname;

    const targetSlug = getLocalizedBlogSlug(blogMatch[1], locale, target);
    return targetSlug ? `/blog/${targetSlug}` : pathname;
  }

  function switchTo(target: BlogLocale) {
    if (target === locale) return;
    persistLocaleCookie(target);
    router.replace(localizedPathFor(target), { locale: target });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-border bg-surface-base p-0.5",
        className,
      )}
      role="group"
      aria-label={t("langGroup")}
    >
      <Globe
        className="size-3.5 text-ink-muted ml-1.5 mr-0.5"
        aria-hidden="true"
      />
      {LOCALES.map((l) => {
        const active = l.code === locale;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => switchTo(l.code)}
            aria-current={active ? "true" : undefined}
            aria-label={l.name}
            className={cn(
              "rounded px-2 py-1 text-[11px] font-semibold tracking-wide transition-colors",
              active
                ? "bg-brand-600 text-white"
                : "text-ink-muted hover:text-ink-strong hover:bg-surface-subtle",
            )}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
