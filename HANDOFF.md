# HANDOFF — vpncompaire Proje Devir Notu

**Tarih:** 2026-05-31
**Hedef:** Yeni bir Claude hesabıyla bu projeye sorunsuz devam etmek.

> 📌 Bu dosya kullanıcı (Ahmet) farklı bir Anthropic hesabına geçtiğinde,
> yeni hesabın Claude'unun projeyi sıfırdan anlamasına yardımcı olur.

---

## 🎯 Hızlı Başlangıç (Yeni Claude için)

Sen Claude'sun ve bu projeye yeni atanıyorsun. Sırasıyla şunları yap:

1. **`CLAUDE.md`** dosyasını oku — proje konvansiyonları, stack, komutlar, dokunulmaması gereken dosyalar burada.
2. **`AGENTS.md`** dosyasını oku — Next.js 16 / React 19 agent kuralları.
3. **Bu dosyanın (`HANDOFF.md`) "Mevcut Durum" bölümünü** oku — son ne yapıldığını gör.
4. **`src/lib/site.ts`** ve **`src/env.ts`** dosyalarını oku — site config ve env değişkenleri.
5. Kullanıcı (Ahmet) ile **Türkçe konuş**. Onay almadan push/deploy yapma.

---

## 📦 Proje Özeti

- **Adı:** vpncompaire
- **Amaç:** TR/EN VPN karşılaştırma ve rehber sitesi
- **Repo:** https://github.com/atpsec/vpncompaire (default branch: `master`, **not main**)
- **Deploy:** Vercel (otomatik, push'tan sonra ~2 dk)
- **Production URL:** https://vpncompaire.vercel.app (veya alias)

### Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (custom design tokens)
- **i18n:** next-intl 4 (tr default, en alternative)
- **Content:** MDX (file-based blog, 100 yazı)
- **Analytics:** Plausible (cookieless)
- **Hosting:** Vercel
- **DB:** Yok (file-based her şey)
- **Auth:** Yok (statik+SSR, kullanıcı hesabı yok)

### Boyut
- 50+ sayfa rotası
- 100 blog yazısı (50 TR + 50 EN)
- 10 VPN sağlayıcı (NordVPN, Surfshark, ExpressVPN, ProtonVPN, PIA, CyberGhost, IPVanish, Windscribe, TunnelBear, Mullvad)
- 60 sözlük terimi
- ~322 build-time generate edilen sayfa

---

## 🗂 Kritik Dosyalar

| Dosya | Amacı |
|-------|-------|
| `src/lib/site.ts` | Site config (name, URL, descriptions) |
| `src/env.ts` | Zod ile env değişken validation |
| `src/lib/blog.ts` | Blog utility (getBlogPosts, getBlogPost) |
| `src/lib/unsplash.ts` | Görsel database (147 BlogImageSet, alias mapping) |
| `src/lib/affiliate.ts` | Affiliate URL resolver + open-redirect koruması |
| `src/lib/seo.ts` | JSON-LD schema generators |
| `src/lib/plausible.ts` | Plausible API entegrasyonu (view counter) |
| `src/lib/rss.ts` | RSS 2.0 feed generator |
| `src/data/products.ts` | 10 VPN'in detay verisi (TR/EN, fiyat, özellikler) |
| `src/data/features.ts` | Boolean özellik matrix |
| `src/data/glossary.ts` | 60 terim sözlük |
| `src/data/devices.ts` | 4 cihaz rehberi |
| `src/proxy.ts` | Middleware (rate limit + next-intl) |
| `next.config.ts` | CSP, security headers, image config |
| `src/app/layout.tsx` | Root layout, ThemeScript, metadata |
| `src/app/[locale]/layout.tsx` | Locale layout (header, footer) |

---

## 🎨 Eklenen Özellikler (Bu Devirden Önce)

### Phase 1 - İçerik (Mayıs 2026)
- ✅ 100 blog yazısı (TR+EN) MDX olarak
- ✅ Her yazı için unique coverImage (147 entry)
- ✅ Blog kategori filtreleme (`/blog` sayfasında 9 kategori)
- ✅ View counter (Plausible API ile — PLAUSIBLE_API_KEY env gerekli)
- ✅ Blog stats widget (homepage)

### Phase 2 - Güvenlik & UX
- ✅ Security headers (CSP, HSTS, X-Frame-Options vb.) — `next.config.ts`
- ✅ Open-redirect koruması (`/go/[slug]` allowlist)
- ✅ Rate limiting (proxy.ts, 100 req/min/IP)
- ✅ Dark mode (3-state: light/dark/system, FOUC-free)

### Phase 3 - Trust & SEO
- ✅ 4 ücretsiz VPN test aracı: `/araclar/{ip-adresim,dns-leak-test,webrtc-leak-test,vpn-hiz-testi}`
- ✅ "Last Tested" badge sistemi (her VPN'de tarih + editor notes)
- ✅ Sözlük 20 → 60 terim (yeni "Modern Özellikler" kategorisi)
- ✅ Metodoloji v2 (5 detaylı test bölümü)

### Phase 4 - Engagement
- ✅ Newsletter form (footer, in-memory storage)
- ✅ RSS feed (`/rss.xml`, `/rss.tr.xml`, `/rss.en.xml`)
- ✅ Social share buttons (X, LinkedIn, Facebook, WhatsApp + Web Share API)
- ✅ Sözlük search (Türkçe normalize, Ctrl+K, 60 terim)
- ❌ Deal countdown — eklenmişti, kullanıcı kaldırttı

### Phase 5 - Legal
- ✅ Çerez politikası (`/cerez-politikasi`) — site cookieless

---

## 🚫 DOKUNULMAYACAK DOSYALAR

`CLAUDE.md`'de açıklanan WIP dosyalar (kullanıcı üzerinde çalışıyor):

- `src/app/[locale]/guvenlik-araclari/page.tsx`
- `src/app/[locale]/guvenlik-araclari/_body.tsx`
- `src/app/[locale]/rehber/page.tsx`
- `src/app/[locale]/sunucu-haritasi/page.tsx`
- `.claude/`

`git status` bunları "modified" gösterir — **stage etme, commit etme, dokunma**. Görmezden gel.

---

## 🔐 Environment Variables (Vercel'de set edilmiş)

```bash
# Public (NEXT_PUBLIC_*)
NEXT_PUBLIC_SITE_NAME=vpncompaire
NEXT_PUBLIC_SITE_BRAND=vpncompaire
NEXT_PUBLIC_SITE_URL=https://vpncompaire.vercel.app
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=vpncompaire.vercel.app  # optional

# Server-only
PLAUSIBLE_API_KEY=  # OPTIONAL - view counter için, yoksa 0 döner

# Affiliate URLs (hepsi optional, set edilmezse public URL'e UTM ile yönlendirir)
AFFILIATE_NORDVPN_URL=
AFFILIATE_SURFSHARK_URL=
AFFILIATE_EXPRESSVPN_URL=
AFFILIATE_PROTON_VPN_URL=
AFFILIATE_PIA_URL=
AFFILIATE_CYBERGHOST_URL=
AFFILIATE_IPVANISH_URL=
AFFILIATE_WINDSCRIBE_URL=
AFFILIATE_TUNNELBEAR_URL=
```

`.env.example` dosyası referans olarak repo'da var.

---

## 🛠 Yaygın Komutlar

```bash
# Geliştirme
npm install
npm run dev              # localhost:3000

# Quality gates (her değişiklikten sonra)
npm run lint             # error 0 olmalı, warning tolere edilir
npm run build            # exit 0 olmalı

# Deploy (manuel — normalde Vercel auto-deploy yapar)
NODE_OPTIONS="--use-system-ca" npx vercel --prod --yes
```

> ⚠️ Windows'ta `NODE_OPTIONS=--use-system-ca` corporate root CA için **gerekli**.

---

## 🧠 Memory & Preferences Transfer

### Kullanıcı tercihleri (önemli!)
Bunlar `~/.claude/CLAUDE.md` (Windows: `C:\Users\ahmet\.claude\CLAUDE.md`) içinde yazılı. Yeni Claude hesabıyla aynı bilgisayardasın → **dosya zaten orada, otomatik okunur**. Farklı makine ise dosyayı kopyalaman gerek.

**Özet (önemli kurallar):**
- 🇹🇷 Türkçe konuş (kod yorumları İngilizce OK)
- ✅ Onay olmadan yapma: `git push`, prod deploy, force push, `--no-verify`, dependency ekleme/silme, 3. taraf servise veri gönderme
- 📝 Lint + build her değişiklikten sonra zorunlu
- 📁 `git add .` kullanma, dosya bazlı stage et
- 📱 Mobil: `min-w-0`, `break-words`, dikey stack tercih et
- 💾 "Evet" / "ever" / "tamam" yazımları onay kabul edilir
- 🪟 Windows quirks: `getaddrinfo()` hatası → 3-5 sn bekle retry, LF→CRLF normal

### Memory dosyaları (oturum hafızası)
Konum: `~/.claude/projects/.../memory/`

**Yeni hesaba taşımak isterse:**
```bash
# Eski hesap (export):
cp -r ~/.claude/projects/.../memory/ ~/memory-backup/

# Yeni hesap login olduktan sonra:
cp -r ~/memory-backup/* ~/.claude/projects/.../memory/
```

Boş ise sorun yok — yeni Claude tercihleri zamanla öğrenir.

---

## 📝 Son Commit & Durum

```bash
# Son commit'i görmek için:
git log --oneline -5
```

Son yapılanlar (kronolojik, en yeni üstte):
1. `revert: remove year-end VPN deal countdown entirely`
2. `feat: add cookie policy page (/cerez-politikasi)`
3. `feat: 5 conversion & engagement improvements` (newsletter, RSS, share, search, countdown)
4. `feat: 4 major content & trust improvements` (test araçları, Last Tested, sözlük 60, metodoloji v2)
5. `feat: add dark mode with theme toggle`

**Branch:** master
**Uncommitted:** WIP dosyalar (yukarıda listelendi) — onlara dokunma.

---

## 🎯 Devam Edilebilecek Görevler (Öneriler)

Kullanıcının daha önce konuştuğumuz ama yapmadığımız önceliklendirilmiş listesi:

### Yüksek değerli, henüz yapılmamış:
- 🇹🇷 **Türkiye-specific VPN performans dashboard'u** (canlı leaderboard, diferansiyasyon için kritik)
- 💬 **Kullanıcı yorumları sistemi** (Vercel KV veya basit JSON file)
- 💰 **VPN price tracker** (haftalık snapshot, grafik)
- 📊 **"Anonim kullanıcı verileri" raporu** (quiz sonuçları aggregate)
- 🤖 **"VPN'imi sor" AI chatbot** (Anthropic API ile)
- 📱 **Cihaz kılavuzları genişletme** (4 → 12: Windows, Linux, Chromebook, Apple TV, Fire TV, Switch, Router, RPi)

### Orta öncelik:
- Trustpilot/Reddit sentiment embed
- VPN server haritası (görsel, dünya haritası SVG)
- "Editor's pick" / "Best for X" rozetleri
- A/B test framework (basit, Plausible event bazlı)

### Düşük öncelik:
- Subresource Integrity (SRI) — Plausible script için
- Security.txt — `.well-known/security.txt`
- Automated security scanning — GitHub Actions

---

## 🚨 Bilinen Sınırlamalar

1. **Local build SSL sorunu:** Windows local'de `npm run build` font fetch hatası verebilir (Geist Google Font), ama production (Vercel) sorunsuz. Hatayı görmezden gel.

2. **localStorage çakışma:** Tema toggle ve banner dismiss aynı `vpncompaire:*` prefix kullanır. Yeni key eklerken prefix'i koru.

3. **Affiliate env'leri opsiyonel:** Hiçbiri set edilmezse `/go/[slug]` brand'in public URL'ine UTM ekleyerek yönlendirir — kırılmaz.

4. **Dark mode + Tailwind v4:** `@custom-variant dark (&:where(.dark, .dark *))` pattern kullanılıyor. Tailwind dokümanından farklı, bozma.

5. **`useSyncExternalStore` pattern:** ThemeToggle ve SocialShare'de hydration-safe için kullanıldı. Aynı pattern'i koru, `useState + useEffect` ile mounted yapma — ESLint "setState in effect" hatası verir.

---

## 🆘 Sıkışırsan

1. **Build hatası:** `npm run lint` ile başla, error'ları çöz, sonra `npm run build`.
2. **Görsel yüklenmiyor:** `src/lib/unsplash.ts` photo ID'si broken olabilir. `images.unsplash.com/photo-{ID}` URL'sini direkt test et — 404 ise değiştir.
3. **i18n hatası (MISSING_MESSAGE):** `messages/tr.json` ve `messages/en.json`'da key sync yok demek. İkisine de ekle.
4. **Vercel deploy fail:** GitHub Actions / Vercel dashboard'dan log'a bak. CSP veya env eksiklik olabilir.
5. **Git push fail (Windows):** `getaddrinfo()` ise 3-5 sn bekle retry. SSL ise `NODE_OPTIONS=--use-system-ca`.

---

## 📞 Sorular

Belirsiz bir şey olursa **kullanıcıya sor** (Türkçe). Onun tercihi (CLAUDE.md'den):
> "Açıklamaları kısa ve doğrudan tut. Gerekmedikçe başlık/maddeleme şişirme."

---

**Devir notu sonu. İyi çalışmalar! 🚀**
