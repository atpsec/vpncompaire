"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/CopyButton";

type Props = {
  copyText: string;
  fileName: string;
  copyLabel: string;
  copiedLabel: string;
  downloadLabel: string;
};

export function ResultActions({
  copyText,
  fileName,
  copyLabel,
  copiedLabel,
  downloadLabel,
}: Props) {
  const download = () => {
    const blob = new Blob([copyText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
      <CopyButton
        value={copyText}
        copyLabel={copyLabel}
        copiedLabel={copiedLabel}
      />
      <Button type="button" variant="secondary" size="sm" onClick={download}>
        <Download className="size-4" aria-hidden="true" />
        {downloadLabel}
      </Button>
    </div>
  );
}
