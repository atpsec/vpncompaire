import { useLocale } from "next-intl";
import { ShieldCheck, FileSearch, Network, Smartphone, Tag, Scale, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/site";

const copy = {
  tr: {
    badge: "Şeffaf karşılaştırma",
    title: "Kaynağı gösteren metodoloji",
    body: "Laboratuvar testi iddiası yerine doğrulanabilir bilgi kullanıyoruz. Sağlayıcıları aynı alanlarda karşılaştırıyor, resmi belge ile bağımsız doğrulamayı birbirinden ayırıyoruz.",
    cta: "Karşılaştırma metodolojisini oku",
    criteria: ["Gizlilik politikası", "Bağımsız denetimler", "Protokoller ve güvenlik", "Cihaz desteği", "Fiyat ve yenileme", "Yargı yetkisi ve şeffaflık"],
  },
  en: {
    badge: "Transparent comparison",
    title: "A methodology that shows its sources",
    body: "We use verifiable information instead of claiming laboratory tests we did not perform. Providers are compared using consistent fields, while provider claims and independent verification are kept distinct.",
    cta: "Read the comparison methodology",
    criteria: ["Privacy policy", "Independent audits", "Protocols and security", "Device support", "Pricing and renewal", "Jurisdiction and transparency"],
  },
  de: {
    badge: "Transparenter Vergleich",
    title: "Eine Methodik mit nachvollziehbaren Quellen",
    body: "Wir nutzen überprüfbare Informationen statt nicht durchgeführte Labortests zu behaupten. Anbieter werden anhand einheitlicher Felder verglichen; Anbieterangaben und unabhängige Verifikation bleiben getrennt.",
    cta: "Vergleichsmethodik lesen",
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
            <Link href="/metodoloji" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline">
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
