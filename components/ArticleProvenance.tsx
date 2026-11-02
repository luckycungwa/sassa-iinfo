import { UserCheck, CalendarDays, RefreshCw } from "lucide-react";

function formatDate(iso: string): string {
  try {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return iso;
  }
}

interface ArticleProvenanceProps {
  author: { name: string; role?: string; credentials?: string };
  publishedAt?: string;
  lastUpdated: string;
  topics?: string[];
}

/**
 * Visible editorial provenance for Updates articles: who wrote it, when it was
 * published, when it was last changed, and which topic it belongs to.
 */
export default function ArticleProvenance({
  author,
  publishedAt,
  lastUpdated,
  topics,
}: ArticleProvenanceProps) {
  return (
    <div className="mb-8 rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-black text-accent-foreground">
            {author.name.charAt(0)}
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
              {author.name}
              <UserCheck className="h-3.5 w-3.5 text-accent-dark" aria-hidden="true" />
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              {author.role ?? "Editorial team"}
              {author.credentials ? ` · ${author.credentials}` : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-muted-foreground">
          {publishedAt && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Published {formatDate(publishedAt)}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            Updated {formatDate(lastUpdated)}
          </span>
        </div>
      </div>

      {topics && topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded border border-border bg-canvas px-2 py-0.5 text-xs font-mono text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
