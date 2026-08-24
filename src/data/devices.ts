export type DeviceFAQ = { q: string; a: string };

export type DevicePick = {
  slug: string;
  why: string;
  bestFor: string;
};

export type DeviceSetupMethod = {
  name: string;
  difficulty: "Kolay" | "Orta" | "İleri düzey" | "Easy" | "Medium" | "Advanced";
  description: string;
  whenToUse: string;
};

export type DevicePitfall = {
  title: string;
  body: string;
};

export type DeviceContent = {
  slug: string;
  device: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  summary: string;
  whyMatters: string[];
  setupMethods: DeviceSetupMethod[];
  picks: DevicePick[];
  pitfalls: DevicePitfall[];
  faqs: DeviceFAQ[];
  relatedLinks: { label: string; href: string }[];
};

const COMMON_RELATED = [
  { label: "Tüm VPN'leri karşılaştır", href: "/vpn-reviews" },
  { label: "Karşılaştırma metodolojisi ve kaynaklar", href: "/methodology" },
];

export const devices: DeviceContent[] = [
  {
    slug: "android",
    device: "Android telefon ve tablet",
    shortName: "Android",
    metaTitle: "Android İçin En İyi VPN (2026) — Telefon ve Tablet Rehberi",
    metaDescription:
      "Android telefon ve tablette VPN neden gerekli, nasıl kurulur, hangi sağlayıcı en uygun? Kill switch, split tunneling ve Play Store önerileri.",
    tagline:
      "Halka açık Wi-Fi'da ağ düzeyindeki görünürlüğü azaltmak ve etkinliğin IP adresiyle doğrudan ilişkilendirilmesini sınırlamak için VPN, Android'de yararlı bir gizlilik katmanı olabilir.",
    summary:
      "Android geniş VPN istemci uyumluluğu sunar. Play Store kurulumu, WireGuard veya OpenVPN desteği, kill switch ve uygulama bazlı bölünmüş tünelleme gibi özellikler sağlayıcıya, plana, uygulama sürümüne ve cihaza göre değişir. Seçimden sonra ayarları kendi cihazında ve ağında doğrulamak önemlidir.",
    whyMatters: [
      "Halka açık Wi-Fi'da VPN, desteklenen IP trafiğini tünelden geçirerek yerel ağın görebileceği bilgileri azaltabilir; HTTPS ve güncel cihaz güvenliği yine gereklidir.",
      "Uygulamalar reklam kimliği, hesap ve konum sinyalleri kullanabilir. VPN görünen IP adresini değiştirebilir ancak SDK, hesap veya cihaz düzeyindeki takibi tek başına durdurmaz.",
      "Mobil veride VPN, internet sağlayıcısının hedef trafik hakkında öğrenebileceği bilgileri azaltabilir; bağlantı zamanı, veri hacmi ve VPN uç noktası görünür kalabilir.",
      "Sağlayıcı ve Android sürümü destekliyorsa uygulama bazlı tünelleme ile seçili uygulamaların hangi bağlantıyı kullanacağını düzenleyebilirsin; sonucu kendi cihazında doğrula.",
    ],
    setupMethods: [
      {
        name: "Play Store uygulaması",
        difficulty: "Kolay",
        description:
          "Sağlayıcının resmi uygulamasını Play Store'dan indir, hesabınla giriş yap ve Android'in VPN bağlantısı onayını dikkatle incele. Bağlandıktan sonra IP, DNS ve yeniden bağlanma davranışını kendi cihazında kontrol et.",
        whenToUse:
          "Çoğu kullanıcı için başlangıç seçeneği. Uygulama sürümünün sunduğu otomatik güncelleme, kill switch ve split tunneling kontrollerini buradan inceleyebilirsin.",
      },
      {
        name: "WireGuard / OpenVPN manuel",
        difficulty: "Orta",
        description:
          "Sağlayıcının panelinden .conf dosyası indir, WireGuard veya OpenVPN Connect uygulamasına yükle. Kontrol sende — sunucu seçimi, DNS ayarı, MTU değerleri elle yapılır.",
        whenToUse:
          "Geliştiriciysen veya Mullvad/Proton gibi açık-config sunan sağlayıcıları kendi protokollerini kullanmadan kullanmak istiyorsan.",
      },
      {
        name: "Router seviyesinde VPN",
        difficulty: "İleri düzey",
        description:
          "VPN'i router'a kurduğunda desteklenen telefon ve tablet trafiği cihaz başına uygulama olmadan tünelden yönlendirilebilir. Kapsama, IPv6, DNS ve cihaz bazlı istisnalar router yapılandırmasına bağlıdır; her cihazda doğrula.",
        whenToUse:
          "Çocuk tabletleri, geriatrik aile üyelerinin telefonları ya da uygulama yüklenemeyen Smart TV'leriniz varsa.",
      },
    ],
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Genel kullanım",
        why: "NordVPN'in Android belgeleri kill switch, split tunneling, otomatik bağlanma ve Threat Protection özelliklerini listeliyor. Kullanılabilirlik uygulama sürümüne göre değişebilir; güncel özellik listesini ve kendi operatöründeki bağlantı davranışını doğrula.",
      },
      {
        slug: "surfshark",
        bestFor: "Çok cihazlı haneler",
        why: "Surfshark şu anda sınırsız eşzamanlı bağlantı ve CleanWeb filtreleme özelliği sunduğunu belirtiyor. Güncel plan koşullarını kontrol et; kullandığın cihaz ve uygulama sürümlerinin desteklendiğini doğrula.",
      },
      {
        slug: "expressvpn",
        bestFor: "Konum gizliliğine en çok önem verenler",
        why: "ExpressVPN, Lightway'i hızlı ağ değişimleri için tasarlanmış bir protokol olarak tanımlıyor. Yeniden bağlanma süresi, sızıntı koruması ve hız telefon, operatör ve sunucuya göre değişir; kill switch'i açıp Wi-Fi ile mobil veri geçişlerini kendi cihazında test et.",
      },
    ],
    pitfalls: [
      {
        title: "Kill switch kontrollerini aç ve doğrula",
        body:
          "Android'in sistem düzeyindeki 'Always-on VPN' ve 'Block connections without VPN' seçenekleri, sağlayıcının uygulama içi kill switch'ini tamamlayabilir. Destek ve hata anındaki davranış uygulama ile Android sürümüne göre değişir; mevcut kontrolleri aç ve izin verilen bir sızıntı testiyle doğrula.",
      },
      {
        title: "Banka ve devlet uygulamalarını ayırın",
        body:
          "Bazı banka ve kamu uygulamaları yabancı IP nedeniyle ek doğrulama isteyebilir veya erişim sorunu çıkarabilir. Sağlayıcın destekliyorsa bu uygulamaları split tunneling ile VPN dışında bırakmayı değerlendir; bankanın güvenlik yönlendirmelerini izleyip sonucu kendi hesabında doğrula.",
      },
      {
        title: "Pil tüketimine dikkat",
        body:
          "WireGuard ve Lightway gibi hafif protokoller bazı cihazlarda OpenVPN'den daha az pil kullanabilir; sonuç uygulama, sinyal kalitesi, sunucu ve telefona bağlıdır. Varsayılan protokolü seçmeden önce kendi cihazında pil ve bağlantı davranışını karşılaştır.",
      },
    ],
    faqs: [
      {
        q: "Play Store'daki ücretsiz VPN uygulamalarını kullanmak güvenli mi?",
        a: "Ücretsiz VPN uygulamalarına temkinli yaklaş: mağazada listelenmek güvenli veri işleme kanıtı değildir. Geliştiriciyi, izinleri, gizlilik politikasını, gelir modelini ve güncel bağımsız denetimleri incele. Proton VPN ücretsiz planı ve denetimleri hakkında bilgi yayımlıyor; yine de kapsamı ve güncel koşulları resmi belgelerden doğrula.",
      },
      {
        q: "Android'de VPN açıkken bazı uygulamalar çalışmıyor, ne yapmalıyım?",
        a: "Uygulama yabancı veya paylaşılan IP'yi sınırlıyor ya da VPN'in IPv6/DNS desteği cihazın bağlantısıyla uyuşmuyor olabilir. Sağlayıcı belgelerini kontrol et; destekleniyorsa uygulamayı split tunneling ile ayırıp IPv6 ve DNS sızıntı ayarlarını kendi ağında test et.",
      },
      {
        q: "Android TV'de aynı uygulamayı kullanabilir miyim?",
        a: "Bazı büyük sağlayıcılar Android TV uygulaması yayımlıyor ancak mağaza bulunabilirliği ve cihaz desteği değişebilir. Abone olmadan önce TV'nin Play Store'unu ve sağlayıcının güncel uyumluluk sayfasını kontrol et; alternatif kurulumlar için Smart TV rehberimize bak.",
      },
      {
        q: "WireGuard mı OpenVPN mı kullanmalıyım?",
        a: "WireGuard, kompakt tasarımı ve tipik performans profili nedeniyle çoğu cihazda değerlendirilebilecek ilk seçeneklerden biridir. Onu kısıtlayan ağlarda obfuscation veya TCP tabanlı bir mod yardımcı olabilir ancak erişim garanti değildir. Ağ kurallarına uy ve desteklenen protokolleri kendi bağlantında karşılaştır.",
      },
      {
        q: "Android'in yerleşik 'Private DNS' özelliği VPN ihtiyacımı karşılar mı?",
        a: "Hayır. Private DNS, DNS sorgularını şifreler fakat cihaz genelinde trafik tüneli değildir. VPN yerel ağın ve internet sağlayıcısının görebileceği bilgileri azaltırken güveni VPN sağlayıcısına taşır; bazı koşullarda hedef IP ve bağlantı metaverisi yine görünür kalabilir.",
      },
    ],
    relatedLinks: [
      { label: "iPhone için VPN", href: "/devices/iphone" },
      { label: "Smart TV için VPN", href: "/devices/smart-tv" },
      { label: "Türkiye için en iyi VPN", href: "/best-vpn/turkey" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "iphone",
    device: "iPhone",
    shortName: "iPhone",
    metaTitle: "iPhone İçin En İyi VPN (2026) — iOS Kurulum ve Öneriler",
    metaDescription:
      "iPhone'da VPN neden gerekli, App Store uygulamaları, iCloud Private Relay ile çakışmalar ve günlük kullanım için en iyi seçimler.",
    tagline:
      "Apple'ın gizlilik özellikleri cihaz genelinde bir VPN değildir; doğru yapılandırılmış bir VPN iPhone'da ağ düzeyindeki görünürlüğü azaltabilir.",
    summary:
      "App Tracking Transparency ve Mail Privacy Protection bazı takip sinyallerini azaltır ancak cihaz genelinde bir VPN değildir. VPN halka açık Wi-Fi ve internet sağlayıcısı düzeyindeki görünürlüğü azaltabilir; metaveriyi bütünüyle yok etmek yerine güveni VPN sağlayıcısına taşır.",
    whyMatters: [
      "iCloud Private Relay genel amaçlı, cihaz genelinde bir VPN değildir; kapsadığı trafiği Apple'ın güncel belgelerinden kontrol et.",
      "Bazı App Store uygulamaları IP tabanlı konum sinyallerini kullanabilen reklam SDK'ları içerir. VPN görünen IP'yi değiştirebilir ancak SDK veya hesap tabanlı takibi durdurmaz.",
      "Halka açık Wi-Fi'ya bağlanınca iOS servisleri arka plan trafiği üretir. VPN desteklenen IP trafiğini tünelleyebilir fakat her bağlantı metaverisini veya uygulama telemetrisini ortadan kaldırmaz.",
      "Bazı bankacılık ve devlet uygulamaları yabancı IP nedeniyle ek doğrulama isteyebilir veya erişimi sınırlayabilir. iOS'taki split tunneling seçenekleri sağlayıcıya göre değiştiği için güncel 'trusted networks' ya da uygulama istisnası desteğini kontrol et.",
    ],
    setupMethods: [
      {
        name: "App Store uygulaması",
        difficulty: "Kolay",
        description:
          "Sağlayıcının resmi uygulamasını App Store'dan yükle, iOS'un VPN konfigürasyonu ekleme isteğini inceleyip onayla ve uygulamadaki kurulum adımlarını tamamla. Sonrasında IP, DNS ve yeniden bağlanma davranışını doğrula.",
        whenToUse:
          "Çoğu kullanıcı için. Hesap ve ayar senkronu sağlayıcıya ve uygulama sürümüne göre değişebileceğinden kullandığın cihazlarda kontrol et.",
      },
      {
        name: "IKEv2 manuel profil",
        difficulty: "Orta",
        description:
          "iOS'un yerleşik IKEv2 desteği var; sağlayıcının panelinden .mobileconfig dosyası indirip Ayarlar > VPN üzerinden eklersin. Uygulama olmadan, sistem seviyesinde VPN.",
        whenToUse:
          "Birden fazla iOS cihazını tek profille yönetmek veya MDM (mobil cihaz yönetimi) ile dağıtım için.",
      },
      {
        name: "WireGuard resmi uygulama",
        difficulty: "Orta",
        description:
          "App Store'daki resmi WireGuard uygulamasına sağlayıcının .conf dosyasını yükleyebilirsin. İstemci açık kaynaklıdır; hız ve pil kullanımı cihaz, ağ ve yapılandırmaya göre değişir.",
        whenToUse:
          "Mullvad gibi minimal sağlayıcılarla veya birden fazla sağlayıcıyı tek uygulamada yönetmek için.",
      },
    ],
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Günlük iOS kullanımı",
        why: "ExpressVPN, iOS'ta Lightway desteğini ve Apple TV uygulamasını resmi belgelerinde listeliyor. Kurulum deneyimi ve yeniden bağlanma süresi cihaz, ağ ve uygulama sürümüne göre değişir; Wi-Fi ile hücresel veri geçişini kendi cihazında test et.",
      },
      {
        slug: "proton-vpn",
        bestFor: "Gizlilik öncelikli iPhone kullanıcısı",
        why: "Proton VPN, iOS kaynak kodu, denetim materyali ve ücretsiz plan koşulları yayımlıyor. Bu özelliklerin ihtiyacına uygunluğunu değerlendirirken güncel denetim kapsamını ve plan sınırlarını sağlayıcının resmi belgelerinden doğrula.",
      },
      {
        slug: "nordvpn",
        bestFor: "Streaming ve Türkiye sunucusu",
        why: "NordVPN, Türkiye sunucu erişimini ve iOS filtreleme özelliklerini resmi belgelerinde listeliyor. Streaming uyumluluğu servislerin kontrolleri değiştikçe farklılaşır; gereken her servisi kendi iPhone'un ve ağında doğrula.",
      },
    ],
    pitfalls: [
      {
        title: "iCloud Private Relay ile çakışma",
        body:
          "iCloud+ aboneliğin varsa Private Relay etkin olabilir. VPN ile birlikte kullanım, güncel iOS ve sağlayıcı uygulamasına bağlı olarak yönlendirmeyi, performansı veya site kontrollerini etkileyebilir. Herhangi bir özelliği kapatmadan önce Apple ve sağlayıcı belgelerini incele, iki ayarı da kendi bağlantında karşılaştır.",
      },
      {
        title: "'Connect On Demand' özelliğini aktif et",
        body:
          "Sağlayıcın destekliyorsa 'Connect On Demand' veya 'Auto-connect on untrusted Wi-Fi' özelliğini aç. Bu ayar Wi-Fi'a katılırken bağlantıyı otomatik başlatmayı deneyebilir; uyku/uyanma ve ağ geçişlerindeki olası boşlukları kendi cihazında test et.",
      },
      {
        title: "App Store içi ödeme vs. sağlayıcı sitesi",
        body:
          "App Store ile sağlayıcının sitesindeki fiyat, yenileme koşulu, iade ve dahil özellikler farklı olabilir. Satın almadan önce iki ödeme ekranındaki güncel toplam ve koşulları karşılaştır; web aboneliğinin iOS uygulamasında kullanılabildiğini doğrula. Affiliate bağlantılarımız doğrudan sağlayıcının sitesine gider.",
      },
    ],
    faqs: [
      {
        q: "iPhone'un yerleşik VPN'i Apple'dan mı geliyor?",
        a: "Hayır. Ayarlar > Genel > VPN ve Cihaz Yönetimi bölümü uyumlu üçüncü taraf veya yönetilen VPN hizmetlerini yapılandırır. Private Relay genel amaçlı, cihaz genelinde bir VPN değildir; trafik kapsamını Apple'ın güncel belgelerinden kontrol et.",
      },
      {
        q: "App Store ücretsiz VPN uygulamalarına güvenebilir miyim?",
        a: "Şüpheyle yaklaş: App Store incelemesi her gizlilik iddiasını bağımsız olarak doğrulamaz. Geliştiriciyi, izinleri, gizlilik politikasını, gelir modelini ve güncel denetimleri kontrol et. Proton VPN denetim ve ücretsiz plan bilgileri yayımlayan seçeneklerden biridir; bunu evrensel bir güvenlik garantisi sayma.",
      },
      {
        q: "iPhone'da VPN açıkken FaceTime veya iMessage çalışmaz mı?",
        a: "Çoğu yapılandırmada çalışabilir; ancak oturum açma veya aktivasyon sırasında ağ ve IP değişiklikleri ek doğrulama ya da hata doğurabilir. Sorun olursa Apple ve sağlayıcı belgelerini kontrol et, farklı sunucu/protokolü kendi cihazında dene ve VPN'i yalnızca riskini kabul ediyorsan geçici olarak kapat.",
      },
      {
        q: "iPad'imde aynı abonelik çalışır mı?",
        a: "Birçok sağlayıcı iPadOS uygulaması ve cihazlar arasında aynı hesapla kullanım sunuyor; uygulama bulunabilirliği ile eşzamanlı bağlantı sınırı plana göre değişir. Sağlayıcının güncel cihaz listesini ve koşullarını doğrula; iPad'e özgü ayarlar için rehberimize bak.",
      },
      {
        q: "Apple Watch için ayrı bir VPN gerekiyor mu?",
        a: "Apple Watch, iPhone ile aynı genel VPN uygulaması kurulumunu sunmaz; trafik yolu Wi-Fi, hücresel bağlantı ve eşleştirilmiş telefona göre değişebilir. Modelin için Apple ve sağlayıcı belgelerini kontrol et; iPhone VPN'i açık diye saatin her bağlantısının tünellendiğini varsayma.",
      },
    ],
    relatedLinks: [
      { label: "iPad için VPN", href: "/devices/ipad" },
      { label: "Android için VPN", href: "/devices/android" },
      { label: "Gizlilik için en iyi VPN", href: "/best-vpn/privacy" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "ipad",
    device: "iPad",
    shortName: "iPad",
    metaTitle: "iPad İçin En İyi VPN (2026) — Streaming ve Üretkenlik Rehberi",
    metaDescription:
      "iPad'de VPN kurulumu, Stage Manager ile uyumluluk, streaming için en iyi sağlayıcılar ve cihaza özel dikkat noktaları.",
    tagline:
      "Büyük ekran, daha fazla streaming, daha çok genel ağ kullanımı — iPad'in saldırı yüzeyi telefondan farklı.",
    summary:
      "iPad'i kafede çalışmak, seyahatte içerik izlemek veya aynı anda birden fazla uygulama kullanmak için tercih edebilirsin. Bu kullanım profili split tunneling, streaming uyumluluğu ve arka plan bağlantısını önemli hâle getirir; her özelliği kendi iPadOS sürümünde ve ağında doğrulamak gerekir.",
    whyMatters: [
      "iPad'i kafe, kütüphane, kampüs veya otel Wi-Fi'ında kullanıyorsan VPN yerel ağ görünürlüğünü azaltabilir; HTTPS, güncellemeler ve ağın güvenilirliğini değerlendirmek yine gereklidir.",
      "Streaming hızı ve bölgesel katalog uyumluluğu servis, sunucu, konum, hesap ve bağlantıya göre değişir. Kullandığın uygulamaları kendi ağında doğrula.",
      "Reklam veya izleyici filtreleme özelliği bazı bağlantıları azaltabilir ancak çocuk profili, uygulama izinleri ve ebeveyn denetimlerinin yerini almaz; sağlayıcının kapsamını kontrol et.",
      "Stage Manager ve Split View kullanırken arka plan tüneli uygulama ile iPadOS sürümüne göre farklı davranabilir; çoklu görev, uyku/uyanma ve yeniden bağlanmayı kendi iPad'inde test et.",
    ],
    setupMethods: [
      {
        name: "App Store uygulaması",
        difficulty: "Kolay",
        description:
          "Sağlayıcının iPad uygulamasını App Store'dan yükleyip uygun hesabınla giriş yap. Ayar senkronu ve arka plan davranışı sağlayıcı ile iPadOS sürümüne göre değişir; kurulumdan sonra ikisini de doğrula.",
        whenToUse: "Çoğu kullanıcı için başlangıç seçeneği.",
      },
      {
        name: "Apple Configurator ile profil yükleme",
        difficulty: "İleri düzey",
        description:
          "Birden fazla iPad'i tek profille yönetmek istiyorsan Apple Configurator (Mac) ile .mobileconfig dosyasını toplu yükleyebilirsin. Eğitim kurumları, küçük şirketler için.",
        whenToUse:
          "Aile veya küçük bir işletmede birden fazla iPad'i aynı doğrulanmış profille yönetmek istiyorsan.",
      },
      {
        name: "Router seviyesinde VPN",
        difficulty: "İleri düzey",
        description:
          "Ev router'ında VPN yapılandırıldığında seçilen iPad trafiği ev ağındayken tünelden yönlendirilebilir. DNS, IPv6 ve politika tabanlı yönlendirmeyi doğrula; ev dışında iPad'in kendi VPN yapılandırması gerekir.",
        whenToUse:
          "iPad çoğunlukla evde kalıyorsa ve desteklenen internet trafiğini cihaz başına kurulum olmadan tünelden yönlendirmek istiyorsan.",
      },
    ],
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Streaming ve bölgesel kütüphane",
        why: "NordVPN, iPadOS desteğini, streaming odaklı özellikleri ve Türkiye sunucu erişimini resmi belgelerinde listeliyor. Erişim servis, sunucu, hesap bölgesi ve ağa göre değişebilir; gerekli her uygulamayı kendi iPad'inde doğrula.",
      },
      {
        slug: "expressvpn",
        bestFor: "Premium iPad deneyimi",
        why: "ExpressVPN şu anda iPad, Mac ve Apple TV uygulamalarını ve Lightway protokolünü resmi belgelerinde listeliyor. Cihaz sınırı, 4K için gereken hız ve arka plan davranışı güncel plana ve bağlantıya bağlıdır; kendi cihazlarınla doğrula.",
      },
      {
        slug: "surfshark",
        bestFor: "Tek hesapta çok cihaz",
        why: "Surfshark şu anda sınırsız eşzamanlı bağlantı sunduğunu belirtiyor; bu, çok cihazlı haneler için uygun olabilir. Değer kararından önce güncel fiyatı, yenileme koşullarını, platform desteğini ve kendi ağındaki performansı karşılaştır.",
      },
    ],
    pitfalls: [
      {
        title: "Sertifika güvenmiyor hatası",
        body:
          "iPadOS bir VPN profili veya sertifikası için güven uyarısı gösterirse kaynağını doğrulamadan onaylama. Sağlayıcının ve Apple'ın güncel kurulum belgelerindeki profil adı ile imza ayrıntılarını karşılaştır; ardından IP ve DNS davranışını izin verilen bir testle kontrol et.",
      },
      {
        title: "Split View'da VPN arka plana atıldığında düşmesi",
        body:
          "Arka plan bağlantısı iPadOS, uygulama ve protokol sürümüne göre farklı davranabilir. WireGuard veya Lightway tabanlı modlar geçişleri iyileştirebilir ancak bunu garanti etmez; kill switch açıkken Split View, Stage Manager ve uyku/uyanma davranışını test et.",
      },
      {
        title: "Çocuk profili Wi-Fi'ya bağlanırken VPN kuruluyor mu?",
        body:
          "Çocuk hesabındaki VPN profili kurulumu, Family Sharing, Screen Time veya MDM kısıtlamalarına göre yetişkin ya da yönetici onayı gerektirebilir. Modelin ve iPadOS sürümün için Apple'ın güncel belgelerini izle; profili aile yöneticisi hesabından doğrula.",
      },
    ],
    faqs: [
      {
        q: "iPad'imde VPN açıkken Apple Pencil veya yan klavye sorun çıkarır mı?",
        a: "Hayır. VPN sadece ağ trafiğini etkiler; Bluetooth (Pencil, klavye, fare) ve USB-C bağlantılarıyla ilgisi yok.",
      },
      {
        q: "Mobil veri (eSIM) ile bağlandığımda VPN aynı şekilde çalışır mı?",
        a: "VPN hücresel bağlantıda çalışabilir ancak Wi-Fi, 5G ve 4G arasındaki geçişler tüneli kesintiye uğratabilir. Desteklenen otomatik bağlanma ve always-on kontrolleri boşlukları azaltabilir; davranışı ve sızıntı korumasını kendi iPad'in ve operatöründe doğrula.",
      },
      {
        q: "iPad'imde tek başına Wi-Fi'a güvenli mi bağlanırım, VPN şart mı?",
        a: "HTTPS web içeriğinin önemli bölümünü korur; VPN ise yerel ağ görünürlüğünü ve bazı DNS risklerini azaltabilir. Kimlik avını, kötü niyetli giriş portallarını, güvensiz uygulamaları veya güvenilmeyen VPN sağlayıcısını engellemez. HTTPS ve güncellemeleri koru, kullandığın ağı ayrıca değerlendir.",
      },
      {
        q: "iPad'de hangi VPN protokolünü seçmeliyim?",
        a: "WireGuard veya sağlayıcının hafif protokolü çoğu durumda değerlendirilebilecek ilk seçeneklerdir; IKEv2 yararlı bir yedek olabilir. OpenVPN hız ve pil karşılığında farklı uyumluluk sunabilir. Desteklenen modları kendi iPad'in ve ağında karşılaştır.",
      },
      {
        q: "iPad'de eğitim kurumumun Wi-Fi'sı VPN'i engelliyor, ne yapmalıyım?",
        a: "Bazı okul veya kampüs ağları UDP ya da VPN trafiğini kısıtlar. Sağlayıcının obfuscation, stealth veya TCP modu yardımcı olabilir ancak erişim garanti değildir ve kontrolleri aşmak ağ politikasını ihlal edebilir. Yöneticiden izin al ve yalnızca izin verilen bağlantılarda test et.",
      },
    ],
    relatedLinks: [
      { label: "iPhone için VPN", href: "/devices/iphone" },
      { label: "Streaming için en iyi VPN", href: "/best-vpn/streaming" },
      { label: "Seyahat için en iyi VPN", href: "/best-vpn/travel" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "smart-tv",
    device: "Smart TV (Samsung, LG, Android TV, Apple TV)",
    shortName: "Smart TV",
    metaTitle: "Smart TV İçin En İyi VPN (2026) — Samsung, LG, Android TV, Apple TV",
    metaDescription:
      "Samsung Tizen ve LG webOS'a VPN nasıl yüklenir? Router seviyesinde VPN, Smart DNS, Android TV ve Apple TV (tvOS 17+) için detaylı rehber.",
    tagline:
      "Akıllı TV'de VPN uygulaması desteği platforma, modele ve bölgeye göre değişir; bazı cihazlarda router veya Smart DNS kurulumu gerekebilir.",
    summary:
      "Smart TV'de temel konu uygulama bulunabilirliğidir; işletim sistemi, model, bölge ve sağlayıcıya göre değişir. Android TV/Google TV ve desteklenen tvOS sürümlerinde üçüncü taraf VPN uygulamaları bulunabilir; bazı Samsung Tizen ve LG webOS modellerinde router VPN ya da şifreleme sağlamayan Smart DNS gerekebilir. Önce TV mağazasını ve sağlayıcının güncel uyumluluk sayfasını kontrol et.",
    whyMatters: [
      "Yayımlanmış akademik çalışmalar ACR ve Smart TV telemetrisi kullanımını belgelemiştir. VPN desteklenen ağ trafiğini aktarım sırasında şifreleyebilir ancak TV'nin telemetri toplamasını veya göndermesini durdurmaz; cihaz gizlilik ayarlarını ve güncel araştırmaları da incele.",
      "İnternet sağlayıcısı servise özgü trafik yönetimi uyguluyorsa VPN sınıflandırmayı değiştirebilir; şifreleme yükü hızı da azaltabilir. Sonuç çıkarmadan önce kendi bağlantındaki temel ve VPN'li sonuçları karşılaştır.",
      "Streaming katalogları bölgeye göre değişir ve bazı servisler VPN kullanımını sınırlar. Uyumluluk sık değiştiği için güncel hizmet koşullarını kontrol et; kullanacağın TV uygulaması, hesap ve sunucuyu kendin test et.",
      "Router düzeyindeki VPN yapılandırılmış cihaz trafiğini tünelleyebilir; istisnalar, IPv6, DNS ve yerel ağ trafiği router ayarına bağlıdır ve her cihazda doğrulanmalıdır.",
    ],
    setupMethods: [
      {
        name: "Android TV / Google TV resmi uygulaması",
        difficulty: "Kolay",
        description:
          "Modelin ve bölgen için mevcutsa sağlayıcının resmi Android TV uygulamasını Play Store'dan yükle. Mağaza listesini ve güncel uyumluluk sayfasını kontrol et; TV özellikleri telefon uygulamasından farklı olabilir.",
        whenToUse:
          "TV'n uyumlu bir Android TV veya Google TV sürümü çalıştırıyorsa doğrudan uygulama seçeneği olarak.",
      },
      {
        name: "Apple TV tvOS uygulaması (tvOS 17+)",
        difficulty: "Kolay",
        description:
          "Apple tvOS 17'de üçüncü taraf VPN uygulaması desteğini ekledi ve bazı sağlayıcılar tvOS uygulaması yayımlıyor. Tam modelin için sağlayıcının güncel App Store listesini ve Apple'ın uyumluluk bilgisini kontrol et.",
        whenToUse:
          "Apple TV modelin desteklenen bir tvOS sürümünü çalıştırıyor ve sağlayıcı uygulaması bölgendeki mağazada bulunuyorsa.",
      },
      {
        name: "Router seviyesinde VPN",
        difficulty: "İleri düzey",
        description:
          "Desteklenen bir VPN istemcisini Wi-Fi router'ına kurarsın. Bu istemci üzerinden yönlendirilen cihazlar tüneli kullanabilir; konuk ağı, IPv6, DNS ve politika tabanlı istisnalar farklı davranabileceğinden her cihazda kapsamı doğrula.",
        whenToUse:
          "Samsung veya LG TV mağazanda uyumlu VPN uygulaması yoksa desteklenen bir router kurulumu alternatif olabilir; önce güncel uygulama ve router uyumluluğunu kontrol et.",
      },
      {
        name: "Smart DNS (VPN şifrelemesi yok)",
        difficulty: "Orta",
        description:
          "Bazı sağlayıcılar uyumlu TV'ler için Smart DNS hizmeti belgeliyor. Bu yöntem DNS yönlendirmesini değiştirir; trafiği şifrelemez ve genel IP'yi gizlemez. Bölgesel erişim ile değişmeyen hız garanti değildir; güncel servis desteğini kontrol edip kullandığın TV uygulamasında test et.",
        whenToUse:
          "Güncel olarak desteklenen bölgesel içerik özelliğini denemek istiyor ve Smart DNS'in VPN gizliliği sağlamadığını anlıyorsan.",
      },
    ],
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Apple TV ve router kullananlar",
        why: "ExpressVPN şu anda tvOS uygulaması, Aircove router seçenekleri ve MediaStreamer Smart DNS için resmi belgeler yayımlıyor. Model desteğini, kurulum gereksinimlerini ve güncel streaming uyumluluğunu kendi TV ve ağında doğrula.",
      },
      {
        slug: "nordvpn",
        bestFor: "Android TV streaming",
        why: "NordVPN Android TV, SmartPlay ve router kurulumu için resmi belgeler yayımlıyor. Özellik bulunabilirliği ve streaming erişimi değişebilir; güncel plan ayrıntılarını kontrol edip kullandığın TV uygulaması ile ağda test et.",
      },
      {
        slug: "surfshark",
        bestFor: "Bütçe + Smart DNS",
        why: "Surfshark şu anda Smart DNS, Android TV uygulaması ve sınırsız eşzamanlı bağlantı sunduğunu belirtiyor. Satın almadan önce güncel plana dahil olup olmadığını, cihaz uyumluluğunu ve kurulum davranışını doğrula.",
      },
    ],
    pitfalls: [
      {
        title: "Smart DNS bir gizlilik aracı değildir",
        body:
          "Smart DNS bir VPN değildir: bağlantıyı şifrelemez veya genel IP'yi gizlemez. DNS yönlendirmesi desteklenen bir servisin bölge belirleme biçimini etkileyebilir ancak uyumluluk değişebilir; bunu gizlilik veya erişim garantisi olarak sunma.",
      },
      {
        title: "Router üzerinden yönlenen cihazlar aynı VPN IP'sini paylaşabilir",
        body:
          "Aynı VPN sunucusu üzerinden yönlendirilen cihazlar genel IP'yi paylaşabilir ve bu bazı banka uygulamalarında ek doğrulama tetikleyebilir. Router destekliyorsa politika tabanlı yönlendirme kullan veya banka ve router belgelerini kontrol ettikten sonra ilgili cihazı tünel dışında bırak.",
      },
      {
        title: "TV'nin kendi smart-home trafiği VPN ile çakışabilir",
        body:
          "SmartThings, ThinQ veya Google Home gibi servisler yerel ağ keşfine ya da belirli bölge koşullarına bağlı çalışabilir. Sorun çıkarsa üretici ve router belgelerini kontrol et; destekleniyorsa akıllı ev trafiğini yerelde tutan politika tabanlı yönlendirmeyi kendi ağında dene.",
      },
    ],
    faqs: [
      {
        q: "Samsung veya LG TV'me doğrudan VPN yükleyebilir miyim?",
        a: "Samsung Tizen ve LG webOS'ta doğrudan VPN uygulaması bulunabilirliği model ve bölgeye göre sınırlı olabilir. Önce TV'nin güncel mağazasını kontrol et; alternatifler arasında uyumlu router, VPN şifrelemesi sağlamayan Smart DNS veya HDMI ile bağlanan destekli bir streaming cihazı yer alır.",
      },
      {
        q: "Apple TV'me hangi VPN'i kurabilirim?",
        a: "Bazı sağlayıcılar tvOS uygulaması yayımlıyor ancak liste, bölgesel bulunabilirlik ve model gereksinimleri değişir. Kurulum seçmeden önce Apple TV App Store'u, sağlayıcının uyumluluk sayfasını ve Apple'ın desteklenen tvOS listesini kontrol et.",
      },
      {
        q: "Router'ıma VPN kurmak garantiyi düşürür mü, performansı nasıl etkiler?",
        a: "Üçüncü taraf firmware cihaz arızası riski doğurabilir veya garanti kapsamını etkileyebilir; yüklemeden önce üreticinin güncel koşullarını kontrol et. VPN şifrelemesi işlemci yükü ekler ancak hız etkisi router, protokol ve bağlantıya göre geniş ölçüde değişir. Kendi kurulumunu ölç veya belgelenmiş VPN aktarım hızına sahip donanım seç.",
      },
      {
        q: "Akıllı TV'mde VPN ile Netflix yine de blokluyorsa ne yapayım?",
        a: "Streaming servisleri bilinen VPN uç noktalarını sınırlayabilir. Servisin güncel koşullarını ve sağlayıcının destek sayfasını kontrol et; ardından sağlayıcının önerdiği sunucuyu dene veya destek ekibiyle görüş. Bir sunucuda ya da belirli bir günde alınan sonuç gelecekteki erişimi garanti etmez.",
      },
      {
        q: "Chromecast'i VPN ile kullanmak için ayrı yöntem mi gerekiyor?",
        a: "Google TV çalıştırmayan eski Chromecast modelleri doğrudan VPN uygulaması kurmayabilir. Yayın akışında içeriği telefon yerine Chromecast'in kendisi çekebileceğinden telefondaki VPN'in tüm trafiği kapsadığını varsayma. Modelinin Google belgelerini kontrol et; gerekirse uyumlu router kurulumu kullan ve IP/DNS davranışını TV'de doğrula.",
      },
    ],
    relatedLinks: [
      { label: "Streaming için en iyi VPN", href: "/best-vpn/streaming" },
      { label: "Android için VPN", href: "/devices/android" },
      { label: "Yurt dışındaki Türkler için VPN", href: "/best-vpn/turks-abroad" },
      ...COMMON_RELATED,
    ],
  },
];

import type { Locale } from "@/i18n/pick";
import { devicesEn } from "./devices.en";

export function getDevice(
  slug: string,
  locale: Locale = "tr",
): DeviceContent | undefined {
  const list = locale === "en" ? devicesEn : devices;
  return list.find((d) => d.slug === slug);
}
