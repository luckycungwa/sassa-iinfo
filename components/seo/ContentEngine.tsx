'use client';

import { useState } from "react";
import { BookOpen, FileText, Eye, GitBranch, ShieldAlert, Calendar, HelpCircle, Award, CheckCircle2, Layers, ChevronRight, Network, Braces } from "lucide-react";

const statusTemplateMarkdown = `---
id: "status-pending-30-days"
title: "SASSA Status Pending for 30 Days: Solutions & Verification Steps"
slug: "/status/pending-30-days"
category: "status-meanings"
lastUpdated: "2026-06-25"
version: "1.2.0"
author:
  name: "Sibongile Ndlovu"
  role: "Social Assistance Consultant"
  credentials: "BA Social Work, SASSA Advisor (Ex)"
  verified: true
seo:
  metaTitle: "SASSA Pending Status for 30 Days - How to Fix"
  metaDescription: "Is your SASSA status pending for more than 30 days? Learn the top 3 causes, actual timelines."
  keywords: ["sassa pending", "sassa status 30 days"]
faqs:
  - question: "Why is my SASSA status still pending after 30 days?"
    answer: "This occurs because the department's verification queues are delayed."
  - question: "How can I trigger a manual review for my pending application?"
    answer: "You can submit an online inquiry or phone the official toll-free hotline."
relatedPages:
  - "status-bank-verification"
  - "appeals-timeline"
---

# SASSA Status Pending for 30 Days: Solutions & Verification Steps

A "Pending" status indicates that SASSA has received your application and is running verification checks.

## Common Causes of 30-Day Delays

1. **SARS Database Matching**: SASSA checks if you have active tax records.
2. **UIF Registration Status**: Checking if you receive alternative income.
3. **Identity Verification Delays**: Home Affairs system response lag.

## Exact Timeline Expectations

The verification queue takes an average of 7 to 14 days, but system bottlenecks can extend this up to 45 days.`;

const grantTemplateMarkdown = `---
id: "grant-child-support"
title: "SASSA Child Support Grant: Official Eligibility & Expiry Limits"
slug: "/grants/child-support-grant"
category: "grant-library"
lastUpdated: "2026-06-18"
version: "2.0.1"
author:
  name: "Dr. Alistair Mbeki"
  role: "Public Policy Expert"
  credentials: "PhD Development Economics, Wits"
  verified: true
seo:
  metaTitle: "SASSA Child Support Grant Rules & Expiry Limits"
  metaDescription: "Complete checklist of required documents, income thresholds."
  keywords: ["child support grant", "sassa child grant"]
faqs:
  - question: "At what age does the child support grant expire?"
    answer: "The grant ceases automatically on the last day of the month in which the child turns 18."
  - question: "What is the single caregiver income threshold?"
    answer: "As of 2026, the single parent income threshold is under R105,600 per annum."
relatedPages:
  - "eligibility-student"
  - "downloads-forms"
---

# SASSA Child Support Grant: Official Eligibility & Expiry Limits

The Child Support Grant is designed to help lower-income caregivers cover basic child maintenance.

## Official Qualification Criteria

* **Caregiver role**: Must be the primary caregiver living in SA.
* **Child requirement**: Under the age of 18.
* **Income check**: Must pass the SASSA means test threshold.`;

const officeTemplateMarkdown = `---
id: "office-soweto"
title: "SASSA Soweto Branch Office: Operational Hours & Directions"
slug: "/offices/gp-soweto-maponya"
category: "office-finder"
lastUpdated: "2026-06-10"
version: "1.0.4"
author:
  name: "Gauteng Regional Office"
  role: "Official Branch Coordinator"
  credentials: "SASSA Regional Management"
  verified: true
seo:
  metaTitle: "Soweto SASSA Office Branch - Opening Times & Location"
  metaDescription: "Find contact numbers, street address, operating hours."
  keywords: ["soweto sassa office", "sassa soweto opening times"]
faqs:
  - question: "What are the operating hours for the Soweto SASSA office?"
    answer: "The branch is open Monday to Friday from 07:30 to 16:00."
  - question: "What is the physical address of the branch?"
    answer: "The office is situated at Maponya Mall Civic Precinct, Soweto."
relatedPages:
  - "provinces-gauteng"
  - "downloads-forms"
---

# SASSA Soweto Branch Office: Operational Hours & Directions

The Maponya Mall branch serves as the central hub for social assistance services in Soweto.

## Location & Accessibility Notes

* **Physical Address**: Maponya Mall Civic Precinct, Chris Hani Rd, Soweto.
* **Wheelchair Access**: Fully compliant ramps and designated accessible parking bays.`;

function parseMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  let inFrontmatter = false;
  let frontmatterLines: string[] = [];
  let bodyLines: string[] = [];

  for (const line of lines) {
    if (line.trim() === "---") {
      if (!inFrontmatter) { inFrontmatter = true; continue; }
      else { inFrontmatter = false; continue; }
    }
    if (inFrontmatter) frontmatterLines.push(line);
    else bodyLines.push(line);
  }

  const meta: any = { author: {}, seo: {}, faqs: [], relatedPages: [] };
  let currentParentKey = "";

  for (const line of frontmatterLines) {
    const match = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (match) {
      const key = match[1];
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      if (key === "author" || key === "seo") currentParentKey = key;
      else { currentParentKey = ""; if (key !== "relatedPages") meta[key] = val; }
    } else {
      const nestedMatch = line.match(/^\s+([a-zA-Z0-9_]+):\s*(.*)$/);
      if (nestedMatch && currentParentKey) {
        let val = nestedMatch[2].trim().replace(/^["']|["']$/g, "");
        if (val === "true") val = true as any;
        if (val === "false") val = false as any;
        meta[currentParentKey][nestedMatch[1]] = val;
      }
      const listMatch = line.match(/^\s*-\s*["']?([^"']+)["']?$/);
      if (listMatch && line.indexOf("question") < 0 && line.indexOf("answer") < 0) {
        meta.relatedPages.push(listMatch[1].trim());
      }
    }
  }

  const rawFaqsBlock = frontmatterLines.join("\n");
  const faqMatches = [...rawFaqsBlock.matchAll(/-\s*question:\s*["']?([^"'\n]+)["']?\s*\n\s*answer:\s*["']?([^"'\n]+)["']?/g)];
  meta.faqs = faqMatches.map(m => ({ question: m[1], answer: m[2] }));

  const bodyText = bodyLines.join("\n");
  const headings: { text: string; depth: number }[] = [];
  const hMatches = [...bodyText.matchAll(/^(#{1,6})\s+(.+)$/gm)];
  hMatches.forEach(m => headings.push({ text: m[2].trim(), depth: m[1].length }));

  const cleanText = bodyText.replace(/[#*`_\[\]()]/g, "");
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return { meta, bodyText, headings, wordCount, readingTime };
}

function validateFrontmatter(parsed: any, raw: string) {
  const { meta } = parsed;
  const errors: string[] = [];
  const warnings: string[] = [];
  const passes: string[] = [];

  if (meta.slug) {
    if (!meta.slug.startsWith("/")) errors.push("Slug must start with an absolute leading slash");
    else if (/[A-Z]/.test(meta.slug)) errors.push("Slugs must be entirely lowercase");
    else if (/\s/.test(meta.slug)) errors.push("Slugs must not contain spaces");
    else passes.push("Slug Naming Convention: Lowercase, hyphenated format valid.");
  } else errors.push("Required property 'slug' is missing");

  if (meta.author) {
    if (!meta.author.name) errors.push("YMYL Compliance: 'author.name' must be defined");
    if (!meta.author.credentials) warnings.push("E-E-A-T Advisory: 'author.credentials' is missing");
    else passes.push("E-E-A-T Signature: Valid author credentials defined.");
    if (meta.author.verified !== true && meta.author.verified !== "true") warnings.push("E-E-A-T Advisory: Author verification stamp is false");
    else passes.push("E-E-A-T Checklist: Author verification check PASSED.");
  } else errors.push("YMYL Compliance: 'author' metadata block is missing");

  if (meta.seo) {
    if (!meta.seo.metaTitle) errors.push("SEO Schema: 'seo.metaTitle' is required");
    else if (meta.seo.metaTitle.length > 60) warnings.push(`SEO Advisory: 'seo.metaTitle' is long (${meta.seo.metaTitle.length} chars)`);
    else passes.push("SEO Schema: Meta title is within optimal length limits.");
    if (!meta.seo.metaDescription) errors.push("SEO Schema: 'seo.metaDescription' is missing");
    else if (meta.seo.metaDescription.length < 120 || meta.seo.metaDescription.length > 160) warnings.push(`SEO Advisory: 'seo.metaDescription' length (${meta.seo.metaDescription.length} chars) outside optimal range`);
    else passes.push("SEO Schema: Meta description is perfectly optimized.");
  } else errors.push("SEO Schema: 'seo' metadata block is missing");

  if (meta.lastUpdated) {
    const year = parseInt(meta.lastUpdated.split("-")[0]);
    if (year < 2026) warnings.push(`Freshness Warning: Content 'lastUpdated' date is stale (${meta.lastUpdated})`);
    else passes.push(`Freshness Audit: Last updated date is current (${meta.lastUpdated}).`);
  } else errors.push("Required property 'lastUpdated' is missing");

  const h1Count = (raw.match(/^#\s+/gm) || []).length;
  if (h1Count === 0) errors.push("Document is missing an H1 header");
  else if (h1Count > 1) warnings.push(`Document has multiple H1 headers (${h1Count})`);
  else passes.push("Accessibility Audit: Single H1 structure matched.");

  return { errors, warnings, passes };
}

export default function ContentEngine() {
  const [engineTemplate, setEngineTemplate] = useState<"status" | "grant" | "office">("status");
  const [engineActiveView, setEngineActiveView] = useState<"compiled" | "schema" | "validation">("compiled");
  const [rawMarkdownText, setRawMarkdownText] = useState<string>(statusTemplateMarkdown);

  const handleTemplateChange = (tmpl: "status" | "grant" | "office") => {
    setEngineTemplate(tmpl);
    setRawMarkdownText(tmpl === "status" ? statusTemplateMarkdown : tmpl === "grant" ? grantTemplateMarkdown : officeTemplateMarkdown);
  };

  const activeParsedDoc = parseMarkdown(rawMarkdownText);
  const activeValidationReport = validateFrontmatter(activeParsedDoc, rawMarkdownText);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-surface-dim pb-5">
          <div>
            <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5"><BookOpen className="w-4.5 h-4.5 text-accent-dark" />Zero-CMS Public Assistance Content Engine</h3>
            <p className="text-xs text-outline font-mono mt-0.5">Declarative, static markdown pipeline optimized for PageSpeed and crawl efficiency</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-accent-light/20 text-accent-dark font-mono px-2.5 py-1 rounded-full font-bold">Static Pipeline: Active</span>
            <span className="text-xs bg-surface-dim text-muted-foreground font-mono px-2.5 py-1 rounded-full font-bold">No Database Queries</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-surface rounded-2xl border border-surface-dim space-y-2">
            <span className="text-xs font-mono text-accent-dark font-extrabold uppercase">File Storage Schema</span>
            <h4 className="text-xs font-black text-ink">1. Collections Directory</h4>
            <p className="text-xs text-surface0 leading-relaxed">Articles live in flat Git repositories as Markdown.</p>
            <code className="block p-1.5 bg-white rounded-lg border border-surface-dim text-xs font-mono text-surface0">/content/status-meanings/<br/>/content/grant-library/</code>
          </div>
          <div className="p-4 bg-surface rounded-2xl border border-surface-dim space-y-2">
            <span className="text-xs font-mono text-accent-dark font-extrabold uppercase">Compilation Rules</span>
            <h4 className="text-xs font-black text-ink">2. Slug & Index Mapping</h4>
            <p className="text-xs text-surface0 leading-relaxed">Build step parses Frontmatter to register slugs.</p>
            <ul className="text-xs font-mono text-outline space-y-1 pl-1"><li>&bull; lowercase &amp; hyphens only</li><li>&bull; No trailing slashes</li></ul>
          </div>
          <div className="p-4 bg-surface rounded-2xl border border-surface-dim space-y-2">
            <span className="text-xs font-mono text-accent-dark font-extrabold uppercase">YMYL Safeguards</span>
            <h4 className="text-xs font-black text-ink">3. EEAT Verification</h4>
            <p className="text-xs text-surface0 leading-relaxed">Build-step validations throw errors if no professional signatures.</p>
            <span className="inline-block text-xs bg-trading-down/10 text-trading-down font-bold px-1.5 py-0.5 rounded font-mono">Strict AdSense Pass</span>
          </div>
          <div className="p-4 bg-surface rounded-2xl border border-surface-dim space-y-2">
            <span className="text-xs font-mono text-accent-dark font-extrabold uppercase">Rich Meta Generation</span>
            <h4 className="text-xs font-black text-ink">4. Programmatic Star SEO</h4>
            <p className="text-xs text-surface0 leading-relaxed">Compiles schema markup dynamically from frontmatter arrays.</p>
            <span className="inline-block text-xs bg-accent-light/20 text-accent-dark font-bold px-1.5 py-0.5 rounded font-mono">100% Rich Result Match</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="bg-ink text-white rounded-3xl p-6 border border-ink lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-ink pb-4">
            <div>
              <h3 className="text-xs font-bold text-surface-container flex items-center gap-1.5 font-mono"><FileText className="w-4 h-4 text-gold" />SOURCE.md (Live Sandbox Editor)</h3>
              <p className="text-xs text-surface0 font-mono mt-0.5">Choose a template, modify content, or tweak frontmatter</p>
            </div>
            <div className="flex gap-1 bg-ink p-1 rounded-xl border border-slate-850">
              {(["status", "grant", "office"] as const).map((t) => (
                <button key={t} onClick={() => handleTemplateChange(t)} className={`px-2 py-1 rounded-lg text-xs font-bold font-mono transition uppercase ${engineTemplate === t ? "bg-accent-dark text-primary-foreground" : "text-outline hover:text-white"}`}>{t}</button>
              ))}
            </div>
          </div>
          <textarea value={rawMarkdownText} onChange={(e) => setRawMarkdownText(e.target.value)}
            className="w-full h-[520px] bg-ink border border-ink rounded-2xl p-4 text-xs font-mono text-gold focus:ring-1 focus:ring-accent-light/200 outline-hidden resize-none scrollbar-thin"
            placeholder="Enter raw Markdown with YAML frontmatter..." />
        </div>

        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex bg-white border border-surface-dim p-1.5 rounded-2xl shadow-xs gap-1">
            {([{ id: "compiled", label: "Compiled Page View", icon: Eye }, { id: "schema", label: "Breadcrumbs, TOC & Schema", icon: GitBranch }, { id: "validation", label: "Validation & YMYL Report", icon: ShieldAlert }] as const).map((v) => {
              const Icon = v.icon;
              return (
                <button key={v.id} onClick={() => setEngineActiveView(v.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-extrabold transition ${engineActiveView === v.id ? "bg-ink text-white shadow-xs" : "text-surface0 hover:text-ink hover:bg-surface"}`}>
                  <Icon className="w-3.5 h-3.5" /><span>{v.label}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs flex-1 min-h-[560px] flex flex-col">
            {engineActiveView === "compiled" && (
              <div className="space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-outline font-mono uppercase tracking-wider">
                    <span className="hover:text-accent-dark cursor-pointer">Home</span>
                    <ChevronRight className="w-3 h-3 text-outline-variant" />
                    <span className="hover:text-accent-dark cursor-pointer">{activeParsedDoc.meta.category || "category"}</span>
                    <ChevronRight className="w-3 h-3 text-outline-variant" />
                    <span className="text-muted-foreground truncate max-w-xs font-bold font-mono">{activeParsedDoc.meta.id || "document"}</span>
                  </div>
                  <div className="border-b border-surface-dim pb-4 space-y-2">
                    <h1 className="text-xl md:text-2xl font-black text-ink tracking-tight leading-tight">{activeParsedDoc.meta.title || "Untitled Document"}</h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-surface0">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-outline" /> Last Updated: <strong className="text-ink">{activeParsedDoc.meta.lastUpdated || "N/A"}</strong></span>
                      <span>|</span><span>Version: <strong className="text-accent-dark">{activeParsedDoc.meta.version || "1.0.0"}</strong></span>
                      <span>|</span><span className="text-accent-dark font-bold">{activeParsedDoc.wordCount} words ({activeParsedDoc.readingTime} min read)</span>
                    </div>
                  </div>
                  {activeParsedDoc.headings.length > 0 && (
                    <div className="p-4 bg-surface rounded-2xl border border-surface-dim/80">
                      <h4 className="text-xs font-mono font-black text-outline uppercase tracking-widest mb-2 flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-outline" />Automatic Table of Contents</h4>
                      <ul className="space-y-1.5 text-xs">
                        {activeParsedDoc.headings.map((h, i) => (
                          <li key={i} className={`flex items-center gap-2 hover:text-accent-dark transition cursor-pointer text-muted-foreground font-medium ${h.depth > 2 ? "pl-4 text-xs font-normal" : ""}`}>
                            <span className="text-accent">&bull;</span><span>{h.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="prose prose-slate max-w-none text-xs text-ink space-y-3 leading-relaxed">
                    {activeParsedDoc.bodyText.split("\n\n").map((para, idx) => {
                      const trimmed = para.trim();
                      if (trimmed.startsWith("## ")) return <h3 key={idx} className="text-sm font-extrabold text-slate-955 pt-2 border-b border-surface pb-1">{trimmed.replace("## ", "")}</h3>;
                      if (trimmed.startsWith("* ")) return <ul key={idx} className="list-disc pl-4 space-y-1">{trimmed.split("\n").map((item, ki) => <li key={ki} className="text-muted-foreground">{item.replace("* ", "")}</li>)}</ul>;
                      if (trimmed.startsWith("1. ")) return <ol key={idx} className="list-decimal pl-4 space-y-1 font-sans">{trimmed.split("\n").map((item, ki) => <li key={ki} className="text-muted-foreground">{item.replace(/^\d+\.\s*/, "")}</li>)}</ol>;
                      if (trimmed.startsWith("# ")) return null;
                      return <p key={idx} className="whitespace-pre-line font-sans">{trimmed}</p>;
                    })}
                  </div>
                  {activeParsedDoc.meta.faqs?.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-surface-dim space-y-3">
                      <h3 className="text-xs font-black text-ink flex items-center gap-1 font-mono uppercase tracking-widest"><HelpCircle className="w-4 h-4 text-accent-dark" />Frequently Asked Questions</h3>
                      <div className="space-y-2">
                        {activeParsedDoc.meta.faqs.map((faq: any, i: number) => (
                          <div key={i} className="p-3.5 bg-surface border border-surface-dim rounded-xl space-y-1.5">
                            <p className="font-extrabold text-xs text-ink flex items-start gap-1 font-sans"><span className="text-accent-dark font-mono">Q:</span><span>{faq.question}</span></p>
                            <p className="text-xs text-muted-foreground leading-normal pl-4 border-l-2 border-accent-light/200/20 font-sans">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {activeParsedDoc.meta.author?.name && (
                  <div className="mt-8 p-4 bg-surface/75 rounded-2xl border border-surface-dim flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-light/20 flex items-center justify-center font-black text-accent-dark border border-accent-light/40 text-xs font-mono">
                        {activeParsedDoc.meta.author.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-ink leading-none font-sans">{activeParsedDoc.meta.author.name}</span>
                          {(activeParsedDoc.meta.author.verified === true || activeParsedDoc.meta.author.verified === "true") && (
                            <span className="bg-accent-light/20 text-xs font-mono text-accent-dark font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-accent-light/50"><Award className="w-2.5 h-2.5" />Expert Verified</span>
                          )}
                        </div>
                        <p className="text-xs text-outline mt-1 font-sans">{activeParsedDoc.meta.author.role} &bull; <span className="font-mono text-xs text-accent-dark">{activeParsedDoc.meta.author.credentials}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-outline uppercase tracking-wider block">YMYL Review Signature</span>
                      <span className="text-xs font-mono text-accent-dark font-bold">PASS (E-E-A-T Compliance)</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {engineActiveView === "schema" && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-ink flex items-center gap-1"><GitBranch className="w-4 h-4 text-accent-dark" />1. Automated Hierarchical Breadcrumbs Schema</h4>
                    <p className="text-xs text-surface0 font-sans">Injected into Google Rich Search results using BreadcrumbList structured formats.</p>
                    <pre className="bg-ink text-gold font-mono p-3 rounded-2xl text-xs overflow-x-auto select-all scrollbar-thin">{`{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sassagrantguide.co.za" },
    { "@type": "ListItem", "position": 2, "name": "${activeParsedDoc.meta.category || "Category"}", "item": "https://sassagrantguide.co.za/${activeParsedDoc.meta.category || ""}" },
    { "@type": "ListItem", "position": 3, "name": "${activeParsedDoc.meta.title || "Title"}", "item": "https://sassagrantguide.co.za${activeParsedDoc.meta.slug || ""}" }
  ]
}`}</pre>
                  </div>
                  {activeParsedDoc.meta.faqs?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-ink flex items-center gap-1"><Braces className="w-4 h-4 text-accent-dark" />2. Automated FAQPage Schema Markup</h4>
                      <p className="text-xs text-surface0 font-sans">Generated to register questions with Google Search.</p>
                      <pre className="bg-ink text-gold font-mono p-3 rounded-2xl text-xs overflow-x-auto max-h-48 scrollbar-thin select-all">{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${activeParsedDoc.meta.faqs.map((f: any) => `    {
      "@type": "Question",
      "name": "${f.question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${f.answer.replace(/"/g, '\\"')}"
      }
    }`).join(",\n")}
  ]
}`}</pre>
                    </div>
                  )}
                  {activeParsedDoc.meta.relatedPages?.length > 0 && (
                    <div className="p-4 bg-accent-light/20/40 rounded-2xl border border-dashed border-accent-light space-y-2">
                      <h4 className="text-xs font-black text-ink flex items-center gap-1.5"><Network className="w-4 h-4 text-accent-dark" />3. Automatic Lateral Content Injection</h4>
                      <p className="text-xs text-accent-dark font-sans">Collections use tag matching to surface contextual lateral modules.</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeParsedDoc.meta.relatedPages.map((pageId: string, idx: number) => (
                          <span key={idx} className="bg-white border border-accent-light text-accent-dark font-mono text-xs px-2.5 py-1 rounded-lg">Linked Node ID: <strong>{pageId}</strong></span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {engineActiveView === "validation" && (
              <div className="space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4 font-sans">
                  <div>
                    <h4 className="text-xs font-black text-ink flex items-center gap-1"><ShieldAlert className="w-4 h-4 text-emerald-850" />Build-Time YMYL Validation Audit Report</h4>
                    <p className="text-xs text-surface0 font-sans">Our static engine tests every markdown document during local build.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent-dark font-bold uppercase tracking-wider block">Audit Checks Passed ({activeValidationReport.passes.length})</span>
                    <div className="space-y-1.5">
                      {activeValidationReport.passes.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-accent-dark bg-accent-light/20/50 p-2 rounded-xl border border-accent-light/40 font-sans">
                          <span className="w-4 h-4 rounded-full bg-accent-light/40 flex items-center justify-center text-xs font-bold text-accent-dark flex-shrink-0 font-mono">&#10003;</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {activeValidationReport.warnings.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider block">Advisory Warnings ({activeValidationReport.warnings.length})</span>
                      <div className="space-y-1.5 font-sans">
                        {activeValidationReport.warnings.map((w, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-amber-850 bg-amber-50/40 p-2 rounded-xl border border-amber-100">
                            <span className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-800 mt-0.5 flex-shrink-0 font-mono">!</span><span>{w}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeValidationReport.errors.length > 0 ? (
                    <div className="space-y-2 font-sans">
                      <span className="text-xs font-mono text-trading-down font-bold uppercase tracking-wider block">Failures / Errors ({activeValidationReport.errors.length}) - BUILD BLOCKED</span>
                      <div className="space-y-1.5">
                        {activeValidationReport.errors.map((e, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-trading-down bg-trading-down/5 p-2 rounded-xl border border-trading-down/20">
                            <span className="w-4 h-4 rounded-full bg-trading-down/10 flex items-center justify-center text-xs font-bold text-trading-down mt-0.5 flex-shrink-0 font-mono">&#10007;</span><strong>{e}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-ink text-gold rounded-2xl border border-accent-dark text-xs font-mono font-bold flex items-center gap-2">
                      <span className="animate-pulse">&#9679;</span><span>Build Safety Verification: 100% Passed. Page is safe to compile!</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
