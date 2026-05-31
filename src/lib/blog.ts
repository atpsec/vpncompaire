import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export type BlogPostFrontmatter = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
  coverImage: string;
  unsplashKeyword: string;
};

export type BlogPost = BlogPostFrontmatter & {
  content: string;
};

// Cross-language slug map for hreflang/sitemap.
// Key = canonical id (matches a TR slug for legacy posts).
// Add new entries here when introducing posts whose TR/EN slugs differ.
export const BLOG_SLUG_MAP: Record<string, { tr: string; en: string }> = {
  "vpn-nedir-neden-gerekli": {
    tr: "vpn-nedir-neden-gerekli",
    en: "what-is-vpn-why-you-need-it",
  },
  "vpn-gizlilik-ve-guvenlik": {
    tr: "vpn-gizlilik-ve-guvenlik",
    en: "vpn-privacy-and-security",
  },
  "seyahatte-vpn-kullanimi": {
    tr: "seyahatte-vpn-kullanimi",
    en: "vpn-for-travel",
  },
  "is-ve-uzaktan-calisma-icin-vpn": {
    tr: "is-ve-uzaktan-calisma-icin-vpn",
    en: "vpn-for-remote-work",
  },
  "vpn-streaming-ve-icerik-erisimi": {
    tr: "vpn-streaming-ve-icerik-erisimi",
    en: "vpn-streaming-and-content-access",
  },
  "vpn-protokolleri-karsilastirmasi": {
    tr: "vpn-protokolleri-karsilastirmasi",
    en: "vpn-protocols-comparison",
  },
  "ucretsiz-vs-ucretli-vpn": {
    tr: "ucretsiz-vs-ucretli-vpn",
    en: "free-vs-paid-vpn",
  },
  "vpn-ve-hiz-performans-optimizasyonu": {
    tr: "vpn-ve-hiz-performans-optimizasyonu",
    en: "vpn-speed-optimization",
  },
  "vpn-secerken-dikkat-edilmesi-gerekenler": {
    tr: "vpn-secerken-dikkat-edilmesi-gerekenler",
    en: "how-to-choose-vpn",
  },
  "vpn-yasal-mi-ulkelere-gore-durum": {
    tr: "vpn-yasal-mi-ulkelere-gore-durum",
    en: "is-vpn-legal",
  },
  "kill-switch-nedir-vpn": {
    tr: "kill-switch-nedir-vpn",
    en: "vpn-kill-switch-explained",
  },
  "dns-leak-test-vpn": {
    tr: "dns-leak-test-vpn",
    en: "dns-leak-test-vpn",
  },
  "split-tunneling-vpn": {
    tr: "split-tunneling-vpn",
    en: "split-tunneling-vpn-explained",
  },
  "double-vpn-multihop": {
    tr: "double-vpn-multihop",
    en: "double-vpn-multihop-explained",
  },
  "ram-only-sunucu-vpn": {
    tr: "ram-only-sunucu-vpn",
    en: "ram-only-servers-vpn",
  },
  "disney-bbc-iplayer-vpn": {
    tr: "disney-bbc-iplayer-vpn",
    en: "disney-bbc-iplayer-vpn",
  },
  "canli-spor-yayinlari-vpn": {
    tr: "canli-spor-yayinlari-vpn",
    en: "live-sports-streaming-vpn",
  },
  "anime-crunchyroll-vpn": {
    tr: "anime-crunchyroll-vpn",
    en: "anime-crunchyroll-vpn",
  },
  "ucak-bileti-fiyat-vpn": {
    tr: "ucak-bileti-fiyat-vpn",
    en: "flight-tickets-vpn-savings",
  },
  "otel-rezervasyon-vpn": {
    tr: "otel-rezervasyon-vpn",
    en: "hotel-booking-vpn-savings",
  },
  "router-uzerinde-vpn-kurulum": {
    tr: "router-uzerinde-vpn-kurulum",
    en: "router-vpn-setup-guide",
  },
  "apple-tv-vpn-kurulum": {
    tr: "apple-tv-vpn-kurulum",
    en: "apple-tv-vpn-setup",
  },
  "xbox-playstation-vpn": {
    tr: "xbox-playstation-vpn",
    en: "xbox-playstation-vpn-setup",
  },
  "linux-vpn-kurulum-rehberi": {
    tr: "linux-vpn-kurulum-rehberi",
    en: "linux-vpn-setup-guide",
  },
  "macos-vpn-kurulum": {
    tr: "macos-vpn-kurulum",
    en: "macos-vpn-setup",
  },
  "ios-vpn-shortcuts-otomasyon": {
    tr: "ios-vpn-shortcuts-otomasyon",
    en: "ios-vpn-shortcuts-automation",
  },
  "cin-rusya-ai-erisim-vpn": {
    tr: "cin-rusya-ai-erisim-vpn",
    en: "china-russia-ai-access-vpn",
  },
  "online-kurs-udemy-vpn": {
    tr: "online-kurs-udemy-vpn",
    en: "online-courses-udemy-vpn",
  },
  "yazilim-abonelik-vpn-tasarruf": {
    tr: "yazilim-abonelik-vpn-tasarruf",
    en: "software-subscription-vpn-savings",
  },
  "youtube-premium-ucuz-vpn": {
    tr: "youtube-premium-ucuz-vpn",
    en: "youtube-premium-cheap-vpn",
  },
  "spotify-bolgesel-fiyat-vpn": {
    tr: "spotify-bolgesel-fiyat-vpn",
    en: "spotify-regional-pricing-vpn",
  },
  "playstation-xbox-store-vpn": {
    tr: "playstation-xbox-store-vpn",
    en: "playstation-xbox-store-vpn",
  },
  "claude-gemini-erisim-vpn": {
    tr: "claude-gemini-erisim-vpn",
    en: "claude-gemini-access-vpn",
  },
  "midjourney-stable-diffusion-vpn": {
    tr: "midjourney-stable-diffusion-vpn",
    en: "midjourney-stable-diffusion-vpn",
  },
  "ai-araclari-gizlilik-vpn": {
    tr: "ai-araclari-gizlilik-vpn",
    en: "ai-tools-privacy-vpn",
  },
  "chatgpt-plus-fiyat-vpn-tasarruf": {
    tr: "chatgpt-plus-fiyat-vpn-tasarruf",
    en: "chatgpt-plus-pricing-vpn-savings",
  },
  "ai-icerik-uretimi-vpn": {
    tr: "ai-icerik-uretimi-vpn",
    en: "ai-content-creation-vpn",
  },
  "ai-phishing-deepfake-vpn-koruma": {
    tr: "ai-phishing-deepfake-vpn-koruma",
    en: "ai-phishing-deepfake-vpn-protection",
  },
  "chatgpt-turkiye-erisim-vpn": {
    tr: "chatgpt-turkiye-erisim-vpn",
    en: "chatgpt-access-turkey-vpn",
  },
  "steam-bolgesel-fiyat-vpn": {
    tr: "steam-bolgesel-fiyat-vpn",
    en: "steam-regional-pricing-vpn",
  },
  "netflix-bolgesel-kutuphane-vpn": {
    tr: "netflix-bolgesel-kutuphane-vpn",
    en: "netflix-regional-libraries-vpn",
  },
  "wireguard-vs-openvpn-karsilastirma": {
    tr: "wireguard-vs-openvpn-karsilastirma",
    en: "wireguard-vs-openvpn-comparison",
  },
  "freelancer-icin-vpn": {
    tr: "freelancer-icin-vpn",
    en: "vpn-for-freelancers",
  },
  "yatirimci-trader-vpn": {
    tr: "yatirimci-trader-vpn",
    en: "vpn-for-investors-traders",
  },
  "gazeteci-aktivist-vpn": {
    tr: "gazeteci-aktivist-vpn",
    en: "vpn-for-journalists-activists",
  },
  "egitimci-ogretmen-vpn": {
    tr: "egitimci-ogretmen-vpn",
    en: "vpn-for-educators-teachers",
  },
  "nordvpn-vs-surfshark-karsilastirma": {
    tr: "nordvpn-vs-surfshark-karsilastirma",
    en: "nordvpn-vs-surfshark-comparison",
  },
  "expressvpn-vs-protonvpn-karsilastirma": {
    tr: "expressvpn-vs-protonvpn-karsilastirma",
    en: "expressvpn-vs-protonvpn-comparison",
  },
  "turkiye-icin-en-hizli-vpn-2026": {
    tr: "turkiye-icin-en-hizli-vpn-2026",
    en: "fastest-vpn-turkey-2026",
  },
  "vpn-abonelik-donemi-aylik-vs-yillik": {
    tr: "vpn-abonelik-donemi-aylik-vs-yillik",
    en: "vpn-subscription-monthly-vs-yearly",
  },
};

export function getCounterpartSlug(slug: string, fromLocale: "tr" | "en"): string | null {
  const toLocale = fromLocale === "tr" ? "en" : "tr";
  for (const entry of Object.values(BLOG_SLUG_MAP)) {
    if (entry[fromLocale] === slug) return entry[toLocale];
  }
  return null;
}

export async function getBlogPosts(locale: "tr" | "en"): Promise<BlogPost[]> {
  const dir = path.join(process.cwd(), "src/content/blog", locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const filePath = path.join(dir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);

    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      readingTime: data.readingTime,
      coverImage: data.coverImage,
      unsplashKeyword: data.unsplashKeyword,
      content,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function splitMarkdownContent(content: string): { first: string; second: string } {
  const lines = content.split("\n");
  const headingIndices: number[] = [];
  lines.forEach((line, idx) => {
    if (/^##\s/.test(line)) {
      headingIndices.push(idx);
    }
  });

  if (headingIndices.length < 2) {
    const mid = Math.floor(lines.length / 2);
    return {
      first: lines.slice(0, mid).join("\n"),
      second: lines.slice(mid).join("\n"),
    };
  }

  const targetMid = Math.floor(lines.length / 2);
  const splitIndex = headingIndices.reduce((closest, idx) =>
    Math.abs(idx - targetMid) < Math.abs(closest - targetMid) ? idx : closest
  );

  return {
    first: lines.slice(0, splitIndex).join("\n"),
    second: lines.slice(splitIndex).join("\n"),
  };
}

export async function getBlogPost(
  slug: string,
  locale: "tr" | "en"
): Promise<{
  frontmatter: BlogPostFrontmatter;
  contentParts: { first: React.ReactElement; second: React.ReactElement };
} | null> {
  const filePath = path.join(
    process.cwd(),
    "src/content/blog",
    locale,
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(source);

  const { first, second } = splitMarkdownContent(rawContent);

  const [firstResult, secondResult] = await Promise.all([
    compileMDX({
      source: first,
      options: {
        parseFrontmatter: false,
        mdxOptions: { remarkPlugins: [remarkGfm] },
      },
    }),
    compileMDX({
      source: second,
      options: {
        parseFrontmatter: false,
        mdxOptions: { remarkPlugins: [remarkGfm] },
      },
    }),
  ]);

  return {
    frontmatter: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      readingTime: data.readingTime,
      coverImage: data.coverImage,
      unsplashKeyword: data.unsplashKeyword,
    },
    contentParts: {
      first: firstResult.content,
      second: secondResult.content,
    },
  };
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  locale: "tr" | "en",
  limit = 3
): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts(locale);

  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
