import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-surface-muted text-ink-muted",
        brand: "bg-brand-50 text-brand-700",
        success: "bg-success-50 text-success-700",
        accent: "bg-accent-50 text-accent-600",
        outline: "border border-border text-ink-muted",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
