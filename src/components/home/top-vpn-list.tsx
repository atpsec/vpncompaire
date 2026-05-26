import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  Server,
  Smartphone,
  MapPin,
  Crown,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { PricingPlans } from "@/components/product/pricing-plans";
import { rankedProducts, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";

export function TopVPNList() {
  const t = useTranslations("home.topVPNs");
  const tCommon = useTranslations("common");
  const tBlock = useTranslations("homeBlocks.topVPNs");
  const locale = useLocale() as "tr" | "en";
  const list = rankedProducts(locale);
  const winner = list[0];
  const podium = list.slice(1, 3);
  const rest = list.slice(3);

  return (
    <section id="top" className="py-16 sm:py-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {tBlock("kicker")}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">
            {t("title")}
          </h2>
          <p className="mt-3 text-ink-muted">{t("subtitle")}</p>
        </div>

        {winner && (
          <WinnerCard
            product={winner}
            tCommon={tCommon}
            editorsPickLabel={tBlock("editorsPick")}
          />
        )}

        <ul className="mt-6 space-y-4">
          {podium.map((p) => (
            <FeaturedRow key={p.slug} product={p} tCommon={tCommon} />
          ))}
          {rest.map((p) => (
            <CompactRow key={p.slug} product={p} tCommon={tCommon} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function WinnerCard({
  product,
  tCommon,
  editorsPickLabel,
}: {
  product: Product;
  tCommon: ReturnType<typeof useTranslations>;
  editorsPickLabel: string;
}) {
  return (
    <Card className="relative overflow-hidden border-brand-200 shadow-md">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl"
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 p-6 sm:p-7">
        <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:justify-start lg:border-r lg:border-border lg:pr-7 lg:w-44">
          <VPNLogo slug={product.slug} size={64} />
          <div className="lg:mt-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-600">
              <Crown className="size-3" /> {editorsPickLabel}
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-ink-strong tabular-nums">
                {product.score.toFixed(1)}
              </span>
              <span className="text-sm text-ink-subtle">/10</span>
            </div>
            <div className="text-xs text-ink-subtle">{tCommon("score")}</div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold text-ink-strong tracking-tight">
              {product.brand}
            </h3>
            <Badge variant="brand">#{product.rank} · {product.positioning}</Badge>
          </div>
          <p className="mt-3 text-[15px] text-ink-muted leading-relaxed">
            {product.summary}
          </p>

          <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {product.highlights.audits && (
              <Highlight
                icon={<Award className="size-4" />}
                label={product.highlights.audits}
                tone="success"
              />
            )}
            {product.highlights.servers && (
              <Highlight
                icon={<Server className="size-4" />}
                label={product.highlights.servers}
              />
            )}
            {product.highlights.devices && (
              <Highlight
                icon={<Smartphone className="size-4" />}
                label={product.highlights.devices}
              />
            )}
            {product.highlights.jurisdiction && (
              <Highlight
                icon={<MapPin className="size-4" />}
                label={product.highlights.jurisdiction}
              />
            )}
          </dl>
        </div>

        <div className="flex flex-col gap-3 lg:w-72 lg:justify-center lg:border-l lg:border-border lg:pl-7">
          <PricingPlans
            plans={product.plans}
            verifiedAt={product.pricingVerifiedAt}
          />
          <Button asChild variant="primary" size="md">
            <a
              href={affiliatePath(product.slug)}
              rel="sponsored nofollow"
              target="_self"
            >
              {tCommon("getDeal")}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/inceleme/${product.slug}`}>
              {tCommon("readReview")}
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FeaturedRow({
  product,
  tCommon,
}: {
  product: Product;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  return (
    <Card className="group transition hover:shadow-md hover:-translate-y-0.5">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-5 p-5 sm:p-6">
        <div className="flex items-center gap-4 lg:w-36 lg:border-r lg:border-border lg:pr-6">
          <VPNLogo slug={product.slug} size={52} />
          <div>
            <RankPill rank={product.rank} />
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-bold text-ink-strong tabular-nums">
                {product.score.toFixed(1)}
              </span>
              <span className="text-xs text-ink-subtle">/10</span>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-ink-strong">
              {product.brand}
            </h3>
            <Badge variant={product.hasAffiliate ? "brand" : "outline"}>
              {product.positioning}
            </Badge>
            {!product.hasAffiliate && (
              <Badge variant="outline">{tCommon("noAffiliate")}</Badge>
            )}
          </div>
          <p className="mt-2 text-sm text-ink-muted">{product.summary}</p>

          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {product.highlights.audits && (
              <Highlight
                icon={<Award className="size-3.5" />}
                label={product.highlights.audits}
                tone="success"
                compact
              />
            )}
            {product.highlights.servers && (
              <Highlight
                icon={<Server className="size-3.5" />}
                label={product.highlights.servers}
                compact
              />
            )}
            {product.highlights.devices && (
              <Highlight
                icon={<Smartphone className="size-3.5" />}
                label={product.highlights.devices}
                compact
              />
            )}
            {product.highlights.jurisdiction && (
              <Highlight
                icon={<MapPin className="size-3.5" />}
                label={product.highlights.jurisdiction}
                compact
              />
            )}
          </dl>
        </div>

        <div className="flex flex-col gap-3 lg:w-64 lg:justify-center lg:border-l lg:border-border lg:pl-6">
          <PricingPlans
            plans={product.plans}
            verifiedAt={product.pricingVerifiedAt}
            variant="compact"
          />
          <Button
            asChild
            variant={product.hasAffiliate ? "primary" : "secondary"}
            size="md"
          >
            <a
              href={
                product.hasAffiliate
                  ? affiliatePath(product.slug)
                  : `https://mullvad.net`
              }
              rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
              target={product.hasAffiliate ? "_self" : "_blank"}
            >
              {product.hasAffiliate ? tCommon("getDeal") : tCommon("visitSite")}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/inceleme/${product.slug}`}>
              {tCommon("readReview")}
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function CompactRow({
  product,
  tCommon,
}: {
  product: Product;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  return (
    <Card className="transition hover:shadow-sm hover:border-brand-200">
      <Link
        href={`/inceleme/${product.slug}`}
        className="flex flex-wrap items-center gap-4 p-4 sm:p-5"
      >
        <VPNLogo slug={product.slug} size={40} />
        <RankPill rank={product.rank} />
        <div className="flex-1 min-w-[180px]">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-ink-strong">
              {product.brand}
            </h3>
            <Badge variant={product.hasAffiliate ? "brand" : "outline"}>
              {product.positioning}
            </Badge>
            {!product.hasAffiliate && (
              <Badge variant="outline" className="hidden sm:inline-flex">
                {tCommon("noAffiliate")}
              </Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-muted line-clamp-1">
            {product.summary}
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-ink-strong tabular-nums">
            {product.score.toFixed(1)}
            <span className="text-xs text-ink-subtle font-normal">/10</span>
          </div>
          <div className="text-xs text-ink-subtle">
            ${product.priceFromUsd.toFixed(2)}/{tCommon("perMonth")}
          </div>
        </div>
        <ArrowRight className="size-4 text-ink-subtle" />
      </Link>
    </Card>
  );
}

function RankPill({ rank }: { rank: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700 tabular-nums">
      #{rank}
    </span>
  );
}

function Highlight({
  icon,
  label,
  tone = "neutral",
  compact = false,
}: {
  icon: React.ReactNode;
  label: string;
  tone?: "neutral" | "success";
  compact?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center gap-1.5 rounded-md " +
        (compact ? "px-2 py-1.5 " : "px-3 py-2 ") +
        (tone === "success"
          ? "bg-success-50 text-success-700"
          : "bg-surface-subtle text-ink-muted")
      }
    >
      <span aria-hidden="true">{icon}</span>
      <span className="line-clamp-1">{label}</span>
    </div>
  );
}
