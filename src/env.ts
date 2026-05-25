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
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_BRAND: process.env.NEXT_PUBLIC_SITE_BRAND,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Geçersiz environment yapılandırması:\n${issues}`);
}

export const env = parsed.data;
