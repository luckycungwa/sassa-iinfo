import type { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { search } from "@/lib/search";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the SRD Grant Guide for grants, statuses, payment dates, offices, guides, and answers.",
  robots: { index: false, follow: true },
  alternates: { canonical: canonicalUrl("/search") },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").trim().slice(0, 100);
  const results = query.length >= 2 ? search(query).slice(0, 20) : [];
  const schema = webpageSchema("Search | SRD Grant Guide", "Search grants, statuses, offices, and guides.", "/search");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Search</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Find grants, status meanings, payment dates, office details, and step-by-step guides.
          </p>
        </div>

        <form action="/search" method="get" role="search" className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-surface-container bg-canvas px-4 py-3">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              aria-label="Search grants, statuses, offices"
              placeholder="e.g. SRD declined, payment dates, reference number"
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted-foreground outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-violet text-white text-xs font-bold px-5 py-3 rounded-xl hover:opacity-90 transition"
          >
            Search
          </button>
        </form>

        {query.length >= 2 && (
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
          </p>
        )}

        {results.length > 0 ? (
          <div className="space-y-2">
            {results.map((r, i) => (
              <Link
                key={`${r.url}-${i}`}
                href={r.url}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-surface hover:bg-canvas transition group"
              >
                <div className="min-w-0">
                  <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">{r.category}</span>
                  <p className="text-sm font-bold text-ink truncate mt-0.5">{r.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-accent-dark transition flex-shrink-0" />
              </Link>
            ))}
          </div>
        ) : (
          query.length >= 2 && (
            <div className="p-6 border border-border rounded-xl bg-surface text-sm text-muted-foreground">
              No results found. Try a shorter term, like &ldquo;SRD&rdquo;, &ldquo;appeal&rdquo; or &ldquo;payment&rdquo;.
            </div>
          )
        )}
      </div>
    </>
  );
}
