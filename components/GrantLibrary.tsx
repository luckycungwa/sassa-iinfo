'use client';

import { useState } from "react";
import { grants, Grant } from "../lib/data/grants";
import { BookOpen, HelpCircle, CheckCircle, FileText, ChevronDown, ChevronUp, Landmark, Bookmark } from "lucide-react";

export default function GrantLibrary() {
  const [selectedGrant, setSelectedGrant] = useState<Grant>(grants[0]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Grant Sidebar Selector */}
      <div className="lg:col-span-4 space-y-3">
        <h2 className="font-bold text-base text-slate-800 px-1 font-mono tracking-wide uppercase">
          Social Grants
        </h2>
        <div className="space-y-2">
          {grants.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedGrant(g);
                setExpandedFaq(null);
              }}
              className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between ${
                selectedGrant.id === g.id
                  ? "bg-emerald-800 border-emerald-950 text-white shadow-md font-semibold"
                  : "bg-white border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div>
                <p className="text-xs font-mono opacity-80 uppercase tracking-wider">Amount</p>
                <p className="text-sm font-extrabold leading-tight">{g.title}</p>
              </div>
              <ChevronDown className="w-5 h-5 flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Grant Details Content Pane */}
      <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header Block */}
        <div className="border-b border-slate-100 pb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {selectedGrant.title}
            </h1>
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-mono font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm">
              <Landmark className="w-4 h-4" />
              <span>{selectedGrant.amount} / month</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {selectedGrant.overview}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eligibility */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-800" />
              Eligibility Criteria
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-600">
              {selectedGrant.eligibilityCriteria.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              Documents Required
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-600">
              {selectedGrant.documentsRequired.map((d, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-800" />
            How To Apply
          </h3>
          <ol className="space-y-2 text-xs md:text-sm text-slate-600 list-decimal pl-4">
            {selectedGrant.howToApply.map((step, idx) => (
              <li key={idx} className="pl-1">
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Appeal Notes */}
        <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl flex items-start gap-2 text-xs text-amber-800 leading-relaxed">
          <Bookmark className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold">Important Appeal Guideline:</p>
            <p className="mt-0.5">{selectedGrant.appealNotes}</p>
          </div>
        </div>

        {/* FAQs Section */}
        {selectedGrant.faqs && selectedGrant.faqs.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-800" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-2 divide-y divide-slate-100">
              {selectedGrant.faqs.map((faq, idx) => (
                <div key={idx} className="pt-2.5 first:pt-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left font-semibold text-sm text-slate-800 hover:text-emerald-800 flex justify-between items-center py-1.5"
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
