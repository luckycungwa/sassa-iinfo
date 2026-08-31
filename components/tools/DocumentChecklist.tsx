'use client';

import { useState } from "react";
import { toast } from "react-toastify";
import { CheckSquare } from "lucide-react";

const CHECKLISTS: Record<string, { label: string; items: string[] }> = {
  "older-person": {
    label: "Older Person Grant",
    items: [
      "Original 13-digit smart ID card or green ID booklet.",
      "Proof of marital status (marriage certificate or death certificate if widowed).",
      "Last 3 months certified bank statements.",
      "Proof of residence (municipal bill or chief letter).",
    ],
  },
  "child-support": {
    label: "Child Support Grant",
    items: [
      "Caregiver's original ID document.",
      "Child's certified birth certificate with 13-digit ID.",
      "Road to Health Card / Clinic card (if child is under 5).",
      "Official school report or school verification letter.",
    ],
  },
  disability: {
    label: "Disability Grant",
    items: [
      "Applicant's original ID document.",
      "SASSA Medical Assessment Report (completed by state doctor).",
      "Certified proof of income or unemployment affidavit.",
    ],
  },
};

export default function DocumentChecklist() {
  const [checklistGrant, setChecklistGrant] = useState("older-person");
  const active = CHECKLISTS[checklistGrant];

  const handleCopyChecklist = async () => {
    const text = "SASSA " + active.label + " - documents to bring:\n" + active.items.map((item, i) => (i + 1) + ". " + item).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Checklist copied to clipboard");
    } catch {
      toast.error("Could not copy - your browser blocked clipboard access");
    }
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Document Checklist Generator</h2>
        <p className="text-muted-foreground text-xs">Generate a personalized checklist of documents to bring to your SASSA interview.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="checklist-grant" className="block text-xs font-bold text-muted-foreground">Select Grant Type</label>
        <select id="checklist-grant" value={checklistGrant} onChange={(e) => setChecklistGrant(e.target.value)}
          className="w-full border border-surface-container rounded-xl px-3 py-2.5 bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-dark">
          <option value="older-person">Older Person Grant (Pension)</option>
          <option value="child-support">Child Support Grant</option>
          <option value="disability">Disability Grant</option>
        </select>
      </div>

      <div role="status" aria-live="polite" className="p-5 bg-canvas border border-border rounded-xl space-y-3">
        <p className="font-bold text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
          <CheckSquare className="w-4 h-4 text-accent-dark" /> Required Vetting Documents:
        </p>
        <div className="space-y-2">
          {active.items.map((item) => (
            <label key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" className="mt-1 flex-shrink-0" />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <button onClick={handleCopyChecklist} className="w-full py-2 bg-gold hover:bg-gold-dark text-black font-bold rounded-lg text-xs transition">
          Copy checklist for {active.label}
        </button>
      </div>
    </div>
  );
}
