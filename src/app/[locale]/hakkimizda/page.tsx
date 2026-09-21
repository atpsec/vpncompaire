import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Eye, Scale, FileSearch, Mail, CalendarCheck2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, editorialLeadSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates, type Locale } from "@/lib/site";
import { GoogleAdsense } from "@/components/analytics/google-adsense";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  tr: {
    title: "VPN Advisor Hakkında — Bilgilendirme ve Açık Sınırlar",
    desc: "VPN Advisor'ın amacı, kullandığı bilgi kaynakları, gelir modeli ve doğrulanamayabilecek noktalar. Site bir test laboratuvarı değildir.",
    home: "Ana sayfa",
    here: "Hakkımızda",
    badge: "Bilgilendirme projesi",
    h1: "VPN Advisor ne yapar?",
    lede: "VPN Advisor, VPN teknolojisini anlamayı ve sağlayıcıları doğrulanabilir özellikler üzerinden karşılaştırmayı kolaylaştıran bağımsız bir bilgi projesidir.",
    explainerTitle: "Önemli açıklama:",
    explainerBody: "Gerçek bir test laboratuvarı, kullanıcı yorum platformu veya sağlayıcı temsilcisi değiliz. Laboratuvarda ölçmediğimiz performansı test edilmiş gibi; yaşamadığımız deneyimi kullanıcı deneyimi gibi; hesaplamadığımız puanı editoryal değerlendirme gibi sunmayız.",
    approachH2: "Ne sunuyoruz?",
    approachBody: "İçerikler; resmi teknik belgeler, gizlilik politikaları, hizmet şartları, fiyatlandırma sayfaları, bağımsız denetimler ve güvenilir standart/platform kaynaklarından derlenebilen bilgileri açıklar. Her sayfanın aynı kapsamda veya aynı güncellikte olduğu iddia edilmez; okuyucu kritik bilgileri güncel resmî kaynaktan doğrulamalıdır.",
    principlesH2: "Temel ilkeler",
    p1t: "Kaynağı görünür kılma", p1b: "Kaynak bağlantısı, tarih veya belirsizlik notu varsa bunu sayfada görünür tutmayı amaçlarız.",
    p2t: "Reklamı içerikten ayırma", p2b: "Reklam ve affiliate ilişkileri, bir sağlayıcı iddiasını bağımsız kanıta dönüştürmez.",
    p3t: "Sınırları söyleme", p3b: "Laboratuvar testi, sertifika veya kişisel saha deneyimi olmayan bilgileri varmış gibi sunmayız.",
    methodH2: "Bilgileri nasıl okumalı?",
    methodBody: "Fiyat, gizlilik, denetim, protokol, platform desteği, yargı yetkisi ve ağ bilgileri gibi alanlar bilgilendirme amacıyla yan yana getirilebilir. Bu alanlar editör puanı, sertifika veya her sağlayıcı için tamamlanmış doğrulama anlamına gelmez.",
    revenueH2: "Gelir modeli",
    revenueBody: "Site Google AdSense reklamları ve bazı sağlayıcı ortaklık bağlantılarından gelir elde edebilir. Bu ilişkiler açıkça belirtilir. Amaç, içeriği reklam için çoğaltmak değil; özgün ve yararlı bir VPN bilgi kaynağı oluşturmaktır.",
    authorH2: "Yazarlık ve sorumluluk",
    authorBody: "VPN Advisor kişisel bir yayın projesidir; blog yazıları ve karşılaştırmalar kurumsal VPN Advisor imzasıyla yayınlanır. Yayın sorumlusu profili ve uzmanlık sınırları bu sayfada açıkça belirtilir.",
    profileH2: "Yayın sorumlusu",
    profileIntro: "VPN Advisor’ın yayın sorumlusu Ahmet Tepe’dir. Siber güvenlik alanındaki belgelendirilmiş geçmişini, sınırları açık bir VPN bilgilendirme projesine taşır.",
    profileRole: "Siber güvenlik uygulayıcısı · VPN Advisor yayın sorumlusu",
    profileBackground: "Belgelendirilmiş çalışma ve eğitim geçmişi; Security Awareness, phishing simülasyonları, OSINT araştırmaları, zafiyet taramaları, raporlama, DevSecOps/CI/CD güvenlik kontrolleri ve olay müdahalesi desteğini kapsar.",
    profileCredentialsTitle: "Belgelerde doğrulanan eğitim ve sertifikalar",
    profileCredentials: [
      "CompTIA Security+ CE — sertifika kaydında geçerlilik tarihi 31 Mayıs 2029 olarak belirtilir.",
      "Cyber Security Engineer — 1.960 saatlik eğitim; belge kaydında çok iyi sonuç.",
      "ISO/IEC 27001:2022 Auditor/Lead Auditor Course.",
      "ISC2 yetkili Coursera Certified in Cybersecurity uzmanlık programı.",
    ],
    profileScope: "Bu geçmiş, VPN sağlayıcıları üzerinde laboratuvar testi yapıldığı veya her makalenin kişisel saha deneyimine dayandığı anlamına gelmez. Teknik iddialar yine resmi belgeler, bağımsız kayıtlar ve görünür kaynak tarihleriyle değerlendirilir.",
    accountabilityH2: "Yayın sorumluluğu",
    accountabilityBody: "VPN Advisor kurumsal yayın imzasıdır. Kimliği ve uzmanlığı doğrulanmamış kişilere uzman unvanı vermeyiz. Ticari ilişkiler karşılaştırma alanlarını, kaynak sınıflandırmasını veya düzeltme kararlarını değiştirmez.",
    accountabilityReviewed: "Yayın politikası son kontrol: 31 Ağustos 2026",
    accountabilityEvidence: "Kanıt standardı: birincil kaynaklar, görünür kontrol tarihleri ve belirsizlik notları.",
    accountabilityCorrections: "Düzeltmeler: kaynakla desteklenen bildirimler incelenebilir; sabit bir yanıt veya güncelleme takvimi taahhüt etmiyoruz.",
    contactH2: "Düzeltme ve geri bildirim",
    contactBody: "Yanlış, eski veya eksik bir bilgi fark ederseniz iletişim sayfasından bildirebilirsiniz. Doğrulanabilir düzeltmeler içerik güncellemelerine yansıtılır.",
    ctaTitle: "Bir bilgi hatası mı buldunuz?",
    ctaBody: "Kaynağıyla birlikte iletin; kontrol edip gerektiğinde düzeltelim.",
    cta: "İletişime geç",
    methodology: "Kaynaklar ve sınırlar",
    disclosure: "Reklam açıklaması",
    privacy: "Gizlilik",
  },
  en: {
    title: "About VPN Advisor — Source-Based VPN Information and Comparison Site",
    desc: "VPN Advisor's purpose, information sources, revenue model and explicit limits. The site is not a testing laboratory.",
    home: "Home", here: "About", badge: "Informational project", h1: "What does VPN Advisor do?",
    lede: "VPN Advisor is an independent information project designed to make VPN technology easier to understand and providers easier to compare using verifiable features.",
    explainerTitle: "Important disclosure:", explainerBody: "We are not a testing laboratory, user-review platform or VPN provider representative. We do not present unmeasured performance as tested, unexperienced claims as first-hand experience, or invented scores as editorial ratings.",
    approachH2: "What we provide", approachBody: "We explain information that can be gathered from official technical documentation, privacy policies, terms, pricing pages, independent audits and trustworthy standards/platform sources. Coverage and freshness can differ by page, so time-sensitive facts should be checked again.",
    principlesH2: "Core principles", p1t: "Show the source", p1b: "When a source link, date or uncertainty note is available, we aim to keep it visible.", p2t: "Separate advertising", p2b: "Advertising and affiliate relationships do not turn a provider claim into independent proof.", p3t: "State the limits", p3b: "We do not present missing laboratory tests, certifications or first-hand experience as if they existed.",
    methodH2: "How should you read the information?", methodBody: "Pages may place pricing, privacy, audits, protocols, platform support, jurisdiction and network information side by side. These fields are informational; they are not an editorial score, certification or completed verification for every provider.",
    revenueH2: "Revenue model", revenueBody: "The site may earn revenue from Google AdSense and some provider affiliate links. These relationships are disclosed. The objective is to build original, useful VPN reference content rather than pages created primarily to show ads.",
    authorH2: "Authorship and responsibility", authorBody: "VPN Advisor is a personal publishing project; blog posts and comparisons are published under the VPN Advisor byline. The publishing lead's background and the limits of the site's expertise are stated openly on this page.",
    profileH2: "Publishing lead",
    profileIntro: "Ahmet Tepe is VPN Advisor's publishing lead. He brings documented cybersecurity training and practical experience to an informational VPN project with explicit limits.",
    profileRole: "Cybersecurity practitioner · VPN Advisor publishing lead",
    profileBackground: "The documented work and training background covers security awareness, phishing simulations, OSINT research, vulnerability scanning, reporting, DevSecOps/CI/CD security checks and incident-response support.",
    profileCredentialsTitle: "Training and credentials documented in the records",
    profileCredentials: [
      "CompTIA Security+ CE — the certificate record states validity through 31 May 2029.",
      "Cyber Security Engineer — 1,960 hours of training; the record states a very good result.",
      "ISO/IEC 27001:2022 Auditor/Lead Auditor Course.",
      "ISC2-authorized Coursera Certified in Cybersecurity specialization.",
    ],
    profileScope: "This background does not mean that VPN providers are laboratory-tested here or that every article is based on first-hand field experience. Technical claims are still assessed through official documentation, independent records and visible source dates.",
    accountabilityH2: "Publishing accountability",
    accountabilityBody: "VPN Advisor is an institutional publishing byline. We do not assign expert titles to people whose identity and credentials have not been verified. Commercial relationships do not change comparison fields, source classification or correction decisions.",
    accountabilityReviewed: "Publishing policy reviewed: August 31, 2026",
    accountabilityEvidence: "Evidence standard: primary sources, visible verification dates and explicit uncertainty notes.",
    accountabilityCorrections: "Corrections: source-backed reports may be reviewed; no fixed response or update schedule is promised.",
    contactH2: "Corrections and feedback", contactBody: "If you find outdated, incomplete or incorrect information, contact us. Verifiable corrections are reviewed and reflected in content updates.",
    ctaTitle: "Found an information error?", ctaBody: "Send the URL and supporting source; we may review it.", cta: "Contact us", methodology: "Sources and limitations", disclosure: "Advertising disclosure", privacy: "Privacy",
  },
  de: {
    title: "Über VPN Advisor — Quellenbasierte VPN-Informations- und Vergleichsseite",
    desc: "Zweck, Informationsquellen, Einnahmemodell und klare Grenzen von VPN Advisor. Die Website ist kein Testlabor.",
    home: "Startseite", here: "Über uns", badge: "Informationsprojekt", h1: "Was macht VPN Advisor?",
    lede: "VPN Advisor ist ein unabhängiges Informationsprojekt, das VPN-Technologie verständlicher macht und Anbieter anhand überprüfbarer Merkmale vergleichbar darstellt.",
    explainerTitle: "Wichtiger Hinweis:", explainerBody: "Wir sind weder Testlabor noch Nutzerbewertungsplattform oder Vertreter eines VPN-Anbieters. Nicht gemessene Leistung wird nicht als getestet dargestellt, nicht gemachte Erfahrungen nicht als eigene Erfahrung und erfundene Punktzahlen nicht als redaktionelle Bewertung.",
    approachH2: "Was wir anbieten", approachBody: "Wir erklären Informationen aus offizieller technischer Dokumentation, Datenschutzrichtlinien, Bedingungen, Preisangaben, unabhängigen Audits und vertrauenswürdigen Standard-/Plattformquellen. Umfang und Aktualität können sich je Seite unterscheiden; zeitkritische Angaben sollten erneut geprüft werden.",
    principlesH2: "Grundprinzipien", p1t: "Quelle zeigen", p1b: "Wenn eine Quellenangabe, ein Datum oder ein Unsicherheitshinweis vorhanden ist, soll er sichtbar bleiben.", p2t: "Werbung trennen", p2b: "Werbung und Affiliate-Beziehungen machen eine Anbieterangabe nicht zu einem unabhängigen Beleg.", p3t: "Grenzen nennen", p3b: "Nicht durchgeführte Labortests, Zertifizierungen oder eigene Erfahrungen werden nicht als vorhanden dargestellt.",
    methodH2: "Wie sollte man die Informationen lesen?", methodBody: "Seiten können Preise, Datenschutz, Audits, Protokolle, Plattformunterstützung, Rechtsraum und Netzwerkinformationen nebeneinanderstellen. Diese Felder dienen der Information; sie sind keine redaktionelle Punktzahl, Zertifizierung oder vollständige Prüfung jedes Anbieters.",
    revenueH2: "Einnahmemodell", revenueBody: "Die Website kann Einnahmen über Google AdSense und einige Affiliate-Links erzielen. Diese Beziehungen werden offengelegt. Ziel sind eigenständige, nützliche VPN-Referenzinhalte und keine primär für Werbung erzeugten Seiten.",
    authorH2: "Autorschaft und Verantwortung", authorBody: "VPN Advisor ist ein persönliches Publikationsprojekt; Blogartikel und Vergleiche erscheinen unter der Publikationssignatur VPN Advisor. Der Hintergrund der Veröffentlichungsverantwortung und die Grenzen der fachlichen Aussagen werden offen dargestellt.",
    profileH2: "Veröffentlichungsverantwortung",
    profileIntro: "Ahmet Tepe ist für die Veröffentlichung bei VPN Advisor verantwortlich. Er verbindet dokumentierte Cybersecurity-Ausbildung und Praxiserfahrung mit einem VPN-Informationsprojekt mit klaren Grenzen.",
    profileRole: "Cybersecurity-Praktiker · Veröffentlichungsverantwortung bei VPN Advisor",
    profileBackground: "Der dokumentierte Hintergrund umfasst Security Awareness, Phishing-Simulationen, OSINT-Recherche, Schwachstellenscans, Berichterstattung, DevSecOps/CI/CD-Sicherheitsprüfungen und Unterstützung bei der Vorfallbearbeitung.",
    profileCredentialsTitle: "In den Unterlagen dokumentierte Ausbildungen und Nachweise",
    profileCredentials: [
      "CompTIA Security+ CE — im Zertifikatsnachweis bis 31. Mai 2029 gültig.",
      "Cyber Security Engineer — 1.960 Unterrichtseinheiten; der Nachweis nennt ein sehr gutes Ergebnis.",
      "ISO/IEC 27001:2022 Auditor/Lead Auditor Course.",
      "Von ISC2 autorisierte Coursera-Spezialisierung Certified in Cybersecurity.",
    ],
    profileScope: "Dieser Hintergrund bedeutet nicht, dass VPN-Anbieter hier im Labor getestet werden oder jeder Artikel auf eigener Felderfahrung beruht. Technische Aussagen werden weiterhin anhand offizieller Dokumente, unabhängiger Nachweise und sichtbarer Quellenangaben bewertet.",
    accountabilityH2: "Veröffentlichungsverantwortung",
    accountabilityBody: "VPN Advisor ist eine institutionelle Publikationszeile. Wir vergeben keine Expertenbezeichnungen an Personen, deren Identität und Qualifikation nicht überprüft wurden. Kommerzielle Beziehungen ändern weder Vergleichsfelder noch Quellenklassifizierung oder Korrekturentscheidungen.",
    accountabilityReviewed: "Veröffentlichungsrichtlinie geprüft: 31. August 2026",
    accountabilityEvidence: "Nachweisstandard: Primärquellen, sichtbare Prüfdaten und ausdrückliche Hinweise auf Unsicherheit.",
    accountabilityCorrections: "Korrekturen: quellenbasierte Hinweise können geprüft werden; ein fester Antwort- oder Aktualisierungsplan wird nicht versprochen.",
    contactH2: "Korrekturen und Feedback", contactBody: "Wenn Sie veraltete, unvollständige oder falsche Informationen finden, können Sie uns kontaktieren. Nachprüfbare Korrekturen werden geprüft und eingearbeitet.",
    ctaTitle: "Einen Informationsfehler gefunden?", ctaBody: "Senden Sie URL und Beleg; wir können ihn prüfen.", cta: "Kontakt", methodology: "Quellen und Grenzen", disclosure: "Werbehinweis", privacy: "Datenschutz",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = copy[locale];
  return { title: t.title, description: t.desc, alternates: localizedAlternates("/about", locale), openGraph: { title: t.title, description: t.desc, url: absoluteUrl("/about", locale), type: "website" } };
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  setRequestLocale(locale);
  const t = copy[locale];

  return (
    <>
      <GoogleAdsense />
      <JsonLd data={breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.here, path: "/about" }], locale)} />
      <JsonLd data={editorialLeadSchema(locale)} />
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

        <Card className="mt-8 border-brand-200 bg-brand-50/30 p-6">
          <div className="flex items-start gap-3">
            <CalendarCheck2 className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-semibold text-ink-strong">{t.accountabilityH2}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink">{t.accountabilityBody}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                <li><strong className="text-ink-strong">{t.accountabilityReviewed}</strong></li>
                <li>{t.accountabilityEvidence}</li>
                <li>{t.accountabilityCorrections} <Link href="/contact" className="font-medium text-brand-700 hover:underline">{t.cta}</Link>.</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="mt-8 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-6 shrink-0 text-brand-700" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-semibold text-ink-strong">{t.profileH2}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink">{t.profileIntro}</p>
              <p className="mt-3 text-sm font-semibold text-ink-strong">{t.profileRole}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.profileBackground}</p>
              <h3 className="mt-5 text-base font-semibold text-ink-strong">{t.profileCredentialsTitle}</h3>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-ink-muted">
                {t.profileCredentials.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.profileScope}</p>
            </div>
          </div>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none"><h2>{t.methodH2}</h2><p>{t.methodBody} <Link href="/methodology">{t.methodology}</Link>.</p><h2>{t.revenueH2}</h2><p>{t.revenueBody} <Link href="/affiliate-disclosure">{t.disclosure}</Link>.</p><h2>{t.authorH2}</h2><p>{t.authorBody}</p><h2>{t.contactH2}</h2><p>{t.contactBody}</p></article>

        <Card className="mt-12 p-6 bg-brand-50/40 text-center"><Mail className="size-6 text-brand-600 mx-auto" /><p className="mt-3 font-semibold text-ink-strong">{t.ctaTitle}</p><p className="mt-1 text-sm text-ink-muted">{t.ctaBody}</p><Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">{t.cta}</Link></Card>

        <section className="mt-12 flex flex-wrap gap-2 justify-center"><Link href="/methodology" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"><Scale className="size-3" /> {t.methodology}</Link><Link href="/affiliate-disclosure" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">{t.disclosure}</Link><Link href="/privacy-policy" className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">{t.privacy}</Link></section>
      </Container>
    </>
  );
}
