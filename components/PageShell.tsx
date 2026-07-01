'use client';

import React from "react";
import { BasePage } from "../lib/schema/contentSchema";
import { ShieldCheck, Calendar, RefreshCw, UserCheck, ArrowRight, BookOpen } from "lucide-react";
import { DESIGN_TOKENS } from "../lib/schema/designSystem";

interface PageShellProps {
  page: BasePage;
  children: React.ReactNode;
  onNavigateToRelated?: (slug: string) => void;
}

export default function PageShell({ page, children, onNavigateToRelated }: PageShellProps) {
  const { title, description, lastUpdated, version, author, relatedPages, classification } = page;

  return (
    <article 
      className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8 bg-[#f8fafc]"
      id={`page-shell-${page.id}`}
    >
      {/* 1. Breadcrumbs & Topic Path (SEO Context) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="hover:text-accent-dark transition">SASSA Platform</span>
          <span className="text-slate-300">/</span>
          <span className="capitalize hover:text-accent-dark transition">
            {classification.replace("-", " ")}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-bold truncate max-w-[200px]" aria-current="page">
            {page.id}
          </span>
        </nav>


      {/* 2. Primary H1 Editorial Header */}
      <header className="space-y-4 border-b border-slate-200/60 pb-6">
        <div className="space-y-2">
          <h1 
            className="font-black text-slate-900 tracking-tight leading-tight text-2xl md:text-3xl lg:text-4xl"
            style={{ fontFamily: DESIGN_TOKENS.typography.families.primary }}
          >
            {title}
          </h1>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl">
            {description}
          </p>
        </div>

        {/* 3. EEAT verified Author Profile & Timestamp Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-100 shadow-none">
            {author.verified ? (
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-black text-xs">
                {author.name.charAt(0)}
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-xs">
                {author.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-slate-900 leading-none">{author.name}</span>
                {author.verified && (
                  <span title="Verified Author Credentials">
                    <UserCheck className="w-3.5 h-3.5 text-accent-dark" />
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-mono leading-none mt-1">
                {author.role} {author.credentials ? `• ${author.credentials}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px] bg-slate-100/50 px-3 py-1.5 rounded-lg border border-slate-150">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Last Updated: <strong className="text-slate-800">{lastUpdated}</strong></span>
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Version: <strong className="text-slate-800">v{version}</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Content Block Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Article Body Column */}
        <section className="lg:col-span-8 space-y-6" id="article-body-column">
          {children}
        </section>

        {/* Dynamic Static-First Related Pages Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-6" id="article-sidebar-column">
          {relatedPages && relatedPages.length > 0 ? (
            <div className="bg-white border border-slate-200/70 p-5 rounded-3xl space-y-4 shadow-none">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-accent-dark" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
                  Related Social Resources
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-normal font-sans">
                Explore verified supplementary guides and official procedures related to this grant.
              </p>
              <div className="space-y-2.5">
                {relatedPages.map((page) => {
                  const slug = page.slug;
                  const label = page.title;
                  return (
                    <button
                      key={slug}
                      onClick={() => onNavigateToRelated && onNavigateToRelated(slug)}
                      className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100/50 transition duration-200 group flex items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-accent font-bold uppercase block">
                          Official Guide
                        </span>
                        <span className="text-xs font-extrabold text-slate-700 group-hover:text-slate-900 transition capitalize">
                          {label}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent-dark group-hover:translate-x-0.5 transition flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-slate-100/40 border border-dashed border-slate-200 p-5 rounded-3xl space-y-3 shadow-none text-center">
              <ShieldCheck className="w-6 h-6 text-accent-dark mx-auto" />
              <div>
                <h3 className="text-xs font-bold text-slate-700">Official Resource Platform</h3>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                  All administrative rules on this site conform to ITSAA regulations and national security protocols.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
