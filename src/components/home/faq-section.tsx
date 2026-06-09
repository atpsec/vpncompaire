"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { homeFaqs } from "@/data/home-faqs";
import type { Locale } from "@/lib/site";

export function FAQSection() {
  const t = useTranslations("home.faq");
  const locale = useLocale() as Locale;
  const faqs = homeFaqs(locale);

  return (
    <section className="py-16 sm:py-20">
      <Container size="md">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong text-center">
          {t("title")}
        </h2>

        <Accordion.Root
          type="single"
          collapsible
          className="mt-10 divide-y divide-border rounded-xl border border-border bg-surface-base dark:bg-surface-subtle"
        >
          {faqs.map((f, i) => (
            <Accordion.Item key={i} value={`item-${i}`}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-ink-strong hover:bg-surface-subtle transition">
                  <span>{f.q}</span>
                  <ChevronDown
                    className="size-5 text-ink-muted transition-transform group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden">
                <div className="px-5 pb-5 text-ink-muted leading-relaxed">
                  {f.a}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </section>
  );
}
