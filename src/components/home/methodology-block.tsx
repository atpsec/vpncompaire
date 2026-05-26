import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  FileSearch,
  Gauge,
  Tv,
  Tag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";

const criteria = [
  { key: "privacy", Icon: ShieldCheck },
  { key: "audits", Icon: FileSearch },
  { key: "speed", Icon: Gauge },
  { key: "streaming", Icon: Tv },
  { key: "pricing", Icon: Tag },
  { key: "usability", Icon: Sparkles },
];

export function MethodologyBlock() {
  const t = useTranslations("home.methodology");
  const blockT = useTranslations("homeBlocks.methodology");

  return (
    <section className="py-16 sm:py-20 border-y border-border bg-brand-50/30">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              <ShieldCheck className="size-3.5" /> {blockT("badge")}
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">
              {t("title")}
            </h2>
            <p className="mt-4 text-ink-muted">{t("body")}</p>
            <Link
              href="/metodoloji"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
            >
              {t("cta")} <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3">
            {criteria.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 dark:bg-surface-subtle"
              >
                <div className="inline-flex items-center justify-center size-9 rounded-md bg-brand-50 text-brand-600 shrink-0">
                  <Icon className="size-4.5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ink-strong">
                    {blockT(`criteria.${key}` as never)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
