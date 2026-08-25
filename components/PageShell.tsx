'use client';

import { ShieldCheck, Calendar, UserCheck, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface PageShellProps {
  page: {
    id: string;
    title: string;
    description: string;
    lastUpdated: string;
    version: string;
    author: { name: string; role: string; credentials?: string; verified: boolean };
    relatedPages?: { title: string; slug?: string; href?: string }[];
    classification: string;
  };
  children: React.ReactNode;
}

export default function PageShell({ page, children }: PageShellProps) {
  const { title, description, lastUpdated, version, author, relatedPages, classification } = page;

  return (
    <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8 bg-canvas" id={"page-shell-" + page.id}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted font-mono">
        <Link href="/" className="hover:text-violet transition">Home</Link>
        <span className="text-border">/</span>
        <span className="capitalize text-muted">
          {classification.replace(/-/g, " ")}
        </span>
        <span className="text-border">/</span>
        <span className="text-ink font-bold truncate max-w-[200px]" aria-current="page">
          {title}
        </span>
      </nav>

      {/* Author & Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3 bg-surface border border-border rounded-lg p-3">
          <div className={"w-9 h-9 rounded-full flex items-center justify-center font-black text-sm " + (author.verified ? "bg-gold text-accent-foreground" : "bg-surface-dim text-muted")}>
            {author.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-ink">{author.name}</span>
              {author.verified && <UserCheck className="w-3.5 h-3.5 text-accent-dark" />}
            </div>
            <p className="text-xs text-muted font-mono">
              {author.role}{author.credentials ? " \u2022 " + author.credentials : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted font-mono bg-surface-dim/30 px-3 py-2 rounded-lg border border-border">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Last updated: <strong className="text-ink">{lastUpdated}</strong>
          </span>
          <span className="text-border">|</span>
          <span>
            v{version}
          </span>
        </div>
      </div>

      {/* Content + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-8 space-y-6" id="article-body-column">
          {children}
        </section>

        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {relatedPages && relatedPages.length > 0 ? (
            <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <BookOpen className="w-4 h-4 text-accent-dark" />
                <h3 className="text-xs font-bold text-ink uppercase tracking-wider font-mono">
                  Related Resources
                </h3>
              </div>
              <div className="space-y-2">
                {relatedPages.map((rp) => {
                  const url = rp.slug || rp.href || "#";
                  return (
                  <Link
                    key={url}
                    href={url}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-gold/30 bg-surface-dim/20 hover:bg-surface-dim transition group"
                  >
                    <span className="text-xs font-bold text-ink group-hover:text-violet transition">{rp.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-violet transition flex-shrink-0 ml-2" />
                  </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-surface-dim/20 border border-dashed border-border rounded-xl p-5 space-y-3 text-center">
              <ShieldCheck className="w-6 h-6 text-accent-dark mx-auto" />
              <h3 className="text-xs font-bold text-ink">Official Resource Platform</h3>
              <p className="text-xs text-muted leading-normal">
                Independent educational resource for South African social grant information.
              </p>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
