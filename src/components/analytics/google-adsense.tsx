import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * Google AdSense (Auto Ads) — tek script, yerleşimi Google otomatik seçer.
 * Yalnızca NEXT_PUBLIC_ADSENSE_CLIENT_ID set edildiğinde yüklenir
 * (ca-pub-XXXXXXXXXXXXXXXX). GA bileşeniyle aynı env-gated pattern: publisher
 * ID gelmeden hiçbir şey basılmaz, böylece onay öncesi/ID öncesi deploy güvenli.
 *
 * Çerez davranışı: kişiselleştirilmiş reklam sinyalleri (ad_storage,
 * ad_user_data, ad_personalization) google-analytics.tsx'te "denied" default'la
 * tanımlanır ve consent-banner onayıyla güncellenir (Consent Mode v2).
 */
export function GoogleAdsense() {
  const id = siteConfig.adsenseClientId;
  if (!id) return null;

  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
