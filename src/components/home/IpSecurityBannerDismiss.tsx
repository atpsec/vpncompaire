"use client";

import { useSyncExternalStore, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "vpncompaire:ip-banner-dismissed-at";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function readDismissedSnapshot(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    return Number.isFinite(ts) && Date.now() - ts < SEVEN_DAYS_MS;
  } catch {
    return false;
  }
}

function readServerSnapshot(): boolean {
  return false;
}

function subscribeToStorage(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function IpSecurityBannerDismiss({
  children,
  dismissLabel,
}: {
  children: React.ReactNode;
  dismissLabel: string;
}) {
  const dismissedFromStorage = useSyncExternalStore(
    subscribeToStorage,
    readDismissedSnapshot,
    readServerSnapshot,
  );
  const [dismissedThisRender, setDismissedThisRender] = useState(false);

  if (dismissedFromStorage || dismissedThisRender) return null;

  return (
    <div className="relative">
      {children}
      <button
        type="button"
        aria-label={dismissLabel}
        onClick={() => {
          try {
            window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
          } catch {
            // storage blocked — fall back to per-session hide
          }
          setDismissedThisRender(true);
        }}
        className="absolute right-2 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-muted hover:bg-accent-100 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:right-3 sm:top-1/2 sm:-translate-y-1/2"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
