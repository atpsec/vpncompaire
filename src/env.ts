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
    .default("vpncompaire"),
  NEXT_PUBLIC_SITE_BRAND: z
    .string()
    .min(1)
    .default("vpncompaire"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("NEXT_PUBLIC_SITE_URL geçerli bir URL olmalı")
    .default("http://localhost:3000")
    .transform((u) => u.replace(/\/$/, "")),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z
    .string()
    .min(1)
    .optional()
    .or(z.literal("")),

  // Plausible API key for server-side stats (view counter)
  PLAUSIBLE_API_KEY: z
    .string()
    .min(1)
    .optional()
    .or(z.literal("")),

  // Vercel KV / Upstash Redis REST credentials — set automatically when a KV
  // store is linked to the Vercel project. Used by src/lib/rate-limit.ts for
  // distributed rate limiting. When absent, the limiter is a no-op (allows).
  KV_REST_API_URL: z.string().url().optional().or(z.literal("")),
  KV_REST_API_TOKEN: z.string().min(1).optional().or(z.literal("")),

  // Affiliate tracking URLs — server-side only (not NEXT_PUBLIC_*).
  // Each one holds the FULL personal tracking URL provided by the
  // affiliate dashboard (e.g. https://go.nordvpn.net/aff_c?offer_id=...&aff_id=YOURID).
  // /go/[slug] redirects here when set; otherwise falls back to the
  // brand's public URL with utm_* parameters appended.
  //
  // To enable for a provider, set the env var in Vercel project settings
  // (or .env.local for local dev). Leave empty/unset to disable affiliate
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
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  PLAUSIBLE_API_KEY: process.env.PLAUSIBLE_API_KEY,
  KV_REST_API_URL: process.env.KV_REST_API_URL,
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
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
