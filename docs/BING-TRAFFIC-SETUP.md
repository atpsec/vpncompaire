# Bing trafik kurulumu

## Yayından önce

1. Bing Webmaster Tools'ta `https://vpnadvisor.net` alan adını ekle.
2. Doğrulama için verilen `msvalidate.01` değerini Hostinger ortam değişkeni olarak `BING_SITE_VERIFICATION` adıyla ekle.
3. Uygulamayı yeniden build et/deploy et ve doğrulama etiketinin sayfa kaynağında göründüğünü kontrol et. Bu değer static metadata'ya build sırasında yazılır; yalnızca yeniden başlatmak yeterli değildir.

## Sitemap

`https://vpnadvisor.net/sitemap.xml` adresini Bing Webmaster Tools'a gönder. `robots.txt` bu sitemap'i zaten ilan ediyor.

## IndexNow

IndexNow anahtar dosyası `public/6f2c8d4a1b7e4c69a0a8d9f3c1e5b7a2.txt` olarak kökte yayınlanır. Yeni, güncellenen veya silinen URL'leri yayınlandıktan sonra bildir:

```text
npm run seo:indexnow -- --sitemap
```

İlk kurulumda bu komut sitemap'teki tüm URL'leri bildirir. Sonraki yayınlarda yalnızca değişen URL'leri gönder:

```text
npm run seo:indexnow -- /blog/yeni-yazi /guide/what-is-a-vpn
```

Komut yalnızca `NEXT_PUBLIC_SITE_URL` ile aynı alan adındaki URL'leri kabul eder. Aynı URL'yi gereksiz yere tekrar tekrar göndermemek gerekir.

## Bing içi kontrol döngüsü

- URL Inspection: ana sayfa, `/guide`, `/vpn-reviews`, `/comparison`, `/tools` ve yeni yazılar.
- Site Scan / SEO Reports: kritik teknik hatalar.
- Search Performance: sorgu, gösterim, tıklama ve CTR.
- AI Performance: Copilot ve Bing AI yanıtlarında kaynak gösterimi.

Bu dosya hesap doğrulamasının yerine geçmez; yalnızca deploy sonrası tekrarlanabilir kontrol listesidir.
