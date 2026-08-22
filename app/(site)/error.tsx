'use client';

import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-canvas text-ink p-8">
      <div className="w-16 h-16 rounded-xl bg-gold flex items-center justify-center text-accent-foreground font-black text-xl mb-6">
        ZA
      </div>
      <h1 className="text-3xl font-black tracking-tight text-ink mb-2">Something went wrong</h1>
      <p className="text-sm text-muted mb-8 text-center max-w-md">
        We couldn&apos;t load this page. Please try again or return home.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 bg-violet text-white font-bold rounded-xl transition text-sm hover:opacity-90 btn-violet"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-border text-ink font-bold rounded-xl transition text-sm hover:bg-surface-dim"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
