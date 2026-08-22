import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Privacy Policy | SASSA Grant Guide",
  description: "Privacy policy for the SASSA Resource Platform. We do not collect, store, or process any personal data. No cookies, no tracking, no data collection.",
  alternates: { canonical: canonicalUrl("/privacy") },
};

export default function PrivacyPage() {
  const pageSchema = webpageSchema("Privacy Policy | SASSA Grant Guide", "Privacy policy for the SASSA Resource Platform. No data collection, no cookies, no tracking.", "/privacy");
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
            <p className="text-sm text-body mt-1">Last updated: 1 July 2026</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-ink">Our Privacy Commitment</h2>
          <p className="text-sm text-body leading-relaxed">
            The SASSA Resource Platform is a static informational website. We take your privacy seriously. This policy explains how we handle (or more accurately, how we do not handle) your data.
          </p>
        </div>

        <div className="space-y-4">
          <Section title="No Data Collection">
            <p>We do not collect, store, or process any personal data. This website has no databases, no user accounts, no forms that submit data to our servers, and no analytics software.</p>
          </Section>

          <Section title="No Cookies">
            <p>This website does not use cookies. No tracking cookies, no session cookies, no preference cookies. When you visit this site, your browser does not store any data from us.</p>
          </Section>

          <Section title="No Tracking">
            <p>We do not use any analytics services, tracking pixels, or fingerprinting techniques. We have no way of knowing who visits this site or how they use it.</p>
          </Section>

          <Section title="No External Embeds">
            <p>We do not embed external content that could track you. No YouTube videos, no social media widgets, no third-party fonts (fonts are self-hosted via Next.js), and no external comment systems.</p>
          </Section>

          <Section title="No Advertising">
            <p>This website displays no advertisements. We do not sell or share any data because we do not collect any data.</p>
          </Section>

          <Section title="External Links">
            <p>This website contains links to official SASSA and South African government websites. Once you leave this site, we have no control over their privacy practices. We encourage you to review their privacy policies.</p>
          </Section>

          <Section title="Changes to This Policy">
            <p>If this policy changes, the &ldquo;Last updated&rdquo; date at the top will be revised. We will never change this policy to permit data collection without a prominent notice. Because we do not collect data, changes to this policy will generally be clarifications rather than substantive changes.</p>
          </Section>

          <Section title="Contact">
            <p>If you have questions about this privacy policy, please contact us via the information on our <a href="/contact" className="text-gold hover:underline font-bold">Contact page</a>.</p>
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
      <p className="text-sm text-body leading-relaxed">{children}</p>
    </div>
  );
}
