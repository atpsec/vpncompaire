import { ArrowRight, Check, Crown, Medal, Trophy } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { getProduct } from "@/data/products";

type Pick = {
  slug: string;
  /** Why this VPN is the right pick for *this* audience */
  reason: string;
  /** Optional override for the headline label, e.g. "En İyi Genel" */
  label?: string;
};

type Props = {
  picks: [Pick, Pick, Pick];
  heading?: string;
  subheading?: string;
};

const RANK_META = [
  { icon: Crown, label: "1. Tercih", color: "text-accent-600" },
  { icon: Trophy, label: "2. Tercih", color: "text-brand-600" },
  { icon: Medal, label: "3. Tercih", color: "text-ink-muted" },
];

export function AudiencePicks({ picks, heading, subheading }: Props) {
  return (
    <section className="mt-12">
      {heading ? (
        <header className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-2 text-ink-muted">{subheading}</p>
          ) : null}
        </header>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        {picks.map((pick, idx) => {
          const product = getProduct(pick.slug);
          if (!product) return null;
          const Rank = RANK_META[idx];
          const RankIcon = Rank.icon;
          const bestPlan =
            product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];

          return (
            <Card
              key={pick.slug}
              className="relative overflow-hidden p-5 flex flex-col"
            >
              {idx === 0 ? (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600" />
              ) : null}

              <div className="flex items-center gap-2 text-xs font-medium">
                <RankIcon className={`size-4 ${Rank.color}`} />
                <span className={Rank.color}>{Rank.label}</span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <VPNLogo slug={product.slug} size={56} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink-strong">
                    {product.brand}
                  </h3>
                  <p className="text-xs text-ink-muted truncate">
                    {pick.label ?? product.positioning}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-ink leading-relaxed">
                <span className="font-medium text-ink-strong">Neden:</span>{" "}
                {pick.reason}
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-ink-muted">
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-success-600 shrink-0 mt-0.5" />
                  <span>{product.highlights.audits ?? "Bağımsız test"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-success-600 shrink-0 mt-0.5" />
                  <span>{product.highlights.devices ?? "Çoklu cihaz"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-success-600 shrink-0 mt-0.5" />
                  <span>
                    {product.highlights.moneyBackDays ?? 30} gün para iade
                  </span>
                </li>
              </ul>

              <div className="mt-5 flex items-baseline gap-1.5 text-ink-strong">
                <span className="text-xs text-ink-muted">Aylık</span>
                <span className="text-lg font-bold">
                  ${bestPlan.monthlyPriceUsd.toFixed(2)}
                </span>
                <span className="text-xs text-ink-muted">
                  ({bestPlan.name})
                </span>
              </div>

              <div className="mt-auto pt-5 flex flex-col gap-2">
                <Button asChild variant="primary" size="sm">
                  <Link href={`/go/${product.slug}`}>
                    {product.brand} fırsatını gör
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/inceleme/${product.slug}`}>
                    İncelemeyi oku
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
