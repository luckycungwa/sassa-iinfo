'use client';

import { useState } from "react";

export default function HouseholdEstimator() {
  const [estimatorCounts, setEstimatorCounts] = useState<{ [key: string]: number }>({
    "older-person": 0, "child-support": 0, "disability": 0, "foster-care": 0, "srd-grant": 0
  });

  const grants = [
    { id: "older-person", label: "Older Persons Pension (R2,400)", rate: 2400 },
    { id: "disability", label: "Disability Grant (R2,400)", rate: 2400 },
    { id: "child-support", label: "Child Support Grant (R580)", rate: 580 },
    { id: "foster-care", label: "Foster Care Grant (R1,295)", rate: 1295 },
    { id: "srd-grant", label: "SRD R370 Grant (R370)", rate: 370 }
  ];

  const total = grants.reduce((sum, g) => sum + estimatorCounts[g.id] * g.rate, 0);

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Household Grant Amount Estimator</h2>
        <p className="text-muted-foreground text-xs">Estimate the total monthly payout for all social grants in your home.</p>
      </div>

      <div className="space-y-4">
        {grants.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3.5 bg-canvas border border-border rounded-xl">
            <span className="text-xs md:text-sm font-bold text-ink">{item.label}</span>
            <div className="flex items-center gap-2">
              <button aria-label={`Decrease ${item.label}`} onClick={() => setEstimatorCounts({ ...estimatorCounts, [item.id]: Math.max(0, estimatorCounts[item.id] - 1) })}
                className="w-11 h-11 rounded-lg bg-surface border border-surface-container font-bold hover:bg-surface-dim transition text-sm flex items-center justify-center">-</button>
              <span className="w-8 text-center font-mono font-bold text-sm text-ink">{estimatorCounts[item.id]}</span>
              <button aria-label={`Increase ${item.label}`} onClick={() => setEstimatorCounts({ ...estimatorCounts, [item.id]: estimatorCounts[item.id] + 1 })}
                className="w-11 h-11 rounded-lg bg-surface border border-surface-container font-bold hover:bg-surface-dim transition text-sm flex items-center justify-center">+</button>
            </div>
          </div>
        ))}
      </div>

      <div role="status" aria-live="polite" className="p-5 bg-midnight border border-border rounded-xl text-center">
        <p className="text-xs text-gold font-mono uppercase">Estimated Total Monthly Payout</p>
        <h3 className="text-3xl font-extrabold text-gold mt-1">R{total.toLocaleString("en-ZA")}</h3>
        <p className="text-muted-foreground text-xs mt-1.5 leading-relaxed">This is a local estimation. Actual approved amounts depend strictly on formal SASSA assessment.</p>
      </div>
    </div>
  );
}
