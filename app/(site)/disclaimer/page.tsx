import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { canonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Disclaimer | SASSA Grant Guide",
  description: "Important disclaimer: This is an independent informational website not affiliated with SASSA or any government entity. All official actions should be performed on government websites.",
  alternates: { canonical: canonicalUrl("/disclaimer") },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-accent-dark" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Disclaimer</h1>
          <p className="text-sm text-body mt-1">Last updated: 1 July 2026</p>
        </div>
      </div>

      <div className="bg-gold/10 border border-gold/20 rounded-xl p-6">
        <h2 className="text-sm font-extrabold text-accent-dark mb-3">Important Notice</h2>
        <p className="text-sm text-accent-dark leading-relaxed font-bold">
          This is an independent informational resource. We are not affiliated with, endorsed by, or connected to the South African Social Security Agency (SASSA) or the South African government. The official government website can be found at gov.za.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">General Information Only</h2>
        <p className="text-sm text-body leading-relaxed">
          All content on this site is provided for general informational and educational purposes only. It does not constitute legal, financial, or professional advice.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">No Government Affiliation</h2>
        <p className="text-sm text-body leading-relaxed">
          We are an independent entity. We do not represent SASSA, the Department of Social Development, the South African government, or any of its agencies. All content is researched and written by Lucky Cungwa, who compiles information from publicly available sources.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">No Transaction Processing</h2>
        <p className="text-sm text-body leading-relaxed">
          We do not process grant applications, check statuses, or handle any official transactions. All official actions — checking your status, applying for grants, updating details, or lodging appeals — must be done through the official SASSA channels.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Accuracy Disclaimer</h2>
        <p className="text-sm text-body leading-relaxed">
          While we make every effort to ensure accuracy, grant policies, payment dates, and eligibility criteria may change. Always verify with official sources. We are not responsible for any actions taken based on the content of this site.
        </p>
      </div>
    </div>
  );
}
