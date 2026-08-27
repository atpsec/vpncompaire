import { useLocale } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { products } from "@/data/products";
import { featuredReferenceProducts } from "@/data/products-reference-localized";
import { positioningFor } from "@/lib/editorial-positioning";
import type { Locale } from "@/lib/site";

export function Hero() {
  const locale = useLocale() as Locale;
  const copy = positioningFor(locale);
  const activeCore = products.filter((p) => p.slug !== "atlas-vpn");
  const catalogCount = activeCore.length + featuredReferenceProducts.length;
  const auditCount = activeCore.filter((p) => p.highlights.audits).length;
  const monthYear = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 1100px 480px at 50% -10%, rgb(219 234 254 / 0.65), transparent 60%), radial-gradient(ellipse 600px 400px at 85% 20%, rgb(254 243 199 / 0.5), transparent 65%), linear-gradient(180deg, var(--color-surface-base) 0%, var(--color-background) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(0 0 0) 1px, transparent 1px), linear-gradient(90deg, rgb(0 0 0) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container>
        <div className="mx-auto max-w-4xl pt-10 pb-8 sm:pt-14 sm:pb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-background/70 px-3 py-1 text-xs font-medium text-brand-800 shadow-sm backdrop-blur">
            <Sparkles className="size-3.5 text-accent-500" /> {monthYear} · {copy.methodologyTag}
          </span>

          <h1 className="mt-5 text-[2rem] sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-strong text-balance leading-[1.08]">
            {copy.heroTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-ink-muted text-balance leading-relaxed">
            {copy.heroSubtitle}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="md">
              <Link href="/vpn-reviews">
                {copy.primaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="md">
              <Link href="/methodology">{copy.secondaryCta}</Link>
            </Button>
          </div>

          <dl className="mx-auto mt-7 grid max-w-xl grid-cols-3 divide-x divide-border rounded-xl border border-border bg-background/60 backdrop-blur shadow-sm">
            <Stat value={catalogCount} label={copy.statProviders} />
            <Stat value={auditCount} label={copy.statAudits} />
            <Stat value="6" label={copy.statSources} />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="px-3 py-3 text-center">
      <dd className="text-xl sm:text-2xl font-bold tracking-tight text-ink-strong tabular-nums">
        {value}
      </dd>
      <dt className="mt-0.5 text-[11px] text-ink-subtle">{label}</dt>
    </div>
  );
}
