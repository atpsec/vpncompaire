import { Tag, ShieldCheck, AlertTriangle, FileSearch } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

type BodyCopy = {
  home: string; here: string; badge: string; title: string; updated: string;
  plainTitle: string; plainBody: string;
  revenueTitle: string; revenueBody: string;
  linksTitle: string; linksBody: string;
  independenceTitle: string; independenceBody: string;
  sourceTitle: string; sourceBody: string; sourceItems: string[];
  adsTitle: string; adsBody: string;
  correctionTitle: string; correctionBody: string;
  reminder: string; reminderBody: string;
};

const COPY: Record<"tr" | "en" | "de", BodyCopy> = {
  tr: {
    home: "Ana sayfa", here: "Reklam Açıklaması", badge: "Reklam & gelir açıklaması", title: "Reklam Açıklaması", updated: "Son güncelleme: 8 Ağustos 2026",
    plainTitle: "Net açıklama", plainBody: `${siteConfig.name} Google AdSense reklamlarından gelir elde edebilir. Bazı sağlayıcı bağlantıları ileride ortaklık bağlantısı olabilir. Site, bu ticari ilişkileri gerçek olmayan test, editör veya puan iddialarıyla desteklemez.`,
    revenueTitle: "Gelir modelimiz", revenueBody: "Google AdSense, sayfalarda otomatik reklam gösterebilir. Reklamın görünmesi bir VPN sağlayıcısını önerdiğimiz anlamına gelmez. Kullanıcı verisini satmıyoruz. AdSense kullanımı Google'ın ve sitemizin çerez/izin kurallarına tabidir.",
    linksTitle: "Sağlayıcı bağlantıları", linksBody: "Resmi site butonları sağlayıcının kendi alan adına yönlenir. Bir bağlantı ortaklık takibi içeriyorsa bunu sponsored/nofollow niteliğiyle işaretlemeyi ve ticari ilişkiyi açıkça belirtmeyi hedefliyoruz. Fiyat ve koşullar satın alma öncesinde resmi siteden doğrulanmalıdır.",
    independenceTitle: "İçerik bağımsızlığı ne demek?", independenceBody: "Artık editoryal puanlama veya yapılmamış laboratuvar testi iddiasında bulunmuyoruz. Karşılaştırma alanları; gizlilik politikası, bağımsız denetimler, şirket/yargı bilgisi, teknik dokümantasyon, cihaz desteği, fiyat ve iade şartları gibi kaynaklanabilir verilere dayanır.",
    sourceTitle: "İçerik hangi kaynaklara dayanır?", sourceBody: "Kaynak türünü mümkün olduğunca açık tutarız.", sourceItems: ["Resmi sağlayıcı teknik dokümantasyonu ve gizlilik politikaları", "Yayınlanmış bağımsız denetim ve güvenlik raporları", "Resmi fiyatlandırma, yenileme ve iade koşulları", "Uygulama mağazası kayıtları ve kamuya açık teknik belgeler", "Gerekli olduğunda güvenilir ikincil teknik kaynaklar"],
    adsTitle: "Reklam çerezleri ve kişiselleştirme", adsBody: "Google AdSense çerez ve benzeri teknolojiler kullanabilir. EEA, Birleşik Krallık ve İsviçre gibi bölgelerde gerekli izinler consent sistemi üzerinden yönetilir. Ayrıntılar için çerez ve gizlilik politikalarına bakın.",
    correctionTitle: "Bir hata görürseniz", correctionBody: "Eski fiyat, hatalı özellik veya zayıf kaynak görürseniz iletişim sayfasından sayfa bağlantısını ve mümkünse kaynağı gönderin. Düzeltmeler kaynak üzerinden yeniden kontrol edilir.",
    reminder: "Hatırlatma", reminderBody: "VPN özellikleri ve fiyatları değişebilir. Bu site bilgi amaçlıdır; satın alma veya hukuki karar öncesinde resmi kaynakları doğrulayın.",
  },
  en: {
    home: "Home", here: "Advertising disclosure", badge: "Advertising & revenue disclosure", title: "Advertising disclosure", updated: "Last updated: 8 August 2026",
    plainTitle: "In plain terms", plainBody: `${siteConfig.name} may earn revenue from Google AdSense. Some provider links may become affiliate links in the future. We do not support commercial relationships with invented testing, editor identities or scores.`,
    revenueTitle: "Our revenue model", revenueBody: "Google AdSense may place ads automatically on pages. An ad appearing does not mean we endorse the VPN provider shown. We do not sell user data. AdSense use is subject to Google's policies and our consent/cookie controls.",
    linksTitle: "Provider links", linksBody: "Official-site buttons lead to the provider's own domain. If a link includes affiliate tracking, we aim to mark it as sponsored/nofollow and disclose the commercial relationship. Pricing and terms should be verified at the official site before purchase.",
    independenceTitle: "What does content independence mean?", independenceBody: "We no longer claim editorial scoring or laboratory tests that did not happen. Comparison fields are based on sourceable information such as privacy policies, independent audits, company/jurisdiction data, technical documentation, device support, pricing and refund terms.",
    sourceTitle: "What sources does the content use?", sourceBody: "We try to make the source type clear.", sourceItems: ["Official provider technical documentation and privacy policies", "Published independent audit and security reports", "Official pricing, renewal and refund terms", "App-store listings and public technical documentation", "Reliable secondary technical sources when necessary"],
    adsTitle: "Advertising cookies and personalisation", adsBody: "Google AdSense may use cookies and similar technologies. Where required, including the EEA, UK and Switzerland, consent is handled through the site's consent system. See the cookie and privacy policies for details.",
    correctionTitle: "If you find an error", correctionBody: "If you find outdated pricing, an incorrect feature or weak sourcing, send the page and source through the contact page. Corrections are rechecked against evidence.",
    reminder: "Reminder", reminderBody: "VPN features and prices change. This site is informational; verify official sources before a purchase or legal decision.",
  },
  de: {
    home: "Startseite", here: "Werbehinweis", badge: "Werbung & Einnahmen", title: "Werbehinweis", updated: "Aktualisiert: 8. August 2026",
    plainTitle: "Kurz gesagt", plainBody: `${siteConfig.name} kann Einnahmen aus Google AdSense erzielen. Einige Anbieterlinks können künftig Affiliate-Links sein. Kommerzielle Beziehungen werden nicht mit erfundenen Tests, Redaktionsidentitäten oder Bewertungen begründet.`,
    revenueTitle: "Unser Einnahmemodell", revenueBody: "Google AdSense kann Anzeigen automatisch auf Seiten platzieren. Das Erscheinen einer Anzeige bedeutet keine Empfehlung des gezeigten VPN-Anbieters. Wir verkaufen keine Nutzerdaten. AdSense unterliegt den Google-Richtlinien und unseren Einwilligungs-/Cookie-Einstellungen.",
    linksTitle: "Anbieterlinks", linksBody: "Buttons zur offiziellen Website führen auf die Domain des Anbieters. Enthält ein Link Affiliate-Tracking, soll er als sponsored/nofollow gekennzeichnet und die kommerzielle Beziehung offengelegt werden. Preise und Bedingungen sollten vor dem Kauf auf der offiziellen Website geprüft werden.",
    independenceTitle: "Was bedeutet inhaltliche Unabhängigkeit?", independenceBody: "Wir behaupten keine redaktionellen Bewertungen oder Labortests, die nicht stattgefunden haben. Vergleichsfelder basieren auf belegbaren Angaben wie Datenschutzrichtlinien, unabhängigen Audits, Unternehmens-/Zuständigkeitsdaten, technischer Dokumentation, Geräteunterstützung, Preisen und Erstattung.",
    sourceTitle: "Welche Quellen nutzt der Inhalt?", sourceBody: "Die Quellenart soll möglichst klar erkennbar sein.", sourceItems: ["Offizielle technische Dokumentation und Datenschutzrichtlinien", "Veröffentlichte unabhängige Audit- und Sicherheitsberichte", "Offizielle Preis-, Verlängerungs- und Erstattungsbedingungen", "App-Store-Einträge und öffentliche technische Dokumentation", "Zuverlässige sekundäre Technikquellen bei Bedarf"],
    adsTitle: "Werbe-Cookies und Personalisierung", adsBody: "Google AdSense kann Cookies und ähnliche Technologien verwenden. Wo erforderlich, etwa im EWR, Vereinigten Königreich und der Schweiz, wird Einwilligung über das Consent-System der Website verwaltet. Details finden Sie in Cookie- und Datenschutzrichtlinie.",
    correctionTitle: "Wenn Sie einen Fehler finden", correctionBody: "Bei veralteten Preisen, falschen Funktionen oder schwachen Quellen senden Sie Seite und Quelle über die Kontaktseite. Korrekturen werden anhand der Belege erneut geprüft.",
    reminder: "Hinweis", reminderBody: "VPN-Funktionen und Preise ändern sich. Diese Website dient der Information; prüfen Sie offizielle Quellen vor Kauf- oder Rechtsentscheidungen.",
  },
};

function DisclosureBody({ locale }: { locale: "tr" | "en" | "de" }) {
  const c = COPY[locale];
  return <>
    <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">{c.home}</Link>{" "}› <span className="text-ink-strong">{c.here}</span></p>
    <header className="mt-6"><Badge variant="brand"><Tag className="size-3" /> {c.badge}</Badge><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{c.title}</h1><p className="mt-3 text-sm text-ink-muted">{c.updated}</p></header>
    <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40"><div className="flex items-start gap-3"><Tag className="size-5 text-accent-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{c.plainTitle}</p><p className="mt-1 text-sm text-ink leading-relaxed">{c.plainBody}</p></div></div></Card>
    <article className="mt-10 prose prose-stone max-w-none"><h2>{c.revenueTitle}</h2><p>{c.revenueBody}</p><h2>{c.linksTitle}</h2><p>{c.linksBody}</p><h2>{c.independenceTitle}</h2><p>{c.independenceBody}</p><h2>{c.sourceTitle}</h2><p>{c.sourceBody}</p><ul>{c.sourceItems.map((item) => <li key={item}>{item}</li>)}</ul><p><Link href="/metodoloji">{locale === "tr" ? "Araştırma ve kaynak politikası" : locale === "de" ? "Recherche- und Quellenrichtlinie" : "Research and source policy"}</Link></p><h2>{c.adsTitle}</h2><p>{c.adsBody}</p><p><Link href="/cerez-politikasi">Cookie</Link> · <Link href="/gizlilik">Privacy</Link></p><h2>{c.correctionTitle}</h2><p>{c.correctionBody}</p></article>
    <Card className="mt-12 p-6"><div className="flex items-start gap-3"><FileSearch className="size-5 text-brand-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{c.independenceTitle}</p><p className="mt-1 text-sm text-ink leading-relaxed">{c.independenceBody}</p></div></div></Card>
    <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40"><div className="flex items-start gap-3"><AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{c.reminder}</p><p className="mt-1 text-sm text-ink leading-relaxed">{c.reminderBody}</p></div></div></Card>
  </>;
}

export function TrBody() { return <DisclosureBody locale="tr" />; }
export function EnBody() { return <DisclosureBody locale="en" />; }
export function DeBody() { return <DisclosureBody locale="de" />; }
