import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found | SASSA Resource Platform",
  description: "This page does not exist in our resource library. Return home to find SASSA grant information, guides, and tools.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-ink p-8">
      <img src="/main-logo.svg" alt="SRD Grant Guide" className="w-16 h-16 mb-6" />
      <h1 className="text-4xl font-black tracking-tight text-ink mb-2">404</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
        This page does not exist in our website.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent hover:bg-accent-dark text-black font-bold rounded-xl transition text-sm"
      >
        Return to Home
      </Link>
    </div>
  );
}
