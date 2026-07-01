import type { Metadata } from "next";
import Link from "next/link";
import { appeals } from "../../../lib/data/appeals";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Appeals Centre | How to Appeal a Declined Grant",
  description: "Complete guide to appealing a declined SASSA grant through ITSAA. 90-day appeal window, required documents, step-by-step process, and guides for UIF and NSFAS-related declines.",
};

export default function AppealsHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Appeals Centre</h1>
        <p className="text-sm text-muted mt-1">Step-by-step guides for appealing declined SASSA grants through the Independent Tribunal (ITSAA).</p>
      </div>
      <div className="grid gap-3">
        {appeals.map((a) => (
          <Link
            key={a.id}
            href={`/appeals/${a.slug}`}
            className="group flex items-center justify-between bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{a.title}</h2>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{a.shortDescription}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-dark transition flex-shrink-0 ml-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}
