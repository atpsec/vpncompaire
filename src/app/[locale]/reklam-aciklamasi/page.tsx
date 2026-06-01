import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { localizedAlternates } from "@/lib/site";
import { TrBody, EnBody } from "./_body";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "disclosurePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/reklam-aciklamasi", locale),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "disclosurePage" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumbHere"), path: "/reklam-aciklamasi" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        {locale === "en" ? <EnBody /> : <TrBody />}
      </Container>
    </>
  );
}
