'use client';

import { useState } from "react";
import { appeals, AppealGuide } from "../lib/data/appeals";
import { AlertCircle, FileText, ChevronRight, CheckCircle, Scale, ShieldAlert, Landmark, ArrowUpRight } from "lucide-react";

export default function AppealsCentre() {
  const [activeGuide, setActiveGuide] = useState<AppealGuide>(appeals[0]);

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start shadow-sm">
        <div className="p-3 bg-amber-100 rounded-xl text-amber-800">
          <Scale className="w-6 h-6" />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-extrabold text-sm text-amber-950">Independent Social Assistance Tribunal (ITSAA)</h3>
          <p className="text-xs md:text-sm text-amber-900 leading-relaxed">
            Please note that social grant appeals are handled completely independently from SASSA by the **Ministry of Social Development’s Independent Tribunal**. This ensures that your financial case is reviewed impartially. Appeals must be submitted within 90 days of receiving your decline notification.
          </p>
          <div className="pt-1.5">
            <a
              href="https://srd.dsd.gov.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-950 hover:underline font-bold text-xs flex items-center gap-1"
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
                  ? "bg-emerald-800 border-emerald-950 text-white shadow-md font-semibold"
                  : "bg-white border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <h3 className="text-sm font-bold leading-tight">{g.title}</h3>
              <p className={`text-xs ${activeGuide.id === g.id ? "text-emerald-100" : "text-slate-500"}`}>
                {g.shortDescription}
              </p>
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="border-b border-slate-100 pb-5 space-y-2">
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
              {activeGuide.title}
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              {activeGuide.introduction}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-800" />
              Step-by-Step Appeal Process
            </h3>
            <div className="space-y-3">
              {activeGuide.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed flex-1 pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline and Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Timeline */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Appeal Timeline & Deadlines
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {activeGuide.timeline}
              </p>
            </div>

            {/* Supporting Documents */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-800" />
                Supporting Documents Needed
              </h3>
              <ul className="space-y-1 text-xs md:text-sm text-slate-600 pl-4 list-disc">
                {activeGuide.documents.map((doc, idx) => (
                  <li key={idx} className="pl-0.5">{doc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Reasons and Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-xs font-mono text-slate-400 tracking-wider uppercase flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Common Reasons
              </h4>
              <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                {activeGuide.commonReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xs font-mono text-slate-400 tracking-wider uppercase flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5" /> Expected Outcomes
              </h4>
              <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                {activeGuide.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
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
