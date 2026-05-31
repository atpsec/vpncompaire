export type UnsplashImage = {
  url: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
};

export type BlogImageSet = {
  hero: UnsplashImage;
  mid: UnsplashImage;
  end: UnsplashImage;
};

const PHOTOGRAPHERS = {
  taylorVick: { name: "Taylor Vick", url: "https://unsplash.com/@tvick" },
  markusSpiske: { name: "Markus Spiske", url: "https://unsplash.com/@markusspiske" },
  adiGoldstein: { name: "Adi Goldstein", url: "https://unsplash.com/@adigold1" },
  shahadat: { name: "Shahadat Rahman", url: "https://unsplash.com/@hishahadat" },
  flyd: { name: "FlyD", url: "https://unsplash.com/@flyd2069" },
  glennCarstens: { name: "Glenn Carstens-Peters", url: "https://unsplash.com/@glenncarstenspeters" },
  mollieSivaram: { name: "Mollie Sivaram", url: "https://unsplash.com/@molliesivaram" },
  guerrillaBuzz: { name: "GuerrillaBuzz", url: "https://unsplash.com/@guerrillabuzz" },
  annieSpratt: { name: "Annie Spratt", url: "https://unsplash.com/@anniespratt" },
  rossParmly: { name: "Ross Parmly", url: "https://unsplash.com/@rparmly" },
  christinHume: { name: "Christin Hume", url: "https://unsplash.com/@christinhumephoto" },
  mikeyHarris: { name: "Mikey Harris", url: "https://unsplash.com/@mikeyharris" },
  chrisMontgomery: { name: "Chris Montgomery", url: "https://unsplash.com/@cwmonty" },
  johnSchnobrich: { name: "John Schnobrich", url: "https://unsplash.com/@johnschno" },
  jordanHarrison: { name: "Jordan Harrison", url: "https://unsplash.com/@jordanharrison" },
  nasa: { name: "NASA", url: "https://unsplash.com/@nasa" },
  thomasJensen: { name: "Thomas Jensen", url: "https://unsplash.com/@thomasjsn" },
  alexKotliarskyi: { name: "Alex Kotliarskyi", url: "https://unsplash.com/@frantic" },
  ilyaPavlov: { name: "Ilya Pavlov", url: "https://unsplash.com/@ilyapavlov" },
  rupixen: { name: "rupixen", url: "https://unsplash.com/@rupixen" },
  blakeWisz: { name: "Blake Wisz", url: "https://unsplash.com/@blakewisz" },
  emilyMorter: { name: "Emily Morter", url: "https://unsplash.com/@emilymorter" },
  scottGraham: { name: "Scott Graham", url: "https://unsplash.com/@homajob" },
  scottWebb: { name: "Scott Webb", url: "https://unsplash.com/@scottwebb" },
  daveLowe: { name: "Dave Lowe", url: "https://unsplash.com/@davelowe" },
  philippeOursel: { name: "Philippe Oursel", url: "https://unsplash.com/@philippeoursel" },
  joshuaSortino: { name: "Joshua Sortino", url: "https://unsplash.com/@sortino" },
  clintPatterson: { name: "Clint Patterson", url: "https://unsplash.com/@cbpsc1" },
  privecstasy: { name: "Privecstasy", url: "https://unsplash.com/@privecstasy" },
  growtika: { name: "Growtika", url: "https://unsplash.com/@growtika" },
  matheusBertelli: { name: "Matheus Bertelli", url: "https://unsplash.com/@bertellifotografia" },
  lingTang: { name: "Ling Tang", url: "https://unsplash.com/@linglivestolaugh" },
  possessedPhotography: { name: "Possessed Photography", url: "https://unsplash.com/@possessedphotography" },
  christinHumeAlt: { name: "Christin Hume", url: "https://unsplash.com/@christinhumephoto" },
  steveJohnson: { name: "Steve Johnson", url: "https://unsplash.com/@steve_j" },
  sorasak: { name: "Sorasak", url: "https://unsplash.com/@sorasak" },
  thibaultPenin: { name: "Thibault Penin", url: "https://unsplash.com/@thibaultpenin" },
  fauzanSaari: { name: "Fauzan Saari", url: "https://unsplash.com/@fznsr_" },
  aronVandePol: { name: "Aron Van de Pol", url: "https://unsplash.com/@aronvandepol" },
  alexanderShatov: { name: "Alexander Shatov", url: "https://unsplash.com/@alexbemore" },
  christianWiediger: { name: "Christian Wiediger", url: "https://unsplash.com/@christianw" },
  florianOlivo: { name: "Florian Olivo", url: "https://unsplash.com/@florianolv" },
  kerdeSeverin: { name: "Kerde Severin", url: "https://unsplash.com/@kerde_severin" },
  nikitaKachanovsky: { name: "Nikita Kachanovsky", url: "https://unsplash.com/@nkachanovskyyy" },
  towfiquBarbhuiya: { name: "Towfiqu barbhuiya", url: "https://unsplash.com/@towfiqu999999" },
  manuelMoreno: { name: "Manuel Moreno", url: "https://unsplash.com/@manufotos" },
  greenChameleon: { name: "Green Chameleon", url: "https://unsplash.com/@craftedbygc" },
  jeshoots: { name: "JESHOOTS.COM", url: "https://unsplash.com/@jeshoots" },
  mishaFeshchak: { name: "Misha Feshchak", url: "https://unsplash.com/@miafeshchak" },
  gabrielHeinzer: { name: "Gabriel Heinzer", url: "https://unsplash.com/@6heinz3r" },
  bagusHernawan: { name: "Bagus Hernawan", url: "https://unsplash.com/@bhaguz" },
  charlesDeluvio: { name: "Charles Deluvio", url: "https://unsplash.com/@charlesdeluvio" },
  nationalCancerInstitute: { name: "National Cancer Institute", url: "https://unsplash.com/@nci" },
  chrisLiverani: { name: "Chris Liverani", url: "https://unsplash.com/@chrisliverani" },
  romanKraft: { name: "Roman Kraft", url: "https://unsplash.com/@romankraft" },
  philippKatzenberger: { name: "Philipp Katzenberger", url: "https://unsplash.com/@fantasyflip" },
  liamBriese: { name: "Liam Briese", url: "https://unsplash.com/@liam_1" },
  rossFindon: { name: "Ross Findon", url: "https://unsplash.com/@rossf" },
  sebastianPichler: { name: "Sebastian Pichler", url: "https://unsplash.com/@pichler_sebastian" },
} as const;

function img(photoId: string, alt: string, photographer: { name: string; url: string }, w = 1200, h = 630): UnsplashImage {
  return {
    url: `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&fit=crop&q=80&auto=format`,
    alt,
    photographer: photographer.name,
    photographerUrl: photographer.url,
  };
}

const imageDatabase: Record<string, BlogImageSet> = {
  "vpn-basics": {
    hero: img("1558494949-ef010cbdcc31", "Güvenli ağ bağlantısı ve sunucu odası", PHOTOGRAPHERS.taylorVick),
    mid: img("1563013544-824ae1b704d3", "Dijital güvenlik ve şifreleme konsepti", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1550751827-4bd374c3f58b", "Siber güvenlik ve veri koruma", PHOTOGRAPHERS.adiGoldstein, 800, 450),
  },
  "privacy-security": {
    hero: img("1555949963-ff9fe0c870eb", "Programlama ve güvenlik kodu", PHOTOGRAPHERS.shahadat),
    mid: img("1526374965328-7f61d4dc18c5", "Matrix tarzı veri akışı", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Kilit ve güvenlik sembolü", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "streaming-content": {
    hero: img("1522869635100-9f4c5e86aa37", "Akıllı TV ve streaming servisleri", PHOTOGRAPHERS.glennCarstens),
    mid: img("1593359677879-a4bb92f829d1", "Netflix ve streaming platformları", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Dünya haritası ve global erişim", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "travel-vpn": {
    hero: img("1488646953014-85cb44e25828", "Dünya haritası ve seyahat planlama", PHOTOGRAPHERS.annieSpratt),
    mid: img("1436491865332-7a61a109cc05", "Havalimanı ve uçak", PHOTOGRAPHERS.rossParmly, 800, 450),
    end: img("1521295121783-8a321d551ad2", "Kafede laptop ile çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
  },
  "remote-work": {
    hero: img("1587560699334-cc4ff634909a", "Evden çalışma ve home office", PHOTOGRAPHERS.mikeyHarris),
    mid: img("1553877522-43269d4ea984", "Video konferans ve online toplantı", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
    end: img("1516321318423-f06f85e504b3", "Güvenli bağlantı ve VPN kullanımı", PHOTOGRAPHERS.johnSchnobrich, 800, 450),
  },
  "vpn-protocols": {
    hero: img("1544197150-b99a580bb7a8", "Ağ kabloları ve bağlantı", PHOTOGRAPHERS.jordanHarrison),
    mid: img("1558494949-ef010cbdcc31", "Sunucu odası ve veri merkezi", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1551808525-51a94da548ce", "Şifreleme ve güvenlik teknolojisi", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "speed-performance": {
    hero: img("1451187580459-43490279c0fa", "Dünya üzerinde hızlı veri akışı", PHOTOGRAPHERS.nasa),
    mid: img("1614064641938-3bbee52942c7", "Hız testi ve performans ölçümü", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1518770660439-4636190af475", "Devre kartı ve teknoloji", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "free-vs-paid": {
    hero: img("1554224155-6726b3ff858f", "Para ve dijital ödeme", PHOTOGRAPHERS.rupixen),
    mid: img("1556742049-0cfed4f6a45d", "Karşılaştırma ve seçim", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Kalite ve değer analizi", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "vpn-legal": {
    hero: img("1589829545856-d10d557cf95f", "Yasal belge ve hukuk konsepti",  PHOTOGRAPHERS.scottWebb),
    mid: img("1450101499163-c8848c66ca85", "Dünya haritası ve ülkeler", PHOTOGRAPHERS.philippeOursel, 800, 450),
    end: img("1589994965851-a8f479c573a9", "Adalet terazisi ve hukuk", PHOTOGRAPHERS.clintPatterson, 800, 450),
  },
  "choosing-vpn": {
    hero: img("1454165804606-c3d57bc86b40", "Karar verme ve değerlendirme", PHOTOGRAPHERS.scottGraham),
    mid: img("1551434678-e076c223a692", "Liste ve kontrol işaretleri", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Doğru seçimi yapmak", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },

  // AI + VPN topics
  "ai-vpn-access": {
    hero: img("1677442136019-21780ecad995", "AI ve sohbet asistanı arayüzü", PHOTOGRAPHERS.shahadat),
    mid: img("1526374965328-7f61d4dc18c5", "Veri akışı ve yapay zeka", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global erişim ve sınırlar", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "ai-tools-comparison": {
    hero: img("1620712943543-bcc4688e7485", "AI araçları karşılaştırması", PHOTOGRAPHERS.shahadat),
    mid: img("1551434678-e076c223a692", "Liste ve kontrol işaretleri", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Karar ve seçim", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "ai-creative": {
    hero: img("1684369175809-1b73fc4cb98f", "AI ile üretilen yaratıcı görsel", PHOTOGRAPHERS.shahadat),
    mid: img("1518770660439-4636190af475", "Devre kartı ve teknoloji", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1563013544-824ae1b704d3", "Dijital sanat ve kod", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ai-privacy": {
    hero: img("1614064641938-3bbee52942c7", "Kilit ve veri koruma", PHOTOGRAPHERS.flyd),
    mid: img("1555949963-ff9fe0c870eb", "Programlama ve gizlilik", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Veri akışı", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ai-pricing": {
    hero: img("1554224155-6726b3ff858f", "Para ve ödeme", PHOTOGRAPHERS.rupixen),
    mid: img("1556742049-0cfed4f6a45d", "Fiyat karşılaştırması", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Tasarruf ve değer", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "ai-security": {
    hero: img("1550751827-4bd374c3f58b", "Siber güvenlik ve tehdit", PHOTOGRAPHERS.adiGoldstein),
    mid: img("1614064641938-3bbee52942c7", "Veri koruma kalkanı", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Şifreleme ve savunma", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },

  // Streaming sub-topics
  "streaming-uk": {
    hero: img("1522869635100-9f4c5e86aa37", "Akıllı TV ve streaming", PHOTOGRAPHERS.glennCarstens),
    mid: img("1593359677879-a4bb92f829d1", "Streaming platformları", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1450101499163-c8848c66ca85", "Birleşik Krallık manzarası", PHOTOGRAPHERS.philippeOursel, 800, 450),
  },
  "streaming-sports": {
    hero: img("1522869635100-9f4c5e86aa37", "Canlı spor yayını", PHOTOGRAPHERS.glennCarstens),
    mid: img("1593359677879-a4bb92f829d1", "Spor karşılaşması", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global yayın haritası", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "streaming-anime": {
    hero: img("1684369175809-1b73fc4cb98f", "Anime ve dijital içerik", PHOTOGRAPHERS.shahadat),
    mid: img("1593359677879-a4bb92f829d1", "Streaming platformu", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Bölgesel kütüphaneler", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "streaming-music": {
    hero: img("1522869635100-9f4c5e86aa37", "Dijital müzik akışı", PHOTOGRAPHERS.glennCarstens),
    mid: img("1554224155-6726b3ff858f", "Abonelik ödemesi", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global içerik erişimi", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },

  // Savings topics
  "gaming-savings": {
    hero: img("1554224155-6726b3ff858f", "Oyun ve dijital alışveriş", PHOTOGRAPHERS.rupixen),
    mid: img("1518770660439-4636190af475", "Devre kartı ve oyun teknolojisi", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Fiyat karşılaştırması", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "travel-savings": {
    hero: img("1488646953014-85cb44e25828", "Seyahat planlama ve tasarruf", PHOTOGRAPHERS.annieSpratt),
    mid: img("1436491865332-7a61a109cc05", "Havalimanı ve uçuş", PHOTOGRAPHERS.rossParmly, 800, 450),
    end: img("1554224155-6726b3ff858f", "Bilet ve rezervasyon", PHOTOGRAPHERS.rupixen, 800, 450),
  },
  "learning-savings": {
    hero: img("1454165804606-c3d57bc86b40", "Online öğrenme", PHOTOGRAPHERS.scottGraham),
    mid: img("1521295121783-8a321d551ad2", "Laptop ile çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Kurs ve tasarruf", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },

  // Privacy advanced
  "privacy-advanced": {
    hero: img("1526374965328-7f61d4dc18c5", "Çoklu katman güvenlik", PHOTOGRAPHERS.markusSpiske),
    mid: img("1614064641938-3bbee52942c7", "Şifreli sunucu altyapısı", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1551808525-51a94da548ce", "İleri seviye şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },

  // Device/platform topics (share generic tech device imagery)
  "device-router": {
    hero: img("1544197150-b99a580bb7a8", "Ev ağı ve router kurulumu", PHOTOGRAPHERS.jordanHarrison),
    mid: img("1558494949-ef010cbdcc31", "Ağ donanımı ve kabloları", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1518770660439-4636190af475", "Bağlantı ve devre", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "device-tv": {
    hero: img("1522869635100-9f4c5e86aa37", "Akıllı TV ve uygulamalar", PHOTOGRAPHERS.glennCarstens),
    mid: img("1593359677879-a4bb92f829d1", "TV uygulamaları", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Streaming bağlantısı", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "device-console": {
    hero: img("1518770660439-4636190af475", "Oyun konsolu ve donanım", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1554224155-6726b3ff858f", "Dijital satın alma", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global çevrim içi oyun", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "device-linux": {
    hero: img("1555949963-ff9fe0c870eb", "Linux terminali ve kod", PHOTOGRAPHERS.shahadat),
    mid: img("1518770660439-4636190af475", "Açık kaynak teknolojisi", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1551808525-51a94da548ce", "Sistem yapılandırması", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "device-mac": {
    hero: img("1517336714731-489689fd1ca8", "macOS masaüstü", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1521295121783-8a321d551ad2", "Mac ile çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1518770660439-4636190af475", "Modern donanım", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "device-ios": {
    hero: img("1574944985070-8f3ebc6b79d2", "iPhone ve mobil uygulamalar", PHOTOGRAPHERS.privecstasy),
    mid: img("1556742049-0cfed4f6a45d", "Mobil iş akışı", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Mobil güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },

  // Audience-targeted
  "finance-vpn": {
    hero: img("1554224155-6726b3ff858f", "Finans ve dijital varlıklar", PHOTOGRAPHERS.rupixen),
    mid: img("1556742049-0cfed4f6a45d", "Yatırım analizi", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Finansal güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "journalism-vpn": {
    hero: img("1555949963-ff9fe0c870eb", "Habercilik ve veri koruma", PHOTOGRAPHERS.shahadat),
    mid: img("1526374965328-7f61d4dc18c5", "Kaynak gizliliği", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1589994965851-a8f479c573a9", "İfade özgürlüğü", PHOTOGRAPHERS.clintPatterson, 800, 450),
  },
  "education-vpn": {
    hero: img("1454165804606-c3d57bc86b40", "Eğitim ve uzaktan öğrenme", PHOTOGRAPHERS.scottGraham),
    mid: img("1521295121783-8a321d551ad2", "Öğretmen ve laptop", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Online materyal erişimi", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },

  // Yeni unique key'ler (her blog yazısı için)
  "chatgpt-turkey-access": {
    hero: img("npxXWgQ33ZQ", "ChatGPT AI interface on laptop", PHOTOGRAPHERS.matheusBertelli),
    mid: img("1677442136019-21780ecad995", "AI sohbet asistanı", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global erişim", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "ai-phishing-deepfake": {
    hero: img("FnA5pAzqhMM", "AI security and phishing protection", PHOTOGRAPHERS.growtika),
    mid: img("1550751827-4bd374c3f58b", "Siber güvenlik", PHOTOGRAPHERS.adiGoldstein, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Veri koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "china-russia-ai-access": {
    hero: img("WkfDrhxDMC8", "China Russia technology access", PHOTOGRAPHERS.lingTang),
    mid: img("1611162617474-5b21e879e113", "Global network", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Veri akışı", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "claude-gemini-access": {
    hero: img("iar-afB0QQw", "AI assistant comparison", PHOTOGRAPHERS.possessedPhotography),
    mid: img("1677442136019-21780ecad995", "AI interface", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1518770660439-4636190af475", "Teknoloji", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "ai-tools-privacy": {
    hero: img("08bOYnH_r_E", "AI privacy data protection", PHOTOGRAPHERS.flyd),
    mid: img("1555949963-ff9fe0c870eb", "Gizlilik kodu", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ai-content-creation": {
    hero: img("5QgIuuBxKwM", "Content creation writing", PHOTOGRAPHERS.christinHumeAlt),
    mid: img("1521295121783-8a321d551ad2", "Laptop çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1563013544-824ae1b704d3", "Dijital içerik", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "midjourney-stable-diffusion": {
    hero: img("rymh7EZPqRs", "AI generated art colorful", PHOTOGRAPHERS.steveJohnson),
    mid: img("1684369175809-1b73fc4cb98f", "AI görsel", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1563013544-824ae1b704d3", "Dijital sanat", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "anime-crunchyroll": {
    hero: img("wSTCaQpiLtc", "Tokyo Japan anime culture", PHOTOGRAPHERS.sorasak),
    mid: img("1593359677879-a4bb92f829d1", "Streaming platform", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global içerik", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "netflix-regional": {
    hero: img("tChz4ZXy-P0", "Netflix streaming on TV", PHOTOGRAPHERS.thibaultPenin),
    mid: img("1593359677879-a4bb92f829d1", "Streaming apps", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Bölgesel kütüphane", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "live-sports-streaming": {
    hero: img("p_kICQCOM4s", "Sports stadium live event", PHOTOGRAPHERS.fauzanSaari),
    mid: img("1522869635100-9f4c5e86aa37", "Canlı yayın", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global spor", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "disney-bbc": {
    hero: img("eLUBGqKGdE4", "London UK Big Ben", PHOTOGRAPHERS.aronVandePol),
    mid: img("1522869635100-9f4c5e86aa37", "Streaming TV", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1450101499163-c8848c66ca85", "UK manzara", PHOTOGRAPHERS.philippeOursel, 800, 450),
  },
  "spotify-regional": {
    hero: img("tXz6g8JYYoI", "Spotify music streaming", PHOTOGRAPHERS.alexanderShatov),
    mid: img("1554224155-6726b3ff858f", "Abonelik", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global müzik", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "youtube-premium": {
    hero: img("2x3GDjcElVg", "YouTube app smartphone", PHOTOGRAPHERS.christianWiediger),
    mid: img("1554224155-6726b3ff858f", "Fiyat tasarruf", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global erişim", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "steam-regional": {
    hero: img("sYVY_ZKwaxU", "Gaming PC setup RGB", PHOTOGRAPHERS.florianOlivo),
    mid: img("1554224155-6726b3ff858f", "Oyun fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1518770660439-4636190af475", "Gaming tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "playstation-xbox-store": {
    hero: img("0aX51h4WvAk", "PlayStation controller", PHOTOGRAPHERS.kerdeSeverin),
    mid: img("1554224155-6726b3ff858f", "Store fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1518770660439-4636190af475", "Console tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "xbox-playstation-setup": {
    hero: img("w2JtIQQXoRU", "Xbox console controller", PHOTOGRAPHERS.nikitaKachanovsky),
    mid: img("1518770660439-4636190af475", "Gaming hardware", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1611162617474-5b21e879e113", "Online gaming", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "chatgpt-plus-pricing": {
    hero: img("ZV_64LdGoao", "Subscription pricing calculator", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Para tasarruf", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Fiyat karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "software-subscription": {
    hero: img("Q1p7bh3SHj8", "Software technology digital", PHOTOGRAPHERS.nasa),
    mid: img("1554224155-6726b3ff858f", "Abonelik fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1518770660439-4636190af475", "Tech software", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "hotel-booking": {
    hero: img("y2azHvupCVo", "Hotel travel accommodation", PHOTOGRAPHERS.manuelMoreno),
    mid: img("1554224155-6726b3ff858f", "Rezervasyon fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1488646953014-85cb44e25828", "Seyahat", PHOTOGRAPHERS.annieSpratt, 800, 450),
  },
  "flight-tickets": {
    hero: img("WNoLnJo7tS8", "Airplane travel flight", PHOTOGRAPHERS.rossParmly),
    mid: img("1554224155-6726b3ff858f", "Bilet fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1436491865332-7a61a109cc05", "Havalimanı", PHOTOGRAPHERS.rossParmly, 800, 450),
  },
  "online-courses": {
    hero: img("505eectW54k", "Online learning education", PHOTOGRAPHERS.greenChameleon),
    mid: img("1521295121783-8a321d551ad2", "Laptop öğrenme", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Eğitim", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "travel-vpn-security": {
    hero: img("2gYsZUmockw", "Airport travel wifi", PHOTOGRAPHERS.jeshoots),
    mid: img("1436491865332-7a61a109cc05", "Havalimanı", PHOTOGRAPHERS.rossParmly, 800, 450),
    end: img("1521295121783-8a321d551ad2", "Laptop güvenlik", PHOTOGRAPHERS.christinHume, 800, 450),
  },
  "router-vpn-setup": {
    hero: img("Wpnoqo2plFA", "WiFi router home network", PHOTOGRAPHERS.mishaFeshchak),
    mid: img("1558494949-ef010cbdcc31", "Ağ kabloları", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1518770660439-4636190af475", "Network tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "linux-vpn-setup": {
    hero: img("4Mw7nkQDByk", "Linux terminal command", PHOTOGRAPHERS.gabrielHeinzer),
    mid: img("1555949963-ff9fe0c870eb", "Linux kod", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1551808525-51a94da548ce", "Sistem config", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ios-vpn-shortcuts": {
    hero: img("svFU0GJlGi8", "iPhone shortcuts automation", PHOTOGRAPHERS.bagusHernawan),
    mid: img("1574944985070-8f3ebc6b79d2", "iPhone app", PHOTOGRAPHERS.privecstasy, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Mobil güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "macos-vpn-setup": {
    hero: img("npxXWgQ33ZQ", "MacBook laptop workspace", PHOTOGRAPHERS.matheusBertelli),
    mid: img("1517336714731-489689fd1ca8", "macOS desktop", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1521295121783-8a321d551ad2", "Mac çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
  },
  "apple-tv-vpn": {
    hero: img("XJXWbfSo2f0", "Apple TV streaming", PHOTOGRAPHERS.glennCarstens),
    mid: img("1522869635100-9f4c5e86aa37", "TV apps", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1593359677879-a4bb92f829d1", "Streaming", PHOTOGRAPHERS.mollieSivaram, 800, 450),
  },
  "remote-work-security": {
    hero: img("QckxruozjRg", "Remote work home office", PHOTOGRAPHERS.charlesDeluvio),
    mid: img("1587560699334-cc4ff634909a", "Home office", PHOTOGRAPHERS.mikeyHarris, 800, 450),
    end: img("1553877522-43269d4ea984", "Video konferans", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
  },
  "freelancer-vpn": {
    hero: img("IgUR1iX0mqM", "Freelancer remote laptop", PHOTOGRAPHERS.christinHumeAlt),
    mid: img("1521295121783-8a321d551ad2", "Laptop çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "educator-teacher-vpn": {
    hero: img("NeTPASr-bmQ", "Education classroom teaching", PHOTOGRAPHERS.nationalCancerInstitute),
    mid: img("1521295121783-8a321d551ad2", "Öğretmen laptop", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Online eğitim", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "investor-trader-vpn": {
    hero: img("fiXLQXAhCfk", "Trading finance charts", PHOTOGRAPHERS.chrisLiverani),
    mid: img("1554224155-6726b3ff858f", "Finans", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Finansal güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "journalist-activist-vpn": {
    hero: img("OgvqXGL7XO4", "Journalism privacy", PHOTOGRAPHERS.romanKraft),
    mid: img("1555949963-ff9fe0c870eb", "Veri koruma", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1589994965851-a8f479c573a9", "İfade özgürlüğü", PHOTOGRAPHERS.clintPatterson, 800, 450),
  },
  "dns-leak-test": {
    hero: img("JKUTrJ4vK00", "DNS network security", PHOTOGRAPHERS.taylorVick),
    mid: img("1558494949-ef010cbdcc31", "Network test", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik test", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "kill-switch-explained": {
    hero: img("FO7JIlwjOtU", "Network kill switch", PHOTOGRAPHERS.markusSpiske),
    mid: img("1526374965328-7f61d4dc18c5", "Güvenlik katmanı", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "vpn-privacy-security-basics": {
    hero: img("FnA5pAzqhMM", "Cybersecurity privacy", PHOTOGRAPHERS.growtika),
    mid: img("1555949963-ff9fe0c870eb", "Gizlilik", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "vpn-protocols-explained": {
    hero: img("hpjSkU2UYSU", "Network encryption", PHOTOGRAPHERS.markusSpiske),
    mid: img("1544197150-b99a580bb7a8", "Ağ kabloları", PHOTOGRAPHERS.jordanHarrison, 800, 450),
    end: img("1551808525-51a94da548ce", "Teknoloji", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "wireguard-openvpn": {
    hero: img("iar-afB0QQw", "VPN protocol technology", PHOTOGRAPHERS.possessedPhotography),
    mid: img("1518770660439-4636190af475", "Network tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1551808525-51a94da548ce", "Encryption", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "split-tunneling": {
    hero: img("jG8nlwLRZTM", "Network split routing", PHOTOGRAPHERS.adiGoldstein),
    mid: img("1544197150-b99a580bb7a8", "Network", PHOTOGRAPHERS.jordanHarrison, 800, 450),
    end: img("1518770660439-4636190af475", "Tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "double-vpn-multihop": {
    hero: img("FlPc9_VocJ4", "Double encryption chain", PHOTOGRAPHERS.philippKatzenberger),
    mid: img("1526374965328-7f61d4dc18c5", "Şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "ram-only-servers": {
    hero: img("d1eaoAabeXs", "Server datacenter RAM", PHOTOGRAPHERS.liamBriese),
    mid: img("1558494949-ef010cbdcc31", "Sunucu", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1518770660439-4636190af475", "Hardware", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "nordvpn-surfshark": {
    hero: img("Wpnoqo2plFA", "VPN comparison", PHOTOGRAPHERS.mishaFeshchak),
    mid: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Seçim", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "expressvpn-protonvpn": {
    hero: img("08bOYnH_r_E", "VPN privacy comparison", PHOTOGRAPHERS.flyd),
    mid: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "choosing-vpn-guide": {
    hero: img("5fNmWej4tAA", "Choice decision selection", PHOTOGRAPHERS.rossFindon),
    mid: img("1551434678-e076c223a692", "Liste kontrol", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Seçim", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "free-vs-paid-vpn": {
    hero: img("ZV_64LdGoao", "Money cost comparison", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Para", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "vpn-subscription-period": {
    hero: img("mcSDtbWXUZU", "Subscription pricing plan", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Plan seçimi", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "fastest-vpn-turkey": {
    hero: img("JKUTrJ4vK00", "Speed test performance", PHOTOGRAPHERS.taylorVick),
    mid: img("1451187580459-43490279c0fa", "Hız", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1518770660439-4636190af475", "Teknoloji", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "vpn-speed-optimization": {
    hero: img("hpjSkU2UYSU", "Speed internet fiber", PHOTOGRAPHERS.markusSpiske),
    mid: img("1451187580459-43490279c0fa", "Hızlı veri", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1518770660439-4636190af475", "Performans", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "what-is-vpn": {
    hero: img("FnA5pAzqhMM", "Digital privacy security", PHOTOGRAPHERS.growtika),
    mid: img("1558494949-ef010cbdcc31", "Network", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1550751827-4bd374c3f58b", "Güvenlik", PHOTOGRAPHERS.adiGoldstein, 800, 450),
  },
  "is-vpn-legal": {
    hero: img("s9CC2SKySJM", "Law legal justice", PHOTOGRAPHERS.sebastianPichler),
    mid: img("1589829545856-d10d557cf95f", "Yasal belge", PHOTOGRAPHERS.scottWebb, 800, 450),
    end: img("1589994965851-a8f479c573a9", "Adalet", PHOTOGRAPHERS.clintPatterson, 800, 450),
  },
  "vpn-streaming-access": {
    hero: img("tChz4ZXy-P0", "Streaming entertainment", PHOTOGRAPHERS.thibaultPenin),
    mid: img("1522869635100-9f4c5e86aa37", "TV streaming", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global içerik", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
};

// Alias eşleştirmeleri (frontmatter'daki farklı isimlendirmeler için)
// Her blog yazısı unique bir görsel setine map edilir
const aliases: Record<string, string> = {
  // Basic aliases for different naming conventions
  "streaming-vpn": "streaming-content",
  "remote-work-vpn": "remote-work",
  "vpn-selection": "choosing-vpn",
  "vpn-speed": "speed-performance",
};

const FALLBACK_IMAGES: BlogImageSet = imageDatabase["vpn-basics"];

export function getBlogImages(coverImage: string): BlogImageSet {
  const key = aliases[coverImage] || coverImage;
  return imageDatabase[key] || FALLBACK_IMAGES;
}

export function getBlogImage(coverImage: string, position: "hero" | "mid" | "end"): UnsplashImage {
  const set = getBlogImages(coverImage);
  return set[position];
}

export function getUnsplashImageUrl(coverImage: string): string {
  return getBlogImage(coverImage, "hero").url;
}

export function getUnsplashAttribution(coverImage: string) {
  const image = getBlogImage(coverImage, "hero");
  return {
    text: image.photographer,
    url: image.photographerUrl,
  };
}
