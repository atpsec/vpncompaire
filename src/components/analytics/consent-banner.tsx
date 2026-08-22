"use client";

import { useState, useSyncExternalStore } from "react";

// Onay tercihi localStorage'da saklanır. Değerler: "granted" | "denied".
const CONSENT_KEY = "vpnadvisor:consent";

type SupportedLocale = "tr" | "en" | "de";

const COPY = {
  tr: {
    title: "Çerez ve analitik tercihi",
    text: "Site trafiğini ölçmek için Google Analytics kullanıyoruz. Analitik çerezler yalnızca onayınızla etkinleştirilir.",
    learnMore: "Çerez politikası",
    reject: "Reddet",
    accept: "Kabul et",
  },
  en: {
    title: "Cookie and analytics preference",
    text: "We use Google Analytics to measure site traffic. Analytics cookies are enabled only with your consent.",
    learnMore: "Cookie policy",
    reject: "Reject",
    accept: "Accept",
  },
  de: {
    title: "Cookie- und Analyse-Einstellung",
    text: "Wir verwenden Google Analytics zur Messung des Website-Traffics. Analyse-Cookies werden nur mit Ihrer Zustimmung aktiviert.",
    learnMore: "Cookie-Richtlinie",
    reject: "Ablehnen",
    accept: "Akzeptieren",
  },
} as const;

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
 * Root layout seviyesinde render edildiği için herhangi bir next-intl client
 * context'ine bağımlı değildir; locale sunucu layout'undan prop olarak gelir.
 */
export function ConsentBanner({ locale }: { locale: SupportedLocale }) {
  const copy = COPY[locale];
  const mounted = useMounted();
  const cookiePolicyHref =
    locale === "tr" ? "/cerez-politikasi" : `/${locale}/cerez-politikasi`;

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
      role="region"
      aria-live="polite"
      aria-label={copy.title}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface-base/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-surface-base/80"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-w-0 text-sm text-ink-muted">
          {copy.text}{" "}
          <a
            href={cookiePolicyHref}
            className="font-medium text-brand-700 hover:underline"
          >
            {copy.learnMore}
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink-strong"
          >
            {copy.reject}
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
