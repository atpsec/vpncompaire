import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import {
  Lock,
  Tv,
  Gamepad2,
  Plane,
  Flag,
  Globe2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "useCaseHub" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/en-iyi", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/en-iyi", locale),
      type: "website",
    },
  };
}

const USE_CASES: ReadonlyArray<{
  slug: string;
  Icon: LucideIcon;
  tone: "brand" | "accent";
}> = [
  { slug: "gizlilik", Icon: Lock, tone: "brand" },
  { slug: "streaming", Icon: Tv, tone: "accent" },
  { slug: "oyun", Icon: Gamepad2, tone: "brand" },
  { slug: "seyahat", Icon: Plane, tone: "accent" },
  { slug: "turkiye", Icon: Flag, tone: "brand" },
  { slug: "yurt-disindaki-turkler", Icon: Globe2, tone: "accent" },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <UseCaseHubView />;
}

function UseCaseHubView() {
  const t = useTranslations("useCaseHub");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "tr" | "en" | "de";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: t("breadcrumb"), path: "/en-iyi" },
          ],
          locale,
        )}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {tNav("home")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumb")}</span>
        </p>

        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1")}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{t("intro")}</p>
        </header>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map(({ slug, Icon, tone }) => (
            <Link key={slug} href={`/en-iyi/${slug}`} className="group">
              <Card className="p-5 hover:border-brand-300 hover:shadow-md transition-all h-full">
                <div
                  className={
                    "inline-flex items-center justify-center size-12 rounded-lg " +
                    (tone === "accent"
                      ? "bg-accent-50 text-accent-600"
                      : "bg-brand-50 text-brand-600")
                  }
                >
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-semibold text-ink-strong group-hover:text-brand-700">
                  {t(`cards.${slug}.title`)}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {t(`cards.${slug}.desc`)}
                </p>
                <div className="mt-3 inline-flex items-center text-xs font-medium text-brand-700">
                  {t("cardCta")} <ArrowRight className="ml-1 size-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
