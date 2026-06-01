# ADIM 4 — İçerik Konsolidasyon Planı (ANALİZ — uygulama ÖNCESİ onay bekler)

**Tarih:** 2026-06-01
**Durum:** Öneri. **Hiçbir yazı henüz silinmedi/birleştirilmedi.** Onayından sonra küme küme uygulanır.
**Hedef:** 100 yazı (50 TR + 50 EN) → ~70 güçlü yazı. Cannibalization'ı azalt, pillar+cluster kur, birleştirilenlere 301/canonical.

> Not: Aşağıdaki kararlar başlık/kategori/niyet analizine dayanır. Uygulama anında her yazının gövdesi okunup en iyi içerik pillar'a taşınır; "sil" = içeriği koru, pillar'a 301.

---

## Kümeler ve öneri

### Küme A — VPN temel / seçim (5 yazı, güçlü örtüşme)
`vpn-nedir-neden-gerekli` · `vpn-gizlilik-ve-guvenlik` · `vpn-secerken-dikkat-edilmesi-gerekenler` · `ucretsiz-vs-ucretli-vpn` · `vpn-abonelik-donemi-aylik-vs-yillik`

- **Pillar:** `vpn-nedir-neden-gerekli` (özet + tüm alt başlıklara link).
- **Koru (deep, niyet farklı):** `ucretsiz-vs-ucretli-vpn`, `vpn-abonelik-donemi-aylik-vs-yillik` (fiyat niyeti net).
- **Birleştir → pillar/secerken:** `vpn-gizlilik-ve-guvenlik` içeriği `vpn-secerken` + `vpn-nedir` ile çakışıyor → en iyi bölümleri taşı, 301.
- **Net kazanım:** −1 yazı.

### Küme B — Streaming (pillar + 4 alt + 2 fiyat = 7)
Pillar: `vpn-streaming-ve-icerik-erisimi` · Alt: `netflix-bolgesel-kutuphane-vpn` · `disney-bbc-iplayer-vpn` · `canli-spor-yayinlari-vpn` · `anime-crunchyroll-vpn` · (fiyat) `youtube-premium-ucuz-vpn` · `spotify-bolgesel-fiyat-vpn`

- **Pillar'ı özet+link yap** (şu an alt konuları tekrar anlatıyor).
- **Alt 4'ü koru** (her biri farklı servis, deep).
- youtube/spotify → **Küme D (tasarruf)** ile daha alakalı; orada değerlendir.
- **Net kazanım:** 0 (yapısal düzeltme, silme yok).

### Küme C — Yapay zeka VPN (8 yazı, EN GÜÇLÜ cannibalization)
`chatgpt-turkiye-erisim-vpn` · `claude-gemini-erisim-vpn` · `cin-rusya-ai-erisim-vpn` · `ai-araclari-gizlilik-vpn` · `ai-icerik-uretimi-vpn` · `ai-phishing-deepfake-vpn-koruma` · `chatgpt-plus-fiyat-vpn-tasarruf` · `midjourney-stable-diffusion-vpn`

- "AI aracına VPN ile erişim" niyeti 4 yazıda tekrar ediyor (chatgpt-turkiye / claude-gemini / cin-rusya / midjourney).
- **Pillar (yeni veya chatgpt-turkiye):** "AI araçlarına VPN ile erişim" → ülke/araç tablosu.
- **Birleştir → pillar:** `claude-gemini-erisim-vpn`, `cin-rusya-ai-erisim-vpn`, `midjourney-stable-diffusion-vpn` (erişim niyeti aynı) → 301.
- **Koru (niyet farklı):** `ai-araclari-gizlilik-vpn` (gizlilik), `ai-phishing-deepfake-vpn-koruma` (güvenlik), `chatgpt-plus-fiyat-vpn-tasarruf` (fiyat), `ai-icerik-uretimi-vpn` (üretim).
- **Net kazanım:** −3 yazı.

### Küme D — Bölgesel fiyat/tasarruf (6–8 yazı, güçlü örtüşme)
`steam-bolgesel-fiyat-vpn` · `ucak-bileti-fiyat-vpn` · `otel-rezervasyon-vpn` · `online-kurs-udemy-vpn` · `yazilim-abonelik-vpn-tasarruf` · `playstation-xbox-store-vpn` · (+ `youtube-premium-ucuz-vpn`, `spotify-bolgesel-fiyat-vpn`)

- Hepsi "VPN ile bölge değiştirip ucuza al" — aynı niyet, farklı ürün.
- **Pillar (yeni veya yazilim-abonelik):** "VPN ile bölgesel fiyat tasarrufu" → kategori tablosu + alt yazılara link.
- **Birleştir → pillar:** `otel-rezervasyon-vpn`, `online-kurs-udemy-vpn` (ince, düşük hacim) → 301.
- **Koru:** steam, ucak-bileti, playstation-xbox-store, yazilim-abonelik, youtube, spotify (her biri yüksek-hacim arama).
- **Net kazanım:** −2 yazı.

### Olası dublikat (incele)
- `playstation-xbox-store-vpn` (alisveris) ↔ `xbox-playstation-vpn` (cihaz-platform): biri mağaza-fiyat, biri cihaz-kurulum. **Gövdeleri kıyasla**; örtüşüyorsa cihaz olanı koru, mağaza olanı Küme D pillar'a yönlendir.

### Sağlam kümeler (DOKUNMA)
- Karşılaştırmalar: `nordvpn-vs-surfshark`, `expressvpn-vs-protonvpn`, `turkiye-icin-en-hizli-vpn-2026`.
- Teknik/gizlilik: `wireguard-vs-openvpn`, `split-tunneling`, `double-vpn-multihop`, `kill-switch`, `ram-only-sunucu`, `dns-leak-test`, `vpn-protokolleri`.
- Cihaz: apple-tv, ios-shortcuts, linux, macos, router (distinct).
- Kullanım senaryoları: freelancer, gazeteci-aktivist, yatirimci, egitimci, seyahatte, is-ve-uzaktan (distinct kitleler).

---

## Özet
| Küme | Aksiyon | Net yazı değişimi |
|---|---|---|
| A — Temel/seçim | 1 birleştir | −1 |
| B — Streaming | pillar yeniden yapı | 0 |
| C — AI | 3 birleştir | −3 |
| D — Tasarruf | 2 birleştir | −2 |
| Dublikat | incele (muhtemel −1) | −1 |
| **TR toplam** | | **~ −7** |
| **+ EN ayna** | aynı 301'ler | **~ −7** |

**Sonuç:** 100 → ~86 (ilk dalga). Review'ın "~70" hedefi daha agresif birleştirme ister (örn. AI'de 4→2, tasarrufta daha çok merge). İlk dalgada **muhafazakâr** gittim — yüksek-hacimli aramaları korudum.

## Uygulama gereksinimleri (onayında)
1. Her birleştirmede 301 redirect: `next.config.ts redirects()` veya `proxy.ts`. TR+EN slug çiftleri `BLOG_SLUG_MAP`'te.
2. Pillar'lara "bu kümedeki diğer yazılar" link bloğu.
3. Silinen slug'ları `sitemap`, `BLOG_SLUG_MAP`, ilgili internal linklerden temizle.
4. Her dalga sonrası `lint`+`build`, sonra push onayı.

## Karar bekleyen
- **Agresiflik:** muhafazakâr (~86, riski düşük) mi, agresif (~70, review hedefi) mi?
- Hangi kümeden başlayalım? (Öneri: **C — AI**, en net cannibalization.)
