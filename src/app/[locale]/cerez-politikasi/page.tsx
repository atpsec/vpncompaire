import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { TrBody, EnBody } from "./_body";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookies" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/cerez-politikasi", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/cerez-politikasi", locale),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cookies" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbHere"), path: "/cerez-politikasi" },
          ],
          locale as "tr" | "en" | "de",
        )}
      />

      <Container size="md" className="py-12 sm:py-16">
        {locale === "en" ? <EnBody /> : <TrBody />}
      </Container>
    </>
  );
}
