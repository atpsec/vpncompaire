import { useTranslations } from "next-intl";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";

export function TopVPNList() {
  const t = useTranslations("home.topVPNs");
  const tCommon = useTranslations("common");
  const list = rankedProducts();

  return (
    <section id="top" className="py-16 sm:py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.22em] text-brand-300">
            The ranking
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink-strong">
            <span className="font-display italic text-brand-300 font-normal">
              Ten
            </span>{" "}
            {t("title").replace(/^[\d\s—-]*/, "")}
          </h2>
          <p className="mt-3 text-ink-muted">{t("subtitle")}</p>
        </div>

        <ul className="max-w-4xl mx-auto rounded-2xl border border-border bg-surface-subtle/40 backdrop-blur divide-y divide-border overflow-hidden">
          {list.map((p) => (
            <PremiumRow key={p.slug} product={p} tCommon={tCommon} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function PremiumRow({
  product,
  tCommon,
}: {
  product: Product;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  return (
    <li className="group transition-colors hover:bg-surface-muted/40">
      <div className="px-5 sm:px-7 py-6">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 items-center">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.22em] text-ink-muted tabular-nums w-8">
              № {String(product.rank).padStart(2, "0")}
            </span>
            <VPNLogo slug={product.slug} size={44} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Link
                href={`/inceleme/${product.slug}`}
                className="text-xl font-medium text-ink-strong tracking-tight hover:text-brand-300 transition-colors"
              >
                {product.brand}
              </Link>
              <span className="text-xs text-ink-muted">
                {product.positioning}
              </span>
              {!product.hasAffiliate && (
                <span className="rounded-full border border-border bg-surface-base/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-muted">
                  {tCommon("noAffiliate")}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-ink-muted line-clamp-1">
              {product.summary}
            </p>
            <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-subtle">
              <div>
                <dt className="inline">Score —</dt>{" "}
                <dd className="inline font-medium text-ink tabular-nums">
                  {product.score.toFixed(1)}/10
                </dd>
              </div>
              {product.highlights.jurisdiction && (
                <div>
                  <dt className="inline">Jurisdiction —</dt>{" "}
                  <dd className="inline text-ink">
                    {product.highlights.jurisdiction}
                  </dd>
                </div>
              )}
              <div>
                <dt className="inline">From —</dt>{" "}
                <dd className="inline tabular-nums text-ink">
                  ${product.priceFromUsd.toFixed(2)}/{tCommon("perMonth")}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={
                product.hasAffiliate
                  ? affiliatePath(product.slug)
                  : product.pricingUrl
              }
              rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
              target={product.hasAffiliate ? "_self" : "_blank"}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ink-strong px-4 py-2 text-xs font-medium text-surface-base hover:bg-brand-300 transition-colors"
            >
              {product.hasAffiliate ? tCommon("getDeal") : tCommon("visitSite")}
              <ArrowUpRight className="size-3" />
            </a>
            <Link
              href={`/inceleme/${product.slug}`}
              aria-label={`Open ${product.brand} review`}
              className="text-ink-muted hover:text-brand-300 transition-colors"
            >
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
