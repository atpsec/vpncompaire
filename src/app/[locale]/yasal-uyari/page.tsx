import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { localizedAlternates, absoluteUrl } from "@/lib/site";
import { EnBody } from "./_body";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  const t = await getTranslations({ locale: "en", namespace: "legalNotice" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/legal-notice", "en"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/legal-notice", "en"),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  await params;
  setRequestLocale("en");
  const t = await getTranslations({ locale: "en", namespace: "legalNotice" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbHere"), path: "/legal-notice" },
          ],
          "en",
        )}
      />

      <Container size="md" className="py-12 sm:py-16">
        <EnBody />
      </Container>
    </>
  );
}
