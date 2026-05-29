"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "vpncompaire:ip-banner-dismissed-at";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const DismissContext = createContext<(() => void) | null>(null);

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
}: {
  children: React.ReactNode;
}) {
  const dismissedFromStorage = useSyncExternalStore(
    subscribeToStorage,
    readDismissedSnapshot,
    readServerSnapshot,
  );
  const [dismissedThisRender, setDismissedThisRender] = useState(false);

  if (dismissedFromStorage || dismissedThisRender) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // storage blocked — fall back to per-session hide
    }
    setDismissedThisRender(true);
  };

  return (
    <DismissContext.Provider value={dismiss}>{children}</DismissContext.Provider>
  );
}

export function IpSecurityBannerDismissButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const dismiss = useContext(DismissContext);
  if (!dismiss) return null;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={dismiss}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-accent-100 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
        className,
      )}
    >
      <X className="size-4" aria-hidden="true" />
    </button>
  );
}
