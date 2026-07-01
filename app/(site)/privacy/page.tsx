import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SASSA Resource Platform",
  description: "Privacy policy for the SASSA Resource Platform. We do not collect, store, or process any personal data. No cookies, no tracking, no data collection.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-light border border-border flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-accent-dark" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-muted mt-1">Last updated: 1 July 2026</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Our Privacy Commitment</h2>
        <p className="text-sm text-muted leading-relaxed">
          The SASSA Resource Platform is a static informational website. We take your privacy seriously. This policy explains how we handle (or more accurately, how we do not handle) your data.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Data Collection</h2>
        <p className="text-sm text-muted leading-relaxed">
          We do not collect, store, or process any personal data. We do not use cookies, tracking scripts, analytics tools, or any form of user monitoring. We do not ask for your ID number, banking details, phone number, or any other personal information.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Third-Party Services</h2>
        <p className="text-sm text-muted leading-relaxed">
          This website does not embed third-party trackers, advertisements, or analytics tools. Our pages are statically generated and served without external dependencies that could collect your data.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">External Links</h2>
        <p className="text-sm text-muted leading-relaxed">
          This platform contains links to official government websites (srd.sassa.gov.za, gov.za) and other external resources. Once you leave our site, we have no control over the privacy practices of those websites. We encourage you to review their privacy policies.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Changes to This Policy</h2>
        <p className="text-sm text-muted leading-relaxed">
          If this privacy policy changes in the future, the &ldquo;Last updated&rdquo; date at the top will reflect the latest revision. We will never begin collecting data without updating this policy.
        </p>
      </div>
    </div>
  );
}
