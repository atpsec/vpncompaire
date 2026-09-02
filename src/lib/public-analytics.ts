/**
 * The only runtime values intentionally exposed to browser components.
 * Server-only credentials are validated in `src/env.ts` and never imported by
 * the analytics client components.
 */
export const publicAnalytics = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || undefined,
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || undefined,
} as const;
