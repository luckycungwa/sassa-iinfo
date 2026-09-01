'use client';

import { useState } from "react";
import { Layers, Eye } from "lucide-react";

interface KeywordItem {
  keyword: string;
  volume: string;
  difficulty: number;
  intent: "Informational" | "Navigational" | "Transactional" | "Commercial";
  pillar: string;
  supportingPage: string;
  anchorText: string;
}

const seoPillars = [
  { id: "payment", title: "1. Payment Centre (Hero Pillar)", slug: "/payment-centre", description: "Direct transactional & calendar intent. Captures 'sassa payment dates' volume.", supportingCount: 12, strategy: "Dynamic JS calendar rendering for 2026/2027 payouts." },
  { id: "status", title: "2. Status Meaning Centre", slug: "/status-meanings", description: "High-volume informational queries on outcome codes and application states.", supportingCount: 24, strategy: "Individual search-optimized templates for each unique status state." },
  { id: "appeals", title: "3. Appeals & Remediation Hub", slug: "/appeals-centre", description: "High commercial-investigative and legal-remedy search queries.", supportingCount: 15, strategy: "Step-by-step guides for ITSAA online submissions." },
  { id: "grants", title: "4. Grant Library & Eligibility", slug: "/grants", description: "Evergreen regulatory content answering qualifying criteria.", supportingCount: 18, strategy: "Structured decision-tree checklist templates." },
  { id: "offices", title: "5. Office Finder & Regional Hubs", slug: "/offices", description: "Ultra-high local intent. Captures 'sassa office near me' queries.", supportingCount: 54, strategy: "No-API static local pages optimized for indexability." }
];

const keywordDatabase: KeywordItem[] = [
  { keyword: "sassa payment dates july 2026", volume: "350,000", difficulty: 12, intent: "Informational", pillar: "Payment Centre", supportingPage: "SASSA Payout Calendar (July 2026)", anchorText: "July 2026 SASSA payout schedule" },
  { keyword: "sassa status check pending for 30 days", volume: "95,000", difficulty: 18, intent: "Informational", pillar: "Status Meaning Centre", supportingPage: "Pending Status Code Guide - 30 Days Remedy", anchorText: "SASSA application pending for over 30 days" },
  { keyword: "sassa status check bank verification pending", volume: "120,000", difficulty: 15, intent: "Informational", pillar: "Status Meaning Centre", supportingPage: "Bank Verification Process & Timeframe Guide", anchorText: "bank verification pending status solutions" },
  { keyword: "how to appeal sassa status decline online", volume: "45,000", difficulty: 24, intent: "Transactional", pillar: "Appeals & Remediation Hub", supportingPage: "ITSAA Online Appeal Step-by-Step Submission", anchorText: "appeal a declined SASSA application online" },
  { keyword: "sassa appeals timeline calculator", volume: "18,000", difficulty: 8, intent: "Transactional", pillar: "Appeals & Remediation Hub", supportingPage: "90-Day Appeal Expiry Deadline Tool", anchorText: "SASSA appeal deadline countdown" },
  { keyword: "child support grant age limit extension", volume: "62,000", difficulty: 22, intent: "Informational", pillar: "Grant Library & Eligibility", supportingPage: "Child Support Grant Eligibility & Expiry Limits", anchorText: "child support grant age limits" },
  { keyword: "disability grant means test calculator", volume: "28,000", difficulty: 14, intent: "Commercial", pillar: "Grant Library & Eligibility", supportingPage: "SASSA Means Test Threshold Calculator", anchorText: "calculate personal assets for SASSA means test" },
  { keyword: "sassa office soweto address operating hours", volume: "15,000", difficulty: 4, intent: "Navigational", pillar: "Office Finder & Regional Hubs", supportingPage: "Soweto SASSA Office branch coordinates", anchorText: "SASSA branch offices in Soweto" },
  { keyword: "sassa appeal uif source of income decline", volume: "35,000", difficulty: 19, intent: "Informational", pillar: "Appeals & Remediation Hub", supportingPage: "Appealing Decline Due to Alternative UIF Income", anchorText: "UIF decline appeal guidelines" },
  { keyword: "sassa bank details change consent form", volume: "80,000", difficulty: 16, intent: "Transactional", pillar: "Payment Centre", supportingPage: "SASSA Bank Transfer Consent Form Download Page", anchorText: "SASSA bank change request template" },
  { keyword: "sassa srd r370 payment schedule", volume: "410,000", difficulty: 28, intent: "Navigational", pillar: "Payment Centre", supportingPage: "SRD R370 Payout Dates & Status Checking", anchorText: "SRD R370 payment dates list" },
  { keyword: "unemployed students sassa eligibility", volume: "24,000", difficulty: 15, intent: "Informational", pillar: "Grant Library & Eligibility", supportingPage: "SASSA Eligibility Guide for Unemployed Youth & Students", anchorText: "student and youth qualification criteria" }
];

export default function TopicalMap() {
  const [selectedCluster, setSelectedCluster] = useState<string>("All");
  const [serpQuery, setSerpQuery] = useState<string>("sassa status pending 30 days");

  const filteredKeywords = selectedCluster === "All"
    ? keywordDatabase
    : keywordDatabase.filter((k) => k.pillar.includes(selectedCluster.split(" ")[0]));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {seoPillars.map((p) => (
          <div key={p.id} onClick={() => setSelectedCluster(p.id === "payment" ? "Payment Centre" : p.id === "status" ? "Status Meaning" : p.id === "appeals" ? "Appeals" : p.id === "grants" ? "Grant Library" : "Office Finder")}
            className={`p-4 rounded-2xl border cursor-pointer transition text-left group ${selectedCluster.includes(p.id === "payment" ? "Payment" : p.id === "status" ? "Status" : p.id === "appeals" ? "Appeals" : p.id === "grants" ? "Grant" : "Office") ? "bg-accent-light/20/55 border-accent-light shadow-xs" : "bg-white border-surface-dim hover:border-surface-container"}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-accent-dark font-bold bg-accent-light/20 px-2 py-0.5 rounded-full">Pillar Node</span>
              <span className="text-xs font-mono text-outline">{p.supportingCount} URLs</span>
            </div>
            <h4 className="text-xs font-black text-ink mt-2.5 group-hover:text-accent-dark transition leading-tight">{p.title}</h4>
            <p className="text-xs text-surface0 mt-1 font-mono leading-normal">{p.slug}</p>
            <p className="text-xs text-outline mt-2 line-clamp-2">{p.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-surface-dim rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-dim pb-4">
          <div>
            <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5"><Layers className="w-4.5 h-4.5 text-accent-dark" />Keyword Clusters & Search Intent Mapping</h3>
            <p className="text-xs text-outline font-mono mt-0.5">Target keyword data categorized by semantic hub and intent profile</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["All", "Payment Centre", "Status Meaning", "Appeals", "Grant Library", "Office Finder"].map((c) => (
              <button key={c} onClick={() => setSelectedCluster(c)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${selectedCluster === c ? "bg-ink text-white" : "bg-surface text-muted-foreground hover:bg-surface-dim"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-surface-dim text-outline font-mono text-xs uppercase">
                <th className="pb-3 font-semibold">Target Keyword</th>
                <th className="pb-3 font-semibold text-center">SA Vol (Est/mo)</th>
                <th className="pb-3 font-semibold text-center">KD %</th>
                <th className="pb-3 font-semibold text-center">Search Intent</th>
                <th className="pb-3 font-semibold">Target Support Page</th>
                <th className="pb-3 font-semibold">Required Anchor Text</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface font-sans">
              {filteredKeywords.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition">
                  <td className="py-3 pr-2 font-extrabold text-ink flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>{item.keyword}</td>
                  <td className="py-3 text-center font-mono text-muted-foreground">{item.volume}</td>
                  <td className="py-3 text-center"><span className={`px-1.5 py-0.5 rounded font-mono text-xs font-bold ${item.difficulty < 10 ? "bg-trading-up/10 text-trading-up" : item.difficulty < 20 ? "bg-amber/10 text-accent-dark" : "bg-trading-down/10 text-trading-down"}`}>{item.difficulty}%</span></td>
                  <td className="py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.intent === "Informational" ? "bg-info/10 text-info" : item.intent === "Transactional" ? "bg-accent-light/20 text-accent-dark" : item.intent === "Navigational" ? "bg-accent-turquoise/10 text-accent-turquoise" : "bg-muted/10 text-muted-foreground"}`}>{item.intent}</span></td>
                  <td className="py-3 text-muted-foreground">{item.supportingPage}</td>
                  <td className="py-3 font-mono text-xs text-outline">&ldquo;{item.anchorText}&rdquo;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-ink text-white rounded-3xl p-6 border border-ink space-y-4">
        <div>
          <span className="text-xs font-mono bg-amber text-black px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Live SERP Simulator</span>
          <h3 className="text-sm font-extrabold text-white mt-2 flex items-center gap-1.5"><Eye className="w-4.5 h-4.5 text-amber" />Featured Snippet & SERP Preview Simulator</h3>
          <p className="text-xs text-outline mt-1">Type a SASSA query to see how our micro-data and semantic architecture optimize rich answers inside Google Search Results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-xs font-mono text-outline uppercase tracking-wider">Select/Type SASSA Query</label>
            <div className="flex gap-2">
              <input type="text" value={serpQuery} onChange={(e) => setSerpQuery(e.target.value)} placeholder="e.g. sassa pending 30 days"
                className="flex-1 bg-ink border border-ink rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-accent-light/200 outline-hidden font-mono text-gold" />
              <button onClick={() => setSerpQuery("sassa pending 30 days")} className="px-3 py-2 bg-ink text-xs font-bold rounded-xl hover:bg-ink transition">Reset</button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["sassa status pending 30 days", "child support age limit sassa", "how to appeal sassa decline", "sassa payment calendar 2026"].map((sample) => (
                <button key={sample} onClick={() => setSerpQuery(sample)} className="text-xs px-2 py-1 bg-ink hover:bg-slate-850 rounded-lg text-outline-variant transition">{sample}</button>
              ))}
            </div>
          </div>
          <div className="bg-white text-ink p-5 rounded-2xl border border-surface-dim shadow-inner space-y-3 font-sans">
            <div className="flex items-center gap-2 text-xs text-surface0">
              <img src="/main-logo.svg" alt="" className="w-6 h-6" />
              <div><span className="text-xs font-semibold text-ink block leading-none">SRD Resource Platform</span><span className="text-xs text-outline font-mono">https://srdgrantguide.co.za › status › pending</span></div>
            </div>
            <h4 className="text-lg font-medium text-info hover:underline cursor-pointer leading-tight">
              {serpQuery.includes("pending") ? "SASSA Status Pending Code: Meanings, Causes & 30-Day Fixes" : serpQuery.includes("child") ? "SASSA Child Support Grant Expiry: Official Age Limit Rules" : serpQuery.includes("appeal") ? "SASSA Appeal Guide: How to Submit ITSAA Online Forms (2026)" : "Official SASSA Payment Dates Calendar 2026 | Approved Schedule"}
            </h4>
            {serpQuery.includes("pending") ? (
              <div className="bg-surface p-3 rounded-xl border border-surface-dim text-xs text-ink space-y-2">
                <p className="font-extrabold text-ink">Featured Snippet Answer:</p>
                <p className="italic leading-relaxed">&ldquo;A **SASSA status pending for over 30 days** usually occurs when verification checks with Home Affairs or alternative revenue sources (UIF/SARS) take longer than expected.&rdquo;</p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {serpQuery.includes("child") ? "The SASSA Child Support Grant ends exactly on the last day of the month your child turns 18 years old." : serpQuery.includes("appeal") ? "Unemployed or declined by SASSA? Submit your formal appeal directly to the Independent Tribunal (ITSAA) within 90 days." : "Find exact payment dates for July, August, and the rest of 2026."}
              </p>
            )}
            <div className="border-t border-surface-dim pt-2.5 mt-2 space-y-1.5 text-xs text-info">
              <p className="font-semibold text-outline text-xs uppercase tracking-wider">Rich Snippet FAQ Extensions:</p>
              <div className="flex items-center gap-1 cursor-pointer hover:underline"><span className="text-outline">Q:</span><span>How do I speed up my SASSA bank verification?</span></div>
              <div className="flex items-center gap-1 cursor-pointer hover:underline"><span className="text-outline">Q:</span><span>What if my SASSA appeal is declined?</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
