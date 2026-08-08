import { Tag, ShieldCheck, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

function DisclosureBody({ locale }: { locale: "tr" | "en" | "de" }) {
  const copy = {
    tr: {
      home: "Ana sayfa", title: "Reklam Açıklaması", badge: "Reklam & Gelir Açıklaması", updated: "Son güncelleme: Ağustos 2026",
      plain: "Net açıklama", plainBody: `${siteConfig.name}, Google AdSense reklamlarından ve bazı VPN sağlayıcılarının ortaklık programlarından gelir elde edebilir. Bir reklamın veya affiliate bağlantının bulunması, bir teknik bilgiyi doğrulanmış hale getirmez ve sağlayıcı profillerine editoryal puan kazandırmaz.`,
      revenueH: "Gelir modelimiz nasıl çalışıyor?", revenueP: "Google AdSense sayfalarda reklam gösterebilir. Bazı sağlayıcı bağlantıları, kullanıcı resmi siteye gidip uygun bir işlem yaptığında komisyon oluşturabilir. Bu site kullanıcı verisini satmayı bir gelir modeli olarak kullanmaz.",
      linksH: "VPN bağlantıları ve ortaklık", linksP: "Resmi site butonları sağlayıcıların kendi web sitelerine gider. Affiliate ilişkisi bulunan bağlantılar uygun rel öznitelikleriyle işaretlenir. Sağlayıcıların ödeme yapması veya reklam vermesi, doğrulanabilir özellik verisini değiştirmez.",
      independenceH: "İçerik bağımsızlığı", independenceP: "VPN Advisor bir laboratuvar değerlendirme veya gerçek kullanıcı inceleme platformu değildir. Bu nedenle reklam gelirinden bağımsız olduğunu iddia eden yapay puanlar ya da test sıralamaları kullanmak yerine; resmi belgeler, bağımsız denetimler ve doğrulanabilir kaynaklar üzerinden bilgi sunar.",
      sourcesH: "İçerik hangi kaynaklara dayanır?", sources: ["Sağlayıcıların resmi teknik belgeleri, gizlilik politikaları, hizmet şartları ve fiyat sayfaları.", "Bağımsız güvenlik ve no-logs denetimleri.", "NIST, IETF, Apple, Google ve Microsoft gibi standart veya platform kaynakları.", "Gerekli olduğunda bağlam sağlayan güvenilir ikincil kaynaklar."],
      adsH: "AdSense, çerezler ve kullanıcı deneyimi", adsP: "Google AdSense çerez ve benzeri teknolojiler kullanabilir. Analitik ve izin gerektiren depolama, sitedeki consent sistemi üzerinden yönetilir. Reklam yerleşimi, içerikten daha baskın olacak veya kullanıcıyı yanlışlıkla tıklamaya yönlendirecek şekilde tasarlanmamalıdır.",
      guaranteeH: "Satın alma ve güncellik", guaranteeP: "Fiyatlar, kampanyalar, sunucu bilgileri ve özellikler değişebilir. Satın almadan önce sağlayıcının resmi sayfasındaki güncel fiyatı, yenileme koşullarını ve hizmet şartlarını kontrol edin.",
      sourceLink: "Kaynak temelli metodolojiyi oku", legal: "Yasal uyarı", reminder: "Hatırlatma", reminderBody: "Bu site bilgilendirme amaçlıdır; güvenlik, hukuk veya finans danışmanlığı sunmaz.",
    },
    en: {
      home: "Home", title: "Advertising disclosure", badge: "Advertising & revenue disclosure", updated: "Last updated: August 2026",
      plain: "In plain terms", plainBody: `${siteConfig.name} may earn revenue from Google AdSense ads and affiliate programs offered by some VPN providers. An ad or affiliate relationship does not make a technical claim verified and does not give a provider an editorial score.`,
      revenueH: "How our revenue model works", revenueP: "Google AdSense may display ads on site pages. Some provider links can generate a commission when a user visits an official site and completes an eligible action. Selling user data is not the site's revenue model.",
      linksH: "VPN links and affiliate programs", linksP: "Official-site buttons lead to provider websites. Affiliate links are marked with appropriate rel attributes. A provider paying commission or advertising does not change verifiable feature information.",
      independenceH: "Content independence", independenceP: "VPN Advisor is not a laboratory rating service or genuine-user review platform. Rather than using invented scores or test rankings, it organizes official documentation, independent audits and verifiable sources.",
      sourcesH: "What sources support the content?", sources: ["Provider technical documentation, privacy policies, terms and pricing pages.", "Independent security and no-logs audits.", "Standards and platform documentation from bodies such as NIST, IETF, Apple, Google and Microsoft.", "Credible secondary sources when additional context is useful."],
      adsH: "AdSense, cookies and user experience", adsP: "Google AdSense may use cookies and similar technologies. Analytics and consent-dependent storage are managed through the site's consent system. Ads should not outweigh the page's content or be positioned to encourage accidental clicks.",
      guaranteeH: "Purchasing and freshness", guaranteeP: "Prices, promotions, server information and features can change. Before purchasing, verify current pricing, renewal terms and service conditions on the provider's official website.",
      sourceLink: "Read the source-based methodology", legal: "Legal notice", reminder: "Reminder", reminderBody: "This site is informational and does not provide security, legal or financial advice.",
    },
    de: {
      home: "Startseite", title: "Werbehinweis", badge: "Werbe- & Einnahmenhinweis", updated: "Zuletzt aktualisiert: August 2026",
      plain: "Kurz erklärt", plainBody: `${siteConfig.name} kann Einnahmen über Google AdSense und Affiliate-Programme einiger VPN-Anbieter erzielen. Eine Anzeige oder Affiliate-Beziehung macht eine technische Aussage nicht automatisch verifiziert und führt zu keiner redaktionellen Punktzahl.`,
      revenueH: "Wie unser Einnahmemodell funktioniert", revenueP: "Google AdSense kann Anzeigen auf den Seiten darstellen. Einige Anbieterlinks können eine Provision auslösen, wenn ein Nutzer die offizielle Website besucht und eine qualifizierte Aktion ausführt. Der Verkauf von Nutzerdaten ist kein Einnahmemodell dieser Website.",
      linksH: "VPN-Links und Affiliate-Programme", linksP: "Schaltflächen zur offiziellen Website führen auf Anbieter-Websites. Affiliate-Links werden mit geeigneten rel-Attributen gekennzeichnet. Provisionen oder Werbung verändern keine überprüfbaren Funktionsinformationen.",
      independenceH: "Unabhängigkeit der Inhalte", independenceP: "VPN Advisor ist weder ein Labor-Bewertungsdienst noch eine Plattform für echte Nutzerbewertungen. Statt erfundener Punktzahlen oder Testranglisten werden offizielle Dokumente, unabhängige Audits und überprüfbare Quellen geordnet dargestellt.",
      sourcesH: "Auf welchen Quellen basieren die Inhalte?", sources: ["Technische Dokumentation, Datenschutzrichtlinien, Bedingungen und Preisseiten der Anbieter.", "Unabhängige Sicherheits- und No-Logs-Audits.", "Standard- und Plattformdokumentation von NIST, IETF, Apple, Google, Microsoft und ähnlichen Stellen.", "Seriöse Sekundärquellen, wenn zusätzlicher Kontext sinnvoll ist."],
      adsH: "AdSense, Cookies und Nutzererlebnis", adsP: "Google AdSense kann Cookies und ähnliche Technologien verwenden. Analyse- und einwilligungsabhängige Speicherung wird über das Consent-System der Website gesteuert. Anzeigen sollten den Inhalt nicht überwiegen und keine versehentlichen Klicks fördern.",
      guaranteeH: "Kauf und Aktualität", guaranteeP: "Preise, Aktionen, Serverinformationen und Funktionen können sich ändern. Prüfen Sie vor dem Kauf aktuelle Preise, Verlängerungsbedingungen und Servicebedingungen auf der offiziellen Anbieterwebsite.",
      sourceLink: "Quellenbasierte Methodik lesen", legal: "Rechtlicher Hinweis", reminder: "Hinweis", reminderBody: "Diese Website dient der Information und bietet keine Sicherheits-, Rechts- oder Finanzberatung.",
    },
  } as const;
  const t = copy[locale];

  return (
    <>
      <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">{t.home}</Link>{" "}› <span className="text-ink-strong">{t.title}</span></p>
      <header className="mt-6"><Badge variant="brand"><Tag className="size-3" /> {t.badge}</Badge><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{t.title}</h1><p className="mt-3 text-sm text-ink-muted">{t.updated}</p></header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40"><div className="flex items-start gap-3"><Tag className="size-5 text-accent-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{t.plain}</p><p className="mt-1 text-sm text-ink leading-relaxed">{t.plainBody}</p></div></div></Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>{t.revenueH}</h2><p>{t.revenueP}</p>
        <h2>{t.linksH}</h2><p>{t.linksP}</p>
        <h2>{t.independenceH}</h2><p>{t.independenceP}</p>
        <h2>{t.sourcesH}</h2><ul>{t.sources.map((item) => <li key={item}>{item}</li>)}</ul><p><Link href="/metodoloji">{t.sourceLink}</Link>.</p>
        <h2>{t.adsH}</h2><p>{t.adsP}</p><p><Link href="/cerez-politikasi">Cookie / consent</Link> · <Link href="/gizlilik">Privacy</Link></p>
        <h2>{t.guaranteeH}</h2><p>{t.guaranteeP}</p>
      </article>

      <Card className="mt-12 p-6"><div className="flex items-start gap-3"><ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{t.sourceLink}</p><p className="mt-1 text-sm text-ink leading-relaxed"><Link href="/metodoloji" className="text-brand-700 underline">/metodoloji</Link></p></div></div></Card>
      <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40"><div className="flex items-start gap-3"><AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{t.reminder}</p><p className="mt-1 text-sm text-ink leading-relaxed">{t.reminderBody} <Link href="/yasal-uyari" className="text-brand-700 underline">{t.legal}</Link>.</p></div></div></Card>
    </>
  );
}

export function TrBody() { return <DisclosureBody locale="tr" />; }
export function EnBody() { return <DisclosureBody locale="en" />; }
export function DeBody() { return <DisclosureBody locale="de" />; }
