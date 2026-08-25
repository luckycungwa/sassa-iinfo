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
import GrantCalculator from "./tools/GrantCalculator";

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
            if (hLevel === 3) {
              return (
                <h3
                  key={block.id}
                  id={block.id}
                  style={fontStyle}
                  className="text-sm font-bold text-ink tracking-tight mt-4 mb-2 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-3 bg-accent-dark rounded-xs inline-block"></span>
                  {block.text}
                </h3>
              );
            } else if (hLevel === 4) {
              return (
                <h4
                  key={block.id}
                  id={block.id}
                  style={fontStyle}
                  className="text-xs font-bold text-muted tracking-tight mt-3 mb-1.5 uppercase font-mono"
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
                  className="text-base font-black text-ink tracking-tight mt-5 mb-3.5 border-l-2 border-accent-dark pl-3"
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
                className="text-sm text-body leading-relaxed font-sans"
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
                className="list-decimal pl-5 space-y-2 text-sm text-body leading-relaxed"
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
                className="space-y-2 text-sm text-body leading-relaxed"
              >
                {block.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-dark rounded-full mt-1.5 flex-shrink-0"></span>
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
                className="border border-surface-container rounded-xl overflow-hidden bg-surface shadow-none my-4"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-surface-dim border-b border-surface-container font-mono text-xs text-muted">
                      <tr>
                        {block.headers.map((header, idx) => (
                          <th key={idx} className="p-3 font-bold uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {block.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-surface/50 transition">
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className="p-3 text-ink font-sans font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <div className="bg-surface border-t border-border p-2.5 text-center text-xs text-muted font-mono">
                    {block.caption}
                  </div>
                )}
              </div>
            );
          }

          case "callout": {
            let calloutStyle = "bg-surface border-surface-container text-ink";
            let Icon = Info;
            let iconColor = "text-muted";

            if (block.intent === "warning") {
              calloutStyle = "bg-trading-down/10 border-trading-down/30 text-ink";
              Icon = AlertTriangle;
              iconColor = "text-trading-down";
            } else if (block.intent === "success") {
              calloutStyle = "bg-gold/10 border-gold/30 text-ink";
              Icon = CheckCircle2;
              iconColor = "text-accent-dark";
            } else if (block.intent === "danger") {
              calloutStyle = "bg-trading-down/10 border-trading-down/30 text-ink";
              Icon = XOctagon;
              iconColor = "text-trading-down";
            }

            return (
              <div
                key={block.id}
                id={block.id}
                className={`p-4 border rounded-xl flex items-start gap-3 my-3 shadow-none ${calloutStyle}`}
              >
                <div className={`p-1.5 rounded-lg bg-surface border border-border flex-shrink-0 ${iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  {block.title && (
                    <h4 className="text-xs font-black tracking-tight uppercase font-mono">
                      {block.title}
                    </h4>
                  )}
                  <p className="text-sm text-body leading-relaxed font-sans">
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
                    className="flex items-start gap-4 p-4 border border-border bg-surface rounded-xl shadow-none"
                  >
                    <div className="w-7 h-7 rounded-full bg-gold text-accent-foreground font-mono font-black text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-ink">
                        {step.title}
                      </h4>
                      <p className="text-sm text-body leading-relaxed">
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
                      className="border border-border rounded-xl bg-surface overflow-hidden shadow-none transition"
                    >
                      <button
                        onClick={() => toggleFaq(uniqueFaqId)}
                        className="w-full text-left p-3.5 flex items-center justify-between gap-3 bg-surface hover:bg-surface-dim transition"
                      >
                        <span className="text-xs font-extrabold text-ink leading-tight">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-muted flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 border-t border-border bg-surface">
                          <p className="text-sm text-body leading-relaxed font-sans">
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
                className="bg-surface border border-border p-5 rounded-xl space-y-4 my-4 shadow-none"
              >
                <div className="flex items-center gap-2 pb-2.5 border-b border-border">
                  <CalendarDays className="w-4.5 h-4.5 text-accent-dark" />
                  <div>
                    <h4 className="text-xs font-black text-ink leading-none">
                      National SASSA Payout Schedules
                    </h4>
                    <span className="text-xs font-mono text-muted uppercase tracking-wider block mt-0.5">
                      Cycle Month: {block.month}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {block.payouts.map((pay, idx) => (
                    <div
                      key={idx}
                      className="p-3 border border-border bg-surface-dim/30 rounded-xl flex flex-col justify-between gap-2.5"
                    >
                      <div>
                        <span className="text-xs font-mono font-bold text-muted uppercase block leading-none">
                          Category
                        </span>
                        <span className="text-xs font-extrabold text-ink tracking-tight block mt-1 leading-tight">
                          {pay.category}
                        </span>
                      </div>
                      <div className="border-t border-border pt-2 flex items-center justify-between text-xs">
                        <div className="text-left">
                          <span className="text-xs font-mono text-muted block leading-none">Date</span>
                          <span className="font-mono font-bold text-ink mt-0.5 block">{pay.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-muted block leading-none">Est Payout</span>
                          <span className="font-mono font-black text-accent-dark mt-0.5 block">{pay.amount}</span>
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
                className="bg-surface border border-border p-5 rounded-xl space-y-4 my-4 shadow-none grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-accent-dark uppercase tracking-widest block">
                      Local SASSA Branch
                    </span>
                    <h4 className="text-xs font-black text-ink mt-0.5">{block.branchName}</h4>
                    <span className="text-xs text-muted font-mono mt-0.5 block">{block.province} Province</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                      <span className="text-muted leading-normal">{block.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted flex-shrink-0" />
                      <span className="text-muted font-mono">{block.contactNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted flex-shrink-0" />
                      <span className="text-muted font-mono">{block.operatingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-dim/30 border border-border p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-ink">
                      <Accessibility className="w-4 h-4 text-accent-dark" />
                      <span className="text-xs font-bold font-mono uppercase tracking-wide">
                        Accessibility Vetting
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-2 leading-relaxed">
                      {block.accessibilityNotes}
                    </p>
                  </div>

                  {block.coordinates && (
                    <div className="pt-2 border-t border-border mt-2 flex items-center justify-between text-xs font-mono text-muted">
                      <span>Coordinates:</span>
                      <span className="text-muted">
                        {block.coordinates.lat.toFixed(4)}, {block.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          case "custom": {
            if (block.customType === "grant-calculator") {
              return (
                <div key={block.id} id={block.id} className="my-6">
                  <GrantCalculator />
                </div>
              );
            }
            return (
              <div
                key={block.id}
                id={block.id}
                className="bg-gold/5 border border-dashed border-gold/30 p-4 rounded-xl my-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-accent-dark">
                  <Sparkles className="w-4.5 h-4.5" />
                  <span className="text-xs font-bold font-mono uppercase">
                    Extension: {block.customType}
                  </span>
                </div>
                <p className="text-xs text-muted mt-1 leading-normal font-sans">
                  Interactive tool ready for this slot.
                </p>
                <div className="mt-2 text-left bg-midnight p-2.5 rounded-lg text-xs font-mono text-muted overflow-x-auto max-h-24">
                  {JSON.stringify(block.payload, null, 2)}
                </div>
              </div>
            );
          }

          default: {
            return (
              <div key={(block as any).id} className="p-3 bg-red-900/20 text-red-400 text-xs border border-red-700/40 rounded-lg">
                Unknown content block type.
              </div>
            );
          }
        }
      })}
    </div>
  );
}
