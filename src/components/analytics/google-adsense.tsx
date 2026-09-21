"use client";

import { publicAnalytics } from "@/lib/public-analytics";

const ADSENSE_ID_PATTERN = /^ca-pub-\d{16}$/;

/**
 * Only page-level monetized surfaces use this component. The allowlist lives
 * in scripts/audit-adsense.mjs; excluded pages must not load the script.
 * This keeps the commercial ad inventory guard explicit and reviewable.
 */
export function GoogleAdsense() {
  const id = publicAnalytics.adsenseClientId;

  if (!id || !ADSENSE_ID_PATTERN.test(id)) {
    return null;
  }

  return (
    <script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
      async
      crossOrigin="anonymous"
    />
  );
}
