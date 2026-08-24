import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  body: string;
  buttonLabel: string;
};

export function ToolsCta({ title, body, buttonLabel }: Props) {
  return (
    <section className="mt-12 rounded-2xl border border-border bg-brand-50/40 p-6 dark:bg-surface-subtle sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink-strong">
            <ShieldCheck className="size-5 text-brand-600" aria-hidden="true" />
            {title}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">{body}</p>
        </div>
        <Button asChild variant="primary" size="md" className="shrink-0">
          <Link href="/vpn-reviews">
            {buttonLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
