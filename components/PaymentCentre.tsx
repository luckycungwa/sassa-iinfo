'use client';

import { useState } from "react";
import { Calendar as CalendarIcon, Info, Printer, Download, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { PaymentMonth } from "../lib/data/paymentDates";

interface PaymentCentreProps {
  current: PaymentMonth;
  next?: PaymentMonth;
  months: PaymentMonth[];
}

export default function PaymentCentre({ current, next, months }: PaymentCentreProps) {
  const [selectedYear, setSelectedYear] = useState<"2026" | "2025">("2026");
  const [downloading, setDownloading] = useState(false);

  const currentRows = [
    {
      grant: "Older Persons Grant (Pension)",
      date: current.dates.olderPersons,
      color: "bg-accent-light border-accent-light text-accent-dark",
      accent: "bg-accent"
    },
    {
      grant: "Disability Grant",
      date: current.dates.disability,
      color: "bg-info/10 border-info/30 text-ink",
      accent: "bg-info"
    },
    {
      grant: "Children's Grants (Child Support, Foster Care, Care Dependency)",
      date: current.dates.children,
      color: "bg-amber/10 border-amber/30 text-ink",
      accent: "bg-amber"
    },
    {
      grant: "Social Relief of Distress (SRD R370)",
      date: current.dates.srd,
      color: "bg-accent-turquoise/10 border-accent-turquoise/30 text-ink",
      accent: "bg-accent-turquoise"
    }
  ];

  const nextRows = next
    ? [
        {
          grant: "Older Persons Grant (Pension)",
          date: next.dates.olderPersons,
          color: "bg-accent-light border-accent-light text-accent-dark",
          accent: "bg-accent"
        },
        {
          grant: "Disability Grant",
          date: next.dates.disability,
          color: "bg-info/10 border-info/30 text-ink",
          accent: "bg-info"
        },
        {
          grant: "Children's Grants (Child Support, Foster Care, Care Dependency)",
          date: next.dates.children,
          color: "bg-amber/10 border-amber/30 text-ink",
          accent: "bg-amber"
        },
        {
          grant: "Social Relief of Distress (SRD R370)",
          date: next.dates.srd,
          color: "bg-accent-turquoise/10 border-accent-turquoise/30 text-ink",
          accent: "bg-accent-turquoise"
        }
      ]
    : [];

  const archivedDates = {
    "2025": [
      { month: "January 2025", older: "3 Jan", disability: "6 Jan", children: "7 Jan", srd: "24-30 Jan" },
      { month: "February 2025", older: "4 Feb", disability: "5 Feb", children: "6 Feb", srd: "23-28 Feb" },
      { month: "March 2025", older: "5 Mar", disability: "6 Mar", children: "7 Mar", srd: "25-31 Mar" },
      { month: "April 2025", older: "3 Apr", disability: "4 Apr", children: "7 Apr", srd: "24-29 Apr" },
      { month: "May 2025", older: "5 May", disability: "6 May", children: "7 May", srd: "25-30 May" },
    ]
  };

  const archive2026 = months
    .filter((m) => m.year === 2026 && m.month <= current.month)
    .sort((a, b) => b.month - a.month);

  const statusIsConfirmed = current.status === "confirmed";

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-midnight rounded-xl p-6 md:p-8 text-ink relative overflow-hidden border border-outline">
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent-light/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="bg-accent-light text-accent-dark font-semibold px-3 py-1 rounded-full text-xs font-mono tracking-wide uppercase">
            Updated for {current.label}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-surface">
            SASSA Payment Centre &amp; Schedules
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            South Africa&apos;s most trusted source for verified SASSA payment dates. View the confirmed schedule for {current.label}, check next month&apos;s dates, and download a printable calendar.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-accent-light hover:bg-gold text-accent-dark font-bold px-4 py-2.5 rounded-xl transition text-xs md:text-sm"
            >
              <Printer className="w-4 h-4" /> Printable Version
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-black font-bold px-4 py-2.5 rounded-xl transition text-xs md:text-sm border border-accent-dark"
            >
              {downloading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" /> Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download Schedule PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Dates Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current month */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent-light text-accent-dark rounded-xl">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-lg text-ink">Current Month: {current.label}</h2>
            </div>
            <span
              className={`inline-flex items-center gap-1 text-xs font-mono ${
                statusIsConfirmed ? "text-success-dark" : "text-muted-foreground"
              }`}
            >
              {statusIsConfirmed ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {statusIsConfirmed ? "Confirmed" : "Provisional"}
            </span>
          </div>

          <div className="space-y-4">
            {currentRows.map((p, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${p.color} transition flex items-start gap-3`}
              >
                <div className={`w-2.5 h-10 rounded-full ${p.accent} mt-0.5`}></div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-ink leading-tight">{p.grant}</h3>
                  <p className="text-lg font-extrabold mt-1 tracking-tight">{p.date}</p>
                </div>
              </div>
            ))}
          </div>

          {current.notes && (
            <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
              {current.notes}
            </p>
          )}
        </div>

        {/* Next month */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber/15 text-amber-dark rounded-xl">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-lg text-ink">
                {next ? `Next Month: ${next.label}` : "Next Month"}
              </h2>
            </div>
            <span
              className={`inline-flex items-center gap-1 text-xs font-mono ${
                next?.status === "confirmed" ? "text-success-dark" : "text-muted-foreground"
              }`}
            >
              {next?.status === "confirmed" ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {next?.status === "confirmed" ? "Confirmed" : "Provisional"}
            </span>
          </div>

          {next ? (
            <div className="space-y-4">
              {nextRows.map((p, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${p.color} transition flex items-start gap-3`}
                >
                  <div className={`w-2.5 h-10 rounded-full ${p.accent} mt-0.5`}></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-ink leading-tight">{p.grant}</h3>
                    <p className="text-lg font-extrabold mt-1 tracking-tight">{p.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">The next schedule has not been published yet.</p>
          )}

          {next?.notes && (
            <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
              {next.notes}
            </p>
          )}
        </div>
      </div>

      {/* Helpful Guidelines */}
      <div className="bg-amber/10 border border-amber/30 p-4 rounded-xl flex gap-3 text-xs md:text-sm text-ink leading-relaxed">
        <Info className="w-5 h-5 text-accent-dark flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Collection Information:</p>
          <p>
            You do not need to withdraw all your funds on the exact payment date. Once SASSA releases payment, the money remains in your bank account or SASSA card indefinitely. Avoid long queues by waiting a few days or withdrawing at participating retailer outlets (Pick n Pay, Boxer, Shoprite, Usave, or Checkers) or using cardless ATM withdrawals.
          </p>
        </div>
      </div>

      {/* Historical Archives */}
      <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-2">
          <div>
            <h2 className="font-bold text-base text-ink">Payment Date Archives</h2>
            <p className="text-muted-foreground text-xs">Verify historical payment release cycles for reference.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedYear("2026")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedYear === "2026"
                  ? "bg-accent text-black"
                  : "bg-surface-dim text-muted-foreground hover:bg-surface-container"
              }`}
            >
              2026 Cycle
            </button>
            <button
              onClick={() => setSelectedYear("2025")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedYear === "2025"
                  ? "bg-accent text-black"
                  : "bg-surface-dim text-muted-foreground hover:bg-surface-container"
              }`}
            >
              2025 Cycle
            </button>
          </div>
        </div>

        {selectedYear === "2026" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm text-ink">
              <thead className="bg-canvas text-muted-foreground font-bold font-mono">
                <tr>
                  <th className="p-3">Month (2026)</th>
                  <th className="p-3">Older Persons</th>
                  <th className="p-3">Disability</th>
                  <th className="p-3">Children</th>
                  <th className="p-3">SRD R370</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dim">
                {archive2026.map((m) => (
                  <tr key={m.id}>
                    <td className="p-3 font-semibold">{m.monthLabel} 2026</td>
                    <td className="p-3">{m.dates.olderPersons.replace(" 2026", "")}</td>
                    <td className="p-3">{m.dates.disability.replace(" 2026", "")}</td>
                    <td className="p-3">{m.dates.children.replace(" 2026", "")}</td>
                    <td className="p-3">{m.dates.srd.replace(" 2026", "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm text-ink">
              <thead className="bg-canvas text-muted-foreground font-bold font-mono">
                <tr>
                  <th className="p-3">Month (2025)</th>
                  <th className="p-3">Older Persons</th>
                  <th className="p-3">Disability</th>
                  <th className="p-3">Children</th>
                  <th className="p-3">SRD R370</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dim">
                {archivedDates["2025"].map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold">{row.month}</td>
                    <td className="p-3">{row.older}</td>
                    <td className="p-3">{row.disability}</td>
                    <td className="p-3">{row.children}</td>
                    <td className="p-3">{row.srd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
