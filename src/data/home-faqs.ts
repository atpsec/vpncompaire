export type FAQ = { q: string; a: string };

export const homeFaqs: FAQ[] = [
  {
    q: "Türkiye'de VPN kullanmak yasal mı?",
    a: "VPN kullanmak Türkiye'de yasaktır demek doğru değil — VPN'in kendisi yasal bir teknolojidir ve gizlilik, kurumsal güvenlik, uzaktan çalışma gibi meşru amaçlarla yaygın olarak kullanılır. Yasal sorumluluk, VPN üzerinden yapılan eylemin niteliğine bağlıdır.",
  },
  {
    q: "VPN internet hızımı ne kadar düşürür?",
    a: "Modern VPN'ler genellikle %5-15 arasında hız kaybına neden olur. Sunucu mesafesi, protokol (WireGuard genelde daha hızlıdır) ve mevcut bağlantı kalitesi en büyük etkenlerdir.",
  },
  {
    q: "Ücretsiz VPN'ler güvenli mi?",
    a: "Çoğu ücretsiz VPN, gelir modeli olarak veri satışı, reklam enjeksiyonu veya sunucu kapasitesi sınırlaması kullanır. Proton VPN gibi denetlenmiş sınırlı ücretsiz seçenekler dışında, ücretli alternatifleri tercih etmek daha güvenlidir.",
  },
  {
    q: "Hangi VPN streaming için en iyisi?",
    a: "Netflix, Disney+, BluTV gibi platformlarda istikrar açısından NordVPN ve ExpressVPN öne çıkar. Surfshark da iyi sonuç verir; bütçe önceliği varsa öncelikli seçimdir. Sunucu rotasyonu hızlı olan sağlayıcılar genelde daha iyi performans verir.",
  },
  {
    q: "VPN'i nasıl kurarım?",
    a: "1) İhtiyacına uygun bir VPN seç. 2) Resmi sitesinden veya cihazının uygulama mağazasından uygulamayı indir. 3) Hesap oluştur ve giriş yap. 4) Bir sunucuya bağlan. Genelde tüm süreç 5 dakikadan kısa sürer.",
  },
];
