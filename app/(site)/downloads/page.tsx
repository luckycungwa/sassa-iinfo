import type { Metadata } from "next";
import Link from "next/link";
import { downloadableForms } from "../../../lib/data/downloads";
import { ChevronRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Download Centre | Official Grant Forms & Templates",
  description: "Download official SASSA forms including grant application forms, bank consent forms, and SRD appeal templates. Each form comes with a detailed guide and document checklist.",
};

export default function DownloadsHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Download Centre</h1>
        <p className="text-sm text-muted mt-1">Official SASSA forms with step-by-step guides and document checklists.</p>
      </div>
      <div className="grid gap-3">
        {downloadableForms.map((d) => (
          <Link
            key={d.id}
            href={`/downloads/${d.slug}`}
            className="group flex items-center gap-4 bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{d.title}</h2>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{d.shortDescription}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-dark transition flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
