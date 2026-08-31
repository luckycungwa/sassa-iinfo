'use client';

import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [ageResult, setAgeResult] = useState<any>(null);

  const handleCalculateAge = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    const qualifiedGrants = [];
    if (age >= 60) qualifiedGrants.push({ name: "Older Person Grant (Pension)", desc: "Aged 60 or older." });
    if (age < 18) {
      qualifiedGrants.push({ name: "Child Support Grant", desc: "Aged under 18 (caregiver must apply)." });
      qualifiedGrants.push({ name: "Foster Care Grant", desc: "If placed legally under foster care." });
    }
    if (age >= 18 && age < 60) {
      qualifiedGrants.push({ name: "Social Relief of Distress (SRD R370)", desc: "Unemployed aged 18-59." });
      qualifiedGrants.push({ name: "Disability Grant", desc: "Aged 18-59 with a qualifying physical or mental condition." });
    }
    setAgeResult({ age, qualifiedGrants });
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Age Eligibility Vetting</h2>
        <p className="text-muted-foreground text-xs">Verify what grants match based strictly on birth year limits.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="age-dob" className="block text-xs font-bold text-muted-foreground">Enter Your Date of Birth</label>
        <div className="flex gap-2">
          <input id="age-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)}
            className="border border-surface-container rounded-xl px-4 py-2.5 bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-dark" />
          <button onClick={handleCalculateAge} className="bg-gold hover:bg-gold-dark text-black font-bold px-4 py-2.5 rounded-xl text-xs transition">Verify Age limits</button>
        </div>
      </div>

      {ageResult && (
        <div role="status" aria-live="polite" className="p-4 bg-canvas rounded-xl border border-border space-y-3 animate-fadeIn">
          <p className="text-sm font-bold text-ink">Calculated Age: <span className="text-accent-dark">{ageResult.age} years old</span></p>
          {ageResult.qualifiedGrants.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Matching Age Portals:</p>
              {ageResult.qualifiedGrants.map((g: any, idx: number) => (
                <div key={idx} className="p-3 bg-surface rounded-xl border border-border text-xs">
                  <p className="font-bold text-ink">{g.name}</p>
                  <p className="text-muted-foreground mt-0.5">{g.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No explicit age limits matched.</p>
          )}
        </div>
      )}
    </div>
  );
}
