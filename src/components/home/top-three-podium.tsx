import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

export function TopThreePodium() {
  const top = rankedProducts().slice(0, 3);
  return (
    <section
      aria-label="Featured"
      className="relative"
    >
      <Container>
        <div className="py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.22em] text-brand-300">
              Featured
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink-strong">
              The <span className="font-display italic text-brand-300 font-normal">finest</span> three
            </h2>
          </div>

          <ul className="grid gap-5 sm:grid-cols-3">
            {top.map((p, i) => (
              <PremiumCard key={p.slug} product={p} rank={i + 1} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function PremiumCard({
  product,
  rank,
}: {
  product: Product;
  rank: number;
}) {
  const isFirst = rank === 1;
  const bestPlan =
    product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];

  return (
    <li
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border p-6 sm:p-7 transition-all duration-300 hover:border-brand-400/30",
        isFirst
          ? "bg-gradient-to-br from-brand-950/40 via-surface-subtle to-surface-subtle ring-1 ring-brand-400/20"
          : "bg-surface-subtle/60 backdrop-blur",
      )}
    >
      {isFirst && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-brand-400/10 blur-3xl"
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
            № {String(rank).padStart(2, "0")}
          </span>
          {isFirst && (
            <span className="rounded-full border border-brand-400/40 bg-brand-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-brand-300">
              Editor's pick
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <VPNLogo slug={product.slug} size={48} />
          <div>
            <h3 className="text-xl font-medium text-ink-strong tracking-tight">
              {product.brand}
            </h3>
            <p className="text-xs text-ink-muted">{product.positioning}</p>
          </div>
        </div>

        <p className="mt-5 text-sm text-ink-muted leading-relaxed line-clamp-3">
          {product.summary}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-ink-muted">
              Score
            </dt>
            <dd className="mt-1 text-2xl font-light text-ink-strong tabular-nums">
              {product.score.toFixed(1)}
              <span className="text-sm text-ink-subtle font-normal">/10</span>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-ink-muted">
              From
            </dt>
            <dd className="mt-1 text-2xl font-light text-ink-strong tabular-nums">
              ${bestPlan.monthlyPriceUsd.toFixed(2)}
              <span className="text-sm text-ink-subtle font-normal">/mo</span>
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-2">
          <a
            href={
              product.hasAffiliate
                ? affiliatePath(product.slug)
                : product.pricingUrl
            }
            rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
            target={product.hasAffiliate ? "_self" : "_blank"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-strong px-5 py-2.5 text-sm font-medium text-surface-base hover:bg-brand-300 transition-colors"
          >
            {product.hasAffiliate ? "View offer" : "Visit site"}
            <ArrowUpRight className="size-3.5" />
          </a>
          <Link
            href={`/inceleme/${product.slug}`}
            className="text-center text-xs text-ink-muted hover:text-brand-300"
          >
            Read review →
          </Link>
        </div>
      </div>
    </li>
  );
}
