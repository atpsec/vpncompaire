# VPN Advisor — Site analizi ve iyileştirme yol haritası

Tarih: 7 Eylül 2026

## Yönetici özeti

Öncelik daha fazla rozet veya daha fazla yazı eklemek değil; mevcut kaynak temelli karşılaştırma yaklaşımını daha kolay anlaşılır, güncel ve dışarıdan doğrulanabilir hale getirmek olmalı. Ana sayfanın çok sayıda paralel keşif yolu sunması karar akışını dağıtıyor. Footer'da dış referans, listeleme ve domain metriği aynı görsel alanda sunuluyor; bunlar aynı tür güven kanıtları değil.

## Kapsam ve sınırlar

Canlı ana sayfanın erişilebilir metni, sağlayıcı dizini ve metodoloji içeriği; yerel ana sayfa, footer, About/Contact, sitemap/robots, yapılandırma, analitik ve kimlik doğrulama kodu incelendi. İçerik, konumlandırma, editoryal ve dil denetimleri çalıştırıldı. Önceki ekran görüntüleri tasarım bağlamı olarak kullanıldı. Bu belge önce uygulama öncesi baseline olarak hazırlandı; aşağıdaki uygulama paketi aynı çalışma oturumunda baseline bulgularına göre işlendi.

Bu çalışma tüm URL'lerin başarılı tarandığı, tüm formların uçtan uca denendiği veya mobil cihazların görsel testinin tamamlandığı iddiasını taşımaz. Search Console, GA4 raporları, gerçek kullanıcı performansı, sunucu logları ve üretim ortam değişkenleri incelenmedi. Lighthouse ölçümü ve penetrasyon testi yapılmadı. Kaynak kod bulguları her durumda canlı sürümle birebir eşleşmeyebilir. Canlı ortamda henüz deployment yapılmadı.

## Bu oturumda uygulananlar

- Footer'da dış profiller/listeler ile bağımsız okuma kaynakları ayrı görsel bölümlere ayrıldı.
- FrogDR metni “certified” olmaktan çıkarılıp açıkça domain metriği olarak adlandırıldı; dış profillerin onay anlamına gelmediği görünür hale getirildi.
- Ana sayfada etkileşimli karşılaştırma Hero'nun hemen arkasına alındı; karar akışı öne çekildi.
- Fiyat görünen karşılaştırma kartlarına “Price checked” tarihi eklendi.
- Web Vitals olayları analitik izni `granted` değilse gönderilmiyor.
- About metni gerçek durumu “kişisel yayın projesi” olarak netleştiriyor; var olmayan ekip/uzman izlenimi veren talimat dili kaldırıldı.
- Production build, lint, content, positioning, editorial, i18n, AdSense ve AI visibility denetimleri çalıştırıldı; yerel tarayıcıda ana sayfa ve sağlayıcı dizini doğrulandı.

Bu uygulamalar henüz kazanılmamış yeni bir dış listeleme veya endorsement oluşturmaz. Gerçek dış listelemeler için platform başvurusu, sahip onayı ve kabul kanıtı ayrıca gerekir.

## Korunması gereken güçlü taraflar

- Kaynağa dayalı karşılaştırma, metodoloji, gelir açıklaması ve görünür doğrulama tarihleri mevcut.
- Editoryal denetim 33 indekslenebilir İngilizce makalede en az iki görünür birincil kaynak ve 13 ticari yüzeyde açıklama kontrolünden geçti.
- Konumlandırma denetimi 116 İngilizce makaleyi taradı. Bu, 116 makalenin indekslendiği veya editoryal doğruluğunun doğrulandığı anlamına gelmez.
- İçerik denetimi geçti; İngilizce dil denetimi 7 başarılı, 0 uyarı, 0 hata verdi. Bunlar tanımlı yapısal kuralları kontrol eder, insan editör değerlendirmesinin yerini tutmaz.
- Sitemap, canonical altyapısı, yapılandırılmış veri ve robots kontrolü mevcut.
- Sağlayıcı tıklaması, karşılaştırma seçimi, quiz tamamlama, paylaşım ve Web Vitals olayları kaynakta bulunuyor. Analitik sıfırdan kurulmak zorunda değil.
- Yapılandırmada güvenlik başlıkları; kimlik doğrulamada scrypt, oturum hashleme, HttpOnly çerez ve hız sınırlaması bulunuyor. Bunlar üretim güvenliği sertifikası değildir.

## Öncelikli bulgular

### 1. Dış itibar ile dış kaynak ayrılmalı — yüksek öncelik

Kanıt: `src/components/layout/site-footer.tsx`, `src/components/layout/domain-rating-badge.tsx`.

Privacy Guides, EFF ve AV-Comparatives bağlantıları VPN Advisor hakkındaki bağımsız değerlendirmeler değil. Footer'ın metni dış kaynak olduğunu söylese de bunların rozetlerle ve kalkan simgesiyle gruplandırılması farklı anlamları karıştırıyor. Önceki düzenleme kullanıcının dış tanınırlık talebini tam karşılamıyor.

FrogDR değeri kodda `1` olarak sabit. “Certified domain rating” metni güvenlik sertifikası gibi yorumlanmamalı. Bu incelemede FrogDR ve ScrollLaunch sayfaları doğrulanamadı; bunların mevcut durumuna dair onay verilmedi. AV-Comparatives bağlantısı 2020 raporuna gidiyor; tarihsel kaynak olarak kullanılabilir, güncel performans kanıtı olarak sunulmamalı.

Öneri: Dış listelemeleri yalnızca gerçek profil sayfaları doğrulandıktan sonra küçük bir “Listed on” alanında göster. Domain metriğini ayrı ve açık adlandır. Eğitim kaynaklarını ilgili rehberlere taşı. Her rozet için profil URL'si, izin verilen görsel, kontrol tarihi ve durum kaydı tut. Henüz kazanılmamış onayları göstermeme kuralı koy.

Kabul: Her rozet VPN Advisor'a ait doğrulanmış dış sayfaya gider; hiçbir genel kaynak kuruluş onayı gibi sunulmaz; sayısal değerlerin güncelleme sorumlusu tanımlıdır.

### 2. Ana sayfa karar akışı dağınık — yüksek öncelik

Kanıt: `src/app/[locale]/page.tsx`. Hero'dan sonra snapshot, üç sağlayıcı, blog, AI içerikleri, geniş VPN listesi, bağlantı uyarısı ve karşılaştırma bölümleri geliyor. Ana karar aracı blog ve AI bloklarının gerisinde kalıyor.

Önerilen sıra: kısa değer önerisi → ihtiyaca göre seçim/karşılaştırma → sınırlı sağlayıcı özeti → kaynak ve güncellik açıklaması → araçlar → seçili rehberler → sade footer. Ana eylem karşılaştırma, ikincil eylem bağlantı kontrolü olsun. Menü öğeleri görevler altında gruplandırılsın. Bu bir tasarım hipotezidir; dönüşüm artışı ölçülmeden garanti edilemez.

Kabul: Yeni ziyaretçi ilk ekrandan karşılaştırmaya başlayabilir; aynı sağlayıcı listeleri gereksiz tekrar etmez; mobil gezinme ve klavye akışı doğrulanır.

### 3. Güven anlatımında somut yayıncı kimliği eksikliği — yüksek öncelik

Kanıt: About kaynağında kullanıcıya gösterilen “The site should not imply staff editors or expert credentials that do not exist” ifadesi bulunuyor. Bu, gerçek yayıncı bilgisinden çok iç editoryal talimat gibi duruyor.

Öneri: Gerçek yayıncı/sorumluluk bilgisi, doğrulanabilir deneyim, düzeltme talebi yolu ve güncelleme yöntemi açık dille anlatılsın. Gerçek kişi bilgileri ancak sahibinin onayıyla yayımlansın; unvan veya ekip uydurulmasın. Mevcut iletişim e-posta kanallarının teslimatı ayrıca doğrulansın.

Kabul: About sayfası kimin yayımladığını, nasıl araştırdığını, kime ulaşılacağını açıklar; kendine yönelik talimat metinleri kalmaz.

### 4. Fiyat ve özellik güncelleme disiplini güçlendirilmeli — yüksek öncelik

Canlı sayfada 22 Ağustos 2026 fiyat doğrulama tarihleri görünür; bu olumlu. Ancak görünür tarih tek başına güncel doğruluğu kanıtlamaz. Bu denetimde bütün sağlayıcı sayıları ve fiyatları resmi kaynaklarla tek tek karşılaştırılmadı; yanlış oldukları ileri sürülmüyor.

Öneri: Fiyat, yenileme bedeli, sözleşme süresi, para birimi, vergi/bölge koşulları, cihaz sayısı ve audit kapsamı için kaynak + kontrol tarihi + kontrol eden kaydı oluştur. Mevcut veri modelini tekrar etmeden genişlet. Süresi dolan kampanya için resmi siteye yönlendirme ve editoryal uyarı kullan. Sağlayıcı beyanı ile bağımsız denetimi görsel olarak ayır.

Kabul: Öncelikli 10 profilde değişken alanların tamamı kaynak/tarih taşır; ana sayfa, profil ve karşılaştırmada fiyatlar aynı veriden gelir.

### 5. İçerik miktarı yerine özgünlük ve arama niyeti — orta/yüksek öncelik

116 toplam yazı ile 33 indekslenebilir yazı farklı sayılardır. Mevcut yayınlama filtresi kaldırılıp hepsi otomatik indekslenmemeli. Dizinde ayrıntılı profiller ile kısa pazar referansları aynı derinlikte değil.

Öneri: İlk etapta mevcut 33 yazı ve ayrıntılı sağlayıcı profilleri iyileştirilsin. Konular üç eksende toplansın: sağlayıcı karşılaştırmaları, gizlilik/bağlantı kontrolleri, cihaz ve kullanım senaryoları. Benzer sorguyu hedefleyen sayfaların birleştirilmesi Search Console ve içerik incelemesinden sonra kararlaştırılsın. Genel AI konuları VPN/gizlilik değeri taşımıyorsa ana sayfada öncelik almasın.

Kabul: Her öncelikli URL'nin tek arama niyeti, özgün katkısı, birincil kaynakları ve ilgili profil/araç bağlantısı vardır. Sitemap yalnızca yayımlanması ve indekslenmesi amaçlanan canonical URL'leri içerir; canlı taramayla doğrulanır.

### 6. Mobil estetik ve erişilebilirlik — orta/yüksek öncelik

Footer'ın dar marka sütununda iki rozet ve üç kolonlu kaynak grubu bulunuyor. Metinler yer yer 8–12 piksel. Bu yapı dar ekran ve büyük yazı ayarlarında sıkışma riski taşır; bu turda yeni cihaz ekran görüntüsüyle taşma ölçülmedi.

Öneri: İç içe kartları azalt, rozet ölçülerini eşitle, kaynakları rozet alanından ayır. 360, 390, 768 ve 1440 piksel genişliklerde; açık/koyu tema, klavye ve yüzde 200 yakınlaştırmada test et. Karşılaştırma tablolarının kaydırması ve odak görünürlüğünü kontrol et.

Kabul: Yatay sayfa taşması yok; önemli metinler rahat okunur; tüm kontroller klavyeyle çalışır; sonuçlar yalnızca renk ile anlatılmaz.

### 7. Analitik ve performans: altyapı var, sonuç doğrulanmalı — orta öncelik

Mevcut olaylar kullanılmalı. Web Vitals gönderimi `gtag` varlığını kontrol ediyor; doğrudan onay durumunu kontrol etmiyor. GA kodunda varsayılan denied modu var. Yorum satırları yerine ağ davranışıyla kabul/ret senaryoları test edilmeli; bu bulgu tek başına mevzuata aykırılık kanıtı değildir.

Öneri: Profil görüntüleme → karşılaştırma → sağlayıcı tıklaması ve quiz başlangıç → tamamlama akışlarını ölç. Mobil/masaüstü ve giriş sayfasına göre ayır. Dış rozet tıklamalarının ziyaretçiyi karar yolundan uzaklaştırıp uzaklaştırmadığını izle. Önemli şablonlarda laboratuvar ve gerçek kullanıcı ölçümlerini birlikte kullan.

Kabul: Olaylar raporda görülür, tekrar sayım kontrol edilir; çerez tercihine göre ağ istekleri belgelenir. Performans bütçesi başlangıç ölçümünden sonra belirlenir. Bu rapor hız puanı veya trafik artışı tahmini içermez.

### 8. Teknik operasyon ve hesap sürekliliği — koşullu yüksek öncelik

Kimlik doğrulama deposu varsayılan olarak `.runtime/phone-auth.json`; opsiyonel KV hata verirse yerel dosyaya düşebiliyor. Üretimde hangi yapılandırmanın kullanıldığı incelenmedi. Dosya tabanlı kullanım varsa yeniden dağıtımda kalıcılık, çoklu süreçte tutarlılık ve yedekleme doğrulanmalı. KV ile dosya arasında geçişin oturum iptali ve kullanıcı tutarlılığı etkileri değerlendirilmelidir.

Hız sınırlayıcı proxy IP başlıklarını kullanıyor. Yalnızca güvenilir proxy'nin bunları belirleyebilmesi doğrulanmalı. Bu bir istismar doğrulaması değildir.

Öneri: Hesap sistemi ürün için gerekliyse kalıcı veri deposu, yedekten dönüş ve oturum testleri önceliklendirilsin. Gerekliliği belirsizse yeni hesap özellikleri eklenmesin. Yayın süreci sürümlü paket, önizleme, kısa duman testi ve geri dönüş adımları içersin. Önbellek nedeniyle eski/yeni içerik farkı ihtimali sürüm işaretiyle test edilsin; bu turda canlı cache arızası doğrulanmadı.

Kabul: Yeniden başlatma/dağıtım sonrası kullanıcı verisi korunur; çıkış oturumu geçersiz kılar; geri yükleme denenir; yayından sonra temel URL'lerde aynı sürüm görülür.

## 90 günlük uygulama planı

| Dönem | İş paketi | Sorumlu rol | Tahmini emek | Tamamlanma ölçütü |
|---|---|---|---|---|
| Gün 1–7 | Rozet/kaynak ayrımı, About metni, en görünür verilerin kontrolü | Editör + frontend | 2–4 iş günü | Yanıltıcı onay izlenimi yok; ilk 10 profil kontrol listesi hazır |
| Gün 1–7 | Üretim veri kalıcılığı ve yayın doğrulaması | Geliştirici | 1–2 iş günü | Hesap deposu ve geri dönüş süreci belgeli |
| Gün 8–21 | Ana sayfa ve footer sadeleştirme, mobil/klavye QA | Tasarım + frontend | 4–7 iş günü | Öncelikli karar akışı ve responsive testler başarılı |
| Gün 8–30 | Veri güncellik alanları, fiyat/audit ayrımı | Geliştirici + editör | 3–6 iş günü | 10 profilde kaynak/tarih tutarlılığı |
| Gün 15–30 | Analitik doğrulaması, canlı SEO taraması, performans başlangıç ölçümü | Geliştirici + analiz | 2–4 iş günü | Başlangıç raporu ve ölçülebilir hedefler hazır |
| Gün 31–60 | Öncelikli içerik kümeleri ve özgün karşılaştırma verileri | Editör | 8–12 iş günü | Öncelikli sayfalarda özgün değer ve iç bağlantı haritası |
| Gün 31–60 | Gerçek dış profiller/listelemeler ve uygun editoryal tanıtım | Yayıncı | 3–5 iş günü + dış bekleme | Başvurular ile kazanılan listelemeler ayrı takip edilir |
| Gün 61–90 | Dönüşüm testleri, ölçümlere göre performans düzeltmeleri | Tasarım + geliştirici + analiz | 5–10 iş günü | Başlangıç verisiyle karşılaştırılmış sonuç raporu |

Emek aralıkları tahminidir; takvim süresi, ekip büyüklüğü ve dış platformların kabul süreleri farklıdır. Yeni hesap, ücretli üyelik veya dışarıya başvuru bu rapor kapsamında yapılmadı.

## İzlenecek başarı göstergeleri

- Organik giriş alan öncelikli sayfalar, markalı sorgular, hedef sorgularda gösterim/tıklama.
- Karşılaştırma başlatma, quiz tamamlama, profil → sağlayıcı tıklama oranı; cihaz bazında.
- Güncelleme süresi dolmuş alan sayısı ve kaynak/tarih kapsamı.
- VPN Advisor'a gerçekten atıf yapan ilgili dış sayfalar ve bunlardan gelen nitelikli ziyaretler. Ham rozet/backlink sayısı başarı ölçüsü değil.
- Mobil performans dağılımı, hata oranı ve kritik erişilebilirlik sorunları.

İlk iki haftalık başlangıç verisi olmadan yüzdesel büyüme hedefleri konulmamalı. Düşük trafikte A/B sonuçları için erken nedensellik iddiasında bulunulmamalı.

## İlk uygulama paketi önerisi

Dış itibar alanını düzelt + About metnini somutlaştır + ilk 10 sağlayıcı verisini doğrula + ana sayfada karşılaştırmayı öne al. Yeni rozet ve makale eklemeden önce bu paketi tamamla.
