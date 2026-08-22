export const revalidate = 3600;

export function GET() {
  // Bu eski sitemap URL'si daha önce Search Console'a gönderilmiş olabilir.
  // Kaynaksız/generic dizin profilleri noindex'e alındığı için endpoint'i 200
  // dönen boş bir sitemap olarak koruyor, ancak robots.txt içinde ilan etmiyoruz.
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
