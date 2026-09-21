"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackedSourceLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  sourceId: string;
  sourceType?: string | null;
  children: ReactNode;
};

/** External research links with consent-aware source-open measurement. */
export function TrackedSourceLink({
  href,
  sourceId,
  sourceType,
  children,
  ...props
}: TrackedSourceLinkProps) {
  function handleClick() {
    window.gtag?.("event", "source_opened", {
      source_id: sourceId,
      source_type: sourceType ?? undefined,
      locale: document.documentElement.lang || undefined,
    });
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
