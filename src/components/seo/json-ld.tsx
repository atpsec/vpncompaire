export function JsonLd({ data }: { data: object }) {
  // Keep JSON-LD inside its script element even when visible content contains
  // HTML-significant characters.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

