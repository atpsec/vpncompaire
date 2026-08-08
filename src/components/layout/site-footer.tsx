import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck, Info } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig, type Locale } from "@/lib/site";
import { SocialLinks, SOCIAL_LINKS_ENABLED } from "@/components/layout/social-links";

const copy = {
  tr: {
    tagline: "Kaynak temelli VPN bilgi, özellik karşılaştırması ve dijital gizlilik rehberleri.",
    vpn: "VPN Karşılaştır",
    methodology: "Karşılaştırma Metodolojisi",
    disclosure: "Reklam açıklaması: Bu site Google AdSense reklamları ve bazı sağlayıcı ortaklık bağlantılarından gelir elde edebilir. Reklam veya komisyon, doğrulanabilir bir teknik bilgiyi değiştirmez. Sağlayıcı profilleri laboratuvar testi veya kullanıcı puanı değildir.",
    madeWith: "Bağımsız bilgi projesi · Resmi bir kuruluş değildir",
  },
  en: {
    tagline: "Source-based VPN information, feature comparisons and digital privacy guides.",
    vpn: "Compare VPNs",
    methodology: "Comparison Methodology",
    disclosure: "Advertising disclosure: This site may earn revenue from Google AdSense and some provider affiliate links. Advertising or commission does not change verifiable technical facts. Provider profiles are not laboratory tests or user ratings.",
    madeWith: "Independent information project · Not an official organisation",
  },
  de: {
    tagline: "Quellenbasierte VPN-Informationen, Funktionsvergleiche und Datenschutzratgeber.",
    vpn: "VPN-Vergleich",
    methodology: "Vergleichsmethodik",
    disclosure: "Werbehinweis: Diese Website kann Einnahmen über Google AdSense und einige Affiliate-Links erzielen. Werbung oder Provision verändert keine überprüfbaren technischen Fakten. Anbieterprofile sind keine Labortests oder Nutzerbewertungen.",
    madeWith: "Unabhängiges Informationsprojekt · Keine offizielle Organisation",
  },
} as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface-subtle/60">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-ink-strong"><ShieldCheck className="size-5 text-brand-600" />{siteConfig.name}</Link>
            <p className="mt-3 max-w-sm text-sm text-ink-muted">{c.tagline}</p>
            {SOCIAL_LINKS_ENABLED && <div className="mt-5"><p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("sections.follow")}</p><div className="mt-2"><SocialLinks /></div><p className="mt-2 text-[11px] text-ink-subtle">{t("socialSoon")}</p></div>}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-strong">{t("sections.site")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/en-iyi-vpn" className="text-ink-muted hover:text-ink">{c.vpn}</Link></li>
              <li><Link href="/karsilastir" className="text-ink-muted hover:text-ink">{tNav("compare")}</Link></li>
              <li><Link href="/cihazlar" className="text-ink-muted hover:text-ink">{tNav("devices")}</Link></li>
              <li><Link href="/rehber" className="text-ink-muted hover:text-ink">{tNav("guides")}</Link></li>
              <li><Link href="/metodoloji" className="text-ink-muted hover:text-ink">{c.methodology}</Link></li>
              <li><Link href="/hakkimizda" className="text-ink-muted hover:text-ink">{t("links.about")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-strong">{t("sections.tools")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/sana-uygun-vpn" className="text-ink-muted hover:text-ink">{tNav("quiz")}</Link></li>
              <li><Link href="/hesaplayici" className="text-ink-muted hover:text-ink">{tNav("calculator")}</Link></li>
              <li><Link href="/sunucu-haritasi" className="text-ink-muted hover:text-ink">{tNav("filter")}</Link></li>
              <li><Link href="/sozluk" className="text-ink-muted hover:text-ink">{tNav("glossary")}</Link></li>
              <li><Link href="/iptal-ve-iade" className="text-ink-muted hover:text-ink">{t("links.cancel")}</Link></li>
              <li><Link href="/guvenlik-araclari" className="text-ink-muted hover:text-ink">{t("links.security")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-strong">{t("sections.legal")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/reklam-aciklamasi" className="text-ink-muted hover:text-ink">{t("links.disclosure")}</Link></li>
              <li><Link href="/yasal-uyari" className="text-ink-muted hover:text-ink">{t("links.legalNotice")}</Link></li>
              <li><Link href="/gizlilik" className="text-ink-muted hover:text-ink">{t("links.privacy")}</Link></li>
              <li><Link href="/cerez-politikasi" className="text-ink-muted hover:text-ink">{t("links.cookies")}</Link></li>
              <li><Link href="/sartlar" className="text-ink-muted hover:text-ink">{t("links.terms")}</Link></li>
              <li><Link href="/iletisim" className="text-ink-muted hover:text-ink">{t("links.contact")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-border/70 bg-background/60 p-4">
          <div className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted"><Info className="mt-0.5 size-4 shrink-0 text-accent-600" aria-hidden="true" /><p><span className="font-semibold text-ink">{t("disclosureTitle")}</span>{" "}{c.disclosure}{" "}<Link href="/reklam-aciklamasi" className="font-medium text-brand-700 hover:underline whitespace-nowrap">{t("links.disclosure")} →</Link></p></div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-subtle sm:flex-row sm:justify-between"><p>© {year} {siteConfig.name}. {t("copyright")}</p><p>{c.madeWith}</p></div>
      </div>
    </footer>
  );
}
