import { Tag, ShieldCheck, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

export function EnBody() {
  const t = {
      home: "Home", title: "Advertising disclosure", badge: "Advertising & revenue disclosure", updated: "Last updated: August 2026",
      plain: "In plain terms", plainBody: `${siteConfig.name} may earn revenue from Google AdSense ads and affiliate programs offered by some VPN providers. An ad or affiliate relationship does not make a technical claim verified and does not give a provider an editorial score.`,
      revenueH: "How our revenue model works", revenueP: "Google AdSense may display ads on site pages. Some provider links can generate a commission when a user visits an official site and completes an eligible action. Selling user data is not the site's revenue model.",
      linksH: "VPN links and affiliate programs", linksP: "Official-site buttons lead to provider websites. Affiliate links are marked with appropriate rel attributes. A provider paying commission or advertising does not change verifiable feature information.",
      independenceH: "Content independence", independenceP: "VPN Advisor is not a laboratory rating service or genuine-user review platform. Rather than using invented scores or test rankings, it organizes official documentation, independent audits and verifiable sources.",
      sourcesH: "What sources support the content?", sources: ["Provider technical documentation, privacy policies, terms and pricing pages.", "Independent security and no-logs audits.", "Standards and platform documentation from bodies such as NIST, IETF, Apple, Google and Microsoft.", "Credible secondary sources when additional context is useful."],
      adsH: "AdSense, cookies and user experience", adsP: "Google AdSense may use cookies and similar technologies. Analytics and consent-dependent storage are managed through the site's consent system. Ads should not outweigh the page's content or be positioned to encourage accidental clicks.",
      guaranteeH: "Purchasing and freshness", guaranteeP: "Prices, promotions, server information and features can change. Before purchasing, verify current pricing, renewal terms and service conditions on the provider's official website.",
      sourceLink: "Read the source-based methodology", legal: "Legal notice", reminder: "Reminder", reminderBody: "This site is informational and does not provide security, legal or financial advice.",
    };

  return (
    <>
      <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">{t.home}</Link>{" "}› <span className="text-ink-strong">{t.title}</span></p>
      <header className="mt-6"><Badge variant="brand"><Tag className="size-3" /> {t.badge}</Badge><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{t.title}</h1><p className="mt-3 text-sm text-ink-muted">{t.updated}</p></header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40"><div className="flex items-start gap-3"><Tag className="size-5 text-accent-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{t.plain}</p><p className="mt-1 text-sm text-ink leading-relaxed">{t.plainBody}</p></div></div></Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>{t.revenueH}</h2><p>{t.revenueP}</p>
        <h2>{t.linksH}</h2><p>{t.linksP}</p>
        <h2>{t.independenceH}</h2><p>{t.independenceP}</p>
        <h2>{t.sourcesH}</h2><ul>{t.sources.map((item) => <li key={item}>{item}</li>)}</ul><p><Link href="/methodology">{t.sourceLink}</Link>.</p>
        <h2>{t.adsH}</h2><p>{t.adsP}</p><p><Link href="/cookie-policy">Cookie / consent</Link> · <Link href="/privacy-policy">Privacy</Link></p>
        <h2>{t.guaranteeH}</h2><p>{t.guaranteeP}</p>
      </article>

      <Card className="mt-12 p-6"><div className="flex items-start gap-3"><ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{t.sourceLink}</p><p className="mt-1 text-sm text-ink leading-relaxed"><Link href="/methodology" className="text-brand-700 underline">/methodology</Link></p></div></div></Card>
      <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40"><div className="flex items-start gap-3"><AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" /><div><p className="font-semibold text-ink-strong">{t.reminder}</p><p className="mt-1 text-sm text-ink leading-relaxed">{t.reminderBody} <Link href="/legal-notice" className="text-brand-700 underline">{t.legal}</Link>.</p></div></div></Card>
    </>
  );
}
