import { ArrowRight } from "lucide-react";
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
      aria-label="Top 3"
      className="border-b-[3px] border-ink-strong bg-surface-subtle"
    >
      <Container>
        <div className="py-10 sm:py-14">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <div className="inline-block font-mono text-[11px] uppercase tracking-widest font-bold border-[2px] border-ink-strong px-2 py-0.5">
                01 / 03 — top picks
              </div>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-ink-strong">
                The big three
              </h2>
            </div>
          </div>

          <ul className="grid sm:grid-cols-3 border-[3px] border-ink-strong divide-y-[3px] sm:divide-y-0 sm:divide-x-[3px] divide-ink-strong">
            {top.map((p, i) => (
              <BrutalistTile key={p.slug} product={p} rank={i + 1} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function BrutalistTile({
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
        "p-6 sm:p-7 flex flex-col",
        isFirst ? "bg-accent-400" : "bg-surface-base",
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-7xl sm:text-8xl font-bold tabular-nums leading-none text-ink-strong">
          {String(rank).padStart(2, "0")}
        </span>
        {isFirst && (
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold bg-ink-strong text-accent-400 px-2 py-1">
            ★ pick
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="border-[2px] border-ink-strong bg-surface-base p-1">
          <VPNLogo slug={product.slug} size={48} />
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase tracking-tight text-ink-strong">
            {product.brand}
          </h3>
          <p className="font-mono text-[11px] text-ink uppercase tracking-wider">
            {product.positioning}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t-[2px] border-ink-strong pt-4">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest font-bold text-ink-strong">
            score
          </dt>
          <dd className="mt-1 text-2xl font-bold text-ink-strong tabular-nums">
            {product.score.toFixed(1)}/10
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest font-bold text-ink-strong">
            price
          </dt>
          <dd className="mt-1 text-2xl font-bold text-ink-strong tabular-nums">
            ${bestPlan.monthlyPriceUsd.toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-0">
        <a
          href={
            product.hasAffiliate
              ? affiliatePath(product.slug)
              : product.pricingUrl
          }
          rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
          target={product.hasAffiliate ? "_self" : "_blank"}
          className="inline-flex items-center justify-center gap-2 bg-ink-strong text-surface-base px-4 py-3 text-sm font-bold uppercase tracking-wider border-[3px] border-ink-strong hover:bg-surface-base hover:text-ink-strong"
        >
          {product.hasAffiliate ? "Get deal" : "Visit"}
          <ArrowRight className="size-4" />
        </a>
        <Link
          href={`/inceleme/${product.slug}`}
          className="text-center mt-2 font-mono text-xs uppercase tracking-widest text-ink hover:text-ink-strong"
        >
          [ Read review ]
        </Link>
      </div>
    </li>
  );
}
