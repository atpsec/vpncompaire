import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { UseCaseGrid } from "@/components/home/use-case-grid";
import { ComparisonBlock } from "@/components/home/comparison-block";
import { MethodologyBlock } from "@/components/home/methodology-block";
import { FAQSection } from "@/components/home/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationSchema,
  websiteSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/seo";
import { homeFaqs } from "@/data/home-faqs";
import { rankedProducts } from "@/data/products";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={itemListSchema(rankedProducts())} />
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <TopVPNList />
      <UseCaseGrid />
      <ComparisonBlock />
      <MethodologyBlock />
      <FAQSection />
    </>
  );
}
