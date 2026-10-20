import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <img src="/main-logo.svg" alt="SASSA Grant Guide" className="w-16 h-16 mb-6" />
      <h1 className="text-4xl font-black tracking-tight text-ink mb-2">Page not found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        The page you were looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-violet hover:opacity-90 text-white font-bold rounded-xl transition text-sm"
      >
        Back to home
      </Link>
    </div>
  );
}
