type BlogContentProps = {
  content: string;
};

export async function BlogContent({ content }: BlogContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-ink-strong prose-p:text-ink-muted prose-a:text-accent-600 prose-strong:text-ink-strong prose-ul:text-ink-muted prose-ol:text-ink-muted"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
