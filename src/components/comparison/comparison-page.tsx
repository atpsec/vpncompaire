import { ArrowRight, Check, Trophy } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";
import { cn } from "@/lib/utils";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";

export type ComparisonCategory = {
  name: string;
  winner: "a" | "b" | "tie";
  aDetail: string;
  bDetail: string;
  reasoning: string;
};

export type ComparisonFAQ = { q: string; a: string };

export type ComparisonPageProps = {
  slug: string;
  productSlugA: string;
  productSlugB: string;
  tagline: string;
  categories: readonly ComparisonCategory[];
  whyA: { title: string; reasons: readonly string[] };
  whyB: { title: string; reasons: readonly string[] };
  faqs: readonly ComparisonFAQ[];
  relatedLinks: readonly { label: string; href: string }[];
};

export function ComparisonPage({
  slug,
  productSlugA,
  productSlugB,
  tagline,
  categories,
  whyA,
  whyB,
  faqs,
  relatedLinks,
}: ComparisonPageProps) {
  const a = getProduct(productSlugA);
  const b = getProduct(productSlugB);
  if (!a || !b) return null;

  const title = `${a.brand} vs ${b.brand}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Karşılaştırma", path: "/karsilastir" },
          { name: title, path: `/karsilastir/${slug}` },
        ])}
      />
      <JsonLd data={faqSchema([...faqs])} />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          ›{" "}
          <Link href="/karsilastir" className="hover:text-ink">
            Karşılaştırma
          </Link>{" "}
          › <span className="text-ink-strong">{title}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">Yan yana karşılaştırma</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {title}: 2026 Karşılaştırması
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{tagline}</p>
        </header>

        <DataDisclaimer verifiedAt={a.pricingVerifiedAt} />

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <VPNLogo slug={a.slug} size={52} />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-ink-strong">{a.brand}</h2>
                <p className="text-sm text-ink-muted">{a.positioning}</p>
              </div>
              <span className="text-2xl font-bold text-brand-700 tabular-nums">
                {a.score}
              </span>
            </div>
            <p className="mt-4 text-sm text-ink leading-relaxed">{a.summary}</p>
            <Button asChild variant="primary" className="mt-4 w-full">
              <a href={affiliatePath(a.slug)} rel="sponsored nofollow">
                {a.brand} fırsatı <ArrowRight className="size-4" />
              </a>
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <VPNLogo slug={b.slug} size={52} />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-ink-strong">{b.brand}</h2>
                <p className="text-sm text-ink-muted">{b.positioning}</p>
              </div>
              <span className="text-2xl font-bold text-brand-700 tabular-nums">
                {b.score}
              </span>
            </div>
            <p className="mt-4 text-sm text-ink leading-relaxed">{b.summary}</p>
            <Button
              asChild
              variant={b.hasAffiliate ? "primary" : "secondary"}
              className="mt-4 w-full"
            >
              <a
                href={affiliatePath(b.slug)}
                rel={b.hasAffiliate ? "sponsored nofollow" : "noopener"}
              >
                {b.brand}{" "}
                {b.hasAffiliate ? "fırsatı" : "sitesini ziyaret et"}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </Card>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            Kategori bazında öne çıkan özellikler
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Her satırdaki etiket, sağlayıcının o kriterde nasıl konumlandığını
            gösterir — kategorik bir &quot;kazanan&quot; ilan etmez.
          </p>
          <div className="mt-6 space-y-4">
            {categories.map((cat) => (
              <Card key={cat.name} className="p-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold text-ink-strong">
                    {cat.name}
                  </h3>
                  <WinnerBadge
                    winner={cat.winner}
                    aBrand={a.brand}
                    bBrand={b.brand}
                  />
                </div>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      cat.winner === "a"
                        ? "bg-success-50 border border-success-100"
                        : "bg-surface-subtle border border-border",
                    )}
                  >
                    <div className="font-medium text-ink-strong flex items-center gap-1">
                      {cat.winner === "a" && (
                        <Trophy className="size-3.5 text-success-600" />
                      )}
                      {a.brand}
                    </div>
                    <p className="mt-1 text-ink-muted">{cat.aDetail}</p>
                  </div>
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      cat.winner === "b"
                        ? "bg-success-50 border border-success-100"
                        : "bg-surface-subtle border border-border",
                    )}
                  >
                    <div className="font-medium text-ink-strong flex items-center gap-1">
                      {cat.winner === "b" && (
                        <Trophy className="size-3.5 text-success-600" />
                      )}
                      {b.brand}
                    </div>
                    <p className="mt-1 text-ink-muted">{cat.bDetail}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink leading-relaxed">
                  <span className="font-medium text-ink-strong">Neden: </span>
                  {cat.reasoning}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 grid sm:grid-cols-2 gap-6">
          <Card className="p-6 border-brand-200 bg-brand-50/40">
            <h3 className="text-xl font-bold text-ink-strong flex items-center gap-2">
              <Check className="size-5 text-brand-600" />
              {whyA.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {whyA.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <Button asChild variant="primary" className="mt-5 w-full">
              <Link href={`/inceleme/${a.slug}`}>
                {a.brand}&apos;i incele
              </Link>
            </Button>
          </Card>

          <Card className="p-6 border-accent-300 bg-accent-50/40">
            <h3 className="text-xl font-bold text-ink-strong flex items-center gap-2">
              <Check className="size-5 text-accent-600" />
              {whyB.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {whyB.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <Button asChild variant="primary" className="mt-5 w-full">
              <Link href={`/inceleme/${b.slug}`}>
                {b.brand}&apos;ı incele
              </Link>
            </Button>
          </Card>
        </section>

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>Sıkça sorulan sorular</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">Diğer sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

function WinnerBadge({
  winner,
  aBrand,
  bBrand,
}: {
  winner: "a" | "b" | "tie";
  aBrand: string;
  bBrand: string;
}) {
  if (winner === "tie") {
    return <Badge variant="neutral">İkisi de güçlü</Badge>;
  }
  return (
    <Badge variant="brand">
      <Trophy className="size-3" /> {winner === "a" ? aBrand : bBrand} bu
      kriterde öne çıkıyor
    </Badge>
  );
}
