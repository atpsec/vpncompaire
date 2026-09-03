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
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com",
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://flagcdn.com https://images.unsplash.com https://www.google-analytics.com https://*.google-analytics.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://1.1.1.1 https://cloudflare-dns.com https://speed.cloudflare.com",
  "frame-src https://speed.cloudflare.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://*.googlesyndication.com",
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
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "X-Download-Options", value: "noopen" },
  { key: "Origin-Agent-Cluster", value: "?1" },
];

const publicDocumentCacheHeader = {
  // Keep public documents fast while forcing the edge to revalidate instead
  // of serving a stale HTML release for Next.js' default one-year window.
  key: "Cache-Control",
  value: "public, max-age=0, must-revalidate, s-maxage=3600",
};

const privateNoStoreCacheHeader = {
  key: "Cache-Control",
  value: "private, no-store, no-cache, must-revalidate, max-age=0",
};

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  // Hostinger/Turbopack deploymentlerinde MDX renderer'ın harici modül
  // olarak yüklenmesi `open EEXIST` hatasına yol açabiliyor; doğrudan bundle'la.
  transpilePackages: ["next-mdx-remote"],
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
        headers: [...securityHeaders, publicDocumentCacheHeader],
      },
      {
        // JSON endpoints can contain request-specific diagnostics. Keep them
        // private even if an upstream cache ignores the route handler signal.
        source: "/api/:path*",
        headers: [
          privateNoStoreCacheHeader,
          { key: "Content-Security-Policy", value: "default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/go/:slug",
        headers: [
          privateNoStoreCacheHeader,
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        // The tool renders request-specific IP data; never let an intermediary
        // serve one visitor's snapshot to another visitor.
        source: "/tools/what-websites-can-see",
        headers: [
          privateNoStoreCacheHeader,
        ],
      },
      {
        // These localized routes render request-specific IP/geo data.
        source: "/:locale/araclar/ip-adresim",
        headers: [privateNoStoreCacheHeader],
      },
      {
        source: "/tools/ip-adresim",
        headers: [privateNoStoreCacheHeader],
      },
      {
        source: "/tools/my-ip",
        headers: [privateNoStoreCacheHeader],
      },
      {
        source: "/:locale/araclar/internette-sen",
        headers: [privateNoStoreCacheHeader],
      },
      {
        // Provider profiles intentionally remain dynamic so a deployment does
        // not leave stale pricing, metadata or source labels at the edge.
        source: "/:locale/inceleme/:slug*",
        headers: [privateNoStoreCacheHeader],
      },
      {
        source: "/reviews/:slug*",
        headers: [privateNoStoreCacheHeader],
      },
    ];
  },
  // İçerik konsolidasyonu (ADIM 4 / Küme C — AI): birleştirilen blog yazıları
  // pillar'a 301'lendi. Eski URL'lerin backlink/SEO değerini korumak için kalıcı yönlendirme.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vpnadvisor.net" }],
        destination: "https://vpnadvisor.net/:path*",
        permanent: true,
      },
      {
        // Eski EN dil değiştiricisinin ürettiği TR-only use-case URL'si.
        // Proxy bunu da kanonikleştiriyor; bu açık kural eski crawler keşiflerini
        // doğrudan kalıcı yönlendirmeyle temiz tutar.
        source: "/en/en-iyi/yurt-disindaki-turkler",
        destination: "/best-vpn/turks-abroad",
        permanent: true,
      },
      {
        source: "/compare",
        destination: "/comparison",
        permanent: true,
      },
      {
        source: "/blog/claude-gemini-erisim-vpn",
        destination: "/blog/chatgpt-access-turkey-vpn",
        permanent: true,
      },
      {
        source: "/en/blog/claude-gemini-access-vpn",
        destination: "/blog/chatgpt-access-turkey-vpn",
        permanent: true,
      },
      {
        source: "/blog/midjourney-stable-diffusion-vpn",
        destination: "/blog/chatgpt-access-turkey-vpn",
        permanent: true,
      },
      {
        source: "/en/blog/midjourney-stable-diffusion-vpn",
        destination: "/blog/chatgpt-access-turkey-vpn",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));

