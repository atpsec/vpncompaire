import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  FileSearch,
  Gauge,
  Tv,
  Tag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "methodology" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const CRITERIA: ReadonlyArray<{ key: string; Icon: LucideIcon }> = [
  { key: "privacy", Icon: ShieldCheck },
  { key: "audits", Icon: FileSearch },
  { key: "speed", Icon: Gauge },
  { key: "streaming", Icon: Tv },
  { key: "pricing", Icon: Tag },
  { key: "usability", Icon: Sparkles },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MethodologyView />;
}

function MethodologyView() {
  const t = useTranslations("methodology");

  return (
    <Container size="md" className="py-16 sm:py-24">
      <header>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          <ShieldCheck className="size-3.5" /> {t("badge")}
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          {t("h1")}
        </h1>
        <p className="mt-6 text-lg text-ink-muted leading-relaxed">
          {t("intro")}
        </p>
      </header>

      <ol className="mt-12 space-y-8">
        {CRITERIA.map(({ key, Icon }, i) => (
          <li key={key} className="grid grid-cols-[auto_1fr] gap-5">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                <Icon className="size-5" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-ink-strong">
                {i + 1}. {t(`criteria.${key}.title`)}
              </h2>
              <p className="mt-2 text-ink leading-relaxed">
                {t(`criteria.${key}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6">
        <h2 className="text-xl font-semibold text-ink-strong">
          {t("editorial.title")}
        </h2>
        <p className="mt-3 text-ink leading-relaxed">
          {t.rich("editorial.body", {
            link: (chunks) => (
              <Link href="/reklam-aciklamasi" className="text-brand-700 underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </section>
    </Container>
  );
}
