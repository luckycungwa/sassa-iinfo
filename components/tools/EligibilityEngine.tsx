'use client';

import { useState } from "react";
import { toast } from "react-toastify";

type GrantResult = {
  id: string;
  label: string;
  amount: number;
  period: string;
  note: string;
  href: string;
};

const SRD_LIMIT = 624;
const CS_SINGLE = 5800;
const CS_MARRIED = 11600;
const OP_SINGLE = 112200; // annual
const OP_MARRIED = 224400; // annual

export default function EligibilityEngine() {
  const [age, setAge] = useState<string>("");
  const [married, setMarried] = useState<"single" | "married">("single");
  const [income, setIncome] = useState<string>("");
  const [hasOtherIncome, setHasOtherIncome] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<"yes" | "no">("no");
  const [children, setChildren] = useState<number>(0);
  const [orphans, setOrphans] = useState<number>(0);
  const [foster, setFoster] = useState<number>(0);
  const [veteran, setVeteran] = useState<"yes" | "no">("no");
  const [needsCare, setNeedsCare] = useState<"yes" | "no">("no");
  const [hasPrimary, setHasPrimary] = useState<"yes" | "no">("no");
  const [results, setResults] = useState<GrantResult[] | null>(null);

  function evaluate() {
    const ageNum = parseInt(age);
    const monthly = parseFloat(income);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      toast.error("Please enter a valid age.");
      return;
    }
    if (isNaN(monthly) || monthly < 0) {
      toast.error("Please enter your monthly income.");
      return;
    }

    const out: GrantResult[] = [];
    const childCount = children + orphans;

    // SRD R370
    if (ageNum >= 18 && ageNum <= 59 && !hasOtherIncome && monthly <= SRD_LIMIT) {
      out.push({
        id: "srd",
        label: "SRD R370 Grant",
        amount: 370,
        period: "month",
        note: "Unemployed, low/no income, no other grant. Reconfirm every 3 months.",
        href: "/grants/srd-r370-grant",
      });
    } else if (ageNum >= 18 && ageNum <= 59 && !hasOtherIncome && monthly > SRD_LIMIT) {
      out.push({
        id: "srd",
        label: "SRD R370 Grant",
        amount: 0,
        period: "",
        note: "Your income is above the R624/month SRD threshold — you likely do not qualify.",
        href: "/grants/srd-r370-grant",
      });
    }

    // Older Person
    if (ageNum >= 60) {
      const full = ageNum >= 75 ? 2420 : 2400;
      out.push({
        id: "older",
        label: ageNum >= 75 ? "Older Person Grant (75+)" : "Older Person Grant (60-74)",
        amount: full,
        period: "month",
        note: "Means-tested. Full amount if income is below the threshold; reduced above it.",
        href: "/grants/older-person-grant",
      });
    }

    // Disability
    if (disabled === "yes" && ageNum >= 18 && ageNum <= 59) {
      out.push({
        id: "disability",
        label: "Disability Grant",
        amount: 2400,
        period: "month",
        note: "Requires a SASSA medical assessment. Means-tested.",
        href: "/grants/disability-grant",
      });
    }

    // Child Support
    if (childCount > 0) {
      const limit = married === "married" ? CS_MARRIED : CS_SINGLE;
      if (monthly <= limit) {
        out.push({
          id: "cs",
          label: `Child Support Grant (${childCount} child${childCount > 1 ? "ren" : ""})`,
          amount: 580 * childCount,
          period: "month",
          note: orphans > 0 ? "Includes an increased top-up amount for orphaned children." : "Paid to the primary caregiver. Means-tested.",
          href: "/grants/child-support-grant",
        });
      } else {
        out.push({
          id: "cs",
          label: "Child Support Grant",
          amount: 0,
          period: "",
          note: "Caregiver income is above the means-test limit (single R5,800 / married R11,600 per month).",
          href: "/grants/child-support-grant",
        });
      }
    }

    // Foster Care
    if (foster > 0) {
      out.push({
        id: "foster",
        label: `Foster Care Grant (${foster} child${foster > 1 ? "ren" : ""})`,
        amount: 1295 * foster,
        period: "month",
        note: "No means test — paid on a valid court order.",
        href: "/grants/foster-care-grant",
      });
    }

    // Care Dependency
    if (disabled === "yes" && needsCare === "yes" && ageNum >= 1 && ageNum <= 17) {
      out.push({
        id: "care",
        label: "Care Dependency Grant",
        amount: 2400,
        period: "month",
        note: "For a child with severe disability needing full-time care. Income-tested.",
        href: "/grants/care-dependency-grant",
      });
    }

    // War Veterans
    if (veteran === "yes") {
      out.push({
        id: "veteran",
        label: "War Veterans Grant",
        amount: 2420,
        period: "month",
        note: "For qualifying veterans (WWII / Korea). Means-tested like the Older Person Grant.",
        href: "/grants/war-veterans-grant",
      });
    }

    // Grant-in-Aid
    if (needsCare === "yes" && hasPrimary === "yes") {
      out.push({
        id: "gia",
        label: "Grant-in-Aid",
        amount: 580,
        period: "month",
        note: "Top-up added to an existing primary grant when full-time care is needed.",
        href: "/grants/grant-in-aid",
      });
    }

    setResults(out);
    const qualifying = out.filter((r) => r.amount > 0);
    if (qualifying.length === 0) {
      toast.info("Based on your answers, you may not qualify for a cash grant — see the notes for details.");
    } else {
      const total = qualifying.reduce((s, r) => s + r.amount, 0);
      toast.success(`You may qualify for up to R${total.toLocaleString()}/month across ${qualifying.length} grant(s).`);
    }
  }

  const total =
    results?.filter((r) => r.amount > 0).reduce((s, r) => s + r.amount, 0) ?? 0;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-5">
      <div>
        <h2 className="text-sm font-black text-ink tracking-tight">Grant Eligibility Engine</h2>
        <p className="text-xs text-muted-foreground">
          Answer a few questions and we&apos;ll show every SASSA grant you may qualify for — and what each pays.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="ee-age" className="text-xs font-bold text-ink">Your Age</label>
          <input
            id="ee-age"
            type="number"
            min={0}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
            placeholder="e.g. 34"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ee-married" className="text-xs font-bold text-ink">Marital Status</label>
          <select
            id="ee-married"
            value={married}
            onChange={(e) => setMarried(e.target.value as "single" | "married")}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          >
            <option value="single">Single</option>
            <option value="married">Married (combined income)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ee-income" className="text-xs font-bold text-ink">Monthly Household Income (R)</label>
          <input
            id="ee-income"
            type="number"
            min={0}
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
            placeholder="e.g. 3000"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink">Employed / UIF / NSFAS / Other Grant?</label>
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

        <div className="space-y-1.5">
          <label htmlFor="ee-disabled" className="text-xs font-bold text-ink">Have a Disability?</label>
          <select
            id="ee-disabled"
            value={disabled}
            onChange={(e) => setDisabled(e.target.value as "yes" | "no")}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ee-veteran" className="text-xs font-bold text-ink">War Veteran?</label>
          <select
            id="ee-veteran"
            value={veteran}
            onChange={(e) => setVeteran(e.target.value as "yes" | "no")}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          >
            <option value="no">No</option>
            <option value="yes">Yes (WWII / Korea)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ee-children" className="text-xs font-bold text-ink">Children Under 18 in Your Care</label>
          <input
            id="ee-children"
            type="number"
            min={0}
            max={20}
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ee-orphans" className="text-xs font-bold text-ink">Orphaned Children in Your Care</label>
          <input
            id="ee-orphans"
            type="number"
            min={0}
            max={20}
            value={orphans}
            onChange={(e) => setOrphans(parseInt(e.target.value) || 0)}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ee-foster" className="text-xs font-bold text-ink">Foster Children</label>
          <input
            id="ee-foster"
            type="number"
            min={0}
            max={20}
            value={foster}
            onChange={(e) => setFoster(parseInt(e.target.value) || 0)}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ee-care" className="text-xs font-bold text-ink">Need Full-Time Care?</label>
          <select
            id="ee-care"
            value={needsCare}
            onChange={(e) => setNeedsCare(e.target.value as "yes" | "no")}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          >
            <option value="no">No</option>
            <option value="yes">Yes (self or child)</option>
          </select>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="ee-primary" className="text-xs font-bold text-ink">
            Already Receive a Primary Grant (Older Person / Disability / War Vet / Care Dependency)?
          </label>
          <select
            id="ee-primary"
            value={hasPrimary}
            onChange={(e) => setHasPrimary(e.target.value as "yes" | "no")}
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-xs text-ink font-mono"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>

      <button
        onClick={evaluate}
        className="w-full py-2.5 bg-gold text-accent-foreground rounded-lg text-xs font-bold hover:bg-gold-dark transition"
      >
        Check My Grants
      </button>

      {results !== null && (
        <div role="status" aria-live="polite" className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-ink">Estimated Monthly Total</h3>
            <span className="text-lg font-black text-accent-dark font-mono">R{total.toLocaleString()}</span>
          </div>
          <div className="space-y-2">
            {results.map((r) => (
              <a
                key={r.id + r.label}
                href={r.href}
                className="block bg-canvas border border-border rounded-lg p-3 hover:border-violet transition"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-ink">{r.label}</p>
                  {r.amount > 0 && (
                    <span className="text-sm font-bold text-accent-dark font-mono shrink-0 ml-2">
                      R{r.amount.toLocaleString()}/{r.period}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">{r.note}</p>
              </a>
            ))}
          </div>
          <div className="bg-gold/5 border border-gold/20 rounded-lg p-3">
            <p className="text-[11px] text-ink leading-relaxed">
              <strong className="text-accent-dark">Estimate only.</strong> This uses SASSA&apos;s 2026 rules and is not
              a guarantee. Final eligibility is decided by SASSA. Tap any grant to read the full requirements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
