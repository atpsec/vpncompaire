import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { homeFaqs } from "@/data/home-faqs";
import type { Locale } from "@/lib/site";

export async function FAQSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.faq" });
  const faqs = homeFaqs(locale);

  return (
    <section className="py-16 sm:py-20">
      <Container size="md">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong text-center">
          {t("title")}
        </h2>

        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-surface-base dark:bg-surface-subtle">
          {faqs.map((f, i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-medium text-ink-strong transition hover:bg-surface-subtle [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <ChevronDown
                    className="size-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
              </summary>
              <div className="px-5 pb-5 text-ink-muted leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
