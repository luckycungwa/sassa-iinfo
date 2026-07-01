import type { Metadata } from "next";
import Link from "next/link";
import { offices } from "../../../lib/data/offices";
import { ChevronRight, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "SASSA Office Finder | Local Branch Locations & Contact Details",
  description: "Find your nearest SASSA local office. Addresses, phone numbers, operating hours, services offered, and accessibility information for all provincial branches.",
};

export default function OfficesHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight">Office Finder</h1>
        <p className="text-sm text-muted mt-1">Find SASSA local office addresses, contacts, hours, and services across South Africa.</p>
      </div>
      <div className="grid gap-3">
        {offices.map((o) => (
          <Link
            key={o.id}
            href={`/offices/${o.id}`}
            className="group bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all block"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-extrabold text-ink group-hover:text-accent-dark transition">{o.name}</h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{o.city}, {o.province}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{o.phone}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-dark transition flex-shrink-0 ml-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
