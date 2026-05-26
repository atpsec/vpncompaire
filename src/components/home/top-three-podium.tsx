import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

const TONES = ["brand", "accent", "brand"] as const;
const EMOJIS = ["🥇", "🥈", "🥉"];

export function TopThreePodium() {
  const top = rankedProducts().slice(0, 3);
  return (
    <section
      aria-label="Our favourite three"
      className="relative"
    >
      <Container>
        <div className="py-10 sm:py-14">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
              <Sparkles className="size-3.5" /> Our favourites
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-strong">
              The three we love most
            </h2>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {top.map((p, i) => (
              <PodiumBubble
                key={p.slug}
                product={p}
                rank={i + 1}
                tone={TONES[i]}
                emoji={EMOJIS[i]}
              />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function PodiumBubble({
  product,
  rank,
  tone,
  emoji,
}: {
  product: Product;
  rank: number;
  tone: "brand" | "accent";
  emoji: string;
}) {
  const isWinner = rank === 1;
  const bestPlan =
    product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];

  return (
    <li
      className={cn(
        "rounded-3xl border-2 p-5 sm:p-6 transition-all hover:-translate-y-1",
        isWinner
          ? "bg-gradient-to-br from-brand-100 to-accent-50 border-brand-200 shadow-[0_8px_0_var(--color-brand-200)] hover:shadow-[0_4px_0_var(--color-brand-200)]"
          : tone === "accent"
            ? "bg-accent-50/60 border-accent-100 shadow-[0_8px_0_var(--color-accent-100)] hover:shadow-[0_4px_0_var(--color-accent-100)]"
            : "bg-brand-50/60 border-brand-100 shadow-[0_8px_0_var(--color-brand-100)] hover:shadow-[0_4px_0_var(--color-brand-100)]",
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-3xl">{emoji}</span>
        <div className="flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs font-bold text-ink-strong">
          <Star className="size-3 fill-accent-500 text-accent-500" />
          <span className="tabular-nums">{product.score.toFixed(1)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <VPNLogo slug={product.slug} size={56} />
        <div>
          <h3 className="text-xl font-extrabold text-ink-strong">
            {product.brand}
          </h3>
          <p className="text-sm text-ink-muted">{product.positioning}</p>
        </div>
      </div>

      <p className="mt-4 text-[15px] text-ink leading-relaxed line-clamp-3">
        {product.summary}
      </p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-ink-strong tabular-nums">
          ${bestPlan.monthlyPriceUsd.toFixed(2)}
        </span>
        <span className="text-sm text-ink-subtle">/month</span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <a
          href={
            product.hasAffiliate
              ? affiliatePath(product.slug)
              : product.pricingUrl
          }
          rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
          target={product.hasAffiliate ? "_self" : "_blank"}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-strong px-5 py-3 text-sm font-bold text-surface-base hover:bg-ink"
        >
          {product.hasAffiliate ? "Grab the deal" : "Visit site"}
          <ArrowRight className="size-4" />
        </a>
        <Link
          href={`/inceleme/${product.slug}`}
          className="inline-flex items-center justify-center gap-1 rounded-xl bg-background px-4 py-2 text-sm font-semibold text-ink-muted hover:text-ink-strong"
        >
          Read full review →
        </Link>
      </div>
    </li>
  );
}
