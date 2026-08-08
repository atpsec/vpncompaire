import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Eye, Scale, FileSearch, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig, absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: {
    title: "VPN Advisor Hakkında — Kaynak Temelli VPN Bilgi ve Karşılaştırma Sitesi",
    desc: "VPN Advisor'ın amacı, kaynak yaklaşımı, gelir modeli ve yayın sınırları. Site bir test laboratuvarı veya gerçek kullanıcı inceleme platformu değildir.",
    home: "Ana sayfa",
    here: "Hakkımızda",
    badge: "Şeffaf bilgi projesi",
    h1: "VPN Advisor ne yapar?",
    lede: "VPN Advisor, VPN teknolojisini anlamayı ve sağlayıcıları doğrulanabilir özellikler üzerinden karşılaştırmayı kolaylaştıran bağımsız bir bilgi projesidir.",
    explainerTitle: "Önemli açıklama:",
    explainerBody: "Gerçek bir test laboratuvarı, kullanıcı yorum platformu veya sağlayıcı temsilcisi değiliz. Laboratuvarda ölçmediğimiz performansı test edilmiş gibi; yaşamadığımız deneyimi kullanıcı deneyimi gibi; hesaplamadığımız puanı editoryal değerlendirme gibi sunmayız.",
    approachH2: "Yayın yaklaşımımız",
    approachBody: "İçerikleri; resmi teknik belgeler, gizlilik politikaları, hizmet şartları, fiyatlandırma sayfaları, bağımsız denetimler ve güvenilir standart/platform kaynaklarından derleriz. Amacımız kullanıcıya tek bir 'kazanan' ilan etmek değil, karar için gerekli alanları görünür hale getirmektir.",
    principlesH2: "Temel ilkeler",
    p1t: "Şeffaflık", p1b: "Kaynağın türünü, verinin güncelliğini ve doğrulayamadığımız noktaları açıkça belirtmeye çalışırız.",
    p2t: "Tarafsız çerçeve", p2b: "Aynı karşılaştırma alanlarını sağlayıcılar arasında mümkün olduğunca tutarlı uygularız; reklam veya affiliate ilişkisi teknik gerçeği değiştirmez.",
    p3t: "Kaynak önceliği", p3b: "Kritik güvenlik ve gizlilik iddialarında resmi belgeyi ve mümkünse bağımsız üçüncü taraf doğrulamasını tercih ederiz.",
    methodH2: "Nasıl karşılaştırıyoruz?",
    methodBody: "Sayısal editör puanı yerine fiyat, gizlilik, denetim, protokol, platform desteği, yargı yetkisi ve ağ bilgileri gibi alanları kaynak temelli biçimde yan yana koyuyoruz.",
    revenueH2: "Gelir modeli",
    revenueBody: "Site Google AdSense reklamları ve bazı sağlayıcı ortaklık bağlantılarından gelir elde edebilir. Bu ilişkiler açıkça belirtilir. Amaç, içeriği reklam için çoğaltmak değil; özgün ve yararlı bir VPN bilgi kaynağı oluşturmaktır.",
    authorH2: "Yazarlık ve sorumluluk",
    authorBody: "Sitede gerçekte var olmayan editör personeli veya uzman unvanı kullanılmamalıdır. Kurumsal içerikler VPN Advisor adıyla yayınlanır; dış kaynaklar ve güncelleme tarihleri içerik güvenilirliğinin temelidir.",
    contactH2: "Düzeltme ve geri bildirim",
    contactBody: "Yanlış, eski veya eksik bir bilgi fark ederseniz iletişim sayfasından bildirebilirsiniz. Doğrulanabilir düzeltmeler içerik güncellemelerine yansıtılır.",
    ctaTitle: "Bir bilgi hatası mı buldunuz?",
    ctaBody: "Kaynağıyla birlikte iletin; kontrol edip gerektiğinde düzeltelim.",
    cta: "İletişime geç",
    methodology: "Metodoloji",
    disclosure: "Reklam açıklaması",
    privacy: "Gizlilik",
  },
  en: {
    title: "About VPN Advisor — Source-Based VPN Information and Comparison Site",
    desc: "VPN Advisor's purpose, sourcing approach, revenue model and publishing limits. The site is not a testing lab or genuine-user review platform.",
    home: "Home", here: "About", badge: "Transparent information project", h1: "What does VPN Advisor do?",
    lede: "VPN Advisor is an independent information project designed to make VPN technology easier to understand and providers easier to compare using verifiable features.",
    explainerTitle: "Important disclosure:", explainerBody: "We are not a testing laboratory, user-review platform or VPN provider representative. We do not present unmeasured performance as tested, unexperienced claims as first-hand experience, or invented scores as editorial ratings.",
    approachH2: "Publishing approach", approachBody: "We organize official technical documentation, privacy policies, terms, pricing pages, independent audits and trustworthy standards/platform sources. The goal is not to declare a universal winner, but to expose the information fields users need to decide.",
    principlesH2: "Core principles", p1t: "Transparency", p1b: "We aim to state source type, data freshness and uncertainty where information cannot be verified.", p2t: "Neutral framework", p2b: "We apply the same comparison fields consistently across providers; advertising or affiliate relationships do not change technical facts.", p3t: "Source priority", p3b: "For important security and privacy claims, we prefer primary documentation and, where possible, independent third-party verification.",
    methodH2: "How comparisons work", methodBody: "Instead of editorial scores, we compare pricing, privacy, audits, protocols, platform support, jurisdiction and network information in a source-based format.",
    revenueH2: "Revenue model", revenueBody: "The site may earn revenue from Google AdSense and some provider affiliate links. These relationships are disclosed. The objective is to build original, useful VPN reference content rather than pages created primarily to show ads.",
    authorH2: "Authorship and responsibility", authorBody: "The site should not imply staff editors or expert credentials that do not exist. Institutional content is published under the VPN Advisor name; sourcing and update dates are central to trust.",
    contactH2: "Corrections and feedback", contactBody: "If you find outdated, incomplete or incorrect information, contact us. Verifiable corrections are reviewed and reflected in content updates.",
    ctaTitle: "Found an information error?", ctaBody: "Send the source with your note and we will review it.", cta: "Contact us", methodology: "Methodology", disclosure: "Advertising disclosure", privacy: "Privacy",
  },
  de: {
    title: "Über VPN Advisor — Quellenbasierte VPN-Informations- und Vergleichsseite",
    desc: "Zweck, Quellenansatz, Einnahmemodell und Grenzen von VPN Advisor. Die Website ist kein Testlabor und keine Plattform für echte Nutzerbewertungen.",
    home: "Startseite", here: "Über uns", badge: "Transparentes Informationsprojekt", h1: "Was macht VPN Advisor?",
    lede: "VPN Advisor ist ein unabhängiges Informationsprojekt, das VPN-Technologie verständlicher macht und Anbieter anhand überprüfbarer Merkmale vergleichbar darstellt.",
    explainerTitle: "Wichtiger Hinweis:", explainerBody: "Wir sind weder Testlabor noch Nutzerbewertungsplattform oder Vertreter eines VPN-Anbieters. Nicht gemessene Leistung wird nicht als getestet dargestellt, nicht gemachte Erfahrungen nicht als eigene Erfahrung und erfundene Punktzahlen nicht als redaktionelle Bewertung.",
    approachH2: "Publikationsansatz", approachBody: "Wir ordnen offizielle technische Dokumentation, Datenschutzrichtlinien, Bedingungen, Preisangaben, unabhängige Audits und vertrauenswürdige Standard-/Plattformquellen. Ziel ist nicht ein universeller Sieger, sondern ein transparenter Entscheidungsrahmen.",
    principlesH2: "Grundprinzipien", p1t: "Transparenz", p1b: "Quellentyp, Aktualität und Unsicherheit sollen sichtbar sein, wenn Informationen nicht eindeutig verifizierbar sind.", p2t: "Neutraler Rahmen", p2b: "Dieselben Vergleichsfelder werden möglichst konsistent auf Anbieter angewendet; Werbung oder Affiliate-Beziehungen verändern technische Fakten nicht.", p3t: "Quellenpriorität", p3b: "Bei wichtigen Sicherheits- und Datenschutzaussagen bevorzugen wir Primärdokumente und möglichst unabhängige Drittverifikation.",
    methodH2: "Wie Vergleiche funktionieren", methodBody: "Statt redaktioneller Punktzahlen vergleichen wir Preise, Datenschutz, Audits, Protokolle, Plattformunterstützung, Rechtsraum und Netzwerkinformationen quellenbasiert.",
    revenueH2: "Einnahmemodell", revenueBody: "Die Website kann Einnahmen über Google AdSense und einige Affiliate-Links erzielen. Diese Beziehungen werden offengelegt. Ziel sind eigenständige, nützliche VPN-Referenzinhalte und keine primär für Werbung erzeugten Seiten.",
    authorH2: "Autorschaft und Verantwortung", authorBody: "Die Website sollte keine nicht existierenden Redakteure oder Expertenqualifikationen suggerieren. Institutionelle Inhalte erscheinen unter dem Namen VPN Advisor; Quellen und Aktualisierungsdaten sind zentrale Vertrauenssignale.",
    contactH2: "Korrekturen und Feedback", contactBody: "Wenn Sie veraltete, unvollständige oder falsche Informationen finden, können Sie uns kontaktieren. Nachprüfbare Korrekturen werden geprüft und eingearbeitet.",
    ctaTitle: "Einen Informationsfehler gefunden?", ctaBody: "Senden Sie den Hinweis zusammen mit der Quelle; wir prüfen ihn.", cta: "Kontakt", methodology: "Methodik", disclosure: "Werbehinweis", privacy: "Datenschutz",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = copy[locale];
  return { title: t.title, description: t.desc, alternates: localizedAlternates("/hakkimizda", locale), openGraph: { title: t.title, description: t.desc, url: absoluteUrl("/hakkimizda", locale), type: "website" } };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  setRequestLocale(locale);
  const t = copy[locale];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.here, path: "/hakkimizda" }], locale)} />
      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">{t.home}</Link>{" "}› <span className="text-ink-strong">{t.here}</span></p>
        <header className="mt-6"><Badge variant="brand">{t.badge}</Badge><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{t.h1}</h1><p className="mt-4 text-lg text-ink-muted">{t.lede}</p></header>
        <Card className="mt-8 p-6 bg-brand-50/40"><p className="text-sm text-ink leading-relaxed"><strong className="text-ink-strong">{t.explainerTitle}</strong>{" "}{t.explainerBody}</p></Card>

        <article className="mt-12 prose prose-stone max-w-none"><h2>{t.approachH2}</h2><p>{t.approachBody}</p><h2>{t.principlesH2}</h2></article>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Card className="p-5"><ShieldCheck className="size-7 text-brand-600" /><h3 className="mt-3 font-semibold text-ink-strong">{t.p1t}</h3><p className="mt-1 text-sm text-ink-muted">{t.p1b}</p></Card>
          <Card className="p-5"><Eye className="size-7 text-brand-600" /><h3 className="mt-3 font-semibold text-ink-strong">{t.p2t}</h3><p className="mt-1 text-sm text-ink-muted">{t.p2b}</p></Card>
          <Card className="p-5"><FileSearch className="size-7 text-brand-600" /><h3 className="mt-3 font-semibold text-ink-strong">{t.p3t}</h3><p className="mt-1 text-sm text-ink-muted">{t.p3b}</p></Card>
        </div>

        <article className="mt-12 prose prose-stone max-w-none"><h2>{t.methodH2}</h2><p>{t.methodBody} <Link href="/metodoloji">{t.methodology}</Link>.</p><h2>{t.revenueH2}</h2><p>{t.revenueBody} <Link href="/reklam-aciklamasi">{t.disclosure}</Link>.</p><h2>{t.authorH2}</h2><p>{t.authorBody}</p><h2>{t.contactH2}</h2><p>{t.contactBody}</p></article>

        <Card className="mt-12 p-6 bg-brand-50/40 text-center"><Mail className="size-6 text-brand-600 mx-auto" /><p className="mt-3 font-semibold text-ink-strong">{t.ctaTitle}</p><p className="mt-1 text-sm text-ink-muted">{t.ctaBody}</p><Link href="/iletisim" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">{t.cta}</Link></Card>

        <section className="mt-12 flex flex-wrap gap-2 justify-center"><Link href="/metodoloji" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"><Scale className="size-3" /> {t.methodology}</Link><Link href="/reklam-aciklamasi" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">{t.disclosure}</Link><Link href="/gizlilik" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">{t.privacy}</Link></section>
      </Container>
    </>
  );
}
