import { useTranslations } from "next-intl";
import { ArrowRight, Star, ShieldCheck, MapPin } from "lucide-react";
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
    <section id="top" className="py-16 sm:py-20">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-strong">
            {t("title")}
          </h2>
          <p className="mt-3 text-ink-muted">{t("subtitle")}</p>
        </div>

        <ul className="space-y-4 max-w-4xl mx-auto">
          {list.map((p) => (
            <FriendlyRow key={p.slug} product={p} tCommon={tCommon} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function FriendlyRow({
  product,
  tCommon,
}: {
  product: Product;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  return (
    <li className="rounded-3xl border-2 border-border bg-background p-5 sm:p-6 hover:border-brand-200 hover:shadow-[0_6px_0_var(--color-brand-100)] hover:-translate-y-0.5 transition-all">
      <div className="grid sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-100 text-xl font-extrabold text-brand-700 tabular-nums">
            {product.rank}
          </span>
          <VPNLogo slug={product.slug} size={44} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-extrabold text-ink-strong">
              {product.brand}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2 py-0.5 text-xs font-bold text-accent-600">
              <Star className="size-3 fill-accent-500 text-accent-500" />
              <span className="tabular-nums">{product.score.toFixed(1)}</span>
            </span>
            {!product.hasAffiliate && (
              <span className="inline-flex rounded-full bg-success-50 px-2 py-0.5 text-xs font-bold text-success-700">
                ✨ {tCommon("noAffiliate")}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-muted line-clamp-2">
            {product.summary}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {product.highlights.audits && (
              <Pill icon={<ShieldCheck className="size-3" />}>
                {product.highlights.audits}
              </Pill>
            )}
            {product.highlights.jurisdiction && (
              <Pill icon={<MapPin className="size-3" />}>
                {product.highlights.jurisdiction}
              </Pill>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:w-44">
          <div className="text-center">
            <div className="text-lg font-extrabold text-ink-strong tabular-nums">
              ${product.priceFromUsd.toFixed(2)}
            </div>
            <div className="text-xs text-ink-subtle">
              from /{tCommon("perMonth")}
            </div>
          </div>
          <a
            href={
              product.hasAffiliate
                ? affiliatePath(product.slug)
                : product.pricingUrl
            }
            rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
            target={product.hasAffiliate ? "_self" : "_blank"}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-accent-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-accent-600"
          >
            {product.hasAffiliate ? tCommon("getDeal") : tCommon("visitSite")}
            <ArrowRight className="size-4" />
          </a>
          <Link
            href={`/inceleme/${product.slug}`}
            className="text-center text-xs font-semibold text-ink-muted hover:text-ink-strong"
          >
            {tCommon("readReview")} →
          </Link>
        </div>
      </div>
    </li>
  );
}

function Pill({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-1 text-ink-muted">
      {icon}
      <span className="line-clamp-1">{children}</span>
    </span>
  );
}
