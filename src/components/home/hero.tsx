import { useTranslations } from "next-intl";
import { ArrowRight, Activity } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { products } from "@/data/products";

export function Hero() {
  const t = useTranslations("home.hero");
  const auditCount = products.filter((p) => p.highlights.audits).length;

  return (
    <section className="border-b border-border bg-surface-subtle/50">
      <Container>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 py-10 sm:py-14 items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-ink-muted">
              <Activity className="size-3 text-success-500" />
              <span>
                <span className="text-success-600">●</span>{" "}
                <span className="text-ink-strong font-semibold">data:</span>{" "}
                verified May 2026
              </span>
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-strong leading-[1.1] text-balance">
              {t("h1")}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl">
              {t("subtitle")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/en-iyi-vpn"
                className="inline-flex items-center gap-2 rounded-md bg-ink-strong px-4 py-2 text-sm font-medium text-surface-base hover:bg-ink"
              >
                {t("ctaPrimary")}
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/metodoloji"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-ink-strong hover:border-ink-faint"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-3 lg:grid-cols-1 gap-px rounded-md overflow-hidden border border-border bg-border min-w-[260px]">
            <Stat
              value={products.length}
              label={t("trust.tested")}
              accent="brand"
            />
            <Stat value={auditCount} label={t("trust.audits")} />
            <Stat value="312h" label="testing time" />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: string | number;
  label: string;
  accent?: "brand";
}) {
  return (
    <div className="bg-background px-4 py-3">
      <dd
        className={
          "font-mono text-2xl font-semibold tabular-nums " +
          (accent === "brand" ? "text-brand-600" : "text-ink-strong")
        }
      >
        {value}
      </dd>
      <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
        {label}
      </dt>
    </div>
  );
}
