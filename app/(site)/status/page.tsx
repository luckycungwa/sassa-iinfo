import type { Metadata } from "next";
import Link from "next/link";
import { statuses } from "../../../lib/data/statuses";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Status Meanings | SRD & Grant Application Status Codes Explained",
  description: "Complete guide to all SASSA grant status codes. Learn what Pending, Approved, Cancelled, Bank Verification, Alternative Income Source, and other statuses mean and what to do next.",
};

export default function StatusHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Status Meaning Centre</h1>
        <p className="text-sm text-muted mt-1">Every SASSA status code explained — what it means, why it happens, and what to do.</p>
      </div>
      <div className="grid gap-3">
        {statuses.map((s) => (
          <Link
            key={s.id}
            href={`/status/${s.slug}`}
            className="group flex items-center justify-between bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{s.statusName}</h2>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{s.shortDescription}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-dark transition flex-shrink-0 ml-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}
