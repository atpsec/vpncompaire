import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Lock } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle: "Gizlilik İçin En İyi VPN'ler (2026)",
    metaDescription:
      "Bağımsız denetim, açık kaynak istemciler ve gizlilik dostu yargı yetkisi ile gizlilik öncelikli kullanıcılar için en iyi VPN seçimleri.",
    title: "Gizlilik İçin En İyi VPN'ler",
    tagline:
      "Açık kaynak, bağımsız denetim ve gizlilik dostu yargı yetkisi — gerçek gizlilik için aranan üç temel.",
    summary:
      "Gizlilik öncelikli olduğunda VPN seçimi yalnızca pazarlama vaatlerine bakmaktan ibaret değil. Üç kritik faktör: jurisdiction (yargı yetkisi), tekrarlanan bağımsız denetim ve açık kaynak istemciler. Bu üçünü en sağlam birleştiren seçimleri sıraladık.",
    badgeLabel: "Gizlilik",
    picks: [
      {
        slug: "proton-vpn",
        bestFor: "Açık kaynak ve İsviçre yargı yetkisi",
        why: "Tüm istemciler açık kaynak ve denetlenebilir; yıllık no-logs denetimi Securitum tarafından yapılır; İsviçre yasaları AB ve ABD istihbarat ittifaklarının dışında. Sınırsız ücretsiz plan da var — \"dener misin?\" testi için ideal.",
      },
      {
        slug: "mullvad",
        bestFor: "Anonim hesap, sabit fiyat, affiliate yok",
        why: "Hesap açarken e-posta bile gerekmiyor — sadece rastgele bir numara. Nakit ödeme kabul ediyor. Bu sitede affiliate olmayan tek seçim — tarafsızlık göstergesi.",
      },
      {
        slug: "nordvpn",
        bestFor: "Denetim sürekliliği (6x Deloitte)",
        why: "2018'den bu yana altı kez Deloitte tarafından no-logs denetiminden geçti. Tekrarlanan bağımsız denetim, sektörün ulaşabildiği en güçlü kanıt seviyesi.",
      },
    ],
    considerations: [
      {
        title: "Yargı yetkisi (jurisdiction)",
        body: "VPN sağlayıcı hangi ülkenin yasalarına tabi? Beş/Dokuz/On Dört Göz ittifakları dışındaki yargı yetkileri (İsviçre, Panama, İsveç) genelde daha güçlü gizlilik koruması sağlar.",
      },
      {
        title: "Bağımsız denetim kanıtı",
        body: "No-logs iddiası tek başına bir pazarlama ifadesidir. Üçüncü taraf denetim (Deloitte, KPMG, Cure53, Securitum) veya mahkeme kanıtı (PIA 2016/2018), bu iddiayı objektif olarak doğrular.",
      },
      {
        title: "Açık kaynak istemciler",
        body: "Sağlayıcının uygulamasının kodu kamuya açık ise, bağımsız güvenlik araştırmacıları kodu inceleyebilir ve zafiyetleri raporlayabilir. Bu, \"arka kapı yok\" iddiasının teknik garantisi.",
      },
    ],
    faqs: [
      {
        q: "Hangi VPN en gizliliği koruyor?",
        a: "Proton VPN, açık kaynak istemciler + İsviçre yargı yetkisi + yıllık denetim kombinasyonuyla en güçlü gizlilik altyapısına sahip. Mullvad, anonim hesap modeli ile farklı bir gizlilik boyutu sunar.",
      },
      {
        q: "Bağımsız denetim ile mahkeme kararı arasında ne fark var?",
        a: "Denetim, sağlayıcının iddialarını üçüncü bir taraf bağımsız olarak inceler. Mahkeme kararı, no-logs iddiasının gerçek bir hukuki talep karşısında nasıl çalıştığını test eder. PIA'nın 2016 ve 2018 davalarında doğrulandığı gibi.",
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
      { label: "Streaming için", href: "/en-iyi/streaming" },
      { label: "Türkiye için", href: "/en-iyi/turkiye" },
      { label: "Mullvad incelemesi", href: "/inceleme/mullvad" },
    ],
  },
  en: {
    metaTitle: "The Best VPNs for Privacy (2026)",
    metaDescription:
      "The best VPN picks for privacy-first users — independent audits, open-source clients and privacy-friendly jurisdictions.",
    title: "The Best VPNs for Privacy",
    tagline:
      "Open source, independent audits and a privacy-friendly jurisdiction — the three pillars of real privacy.",
    summary:
      "When privacy comes first, picking a VPN is not just about marketing copy. Three critical factors: jurisdiction, repeated independent audits and open-source clients. We've ranked the picks that combine those three most convincingly.",
    badgeLabel: "Privacy",
    picks: [
      {
        slug: "proton-vpn",
        bestFor: "Open source and Swiss jurisdiction",
        why: "All clients are open source and auditable; the annual no-logs audit is performed by Securitum; Swiss law sits outside both the EU and US intelligence alliances. There's an unlimited free plan too — ideal for a \"try first\" test.",
      },
      {
        slug: "mullvad",
        bestFor: "Anonymous account, flat pricing, no affiliate",
        why: "No email required to sign up — only a random account number. Accepts cash payments. The only non-affiliate pick on this site — a signal of impartiality.",
      },
      {
        slug: "nordvpn",
        bestFor: "Audit continuity (6× Deloitte)",
        why: "Audited for no-logs by Deloitte six times since 2018. Repeated independent auditing is the strongest evidence level the industry offers.",
      },
    ],
    considerations: [
      {
        title: "Jurisdiction",
        body: "Which country's laws does the VPN provider operate under? Jurisdictions outside the 5/9/14 Eyes alliances (Switzerland, Panama, Sweden) generally offer stronger privacy protection.",
      },
      {
        title: "Independent audit evidence",
        body: "A no-logs claim on its own is marketing copy. A third-party audit (Deloitte, KPMG, Cure53, Securitum) or court evidence (PIA 2016/2018) objectively verifies the claim.",
      },
      {
        title: "Open-source clients",
        body: "If the provider's app code is public, independent security researchers can inspect it and report vulnerabilities. That's the technical guarantee behind the \"no backdoors\" claim.",
      },
    ],
    faqs: [
      {
        q: "Which VPN preserves privacy the best?",
        a: "Proton VPN has the strongest privacy stack: open-source clients + Swiss jurisdiction + annual audits. Mullvad offers a different dimension of privacy with its anonymous-account model.",
      },
      {
        q: "What's the difference between an independent audit and a court ruling?",
        a: "An audit is a third party independently inspecting the provider's claims. A court ruling tests how a no-logs claim holds up against a real legal request — as PIA's 2016 and 2018 cases demonstrated.",
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
      { label: "Best for streaming", href: "/en-iyi/streaming" },
      { label: "Best in Turkey", href: "/en-iyi/turkiye" },
      { label: "Mullvad review", href: "/inceleme/mullvad" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "en" ? "en" : "tr"];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale === "en" ? "en" : "tr"];

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
