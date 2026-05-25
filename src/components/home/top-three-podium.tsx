import { ArrowRight, Crown, Trophy, Medal } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

export function TopThreePodium() {
  const top = rankedProducts().slice(0, 3);
  return (
    <section
      aria-label="İlk üç seçim"
      className="relative -mt-2 sm:-mt-4 pb-8 sm:pb-12"
    >
      <Container>
        <div
          className="-mx-4 px-4 overflow-x-auto sm:mx-0 sm:px-0 sm:overflow-visible snap-x snap-mandatory scroll-pl-4"
          style={{ scrollbarWidth: "none" }}
        >
          <ul className="flex gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
            {top.map((p, i) => (
              <li
                key={p.slug}
                className="snap-start shrink-0 w-[78%] min-w-[280px] sm:w-auto sm:min-w-0"
              >
                <PodiumCard product={p} rank={i + 1} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function PodiumCard({ product, rank }: { product: Product; rank: number }) {
  const isWinner = rank === 1;
  const bestPlan =
    product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];

  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-2xl border bg-white shadow-sm",
        isWinner
          ? "border-brand-300 shadow-md ring-1 ring-brand-200/50"
          : "border-border",
      )}
    >
      {isWinner && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500"
        />
      )}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl",
          isWinner ? "bg-brand-100/50" : "bg-surface-subtle",
        )}
      />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <RankBadge rank={rank} />
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-ink-subtle font-semibold">
              Puan
            </div>
            <div className="text-2xl font-bold text-ink-strong tabular-nums">
              {product.score.toFixed(1)}
            </div>
          </div>
        </div>

        {/* BIG logo — main visual anchor */}
        <div className="mt-4 flex justify-center">
          <VPNLogo
            slug={product.slug}
            size={96}
            className="drop-shadow-md"
          />
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-ink-strong tracking-tight">
            {product.brand}
          </h3>
          <p className="mt-1 text-xs text-ink-subtle">{product.positioning}</p>
        </div>

        <div className="mt-4 flex items-baseline justify-center gap-1">
          <span className="text-2xl font-bold text-ink-strong tabular-nums">
            ${bestPlan.monthlyPriceUsd.toFixed(2)}
          </span>
          <span className="text-xs text-ink-subtle">/ay başlangıç</span>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Button
            asChild
            variant={product.hasAffiliate ? "primary" : "secondary"}
            size="md"
            className="w-full"
          >
            <a
              href={
                product.hasAffiliate
                  ? affiliatePath(product.slug)
                  : product.pricingUrl
              }
              rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
              target={product.hasAffiliate ? "_self" : "_blank"}
            >
              {product.hasAffiliate ? "Fırsata git" : "Resmi siteye git"}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link href={`/inceleme/${product.slug}`}>
              İncelemeyi oku
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-400 to-accent-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
        <Crown className="size-3" /> #1 En iyi
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-strong/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-strong">
        <Trophy className="size-3" /> #2
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-subtle px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-strong">
      <Medal className="size-3" /> #3
    </span>
  );
}
