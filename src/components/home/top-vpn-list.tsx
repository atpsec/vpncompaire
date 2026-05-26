import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
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
    <section id="top" className="border-b-[3px] border-ink-strong">
      <Container>
        <div className="py-16 sm:py-20">
          <div className="mb-10 max-w-3xl">
            <div className="inline-block font-mono text-[11px] uppercase tracking-widest font-bold border-[2px] border-ink-strong px-2 py-0.5">
              full ranking — 10 vpns
            </div>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-ink-strong leading-[0.95]">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg text-ink font-medium">{t("subtitle")}</p>
          </div>

          <ul className="border-[3px] border-ink-strong divide-y-[3px] divide-ink-strong">
            {list.map((p) => (
              <BrutalistRow key={p.slug} product={p} tCommon={tCommon} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function BrutalistRow({
  product,
  tCommon,
}: {
  product: Product;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  return (
    <li className="grid grid-cols-1 lg:grid-cols-[120px_auto_1fr_auto_auto] gap-4 lg:gap-6 items-center px-5 sm:px-7 py-6 hover:bg-accent-100">
      <div className="text-6xl sm:text-7xl font-bold tabular-nums leading-none text-ink-strong">
        {String(product.rank).padStart(2, "0")}
      </div>

      <div className="border-[2px] border-ink-strong bg-surface-base p-1 inline-block w-fit">
        <VPNLogo slug={product.slug} size={44} />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-2xl font-bold uppercase tracking-tight text-ink-strong">
            {product.brand}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink">
            {product.positioning}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink line-clamp-2 font-medium">
          {product.summary}
        </p>
        <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-ink">
          <div>
            <span className="font-bold">score:</span> {product.score.toFixed(1)}
          </div>
          {product.highlights.audits && (
            <div className="line-clamp-1 max-w-[260px]">
              <span className="font-bold">audits:</span>{" "}
              {product.highlights.audits}
            </div>
          )}
          {product.highlights.jurisdiction && (
            <div>
              <span className="font-bold">juri:</span>{" "}
              {product.highlights.jurisdiction}
            </div>
          )}
        </dl>
      </div>

      <div className="text-right">
        <div className="text-3xl font-bold text-ink-strong tabular-nums leading-none">
          ${product.priceFromUsd.toFixed(2)}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink mt-1">
          from /{tCommon("perMonth")}
        </div>
      </div>

      <div className="flex flex-col gap-0">
        <a
          href={
            product.hasAffiliate
              ? affiliatePath(product.slug)
              : product.pricingUrl
          }
          rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
          target={product.hasAffiliate ? "_self" : "_blank"}
          className="inline-flex items-center justify-center gap-1.5 bg-ink-strong text-surface-base px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-[2px] border-ink-strong hover:bg-accent-400 hover:text-ink-strong"
        >
          {product.hasAffiliate ? tCommon("getDeal") : tCommon("visitSite")}
          <ArrowRight className="size-3.5" />
        </a>
        <Link
          href={`/inceleme/${product.slug}`}
          className="mt-1 text-center font-mono text-[10px] uppercase tracking-widest text-ink hover:text-ink-strong"
        >
          [ Review ]
        </Link>
      </div>
    </li>
  );
}
