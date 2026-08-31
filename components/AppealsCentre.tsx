'use client';

import { useState } from "react";
import { appeals, AppealGuide } from "../lib/data/appeals";
import { AlertCircle, FileText, ChevronRight, CheckCircle, Scale, ShieldAlert, Landmark, ArrowUpRight } from "lucide-react";

export default function AppealsCentre() {
  const [activeGuide, setActiveGuide] = useState<AppealGuide>(appeals[0]);

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-amber/10 border border-amber/30 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-start">
        <div className="p-3 bg-amber/20 rounded-xl text-amber-dark">
          <Scale className="w-6 h-6" />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-extrabold text-sm text-ink">Independent Social Assistance Tribunal (ITSAA)</h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Please note that social grant appeals are handled completely independently from SASSA by the **Ministry of Social Development&rsquo;s Independent Tribunal**. This ensures that your financial case is reviewed impartially. Appeals must be submitted within 90 days of receiving your decline notification.
          </p>
          <div className="pt-1.5">
            <a
              href="https://srd.dsd.gov.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:underline font-bold text-xs flex items-center gap-1"
            >
              Go to Official Appeal Portal <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Selector */}
        <div className="lg:col-span-4 space-y-2">
          {appeals.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGuide(g)}
              className={`w-full text-left p-4 rounded-xl border transition flex flex-col gap-1 ${
                activeGuide.id === g.id
                  ? "bg-accent border-accent-dark text-black font-semibold"
                  : "bg-surface border-border hover:border-accent/40 text-ink hover:bg-canvas"
              }`}
            >
              <h3 className="text-sm font-bold leading-tight">{g.title}</h3>
              <p className={`text-xs ${activeGuide.id === g.id ? "text-ink" : "text-muted-foreground"}`}>
                {g.shortDescription}
              </p>
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-8 bg-surface border border-border rounded-xl p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="border-b border-border pb-5 space-y-2">
            <h1 className="text-xl md:text-2xl font-extrabold text-ink tracking-tight">
              {activeGuide.title}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {activeGuide.introduction}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-ink flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-accent-dark" />
              Step-by-Step Appeal Process
            </h3>
            <div className="space-y-3">
              {activeGuide.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent-light border border-accent-light text-accent-dark text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed flex-1 pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline and Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Timeline */}
            <div className="bg-canvas rounded-xl p-5 border border-border space-y-2">
              <h3 className="font-bold text-sm text-ink flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-accent-dark" />
                Appeal Timeline & Deadlines
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {activeGuide.timeline}
              </p>
            </div>

            {/* Supporting Documents */}
            <div className="bg-canvas rounded-xl p-5 border border-border space-y-2">
              <h3 className="font-bold text-sm text-ink flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-accent-dark" />
                Supporting Documents Needed
              </h3>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground pl-4 list-disc">
                {activeGuide.documents.map((doc, idx) => (
                  <li key={idx} className="pl-0.5">{doc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Reasons and Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-xs font-mono text-muted-foreground tracking-wider uppercase flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Common Reasons
              </h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                {activeGuide.commonReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-trading-down rounded-full"></span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xs font-mono text-muted-foreground tracking-wider uppercase flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5" /> Expected Outcomes
              </h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                {activeGuide.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
