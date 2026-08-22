"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ChevronRight } from "lucide-react";
import { search, type SearchResult } from "../lib/search";

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(query.length < 2 ? [] : search(query));
    }, query.length < 2 ? 0 : 150);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-canvas text-muted hover:bg-surface-container border border-surface-container transition"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search</span>
        <kbd className="text-xs font-mono bg-surface border border-surface-container px-1.5 py-0.5 rounded ml-2">Ctrl+K</kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" role="dialog" aria-modal="true" aria-label="Search grants, statuses, offices">
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-xs" onClick={() => setIsOpen(false)} />
          <div className="relative bg-surface border border-surface-container rounded-xl w-full max-w-lg mx-4 overflow-hidden" ref={dialogRef}>
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="w-4 h-4 text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search grants, statuses, offices..."
                className="flex-1 py-3 text-sm text-ink placeholder:text-muted bg-transparent outline-none"
              />
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-canvas rounded-lg transition">
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>
            {results.length > 0 && (
              <div className="max-h-80 overflow-y-auto p-2 space-y-0.5">
                {results.map((r, i) => (
                  <Link
                    key={`${r.url}-${i}`}
                    href={r.url}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-canvas transition group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-muted uppercase tracking-wider">{r.category}</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant" />
                      </div>
                      <p className="text-sm font-bold text-ink group-hover:text-accent-dark transition truncate">{r.title}</p>
                      <p className="text-xs text-muted truncate">{r.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-accent-dark transition flex-shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            )}
            {query.length >= 2 && results.length === 0 && (
              <div className="p-6 text-center text-sm text-muted">No results found for &ldquo;{query}&rdquo;</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
