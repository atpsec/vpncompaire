import { ArrowRight, ShieldCheck, FileSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import type { Locale } from "@/lib/site";
import { getLocalizedLinkHref, type AppLocale } from "@/lib/i18n-paths";

export type UseCasePick = { slug: string; why: string; bestFor: string };
export type UseCaseFAQ = { q: string; a: string };
export type UseCasePageProps = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  Icon: LucideIcon;
  badgeLabel: string;
  picks: readonly UseCasePick[];
  faqs: readonly UseCaseFAQ[];
  considerations: { title: string; body: string }[];
  relatedLinks: { label: string; href: string }[];
};

export function UseCasePage({ slug, title, tagline, summary, Icon, badgeLabel, picks, faqs, considerations, relatedLinks }: UseCasePageProps) {
  const t = useTranslations("useCase");
  const locale = useLocale() as Locale;
  const note = locale === "tr"
    ? "Bu liste laboratuvar puanı veya kesin sıralama değildir. Kullanım senaryosuyla ilişkili özellikleri güçlü biçimde belgeleyen sağlayıcı örneklerini gösterir; karar vermeden önce güncel resmi kaynakları kontrol edin."
    : locale === "de"
      ? "Diese Liste ist keine Laborwertung oder definitive Rangliste. Sie zeigt Anbieterbeispiele mit dokumentierten Merkmalen für den jeweiligen Anwendungsfall; prüfen Sie vor einer Entscheidung aktuelle Primärquellen."
      : "This list is not a laboratory score or definitive ranking. It shows provider examples with documented features relevant to the use case; verify current primary sources before deciding.";
  const profileLabel = locale === "tr" ? "Sağlayıcı profili" : locale === "de" ? "Anbieterprofil" : "Provider profile";
  const examplesHeading = locale === "tr" ? "Bu senaryo için incelenebilecek sağlayıcı profilleri" : locale === "de" ? "Anbieterprofile für diesen Anwendungsfall" : "Provider profiles to consider for this use case";

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: t("breadcrumb.home"), path: "/" }, { name: t("breadcrumb.hub"), path: "/en-iyi" }, { name: title, path: `/en-iyi/${slug}` }], locale)} />
      <JsonLd data={faqSchema([...faqs])} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">{t("breadcrumb.home")}</Link>{" "}›{" "}<Link href="/en-iyi" className="hover:text-ink">{t("breadcrumb.hub")}</Link>{" "}› <span className="text-ink-strong">{badgeLabel}</span></p>

        <header className="mt-6"><Badge variant="brand"><Icon className="size-3" /> {badgeLabel}</Badge><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">{title}</h1><p className="mt-4 text-lg text-ink-muted">{tagline}</p></header>

        <Card className="mt-8 p-6 bg-brand-50/40"><h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2"><ShieldCheck className="size-5 text-brand-600" /> {t("summaryTitle")}</h2><p className="mt-3 text-ink leading-relaxed">{summary}</p></Card>
        <Card className="mt-4 p-5"><div className="flex items-start gap-3"><FileSearch className="size-5 text-brand-600 mt-0.5 shrink-0" /><p className="text-sm text-ink leading-relaxed">{note}</p></div></Card>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">{examplesHeading}</h2>
          <div className="mt-6 space-y-4">
            {picks.map((pick) => {
              const product = getProduct(pick.slug, locale === "tr" ? "tr" : "en");
              if (!product) return null;
              return (
                <Card key={pick.slug} className="p-6">
                  <div className="flex flex-wrap items-start gap-4">
                    <VPNLogo slug={product.slug} size={56} />
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex flex-wrap items-center gap-2"><h3 className="text-xl font-semibold text-ink-strong">{product.brand}</h3><Badge variant="brand">{pick.bestFor}</Badge></div>
                      <p className="mt-3 text-ink leading-relaxed">{pick.why}</p>
                      <div className="mt-4 flex flex-wrap gap-3"><Button asChild variant="primary" size="sm"><a href={product.pricingUrl} rel="noopener nofollow" target="_blank">{t("ctaOfficial", { brand: product.brand })}<ArrowRight className="size-4" /></a></Button><Button asChild variant="ghost" size="sm"><Link href={`/inceleme/${product.slug}`}>{profileLabel}</Link></Button></div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {considerations.length > 0 && <section className="mt-16 prose prose-stone max-w-none"><h2>{t("considerationsHeading")}</h2>{considerations.map((c) => <div key={c.title}><h3>{c.title}</h3><p>{c.body}</p></div>)}</section>}
        <section className="mt-16 prose prose-stone max-w-none"><h2>{t("faqHeading")}</h2>{faqs.map((f) => <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}</section>
        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center"><p className="text-sm text-ink-muted">{t("relatedHeading")}</p><div className="mt-3 flex flex-wrap gap-2 justify-center">{relatedLinks.map((l) => {
          const isTrOnly = l.href === "/en-iyi/turkiye" || l.href === "/en-iyi/yurt-disindaki-turkler";
          const href = l.href.startsWith("/karsilastir/")
            ? getLocalizedLinkHref({ locale: locale as AppLocale, section: "comparison", contentId: l.href.split("/").pop() })
            : l.href;
          return isTrOnly ? <a key={l.href} href={l.href} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">{l.label}</a> : <Link key={l.href} href={href} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300">{l.label}</Link>;
        })}</div></section>
      </Container>
    </>
  );
}

