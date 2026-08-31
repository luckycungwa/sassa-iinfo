import type { Metadata } from "next";
import { FileText, Shield, Clock, CheckCircle, AlertTriangle, Search, UserCheck } from "lucide-react";
import { canonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Editorial Policy | SASSA Grant Guide",
  description: "How SASSA Grant Guide researches, verifies, and updates content about South African social grants. Accuracy standards, sourcing policy, and correction process.",
  alternates: { canonical: canonicalUrl("/editorial-policy") },
};

const principles = [
  {
    icon: Search,
    title: "Sourcing Standards",
    desc: "Every factual claim about grant amounts, eligibility thresholds, payment dates, and application procedures is sourced from official SASSA publications, Government Gazettes, the national budget speech, or direct statements from the Department of Social Development. We name our sources. If we cannot source it, we do not publish it as fact.",
  },
  {
    icon: Clock,
    title: "Update Cadence",
    desc: "Grant amounts are reviewed within 48 hours of each national budget announcement. Payment dates are updated when SASSA publishes the annual schedule. Policy changes are tracked via the Government Gazette and official media statements. Every content page displays its last verification date.",
  },
  {
    icon: CheckCircle,
    title: "Accuracy & Corrections",
    desc: "If you spot an error, contact us and we will investigate and correct it promptly. Substantive corrections are logged and the page date is updated. We distinguish between factual corrections (the amount changed) and clarifications (the wording was ambiguous).",
  },
  {
    icon: Shield,
    title: "Independence",
    desc: "This site is funded and operated independently by 44tagstudios. We accept no payments from government entities, grant intermediaries, or paid placement. No content is sponsored. We do not process applications or charge users for information.",
  },
  {
    icon: UserCheck,
    title: "Authorship",
    desc: "All content is written or reviewed by Lucky Cungwa, founder of 44tagstudios. We do not use automated content generation for articles or guides. You can join our Facebook community for questions and discussions. Each page carries the author name and last review date so you know who wrote it and when it was checked.",
  },
  {
    icon: AlertTriangle,
    title: "What We Do Not Do",
    desc: "We do not provide legal advice, financial advice, or official representations of SASSA policy. We do not process applications, check statuses, or handle personal data. When you need to take official action, we link you directly to the government portal.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-accent-dark" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Editorial Policy</h1>
          <p className="text-sm text-muted mt-1">How this site researches, verifies, and maintains its content</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-3">
        <p className="text-sm text-muted leading-relaxed">
          This page explains the standards behind every article, guide, and data point on SASSA Grant Guide.
          If you want to know whether a number on this site can be trusted, this is where the answer lives.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          Short version: I check everything against official government sources, I date every page so you know
          when it was last verified, and if I get something wrong, I fix it and note the correction.
        </p>
      </div>

      <div className="space-y-4">
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="bg-surface border border-border rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-accent-dark" />
                <h2 className="text-sm font-bold text-ink">{p.title}</h2>
              </div>
              <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gold/10 border border-gold/20 rounded-xl p-5">
        <h2 className="text-sm font-bold text-accent-dark mb-2">Correction History</h2>
        <p className="text-sm text-muted leading-relaxed mb-3">
          Substantive corrections to published content are logged below. Minor clarifications and formatting changes are not listed.
        </p>
        <div className="space-y-2 text-xs text-muted font-mono">
          <p><span className="text-accent-dark">2026-07-01:</span> Initial publication of editorial policy.</p>
        </div>
      </div>
    </div>
  );
}
