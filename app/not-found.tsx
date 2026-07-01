import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-slate-800 p-8">
      <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center text-white font-black text-xl mb-6">
        ZA
      </div>
      <h1 className="text-4xl font-black tracking-tight text-ink mb-2">404</h1>
      <p className="text-lg text-muted mb-8 text-center max-w-md">
        This page does not exist in our resource library.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl transition text-sm"
      >
        Return to Home
      </Link>
    </div>
  );
}
