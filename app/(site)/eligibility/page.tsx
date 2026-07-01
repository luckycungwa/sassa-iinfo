import type { Metadata } from "next";
import Link from "next/link";
import { eligibilityGuides } from "../../../lib/data/eligibility";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Eligibility Centre | Check If You Qualify for Social Grants",
  description: "Situation-based eligibility guides for SASSA grants. Find out which grants you qualify for based on your circumstances: unemployed, student, over 60, or living with a disability.",
};

export default function EligibilityHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Eligibility Centre</h1>
        <p className="text-sm text-muted mt-1">Find the right grant for your situation. Select your circumstance below.</p>
      </div>
      <div className="grid gap-3">
        {eligibilityGuides.map((e) => (
          <Link
            key={e.id}
            href={`/eligibility/${e.slug}`}
            className="group flex items-center justify-between bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{e.title}</h2>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{e.shortDescription}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-dark transition flex-shrink-0 ml-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}
