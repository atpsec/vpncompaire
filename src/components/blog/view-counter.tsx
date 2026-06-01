import { Eye } from "lucide-react";
import { getPageViews, formatViewCount } from "@/lib/plausible";

type ViewCounterProps = {
  slug: string;
  locale: "tr" | "en";
};

export async function ViewCounter({ slug, locale }: ViewCounterProps) {
  const views = await getPageViews(slug);

  if (views === 0) {
    return null;
  }

  const label = locale === "tr" ? "görüntülenme" : "views";

  return (
    <div className="inline-flex items-center gap-1.5 text-sm text-ink-subtle">
      <Eye className="h-4 w-4" />
      <span>
        {formatViewCount(views)} {label}
      </span>
    </div>
  );
}
