import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ExternalLink, HelpCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { EvidenceStatusBadge } from "@/components/research/evidence-status";
import { Freshness } from "@/components/research/freshness";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { getQuestionEvidence, getResearchQuestion, researchEdition, RESEARCH_QUESTIONS } from "@/data/research";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() { return RESEARCH_QUESTIONS.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const question = getResearchQuestion(slug);
  if (!question) return {};
  const hasPublishedValue = getQuestionEvidence(question).some((item) => item.value !== null);
  return {
    title: question.title,
    description: question.question,
    robots: hasPublishedValue ? undefined : { index: false, follow: true },
    alternates: localizedAlternates(`/research/questions/${slug}`, "en"),
    openGraph: { title: `${question.title} | VPN Advisor`, description: question.question, url: absoluteUrl(`/research/questions/${slug}`), type: "article" },
  };
}

function valueLabel(value: string | number | boolean | null) { if (value === null || value === "") return "Unknown"; if (typeof value === "boolean") return value ? "Yes" : "No"; return String(value); }

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const question = getResearchQuestion(slug);
  if (!question) notFound();
  const evidence = getQuestionEvidence(question);
  const withValues = evidence.filter((item) => item.value !== null);
  const assessed = evidence.filter((item) => item.status === "verified" || item.status === "partially_verified");
  const claims = evidence.filter((item) => item.status === "provider_claim_only");
  const directAnswer = withValues.length === 0
    ? `The current canonical dataset does not yet contain a usable value for this question across the tracked providers.`
    : `The dataset contains ${withValues.length} provider record${withValues.length === 1 ? "" : "s"} with a value for this question. ${assessed.length} record${assessed.length === 1 ? " is" : "s are"} marked verified or partially verified, while ${claims.length} ${claims.length === 1 ? "is" : "are"} provider claim${claims.length === 1 ? "" : "s"}.`;
  const sourceIds = [...new Set(evidence.filter((item) => item.sourceId).map((item) => item.sourceId))];
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Questions", path: "/research/questions" }, { name: question.title, path: `/research/questions/${slug}` }], "en")} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", "@id": `${absoluteUrl(`/research/questions/${slug}`)}#page`, name: question.title, description: question.question, url: absoluteUrl(`/research/questions/${slug}`), dateModified: researchEdition(), isPartOf: { "@type": "WebSite", name: "VPN Advisor", url: absoluteUrl("/") } }} />
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">Home</Link> › <Link href="/research" className="hover:text-ink">Research</Link> › <Link href="/research/questions" className="hover:text-ink">Questions</Link> › <span className="text-ink-strong">{question.title}</span></p>
        <header className="mt-6 max-w-4xl"><span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"><HelpCircle className="size-3.5" aria-hidden="true" /> Citation-friendly answer</span><h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">{question.question}</h1><p className="mt-5 text-lg leading-relaxed text-ink-muted">This page is generated from the canonical <code className="rounded bg-surface-subtle px-1.5 py-0.5 text-base">{question.field}</code> field. It does not add facts outside that dataset.</p></header>
        <section id="direct-answer" className="mt-10 rounded-2xl border border-brand-200 bg-brand-50/50 p-6 dark:bg-brand-950/20"><h2 className="text-xl font-bold text-ink-strong">Direct answer</h2><p className="mt-3 text-base leading-relaxed text-ink">{directAnswer}</p></section>
        <section id="evidence" className="mt-12"><h2 className="text-3xl font-bold tracking-tight text-ink-strong">Evidence table</h2><div className="mt-6 overflow-x-auto rounded-2xl border border-border"><table className="min-w-[900px] w-full text-left text-sm"><caption className="sr-only">{question.title} evidence records</caption><thead className="bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-ink-muted"><tr><th scope="col" className="px-5 py-4">Provider</th><th scope="col" className="px-5 py-4">Value</th><th scope="col" className="px-5 py-4">Status</th><th scope="col" className="px-5 py-4">Source</th><th scope="col" className="px-5 py-4">Last verified</th></tr></thead><tbody className="divide-y divide-border bg-surface-base">{evidence.map((item) => <tr id={item.id} key={item.id} className="align-top"><th scope="row" className="px-5 py-5 font-semibold text-ink-strong"><Link href={`/research/providers/${item.providerSlug}`} className="hover:text-brand-700 hover:underline">{item.providerName}</Link></th><td className="max-w-sm px-5 py-5 leading-relaxed text-ink">{valueLabel(item.value)}{item.notes ? <p className="mt-2 text-xs text-ink-muted">{item.notes}</p> : null}</td><td className="px-5 py-5"><EvidenceStatusBadge status={item.status} /></td><td className="px-5 py-5">{item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">{item.sourceTitle ?? "Open source"}<ExternalLink className="size-3.5" /></a> : <span className="text-ink-muted">Source not attached</span>}</td><td className="whitespace-nowrap px-5 py-5 text-xs"><Freshness checkedAt={item.checkedAt} /></td></tr>)}</tbody></table></div></section>
        <section id="caveats" className="mt-12 grid gap-6 lg:grid-cols-2"><Card className="p-6"><h2 className="text-xl font-bold text-ink-strong">Important caveats</h2><p className="mt-3 text-sm leading-relaxed text-ink-muted">{question.caveat}</p></Card><Card className="p-6"><h2 className="text-xl font-bold text-ink-strong">Methodology</h2><p className="mt-3 text-sm leading-relaxed text-ink-muted">{question.methodology}</p><Link href="/methodology" className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:underline">Read sources and limitations</Link></Card></section>
        <section id="sources" className="mt-10"><h2 className="text-2xl font-bold text-ink-strong">Sources</h2>{sourceIds.length ? <ul className="mt-4 space-y-2 text-sm">{sourceIds.map((sourceId) => <li key={sourceId}><Link href={`/research/sources/${sourceId}`} className="font-semibold text-brand-700 hover:underline">Open source record: {sourceId}</Link></li>)}</ul> : <p className="mt-3 text-sm text-ink-muted">No field-specific source is currently attached for this question.</p>}</section>
        <p className="mt-10 text-sm text-ink-muted">Last updated: {researchEdition()} · Unknown values are not negative answers.</p>
      </Container>
    </>
  );
}
