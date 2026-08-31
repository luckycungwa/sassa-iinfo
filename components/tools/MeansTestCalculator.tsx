'use client';

import { useState } from "react";
import { toast } from "react-toastify";

// SASSA means-test thresholds (2026, published figures)
const SRD_INCOME_LIMIT = 624; // R/month

const PERMANENT = {
  fullGrant: 2400,
  singleThreshold: 112200, // annual (~R9,350/mo) — 2026
  singleCutoff: 117000, // annual (threshold + 2x grant)
  marriedThreshold: 224400, // annual combined (~R18,700/mo) — 2026
  marriedCutoff: 229200, // annual combined
};

const CARE_DEPENDENCY = {
  fullGrant: 2400,
  singleThreshold: 288000, // annual (~R24,000/mo) — 2026
  singleCutoff: 292800, // annual (threshold + 2x grant)
  marriedThreshold: 576000, // annual combined (~R48,000/mo)
  marriedCutoff: 580800, // annual combined
};

const CHILD_SUPPORT = {
  fullGrant: 580,
  singleThreshold: 5800, // monthly — 2026
  singleCutoff: 6960, // monthly (threshold + 2x grant)
  marriedThreshold: 11600, // monthly (combined) — 2026
  marriedCutoff: 12760, // monthly (combined)
};

type GrantKey = "srd" | "olderPerson" | "disability" | "careDependency" | "childSupport";

const GRANT_LABELS: Record<GrantKey, string> = {
  srd: "SRD R370 Grant",
  olderPerson: "Older Person Grant",
  disability: "Disability Grant",
  careDependency: "Care Dependency Grant",
  childSupport: "Child Support Grant",
};

export default function MeansTestCalculator() {
  const [grant, setGrant] = useState<GrantKey>("srd");
  const [income, setIncome] = useState<string>("");
  const [married, setMarried] = useState<"single" | "married">("single");
  const [hasOtherIncome, setHasOtherIncome] = useState<boolean>(false);
  const [result, setResult] = useState<{
    verdict: "qualifies" | "partial" | "fails" | "unknown";
    amount?: number;
    message: string;
  } | null>(null);

  function calculate() {
    const monthly = parseFloat(income);
    if (isNaN(monthly) || monthly < 0) {
      toast.error("Please enter your monthly income.");
      return;
    }

    // SRD — simple income threshold + disqualifying income
    if (grant === "srd") {
      if (hasOtherIncome) {
        setResult({
          verdict: "fails",
          message:
            "You likely do NOT qualify for the SRD R370 grant. The SRD means test excludes anyone receiving a regular salary, UIF, NSFAS, or another social grant (except the Child Support Grant for your own child).",
        });
        return;
      }
      if (monthly <= SRD_INCOME_LIMIT) {
        setResult({
          verdict: "qualifies",
          amount: 370,
          message: `Your income of R${monthly.toLocaleString()}/month is at or below the R${SRD_INCOME_LIMIT} SRD threshold, so you likely qualify — provided you meet the other criteria (aged 18-59, unemployed, South African citizen/permanent resident/refugee, and not resident in a state institution).`,
        });
      } else {
        setResult({
          verdict: "fails",
          message: `Your income of R${monthly.toLocaleString()}/month is above the R${SRD_INCOME_LIMIT} SRD threshold. You likely do NOT qualify for the SRD R370 grant. If your situation changes (job loss, reduced income), you can reapply.`,
        });
      }
      return;
    }

    // Permanent grants (Older Person, Disability) — standard 2026 thresholds
    if (grant === "olderPerson" || grant === "disability") {
      const annual = monthly * 12;
      const threshold = married === "married" ? PERMANENT.marriedThreshold : PERMANENT.singleThreshold;
      const cutoff = married === "married" ? PERMANENT.marriedCutoff : PERMANENT.singleCutoff;

      if (annual <= threshold) {
        setResult({
          verdict: "qualifies",
          amount: PERMANENT.fullGrant,
          message: `Your annual income of R${annual.toLocaleString()} is at or below the means-test threshold (R${threshold.toLocaleString()}), so you likely qualify for the full R${PERMANENT.fullGrant} grant.${married === "married" ? " Combined household income is assessed for married applicants." : ""}`,
        });
      } else if (annual <= cutoff) {
        const reduced = Math.max(0, PERMANENT.fullGrant - (annual - threshold) / 2);
        const rounded = Math.round(reduced);
        setResult({
          verdict: "partial",
          amount: rounded,
          message: `Your income is above the threshold but below the cut-off, so you may qualify for a REDUCED grant of approximately R${rounded}/month (the grant reduces by R1 for every R2 of income above the limit). SASSA confirms the final amount.`,
        });
      } else {
        setResult({
          verdict: "fails",
          message: `Your annual income of R${annual.toLocaleString()} is above the means-test cut-off (R${cutoff.toLocaleString()}), so you likely do NOT qualify for this grant.`,
        });
      }
      return;
    }

    // Care Dependency Grant — higher income limit, income test only
    if (grant === "careDependency") {
      const annual = monthly * 12;
      const threshold = married === "married" ? CARE_DEPENDENCY.marriedThreshold : CARE_DEPENDENCY.singleThreshold;
      const cutoff = married === "married" ? CARE_DEPENDENCY.marriedCutoff : CARE_DEPENDENCY.singleCutoff;

      if (annual <= threshold) {
        setResult({
          verdict: "qualifies",
          amount: CARE_DEPENDENCY.fullGrant,
          message: `Your annual income of R${annual.toLocaleString()} is at or below the Care Dependency means-test threshold (R${threshold.toLocaleString()}), so the child likely qualifies for the full R${CARE_DEPENDENCY.fullGrant} grant. This grant uses an income test only (no asset test).`,
        });
      } else if (annual <= cutoff) {
        const reduced = Math.max(0, CARE_DEPENDENCY.fullGrant - (annual - threshold) / 2);
        const rounded = Math.round(reduced);
        setResult({
          verdict: "partial",
          amount: rounded,
          message: `Income is above the threshold but below the cut-off, so the child may qualify for a REDUCED grant of approximately R${rounded}/month. SASSA confirms the final amount.`,
        });
      } else {
        setResult({
          verdict: "fails",
          message: `Your annual income of R${annual.toLocaleString()} is above the Care Dependency cut-off (R${cutoff.toLocaleString()}), so the child likely does NOT qualify.`,
        });
      }
      return;
    }

    // Child Support Grant (caregiver means test)
    if (grant === "childSupport") {
      const threshold = married === "married" ? CHILD_SUPPORT.marriedThreshold : CHILD_SUPPORT.singleThreshold;
      const cutoff = married === "married" ? CHILD_SUPPORT.marriedCutoff : CHILD_SUPPORT.singleCutoff;

      if (monthly <= threshold) {
        setResult({
          verdict: "qualifies",
          amount: CHILD_SUPPORT.fullGrant,
          message: `The primary caregiver's income of R${monthly.toLocaleString()}/month is at or below the Child Support Grant threshold (R${threshold.toLocaleString()}), so the child likely qualifies for the full R${CHILD_SUPPORT.fullGrant} grant.`,
        });
      } else if (monthly <= cutoff) {
        const reduced = Math.max(0, CHILD_SUPPORT.fullGrant - (monthly - threshold) / 2);
        const rounded = Math.round(reduced);
        setResult({
          verdict: "partial",
          amount: rounded,
          message: `Income is above the threshold but below the cut-off, so the child may qualify for a REDUCED grant of approximately R${rounded}/month. SASSA applies the reduction formula.`,
        });
      } else {
        setResult({
          verdict: "fails",
          message: `The caregiver's income of R${monthly.toLocaleString()}/month is above the Child Support Grant cut-off (R${cutoff.toLocaleString()}), so the child likely does NOT qualify.`,
        });
      }
      return;
    }

    setResult({ verdict: "unknown", message: "Please select a grant type." });
  }

  const verdictStyles: Record<string, string> = {
    qualifies: "bg-gold/10 border-gold/30 text-ink",
    partial: "bg-yellow/10 border-yellow/30 text-ink",
    fails: "bg-trading-down/10 border-trading-down/30 text-ink",
    unknown: "bg-surface border-border text-ink",
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-5">
      <h2 className="text-sm font-black text-ink tracking-tight">Means Test Calculator</h2>
      <p className="text-xs text-muted-foreground">
        Check whether your income falls within the official SASSA means-test limits for each grant.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="mt-grant" className="text-xs font-bold text-ink">Grant Type</label>
          <select
            id="mt-grant"
            value={grant}
            onChange={(e) => setGrant(e.target.value as GrantKey)}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          >
            <option value="srd">SRD R370 Grant</option>
            <option value="olderPerson">Older Person Grant</option>
            <option value="disability">Disability Grant</option>
            <option value="careDependency">Care Dependency Grant</option>
            <option value="childSupport">Child Support Grant</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="mt-income" className="text-xs font-bold text-ink">Monthly Income (R)</label>
          <input
            id="mt-income"
            type="number"
            min={0}
            placeholder="e.g. 4500"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          />
        </div>

        {grant !== "srd" && (
          <div className="space-y-1.5">
            <label htmlFor="mt-married" className="text-xs font-bold text-ink">Marital Status</label>
            <select
              id="mt-married"
              value={married}
              onChange={(e) => setMarried(e.target.value as "single" | "married")}
              className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
            >
              <option value="single">Single</option>
              <option value="married">Married (combined income)</option>
            </select>
          </div>
        )}

        {grant === "srd" && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ink">Other Income?</label>
            <label className="flex items-center gap-2 bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={hasOtherIncome}
                onChange={(e) => setHasOtherIncome(e.target.checked)}
                className="accent-violet"
              />
              I receive a salary, UIF, NSFAS, or another grant
            </label>
          </div>
        )}
      </div>

      <button
        onClick={calculate}
        className="w-full py-2.5 bg-gold text-accent-foreground rounded-lg text-xs font-bold hover:bg-gold-dark transition"
      >
        Run Means Test
      </button>

      {result && (
        <div role="status" aria-live="polite" className={`border rounded-lg p-4 ${verdictStyles[result.verdict]}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black text-ink">
              {result.verdict === "qualifies" && "Likely Qualifies"}
              {result.verdict === "partial" && "May Qualify (Reduced)"}
              {result.verdict === "fails" && "Likely Does Not Qualify"}
              {result.verdict === "unknown" && "Select a grant"}
            </h3>
            {result.amount !== undefined && (
              <span className="text-lg font-black text-accent-dark font-mono">R{result.amount.toLocaleString()}/mo</span>
            )}
          </div>
          <p className="text-[11px] text-ink leading-relaxed">{result.message}</p>
          <p className="text-[10px] text-muted-foreground mt-2">
            Estimate based on SASSA&apos;s 2026 means-test rules. Final eligibility is decided by SASSA.
          </p>
        </div>
      )}
    </div>
  );
}
