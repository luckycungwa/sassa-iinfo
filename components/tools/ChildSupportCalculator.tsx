'use client';

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function ChildSupportCalculator() {
  const [childDob, setChildDob] = useState("");
  const [childResult, setChildResult] = useState<any>(null);

  const handleCalculateChildSupport = () => {
    if (!childDob) return;
    const birthDate = new Date(childDob);
    const today = new Date();
    const expiryDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) {
      setChildResult({ expired: true, age: 18, daysLeft: 0 });
    } else {
      const yearsLeft = Math.floor(diffDays / 365);
      const monthsLeft = Math.floor((diffDays % 365) / 30);
      setChildResult({
        expired: false, age: today.getFullYear() - birthDate.getFullYear(), yearsLeft, monthsLeft, daysLeft: diffDays,
        expiryDateString: expiryDate.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Child Support Expiry Calculator</h2>
        <p className="text-muted-foreground text-xs">Calculate exactly how many pay cycles remain before a child turns 18.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="child-dob" className="block text-xs font-bold text-muted-foreground">Enter Child&apos;s Date of Birth</label>
        <div className="flex gap-2">
          <input id="child-dob" type="date" value={childDob} onChange={(e) => setChildDob(e.target.value)}
            className="border border-surface-container rounded-xl px-4 py-2.5 bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-dark" />
          <button onClick={handleCalculateChildSupport} className="bg-gold hover:bg-gold-dark text-black font-bold px-4 py-2.5 rounded-xl text-xs transition">Calculate Expiry</button>
        </div>
      </div>

      {childResult && (
        <div role="status" aria-live="polite" className="p-4 bg-canvas rounded-xl border border-border space-y-3 animate-fadeIn">
          {childResult.expired ? (
            <div className="text-xs text-trading-down bg-trading-down/10 border border-trading-down/30 p-3 rounded-xl flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>This child has reached or exceeded 18 years of age. Under South African law, the Child Support Grant has expired and payouts have terminated.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-bold text-ink">Current Child Age: <span className="text-accent-dark">{childResult.age} years old</span></p>
              <div className="p-4 bg-accent-light border border-accent-light/40 rounded-xl text-center">
                <p className="text-xs text-accent-dark font-mono uppercase">Payout cycles remaining</p>
                <p className="text-2xl font-extrabold text-ink mt-1">{childResult.yearsLeft} years, {childResult.monthsLeft} months</p>
                <p className="text-xs text-muted-foreground mt-1">Expected Expiry: {childResult.expiryDateString} (Turns 18)</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
