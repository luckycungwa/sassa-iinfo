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
        return <CheckCircle2 className="w-5 h-5 text-accent" />;
      case "pending":
      case "pending-30-days":
      case "bank-verification":
      case "identity-verification":
        return <Clock className="w-5 h-5 text-accent-dark" />;
      case "cancelled":
      case "alternative-income-source":
      case "means-test-failed":
      case "self-exclusion":
        return <XCircle className="w-5 h-5 text-trading-down" />;
      case "referred":
        return <AlertCircle className="w-5 h-5 text-accent-dark animate-pulse" />;
      default:
        return <Info className="w-5 h-5 text-muted" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* List / Search Column */}
      <div className="lg:col-span-5 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-muted" />
          <input
            type="text"
            placeholder="Search status codes (e.g. Approved, UIF)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-surface-container rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-accent-dark transition text-sm"
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
                    ? "bg-accent border-ink text-black font-semibold"
                    : "bg-surface border-border hover:border-surface-container text-ink hover:bg-canvas"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {selectedStatus.id === s.id ? (
                    <div className="p-1 bg-surface/20 rounded">
                      {getStatusIcon(s.id)}
                    </div>
                  ) : (
                    getStatusIcon(s.id)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-tight truncate">{s.statusName}</h3>
                  <p className={`text-xs mt-0.5 leading-snug line-clamp-2 ${
                    selectedStatus.id === s.id ? "text-black/70" : "text-muted"
                  }`}>
                    {s.shortDescription}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-muted bg-canvas border border-border rounded-xl">
              <AlertCircle className="w-8 h-8 text-outline-variant mx-auto mb-2" />
              <p className="font-bold text-sm">No status codes found</p>
              <p className="text-xs mt-0.5">Try searching with a different term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Column */}
      <div className="lg:col-span-7 bg-surface border border-border rounded-xl p-6 md:p-8 space-y-6">
        {/* Status Title & Header */}
        <div className="border-b border-border pb-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-light rounded-xl">
              {getStatusIcon(selectedStatus.id)}
            </div>
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">
              {selectedStatus.statusName}
            </h1>
          </div>
          <p className="text-ink font-medium text-sm leading-relaxed">
            {selectedStatus.shortDescription}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs font-mono tracking-wider text-muted uppercase">Meaning</h3>
          <p className="text-muted text-sm leading-relaxed whitespace-pre-wrap">
            {selectedStatus.explanation}
          </p>
        </div>

        {/* Why it happens & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-canvas rounded-xl p-5 border border-border">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ink">Why It Happens:</h4>
            <ul className="space-y-2 text-xs md:text-sm text-muted">
              {selectedStatus.whyItHappens.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-ink">How Long It Lasts:</h4>
            <p className="text-xs md:text-sm text-muted leading-relaxed">
              {selectedStatus.howLongItLasts}
            </p>
          </div>
        </div>

        {/* What to do */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-ink">What You Should Do:</h3>
          <ul className="space-y-2.5 text-xs md:text-sm text-muted">
            {selectedStatus.whatYouShouldDo.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="bg-accent-light text-accent-dark border border-accent-light/40 font-mono text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="flex-1 leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        {selectedStatus.faqs && selectedStatus.faqs.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-bold text-sm text-ink">Frequently Asked Questions</h3>
            <div className="space-y-2 divide-y divide-surface-dim">
              {selectedStatus.faqs.map((faq, idx) => (
                <div key={idx} className="pt-2.5 first:pt-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-left font-semibold text-sm text-ink hover:text-accent-dark flex justify-between items-center py-1.5"
                  >
                    <span>{faq.question}</span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === idx && (
                    <div className="text-xs md:text-sm text-muted mt-1 pl-1 leading-relaxed">
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
