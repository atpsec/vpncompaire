# Devir Raporu — vpncompaire (2026-06-01)

> Bu dosya, projeye **yeni atanan Claude hesabı** içindir. Oku, sonra "kaldığın yerden" devam et.
> Önce şu sırayla oku: `HANDOFF.md` → `CLAUDE.md` → `AGENTS.md` → `REVIEW-2026-06.md` → `~/.claude/CLAUDE.md` (global tercihler) → **bu dosya**.

---

## 0. Bir cümlede durum

REVIEW-2026-06.md yol haritasının **ADIM 1, 2, 3 + 3.1'i tamamlandı ve `master`'a push + deploy edildi.** Sıradaki iş **ADIM 4 (içerik konsolidasyonu)** — analiz raporu yazıldı (`ADIM4-KONSOLIDASYON-PLANI.md`), **kullanıcının kararını bekliyor**, hiçbir blog yazısı henüz silinmedi.

---

## 1. Proje künyesi

- **Yol:** `C:\Users\ahmet\Desktop\vpncompaire`  (Windows, zsh, git repo)
- **Branch:** `master` (NOT `main`)
- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind v4 (CSS değişkenleri `--color-*` globals.css), next-intl 4 (locale: `tr` default / `en`).
- **İçerik:** MDX dosya-tabanlı blog (100 yazı: 50 TR + 50 EN), `src/content/blog/{tr,en}`.
- **Hosting:** Vercel — **Pro plan** (kullanıcı onayladı). Image optimization kotası sorun değil.
- **Analytics:** Plausible.
- **Kullanıcı:** Ahmet. **Türkçe konuşulur.** Açıklamalar kısa ve doğrudan.

---

## 2. Mutlaka uyulacak kurallar (global `~/.claude/CLAUDE.md` + proje)

**ONAY GEREKEN eylemler** — kullanıcı açıkça "evet/onay/tamam" demeden YAPMA (her seferinde tek cümleyle ne yapacağını söyle, sor):
- `git push` (özellikle `master`)
- Prod deploy (`vercel --prod`, `npm run deploy`)
- Force push, `--no-verify`, `reset --hard`, branch silme
- Bağımlılık ekleme/kaldırma/yükseltme
- Üçüncü taraf servise veri gönderen istekler
- **Blog yazısı silme/birleştirme (yıkıcı içerik değişikliği)** — ADIM 4 bunu içerir.

Tek "evet" sadece o eylem için geçerli. "ever/evte/tamamdir" = evet.

**Diğer sabit kurallar:**
- **`git add .` KULLANMA.** Sadece kendi düzenlediğin dosyaları yol-yol stage et.
- Commit formatı: `<type>(scope): kısa özet` + boş satır + body. Trailer:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- **"Bitti" demeden önce her zaman:** `npm run lint` (0 error; warning tolere edilir) + `npm run build` (exit 0). Sonucu yanıtında belirt.
- Mobil: `min-w-0`, uzun string'lerde `break-all/words`, dikey stack tercih et.
- Windows: `git push` sırasında `getaddrinfo() thread failed to start` = geçici DNS, 3-5sn bekle tekrar dene. LF→CRLF uyarısı normal.
- Build log'unda "Can't load image" / "Failed to load dynamic font" = **bilinen Windows local SSL/CA sorunu** (HANDOFF kısıt #1), gerçek hata DEĞİL; build exit 0 ise Vercel'de sorun yok.
- Kapsam disiplini: sorulan işi yap, bonus refactor yapma. Aynı yaklaşım 2 kez başarısız olursa kök nedeni araştır.
- `REVIEW-2026-06.md`'de WIP işaretli dosyalara dokunma.

---

## 3. Yapılanlar (hepsi `master`'a push + deploy edildi)

| Aşama | Commit | İçerik |
|---|---|---|
| ADIM 1 | `4e33f28` | locale-aware canonical/hreflang (`localizedAlternates`), ~11 sayfa `generateMetadata`'ya çevrildi, EN içerik sızıntıları, veri çelişkileri, kaynaksız istatistik düzeltmeleri |
| ADIM 2 | `125811d` | blog `cache()` memoization, görsel optimizasyonu (blog img'leri `unoptimized` kaldırıldı — bayraklar HARİÇ), sitemap/rss, Suspense, araç düzeltmeleri, affiliate disclosure, a11y |
| ADIM 3 (kod) | `03c4291` | CSP temizliği (unsplash/cloudflare kaldırıldı), newsletter PII minimizasyonu + CSRF sıkılaştırma, `seo.ts` JSON-LD zenginleştirme, `plausible.ts` env'e bağlandı, dürüst kopya |
| ADIM 3.1 | `b10e8ac` | Dependency-free Vercel KV distributed rate limiter (`src/lib/rate-limit.ts`), newsletter + `/go`'ya bağlandı |

**Önemli dosya durumları (referans):**
- `src/lib/site.ts` — `absoluteUrl(path, locale?)`, `localizedAlternates(path, locale)`.
- `src/lib/blog.ts` — `getBlogPosts`/`getBlogPost` artık `cache()` ile sarılı.
- `src/lib/rate-limit.ts` — **YENİ.** REST tabanlı KV limiter, fail-open, KV yoksa no-op.
- `src/lib/seo.ts` — `inLanguageOf()`, organizationSchema logo, locale-aware websiteSchema/itemListSchema, articleSchema ImageObject.
- `src/lib/plausible.ts` — `env`'den okur, `plausibleSiteId()` helper.
- `src/env.ts` — `KV_REST_API_URL` + `KV_REST_API_TOKEN` şemaya eklendi.
- `src/app/api/newsletter/route.ts` — KV-primary + in-memory fallback, CSRF (Origin/Referer), honeypot, domain-only log.
- `src/app/go/[slug]/route.ts` — edge, slug regex + allowlist + KV rate limit (30/60sn).
- `next.config.ts` — CSP'de hâlâ `script-src 'self' 'unsafe-inline'` (nonce migration ertelendi).

---

## 4. Kullanıcıdan bekleyen TEK aksiyon — Vercel KV'yi aktifleştir

Rate limiter kodu canlıda ama **no-op** (env yokken davranış değişmez, fail-open). Aktifleştirme:
1. Vercel dashboard → **Storage** → **Create Database** → Upstash for Redis (KV) → projeye **link** et.
2. Vercel otomatik `KV_REST_API_URL` + `KV_REST_API_TOKEN` enjekte eder.
3. Redeploy. Limiter kendiliğinden devreye girer.

Yapılmazsa zarar yok — kod zararsız bekler. (Yeni Claude'un kod yazması gerekmez; bu kullanıcı aksiyonu.)

---

## 5. Bilinçli ertelenenler

- **ADIM 3.2 — nonce-tabanlı CSP** (`unsafe-inline` kaldırma): tüm site'ı kırma riski, canlı test gerek. Otonom prod'a uygun değil → ayrı oturum.
- **ADIM 3.3 — server-only guard:** marjinal değer için dependency; atlandı.
- **ADIM 1.2 — breadcrumb "Ana sayfa" çevirisi:** rehber/en-iyi/karsilastir sayfaları tamamen Türkçe içerik; tek-etiket çevirisi anlamsız, kök neden ADIM 4 (EN çeviri/exclusion).

---

## 6. REVIEW yanlış pozitifleri (tekrar uğraşma)

- **CyberGhost audit:** Review "denetçi yok" demiş ama `products.ts`'te Schellman 2022 var → yanlış. Olduğu gibi bırakıldı.
- **Blog /go affiliate linki:** Review "bloglar /go veriyor" demiş ama grep 0 sonuç; öneri linkleri iç sayfalara (`/inceleme`, `/en-iyi`, `/karsilastir`) gidiyor. Disclosure yine de eklendi.
- **flagcdn `unoptimized`:** Review kaldır demiş ama AGENTS.md konvansiyonu bayraklarda `unoptimized` ister → konvansiyon kazandı, korundu.

> Genel ders: REVIEW-2026-06.md tarihli bir snapshot. Her maddeyi uygulamadan önce **kodun mevcut halini doğrula** — bazıları zaten yapılmış, bazıları yanlış pozitif.

---

## 7. SIRADAKİ İŞ — ADIM 4 (içerik konsolidasyonu)

**Durum:** Analiz raporu hazır → **`ADIM4-KONSOLIDASYON-PLANI.md`** (oku). Hiçbir yazı silinmedi.

**Tespit edilen cannibalization kümeleri:**
- **A** — temel/seçim rehberleri (−1)
- **B** — streaming pillar restructure (0, net silme yok, yeniden yapılandırma)
- **C** — AI yazıları (8 yazı, **en net örtüşme**, −3) ← önerilen başlangıç
- **D** — tasarruf/indirim (−2)
- Olası duplicate: `playstation-xbox-store-vpn` ↔ `xbox-playstation-vpn`

**Hedef:** muhafazakâr ~86 yazı (düşük risk) vs agresif ~70 (review hedefi).

**Kullanıcıdan bekleyen karar (2 soru):**
1. Agresiflik: muhafazakâr mı, agresif mi?
2. Hangi kümeden başlanacak? (Öneri: **C — AI**)

**Uygularken dikkat (yıkıcı — önce onay):**
- Yazı silme/birleştirme öncesi **kullanıcı onayı şart.**
- Silinen/taşınan her slug için **301 redirect** ekle: `next.config.ts` `redirects()` veya `proxy.ts`.
- `BLOG_SLUG_MAP` (TR↔EN slug eşleşmeleri) güncelle.
- Sitemap/RSS otomatik MDX'ten üretiliyor — silince düşer, ama 301'ler şart (backlink/SEO).
- TR ve EN'i senkron tut (next-intl `MISSING_MESSAGE` riski).
- Her batch sonrası lint + build.

---

## 8. Hafıza (auto-memory)

Kalıcı hafıza dosyası: `~/.claude/projects/C--WINDOWS-system32/memory/vpncompaire-engagement.md` (bu raporla aynı bilgiyi taşır). Yeni hesap kendi makinesindeyse bu hafıza taşınmaz — **bu rapor + repo dosyaları tek doğruluk kaynağıdır.**

---

## 9. Hızlı başlangıç komutları (yeni hesap)

```bash
cd "C:\Users\ahmet\Desktop\vpncompaire"
git log --oneline -6        # son commit b10e8ac olmalı
git status                  # sadece ADIM4-KONSOLIDASYON-PLANI.md + bu rapor untracked olmalı
npm run lint && npm run build
```

İlk kullanıcıya söylenecek: *"Devir raporunu okudum. ADIM 1-3 deploy edilmiş, ADIM 4 analiz raporu hazır ve kararını bekliyor: muhafazakâr (~86) mı agresif (~70) mı, ve hangi kümeden başlayalım (önerim C-AI)? Bir de Vercel KV'yi store ekleyip aktifleştirmen gerekiyor."*
