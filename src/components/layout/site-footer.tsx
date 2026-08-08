import { useLocale } from "next-intl";
import { ShieldCheck, Info } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { SocialLinks, SOCIAL_LINKS_ENABLED } from "@/components/layout/social-links";
import { referenceCopy } from "@/lib/reference-copy";

const COPY = {
  tr: {
    tagline: "VPN teknolojileri ve sağlayıcı özellikleri için kaynak gösteren bağımsız bilgi ve karşılaştırma rehberi.",
    site: "Site", tools: "Araçlar", legal: "Yasal", follow: "Takip et", compare: "Karşılaştırma", devices: "Cihazlar", guides: "Rehberler", methodology: "Kaynak Politikası", about: "Hakkımızda", quiz: "Seçim Aracı", calculator: "Hesaplayıcı", filter: "Özellik Filtresi", glossary: "Sözlük", cancel: "İptal & İade", security: "Güvenlik araçları", disclosure: "Reklam Açıklaması", legalNotice: "Yasal Uyarı", privacy: "Gizlilik Politikası", cookies: "Çerez Politikası", terms: "Kullanım Şartları", contact: "İletişim", disclosureTitle: "Şeffaflık notu.", disclosureBody: "Google AdSense reklamları gösterilebilir ve bazı sağlayıcı bağlantıları ileride ortaklık bağlantısı olabilir. Site laboratuvar testi veya gerçek olmayan editoryal puan iddiasında bulunmaz; karşılaştırmalar kaynak temelli bilgi alanlarına dayanır.", learnMore: "Detaylı bilgi", copyright: "Tüm hakları saklıdır.", madeWith: "Kaynak temelli VPN bilgi projesi · Resmi bir kuruluş değildir", socialSoon: "Sosyal medya hesapları yakında.",
  },
  en: {
    tagline: "A source-based information and comparison guide for VPN technology and provider features.",
    site: "Site", tools: "Tools", legal: "Legal", follow: "Follow", compare: "Compare", devices: "Devices", guides: "Guides", methodology: "Source Policy", about: "About", quiz: "Selection Tool", calculator: "Calculator", filter: "Feature Filter", glossary: "Glossary", cancel: "Cancellation & Refunds", security: "Security tools", disclosure: "Advertising Disclosure", legalNotice: "Legal Notice", privacy: "Privacy Policy", cookies: "Cookie Policy", terms: "Terms", contact: "Contact", disclosureTitle: "Transparency note.", disclosureBody: "Google AdSense ads may appear and some provider links may become affiliate links. The site does not claim lab testing or invented editorial scores; comparisons are based on source-backed information fields.", learnMore: "Learn more", copyright: "All rights reserved.", madeWith: "Source-based VPN information project · Not an official organisation", socialSoon: "Social accounts coming soon.",
  },
  de: {
    tagline: "Ein quellenbasierter Informations- und Vergleichsratgeber für VPN-Technik und Anbieterfunktionen.",
    site: "Website", tools: "Tools", legal: "Rechtliches", follow: "Folgen", compare: "Vergleichen", devices: "Geräte", guides: "Ratgeber", methodology: "Quellenrichtlinie", about: "Über uns", quiz: "Auswahlhilfe", calculator: "Rechner", filter: "Funktionsfilter", glossary: "Glossar", cancel: "Kündigung & Erstattung", security: "Sicherheitstools", disclosure: "Werbehinweis", legalNotice: "Rechtlicher Hinweis", privacy: "Datenschutz", cookies: "Cookie-Richtlinie", terms: "Bedingungen", contact: "Kontakt", disclosureTitle: "Transparenzhinweis.", disclosureBody: "Google-AdSense-Anzeigen können erscheinen; einige Anbieterlinks können künftig Affiliate-Links sein. Die Website behauptet keine Labortests oder erfundene redaktionelle Bewertungen; Vergleiche basieren auf quellenbelegten Informationsfeldern.", learnMore: "Mehr erfahren", copyright: "Alle Rechte vorbehalten.", madeWith: "Quellenbasiertes VPN-Informationsprojekt · Keine offizielle Organisation", socialSoon: "Social-Media-Konten folgen.",
  },
} as const;

export function SiteFooter() {
  const rawLocale = useLocale();
  const locale = rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr";
  const c = COPY[locale];
  const ref = referenceCopy(locale);
  const year = new Date().getFullYear();

  return <footer className="mt-24 border-t border-border bg-surface-subtle/60">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 font-semibold text-ink-strong"><ShieldCheck className="size-5 text-brand-600" />{siteConfig.name}</Link>
          <p className="mt-3 max-w-sm text-sm text-ink-muted">{c.tagline}</p>
          {SOCIAL_LINKS_ENABLED && <div className="mt-5"><p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{c.follow}</p><div className="mt-2"><SocialLinks /></div><p className="mt-2 text-[11px] text-ink-subtle">{c.socialSoon}</p></div>}
        </div>
        <FooterGroup title={c.site} links={[["/en-iyi-vpn", ref.navProfiles], ["/karsilastir", c.compare], ["/cihazlar", c.devices], ["/rehber", c.guides], ["/metodoloji", c.methodology], ["/hakkimizda", c.about]]} />
        <FooterGroup title={c.tools} links={[["/sana-uygun-vpn", c.quiz], ["/hesaplayici", c.calculator], ["/sunucu-haritasi", c.filter], ["/sozluk", c.glossary], ["/iptal-ve-iade", c.cancel], ["/guvenlik-araclari", c.security]]} />
        <FooterGroup title={c.legal} links={[["/reklam-aciklamasi", c.disclosure], ["/yasal-uyari", c.legalNotice], ["/gizlilik", c.privacy], ["/cerez-politikasi", c.cookies], ["/sartlar", c.terms], ["/iletisim", c.contact]]} />
      </div>
      <div className="mt-10 rounded-lg border border-border/70 bg-background/60 p-4"><div className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted"><Info className="mt-0.5 size-4 shrink-0 text-accent-600" aria-hidden="true" /><p><span className="font-semibold text-ink">{c.disclosureTitle}</span>{" "}{c.disclosureBody}{" "}<Link href="/reklam-aciklamasi" className="font-medium text-brand-700 hover:underline whitespace-nowrap">{c.learnMore} →</Link></p></div></div>
      <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-subtle sm:flex-row sm:justify-between"><p>© {year} {siteConfig.name}. {c.copyright}</p><p>{c.madeWith}</p></div>
    </div>
  </footer>;
}

function FooterGroup({ title, links }: { title: string; links: ReadonlyArray<readonly [string, string]> }) {
  return <div><h3 className="text-sm font-semibold text-ink-strong">{title}</h3><ul className="mt-3 space-y-2 text-sm">{links.map(([href, label]) => <li key={href}><Link href={href} className="text-ink-muted hover:text-ink">{label}</Link></li>)}</ul></div>;
}
