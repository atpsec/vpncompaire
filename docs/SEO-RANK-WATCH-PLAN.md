# VPN Advisor — SEO ve AI Görünürlük Planı

Hazırlanma: 10 Eylül 2026. Durum: temel izleyici, aday listesi ve yerel denetim komutları uygulandı; GSC bağlantısı ve zamanlanmış görev henüz yapılandırılmadı. Bu belge mevcut SEO Rank Watch metninin vpnadvisor.net'e uyarlanmış sürümüdür.

## 1. Amaç ve mevcut durum

Amaç; VPN araştırmalarında nitelikli organik ziyaretleri, yararlı karşılaştırma sayfalarının bulunmasını ve VPN Advisor'ın doğrulanabilir kaynak olarak alıntılanmasını artırmaktır. Başarıyı tek bir sorguda anlık birinciliğe bağlama. Marka içeren ve içermeyen sorguları ayrı değerlendir.

Depoda doğrulanan yapı:

- Next.js 16.3.3 App Router, React 19.2.4, next-intl ve İngilizce MDX içerikleri.
- `src/i18n/routing.ts` yalnızca `en` dilini etkinleştiriyor. Kamuya açık kanonik adresler dil öneki taşımıyor. Eski Türkçe/Almanca dosya ve URL adları, çok dilli yayın hedefi olarak yorumlanmamalı.
- Sayfalar `src/app/[locale]/`, İngilizce blog içerikleri `src/content/blog/en/`, ortak veriler `src/data/` altında. İç dosya yollarını kamuya açık URL'lerle eşleştirmek için `src/lib/i18n-paths.ts` ve `src/lib/site.ts` kullanılmalı.
- Yapılandırılmış veri `src/lib/seo.ts` üzerinden üretiliyor. Kaynak kayıtları ve Transparency Index zaten mevcut; bunları yeniden kurmaya gerek yok.
- Hostinger'da kaynak ZIP yüklenip `npm run build` ile derlenen Node.js uygulaması kullanılıyor. Git'e gönderim, Hostinger yayınının tamamlandığını göstermez.
- Hazır komutlar: `lint`, `build`, `audit:seo`, `audit:i18n`, `audit:editorial`, `audit:content`, `audit:positioning`, `audit:ai-visibility`, `audit:links`.
- Orijinal metindeki `.claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs` doğrudan yol kontrolünde bulunmadı. Bunun yerine `scripts/seo-watch.mjs`, `data/seo/config.json` ve `data/seo/watchwords.json` ile CSV tabanlı ilk ölçüm altyapısı uygulandı.
- Bu çalışma GSC hesabına bağlanmadı; gerçek sıralamalar, gösterimler, ülke dağılımı ve API erişimi henüz doğrulanmış değil.

10 Eylül canlı örnek kontrolünde ana sayfa, `/comparison/proton-vs-mullvad` ve `/research/transparency-index` HTML olarak 200 döndü. Ana sayfanın Markdown temsili de 200 döndü. `Vary` içinde `Accept` Markdown yanıtında var; örneklenen HTML yanıtında yoktu. Proxy'nin erken rewrite yolları için başlık ekleme düzeltmesi yapıldı, fakat Next.js'in son HTML yanıtında kök sayfa için `Accept` hâlâ görünmüyor. Bu, önbellek varyantlarının ayrılması açısından izlenmesi gereken bir tutarsızlık; yanlış varyant sunulduğu henüz gösterilmedi. AI denetimi artık HTML temsilini ve iki karşılaştırma sayfasını da kontrol ediyor; gerçek AI alıntılanması ayrıca örnekleniyor. HTTP gerekçesi: [RFC 9110, Vary](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.5.5).

## 2. Uygulama sırası ve bitiş koşulları

Süreler geliştirme tahminidir; GSC erişimi ve veri hacmine bağlıdır. Sıralama artışı için son tarih değildir.

| Aşama | İş | Bitti sayılması için gereken |
| --- | --- | --- |
| A — Teknik temel, yaklaşık 1 iş günü | HTML/Markdown `Vary` sorununu teşhis et; denetimi iki temsili kapsayacak şekilde genişlet; kanonik URL ve indekslenebilirlik tabanını kontrol et. | Yerel üretim ve Hostinger yanıtları, aynı URL'nin iki temsilini doğru ayırıyor; değişen sayfalar ve temel teknik denetimler geçiyor. |
| B — Ölçüm kurulumu, yaklaşık 1–2 iş günü | GSC okuma bağlantısı veya tarih/filtre bilgisi korunmuş CSV içe aktarımı; başlangıç ölçümü ve aday listesi. | Gerçek veriden bir rapor üretilebiliyor; eksik veri ile sıfır değer ayrılıyor; tekrar çalıştırma çift kayıt oluşturmuyor. |
| C — İlk deney, yaklaşık 1–2 iş günü | Tek sayfa, tek ana arama niyeti, tek ölçülebilir hipotez; kaynak doğrulama, değişiklik, test ve Hostinger yayını. | Doğrulanmış canlı sürüm, değişiklik özeti, başlangıç metrikleri, geri alma yolu ve gözlem tarihleri kayıtlı. |
| D — Gözlem, yayından sonra 7/14/28 gün | İlk hafta teknik ve erken sinyal kontrolü; 14. ve 28. gün veri değerlendirmesi. | Sonuç `iyileşme sinyali`, `gerileme sinyali`, `belirsiz` veya `yetersiz veri` olarak kanıtıyla yazılı. |
| E — Sürekli çalışma | Ölçüm otomasyonu, haftalık fırsat raporu, dönemsel AI alıntı örneklemi ve kaynak güncelliği kontrolü. | İlk uçtan uca döngü doğrulanmış; aynı sayfada çakışan deney başlamıyor; yalnızca anlamlı gelişmeler bildiriliyor. |

İlk 30 günde aynı anda en fazla bir içerik deneyi yürüt. Bir çalışmada en fazla bir yeni deney başlat. Gözlem sürerken kaynak araştırması ve aday hazırlığı yapılabilir. Sonraki dönemlerde eşzamanlılığı artırmak için ortak sayfa/veri/bileşen etkileri ayrıca değerlendirilir.

Teknik arıza düzeltmeleri ve doğruluğu bozulan fiyat/kaynak güncellemeleri deney kotasına takılmaz. Deneyle kesişirlerse etki ölçümüne karıştırıcı olay olarak kaydedilir.

## 3. Ne ölçülecek?

| Alan | Birincil ölçüm | Yorumlama |
| --- | --- | --- |
| Google görünürlüğü | Kanonik sayfanın marka dışı tıklamaları, gösterimleri; sabit sorgu grubunun ortalama konumu ve CTR'si | Konum tek başına kazanım değildir; sorgu bileşimi değişebilir. |
| Marka bulunabilirliği | `VPN Advisor`, `vpnadvisor.net` ve doğrulanmış varyasyonların GSC verileri | Marka sorguları, genel VPN araştırması başarısından ayrı raporlanır. |
| AI kaynak kullanımı | Sabit, marka adı içermeyen sorularda doğrudan site bağlantısı/alınan alıntı; cevapta markanın geçmesi ayrı alan | Bir platformdaki örneklem tüm AI sistemlerinin görünürlüğü değildir. |
| Ziyaretçi yararı | Varsa doğrulanmış analiz verisinde karşılaştırma, kaynak veya sağlayıcı bağlantısı tıklamaları | Mevcut olay ölçümü doğrulanmadan dönüşüm ya da gelir rakamı üretilmez. |
| Teknik sağlık | HTTP durumları, canonical, indeks yönergeleri, sitemap, görünür içerik, JSON-LD ve içerik temsilleri | Denetim puanı gerçek sıralama ya da alıntı oranı yerine kullanılmaz. |

GSC ortalama konumu, tek bir kişinin o an göreceği sıra değildir; cihaz ve ülke gibi boyutlar önemlidir. Bu nedenle ülke/cihaz filtreleri deney boyunca sabit tutulur. [GSC performans tanımları](https://support.google.com/webmasters/answer/7576553?hl=en).

## 4. GSC verisi ve deney değerlendirmesi

Önce mevcut doğrulanmış property ve erişim şekli belirlenir. Domain property varsa `sc-domain:vpnadvisor.net`, yalnızca URL-prefix property varsa onun gerçek değeri kullanılır. Okuma için `webmasters.readonly` kapsamı yeterlidir. API anahtarı tek başına GSC yetkilendirmesi yerine geçmez.

Ölçümde `type=web`, `dataState=final` kullan. Tarih, sorgu, kanonik sayfa, ülke ve cihaz bilgisini sakla. Dil, sayfa yapılandırmasından gelen `en` etiketidir. GSC günleri PT zaman dilimindedir; görev saati Europe/Berlin, olay zamanları UTC olarak tutulabilir. Veri kesim tarihini raporda göster. Sayfalama uygula ve API'nin tüm satırları garanti etmediğini belirt. [Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).

Günlük toplamada üst üste binen son günleri yeniden okuyabilirsin. Ham yanıtlar değişmez anlık kayıtlar olarak saklanır; aynı kaynak/tarih/filtre/boyut için güncel gözlem tek kez hesaba katılır. Sayfa toplamlarını ayrıca al: sorgu satırlarının toplamı her zaman sayfa toplamını temsil etmez. Geçmişi yeni ölçümle ezme; revizyonu yeni kayıt olarak ilişkilendir. [Performans verisini alma ve kapsam sınırları](https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data).

API yoksa CSV'nin property, dönem ve filtre bilgilerini koruyarak başla. Satır başına ülke/cihaz ayrıntısı yoksa bunu bilinmiyor olarak kaydet. API ile farklı kapsamda gelen CSV'yi aynı seri gibi karşılaştırma. GSC verisi hiç yoksa teknik/içerik fırsatları hazırlanır; sayısal sıra veya başarı sonucu uydurulmaz. Web araması, arama niyeti ve rakip inceleme içindir; GSC sıralama serisinin yerine yazılmaz.

Başlangıçta son 28 kesinleşmiş gün, mümkünse son 90 günle bağlamlandırılır. 9 Eylül SEO yayını ve daha eski URL/dil geçişleri olay çizelgesine eklenir. Bu değişiklikleri aşan bir dönem, temiz deney öncesi dönem olarak sunulmaz.

Deney takvimi ve karar kuralı:

1. `deployedAt`, yeni sürümün canlıda doğrulandığı andır. Commit veya ZIP hazırlama tarihi değildir.
2. İlk tam yayın sonrası PT günü `D` olsun. Gözlem pencereleri `D..D+6`, `D..D+13` ve `D..D+27` olur. Yayın gününün kısmi verisi etki penceresine katılmaz.
3. 7. gün teknik sorun ve erken sinyal kontrol edilir. Henüz kesinleşmeyen günler varsa performans kararı ertelenir. Sırf artış görülmedi diye ikinci değişiklik yapılmaz.
4. İlk ana karşılaştırma 14 yayın sonrası gün ile, yayından önceki aynı uzunluktaki tam günler arasında yapılır. Haftanın gün dağılımı aynı tutulur. 28. günde 28/28 gün karşılaştırılır; yeni bir değişiklik eklendiyse aynı deneymiş gibi yorumlanmaz.
5. Başlangıç çalışma eşiği: her iki karşılaştırma penceresinde hedef sayfa+sorgu grubunda en az 100 gösterim. Bu istatistiksel anlamlılık garantisi değildir; ilk raporlarla ayarlanacak bir gürültü filtresidir. Az sayıda tıklamadaki büyük yüzde artışları güçlü kanıt sayılmaz.
6. Veri yetmezse 28, gerekirse 42 güne uzat. 42. günde de veri yetmezse `insufficient-data` sonucu ile deneyi kapatıp sayfayı izlemeye bırak; sonsuza kadar kilitleme.
7. Hipoteze göre birincil metriği değişiklikten önce seç. Başlık deneyinde benzer konumda CTR; kaynak/içerik deneyinde ilgili sorguların tıklama ve gösterimleri öncelikli olabilir. Sayfa toplamı ve ilişkili sorgular da kontrol edilir.
8. `target-met`, deney öncesi tanımlanan hedefin iki çakışmayan 14 günlük pencerede korunmasıdır. Örneğin aynı sorgu grubunda ilk üç ortalama konum ve tıklamalarda gerileme olmaması seçilebilir; her sayfaya aynı hedef zorlanmaz. Tek bir sıra-1 ölçümü kalıcı başarı sayılmaz.

Sonuçlar nedensellik iddiası olmadan yazılır. Yakın zamanda yapılan site genelindeki değişiklikler, yeniden taranma, Google güncellemeleri ve mevsimsellik kayda alınır. Uygunsa değiştirilmemiş benzer sayfaların eğilimi bağlam olarak kullanılır. Google da etkiyi değerlendirmek için genellikle birkaç hafta beklenmesini öneriyor. [Google SEO başlangıç rehberi](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## 5. vpnadvisor.net için aday sayfalar

Aşağıdakiler mevcut içerik/URL yapısına dayanan araştırma adaylarıdır; sorgu hacmi, rekabet kolaylığı veya mevcut sıralama iddiası değildir. İlk GSC raporu gerçek önceliği belirleyecek.

| Sorgu/niyet adayı | Hedef kanonik yol | Araştırılacak olası katkı |
| --- | --- | --- |
| `proton vpn vs mullvad privacy` | `/comparison/proton-vs-mullvad` | Gizlilik ihtiyacına göre karar özeti; denetim tarihi, kapsamı ve hesap/ödeme özelliklerinin kaynaklı karşılaştırması. |
| `nordvpn vs surfshark renewal price` | `/comparison/nordvpn-vs-surfshark` | Aynı para birimi, dönem ve pazarda ilk dönem/yenileme koşullarının doğrulanması; belirsiz tutarı kesin fiyat diye sunmama. |
| `vpn audit comparison` | `/research/evidence-ledger` | Denetçinin kimliği, denetim tarihi, kapsamı, rapora erişim ve açık bilgi boşluklarının kullanılabilirliği. |
| `vpn transparency comparison` | `/research/transparency-index` | Endeksin neyi ölçtüğü, veri tarihi ve sınırlamalarının açık olması; kaynak kapsamını güvenlik puanı gibi göstermeme. |
| `free vs paid vpn privacy` | `/guide/free-vs-paid-vpn` | İş modeli ve veri toplama farklılıklarına dayalı, senaryoya uygun ve kaynaklı karar desteği. |
| `VPN Advisor` / `vpnadvisor.net` | `/`, `/about`, `/methodology` | Tutarlı yayıncı kimliği ve kontrollü dış profil bağlantıları; tek seferde tüm sayfaları yeniden yazmadan belirli bir eksikliği ele alma. |

Seçim: önce teknik olarak erişilebilir ve doğru kanoniğe sahip sayfalar; ardından açık kullanıcı ihtiyacı, yeterli gösterim ve geliştirilebilir içerik. Konumu 4–20 arasında olan ilgili sorgular başlangıç için adaydır; 2–3. sıradaki sayfalar ancak açık bir eksiklik varsa değiştirilir. Sıraya yakınlık tek başına öncelik oluşturmaz.

Aynı sorgu birden fazla URL'ye dağılıyorsa önce bunun farklı niyetlerden mi, içerik örtüşmesinden mi geldiği incelenir. Her varyasyon için yeni sayfa açılmaz. Rakip araştırmasında görüntülenen kaynaklar, ülke/dil ve tarih yazılır; kullanılan arama aracı kesin Google sırası vermiyorsa sonuçlar “Google ilk üç” diye etiketlenmez.

İlk deneye ilişkin geçici öneri: GSC desteklerse `/comparison/proton-vs-mullvad` içinde tek bir kaynaklı karar tablosu veya eksik açıklama. Gerçek içerik karşılaştırması yapılmadan bu katkının eksik olduğu varsayılmaz. Daha güçlü bir GSC adayı varsa o seçilir.

## 6. AI görünürlüğü ve kaynak güvenilirliği

Her hedef sayfa, araştırma sorusunu açıkça cevaplamalı; karşılaştırma alanlarının kaynakları, kontrol tarihleri ve sınırlamaları görünür olmalı. Sağlayıcı beyanı, bağımsız denetim ve VPN Advisor'ın yorumunu ayır. Mevcut metodoloji, evidence ledger, Transparency Index ve kamuya açık JSON veri seti birbirini desteklemeli.

Sayfada bulunmayan iddiaları JSON-LD veya Markdown temsiline ekleme. Gerçekte çalıştırılmayan hız testi, doğrulanmamış kullanıcı puanı, garanti edilen streaming erişimi veya sahte uzman kimliği üretme. Fiyat ve denetim kayıtlarında gerçek doğrulama tarihini kullan; sırf tazelik görüntüsü için tarih değiştirme.

`llms.txt`, kaynak dizini ve Markdown desteği korunur. Bunlar yardımcı erişim yüzeyleridir. Google, AI sonuçları için özel bir AI dosyası veya özel şema zorunluluğu tanımlamıyor; teknik uygunluk, görünür içerik ve güvenilirlik temel alınmalı. [Google AI özellikleri ve web siteleri](https://developers.google.com/search/docs/appearance/ai-features).

İki haftada bir örnek ölçüm için sabit 10 İngilizce, marka adı içermeyen VPN araştırma sorusu hazırlanır. Örnek: “How can I compare independent VPN audits?” veya “How do Proton VPN and Mullvad differ for privacy-focused users?”

Erişilebilir her platformda aynı sorular, mümkün olduğunca aynı arama modu ve temiz oturum koşullarıyla örneklenir. Platform/model, dil, tarih, arama modu, soru ve kanıt bağlantısı kaydedilir. Siteye doğrudan atıf, yalnızca marka adı geçmesi ve ilgisiz bağlantılar ayrı sayılır. Erişilemeyen platform `not-measured` olur; sıfır görünürlük sayılmaz. Tekrarlanan örnekler veya farklı modeller birleştirilip pazar payı diye sunulmaz. Ücretli API veya abonelik başlangıç için zorunlu tutulmaz.

Analitik erişimi varsa AI yönlendirmeli ziyaretler ayrı raporlanabilir; referrer her zaman taşınmadığı için bu, toplam AI görünürlüğünü göstermez. Teknik AI denetiminin geçmesiyle alıntılanma oranını ayrı panellerde tut.

Marka için önce sahip olunan profiller, ana alan adı ve yayıncı açıklaması tutarlı hale getirilir. Kaynak gösterilmeye değer araştırma kayıtları geliştirilir. Basın/e-posta/dizin gönderileri hazırlanabilir; dış iletişim, temsil ve yeni hesap açma için ayrıca açık kullanıcı yetkisi gerekir. Gerçek işletme adresi mevcut ve yayımlanması uygunsa kullanılır; sırf tarayıcı puanı için adres üretilmez.

## 7. Önerilen teknik yapı

İzleyici başlangıçta yerel depoda, web uygulamasının istek işleme sürecinden bağımsız çalışır. GSC sırları tarayıcıya, `NEXT_PUBLIC_*` değişkenlerine veya Hostinger kaynak ZIP'ine girmez. İlk sürüm veritabanı ya da yeni ücretli servis gerektirmez.

| Önerilen yol | İşlev | Saklama |
| --- | --- | --- |
| `scripts/seo-watch/` | GSC/CSV alma, aday çıkarma, deney değerlendirme ve rapor komutları | Uygulama aşamasında yazılacak; kod Git'te. |
| `data/seo/config.json` | Teknik eşikler, tek deney limiti ve kanonik URL kuralları | Gizli olmayan yapılandırma Git'te. |
| `.runtime/seo/watchwords.json` | Hedef sorgular ve sayfa eşleşmeleri | Yerel, mevcut `.runtime` ignore kuralı altında. |
| `.runtime/seo/observations/YYYY-MM-DD/<runId>.json` | Kaynak yanıtları ve ölçüm metadatası | Yeni dosya eklenir; eski dosya değiştirilmez. |
| `.runtime/seo/experiments.json` | Güncel deney durumları | Şema doğrulamalı ve atomik güncelleme. |
| `.runtime/seo/events.jsonl` | Durum geçişleri, yayınlar, geri almalar ve ölçüm revizyonları | Yalnızca yeni olay eklenir. |
| `.runtime/seo/reports/` | Tarihli SEO/AI raporları | Yerel özel çıktı; yayın paketine alınmaz. |

`.runtime` verileri Git dışı olduğu için ayrı, erişimi kısıtlı yedek gerekir. Zamanlayıcı başka makineye taşınmadan önce aynı durum deposuna güvenilir erişim çözülür. GitHub Actions'ın geçici diskine tek kopya olarak ölçüm/deney geçmişi bırakılmaz. GSC ham verisinin herkese açık olabilecek depoya otomatik commit edilmesi planlanmaz.

Minimum kayıt alanları:

- Hedef: `id`, `query`, `canonicalPath`, `locale`, `country`, `device`, `searchType`, `priority`, `intent`.
- Ölçüm: `runId`, `source`, `property`, `filters`, `dateRange`, `dataCutoff`, `dataState`, `fetchedAt`, `clicks`, `impressions`, `ctr`, `averagePosition`, `coverage`, `responseHash`.
- Deney: `experimentId`, `targetId`, `hypothesis`, `primaryMetric`, `successRule`, `baseline`, `affectedPaths`, `affectedFiles`, `sourceEvidence`, `status`, `commit`, `deploymentId`, `deployedAt`, `nextReviewDate`, `result`, `confounders`, `rollbackReference`.

`null` eksik/bilinmeyen ölçümü temsil eder; otomatik 0 veya sıra 100'e çevrilmez. CTR toplam tıklama/toplam gösterimle; aynı kapsamdaki konum gösterim ağırlıklı hesaplanır. Sıfır paydalı oranlar boş bırakılır. Ülke ve cihaz kırılımlarını iki kez sayacak toplamlar oluşturulmaz.

Deney durumları:

| Durum | Anlamı ve geçiş |
| --- | --- |
| `candidate` | Veri ve arama niyetiyle desteklenen aday. |
| `prepared` | Değişiklik ve kontroller tamam; canlıya henüz yansımamış. |
| `observing` | Canlı sürüm doğrulandı, gözlem başladı. |
| `review-due` | Değerlendirme zamanı geldi; veri yeterliliği kontrol ediliyor. |
| `closed` | Sonuç kaydedildi: `target-met`, `positive-signal`, `negative-signal`, `inconclusive`, `insufficient-data` veya `rolled-back`. |
| `blocked` | API erişimi/yayın hatası gibi somut engel; sebebi kayıtlı. Veri azlığı bu durum değildir. |

Bir sorguyu değiştirmeme kuralı yeterli değildir: hedef kanonik sayfayı ve etkilenen ortak verileri de kilitle. Farklı anahtar kelimeyle aynı sayfaya ikinci deney başlatma. Tek yazıcı kilidi, tekrar çalıştırma güvenliği ve yarım kalan işlemi kurtarma davranışı uygula.

Uygulanan komut arayüzleri: `seo:collect`, `seo:report`, `seo:review`. Collector şu anda GSC CSV dışa aktarımını alır; doğrudan GSC API bağlantısı ve zamanlayıcı sonraki adımdır. Veri toplama komutu içerik değiştirmez; içerik değişikliği aşağıdaki ajan çalışma talimatıyla yapılır.

## 8. Kod, doğrulama ve Hostinger yayını

Next.js metadata değişiklikleri mevcut Server Component/`generateMetadata` yapısında yapılır. Pages Router `Head` örnekleri eklenmez. Değişiklik öncesinde ilgili yerel `node_modules/next/dist/docs/` rehberi okunur. İç linklerde projenin `@/i18n/routing` ve kanonik URL yardımcıları korunur.

Değişiklik yalnızca hipotezin gerektirdiği alanı kapsar. Başlık, H1, giriş, FAQ ve tüm iç linkler aynı deneyde topluca değiştirilmez. Paylaşılan bir veri dosyasının birden çok sayfa, Markdown ve veri setine etkisi `affectedPaths` içine yazılır. Yapılandırılmış veri görünür içerikle eşleşir; FAQ, ziyaretçinin gerçek sorusu varsa eklenir, zengin sonuç vaadiyle eklenmez.

Yayın öncesi gerekli kontroller:

1. Kullanıcının mevcut çalışmalarını koruyarak izole `codex/seo-watch-...` dalı/çalışma alanı kullan. Başlangıç kontrolünde `AGENTS.md`, `src/app/[locale]/rehber/page.tsx` ve ilgili olmayan izlenmeyen dosyalar mevcut değişiklikler taşıyordu; uygulamada durum yeniden okunmalı. `.claude` ve başka projelerin otomasyonları bu modülün kapsamına alınmaz.
2. `npm run lint` ve `npm run build` çalıştır. İçerik veya ortak veri değiştiyse ilgili `audit:editorial`, `audit:content`, `audit:positioning` ve gerektiğinde `audit:i18n` kontrollerini kullan. Önceden var olan hata ile yeni hatayı ayır; denetimi geçirmenin yolu kuralları gevşetmek değildir.
3. Yerel üretim sunucusunda `npm run audit:seo -- --base=http://localhost:3000` ve `npm run audit:ai-visibility -- --base=http://localhost:3000` çalıştır. Önemli hedef sayfanın görsel/işlevsel akışını da doğrula. Dış kaynak değiştiyse link ve içerik doğruluğunu kontrol et.
4. AI denetimini önceden genişlet: HTML ve Markdown için doğru Content-Type ve `Vary: Accept`; mevcut Next.js/RSC varyant anahtarlarının korunması; hedef sayfaya özgü içerik; HTML/Markdown arasında çelişen iddia bulunmaması; iki istek sırasıyla da önbellek testi; meta robots yanında `X-Robots-Tag` kontrolü. Tüm CDN davranışının yalnızca yerel testle kanıtlandığını iddia etme.
5. Yalnızca ilgili dosyaları belirli adlarla stage et ve incelenebilir commit oluştur. Kaynak ZIP'i doğrulanmış commit'ten üret; `.runtime`, sırlar, `.claude` ve ilgisiz kullanıcı çalışmalarını dışarıda tut. ZIP hash'i, commit ve deney kimliğini ilişkilendir.
6. Yayın kullanıcı tarafından yetkilendirildiğinde mevcut Hostinger akışını tamamla; önceki yetki hâlâ bu kapsama uygulanıyorsa tekrar sorma. Hostinger işlemi ek kullanıcı adımı gerektirirse hazırlanan paket ve test sonucuyla somut durumu bildir. Git push veya dosya yüklemeyi yayın başarısı sayma.
7. Hostinger'da tamamlanmış/güncel dağıtımı ve canlı hedef sayfanın gerçek değişikliğini doğrula; `npm run audit:ai-visibility -- --base=https://vpnadvisor.net` ve hedefe yönelik başlık/kanonik/HTTP kontrollerini çalıştır. Global yapı değiştiyse tam SEO taramasını da tekrarla. Ancak bundan sonra `observing` durumuna geç.

Geri alma: deney commit'ini hedefleyen geri alınabilir bir ters değişiklik ve yeni yayın kullan; kullanıcı çalışmalarını sıfırlama. Sitenin çalışmasını bozan yayın için, hâlâ uygunluğu doğrulanmış önceki Hostinger paketi alternatif olabilir. Farklı bir yayın araya girdiyse onu da kaldıracak toplu geri alma yapma. Küçük sıralama dalgalanması tek başına geri alma sebebi değildir.

## 9. Çalışma takvimi ve rapor

İlk sürüm elle çalıştırılır ve veri/rapor doğrulanır. Daha sonra yerel görev çalıştırıcısıyla her gün örneğin 09.00 Europe/Berlin'de ölçüm ve tarihi gelen değerlendirmeler yapılır. Bu saat öneridir; burada görev kurulmamıştır. Makine/çalıştırıcı kapalıysa kaçırılan günler sonraki çalışmada tamamlanır; aynı günün tekrarında veri çoğaltılmaz.

Zamanlayıcı yalnızca çalıştırma mekanizmasıdır; tek başına metni okuyup kod değiştiren bir ajan değildir. İçerik ajanı için ayrıca açık kapsam ve çalışma talimatı kullanılır. Bekleme, açık bir işlemde yedi gün uyumak yerine `nextReviewDate` ile sonraki çalışmaya bırakılır.

Haftalık rapor: veri kesim tarihi ve kapsamı, marka dışı/markalı eğilim, öncelikli aday ve nedeni, varsa aktif deney, önce/sonra metrikleri, karıştırıcı olaylar, sonraki değerlendirme tarihi. İki haftalık ek: AI sorularının kaçının hangi platformda gerçekten ölçüldüğü, bağlantılı atıflar ve örnek kanıtlar.

Otomatik bildirimler; yayın tamamlanması/başarısızlığı, anlamlı teknik bozulma, değerlendirme sonucu veya kullanıcı müdahalesi gerektiğinde gönderilir. Değişmeyen gözlem durumunda bildirim üretilmez. Aday yoksa yeni değişiklik zorlanmaz.

## 10. Ajan için uygulanacak güncellenmiş talimat

VPN Advisor'ın İngilizce SEO ve AI görünürlük çalışmalarını bu planla yürüt. Önce hangi komutların ve veri bağlantılarının gerçekten mevcut olduğunu doğrula; önerilen betikleri kurulmuş kabul etme. Kullanıcının istediği çalışma kipini esas al: plan/rapor talebinde analiz yap; uygulama talebinde kapsam içindeki değişiklikleri ve doğrulamayı tamamla; yayın yetkisi varsa Hostinger yayınına kadar ilerle.

Her çalışmada mevcut iş ağacını, hedef yapılandırmasını, kesinleşmiş ölçümleri ve deney olaylarını oku. GSC bağlantısı varsa gerçek veriyi al; yoksa kapsamı belli CSV'yi kullan. İkisi de yoksa veri eksikliğini kaydet, teknik/içerik hazırlığını sürdür, sıra veya etki sonucu üretme.

Önce vadesi gelen deneyi değerlendir. Bir içerik deneyi gözlemdeyse aynı hedef sayfada veya onun ortak verilerinde başka deney başlatma. Güvenlik, işlev veya kaynak doğruluğu nedeniyle gerekli düzeltmeleri olay kaydıyla yap. Gözlem penceresini etkiliyorsa yeniden değerlendirme tarihini gerekçeli güncelle.

Yeni deney için GSC fırsatını, arama niyetini, mevcut sayfanın somut eksiğini ve güvenilir kaynakları birlikte kullan. Bir kanonik sayfa, bir ana niyet ve bir hipotez seç; ilgili sorgu varyasyonlarını aynı grupta izle. Hedef ülke ve cihazı başlangıç verisinden belirle. VPN Advisor'ın kaynak temelli karşılaştırma yaklaşımını koru.

Değişiklikten önce başarı ölçütünü, başlangıç dönemini, etkilenen dosya/URL'leri ve geri alma yolunu kaydet. Yalnızca hipotezi karşılayan değişikliği yap. Testleri tamamla, somut farkı kaydet ve yetkili yayın akışını bitir. Gözlemi ancak yeni sürüm canlıda doğrulandığında başlat.

7. gün erken kontrol, 14. ve 28. gün karşılaştırma uygula; kesinleşmiş gün ve yeterli veri yoksa karar ertele. Kaynak, kapsam veya yayın bilgisi belirsizse bunu açıkça yaz. Tek ölçümden kalıcı birincilik veya nedensellik sonucu çıkarma. Deney kapanınca iyi içeriği koru ve sıradaki fırsatı gerçek veriden seç.

Çalışmayı kısa, kanıtlı bir raporla bitir: ne ölçüldü, ne öğrenildi, ne değişti, hangi doğrulamalar geçti, yayın durumu, sonraki değerlendirme tarihi ve varsa somut bağımlılık. Hedef; ziyaretçinin VPN kararını kolaylaştıran, arama motorları ve AI sistemlerinin güvenle kaynak gösterebileceği güncel sayfalar üretmektir.
