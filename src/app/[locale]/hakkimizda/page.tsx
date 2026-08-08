import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Eye, FileSearch, Mail, BookOpen, Scale } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig, absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  tr: {
    metaTitle: "Hakkımızda — VPN Advisor VPN Bilgi ve Karşılaştırma Rehberi",
    metaDescription: "VPN Advisor'ın amacı, kaynak politikası, gelir modeli ve sınırları: gerçek olmayan test veya editör iddiası yerine doğrulanabilir VPN bilgilerini düzenleyen bağımsız bilgi projesi.",
    home: "Ana sayfa", here: "Hakkımızda", badge: "Bağımsız bilgi projesi",
    h1: "VPN Advisor nedir?",
    lede: "VPN Advisor, VPN teknolojileri ve sağlayıcıları hakkında doğrulanabilir bilgileri bir araya getiren bağımsız bir bilgi ve karşılaştırma projesidir.",
    explainerTitle: "Önemli açıklama:", explainer: "Sitede gerçek bir laboratuvar test ekibi veya sürekli saha testi altyapısı varmış gibi davranmıyoruz. Sağlayıcılara gerçekleştirilmemiş testlerden puan vermek yerine kaynakları, özellikleri ve koşulları karşılaştırılabilir biçimde düzenliyoruz.",
    approachH2: "Yaklaşımımız", approach: "Önceliğimiz birincil kaynaklardır: sağlayıcıların resmi teknik belgeleri, gizlilik politikaları, fiyatlandırma ve kullanım şartları, yayınlanmış bağımsız denetimler, uygulama mağazası kayıtları ve tanınmış standart kuruluşları. Kaynak eksikse bunu sınırlama olarak belirtiriz.",
    principlesH2: "Temel ilkeler",
    principles: [["Şeffaflık", "Bir bilginin sağlayıcı beyanı mı yoksa bağımsız doğrulama mı olduğunu ayırmaya çalışırız."], ["Kaynak önceliği", "Mümkün olduğunda resmi belgeleri ve yayımlanmış bağımsız raporları referans alırız."], ["Sınırlamaları belirtme", "Fiyat, sunucu sayısı, streaming erişimi ve performans gibi değişken bilgileri garanti olarak sunmayız."]],
    revenueH2: "Gelir modeli", revenue: "Site Google AdSense reklamları gösterebilir ve gelecekte bazı sağlayıcı bağlantıları ortaklık bağlantısı olabilir. Ticari ilişki, hangi veri alanlarını gösterdiğimizi veya kaynak politikasını değiştirmemelidir.",
    authorsH2: "İçerik imzası", authors: "İçerikler kişi kimliği veya uzman unvanı uydurmak yerine VPN Advisor araştırma içeriği olarak yayınlanır. Kaynakların doğruluğu ve güncelliği mümkün olduğunda sayfa düzeyinde kontrol edilir.",
    whyH2: "Neden bu model?", why: "VPN seçimi pazarlama dili, fiyat kampanyaları ve sık değişen teknik özellikler nedeniyle karmaşık olabilir. Referans modeli; kullanıcıya neyin bilindiğini, neyin sağlayıcı beyanı olduğunu ve neyin değişebileceğini açıkça göstermeyi amaçlar.",
    contactH2: "Hata bildirimi ve iletişim", contact: "Eski, hatalı veya kaynağı zayıf bir bilgi görürseniz iletişim sayfasından bildirebilirsiniz. Düzeltmeler mümkün olduğunda kaynağa göre yapılır.",
    methodology: "Araştırma ve kaynak politikası", disclosure: "Reklam açıklaması", privacy: "Gizlilik politikası", errorTitle: "Bir bilgi hatası mı buldunuz?", errorBody: "Kaynağı veya ilgili sayfayı gönderin; yeniden kontrol edelim.", errorCta: "İletişime geç",
  },
  en: {
    metaTitle: "About — VPN Advisor Information & Comparison Guide",
    metaDescription: "VPN Advisor's purpose, source policy, revenue model and limits: a transparent information project built around verifiable VPN data rather than invented tests or editor claims.",
    home: "Home", here: "About", badge: "Independent information project", h1: "What is VPN Advisor?",
    lede: "VPN Advisor is an independent information and comparison project that organises verifiable information about VPN technology and providers.", explainerTitle: "Important disclosure:", explainer: "We do not pretend to operate a laboratory testing team or continuous field-testing programme. Instead of assigning scores from tests that did not happen, we organise sources, features and commercial terms into comparable fields.", approachH2: "Our approach", approach: "We prioritise primary sources: official technical documentation, privacy policies, pricing and terms, published independent audits, app-store listings and recognised standards organisations. Missing evidence is treated as a limitation.", principlesH2: "Core principles", principles: [["Transparency", "We distinguish provider statements from independent verification wherever possible."], ["Source priority", "Official documentation and published independent reports are preferred over marketing summaries."], ["State limitations", "Prices, server counts, streaming access and performance are not presented as permanent guarantees."]], revenueH2: "Revenue model", revenue: "The site may display Google AdSense advertising and may use some affiliate links in the future. Commercial relationships should not change comparison fields or the source policy.", authorsH2: "Content attribution", authors: "Content is published as VPN Advisor research content rather than inventing personal identities or expert titles. Accuracy and freshness are checked at page level where practical.", whyH2: "Why this model?", why: "VPN selection is complicated by marketing claims, temporary pricing and changing technical features. A reference model aims to show what is known, what is provider-reported and what can change.", contactH2: "Corrections and contact", contact: "If you find outdated, incorrect or weakly sourced information, send the page and source through the contact page. Corrections are made against evidence where possible.", methodology: "Research and source policy", disclosure: "Advertising disclosure", privacy: "Privacy policy", errorTitle: "Found an information error?", errorBody: "Send the source or page so we can re-check it.", errorCta: "Contact us",
  },
  de: {
    metaTitle: "Über uns — VPN Advisor Informations- und Vergleichsratgeber",
    metaDescription: "Zweck, Quellenrichtlinie, Einnahmemodell und Grenzen von VPN Advisor: ein transparentes Informationsprojekt mit überprüfbaren VPN-Daten statt erfundener Tests oder Redaktionsbehauptungen.",
    home: "Startseite", here: "Über uns", badge: "Unabhängiges Informationsprojekt", h1: "Was ist VPN Advisor?",
    lede: "VPN Advisor ist ein unabhängiges Informations- und Vergleichsprojekt, das überprüfbare Informationen zu VPN-Technik und Anbietern strukturiert.", explainerTitle: "Wichtiger Hinweis:", explainer: "Wir geben nicht vor, ein Labortest-Team oder ein kontinuierliches Feldtest-Programm zu betreiben. Statt Bewertungen aus nicht durchgeführten Tests zu vergeben, ordnen wir Quellen, Funktionen und Konditionen in vergleichbare Felder ein.", approachH2: "Unser Ansatz", approach: "Primärquellen haben Vorrang: offizielle technische Dokumentation, Datenschutzrichtlinien, Preis- und Vertragsseiten, veröffentlichte unabhängige Audits, App-Store-Einträge und anerkannte Standardorganisationen. Fehlende Nachweise werden als Einschränkung behandelt.", principlesH2: "Grundprinzipien", principles: [["Transparenz", "Anbieterangaben und unabhängige Verifikation werden möglichst getrennt dargestellt."], ["Quellenpriorität", "Offizielle Dokumente und veröffentlichte unabhängige Berichte werden Marketingzusammenfassungen vorgezogen."], ["Grenzen benennen", "Preise, Serverzahlen, Streaming-Zugang und Leistung werden nicht als dauerhafte Garantien dargestellt."]], revenueH2: "Einnahmemodell", revenue: "Die Website kann Google-AdSense-Werbung anzeigen und künftig einige Affiliate-Links verwenden. Kommerzielle Beziehungen sollen Vergleichsfelder oder Quellenrichtlinie nicht verändern.", authorsH2: "Inhaltskennzeichnung", authors: "Inhalte werden als VPN-Advisor-Recherche veröffentlicht, statt persönliche Identitäten oder Expertentitel zu erfinden. Richtigkeit und Aktualität werden soweit möglich auf Seitenebene geprüft.", whyH2: "Warum dieses Modell?", why: "VPN-Auswahl ist durch Marketingversprechen, zeitlich begrenzte Preise und wechselnde technische Funktionen komplex. Ein Referenzmodell soll zeigen, was bekannt, was Anbieterangabe und was veränderlich ist.", contactH2: "Korrekturen und Kontakt", contact: "Wenn Sie veraltete, falsche oder schwach belegte Informationen finden, senden Sie Seite und Quelle über die Kontaktseite. Korrekturen erfolgen möglichst anhand von Belegen.", methodology: "Recherche- und Quellenrichtlinie", disclosure: "Werbehinweis", privacy: "Datenschutz", errorTitle: "Einen Informationsfehler gefunden?", errorBody: "Senden Sie Quelle oder Seite, damit wir sie erneut prüfen können.", errorCta: "Kontakt",
  },
} as const;

function safeLocale(value: string): Locale { return value === "en" || value === "de" ? value : "tr"; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params; const locale = safeLocale(rawLocale); const c = COPY[locale];
  return { title: c.metaTitle, description: c.metaDescription, alternates: localizedAlternates("/hakkimizda", locale), openGraph: { title: c.metaTitle, description: c.metaDescription, url: absoluteUrl("/hakkimizda", locale), type: "website" } };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params; const locale = safeLocale(rawLocale); setRequestLocale(locale); const c = COPY[locale];
  return <><JsonLd data={breadcrumbSchema([{ name: c.home, path: "/" }, { name: c.here, path: "/hakkimizda" }], locale)} />
    <Container size="md" className="py-12 sm:py-16">
      <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">{c.home}</Link>{" "}› <span className="text-ink-strong">{c.here}</span></p>
      <header className="mt-6"><Badge variant="brand">{c.badge}</Badge><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{c.h1}</h1><p className="mt-4 text-lg text-ink-muted">{c.lede}</p></header>
      <Card className="mt-8 p-6 bg-brand-50/40"><p className="text-sm text-ink leading-relaxed"><strong className="text-ink-strong">{c.explainerTitle}</strong>{" "}{c.explainer}</p></Card>
      <article className="mt-12 prose prose-stone max-w-none"><h2>{c.approachH2}</h2><p>{c.approach}</p><h2>{c.principlesH2}</h2></article>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">{c.principles.map(([title, body], index) => { const Icon = index === 0 ? Eye : index === 1 ? FileSearch : ShieldCheck; return <Card key={title} className="p-5"><Icon className="size-7 text-brand-600" /><h3 className="mt-3 font-semibold text-ink-strong">{title}</h3><p className="mt-1 text-sm text-ink-muted">{body}</p></Card>; })}</div>
      <article className="mt-12 prose prose-stone max-w-none"><h2>{c.revenueH2}</h2><p>{c.revenue}</p><h2>{c.authorsH2}</h2><p>{c.authors}</p><h2>{c.whyH2}</h2><p>{c.why}</p><h2>{c.contactH2}</h2><p>{c.contact}</p></article>
      <Card className="mt-12 p-6 bg-brand-50/40 text-center"><Mail className="size-6 text-brand-600 mx-auto" /><p className="mt-3 font-semibold text-ink-strong">{c.errorTitle}</p><p className="mt-1 text-sm text-ink-muted">{c.errorBody}</p><Link href="/iletisim" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">{c.errorCta}</Link></Card>
      <section className="mt-12 flex flex-wrap gap-2 justify-center"><Link href="/metodoloji" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"><BookOpen className="size-3" /> {c.methodology}</Link><Link href="/reklam-aciklamasi" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"><Scale className="size-3" /> {c.disclosure}</Link><Link href="/gizlilik" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">{c.privacy}</Link></section>
    </Container></>;
}
