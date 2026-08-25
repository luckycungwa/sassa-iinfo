'use client';

import { useState } from "react";

export default function AppealDeadline() {
  const [declineDate, setDeclineDate] = useState("");
  const [appealResult, setAppealResult] = useState<any>(null);

  const handleCalculateAppeal = () => {
    if (!declineDate) return;
    const decDate = new Date(declineDate);
    const today = new Date();
    const diffTime = today.getTime() - decDate.getTime();
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const daysRemaining = 90 - daysElapsed;
    let level: "safe" | "warning" | "critical" | "expired" = "safe";
    if (daysRemaining <= 0) level = "expired";
    else if (daysRemaining <= 10) level = "critical";
    else if (daysRemaining <= 30) level = "warning";
    setAppealResult({ daysElapsed, daysRemaining, level });
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">ITSAA Appeal Deadline Calculator</h2>
        <p className="text-muted-foreground text-xs">Verify how many days remain of the strict 90-day tribunal limit.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="appeal-decline-date" className="block text-xs font-bold text-muted-foreground">Date You Received SASSA Decline Notification</label>
        <div className="flex gap-2">
          <input id="appeal-decline-date" type="date" value={declineDate} onChange={(e) => setDeclineDate(e.target.value)}
            className="border border-surface-container rounded-xl px-4 py-2.5 bg-canvas text-sm focus:outline-none" />
          <button onClick={handleCalculateAppeal} className="bg-gold hover:bg-gold-dark text-black font-bold px-4 py-2.5 rounded-xl text-xs transition">Check Deadline</button>
        </div>
      </div>

      {appealResult && (
        <div role="status" aria-live="polite" className="p-4 bg-canvas rounded-xl border border-border space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-surface p-3 border border-border rounded-lg">
              <p className="text-xs text-muted-foreground font-mono uppercase">Days Elapsed</p>
              <p className="text-lg font-bold text-ink">{appealResult.daysElapsed} days</p>
            </div>
            <div className="bg-surface p-3 border border-border rounded-lg">
              <p className="text-xs text-muted-foreground font-mono uppercase">Days Remaining</p>
              <p className="text-lg font-bold text-ink">{Math.max(0, appealResult.daysRemaining)} days</p>
            </div>
          </div>
          {appealResult.level === "expired" && (
            <div className="p-3 bg-trading-down/10 border border-trading-down/30 rounded-xl text-ink text-xs">The strict 90-day appeal timeline has expired. You can no longer appeal this decision without seeking rare administrative condonation.</div>
          )}
          {appealResult.level === "critical" && (
            <div className="p-3 bg-trading-down/10 border border-trading-down/40 rounded-xl text-ink text-xs font-bold animate-pulse">CRITICAL WARNING: Less than 10 days remain to lodge your appeal.</div>
          )}
          {appealResult.level === "warning" && (
            <div className="p-3 bg-amber/10 border border-amber/30 rounded-xl text-ink text-xs">Warning: Less than 30 days remain.</div>
          )}
          {appealResult.level === "safe" && (
            <div className="p-3 bg-accent-light border border-accent-light/40 rounded-xl text-accent-dark text-xs">You are well within the safe window to lodge your appeal.</div>
          )}
        </div>
      )}
    </div>
  );
}
