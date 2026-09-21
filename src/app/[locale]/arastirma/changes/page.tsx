import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { History, Info } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { getResearchChanges, researchEdition, RESEARCH_FIELD_LABELS } from "@/data/research";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  const hasPublishedChanges = getResearchChanges().some((change) => change.status === "published");
  return {
    title: "VPN research changes",
    description: "Reviewed change history for material VPN provider evidence fields.",
    robots: hasPublishedChanges ? undefined : { index: false, follow: true },
    alternates: localizedAlternates("/research/changes", "en"),
    openGraph: { title: "VPN research changes | VPN Advisor", url: absoluteUrl("/research/changes"), type: "article" },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const changes = getResearchChanges();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Changes", path: "/research/changes" }], "en")} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "VPN research changes", description: "Reviewed change history for material VPN provider evidence fields.", url: absoluteUrl("/research/changes"), dateModified: researchEdition() }} />
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">Home</Link> › <Link href="/research" className="hover:text-ink">Research</Link> › <span className="text-ink-strong">Changes</span></p>
        <header className="mt-6 max-w-4xl"><span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"><History className="size-3.5" aria-hidden="true" /> Reviewable change log</span><h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">VPN research changes</h1><p className="mt-5 text-lg leading-relaxed text-ink-muted">Material changes are designed to be detected, reviewed and then published. The current edition contains no reviewed changes.</p></header>
        <section className="mt-10 rounded-2xl border border-brand-200 bg-brand-50/50 p-6 dark:bg-brand-950/20"><div className="flex items-start gap-3"><Info className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden="true" /><div><h2 className="font-semibold text-ink-strong">No published changes in edition {researchEdition()}</h2><p className="mt-2 text-sm leading-relaxed text-ink-muted">This is an explicit empty state, not an assertion that providers made no changes. A future fetch-and-diff job will create reviewable candidates without auto-publishing them.</p></div></div></section>
        {changes.length ? <div className="mt-10 overflow-x-auto rounded-2xl border border-border"><table className="min-w-[900px] w-full text-left text-sm"><thead className="bg-surface-subtle"><tr><th className="px-5 py-4">Provider</th><th className="px-5 py-4">Field</th><th className="px-5 py-4">Previous</th><th className="px-5 py-4">Current</th><th className="px-5 py-4">Detected</th><th className="px-5 py-4">State</th></tr></thead><tbody className="divide-y divide-border">{changes.map((change) => <tr key={change.id}><td className="px-5 py-4">{change.providerId}</td><td className="px-5 py-4">{RESEARCH_FIELD_LABELS[change.field]}</td><td className="px-5 py-4">{String(change.previousValue)}</td><td className="px-5 py-4">{String(change.currentValue)}</td><td className="px-5 py-4">{change.detectedAt}</td><td className="px-5 py-4">{change.status}</td></tr>)}</tbody></table></div> : null}
        <div className="mt-10 text-sm text-ink-muted">Read the <Link href="/methodology" className="font-semibold text-brand-700 hover:underline">sources and limitations</Link> page for how freshness and review states work.</div>
      </Container>
    </>
  );
}
