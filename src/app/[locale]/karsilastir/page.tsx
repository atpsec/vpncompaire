import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";

export const metadata: Metadata = {
  title: "VPN Karşılaştırmaları (2026)",
  description:
    "VPN'leri kafa kafaya karşılaştır: NordVPN vs Surfshark, ExpressVPN vs NordVPN, Proton vs Mullvad, ücretsiz vs ücretli.",
};

type Props = { params: Promise<{ locale: string }> };

type Comparison = {
  slug: string;
  title: string;
  desc: string;
  available: boolean;
  tags: readonly string[];
  pair?: readonly [string, string];
};

const comparisons: readonly Comparison[] = [
  {
    slug: "nordvpn-vs-surfshark",
    title: "NordVPN vs Surfshark",
    desc: "Aynı şemsiye altında iki dev — güç ile bütçenin karşılaşması.",
    available: true,
    tags: ["Popüler"],
    pair: ["nordvpn", "surfshark"],
  },
  {
    slug: "expressvpn-vs-nordvpn",
    title: "ExpressVPN vs NordVPN",
    desc: "İki premium devin yan yana analizi.",
    available: true,
    tags: ["Yüksek hacim"],
    pair: ["expressvpn", "nordvpn"],
  },
  {
    slug: "proton-vs-mullvad",
    title: "Proton VPN vs Mullvad",
    desc: "Gizlilik puristleri için saf karşılaştırma.",
    available: true,
    tags: ["Gizlilik odaklı"],
    pair: ["proton-vpn", "mullvad"],
  },
  {
    slug: "ucretsiz-vs-ucretli-vpn",
    title: "Ücretsiz vs Ücretli VPN",
    desc: "Ücretsiz seçenekler ne kadar güvenli? Karar matrisi.",
    available: false,
    tags: ["Yakında"],
  },
] as const;

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Karşılaştırma", path: "/karsilastir" },
        ])}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Karşılaştırma</span>
        </p>

        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN Karşılaştırmaları
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            VPN&apos;leri yan yana, kategori bazlı puanlama ve net &quot;hangisi
            sana uygun&quot; karar matrisleri ile karşılaştır.
          </p>
        </header>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {comparisons.map((c) => {
            const a = c.pair ? getProduct(c.pair[0]) : null;
            const b = c.pair ? getProduct(c.pair[1]) : null;

            const inner = (
              <Card
                className={
                  "p-5 h-full " +
                  (c.available
                    ? "hover:border-brand-300 hover:shadow-md transition-all"
                    : "opacity-60 cursor-not-allowed")
                }
              >
                <div className="flex items-center gap-4">
                  {a && b ? (
                    <div className="flex items-center -space-x-2 shrink-0">
                      <VPNLogo
                        slug={a.slug}
                        size={44}
                        className="ring-2 ring-white"
                      />
                      <VPNLogo
                        slug={b.slug}
                        size={44}
                        className="ring-2 ring-white"
                      />
                    </div>
                  ) : null}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h2
                        className={
                          "text-lg font-semibold " +
                          (c.available
                            ? "text-ink-strong group-hover:text-brand-700"
                            : "text-ink-strong")
                        }
                      >
                        {c.title}
                      </h2>
                      {c.tags.map((t) => (
                        <Badge
                          key={t}
                          variant={c.available ? "brand" : "neutral"}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-ink-muted">{c.desc}</p>

                {a && b ? (
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <ScoreCell brand={a.brand} score={a.score} />
                    <ScoreCell brand={b.brand} score={b.score} />
                  </dl>
                ) : null}

                {c.available && (
                  <div className="mt-4 inline-flex items-center text-xs font-medium text-brand-700">
                    Karşılaştırmayı oku <ArrowRight className="ml-1 size-3" />
                  </div>
                )}
              </Card>
            );

            return c.available ? (
              <Link
                key={c.slug}
                href={`/karsilastir/${c.slug}`}
                className="group"
              >
                {inner}
              </Link>
            ) : (
              <div key={c.slug}>{inner}</div>
            );
          })}
        </div>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">
            Karşılaştırmadan önce, tüm VPN&apos;lerin tek tek incelemesi
          </p>
          <Link
            href="/en-iyi-vpn"
            className="mt-2 inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:underline"
          >
            En İyi 7 VPN sıralamasına git <ArrowRight className="size-4" />
          </Link>
        </section>
      </Container>
    </>
  );
}

function ScoreCell({ brand, score }: { brand: string; score: number }) {
  return (
    <div className="rounded-md bg-surface-subtle/60 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-ink-subtle font-medium line-clamp-1">
        {brand}
      </div>
      <div className="mt-0.5 flex items-baseline gap-0.5">
        <span className="text-base font-bold text-ink-strong tabular-nums">
          {score.toFixed(1)}
        </span>
        <span className="text-[10px] text-ink-subtle">/10</span>
      </div>
    </div>
  );
}
