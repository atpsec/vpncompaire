"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type ProviderLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  provider: string;
  placement: string;
  children: ReactNode;
};

/** Provider CTA with consent-aware GA4 click measurement. */
export function ProviderLink({
  href,
  provider,
  placement,
  children,
  ...props
}: ProviderLinkProps) {
  function handleClick() {
    window.gtag?.("event", "provider_click", {
      provider,
      placement,
      link_type: href.startsWith("/go/") ? "affiliate" : "official",
      locale: document.documentElement.lang || undefined,
    });
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
