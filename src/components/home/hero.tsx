import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { products } from "@/data/products";

export function Hero() {
  const t = useTranslations("home.hero");
  const auditCount = products.filter((p) => p.highlights.audits).length;

  return (
    <section className="relative">
      <Container>
        <div className="mx-auto max-w-4xl pt-12 pb-10 sm:pt-20 sm:pb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold text-accent-600">
            <Heart className="size-4 fill-accent-500 text-accent-500" />
            volunteer-built · made with care
            <Sparkles className="size-4 text-brand-500" />
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-strong leading-[1.05] text-balance">
            {t("h1")}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg sm:text-xl text-ink-muted leading-relaxed text-balance">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-500 px-7 py-3.5 text-base font-bold text-white shadow-[0_6px_0_var(--color-accent-600)] hover:translate-y-0.5 hover:shadow-[0_4px_0_var(--color-accent-600)] active:translate-y-1 active:shadow-[0_2px_0_var(--color-accent-600)] transition-all"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/metodoloji"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-background border-2 border-ink-strong/15 px-7 py-3.5 text-base font-bold text-ink-strong hover:border-ink-strong/40 hover:bg-surface-subtle transition-all"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">
            <Stat
              value={products.length}
              label={t("trust.tested")}
              emoji="🔍"
              tone="brand"
            />
            <Stat
              value={auditCount}
              label={t("trust.audits")}
              emoji="🛡️"
              tone="accent"
            />
            <Stat value="312" label="hours of testing" emoji="⏱️" tone="brand" />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Stat({
  value,
  label,
  emoji,
  tone,
}: {
  value: string | number;
  label: string;
  emoji: string;
  tone: "brand" | "accent";
}) {
  return (
    <div
      className={
        "rounded-3xl p-4 sm:p-5 " +
        (tone === "accent"
          ? "bg-accent-100/60"
          : "bg-brand-100/60")
      }
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <dd className="text-3xl sm:text-4xl font-extrabold text-ink-strong tabular-nums leading-none">
        {value}
      </dd>
      <dt className="mt-1.5 text-xs sm:text-sm font-semibold text-ink-muted">
        {label}
      </dt>
    </div>
  );
}
