"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  normalizeForSearch,
  findMatchRanges,
} from "@/lib/text-normalize";

export type GlossaryTerm = {
  id: string;
  term: string;
  short: string;
  long: string;
  category: string;
  related?: string[];
};

type GlossarySearchProps = {
  terms: GlossaryTerm[];
  categories: string[];
  locale: "tr" | "en";
};

const ALL_CATEGORY = "__all__";

function Highlight({
  text,
  normalizedQuery,
}: {
  text: string;
  normalizedQuery: string;
}) {
  if (!normalizedQuery) return <>{text}</>;
  const ranges = findMatchRanges(text, normalizedQuery);
  if (ranges.length === 0) return <>{text}</>;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach(([start, end], i) => {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark
        key={`${start}-${end}-${i}`}
        className="bg-brand-100 text-brand-900 dark:bg-brand-900/40 dark:text-brand-100 rounded px-0.5"
      >
        {text.slice(start, end)}
      </mark>,
    );
    cursor = end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

export function GlossarySearch({
  terms,
  categories,
  locale,
}: GlossarySearchProps) {
  const t = useTranslations("glossary");
  const tSearch = useTranslations("glossary.search");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const inputRef = useRef<HTMLInputElement>(null);

  // Precompute normalized search index for performance
  const indexed = useMemo(
    () =>
      terms.map((term) => ({
        term,
        haystack:
          normalizeForSearch(term.term) +
          " " +
          normalizeForSearch(term.short) +
          " " +
          normalizeForSearch(term.long),
      })),
    [terms],
  );

  const normalizedQuery = useMemo(
    () => normalizeForSearch(query.trim()),
    [query],
  );

  const filtered = useMemo(() => {
    return indexed
      .filter(({ term }) =>
        activeCategory === ALL_CATEGORY
          ? true
          : term.category === activeCategory,
      )
      .filter(({ haystack }) =>
        normalizedQuery ? haystack.includes(normalizedQuery) : true,
      )
      .map(({ term }) => term);
  }, [indexed, activeCategory, normalizedQuery]);

  // Keyboard shortcuts: Ctrl/Cmd+K to focus, Escape to clear
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const isMod = e.ctrlKey || e.metaKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    },
    [],
  );

  const allLabel = tSearch("allCategories");
  const totalCount = filtered.length;

  // Category counts (respect search query, ignore active category filter)
  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const cat of categories) map.set(cat, 0);
    let total = 0;
    for (const { term, haystack } of indexed) {
      if (normalizedQuery && !haystack.includes(normalizedQuery)) continue;
      total += 1;
      map.set(term.category, (map.get(term.category) || 0) + 1);
    }
    return { total, perCategory: map };
  }, [indexed, categories, normalizedQuery]);

  return (
    <div>
      {/* Sticky search bar */}
      <div className="sticky top-0 z-20 -mx-4 sm:mx-0 mt-8 bg-background/95 backdrop-blur-sm border-b border-border sm:border-0 sm:bg-transparent sm:backdrop-blur-none px-4 sm:px-0 py-3 sm:py-0">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-5 text-ink-muted"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tSearch("placeholder")}
            aria-label={tSearch("placeholder")}
            className="w-full rounded-xl border border-border bg-surface-base pl-12 pr-12 py-3 text-base text-ink-strong placeholder:text-ink-muted shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300/40 dark:bg-surface-subtle"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label={tSearch("clear")}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full size-7 text-ink-muted hover:bg-surface-muted hover:text-ink-strong"
            >
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 rounded border border-border bg-surface-muted px-1.5 py-0.5 text-[10px] font-mono text-ink-muted">
              {locale === "tr" ? "Ctrl" : "Ctrl"}+K
            </kbd>
          )}
        </div>

        {/* Category chips */}
        <div
          className="mt-3 flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          role="tablist"
          aria-label={t("categoriesAria")}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === ALL_CATEGORY}
            onClick={() => setActiveCategory(ALL_CATEGORY)}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === ALL_CATEGORY
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-border bg-surface-base text-ink-muted hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            {allLabel}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                activeCategory === ALL_CATEGORY
                  ? "bg-white/20 text-white"
                  : "bg-ink-subtle/10 text-ink-subtle"
              }`}
            >
              {categoryCounts.total}
            </span>
          </button>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = categoryCounts.perCategory.get(cat) || 0;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-border bg-surface-base text-ink-muted hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {cat}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-ink-subtle/10 text-ink-subtle"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <div className="mt-4 text-sm text-ink-muted" aria-live="polite">
        {tSearch("resultsCount", { count: totalCount })}
      </div>

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((term) => (
            <Card
              key={term.id}
              id={term.id}
              className="p-5 scroll-mt-20 hover:border-brand-300 transition-colors flex flex-col min-w-0"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink-strong break-words">
                    <Highlight
                      text={term.term}
                      normalizedQuery={normalizedQuery}
                    />
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted break-words">
                    <Highlight
                      text={term.short}
                      normalizedQuery={normalizedQuery}
                    />
                  </p>
                </div>
                <Badge variant="outline">{term.category}</Badge>
              </div>
              <p className="mt-3 text-sm text-ink leading-relaxed break-words">
                <Highlight
                  text={term.long}
                  normalizedQuery={normalizedQuery}
                />
              </p>
              {term.related && term.related.length > 0 ? (
                <p className="mt-3 text-xs text-ink-muted">
                  {t("relatedLabel")}
                  {term.related.map((rid, i) => {
                    const r = terms.find((g) => g.id === rid);
                    if (!r) return null;
                    return (
                      <span key={rid}>
                        <a
                          href={`#${rid}`}
                          className="text-brand-700 hover:underline"
                        >
                          {r.term}
                        </a>
                        {i < term.related!.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </p>
              ) : null}
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center py-12 rounded-xl border border-dashed border-border bg-surface-base/40">
          <p className="text-ink-muted">{tSearch("noResults")}</p>
        </div>
      )}
    </div>
  );
}
