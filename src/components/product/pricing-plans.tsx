import { Check } from "lucide-react";
import type { PricingPlan } from "@/data/products";
import { cn } from "@/lib/utils";

type Props = {
  plans: PricingPlan[];
  verifiedAt: string;
  variant?: "compact" | "default";
  className?: string;
};

const TR_DATE = new Intl.DateTimeFormat("tr-TR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function PricingPlans({
  plans,
  verifiedAt,
  variant = "default",
  className,
}: Props) {
  const verifiedDate = TR_DATE.format(new Date(verifiedAt));

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "grid gap-2",
          variant === "compact" ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2",
        )}
      >
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} variant={variant} />
        ))}
      </div>
      <p className="text-[11px] text-ink-faint flex items-center gap-1">
        <Check className="size-3 text-success-600" />
        Fiyatlar {verifiedDate} tarihinde doğrulandı.
      </p>
    </div>
  );
}

function PlanCard({
  plan,
  variant,
}: {
  plan: PricingPlan;
  variant: "compact" | "default";
}) {
  const isBest = plan.isBestValue;
  return (
    <div
      className={cn(
        "relative rounded-lg border p-3",
        isBest
          ? "border-brand-300 bg-brand-50/60"
          : "border-border bg-surface-subtle/50",
        variant === "compact" && "p-2.5",
      )}
    >
      {isBest && (
        <span className="absolute -top-2 left-3 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
          En iyi değer
        </span>
      )}
      <div className="text-[11px] font-medium text-ink-subtle leading-tight">
        {plan.name}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span
          className={cn(
            "font-bold tabular-nums text-ink-strong",
            variant === "compact" ? "text-base" : "text-lg",
          )}
        >
          ${plan.monthlyPriceUsd.toFixed(2)}
        </span>
        <span className="text-[11px] text-ink-subtle">/ay</span>
      </div>
      {plan.savingsPercent && plan.savingsPercent > 0 ? (
        <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-success-50 px-1.5 py-0.5 text-[10px] font-semibold text-success-700">
          %{plan.savingsPercent} indirim
        </div>
      ) : null}
      {plan.campaign && !plan.savingsPercent ? (
        <div className="mt-0.5 text-[10px] text-accent-600 font-medium">
          {plan.campaign}
        </div>
      ) : null}
      <div className="mt-1 text-[10px] text-ink-faint tabular-nums">
        Toplam ${plan.totalPriceUsd.toFixed(2)}
        {plan.durationMonths > 1 ? ` · ${plan.durationMonths} ay` : ""}
      </div>
    </div>
  );
}
