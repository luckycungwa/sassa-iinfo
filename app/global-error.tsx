'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] text-[#1a1a1a] p-8">
          <div className="w-16 h-16 rounded-xl bg-[#f5a623] flex items-center justify-center text-black font-black text-xl mb-6">
            ZA
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Something went wrong</h1>
          <p className="text-sm text-[#8a867e] mb-8 text-center max-w-md">
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#7700ff] text-white font-bold rounded-xl transition text-sm hover:opacity-90"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
