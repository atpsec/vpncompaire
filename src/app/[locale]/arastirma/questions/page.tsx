import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { RESEARCH_QUESTIONS, getQuestionEvidence } from "@/data/research";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return { title: "VPN research questions and answers", description: "Citation-friendly VPN research questions generated from the canonical evidence dataset.", alternates: localizedAlternates("/research/questions", "en"), openGraph: { title: "VPN research questions and answers | VPN Advisor", url: absoluteUrl("/research/questions"), type: "website" } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Questions", path: "/research/questions" }], "en")} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "VPN research questions and answers", url: absoluteUrl("/research/questions"), numberOfItems: RESEARCH_QUESTIONS.length }} />
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">Home</Link> › <Link href="/research" className="hover:text-ink">Research</Link> › <span className="text-ink-strong">Questions</span></p>
        <header className="mt-6 max-w-4xl"><span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"><HelpCircle className="size-3.5" aria-hidden="true" /> Generated from canonical evidence</span><h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">VPN research questions</h1><p className="mt-5 text-lg leading-relaxed text-ink-muted">Short, citation-friendly answers built from the same field-level records used by provider profiles and APIs. Unknown values are not treated as negative answers.</p></header>
        <section className="mt-12 grid gap-5 md:grid-cols-2">{RESEARCH_QUESTIONS.map((question) => { const known = getQuestionEvidence(question).filter((item) => item.value !== null).length; return <Card key={question.slug} className="p-6"><p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{known} records with a value</p><h2 className="mt-2 text-xl font-bold text-ink-strong"><Link href={`/research/questions/${question.slug}`} className="hover:text-brand-700 hover:underline">{question.title}</Link></h2><p className="mt-3 text-sm leading-relaxed text-ink-muted">{question.question}</p><Link href={`/research/questions/${question.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">Read answer <ArrowRight className="size-4" aria-hidden="true" /></Link></Card>; })}</section>
      </Container>
    </>
  );
}
