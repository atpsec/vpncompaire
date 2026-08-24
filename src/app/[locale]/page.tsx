import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { IpSecurityBanner } from "@/components/home/IpSecurityBanner";
import { TopThreePodium } from "@/components/home/top-three-podium";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { ComparePicker } from "@/components/home/compare-picker";
import { UseCaseGrid } from "@/components/home/use-case-grid";
import { ComparisonBlock } from "@/components/home/comparison-block";
import { MethodologyBlock } from "@/components/home/methodology-block";
import { FAQSection } from "@/components/home/faq-section";
import { HomeBlogColumns } from "@/components/home/home-blog-columns";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationSchema,
  websiteSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/seo";
import { homeFaqs } from "@/data/home-faqs";
import { homepagePopularProducts } from "@/data/products";
import type { Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={websiteSchema(locale)} />
      <JsonLd data={itemListSchema(homepagePopularProducts(locale), locale)} />
      <JsonLd data={faqSchema(homeFaqs(locale))} />
      <Hero />
      <TopThreePodium />
      <HomeBlogColumns locale={locale} />
      <TopVPNList />
      <IpSecurityBanner />
      <ComparePicker />
      <UseCaseGrid />
      <ComparisonBlock />
      <MethodologyBlock />
      <FAQSection />
    </>
  );
}
