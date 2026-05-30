@AGENTS.md

# vpncompaire — proje konvansiyonları

> Üstte `@AGENTS.md` import'u Next.js 16 agent kurallarını yükler. Aşağısı bu projeye özel pratiklerdir.

## Stack
- **Next.js 16** App Router, **TypeScript**, **Tailwind v4**, **next-intl** (locales: `tr`, `en`)
- UI: **Lucide React** ikonlar, custom design tokenları (aşağıda)
- Hosting: **Vercel** (proje: `ebeveyn-rehber-i/vpncompaire`, alias: `vpncompaire.vercel.app`)
- Repo: `https://github.com/atpsec/vpncompaire`, default branch **`master`** (not main)

## Komutlar
| Eylem | Komut |
|---|---|
| Lint | `npm run lint` (warning toleranslı, error 0 olmalı) |
| Build | `npm run build` (exit 0 olmalı) |
| Prod deploy | `NODE_OPTIONS="--use-system-ca" npx vercel --prod --yes` |

`NODE_OPTIONS=--use-system-ca` Windows'ta corporate root CA'ları okumak için **gerekli**, yoksa `vercel` komutu TLS hatasıyla düşer.

## Workflow
1. Kod değişikliği yap.
2. `npm run lint && npm run build` — ikisi de temiz olmalı.
3. Kullanıcıya değişikliklerin özetini sun ve **push + deploy onayı** iste.
4. Onay sonrası: ilgili dosyaları **specific path** ile stage et (`git add path/to/file`, asla `git add .` değil), commit, `git push origin master`, ardından prod deploy.

## Stage edilmemesi gereken dosyalar (kullanıcı WIP)
Aşağıdaki yollar kullanıcının üzerinde çalıştığı henüz hazır olmayan iştir. **Stage etme, commit etme, dokunma**:

- `src/app/[locale]/guvenlik-araclari/page.tsx`
- `src/app/[locale]/guvenlik-araclari/_body.tsx`
- `src/app/[locale]/rehber/page.tsx`
- `src/app/[locale]/sunucu-haritasi/page.tsx`
- `.claude/`

`git status` her seferinde bunları "modified" gösterecek; bu normal, görmezden gel.

## i18n
- Mesajlar: `messages/tr.json` ve `messages/en.json`
- **Key sync zorunlu** — birine key eklersen diğerine de ekle, `getTranslations` runtime'da MISSING_MESSAGE atar.
- Server component: `import { getTranslations } from "next-intl/server"`
- Client component: `import { useTranslations } from "next-intl"`
- Default locale: `tr`. Routing: `@/i18n/routing` modülünden `Link` ve `redirect` kullan, raw `next/link` değil.

## Design system
- Tokenlar (Tailwind v4 custom):
  - Renkler: `accent-{50..900}`, `brand-{50..900}`
  - Metin: `ink-strong`, `ink-muted`, `ink-subtle`
  - Yüzey: `surface-subtle`, `surface-strong`, `border`
- Kart pattern (her yerde tutarlı):
  ```
  rounded-2xl border border-border bg-white shadow-sm   // veya shadow-md vurgulu kartlarda
  + absolute -right-X -top-Y rounded-full blur-3xl       // soft renkli blob
  + opsiyonel top stripe: absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-brand-500
  ```
- `Container` (`@/components/ui/container`): sizes `sm` (3xl), `md` (5xl), **`lg` (6xl, default)**, `xl` (7xl). Hero/podium/IP banner default `lg` kullanır — yeni section'lar da default `lg` olsun.
- Kicker pill pattern:
  ```
  inline-flex items-center gap-1.5 rounded-full bg-{color}-50 px-2.5 py-1
  text-[10px] font-bold uppercase tracking-wider text-{color}-700
  ```
- Lucide ikon boyutu: kicker pill içinde `size-3`, button içinde `size-4`.

## Mobil
- Anasayfa kartları (Hero, IpSecurityBanner, TopThreePodium) **dikey stack** kullanır mobile'da, yatay scroll-snap **kullanılmaz** (kullanıcı "ekrana sığsın" dedi, swipe pattern reddedildi).
- `flex flex-col gap-3 sm:grid sm:grid-cols-3` — bu sırayla yaz.
- Uzun string'ler (IP, URL): `break-all`. Truncatable subtitle'lar: `truncate`.

## Vercel geo headers (server component'lerde)
Tüm header'lar Vercel tarafından sağlanır (Hobby plan dahil):
- `x-vercel-ip-country` (ISO-3166-1 alpha-2)
- `x-vercel-ip-city` (URL-encoded olabilir, `decodeURIComponent` ile aç)
- `x-vercel-ip-region`
- `x-vercel-ip-timezone` (IANA, örn. `Europe/Istanbul`)
- `x-vercel-ip-latitude`, `x-vercel-ip-longitude`

Lokal IP'leri (`isPrivateOrLocal`) erken filtrele, dev ortamda banner gösterme.

## External resources
- **Bayraklar**: `https://flagcdn.com/h{40,80}/{iso2-lowercase}.png` — `next.config.ts` `images.remotePatterns`'da kayıtlı. Component'te `<Image unoptimized />` kullan.
- **Affiliate links**: `affiliatePath(slug)` from `@/lib/affiliate`. Affiliate çıktısında `rel="sponsored nofollow"`, `target="_self"`. Direkt URL'lerde `rel="noopener"`, `target="_blank"`.

## Storage
- localStorage key prefix: `vpncompaire:*`
- Bilinen key'ler:
  - `vpncompaire:ip-banner-dismissed-at` — number (epoch ms), 7 gün dismiss penceresi
- Yeni key eklerken aynı prefix'i kullan ve burada belgele.

## Yakın tarihte dokunulan dosyalar (referans)
- `src/components/home/IpSecurityBanner.tsx` — server component, tek geniş kart layoutu
- `src/components/home/IpSecurityBannerDismiss.tsx` — Context-based dismiss provider + button
- `src/components/home/IpSecurityBannerClock.tsx` — client component, dakika rollover ile tick eden saat
- `src/components/home/top-three-podium.tsx` — TopThreePodium, mobil dikey stack

## Bilinen Windows quirks
- `git push` ara sıra `getaddrinfo() thread failed to start` verir → 3-5 sn bekle, retry et.
- LF → CRLF git uyarıları normal, `core.autocrlf=true`.
