import { siteConfig } from "@/lib/site";

/**
 * Google AdSense (Auto Ads) — tek script, yerleşimi Google otomatik seçer.
 * Root layout <head> içinde render edilir (AdSense site doğrulaması bunu bekler).
 *
 * Çerez davranışı: kişiselleştirilmiş reklam sinyalleri (ad_storage,
 * ad_user_data, ad_personalization) google-analytics.tsx'te "denied" default'la
 * tanımlanır ve consent-banner onayıyla güncellenir (Consent Mode v2).
 */
export function GoogleAdsense() {
  const id = siteConfig.adsenseClientId;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
      crossOrigin="anonymous"
    />
  );
}
