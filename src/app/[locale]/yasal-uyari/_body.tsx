import { AlertTriangle, Scale } from "lucide-react";
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
        › <span className="text-ink-strong">Legal notice</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Scale className="size-3" /> Legal notice
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Legal Notice (Disclaimer)
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: May 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Important: informational content
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              All content on this site is general information.{" "}
              {siteConfig.name} provides no legal, financial or
              cybersecurity guarantee. Before making a VPN choice or a
              privacy decision, you are responsible for evaluating your
              own situation.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>1. Disclaimer of warranties</h2>
        <p>
          {siteConfig.name} makes no express or implied warranty about the{" "}
          <strong>accuracy, completeness or timeliness</strong> of the
          information on this site. Content is provided &quot;as is&quot;.
          The site:
        </p>
        <ul>
          <li>
            does not guarantee that a particular VPN will{" "}
            <strong>protect you</strong>.
          </li>
          <li>
            does not claim that any VPN provides{" "}
            <strong>complete anonymity</strong>. A VPN is a privacy-enhancing
            tool, not the only guarantee of anonymity.
          </li>
          <li>
            does not guarantee that providers will{" "}
            <strong>refuse to disclose user data</strong> in legal proceedings.
            Past behaviour is not evidence of future behaviour.
          </li>
          <li>
            does not guarantee the <strong>persistence</strong> of streaming
            compatibility or successful bypass. Platform controls change
            constantly.
          </li>
        </ul>

        <h2>2. Variability of provider data</h2>
        <p>
          The following information about VPN providers may change without our
          noticing or before we can update a page:
        </p>
        <ul>
          <li>Monthly/yearly pricing and discount promotions</li>
          <li>Renewal-period pricing</li>
          <li>Refund window and terms</li>
          <li>Server count, country list, new/removed locations</li>
          <li>Simultaneous-device limits</li>
          <li>Audit frequency and last-audit date</li>
          <li>Privacy policy and no-log enforcement</li>
          <li>Jurisdiction (e.g. acquisitions, relocations)</li>
          <li>Supported payment methods</li>
          <li>Streaming platform compatibility</li>
        </ul>
        <p>
          <strong>
            Before making a purchase, you are responsible for checking the
            latest information on the provider&apos;s official website.
          </strong>
        </p>

        <h2>3. Not legal advice</h2>
        <p>
          Guides on the site such as &quot;Is VPN legal in Türkiye?&quot;{" "}
          <strong>must not be interpreted as legal advice</strong>. Laws
          change over time; individual situations differ. For a specific legal
          question we recommend consulting a lawyer.
        </p>

        <h2>4. Not financial advice</h2>
        <p>
          Price comparisons and the cost calculator{" "}
          <strong>do not constitute financial advice</strong>. Deciding
          whether a subscription is right for you, within your budget and
          needs, is your responsibility.
        </p>

        <h2>5. Not a cybersecurity guarantee</h2>
        <p>
          A VPN is only one part of a comprehensive cybersecurity setup. No
          VPN alone will:
        </p>
        <ul>
          <li>protect you from malware (you need antivirus).</li>
          <li>
            protect you from phishing/social engineering on its own (mindful
            use is required).
          </li>
          <li>
            protect you from browser fingerprinting or cookie-based tracking.
          </li>
          <li>
            protect you from disclosing personal information you choose to
            share.
          </li>
          <li>
            categorically protect your identity from being revealed in legal
            proceedings.
          </li>
        </ul>

        <h2>6. Third-party services</h2>
        <p>
          The terms, privacy policies and service quality of the VPN providers
          you connect to apply on their side. {siteConfig.name} is not
          responsible for the actions of those third parties, for price
          changes, service outages or policy changes.
        </p>

        <h2>7. Brand names</h2>
        <p>
          Brand names mentioned on the site (NordVPN, Surfshark, ExpressVPN,
          Proton VPN, PIA, CyberGhost, Mullvad, IPVanish, Windscribe,
          TunnelBear, etc.) are registered trademarks of their respective
          owners and are used here only for product identification under
          nominative fair use.
        </p>

        <h2>8. Advertising and revenue</h2>
        <p>
          {siteConfig.name} may earn revenue from Google AdSense ads and
          affiliate links. Affiliate links may generate a commission; this
          does not change the source-based comparison. See the{" "}
          <Link href="/affiliate-disclosure">Advertising Disclosure</Link> for
          details.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law,{" "}
          {siteConfig.name} and its publishers are not liable for{" "}
          <strong>direct, indirect, incidental or special damages</strong>{" "}
          arising from decisions based on the information on this site.
        </p>

        <h2>10. The final decision is the reader&apos;s</h2>
        <p>
          Which VPN you choose, which plan you buy, how you configure the VPN
          and in which legal/technical context you use it is{" "}
          <strong>entirely your decision</strong>. The recommendations on this
          site should be treated as a starting point, not as a directive.
        </p>
      </article>

      <RelatedLinksEn />
    </>
  );
}
function RelatedLinksEn() {
  return (
    <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
      <p className="text-sm text-ink-muted">Related pages</p>
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <Link
          href="/affiliate-disclosure"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Advertising disclosure
        </Link>
        <Link
          href="/terms"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Terms of use
        </Link>
        <Link
          href="/privacy-policy"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Privacy policy
        </Link>
        <Link
          href="/methodology"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Our methodology
        </Link>
      </div>
    </section>
  );
}
