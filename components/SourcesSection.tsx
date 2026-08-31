interface SourceLink {
  label: string;
  url: string;
}

export default function SourcesSection({ sources }: { sources: SourceLink[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-10 rounded-xl border border-border bg-surface p-6">
      <p className="text-sm font-bold text-ink mb-3">Sources &amp; Official References</p>
      <ul className="space-y-2">
        {sources.map((source, i) => (
          <li key={i} className="text-sm text-muted">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-dark hover:text-violet hover:underline break-all"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
