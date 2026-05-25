import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * Plausible: gizlilik dostu, çerezsiz analitik.
 * Yalnızca NEXT_PUBLIC_PLAUSIBLE_DOMAIN env var set edildiğinde yüklenir.
 */
export function PlausibleAnalytics() {
  const domain = siteConfig.plausibleDomain;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
