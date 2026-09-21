import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Bot, CalendarDays, ClipboardCheck, Info, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, datasetSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import {
  AI_CITATION_WATCH_EDITION,
  AI_CITATION_PLATFORMS,
  AI_CITATION_QUESTIONS,
  AI_CITATION_OBSERVATIONS,
} from "@/data/ai-citation-watch";

type Props = { params: Promise<{ locale: string }> };

const title = "AI Citation Watch — VPN Advisor";
const description =
  "A fixed benchmark for checking whether independent AI assistants can discover and cite VPN Advisor's source-based research.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return {
    title,
    description,
    alternates: localizedAlternates("/research/ai-citation-watch", "en"),
    openGraph: {
      title,
      description,
      url: absoluteUrl("/research/ai-citation-watch"),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const dataset = datasetSchema({
    name: "VPN Advisor AI Citation Watch benchmark",
    description,
    url: "/research/ai-citation-watch",
    creator: "/about",
    dateModified: AI_CITATION_WATCH_EDITION,
    measurementTechnique:
      "Fixed questions sampled in clean sessions; platform, model, date, answer mode, direct citations and uncertainty are recorded separately.",
    variableMeasured: ["direct site citation", "brand mention", "target page relevance", "outdated or unsupported claim"],
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "AI Citation Watch", path: "/research/ai-citation-watch" }], "en")} />
      <JsonLd data={dataset} />
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <header className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            <Bot className="size-3.5" aria-hidden="true" />
            Public AI visibility protocol
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl lg:text-6xl">AI Citation Watch</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">
            A repeatable way to check whether independent AI assistants can find, understand and cite VPN Advisor&apos;s public evidence. The listed services do not sponsor or endorse VPN Advisor.
          </p>
          <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-sm font-semibold text-ink-strong">
            <CalendarDays className="size-4 text-accent-700" aria-hidden="true" />
            Protocol edition {AI_CITATION_WATCH_EDITION} · {AI_CITATION_OBSERVATIONS.length} measured observations
          </div>
        </header>

        <section className="mt-10 rounded-2xl border border-accent-300 bg-accent-50/70 p-5 dark:bg-accent-950/20 sm:p-6" aria-labelledby="status-heading">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-accent-700" aria-hidden="true" />
            <div>
              <h2 id="status-heading" className="font-semibold text-ink-strong">No visibility result is claimed yet</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                This benchmark publishes the questions and evaluation rules before any result. An unmeasured platform is recorded as <strong>not measured</strong>, never as zero visibility or an endorsement.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="Benchmark summary">
          <Summary value={AI_CITATION_PLATFORMS.length} label="platforms in the protocol" />
          <Summary value={AI_CITATION_QUESTIONS.length} label="fixed research questions" />
          <Summary value={AI_CITATION_OBSERVATIONS.length} label="published observations" />
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3" aria-labelledby="protocol-heading">
          <div className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">How a run is evaluated</p>
            <h2 id="protocol-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-strong">Same question, inspectable record</h2>
          </div>
          <ProtocolCard icon={<ClipboardCheck className="size-5" aria-hidden="true" />} title="Keep the prompt fixed" body="Use the same English question, platform and answer mode for a comparable sample." />
          <ProtocolCard icon={<ShieldCheck className="size-5" aria-hidden="true" />} title="Separate evidence types" body="Record a direct citation, a brand mention, a provider claim and an unsupported statement as different outcomes." />
          <ProtocolCard icon={<CalendarDays className="size-5" aria-hidden="true" />} title="Save the context" body="Store the model, date, search mode, answer URL and exact cited pages so a result can be checked later." />
        </section>

        <section className="mt-14" aria-labelledby="platforms-heading">
          <h2 id="platforms-heading" className="text-2xl font-bold tracking-tight text-ink-strong">Platforms in this edition</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AI_CITATION_PLATFORMS.map((platform) => (
              <article key={platform.id} className="rounded-xl border border-border bg-surface-base p-4 dark:bg-surface-subtle">
                <h3 className="font-semibold text-ink-strong">{platform.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{platform.supportsPromptUrl ? "Prompt URL support is available where the service accepts it." : "The service is opened separately and the fixed question is copied for the user."}</p>
                <span className="mt-3 inline-flex rounded-full bg-surface-subtle px-2 py-1 text-xs font-semibold text-ink-muted dark:bg-surface-muted">Not measured</span>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="questions-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Fixed question set</p>
              <h2 id="questions-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink-strong">What will be asked</h2>
            </div>
            <Link href="/research" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">Back to source desk <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-[900px] w-full text-left text-sm">
              <caption className="sr-only">AI citation watch benchmark questions</caption>
              <thead className="bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-ink-muted"><tr><th className="px-5 py-4">Question</th><th className="px-5 py-4">Intent</th><th className="px-5 py-4">Target pages</th></tr></thead>
              <tbody className="divide-y divide-border bg-surface-base">
                {AI_CITATION_QUESTIONS.map((question) => <tr key={question.id} className="align-top"><th scope="row" className="max-w-[520px] px-5 py-4 font-medium leading-relaxed text-ink-strong">{question.prompt}</th><td className="px-5 py-4 text-ink-muted">{question.intent}</td><td className="px-5 py-4 text-xs leading-relaxed text-ink-muted">{question.targetPaths.map((path) => <div key={path}>{path}</div>)}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </>
  );
}

function Summary({ value, label }: { value: number; label: string }) {
  return <div className="rounded-xl border border-border bg-surface-subtle/60 p-4"><p className="text-2xl font-bold tabular-nums text-ink-strong">{value}</p><p className="mt-1 text-xs leading-relaxed text-ink-muted">{label}</p></div>;
}

function ProtocolCard({ icon, title: cardTitle, body }: { icon: React.ReactNode; title: string; body: string }) {
  return <article className="rounded-2xl border border-border bg-surface-base p-6 dark:bg-surface-subtle"><div className="flex size-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">{icon}</div><h3 className="mt-5 text-xl font-bold text-ink-strong">{cardTitle}</h3><p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p></article>;
}
