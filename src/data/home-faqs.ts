import type { Locale, Localized } from "@/i18n/pick";

export type FAQ = { q: string; a: string };
type RawFAQ = { q: Localized<string>; a: Localized<string> };

const rawHomeFaqs: RawFAQ[] = [
  {
    q: { tr: "Türkiye'de VPN kullanmak yasal mı?", en: "Is using a VPN legal in Türkiye?", de: "Ist die Nutzung eines VPN in der Türkei legal?" },
    a: {
      tr: "VPN teknolojisinin kendisini kullanmak ile VPN üzerinden gerçekleştirilen eylemler aynı hukuki konu değildir. Kurallar ve erişim uygulamaları zamanla değişebileceği için güncel mevzuat ve resmi kaynaklar kontrol edilmelidir; VPN kullanmak kullanıcıyı yürürlükteki yasalardan muaf tutmaz.",
      en: "Using VPN technology and the legality of actions performed through a VPN are separate questions. Rules and access practices can change, so current law and official sources should be checked; a VPN does not exempt a user from applicable law.",
      de: "Die Nutzung der VPN-Technologie und die Rechtmäßigkeit von Handlungen über ein VPN sind getrennte Fragen. Regeln können sich ändern; aktuelle Rechts- und Behördenquellen sollten geprüft werden. Ein VPN befreit nicht von geltendem Recht.",
    },
  },
  {
    q: { tr: "VPN internet hızını etkiler mi?", en: "Does a VPN affect internet speed?", de: "Beeinflusst ein VPN die Internetgeschwindigkeit?" },
    a: {
      tr: "Evet. Şifreleme ve trafiğin ek bir sunucu üzerinden yönlendirilmesi gecikme ve aktarım hızını etkileyebilir. Gerçek etki; ISP, cihaz, protokol, VPN sunucusunun uzaklığı ve yükü ile ağ yönlendirmesine göre değişir. Bu nedenle tek bir yüzde tüm kullanıcılar için doğru değildir.",
      en: "Yes. Encryption and routing traffic through an additional server can affect latency and throughput. The real impact varies with ISP, device, protocol, server distance and load, and network routing, so a single percentage is not valid for every user.",
      de: "Ja. Verschlüsselung und die zusätzliche Weiterleitung über einen VPN-Server können Latenz und Durchsatz beeinflussen. Der tatsächliche Effekt hängt von ISP, Gerät, Protokoll, Serverentfernung, Auslastung und Routing ab; ein einheitlicher Prozentwert gilt daher nicht für alle.",
    },
  },
  {
    q: { tr: "Ücretsiz VPN seçerken nelere bakılmalı?", en: "What should I check when choosing a free VPN?", de: "Worauf sollte ich bei einem kostenlosen VPN achten?" },
    a: {
      tr: "Ücretsiz veya ücretli olması tek başına güvenilirlik ölçütü değildir. Gizlilik politikası, gelir modeli, veri toplama kapsamı, bağımsız denetimler, uygulama izinleri, protokol desteği ve şirket bilgileri birlikte incelenmelidir.",
      en: "Free or paid status alone does not establish trustworthiness. Review the privacy policy, business model, data collection, independent audits, app permissions, protocol support and company information together.",
      de: "Ob kostenlos oder bezahlt, sagt allein nichts über Vertrauenswürdigkeit aus. Datenschutzrichtlinie, Geschäftsmodell, Datenerhebung, unabhängige Audits, App-Berechtigungen, Protokolle und Unternehmensangaben sollten gemeinsam geprüft werden.",
    },
  },
  {
    q: { tr: "Streaming için VPN seçerken hangi özellikler önemli?", en: "Which VPN features matter for streaming?", de: "Welche VPN-Merkmale sind für Streaming wichtig?" },
    a: {
      tr: "Sunucu konumları, uygulama desteği, bağlantı kararlılığı ve hizmetin kullanım koşulları önemlidir. Streaming servislerinin VPN ve proxy politikaları değişebilir; hiçbir sağlayıcı için sürekli erişim garanti edilmemelidir.",
      en: "Server locations, app support, connection stability and the streaming service's own terms matter. VPN and proxy policies can change, so continuous access should not be guaranteed for any provider.",
      de: "Serverstandorte, App-Unterstützung, Verbindungsstabilität und die Nutzungsbedingungen des Streaming-Dienstes sind relevant. VPN-/Proxy-Regeln können sich ändern; dauerhafter Zugriff sollte für keinen Anbieter garantiert werden.",
    },
  },
  {
    q: { tr: "VPN sağlayıcılarını nasıl karşılaştırmalıyım?", en: "How should I compare VPN providers?", de: "Wie sollte ich VPN-Anbieter vergleichen?" },
    a: {
      tr: "İhtiyacınızı belirleyin ve aynı kriterleri tüm sağlayıcılara uygulayın: gizlilik politikası, bağımsız denetim, protokoller, kill switch ve diğer güvenlik özellikleri, cihaz desteği, yargı yetkisi, fiyat ve yenileme koşulları. Pazarlama iddiası ile bağımsız doğrulamayı birbirinden ayırın.",
      en: "Define your needs and apply the same criteria to every provider: privacy policy, independent audits, protocols, kill switch and other security features, device support, jurisdiction, pricing and renewal terms. Keep provider marketing claims separate from independent verification.",
      de: "Definieren Sie Ihren Bedarf und wenden Sie dieselben Kriterien auf alle Anbieter an: Datenschutzrichtlinie, unabhängige Audits, Protokolle, Kill Switch und weitere Sicherheitsfunktionen, Geräteunterstützung, Rechtsraum sowie Preis- und Verlängerungsbedingungen. Anbieterwerbung und unabhängige Verifikation sollten getrennt betrachtet werden.",
    },
  },
];

export function homeFaqs(locale: Locale = "tr"): FAQ[] {
  return rawHomeFaqs.map((f) => ({ q: f.q[locale] ?? f.q.en ?? f.q.tr, a: f.a[locale] ?? f.a.en ?? f.a.tr }));
}
