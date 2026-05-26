import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { products } from "@/data/products";

export function Hero() {
  const t = useTranslations("home.hero");
  const auditCount = products.filter((p) => p.highlights.audits).length;

  return (
    <section className="border-b-[3px] border-ink-strong">
      <Container>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 py-12 sm:py-20 items-end">
          <div>
            <div className="inline-block bg-accent-400 text-ink-strong font-mono text-xs uppercase tracking-widest font-bold px-2 py-1">
              ★ vol.05 — may 2026 — independent
            </div>

            <h1 className="mt-6 font-bold tracking-tighter text-ink-strong text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[6rem] leading-[0.95] uppercase">
              {t("h1")}
            </h1>

            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-ink leading-snug font-medium">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap gap-0">
              <Link
                href="/en-iyi-vpn"
                className="inline-flex items-center gap-2 bg-ink-strong text-surface-base px-6 py-3.5 text-sm font-bold uppercase tracking-wider border-[3px] border-ink-strong hover:bg-accent-400 hover:text-ink-strong"
              >
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/metodoloji"
                className="inline-flex items-center gap-2 bg-surface-base text-ink-strong px-6 py-3.5 text-sm font-bold uppercase tracking-wider border-[3px] border-ink-strong border-l-0 hover:bg-accent-400"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-3 lg:grid-cols-1 gap-0 border-[3px] border-ink-strong">
            <Stat
              value={products.length}
              label={t("trust.tested")}
              accent
            />
            <Stat value={auditCount} label={t("trust.audits")} />
            <Stat value="312" label="hours of testing" />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Stat({
  value,
  label,
  accent = false,
}: {
  value: string | number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "px-5 py-4 border-r-[3px] last:border-r-0 lg:border-r-0 lg:border-b-[3px] lg:last:border-b-0 border-ink-strong " +
        (accent ? "bg-accent-400" : "bg-surface-base")
      }
    >
      <dd className="text-3xl sm:text-4xl font-bold text-ink-strong tabular-nums leading-none">
        {value}
      </dd>
      <dt className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-strong font-bold">
        {label}
      </dt>
    </div>
  );
}
