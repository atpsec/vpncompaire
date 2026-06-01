"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "vpnadvisor-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

// useSyncExternalStore-based mounted hook to avoid hydration mismatch
// without triggering the "setState in effect" eslint rule.
const subscribe = () => () => {};
function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot: mounted
    () => false // server snapshot: not mounted
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const mounted = useMounted();

  // Lazy initializer reads localStorage before first render
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  });

  // Listen for system theme changes when in "system" mode
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const cycleTheme = () => {
    const next: Theme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  // Render neutral icon during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Tema değiştir"
        className={`inline-flex size-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-subtle hover:text-ink transition ${className}`}
      >
        <Monitor className="size-4" aria-hidden="true" />
      </button>
    );
  }

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const label =
    theme === "light"
      ? "Açık tema (tıkla: koyu)"
      : theme === "dark"
      ? "Koyu tema (tıkla: sistem)"
      : "Sistem teması (tıkla: açık)";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex size-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-subtle hover:text-ink transition ${className}`}
    >
      <Icon className="size-4" aria-hidden="true" />
    </button>
  );
}
