'use client';

import { useState } from "react";
import { Sparkles, Map, Network, GitBranch, BookOpen, LayoutGrid, Award, Calendar } from "lucide-react";
import TopicalMap from "./seo/TopicalMap";
import LinkingGraph from "./seo/LinkingGraph";
import TechnicalSchema from "./seo/TechnicalSchema";
import ContentEngine from "./seo/ContentEngine";
import DesignSystem from "./seo/DesignSystem";
import PolicyRoadmap from "./seo/PolicyRoadmap";

export default function SEODominator() {
  const [activeSubTab, setActiveSubTab] = useState<"map" | "linking" | "technical" | "engine" | "design" | "policy" | "roadmap">("map");

  return (
    <div className="space-y-6" id="seo-dominator-root">
      <div className="bg-gradient-to-br from-ink via-slate-850 to-ink text-white rounded-3xl p-6 md:p-8 shadow-md border border-ink relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-light/200/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light/200/15 border border-accent-light/200/30 text-gold text-xs font-bold font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            Topical Authority Engine
          </div>
          <div className="max-w-2xl">
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-white leading-tight">
              SASSA Search Engine <span className="text-gold">Dominance Blueprint</span>
            </h2>
            <p className="text-xs md:text-sm text-outline-variant mt-2 leading-relaxed font-sans">
              A comprehensive, multi-layered semantic content roadmap designed to position this platform as South Africa&apos;s most authoritative, trusted public resource.
            </p>
          </div>
          <div className="flex flex-wrap gap-1 bg-ink/40 p-1.5 rounded-2xl border border-ink/65 max-w-4xl">
            {[
              { id: "map", label: "Topical Map & Keywords", icon: Map },
              { id: "linking", label: "Internal Linking Graph", icon: Network },
              { id: "technical", label: "Technical & Schema", icon: GitBranch },
              { id: "engine", label: "Zero-CMS Content Engine", icon: BookOpen },
              { id: "design", label: "Enterprise Component System", icon: LayoutGrid },
              { id: "policy", label: "E-E-A-T & Ad Policy", icon: Award },
              { id: "roadmap", label: "Rollout Roadmap", icon: Calendar }
            ].map((subTab) => {
              const Icon = subTab.icon;
              return (
                <button key={subTab.id} onClick={() => setActiveSubTab(subTab.id as any)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeSubTab === subTab.id ? "bg-accent-dark text-white shadow-xs" : "text-outline hover:text-white hover:bg-ink/50"}`}>
                  <Icon className="w-3.5 h-3.5" /><span>{subTab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activeSubTab === "map" && <TopicalMap />}
        {activeSubTab === "linking" && <LinkingGraph />}
        {activeSubTab === "technical" && <TechnicalSchema />}
        {activeSubTab === "engine" && <ContentEngine />}
        {activeSubTab === "design" && <DesignSystem />}
        {(activeSubTab === "policy" || activeSubTab === "roadmap") && <PolicyRoadmap />}
      </div>
    </div>
  );
}
