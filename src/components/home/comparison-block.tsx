import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { SECTION_SLUGS, DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n-paths";

const COMPARISONS = [
  { slug: "nordvpn-vs-surfshark", title: "NordVPN vs Surfshark", logos: ["nordvpn", "surfshark"] as const },
  { slug: "expressvpn-vs-nordvpn", title: "ExpressVPN vs NordVPN", logos: ["expressvpn", "nordvpn"] as const },
  { slug: "proton-vs-mullvad", title: "Proton VPN vs Mullvad", logos: ["proton-vpn", "mullvad"] as const },
];

export function ComparisonBlock() {
  const blockT = useTranslations("homeBlocks.comparisons");
  const rawLocale = useLocale();
  const locale: AppLocale = rawLocale === "en" || rawLocale === "de" ? rawLocale : DEFAULT_LOCALE;
  const comparisonBase = `/${SECTION_SLUGS[locale].comparison}`;
  const title = locale === "tr" ? "Kaynak temelli VPN karşılaştırmaları" : locale === "de" ? "Quellenbasierte VPN-Vergleiche" : "Source-based VPN comparisons";
  const allLink = locale === "tr" ? "Tüm karşılaştırmalar" : locale === "de" ? "Alle Vergleiche" : "All comparisons";
  const readLink = locale === "tr" ? "Özellikleri karşılaştır" : locale === "de" ? "Merkmale vergleichen" : "Compare features";

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">{title}</h2>
          <Link href={comparisonBase} className="text-sm font-medium text-brand-700 hover:underline inline-flex items-center gap-1">{allLink} <ArrowRight className="size-3.5" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {COMPARISONS.map((c) => (
            <Link key={c.slug} href={`${comparisonBase}/${c.slug}`} className="group">
              <Card className="p-5 hover:border-brand-300 hover:shadow-md transition-all h-full">
                <div className="mb-3 flex items-center gap-2"><VPNLogo slug={c.logos[0]} size={32} /><span className="text-xs font-bold uppercase tracking-wider text-ink-subtle">vs</span><VPNLogo slug={c.logos[1]} size={32} /></div>
                <h3 className="font-semibold text-ink-strong group-hover:text-brand-700">{c.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{blockT(`items.${c.slug}` as never)}</p>
                <div className="mt-3 inline-flex items-center text-xs font-medium text-brand-700">{readLink} <ArrowRight className="ml-1 size-3" /></div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
