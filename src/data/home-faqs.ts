import type { Locale, Localized } from "@/i18n/pick";

export type FAQ = { q: string; a: string };

type RawFAQ = { q: Localized<string>; a: Localized<string> };

const rawHomeFaqs: RawFAQ[] = [
  {
    q: {
      tr: "Türkiye'de VPN kullanmak yasal mı?",
      en: "Is using a VPN legal in Türkiye?",
    },
    a: {
      tr: "VPN kullanmak Türkiye'de yasaktır demek doğru değil — VPN'in kendisi yasal bir teknolojidir ve gizlilik, kurumsal güvenlik, uzaktan çalışma gibi meşru amaçlarla yaygın olarak kullanılır. Yasal sorumluluk, VPN üzerinden yapılan eylemin niteliğine bağlıdır.",
      en: "Saying \"VPNs are banned in Türkiye\" is not accurate — the technology itself is legal and is widely used for legitimate purposes such as privacy, corporate security and remote work. Legal responsibility depends on what you do over the VPN, not on the VPN itself.",
    },
  },
  {
    q: {
      tr: "VPN internet hızımı ne kadar düşürür?",
      en: "How much does a VPN slow down my connection?",
    },
    a: {
      tr: "Modern VPN'ler genellikle %5-15 arasında hız kaybına neden olur. Sunucu mesafesi, protokol (WireGuard genelde daha hızlıdır) ve mevcut bağlantı kalitesi en büyük etkenlerdir.",
      en: "Modern VPNs typically cost you 5-15% of your connection speed. Server distance, protocol (WireGuard is usually faster) and the quality of your underlying connection are the biggest factors.",
    },
  },
  {
    q: {
      tr: "Ücretsiz VPN'ler güvenli mi?",
      en: "Are free VPNs safe?",
    },
    a: {
      tr: "Çoğu ücretsiz VPN, gelir modeli olarak veri satışı, reklam enjeksiyonu veya sunucu kapasitesi sınırlaması kullanır. Proton VPN gibi denetlenmiş sınırlı ücretsiz seçenekler dışında, ücretli alternatifleri tercih etmek daha güvenlidir.",
      en: "Most free VPNs monetise through data sales, ad injection or aggressive server-capacity throttling. Outside of audited, limited free tiers such as Proton VPN, a paid alternative is the safer pick.",
    },
  },
  {
    q: {
      tr: "Hangi VPN streaming için en iyisi?",
      en: "Which VPN is best for streaming?",
    },
    a: {
      tr: "Netflix, Disney+, BluTV gibi platformlarda istikrar açısından NordVPN ve ExpressVPN öne çıkar. Surfshark da iyi sonuç verir; bütçe önceliği varsa öncelikli seçimdir. Sunucu rotasyonu hızlı olan sağlayıcılar genelde daha iyi performans verir.",
      en: "For consistency on platforms like Netflix, Disney+ and BluTV, NordVPN and ExpressVPN are the strongest. Surfshark also performs well and is the budget-first pick. Providers that rotate servers quickly tend to do better overall.",
    },
  },
  {
    q: {
      tr: "VPN'i nasıl kurarım?",
      en: "How do I set up a VPN?",
    },
    a: {
      tr: "1) İhtiyacına uygun bir VPN seç. 2) Resmi sitesinden veya cihazının uygulama mağazasından uygulamayı indir. 3) Hesap oluştur ve giriş yap. 4) Bir sunucuya bağlan. Genelde tüm süreç 5 dakikadan kısa sürer.",
      en: "1) Pick a VPN that matches your needs. 2) Install the app from the official site or your device's app store. 3) Create an account and sign in. 4) Connect to a server. The whole process usually takes under 5 minutes.",
    },
  },
];

export function homeFaqs(locale: Locale = "tr"): FAQ[] {
  return rawHomeFaqs.map((f) => ({
    q: f.q[locale] ?? f.q.tr,
    a: f.a[locale] ?? f.a.tr,
  }));
}
