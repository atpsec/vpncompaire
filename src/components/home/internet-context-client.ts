"use client";

import { useEffect, useState } from "react";

export type InternetContext = {
  ip: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
  capital: string | null;
  timezone: string;
  source: "cloudflare" | "ipwho" | "none";
};

let contextPromise: Promise<InternetContext | null> | null = null;

function isInternetContext(value: unknown): value is InternetContext {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<InternetContext>;
  return (
    (candidate.ip === null || typeof candidate.ip === "string") &&
    (candidate.countryCode === null || typeof candidate.countryCode === "string") &&
    (candidate.city === null || typeof candidate.city === "string") &&
    (candidate.region === null || typeof candidate.region === "string") &&
    (candidate.capital === null || typeof candidate.capital === "string") &&
    typeof candidate.timezone === "string" &&
    (candidate.source === "cloudflare" || candidate.source === "ipwho" || candidate.source === "none")
  );
}

function loadInternetContext(): Promise<InternetContext | null> {
  if (contextPromise) return contextPromise;

  contextPromise = fetch("/api/internet-context", {
    cache: "no-store",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
    referrerPolicy: "no-referrer",
  })
    .then(async (response) => {
      if (!response.ok) return null;
      const value: unknown = await response.json();
      return isInternetContext(value) ? value : null;
    })
    .catch(() => null);

  return contextPromise;
}

export function useInternetContext(): InternetContext | null {
  const [context, setContext] = useState<InternetContext | null>(null);

  useEffect(() => {
    let active = true;
    void loadInternetContext().then((nextContext) => {
      if (active) setContext(nextContext);
    });

    return () => {
      active = false;
    };
  }, []);

  return context;
}
