import { useTranslations } from "next-intl";
import {
  Lock,
  Tv,
  Gamepad2,
  Plane,
  Flag,
  Globe2,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";

const useCases = [
  { slug: "gizlilik", key: "privacy", Icon: Lock, tone: "brand" },
  { slug: "streaming", key: "streaming", Icon: Tv, tone: "accent" },
  { slug: "oyun", key: "gaming", Icon: Gamepad2, tone: "brand" },
  { slug: "seyahat", key: "travel", Icon: Plane, tone: "accent" },
  { slug: "turkiye", key: "turkey", Icon: Flag, tone: "brand" },
  { slug: "yurt-disindaki-turkler", key: "expats", Icon: Globe2, tone: "accent" },
] as const;

export function UseCaseGrid() {
  const t = useTranslations("home.useCase");

  return (
    <section className="py-16 sm:py-20 bg-surface-subtle/40 border-y border-border">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">
            {t("title")}
          </h2>
          <p className="mt-3 text-ink-muted">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {useCases.map(({ slug, key, Icon, tone }) => (
            <Link
              key={slug}
              href={`/en-iyi/${slug}`}
              className="group rounded-xl border border-border bg-white p-4 hover:border-brand-300 hover:shadow-md transition-all dark:bg-surface-subtle"
            >
              <div
                className={
                  "inline-flex items-center justify-center size-10 rounded-lg " +
                  (tone === "accent"
                    ? "bg-accent-50 text-accent-600"
                    : "bg-brand-50 text-brand-600")
                }
              >
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div className="mt-3 font-semibold text-ink-strong text-sm">
                {t(key)}
              </div>
              <div className="mt-1 flex items-center text-xs text-ink-muted group-hover:text-brand-700">
                İncele <ArrowRight className="ml-1 size-3" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
