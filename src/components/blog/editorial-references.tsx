import { ExternalLink, FileCheck2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import type { EditorialReference } from "@/data/blog-references";

type EditorialReferencesProps = {
  references: EditorialReference[];
  verifiedAt: string;
};

const VERIFIED_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatVerifiedAt(value: string): string {
  return VERIFIED_DATE_FORMATTER.format(new Date(`${value}T00:00:00Z`));
}

export function EditorialReferences({
  references,
  verifiedAt,
}: EditorialReferencesProps) {
  if (references.length === 0) return null;

  return (
    <Card className="mt-12 border-border bg-surface-subtle/60 p-6">
      <div className="flex items-start gap-3">
        <FileCheck2
          className="mt-0.5 size-5 shrink-0 text-brand-700"
          aria-hidden="true"
        />
        <div>
          <h2 className="text-xl font-semibold text-ink-strong">
            Primary references and verification
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            These sources support the article&apos;s core definitions, platform
            rules or technical claims. Service terms and product behavior can
            change; links were checked on {formatVerifiedAt(verifiedAt)}.
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-4">
        {references.map((reference) => (
          <li key={reference.url} className="text-sm leading-relaxed">
            <a
              href={reference.url}
              target="_blank"
              rel="external noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline"
            >
              {reference.publisher}: {reference.title}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
            <p className="mt-1 text-ink-muted">{reference.note}</p>
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-ink-muted">
        Read our <Link href="/methodology" className="font-semibold text-brand-700 hover:underline">source methodology</Link>. If a source has changed or a claim needs correction, use the <Link href="/contact" className="font-semibold text-brand-700 hover:underline">contact page</Link>.
      </p>
    </Card>
  );
}
