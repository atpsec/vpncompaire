import { BookOpen, Info } from "lucide-react";
import type { Locale } from "@/lib/site";

const copy: Record<Locale, { title: string; body: string }> = {
  tr: {
    title: "Bilgilendirme ve kaynak notu",
    body: "VPN Advisor bir test laboratuvarı veya kullanıcı deneyimi platformu değildir. Sağlayıcı bilgilerini resmî belgeler ve doğrulanabilir kaynaklarla açıklarız; bu sitedeki araçlar yalnızca sizin bağlantınızda anlık tanılama yapar ve bir sağlayıcının genel performansını kanıtlamaz.",
  },
  en: {
    title: "Information and source note",
    body: "VPN Advisor is not a testing laboratory or a first-hand user-review platform. Provider information is organized from official documentation and verifiable sources; the tools on this site run one-time diagnostics on your connection and do not prove a provider's general performance.",
  },
  de: {
    title: "Hinweis zu Informationen und Quellen",
    body: "VPN Advisor ist kein Testlabor und keine Plattform für eigene Nutzererfahrungen. Anbieterinformationen werden aus offiziellen Dokumenten und überprüfbaren Quellen geordnet; die Werkzeuge dieser Website führen nur einmalige Diagnosen Ihrer Verbindung durch und belegen keine allgemeine Anbieterleistung.",
  },
};

export function EditorialNotice({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <aside
      aria-label={t.title}
      className="border-t border-border/70 bg-surface-subtle/45"
    >
      <div className="mx-auto flex w-full max-w-7xl items-start gap-2.5 px-4 py-4 text-xs sm:px-6 lg:px-8">
        <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-base text-ink-subtle ring-1 ring-border/80">
          <BookOpen className="size-4" aria-hidden="true" />
        </div>
        <p className="max-w-4xl leading-relaxed text-ink-subtle">
          <span className="font-semibold text-ink-muted">{t.title}:</span>{" "}
          {t.body}
        </p>
        <Info className="ml-auto mt-0.5 hidden size-3.5 shrink-0 text-ink-faint sm:block" aria-hidden="true" />
      </div>
    </aside>
  );
}
