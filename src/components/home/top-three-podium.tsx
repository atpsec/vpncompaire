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
      aria-label="Spotlight"
      className="border-b border-border"
    >
      <Container>
        <div className="py-10 sm:py-12">
          <div className="flex items-end justify-between mb-5">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
              <span className="text-success-600">●</span> spotlight · top 3
            </h2>
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-brand-600 hover:text-brand-700"
            >
              full ranking
              <ArrowUpRight className="size-3" />
            </Link>
          </div>

          <ul className="grid gap-px rounded-md overflow-hidden border border-border bg-border sm:grid-cols-3">
            {top.map((p, i) => (
              <SpotlightCell key={p.slug} product={p} rank={i + 1} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function SpotlightCell({
  product,
  rank,
}: {
  product: Product;
  rank: number;
}) {
  const isFirst = rank === 1;
  return (
    <li
      className={cn(
        "bg-background p-5 flex flex-col",
        isFirst && "ring-1 ring-inset ring-brand-500 relative",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
          rank/{String(rank).padStart(2, "0")}
        </span>
        {isFirst && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">
            top
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <VPNLogo slug={product.slug} size={40} />
        <div>
          <h3 className="text-base font-semibold text-ink-strong tracking-tight">
            {product.brand}
          </h3>
          <p className="text-xs text-ink-subtle">{product.positioning}</p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
            score
          </dt>
          <dd className="font-mono mt-0.5 text-base font-semibold text-ink-strong tabular-nums">
            {product.score.toFixed(1)}
            <span className="text-ink-subtle text-xs">/10</span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
            from
          </dt>
          <dd className="font-mono mt-0.5 text-base font-semibold text-ink-strong tabular-nums">
            ${product.priceFromUsd.toFixed(2)}
            <span className="text-ink-subtle text-xs">/mo</span>
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex gap-2 text-xs">
        <a
          href={
            product.hasAffiliate
              ? affiliatePath(product.slug)
              : product.pricingUrl
          }
          rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
          target={product.hasAffiliate ? "_self" : "_blank"}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded bg-ink-strong px-3 py-1.5 font-medium text-surface-base hover:bg-ink"
        >
          {product.hasAffiliate ? "Open deal" : "Open site"}
          <ArrowUpRight className="size-3" />
        </a>
        <Link
          href={`/inceleme/${product.slug}`}
          className="inline-flex items-center justify-center rounded border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink-strong"
        >
          review
        </Link>
      </div>
    </li>
  );
}
