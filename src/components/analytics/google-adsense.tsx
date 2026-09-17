"use client";

import Script from "next/script";
import { publicAnalytics } from "@/lib/public-analytics";

const ADSENSE_ID_PATTERN = /^ca-pub-\d{16}$/;

/**
 * Only page-level monetized surfaces render this component. It intentionally
 * has no pathname check: a client component in a statically rendered root
 * layout can be evaluated with the wrong pathname and leak a preload link into
 * excluded pages. Keeping the allowlist at the page boundary makes the HTML,
 * AdSense audit and Google crawler view agree.
 */
export function GoogleAdsense() {
  const id = publicAnalytics.adsenseClientId;

  if (!id || !ADSENSE_ID_PATTERN.test(id)) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
      crossOrigin="anonymous"
    />
  );
}
