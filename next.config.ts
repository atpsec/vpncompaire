import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Content Security Policy — sıkı ama Next.js (inline hydration script + JSON-LD)
// ve isteğe bağlı Google Analytics (gtag.js) için çalışıyor.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://flagcdn.com https://images.unsplash.com https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://1.1.1.1 https://cloudflare-dns.com https://speed.cloudflare.com",
  "frame-src https://speed.cloudflare.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), midi=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/go/:slug",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  // İçerik konsolidasyonu (ADIM 4 / Küme C — AI): birleştirilen blog yazıları
  // pillar'a 301'lendi. Eski URL'lerin backlink/SEO değerini korumak için kalıcı yönlendirme.
  async redirects() {
    return [
      {
        source: "/blog/claude-gemini-erisim-vpn",
        destination: "/blog/chatgpt-turkiye-erisim-vpn",
        permanent: true,
      },
      {
        source: "/en/blog/claude-gemini-access-vpn",
        destination: "/en/blog/chatgpt-access-turkey-vpn",
        permanent: true,
      },
      {
        source: "/blog/midjourney-stable-diffusion-vpn",
        destination: "/blog/chatgpt-turkiye-erisim-vpn",
        permanent: true,
      },
      {
        source: "/en/blog/midjourney-stable-diffusion-vpn",
        destination: "/en/blog/chatgpt-access-turkey-vpn",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
