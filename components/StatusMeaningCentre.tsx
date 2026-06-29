'use client';

import { useState } from "react";
import { statuses, StatusMeaning } from "../lib/data/statuses";
import { Search, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Clock, XCircle, Info } from "lucide-react";

export default function StatusMeaningCentre() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusMeaning>(statuses[0]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredStatuses = statuses.filter((s) =>
    s.statusName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (id: string) => {
    switch (id) {
      case "approved":
      case "application-complete":
      case "payment-processing":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case "pending":
      case "pending-30-days":
      case "bank-verification":
      case "identity-verification":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "cancelled":
      case "alternative-income-source":
      case "means-test-failed":
      case "self-exclusion":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "referred":
        return <AlertCircle className="w-5 h-5 text-amber-600 animate-pulse" />;
      default:
        return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* List / Search Column */}
      <div className="lg:col-span-5 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search status codes (e.g. Approved, UIF)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800 transition text-sm shadow-sm"
          />
        </div>

        {/* Status List */}
        <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin pr-1">
          {filteredStatuses.length > 0 ? (
            filteredStatuses.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedStatus(s);
                  setExpandedFaq(null);
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 ${
                  selectedStatus.id === s.id
                    ? "bg-emerald-800 border-emerald-950 text-white shadow-md font-semibold"
                    : "bg-white border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {selectedStatus.id === s.id ? (
                    <div className="p-1 bg-white/20 rounded">
                      {getStatusIcon(s.id)}
                    </div>
                  ) : (
                    getStatusIcon(s.id)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-tight truncate">{s.statusName}</h3>
                  <p className={`text-xs mt-0.5 leading-snug line-clamp-2 ${
                    selectedStatus.id === s.id ? "text-emerald-100" : "text-slate-500"
                  }`}>
                    {s.shortDescription}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 bg-slate-50 border border-slate-100 rounded-2xl">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-sm">No status codes found</p>
              <p className="text-xs mt-0.5">Try searching with a different term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Column */}
      <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Status Title & Header */}
        <div className="border-b border-slate-100 pb-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              {getStatusIcon(selectedStatus.id)}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {selectedStatus.statusName}
            </h1>
          </div>
          <p className="text-slate-700 font-medium text-sm leading-relaxed">
            {selectedStatus.shortDescription}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs font-mono tracking-wider text-slate-400 uppercase">Meaning</h3>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
            {selectedStatus.explanation}
          </p>
        </div>

        {/* Why it happens & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 rounded-xl p-5 border border-slate-100">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-800">Why It Happens:</h4>
            <ul className="space-y-2 text-xs md:text-sm text-slate-600">
              {selectedStatus.whyItHappens.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-800">How Long It Lasts:</h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {selectedStatus.howLongItLasts}
            </p>
          </div>
        </div>

        {/* What to do */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-800">What You Should Do:</h3>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-600">
            {selectedStatus.whatYouShouldDo.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-mono text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="flex-1 leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        {selectedStatus.faqs && selectedStatus.faqs.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-sm text-slate-800">Frequently Asked Questions</h3>
            <div className="space-y-2 divide-y divide-slate-100">
              {selectedStatus.faqs.map((faq, idx) => (
                <div key={idx} className="pt-2.5 first:pt-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
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
