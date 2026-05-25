import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  Check,
  Server,
  Smartphone,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { rankedProducts, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";

export function TopVPNList() {
  const t = useTranslations("home.topVPNs");
  const tCommon = useTranslations("common");
  const list = rankedProducts();
  const topThree = list.slice(0, 3);
  const rest = list.slice(3);

  return (
    <section id="top" className="py-16 sm:py-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">
            {t("title")}
          </h2>
          <p className="mt-3 text-ink-muted">{t("subtitle")}</p>
        </div>

        <ul className="space-y-4">
          {topThree.map((p) => (
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

function FeaturedRow({
  product,
  tCommon,
}: {
  product: Product;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 p-6">
        <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:justify-center lg:border-r lg:border-border lg:pr-6 lg:w-32">
          <RankBadge rank={product.rank} />
          <div className="text-center">
            <div className="text-2xl font-bold text-ink-strong">
              {product.score.toFixed(1)}
            </div>
            <div className="text-xs text-ink-subtle">/10 {tCommon("score")}</div>
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

          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {product.highlights.audits && (
              <Highlight
                icon={<Award className="size-3.5" />}
                label={product.highlights.audits}
                tone="success"
              />
            )}
            {product.highlights.servers && (
              <Highlight
                icon={<Server className="size-3.5" />}
                label={product.highlights.servers}
              />
            )}
            {product.highlights.devices && (
              <Highlight
                icon={<Smartphone className="size-3.5" />}
                label={product.highlights.devices}
              />
            )}
            {product.highlights.jurisdiction && (
              <Highlight
                icon={<MapPin className="size-3.5" />}
                label={product.highlights.jurisdiction}
              />
            )}
          </dl>
        </div>

        <div className="flex flex-col gap-3 lg:w-56 lg:justify-center lg:border-l lg:border-border lg:pl-6">
          <div className="text-center lg:text-right">
            <div className="text-xs text-ink-subtle">{tCommon("from")}</div>
            <div className="text-2xl font-bold text-ink-strong">
              ${product.priceFromUsd.toFixed(2)}
            </div>
            <div className="text-xs text-ink-subtle">/{tCommon("perMonth")}</div>
          </div>
          <Button asChild variant={product.hasAffiliate ? "primary" : "secondary"} size="md">
            <a
              href={
                product.hasAffiliate
                  ? affiliatePath(product.slug)
                  : `https://${product.slug === "mullvad" ? "mullvad.net" : ""}`
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
    <Card>
      <div className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
        <RankBadge rank={product.rank} compact />
        <div className="flex-1 min-w-[180px]">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-ink-strong">
              {product.brand}
            </h3>
            <Badge variant={product.hasAffiliate ? "brand" : "outline"}>
              {product.positioning}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-ink-muted line-clamp-1">
            {product.summary}
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-ink-strong">
            {product.score.toFixed(1)}
            <span className="text-xs text-ink-subtle font-normal">/10</span>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/inceleme/${product.slug}`}>
            {tCommon("readReview")} →
          </Link>
        </Button>
      </div>
    </Card>
  );
}

function RankBadge({ rank, compact = false }: { rank: number; compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex items-center justify-center size-9 rounded-full bg-brand-50 text-brand-700 font-bold text-sm shrink-0"
          : "flex items-center justify-center size-12 rounded-full bg-brand-600 text-white font-bold text-lg shrink-0"
      }
      aria-label={`Sıralama ${rank}`}
    >
      #{rank}
    </div>
  );
}

function Highlight({
  icon,
  label,
  tone = "neutral",
}: {
  icon: React.ReactNode;
  label: string;
  tone?: "neutral" | "success";
}) {
  return (
    <div
      className={
        "flex items-center gap-1.5 rounded-md px-2 py-1.5 " +
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
