import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // VPN Advisor is English-only. Language negotiation is deliberately off so
  // every visitor and crawler receives the same canonical English routes.
  localeDetection: false,
  // Canonical and x-default metadata are emitted by the page metadata helpers.
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
