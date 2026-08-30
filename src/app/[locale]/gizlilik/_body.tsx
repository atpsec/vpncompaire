import { Shield, Database, UserCheck } from "lucide-react";
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
        › <span className="text-ink-strong">Privacy policy</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Shield className="size-3" /> GDPR-aligned
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Privacy policy
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: 27 August 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <Database className="size-5" /> Short summary
        </h2>
        <ul className="mt-3 space-y-2 text-ink leading-relaxed text-sm">
          <li>
            <strong>Analytics cookies only with your consent</strong> —
            Google Analytics activates only when you accept on the cookie
            banner. A single strictly necessary cookie (NEXT_LOCALE) stores
            your language.
          </li>
          <li>
            <strong>No accounts</strong> — there is no sign-up, no login and no
            password.
          </li>
          <li>
            <strong>Interactive tools are purpose-limited</strong> — diagnostic
            inputs are processed only to return the requested result. The
            email and VPN/IP tools use the server-side services described
            below.
          </li>
          <li>
            <strong>VPN provider links</strong> may contain a standard referral
            parameter. We do not use those clicks to build reader profiles;
            the destination provider receives the normal request and applies
            its own privacy policy.
          </li>
          <li>
            <strong>Email to us</strong> is used only to respond to your message.
          </li>
        </ul>
      </Card>

      <article className="mt-12 prose prose-stone max-w-none">
        <h2>1. Data controller</h2>
        <p>
          This policy covers personal data processed when you use{" "}
          <Link href="/">{siteConfig.url}</Link>, operated by {siteConfig.name}{" "}
          (&quot;we&quot;, &quot;our site&quot;). We act as the data controller
          under the relevant data-protection laws (including Türkiye&apos;s
          KVKK and, where applicable, the EU GDPR).
        </p>

        <h2>2. What data we process</h2>

        <h3>2.1. Automatic technical data (server logs)</h3>
        <p>
          Our Hostinger hosting infrastructure may process standard web server
          logs needed to deliver and protect the site:
        </p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version (User-Agent)</li>
          <li>Access date/time</li>
          <li>Requested URL</li>
          <li>HTTP response code</li>
        </ul>
        <p>
          Hostinger controls the infrastructure-level retention and security
          settings for these records. VPN Advisor does not use server logs to
          build advertising or behavioural profiles.
        </p>

        <h3>2.2. Analytics (Google Analytics)</h3>
        <p>
          We use Google Analytics 4 to measure site traffic, running with
          Google Consent Mode v2:
        </p>
        <ul>
          <li>
            before you consent on the cookie banner, analytics storage remains
            denied; the Google tag may send cookieless Consent Mode signals
          </li>
          <li>
            on &quot;Accept&quot; the <code>_ga</code> cookies are set; on
            &quot;Decline&quot; none are set
          </li>
          <li>aggregated page views, approximate location, device and browser</li>
          <li>the processor is Google LLC; data may be transferred to the US</li>
        </ul>
        <p>
          Analytics data is used to evaluate the site&apos;s performance. See
          the <Link href="/cookie-policy">Cookie Policy</Link> for details.
        </p>

        <h3>2.3. Per-article readership counter</h3>
        <p>
          After a blog article remains visible for at least 8 seconds, its
          aggregate readership total may increase once. To suppress repeated
          refreshes, the IP address, User-Agent and language signal are
          immediately HMACed on our server with a secret key into a daily
          rotating pseudonymous token. Raw IP or browser signals are not
          written to the counter store; the token expires within 48 hours.
          Only the aggregate total remains. This counter uses no cookie or
          localStorage.
        </p>

        <h3>2.4. Contact email</h3>
        <p>
          If you email us, the contents and address of your message are
          processed solely to respond. After the reply, the message is not
          processed further, but it may be retained for up to 1 year as a
          business record.
        </p>

        <h3>2.4. Interactive diagnostic tools</h3>
        <p>
          Tool results are returned with no-store response headers and are not
          intentionally saved in a VPN Advisor account or database. Some checks
          require limited server-side or third-party processing:
        </p>
        <ul>
          <li>
            <strong>Email Security Check:</strong> the full address is sent to
            our server for validation. The domain is queried for live MX, SPF
            and DMARC records. A breach lookup is sent server-to-server to Have
            I Been Pwned when configured, otherwise to XposedOrNot. We return a
            masked address and do not intentionally retain the submitted
            address or result.
          </li>
          <li>
            <strong>VPN/IP Diagnostic:</strong> the public IP already visible
            to the site may be sent to ipapi.is for network, ASN, approximate
            location and VPN/proxy classification. VPN Advisor does not
            intentionally retain the lookup result.
          </li>
          <li>
            <strong>Homepage Internet Snapshot:</strong> the public IP may be
            sent server-to-server to ipwho.is to resolve an approximate
            country, city, capital and time zone for the location preview. The
            lookup is used for that response only and is not intentionally
            retained by VPN Advisor; GPS permission is never requested.
          </li>
          <li>
            <strong>Browser diagnostics:</strong> DNS and speed checks contact
            Cloudflare endpoints as disclosed on the relevant tool page.
            WebRTC checks run in the browser. Each result describes a limited
            signal, not a security certification.
          </li>
        </ul>
        <p>
          Do not submit an email address unless you agree to that limited data
          flow. The relevant third party&apos;s privacy terms also apply to its
          processing.
        </p>

        <h2>3. Why we process data (legal basis)</h2>
        <ul>
          <li>
            <strong>Server logs:</strong> legitimate interest (security and
            abuse prevention).
          </li>
          <li>
            <strong>Google Analytics storage:</strong> consent (GDPR Art.
            6(1)(a) and KVKK explicit consent via the cookie banner). Storage
            remains denied unless you accept; limited cookieless Consent Mode
            signals may still be sent.
          </li>
          <li>
            <strong>Article readership counter:</strong> legitimate interest
            in understanding aggregate content performance and preventing
            artificial repeats; it is not used for reader profiling or ad
            targeting.
          </li>
          <li>
            <strong>Contact email:</strong> contract/precontract necessity
            (answering your request).
          </li>
          <li>
            <strong>Diagnostics:</strong> your request to run the selected tool
            and our legitimate interest in preventing abuse and returning a
            reliable result.
          </li>
        </ul>

        <h2>4. Data sharing</h2>
        <p>
          We do not sell personal data. Delivering the site and requested tools
          involves these service providers:
        </p>
        <ul>
          <li>
            <strong>Hostinger</strong> (web hosting) — processes server logs.
            Standard data-processing agreement.
          </li>
          <li>
            <strong>Google</strong> — processes consent-state signals and, if
            you accept analytics storage, measurement data. Data may be
            transferred to the US under Google&apos;s published safeguards.
          </li>
          <li>
            <strong>Google AdSense</strong> — serves and measures advertising
            according to your consent choices and Google&apos;s policies.
          </li>
          <li>
            <strong>Configured Redis service</strong> — stores only the
            aggregate article total and a short-lived, irreversible
            pseudonymous token; no raw IP address is sent to that store.
          </li>
          <li>
            <strong>Have I Been Pwned or XposedOrNot</strong> — receives the
            submitted email address only when you run the breach check.
          </li>
          <li>
            <strong>ipapi.is</strong> — receives the public IP when the VPN/IP
            diagnostic requests network classification.
          </li>
          <li>
            <strong>ipwho.is</strong> — may receive the public IP for the
            homepage location and local-time preview.
          </li>
          <li>
            <strong>Cloudflare</strong> — provides endpoints used by the DNS and
            speed diagnostics.
          </li>
        </ul>
        <p>
          Our pages display Google AdSense ads; AdSense may use cookies to
          serve and measure ads (details in our{" "}
          <Link href="/cookie-policy">cookie policy</Link>). When you click
          a VPN provider link you go directly to the provider&apos;s official
          site; from that point on the provider&apos;s own privacy policy
          applies.
        </p>

        <h2>5. Your rights</h2>
        <p>
          Under applicable data-protection law you have rights including:
        </p>
        <ul>
          <li>Knowing whether your personal data is being processed</li>
          <li>Requesting information about the processing</li>
          <li>
            Learning the purpose of the processing and whether the data is used
            for that purpose
          </li>
          <li>
            Learning which third parties (domestic or abroad) the data is
            transferred to
          </li>
          <li>Requesting correction of incomplete or inaccurate processing</li>
          <li>Requesting deletion or destruction of the data</li>
          <li>Objecting to automated analysis outcomes</li>
          <li>Requesting compensation for harm</li>
        </ul>
        <p>
          To exercise these rights, reach us via the{" "}
          <Link href="/contact">contact page</Link>.
        </p>

        <h2>6. Data security</h2>
        <p>
          Server traffic is protected with HTTPS. HTTP headers include HSTS,
          Content Security Policy, frame restrictions and MIME-sniffing
          protection. Strictly necessary preference storage and consent-based
          Google cookies may be used as described in the Cookie Policy; no
          security control can reduce risk to zero.
        </p>

        <h2>7. Policy updates</h2>
        <p>
          We may update this policy from time to time. Significant changes are
          indicated by the &quot;Last updated&quot; date at the top of the
          page.
        </p>
      </article>

      <Card className="mt-12 p-6 bg-brand-50/40">
        <div className="flex items-start gap-3">
          <UserCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              I have a request about my data
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              To exercise your rights or ask a question about this privacy
              policy, reach out via the{" "}
              <Link href="/contact" className="text-brand-700 underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
