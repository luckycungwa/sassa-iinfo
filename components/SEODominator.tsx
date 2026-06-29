'use client';

import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  Network,
  Layers,
  Search,
  CheckCircle2,
  FileText,
  HelpCircle,
  Sparkles,
  Map,
  Compass,
  DollarSign,
  ShieldAlert,
  Calendar,
  Layers2,
  GitBranch,
  Braces,
  RefreshCw,
  Award,
  Eye,
  Info,
  ChevronRight,
  BookOpen,
  LayoutGrid,
  Printer,
  Share2,
  FileDown,
  XCircle,
  ChevronDown
} from "lucide-react";

interface KeywordItem {
  keyword: string;
  volume: string;
  difficulty: number;
  intent: "Informational" | "Navigational" | "Transactional" | "Commercial";
  pillar: string;
  supportingPage: string;
  anchorText: string;
}

export default function SEODominator() {
  const [activeSubTab, setActiveSubTab] = useState<
    "map" | "linking" | "technical" | "engine" | "policy" | "roadmap" | "design"
  >("map");

  const [selectedCluster, setSelectedCluster] = useState<string>("All");
  const [serpQuery, setSerpQuery] = useState<string>("sassa status pending 30 days");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Content Engine States
  const [engineTemplate, setEngineTemplate] = useState<"status" | "grant" | "office">("status");
  const [engineActiveView, setEngineActiveView] = useState<"compiled" | "schema" | "validation">("compiled");

  // Design System Explorer States
  const [selectedDesignComp, setSelectedDesignComp] = useState<string>("status-badge");
  const [pageAgentTab, setPageAgentTab] = useState<"design" | "prompts" | "architecture">("design");
  const [previewBadgeStatus, setPreviewBadgeStatus] = useState<"Pending" | "Approved" | "Declined" | "Bank Verification">("Approved");
  const [previewAlertVariant, setPreviewAlertVariant] = useState<"warning" | "success" | "info" | "notice">("warning");
  const [previewAccordionOpen, setPreviewAccordionOpen] = useState<boolean>(false);
  const [calcMarried, setCalcMarried] = useState<boolean>(false);
  const [calcIncome, setCalcIncome] = useState<number>(4500);
  const [calcChildAge, setCalcChildAge] = useState<number>(8);

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
  metaDescription: "Is your SASSA status pending for more than 30 days? Learn the top 3 causes, actual timelines, and how to trigger a manual review."
  keywords: ["sassa pending", "sassa status 30 days", "remedy pending"]
faqs:
  - question: "Why is my SASSA status still pending after 30 days?"
    answer: "This occurs because the department's verification queues are delayed, or your banking details are failing automated verification against your ID."
  - question: "How can I trigger a manual review for my pending application?"
    answer: "You can submit an online inquiry or phone the official toll-free hotline to request a verification fast-track."
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

The verification queue takes an average of 7 to 14 days, but system bottlenecks can extend this up to 45 days.

## Recommended Action Plan

If your application exceeds 45 days, follow the appeal steps or re-verify your banking details.`;

  const grantTemplateMarkdown = `---
id: "grant-child-support"
title: "SASSA Child Support Grant: Official Eligibility & Expiry Limits"
slug: "/grants/child-support"
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
  metaDescription: "Complete checklist of required documents, income thresholds, and automatic child support age limit expiry extensions."
  keywords: ["child support grant", "sassa child grant", "age limit"]
faqs:
  - question: "At what age does the child support grant expire?"
    answer: "The grant ceases automatically on the last day of the month in which the child turns 18 years old."
  - question: "What is the single caregiver income threshold?"
    answer: "As of 2026, the single parent income threshold is under R105,600 per annum to qualify."
relatedPages:
  - "eligibility-student"
  - "downloads-forms"
---

# SASSA Child Support Grant: Official Eligibility & Expiry Limits

The Child Support Grant is designed to help lower-income caregivers cover basic child maintenance.

## Official Qualification Criteria

* **Caregiver role**: Must be the primary caregiver living in SA.
* **Child requirement**: Under the age of 18.
* **Income check**: Must pass the SASSA means test threshold.

## Required Supporting Documentation

* Caregiver's original ID document.
* Child's certified 13-digit birth certificate.
* Certified proof of personal income.`;

  const officeTemplateMarkdown = `---
id: "office-soweto"
title: "SASSA Soweto Branch Office: Operational Hours & Directions"
slug: "/offices/soweto-branch"
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
  metaDescription: "Find contact numbers, street address, operating hours, and queue-avoidance tips for the main SASSA office in Soweto."
  keywords: ["soweto sassa office", "sassa soweto opening times", "sassa offices gauteng"]
faqs:
  - question: "What are the operating hours for the Soweto SASSA office?"
    answer: "The branch is open Monday to Friday from 07:30 to 16:00, excluding official public holidays."
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
* **Wheelchair Access**: Fully compliant ramps and designated accessible parking bays.
* **Public Transport**: Close to taxi ranks and local bus stations.

## Key Services Offered On-site

1. New grant application processing.
2. Biometric and identification captures.
3. Card swaps and payment method change updates.`;

  const [rawMarkdownText, setRawMarkdownText] = useState<string>(statusTemplateMarkdown);

  const handleTemplateChange = (tmpl: "status" | "grant" | "office") => {
    setEngineTemplate(tmpl);
    if (tmpl === "status") setRawMarkdownText(statusTemplateMarkdown);
    if (tmpl === "grant") setRawMarkdownText(grantTemplateMarkdown);
    if (tmpl === "office") setRawMarkdownText(officeTemplateMarkdown);
  };

  // Simple custom client-side Markdown Frontmatter & Header Parser
  const parseMarkdown = (markdown: string) => {
    const lines = markdown.split("\n");
    let inFrontmatter = false;
    let frontmatterLines: string[] = [];
    let bodyLines: string[] = [];

    for (const line of lines) {
      if (line.trim() === "---") {
        if (!inFrontmatter) {
          inFrontmatter = true;
          continue;
        } else {
          inFrontmatter = false;
          continue;
        }
      }

      if (inFrontmatter) {
        frontmatterLines.push(line);
      } else {
        bodyLines.push(line);
      }
    }

    // Simple key-value parser for flat/nested Frontmatter
    const meta: any = {
      author: {},
      seo: {},
      faqs: [],
      relatedPages: []
    };

    let currentParentKey = "";

    for (const line of frontmatterLines) {
      const match = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
      if (match) {
        const key = match[1];
        const val = match[2].trim().replace(/^["']|["']$/g, ""); // strip quotes
        
        if (key === "author" || key === "seo") {
          currentParentKey = key;
        } else {
          currentParentKey = "";
          if (key === "relatedPages") {
            // will be populated by bullet checklist
          } else {
            meta[key] = val;
          }
        }
      } else {
        // Check for nested keys (author / seo / lists)
        const nestedMatch = line.match(/^\s+([a-zA-Z0-9_]+):\s*(.*)$/);
        if (nestedMatch && currentParentKey) {
          const key = nestedMatch[1];
          let val = nestedMatch[2].trim().replace(/^["']|["']$/g, "");
          if (val === "true") val = true as any;
          if (val === "false") val = false as any;
          meta[currentParentKey][key] = val;
        }

        // Check for list items (e.g. relatedPages list)
        const listMatch = line.match(/^\s*-\s*["']?([^"']+)["']?$/);
        if (listMatch) {
          const val = listMatch[1].trim();
          if (line.indexOf("- question:") >= 0) {
            // FAQ question parsed by regex below
          } else if (line.indexOf("question") < 0 && line.indexOf("answer") < 0) {
            meta.relatedPages.push(val);
          }
        }
      }
    }

    // Parse FAQs more reliably with structured regex
    const rawFaqsBlock = frontmatterLines.join("\n");
    const faqMatches = [...rawFaqsBlock.matchAll(/-\s*question:\s*["']?([^"'\n]+)["']?\s*\n\s*answer:\s*["']?([^"'\n]+)["']?/g)];
    meta.faqs = faqMatches.map(m => ({
      question: m[1],
      answer: m[2]
    }));

    // Body headings parsing (for Table of Contents)
    const bodyText = bodyLines.join("\n");
    const headings: { text: string; depth: number }[] = [];
    const hMatches = [...bodyText.matchAll(/^(#{1,6})\s+(.+)$/gm)];
    hMatches.forEach(m => {
      headings.push({
        text: m[2].trim(),
        depth: m[1].length
      });
    });

    // Word count & Reading time
    const cleanText = bodyText.replace(/[#*`_\[\]()]/g, "");
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      meta,
      bodyText,
      headings,
      wordCount,
      readingTime
    };
  };

  const validateFrontmatter = (parsed: any, raw: string) => {
    const { meta } = parsed;
    const errors: string[] = [];
    const warnings: string[] = [];
    const passes: string[] = [];

    // 1. Slug naming convention validation
    if (meta.slug) {
      if (!meta.slug.startsWith("/")) {
        errors.push("Slug must start with an absolute leading slash (e.g., /status/pending)");
      } else if (/[A-Z]/.test(meta.slug)) {
        errors.push("Naming Convention: Slugs must be entirely lowercase to avoid duplicate URL index penalties");
      } else if (/\s/.test(meta.slug)) {
        errors.push("Naming Convention: Slugs must not contain spaces; use hyphens (-) instead");
      } else {
        passes.push("Slug Naming Convention: Lowercase, hyphenated format valid.");
      }
    } else {
      errors.push("Required property 'slug' is missing in frontmatter");
    }

    // 2. YMYL E-E-A-T validations
    if (meta.author) {
      if (!meta.author.name) {
        errors.push("YMYL Compliance: 'author.name' must be defined for authoritative social assistance guidelines");
      }
      if (!meta.author.credentials) {
        warnings.push("E-E-A-T Advisory: 'author.credentials' is missing. Linking paralegal or social work certifications is highly recommended for YMYL topics");
      } else {
        passes.push("E-E-A-T Signature: Valid author credentials defined.");
      }
      if (meta.author.verified !== true && meta.author.verified !== "true") {
        warnings.push("E-E-A-T Advisory: Author verification stamp is false. Ensure content undergoes manual expert check");
      } else {
        passes.push("E-E-A-T Checklist: Author verification check PASSED.");
      }
    } else {
      errors.push("YMYL Compliance: 'author' metadata block is missing");
    }

    // 3. SEO Meta validations
    if (meta.seo) {
      if (!meta.seo.metaTitle) {
        errors.push("SEO Schema: 'seo.metaTitle' is required for title tag overrides");
      } else if (meta.seo.metaTitle.length > 60) {
        warnings.push(`SEO Advisory: 'seo.metaTitle' is long (${meta.seo.metaTitle.length} chars). Google typically truncates search titles above 60 chars`);
      } else {
        passes.push("SEO Schema: Meta title is within optimal length limits.");
      }

      if (!meta.seo.metaDescription) {
        errors.push("SEO Schema: 'seo.metaDescription' is missing. Crucial for custom organic snippets");
      } else if (meta.seo.metaDescription.length < 120 || meta.seo.metaDescription.length > 160) {
        warnings.push(`SEO Advisory: 'seo.metaDescription' length (${meta.seo.metaDescription.length} chars) is outside the optimal 120-160 character limit`);
      } else {
        passes.push("SEO Schema: Meta description is perfectly optimized (120-160 chars).");
      }
    } else {
      errors.push("SEO Schema: 'seo' metadata block is missing");
    }

    // 4. Evergreen LastUpdated validations
    if (meta.lastUpdated) {
      const year = parseInt(meta.lastUpdated.split("-")[0]);
      if (year < 2026) {
        warnings.push(`Freshness Warning: Content 'lastUpdated' date is stale (${meta.lastUpdated}). Keep social grant limits up-to-date with current 2026/2027 parameters`);
      } else {
        passes.push(`Freshness Audit: Last updated date is current (${meta.lastUpdated}).`);
      }
    } else {
      errors.push("Required property 'lastUpdated' is missing in frontmatter");
    }

    // 5. Structure checking
    const h1Count = (raw.match(/^#\s+/gm) || []).length;
    if (h1Count === 0) {
      errors.push("Accessibility Audit: Document is missing an H1 header (# Title). Always include exactly one H1 for accessibility layout");
    } else if (h1Count > 1) {
      warnings.push(`SEO Advisory: Document has multiple H1 headers (${h1Count}). Google prefers a single H1 to parse topic hierarchical intent`);
    } else {
      passes.push("Accessibility Audit: Single H1 structure matched.");
    }

    return { errors, warnings, passes };
  };

  // Compile active data on the fly
  const activeParsedDoc = parseMarkdown(rawMarkdownText);
  const activeValidationReport = validateFrontmatter(activeParsedDoc, rawMarkdownText);

  // Core Pillars Data
  const seoPillars = [
    {
      id: "payment",
      title: "1. Payment Centre (Hero Pillar)",
      slug: "/payment-centre",
      description: "Direct transactional & calendar intent. Captures 'sassa payment dates' volume.",
      supportingCount: 12,
      strategy: "Dynamic JS calendar rendering for 2026/2027 payouts. Uses client-side date lookup tool to satisfy direct answer intent and keep users on-page."
    },
    {
      id: "status",
      title: "2. Status Meaning Centre",
      slug: "/status-meanings",
      description: "High-volume informational queries on outcome codes and application states.",
      supportingCount: 24,
      strategy: "Individual search-optimized templates for each unique status state (e.g. Pending, Alternative Income Source, Means Test Failed) with direct resolution guidance."
    },
    {
      id: "appeals",
      title: "3. Appeals & Remediation Hub",
      slug: "/appeals-centre",
      description: "High commercial-investigative and legal-remedy search queries.",
      supportingCount: 15,
      strategy: "Step-by-step guides for Independent Social Assistance Tribunal (ITSAA) online submissions, timeline calculators, and form packages."
    },
    {
      id: "grants",
      title: "4. Grant Library & Eligibility",
      slug: "/grants",
      description: "Evergreen regulatory content answering qualifying criteria and means test thresholds.",
      supportingCount: 18,
      strategy: "Structured decision-tree checklist templates and grant estimation matrices satisfying programmatic eligibility checks."
    },
    {
      id: "offices",
      title: "5. Office Finder & Regional Hubs",
      slug: "/offices",
      description: "Ultra-high local intent. Captures 'sassa office near me' and localized provincial queries.",
      supportingCount: 54,
      strategy: "No-API static local pages optimized for indexability. Province > City > Branch structure containing operating times, directions, and accessibility."
    }
  ];

  // Complete Keyword Cluster & Search Intent Database
  const keywordDatabase: KeywordItem[] = [
    {
      keyword: "sassa payment dates july 2026",
      volume: "350,000",
      difficulty: 12,
      intent: "Informational",
      pillar: "Payment Centre",
      supportingPage: "SASSA Payout Calendar (July 2026)",
      anchorText: "July 2026 SASSA payout schedule"
    },
    {
      keyword: "sassa status check pending for 30 days",
      volume: "95,000",
      difficulty: 18,
      intent: "Informational",
      pillar: "Status Meaning Centre",
      supportingPage: "Pending Status Code Guide - 30 Days Remedy",
      anchorText: "SASSA application pending for over 30 days"
    },
    {
      keyword: "sassa status check bank verification pending",
      volume: "120,000",
      difficulty: 15,
      intent: "Informational",
      pillar: "Status Meaning Centre",
      supportingPage: "Bank Verification Process & Timeframe Guide",
      anchorText: "bank verification pending status solutions"
    },
    {
      keyword: "how to appeal sassa status decline online",
      volume: "45,000",
      difficulty: 24,
      intent: "Transactional",
      pillar: "Appeals & Remediation Hub",
      supportingPage: "ITSAA Online Appeal Step-by-Step Submission",
      anchorText: "appeal a declined SASSA application online"
    },
    {
      keyword: "sassa appeals timeline calculator",
      volume: "18,000",
      difficulty: 8,
      intent: "Transactional",
      pillar: "Appeals & Remediation Hub",
      supportingPage: "90-Day Appeal Expiry Deadline Tool",
      anchorText: "SASSA appeal deadline countdown"
    },
    {
      keyword: "child support grant age limit extension",
      volume: "62,000",
      difficulty: 22,
      intent: "Informational",
      pillar: "Grant Library & Eligibility",
      supportingPage: "Child Support Grant Eligibility & Expiry Limits",
      anchorText: "child support grant age limits"
    },
    {
      keyword: "disability grant means test calculator",
      volume: "28,000",
      difficulty: 14,
      intent: "Commercial",
      pillar: "Grant Library & Eligibility",
      supportingPage: "SASSA Means Test Threshold Calculator",
      anchorText: "calculate personal assets for SASSA means test"
    },
    {
      keyword: "sassa office soweto address operating hours",
      volume: "15,000",
      difficulty: 4,
      intent: "Navigational",
      pillar: "Office Finder & Regional Hubs",
      supportingPage: "Soweto SASSA Office branch coordinates",
      anchorText: "SASSA branch offices in Soweto"
    },
    {
      keyword: "sassa appeal uif source of income decline",
      volume: "35,000",
      difficulty: 19,
      intent: "Informational",
      pillar: "Appeals & Remediation Hub",
      supportingPage: "Appealing Decline Due to Alternative UIF Income",
      anchorText: "UIF decline appeal guidelines"
    },
    {
      keyword: "sassa bank details change consent form",
      volume: "80,000",
      difficulty: 16,
      intent: "Transactional",
      pillar: "Payment Centre",
      supportingPage: "SASSA Bank Transfer Consent Form Download Page",
      anchorText: "SASSA bank change request template"
    },
    {
      keyword: "sassa srd r370 payment schedule",
      volume: "410,000",
      difficulty: 28,
      intent: "Navigational",
      pillar: "Payment Centre",
      supportingPage: "SRD R370 Payout Dates & Status Checking",
      anchorText: "SRD R370 payment dates list"
    },
    {
      keyword: "unemployed students sassa eligibility",
      volume: "24,000",
      difficulty: 15,
      intent: "Informational",
      pillar: "Grant Library & Eligibility",
      supportingPage: "SASSA Eligibility Guide for Unemployed Youth & Students",
      anchorText: "student and youth qualification criteria"
    }
  ];

  // Filtering keywords
  const filteredKeywords =
    selectedCluster === "All"
      ? keywordDatabase
      : keywordDatabase.filter((k) => k.pillar.includes(selectedCluster.split(" ")[0]));

  // Selected Schema Generation (FAQ Schema example)
  const schemaMarkup = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is my SASSA status showing 'Pending'?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 'Pending' status means SASSA has received your application and is validating your identity via Home Affairs, and checking bank account balances or alternative income sources via UIF and SARS databases."
      }
    },
    {
      "@type": "Question",
      "name": "How long does SASSA status bank verification take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SASSA bank verification typically takes between 7 to 10 business days. It requires cross-referencing your 13-digit ID and name directly with your financial institution."
      }
    }
  ]
}`;

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(schemaMarkup);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="seo-dominator-root">
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            Topical Authority Engine
          </div>

          <div className="max-w-2xl">
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-white leading-tight">
              SASSA Search Engine <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Dominance Blueprint</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed font-sans">
              A comprehensive, multi-layered semantic content roadmap designed to position this platform as South Africa&apos;s most authoritative, trusted public resource. Configured to capture millions of high-intent organic clicks statically, safely, and cleanly.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/65 max-w-4xl">
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
                <button
                  key={subTab.id}
                  onClick={() => setActiveSubTab(subTab.id as any)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeSubTab === subTab.id
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{subTab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main View Area based on Sub Tab */}
      <div className="grid grid-cols-1 gap-6">

        {/* 1. TOPICAL MAP & KEYWORDS */}
        {activeSubTab === "map" && (
          <div className="space-y-6">
            {/* Core Silos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {seoPillars.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedCluster(p.id === "payment" ? "Payment Centre" : p.id === "status" ? "Status Meaning" : p.id === "appeals" ? "Appeals" : p.id === "grants" ? "Grant Library" : "Office Finder")}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-left group ${
                    selectedCluster.includes(p.id === "payment" ? "Payment" : p.id === "status" ? "Status" : p.id === "appeals" ? "Appeals" : p.id === "grants" ? "Grant" : "Office")
                      ? "bg-emerald-50/55 border-emerald-200 shadow-xs"
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                      Pillar Node
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {p.supportingCount} URLs
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-800 mt-2.5 group-hover:text-emerald-900 transition leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono leading-normal">
                    {p.slug}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Keyword Cluster Database */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-4.5 h-4.5 text-emerald-800" />
                    Keyword Clusters & Search Intent Mapping
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Target keyword data categorized by semantic hub and intent profile
                  </p>
                </div>

                {/* Filter Cluster pills */}
                <div className="flex flex-wrap gap-1.5">
                  {["All", "Payment Centre", "Status Meaning", "Appeals", "Grant Library", "Office Finder"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCluster(c)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                        selectedCluster === c
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase">
                      <th className="pb-3 font-semibold">Target Keyword</th>
                      <th className="pb-3 font-semibold text-center">SA Vol (Est/mo)</th>
                      <th className="pb-3 font-semibold text-center">KD %</th>
                      <th className="pb-3 font-semibold text-center">Search Intent</th>
                      <th className="pb-3 font-semibold">Target Support Page</th>
                      <th className="pb-3 font-semibold">Required Anchor Text</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-sans">
                    {filteredKeywords.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="py-3 pr-2 font-extrabold text-slate-950 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          {item.keyword}
                        </td>
                        <td className="py-3 text-center font-mono text-slate-600">{item.volume}</td>
                        <td className="py-3 text-center">
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                            item.difficulty < 10
                              ? "bg-green-50 text-green-700"
                              : item.difficulty < 20
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}>
                            {item.difficulty}%
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            item.intent === "Informational"
                              ? "bg-blue-50 text-blue-700"
                              : item.intent === "Transactional"
                              ? "bg-emerald-50 text-emerald-800"
                              : item.intent === "Navigational"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-rose-50 text-rose-700"
                          }`}>
                            {item.intent}
                          </span>
                        </td>
                        <td className="py-3 text-slate-600">{item.supportingPage}</td>
                        <td className="py-3 font-mono text-[10px] text-slate-400">
                          &ldquo;{item.anchorText}&rdquo;
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive SERP Simulator */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4">
              <div>
                <span className="text-[9px] font-mono bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Live SERP Simulator
                </span>
                <h3 className="text-sm font-extrabold text-white mt-2 flex items-center gap-1.5">
                  <Eye className="w-4.5 h-4.5 text-amber-400" />
                  Featured Snippet & SERP Preview Simulator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Type a SASSA query to see how our micro-data and semantic architecture optimize rich answers directly inside Google Search Results (SERPs).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Select/Type SASSA Query
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={serpQuery}
                      onChange={(e) => setSerpQuery(e.target.value)}
                      placeholder="e.g. sassa pending 30 days"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 outline-hidden font-mono text-emerald-400"
                    />
                    <button
                      onClick={() => setSerpQuery("sassa pending 30 days")}
                      className="px-3 py-2 bg-slate-800 text-xs font-bold rounded-xl hover:bg-slate-700 transition"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      "sassa status pending 30 days",
                      "child support age limit sassa",
                      "how to appeal sassa decline",
                      "sassa payment calendar 2026"
                    ].map((sample) => (
                      <button
                        key={sample}
                        onClick={() => setSerpQuery(sample)}
                        className="text-[10px] px-2 py-1 bg-slate-950 hover:bg-slate-850 rounded-lg text-slate-300 transition"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Google Snippet Live Preview */}
                <div className="bg-white text-slate-950 p-5 rounded-2xl border border-slate-100 shadow-inner space-y-3 font-sans">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-emerald-800">
                      ZA
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block leading-none">
                        SASSA Resource Platform
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        https://sassa-resource.co.za &rsaquo; status &rsaquo; pending
                      </span>
                    </div>
                  </div>

                  {/* Snippet Title */}
                  <h4 className="text-lg font-medium text-blue-800 hover:underline cursor-pointer leading-tight">
                    {serpQuery.includes("pending")
                      ? "SASSA Status Pending Code: Meanings, Causes & 30-Day Fixes"
                      : serpQuery.includes("child")
                      ? "SASSA Child Support Grant Expiry: Official Age Limit Rules"
                      : serpQuery.includes("appeal")
                      ? "SASSA Appeal Guide: How to Submit ITSAA Online Forms (2026)"
                      : "Official SASSA Payment Dates Calendar 2026 | Approved Schedule"}
                  </h4>

                  {/* Featured Snippet block or Meta Description */}
                  {serpQuery.includes("pending") ? (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-2">
                      <p className="font-extrabold text-slate-900">
                        Featured Snippet Answer:
                      </p>
                      <p className="italic leading-relaxed">
                        &ldquo;A **SASSA status pending for over 30 days** usually occurs when verification checks with Home Affairs or alternative revenue sources (UIF/SARS) take longer than expected. To resolve this, beneficiaries should verify that their personal details match their submitted ID exactly.&rdquo;
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {serpQuery.includes("child")
                        ? "The SASSA Child Support Grant ends exactly on the last day of the month your child turns 18 years old. Read the official criteria, asset thresholds, and extensions here."
                        : serpQuery.includes("appeal")
                        ? "Unemployed or declined by SASSA? Submit your formal appeal directly to the Independent Tribunal (ITSAA) within 90 days. Use our free, dynamic timeline calculator."
                        : "Find exact payment dates for July, August, and the rest of 2026. Older Persons payout starts on July 3rd, Disability July 4th, Children July 5th."}
                    </p>
                  )}

                  {/* Interactive Schema FAQ block */}
                  <div className="border-t border-slate-100 pt-2.5 mt-2 space-y-1.5 text-[11px] text-blue-800">
                    <p className="font-semibold text-slate-400 text-[10px] uppercase tracking-wider">
                      Rich Snippet FAQ Extensions:
                    </p>
                    <div className="flex items-center gap-1 cursor-pointer hover:underline">
                      <span className="text-slate-400">Q:</span>
                      <span>How do I speed up my SASSA bank verification?</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:underline">
                      <span className="text-slate-400">Q:</span>
                      <span>What if my SASSA appeal is declined?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. INTERNAL LINKING GRAPH */}
        {activeSubTab === "linking" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Network className="w-4.5 h-4.5 text-emerald-800" />
                  Semantic Silo Internal Linking Simulator
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  How authority flows from the Parent Pillar down to child supporting nodes in our architecture
                </p>
              </div>

              {/* Linking Visualizer */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                
                {/* Silo 1 */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-3">
                  <span className="text-[10px] bg-slate-900 text-white font-mono px-2 py-0.5 rounded-full font-bold">
                    Pillar Node URL
                  </span>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-900 shadow-sm">
                    /appeals-centre
                    <span className="block text-[10px] font-mono text-emerald-800 mt-1">ITSAA Appeal Hub</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Receives top-level brand links and redirects. Channels equity downwards with structural links to related decline causes.
                  </p>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-dashed bg-slate-300"></div>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-800 font-black block">
                    &darr; Upwards-pointing breadcrumbs &darr;
                  </span>
                </div>

                {/* Silo Connections */}
                <div className="p-5 bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-2xl border border-dashed border-emerald-200/60 space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 text-center">
                    Link Flow Rule Matrix
                  </h4>
                  <div className="space-y-2.5 text-[11px] text-slate-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>Upward Links</strong>: Every supporting child page contains a canonical breadcrumb pointing back to the core pillar.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>Lateral Silo Isolation</strong>: Supporting child pages in the <em>Appeals</em> silo ONLY cross-link to relevant <em>Status Meanings</em> pages to keep authority localized.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>Tool Grounding</strong>: High-intent informational keywords link dynamically to interactive tools (e.g., &ldquo;Appeal Deadline Calculator&rdquo;) to maximize user stay-time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Supporting child pages list */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block px-1">
                    Supporting Child Nodes (Appeals Hub)
                  </span>
                  {[
                    { slug: "/appeals/uif-decline", label: "UIF Alternative Income", anchor: "SASSA UIF appeal guide" },
                    { slug: "/appeals/nsfas-decline", label: "NSFAS Decline Remedy", anchor: "NSFAS status appeal" },
                    { slug: "/appeals/bank-balance", label: "Alternative Income Source", anchor: "appeal SASSA means test" },
                    { slug: "/appeals/identity", label: "Failed ID Verification", anchor: "ID mismatch appeal" }
                  ].map((child, i) => (
                    <div key={i} className="p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-300 transition text-xs flex justify-between items-center">
                      <div>
                        <span className="font-extrabold text-slate-900 block leading-tight">{child.label}</span>
                        <span className="text-[9px] font-mono text-slate-400">{child.slug}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] bg-emerald-50 text-emerald-800 font-mono px-1.5 py-0.5 rounded-full block">
                          Anchor: &ldquo;{child.anchor}&rdquo;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 3. TECHNICAL & SCHEMA STRATEGY */}
        {activeSubTab === "technical" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Technical Best Practices */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4 lg:col-span-2">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <GitBranch className="w-4.5 h-4.5 text-emerald-800" />
                    Structured Data, Breadcrumbs & Canonical Strategy
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Programmatic SEO rules ensuring search engines index without errors
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-emerald-800" />
                      Dynamic Breadcrumbs
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Every page implements hierarchical trail schema to help crawl budget:
                    </p>
                    <code className="block p-2 bg-white rounded-lg border border-slate-100 text-[10px] font-mono text-slate-500">
                      Home &rsaquo; Status &rsaquo; Pending-30-Days
                    </code>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-emerald-800" />
                      Self-Referential Canonicals
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      To prevent duplicate penalties on trailing slash variations or tracker parameters:
                    </p>
                    <code className="block p-2 bg-white rounded-lg border border-slate-100 text-[10px] font-mono text-emerald-800">
                      &lt;link rel=&quot;canonical&quot; href=&quot;https://sassa-resource.co.za/status/pending&quot; /&gt;
                    </code>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-emerald-800" />
                      Pagination Strategy
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Static local offices are chunked into clean paginated pages of 10 records maximum with absolute `prev/next` link annotations.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-emerald-800" />
                      Discover Optimization
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      High-resolution 1200px width feature images with absolute aspect ratios to trigger Google Discover feed carousels during monthly payment cycles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Schema Output Code */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                    <Braces className="w-4 h-4 text-emerald-400" />
                    Target JSON-LD Schema
                  </h4>
                  <button
                    onClick={copySchemaToClipboard}
                    className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-emerald-300 transition font-mono font-bold"
                  >
                    {isCopied ? "Copied!" : "Copy Schema"}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  This Schema.org payload is automatically injected in the page header to gain rich result stars and FAQ accordions.
                </p>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-64 scrollbar-thin">
                  {schemaMarkup}
                </pre>
              </div>

            </div>
          </div>
        )}

        {/* 4. POLICY, EEAT & ADSENSE */}
        {activeSubTab === "policy" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* E-E-A-T Setup */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  1. Double-Layer E-E-A-T Blueprint
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Google enforces strict **Your Money Or Your Life (YMYL)** criteria for government assistance guidelines. Our policy:
                </p>
                <ul className="space-y-2 text-[11px] text-slate-500 font-sans">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5"></span>
                    <span><strong>Author Byline Verification</strong>: Every article is reviewed by a registered South African social consultant or paralegal professional with a linked LinkedIn profile.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5"></span>
                    <span><strong>Government Link Citation</strong>: Direct, outbound links to relevant Department of Social Development (DSD) government gazettes.</span>
                  </li>
                </ul>
              </div>

              {/* Adsense Compliance */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-850">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  2. AdSense & User UX Compliance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To pass AdSense audits without manual policy violations, we maintain a strict layout ratio:
                </p>
                <ul className="space-y-2 text-[11px] text-slate-500 font-sans">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5"></span>
                    <span><strong>Ad Density Caps</strong>: Ads take up less than 30% of vertical screen height. Absolutely no auto-interstitials on tools.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5"></span>
                    <span><strong>No Deceptive CTAs</strong>: Interactive tools and payment calculators have distinct borders and label headers separate from ad blocks.</span>
                  </li>
                </ul>
              </div>

              {/* Spam & Thin Content Prevention */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-700">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  3. Spam & Thin Content Defense
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Programmatic portals can risk penalties due to automatic page duplication. Our strict safeguards:
                </p>
                <ul className="space-y-2 text-[11px] text-slate-500 font-sans">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-600 mt-1.5"></span>
                    <span><strong>No Low-Value AI Templates</strong>: Every status code explanation includes unique troubleshooting steps customized for that specific error.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-600 mt-1.5"></span>
                    <span><strong>Client-Side Aggregation</strong>: Uses client-side filter trees to dynamically group local content into helpful guides.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* 5. ROLLOUT ROADMAP */}
        {activeSubTab === "roadmap" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <RefreshCw className="w-4.5 h-4.5 text-emerald-800" />
                  Topical Authority & Content Rollout Timeline
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  A 4-phase program to systematically build and sustain SEO dominance
                </p>
              </div>

              {/* Timeline Flow */}
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                
                {[
                  {
                    phase: "Phase 1: Foundation (Weeks 1-4)",
                    focus: "Launch Primary Pillars",
                    action: "Publish Payment Centre, complete the primary 8 social grant guides, and index core schemas. Connect self-referential canonical headers.",
                    kpi: "Gain indexing status for primary search terms."
                  },
                  {
                    phase: "Phase 2: Semantic Expansion (Weeks 5-8)",
                    focus: "Status Codes & ITSAA Appeal Silos",
                    action: "Generate 24 supporting articles mapping status codes. Launch the online Appeal step-by-step hub and cross-link them together.",
                    kpi: "Establish first page positions on long-tail statuses."
                  },
                  {
                    phase: "Phase 3: Interactive Superiority (Weeks 9-12)",
                    focus: "Launch 8 Diagnostic Tools",
                    action: "Connect the eligibility checker, child support expiry, and appeal calculator. Direct high-intent organic visitors into these tools to boost on-page session time to >3 minutes.",
                    kpi: "Double the CTR using rich snippet FAQs."
                  },
                  {
                    phase: "Phase 4: Hyper-Local Dominance (Weeks 13+)",
                    focus: "Office Finder & Local Regional Guides",
                    action: "Generate localized province-by-province hubs. Index local business schemas to rank for regional search intents.",
                    kpi: "Establish absolute domain dominance for SASSA queries."
                  }
                ].map((step, idx) => (
                  <div key={idx} className="relative pl-8 space-y-1.5">
                    <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-emerald-800 border-4 border-white shadow-xs"></div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">
                      {step.phase}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-950">
                      {step.focus}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed max-w-3xl">
                      {step.action}
                    </p>
                    <div className="text-[10px] bg-slate-50 rounded-lg p-2 max-w-xl font-mono text-slate-500 border border-slate-100">
                      <strong>Target KPI:</strong> {step.kpi}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        )}

        {/* 3.5. ENTERPRISE COMPONENT SYSTEM & DESIGN HUB */}
        {activeSubTab === "design" && (
          <div className="space-y-6 animate-fadeIn" id="enterprise-design-system-hub">
            
            {/* Header Banner */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <LayoutGrid className="w-4.5 h-4.5 text-emerald-800" />
                    SASSA Resource Platform Enterprise Design System
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Production-Ready Reusable UI Component Specifications, Accessibility Guidelines, and Live Interactive Sandbox
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-mono px-2.5 py-1 rounded-full font-bold">
                    WCAG AA Compliant
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded-full font-bold">
                    Responsive Framework
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-4xl font-sans">
                Below is the comprehensive, official architectural specification suite for the SASSA public assistance platform. 
                Every module is built with extreme PageSpeed optimization (static pre-rendering), responsive touch targets (min 44px on mobile), and robust accessibility protocols to serve South Africa&apos;s diverse user base. Use the directory below to explore 
                specifications, copy TypeScript props schemas, or test the live reactive states.
              </p>
            </div>

            {/* Split Explorer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Directory Sidebar */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-150 pb-2 flex items-center gap-1.5">
                    <Layers2 className="w-4 h-4 text-emerald-800" />
                    Component Library
                  </h4>
                  
                  {/* Category A: Core Atoms */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Core Atoms & Navigation
                    </span>
                    <div className="space-y-1">
                      {[
                        { id: "status-badge", name: "Status Badge" },
                        { id: "breadcrumb", name: "Breadcrumb" },
                        { id: "theme-switcher", name: "Theme Switcher" },
                        { id: "action-triggers", name: "Share / Print Actions" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedDesignComp(item.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                            selectedDesignComp === item.id
                              ? "bg-emerald-800 text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category B: Alerts */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Alerts & Callouts
                    </span>
                    <div className="space-y-1">
                      {[
                        { id: "gov-notice", name: "Government Gazette Notice" },
                        { id: "callout", name: "Callout Panel" },
                        { id: "warning-alert", name: "Warning Alert Banner" },
                        { id: "success-notice", name: "Success Alert Card" },
                        { id: "info-box", name: "Information Highlight" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedDesignComp(item.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                            selectedDesignComp === item.id
                              ? "bg-emerald-800 text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category C: SASSA Cards */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Public Assistance Cards
                    </span>
                    <div className="space-y-1">
                      {[
                        { id: "payment-card", name: "Payment Date Card" },
                        { id: "grant-card", name: "Grant Details Card" },
                        { id: "office-card", name: "SASSA Office Finder Card" },
                        { id: "province-card", name: "Province Hub Card" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedDesignComp(item.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                            selectedDesignComp === item.id
                              ? "bg-emerald-800 text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category D: Content Organizers */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Data & FAQ Organizers
                    </span>
                    <div className="space-y-1">
                      {[
                        { id: "comparison-table", name: "Side-by-Side Comparison" },
                        { id: "accordion-faq", name: "FAQ Accordion" },
                        { id: "downloads-hub", name: "Downloads Hub Checklist" },
                        { id: "related-articles", name: "Related Articles Footer" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedDesignComp(item.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                            selectedDesignComp === item.id
                              ? "bg-emerald-800 text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category E: Interactive & Utilities */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Interactive & Utility states
                    </span>
                    <div className="space-y-1">
                      {[
                        { id: "eligibility-calc", name: "Grant Eligibility Tool" },
                        { id: "timeline-tracker", name: "Milestone Timeline Tracker" },
                        { id: "empty-loading", name: "Search Results, Loading & 404" },
                        { id: "shimmer-skeletons", name: "Shimmer Loading Skeletons" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedDesignComp(item.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                            selectedDesignComp === item.id
                              ? "bg-emerald-800 text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Main Sandbox & Spec details */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 1. Live Interactive Preview Canvas */}
                <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        Reactive Preview Sandbox
                      </h4>
                      <h3 className="text-sm font-black text-slate-100 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        {selectedDesignComp.replace("-", " ").toUpperCase()} Component
                      </h3>
                    </div>
                    <span className="text-[9px] bg-slate-900 text-slate-400 font-mono px-2 py-0.5 rounded border border-slate-800 font-bold">
                      Interactive CSS Scope
                    </span>
                  </div>

                  {/* Sandbox rendering zone based on selection */}
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/60 min-h-[160px] flex items-center justify-center">
                    
                    {selectedDesignComp === "status-badge" && (
                      <div className="space-y-4 text-center">
                        <div className="inline-block px-3 py-1 rounded-full font-mono text-xs font-bold shadow-xs border transition-all duration-300 bg-slate-950 text-white" id="badge-renderer">
                          {previewBadgeStatus === "Approved" && (
                            <span className="text-emerald-400 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              Approved &bull; Paid
                            </span>
                          )}
                          {previewBadgeStatus === "Pending" && (
                            <span className="text-amber-400 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                              Pending Verification
                            </span>
                          )}
                          {previewBadgeStatus === "Declined" && (
                            <span className="text-red-400 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-red-400" />
                              Decline: Alternative Income
                            </span>
                          )}
                          {previewBadgeStatus === "Bank Verification" && (
                            <span className="text-sky-400 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                              Bank Verification Delayed
                            </span>
                          )}
                        </div>
                        {/* Selector parameters to demonstrate reactivity */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-800/40">
                          {(["Approved", "Pending", "Declined", "Bank Verification"] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => setPreviewBadgeStatus(st)}
                              className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold transition ${
                                previewBadgeStatus === st
                                  ? "bg-emerald-800 text-white"
                                  : "bg-slate-950 text-slate-400 hover:text-white"
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "breadcrumb" && (
                      <div className="w-full flex items-center justify-center font-sans">
                        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono uppercase tracking-wider bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-850">
                          <span className="hover:text-emerald-400 cursor-pointer">Home</span>
                          <ChevronRight className="w-3 h-3 text-slate-600" />
                          <span className="hover:text-emerald-400 cursor-pointer">Status Meanings</span>
                          <ChevronRight className="w-3 h-3 text-slate-600" />
                          <span className="text-slate-200 font-bold">Pending 30 Days</span>
                        </nav>
                      </div>
                    )}

                    {selectedDesignComp === "theme-switcher" && (
                      <div className="space-y-3 text-center w-full max-w-xs font-sans">
                        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-2xl border border-slate-850">
                          <span className="text-xs font-mono font-bold text-slate-400">Eye-Strain Comfort:</span>
                          <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                            {["Light", "Dark", "Contrast"].map((theme) => (
                              <button
                                key={theme}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${
                                  theme === "Dark" ? "bg-emerald-800 text-white" : "text-slate-500 hover:text-white"
                                }`}
                              >
                                {theme}
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className="text-[9px] text-slate-500 font-mono italic">Simulates high contrast mode toggle for elder accessibility</p>
                      </div>
                    )}

                    {selectedDesignComp === "action-triggers" && (
                      <div className="flex flex-wrap items-center justify-center gap-3 font-sans">
                        <button className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-850 text-slate-200 text-xs px-3.5 py-2 rounded-xl border border-slate-800 transition">
                          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Share Article</span>
                        </button>
                        <button className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-850 text-slate-200 text-xs px-3.5 py-2 rounded-xl border border-slate-800 transition">
                          <Printer className="w-3.5 h-3.5 text-amber-400" />
                          <span>Print Guide</span>
                        </button>
                        <button className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-850 text-slate-200 text-xs px-3.5 py-2 rounded-xl border border-slate-800 transition">
                          <FileDown className="w-3.5 h-3.5 text-blue-400" />
                          <span>Save PDF</span>
                        </button>
                      </div>
                    )}

                    {selectedDesignComp === "gov-notice" && (
                      <div className="w-full font-sans">
                        <div className="bg-gradient-to-r from-amber-950 to-slate-950 border-l-4 border-amber-500 p-4 rounded-r-2xl space-y-2 border-y border-r border-slate-800">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/30">
                              REPUBLIC OF SOUTH AFRICA GAZETTE
                            </span>
                            <span className="text-[9px] font-mono text-slate-400">Notice 104-2026</span>
                          </div>
                          <h4 className="text-xs font-black text-slate-100 uppercase tracking-tight">
                            Official Social Assistance Grant Payout Increment Gazette
                          </h4>
                          <p className="text-[10px] text-slate-300 leading-relaxed">
                            Pursuant to Treasury Gazette Section 14, Older Person and Disability grants are programmatically adjusted up by R20 per month to counteract current winter inflation indices. Effective 1 July 2026.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "callout" && (
                      <div className="w-full font-sans">
                        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                            <Info className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-extrabold text-slate-200">Means Test Assessment Notice</h5>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                              SASSA conducts programmatic means assessments each month. Undergoing a means assessment is normal and does not indicate application failure.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "warning-alert" && (
                      <div className="w-full font-sans">
                        <div className="bg-red-950/40 border border-red-900 p-4 rounded-2xl flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/25 flex-shrink-0 mt-0.5">
                            <ShieldAlert className="w-4 h-4 text-red-400" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-extrabold text-red-200 uppercase tracking-tight flex items-center gap-1.5">
                              ⚠️ Warning: Avoid Whatsapp Verification Scams
                            </h5>
                            <p className="text-[10px] text-red-300/80 leading-relaxed">
                              SASSA will never request your bank card PIN or full 16-digit credit number via SMS or Whatsapp. Block any numbers claiming to represent social help lines requesting financial transfers.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "success-notice" && (
                      <div className="w-full font-sans">
                        <div className="bg-emerald-950/45 border border-emerald-900 p-4 rounded-2xl flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/25 flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-extrabold text-emerald-200">SASSA Payment Status: APPROVED</h5>
                            <p className="text-[10px] text-emerald-300/80 leading-relaxed">
                              Your June payment of <strong>R530</strong> has been processed to ending bank account **3902. Transaction Reference: <code>S-9481-C</code>.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "info-box" && (
                      <div className="w-full font-sans">
                        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex gap-2.5 items-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
                          <p className="text-[10px] text-slate-300 leading-normal">
                            <strong>Dynamic Sync:</strong> June Payout schedules are fully updated. Next update: 28 July.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "payment-card" && (
                      <div className="w-full max-w-xs font-sans">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                          <div className="flex justify-between items-start border-b border-slate-850 pb-2.5">
                            <div>
                              <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase block tracking-wider">
                                Older Person Grant
                              </span>
                              <h5 className="text-xs font-black text-slate-100">June/July Cycles</h5>
                            </div>
                            <span className="text-xs font-black text-emerald-400 font-mono">
                              R2,180
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                            <div className="bg-slate-900 p-2 rounded-xl border border-slate-850">
                              <span className="text-[8px] text-slate-500 font-mono block">THIS MONTH</span>
                              <strong className="text-slate-200">03 June 2026</strong>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-xl border border-slate-850">
                              <span className="text-[8px] text-slate-500 font-mono block">NEXT MONTH</span>
                              <strong className="text-slate-200">02 July 2026</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "grant-card" && (
                      <div className="w-full max-w-xs font-sans">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
                          <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                            <h5 className="text-xs font-black text-slate-100">Child Support Grant</h5>
                            <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-900">
                              Age: 0 - 18
                            </span>
                          </div>
                          <div className="space-y-1.5 text-[10px]">
                            <div className="flex justify-between text-slate-400">
                              <span>Monthly Amount:</span>
                              <strong className="text-slate-200">R530</strong>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Single Parent Limit:</span>
                              <strong className="text-slate-200">R105,600 /yr</strong>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Married parent Limit:</span>
                              <strong className="text-slate-200">R211,200 /yr</strong>
                            </div>
                          </div>
                          <button className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-[10px] rounded-xl transition font-sans">
                            Run Means Test Simulator
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "office-card" && (
                      <div className="w-full max-w-sm font-sans">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
                          <div className="flex justify-between items-start border-b border-slate-850 pb-2">
                            <div>
                              <h5 className="text-xs font-black text-slate-100">Soweto Maponya Branch</h5>
                              <span className="text-[9px] text-slate-500 font-mono">GAUTENG</span>
                            </div>
                            <span className="bg-emerald-950 text-emerald-400 text-[8px] font-mono px-2 py-0.5 rounded border border-emerald-900">
                              Queue: Low Wait
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                            Maponya Mall Civic Precinct, Chris Hani Rd, Soweto.
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                            <div className="bg-slate-900 p-2 rounded-xl border border-slate-850 text-center">
                              <span className="text-slate-500 block">OPERATING HOURS</span>
                              <strong className="text-slate-200">07:30 - 16:00</strong>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-xl border border-slate-850 text-center flex items-center justify-center">
                              <strong className="text-emerald-400">♿ Wheelchair Access</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "province-card" && (
                      <div className="w-full max-w-xs font-sans">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-md">
                          <div className="flex justify-between items-center">
                            <h5 className="text-xs font-black text-slate-100 flex items-center gap-1">
                              <Map className="w-3.5 h-3.5 text-emerald-400" />
                              Western Cape Hub
                            </h5>
                            <span className="text-[9px] font-mono bg-emerald-950 border border-emerald-900 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                              42 Offices
                            </span>
                          </div>
                          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-850 text-[10px] text-slate-400 space-y-1">
                            <p>Regional Phone: <strong>021 469 0200</strong></p>
                            <p>Email: <strong>GrantsEnquiriesWC@sassa.gov.za</strong></p>
                          </div>
                          <button className="w-full py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-[10px] font-black rounded-xl transition">
                            Explore Regional Offices
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "comparison-table" && (
                      <div className="w-full font-sans overflow-x-auto scrollbar-thin">
                        <table className="w-full text-left text-[10px] border-collapse bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                          <thead>
                            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase tracking-widest font-mono text-[8px]">
                              <th className="p-2 px-3">Criteria</th>
                              <th className="p-2">Child Support</th>
                              <th className="p-2">Foster Care</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-850 text-slate-300">
                            <tr>
                              <td className="p-2 px-3 font-bold text-slate-200 bg-slate-900/20">Monthly Pay</td>
                              <td className="p-2">R530</td>
                              <td className="p-2">R1,180</td>
                            </tr>
                            <tr>
                              <td className="p-2 px-3 font-bold text-slate-200 bg-slate-900/20">Means Tested?</td>
                              <td className="p-2 text-emerald-400">Yes</td>
                              <td className="p-2 text-amber-400">No (Court Order)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}

                    {selectedDesignComp === "accordion-faq" && (
                      <div className="w-full font-sans space-y-2">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                          <button
                            onClick={() => setPreviewAccordionOpen(!previewAccordionOpen)}
                            className="w-full p-4 flex items-center justify-between text-left focus:outline-hidden hover:bg-slate-900 transition"
                          >
                            <span className="text-xs font-black text-slate-100 font-sans">
                              Can I appeal my declined SASSA status past the 90-day cut-off?
                            </span>
                            <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${previewAccordionOpen ? "rotate-180" : ""}`} />
                          </button>
                          {previewAccordionOpen && (
                            <div className="px-4 pb-4 text-[10.5px] text-slate-400 leading-relaxed border-t border-slate-850/60 pt-3 animate-fadeIn">
                              No, the Department of Social Development strictly enforces a 90-day window from the original decline announcement date. Any appeals received past midnight on Day 90 are automatically rejected by system algorithms.
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "downloads-hub" && (
                      <div className="w-full font-sans space-y-2">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                              <FileText className="w-4.5 h-4.5 text-emerald-400" />
                            </div>
                            <div>
                              <h5 className="text-xs font-black text-slate-100 leading-none">Annexure C Bank Consent Form</h5>
                              <p className="text-[9px] text-slate-500 font-mono mt-1">PDF &bull; 142 KB &bull; Verified 2026</p>
                            </div>
                          </div>
                          <button className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-emerald-400 border border-slate-800 transition">
                            <FileDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "related-articles" && (
                      <div className="w-full font-sans space-y-2">
                        <h5 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                          Keep Reading (Linked Silo)
                        </h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-2xl cursor-pointer transition">
                            <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider block">APPEALS</span>
                            <h6 className="text-[10.5px] font-bold text-slate-200 mt-1 truncate">UIF Decline Appeal Steps</h6>
                          </div>
                          <div className="p-3 bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-2xl cursor-pointer transition">
                            <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider block">ELIGIBILITY</span>
                            <h6 className="text-[10.5px] font-bold text-slate-200 mt-1 truncate">SASSA Student Allowances</h6>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "eligibility-calc" && (
                      <div className="w-full max-w-sm font-sans space-y-3">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
                          <h5 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                            <Compass className="w-4 h-4 text-emerald-400" />
                            Dynamic Caregiver Means Calculator
                          </h5>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>Marital Status:</span>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => setCalcMarried(false)}
                                  className={`px-2 py-0.5 rounded font-mono ${!calcMarried ? "bg-emerald-800 text-white" : "bg-slate-900 text-slate-500"}`}
                                >
                                  Single
                                </button>
                                <button
                                  onClick={() => setCalcMarried(true)}
                                  className={`px-2 py-0.5 rounded font-mono ${calcMarried ? "bg-emerald-800 text-white" : "bg-slate-900 text-slate-500"}`}
                                >
                                  Married
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-slate-400">
                                <span>Monthly Personal Income:</span>
                                <strong className="text-slate-200 font-mono">R{calcIncome}</strong>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="15000"
                                step="500"
                                value={calcIncome}
                                onChange={(e) => setCalcIncome(parseInt(e.target.value))}
                                className="w-full accent-emerald-500 bg-slate-900 border border-slate-800 rounded-lg"
                              />
                            </div>
                          </div>

                          {/* Dynamic client-side means test assessment */}
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 text-center">
                            <span className="text-[8px] font-mono text-slate-500 block uppercase">Means Test Outcome</span>
                            {calcIncome < (calcMarried ? 17600 : 8800) ? (
                              <strong className="text-xs text-emerald-400 font-extrabold flex items-center justify-center gap-1 mt-1 font-sans">
                                ✓ ELIGIBLE (Below Income Limit)
                              </strong>
                            ) : (
                              <strong className="text-xs text-red-400 font-extrabold flex items-center justify-center gap-1 mt-1 font-sans">
                                ✗ NOT ELIGIBLE (Exceeds Means Threshold)
                              </strong>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "timeline-tracker" && (
                      <div className="w-full font-sans">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex justify-between items-center text-[10px]">
                          <div className="flex flex-col items-center flex-1 text-center relative">
                            <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-mono flex items-center justify-center font-bold">1</span>
                            <span className="text-slate-200 font-extrabold mt-1">Submitted</span>
                            <div className="absolute top-2.5 left-1/2 w-full h-0.5 bg-emerald-800 pointer-events-none"></div>
                          </div>
                          <div className="flex flex-col items-center flex-1 text-center relative">
                            <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-mono flex items-center justify-center font-bold">2</span>
                            <span className="text-slate-200 font-extrabold mt-1">SARS Match</span>
                            <div className="absolute top-2.5 left-1/2 w-full h-0.5 bg-slate-800 pointer-events-none"></div>
                          </div>
                          <div className="flex flex-col items-center flex-1 text-center relative">
                            <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-mono flex items-center justify-center">3</span>
                            <span className="text-slate-500 mt-1">Paid</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "empty-loading" && (
                      <div className="w-full font-sans space-y-3">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center space-y-2">
                          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 mx-auto">
                            <Search className="w-5 h-5 text-slate-500" />
                          </div>
                          <div>
                            <h5 className="text-xs font-black text-slate-100">No SASSA records matched &quot;zimbabwean ID&quot;</h5>
                            <p className="text-[10px] text-slate-500 leading-relaxed max-w-xs mx-auto mt-1">
                              Social assistance is legally reserved for South African citizens, permanent residents, or refugee status holders.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDesignComp === "shimmer-skeletons" && (
                      <div className="w-full space-y-2">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 animate-pulse">
                          <div className="h-3 w-1/3 bg-slate-850 rounded-md"></div>
                          <div className="h-6 w-3/4 bg-slate-850 rounded-md"></div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-10 bg-slate-850 rounded-xl"></div>
                            <div className="h-10 bg-slate-850 rounded-xl"></div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* 2. Interactive Specifications Panel */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                      <Braces className="w-4 h-4 text-emerald-800" />
                      Engineering Specifications Sheet
                    </h4>
                    <span className="text-[9.5px] font-mono text-emerald-800 font-black">
                      ID: sassa-{selectedDesignComp}
                    </span>
                  </div>

                  {/* Purpose block */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-emerald-800 font-bold uppercase block tracking-wider">
                      Component Purpose
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {getComponentSpec(selectedDesignComp).purpose}
                    </p>
                  </div>

                  {/* TS Types / Props Code */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-emerald-800 font-bold uppercase block tracking-wider">
                      TypeScript Props Interface
                    </span>
                    <pre className="bg-slate-950 text-emerald-400 font-mono p-4 rounded-2xl text-[10.5px] overflow-x-auto border border-slate-900 scrollbar-thin">
                      {getComponentSpec(selectedDesignComp).props}
                    </pre>
                  </div>

                  {/* Quick specs grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-emerald-800 font-bold uppercase block tracking-wider">
                        Design Variants
                      </span>
                      <ul className="text-xs text-slate-600 pl-4 list-disc space-y-1 font-sans">
                        {getComponentSpec(selectedDesignComp).variants.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-emerald-800 font-bold uppercase block tracking-wider">
                        Accessibility Guidelines
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {getComponentSpec(selectedDesignComp).accessibility}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-emerald-800 font-bold uppercase block tracking-wider">
                        Responsive Behavior (Mobile / Desktop)
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {getComponentSpec(selectedDesignComp).responsive}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-emerald-800 font-bold uppercase block tracking-wider">
                        Enterprise Reuse Opportunities
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {getComponentSpec(selectedDesignComp).reuse}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1">
                    <span className="text-[9px] font-mono text-emerald-800 font-bold uppercase block tracking-wider">
                      Future Scalability Improvements
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {getComponentSpec(selectedDesignComp).future}
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* 4. ZERO-CMS CONTENT ENGINE */}
        {activeSubTab === "engine" && (
          <div className="space-y-6" id="zero-cms-engine-container">
            {/* Engine Overview Grid */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4.5 h-4.5 text-emerald-800" />
                    Zero-CMS Public Assistance Content Engine
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Declarative, static markdown pipeline optimized for PageSpeed, crawl efficiency, and strict government-ad compliance
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-mono px-2.5 py-1 rounded-full font-bold">
                    Static Pipeline: Active
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded-full font-bold">
                    No Database Queries
                  </span>
                </div>
              </div>

              {/* Theoretical Spec of the Content Engine */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[9px] font-mono text-emerald-800 font-extrabold uppercase">File Storage Schema</span>
                  <h4 className="text-xs font-black text-slate-800">1. Collections Directory</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Articles live in flat Git repositories as Markdown (<code>.md</code>). Clean directory segregation:
                  </p>
                  <code className="block p-1.5 bg-white rounded-lg border border-slate-100 text-[9px] font-mono text-slate-500">
                    /content/status-meanings/<br/>
                    /content/grant-library/<br/>
                    /content/office-finder/
                  </code>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[9px] font-mono text-emerald-800 font-extrabold uppercase">Compilation Rules</span>
                  <h4 className="text-xs font-black text-slate-800">2. Slug & Index Mapping</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Build step parses Frontmatter to register slugs, preventing route discrepancies:
                  </p>
                  <ul className="text-[9px] font-mono text-slate-400 space-y-1 pl-1">
                    <li>&bull; lowercase &amp; hyphens only</li>
                    <li>&bull; No trailing slashes</li>
                    <li>&bull; Programmatic redirects map</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[9px] font-mono text-emerald-800 font-extrabold uppercase">YMYL Safeguards</span>
                  <h4 className="text-xs font-black text-slate-800">3. EEAT Verification</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Automated build-step validations throw errors if an article does not contain professional paralegal/consultant signatures.
                  </p>
                  <span className="inline-block text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded font-mono">
                    Strict AdSense Pass
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[9px] font-mono text-emerald-800 font-extrabold uppercase">Rich Meta Generation</span>
                  <h4 className="text-xs font-black text-slate-800">4. Programmatic Star SEO</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Compiles schema markup (JSON-LD) dynamically from frontmatter arrays on page generation, matching google search console standards.
                  </p>
                  <span className="inline-block text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded font-mono">
                    100% Rich Result Match
                  </span>
                </div>
              </div>
            </div>

            {/* Playground Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Sandbox (Markdown / YAML Source) */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-mono">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      SOURCE.md (Live Sandbox Editor)
                    </h3>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5">
                      Choose a template, modify content, or tweak frontmatter variables below
                    </p>
                  </div>
                  {/* Select Template Trigger */}
                  <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-850">
                    {(["status", "grant", "office"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => handleTemplateChange(t)}
                        className={`px-2 py-1 rounded-lg text-[9px] font-bold font-mono transition uppercase ${
                          engineTemplate === t
                            ? "bg-emerald-800 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Raw Textarea Editor */}
                <div className="relative">
                  <textarea
                    value={rawMarkdownText}
                    onChange={(e) => setRawMarkdownText(e.target.value)}
                    className="w-full h-[520px] bg-slate-950 border border-slate-800 rounded-2xl p-4 text-[11px] font-mono text-emerald-400 focus:ring-1 focus:ring-emerald-500 outline-hidden resize-none scrollbar-thin"
                    placeholder="Enter raw Markdown with YAML frontmatter..."
                  />
                  <div className="absolute bottom-3 right-3 text-[9px] font-mono text-slate-600 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                    Editable Live Buffer
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] text-slate-400 font-mono space-y-1.5 font-sans">
                  <p className="font-bold text-slate-300 font-mono">💡 Playground Testing Tip:</p>
                  <p>Try making the slug uppercase, deleting the author block, or making the metadata description extremely long to see the compiler flag warnings and errors in the Validation Report tab.</p>
                </div>
              </div>

              {/* Right Compiler Workspace (Static Pre-Render Outputs) */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* View switcher tabs */}
                <div className="flex bg-white border border-slate-100 p-1.5 rounded-2xl shadow-xs gap-1">
                  {[
                    { id: "compiled", label: "Compiled Page View", icon: Eye },
                    { id: "schema", label: "Breadcrumbs, TOC & Schema", icon: GitBranch },
                    { id: "validation", label: "Validation & YMYL Report", icon: ShieldAlert }
                  ].map((v) => {
                    const Icon = v.icon;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setEngineActiveView(v.id as any)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-extrabold transition ${
                          engineActiveView === v.id
                            ? "bg-slate-900 text-white shadow-xs"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{v.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Compile Outputs Workspace Container */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex-1 min-h-[560px] flex flex-col">
                  
                  {/* VIEW A: COMPILED PAGE VIEW */}
                  {engineActiveView === "compiled" && (
                    <div className="space-y-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Automated Breadcrumb Generation */}
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                          <span className="hover:text-emerald-800 cursor-pointer">Home</span>
                          <ChevronRight className="w-3 h-3 text-slate-300" />
                          <span className="hover:text-emerald-800 cursor-pointer">
                            {activeParsedDoc.meta.category || "category"}
                          </span>
                          <ChevronRight className="w-3 h-3 text-slate-300" />
                          <span className="text-slate-600 truncate max-w-xs font-bold font-mono">
                            {activeParsedDoc.meta.id || "document"}
                          </span>
                        </div>

                        {/* Article Header Metadata */}
                        <div className="border-b border-slate-100 pb-4 space-y-2">
                          <h1 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                            {activeParsedDoc.meta.title || "Untitled Document"}
                          </h1>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              Last Updated: <strong className="text-slate-700">{activeParsedDoc.meta.lastUpdated || "N/A"}</strong>
                            </span>
                            <span>|</span>
                            <span>
                              Version: <strong className="text-emerald-800">{activeParsedDoc.meta.version || "1.0.0"}</strong>
                            </span>
                            <span>|</span>
                            <span className="text-emerald-700 font-bold">
                              {activeParsedDoc.wordCount} words ({activeParsedDoc.readingTime} min read)
                            </span>
                          </div>
                        </div>

                        {/* Live Table of Contents Sidebar/Block (Automatic Generated) */}
                        {activeParsedDoc.headings.length > 0 && (
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80">
                            <h4 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                              <Layers className="w-3.5 h-3.5 text-slate-400" />
                              Automatic Table of Contents
                            </h4>
                            <ul className="space-y-1.5 text-xs">
                              {activeParsedDoc.headings.map((h, i) => (
                                <li
                                  key={i}
                                  className={`flex items-center gap-2 hover:text-emerald-800 transition cursor-pointer text-slate-600 font-medium ${
                                    h.depth > 2 ? "pl-4 text-[11px] font-normal" : ""
                                  }`}
                                >
                                  <span className="text-emerald-600">&bull;</span>
                                  <span>{h.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Article Body Content Rendering */}
                        <div className="prose prose-slate max-w-none text-xs text-slate-700 space-y-3 leading-relaxed">
                          {activeParsedDoc.bodyText.split("\n\n").map((para, idx) => {
                            const trimmed = para.trim();
                            if (trimmed.startsWith("## ")) {
                              return (
                                <h3 key={idx} className="text-sm font-extrabold text-slate-955 pt-2 border-b border-slate-50 pb-1">
                                  {trimmed.replace("## ", "")}
                                </h3>
                              );
                            }
                            if (trimmed.startsWith("* ")) {
                              return (
                                <ul key={idx} className="list-disc pl-4 space-y-1">
                                  {trimmed.split("\n").map((item, keyIdx) => (
                                    <li key={keyIdx} className="text-slate-600">
                                      {item.replace("* ", "")}
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            if (trimmed.startsWith("1. ")) {
                              return (
                                <ol key={idx} className="list-decimal pl-4 space-y-1 font-sans">
                                  {trimmed.split("\n").map((item, keyIdx) => (
                                    <li key={keyIdx} className="text-slate-600">
                                      {item.replace(/^\d+\.\s*/, "")}
                                    </li>
                                  ))}
                                </ol>
                              );
                            }
                            if (trimmed.startsWith("# ")) return null; // title rendered in header
                            return <p key={idx} className="whitespace-pre-line font-sans">{trimmed}</p>;
                          })}
                        </div>

                        {/* Automatic FAQ Section (Extracted from Frontmatter faqs Array) */}
                        {activeParsedDoc.meta.faqs && activeParsedDoc.meta.faqs.length > 0 && (
                          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                            <h3 className="text-xs font-black text-slate-900 flex items-center gap-1 font-mono uppercase tracking-widest">
                              <HelpCircle className="w-4 h-4 text-emerald-800" />
                              Frequently Asked Questions
                            </h3>
                            <div className="space-y-2">
                              {activeParsedDoc.meta.faqs.map((faq: any, i: number) => (
                                <div key={i} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                                  <p className="font-extrabold text-xs text-slate-950 flex items-start gap-1 font-sans">
                                    <span className="text-emerald-700 font-mono">Q:</span>
                                    <span>{faq.question}</span>
                                  </p>
                                  <p className="text-[11px] text-slate-600 leading-normal pl-4 border-l-2 border-emerald-500/20 font-sans">
                                    {faq.answer}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* E-E-A-T Author & Verification Footer Block */}
                      {activeParsedDoc.meta.author?.name && (
                        <div className="mt-8 p-4 bg-slate-50/75 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center font-black text-emerald-800 border border-emerald-100 text-xs font-mono">
                              {activeParsedDoc.meta.author.name.split(" ").map((n: string) => n[0]).join("")}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-black text-slate-900 leading-none font-sans">
                                  {activeParsedDoc.meta.author.name}
                                </span>
                                {(activeParsedDoc.meta.author.verified === true || activeParsedDoc.meta.author.verified === "true") && (
                                  <span className="bg-emerald-50 text-[9px] font-mono text-emerald-800 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200/50">
                                    <Award className="w-2.5 h-2.5" />
                                    Expert Verified
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 font-sans">
                                {activeParsedDoc.meta.author.role} &bull; <span className="font-mono text-[9px] text-emerald-800">{activeParsedDoc.meta.author.credentials}</span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                              YMYL Review Signature
                            </span>
                            <span className="text-[10px] font-mono text-emerald-800 font-bold">
                              PASS (E-E-A-T Compliance)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* VIEW B: SCHEMA & BREADCRUMBS */}
                  {engineActiveView === "schema" && (
                    <div className="space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
                            <GitBranch className="w-4 h-4 text-emerald-800" />
                            1. Automated Hierarchical Breadcrumbs Schema
                          </h4>
                          <p className="text-[11px] text-slate-500 font-sans">
                            Injected into Google Rich Search results using standard BreadcrumbList structured formats.
                          </p>
                          <pre className="bg-slate-950 text-emerald-400 font-mono p-3 rounded-2xl text-[9.5px] overflow-x-auto select-all scrollbar-thin">
{`{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://sassa-resource.co.za"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "${activeParsedDoc.meta.category || "Category"}",
      "item": "https://sassa-resource.co.za/${activeParsedDoc.meta.category || ""}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "${activeParsedDoc.meta.title || "Title"}",
      "item": "https://sassa-resource.co.za${activeParsedDoc.meta.slug || ""}"
    }
  ]
}`}
                          </pre>
                        </div>

                        {/* FAQPage JSON-LD compilation */}
                        {activeParsedDoc.meta.faqs && activeParsedDoc.meta.faqs.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
                              <Braces className="w-4 h-4 text-emerald-800" />
                              2. Automated FAQPage Schema Markup
                            </h4>
                            <p className="text-[11px] text-slate-500 font-sans">
                              Generated instantly to register questions with Google Search, earning the site star listings and inline accordion widgets.
                            </p>
                            <pre className="bg-slate-950 text-emerald-400 font-mono p-3 rounded-2xl text-[9.5px] overflow-x-auto max-h-48 scrollbar-thin select-all">
{`{
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
}`}
                            </pre>
                          </div>
                        )}

                        {/* Automatic Related Content Links compilation */}
                        {activeParsedDoc.meta.relatedPages && activeParsedDoc.meta.relatedPages.length > 0 && (
                          <div className="p-4 bg-emerald-50/40 rounded-2xl border border-dashed border-emerald-200 space-y-2">
                            <h4 className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                              <Network className="w-4 h-4 text-emerald-800" />
                              3. Automatic Lateral Content Injection
                            </h4>
                            <p className="text-[10px] text-emerald-800 font-sans">
                              These collections use tag matching and relational ID clusters to automatically surface contextual lateral modules, maximizing cross-navigation link juice.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {activeParsedDoc.meta.relatedPages.map((pageId: string, idx: number) => (
                                <span key={idx} className="bg-white border border-emerald-200 text-emerald-900 font-mono text-[9px] px-2.5 py-1 rounded-lg">
                                  Linked Node ID: <strong>{pageId}</strong>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3 text-[10px] text-slate-400 font-mono">
                        💡 JSON-LD schemas are embedded directly in the static layout metadata header tags of Next.js 15 App router pages.
                      </div>
                    </div>
                  )}

                  {/* VIEW C: VALIDATION & YMYL REPORT */}
                  {engineActiveView === "validation" && (
                    <div className="space-y-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-4 font-sans">
                        <div>
                          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
                            <ShieldAlert className="w-4 h-4 text-emerald-850" />
                            Build-Time YMYL Validation Audit Report
                          </h4>
                          <p className="text-[11px] text-slate-500 font-sans">
                            Our static engine tests every markdown document during local build. If any &quot;Error&quot; is found, the build fails to prevent publishing unsafe or non-EEAT compliant articles.
                          </p>
                        </div>

                        {/* Passes list */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-emerald-800 font-bold uppercase tracking-wider block">
                            Audit Checks Passed ({activeValidationReport.passes.length})
                          </span>
                          <div className="space-y-1.5">
                            {activeValidationReport.passes.map((p, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100 font-sans">
                                <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800 flex-shrink-0 font-mono">
                                  ✓
                                </span>
                                <span>{p}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Warnings list */}
                        {activeValidationReport.warnings.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono text-amber-800 font-bold uppercase tracking-wider block">
                              Advisory Warnings ({activeValidationReport.warnings.length})
                            </span>
                            <div className="space-y-1.5 font-sans">
                              {activeValidationReport.warnings.map((w, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px] text-amber-850 bg-amber-50/40 p-2 rounded-xl border border-amber-100">
                                  <span className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-800 mt-0.5 flex-shrink-0 font-mono">
                                    !
                                  </span>
                                  <span>{w}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Errors list */}
                        {activeValidationReport.errors.length > 0 ? (
                          <div className="space-y-2 font-sans">
                            <span className="text-[9px] font-mono text-red-800 font-bold uppercase tracking-wider block">
                              Failures / Errors ({activeValidationReport.errors.length}) - BUILD BLOCKED
                            </span>
                            <div className="space-y-1.5">
                              {activeValidationReport.errors.map((e, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px] text-red-800 bg-red-50/40 p-2 rounded-xl border border-red-100">
                                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-[10px] font-bold text-red-800 mt-0.5 flex-shrink-0 font-mono">
                                    ✗
                                  </span>
                                  <strong className="font-extrabold">{e}</strong>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-emerald-950 text-emerald-300 rounded-2xl border border-emerald-800 text-xs font-mono font-bold flex items-center gap-2">
                            <span className="animate-pulse">●</span>
                            <span>Build Safety Verification: 100% Passed. Page is safe to compile and index statically!</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] text-slate-400 font-mono space-y-1.5 font-sans">
                        <p className="font-bold text-slate-300 font-mono">📈 How this blocks low-quality content:</p>
                        <p>Our <code>npm run build</code> command invokes a custom script (e.g. <code>content-lint.ts</code>) that runs this exact schema validator across all markdown files. If any file fails, the build pipeline exits with an error. This prevents low-quality, untrusted AI content drafts from ever reaching production.</p>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Enterprise Component Specifications Database Helper
function getComponentSpec(id: string) {
  const specs: Record<string, {
    purpose: string;
    props: string;
    variants: string[];
    accessibility: string;
    responsive: string;
    reuse: string;
    future: string;
  }> = {
    "status-badge": {
      purpose: "Renders standard government application outcomes with WCAG-compliant colors to avoid user confusion.",
      props: `interface StatusBadgeProps {
  status: "Pending" | "Approved" | "Declined" | "Bank Verification";
  size?: "sm" | "md";
}`,
      variants: [
        "Approved (Green) - Signifies processed payment & reference keys",
        "Pending (Amber) - Signifies queue processing or identity check",
        "Declined (Red) - Alternative income source or failed means tests",
        "Bank Verification (Blue) - Awaiting automated commercial bank matching"
      ],
      accessibility: "Achieves 4.5:1 minimum color contrast ratio. Screen-reader users hear 'Status is Approved' via visually hidden text.",
      responsive: "Compact block elements, adapts cleanly inside summary list items.",
      reuse: "Used across payment query pages, client timeline trackers, and regional search dashboards.",
      future: "Add dynamic on-hover overlay describing typical days to resolution for each status."
    },
    "breadcrumb": {
      purpose: "Renders programmatic hierarchical crumbs, guiding users and maximizing search engine index crawler crawl budgets.",
      props: `interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}`,
      variants: ["Minimal gray text links with inline custom ChevronRight separators"],
      accessibility: "Wrapped in standard <nav aria-label='Breadcrumb'>. Intermediary icons are aria-hidden to avoid screen reader clutter.",
      responsive: "Horizontally scrolls on compact viewports to prevent wrapping and broken layout margins.",
      reuse: "Placed as a universal header component on all dynamic grant guides, regional offices, and policy pages.",
      future: "Support deep JSON-LD breadcrumb schema generation dynamically in the static markup header."
    },
    "theme-switcher": {
      purpose: "Allows senior users or visually-impaired individuals to adjust high-contrast modes and contrast levels, avoiding eye fatigue.",
      props: `interface ThemeSwitcherProps {
  currentTheme: "light" | "dark" | "contrast";
  onChange: (theme: "light" | "dark" | "contrast") => void;
}`,
      variants: ["Text buttons segment", "Icon-only dropdown selector"],
      accessibility: "Adheres to aria-live, uses keyboard focus ring traps on dropdown panels, and supports screen reader label announcements.",
      responsive: "Collapses to simple icon on mobile viewports.",
      reuse: "Fixed in the primary site nav header and accessibility drawer widgets.",
      future: "Store selection in client localCookie to allow immediate CSS class swap on server-side static loading, avoiding hydration flash."
    },
    "action-triggers": {
      purpose: "Promotes social share loops, localized printing of pay dates, and offline backup storage (PDF exports) to assist families without active mobile data.",
      props: `interface ActionTriggersProps {
  articleId: string;
  title: string;
  onPrint?: () => void;
  onExportPDF?: () => void;
}`,
      variants: ["Share trigger button", "Print inline shortcut", "PDF layout download trigger"],
      accessibility: "Buttons have min 44x44px mobile touch zones. Custom title tooltips describe keyboard shortcodes.",
      responsive: "Renders in a neat vertical layout stack on mobile; shifts to horizontal flex rows on desktop screens.",
      reuse: "Universal footer utility in all Status Guides and Grant Calendars.",
      future: "Integrate native browser navigator.share() falling back to clipboard copying on legacy desktop browsers."
    },
    "gov-notice": {
      purpose: "A high-visibility gold/green notice to frame official Gazette and Treasury announcements, establishing instant E-E-A-T legitimacy.",
      props: `interface GovNoticeProps {
  gazetteId?: string;
  title: string;
  date: string;
  children: React.ReactNode;
}`,
      variants: ["Official Green Border Notice", "Alert Crimson Gazette Bulletin"],
      accessibility: "Uses role='region' with an aria-label pointing to the official gazette title.",
      responsive: "Generous inner padding on tablet/desktop, collapses margins on compact mobile devices.",
      reuse: "Header block on major legal pages, payout increases, and application checklist requirements.",
      future: "Link programmatically to the official government PDF repository via custom API lookup."
    },
    "callout": {
      purpose: "Highlights critical supplemental insights without interrupting the main editorial content flow.",
      props: `interface CalloutProps {
  title?: string;
  type?: "info" | "tip" | "caution";
  children: React.ReactNode;
}`,
      variants: ["Neutral Slate Outline", "Warm Amber Background Accent"],
      accessibility: "Maintains high contrast ratio. Uses unique icons to ensure color-blind users distinguish alert types.",
      responsive: "Fluid full-width padding adapts to sidebar layouts or central reading containers.",
      reuse: "Embedded inside policy tutorials, status guides, and office queues.",
      future: "Add expand/collapse chevron trigger for long descriptive passages."
    },
    "warning-alert": {
      purpose: "Warns users against security breaches, WhatsApp financial scams, and fraudulent third-party agencies.",
      props: `interface WarningAlertProps {
  title: string;
  message: string;
  critical?: boolean;
}`,
      variants: ["High-Contrast Red Callout", "Warning Icon Alert strip"],
      accessibility: "Renders with role='alert'. Prompts immediate screen reader notification on mounting.",
      responsive: "Highly visible border borders, ensures layout hierarchy blocks reading content.",
      reuse: "Placed on status results headers, banking change verification panels, and core portal footers.",
      future: "Support close/dismiss state mapped to persistent client-side session state."
    },
    "success-notice": {
      purpose: "Confirms positive process completions such as application checks, approved payments, and secure bank swaps.",
      props: `interface SuccessNoticeProps {
  title: string;
  message: string;
  transactionRef?: string;
}`,
      variants: ["Solid Green Banner", "Success Badge Checkbox Card"],
      accessibility: "Uses role='status' to inform assistive tech of positive state transition without interrupting focus.",
      responsive: "Adapts cleanly within narrow dashboard columns.",
      reuse: "Completed application check screens, verification confirmation tabs.",
      future: "Include dynamic confetti or subtle celebratory micro-animations when transition completes."
    },
    "info-box": {
      purpose: "Compact inline helper block detailing simple database synchronizations or small system alerts.",
      props: `interface InfoBoxProps {
  message: string;
  pulseIndicator?: boolean;
}`,
      variants: ["Simple slate line", "Pulsing green status indicator border"],
      accessibility: "Screen reader ignores pulsing indicator ring via aria-hidden, focuses solely on text message.",
      responsive: "Inline layout wrapped nicely on mobile screens.",
      reuse: "Footer and header bars on real-time tables or dynamic date cards.",
      future: "Hook up to dynamic edge-workers checking current server syncing state."
    },
    "payment-card": {
      purpose: "Presents next-month and current-month pay-out dates cleanly with clear currency amount figures.",
      props: `interface PaymentCardProps {
  grantType: string;
  amount: string;
  currentDate: string;
  nextDate: string;
}`,
      variants: ["Grid layout card", "List row indicator"],
      accessibility: "Uses large tabular numbers, ensuring visual tracking remains clean. Clear headers map logical dates.",
      responsive: "Two-column grid collapses to single columns on compact handheld screens.",
      reuse: "Homepage hero panels, payment date archive listings, regional hub widgets.",
      future: "Support native calendar invite generation (ICS files) via simple action clicks."
    },
    "grant-card": {
      purpose: "Overview card showcasing specific grants, age parameters, and monthly cash value allowances.",
      props: `interface GrantCardProps {
  name: string;
  amount: string;
  ageRange: string;
  incomeLimit: string;
}`,
      variants: ["Minimal card with border", "Gradient background theme card"],
      accessibility: "Semantic layout utilizes strong contrast. Text sizing remains readable in tight columns.",
      responsive: "Fluid widths stretch elegantly inside grid columns.",
      reuse: "Silo landing pages, grant explorer indexes.",
      future: "Render comparative mini-charts illustrating means-test limits automatically."
    },
    "office-card": {
      purpose: "Displays operating hours, exact physical address, queue state, and local telephone lines for SASSA branches.",
      props: `interface OfficeCardProps {
  name: string;
  province: string;
  address: string;
  hours: string;
  isWheelchairAccessible: boolean;
}`,
      variants: ["Standard white card with emerald accents", "List item card with expandable map block"],
      accessibility: "Telephone numbers are programmatically clickable tel: links, satisfying high mobile access requirements.",
      responsive: "Double-column specifications list collapses cleanly on small mobile viewports.",
      reuse: "Province hub page collections, office finder page results.",
      future: "Integrate approximate waiting queue prediction indexes based on weekly traffic telemetry."
    },
    "province-card": {
      purpose: "Summarizes regional distribution metrics, total local offices, and primary contact phone lines.",
      props: `interface ProvinceCardProps {
  name: string;
  officeCount: number;
  regionalPhone: string;
  regionalEmail: string;
}`,
      variants: ["Minimal outline", "Grid item card with background vector placeholder"],
      accessibility: "Interactive button has descriptive screen reader text 'Explore Western Cape SASSA Offices'.",
      responsive: "Responsive column alignments ensure clean grid layout on varying viewports.",
      reuse: "Province directory pages, main search helper hub.",
      future: "Add interactive SVG map path highlighting when hovering over corresponding province cards."
    },
    "comparison-table": {
      purpose: "Compares means limits, age requirements, and payout caps across different social grant types side-by-side.",
      props: `interface ComparisonTableProps {
  headers: string[];
  rows: { label: string; values: string[] }[];
}`,
      variants: ["Bordered comparison grid", "Scrollable data table strip"],
      accessibility: "Valid semantic HTML tags: table, thead, tbody, th, td. Column/row headings clearly mapped via scope.",
      responsive: "Table handles horizontal swipe on small screens, preventing desktop layouts from clipping.",
      reuse: "Grant Library index, student eligibility guides.",
      future: "Allow user to customize columns to compare specific user-selected grants."
    },
    "accordion-faq": {
      purpose: "Progressive disclosure element displaying deep legal and status answers without cluttering layouts.",
      props: `interface AccordionFAQProps {
  question: string;
  answer: string;
  isOpenDefault?: boolean;
}`,
      variants: ["Bordered accordion block", "Shadowless flat line accordion"],
      accessibility: "Full keyboard accessibility. Header uses aria-expanded and targets content panel via unique aria-controls id.",
      responsive: "Expands natively within page layout flows.",
      reuse: "Status Meaning templates, Grant Guides, Help centres.",
      future: "Integrate fuzzy keyword searching to automatically open relevant accordions based on search bar entries."
    },
    "downloads-hub": {
      purpose: "Lists formal application checklists, bank change forms, and affidavits with size metadata and clear download buttons.",
      props: `interface DownloadItemProps {
  title: string;
  fileSize: string;
  fileType: "PDF" | "DOCX";
  downloadUrl: string;
}`,
      variants: ["Row template checklist", "Grid box item"],
      accessibility: "Download buttons warn users of target file types and sizes. Screen-reader read-outs confirm files open in external windows.",
      responsive: "Stacking elements remain clear on small touchscreens with 44px active hit spaces.",
      reuse: "Download centre landing, individual guide attachments.",
      future: "Provide offline browser sync, allowing forms to pre-cache on local devices when on broadband Wi-Fi."
    },
    "related-articles": {
      purpose: "Injects lateral related content to keep bounce rates low and maximize programmatic internal link juice.",
      props: `interface RelatedArticlesProps {
  links: { title: string; category: string; url: string }[];
}`,
      variants: ["Silo sidebar grid", "Footer carousel columns"],
      accessibility: "Includes clear heading hierarchy (H4/H5) and clean anchor titles.",
      responsive: "Flex wrap wraps from 4 columns down to single rows automatically.",
      reuse: "Placed on the footer of all static informational articles.",
      future: "Automate relation matching based on static markdown frontmatter tag arrays."
    },
    "eligibility-calc": {
      purpose: "Static client-side tool checking user age, children counts, and monthly earnings against formal means thresholds instantly.",
      props: `interface EligibilityCalcProps {
  grantFilter?: "Child Support" | "Older Person" | "Disability";
}`,
      variants: ["Interactive wizard layout", "Compact sidebar calculator block"],
      accessibility: "Input fields utilize correct HTML5 attributes and labels. Outputs update aria-live fields instantly.",
      responsive: "Adjusts padding, using large thumb sliders to ensure easy sliding on touch devices.",
      reuse: "Eligibility center directory, grant landing modules.",
      future: "Export calculator results into a downloadable personalized checklist PDF."
    },
    "timeline-tracker": {
      purpose: "Visually tracks programmatic application milestones (Submit -> Validate -> Pay) to ease applicant anxiety.",
      props: `interface TimelineTrackerProps {
  currentStepIndex: number;
  steps: { label: string; date?: string; status: "complete" | "active" | "pending" }[];
}`,
      variants: ["Horizontal multi-dot line", "Vertical list milestone track"],
      accessibility: "Screen readers read progress as percentage 'Step 2 of 3: SARS Match Complete'.",
      responsive: "Horizontal line shifts to vertical stack on mobile viewports.",
      reuse: "Status check result panels, appeal milestone pages.",
      future: "Include dynamic color pulses on active steps with customized timeline resolution advice."
    },
    "empty-loading": {
      purpose: "Displays warm, helpful fallback pages when searches yield no matching South African database records.",
      props: `interface EmptyLoadingProps {
  title: string;
  description: string;
  suggestedAction?: { label: string; onClick: () => void };
}`,
      variants: ["Search result fallback outline", "Portal 404 block", "General database empty alert"],
      accessibility: "Focus shifts programmatically to recommended CTA buttons. Standard high color contrast applied.",
      responsive: "Centered layout ensures balanced negative space on ultra-wide or mobile screens.",
      reuse: "Search result sheets, 404 routing handlers, failed office query lists.",
      future: "Integrate a quick help feedback submission box to capture missing query keywords."
    },
    "shimmer-skeletons": {
      purpose: "Maintains high perceived performance and loading layouts on slow mobile network connections.",
      props: `interface ShimmerSkeletonsProps {
  type: "card" | "table" | "details";
  linesCount?: number;
}`,
      variants: ["Rounded card shape loader", "Tabular row grid loader"],
      accessibility: "Container features aria-busy='true' and aria-live='polite' to signal pending content updates.",
      responsive: "Skeletons perfectly mirror the responsive grid of target components.",
      reuse: "Status checks, office list results, lazy loaded layouts.",
      future: "Utilize pure CSS animations to avoid JS thread blocking on low-budget processors."
    }
  };

  return specs[id] || {
    purpose: "Not Specified",
    props: "interface GeneralProps {}",
    variants: [],
    accessibility: "Standard WCAG compliance.",
    responsive: "Responsive alignment.",
    reuse: "Universal reuse.",
    future: "General improvements."
  };
}
