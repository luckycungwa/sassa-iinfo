import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Privacy Policy | SASSA Grant Guide",
  description:
    "How this website handles data: AI assistant processing, cookies used for advertising and anonymous traffic measurement, and your choices under South Africa's POPIA.",
  alternates: { canonical: canonicalUrl("/privacy") },
};

export default function PrivacyPage() {
  const pageSchema = webpageSchema(
    "Privacy Policy | SASSA Grant Guide",
    "How this website handles data: AI assistant processing, advertising cookies, anonymous traffic measurement, and your choices under POPIA.",
    "/privacy"
  );
  const breadcrumb = breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-light border border-border flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-accent-dark" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-ink tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-body mt-1">Last updated: 23 August 2026</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-ink">Our Privacy Commitment</h2>
          <p className="text-sm text-body leading-relaxed">
            The SASSA Grant Guide is an independent informational website operated from South Africa. We deliberately
            keep data collection to a minimum. This policy explains exactly what does and does not happen to your
            information when you use this site, in line with the Protection of Personal Information Act (POPIA).
          </p>
        </div>

        <div className="space-y-4">
          <Section title="No Accounts, No Forms, No Databases">
            <p>
              This website has no user accounts and no forms that submit personal information to our servers. We never
              ask for your SASSA reference number, ID number, banking details, or PIN anywhere on this site. If any page
              or tool claiming to be us asks for those, it is not us.
            </p>
          </Section>

          <Section title="AI Assistant (Optional Feature)">
            <p>
              This site offers an optional AI question-and-answer assistant. When you choose to use it, the text of your
              question and the relevant page content are sent to our server and forwarded to a third-party large language
              model service (hosted by Alibaba Cloud) so it can generate an answer.
            </p>
            <p className="mt-2">
              We do not store your questions or the assistant&rsquo;s answers on our servers. However, the third-party AI
              provider processes the request under its own terms, so do not include sensitive personal information in
              your questions &mdash; the assistant never needs your ID number, grant number, or banking details to help.
            </p>
          </Section>

          <Section title="Cookies and Advertising">
            <p>
              We do not set tracking cookies of our own. This site displays advertising, which may include Google AdSense.
              AdSense and its partners may set cookies or use similar technologies to serve ads, measure their
              performance, and &mdash; where you have consented &mdash; personalise them based on your visits to this and
              other websites.
            </p>
            <p className="mt-2">
              You can opt out of personalised advertising through{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-dark hover:underline font-bold"
              >
                Google Ads Settings
              </a>{" "}
              or via{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-dark hover:underline font-bold"
              >
                aboutads.info
              </a>
              . Where required by law, we request consent before serving personalised advertising.
            </p>
          </Section>

          <Section title="Anonymous Traffic Measurement">
            <p>
              We use privacy-conscious analytics to understand which pages are useful, such as aggregate page views and
              approximate country or region. This data is not used to identify individual visitors and is not sold or
              shared with advertisers. Where possible we configure analytics without cross-site tracking cookies.
            </p>
          </Section>

          <Section title="Server Logs">
            <p>
              Like virtually all websites, our hosting provider automatically records basic technical logs (for example,
              IP address, browser type, and pages requested) for security and abuse prevention, such as rate-limiting the
              AI assistant. These logs are retained only for a limited period and are not used to build profiles of
              visitors.
            </p>
          </Section>

          <Section title="External Links">
            <p>
              This website contains links to official SASSA and South African government websites, including{" "}
              <Link href="/status" className="text-accent-dark hover:underline font-bold">status-check guidance</Link> that
              points to srd.sassa.gov.za. Once you leave this site, we have no control over their privacy practices. We
              encourage you to review their privacy policies.
            </p>
          </Section>

          <Section title="Your Rights Under POPIA">
            <p>
              Because we hold almost no personal information, there is usually nothing to access, correct, or delete. If
              you believe we hold personal information about you, or you want to object to any processing described
              here, contact us using the details on our{" "}
              <Link href="/contact" className="text-accent-dark hover:underline font-bold">Contact page</Link> and we will
              respond within a reasonable period.
            </p>
          </Section>

          <Section title="Children">
            <p>
              This website is intended for a general audience seeking information about social grants. It is not directed
              at children under 18, and we do not knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              If this policy changes, the &ldquo;Last updated&rdquo; date at the top will change with it. If we ever make
              a substantive change &mdash; for example, adding a new data-processing feature &mdash; we will describe it
              clearly here before it takes effect.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this privacy policy? Reach us via the information on our{" "}
              <Link href="/contact" className="text-accent-dark hover:underline font-bold">Contact page</Link>.
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h2 className="text-sm font-extrabold text-ink mb-2">{title}</h2>
      <div className="space-y-1 [&_p]:text-sm [&_p]:text-body [&_p]:leading-relaxed">{children}</div>
    </div>
  );
}
