"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// Onay tercihi localStorage'da saklanır. Değerler: "granted" | "denied".
const CONSENT_KEY = "vpnadvisor:consent";

// useSyncExternalStore tabanlı mounted hook — "setState in effect" lint
// kuralını tetiklemeden hydration mismatch'i önler (theme-toggle ile aynı).
const subscribe = () => () => {};
function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot: mounted
    () => false, // server snapshot: not mounted
  );
}

/**
 * Çerez onay banner'ı (Google Consent Mode v2).
 *
 * Önceki onay (granted/denied) varsa banner gösterilmez. "granted" durumunda
 * GA'ya analitik onayı google-analytics.tsx içindeki inline script tarafından
 * (sayfa yüklenirken localStorage okunarak) zaten iletilir. Bu bileşen yalnızca
 * henüz seçim yapmamış kullanıcıya banner gösterir.
 */
export function ConsentBanner() {
  const t = useTranslations("consent");
  const mounted = useMounted();

  // Lazy initializer — ilk render'dan önce localStorage'ı okur.
  const [decided, setDecided] = useState<boolean>(() => {
    if (typeof window === "undefined") return true; // SSR: banner gösterme
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      return v === "granted" || v === "denied";
    } catch {
      return false;
    }
  });

  function choose(granted: boolean) {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      // sessizce geç — onay kalıcı olmasa da UX bloklanmaz
    }
    const value = granted ? "granted" : "denied";
    window.gtag?.("consent", "update", {
      analytics_storage: value,
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
    });
    setDecided(true);
  }

  if (!mounted || decided) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface-base/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-surface-base/80"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-w-0 text-sm text-ink-muted">
          {t("text")}{" "}
          <Link
            href="/cerez-politikasi"
            className="font-medium text-brand-700 hover:underline"
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink-strong"
          >
            {t("reject")}
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
