import { getLocale } from "next-intl/server";
import { Languages } from "lucide-react";

/**
 * Banner shown at the top of pages whose content is not yet translated to
 * the active locale. The page still renders (in Turkish), but the banner
 * makes it explicit that a localised version is pending.
 *
 * For EN visitors landing on a TR-only page, we don't redirect — that
 * would surprise the user and break their bookmark. We just signal it.
 */
export async function TranslationPendingBanner() {
  const locale = await getLocale();

  // Only show on non-default locales. Default (TR) pages don't need it.
  if (locale === "tr") return null;

  if (locale === "en") {
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
              This page is currently displayed in Turkish. Navigation, footer
              and homepage are localised; detailed guide and review content
              is still being translated.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
