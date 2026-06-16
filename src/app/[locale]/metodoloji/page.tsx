import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  FileSearch,
  Gauge,
  Tv,
  Tag,
  Sparkles,
  Scale,
  Handshake,
  TestTube,
  RefreshCw,
  Eye,
  Calculator,
  Wrench,
  MapPin,
  ListChecks,
  Activity,
  Lock,
  Headphones,
  Wallet,
  CalendarDays,
  Server,
  AlertTriangle,
  MessageSquare,
  ExternalLink,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "methodology" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/metodoloji", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/metodoloji", locale),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MethodologyView />;
}

const TOOLS: ReadonlyArray<{ name: string; url: string }> = [
  { name: "Ookla Speedtest", url: "https://www.speedtest.net/" },
  { name: "Cloudflare Speed", url: "https://speed.cloudflare.com/" },
  { name: "fast.com", url: "https://fast.com/" },
  { name: "ipleak.net", url: "https://ipleak.net/" },
  { name: "dnsleaktest.com", url: "https://dnsleaktest.com/" },
  { name: "browserleaks.com", url: "https://browserleaks.com/" },
  { name: "test-ipv6.com", url: "https://test-ipv6.com/" },
  { name: "Wireshark", url: "https://www.wireshark.org/" },
];

const TOC_ITEMS: ReadonlyArray<{
  key: "independence" | "tests" | "scoring" | "freshness" | "transparency";
  href: string;
  Icon: LucideIcon;
}> = [
  { key: "independence", href: "#independence", Icon: Handshake },
  { key: "tests", href: "#tests", Icon: TestTube },
  { key: "scoring", href: "#scoring", Icon: Calculator },
  { key: "freshness", href: "#freshness", Icon: RefreshCw },
  { key: "transparency", href: "#transparency", Icon: Eye },
];

const TEST_BLOCKS: ReadonlyArray<{
  key: "speed" | "security" | "streaming" | "privacy" | "usability";
  Icon: LucideIcon;
}> = [
  { key: "speed", Icon: Gauge },
  { key: "security", Icon: ShieldCheck },
  { key: "streaming", Icon: Tv },
  { key: "privacy", Icon: Lock },
  { key: "usability", Icon: Sparkles },
];

const SCORING_DIMENSIONS: ReadonlyArray<{
  key: "security" | "privacy" | "speed" | "streaming" | "usability" | "pricing";
  Icon: LucideIcon;
}> = [
  { key: "security", Icon: ShieldCheck },
  { key: "privacy", Icon: Lock },
  { key: "speed", Icon: Gauge },
  { key: "streaming", Icon: Tv },
  { key: "usability", Icon: Sparkles },
  { key: "pricing", Icon: Tag },
];

function MethodologyView() {
  const t = useTranslations("methodology");

  return (
    <Container size="md" className="py-12 sm:py-16 lg:py-20">
      {/* HEADER */}
      <header className="min-w-0">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          <ShieldCheck className="size-3.5" /> {t("badge")}
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-strong break-words">
          {t("h1")}
        </h1>
        <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
          {t("intro")}
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
          <CalendarDays className="size-3.5" />
          {t("lastUpdated")}: <span className="text-ink">{t("lastUpdatedDate")}</span>
        </p>
      </header>

      {/* TABLE OF CONTENTS */}
      <nav
        aria-label={t("toc.title")}
        className="mt-10 rounded-xl border border-border bg-surface-subtle p-5 sm:p-6"
      >
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          <ListChecks className="size-4" />
          {t("toc.title")}
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {TOC_ITEMS.map(({ key, href, Icon }) => (
            <li key={key} className="min-w-0">
              <a
                href={href}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink hover:bg-brand-50 hover:text-brand-700"
              >
                <Icon className="size-4 shrink-0 text-brand-600" />
                <span className="break-words">{t(`toc.${key}`)}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* SECTION 1: INDEPENDENCE */}
      <section id="independence" className="mt-14 scroll-mt-24">
        <SectionHeading Icon={Handshake} title={t("independence.title")} />
        <p className="mt-4 text-ink leading-relaxed">{t("independence.intro")}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-base p-5 dark:bg-surface-subtle">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-strong">
              <Wallet className="size-4 text-brand-600" />
              {t("independence.withAffiliateTitle")}
            </div>
            <p className="mt-3 text-sm text-ink leading-relaxed">
              {t("independence.withAffiliateBody")}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-base p-5 dark:bg-surface-subtle">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-strong">
              <Scale className="size-4 text-brand-600" />
              {t("independence.withoutAffiliateTitle")}
            </div>
            <p className="mt-3 text-sm text-ink leading-relaxed">
              {t("independence.withoutAffiliateBody")}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-brand-50/40 p-5 sm:p-6 dark:bg-brand-50/10">
          <h3 className="text-base font-semibold text-ink-strong">
            {t("independence.pledgeTitle")}
          </h3>
          <ul className="mt-3 space-y-2.5 text-sm text-ink">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex items-start gap-2 min-w-0">
                <span className="mt-1 size-1.5 rounded-full bg-brand-600 shrink-0" />
                <span className="break-words leading-relaxed">
                  {t(`independence.pledgeItems.${i}`)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link
              href="/reklam-aciklamasi"
              className="inline-flex items-center gap-1 text-brand-700 underline"
            >
              {t("independence.linkText")} <ArrowUpRight className="size-3.5" />
            </Link>
          </p>
        </div>
      </section>

      {/* SECTION 2: TESTS */}
      <section id="tests" className="mt-14 scroll-mt-24">
        <SectionHeading Icon={TestTube} title={t("tests.title")} />
        <p className="mt-4 text-ink leading-relaxed">{t("tests.intro")}</p>

        {/* Tools grid */}
        <div className="mt-6 rounded-xl border border-border bg-surface-subtle p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <Wrench className="size-3.5" /> Tools
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <li key={tool.name}>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-base px-2.5 py-1 text-xs font-medium text-ink hover:border-brand-300 hover:text-brand-700 dark:bg-surface-base"
                >
                  {tool.name}
                  <ExternalLink className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ol className="mt-8 space-y-6">
          {TEST_BLOCKS.map(({ key, Icon }) => (
            <TestCard key={key} testKey={key} Icon={Icon} />
          ))}
        </ol>
      </section>

      {/* SECTION 3: SCORING */}
      <section id="scoring" className="mt-14 scroll-mt-24">
        <SectionHeading Icon={Calculator} title={t("scoring.title")} />
        <p className="mt-4 text-ink leading-relaxed">{t("scoring.intro")}</p>

        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-subtle text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3">{t("scoring.tableHeaderDimension")}</th>
                <th className="px-4 py-3 w-20 sm:w-28">
                  {t("scoring.tableHeaderWeight")}
                </th>
                <th className="px-4 py-3">{t("scoring.tableHeaderDescription")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface-base dark:bg-surface-base">
              {SCORING_DIMENSIONS.map(({ key, Icon }) => (
                <tr key={key} className="align-top">
                  <td className="px-4 py-3 min-w-0">
                    <span className="inline-flex items-center gap-2 font-medium text-ink-strong">
                      <Icon className="size-4 text-brand-600 shrink-0" />
                      <span className="break-words">
                        {t(`scoring.dimensions.${key}.name`)}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-xs sm:text-sm text-brand-700">
                    {t(`scoring.dimensions.${key}.weight`)}
                  </td>
                  <td className="px-4 py-3 text-ink leading-relaxed break-words">
                    {t(`scoring.dimensions.${key}.description`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-xl border border-border bg-brand-50/40 p-5 dark:bg-brand-50/10">
          <h3 className="text-sm font-semibold text-ink-strong">
            {t("scoring.formulaTitle")}
          </h3>
          <p className="mt-2 font-mono text-sm text-ink break-words">
            {t("scoring.formula")}
          </p>
        </div>
      </section>

      {/* SECTION 4: FRESHNESS */}
      <section id="freshness" className="mt-14 scroll-mt-24">
        <SectionHeading Icon={RefreshCw} title={t("freshness.title")} />
        <p className="mt-4 text-ink leading-relaxed">{t("freshness.intro")}</p>
        <ul className="mt-5 space-y-3 text-sm text-ink">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface-base p-4 dark:bg-surface-subtle min-w-0"
            >
              <CalendarDays className="size-4 text-brand-600 shrink-0 mt-0.5" />
              <span className="break-words leading-relaxed">
                {t(`freshness.items.${i}`)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 5: TRANSPARENCY */}
      <section id="transparency" className="mt-14 scroll-mt-24">
        <SectionHeading Icon={Eye} title={t("transparency.title")} />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-base p-5 dark:bg-surface-subtle">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-strong">
              <Server className="size-4 text-brand-600" />
              {t("transparency.envTitle")}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-2 min-w-0">
                  <span className="mt-1 size-1.5 rounded-full bg-brand-600 shrink-0" />
                  <span className="break-words leading-relaxed">
                    {t(`transparency.envItems.${i}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface-base p-5 dark:bg-surface-subtle">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-strong">
              <AlertTriangle className="size-4 text-amber-600" />
              {t("transparency.limitsTitle")}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-2 min-w-0">
                  <span className="mt-1 size-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="break-words leading-relaxed">
                    {t(`transparency.limitsItems.${i}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-brand-50/40 p-5 dark:bg-brand-50/10">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink-strong">
            <MessageSquare className="size-4 text-brand-600" />
            {t("transparency.contactTitle")}
          </div>
          <p className="mt-3 text-sm text-ink leading-relaxed">
            {t("transparency.contactBody")}
          </p>
        </div>
      </section>

      {/* EDITORIAL FOOTER */}
      <section className="mt-14 rounded-xl border border-border bg-brand-50/30 p-6 dark:bg-brand-50/10">
        <h2 className="text-xl font-semibold text-ink-strong">
          {t("editorial.title")}
        </h2>
        <p className="mt-3 text-ink leading-relaxed">
          {t.rich("editorial.body", {
            link: (chunks) => (
              <Link
                href="/reklam-aciklamasi"
                className="text-brand-700 underline"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </section>
    </Container>
  );
}

function SectionHeading({
  Icon,
  title,
}: {
  Icon: LucideIcon;
  title: string;
}) {
  return (
    <h2 className="flex items-start gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong min-w-0">
      <span className="inline-flex shrink-0 items-center justify-center size-10 sm:size-11 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-50/10">
        <Icon className="size-5 sm:size-6" />
      </span>
      <span className="break-words leading-tight pt-1">{title}</span>
    </h2>
  );
}

function TestCard({
  testKey,
  Icon,
}: {
  testKey: "speed" | "security" | "streaming" | "privacy" | "usability";
  Icon: LucideIcon;
}) {
  const t = useTranslations("methodology");
  const base = `tests.${testKey}`;

  return (
    <li className="rounded-xl border border-border bg-surface-base p-5 sm:p-6 dark:bg-surface-subtle min-w-0">
      <header className="flex items-start gap-3 min-w-0">
        <span className="inline-flex shrink-0 items-center justify-center size-10 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-50/10">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-ink-strong break-words leading-tight">
            {t(`${base}.title`)}
          </h3>
          <p className="mt-1 text-sm text-ink-muted leading-relaxed">
            {t(`${base}.summary`)}
          </p>
        </div>
      </header>

      <dl className="mt-5 space-y-4 text-sm">
        {testKey === "speed" && (
          <>
            <Block icon={Wrench} label={t(`${base}.toolsLabel`)} body={t(`${base}.tools`)} />
            <Block icon={MapPin} label={t(`${base}.locationsLabel`)} body={t(`${base}.locations`)} />
            <Steps label={t(`${base}.methodLabel`)} base={`${base}.methodSteps`} count={5} />
            <Block icon={Activity} label={t(`${base}.metricsLabel`)} body={t(`${base}.metrics`)} />
          </>
        )}

        {testKey === "security" && (
          <>
            <Block icon={Wrench} label={t(`${base}.toolsLabel`)} body={t(`${base}.tools`)} />
            <Steps label={t(`${base}.checksLabel`)} base={`${base}.checks`} count={5} />
            <Block icon={Lock} label={t(`${base}.configLabel`)} body={t(`${base}.config`)} />
          </>
        )}

        {testKey === "streaming" && (
          <>
            <Block icon={Tv} label={t(`${base}.platformsLabel`)} body={t(`${base}.platforms`)} />
            <Steps label={t(`${base}.methodLabel`)} base={`${base}.methodSteps`} count={4} />
            <Block icon={Activity} label={t(`${base}.resultLabel`)} body={t(`${base}.result`)} />
          </>
        )}

        {testKey === "privacy" && (
          <>
            <Block icon={FileSearch} label={t(`${base}.auditsLabel`)} body={t(`${base}.audits`)} />
            <Block icon={Scale} label={t(`${base}.jurisdictionLabel`)} body={t(`${base}.jurisdiction`)} />
            <Block icon={ListChecks} label={t(`${base}.policyLabel`)} body={t(`${base}.policy`)} />
            <Block icon={Server} label={t(`${base}.infraLabel`)} body={t(`${base}.infra`)} />
          </>
        )}

        {testKey === "usability" && (
          <>
            <Block icon={Sparkles} label={t(`${base}.appsLabel`)} body={t(`${base}.apps`)} />
            <Block icon={CalendarDays} label={t(`${base}.dailyLabel`)} body={t(`${base}.daily`)} />
            <Block icon={Headphones} label={t(`${base}.supportLabel`)} body={t(`${base}.support`)} />
            <Block icon={Wallet} label={t(`${base}.refundLabel`)} body={t(`${base}.refund`)} />
          </>
        )}
      </dl>
    </li>
  );
}

function Block({
  icon: Icon,
  label,
  body,
}: {
  icon: LucideIcon;
  label: string;
  body: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        <Icon className="size-3.5 text-brand-600" />
        {label}
      </dt>
      <dd className="mt-1.5 text-ink leading-relaxed break-words">{body}</dd>
    </div>
  );
}

function Steps({
  label,
  base,
  count,
}: {
  label: string;
  base: string;
  count: number;
}) {
  const t = useTranslations("methodology");
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        <ListChecks className="size-3.5 text-brand-600" />
        {label}
      </dt>
      <dd className="mt-2">
        <ol className="space-y-2">
          {Array.from({ length: count }).map((_, i) => (
            <li key={i} className="flex items-start gap-3 min-w-0">
              <span className="inline-flex shrink-0 items-center justify-center size-5 rounded-full bg-brand-100 text-[11px] font-semibold text-brand-700">
                {i + 1}
              </span>
              <span className="text-ink leading-relaxed break-words">
                {t(`${base}.${i}`)}
              </span>
            </li>
          ))}
        </ol>
      </dd>
    </div>
  );
}
