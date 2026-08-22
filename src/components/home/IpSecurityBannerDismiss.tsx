"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DISMISS_COOKIE = "vpnadvisor_ip_banner_dismissed";
const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60;

const DismissContext = createContext<(() => void) | null>(null);

export function IpSecurityBannerDismiss({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const dismiss = () => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${DISMISS_COOKIE}=1; Max-Age=${SEVEN_DAYS_SECONDS}; Path=/; SameSite=Lax${secure}`;
    setDismissed(true);
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
