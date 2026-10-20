'use client';

import { useState } from "react";
import {
  paymentMonths,
  getCurrentPaymentMonth,
  PAYMENT_DATA_UPDATED,
  type PaymentMonth,
} from "@/lib/data/paymentDates";

const grants = [
  { key: "olderPersons", label: "Older Persons Pension" },
  { key: "disability", label: "Disability Grant" },
  { key: "children", label: "Children's Grants" },
  { key: "srd", label: "SRD R370" },
] as const;

type GrantKey = (typeof grants)[number]["key"];

export default function PaymentLookup() {
  const [selectedGrant, setSelectedGrant] = useState<GrantKey>("olderPersons");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    () => getCurrentPaymentMonth()?.id ?? paymentMonths[0].id
  );

  const month: PaymentMonth =
    paymentMonths.find((m) => m.id === selectedMonth) ?? paymentMonths[0];
  const grantLabel = grants.find((g) => g.key === selectedGrant)?.label ?? "";
  const date = month.dates[selectedGrant];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Payment Date Lookup</h2>
        <p className="text-muted-foreground text-xs">Instantly look up when a specific grant will clear.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="lookup-grant" className="block text-xs font-bold text-muted-foreground">Select Grant Type</label>
          <select id="lookup-grant" value={selectedGrant} onChange={(e) => setSelectedGrant(e.target.value as GrantKey)}
            className="w-full border border-surface-container rounded-xl px-3 py-2.5 bg-canvas">
            {grants.map((g) => (
              <option key={g.key} value={g.key}>{g.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="lookup-month" className="block text-xs font-bold text-muted-foreground">Select Month</label>
          <select id="lookup-month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
            suppressHydrationWarning
            className="w-full border border-surface-container rounded-xl px-3 py-2.5 bg-canvas">
            {paymentMonths.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div role="status" aria-live="polite" className="p-5 bg-midnight border border-border rounded-xl text-center">
        <p className="text-xs text-gold font-mono uppercase tracking-wider">
          {grantLabel} · {month.label}
        </p>
        <h3 className="text-2xl font-extrabold text-gold mt-1">{date}</h3>
        <p className="text-muted-foreground text-xs mt-2">
          {month.status === "provisional"
            ? "Provisional date — SASSA has not confirmed this month yet. Check again closer to the payment window."
            : "Confirmed by SASSA."}
          {month.review ? ` Grant reviews for this month are handled on ${month.review}.` : ""}
        </p>
        <p className="text-muted-foreground/70 text-[11px] mt-2">
          Payment data updated {PAYMENT_DATA_UPDATED}.
        </p>
      </div>
    </div>
  );
}
