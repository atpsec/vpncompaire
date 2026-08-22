import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * Google AdSense (Auto Ads) — tek script, yerleşimi Google otomatik seçer.
 * Root layout'ta hydration sonrasında yüklenir; ilk boya yolunu bloke etmez.
 *
 * Çerez davranışı: kişiselleştirilmiş reklam sinyalleri (ad_storage,
 * ad_user_data, ad_personalization) google-analytics.tsx'te "denied" default'la
 * tanımlanır ve consent-banner onayıyla güncellenir (Consent Mode v2).
 */
export function GoogleAdsense() {
  const id = siteConfig.adsenseClientId;

  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
      crossOrigin="anonymous"
    />
  );
}
