import { useTranslations } from "next-intl";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";

export function TopVPNList() {
  const t = useTranslations("home.topVPNs");
  const list = rankedProducts();

  return (
    <section id="top" className="border-b border-border">
      <Container>
        <div className="py-12 sm:py-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                table/ranking
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-ink-strong">
                {t("title")}
              </h2>
            </div>
            <p className="hidden sm:block max-w-md text-sm text-ink-muted">
              {t("subtitle")}
            </p>
          </div>

          <div className="rounded-md border border-border overflow-hidden bg-background">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-surface-subtle/70 border-b border-border">
                  <tr className="text-left">
                    <Th className="w-12 text-center">#</Th>
                    <Th>VPN</Th>
                    <Th className="text-right">Score</Th>
                    <Th className="hidden md:table-cell">Jurisdiction</Th>
                    <Th className="hidden lg:table-cell">Audits</Th>
                    <Th className="text-right hidden sm:table-cell">From</Th>
                    <Th className="text-right w-32">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) => (
                    <Row key={p.slug} product={p} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={
        "font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-semibold px-3 py-2.5 " +
        className
      }
    >
      {children}
    </th>
  );
}

function Row({ product }: { product: Product }) {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-surface-subtle/40 transition-colors group">
      <td className="px-3 py-3 text-center font-mono text-xs text-ink-subtle tabular-nums">
        {String(product.rank).padStart(2, "0")}
      </td>
      <td className="px-3 py-3">
        <Link
          href={`/inceleme/${product.slug}`}
          className="flex items-center gap-2.5 min-w-[180px]"
        >
          <VPNLogo slug={product.slug} size={28} />
          <div>
            <div className="font-medium text-ink-strong group-hover:text-brand-600">
              {product.brand}
            </div>
            <div className="text-[11px] text-ink-subtle">
              {product.positioning}
            </div>
          </div>
        </Link>
      </td>
      <td className="px-3 py-3 text-right font-mono text-sm font-semibold text-ink-strong tabular-nums">
        {product.score.toFixed(1)}
        <span className="text-ink-subtle font-normal">/10</span>
      </td>
      <td className="px-3 py-3 hidden md:table-cell text-xs text-ink-muted">
        {product.highlights.jurisdiction ?? "—"}
      </td>
      <td className="px-3 py-3 hidden lg:table-cell text-xs text-ink-muted line-clamp-1 max-w-[200px]">
        {product.highlights.audits ?? "—"}
      </td>
      <td className="px-3 py-3 text-right font-mono text-xs text-ink-muted tabular-nums hidden sm:table-cell">
        ${product.priceFromUsd.toFixed(2)}/mo
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center justify-end gap-1.5">
          <a
            href={
              product.hasAffiliate
                ? affiliatePath(product.slug)
                : product.pricingUrl
            }
            rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
            target={product.hasAffiliate ? "_self" : "_blank"}
            className="inline-flex items-center gap-1 rounded bg-ink-strong px-2.5 py-1 text-[11px] font-medium text-surface-base hover:bg-ink"
          >
            Open
            <ArrowUpRight className="size-3" />
          </a>
          <Link
            href={`/inceleme/${product.slug}`}
            aria-label={`Open ${product.brand} review`}
            className="rounded p-1 text-ink-subtle hover:text-ink-strong hover:bg-surface-muted"
          >
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
