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
  { label: "Tüm VPN'leri karşılaştır", href: "/en-iyi-vpn" },
  { label: "Test metodolojimiz", href: "/metodoloji" },
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
      "Google'ın veri toplama ekosisteminden çıkmak ve halka açık Wi-Fi'da güvenlik için Android'de VPN şart.",
    summary:
      "Android, dünyada en yaygın mobil işletim sistemi ve aynı zamanda en geniş VPN istemci uyumluluğuna sahip platform. Play Store'daki tek tıklık kurulum, WireGuard ve OpenVPN protokol desteği, kill switch ile uygulama bazlı bölünmüş tünelleme (split tunneling) — bunların hepsi büyük VPN sağlayıcılarında yıllardır olgunlaştı. Asıl mesele hangisini seçtiğin değil, doğru ayarları yapıp yapmadığın.",
    whyMatters: [
      "Halka açık Wi-Fi (kafe, otel, havalimanı) ortamında HTTPS olmayan uygulamalardan veri sızabilir — VPN bu trafiği sarar.",
      "Google ve uygulama geliştiricileri reklam ID'si ve konum verisi topluyor; VPN tek başına bunu engellemez ama IP bağlantısını koparır.",
      "ISP, mobil veride hangi uygulamalara hangi saatlerde bağlandığını metaveri olarak görüyor; VPN bu görünürlüğü tamamen keser.",
      "Bazı Android uygulamaları (özellikle ücretsiz oyunlar ve düşük profilli yardımcı uygulamalar) arka planda izleyici ağlarına bağlanıyor; uygulama bazlı tünelleme ile yalnızca seçtiklerini VPN üzerinden geçirebilirsin.",
    ],
    setupMethods: [
      {
        name: "Play Store uygulaması",
        difficulty: "Kolay",
        description:
          "Sağlayıcının resmi uygulamasını Play Store'dan indir, hesabınla giriş yap, tek tıkla bağlan. Bağlanırken Android sistem uyarısı çıkar (VPN sertifikası onayı), tamam dediğinde her şey otomatik ayarlanır.",
        whenToUse:
          "Çoğu kullanıcı için doğru seçim. Otomatik güncellemeler, kill switch ve split tunneling buradan yönetilir.",
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
          "Tüm ev ağını VPN'e bağladığında telefon ve tablet otomatik olarak korunur — ayrı uygulama gerekmez. Cihaz başına ayar yok, dezavantaj da bu: VPN'i tek bir cihaz için kapatamazsın.",
        whenToUse:
          "Çocuk tabletleri, geriatrik aile üyelerinin telefonları ya da uygulama yüklenemeyen Smart TV'leriniz varsa.",
      },
    ],
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Genel kullanım",
        why: "Android uygulaması olgun: kill switch, split tunneling, otomatik bağlanma, Threat Protection ile reklam/zararlı yazılım engelleme dahil. Birden fazla 5G operatöründe stabil davranır.",
      },
      {
        slug: "surfshark",
        bestFor: "Çok cihazlı haneler",
        why: "Sınırsız eşzamanlı cihaz desteği — telefon, tablet, eşinin telefonu, çocuğun tableti ve sonra da bilgisayar… hepsi tek hesapta. CleanWeb reklam engelleme cabası.",
      },
      {
        slug: "expressvpn",
        bestFor: "Konum gizliliğine en çok önem verenler",
        why: "Lightway protokolü mobil ağ değişimlerinde (Wi-Fi → 4G geçişi) hızlı yeniden bağlanır, böylece kısa süreliğine bile olsa IP sızıntısı olmaz. Android'de tutarlı en yüksek hızı ölçtük.",
      },
    ],
    pitfalls: [
      {
        title: "Kill switch'i mutlaka aç",
        body:
          "Android'de VPN bağlantısı koptuğunda sistem trafiğine devam etmesini engelleyen iki ayar var: sağlayıcının uygulama içi kill switch'i + Android'in sistem ayarlarındaki 'Always-on VPN' + 'Block connections without VPN' seçeneği. İkisini birden aç — birincisi uygulama kilitlenirse seni korumaz, ikincisi korur.",
      },
      {
        title: "Banka ve devlet uygulamalarını ayırın",
        body:
          "Türkiye'deki bazı banka, e-Devlet ve PTT uygulamaları yurt dışı IP'den girişi tehdit olarak görüp hesabını geçici kilitleyebilir. Split tunneling ile bu uygulamaları VPN dışında bırak; bankacılık trafiği Türk IP'sinden çıksın, kalan trafik VPN'den.",
      },
      {
        title: "Pil tüketimine dikkat",
        body:
          "WireGuard ve Lightway protokolleri arka planda OpenVPN'e göre belirgin biçimde daha az pil tüketir. Eski OpenVPN bağlantıları cihazı sıcakta tutar, batarya çabuk biter. Mümkünse WireGuard tabanlı protokole geç.",
      },
    ],
    faqs: [
      {
        q: "Play Store'daki ücretsiz VPN uygulamalarını kullanmak güvenli mi?",
        a: "Genel olarak hayır. 2023-2025 arasında yapılan akademik çalışmalar (CSIRO, Univ. of Sydney) Play Store'daki ücretsiz VPN uygulamalarının önemli bir kısmında üçüncü taraf izleyicilere veri sızdırma, gereksiz izin talebi ve hatta zararlı yazılım davranışı tespit etti. Ücretsiz olmasını istiyorsan Proton VPN'in ücretsiz planı en güvenli seçimdir — gerçek bir şirket, yıllık denetim ve şeffaf gelir modeli var.",
      },
      {
        q: "Android'de VPN açıkken bazı uygulamalar çalışmıyor, ne yapmalıyım?",
        a: "İki yaygın sebep var: (1) Uygulama yurt dışı IP'yi engelliyor (Türk bankacılığı, Trendyol Wallet, BluTV bazen) — bu uygulamaları split tunneling ile VPN dışına al. (2) Uygulama IPv6 üzerinden konuşmaya çalışıyor ve VPN sadece IPv4 destekliyor — sağlayıcının ayarlarından IPv6 sızıntı engelini aç veya IPv6'yı kapat.",
      },
      {
        q: "Android TV'de aynı uygulamayı kullanabilir miyim?",
        a: "Evet — NordVPN, Surfshark, ExpressVPN, CyberGhost ve PIA Android TV mağazasında resmi uygulamaya sahip. Mullvad'in Android TV uygulaması yok ama APK olarak yüklenebilir. Smart TV rehberimizde detaylı anlatıldı.",
      },
      {
        q: "WireGuard mı OpenVPN mı kullanmalıyım?",
        a: "Çoğu durumda WireGuard. Daha hızlı, daha az pil, daha az kod (=daha küçük saldırı yüzeyi). OpenVPN'i sadece WireGuard'ın engellendiği ağlarda (bazı kurumsal Wi-Fi, bazı kısıtlayıcı ülkeler) tercih et — TCP 443 üzerinden çalışan obfuscated OpenVPN engellemeleri aşar.",
      },
      {
        q: "Android'in yerleşik 'Private DNS' özelliği VPN ihtiyacımı karşılar mı?",
        a: "Hayır. Private DNS (DNS-over-TLS) sadece DNS sorgularını şifreler — ISP'nin hangi siteyle konuştuğunu öğrenmesini zorlaştırır ama hâlâ ISP üzerinden geçen tüm IP trafiğin görünür. Trafiğini gerçekten kapatmak için tam VPN tüneline ihtiyacın var.",
      },
    ],
    relatedLinks: [
      { label: "iPhone için VPN", href: "/cihazlar/iphone" },
      { label: "Smart TV için VPN", href: "/cihazlar/smart-tv" },
      { label: "Türkiye için en iyi VPN", href: "/en-iyi/turkiye" },
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
      "Apple güçlü gizlilik markası taşır ama bu IP adresini ve trafiği kapatmaz — iPhone'da da VPN'in yeri farklı.",
    summary:
      "iPhone'un App Tracking Transparency ve Mail Privacy Protection gibi özellikleri uygulama içi takibi azaltır, ama bunlar sadece Apple ekosistemi içindeki sinyalleri keser. ISP hâlâ hangi sunuculara bağlandığını, halka açık Wi-Fi sahibi hâlâ trafik metaverini görüyor. VPN bu görünürlüğü kapatan tek araç.",
    whyMatters: [
      "iCloud Private Relay yalnızca Safari trafiğini koruyor — diğer uygulamalar (üçüncü taraf tarayıcılar, oyunlar, sosyal medya, finans uygulamaları) açıkta kalıyor.",
      "App Store'daki uygulamaların önemli bir kısmı reklam SDK'ları içeriyor ve cihazın IP adresi üzerinden konum/davranış profili çıkarıyor; VPN bu zincirin temel halkasını kırar.",
      "Halka açık Wi-Fi'ya bağlandığında iOS arka planda iCloud Drive sync, App Store kontrolü, push notification kanalları gibi şifreli ama metaveri sızdıran trafiği başlatır — VPN bunu sarar.",
      "Bazı bankacılık ve devlet uygulamaları yurt dışı IP'yi bloklar; iPhone'da split tunneling sınırlı olduğu için sağlayıcının 'trusted networks' / 'exclude apps' özelliği önem kazanır.",
    ],
    setupMethods: [
      {
        name: "App Store uygulaması",
        difficulty: "Kolay",
        description:
          "Sağlayıcının resmi uygulamasını App Store'dan yükle, açtığında iOS senden VPN konfigürasyonu ekleme izni ister, onayla — uygulama gerisini halleder.",
        whenToUse:
          "Hemen hemen herkes için. iCloud üzerinden iPhone, iPad ve Mac arasında ayar senkronu da bu yolla.",
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
          "App Store'daki resmi WireGuard uygulamasına sağlayıcının .conf'unu yükleyebilirsin. Pil dostu, hızlı, açık kaynak.",
        whenToUse:
          "Mullvad gibi minimal sağlayıcılarla veya birden fazla sağlayıcıyı tek uygulamada yönetmek için.",
      },
    ],
    picks: [
      {
        slug: "expressvpn",
        bestFor: "En akıcı günlük kullanım",
        why: "iOS uygulaması en sade ve hızlı kuruluma sahip. Lightway protokolü Wi-Fi/5G geçişlerinde 1-2 saniyede yeniden bağlanıyor, kullanıcı kopuşu fark etmiyor. Apple TV uygulaması da var — ekosistem tutarlı.",
      },
      {
        slug: "proton-vpn",
        bestFor: "Gizlilik öncelikli iPhone kullanıcısı",
        why: "İsviçre yasal yetkisi, açık kaynak iOS istemcisi (GitHub'da denetlenebilir), yıllık no-logs denetimleri ve ücretsiz planı bile sınırsız bant genişliği sunması iPhone'un 'gizlilik markası' söylemine en uyumlu eşleşme.",
      },
      {
        slug: "nordvpn",
        bestFor: "Streaming ve Türkiye sunucusu",
        why: "Türkiye virtual sunucusu, BluTV/Netflix TR ve yurt dışı Netflix bölgeleri için en istikrarlı çalışan sağlayıcı. Threat Protection iOS'ta da reklam ve izleyici filtresi kuruyor.",
      },
    ],
    pitfalls: [
      {
        title: "iCloud Private Relay ile çakışma",
        body:
          "iCloud+ aboneliğin varsa Private Relay aktif olabilir. VPN açtığında Safari trafiği iki katmandan geçer (Private Relay + VPN) — bu performansı düşürür ve bazı sunucu doğrulamalarını kafaya çevirir. VPN kullanırken Ayarlar > Apple ID > iCloud > Private Relay'i kapat ya da Private Relay'i sadece bilinmeyen ağlarda aç.",
      },
      {
        title: "'Connect On Demand' özelliğini aktif et",
        body:
          "iOS'ta uygulama kill switch'i Android kadar agresif değil. Sağlayıcının ayarlarından 'Connect On Demand' veya 'Auto-connect on untrusted Wi-Fi' özelliğini aç — Wi-Fi'a bağlanırken VPN otomatik kurulur, manuel başlatmayı unutsan da korunursun.",
      },
      {
        title: "App Store içi ödeme vs. sağlayıcı sitesi",
        body:
          "VPN aboneliğini App Store üzerinden alırsan Apple %30 komisyon aldığı için fiyat daha yüksek olur. Sağlayıcının sitesinden satın al, sonra uygulamaya hesabınla giriş yap — aynı abonelik, daha ucuz. (Bizim affiliate linklerimiz zaten doğrudan sağlayıcı sitesine gider.)",
      },
    ],
    faqs: [
      {
        q: "iPhone'un yerleşik VPN'i Apple'dan mı geliyor?",
        a: "Hayır. Ayarlar > Genel > VPN ve Cihaz Yönetimi altındaki bölüm yalnızca üçüncü taraf VPN sağlayıcıları için bir konfigürasyon kabuğu. Apple kendi VPN hizmetini sunmuyor — Private Relay sadece Safari için bir 'iki katmanlı proxy' ve tam VPN değil.",
      },
      {
        q: "App Store ücretsiz VPN uygulamalarına güvenebilir miyim?",
        a: "Şüpheyle bak. Apple Android'e göre daha sıkı inceleme yapsa da, 2022-2025'te kaldırılan 100+ uygulama kullanıcı verisini Çin/Rusya kökenli sunuculara gönderdiği için kaldırıldı. Ücretsiz arıyorsan Proton VPN — bağımsız denetimi olan, gerçek bir şirket arkasında olan tek seçim.",
      },
      {
        q: "iPhone'da VPN açıkken FaceTime veya iMessage çalışmaz mı?",
        a: "Genelde sorun yok, ama Apple bazı oturum açma adımlarında IP/konum konsistanlığı bekler. Eğer FaceTime kayıt sırasında hata verirse VPN'i geçici kapatıp tekrar dene; aktivasyondan sonra VPN ile kullanmaya devam edebilirsin.",
      },
      {
        q: "iPad'imde aynı abonelik çalışır mı?",
        a: "Evet — her sağlayıcının iPadOS uygulaması da var ve aynı hesapla giriş yaparsın. iPad rehberimizde iPad'e özgü ayarları (Stage Manager, split-screen ile VPN arka planda) anlattık.",
      },
      {
        q: "Apple Watch için ayrı bir VPN gerekiyor mu?",
        a: "Hayır. Apple Watch tüm trafiğini eşleştirildiği iPhone üzerinden yapıyor (cellular modelde bile çoğu trafik telefon üzerinden), dolayısıyla iPhone'da VPN açıksa saatin trafiği de korunmuş olur — saatte ayrı VPN kurmak desteklenmiyor zaten.",
      },
    ],
    relatedLinks: [
      { label: "iPad için VPN", href: "/cihazlar/ipad" },
      { label: "Android için VPN", href: "/cihazlar/android" },
      { label: "Gizlilik için en iyi VPN", href: "/en-iyi/gizlilik" },
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
      "iPad'i nasıl kullandığın iPhone'dan farklı: kafede çalışıyorsun, uçakta dizi izliyorsun, çocuğa YouTube açıyorsun, faturayı ödüyorsun. Stage Manager ve Split View ile aynı anda 2-3 uygulama açık. Bu kullanım profili VPN ihtiyacını da farklılaştırıyor — split tunneling, streaming uyumluluğu ve sessiz arka plan bağlantısı öncelikli.",
    whyMatters: [
      "iPad'in günlük kullanım süresinin büyük kısmı genelde halka açık Wi-Fi ortamında geçiyor (kafe, kütüphane, üniversite kampüsü, otel) — laptop kadar mobil değil, telefon kadar 4G de değil; tam ortada.",
      "Streaming uygulamaları (Netflix, BluTV, Disney+, BBC iPlayer) iPad'in ana kullanım amaçlarından — bölgesel kütüphaneler ve seyahatte içerik erişimi için VPN performansı belirleyici.",
      "Çocukların kullandığı iPad'ler için reklam/izleyici engelleyen VPN katmanı, App Store'daki ücretsiz oyunların veri toplama davranışını azaltıyor.",
      "iPadOS 17+ ile birlikte gelen 'Stage Manager' çok pencereli kullanım VPN'i arka planda istikrarlı tutmak istiyor — eski sağlayıcıların uygulamaları multitasking'de bağlantı düşürebiliyor.",
    ],
    setupMethods: [
      {
        name: "App Store uygulaması",
        difficulty: "Kolay",
        description:
          "iPhone ile aynı uygulamayı App Store'dan iPad'e yükle. iCloud üzerinden hesap senkronu otomatiktir, bağlandıktan sonra Stage Manager'da arka plana attığında çalışmaya devam eder.",
        whenToUse: "Her kullanıcı için varsayılan seçim.",
      },
      {
        name: "Apple Configurator ile profil yükleme",
        difficulty: "İleri düzey",
        description:
          "Birden fazla iPad'i tek profille yönetmek istiyorsan Apple Configurator (Mac) ile .mobileconfig dosyasını toplu yükleyebilirsin. Eğitim kurumları, küçük şirketler için.",
        whenToUse:
          "Aile veya küçük bir işletmede 3+ iPad varsa, manuel kurulumdan daha hızlı.",
      },
      {
        name: "Router seviyesinde VPN",
        difficulty: "İleri düzey",
        description:
          "Evdeki Wi-Fi router'ına VPN yüklersen iPad'e ek bir şey yapmana gerek yok — bağlandığı an korunur. Yalnız iPad'i evden çıkarınca koruma kalmaz.",
        whenToUse:
          "Çocuk iPad'i ev içinde kalıyorsa veya yaşlı aile bireyinin iPad'i evde kullanılıyorsa ekstra ayar yapmadan tüm trafiği VPN'e almanın en kolay yolu.",
      },
    ],
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Streaming ve bölgesel kütüphane",
        why: "iPad'de en güvenilir streaming sağlayıcısı. ABD Netflix, BBC iPlayer, Disney+ regional vb. için %95+ başarı oranı ölçtük. Türkiye virtual sunucusu BluTV ve Exxen ile sorunsuz.",
      },
      {
        slug: "expressvpn",
        bestFor: "Premium iPad deneyimi",
        why: "Apple TV ve Mac uygulamalarıyla birlikte tek hesap tüm ekosistemi kapsar. Lightway hızı iPad'de 4K stream için yeterli marjı bırakır, arka planda iyi davranır.",
      },
      {
        slug: "surfshark",
        bestFor: "Tek hesapta çok cihaz",
        why: "iPad + iPhone + laptop + Apple TV + eşin/çocuğun cihazları… sınırsız eşzamanlı bağlantı tek bir abonelikte. Aile/öğrenci kullanımı için fiyat-değer dengesi en iyi.",
      },
    ],
    pitfalls: [
      {
        title: "Sertifika güvenmiyor hatası",
        body:
          "Bazen iPadOS güncellemelerinden sonra VPN sağlayıcısının yüklediği konfigürasyon sertifikasını otomatik onaylamaz. Ayarlar > VPN ve Cihaz Yönetimi > sağlayıcı profili > 'Sertifikaya Güven' adımını manuel yapmak gerekir. Bu yapılmazsa bağlantı kuruluyor görünür ama trafik VPN'den geçmez.",
      },
      {
        title: "Split View'da VPN arka plana atıldığında düşmesi",
        body:
          "Eski OpenVPN tabanlı uygulamalar Stage Manager / Split View'da arka plana atıldığında bağlantıyı kaybediyordu. WireGuard veya Lightway tabanlı protokoller bu sorunu çözdü — iPad'de mutlaka bu modern protokolleri seçen sağlayıcılarda kal.",
      },
      {
        title: "Çocuk profili Wi-Fi'ya bağlanırken VPN kuruluyor mu?",
        body:
          "Apple'ın Çocuk Hesabı (Family Sharing) altındaki iPad'de VPN konfigürasyonu yüklerken yetişkin onayı gerekir. Çocuk hesabı kendi başına VPN yükleyemez. Aile yöneticisi olarak baştan kurulum yap, sonra çocuk hesabıyla giriş yap.",
      },
    ],
    faqs: [
      {
        q: "iPad'imde VPN açıkken Apple Pencil veya yan klavye sorun çıkarır mı?",
        a: "Hayır. VPN sadece ağ trafiğini etkiler; Bluetooth (Pencil, klavye, fare) ve USB-C bağlantılarıyla ilgisi yok.",
      },
      {
        q: "Mobil veri (eSIM) ile bağlandığımda VPN aynı şekilde çalışır mı?",
        a: "Evet. Tek fark, mobil verinde 5G/4G/3G geçişlerinde kısa kopuşlar olabilir — sağlayıcının 'Auto-connect' ve 'Always-On VPN' özelliklerini aktif edersen kullanıcı fark etmeden yeniden bağlanır.",
      },
      {
        q: "iPad'imde tek başına Wi-Fi'a güvenli mi bağlanırım, VPN şart mı?",
        a: "HTTPS yaygınlaşması sonrası 'snoop saldırıları' azaldı ama kaybolmadı: rogue Wi-Fi noktası, DNS hijack, HSTS bypass, captive portal sahteleri hâlâ tehdit. VPN bu vektörlerin neredeyse hepsini kapatır. Sıkça otel/havalimanı/kafe Wi-Fi kullanan biriysen evet, şart.",
      },
      {
        q: "iPad'de hangi VPN protokolünü seçmeliyim?",
        a: "Sağlayıcı destekliyorsa öncelik: WireGuard veya Lightway. Yedek olarak IKEv2 — iOS yerleşik desteği var, çok hızlı bağlanır. OpenVPN'e ihtiyacın yok (yavaş, daha çok pil) — yalnızca diğerlerinin engellendiği ağlarda.",
      },
      {
        q: "iPad'de eğitim kurumumun Wi-Fi'sı VPN'i engelliyor, ne yapmalıyım?",
        a: "Çoğu okul/kampüs Wi-Fi'sı UDP'yi (WireGuard varsayılan) bloklar ama TCP 443'ü açar (HTTPS sandığı için). Sağlayıcının 'obfuscation' veya 'stealth' modunu aç — trafik HTTPS gibi görünür ve geçer.",
      },
    ],
    relatedLinks: [
      { label: "iPhone için VPN", href: "/cihazlar/iphone" },
      { label: "Streaming için en iyi VPN", href: "/en-iyi/streaming" },
      { label: "Seyahat için en iyi VPN", href: "/en-iyi/seyahat" },
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
      "Akıllı TV'lerin çoğu VPN uygulaması yüklenemez — doğru çözüm cihaza değil, ağa kurmaktan geçer.",
    summary:
      "Smart TV'lerde VPN'in en büyük zorluğu app store kısıtlamaları. Samsung Tizen ve LG webOS mağazalarında VPN uygulaması yok. Apple TV'ye iOS uygulamaları yüklenebiliyor (tvOS 17+ ile resmen). Sadece Android TV ekosistemi (Google TV, NVIDIA Shield, Xiaomi, TCL) doğrudan VPN app desteği veriyor. Diğerleri için iki yaklaşım var: router VPN ya da Smart DNS — hangisi senin için doğru, biraz aşağıda netleştirelim.",
    whyMatters: [
      "Smart TV üreticilerinin (Samsung, Vizio, LG) izleme verisi topladığı NSF/IEEE araştırmalarıyla belgelendi — TV görüntü tanıma (ACR) ile ekrandan ne izlediğini analiz ediyorlar. VPN bu metadata akışını sağlayıcı sunucularına gönderirken sarar.",
      "ISP, Netflix/YouTube gibi servislere giden trafiği saatlere göre throttle (yavaşlatma) yapıyor — VPN trafiği jenerik şifreli sandığı için ayrım yapamıyor, dolayısıyla streaming hızı belirgin biçimde iyileşebiliyor.",
      "Bölgesel kütüphane farkları: Netflix ABD, BBC iPlayer, Disney+ ülke katalogları, MLB.tv blackout — TV'de VPN ile aşılır. (Hukuki ve ToS açısından ülkene bak; bazı platformlar bunu hesap askıya almaya gerekçe sayabilir.)",
      "Eve gelen misafir/çocuk evdeki TV'de kontrol edemediğin uygulamalara giriyor — router seviyesinde VPN tek tıkla tüm trafiği saracaktır.",
    ],
    setupMethods: [
      {
        name: "Android TV / Google TV resmi uygulaması",
        difficulty: "Kolay",
        description:
          "Google Play Store'dan sağlayıcının resmi Android TV uygulamasını yükle. NordVPN, Surfshark, ExpressVPN, CyberGhost, PIA hepsi destekliyor. Telefon uygulaması gibi kullanılıyor.",
        whenToUse:
          "TV'n Android TV (NVIDIA Shield, Xiaomi Mi Box, TCL/Sony, Chromecast with Google TV vs.) ise en kolay yol.",
      },
      {
        name: "Apple TV tvOS uygulaması (tvOS 17+)",
        difficulty: "Kolay",
        description:
          "Apple, tvOS 17 ile birlikte VPN uygulama desteğini açtı. NordVPN, ExpressVPN, Proton VPN gibi sağlayıcıların App Store'da tvOS sürümü var. Apple TV 4K (2. nesil ve üzeri) gerekiyor.",
        whenToUse: "Apple TV 4K kullanıyorsan ve tvOS 17+ yüklüyse.",
      },
      {
        name: "Router seviyesinde VPN (tüm cihazları kapsar)",
        difficulty: "İleri düzey",
        description:
          "Wi-Fi router'ına VPN istemcisi kurarsın (DD-WRT, OpenWrt, FlashRouters önceden yapılandırılmış cihazlar veya ExpressVPN Aircove). Tüm ev ağı tek bağlantıdan geçer — TV, telefon, oyun konsolu, akıllı buzdolabı hepsi otomatik korumalı.",
        whenToUse:
          "Samsung/LG Smart TV'yi resmen destekleyen VPN uygulaması yok. Router seviyesinde VPN bu sınırı aşmanın resmi yolu.",
      },
      {
        name: "Smart DNS (Şifreleme YOK — sadece bölge bypass)",
        difficulty: "Orta",
        description:
          "Bazı sağlayıcılar (NordVPN SmartPlay, Surfshark SmartDNS, ExpressVPN MediaStreamer) Smart DNS hizmeti sunar. TV'nin DNS ayarına özel adresler girer ve geo-restriction bypass elde edersin. Avantaj: kurulum kolay, hız kaybı yok. Dezavantaj: trafiğin şifrelenmiyor — IP gizli değil, sadece coğrafya kandırılıyor.",
        whenToUse:
          "Tek amacın ABD Netflix gibi bölgesel içerik açmaksa ve gerçek gizlilik aramıyorsan.",
      },
    ],
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Apple TV ve router kullananlar",
        why: "tvOS uygulaması en olgun. Aircove markalı önceden yapılandırılmış router'ı satıyor — kutudan çıkar, takarsın, çalışır. MediaStreamer Smart DNS hizmeti uygulamasızdır TV'lerin geo-bypass'ı için ideal.",
      },
      {
        slug: "nordvpn",
        bestFor: "Android TV streaming",
        why: "Android TV uygulaması en stabili. SmartPlay (DNS tabanlı) hizmeti tüm aboneliklerde dahil — kurulum yapmadan TV'de geo-bypass'ı elde edersin. Manuel router kurulum dokümantasyonu DD-WRT, OpenWrt, AsusWRT için detaylı.",
      },
      {
        slug: "surfshark",
        bestFor: "Bütçe + Smart DNS",
        why: "Smart DNS hizmeti her abonelikle gelir ve aktivasyonu en kolay. Sınırsız cihaz desteği TV + tüm ev cihazlarıyla beraber tek hesabın yeterli olduğu anlamına gelir. Android TV uygulaması basit ama işlevsel.",
      },
    ],
    pitfalls: [
      {
        title: "Smart DNS gizlilik vermiyor — sadece bölge açıyor",
        body:
          "Smart DNS hizmetinin VPN olmadığını netleştirelim: trafiğin şifrelenmiyor, IP'n hâlâ ISP'nin gördüğü Türkiye IP'si. Sadece sağlayıcının DNS sunucusu Netflix'in hangi bölge sunucusuna yönlendireceğini etkiliyor. ISP throttling'i aşamaz, gizlilik sağlamaz. 'Streaming için yeterli' düşünme — sadece coğrafya bypass için kullan.",
      },
      {
        title: "Router VPN tüm cihazlara aynı IP veriyor",
        body:
          "Router seviyesinde VPN kurduğunda tüm ev cihazları aynı sunucudan çıkıyor — telefonundan bankaya girerken aynı yurt dışı IP'sini kullanıyorsun, banka şüpheleniyor. Çözüm: router'da policy-based routing kur (bazı cihazları VPN dışında tut) veya banka cihazı için Wi-Fi'a girmeden VPN'den çıkar.",
      },
      {
        title: "TV'nin kendi smart-home trafiği VPN ile çakışabilir",
        body:
          "Samsung SmartThings, LG ThinQ, Google Home gibi servisler TV'nin yerel IP'sini bekliyor — bazen yurt dışı IP'den gelen bağlantıyı reddediyor. Sorun çıkarsa router'da 'split tunnel': akıllı ev trafiği yerelden, streaming trafiği VPN'den çıksın.",
      },
    ],
    faqs: [
      {
        q: "Samsung veya LG TV'me doğrudan VPN yükleyebilir miyim?",
        a: "Hayır. Samsung Tizen ve LG webOS mağazalarında VPN uygulaması yok ve resmi olarak bu platformlara API açılmıyor. Üç seçenek var: (1) router seviyesinde VPN, (2) Smart DNS hizmeti TV'nin DNS ayarına gir, (3) HDMI'a bir Android TV / Apple TV / Fire TV stick tak ve VPN'i ona kur, TV'yi sadece ekran olarak kullan.",
      },
      {
        q: "Apple TV'me hangi VPN'i kurabilirim?",
        a: "tvOS 17+ yüklü Apple TV 4K (2. nesil ve üzeri) için: NordVPN, ExpressVPN, Proton VPN, Surfshark, PIA App Store'da resmi uygulamaya sahip. Eski Apple TV (HD, eski 4K modeller) için router seviyesinde kurmaktan başka yol yok.",
      },
      {
        q: "Router'ıma VPN kurmak garantiyi düşürür mü, performansı nasıl etkiler?",
        a: "Firmware değişimi (DD-WRT, OpenWrt yükleme) üretici garantisini iptal eder ve cihazı bricklenme riski taşır. Bu istemiyorsan ExpressVPN Aircove gibi önceden yapılandırılmış router al ya da Asus, GL.iNet gibi stok firmware'de VPN desteği olan markaları seç. Performans: tüketici sınıfı router'larda VPN şifreleme CPU'yu yüklüyor, hız 30-50% düşebilir. Gigabit hatta sahipsen Aircove veya kurumsal sınıf router'a bak.",
      },
      {
        q: "Akıllı TV'mde VPN ile Netflix yine de blokluyorsa ne yapayım?",
        a: "Netflix VPN sunucularının IP havuzlarını agresif şekilde blokluyor. Çözüm: (1) Sağlayıcıyı değiştir — NordVPN/ExpressVPN bu yarışta önde, (2) farklı bir sunucu dene, (3) Smart DNS yerine tam VPN'e geç, (4) bekleme — sağlayıcı IP havuzunu rotate ediyor, sabah olmayan akşam çalışıyor. ToS açısından dikkat: Netflix hesabını askıya alma hakkını saklı tutuyor ama uygulamada nadir gerçekleşir.",
      },
      {
        q: "Chromecast'i VPN ile kullanmak için ayrı yöntem mi gerekiyor?",
        a: "Chromecast (eski model, Google TV olmayan) doğrudan VPN uygulaması yüklenemez — Android TV uygulaması yok. Yöntem: (1) telefonda VPN aç, telefondan TV'ye yayın yap — TV ham içerik alır, telefon trafiği VPN'den geçer (ama TV'nin kendi telemetri trafiği gizli değil), ya da (2) router seviyesinde VPN. Yeni Chromecast with Google TV modelleri Android TV uygulaması destekler.",
      },
    ],
    relatedLinks: [
      { label: "Streaming için en iyi VPN", href: "/en-iyi/streaming" },
      { label: "Android için VPN", href: "/cihazlar/android" },
      { label: "Yurt dışındaki Türkler için VPN", href: "/en-iyi/yurt-disindaki-turkler" },
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
