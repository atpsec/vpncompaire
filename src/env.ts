import "server-only";
import { z } from "zod";

/**
 * Build-time environment validation.
 *
 * Yanlış yapılandırma deploy'a ulaşırsa burası hata fırlatır;
 * runtime'da değil. Bu, "production'da değişken eksik" sürprizini önler.
 */

const envSchema = z.object({
  NEXT_PUBLIC_SITE_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_SITE_NAME boş olamaz")
    .default("VPN Advisor"),
  NEXT_PUBLIC_SITE_BRAND: z
    .string()
    .min(1)
    .default("VPN Advisor"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("NEXT_PUBLIC_SITE_URL geçerli bir URL olmalı")
    .default("http://localhost:3000")
    .transform((u) => u.replace(/\/$/, "")),
  // Google Analytics 4 ölçüm kimliği (G-XXXXXXXXXX). Set edilmezse GA yüklenmez.
  NEXT_PUBLIC_GA_ID: z
    .string()
    .min(1)
    .optional()
    .or(z.literal("")),
  // Bing Webmaster Tools site verification token. Set after adding the site
  // to Bing Webmaster Tools; omitted locally until the token is available.
  BING_SITE_VERIFICATION: z
    .string()
    .min(1)
    .optional()
    .or(z.literal("")),
  // Google AdSense publisher kimliği (ca-pub-XXXXXXXXXXXXXXXX). Yerel veya
  // eksik yapılandırmada reklam scripti hiç yüklenmez. /ads.txt public/ statik
  // dosyasından servis edilir.
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: z
    .string()
    .min(1)
    .regex(/^ca-pub-\d{16}$/, "ca-pub- ile başlayan 16 haneli publisher ID olmalı")
    .optional()
    .or(z.literal("")),

  // Upstash-compatible Redis REST credentials (optional). Used for distributed
  // rate limiting and durable per-article readership totals. When absent,
  // bounded process-local fallbacks keep requests working, but readership
  // totals reset whenever the application process restarts.
  KV_REST_API_URL: z.string().url().optional().or(z.literal("")),
  KV_REST_API_TOKEN: z.string().min(1).optional().or(z.literal("")),
  // Optional server-side path for the local durable blog-view fallback.
  // Keep this outside public/; the default is a hidden runtime directory.
  BLOG_VIEW_STORE_PATH: z.string().min(1).optional().or(z.literal("")),

  // Optional Have I Been Pwned API key for the email security checker.
  // Kept server-side only. When absent, the tool still runs DNS/auth checks
  // and reports breach-check availability gracefully.
  HIBP_API_KEY: z.string().min(1).optional().or(z.literal("")),

  // Affiliate tracking URLs — server-side only (not NEXT_PUBLIC_*).
  // Each one holds the FULL personal tracking URL provided by the
  // affiliate dashboard (e.g. https://go.nordvpn.net/aff_c?offer_id=...&aff_id=YOURID).
  // /go/[slug] redirects here when set; otherwise falls back to the
  // brand's public URL with utm_* parameters appended.
  //
  // To enable for a provider, set the env var in hosting panel
  // (Hostinger Node.js env vars or .env.local for local dev). Leave empty/unset
  // to disable affiliate
  // for that provider.
  AFFILIATE_NORDVPN_URL: z.string().url().optional().or(z.literal("")),
  AFFILIATE_SURFSHARK_URL: z.string().url().optional().or(z.literal("")),
  AFFILIATE_EXPRESSVPN_URL: z.string().url().optional().or(z.literal("")),
  AFFILIATE_PROTON_VPN_URL: z.string().url().optional().or(z.literal("")),
  AFFILIATE_PIA_URL: z.string().url().optional().or(z.literal("")),
  AFFILIATE_CYBERGHOST_URL: z.string().url().optional().or(z.literal("")),
  AFFILIATE_IPVANISH_URL: z.string().url().optional().or(z.literal("")),
  AFFILIATE_WINDSCRIBE_URL: z.string().url().optional().or(z.literal("")),
  AFFILIATE_TUNNELBEAR_URL: z.string().url().optional().or(z.literal("")),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_BRAND: process.env.NEXT_PUBLIC_SITE_BRAND,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  BING_SITE_VERIFICATION: process.env.BING_SITE_VERIFICATION,
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  KV_REST_API_URL: process.env.KV_REST_API_URL,
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  BLOG_VIEW_STORE_PATH: process.env.BLOG_VIEW_STORE_PATH,
  HIBP_API_KEY: process.env.HIBP_API_KEY,
  AFFILIATE_NORDVPN_URL: process.env.AFFILIATE_NORDVPN_URL,
  AFFILIATE_SURFSHARK_URL: process.env.AFFILIATE_SURFSHARK_URL,
  AFFILIATE_EXPRESSVPN_URL: process.env.AFFILIATE_EXPRESSVPN_URL,
  AFFILIATE_PROTON_VPN_URL: process.env.AFFILIATE_PROTON_VPN_URL,
  AFFILIATE_PIA_URL: process.env.AFFILIATE_PIA_URL,
  AFFILIATE_CYBERGHOST_URL: process.env.AFFILIATE_CYBERGHOST_URL,
  AFFILIATE_IPVANISH_URL: process.env.AFFILIATE_IPVANISH_URL,
  AFFILIATE_WINDSCRIBE_URL: process.env.AFFILIATE_WINDSCRIBE_URL,
  AFFILIATE_TUNNELBEAR_URL: process.env.AFFILIATE_TUNNELBEAR_URL,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Geçersiz environment yapılandırması:\n${issues}`);
}

export const env = parsed.data;
