import type { Metadata } from "next";
import Link from "next/link";
import { provinces } from "../../../lib/data/provinces";
import { ChevronRight, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Province Hubs | Regional Office & Collection Information",
  description: "Province-specific SASSA information. Regional office addresses, collection points, and frequently asked questions for all South African provinces.",
};

export default function ProvincesHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Province Hubs</h1>
        <p className="text-sm text-muted mt-1">Regional SASSA information, local offices, and collection details by province.</p>
      </div>
      <div className="grid gap-3">
        {provinces.map((p) => (
          <Link
            key={p.id}
            href={`/provinces/${p.slug}`}
            className="group flex items-center gap-4 bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 border border-green-200 flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{p.name}</h2>
              <p className="text-xs text-muted mt-0.5">Capital: {p.capital}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-dark transition flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
