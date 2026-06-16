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
    hero: img("1677442136019-21780ecad995", "AI ile üretilen yaratıcı görsel", PHOTOGRAPHERS.shahadat),
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
    hero: img("1677442136019-21780ecad995", "Anime ve dijital içerik", PHOTOGRAPHERS.shahadat),
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
    hero: img("1611162617474-5b21e879e113", "ChatGPT AI interface on laptop", PHOTOGRAPHERS.matheusBertelli),
    mid: img("1677442136019-21780ecad995", "AI sohbet asistanı", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global erişim", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "ai-phishing-deepfake": {
    hero: img("1563013544-824ae1b704d3", "AI security and phishing protection", PHOTOGRAPHERS.growtika),
    mid: img("1550751827-4bd374c3f58b", "Siber güvenlik", PHOTOGRAPHERS.adiGoldstein, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Veri koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "china-russia-ai-access": {
    hero: img("1611162617474-5b21e879e113", "China Russia technology access", PHOTOGRAPHERS.lingTang),
    mid: img("1611162617474-5b21e879e113", "Global network", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Veri akışı", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "claude-gemini-access": {
    hero: img("1677442136019-21780ecad995", "AI assistant comparison", PHOTOGRAPHERS.possessedPhotography),
    mid: img("1677442136019-21780ecad995", "AI interface", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1518770660439-4636190af475", "Teknoloji", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "ai-tools-privacy": {
    hero: img("1614064641938-3bbee52942c7", "AI privacy data protection", PHOTOGRAPHERS.flyd),
    mid: img("1555949963-ff9fe0c870eb", "Gizlilik kodu", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ai-content-creation": {
    hero: img("1521295121783-8a321d551ad2", "Content creation writing", PHOTOGRAPHERS.christinHumeAlt),
    mid: img("1521295121783-8a321d551ad2", "Laptop çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1563013544-824ae1b704d3", "Dijital içerik", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "midjourney-stable-diffusion": {
    hero: img("1677442136019-21780ecad995", "AI generated art colorful", PHOTOGRAPHERS.steveJohnson),
    mid: img("1677442136019-21780ecad995", "AI görsel", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1563013544-824ae1b704d3", "Dijital sanat", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "anime-crunchyroll": {
    hero: img("1611162617474-5b21e879e113", "Tokyo Japan anime culture", PHOTOGRAPHERS.sorasak),
    mid: img("1593359677879-a4bb92f829d1", "Streaming platform", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global içerik", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "netflix-regional": {
    hero: img("1593359677879-a4bb92f829d1", "Netflix streaming on TV", PHOTOGRAPHERS.thibaultPenin),
    mid: img("1593359677879-a4bb92f829d1", "Streaming apps", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Bölgesel kütüphane", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "live-sports-streaming": {
    hero: img("1517649763962-0c623066013b", "Sports stadium live event", PHOTOGRAPHERS.fauzanSaari),
    mid: img("1522869635100-9f4c5e86aa37", "Canlı yayın", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global spor", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "disney-bbc": {
    hero: img("1450101499163-c8848c66ca85", "London UK Big Ben", PHOTOGRAPHERS.aronVandePol),
    mid: img("1522869635100-9f4c5e86aa37", "Streaming TV", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1450101499163-c8848c66ca85", "UK manzara", PHOTOGRAPHERS.philippeOursel, 800, 450),
  },
  "spotify-regional": {
    hero: img("1470225620780-dba8ba36b745", "Spotify music streaming", PHOTOGRAPHERS.alexanderShatov),
    mid: img("1554224155-6726b3ff858f", "Abonelik", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global müzik", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "youtube-premium": {
    hero: img("1522869635100-9f4c5e86aa37", "YouTube app smartphone", PHOTOGRAPHERS.christianWiediger),
    mid: img("1554224155-6726b3ff858f", "Fiyat tasarruf", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global erişim", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "steam-regional": {
    hero: img("1611162617474-5b21e879e113", "Gaming PC setup RGB", PHOTOGRAPHERS.florianOlivo),
    mid: img("1554224155-6726b3ff858f", "Oyun fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1518770660439-4636190af475", "Gaming tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "playstation-xbox-store": {
    hero: img("1555949963-ff9fe0c870eb", "PlayStation controller", PHOTOGRAPHERS.kerdeSeverin),
    mid: img("1554224155-6726b3ff858f", "Store fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1518770660439-4636190af475", "Console tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "xbox-playstation-setup": {
    hero: img("1611162617474-5b21e879e113", "Xbox console controller", PHOTOGRAPHERS.nikitaKachanovsky),
    mid: img("1518770660439-4636190af475", "Gaming hardware", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1611162617474-5b21e879e113", "Online gaming", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "chatgpt-plus-pricing": {
    hero: img("1554224155-6726b3ff858f", "Subscription pricing calculator", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Para tasarruf", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Fiyat karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "software-subscription": {
    hero: img("1611162617474-5b21e879e113", "Software technology digital", PHOTOGRAPHERS.nasa),
    mid: img("1554224155-6726b3ff858f", "Abonelik fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1518770660439-4636190af475", "Tech software", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "hotel-booking": {
    hero: img("1611162617474-5b21e879e113", "Hotel travel accommodation", PHOTOGRAPHERS.manuelMoreno),
    mid: img("1554224155-6726b3ff858f", "Rezervasyon fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1488646953014-85cb44e25828", "Seyahat", PHOTOGRAPHERS.annieSpratt, 800, 450),
  },
  "flight-tickets": {
    hero: img("1611162617474-5b21e879e113", "Airplane travel flight", PHOTOGRAPHERS.rossParmly),
    mid: img("1554224155-6726b3ff858f", "Bilet fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1436491865332-7a61a109cc05", "Havalimanı", PHOTOGRAPHERS.rossParmly, 800, 450),
  },
  "online-courses": {
    hero: img("1611162617474-5b21e879e113", "Online learning education", PHOTOGRAPHERS.greenChameleon),
    mid: img("1521295121783-8a321d551ad2", "Laptop öğrenme", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Eğitim", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "travel-vpn-security": {
    hero: img("1611162617474-5b21e879e113", "Airport travel wifi", PHOTOGRAPHERS.jeshoots),
    mid: img("1436491865332-7a61a109cc05", "Havalimanı", PHOTOGRAPHERS.rossParmly, 800, 450),
    end: img("1521295121783-8a321d551ad2", "Laptop güvenlik", PHOTOGRAPHERS.christinHume, 800, 450),
  },
  "router-vpn-setup": {
    hero: img("1556742049-0cfed4f6a45d", "WiFi router home network", PHOTOGRAPHERS.mishaFeshchak),
    mid: img("1558494949-ef010cbdcc31", "Ağ kabloları", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1518770660439-4636190af475", "Network tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "linux-vpn-setup": {
    hero: img("1593359677879-a4bb92f829d1", "Linux terminal command", PHOTOGRAPHERS.gabrielHeinzer),
    mid: img("1555949963-ff9fe0c870eb", "Linux kod", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1551808525-51a94da548ce", "Sistem config", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ios-vpn-shortcuts": {
    hero: img("1611162617474-5b21e879e113", "iPhone shortcuts automation", PHOTOGRAPHERS.bagusHernawan),
    mid: img("1574944985070-8f3ebc6b79d2", "iPhone app", PHOTOGRAPHERS.privecstasy, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Mobil güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "macos-vpn-setup": {
    hero: img("1611162617474-5b21e879e113", "MacBook laptop workspace", PHOTOGRAPHERS.matheusBertelli),
    mid: img("1517336714731-489689fd1ca8", "macOS desktop", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1521295121783-8a321d551ad2", "Mac çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
  },
  "apple-tv-vpn": {
    hero: img("1611162617474-5b21e879e113", "Apple TV streaming", PHOTOGRAPHERS.glennCarstens),
    mid: img("1522869635100-9f4c5e86aa37", "TV apps", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1593359677879-a4bb92f829d1", "Streaming", PHOTOGRAPHERS.mollieSivaram, 800, 450),
  },
  "remote-work-security": {
    hero: img("1556742049-0cfed4f6a45d", "Remote work home office", PHOTOGRAPHERS.charlesDeluvio),
    mid: img("1587560699334-cc4ff634909a", "Home office", PHOTOGRAPHERS.mikeyHarris, 800, 450),
    end: img("1553877522-43269d4ea984", "Video konferans", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
  },
  "freelancer-vpn": {
    hero: img("1593359677879-a4bb92f829d1", "Freelancer remote laptop", PHOTOGRAPHERS.christinHumeAlt),
    mid: img("1521295121783-8a321d551ad2", "Laptop çalışma", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "educator-teacher-vpn": {
    hero: img("1611162617474-5b21e879e113", "Education classroom teaching", PHOTOGRAPHERS.nationalCancerInstitute),
    mid: img("1521295121783-8a321d551ad2", "Öğretmen laptop", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Online eğitim", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "investor-trader-vpn": {
    hero: img("1542751371-adc38448a05e", "Trading finance charts", PHOTOGRAPHERS.chrisLiverani),
    mid: img("1554224155-6726b3ff858f", "Finans", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Finansal güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "journalist-activist-vpn": {
    hero: img("1555949963-ff9fe0c870eb", "Journalism privacy", PHOTOGRAPHERS.romanKraft),
    mid: img("1555949963-ff9fe0c870eb", "Veri koruma", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1589994965851-a8f479c573a9", "İfade özgürlüğü", PHOTOGRAPHERS.clintPatterson, 800, 450),
  },
  "dns-leak-test": {
    hero: img("1451187580459-43490279c0fa", "DNS network security", PHOTOGRAPHERS.taylorVick),
    mid: img("1558494949-ef010cbdcc31", "Network test", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik test", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "kill-switch-explained": {
    hero: img("1611974789855-9c2a0a7236a3", "Network kill switch", PHOTOGRAPHERS.markusSpiske),
    mid: img("1526374965328-7f61d4dc18c5", "Güvenlik katmanı", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "vpn-privacy-security-basics": {
    hero: img("1563013544-824ae1b704d3", "Cybersecurity privacy", PHOTOGRAPHERS.growtika),
    mid: img("1555949963-ff9fe0c870eb", "Gizlilik", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "vpn-protocols-explained": {
    hero: img("1451187580459-43490279c0fa", "Network encryption", PHOTOGRAPHERS.markusSpiske),
    mid: img("1544197150-b99a580bb7a8", "Ağ kabloları", PHOTOGRAPHERS.jordanHarrison, 800, 450),
    end: img("1551808525-51a94da548ce", "Teknoloji", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "wireguard-openvpn": {
    hero: img("1677442136019-21780ecad995", "VPN protocol technology", PHOTOGRAPHERS.possessedPhotography),
    mid: img("1518770660439-4636190af475", "Network tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1551808525-51a94da548ce", "Encryption", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "split-tunneling": {
    hero: img("1544197150-b99a580bb7a8", "Network split routing", PHOTOGRAPHERS.adiGoldstein),
    mid: img("1544197150-b99a580bb7a8", "Network", PHOTOGRAPHERS.jordanHarrison, 800, 450),
    end: img("1518770660439-4636190af475", "Tech", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "double-vpn-multihop": {
    hero: img("1614064641938-3bbee52942c7", "Double encryption chain", PHOTOGRAPHERS.philippKatzenberger),
    mid: img("1526374965328-7f61d4dc18c5", "Şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "ram-only-servers": {
    hero: img("1558494949-ef010cbdcc31", "Server datacenter RAM", PHOTOGRAPHERS.liamBriese),
    mid: img("1558494949-ef010cbdcc31", "Sunucu", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1518770660439-4636190af475", "Hardware", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "nordvpn-surfshark": {
    hero: img("1556742049-0cfed4f6a45d", "VPN comparison", PHOTOGRAPHERS.mishaFeshchak),
    mid: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Seçim", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "expressvpn-protonvpn": {
    hero: img("1614064641938-3bbee52942c7", "VPN privacy comparison", PHOTOGRAPHERS.flyd),
    mid: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "choosing-vpn-guide": {
    hero: img("1551434678-e076c223a692", "Choice decision selection", PHOTOGRAPHERS.rossFindon),
    mid: img("1551434678-e076c223a692", "Liste kontrol", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Seçim", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "free-vs-paid-vpn": {
    hero: img("1554224155-6726b3ff858f", "Money cost comparison", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Para", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "vpn-subscription-period": {
    hero: img("1554224155-6726b3ff858f", "Subscription pricing plan", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Plan seçimi", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "fastest-vpn-turkey": {
    hero: img("1451187580459-43490279c0fa", "Speed test performance", PHOTOGRAPHERS.taylorVick),
    mid: img("1451187580459-43490279c0fa", "Hız", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1518770660439-4636190af475", "Teknoloji", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "vpn-speed-optimization": {
    hero: img("1451187580459-43490279c0fa", "Speed internet fiber", PHOTOGRAPHERS.markusSpiske),
    mid: img("1451187580459-43490279c0fa", "Hızlı veri", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1518770660439-4636190af475", "Performans", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "what-is-vpn": {
    hero: img("1563013544-824ae1b704d3", "Digital privacy security", PHOTOGRAPHERS.growtika),
    mid: img("1558494949-ef010cbdcc31", "Network", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1550751827-4bd374c3f58b", "Güvenlik", PHOTOGRAPHERS.adiGoldstein, 800, 450),
  },
  "is-vpn-legal": {
    hero: img("1589829545856-d10d557cf95f", "Law legal justice", PHOTOGRAPHERS.sebastianPichler),
    mid: img("1589829545856-d10d557cf95f", "Yasal belge", PHOTOGRAPHERS.scottWebb, 800, 450),
    end: img("1589994965851-a8f479c573a9", "Adalet", PHOTOGRAPHERS.clintPatterson, 800, 450),
  },
  "vpn-streaming-access": {
    hero: img("1593359677879-a4bb92f829d1", "Streaming entertainment", PHOTOGRAPHERS.thibaultPenin),
    mid: img("1522869635100-9f4c5e86aa37", "TV streaming", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global içerik", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },

  // Aynı coverImage key'ini paylaşan farklı konular için ayrı hero setleri
  "dns-webrtc-home-test": {
    hero: img("1611974789855-9c2a0a7236a3", "Ev ağı DNS ve WebRTC testi", PHOTOGRAPHERS.markusSpiske),
    mid: img("1558494949-ef010cbdcc31", "Ağ testi", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik kontrolü", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "dns-webrtc-home-test-en": {
    hero: img("1611974789855-9c2a0a7236a3", "Home DNS and WebRTC leak test", PHOTOGRAPHERS.markusSpiske),
    mid: img("1558494949-ef010cbdcc31", "Network test", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Security check", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "gold-shopping-privacy": {
    hero: img("1542751371-adc38448a05e", "Altın ve fiyat takibi", PHOTOGRAPHERS.chrisLiverani),
    mid: img("1554224155-6726b3ff858f", "Online alışveriş", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Gizlilik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "gold-shopping-privacy-en": {
    hero: img("1542751371-adc38448a05e", "Gold price tracking privacy", PHOTOGRAPHERS.chrisLiverani),
    mid: img("1554224155-6726b3ff858f", "Online shopping", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Privacy", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "trustworthy-vpn-guide": {
    hero: img("1454165804606-c3d57bc86b40", "Güvenilir VPN seçimi", PHOTOGRAPHERS.scottGraham),
    mid: img("1551434678-e076c223a692", "Kontrol listesi", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "trustworthy-vpn-guide-en": {
    hero: img("1454165804606-c3d57bc86b40", "Choosing a trustworthy VPN", PHOTOGRAPHERS.scottGraham),
    mid: img("1551434678-e076c223a692", "Checklist", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Comparison", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "planckvpn-review": {
    hero: img("1551808525-51a94da548ce", "Bağımsız VPN analizi", PHOTOGRAPHERS.markusSpiske),
    mid: img("1563013544-824ae1b704d3", "Güvenlik değerlendirme", PHOTOGRAPHERS.growtika, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Gizlilik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "planckvpn-review-en": {
    hero: img("1551808525-51a94da548ce", "Independent VPN review", PHOTOGRAPHERS.markusSpiske),
    mid: img("1563013544-824ae1b704d3", "Security assessment", PHOTOGRAPHERS.growtika, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Privacy", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "family-internet-safety": {
    hero: img("1587560699334-cc4ff634909a", "Aile internet güvenliği", PHOTOGRAPHERS.mikeyHarris),
    mid: img("1521295121783-8a321d551ad2", "Evde çocuklar", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "family-internet-safety-en": {
    hero: img("1587560699334-cc4ff634909a", "Family internet safety", PHOTOGRAPHERS.mikeyHarris),
    mid: img("1521295121783-8a321d551ad2", "Kids at home", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Protection", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "freelancer-remote-work": {
    hero: img("1593359677879-a4bb92f829d1", "Freelancer uzaktan çalışma", PHOTOGRAPHERS.christinHumeAlt),
    mid: img("1521295121783-8a321d551ad2", "Laptop", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1553877522-43269d4ea984", "Video görüşme", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
  },
  "freelancer-remote-work-en": {
    hero: img("1593359677879-a4bb92f829d1", "Freelancer remote work", PHOTOGRAPHERS.christinHumeAlt),
    mid: img("1521295121783-8a321d551ad2", "Laptop work", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1553877522-43269d4ea984", "Video call", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
  },
  "fake-streaming-sites": {
    hero: img("1461896836934-ffe607ba8211", "Sahte canlı yayın siteleri", PHOTOGRAPHERS.daveLowe),
    mid: img("1522869635100-9f4c5e86aa37", "TV ekranı", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "fake-streaming-sites-en": {
    hero: img("1461896836934-ffe607ba8211", "Fake streaming websites", PHOTOGRAPHERS.daveLowe),
    mid: img("1522869635100-9f4c5e86aa37", "TV screen", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Security", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "internet-security-anxiety": {
    hero: img("1550751827-4bd374c3f58b", "İnternet güvenlik kaygısı", PHOTOGRAPHERS.adiGoldstein),
    mid: img("1614064641938-3bbee52942c7", "Koruma", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "internet-security-anxiety-en": {
    hero: img("1550751827-4bd374c3f58b", "Internet security anxiety", PHOTOGRAPHERS.adiGoldstein),
    mid: img("1614064641938-3bbee52942c7", "Protection", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Encryption", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "spam-call-mobile": {
    hero: img("1574944985070-8f3ebc6b79d2", "Spam arama ve mobil güvenlik", PHOTOGRAPHERS.privecstasy),
    mid: img("1614064641938-3bbee52942c7", "Mobil koruma", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1555949963-ff9fe0c870eb", "Güvenlik", PHOTOGRAPHERS.shahadat, 800, 450),
  },
  "spam-call-mobile-en": {
    hero: img("1574944985070-8f3ebc6b79d2", "Spam calls mobile security", PHOTOGRAPHERS.privecstasy),
    mid: img("1614064641938-3bbee52942c7", "Mobile protection", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1555949963-ff9fe0c870eb", "Security", PHOTOGRAPHERS.shahadat, 800, 450),
  },
  "fake-delivery-phishing": {
    hero: img("1526374965328-7f61d4dc18c5", "Sahte kargo SMS dolandırıcılığı", PHOTOGRAPHERS.markusSpiske),
    mid: img("1550751827-4bd374c3f58b", "Phishing", PHOTOGRAPHERS.adiGoldstein, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "fake-delivery-phishing-en": {
    hero: img("1526374965328-7f61d4dc18c5", "Fake delivery SMS phishing", PHOTOGRAPHERS.markusSpiske),
    mid: img("1550751827-4bd374c3f58b", "Phishing alert", PHOTOGRAPHERS.adiGoldstein, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Protection", PHOTOGRAPHERS.flyd, 800, 450),
  },

  // === UNIQUE KEYS FOR EACH BLOG POST (TR/EN SEPARATION) ===

  // 2x duplicates - EN versions get unique images
  "vpn-basics-en": {
    hero: img("1563013544-824ae1b704d3", "VPN fundamentals", PHOTOGRAPHERS.growtika),
    mid: img("1563013544-824ae1b704d3", "Network", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Security", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "vpn-privacy-security-basics-en": {
    hero: img("1614064641938-3bbee52942c7", "Privacy lock", PHOTOGRAPHERS.flyd),
    mid: img("1550751827-4bd374c3f58b", "Data protection", PHOTOGRAPHERS.adiGoldstein, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Encryption", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "travel-vpn-en": {
    hero: img("1436491865332-7a61a109cc05", "Airport", PHOTOGRAPHERS.rossParmly),
    mid: img("1521295121783-8a321d551ad2", "Cafe laptop", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1611162617474-5b21e879e113", "World map", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "remote-work-en": {
    hero: img("1553877522-43269d4ea984", "Video conference", PHOTOGRAPHERS.chrisMontgomery),
    mid: img("1516321318423-f06f85e504b3", "Secure work", PHOTOGRAPHERS.johnSchnobrich, 800, 450),
    end: img("1587560699334-cc4ff634909a", "Home office", PHOTOGRAPHERS.mikeyHarris, 800, 450),
  },
  "vpn-protocols-explained-en": {
    hero: img("1551808525-51a94da548ce", "Encryption", PHOTOGRAPHERS.markusSpiske),
    mid: img("1544197150-b99a580bb7a8", "Network cables", PHOTOGRAPHERS.jordanHarrison, 800, 450),
    end: img("1558494949-ef010cbdcc31", "Server room", PHOTOGRAPHERS.taylorVick, 800, 450),
  },
  "vpn-legal-en": {
    hero: img("1589829545856-d10d557cf95f", "Legal document", PHOTOGRAPHERS.scottWebb),
    mid: img("1589994965851-a8f479c573a9", "Justice", PHOTOGRAPHERS.clintPatterson, 800, 450),
    end: img("1589829545856-d10d557cf95f", "Law", PHOTOGRAPHERS.sebastianPichler, 800, 450),
  },
  "streaming-vpn-en": {
    hero: img("1593359677879-a4bb92f829d1", "Netflix streaming", PHOTOGRAPHERS.mollieSivaram),
    mid: img("1611162617474-5b21e879e113", "Global content", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
    end: img("1522869635100-9f4c5e86aa37", "Smart TV", PHOTOGRAPHERS.glennCarstens, 800, 450),
  },
  "streaming-uk-en": {
    hero: img("1450101499163-c8848c66ca85", "UK landscape", PHOTOGRAPHERS.philippeOursel),
    mid: img("1522869635100-9f4c5e86aa37", "BBC", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1450101499163-c8848c66ca85", "London", PHOTOGRAPHERS.aronVandePol, 800, 450),
  },
  "streaming-sports-en": {
    hero: img("1517649763962-0c623066013b", "Sports", PHOTOGRAPHERS.daveLowe),
    mid: img("1461896836934-ffe607ba8211", "Stadium", PHOTOGRAPHERS.daveLowe, 800, 450),
    end: img("1522869635100-9f4c5e86aa37", "Live TV", PHOTOGRAPHERS.glennCarstens, 800, 450),
  },
  "streaming-music-en": {
    hero: img("1470225620780-dba8ba36b745", "Spotify app", PHOTOGRAPHERS.alexanderShatov),
    mid: img("1554224155-6726b3ff858f", "Subscription", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1511379938547-c1f69419868d", "Music", PHOTOGRAPHERS.alexanderShatov, 800, 450),
  },
  "streaming-content-en": {
    hero: img("1611162617474-5b21e879e113", "Global streaming", PHOTOGRAPHERS.guerrillaBuzz),
    mid: img("1593359677879-a4bb92f829d1", "Streaming apps", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1593359677879-a4bb92f829d1", "Entertainment", PHOTOGRAPHERS.thibaultPenin, 800, 450),
  },
  "streaming-anime-en": {
    hero: img("1593359677879-a4bb92f829d1", "Anime platform", PHOTOGRAPHERS.mollieSivaram),
    mid: img("1611162617474-5b21e879e113", "Global anime", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
    end: img("1611162617474-5b21e879e113", "Tokyo", PHOTOGRAPHERS.sorasak, 800, 450),
  },
  "split-tunneling-en": {
    hero: img("1544197150-b99a580bb7a8", "Network split", PHOTOGRAPHERS.jordanHarrison),
    mid: img("1558494949-ef010cbdcc31", "VPN routing", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1544197150-b99a580bb7a8", "Split routing", PHOTOGRAPHERS.adiGoldstein, 800, 450),
  },
  "speed-performance-en": {
    hero: img("1451187580459-43490279c0fa", "Speed test", PHOTOGRAPHERS.nasa),
    mid: img("1451187580459-43490279c0fa", "Performance", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1451187580459-43490279c0fa", "Fast", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "software-subscription-en": {
    hero: img("1554224155-6726b3ff858f", "Subscription", PHOTOGRAPHERS.rupixen),
    mid: img("1554224155-6726b3ff858f", "Savings", PHOTOGRAPHERS.towfiquBarbhuiya, 800, 450),
    end: img("1587560699334-cc4ff634909a", "Software", PHOTOGRAPHERS.mikeyHarris, 800, 450),
  },
  "remote-work-vpn-en": {
    hero: img("1516321318423-f06f85e504b3", "Remote security", PHOTOGRAPHERS.johnSchnobrich),
    mid: img("1587560699334-cc4ff634909a", "Work home", PHOTOGRAPHERS.mikeyHarris, 800, 450),
    end: img("1553877522-43269d4ea984", "Meeting", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
  },
  "learning-savings-en": {
    hero: img("1522202176988-66273c2fd55f", "Education", PHOTOGRAPHERS.greenChameleon),
    mid: img("1554224155-6726b3ff858f", "Discount", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1503676260728-1c00da094a0b", "Learning", PHOTOGRAPHERS.greenChameleon, 800, 450),
  },
  "kill-switch-explained-en": {
    hero: img("1555949963-ff9fe0c870eb", "Security", PHOTOGRAPHERS.shahadat),
    mid: img("1558494949-ef010cbdcc31", "Network protection", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Kill switch", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "journalism-vpn-en": {
    hero: img("1614064641938-3bbee52942c7", "Press freedom", PHOTOGRAPHERS.flyd),
    mid: img("1555949963-ff9fe0c870eb", "Privacy", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1504711434969-e33886168f5c", "Journalism", PHOTOGRAPHERS.romanKraft, 800, 450),
  },
  "finance-vpn-en": {
    hero: img("1554224155-6726b3ff858f", "Stock market", PHOTOGRAPHERS.rupixen),
    mid: img("1614064641938-3bbee52942c7", "Secure trade", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1611974789855-9c2a0a7236a3", "Finance", PHOTOGRAPHERS.chrisLiverani, 800, 450),
  },
  "education-vpn-en": {
    hero: img("1522202176988-66273c2fd55f", "Teaching", PHOTOGRAPHERS.greenChameleon),
    mid: img("1558494949-ef010cbdcc31", "Secure ed", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1503676260728-1c00da094a0b", "Education", PHOTOGRAPHERS.greenChameleon, 800, 450),
  },
  "dns-leak-test-en": {
    hero: img("1526374965328-7f61d4dc18c5", "DNS test", PHOTOGRAPHERS.markusSpiske),
    mid: img("1614064641938-3bbee52942c7", "Leak protection", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1558494949-ef010cbdcc31", "DNS leak", PHOTOGRAPHERS.taylorVick, 800, 450),
  },
  "device-tv-en": {
    hero: img("1522869635100-9f4c5e86aa37", "Smart TV", PHOTOGRAPHERS.glennCarstens),
    mid: img("1558494949-ef010cbdcc31", "TV setup", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1593359677879-a4bb92f829d1", "TV VPN", PHOTOGRAPHERS.mollieSivaram, 800, 450),
  },
  "device-router-en": {
    hero: img("1558494949-ef010cbdcc31", "Router setup", PHOTOGRAPHERS.taylorVick),
    mid: img("1526374965328-7f61d4dc18c5", "Network", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1606904825846-647eb07f5be2", "Router VPN", PHOTOGRAPHERS.bagusHernawan, 800, 450),
  },
  "device-mac-en": {
    hero: img("1517336714731-489689fd1ca8", "MacOS setup", PHOTOGRAPHERS.charlesDeluvio),
    mid: img("1558494949-ef010cbdcc31", "Mac security", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Mac VPN", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "device-linux-en": {
    hero: img("1526374965328-7f61d4dc18c5", "Linux terminal", PHOTOGRAPHERS.markusSpiske),
    mid: img("1558494949-ef010cbdcc31", "Linux setup", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Linux VPN", PHOTOGRAPHERS.gabrielHeinzer, 800, 450),
  },
  "device-ios-en": {
    hero: img("1574944985070-8f3ebc6b79d2", "iPhone setup", PHOTOGRAPHERS.jeshoots),
    mid: img("1558494949-ef010cbdcc31", "iOS security", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "iOS VPN", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "device-console-en": {
    hero: img("1552820728-8b83bb6b773f", "Gaming", PHOTOGRAPHERS.florianOlivo),
    mid: img("1538481199705-c710c4e965fc", "Console", PHOTOGRAPHERS.florianOlivo, 800, 450),
    end: img("1552820728-8b83bb6b773f", "Console VPN", PHOTOGRAPHERS.kerdeSeverin, 800, 450),
  },
  "chatgpt-plus-pricing-en": {
    hero: img("1620712943543-bcc4688e7485", "AI pricing", PHOTOGRAPHERS.possessedPhotography),
    mid: img("1554224155-6726b3ff858f", "Subscription", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1677442136019-21780ecad995", "ChatGPT", PHOTOGRAPHERS.growtika, 800, 450),
  },
  "ai-tools-comparison-en": {
    hero: img("1620712943543-bcc4688e7485", "AI comparison", PHOTOGRAPHERS.possessedPhotography),
    mid: img("1526374965328-7f61d4dc18c5", "Tools", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1677442136019-21780ecad995", "AI tools", PHOTOGRAPHERS.growtika, 800, 450),
  },
  "ai-security-en": {
    hero: img("1677442136019-21780ecad995", "AI privacy", PHOTOGRAPHERS.growtika),
    mid: img("1555949963-ff9fe0c870eb", "Data", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1614064641938-3bbee52942c7", "AI security", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "ai-privacy-en": {
    hero: img("1614064641938-3bbee52942c7", "Privacy shield", PHOTOGRAPHERS.flyd),
    mid: img("1677442136019-21780ecad995", "AI protection", PHOTOGRAPHERS.growtika, 800, 450),
    end: img("1555949963-ff9fe0c870eb", "AI privacy", PHOTOGRAPHERS.shahadat, 800, 450),
  },
  "youtube-premium-en": {
    hero: img("1554224155-6726b3ff858f", "Subscription", PHOTOGRAPHERS.rupixen),
    mid: img("1522869635100-9f4c5e86aa37", "Streaming", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1522869635100-9f4c5e86aa37", "YouTube", PHOTOGRAPHERS.christianWiediger, 800, 450),
  },
  "wireguard-openvpn-en": {
    hero: img("1526374965328-7f61d4dc18c5", "Encryption", PHOTOGRAPHERS.markusSpiske),
    mid: img("1550751827-4bd374c3f58b", "Security", PHOTOGRAPHERS.adiGoldstein, 800, 450),
    end: img("1558494949-ef010cbdcc31", "VPN protocols", PHOTOGRAPHERS.taylorVick, 800, 450),
  },
  "vpn-speed-en": {
    hero: img("1451187580459-43490279c0fa", "Speed test", PHOTOGRAPHERS.taylorVick),
    mid: img("1451187580459-43490279c0fa", "Performance", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1451187580459-43490279c0fa", "Speed", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "vpn-selection-en": {
    hero: img("1551434678-e076c223a692", "Selection", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1556742049-0cfed4f6a45d", "Choice", PHOTOGRAPHERS.mishaFeshchak, 800, 450),
    end: img("1551434678-e076c223a692", "Provider", PHOTOGRAPHERS.rossFindon, 800, 450),
  },

  // 4x duplicates - 4 unique keys each (TR + EN combinations)
  "ai-creative-content-tr": {
    hero: img("1521295121783-8a321d551ad2", "İçerik üretimi", PHOTOGRAPHERS.christinHumeAlt),
    mid: img("1521295121783-8a321d551ad2", "Yazma", PHOTOGRAPHERS.christinHume, 800, 450),
    end: img("1563013544-824ae1b704d3", "Dijital içerik", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ai-creative-content-en": {
    hero: img("1521295121783-8a321d551ad2", "Content writing", PHOTOGRAPHERS.christinHume),
    mid: img("1521295121783-8a321d551ad2", "Creative work", PHOTOGRAPHERS.christinHumeAlt, 800, 450),
    end: img("1677442136019-21780ecad995", "AI content", PHOTOGRAPHERS.growtika, 800, 450),
  },
  "ai-creative-midjourney-tr": {
    hero: img("1677442136019-21780ecad995", "AI sanat", PHOTOGRAPHERS.steveJohnson),
    mid: img("1677442136019-21780ecad995", "AI görsel", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1563013544-824ae1b704d3", "Dijital sanat", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ai-creative-midjourney-en": {
    hero: img("1677442136019-21780ecad995", "AI art", PHOTOGRAPHERS.shahadat),
    mid: img("1677442136019-21780ecad995", "Midjourney", PHOTOGRAPHERS.steveJohnson, 800, 450),
    end: img("1620712943543-bcc4688e7485", "AI design", PHOTOGRAPHERS.possessedPhotography, 800, 450),
  },
  "ai-vpn-access-chatgpt-tr": {
    hero: img("1677442136019-21780ecad995", "ChatGPT", PHOTOGRAPHERS.growtika),
    mid: img("1620712943543-bcc4688e7485", "AI chat", PHOTOGRAPHERS.possessedPhotography, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "VPN bağlantı", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ai-vpn-access-chatgpt-en": {
    hero: img("1620712943543-bcc4688e7485", "ChatGPT access", PHOTOGRAPHERS.possessedPhotography),
    mid: img("1677442136019-21780ecad995", "AI access", PHOTOGRAPHERS.growtika, 800, 450),
    end: img("1614064641938-3bbee52942c7", "VPN", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "ai-vpn-access-china-tr": {
    hero: img("1451187580459-43490279c0fa", "Global erişim", PHOTOGRAPHERS.nasa),
    mid: img("1526374965328-7f61d4dc18c5", "Ağ erişim", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1611162617474-5b21e879e113", "Dünya", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "ai-vpn-access-china-en": {
    hero: img("1611162617474-5b21e879e113", "Global AI", PHOTOGRAPHERS.guerrillaBuzz),
    mid: img("1451187580459-43490279c0fa", "Worldwide", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Network", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "choosing-vpn-nord-surf-tr": {
    hero: img("1556742049-0cfed4f6a45d", "VPN karşılaştırma", PHOTOGRAPHERS.mishaFeshchak),
    mid: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Seçim", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "choosing-vpn-nord-surf-en": {
    hero: img("1556742049-0cfed4f6a45d", "VPN comparison", PHOTOGRAPHERS.blakeWisz),
    mid: img("1556742049-0cfed4f6a45d", "Choice", PHOTOGRAPHERS.mishaFeshchak, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Selection", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "choosing-vpn-express-proton-tr": {
    hero: img("1614064641938-3bbee52942c7", "Gizlilik karşılaştırma", PHOTOGRAPHERS.flyd),
    mid: img("1556742049-0cfed4f6a45d", "Karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "choosing-vpn-express-proton-en": {
    hero: img("1614064641938-3bbee52942c7", "Privacy", PHOTOGRAPHERS.flyd),
    mid: img("1614064641938-3bbee52942c7", "Comparison", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Choice", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "free-vs-paid-comparison-tr": {
    hero: img("1554224155-6726b3ff858f", "Karşılaştırma", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Para", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Seçim", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "free-vs-paid-comparison-en": {
    hero: img("1554224155-6726b3ff858f", "Cost comparison", PHOTOGRAPHERS.rupixen),
    mid: img("1554224155-6726b3ff858f", "Money", PHOTOGRAPHERS.towfiquBarbhuiya, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Comparison", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "free-vs-paid-subscription-tr": {
    hero: img("1554224155-6726b3ff858f", "Abonelik", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Fiyat", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1554224155-6726b3ff858f", "Maliyet", PHOTOGRAPHERS.towfiquBarbhuiya, 800, 450),
  },
  "free-vs-paid-subscription-en": {
    hero: img("1554224155-6726b3ff858f", "Subscription cost", PHOTOGRAPHERS.towfiquBarbhuiya),
    mid: img("1554224155-6726b3ff858f", "Plans", PHOTOGRAPHERS.towfiquBarbhuiya, 800, 450),
    end: img("1554224155-6726b3ff858f", "Price", PHOTOGRAPHERS.rupixen, 800, 450),
  },
  "gaming-savings-console-tr": {
    hero: img("1552820728-8b83bb6b773f", "Konsol", PHOTOGRAPHERS.kerdeSeverin),
    mid: img("1552820728-8b83bb6b773f", "Kontrol", PHOTOGRAPHERS.florianOlivo, 800, 450),
    end: img("1538481199705-c710c4e965fc", "Oyun", PHOTOGRAPHERS.florianOlivo, 800, 450),
  },
  "gaming-savings-console-en": {
    hero: img("1538481199705-c710c4e965fc", "Gaming setup", PHOTOGRAPHERS.florianOlivo),
    mid: img("1552820728-8b83bb6b773f", "Console", PHOTOGRAPHERS.kerdeSeverin, 800, 450),
    end: img("1552820728-8b83bb6b773f", "Controller", PHOTOGRAPHERS.florianOlivo, 800, 450),
  },
  "gaming-savings-steam-tr": {
    hero: img("1542751371-adc38448a05e", "Steam", PHOTOGRAPHERS.nikitaKachanovsky),
    mid: img("1552820728-8b83bb6b773f", "PC oyun", PHOTOGRAPHERS.florianOlivo, 800, 450),
    end: img("1552820728-8b83bb6b773f", "Kütüphane", PHOTOGRAPHERS.kerdeSeverin, 800, 450),
  },
  "gaming-savings-steam-en": {
    hero: img("1552820728-8b83bb6b773f", "PC gaming", PHOTOGRAPHERS.florianOlivo),
    mid: img("1542751371-adc38448a05e", "Steam", PHOTOGRAPHERS.nikitaKachanovsky, 800, 450),
    end: img("1538481199705-c710c4e965fc", "Library", PHOTOGRAPHERS.florianOlivo, 800, 450),
  },
  "privacy-advanced-double-vpn-tr": {
    hero: img("1614064641938-3bbee52942c7", "Double VPN", PHOTOGRAPHERS.philippKatzenberger),
    mid: img("1526374965328-7f61d4dc18c5", "Multi-hop", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Gelişmiş güvenlik", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "privacy-advanced-double-vpn-en": {
    hero: img("1614064641938-3bbee52942c7", "Double encryption", PHOTOGRAPHERS.flyd),
    mid: img("1614064641938-3bbee52942c7", "Multi-hop", PHOTOGRAPHERS.philippKatzenberger, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Advanced", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "privacy-advanced-ram-servers-tr": {
    hero: img("1558494949-ef010cbdcc31", "RAM sunucu", PHOTOGRAPHERS.liamBriese),
    mid: img("1558494949-ef010cbdcc31", "Sunucu", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1518770660439-4636190af475", "Donanım", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "privacy-advanced-ram-servers-en": {
    hero: img("1518770660439-4636190af475", "RAM servers", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1558494949-ef010cbdcc31", "Datacenter", PHOTOGRAPHERS.liamBriese, 800, 450),
    end: img("1558494949-ef010cbdcc31", "Server", PHOTOGRAPHERS.taylorVick, 800, 450),
  },
  "travel-savings-flights-tr": {
    hero: img("1436491865332-7a61a109cc05", "Uçak bileti", PHOTOGRAPHERS.rossParmly),
    mid: img("1488646953014-85cb44e25828", "Uçuş", PHOTOGRAPHERS.annieSpratt, 800, 450),
    end: img("1554224155-6726b3ff858f", "Tasarruf", PHOTOGRAPHERS.rupixen, 800, 450),
  },
  "travel-savings-flights-en": {
    hero: img("1488646953014-85cb44e25828", "Flight tickets", PHOTOGRAPHERS.annieSpratt),
    mid: img("1436491865332-7a61a109cc05", "Airplane", PHOTOGRAPHERS.rossParmly, 800, 450),
    end: img("1554224155-6726b3ff858f", "Savings", PHOTOGRAPHERS.rupixen, 800, 450),
  },
  "travel-savings-hotels-tr": {
    hero: img("1566073771259-6a8506099945", "Otel rezervasyon", PHOTOGRAPHERS.manuelMoreno),
    mid: img("1566073771259-6a8506099945", "Otel odası", PHOTOGRAPHERS.manuelMoreno, 800, 450),
    end: img("1554224155-6726b3ff858f", "İndirim", PHOTOGRAPHERS.rupixen, 800, 450),
  },
  "travel-savings-hotels-en": {
    hero: img("1566073771259-6a8506099945", "Hotel room", PHOTOGRAPHERS.manuelMoreno),
    mid: img("1566073771259-6a8506099945", "Booking", PHOTOGRAPHERS.manuelMoreno, 800, 450),
    end: img("1554224155-6726b3ff858f", "Discount", PHOTOGRAPHERS.rupixen, 800, 450),
  },
  "public-wifi-security-tr": {
    hero: img("1521295121783-8a321d551ad2", "Kafede Wi-Fi kullanımı", PHOTOGRAPHERS.christinHume),
    mid: img("1550751827-4bd374c3f58b", "Siber güvenlik", PHOTOGRAPHERS.adiGoldstein, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Şifreleme ve koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "public-wifi-security-en": {
    hero: img("1521295121783-8a321d551ad2", "Public Wi-Fi at cafe", PHOTOGRAPHERS.christinHume),
    mid: img("1555949963-ff9fe0c870eb", "Network security", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Encryption lock", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "isp-throttling-tr": {
    hero: img("1451187580459-43490279c0fa", "Veri akışı ve hız", PHOTOGRAPHERS.nasa),
    mid: img("1614064641938-3bbee52942c7", "Performans ölçümü", PHOTOGRAPHERS.flyd, 800, 450),
    end: img("1518770660439-4636190af475", "Ağ altyapısı", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "isp-throttling-en": {
    hero: img("1544197150-b99a580bb7a8", "Network cables", PHOTOGRAPHERS.jordanHarrison),
    mid: img("1451187580459-43490279c0fa", "Data throughput", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1518770660439-4636190af475", "Infrastructure", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "vpn-troubleshoot-tr": {
    hero: img("1587560699334-cc4ff634909a", "Evden çalışma sorun giderme", PHOTOGRAPHERS.mikeyHarris),
    mid: img("1516321318423-f06f85e504b3", "Bağlantı ayarları", PHOTOGRAPHERS.johnSchnobrich, 800, 450),
    end: img("1551434678-e076c223a692", "Kontrol listesi", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "vpn-troubleshoot-en": {
    hero: img("1587560699334-cc4ff634909a", "Troubleshooting VPN", PHOTOGRAPHERS.mikeyHarris),
    mid: img("1516321318423-f06f85e504b3", "Connection settings", PHOTOGRAPHERS.johnSchnobrich, 800, 450),
    end: img("1551434678-e076c223a692", "Checklist", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "webrtc-leak-tr": {
    hero: img("1555949963-ff9fe0c870eb", "Tarayıcı ve ağ güvenliği", PHOTOGRAPHERS.shahadat),
    mid: img("1526374965328-7f61d4dc18c5", "Veri akışı", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1614064641938-3bbee52942c7", "WebRTC koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "webrtc-leak-en": {
    hero: img("1551808525-51a94da548ce", "Browser network security", PHOTOGRAPHERS.markusSpiske),
    mid: img("1555949963-ff9fe0c870eb", "Code and privacy", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1614064641938-3bbee52942c7", "WebRTC protection", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "vpn-2fa-tr": {
    hero: img("1563013544-824ae1b704d3", "Hesap güvenliği", PHOTOGRAPHERS.growtika),
    mid: img("1554224155-6726b3ff858f", "Güvenli erişim", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Kimlik doğrulama", PHOTOGRAPHERS.philippKatzenberger, 800, 450),
  },
  "vpn-2fa-en": {
    hero: img("1550751827-4bd374c3f58b", "Account security layers", PHOTOGRAPHERS.adiGoldstein),
    mid: img("1563013544-824ae1b704d3", "Digital protection", PHOTOGRAPHERS.growtika, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Two-factor lock", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "browser-fingerprint-tr": {
    hero: img("1526374965328-7f61d4dc18c5", "Dijital iz ve veri", PHOTOGRAPHERS.markusSpiske),
    mid: img("1677442136019-21780ecad995", "Tarayıcı arayüzü", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1551434678-e076c223a692", "Anonimlik katmanları", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "browser-fingerprint-en": {
    hero: img("1677442136019-21780ecad995", "Browser identity", PHOTOGRAPHERS.shahadat),
    mid: img("1526374965328-7f61d4dc18c5", "Digital fingerprint data", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1551434678-e076c223a692", "Privacy layers", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "travel-banking-tr": {
    hero: img("1554224155-6726b3ff858f", "Mobil bankacılık güvenliği", PHOTOGRAPHERS.rupixen),
    mid: img("1436491865332-7a61a109cc05", "Seyahat ve uçuş", PHOTOGRAPHERS.rossParmly, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Finansal koruma", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "travel-banking-en": {
    hero: img("1542751371-adc38448a05e", "Mobile banking security", PHOTOGRAPHERS.chrisLiverani),
    mid: img("1488646953014-85cb44e25828", "Travel planning", PHOTOGRAPHERS.annieSpratt, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Financial lock", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "vpn-multi-device-tr": {
    hero: img("1553877522-43269d4ea984", "Çoklu cihaz bağlantı", PHOTOGRAPHERS.chrisMontgomery),
    mid: img("1518770660439-4636190af475", "Telefon ve laptop", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1587560699334-cc4ff634909a", "Ev ofisi cihazları", PHOTOGRAPHERS.mikeyHarris, 800, 450),
  },
  "vpn-multi-device-en": {
    hero: img("1518770660439-4636190af475", "Multiple devices", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1553877522-43269d4ea984", "Connected workspace", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
    end: img("1587560699334-cc4ff634909a", "Home office devices", PHOTOGRAPHERS.mikeyHarris, 800, 450),
  },
  "remote-daily-security-tr": {
    hero: img("1556742049-0cfed4f6a45d", "Uzaktan çalışma rutini", PHOTOGRAPHERS.charlesDeluvio),
    mid: img("1553877522-43269d4ea984", "Video toplantı", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Güvenli bağlantı", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "remote-daily-security-en": {
    hero: img("1587560699334-cc4ff634909a", "Remote work routine", PHOTOGRAPHERS.mikeyHarris),
    mid: img("1556742049-0cfed4f6a45d", "Home office desk", PHOTOGRAPHERS.charlesDeluvio, 800, 450),
    end: img("1553877522-43269d4ea984", "Secure meeting", PHOTOGRAPHERS.chrisMontgomery, 800, 450),
  },
  "vpn-mtu-tr": {
    hero: img("1544197150-b99a580bb7a8", "Ağ kabloları ve MTU", PHOTOGRAPHERS.jordanHarrison),
    mid: img("1451187580459-43490279c0fa", "Veri paketleri", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1518770660439-4636190af475", "Ağ performansı", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "vpn-mtu-en": {
    hero: img("1451187580459-43490279c0fa", "Network throughput", PHOTOGRAPHERS.nasa),
    mid: img("1544197150-b99a580bb7a8", "Network cables", PHOTOGRAPHERS.jordanHarrison, 800, 450),
    end: img("1518770660439-4636190af475", "Packet routing", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "ipv6-vpn-tr": {
    hero: img("1451187580459-43490279c0fa", "IPv6 global network", PHOTOGRAPHERS.nasa),
    mid: img("1558494949-ef010cbdcc31", "Sunucu altyapısı", PHOTOGRAPHERS.taylorVick, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Ağ trafiği", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ipv6-vpn-en": {
    hero: img("1558494949-ef010cbdcc31", "Server infrastructure", PHOTOGRAPHERS.taylorVick),
    mid: img("1451187580459-43490279c0fa", "IPv6 connectivity", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1526374965328-7f61d4dc18c5", "Data flow", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "openvpn-manual-tr": {
    hero: img("1555949963-ff9fe0c870eb", "OpenVPN yapılandırma", PHOTOGRAPHERS.shahadat),
    mid: img("1516321318423-f06f85e504b3", "Terminal kurulum", PHOTOGRAPHERS.johnSchnobrich, 800, 450),
    end: img("1544197150-b99a580bb7a8", "Ağ bağlantısı", PHOTOGRAPHERS.jordanHarrison, 800, 450),
  },
  "openvpn-manual-en": {
    hero: img("1516321318423-f06f85e504b3", "OpenVPN terminal setup", PHOTOGRAPHERS.johnSchnobrich),
    mid: img("1555949963-ff9fe0c870eb", "Configuration code", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1544197150-b99a580bb7a8", "Network connection", PHOTOGRAPHERS.jordanHarrison, 800, 450),
  },
  "vpn-trial-refund-tr": {
    hero: img("1554224155-6726b3ff858f", "Para iade ve abonelik", PHOTOGRAPHERS.rupixen),
    mid: img("1556742049-0cfed4f6a45d", "Fiyat karşılaştırma", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Karar matrisi", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "vpn-trial-refund-en": {
    hero: img("1454165804606-c3d57bc86b40", "Refund and subscription", PHOTOGRAPHERS.scottGraham),
    mid: img("1554224155-6726b3ff858f", "Pricing comparison", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Value decision", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "vpn-jurisdiction-tr": {
    hero: img("1589829545856-d10d557cf95f", "Yasal belge ve yargı", PHOTOGRAPHERS.scottWebb),
    mid: img("1450101499163-c8848c66ca85", "Dünya haritası", PHOTOGRAPHERS.philippeOursel, 800, 450),
    end: img("1589994965851-a8f479c573a9", "Hukuk ve adalet", PHOTOGRAPHERS.clintPatterson, 800, 450),
  },
  "vpn-jurisdiction-en": {
    hero: img("1450101499163-c8848c66ca85", "Global jurisdictions map", PHOTOGRAPHERS.philippeOursel),
    mid: img("1589829545856-d10d557cf95f", "Legal documents", PHOTOGRAPHERS.scottWebb, 800, 450),
    end: img("1589994965851-a8f479c573a9", "Law and privacy", PHOTOGRAPHERS.clintPatterson, 800, 450),
  },
  "vpn-audit-tr": {
    hero: img("1454165804606-c3d57bc86b40", "Denetim ve rapor", PHOTOGRAPHERS.scottGraham),
    mid: img("1563013544-824ae1b704d3", "Güvenlik analizi", PHOTOGRAPHERS.growtika, 800, 450),
    end: img("1551434678-e076c223a692", "Kontrol listesi", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "vpn-audit-en": {
    hero: img("1563013544-824ae1b704d3", "Security audit report", PHOTOGRAPHERS.growtika),
    mid: img("1454165804606-c3d57bc86b40", "Compliance review", PHOTOGRAPHERS.scottGraham, 800, 450),
    end: img("1551434678-e076c223a692", "Verification checklist", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "claude-ai-tr": {
    hero: img("1620712943543-bcc4688e7485", "AI asistan arayüzü", PHOTOGRAPHERS.growtika),
    mid: img("1677442136019-21780ecad995", "Sohbet ve yapay zeka", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Gizlilik kilidi", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "claude-ai-en": {
    hero: img("1677442136019-21780ecad995", "Claude AI assistant", PHOTOGRAPHERS.shahadat),
    mid: img("1620712943543-bcc4688e7485", "AI chat interface", PHOTOGRAPHERS.growtika, 800, 450),
    end: img("1614064641938-3bbee52942c7", "Privacy lock", PHOTOGRAPHERS.flyd, 800, 450),
  },
  "ai-api-keys-tr": {
    hero: img("1555949963-ff9fe0c870eb", "API ve kod güvenliği", PHOTOGRAPHERS.shahadat),
    mid: img("1518770660439-4636190af475", "Geliştirici altyapı", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1563013544-824ae1b704d3", "Şifreleme", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "ai-api-keys-en": {
    hero: img("1518770660439-4636190af475", "API keys developer", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1555949963-ff9fe0c870eb", "Secure coding", PHOTOGRAPHERS.shahadat, 800, 450),
    end: img("1563013544-824ae1b704d3", "Encryption", PHOTOGRAPHERS.markusSpiske, 800, 450),
  },
  "perplexity-ai-tr": {
    hero: img("1451187580459-43490279c0fa", "AI arama ve veri", PHOTOGRAPHERS.nasa),
    mid: img("1526374965328-7f61d4dc18c5", "Arama sonuçları", PHOTOGRAPHERS.markusSpiske, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global erişim", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "perplexity-ai-en": {
    hero: img("1526374965328-7f61d4dc18c5", "AI search network", PHOTOGRAPHERS.markusSpiske),
    mid: img("1451187580459-43490279c0fa", "Data discovery", PHOTOGRAPHERS.nasa, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global access", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "prime-video-tr": {
    hero: img("1593359677879-a4bb92f829d1", "Prime Video streaming", PHOTOGRAPHERS.mollieSivaram),
    mid: img("1522869635100-9f4c5e86aa37", "Smart TV film", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1611162617474-5b21e879e113", "Global katalog", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "prime-video-en": {
    hero: img("1522869635100-9f4c5e86aa37", "Amazon Prime on TV", PHOTOGRAPHERS.glennCarstens),
    mid: img("1593359677879-a4bb92f829d1", "Streaming catalog", PHOTOGRAPHERS.mollieSivaram, 800, 450),
    end: img("1611162617474-5b21e879e113", "Regional access", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "twitch-stream-tr": {
    hero: img("1542751371-adc38448a05e", "Canlı yayın gaming", PHOTOGRAPHERS.nikitaKachanovsky),
    mid: img("1538481199705-c710c4e965fc", "Oyun kütüphanesi", PHOTOGRAPHERS.florianOlivo, 800, 450),
    end: img("1451187580459-43490279c0fa", "Düşük gecikme", PHOTOGRAPHERS.nasa, 800, 450),
  },
  "twitch-stream-en": {
    hero: img("1538481199705-c710c4e965fc", "Twitch live gaming", PHOTOGRAPHERS.florianOlivo),
    mid: img("1542751371-adc38448a05e", "Stream setup", PHOTOGRAPHERS.nikitaKachanovsky, 800, 450),
    end: img("1451187580459-43490279c0fa", "Low latency", PHOTOGRAPHERS.nasa, 800, 450),
  },
  "hbo-max-tr": {
    hero: img("1593359677879-a4bb92f829d1", "HBO Max dizi", PHOTOGRAPHERS.thibaultPenin),
    mid: img("1522869635100-9f4c5e86aa37", "Premium streaming", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1611162617474-5b21e879e113", "Bölgesel erişim", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "hbo-max-en": {
    hero: img("1522869635100-9f4c5e86aa37", "HBO Max streaming", PHOTOGRAPHERS.glennCarstens),
    mid: img("1593359677879-a4bb92f829d1", "Series catalog", PHOTOGRAPHERS.thibaultPenin, 800, 450),
    end: img("1611162617474-5b21e879e113", "Geo access", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "car-rental-tr": {
    hero: img("1488646953014-85cb44e25828", "Araba kiralama seyahat", PHOTOGRAPHERS.annieSpratt),
    mid: img("1566073771259-6a8506099945", "Yolculuk planı", PHOTOGRAPHERS.manuelMoreno, 800, 450),
    end: img("1554224155-6726b3ff858f", "Tasarruf", PHOTOGRAPHERS.rupixen, 800, 450),
  },
  "car-rental-en": {
    hero: img("1566073771259-6a8506099945", "Car rental travel", PHOTOGRAPHERS.manuelMoreno),
    mid: img("1488646953014-85cb44e25828", "Road trip map", PHOTOGRAPHERS.annieSpratt, 800, 450),
    end: img("1554224155-6726b3ff858f", "Travel savings", PHOTOGRAPHERS.rupixen, 800, 450),
  },
  "online-shopping-tr": {
    hero: img("1556742049-0cfed4f6a45d", "Online alışveriş", PHOTOGRAPHERS.blakeWisz),
    mid: img("1472852897357-fb1c29a0ce51", "E-ticaret", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Fiyat karşılaştırma", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "online-shopping-en": {
    hero: img("1472852897357-fb1c29a0ce51", "Online shopping cart", PHOTOGRAPHERS.rupixen),
    mid: img("1556742049-0cfed4f6a45d", "E-commerce checkout", PHOTOGRAPHERS.blakeWisz, 800, 450),
    end: img("1454165804606-c3d57bc86b40", "Price comparison", PHOTOGRAPHERS.scottGraham, 800, 450),
  },
  "app-store-pricing-tr": {
    hero: img("1518770660439-4636190af475", "Mobil uygulama mağazası", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1554224155-6726b3ff858f", "Dijital ödeme", PHOTOGRAPHERS.rupixen, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Abonelik fiyatı", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "app-store-pricing-en": {
    hero: img("1554224155-6726b3ff858f", "App store pricing", PHOTOGRAPHERS.rupixen),
    mid: img("1518770660439-4636190af475", "Mobile apps", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1556742049-0cfed4f6a45d", "Subscription cost", PHOTOGRAPHERS.blakeWisz, 800, 450),
  },
  "chromebook-tr": {
    hero: img("1498050108023-c5249b4fd3b0", "Chromebook laptop", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1517336714731-489689fd1ca8", "Laptop çalışma", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1551434678-e076c223a692", "Güvenli bağlantı", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "chromebook-en": {
    hero: img("1517336714731-489689fd1ca8", "Chromebook workspace", PHOTOGRAPHERS.alexKotliarskyi),
    mid: img("1498050108023-c5249b4fd3b0", "Laptop coding", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
    end: img("1551434678-e076c223a692", "Secure connection", PHOTOGRAPHERS.alexKotliarskyi, 800, 450),
  },
  "fire-tv-tr": {
    hero: img("1593359677879-a4bb92f829d1", "TV streaming", PHOTOGRAPHERS.thibaultPenin),
    mid: img("1522869635100-9f4c5e86aa37", "Smart TV remote", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1611162617474-5b21e879e113", "Streaming device", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "fire-tv-en": {
    hero: img("1522869635100-9f4c5e86aa37", "Fire TV streaming", PHOTOGRAPHERS.glennCarstens),
    mid: img("1593359677879-a4bb92f829d1", "TV entertainment", PHOTOGRAPHERS.thibaultPenin, 800, 450),
    end: img("1611162617474-5b21e879e113", "Media device", PHOTOGRAPHERS.guerrillaBuzz, 800, 450),
  },
  "android-tv-tr": {
    hero: img("1611162617474-5b21e879e113", "Android TV", PHOTOGRAPHERS.guerrillaBuzz),
    mid: img("1522869635100-9f4c5e86aa37", "TV ekran", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1593359677879-a4bb92f829d1", "Streaming apps", PHOTOGRAPHERS.thibaultPenin, 800, 450),
  },
  "android-tv-en": {
    hero: img("1611162617474-5b21e879e113", "Android TV box", PHOTOGRAPHERS.guerrillaBuzz),
    mid: img("1522869635100-9f4c5e86aa37", "Television screen", PHOTOGRAPHERS.glennCarstens, 800, 450),
    end: img("1593359677879-a4bb92f829d1", "App launcher", PHOTOGRAPHERS.thibaultPenin, 800, 450),
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
