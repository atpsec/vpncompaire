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
};

// Alias eşleştirmeleri (frontmatter'daki farklı isimlendirmeler için)
const aliases: Record<string, string> = {
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
