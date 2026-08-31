'use client';

import { useState } from "react";
import { Sliders, Calendar, Calculator, Clock, BarChart, FileText, Table, DollarSign, Scale, Sparkles } from "lucide-react";
import EligibilityChecker from "./tools/EligibilityChecker";
import PaymentLookup from "./tools/PaymentLookup";
import AgeCalculator from "./tools/AgeCalculator";
import ChildSupportCalculator from "./tools/ChildSupportCalculator";
import AppealDeadline from "./tools/AppealDeadline";
import HouseholdEstimator from "./tools/HouseholdEstimator";
import DocumentChecklist from "./tools/DocumentChecklist";
import GrantComparison from "./tools/GrantComparison";
import GrantCalculator from "./tools/GrantCalculator";
import MeansTestCalculator from "./tools/MeansTestCalculator";
import EligibilityEngine from "./tools/EligibilityEngine";

type ToolType =
  | "eligibility-checker"
  | "payment-lookup"
  | "age-calculator"
  | "child-support-calculator"
  | "appeal-deadline"
  | "amount-estimator"
  | "checklist-generator"
  | "grant-comparison"
  | "grant-calculator"
  | "means-test"
  | "eligibility-engine";

export default function InteractiveTools() {
  const [activeTool, setActiveTool] = useState<ToolType>("eligibility-checker");

  return (
    <div className="space-y-6">
      <div className="flex gap-2 pb-2 border-b border-border overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { id: "eligibility-checker", label: "Eligibility Checker", icon: Sliders },
          { id: "payment-lookup", label: "Pay Day Lookup", icon: Calendar },
          { id: "age-calculator", label: "Age Vetting", icon: Calculator },
          { id: "child-support-calculator", label: "Child Grant Expiry", icon: Clock },
          { id: "appeal-deadline", label: "Appeal Timer", icon: Clock },
          { id: "amount-estimator", label: "Household Estimator", icon: BarChart },
          { id: "checklist-generator", label: "Checklist Gen", icon: FileText },
          { id: "grant-comparison", label: "Comparison Matrix", icon: Table },
          { id: "grant-calculator", label: "Grant Calculator", icon: DollarSign },
          { id: "means-test", label: "Means Test", icon: Scale },
          { id: "eligibility-engine", label: "Eligibility Engine", icon: Sparkles }
        ].map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as ToolType)}
              className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold transition ${
                activeTool === tool.id
                  ? "bg-accent text-primary-foreground"
                  : "bg-surface text-muted-foreground hover:bg-canvas border border-border"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
        {activeTool === "eligibility-checker" && <EligibilityChecker />}
        {activeTool === "payment-lookup" && <PaymentLookup />}
        {activeTool === "age-calculator" && <AgeCalculator />}
        {activeTool === "child-support-calculator" && <ChildSupportCalculator />}
        {activeTool === "appeal-deadline" && <AppealDeadline />}
        {activeTool === "amount-estimator" && <HouseholdEstimator />}
        {activeTool === "checklist-generator" && <DocumentChecklist />}
        {activeTool === "grant-comparison" && <GrantComparison />}
        {activeTool === "grant-calculator" && <GrantCalculator />}
        {activeTool === "means-test" && <MeansTestCalculator />}
        {activeTool === "eligibility-engine" && <EligibilityEngine />}
      </div>
    </div>
  );
}
