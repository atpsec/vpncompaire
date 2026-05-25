# vpncompaire

Türkçe VPN inceleme ve karşılaştırma sitesi. AI-citability (ChatGPT, Claude, Perplexity, Gemini'da önerilebilirlik) için optimize edilmiş, çok dilli yapıya hazır.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (i18n — Türkçe varsayılan, çok dilli hazır)
- @next/mdx (içerik için)
- Radix UI primitifleri (Accordion vb.)
- lucide-react (ikonlar)

## Lokal kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

Site `http://localhost:3000` üzerinde açılır.

> SSL hatası alırsan (kurumsal ağda): `NODE_OPTIONS="--use-system-ca" npm install` ve aynı şekilde `npm run dev`.

## Komutlar

| Komut | İşlev |
|---|---|
| `npm run dev` | Geliştirme sunucusu (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Production sunucusu |
| `npm run lint` | ESLint |

## Dizin yapısı

```
src/
  app/
    layout.tsx              ← root HTML/body
    globals.css             ← Tailwind v4 theme
    [locale]/               ← i18n routes (tr varsayılan)
      layout.tsx            ← Header + Disclosure + Footer
      page.tsx              ← Ana sayfa
      en-iyi-vpn/page.tsx   ← Top hub
      inceleme/[slug]/      ← VPN incelemeleri
      metodoloji/           ← Test metodolojisi
      reklam-aciklamasi/    ← Affiliate disclosure
    go/[slug]/route.ts      ← Affiliate redirect
    robots.txt/route.ts
    sitemap.xml/route.ts
    llms.txt/route.ts       ← AI crawler özet sayfa
  components/
    ui/                     ← Button, Card, Badge, Container
    layout/                 ← Header, Footer, DisclosureBanner
    home/                   ← Hero, TopVPNList, FAQ, vb.
    seo/                    ← JsonLd
  data/
    products.ts             ← 7 VPN'in yapısal verisi
    home-faqs.ts            ← FAQ verisi (FAQPage schema için)
  lib/
    site.ts                 ← Marka, URL, dil config
    utils.ts                ← cn helper, format
    affiliate.ts            ← Affiliate link yönetimi
    seo.ts                  ← JSON-LD schema builders
  i18n/
    routing.ts              ← Locale list
    request.ts              ← Server-side message loading
  proxy.ts                  ← (eski middleware) — i18n routing
messages/
  tr.json                   ← Türkçe çeviriler
```

## Yeni dil ekleme

1. `messages/<locale>.json` dosyasını oluştur (örn. `en.json`)
2. `src/i18n/routing.ts` içine locale ekle:
   ```ts
   locales: ["tr", "en"]
   ```
3. Bitti — yapı kendiliğinden `/en/...` rotalarını üretir.

## Deploy (Vercel)

```bash
npx vercel --prod
```

Environment variables:
- `NEXT_PUBLIC_SITE_URL=https://vpncompaire.com`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=vpncompaire.com` (analitik açmak için)

## AI sitasyon optimizasyonu (GEO)

Bu site AI sohbetlerinde önerilmek için aşağıdaki sinyalleri içerir:

- `/llms.txt` — AI crawler'lar için yapısal özet
- `robots.txt` — GPTBot, ClaudeBot, PerplexityBot, Google-Extended izinli
- JSON-LD schema'lar: Organization, WebSite, ItemList, Review, FAQPage, BreadcrumbList
- Soru biçiminde başlıklar (FAQ, "VPN nedir?" gibi)
- Her sayfa üstünde TL;DR / özet bloğu
- Net iddialar + kaynak (audit isimleri, tarih)
- Açık metodoloji sayfası (`/metodoloji`)
- Şeffaf affiliate disclosure (`/reklam-aciklamasi`)
