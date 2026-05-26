import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { products } from "@/data/products";

export function Hero() {
  const t = useTranslations("home.hero");
  const auditCount = products.filter((p) => p.highlights.audits).length;

  return (
    <section className="relative">
      <Container>
        <div className="mx-auto max-w-4xl pt-20 pb-16 sm:pt-32 sm:pb-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle/60 backdrop-blur px-4 py-1.5 text-xs text-ink-muted">
            <span className="size-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_var(--color-brand-400)]" />
            Edition · 2026
          </span>

          <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.03em] text-ink-strong leading-[1.02] text-balance">
            {splitHeadline(t("h1"))}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl text-ink-muted leading-relaxed text-balance">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en-iyi-vpn"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-strong px-6 py-3 text-sm font-medium text-surface-base hover:bg-brand-300 transition-colors"
            >
              {t("ctaPrimary")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/metodoloji"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-subtle/50 backdrop-blur px-6 py-3 text-sm font-medium text-ink hover:border-brand-400/30 hover:bg-surface-muted transition-colors"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          <dl className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            <Stat value={products.length} label={t("trust.tested")} />
            <Stat value={auditCount} label={t("trust.audits")} />
            <Stat value="312" label="hours of testing" />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function splitHeadline(text: string) {
  // Italic the last 2 words for elegance
  const parts = text.split(" ");
  if (parts.length <= 2) return text;
  const head = parts.slice(0, -2).join(" ");
  const tail = parts.slice(-2).join(" ");
  return (
    <>
      {head}{" "}
      <span className="font-display italic text-brand-300 font-normal">
        {tail}
      </span>
    </>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="bg-surface-subtle/60 backdrop-blur px-4 py-5">
      <dd className="text-3xl sm:text-4xl font-light text-ink-strong tabular-nums leading-none tracking-tight">
        {value}
      </dd>
      <dt className="mt-2 text-xs text-ink-muted">{label}</dt>
    </div>
  );
}
