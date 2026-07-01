import type { Metadata } from "next";
import Link from "next/link";
import { newsArticles } from "../../../lib/data/news";
import { ChevronRight, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA News & Announcements | Official Updates",
  description: "Stay informed with the latest SASSA news, grant updates, payment schedule changes, and policy announcements.",
};

export default function NewsHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">News & Announcements</h1>
        <p className="text-sm text-muted mt-1">Official updates on SASSA grants, payment schedules, and policy changes.</p>
      </div>
      <div className="grid gap-3">
        {newsArticles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="group flex items-center gap-4 bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center flex-shrink-0">
              <Newspaper className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{article.title}</h2>
              </div>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{article.summary}</p>
              <p className="text-[10px] font-mono text-muted mt-1">{article.date}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-accent-dark transition flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
