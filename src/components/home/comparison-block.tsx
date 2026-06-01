import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { VPNLogo } from "@/components/brand/vpn-logo";

const COMPARISONS = [
  {
    slug: "nordvpn-vs-surfshark",
    title: "NordVPN vs Surfshark",
    logos: ["nordvpn", "surfshark"] as const,
  },
  {
    slug: "expressvpn-vs-nordvpn",
    title: "ExpressVPN vs NordVPN",
    logos: ["expressvpn", "nordvpn"] as const,
  },
  {
    slug: "proton-vs-mullvad",
    title: "Proton VPN vs Mullvad",
    logos: ["proton-vpn", "mullvad"] as const,
  },
  {
    slug: "ucretsiz-vs-ucretli-vpn",
    titleKey: "freeVsPaidTitle" as const,
    logos: null,
  },
];

export function ComparisonBlock() {
  const t = useTranslations("home.comparisons");
  const blockT = useTranslations("homeBlocks.comparisons");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">
            {t("title")}
          </h2>
          <Link
            href="/karsilastir"
            className="text-sm font-medium text-brand-700 hover:underline inline-flex items-center gap-1"
          >
            {blockT("allLink")} <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {COMPARISONS.map((c) => {
            const title = c.title ?? blockT(`items.freeVsPaidTitle` as never);
            const titleResolved = c.titleKey
              ? blockT(`items.freeVsPaidTitle` as never) as unknown as string
              : (c.title as string);
            void title;
            return (
              <Link
                key={c.slug}
                href={`/karsilastir/${c.slug}`}
                className="group"
              >
                <Card className="p-5 hover:border-brand-300 hover:shadow-md transition-all h-full">
                  {c.logos && (
                    <div className="mb-3 flex items-center gap-2">
                      <VPNLogo slug={c.logos[0]} size={32} />
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-subtle">
                        vs
                      </span>
                      <VPNLogo slug={c.logos[1]} size={32} />
                    </div>
                  )}
                  <h3 className="font-semibold text-ink-strong group-hover:text-brand-700">
                    {c.titleKey
                      ? blockT("freeVsPaidTitle")
                      : (c.title as string)}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {blockT(`items.${c.slug}` as never)}
                  </p>
                  <div className="mt-3 inline-flex items-center text-xs font-medium text-brand-700">
                    {blockT("readLink")} <ArrowRight className="ml-1 size-3" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
