'use client';

import { useState } from "react";
import { provinces, ProvinceHub } from "../lib/data/provinces";
import { MapPin, Phone, Landmark, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function ProvinceHubs() {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceHub>(provinces[0]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Province Selectors */}
      <div className="lg:col-span-4 space-y-2">
        <h2 className="font-bold text-xs font-mono tracking-wider text-muted px-1 uppercase">
          Select Province Hub
        </h2>
        {provinces.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedProvince(p);
              setExpandedFaq(null);
            }}
            className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between ${
              selectedProvince.id === p.id
                ? "bg-accent border-emerald-950 text-white font-semibold"
                : "bg-surface border-border hover:border-accent/40 text-slate-700 hover:bg-canvas"
            }`}
          >
            <div>
              <p className="text-xs font-mono opacity-80 uppercase">Regional Hub</p>
              <h3 className="text-sm font-bold leading-tight">{p.name}</h3>
            </div>
            <Landmark className="w-5 h-5 flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Content Pane */}
      <div className="lg:col-span-8 bg-surface border border-border rounded-xl p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-5 space-y-2">
          <h1 className="text-xl md:text-2xl font-extrabold text-ink tracking-tight">
            SASSA {selectedProvince.name} regional Guide
          </h1>
          <p className="text-muted text-xs font-mono">Provincial Capital: {selectedProvince.capital}</p>
        </div>

        {/* Regional Office Info */}
        <div className="p-5 bg-canvas border border-border rounded-xl space-y-4">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-4.5 h-4.5 text-accent-dark" /> Provincial Head Office
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-600">
            <div className="space-y-1">
              <p className="font-bold text-muted uppercase font-mono text-[10px]">Physical Address</p>
              <p className="leading-relaxed font-semibold text-slate-700">{selectedProvince.regionalOfficeAddress}</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-muted uppercase font-mono text-[10px]">Phone Contact</p>
              <p className="leading-relaxed font-bold text-accent-dark text-sm">{selectedProvince.regionalOfficePhone}</p>
            </div>
          </div>
        </div>

        {/* Collection Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs font-mono text-muted tracking-wider uppercase">Local Collection Information</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {selectedProvince.collectionInfo}
          </p>
        </div>

        {/* Provincial FAQs */}
        {selectedProvince.faqs && selectedProvince.faqs.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-accent-dark" /> Provincial Frequently Asked Questions
            </h3>
            <div className="space-y-2 divide-y divide-slate-100">
              {selectedProvince.faqs.map((faq, idx) => (
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
