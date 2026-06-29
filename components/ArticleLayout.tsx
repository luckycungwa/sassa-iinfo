'use client';

import React, { useState } from "react";
import { ContentBlock } from "../lib/schema/contentSchema";
import { DESIGN_TOKENS } from "../lib/schema/designSystem";
import { 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  XOctagon, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  MapPin, 
  Clock, 
  Accessibility,
  ArrowRight,
  Sparkles,
  CalendarDays
} from "lucide-react";

interface ArticleLayoutProps {
  blocks: ContentBlock[];
}

export default function ArticleLayout({ blocks }: ArticleLayoutProps) {
  // Local state to manage toggle collapse of individual FAQ blocks
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<string, boolean>>({});

  const toggleFaq = (faqId: string) => {
    setOpenFaqIndices((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  return (
    <div className="space-y-6" id="article-layout-blocks">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const hLevel = block.level;
            const fontStyle = {
              fontFamily: DESIGN_TOKENS.typography.families.primary,
            };
            if (hLevel === 1) {
              return (
                <h1
                  key={block.id}
                  id={block.id}
                  style={fontStyle}
                  className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-6 mb-3 border-b border-slate-100 pb-2"
                >
                  {block.text}
                </h1>
              );
            } else if (hLevel === 3) {
              return (
                <h3
                  key={block.id}
                  id={block.id}
                  style={fontStyle}
                  className="text-sm font-bold text-slate-800 tracking-tight mt-4 mb-2 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-3 bg-emerald-800 rounded-xs inline-block"></span>
                  {block.text}
                </h3>
              );
            } else if (hLevel === 4) {
              return (
                <h4
                  key={block.id}
                  id={block.id}
                  style={fontStyle}
                  className="text-xs font-bold text-slate-600 tracking-tight mt-3 mb-1.5 uppercase font-mono"
                >
                  {block.text}
                </h4>
              );
            } else {
              // Level 2 (Default H2)
              return (
                <h2
                  key={block.id}
                  id={block.id}
                  style={fontStyle}
                  className="text-base font-black text-slate-900 tracking-tight mt-5 mb-3.5 border-l-2 border-emerald-800 pl-3"
                >
                  {block.text}
                </h2>
              );
            }
          }

          case "paragraph": {
            return (
              <p
                key={block.id}
                id={block.id}
                className="text-xs text-slate-600 leading-relaxed font-sans"
              >
                {block.text}
              </p>
            );
          }

          case "list": {
            return block.ordered ? (
              <ol
                key={block.id}
                id={block.id}
                className="list-decimal pl-5 space-y-2 text-xs text-slate-600 leading-normal"
              >
                {block.items.map((item, idx) => (
                  <li key={idx} className="pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <ul
                key={block.id}
                id={block.id}
                className="space-y-2 text-xs text-slate-600 leading-normal"
              >
                {block.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-800 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }

          case "table": {
            return (
              <div
                key={block.id}
                id={block.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-none my-4"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        {block.headers.map((header, idx) => (
                          <th key={idx} className="p-3 font-bold uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {block.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-slate-50/50 transition">
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className="p-3 text-slate-700 font-sans font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <div className="bg-slate-50/70 border-t border-slate-100 p-2.5 text-center text-[10px] text-slate-400 font-mono">
                    {block.caption}
                  </div>
                )}
              </div>
            );
          }

          case "callout": {
            let calloutStyle = "bg-slate-50 border-slate-200 text-slate-900";
            let Icon = Info;
            let iconColor = "text-slate-600";

            if (block.intent === "warning") {
              calloutStyle = "bg-amber-50/50 border-amber-200 text-amber-950";
              Icon = AlertTriangle;
              iconColor = "text-amber-800";
            } else if (block.intent === "success") {
              calloutStyle = "bg-emerald-50/50 border-emerald-200 text-emerald-950";
              Icon = CheckCircle2;
              iconColor = "text-emerald-800";
            } else if (block.intent === "danger") {
              calloutStyle = "bg-red-50/50 border-red-200 text-red-950";
              Icon = XOctagon;
              iconColor = "text-red-800";
            }

            return (
              <div
                key={block.id}
                id={block.id}
                className={`p-4 border rounded-xl flex items-start gap-3 my-3 shadow-none ${calloutStyle}`}
              >
                <div className={`p-1.5 rounded-lg bg-white border border-transparent flex-shrink-0 ${iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  {block.title && (
                    <h4 className="text-xs font-black tracking-tight uppercase font-mono">
                      {block.title}
                    </h4>
                  )}
                  <p className="text-xs leading-normal font-sans">
                    {block.text}
                  </p>
                </div>
              </div>
            );
          }

          case "steps": {
            return (
              <div key={block.id} id={block.id} className="space-y-4 my-4">
                {block.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 border border-slate-100 bg-white rounded-xl shadow-none"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-mono font-black text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-900">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          case "faq": {
            return (
              <div key={block.id} id={block.id} className="space-y-2.5 my-4">
                {block.faqs.map((faq, idx) => {
                  const uniqueFaqId = `${block.id}-${idx}`;
                  const isOpen = !!openFaqIndices[uniqueFaqId];
                  return (
                    <div
                      key={idx}
                      className="border border-slate-150 rounded-xl bg-white overflow-hidden shadow-none transition"
                    >
                      <button
                        onClick={() => toggleFaq(uniqueFaqId)}
                        className="w-full text-left p-3.5 flex items-center justify-between gap-3 bg-slate-50/40 hover:bg-slate-50 transition"
                      >
                        <span className="text-xs font-extrabold text-slate-800 leading-tight">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 border-t border-slate-100 bg-white">
                          <p className="text-xs text-slate-600 leading-relaxed font-sans">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }

          case "payment-dates": {
            return (
              <div
                key={block.id}
                id={block.id}
                className="bg-white border border-slate-150 p-5 rounded-2xl space-y-4 my-4 shadow-none"
              >
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                  <CalendarDays className="w-4.5 h-4.5 text-emerald-800" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 leading-none">
                      National SASSA Payout Schedules
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5">
                      Cycle Month: {block.month}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {block.payouts.map((pay, idx) => (
                    <div
                      key={idx}
                      className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex flex-col justify-between gap-2.5"
                    >
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block leading-none">
                          Category
                        </span>
                        <span className="text-[11px] font-extrabold text-slate-800 tracking-tight block mt-1 leading-tight">
                          {pay.category}
                        </span>
                      </div>
                      <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-xs">
                        <div className="text-left">
                          <span className="text-[8px] font-mono text-slate-400 block leading-none">Date</span>
                          <span className="font-mono font-bold text-emerald-950 mt-0.5 block">{pay.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-mono text-slate-400 block leading-none">Est Payout</span>
                          <span className="font-mono font-black text-emerald-800 mt-0.5 block">{pay.amount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          case "office-details": {
            return (
              <div
                key={block.id}
                id={block.id}
                className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 my-4 shadow-none grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-widest block">
                      Local SASSA Branch
                    </span>
                    <h4 className="text-xs font-black text-slate-900 mt-0.5">{block.branchName}</h4>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{block.province} Province</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 leading-normal">{block.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-600 font-mono">{block.contactNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-600 font-mono">{block.operatingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Accessibility className="w-4 h-4 text-emerald-800" />
                      <span className="text-[10px] font-bold font-mono uppercase tracking-wide">
                        Accessibility Vetting
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {block.accessibilityNotes}
                    </p>
                  </div>

                  {block.coordinates && (
                    <div className="pt-2 border-t border-slate-200/55 mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Coordinates:</span>
                      <span className="text-slate-600">
                        {block.coordinates.lat.toFixed(4)}, {block.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          case "custom": {
            return (
              <div
                key={block.id}
                id={block.id}
                className="bg-emerald-50/20 border border-dashed border-emerald-200 p-4 rounded-xl my-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-emerald-800">
                  <Sparkles className="w-4.5 h-4.5" />
                  <span className="text-xs font-bold font-mono uppercase">
                    Extension: {block.customType}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal font-sans">
                  The base UI engine successfully validated this custom slot. Pre-statically compiled dynamic renderers will hook in here for client-specific components.
                </p>
                <div className="mt-2 text-left bg-slate-950 p-2.5 rounded-lg text-[10px] font-mono text-slate-400 overflow-x-auto max-h-24">
                  {JSON.stringify(block.payload, null, 2)}
                </div>
              </div>
            );
          }

          default: {
            return (
              <div key={(block as any).id} className="p-3 bg-red-50 text-red-800 text-xs border border-red-200 rounded-lg">
                Unknown content block type detected. Fails strict design constitution compilation checks.
              </div>
            );
          }
        }
      })}
    </div>
  );
}
