import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Lock } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle: "Gizlilik İçin VPN Bilgi Rehberi (2026)",
    metaDescription:
      "Bağımsız denetim, açık kaynak istemciler ve gizlilik dostu yargı yetkisi ile gizlilik öncelikli kullanıcılar için en iyi VPN seçimleri.",
    title: "Gizlilik için VPN bilgi rehberi",
    tagline:
      "Açık kaynak, bağımsız denetim ve yargı yetkisi bağlamı — gizlilik önceliğinde incelenebilecek üç kanıt alanı.",
    summary:
      "Gizlilik öncelikli olduğunda pazarlama vaatlerinin ötesine bakmak gerekir. Bu rehber yargı yetkisi, tekrarlanan bağımsız denetim ve açık kaynak istemciler etrafında bilgi profillerini düzenler; evrensel bir sıralama veya garanti sunmaz.",
    badgeLabel: "Gizlilik",
    picks: [
      {
        slug: "proton-vpn",
        bestFor: "Açık kaynak ve İsviçre yargı yetkisi",
        why: "Sağlayıcı açık kaynak istemcileri ve denetim bilgilerini yayımlar; İsviçre yargı yetkisi ve ücretsiz planı satın almadan önce doğrulanabilecek başlıklardır. Ücretsiz plan kendi kurulumunuzu değerlendirmeye yarar; VPN Advisor testi değildir.",
      },
      {
        slug: "mullvad",
        bestFor: "Anonim hesap, sabit fiyat, pazarlama yok",
        why: "Hesap açarken e-posta bile gerekmiyor — sadece rastgele bir numara. Nakit ödeme kabul ediyor. Affiliate programı bile olmayan, pazarlamadan uzak en sade seçim.",
      },
      {
        slug: "nordvpn",
        bestFor: "Denetim sürekliliği (6x Deloitte)",
        why: "Sağlayıcı 2018'den bu yana altı Deloitte no-logs denetimi bildirmektedir. Tekrarlanan bağımsız denetim, belirtilen kapsam ve tarih için yararlı kanıttır; gelecekteki her uygulama için garanti değildir.",
      },
    ],
    considerations: [
      {
        title: "Yargı yetkisi (jurisdiction)",
        body: "VPN sağlayıcı hangi ülkenin yasalarına tabi? Yargı yetkisi hukuki bağlamı değiştirir, ancak tek başına daha güçlü gizlilik kanıtı değildir; politika, sahiplik ve bağımsız kanıt birlikte okunmalıdır.",
      },
      {
        title: "Bağımsız denetim kanıtı",
        body: "No-logs iddiası tek başına bir pazarlama ifadesidir. Üçüncü taraf denetim (Deloitte, KPMG, Cure53, Securitum) veya geçmiş mahkeme kayıtları (PIA 2016/2018), incelenen dönem ve kapsam için bağımsız kanıt sunar; gelecekteki davranışı garanti etmez.",
      },
      {
        title: "Açık kaynak istemciler",
        body: "Sağlayıcının uygulama kodu kamuya açıksa, bağımsız güvenlik araştırmacıları kodu inceleyebilir ve zafiyetleri raporlayabilir. Bu şeffaflık arka kapı riskini değerlendirmeyi kolaylaştırır; tek başına arka kapı olmadığını veya dağıtılan uygulamanın yayımlanan kaynakla aynı olduğunu garanti etmez. Denetimler ve yeniden üretilebilir derlemeler ek kanıt sağlar.",
      },
    ],
    faqs: [
      {
        q: "Hangi VPN en gizliliği koruyor?",
        a: "Tanımlı bir tehdit modeli olmadan evrensel kazanan yoktur. Proton VPN ve Mullvad; açık kaynak, yargı yetkisi ve hesap tasarımı gibi farklı kanıt alanlarını gösterir. Güncel kaynakları kendi önceliklerinize göre karşılaştırın.",
      },
      {
        q: "Bağımsız denetim ile mahkeme kararı arasında ne fark var?",
        a: "Denetim, sağlayıcının iddialarını belirli bir kapsam ve tarihte üçüncü tarafın incelemesidir. Geçmiş bir mahkeme kaydı ise sağlayıcının belirli bir hukuki talebe nasıl yanıt verdiğine dair olay-temelli kanıt sunar; ikisi de gelecekteki tüm uygulamalar için garanti değildir.",
      },
      {
        q: "Açık kaynak VPN'ler diğerlerinden daha güvenli mi?",
        a: "Açık kaynak, kodun bağımsız olarak denetlenebilir olması anlamına gelir — bu şeffaflık avantajıdır. Ancak kapalı kaynak bir VPN'in mutlaka güvensiz olduğu anlamına gelmez; o noktada denetim raporları kritik olur.",
      },
      {
        q: "Gizlilik için ücretsiz VPN kullanabilir miyim?",
        a: "Çoğu ücretsiz VPN, gelir modeli olarak veri satışı veya reklam enjeksiyonu kullanır — yani gizliliğe karşı. Proton VPN'in ücretsiz planı istisnadır: ücretli ile aynı no-logs politikası ve denetim çerçevesi altında çalışır.",
      },
    ],
    relatedLinks: [
      { label: "Streaming için", href: "/best-vpn/streaming" },
      { label: "Türkiye için", href: "/best-vpn/turkey" },
      { label: "Mullvad incelemesi", href: "/reviews/mullvad" },
    ],
  },
  en: {
    metaTitle: "VPN Information Guide for Privacy (2026)",
    metaDescription:
      "The best VPN picks for privacy-first users — independent audits, open-source clients and privacy-friendly jurisdictions.",
    title: "VPN information guide for privacy",
    tagline:
      "Open-source code, independent audits and jurisdictional context — three evidence areas to study when privacy matters.",
    summary:
      "When privacy comes first, look beyond marketing copy. This guide organizes provider profiles around jurisdiction, repeated independent audits and open-source clients; it does not rank or guarantee a universally best option.",
    badgeLabel: "Privacy",
    picks: [
      {
        slug: "proton-vpn",
        bestFor: "Open source and Swiss jurisdiction",
        why: "The provider publishes open-source clients and audit information; its Swiss jurisdiction and free plan are useful topics to verify before choosing. A free plan lets you evaluate your own setup, not a VPN Advisor performance test.",
      },
      {
        slug: "mullvad",
        bestFor: "Anonymous account, flat pricing, no marketing",
        why: "No email required to sign up — only a random account number. Accepts cash payments. The most minimal pick — it doesn't even run an affiliate programme and stays away from marketing.",
      },
      {
        slug: "nordvpn",
        bestFor: "Audit continuity (6× Deloitte)",
        why: "The provider reports six Deloitte no-logs audits since 2018. Repeated independent auditing is useful evidence for the stated scope and date, but it is not a guarantee of every future implementation.",
      },
    ],
    considerations: [
      {
        title: "Jurisdiction",
        body: "Which country's laws does the VPN provider operate under? Jurisdiction changes the legal context, but it does not by itself prove stronger privacy protection; read the policy, ownership and independent evidence together.",
      },
      {
        title: "Independent audit evidence",
        body: "A no-logs claim on its own is marketing copy. A third-party audit (Deloitte, KPMG, Cure53, Securitum) or historical court record (PIA 2016/2018) provides independent evidence for the period and scope examined; it does not guarantee future behavior.",
      },
      {
        title: "Open-source clients",
        body: "If the provider's app code is public, independent security researchers can inspect it and report vulnerabilities. That transparency makes backdoor risk easier to assess, but does not by itself prove that no backdoor exists or that the distributed app matches the published source. Audits and reproducible builds provide additional evidence.",
      },
    ],
    faqs: [
      {
        q: "Which VPN preserves privacy the best?",
        a: "There is no universal winner without a defined threat model. Proton VPN and Mullvad illustrate different evidence areas, such as open-source clients, jurisdiction and account design; compare the current sources for your own priorities.",
      },
      {
        q: "What's the difference between an independent audit and a court ruling?",
        a: "An audit is a third party examining a provider's claims at a defined time and scope. A historical court record provides event-specific evidence about how the provider responded to one legal request; neither guarantees every future implementation.",
      },
      {
        q: "Are open-source VPNs more secure than the others?",
        a: "Open source means the code can be independently audited — a transparency advantage. It doesn't automatically mean a closed-source VPN is insecure; for those, audit reports become critical.",
      },
      {
        q: "Can I use a free VPN for privacy?",
        a: "Most free VPNs monetise through data sales or ad injection — i.e. they work against privacy. Proton VPN's free plan is the exception: it runs under the same no-logs policy and audit framework as the paid plan.",
      },
    ],
    relatedLinks: [
      { label: "Best for streaming", href: "/best-vpn/streaming" },
      { label: "Best in Turkey", href: "/best-vpn/turkey" },
      { label: "Mullvad review", href: "/reviews/mullvad" },
    ],
  },
  de: {
    metaTitle: "VPN-Informationsratgeber für Datenschutz (2026)",
    metaDescription:
      "VPN-Auswahl für datenschutzorientierte Nutzer — mit unabhängigen Audits, Open-Source-Clients und datenschutzfreundlichen Rechtsräumen.",
    title: "VPN-Informationsratgeber für Datenschutz",
    tagline:
      "Open-Source-Code, unabhängige Audits und der Rechtsraum — drei Belegbereiche, wenn Datenschutz zählt.",
    summary:
      "Wenn Datenschutz Priorität hat, sollten Sie über Marketingversprechen hinausblicken. Dieser Ratgeber ordnet Anbieter nach Rechtsraum, wiederholten unabhängigen Audits und Open-Source-Clients ein; er kürt keinen universell besten Anbieter und gibt keine Garantie.",
    badgeLabel: "Datenschutz",
    picks: [
      {
        slug: "proton-vpn",
        bestFor: "Open Source und Schweizer Rechtsraum",
        why: "Proton veröffentlicht Open-Source-Clients und Audit-Informationen. Der Schweizer Rechtsraum und der kostenlose Tarif sind konkrete Punkte, die Sie vor einer Entscheidung anhand der aktuellen Primärquellen prüfen können. Der kostenlose Tarif ist kein VPN-Advisor-Leistungstest.",
      },
      {
        slug: "mullvad",
        bestFor: "Anonymes Konto und keine Affiliate-Beziehung",
        why: "Für die Kontoerstellung ist keine E-Mail-Adresse nötig, sondern nur eine zufällige Kontonummer. Mullvad akzeptiert außerdem Barzahlungen und betreibt kein Affiliate-Programm — ein schlichtes, datenschutzorientiertes Modell.",
      },
      {
        slug: "nordvpn",
        bestFor: "Wiederholte Audits",
        why: "Der Anbieter berichtet seit 2018 über sechs Deloitte-Audits zur No-Logs-Politik. Wiederholte unabhängige Prüfungen sind für den jeweils genannten Umfang und Zeitpunkt nützliche Belege, aber keine Garantie für jede künftige Umsetzung.",
      },
    ],
    considerations: [
      {
        title: "Rechtsraum",
        body: "Welchen Gesetzen unterliegt der VPN-Anbieter? Der Rechtsraum verändert den rechtlichen Kontext, beweist allein aber keinen stärkeren Datenschutz. Lesen Sie Richtlinie, Eigentumsverhältnisse und unabhängige Belege gemeinsam.",
      },
      {
        title: "Belege durch unabhängige Audits",
        body: "Eine No-Logs-Aussage ist für sich genommen Marketing. Ein Audit durch Deloitte, KPMG, Cure53 oder Securitum sowie historische Gerichtsakten liefern unabhängige Belege für den geprüften Zeitraum und Umfang, garantieren aber kein künftiges Verhalten.",
      },
      {
        title: "Open-Source-Clients",
        body: "Wenn der Anwendungscode öffentlich ist, können unabhängige Sicherheitsforscher ihn prüfen und Schwachstellen melden. Das erleichtert die Bewertung von Risiken, beweist aber weder das Fehlen einer Hintertür noch die Übereinstimmung jeder verteilten App mit dem veröffentlichten Quellcode.",
      },
    ],
    faqs: [
      {
        q: "Welcher VPN schützt die Privatsphäre am besten?",
        a: "Ohne ein definiertes Bedrohungsmodell gibt es keinen universellen Sieger. Proton VPN und Mullvad zeigen unterschiedliche Belegbereiche wie Open-Source-Clients, Rechtsraum und Kontodesign. Vergleichen Sie die aktuellen Quellen nach Ihren eigenen Prioritäten.",
      },
      {
        q: "Was ist der Unterschied zwischen einem Audit und einem Gerichtsurteil?",
        a: "Ein Audit prüft die Aussagen eines Anbieters zu einem definierten Zeitpunkt und Umfang. Eine historische Gerichtsakte zeigt, wie der Anbieter auf eine konkrete rechtliche Anfrage reagiert hat. Beides garantiert nicht jede künftige Umsetzung.",
      },
      {
        q: "Sind Open-Source-VPNs automatisch sicherer?",
        a: "Open Source bedeutet, dass der Code unabhängig geprüft werden kann — ein Transparenzvorteil. Ein geschlossenes VPN ist dadurch nicht automatisch unsicher; dort werden Auditberichte und andere Primärquellen besonders wichtig.",
      },
      {
        q: "Kann ich für Datenschutz einen kostenlosen VPN nutzen?",
        a: "Viele kostenlose VPNs finanzieren sich über Datenverkauf oder Werbeeinblendungen und stehen damit dem Datenschutz entgegen. Proton VPN veröffentlicht Informationen zu einem kostenlosen Tarif mit eigener No-Logs- und Audit-Grundlage; prüfen Sie trotzdem den aktuellen Umfang.",
      },
    ],
    relatedLinks: [
      { label: "VPN für Streaming", href: "/best-vpn/streaming" },
      { label: "VPN für die Türkei", href: "/best-vpn/turkey" },
      { label: "Mullvad-Testbericht", href: "/reviews/mullvad" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "en" ? "en" : locale === "de" ? "de" : "tr"];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates("/best-vpn/privacy", locale),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl("/best-vpn/privacy", locale),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale === "en" ? "en" : locale === "de" ? "de" : "tr"];

  return (
    <UseCasePage
      slug="gizlilik"
      title={c.title}
      tagline={c.tagline}
      summary={c.summary}
      Icon={Lock}
      badgeLabel={c.badgeLabel}
      picks={c.picks}
      faqs={c.faqs}
      considerations={[...c.considerations]}
      relatedLinks={[...c.relatedLinks]}
    />
  );
}
