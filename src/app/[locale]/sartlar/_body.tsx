import { FileText, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

export function EnBody() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>{" "}
        › <span className="text-ink-strong">Terms of use</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <FileText className="size-3" /> Legal
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Terms of use
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: May 2026
        </p>
      </header>

      <article className="mt-12 prose prose-stone max-w-none">
        <h2>1. Service description</h2>
        <p>
          {siteConfig.name} (&quot;the site&quot;) is an informational website
          that reviews and compares VPN services with an independent
          methodology. The site offers editorial content, comparisons and
          guides about VPN providers.
        </p>

        <h2>2. Acceptance</h2>
        <p>
          By using this site you accept these Terms of Use, the Privacy Policy
          and the Advertising Disclosure. If you do not accept them, you must
          not use the site.
        </p>

        <h2>3. Purpose of the content and limits of responsibility</h2>
        <p>All content on this site is intended as general information. It:</p>
        <ul>
          <li>does not constitute legal advice</li>
          <li>does not constitute financial advice</li>
          <li>is not personalised security consulting</li>
          <li>provides no guarantee of fit for individual situations</li>
        </ul>
        <p>
          Our recommendations rest on independent testing and general evidence;
          before making a specific decision for your situation, you should
          evaluate your own circumstances.
        </p>

        <h2>4. Third-party links</h2>
        <p>
          The site contains plain, non-commercial links to VPN providers&apos;
          own websites; we earn no commission from them. The site&apos;s
          revenue comes from Google AdSense ads — see the{" "}
          <Link href="/affiliate-disclosure">Advertising Disclosure</Link>. Once
          you follow a link, the external site&apos;s own terms apply; we are
          not responsible for that site&apos;s content or services.
        </p>

        <h2>5. Limitation of warranties</h2>
        <p>
          The site is provided &quot;as is&quot;. We do our best to keep
          content current, accurate and complete, but:
        </p>
        <ul>
          <li>
            Provider pricing, features or service policies may change without
            notice.
          </li>
          <li>Audit reports and audits may be updated.</li>
          <li>
            Streaming compatibility may shift suddenly because of provider
            blocks.
          </li>
        </ul>
        <p>
          For the latest state, we recommend checking the relevant VPN
          provider&apos;s own website.
        </p>

        <h2>6. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, {siteConfig.name}{" "}
          is not liable for direct, indirect, incidental or special damages in
          connection with the site. This limitation also covers damages caused
          by use of the information in the content.
        </p>

        <h2>7. Intellectual property</h2>
        <p>
          All original text, imagery and design on the site is produced by{" "}
          {siteConfig.name} and protected by copyright. Quoting is permitted
          within fair-use limits; copying without attribution and systematic
          republication is prohibited.
        </p>
        <p>
          Brand names (NordVPN, Surfshark, ExpressVPN, Proton VPN, PIA,
          CyberGhost, Mullvad, etc.) are the registered trademarks of their
          owners and are used here only for identification.
        </p>

        <h2>8. Prohibited uses</h2>
        <p>Via the site or its content, you may not:</p>
        <ul>
          <li>perform automated data scraping</li>
          <li>
            query the site outside normal use in a way that disrupts service
            (DDoS, etc.)
          </li>
          <li>
            republish content in a way that infringes copyright or trademark
            rights
          </li>
        </ul>

        <h2>9. Changes to the terms</h2>
        <p>
          We may update these terms from time to time. Significant changes are
          indicated by the &quot;Last updated&quot; date at the top of the
          page. Continued use of the site after an update means you accept the
          revised terms.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These terms are governed by the laws of the Republic of Türkiye.
          Turkish courts have jurisdiction over any disputes that may arise.
        </p>

        <h2>11. Contact</h2>
        <p>
          For questions about these terms of use, reach us via the{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </article>

      <Card className="mt-12 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              This page is not legal advice
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              For professional guidance on a specific legal issue, we recommend
              consulting a lawyer.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
