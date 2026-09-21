import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, FileSearch, Scale, RefreshCw, Eye, ListChecks, CalendarDays, ExternalLink, AlertTriangle, BookOpen, Database, Link2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CitationSummary } from "@/components/seo/citation-summary";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";
import { GoogleAdsense } from "@/components/analytics/google-adsense";
import { researchEdition } from "@/data/research";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: {
    title: "VPN Kaynakları ve Sınırlamalar | VPN Advisor",
    description: "VPN Advisor'da kamuya açık VPN bilgilerini nasıl sunduğumuzu, kaynak türlerini ve bu bilgilendirici sitenin açık sınırlarını anlatıyoruz.",
    badge: "Kaynaklar ve sınırlar",
    h1: "VPN Advisor bilgileri nasıl sunuyor?",
    intro: "VPN Advisor bir test laboratuvarı, sertifikasyon kuruluşu veya profesyonel haber merkezi değildir. Bu sayfa sitede kullanılan kaynak türlerini, bilgilerin nasıl etiketlendiğini ve okuyucunun bilmesi gereken sınırlamaları açıklar.",
    updated: "Bu sayfanın son güncellenmesi",
    toc: "Bu sayfada",
    sections: ["1. Bu site ne yapar?", "2. Kaynak türleri", "3. Bilgi alanları", "4. Güncellik ve düzeltmeler", "5. Açık sınırlar ve gelir modeli"],
    whatTitle: "1. Bu site ne yapar?",
    whatBody: "Sağlayıcı profilleri ve rehberler, kamuya açık belgeleri ve bağımsız kaynaklarda yer alan bilgileri okuyucu için düzenler. Sayfalarda kaynak bağlantısı veya tarih bulunduğunda bunlar görünür tutulur; ancak her bilgi alanının bağımsız olarak doğrulandığı ya da tüm sitenin düzenli bir denetimden geçtiği iddia edilmez.",
    sourceTitle: "2. Kaynak türleri",
    sourceIntro: "Aşağıdaki liste bir test protokolü değil, sitede karşılaşabileceğiniz bilgi kaynaklarını okuma rehberidir. Bir kaynağın bulunması tek başına iddianın doğru olduğunu kanıtlamaz.",
    sourceCards: [
      ["Birincil kaynaklar", "Sağlayıcının resmi teknik dokümantasyonu, gizlilik politikası, hizmet şartları, fiyatlandırma ve uygulama mağazası kayıtları."],
      ["Bağımsız doğrulama", "Cure53, Deloitte, PwC, SEC Consult gibi üçüncü taraf denetimleri; mahkeme kayıtları veya güvenilir güvenlik araştırmaları."],
      ["Standart ve platform belgeleri", "NIST, IETF, Apple, Google, Microsoft ve benzeri kurumların protokol, platform ve güvenlik belgeleri."],
      ["İkincil kaynaklar", "Yalnızca bağlam için kullanılır; kritik özellik veya güvenlik iddiası tek başına ikincil kaynağa dayandırılmaz."],
    ],
    criteriaTitle: "3. Bilgi alanları",
    criteriaIntro: "Sayfalarda sıkça görülen alanlar; gizlilik, güvenlik, cihaz desteği, fiyat ve sağlayıcı belgeleridir. Bunlar bir kalite puanı veya her sağlayıcı için tamamlanmış bir doğrulama listesi değildir.",
    headers: ["Kriter", "Neye bakıyoruz?", "Tercih edilen kaynak"],
    criteria: [
      ["Gizlilik", "No-logs ifadesi, veri toplama kapsamı, yargı yetkisi", "Gizlilik politikası + bağımsız denetim"],
      ["Güvenlik", "Protokoller, kill switch, şifreleme, açık kaynak bileşenler", "Teknik dokümantasyon + güvenlik denetimi"],
      ["Platform desteği", "Windows, macOS, Linux, iOS, Android, router ve cihaz sınırları", "Resmi uygulama ve destek sayfaları"],
      ["Fiyat", "İlk dönem, yenileme, para iadesi, vergi/kur notları", "Resmi fiyatlandırma ve hizmet şartları"],
      ["Altyapı", "Sunucu/ülke bilgileri ve özel sunucu seçenekleri", "Resmi ağ/sunucu sayfaları"],
      ["Şeffaflık", "Denetim tarihi, güvenlik olayları, şirket bilgileri", "Denetim raporları + şirket açıklamaları"],
    ],
    freshnessTitle: "4. Güncellik ve düzeltmeler",
    freshness: ["Fiyat, plan, özellik ve denetim bilgileri değişebilir; tarih yalnızca bulunduğu yerde geçerli bir kontrol noktasıdır.", "Aşağıdaki gözden geçirme hedefleri editoryal çalışma sırasını gösterir; sağlayıcıların sayfaları değiştiğinde daha erken kontrol yapılır.", "Bir bilgi doğrulanamıyorsa kesin gerçek gibi sunulmamalı; okuyucu güncel resmî kaynağı kontrol etmelidir.", "Hata veya güncellik sorunu bildirmek için ilgili URL'yi ve kaynağı iletişim sayfasından gönderebilirsiniz."],
    freshnessScheduleTitle: "Gözden geçirme hedefleri",
    freshnessSchedule: [["Fiyat ve kampanyalar", "7 gün", "İlk dönem, yenileme ve iade koşulları"], ["Denetim ve güvenlik kayıtları", "30 gün", "Rapor tarihi, kapsamı ve yayın bağlantısı"], ["Gizlilik ve teknik özellikler", "45–60 gün", "Politika, protokol, cihaz ve ağ bilgileri"], ["Kalıcı rehber içerikleri", "90 gün", "Kaynak bağlantıları, sınırlamalar ve iç linkler"]],
    limitsTitle: "5. Açık sınırlar ve gelir modeli",
    limits: ["VPN Advisor hız, streaming, kill switch veya kullanıcı deneyimi için laboratuvar ya da saha testi yürütmez.", "Sağlayıcı beyanları bağımsız kanıt değildir; denetim raporlarının da kapsamı ve tarihi vardır.", "Okuyucu araçları yalnızca o anki bağlantıdan sınırlı sinyal üretir; sağlayıcı sertifikası veya genel güvenlik sonucu değildir.", "Google AdSense reklamları ve bazı affiliate bağlantıları bulunabilir. Reklam veya komisyon, bilgiyi değiştirmemeli; yine de okuyucu kaynakları ve güncel şartları kontrol etmelidir.", "Bu site genel bilgilendirme içindir; güvenlik, hukuk veya finans danışmanlığı değildir."],
    disclosure: "Reklam ve gelir açıklamasını okuyun",
  },
  en: {
    title: "VPN Sources and Limitations | VPN Advisor",
    description: "How VPN Advisor presents public VPN information, source types and the explicit limits of this informational website.",
    badge: "Sources and limitations",
    h1: "How does VPN Advisor present information?",
    intro: "VPN Advisor is not a testing laboratory, certification body or professional newsroom. This page explains the source types that may appear on the site, how information is labelled and what readers should verify themselves.",
    updated: "Page last updated",
    toc: "On this page",
    sections: ["1. What this site does", "2. Source types", "3. Information fields", "4. Freshness and corrections", "5. Clear limits and revenue"],
    whatTitle: "1. What this site does",
    whatBody: "Provider profiles and guides organize public documents and information found in independent sources. When a page includes a source link or date, it is kept visible. We do not claim that every field is independently verified or that the whole site is reviewed on a fixed schedule.",
    sourceTitle: "2. Source types",
    sourceIntro: "This is a reading guide, not a testing protocol. A source being listed does not by itself prove that a claim is true.",
    sourceCards: [["Primary sources", "Official technical documentation, privacy policies, terms, pricing and app-store listings."],["Independent verification", "Third-party audits such as Cure53, Deloitte, PwC or SEC Consult, court records and credible security research."],["Standards and platform documentation", "NIST, IETF, Apple, Google, Microsoft and similar protocol, platform and security documentation."],["Secondary sources", "Used for context only; critical security or feature claims are not based solely on secondary sources."]],
    criteriaTitle: "3. Information fields",
    criteriaIntro: "Pages commonly discuss privacy, security, device support, pricing and provider documentation. These are information fields, not a quality score or a completed verification checklist for every provider.",
    headers: ["Criterion", "What we examine", "Preferred source"],
    criteria: [["Privacy", "No-logs claims, data collection, jurisdiction", "Privacy policy + independent audit"],["Security", "Protocols, kill switch, encryption, open-source components", "Technical docs + security audit"],["Platform support", "Windows, macOS, Linux, iOS, Android, routers and device limits", "Official app/support pages"],["Pricing", "Intro price, renewal, refunds, tax/currency notes", "Official pricing and terms"],["Infrastructure", "Server/country information and specialty servers", "Official network/server pages"],["Transparency", "Audit date, security incidents, company information", "Audit reports + company disclosures"]],
    freshnessTitle: "4. Freshness and corrections",
    freshness: ["Pricing, plans, features and audit information can change; a displayed date is only a timestamp for the information it accompanies.", "The review targets below describe our editorial queue; a material provider change should trigger an earlier check.", "Information that cannot be confirmed should not be treated as certain; readers should verify current official sources.", "To report an error or outdated claim, send the URL and supporting source through the contact page."],
    freshnessScheduleTitle: "Review targets",
    freshnessSchedule: [["Pricing and offers", "7 days", "Introductory price, renewal and refund terms"], ["Audits and security records", "30 days", "Report date, scope and publication link"], ["Privacy and technical features", "45–60 days", "Policy, protocol, device and network fields"], ["Evergreen guides", "90 days", "Source links, limitations and internal links"]],
    limitsTitle: "5. Clear limits and revenue model",
    limits: ["VPN Advisor does not run laboratory or field tests for speed, streaming, kill switches or user experience.", "Provider statements are not independent proof; audit reports also have a scope and date.", "Reader tools produce limited signals from the current connection; they are not provider certifications or overall security results.", "Google AdSense ads and some affiliate links may appear. Advertising or commission should not change the information, but readers should still check sources and current terms.", "This site provides general information, not security, legal or financial advice."],
    disclosure: "Read our advertising and revenue disclosure",
  },
  de: {
    title: "VPN-Quellen und Grenzen | VPN Advisor",
    description: "Wie VPN Advisor öffentliche VPN-Informationen, Quellentypen und die klaren Grenzen dieser Informationsseite darstellt.",
    badge: "Quellen und Grenzen",
    h1: "Wie stellt VPN Advisor Informationen dar?",
    intro: "VPN Advisor ist kein Testlabor, keine Zertifizierungsstelle und kein professionelles Nachrichtenbüro. Diese Seite erklärt mögliche Quellentypen, die Kennzeichnung von Informationen und die Punkte, die Leser selbst prüfen sollten.",
    updated: "Seite zuletzt aktualisiert",
    toc: "Auf dieser Seite",
    sections: ["1. Was diese Seite tut", "2. Quellentypen", "3. Informationsfelder", "4. Aktualität und Korrekturen", "5. Klare Grenzen und Einnahmen"],
    whatTitle: "1. Was diese Seite tut",
    whatBody: "Anbieterprofile und Ratgeber ordnen öffentliche Dokumente und Informationen aus unabhängigen Quellen. Wenn eine Seite eine Quellenangabe oder ein Datum enthält, bleibt dies sichtbar. Wir behaupten nicht, dass jedes Feld unabhängig verifiziert oder die gesamte Website nach einem festen Zeitplan geprüft wird.",
    sourceTitle: "2. Quellentypen",
    sourceIntro: "Dies ist ein Leseleitfaden und kein Testprotokoll. Die Nennung einer Quelle beweist eine Aussage nicht automatisch.",
    sourceCards: [["Primärquellen", "Offizielle technische Dokumentation, Datenschutzrichtlinien, Bedingungen, Preise und App-Store-Einträge."],["Unabhängige Verifikation", "Drittanbieter-Audits wie Cure53, Deloitte, PwC oder SEC Consult, Gerichtsunterlagen und seriöse Sicherheitsforschung."],["Standards und Plattformdokumentation", "NIST, IETF, Apple, Google, Microsoft und vergleichbare Protokoll-, Plattform- und Sicherheitsdokumente."],["Sekundärquellen", "Nur für Kontext; kritische Sicherheits- oder Funktionsaussagen beruhen nicht ausschließlich auf Sekundärquellen."]],
    criteriaTitle: "3. Informationsfelder",
    criteriaIntro: "Seiten behandeln häufig Datenschutz, Sicherheit, Geräteunterstützung, Preise und Anbieterunterlagen. Das sind Informationsfelder, keine Qualitätsbewertung und keine vollständige Prüfliste für jeden Anbieter.",
    headers: ["Kriterium", "Was wir prüfen", "Bevorzugte Quelle"],
    criteria: [["Datenschutz", "No-Logs-Aussagen, Datenerhebung, Rechtsraum", "Datenschutzrichtlinie + unabhängiges Audit"],["Sicherheit", "Protokolle, Kill Switch, Verschlüsselung, Open Source", "Technische Doku + Sicherheitsaudit"],["Plattformen", "Windows, macOS, Linux, iOS, Android, Router, Gerätelimits", "Offizielle App-/Supportseiten"],["Preis", "Einführung, Verlängerung, Erstattung, Steuer/Währung", "Offizielle Preise und Bedingungen"],["Infrastruktur", "Server-/Länderangaben und Spezialserver", "Offizielle Netzwerk-/Serverseiten"],["Transparenz", "Auditdatum, Sicherheitsvorfälle, Unternehmensangaben", "Auditberichte + Unternehmensangaben"]],
    freshnessTitle: "4. Aktualität und Korrekturen",
    freshness: ["Preise, Tarife, Funktionen und Auditinformationen können sich ändern; ein Datum gilt nur für die Information, neben der es steht.", "Die folgenden Prüfziele beschreiben unsere redaktionelle Arbeitsliste; wesentliche Änderungen eines Anbieters lösen eine frühere Prüfung aus.", "Nicht bestätigte Informationen sollten nicht als sichere Tatsachen gelten; aktuelle offizielle Quellen sind selbst zu prüfen.", "Fehler oder veraltete Angaben können mit URL und Beleg über die Kontaktseite gemeldet werden."],
    freshnessScheduleTitle: "Prüfziele",
    freshnessSchedule: [["Preise und Angebote", "7 Tage", "Einführungspreis, Verlängerung und Erstattung"], ["Audits und Sicherheitsnachweise", "30 Tage", "Berichtsdatum, Umfang und Veröffentlichungslink"], ["Datenschutz und technische Merkmale", "45–60 Tage", "Richtlinie, Protokoll, Geräte- und Netzwerkfelder"], ["Dauerhafte Ratgeber", "90 Tage", "Quellenlinks, Grenzen und interne Links"]],
    limitsTitle: "5. Klare Grenzen und Einnahmemodell",
    limits: ["VPN Advisor führt keine Labor- oder Feldtests zu Geschwindigkeit, Streaming, Kill Switch oder Nutzererfahrung durch.", "Anbieterangaben sind kein unabhängiger Beleg; auch Auditberichte haben Umfang und Datum.", "Leser-Tools erzeugen begrenzte Signale der aktuellen Verbindung; sie sind keine Anbieterzertifizierung und kein allgemeines Sicherheitsergebnis.", "Google-AdSense-Anzeigen und einige Affiliate-Links können erscheinen. Werbung oder Provision sollte die Informationen nicht verändern; Quellen und aktuelle Bedingungen sind dennoch selbst zu prüfen.", "Diese Website bietet allgemeine Informationen und keine Sicherheits-, Rechts- oder Finanzberatung."],
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
  const date = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US", { day: "numeric", month: "long", year: "numeric" }).format(new Date(researchEdition()));

  return (
    <>
      <GoogleAdsense />
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
      <section id="s4" className="mt-14 scroll-mt-24"><Heading icon={<RefreshCw className="size-5" />} title={t.freshnessTitle} /><ul className="mt-5 space-y-3 text-sm text-ink">{t.freshness.map((item) => <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-surface-base p-4 dark:bg-surface-subtle"><CalendarDays className="size-4 text-brand-600 shrink-0 mt-0.5" /><span className="leading-relaxed">{item}</span></li>)}</ul><h3 className="mt-8 text-xl font-bold tracking-tight text-ink-strong">{t.freshnessScheduleTitle}</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{t.freshnessSchedule.map(([area, target, scope]) => <article key={area} className="rounded-xl border border-border bg-surface-base p-4 dark:bg-surface-subtle"><div className="flex items-center justify-between gap-3"><h4 className="font-semibold text-ink-strong">{area}</h4><span className="shrink-0 rounded-full bg-brand-100 px-2 py-1 text-xs font-semibold text-brand-700">{target}</span></div><p className="mt-2 text-sm leading-relaxed text-ink-muted">{scope}</p></article>)}</div></section>
      <section id="s5" className="mt-14 scroll-mt-24"><Heading icon={<Eye className="size-5" />} title={t.limitsTitle} /><div className="mt-6 rounded-xl border border-border bg-surface-base p-5 dark:bg-surface-subtle"><ul className="space-y-3 text-sm text-ink">{t.limits.map((item) => <li key={item} className="flex items-start gap-2"><AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" /><span className="leading-relaxed">{item}</span></li>)}</ul><Link href="/affiliate-disclosure" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 underline">{t.disclosure}<ExternalLink className="size-3.5" /></Link></div></section>

      <section className="mt-14 rounded-xl border border-border bg-brand-50/40 p-5 sm:p-6"><div className="flex items-start gap-3"><BookOpen className="size-5 text-brand-700 shrink-0 mt-0.5" /><p className="text-sm text-ink leading-relaxed">{locale === "tr" ? "Referans yaklaşımımızın temel ilkesi basittir: kaynağı göster, bilgiyi sınıflandır, belirsizliği saklama ve test etmediğin şeyi test edilmiş gibi sunma." : locale === "de" ? "Unser Referenzprinzip ist einfach: Quelle zeigen, Information einordnen, Unsicherheit offenlegen und nichts als getestet darstellen, was nicht getestet wurde." : "Our reference principle is simple: show the source, classify the information, disclose uncertainty, and never present something as tested when it was not tested."}</p></div></section>
      </Container>
    </>
  );
}

function Heading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">{icon}{title}</h2>;
}
