import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | SASSA Resource Platform",
  description: "Important disclaimer: This is an independent informational website not affiliated with SASSA or any government entity. All official actions should be performed on government websites.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-yellow-700" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Disclaimer</h1>
          <p className="text-sm text-muted mt-1">Last updated: 1 July 2026</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-sm font-extrabold text-yellow-800 mb-3">Important Notice</h2>
        <p className="text-sm text-yellow-800 leading-relaxed font-bold">
          This website is an independent news and information portal. We are not affiliated with, endorsed by, or connected to the South African Social Security Agency (SASSA) or the South African government. The official government website can be found at gov.za.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">General Information Only</h2>
        <p className="text-sm text-muted leading-relaxed">
          All content on this platform is provided for general informational and educational purposes only. It does not constitute legal, financial, or professional advice.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">No Government Affiliation</h2>
        <p className="text-sm text-muted leading-relaxed">
          We are an independent entity. We do not represent SASSA, the Department of Social Development, the South African government, or any of its agencies. Our content is created by independent researchers and editors who compile information from publicly available sources.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">No Transaction Processing</h2>
        <p className="text-sm text-muted leading-relaxed">
          We do not process grant applications, check statuses, or handle any official transactions. All official actions — checking your status, applying for grants, updating details, or lodging appeals — must be done through the official SASSA channels.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Accuracy Disclaimer</h2>
        <p className="text-sm text-muted leading-relaxed">
          While we make every effort to ensure accuracy, grant policies, payment dates, and eligibility criteria may change. Always verify with official sources. We are not responsible for any actions taken based on the content of this site.
        </p>
      </div>
    </div>
  );
}
