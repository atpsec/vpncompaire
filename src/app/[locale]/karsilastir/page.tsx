import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "VPN Karşılaştırmaları (2026)",
  description:
    "VPN'leri kafa kafaya karşılaştır: NordVPN vs Surfshark, ExpressVPN vs NordVPN, Proton vs Mullvad, ücretsiz vs ücretli.",
};

type Props = { params: Promise<{ locale: string }> };

const comparisons = [
  {
    slug: "nordvpn-vs-surfshark",
    title: "NordVPN vs Surfshark",
    desc: "Aynı şemsiye altında iki dev — güç ile bütçenin karşılaşması.",
    available: true,
    tags: ["Popüler"],
  },
  {
    slug: "expressvpn-vs-nordvpn",
    title: "ExpressVPN vs NordVPN",
    desc: "İki premium devin yan yana analizi.",
    available: true,
    tags: ["Yüksek hacim"],
  },
  {
    slug: "proton-vs-mullvad",
    title: "Proton VPN vs Mullvad",
    desc: "Gizlilik puristleri için saf karşılaştırma.",
    available: true,
    tags: ["Gizlilik odaklı"],
  },
  {
    slug: "ucretsiz-vs-ucretli-vpn",
    title: "Ücretsiz vs Ücretli VPN",
    desc: "Ücretsiz seçenekler ne kadar güvenli? Karar matrisi.",
    available: false,
    tags: ["Yakında"],
  },
];

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
          {comparisons.map((c) =>
            c.available ? (
              <Link key={c.slug} href={`/karsilastir/${c.slug}`} className="group">
                <Card className="p-5 hover:border-brand-300 hover:shadow-md transition-all h-full">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-semibold text-ink-strong group-hover:text-brand-700">
                      {c.title}
                    </h2>
                    {c.tags.map((t) => (
                      <Badge key={t} variant="brand">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">{c.desc}</p>
                  <div className="mt-3 inline-flex items-center text-xs font-medium text-brand-700">
                    Karşılaştırmayı oku <ArrowRight className="ml-1 size-3" />
                  </div>
                </Card>
              </Link>
            ) : (
              <Card
                key={c.slug}
                className="p-5 opacity-60 cursor-not-allowed h-full"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-semibold text-ink-strong">
                    {c.title}
                  </h2>
                  {c.tags.map((t) => (
                    <Badge key={t} variant="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>
                <p className="mt-2 text-sm text-ink-muted">{c.desc}</p>
              </Card>
            ),
          )}
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
