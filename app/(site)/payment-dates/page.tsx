import type { Metadata } from "next";
import Link from "next/link";
import PaymentCentre from "../../../components/PaymentCentre";
import { paymentMonths } from "../../../lib/data/paymentDates";

export const metadata: Metadata = {
  title: "SASSA Payment Dates 2026 | Social Grant Payout Schedule",
  description: "Complete SASSA payment calendar for 2026. View monthly payout dates for Older Person, Disability, Child Support, and SRD R370 grants. Current and past schedules available.",
};

export default function PaymentDatesPage() {
  return (
    <div className="space-y-8">
      <div className="bg-surface border border-border rounded-xl p-5">
        <h2 className="text-sm font-extrabold text-ink mb-3">Monthly Payment Date Archive</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {paymentMonths.map((m) => (
            <Link
              key={m.id}
              href={`/payment-dates/${m.slug}`}
              className="text-xs font-bold px-3 py-2 rounded-lg border border-border bg-canvas text-muted hover:bg-surface hover:text-ink transition"
            >
              {m.label}
            </Link>
          ))}
        </div>
      </div>
      <PaymentCentre />
    </div>
  );
}
