import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { products, rankedProducts } from "@/data/products";

export function Hero() {
  const t = useTranslations("home.hero");
  const auditCount = products.filter((p) => p.highlights.audits).length;
  const ranked = rankedProducts();

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Soft, layered background — radial spotlights + subtle grid */}
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
        <div className="mx-auto max-w-4xl pt-20 pb-12 sm:pt-28 sm:pb-16">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-brand-800 shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-accent-500" /> 2026 Mayıs · Bağımsız test
              metodolojisi
            </span>

            <h1 className="mt-7 text-[2.5rem] sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-strong text-balance leading-[1.05]">
              {t("h1")}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-ink-muted text-balance leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="primary" size="lg">
                <Link href="/en-iyi-vpn">
                  {t("ctaPrimary")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/metodoloji">{t("ctaSecondary")}</Link>
              </Button>
            </div>
          </div>

          {/* Stat strip — editorial, not generic */}
          <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white/60 backdrop-blur shadow-sm">
            <Stat value={products.length} label={t("trust.tested")} />
            <Stat value={auditCount} label={t("trust.audits")} />
            <Stat value="312" label="saat hız testi" />
          </dl>
        </div>

        {/* Brand logo strip — establishes "we actually tested these" */}
        <div className="border-t border-dashed border-border pb-12 sm:pb-16">
          <div className="mx-auto max-w-5xl pt-8">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Test ettiğimiz markalar
            </p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10">
              {ranked.map((p) => (
                <li
                  key={p.slug}
                  className="group flex items-center gap-2.5 transition hover:-translate-y-0.5"
                >
                  <Link
                    href={`/inceleme/${p.slug}`}
                    className="flex items-center gap-2.5"
                    aria-label={`${p.brand} incelemesi`}
                  >
                    <VPNLogo slug={p.slug} size={36} />
                    <span className="text-sm font-medium text-ink-muted group-hover:text-ink-strong transition">
                      {p.brand}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="px-4 py-5 text-center">
      <dt className="text-xs text-ink-subtle">{label}</dt>
      <dd className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong tabular-nums">
        {value}
      </dd>
    </div>
  );
}
