import type { Metadata } from "next";
import Link from "next/link";
import { bankingGuides } from "../../../lib/data/banking";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Banking | Payment Methods & Bank Details Guide",
  description: "Complete guide to SASSA payment methods, bank verification, and how to update your bank details for grant payments.",
};

export default function BankingHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Banking & Payments</h1>
        <p className="text-sm text-muted mt-1">How SASSA pays grants, bank verification, and updating your payment details.</p>
      </div>
      <div className="grid gap-3">
        {bankingGuides.map((b) => (
          <Link
            key={b.id}
            href={`/banking/${b.slug}`}
            className="group flex items-center justify-between bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{b.title}</h2>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{b.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-accent-dark transition flex-shrink-0 ml-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}
