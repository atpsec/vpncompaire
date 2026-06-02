# Devir Raporu — VPN Advisor (güncelleme: 2026-06-02)

> Bu dosya, projeye **yeni atanan Claude hesabı** içindir. Oku, sonra "kaldığın yerden" devam et.
> Önce şu sırayla oku: `CLAUDE.md` → `AGENTS.md` → `REVIEW-2026-06.md` → `~/.claude/CLAUDE.md` (global tercihler) → **bu dosya**.
> (`HANDOFF.md` daha eski bir snapshot'tır; çelişki olursa **bu dosya** geçerlidir.)

---

## 0. Bir cümlede durum

REVIEW-2026-06.md yol haritasının **ADIM 1, 2, 3 + 3.1'i tamamlandı**, ardından proje **"VPN Advisor" (vpnadvisor.net) olarak yeniden markalandı**, **Plausible → GA4 (consent'li)** geçişi yapıldı, **newsletter + RSS kaldırıldı**, ve **ADIM 4'ün C kümesi (AI yazıları) uygulandı**. Sıradaki iş: **ADIM 4'ün kalan kümeleri (A / B / D + dublikat)**.

---

## 1. Proje künyesi

- **Marka:** VPN Advisor · **Domain:** vpnadvisor.net
- **Yol:** `C:\Users\ahmet\Desktop\vpncompaire`  (Windows, zsh, git repo — klasör adı eski markada kaldı)
- **GitHub repo:** `https://github.com/atpsec/vpncompaire` (rebrand'da DEĞİŞMEDİ) · **Branch:** `master` (not `main`)
- **Vercel proje adı:** `vpncompaire` (rebrand'da değişmedi, sadece domain/marka değişti)
- **Stack:** Next.js 16.2.6 (App Router, Turbopack), React 19.2.4, TypeScript 5, Tailwind v4, next-intl 4 (locale: `tr` default / `en`).
- **İçerik:** MDX dosya-tabanlı blog (**96 yazı: 48 TR + 48 EN**), `src/content/blog/{tr,en}`. **10 VPN** sağlayıcı.
- **Hosting:** Vercel (Pro plan). **Analytics:** **GA4 + consent banner** (Plausible kaldırıldı).
- **DB / Auth:** yok (file-based). **Kullanıcı:** Ahmet. **Türkçe konuşulur**, kısa ve doğrudan.

---

## 2. Mutlaka uyulacak kurallar (global `~/.claude/CLAUDE.md` + proje)

**ONAY GEREKEN eylemler** — kullanıcı açıkça "evet/onay/tamam" demeden YAPMA (her seferinde tek cümleyle ne yapacağını söyle, sor):
- `git push` (özellikle `master`) · Prod deploy (`vercel --prod`) · Force push, `--no-verify`, `reset --hard`, branch silme
- Bağımlılık ekleme/kaldırma/yükseltme · Üçüncü taraf servise veri gönderen istekler
- **Blog yazısı silme/birleştirme (yıkıcı içerik değişikliği)** — ADIM 4 bunu içerir.

Tek "evet" sadece o eylem için geçerli. "ever/evte/tamamdir" = evet.

**Diğer sabit kurallar:**
- **`git add .` KULLANMA.** Sadece kendi düzenlediğin dosyaları yol-yol stage et.
- Commit formatı: `<type>(scope): kısa özet` + boş satır + body. Trailer:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- **"Bitti" demeden önce her zaman:** `npm run lint` (0 error; warning tolere edilir) + `npm run build` (exit 0). Sonucu yanıtında belirt.
- Mobil: `min-w-0`, uzun string'lerde `break-all/words`, dikey stack tercih et.
- Windows: `git push` sırasında `getaddrinfo() thread failed to start` = geçici DNS, 3-5sn bekle tekrar dene. LF→CRLF uyarısı normal.
- Build log'unda "Failed to load dynamic font" / "unable to verify the first certificate" = **bilinen Windows local SSL/CA sorunu**, gerçek hata DEĞİL; build exit 0 ise Vercel'de sorun yok.
- Kapsam disiplini: sorulan işi yap, bonus refactor yapma. Aynı yaklaşım 2 kez başarısız olursa kök nedeni araştır.
- `REVIEW-2026-06.md`'de WIP işaretli dosyalara dokunma.

---

## 3. Yapılanlar (hepsi `master`'a push + deploy edildi)

| Aşama | Commit | İçerik |
|---|---|---|
| ADIM 1 | `4e33f28` | locale-aware canonical/hreflang, ~11 sayfa `generateMetadata`, EN içerik sızıntıları, veri çelişkileri, kaynaksız istatistik düzeltmeleri |
| ADIM 2 | `125811d` | blog `cache()` memoization, görsel optimizasyonu (bayraklar HARİÇ), sitemap, Suspense, araç düzeltmeleri, affiliate disclosure, a11y |
| ADIM 3 (kod) | `03c4291` | CSP temizliği, newsletter PII minimizasyonu + CSRF, `seo.ts` JSON-LD zenginleştirme, dürüst kopya |
| ADIM 3.1 | `b10e8ac` | Dependency-free Vercel KV distributed rate limiter (`src/lib/rate-limit.ts`) |
| ADIM 4 — Küme C | `5d8c73a` | **AI erişim yazıları pillar'a birleştirildi** (`BLOG_SLUG_MAP` 301'leri). Blog 100→96. |
| Rebrand | `1b791db` | **vpncompaire → VPN Advisor (vpnadvisor.net)** |
| UI/içerik | `ef4daa1` | **Newsletter + RSS kaldırıldı**, karşılaştırma logoları, dark mode kontrast düzeltme |
| Routing/analytics | `8aa0809` | **Geo locale routing**, **GA4 (consent'li)**, sosyal linkler gizlendi |

**Önemli dosya durumları (referans):**
- `src/lib/site.ts` — marka/URL `env`'den; `absoluteUrl(path, locale?)`, `localizedAlternates(path, locale)`, `gaId`.
- `src/lib/blog-slugs.ts` — **YENİ.** Edge-safe `BLOG_SLUG_MAP` (TR↔EN slug eşleşmeleri). hreflang + geo redirect + 301'ler buradan. fs/MDX importu YOK ki `proxy.ts` import edebilsin; `blog.ts` re-export eder.
- `src/components/analytics/` — **YENİ.** `google-analytics.tsx` + `consent-banner.tsx`. `src/types/gtag.d.ts`.
- `src/lib/rate-limit.ts` — REST tabanlı KV limiter, fail-open. **Artık sadece `/go`'ya bağlı** (newsletter kalktı).
- `src/proxy.ts` — next-intl + **geo locale routing** (ülkeye göre yönlendirme).
- `src/env.ts` — `NEXT_PUBLIC_GA_ID` + `KV_REST_API_URL`/`KV_REST_API_TOKEN`. **Plausible env'leri kaldırıldı.**
- **Silinenler:** `src/lib/plausible.ts`, `src/lib/rss.ts`, `src/types/plausible.d.ts`, `src/app/api/newsletter/route.ts`.
- `next.config.ts` — CSP'de hâlâ `script-src 'self' 'unsafe-inline'` (nonce migration ertelendi).
- localStorage prefix artık **`vpnadvisor:*`** (theme key `vpnadvisor-theme`, ayrıca `vpnadvisor:consent`).

---

## 4. Kullanıcıdan bekleyen aksiyonlar

1. **Domain & env (vpnadvisor.net):** domain bağlama, `NEXT_PUBLIC_GA_ID`, affiliate URL env'leri. Rehber: `docs/AFFILIATE_AND_DOMAIN_SETUP.md`.
2. **Vercel KV aktifleştir:** Storage → Create Database (Upstash/KV) → projeye link → redeploy. Yapılmazsa rate limiter no-op (zarar yok, fail-open).

---

## 5. SIRADAKİ İŞ — ADIM 4'ün geri kalanı

**Durum:** Sadece **Küme C (AI)** uygulandı. Analiz raporu: `ADIM4-KONSOLIDASYON-PLANI.md`.

**Bekleyen kümeler:**
- **A** — temel/seçim rehberleri (−1, `vpn-gizlilik-ve-guvenlik` birleştir)
- **B** — streaming pillar restructure (0, yeniden yapılandırma)
- **D** — tasarruf/indirim (−2)
- Dublikat: `playstation-xbox-store-vpn` ↔ `xbox-playstation-vpn` (gövde kıyasla)

**Kullanıcıdan bekleyen karar:** agresiflik (muhafazakâr ~86 vs agresif ~70) + hangi kümeden devam.

**Uygularken dikkat (yıkıcı — önce onay):** silme öncesi onay; her slug için `BLOG_SLUG_MAP`'e 301; TR↔EN senkron; her batch sonrası lint+build.

---

## 6. Bilinçli ertelenenler / yanlış pozitifler

- **ADIM 3.2 nonce CSP:** `unsafe-inline` kaldırma — tüm site'ı kırma riski, canlı test gerek. Ayrı oturum.
- **ADIM 3.3 server-only guard:** marjinal değer için dependency; atlandı.
- **CyberGhost audit:** Review "denetçi yok" demiş ama `products.ts`'te Schellman 2022 var → yanlış pozitif.
- **flagcdn `unoptimized`:** AGENTS.md konvansiyonu bayraklarda `unoptimized` ister → korundu.

> Genel ders: `REVIEW-2026-06.md` tarihli bir snapshot. Her maddeyi uygulamadan önce **kodun mevcut halini doğrula**.

---

## 7. Sağlık (2026-06-02 doğrulandı)

```
npm run lint   → 0 error, 7 warning (kullanılmayan import'lar — tolere)
npm run build  → exit 0, "Compiled successfully", 317 statik sayfa
```

## 8. Hızlı başlangıç komutları

```bash
cd "C:\Users\ahmet\Desktop\vpncompaire"
git log --oneline -6        # son commit 8aa0809 olmalı
git status                  # temiz olmalı
npm run lint && npm run build
```
