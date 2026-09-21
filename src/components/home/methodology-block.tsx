import { useLocale } from "next-intl";
import { ShieldCheck, FileSearch, Network, Smartphone, Tag, Scale, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/site";

const copy = {
  tr: {
    badge: "Bilgi sınırları açık",
    title: "Kaynakları ve sınırları görün",
    body: "Bu site kamuya açık belgeleri ve bağımsız kayıtları bilgi amacıyla düzenler. Laboratuvar testi yapmadığımızı, verilerin eksik veya eski olabileceğini açıkça belirtiriz.",
    cta: "Kaynakları ve sınırları oku",
    criteria: ["Gizlilik politikası", "Bağımsız denetimler", "Protokoller ve güvenlik", "Cihaz desteği", "Fiyat ve yenileme", "Yargı yetkisi ve şeffaflık"],
  },
  en: {
    badge: "Clear information limits",
    title: "See the sources and the limits",
    body: "This site organizes public documents and independent records for information. We state clearly that we do not run laboratory tests and that provider information can be incomplete or outdated.",
    cta: "Read sources and limitations",
    criteria: ["Privacy policy", "Independent audits", "Protocols and security", "Device support", "Pricing and renewal", "Jurisdiction and transparency"],
  },
  de: {
    badge: "Klare Informationsgrenzen",
    title: "Quellen und Grenzen sichtbar",
    body: "Diese Website ordnet öffentliche Dokumente und unabhängige Nachweise zu Informationszwecken. Wir sagen ausdrücklich, dass wir keine Labortests durchführen und Anbieterangaben unvollständig oder veraltet sein können.",
    cta: "Quellen und Grenzen lesen",
    criteria: ["Datenschutzrichtlinie", "Unabhängige Audits", "Protokolle und Sicherheit", "Geräteunterstützung", "Preis und Verlängerung", "Rechtsraum und Transparenz"],
  },
} as const;

const icons = [ShieldCheck, FileSearch, Network, Smartphone, Tag, Scale] as const;

export function MethodologyBlock() {
  const locale = useLocale() as Locale;
  const t = copy[locale];

  return (
    <section className="py-16 sm:py-20 border-y border-border bg-brand-50/30">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              <ShieldCheck className="size-3.5" /> {t.badge}
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">{t.title}</h2>
            <p className="mt-4 text-ink-muted">{t.body}</p>
            <Link href="/methodology" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline">
              {t.cta} <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3">
            {t.criteria.map((label, index) => {
              const Icon = icons[index];
              return (
                <li key={label} className="flex items-start gap-3 rounded-lg border border-border bg-surface-base p-4 dark:bg-surface-subtle">
                  <div className="inline-flex items-center justify-center size-9 rounded-md bg-brand-50 text-brand-600 shrink-0"><Icon className="size-4.5" aria-hidden="true" /></div>
                  <div><div className="text-sm font-medium text-ink-strong">{label}</div></div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
