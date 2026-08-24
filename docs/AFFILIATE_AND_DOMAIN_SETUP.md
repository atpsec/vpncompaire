# Affiliate ID & Custom Domain Setup

Bu doküman, üretim için iki kritik adımı kapsar:

1. Affiliate ID'lerini Hostinger ortam değişkenlerine eklemek
2. Custom domain (vpnadvisor.net) yapılandırmasını doğrulamak

Her ikisi de **opsiyoneldir** — env eksikse site doğrudan sağlayıcı URL'ine gider; domain ayarı tamamlanana kadar Hostinger'ın geçici adresi kullanılabilir.

---

## 1. Affiliate URL'lerini Hostinger'a ekle

### Adım 1: Her sağlayıcı için affiliate hesabı aç

Her sağlayıcının kendi affiliate başvuru sayfası var. Tipik onay süresi 1-5 iş günü.

| Sağlayıcı | Affiliate Network | Başvuru |
|-----------|-------------------|---------|
| NordVPN | Impact / NordVPN Direct | https://affiliate.nordvpn.com/ |
| Surfshark | Surfshark Affiliates / CJ | https://surfshark.com/affiliates |
| ExpressVPN | Impact | https://www.expressvpn.com/affiliates |
| Proton VPN | Impact | https://protonvpn.com/affiliates |
| Private Internet Access | Commission Junction | https://www.privateinternetaccess.com/pages/affiliate-program |
| CyberGhost | Commission Junction / Impact | https://www.cyberghostvpn.com/en_US/affiliates |
| IPVanish | Impact / Pepperjam | https://www.ipvanish.com/affiliates |
| Windscribe | Direkt | https://windscribe.com/affiliates |
| TunnelBear | Commission Junction | https://www.tunnelbear.com/affiliate |
| Mullvad | **Affiliate programı yok** — politika gereği. Atla. |

### Adım 2: Onaylanan hesabın dashboard'undan tracking URL'ini al

Çoğu network bir "deeplink generator" veya "default tracking URL" sunar. Örnek bir Impact.com URL'si:

```
https://go.nordvpn.net/aff_c?offer_id=15&aff_id=12345
```

CJ (Commission Junction) URL'si:

```
https://www.tkqlhce.com/click-12345678-13456789
```

Bu URL'i olduğu gibi kopyala.

### Adım 3: Hostinger hPanel → Node.js Apps → Environment Variables

Hostinger hPanel'de uygulamayı seçip Environment Variables bölümünü aç. Şu env değişkenleri tanımlıdır:

| Env değişkeni | Hangi sağlayıcı için? |
|---------------|------------------------|
| `AFFILIATE_NORDVPN_URL` | NordVPN |
| `AFFILIATE_SURFSHARK_URL` | Surfshark |
| `AFFILIATE_EXPRESSVPN_URL` | ExpressVPN |
| `AFFILIATE_PROTON_VPN_URL` | Proton VPN |
| `AFFILIATE_PIA_URL` | Private Internet Access |
| `AFFILIATE_CYBERGHOST_URL` | CyberGhost |
| `AFFILIATE_IPVANISH_URL` | IPVanish |
| `AFFILIATE_WINDSCRIBE_URL` | Windscribe |
| `AFFILIATE_TUNNELBEAR_URL` | TunnelBear |

Her birinin değeri: adım 2'de aldığın **tam** tracking URL'i.

> **Önemli:** Bu değişkenlerin başında `NEXT_PUBLIC_` **yok**. Sebep: tracking URL'leri yalnızca sunucu tarafında `/go/[slug]` redirect handler'ında kullanılır; istemciye expose edilmez. Bu, ID'lerin HTML kaynak görüntüleyiciden okunmasını engeller.

### Adım 4: Hostinger uygulamasını yeniden başlat

Env vars eklendikten sonra Node.js uygulamasını hPanel'den **Restart** ile yeniden başlat.

### Doğrulama

Deploy bittiğinde:

```bash
# Bir affiliate ID'si set ettiysen örn. NordVPN için
curl -I https://vpnadvisor.net/go/nordvpn
# Location: header'ında senin go.nordvpn.net... URL'in olmalı
```

Set edilmemişse `Location: https://nordvpn.com/?utm_source=vpnadvisor&...` görmelisin (utm fallback).

### Sub-id (campaign attribution)

`/go/[slug]` handler'ı opsiyonel bir `?source=<id>` parametresi destekler. Örnek:

```
/go/nordvpn?source=review-card
/go/surfshark?source=podium-1
```

- env URL set ise: `&sub1=<source>` eklenir (Impact, Pepperjam destekler; CJ ignore eder — sorun değil)
- env URL yoksa: `utm_campaign=<slug>-<source>` olarak işaretlenir

Hangi yerleşimden ne kadar gelir geldiğini ayırt etmek için kullanışlı. Şu an site bu parametre olmadan link kuruyor; ileride farklı yerleşimlerde A/B test için aktive edilebilir.

---

## 2. Custom domain'i Hostinger'da doğrula (vpnadvisor.net)

### Adım 1: Domain'i Hostinger uygulamasına bağla

Hostinger hPanel → Websites/Node.js Apps bölümünden uygulamanın domain ayarını aç ve `vpnadvisor.net` domain'ini ekle.

Hostinger'ın gösterdiği hedef IP veya CNAME değerlerini not al.

### Adım 2: DNS ayarlarını domain sağlayıcında yap

Domain'i nereden aldıysan (GoDaddy, Namecheap, Cloudflare DNS, vb.) DNS yönetim paneline gir.

**Apex (vpnadvisor.net):**
- Tür: `A`
- Host: `@` (veya boş bırak)
- Değer: Hostinger hPanel'in gösterdiği sunucu IP'si
- TTL: 3600 (1 saat)

**Www subdomain (www.vpnadvisor.net):**
- Tür: `CNAME`
- Host: `www`
- Değer: Hostinger hPanel'in gösterdiği CNAME hedefi
- TTL: 3600

### Adım 3: DNS propagation bekle

5 dakika ile 48 saat arası. Çoğunlukla 10-30 dk yeterli. Kontrol için:

```bash
dig vpnadvisor.net +short
# Hostinger'ın gösterdiği hedef dönmeli
```

Hostinger hPanel'de domain doğrulaması tamamlanmalı.

### Adım 4: NEXT_PUBLIC_SITE_URL'i güncelle

Hostinger ortam değişkenlerinde:

```
NEXT_PUBLIC_SITE_URL=https://vpnadvisor.net
```

(geçici uygulama adresi kullanılıyorsa bunu değiştir)

Bu güncellemeden sonra **redeploy şart** — sitemap, OG image, canonical URL'ler hepsi bu env'den türetiliyor.

### Adım 5: Search Console'a yeniden submit et

- Google Search Console: yeni domain için ayrı bir Property aç (vpnadvisor.net)
- Sitemap submit et: `https://vpnadvisor.net/sitemap.xml`
- Eski geçici adres property'si varsa, mümkünse `Change of Address` aracını çalıştır

---

## 3. Plausible Analytics (opsiyonel)

Plausible kullanmak istersen Hostinger ortam değişkenlerine:

```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=vpnadvisor.net
```

Plausible.io üzerinde aynı domain için site açmış olman gerekir. Bu kısım gizlilik-dostu, çerezsiz analitiktir; GDPR/KVKK uyumludur.

---

## Yapılacaklar checklist'i

- [ ] NordVPN affiliate'a başvur
- [ ] Surfshark affiliate'a başvur
- [ ] ExpressVPN Impact'a başvur
- [ ] Proton VPN Impact'a başvur
- [ ] PIA CJ'ye başvur
- [ ] CyberGhost CJ/Impact'a başvur
- [ ] IPVanish Impact/Pepperjam'a başvur
- [ ] Windscribe affiliate'a başvur
- [ ] TunnelBear CJ'ye başvur
- [ ] Onaylanan her hesap için Hostinger env vars ekle
- [ ] vpnadvisor.net domain'ini al (henüz alınmadıysa)
- [ ] Hostinger domain settings'e ekle
- [ ] DNS A + CNAME kayıtlarını set et
- [ ] NEXT_PUBLIC_SITE_URL'i custom domain'e güncelle
- [ ] Redeploy
- [ ] Geçici uygulama adresinden vpnadvisor.net'e yönlendirme set et (gerekiyorsa)
- [ ] Google Search Console'a yeni domain submit et
- [ ] Plausible (opsiyonel) ayarla
