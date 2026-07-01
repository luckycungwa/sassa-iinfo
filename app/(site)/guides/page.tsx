import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "../../../lib/data/guides";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Guides | Step-by-Step How-To Resources",
  description: "Practical step-by-step guides for applying for SASSA grants, checking your status, gathering documents, and understanding the means test.",
};

export default function GuidesHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Guides</h1>
        <p className="text-sm text-muted mt-1">Step-by-step how-to resources for navigating SASSA processes.</p>
      </div>
      <div className="grid gap-3">
        {guides.map((g) => (
          <Link
            key={g.id}
            href={`/guides/${g.slug}`}
            className="group flex items-center justify-between bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{g.title}</h2>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{g.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-dark transition flex-shrink-0 ml-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}
