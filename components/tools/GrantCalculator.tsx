'use client';

import { useState } from "react";

const GRANTS_2026 = {
  srd: { label: "SRD R370 Grant", amount: 370, desc: "Unemployed, 18-59, no income" },
  childSupport: { label: "Child Support Grant", amount: 580, desc: "Per child, under 18" },
  childSupportTopUp: { label: "Child Support Top-Up (Orphan)", amount: 830, desc: "Per orphaned child" },
  olderPerson: { label: "Older Person Grant (60-74)", amount: 2400, desc: "Age 60-74" },
  olderPerson75: { label: "Older Person Grant (75+)", amount: 2420, desc: "Age 75+" },
  disability: { label: "Disability Grant", amount: 2400, desc: "18-59, medical assessment" },
  fosterCare: { label: "Foster Care Grant", amount: 1295, desc: "Per foster child, court order" },
  careDependency: { label: "Care Dependency Grant", amount: 2400, desc: "Child with severe disability" },
  warVeterans: { label: "War Veterans Grant", amount: 2420, desc: "WWI/WWII/Korea veterans" },
  grantInAid: { label: "Grant-in-Aid (Top-Up)", amount: 580, desc: "Added to primary grant" },
};

export default function GrantCalculator() {
  const [age, setAge] = useState<string>("");
  const [hasDisability, setHasDisability] = useState<string>("");
  const [childrenCount, setChildrenCount] = useState(0);
  const [orphanCount, setOrphanCount] = useState(0);
  const [fosterCount, setFosterCount] = useState(0);
  const [needsCare, setNeedsCare] = useState<string>("");
  const [isVeteran, setIsVeteran] = useState<string>("");
  const [results, setResults] = useState<{ grant: string; amount: number; note: string }[] | null>(null);

  function calculate() {
    const quals: { grant: string; amount: number; note: string }[] = [];
    const ageNum = parseInt(age);

    if (ageNum >= 18 && ageNum <= 59 && !hasDisability && !fosterCount && !orphanCount) {
      quals.push({ grant: GRANTS_2026.srd.label, amount: GRANTS_2026.srd.amount, note: "Requires zero monthly income" });
    }

    if (ageNum >= 60 && ageNum < 75) {
      quals.push({ grant: GRANTS_2026.olderPerson.label, amount: GRANTS_2026.olderPerson.amount, note: "Means tested" });
    } else if (ageNum >= 75) {
      quals.push({ grant: GRANTS_2026.olderPerson75.label, amount: GRANTS_2026.olderPerson75.amount, note: "Means tested" });
    }

    if (hasDisability === "yes" && ageNum >= 18 && ageNum <= 59) {
      quals.push({ grant: GRANTS_2026.disability.label, amount: GRANTS_2026.disability.amount, note: "Requires medical assessment" });
    }

    for (let i = 0; i < childrenCount; i++) {
      quals.push({ grant: GRANTS_2026.childSupport.label + " #" + (i + 1), amount: GRANTS_2026.childSupport.amount, note: "Means tested for caregiver" });
    }

    for (let i = 0; i < orphanCount; i++) {
      quals.push({ grant: GRANTS_2026.childSupportTopUp.label + " #" + (i + 1), amount: GRANTS_2026.childSupportTopUp.amount, note: "Both parents deceased" });
    }

    for (let i = 0; i < fosterCount; i++) {
      quals.push({ grant: GRANTS_2026.fosterCare.label + " #" + (i + 1), amount: GRANTS_2026.fosterCare.amount, note: "Court order required" });
    }

    if (ageNum >= 1 && ageNum <= 17 && hasDisability === "yes") {
      quals.push({ grant: GRANTS_2026.careDependency.label, amount: GRANTS_2026.careDependency.amount, note: "Severe disability, 24hr care" });
    }

    if (isVeteran === "yes") {
      quals.push({ grant: GRANTS_2026.warVeterans.label, amount: GRANTS_2026.warVeterans.amount, note: "Proof of service required" });
    }

    const hasPrimary = quals.some(q => q.grant.includes("Older Person") || q.grant.includes("Disability") || q.grant.includes("War Veterans"));
    if (needsCare === "yes" && hasPrimary) {
      quals.push({ grant: GRANTS_2026.grantInAid.label, amount: GRANTS_2026.grantInAid.amount, note: "Must already receive a primary grant" });
    }

    setResults(quals.length > 0 ? quals : []);
  }

  const total = results ? results.reduce((sum, r) => sum + r.amount, 0) : 0;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-5">
      <h2 className="text-sm font-black text-ink tracking-tight">Grant Calculator</h2>
      <p className="text-xs text-muted-foreground">Enter your details below to estimate your potential monthly grant income.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink">Your Age</label>
          <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono">
            <option value="">Select age range...</option>
            <option value="1">Under 18</option>
            <option value="25">18-59</option>
            <option value="65">60-74</option>
            <option value="80">75+</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink">Have a Disability?</label>
          <select value={hasDisability} onChange={(e) => setHasDisability(e.target.value)} className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono">
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink">Number of Children (under 18)</label>
          <input type="number" min={0} max={20} value={childrenCount} onChange={(e) => setChildrenCount(parseInt(e.target.value) || 0)} className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink">Orphaned Children in Your Care</label>
          <input type="number" min={0} max={20} value={orphanCount} onChange={(e) => setOrphanCount(parseInt(e.target.value) || 0)} className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink">Foster Children</label>
          <input type="number" min={0} max={20} value={fosterCount} onChange={(e) => setFosterCount(parseInt(e.target.value) || 0)} className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink">Need Full-Time Care?</label>
          <select value={needsCare} onChange={(e) => setNeedsCare(e.target.value)} className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono">
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink">War Veteran?</label>
          <select value={isVeteran} onChange={(e) => setIsVeteran(e.target.value)} className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono">
            <option value="">Select...</option>
            <option value="yes">Yes (WWI/WWII/Korea)</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-gold text-accent-foreground rounded-lg text-xs font-bold hover:bg-gold-dark transition">
        Calculate My Grants
      </button>

      {results !== null && (
        <div className="border-t border-border pt-4 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm font-bold text-ink">No grants found</p>
              <p className="text-xs text-muted-foreground mt-1">Based on the information provided, we could not identify any grants you may qualify for. Try adjusting your answers.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-ink">Estimated Monthly Total</h3>
                <span className="text-lg font-black text-gold font-mono">R{total.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center justify-between bg-canvas border border-border rounded-lg p-3">
                    <div>
                      <p className="text-xs font-bold text-ink">{r.grant}</p>
                      <p className="text-[11px] text-muted-foreground">{r.note}</p>
                    </div>
                    <span className="text-sm font-bold text-gold font-mono shrink-0 ml-2">R{r.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gold/5 border border-gold/20 rounded-lg p-3">
                <p className="text-[11px] text-ink leading-relaxed">
                  <strong className="text-gold">Important:</strong> This is an estimate based on 2026 grant amounts. Actual eligibility depends on the SASSA means test. Apply through official SASSA channels for confirmation.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
