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
    <section id="top" className="border-b border-border">
      <Container>
        <div className="mx-auto max-w-3xl py-16 sm:py-20">
          <header className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
              The full ranking
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-ink-strong">
              {t("title")}
            </h2>
            <p className="mt-3 text-ink-muted">{t("subtitle")}</p>
          </header>

          <ol className="mt-12 divide-y divide-border border-y border-border">
            {list.map((p) => (
              <EditorialRow key={p.slug} product={p} tCommon={tCommon} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function EditorialRow({
  product,
  tCommon,
}: {
  product: Product;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-6 py-10 sm:gap-10">
      <div className="pt-1">
        <span className="block font-serif text-4xl sm:text-5xl font-medium leading-none text-ink-strong tabular-nums">
          {String(product.rank).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <VPNLogo slug={product.slug} size={36} />
          <div>
            <h3 className="font-serif text-2xl font-medium tracking-tight text-ink-strong">
              {product.brand}
            </h3>
            <p className="text-xs text-ink-subtle italic">
              {product.positioning}
              {!product.hasAffiliate && (
                <>
                  <span className="mx-1.5 text-ink-faint">·</span>
                  <span className="not-italic">{tCommon("noAffiliate")}</span>
                </>
              )}
            </p>
          </div>
        </div>

        <p className="mt-4 text-[15px] text-ink leading-relaxed">
          {product.summary}
        </p>

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
          <div>
            <dt className="inline text-ink-subtle">Score —</dt>{" "}
            <dd className="inline font-medium text-ink-strong tabular-nums">
              {product.score.toFixed(1)}/10
            </dd>
          </div>
          {product.highlights.audits && (
            <div>
              <dt className="inline text-ink-subtle">Audits —</dt>{" "}
              <dd className="inline">{product.highlights.audits}</dd>
            </div>
          )}
          {product.highlights.jurisdiction && (
            <div>
              <dt className="inline text-ink-subtle">Jurisdiction —</dt>{" "}
              <dd className="inline">{product.highlights.jurisdiction}</dd>
            </div>
          )}
          {product.highlights.devices && (
            <div>
              <dt className="inline text-ink-subtle">Devices —</dt>{" "}
              <dd className="inline">{product.highlights.devices}</dd>
            </div>
          )}
          <div>
            <dt className="inline text-ink-subtle">From —</dt>{" "}
            <dd className="inline tabular-nums">
              ${product.priceFromUsd.toFixed(2)}/{tCommon("perMonth")}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link
            href={`/inceleme/${product.slug}`}
            className="group inline-flex items-center gap-1.5 border-b border-ink-strong pb-0.5 font-medium text-ink-strong hover:border-brand-600 hover:text-brand-700"
          >
            {tCommon("readReview")}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={
              product.hasAffiliate
                ? affiliatePath(product.slug)
                : product.pricingUrl
            }
            rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
            target={product.hasAffiliate ? "_self" : "_blank"}
            className="text-ink-muted underline decoration-ink-faint underline-offset-4 hover:text-ink-strong hover:decoration-ink-strong"
          >
            {product.hasAffiliate ? tCommon("getDeal") : tCommon("visitSite")} →
          </a>
        </div>
      </div>
    </li>
  );
}
