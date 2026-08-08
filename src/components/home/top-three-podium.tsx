import { useLocale } from "next-intl";
import { ArrowRight, FileSearch, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { topRankedProducts, type Product } from "@/data/products";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";
import { referenceCopy } from "@/lib/reference-copy";

export function TopThreePodium() {
  const locale = useLocale() as Locale;
  const copy = referenceCopy(locale);
  const featured = topRankedProducts(locale).slice(0, 3);

  return (
    <section
      aria-label={copy.profilesTitle}
      className="relative -mt-2 sm:-mt-4 pb-8 sm:pb-12"
    >
      <Container>
        <ul className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
          {featured.map((product, index) => (
            <li key={product.slug}>
              <ProfileCard product={product} index={index} locale={locale} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ProfileCard({
  product,
  index,
  locale,
}: {
  product: Product;
  index: number;
  locale: Locale;
}) {
  const copy = referenceCopy(locale);
  const bestPlan = product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];
  const isFirst = index === 0;

  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-2xl border bg-surface-base shadow-sm",
        isFirst
          ? "border-brand-300 shadow-md ring-1 ring-brand-200/50"
          : "border-border",
      )}
    >
      {isFirst && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500"
        />
      )}
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
            <ShieldCheck className="size-3" /> {copy.profileLabel}
          </span>
          <div className="max-w-[140px] text-right">
            <div className="text-[10px] uppercase tracking-wider text-ink-subtle font-semibold">
              {copy.sourceStatus}
            </div>
            <div className="mt-1 text-xs font-semibold text-ink-strong line-clamp-2">
              {product.highlights.audits ?? "—"}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <VPNLogo slug={product.slug} size={96} className="drop-shadow-md" />
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
          <span className="text-xs text-ink-subtle">/mo</span>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Button asChild variant="primary" size="md" className="w-full">
            <a href={product.pricingUrl} rel="noopener nofollow" target="_blank">
              {copy.officialSource}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link href={`/inceleme/${product.slug}`}>
              <FileSearch className="size-3.5" /> {copy.profileLink}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
