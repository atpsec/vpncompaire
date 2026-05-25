import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { products } from "@/data/products";

export function Hero() {
  const t = useTranslations("home.hero");
  const auditCount = products.filter((p) => p.highlights.audits).length;

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-brand-50/40 via-background to-background">
      <Container>
        <div className="mx-auto max-w-3xl py-20 sm:py-28 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            <CheckCircle2 className="size-3.5" /> 2026 — Düzenli güncellenen
            sıralama
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-strong text-balance">
            {t("h1")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-ink-muted text-balance">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/en-iyi-vpn">
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/metodoloji">{t("ctaSecondary")}</Link>
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-ink-subtle">
            <li className="inline-flex items-center gap-1.5">
              <span className="font-semibold text-ink">
                {products.length}
              </span>{" "}
              {t("trust.tested")}
            </li>
            <li aria-hidden="true" className="text-ink-faint">
              •
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="font-semibold text-ink">{auditCount}</span>{" "}
              {t("trust.audits")}
            </li>
            <li aria-hidden="true" className="text-ink-faint">
              •
            </li>
            <li>
              {t("trust.updated")}: <span className="font-semibold text-ink">Mayıs 2026</span>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
