"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors.runtime");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[locale-error]", error);
    }
  }, [error]);

  return (
    <Container size="md" className="py-20 sm:py-32">
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center size-16 rounded-full bg-danger-500/10 text-danger-600">
          <AlertTriangle className="size-8" />
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">
          {t("h1")}
        </h1>
        <p className="mt-4 text-ink-muted">
          {t("lede")}
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-ink-faint font-mono">
            {t("digest")} {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="primary">
            <RefreshCw className="size-4" /> {t("retry")}
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">
              <Home className="size-4" /> {t("home")}
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
