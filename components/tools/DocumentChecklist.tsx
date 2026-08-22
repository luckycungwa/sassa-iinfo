'use client';

import { useState } from "react";
import { CheckSquare } from "lucide-react";

export default function DocumentChecklist() {
  const [checklistGrant, setChecklistGrant] = useState("older-person");

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Document Checklist Generator</h2>
        <p className="text-muted-foreground text-xs">Generate a personalized checklist of documents to bring to your SASSA interview.</p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-muted-foreground">Select Grant Type</label>
        <select value={checklistGrant} onChange={(e) => setChecklistGrant(e.target.value)}
          className="w-full border border-surface-container rounded-xl px-3 py-2.5 bg-canvas text-sm focus:outline-none">
          <option value="older-person">Older Person Grant (Pension)</option>
          <option value="child-support">Child Support Grant</option>
          <option value="disability">Disability Grant</option>
        </select>
      </div>

      <div className="p-5 bg-canvas border border-border rounded-xl space-y-3">
        <p className="font-bold text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
          <CheckSquare className="w-4 h-4 text-accent-dark" /> Required Vetting Documents:
        </p>
        <div className="space-y-2">
          {checklistGrant === "older-person" && (
            <>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Original 13-digit smart ID card or green ID booklet.</span></div>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Proof of marital status (marriage certificate or death certificate if widowed).</span></div>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Last 3 months certified bank statements.</span></div>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Proof of residence (municipal bill or chief letter).</span></div>
            </>
          )}
          {checklistGrant === "child-support" && (
            <>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Caregiver&apos;s original ID document.</span></div>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Child&apos;s certified birth certificate with 13-digit ID.</span></div>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Road to Health Card / Clinic card (if child is under 5).</span></div>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Official school report or school verification letter.</span></div>
            </>
          )}
          {checklistGrant === "disability" && (
            <>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Applicant&apos;s original ID document.</span></div>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>SASSA Medical Assessment Report (completed by state doctor).</span></div>
              <div className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"><input type="checkbox" className="mt-1 flex-shrink-0" /><span>Certified proof of income or unemployment affidavit.</span></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
