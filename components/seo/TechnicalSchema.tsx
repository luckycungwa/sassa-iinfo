'use client';

import { useState } from "react";
import { GitBranch, Braces, ChevronRight } from "lucide-react";

const schemaMarkup = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is my SASSA status showing 'Pending'?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 'Pending' status means SASSA has received your application and is validating your identity via Home Affairs."
      }
    },
    {
      "@type": "Question",
      "name": "How long does SASSA status bank verification take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SASSA bank verification typically takes between 7 to 10 business days."
      }
    }
  ]
}`;

export default function TechnicalSchema() {
  const [isCopied, setIsCopied] = useState(false);

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(schemaMarkup);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-4 lg:col-span-2">
          <div>
            <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
              <GitBranch className="w-4.5 h-4.5 text-accent-dark" />
              Structured Data, Breadcrumbs & Canonical Strategy
            </h3>
            <p className="text-xs text-outline font-mono mt-0.5">Programmatic SEO rules ensuring search engines index without errors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-surface rounded-2xl space-y-2">
              <h4 className="text-xs font-extrabold text-ink flex items-center gap-1.5"><ChevronRight className="w-4 h-4 text-accent-dark" />Dynamic Breadcrumbs</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Every page implements hierarchical trail schema to help crawl budget:</p>
              <code className="block p-2 bg-white rounded-lg border border-surface-dim text-xs font-mono text-surface0">Home › Status › Pending-30-Days</code>
            </div>
            <div className="p-4 bg-surface rounded-2xl space-y-2">
              <h4 className="text-xs font-extrabold text-ink flex items-center gap-1.5"><ChevronRight className="w-4 h-4 text-accent-dark" />Self-Referential Canonicals</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">To prevent duplicate penalties on trailing slash variations:</p>
              <code className="block p-2 bg-white rounded-lg border border-surface-dim text-xs font-mono text-accent-dark">&lt;link rel=&quot;canonical&quot; href=&quot;https://srdgrantguide.co.za/status/pending&quot; /&gt;</code>
            </div>
            <div className="p-4 bg-surface rounded-2xl space-y-2">
              <h4 className="text-xs font-extrabold text-ink flex items-center gap-1.5"><ChevronRight className="w-4 h-4 text-accent-dark" />Pagination Strategy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Static local offices are chunked into clean paginated pages of 10 records maximum.</p>
            </div>
            <div className="p-4 bg-surface rounded-2xl space-y-2">
              <h4 className="text-xs font-extrabold text-ink flex items-center gap-1.5"><ChevronRight className="w-4 h-4 text-accent-dark" />Discover Optimization</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">High-resolution feature images with absolute aspect ratios to trigger Google Discover feed carousels.</p>
            </div>
          </div>
        </div>
        <div className="bg-ink text-white rounded-3xl p-6 border border-ink space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-outline-variant flex items-center gap-1.5">
              <Braces className="w-4 h-4 text-gold" />Target JSON-LD Schema
            </h4>
            <button onClick={copySchemaToClipboard} className="text-xs px-2 py-1 bg-ink hover:bg-ink rounded-lg text-gold transition font-mono font-bold">
              {isCopied ? "Copied!" : "Copy Schema"}
            </button>
          </div>
          <p className="text-xs text-outline">This Schema.org payload is automatically injected in the page header.</p>
          <pre className="bg-ink p-3 rounded-xl border border-ink text-xs font-mono text-gold overflow-x-auto max-h-64 scrollbar-thin">{schemaMarkup}</pre>
        </div>
      </div>
    </div>
  );
}
