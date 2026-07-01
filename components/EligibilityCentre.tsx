'use client';

import { useState } from "react";
import { eligibilityGuides, EligibilityGuide } from "../lib/data/eligibility";
import { Compass, CheckCircle, HelpCircle, Sliders, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function EligibilityCentre({ onNavigateToTools }: { onNavigateToTools?: () => void }) {
  const [selectedGuide, setSelectedGuide] = useState<EligibilityGuide>(eligibilityGuides[0]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Selector */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-accent-dark text-white rounded-xl p-5 border border-emerald-800 space-y-3">
          <Sliders className="w-6 h-6 text-amber-400" />
          <h3 className="font-extrabold text-sm tracking-wide">Dynamic Eligibility Vetting</h3>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Unsure if you qualify for any grant? Try our interactive diagnostic tool to check all parameters in 60 seconds.
          </p>
          <button
            onClick={onNavigateToTools}
            className="w-full bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-4 py-2 rounded-xl transition text-xs"
          >
            Launch Eligibility Checker
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="font-bold text-xs font-mono tracking-wider text-muted px-1 uppercase">
            Browse by Situation
          </h2>
          {eligibilityGuides.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedGuide(g);
                setExpandedFaq(null);
              }}
              className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between ${
                selectedGuide.id === g.id
                  ? "bg-accent border-emerald-950 text-white font-semibold"
                  : "bg-surface border-border hover:border-accent/40 text-slate-700 hover:bg-canvas"
              }`}
            >
              <div>
                <p className="text-xs font-mono opacity-80 uppercase">Situation</p>
                <h3 className="text-sm font-bold leading-tight">{g.scenario}</h3>
              </div>
              <Compass className="w-5 h-5 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Pane */}
      <div className="lg:col-span-8 bg-surface border border-border rounded-xl p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-5 space-y-2">
          <h1 className="text-xl md:text-2xl font-extrabold text-ink tracking-tight">
            {selectedGuide.title}
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {selectedGuide.shortDescription}
          </p>
        </div>

        {/* Introduction */}
        <p className="text-slate-600 text-sm leading-relaxed">
          {selectedGuide.introduction}
        </p>

        {/* Checklist */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent-dark" />
            Are You Eligible? Quick Checklist
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedGuide.checklist.map((item, idx) => (
              <li key={idx} className="p-3 bg-canvas border border-border rounded-xl flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Grants */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-800">Recommended Grants:</h3>
          <div className="space-y-2.5">
            {selectedGuide.recommendedGrants.map((grant, idx) => (
              <div key={idx} className="p-4 border border-emerald-100 bg-accent-light/30 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-emerald-950">{grant.name}</h4>
                  <p className="text-xs text-muted mt-0.5">Estimated payout amount</p>
                </div>
                <div className="font-extrabold font-mono text-sm text-accent-dark bg-surface border border-emerald-100 px-3 py-1 rounded-lg">
                  {grant.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps To Qualify */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-800">Steps To Qualify:</h3>
          <ol className="space-y-2 text-xs md:text-sm text-slate-600 list-decimal pl-4">
            {selectedGuide.stepsToQualify.map((step, idx) => (
              <li key={idx} className="pl-1 leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        {/* Restrictions */}
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-2.5 text-xs text-red-900 leading-relaxed">
          <AlertCircle className="w-4.5 h-4.5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Exclusions & Restrictions:</p>
            <p className="mt-0.5">{selectedGuide.restrictions.join(" ")}</p>
          </div>
        </div>

        {/* FAQs */}
        {selectedGuide.faqs && selectedGuide.faqs.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-accent-dark" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-2 divide-y divide-slate-100">
              {selectedGuide.faqs.map((faq, idx) => (
                <div key={idx} className="pt-2.5 first:pt-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-left font-semibold text-sm text-slate-800 hover:text-accent-dark flex justify-between items-center py-1.5"
                  >
                    <span>{faq.question}</span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === idx && (
                    <div className="text-xs md:text-sm text-slate-600 mt-1 pl-1 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
