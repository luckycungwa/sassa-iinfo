import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { canonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Terms of Service | SASSA Grant Guide",
  description: "Terms of service for using the SASSA Resource Platform. By using this site, you agree to these terms and acknowledge this is an independent informational resource.",
  alternates: { canonical: canonicalUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-light border border-border flex items-center justify-center flex-shrink-0">
          <Scale className="w-6 h-6 text-accent-dark" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Terms of Service</h1>
          <p className="text-sm text-body mt-1">Last updated: 1 July 2026</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Acceptance of Terms</h2>
        <p className="text-sm text-body leading-relaxed">
          By accessing or using this website, you agree to be bound by these terms. If you do not agree, please do not use this website.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Informational Purpose Only</h2>
        <p className="text-sm text-body leading-relaxed">
          This platform provides general educational and informational content about South African social grants. It is not a substitute for official advice from SASSA, the Department of Social Development, or a qualified legal professional. Always verify critical information with official government sources.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Independent Status</h2>
        <p className="text-sm text-body leading-relaxed">
          This website is an independent informational platform. We are not affiliated with, endorsed by, or connected to the South African Social Security Agency (SASSA), the Department of Social Development, or the South African government.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">No User Accounts or Data Collection</h2>
        <p className="text-sm text-body leading-relaxed">
          This website does not require registration, does not maintain user accounts, and does not collect personal data. Do not submit personal information through any form on this site — no such forms exist.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Accuracy of Information</h2>
        <p className="text-sm text-body leading-relaxed">
          While we strive to keep all information accurate and up to date, grant amounts, payment dates, eligibility criteria, and policies may change. We recommend cross-referencing with official government announcements and gazettes.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Limitation of Liability</h2>
        <p className="text-sm text-body leading-relaxed">
          The SASSA Resource Platform and its creators shall not be held liable for any losses, damages, or consequences arising from the use of information provided on this website. Users are encouraged to seek official assistance for critical matters.
        </p>
      </div>
    </div>
  );
}
