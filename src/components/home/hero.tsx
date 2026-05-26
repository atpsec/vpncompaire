import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { products } from "@/data/products";

export function Hero() {
  const t = useTranslations("home.hero");
  const auditCount = products.filter((p) => p.highlights.audits).length;

  return (
    <section className="border-b border-border">
      <Container>
        <div className="mx-auto max-w-3xl pt-16 pb-12 sm:pt-24 sm:pb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">
            <span className="text-brand-700">Volume 1 · Issue 5</span>
            <span className="mx-2 text-ink-faint">/</span>
            May 2026 · Independent VPN Methodology
          </p>

          <h1 className="mt-6 font-serif text-[2.5rem] sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink-strong leading-[1.04] text-balance">
            {t("h1")}
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-ink-muted leading-relaxed text-balance">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link
              href="/en-iyi-vpn"
              className="group inline-flex items-center gap-2 border-b border-ink-strong pb-0.5 font-medium text-ink-strong hover:border-brand-600 hover:text-brand-700"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/metodoloji"
              className="inline-flex items-center gap-2 text-ink-muted underline decoration-ink-faint underline-offset-4 hover:text-ink-strong hover:decoration-ink-strong"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          <hr className="mt-12 border-border" />

          <dl className="mt-6 grid grid-cols-3 gap-6 text-left">
            <Stat value={products.length} label={t("trust.tested")} />
            <Stat value={auditCount} label={t("trust.audits")} />
            <Stat value="312" label="hours of testing" />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <dd className="font-serif text-3xl sm:text-4xl font-medium text-ink-strong tabular-nums leading-none">
        {value}
      </dd>
      <dt className="mt-2 text-xs text-ink-subtle leading-snug">{label}</dt>
    </div>
  );
}
