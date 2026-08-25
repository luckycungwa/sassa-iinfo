export default function SiteLoading() {
  return (
    <div className="min-h-[60vh]" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="bg-fog">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="skeleton h-3 w-28 rounded mb-4" />
          <div className="skeleton h-10 md:h-14 w-3/4 max-w-xl rounded" />
          <div className="skeleton h-4 w-2/3 max-w-lg rounded mt-5" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-[2.85px] border border-border bg-paper p-5 space-y-3">
              <div className="skeleton h-5 w-2/3 rounded" />
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-4/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
