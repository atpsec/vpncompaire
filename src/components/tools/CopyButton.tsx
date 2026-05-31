"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  copyLabel: string;
  copiedLabel: string;
  className?: string;
};

export function CopyButton({ value, copyLabel, copiedLabel, className }: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={onClick}
      className={className}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="size-4" aria-hidden="true" />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="size-4" aria-hidden="true" />
          {copyLabel}
        </>
      )}
    </Button>
  );
}
