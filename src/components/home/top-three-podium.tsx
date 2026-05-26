import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts, type Product } from "@/data/products";

export function TopThreePodium() {
  const top = rankedProducts().slice(0, 3);
  return (
    <section
      aria-label="Editor's three picks"
      className="border-b border-border bg-surface-subtle/40"
    >
      <Container>
        <div className="mx-auto max-w-3xl py-12 sm:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
            The shortlist
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-ink-strong">
            Three picks, ranked
          </h2>
          <p className="mt-3 text-ink-muted">
            After ten weeks of testing, three providers separated themselves.
            Below are the editor&apos;s top three; the full list of ten follows.
          </p>

          <ol className="mt-10 divide-y divide-border border-y border-border">
            {top.map((p, i) => (
              <EditorialEntry key={p.slug} product={p} rank={i + 1} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function EditorialEntry({
  product,
  rank,
}: {
  product: Product;
  rank: number;
}) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-6 py-8 sm:gap-8">
      <div className="pt-1">
        <span className="block font-serif text-5xl sm:text-6xl font-medium leading-none text-ink-strong tabular-nums">
          {String(rank).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <VPNLogo slug={product.slug} size={40} />
          <div>
            <h3 className="font-serif text-2xl font-medium tracking-tight text-ink-strong">
              {product.brand}
            </h3>
            <p className="text-xs text-ink-subtle italic">
              {product.positioning}
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
          {product.highlights.jurisdiction && (
            <div>
              <dt className="inline text-ink-subtle">Jurisdiction —</dt>{" "}
              <dd className="inline">{product.highlights.jurisdiction}</dd>
            </div>
          )}
          <div>
            <dt className="inline text-ink-subtle">From —</dt>{" "}
            <dd className="inline tabular-nums">
              ${product.priceFromUsd.toFixed(2)}/mo
            </dd>
          </div>
        </dl>

        <div className="mt-5">
          <Link
            href={`/inceleme/${product.slug}`}
            className="group inline-flex items-center gap-1.5 border-b border-ink-strong pb-0.5 text-sm font-medium text-ink-strong hover:border-brand-600 hover:text-brand-700"
          >
            Read the full review
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </li>
  );
}
