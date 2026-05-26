"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { Languages } from "lucide-react";

const FULLY_TRANSLATED_PATHS = new Set([
  "/",
  "/metodoloji",
  "/en-iyi-vpn",
  "/en-iyi",
  "/sana-uygun-vpn",
  "/hesaplayici",
]);

const FULLY_TRANSLATED_PREFIXES: string[] = [];

function isFullyTranslated(pathname: string): boolean {
  if (FULLY_TRANSLATED_PATHS.has(pathname)) return true;
  return FULLY_TRANSLATED_PREFIXES.some((p) => pathname.startsWith(p));
}

export function TranslationPendingBanner() {
  const locale = useLocale();
  const pathname = usePathname();

  if (locale === "tr") return null;
  if (locale !== "en") return null;
  if (isFullyTranslated(pathname)) return null;

  return (
    <div className="border-b border-accent-300 bg-accent-50/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-start gap-2 text-xs leading-relaxed text-ink">
          <Languages
            className="size-4 shrink-0 text-accent-600 mt-0.5"
            aria-hidden="true"
          />
          <p>
            <span className="font-semibold">
              English translation in progress.
            </span>{" "}
            The page chrome is in English, but the main article content on
            this page is still being translated from Turkish.
          </p>
        </div>
      </div>
    </div>
  );
}
