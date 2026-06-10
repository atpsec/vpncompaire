import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface-base shadow-sm dark:bg-surface-subtle transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl focus-within:-translate-y-1 focus-within:border-brand-200 focus-within:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn("p-6 pb-4", className)} {...props} />;
}

export function CardBody({ className, ...props }: DivProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: DivProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
