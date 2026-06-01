import Script from "next/script";
import { siteConfig } from "@/lib/site";
import { ConsentBanner } from "@/components/analytics/consent-banner";

/**
 * Google Analytics 4 — trafik takibi, Google Consent Mode v2 ile.
 * Yalnızca NEXT_PUBLIC_GA_ID env var set edildiğinde yüklenir (G-XXXXXXXXXX).
 *
 * Çerez davranışı: consent varsayılan olarak "denied". GA bu modda çerezsiz
 * ping gönderir, _ga çerezini YAZMAZ. Kullanıcı banner'dan onay verince
 * (ConsentBanner) analytics_storage "granted" olur ve normal GA devreye girer.
 * Bu yüzden onay öncesi hiçbir analitik çerez set edilmez (KVKK/GDPR uyumu).
 */
export function GoogleAnalytics() {
  const id = siteConfig.gaId;
  if (!id) return null;

  return (
    <>
      {/* Consent defaults — GA yüklenmeden ÖNCE ayarlanır. Önceki onay
          localStorage'da "granted" ise yarış olmadan doğrudan granted başlar. */}
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var __c='denied';try{if(localStorage.getItem('vpnadvisor:consent')==='granted')__c='granted';}catch(e){}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: __c,
  wait_for_update: 500
});`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
      <ConsentBanner />
    </>
  );
}
