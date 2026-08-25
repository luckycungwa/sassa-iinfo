'use client';

import { useState } from "react";

export default function PaymentLookup() {
  const [selectedGrant, setSelectedGrant] = useState("older-person");
  const [selectedMonth, setSelectedMonth] = useState("july-2026");

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Payment Date Lookup</h2>
        <p className="text-muted-foreground text-xs">Instantly look up when a specific grant will clear.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="lookup-grant" className="block text-xs font-bold text-muted-foreground">Select Grant Type</label>
          <select id="lookup-grant" value={selectedGrant} onChange={(e) => setSelectedGrant(e.target.value)}
            className="w-full border border-surface-container rounded-xl px-3 py-2.5 bg-canvas">
            <option value="older-person">Older Persons Pension</option>
            <option value="disability">Disability Grant</option>
            <option value="child-support">Children Support Grants</option>
            <option value="srd">SRD R370</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="lookup-month" className="block text-xs font-bold text-muted-foreground">Select Month</label>
          <select id="lookup-month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full border border-surface-container rounded-xl px-3 py-2.5 bg-canvas">
            <option value="july-2026">July 2026</option>
            <option value="august-2026">August 2026</option>
          </select>
        </div>
      </div>

      <div role="status" aria-live="polite" className="p-5 bg-midnight border border-border rounded-xl text-center">
        <p className="text-xs text-gold font-mono uppercase tracking-wider">Scheduled Payment Date</p>
        <h3 className="text-2xl font-extrabold text-gold mt-1">
          {selectedGrant === "older-person" && selectedMonth === "july-2026" && "3 July 2026"}
          {selectedGrant === "older-person" && selectedMonth === "august-2026" && "4 August 2026"}
          {selectedGrant === "disability" && selectedMonth === "july-2026" && "4 July 2026"}
          {selectedGrant === "disability" && selectedMonth === "august-2026" && "5 August 2026"}
          {selectedGrant === "child-support" && selectedMonth === "july-2026" && "6 July 2026"}
          {selectedGrant === "child-support" && selectedMonth === "august-2026" && "6 August 2026"}
          {selectedGrant === "srd" && selectedMonth === "july-2026" && "25 - 30 July 2026"}
          {selectedGrant === "srd" && selectedMonth === "august-2026" && "25 - 31 August 2026"}
        </h3>
        <p className="text-muted-foreground text-xs mt-2">
          Funds are released electronically on this date. Retailer cash collection is available immediately.
        </p>
      </div>
    </div>
  );
}
