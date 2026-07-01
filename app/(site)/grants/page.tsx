import type { Metadata } from "next";
import Link from "next/link";
import { grants } from "../../../lib/data/grants";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Grant Types | Complete Guide to Social Grants in South Africa",
  description: "Detailed guides for all 8 SASSA social grants: Older Person, Child Support, Disability, Foster Care, Care Dependency, War Veterans, Grant-in-Aid, and SRD R370. Eligibility, amounts, how to apply.",
};

export default function GrantsHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Grant Library</h1>
        <p className="text-sm text-muted mt-1">Detailed guides for every SASSA social grant — eligibility, documents, and application steps.</p>
      </div>
      <div className="grid gap-3">
        {grants.map((g) => (
          <Link
            key={g.id}
            href={`/grants/${g.slug}`}
            className="group flex items-center justify-between bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{g.title}</h2>
                <span className="text-[10px] font-mono font-bold bg-accent-light text-accent-dark border border-border px-2 py-0.5 rounded-full flex-shrink-0">
                  {g.amount}
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{g.targetGroup}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-dark transition flex-shrink-0 ml-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}
