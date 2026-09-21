"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

type Lens = "all" | "privacy" | "value" | "setup";

type ComparisonRow = {
  key: string;
  label: string;
  left: string;
  right: string;
};

type Props = {
  rows: ComparisonRow[];
  leftName: string;
  rightName: string;
  copy: {
    title: string;
    all: string;
    privacy: string;
    value: string;
    setup: string;
  };
};

const LENS_FIELDS: Record<Lens, string[] | null> = {
  all: null,
  privacy: ["jurisdiction", "audits", "openSource"],
  value: ["price", "refund"],
  setup: ["servers", "devices"],
};

export function ComparisonLens({ rows, leftName, rightName, copy }: Props) {
  const [lens, setLens] = useState<Lens>("all");
  const fields = LENS_FIELDS[lens];
  const visibleRows = fields ? rows.filter((row) => fields.includes(row.key)) : rows;
  const options: Array<[Lens, string]> = [
    ["all", copy.all],
    ["privacy", copy.privacy],
    ["value", copy.value],
    ["setup", copy.setup],
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border">
      <div className="flex flex-col gap-3 border-b border-border bg-surface-subtle/60 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-strong">
          <SlidersHorizontal className="size-4 text-brand-700" aria-hidden="true" />
          <span>{copy.title}</span>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={copy.title}>
          {options.map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={lens === value}
              onClick={() => setLens(value)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                lens === value
                  ? "bg-brand-600 text-white"
                  : "border border-border bg-surface-base text-ink-muted hover:border-brand-300 hover:text-ink-strong"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-surface-subtle">
          <tr>
            <th className="px-4 py-3 text-left" />
            <th className="px-4 py-3 text-left text-ink-strong">{leftName}</th>
            <th className="px-4 py-3 text-left text-ink-strong">{rightName}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface-base">
          {visibleRows.map((row) => (
            <tr key={row.key}>
              <th className="px-4 py-3 text-left font-medium text-ink-muted">{row.label}</th>
              <td className="px-4 py-3 text-ink">{row.left}</td>
              <td className="px-4 py-3 text-ink">{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
