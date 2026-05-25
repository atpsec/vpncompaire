import { Info, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutProps = {
  type?: "info" | "warning" | "tip" | "success";
  title?: string;
  children: React.ReactNode;
};

const config = {
  info: {
    Icon: Info,
    classes: "border-brand-200 bg-brand-50/60 text-ink",
    iconClasses: "text-brand-600",
  },
  warning: {
    Icon: AlertTriangle,
    classes: "border-accent-300 bg-accent-50/70 text-ink",
    iconClasses: "text-accent-600",
  },
  tip: {
    Icon: Lightbulb,
    classes: "border-accent-200 bg-accent-50/50 text-ink",
    iconClasses: "text-accent-500",
  },
  success: {
    Icon: CheckCircle2,
    classes: "border-success-100 bg-success-50/70 text-ink",
    iconClasses: "text-success-600",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { Icon, classes, iconClasses } = config[type];
  return (
    <aside
      className={cn(
        "not-prose my-6 flex gap-3 rounded-lg border p-4 text-[15px] leading-relaxed",
        classes,
      )}
    >
      <Icon
        className={cn("size-5 mt-0.5 shrink-0", iconClasses)}
        aria-hidden="true"
      />
      <div className="min-w-0">
        {title && (
          <div className="font-semibold text-ink-strong mb-1">{title}</div>
        )}
        <div className="[&>p]:m-0 [&>p+p]:mt-2">{children}</div>
      </div>
    </aside>
  );
}
