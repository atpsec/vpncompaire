"use client";

import { ArrowRight, FileSearch } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { referenceProducts, getReferenceProduct } from "@/data/products-reference-localized";
import type { Locale } from "@/lib/site";

const labels = {
  tr: {
    kicker: "Genişletilmiş sağlayıcı dizini",
    title: "30 ek VPN sağlayıcı profili",
    intro: "Aşağıdaki sağlayıcılar sıralama değildir. Küresel VPN pazarını daha geniş kapsamak için aynı kaynak-temelli profil yapısına eklenmiştir.",
    open: "Profili aç",
  },
  en: {
    kicker: "Extended provider directory",
    title: "30 additional VPN provider profiles",
    intro: "The providers below are not a ranking. They extend market coverage using the same source-based provider-profile structure.",
    open: "Open profile",
  },
  de: {
    kicker: "Erweitertes Anbieterverzeichnis",
    title: "30 weitere VPN-Anbieterprofile",
    intro: "Die folgenden Anbieter sind keine Rangliste. Sie erweitern die Marktabdeckung mit derselben quellenbasierten Profilstruktur.",
    open: "Profil öffnen",
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
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted">{t.intro}</p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {referenceProducts.map((base) => {
            const product = getReferenceProduct(base.slug, locale) ?? base;
            return (
              <li key={product.slug}>
                <Card className="h-full transition hover:shadow-sm hover:border-brand-200">
                  <Link href={`/inceleme/${product.slug}`} className="flex h-full flex-col p-5">
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
