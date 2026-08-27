"use client";

import { ArrowRight, ExternalLink, FileSearch } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featuredReferenceProducts, getReferenceProduct } from "@/data/products-reference-localized";
import { planckVpnWatch } from "@/data/editorial-watch";
import type { Locale } from "@/lib/site";

const labels = {
  tr: {
    kicker: "Global Core 30 · seçilmiş pazar referansları",
    title: (count: number) => `${count} seçilmiş VPN pazar referansı`,
    intro: "Aşağıdaki sağlayıcılar Global Core 30 görünür kataloğunu tamamlar. Seçim, büyük karşılaştırma ve araştırma kaynaklarında tekrar eden pazar görünürlüğüne dayanır; bu bölüm sıralama veya laboratuvar sonucu değildir.",
    open: "Profili aç",
    watchKicker: "Gelişen sağlayıcı · sıralama dışı",
    watchTitle: "PlanckVPN: kaynak temelli izleme profili",
    watchSummary: "Güncel resmî belgeleri ilginç bir bağımsızlık anlatısı sunuyor; ancak VPN Advisor'ın bağımsız testi ve kamuya açık üçüncü taraf denetimi henüz yok. Bu kart ilk 10'a veya Global Core 30 sayısına dahil değildir.",
    watchFacts: ["WireGuard · OpenVPN · IKEv2", "$7.99/ay · $59.99/yıl", "Bağımsız denetim yok"],
    watchRead: "Kaynak analizini oku",
    watchOfficial: "Resmî kaynak",
  },
  en: {
    kicker: "Global Core 30 · selected market references",
    title: (count: number) => `${count} selected VPN market references`,
    intro: "These providers complete the visible Global Core 30 directory. Selection reflects repeated market visibility across major comparison and research sources; this section is not a ranking or a laboratory result.",
    open: "Open profile",
    watchKicker: "Emerging provider · not ranked",
    watchTitle: "PlanckVPN: source-based watch profile",
    watchSummary: "Current official documents make PlanckVPN an interesting independence case, but VPN Advisor has not run independent tests and no public third-party audit is available yet. This card is outside the Top 10 and does not change the Global Core 30 count.",
    watchFacts: ["WireGuard · OpenVPN · IKEv2", "$7.99/mo · $59.99/year", "No independent audit yet"],
    watchRead: "Read the source analysis",
    watchOfficial: "Official source",
  },
  de: {
    kicker: "Global Core 30 · ausgewählte Marktreferenzen",
    title: (count: number) => `${count} ausgewählte VPN-Marktreferenzen`,
    intro: "Diese Anbieter vervollständigen das sichtbare Global-Core-30-Verzeichnis. Die Auswahl folgt wiederholter Marktpräsenz in großen Vergleichs- und Forschungsquellen; dieser Abschnitt ist keine Rangliste und kein Labortest.",
    open: "Profil öffnen",
    watchKicker: "Aufstrebender Anbieter · nicht gerankt",
    watchTitle: "PlanckVPN: quellenbasiertes Beobachtungsprofil",
    watchSummary: "Die aktuellen offiziellen Dokumente machen PlanckVPN als unabhängiges Angebot interessant; VPN Advisor hat jedoch keine eigenen Tests durchgeführt und ein öffentliches unabhängiges Audit fehlt noch. Diese Karte steht außerhalb der Top 10 und ändert die Global-Core-30-Zahl nicht.",
    watchFacts: ["WireGuard · OpenVPN · IKEv2", "$7,99/Monat · $59,99/Jahr", "Noch kein unabhängiges Audit"],
    watchRead: "Quellenanalyse lesen",
    watchOfficial: "Offizielle Quelle",
  },
} as const;

export function ReferenceVPNDirectory() {
  const rawLocale = useLocale();
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = labels[locale];

  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <div className="mb-8 max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {t.kicker}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            {t.title(featuredReferenceProducts.length)}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted">{t.intro}</p>
        </div>

        <article className="mb-8 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                {t.watchKicker}
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-ink-strong sm:text-2xl">
                {t.watchTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                {t.watchSummary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.watchFacts.map((fact) => (
                  <Badge key={fact} variant="outline" className="border-brand-200 bg-white/70">
                    {fact}
                  </Badge>
                ))}
              </div>
            </div>
            <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-white text-sm font-bold text-brand-700">
              PV
            </span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium">
            <Link
              href={`/blog/${planckVpnWatch.articleSlugs[locale]}`}
              className="inline-flex items-center gap-1.5 text-brand-700 hover:underline"
            >
              <FileSearch className="size-4" /> {t.watchRead} <ArrowRight className="size-3.5" />
            </Link>
            <a
              href={planckVpnWatch.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink-strong hover:underline"
            >
              {t.watchOfficial} <ExternalLink className="size-3.5" />
            </a>
          </div>
        </article>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReferenceProducts.map((base) => {
            const product = getReferenceProduct(base.slug, locale) ?? base;
            return (
              <li key={product.slug}>
                <Card className="h-full transition hover:shadow-sm hover:border-brand-200">
                  <Link href={`/reviews/${product.slug}`} className="flex h-full flex-col p-5">
                    <div className="flex items-start gap-3">
                      <ReferenceMark brand={product.brand} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-ink-strong">{product.brand}</h3>
                          <Badge variant="outline">{product.positioning}</Badge>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">
                          {product.summary}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-700">
                      <FileSearch className="size-3.5" /> {t.open} <ArrowRight className="size-3.5" />
                    </div>
                  </Link>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function ReferenceMark({ brand }: { brand: string }) {
  const letters = brand
    .replace(/VPN/gi, "")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "V";

  return (
    <span
      aria-hidden="true"
      className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-sm font-bold text-brand-700"
    >
      {letters}
    </span>
  );
}
