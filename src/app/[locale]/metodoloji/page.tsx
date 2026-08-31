import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, FileSearch, Scale, RefreshCw, Eye, ListChecks, CalendarDays, ExternalLink, AlertTriangle, BookOpen, Database, Link2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CitationSummary } from "@/components/seo/citation-summary";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: {
    title: "VPN Karşılaştırma Metodolojisi: Kaynak, Kriter ve Şeffaflık",
    description: "VPN Advisor'ın kaynak temelli VPN karşılaştırma metodolojisi: resmi belgeler, bağımsız denetimler, fiyat, protokoller, gizlilik politikaları, güncellik ve sınırlamalar.",
    badge: "Kaynak temelli metodoloji",
    h1: "VPN'leri nasıl karşılaştırıyoruz?",
    intro: "VPN Advisor bir test laboratuvarı değildir ve doğrulanmamış hız, streaming veya kullanıcı puanı yayınlamaz. Amacımız; sağlayıcıların resmi belgelerini, bağımsız denetimleri ve doğrulanabilir üçüncü taraf kaynaklarını aynı çerçevede düzenleyerek karar vermeyi kolaylaştırmaktır.",
    updated: "Son metodoloji güncellemesi",
    toc: "Bu sayfada",
    sections: ["1. Ne yapıyoruz?", "2. Kaynak hiyerarşisi", "3. Karşılaştırma kriterleri", "4. Güncellik politikası", "5. Sınırlamalar ve gelir modeli"],
    whatTitle: "1. Ne yapıyoruz?",
    whatBody: "Sağlayıcı profilleri; kamuya açık ve doğrulanabilir bilgilerin derlenmesiyle oluşturulur. Bir özelliği mümkün olduğunda resmi teknik dokümantasyon, hizmet şartları, gizlilik politikası veya bağımsız denetim raporuyla doğrularız. Kendi laboratuvarımızda ölçüm yaptığımızı veya gerçek kullanıcı deneyimi yaşadığımızı iddia etmeyiz.",
    sourceTitle: "2. Kaynak hiyerarşisi",
    sourceIntro: "Bir iddiayı değerlendirirken kaynağın niteliğini ve güncelliğini birlikte ele alırız.",
    sourceCards: [
      ["Birincil kaynaklar", "Sağlayıcının resmi teknik dokümantasyonu, gizlilik politikası, hizmet şartları, fiyatlandırma ve uygulama mağazası kayıtları."],
      ["Bağımsız doğrulama", "Cure53, Deloitte, PwC, SEC Consult gibi üçüncü taraf denetimleri; mahkeme kayıtları veya güvenilir güvenlik araştırmaları."],
      ["Standart ve platform belgeleri", "NIST, IETF, Apple, Google, Microsoft ve benzeri kurumların protokol, platform ve güvenlik belgeleri."],
      ["İkincil kaynaklar", "Yalnızca bağlam için kullanılır; kritik özellik veya güvenlik iddiası tek başına ikincil kaynağa dayandırılmaz."],
    ],
    criteriaTitle: "3. Karşılaştırma kriterleri",
    criteriaIntro: "Sayısal editör puanı yerine, aynı alanları sağlayıcılar arasında görünür ve karşılaştırılabilir tutuyoruz.",
    headers: ["Kriter", "Neye bakıyoruz?", "Tercih edilen kaynak"],
    criteria: [
      ["Gizlilik", "No-logs ifadesi, veri toplama kapsamı, yargı yetkisi", "Gizlilik politikası + bağımsız denetim"],
      ["Güvenlik", "Protokoller, kill switch, şifreleme, açık kaynak bileşenler", "Teknik dokümantasyon + güvenlik denetimi"],
      ["Platform desteği", "Windows, macOS, Linux, iOS, Android, router ve cihaz sınırları", "Resmi uygulama ve destek sayfaları"],
      ["Fiyat", "İlk dönem, yenileme, para iadesi, vergi/kur notları", "Resmi fiyatlandırma ve hizmet şartları"],
      ["Altyapı", "Sunucu/ülke bilgileri ve özel sunucu seçenekleri", "Resmi ağ/sunucu sayfaları"],
      ["Şeffaflık", "Denetim tarihi, güvenlik olayları, şirket bilgileri", "Denetim raporları + şirket açıklamaları"],
    ],
    freshnessTitle: "4. Güncellik politikası",
    freshness: ["Fiyat ve plan verileri tarih damgasıyla gösterilir.", "Sağlayıcıların denetim, protokol ve politika değişiklikleri periyodik olarak yeniden kontrol edilir.", "Bir bilgi doğrulanamıyorsa kesin gerçek gibi sunulmaz; belirsizlik açıkça belirtilir.", "Eski içerikler yeni kaynaklar çıktığında güncellenir; değişiklik tarihi kullanıcıya gösterilir."],
    limitsTitle: "5. Sınırlamalar ve gelir modeli",
    limits: ["VPN Advisor gerçek zamanlı hız laboratuvarı değildir; ağ performansı konum, ISP, sunucu yükü ve protokole göre değişir.", "Streaming erişimi hızla değişebilir; sağlayıcıların güncel servis uyumluluğu garanti edilmez.", "Sağlayıcıların resmi beyanları tek başına bağımsız kanıt sayılmaz; mümkün olduğunda üçüncü taraf doğrulaması aranır.", "Google AdSense reklamları ve bazı affiliate bağlantıları bulunabilir. Reklam veya komisyon, bir teknik özelliği doğru/yanlış olarak sınıflandırma kriterini değiştirmez.", "Bu site güvenlik, hukuk veya finans danışmanlığı değildir."],
    disclosure: "Reklam ve gelir açıklamasını okuyun",
  },
  en: {
    title: "VPN Comparison Methodology: Sources, Criteria and Transparency",
    description: "VPN Advisor's source-based VPN comparison methodology covering official documentation, independent audits, pricing, protocols, privacy policies, freshness and limitations.",
    badge: "Source-based methodology",
    h1: "How do we compare VPNs?",
    intro: "VPN Advisor is not a testing laboratory and does not publish unverified speed, streaming or user scores. We organize provider documentation, independent audits and verifiable third-party sources into a consistent framework to support informed decisions.",
    updated: "Methodology last updated",
    toc: "On this page",
    sections: ["1. What we do", "2. Source hierarchy", "3. Comparison criteria", "4. Freshness policy", "5. Limitations and revenue"],
    whatTitle: "1. What we do",
    whatBody: "Provider profiles are built from public, verifiable information. Where possible, a feature is checked against official technical documentation, terms, privacy policies or independent audit reports. We do not claim laboratory measurements or first-hand user experience when we do not have them.",
    sourceTitle: "2. Source hierarchy",
    sourceIntro: "We consider both source quality and recency when evaluating a claim.",
    sourceCards: [["Primary sources", "Official technical documentation, privacy policies, terms, pricing and app-store listings."],["Independent verification", "Third-party audits such as Cure53, Deloitte, PwC or SEC Consult, court records and credible security research."],["Standards and platform documentation", "NIST, IETF, Apple, Google, Microsoft and similar protocol, platform and security documentation."],["Secondary sources", "Used for context only; critical security or feature claims are not based solely on secondary sources."]],
    criteriaTitle: "3. Comparison criteria",
    criteriaIntro: "Instead of an editorial score, we keep the same fields visible and comparable across providers.",
    headers: ["Criterion", "What we examine", "Preferred source"],
    criteria: [["Privacy", "No-logs claims, data collection, jurisdiction", "Privacy policy + independent audit"],["Security", "Protocols, kill switch, encryption, open-source components", "Technical docs + security audit"],["Platform support", "Windows, macOS, Linux, iOS, Android, routers and device limits", "Official app/support pages"],["Pricing", "Intro price, renewal, refunds, tax/currency notes", "Official pricing and terms"],["Infrastructure", "Server/country information and specialty servers", "Official network/server pages"],["Transparency", "Audit date, security incidents, company information", "Audit reports + company disclosures"]],
    freshnessTitle: "4. Freshness policy",
    freshness: ["Pricing and plan data is shown with a verification date.", "Audits, protocols and policy changes are periodically rechecked.", "If information cannot be verified, it is not presented as a certain fact; uncertainty is stated.", "Older content is updated when new sources become available, with modification dates shown."],
    limitsTitle: "5. Limitations and revenue model",
    limits: ["VPN Advisor is not a real-time speed laboratory; performance varies by location, ISP, server load and protocol.", "Streaming access changes quickly and service compatibility is not guaranteed.", "Provider claims are not treated as independent proof by themselves; third-party verification is preferred where available.", "Google AdSense ads and some affiliate links may appear. Advertising or commission does not change whether a technical claim is classified as verified or unverified.", "This site is not security, legal or financial advice."],
    disclosure: "Read our advertising and revenue disclosure",
  },
  de: {
    title: "VPN-Vergleichsmethodik: Quellen, Kriterien und Transparenz",
    description: "Quellenbasierte VPN-Vergleichsmethodik von VPN Advisor: offizielle Dokumentation, unabhängige Audits, Preise, Protokolle, Datenschutz, Aktualität und Grenzen.",
    badge: "Quellenbasierte Methodik",
    h1: "Wie vergleichen wir VPNs?",
    intro: "VPN Advisor ist kein Testlabor und veröffentlicht keine unbelegten Geschwindigkeits-, Streaming- oder Nutzerbewertungen. Wir ordnen Anbieterunterlagen, unabhängige Audits und überprüfbare Drittquellen in einem einheitlichen Rahmen.",
    updated: "Methodik zuletzt aktualisiert",
    toc: "Auf dieser Seite",
    sections: ["1. Was wir tun", "2. Quellenhierarchie", "3. Vergleichskriterien", "4. Aktualität", "5. Grenzen und Einnahmen"],
    whatTitle: "1. Was wir tun",
    whatBody: "Anbieterprofile basieren auf öffentlichen, überprüfbaren Informationen. Merkmale werden möglichst mit technischer Dokumentation, Bedingungen, Datenschutzrichtlinien oder unabhängigen Auditberichten abgeglichen. Wir behaupten keine Labormessungen oder eigenen Nutzungserfahrungen, wenn diese nicht vorliegen.",
    sourceTitle: "2. Quellenhierarchie",
    sourceIntro: "Wir bewerten sowohl Qualität als auch Aktualität einer Quelle.",
    sourceCards: [["Primärquellen", "Offizielle technische Dokumentation, Datenschutzrichtlinien, Bedingungen, Preise und App-Store-Einträge."],["Unabhängige Verifikation", "Drittanbieter-Audits wie Cure53, Deloitte, PwC oder SEC Consult, Gerichtsunterlagen und seriöse Sicherheitsforschung."],["Standards und Plattformdokumentation", "NIST, IETF, Apple, Google, Microsoft und vergleichbare Protokoll-, Plattform- und Sicherheitsdokumente."],["Sekundärquellen", "Nur für Kontext; kritische Sicherheits- oder Funktionsaussagen beruhen nicht ausschließlich auf Sekundärquellen."]],
    criteriaTitle: "3. Vergleichskriterien",
    criteriaIntro: "Statt einer redaktionellen Punktzahl halten wir dieselben Felder bei allen Anbietern sichtbar und vergleichbar.",
    headers: ["Kriterium", "Was wir prüfen", "Bevorzugte Quelle"],
    criteria: [["Datenschutz", "No-Logs-Aussagen, Datenerhebung, Rechtsraum", "Datenschutzrichtlinie + unabhängiges Audit"],["Sicherheit", "Protokolle, Kill Switch, Verschlüsselung, Open Source", "Technische Doku + Sicherheitsaudit"],["Plattformen", "Windows, macOS, Linux, iOS, Android, Router, Gerätelimits", "Offizielle App-/Supportseiten"],["Preis", "Einführung, Verlängerung, Erstattung, Steuer/Währung", "Offizielle Preise und Bedingungen"],["Infrastruktur", "Server-/Länderangaben und Spezialserver", "Offizielle Netzwerk-/Serverseiten"],["Transparenz", "Auditdatum, Sicherheitsvorfälle, Unternehmensangaben", "Auditberichte + Unternehmensangaben"]],
    freshnessTitle: "4. Aktualität",
    freshness: ["Preis- und Plandaten werden mit Prüfdatum angezeigt.", "Audits, Protokolle und Richtlinienänderungen werden regelmäßig erneut geprüft.", "Nicht verifizierbare Informationen werden nicht als sichere Tatsachen dargestellt.", "Ältere Inhalte werden bei neuen Quellen aktualisiert; Änderungsdaten werden angezeigt."],
    limitsTitle: "5. Grenzen und Einnahmemodell",
    limits: ["VPN Advisor ist kein Echtzeit-Geschwindigkeitslabor; Leistung variiert nach Standort, ISP, Serverlast und Protokoll.", "Streaming-Zugriff kann sich schnell ändern und wird nicht garantiert.", "Anbieteraussagen gelten allein nicht als unabhängiger Beleg; wenn möglich wird Drittverifikation bevorzugt.", "Google-AdSense-Anzeigen und einige Affiliate-Links können erscheinen. Werbung oder Provision ändert nicht, ob eine technische Aussage als verifiziert gilt.", "Diese Website ist keine Sicherheits-, Rechts- oder Finanzberatung."],
    disclosure: "Werbe- und Einnahmenhinweise lesen",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = copy[locale];
  return { title: t.title, description: t.description, alternates: localizedAlternates("/methodology", locale), openGraph: { title: t.title, description: t.description, url: absoluteUrl("/methodology", locale), type: "article" } };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  setRequestLocale(locale);
  const t = copy[locale];
  const date = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US", { day: "numeric", month: "long", year: "numeric" }).format(new Date("2026-08-31"));

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: locale === "tr" ? "Ana sayfa" : locale === "de" ? "Startseite" : "Home", path: "/" }, { name: t.h1, path: "/methodology" }], locale)} />
      <Container size="md" className="py-12 sm:py-16 lg:py-20">
      <header className="min-w-0">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"><ShieldCheck className="size-3.5" /> {t.badge}</span>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-strong break-words">{t.h1}</h1>
        <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">{t.intro}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted"><CalendarDays className="size-3.5" />{t.updated}: <span className="text-ink">{date}</span></p>
      </header>

      <CitationSummary
        title={
          locale === "tr"
            ? "VPN Advisor kanıtları nasıl değerlendirir?"
            : locale === "de"
              ? "Wie bewertet VPN Advisor Evidenz?"
              : "How does VPN Advisor evaluate evidence?"
        }
        intro={
          locale === "tr"
            ? "VPN Advisor bir laboratuvar test servisi değil; resmi belgeleri, bağımsız denetim kayıtlarını ve güncel fiyat kaynaklarını görünür bir çerçevede düzenleyen İngilizce bir referans sitesidir."
            : locale === "de"
              ? "VPN Advisor ist kein Testlabor, sondern eine englischsprachige Referenzseite, die offizielle Unterlagen, unabhängige Auditberichte und aktuelle Preisquellen in einem sichtbaren Rahmen ordnet."
              : "VPN Advisor is not a testing laboratory. It is an English-language reference site that organizes official documentation, independent audit records and current pricing sources in a visible framework."
        }
        points={
          locale === "tr"
            ? ["Kaynak türü, tarih ve kapsam görünür tutulur.", "Sağlayıcı beyanı bağımsız kanıt olarak sunulmaz.", "Test edilmeyen hız, streaming veya kullanıcı puanı yayınlanmaz.", "Belirsizlik ve eksik kaynaklar açıkça işaretlenir."]
            : locale === "de"
              ? ["Quellentyp, Datum und Umfang bleiben sichtbar.", "Anbieterangaben werden nicht als unabhängiger Beleg ausgegeben.", "Nicht durchgeführte Geschwindigkeits-, Streaming- oder Nutzertests werden nicht veröffentlicht.", "Unsicherheit und Evidenzlücken werden ausdrücklich markiert."]
              : ["Source type, date and scope stay visible.", "Provider claims are not presented as independent proof.", "Unrun speed, streaming or user tests are not published.", "Uncertainty and evidence gaps are labelled explicitly."]
        }
      />

      <nav aria-label={t.toc} className="mt-10 rounded-xl border border-border bg-surface-subtle p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted"><ListChecks className="size-4" />{t.toc}</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">{t.sections.map((label, i) => <li key={label}><a href={`#s${i + 1}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink hover:bg-brand-50 hover:text-brand-700"><Link2 className="size-4 shrink-0 text-brand-600" />{label}</a></li>)}</ul>
      </nav>

      <section id="s1" className="mt-14 scroll-mt-24"><Heading icon={<FileSearch className="size-5" />} title={t.whatTitle} /><p className="mt-4 text-ink leading-relaxed">{t.whatBody}</p></section>
      <section id="s2" className="mt-14 scroll-mt-24"><Heading icon={<Database className="size-5" />} title={t.sourceTitle} /><p className="mt-4 text-ink leading-relaxed">{t.sourceIntro}</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{t.sourceCards.map(([title, body]) => <div key={title} className="rounded-xl border border-border bg-surface-base p-5 dark:bg-surface-subtle"><h3 className="font-semibold text-ink-strong">{title}</h3><p className="mt-2 text-sm text-ink leading-relaxed">{body}</p></div>)}</div></section>
      <section id="s3" className="mt-14 scroll-mt-24"><Heading icon={<Scale className="size-5" />} title={t.criteriaTitle} /><p className="mt-4 text-ink leading-relaxed">{t.criteriaIntro}</p><div className="mt-6 overflow-hidden rounded-xl border border-border"><table className="w-full text-sm"><thead className="bg-surface-subtle text-left text-xs font-semibold uppercase tracking-wide text-ink-muted"><tr>{t.headers.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody className="divide-y divide-border bg-surface-base">{t.criteria.map((row) => <tr key={row[0]} className="align-top">{row.map((cell, i) => <td key={cell} className={`px-4 py-3 leading-relaxed ${i === 0 ? "font-semibold text-ink-strong" : "text-ink"}`}>{cell}</td>)}</tr>)}</tbody></table></div></section>
      <section id="s4" className="mt-14 scroll-mt-24"><Heading icon={<RefreshCw className="size-5" />} title={t.freshnessTitle} /><ul className="mt-5 space-y-3 text-sm text-ink">{t.freshness.map((item) => <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-surface-base p-4 dark:bg-surface-subtle"><CalendarDays className="size-4 text-brand-600 shrink-0 mt-0.5" /><span className="leading-relaxed">{item}</span></li>)}</ul></section>
      <section id="s5" className="mt-14 scroll-mt-24"><Heading icon={<Eye className="size-5" />} title={t.limitsTitle} /><div className="mt-6 rounded-xl border border-border bg-surface-base p-5 dark:bg-surface-subtle"><ul className="space-y-3 text-sm text-ink">{t.limits.map((item) => <li key={item} className="flex items-start gap-2"><AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" /><span className="leading-relaxed">{item}</span></li>)}</ul><Link href="/affiliate-disclosure" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 underline">{t.disclosure}<ExternalLink className="size-3.5" /></Link></div></section>

      <section className="mt-14 rounded-xl border border-border bg-brand-50/40 p-5 sm:p-6"><div className="flex items-start gap-3"><BookOpen className="size-5 text-brand-700 shrink-0 mt-0.5" /><p className="text-sm text-ink leading-relaxed">{locale === "tr" ? "Referans yaklaşımımızın temel ilkesi basittir: kaynağı göster, bilgiyi sınıflandır, belirsizliği saklama ve test etmediğin şeyi test edilmiş gibi sunma." : locale === "de" ? "Unser Referenzprinzip ist einfach: Quelle zeigen, Information einordnen, Unsicherheit offenlegen und nichts als getestet darstellen, was nicht getestet wurde." : "Our reference principle is simple: show the source, classify the information, disclose uncertainty, and never present something as tested when it was not tested."}</p></div></section>
      </Container>
    </>
  );
}

function Heading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">{icon}{title}</h2>;
}
