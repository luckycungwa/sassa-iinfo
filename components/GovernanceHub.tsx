'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileCode,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FolderOpen,
  Info,
  Layers,
  Database,
  RefreshCw,
  Eye,
  Sliders,
  Type,
  Maximize2,
  Lock,
  ChevronRight,
  Sparkles,
  BookOpen,
  Scale,
  Calendar,
  Code
} from "lucide-react";
import { BasePage, validateBasePage } from "../lib/schema/contentSchema";
import { DESIGN_TOKENS, COMPONENT_CONTRACTS, STORE_RECOMMENDATIONS } from "../lib/schema/designSystem";
import PageShell from "./PageShell";
import ArticleLayout from "./ArticleLayout";

// High-quality compliant mock page conforming to BasePage schema
const COMPLIANT_PAGE_TEMPLATE: BasePage = {
  id: "sassa-status-pending-guide",
  slug: "/status/pending",
  classification: "status-meaning",
  title: "SASSA Status Pending: Verification Steps & Re-approval",
  description: "A comprehensive guide on what the 'Pending' status means, why it occurs, and the direct administrative steps to take to resolve delays.",
  lastUpdated: "2026-06-29",
  version: "1.2.0",
  status: "published",
  author: {
    name: "Dr. Sibongile Ndlovu",
    role: "Social Assistance Paralegal",
    credentials: "BA Social Work, Ex-SASSA Advisor",
    verified: true
  },
  seo: {
    metaTitle: "SASSA Status Pending - How to Fix & Verify (2026)",
    metaDescription: "Is your SASSA status pending? Learn the top three causes of verification delays, bank confirmation schedules, and how to request review.",
    keywords: ["sassa pending", "sassa status check", "bank verification"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is my SASSA status showing pending?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This means SASSA has received your submission and is validating your identity via the Department of Home Affairs, and checking bank flows."
          }
        }
      ]
    }
  },
  contentBlocks: [
    {
      id: "intro-heading",
      type: "heading",
      level: 2,
      text: "Understanding the Pending Status State"
    },
    {
      id: "intro-para",
      type: "paragraph",
      text: "The 'Pending' status is the initial stage of any social grant application or monthly review cycle in South Africa. This neutral state signifies that SASSA's automated system is currently cross-referencing your personal financial details with national databases."
    },
    {
      id: "warning-callout",
      type: "callout",
      intent: "warning",
      title: "Bank Account Mismatches",
      text: "SASSA will automatically reject payments if your submitted bank account is registered under a relative's ID. The account holder's ID must match your 13-digit Smart ID card exactly."
    },
    {
      id: "pending-causes-list",
      type: "list",
      ordered: false,
      items: [
        "Unusually high volume of monthly applicant reviews.",
        "Temporary service connection drops with the Department of Labour (UIF) database.",
        "Incomplete biometric or facial verification profiles."
      ]
    }
  ]
};

// Non-compliant page template with multiple schema and guideline violations
const NON_COMPLIANT_PAGE_TEMPLATE = {
  id: "STALE_PAGE_123",
  slug: "/Grants/ChildSupportAndPensionRules ", // CAPITALIZED, trailing space, bad structure
  classification: "invalid-category-type", // Missing from union
  title: "Super-Awesome Grant Guidelines & Slogans!", // Non-literal slogan, anti-EEAT
  description: "Short.", // Too short, fails editorial descriptive rule
  lastUpdated: "2023-01-12", // Stale (pre-2026)
  version: "1.0", // Invalid semver (requires major.minor.patch)
  author: {
    name: "John Doe",
    // Missing credentials - fails E-E-A-T
    verified: false
  },
  seo: {
    metaTitle: "SASSA Child Support & Pension Guide - Super Easy Ways to Get R530 immediately with no effort!", // Fails length rule (>60), clickbait text
    metaDescription: "Click here now.", // Too short, fails 120-160 char limit
    keywords: ["sassa"]
  },
  contentBlocks: [
    {
      id: "", // Missing block ID
      type: "heading",
      level: 5, // Invalid heading level (only 1-4 allowed)
      text: "Welcome"
    },
    {
      id: "untyped-block",
      type: "mystery-block", // Fails discriminated union
      data: "Who knows what goes here"
    }
  ]
};

export default function GovernanceHub() {
  const [activeTab, setActiveTab] = useState<"schema" | "tokens" | "contracts" | "storage">("schema");
  const [schemaTemplate, setSchemaTemplate] = useState<"compliant" | "non-compliant">("compliant");
  const [validatorInput, setValidatorInput] = useState<string>(
    JSON.stringify(COMPLIANT_PAGE_TEMPLATE, null, 2)
  );
  const [selectedBlockType, setSelectedBlockType] = useState<string>("heading");
  const [validationReport, setValidationReport] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } | null>(validateBasePage(COMPLIANT_PAGE_TEMPLATE));
  const [parsedPageData, setParsedPageData] = useState<BasePage | null>(COMPLIANT_PAGE_TEMPLATE);

  const handleTemplateSelect = (type: "compliant" | "non-compliant") => {
    setSchemaTemplate(type);
    const content = type === "compliant" ? COMPLIANT_PAGE_TEMPLATE : NON_COMPLIANT_PAGE_TEMPLATE;
    setValidatorInput(JSON.stringify(content, null, 2));
    setValidationReport(null);
    setParsedPageData(null);
  };

  const runValidation = () => {
    try {
      const parsed = JSON.parse(validatorInput);
      const report = validateBasePage(parsed);
      setValidationReport(report);
      if (report.isValid) {
        setParsedPageData(parsed as BasePage);
      } else {
        setParsedPageData(null);
      }
    } catch (e: any) {
      setValidationReport({
        isValid: false,
        errors: [`JSON Syntax Error: ${e.message}. Please check for trailing commas or missing braces.`],
        warnings: []
      });
      setParsedPageData(null);
    }
  };

  return (
    <div className="space-y-6" id="governance-hub-root">
      {/* Editorial Header Banner */}
      <div className="bg-white border border-surface-dim rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-light/200/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light/20 border border-accent-light/40 text-accent-dark text-xs font-bold font-mono uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-dark" />
              Governance Hub
            </div>
            <h2 className="text-xl md:text-2xl font-black text-ink tracking-tight leading-none">
              Design System Enforcement & Content Schema Board
            </h2>
            <p className="text-xs text-surface0 leading-relaxed font-sans">
              Welcome, Architect. This dashboard defines the strict Content Schema rules and Visual Governance contracts required to maintain zero-drift architectural integrity across the platform&apos;s 5,000 static pages.
            </p>
          </div>
          <div className="flex-shrink-0 bg-surface border border-surface-dim p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-dark flex items-center justify-center text-black font-extrabold text-sm">
              G1
            </div>
            <div>
              <div className="text-xs font-bold text-outline font-mono uppercase leading-none">Version</div>
              <div className="text-xs font-black text-ink mt-0.5">v1.0.0 (Strict)</div>
              <div className="text-xs text-accent-dark font-bold mt-0.5 font-mono">STATUS: ACTIVE</div>
            </div>
          </div>
        </div>

        {/* Primary Sub Navigation Tabs */}
        <div className="flex flex-wrap gap-1 bg-surface p-1 rounded-sassa border border-border mt-6 max-w-xl">
          {[
            { id: "schema", label: "Content Schema & Validator", icon: FileCode },
            { id: "tokens", label: "Design Token Scale", icon: Sliders },
            { id: "contracts", label: "Component Contracts", icon: Scale },
            { id: "storage", label: "Folder Structure Blueprint", icon: FolderOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-bold transition ${
                  activeTab === tab.id
                    ? "bg-midnight text-surface shadow-md"
                    : "text-surface0 hover:text-midnight hover:bg-canvas"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 gap-6"
        >
          {/* TAB 1: CONTENT SCHEMA & VALIDATOR */}
          {activeTab === "schema" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Interactive Schema Visualizer (Left Column) */}
              <div className="lg:col-span-5 bg-white border border-surface-dim rounded-3xl p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold text-ink flex items-center gap-2">
                    <Layers className="w-4.5 h-4.5 text-accent-dark" />
                    Interactive Block System Schema
                  </h3>
                  <p className="text-xs text-outline font-mono mt-0.5">
                    Click a content block to view its typed schema and visual preview rules
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "heading", label: "Heading" },
                    { id: "paragraph", label: "Paragraph" },
                    { id: "list", label: "List Block" },
                    { id: "callout", label: "Callout" },
                    { id: "table", label: "Data Table" },
                    { id: "faq", label: "FAQ Block" },
                    { id: "payment", label: "Payment Dates" },
                    { id: "office", label: "Office Details" },
                    { id: "custom", label: "Custom Block" }
                  ].map((block) => (
                    <button
                      key={block.id}
                      onClick={() => setSelectedBlockType(block.id)}
                      className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition ${
                        selectedBlockType === block.id
                          ? "bg-accent-light/20 text-ink border-gold shadow-xs"
                          : "bg-surface text-muted border-surface-dim hover:bg-surface-dim"
                      }`}
                    >
                      {block.label}
                    </button>
                  ))}
                </div>

                {/* Selected Block Specification */}
                <div className="bg-surface border border-surface-dim rounded-2xl p-4 space-y-4">
                  {selectedBlockType === "heading" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;heading&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">H1 to H4</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Represents editorial title nodes. Generates clear semantic page structures, vital for accessible screen-reading and Google heading extraction algorithms.
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4;
  text: string;
}`}
                      </div>
                      {/* Live Preview block */}
                      <div className="p-3 bg-white border border-surface-container rounded-lg">
                        <span className="text-xs font-mono text-outline block mb-1">Preview (H2 Level):</span>
                        <h2 className="text-sm font-black text-ink tracking-tight">Understanding SASSA Means Testing</h2>
                      </div>
                    </>
                  )}

                  {selectedBlockType === "paragraph" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;paragraph&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">Paragraph</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Represents standard body copy. Configured with a relaxed line height and neutral color to reduce cognitive fatigue for users looking up critical assistance rules.
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface ParagraphBlock {
  type: "paragraph";
  text: string;
}`}
                      </div>
                      {/* Live Preview block */}
                      <div className="p-3 bg-white border border-surface-container rounded-lg">
                        <span className="text-xs font-mono text-outline block mb-1">Preview (Body copy):</span>
                        <p className="text-xs text-muted leading-relaxed">
                          To qualify for the Older Persons grant, your combined annual household income must remain below the strict means test threshold of R224,400.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedBlockType === "list" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;list&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">Ordered / Unordered</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Represents document checklists, application steps, or required papers. Fails validation if items are empty.
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface ListBlock {
  type: "list";
  ordered: boolean;
  items: string[];
}`}
                      </div>
                      {/* Live Preview block */}
                      <div className="p-3 bg-white border border-surface-container rounded-lg">
                        <span className="text-xs font-mono text-outline block mb-1">Preview:</span>
                        <ul className="list-disc list-inside text-xs text-muted space-y-1 pl-1">
                          <li>Original Smart Card ID document</li>
                          <li>3 months certified bank statements</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedBlockType === "callout" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;callout&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">High Contrast Notice</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Used strictly to convey critical warnings, deadlines, or legal disclaimers. Folds completely into our State Authority palettes (no generic purple alerts).
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface CalloutBlock {
  type: "callout";
  intent: "info" | "warning" | "success" | "danger";
  title?: string;
  text: string;
}`}
                      </div>
                      {/* Live Preview block */}
                      <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                          <span>Means Test Expiry</span>
                        </div>
                        <p className="text-[11px] leading-normal">
                          All means test claims must be renewed immediately if your marital status changes, to avoid payout suspension.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedBlockType === "table" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;table&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">Data Matrix</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Designed to render clean comparative grant data, means test thresholds, and age parameters. Prohibits border leakage and keeps structures flat.
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
}`}
                      </div>
                      {/* Live Preview block */}
                      <div className="bg-white border border-surface-container rounded-lg overflow-hidden">
                        <table className="w-full text-left text-[11px] border-collapse">
                          <thead className="bg-surface border-b border-surface-container font-mono">
                            <tr>
                              <th className="p-1.5 font-bold">Grant Type</th>
                              <th className="p-1.5 font-bold text-right">Limit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-surface-dim">
                              <td className="p-1.5">Single Older Person</td>
                              <td className="p-1.5 text-right font-mono text-accent-dark">R112,200/yr</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {selectedBlockType === "faq" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;faq&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">QA Accordion</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Pairs directly with JSON-LD FAQPage schemas, satisfying direct search query responses. Fails validation if answers are empty.
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface FAQBlock {
  type: "faq";
  faqs: { question: string; answer: string }[];
}`}
                      </div>
                    </>
                  )}

                  {selectedBlockType === "payment" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;payment-dates&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">Payout Grid</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Displays dynamic monthly payout schedules. Links directly to calendar rendering templates.
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface PaymentDatesBlock {
  type: "payment-dates";
  month: string;
  payouts: { category: string; date: string }[];
}`}
                      </div>
                    </>
                  )}

                  {selectedBlockType === "office" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;office-details&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">Local Finder</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Optimized for localized indexing (e.g. &quot;Soweto branch opening times&quot;). Satisfies Google Schema LocalBusiness structure statically.
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface OfficeDetailsBlock {
  type: "office-details";
  branchName: string;
  address: string;
  contactNumber: string;
}`}
                      </div>
                    </>
                  )}

                  {selectedBlockType === "custom" && (
                    <>
                      <div className="flex items-center justify-between border-b border-surface-container/50 pb-2">
                        <span className="text-xs font-mono font-black text-ink">type: &quot;custom&quot;</span>
                        <span className="text-xs font-mono text-accent-dark font-bold uppercase">Future Proof Extensibility</span>
                      </div>
                      <p className="text-xs text-surface0 leading-normal">
                        Allows developers to introduce specialized templates (interactive calculators, custom comparison matrices) without modifying or breaking the base compiler core.
                      </p>
                      <div className="bg-ink text-outline-variant p-3 rounded-lg text-xs font-mono whitespace-pre overflow-x-auto">
{`interface CustomBlock {
  type: "custom";
  customType: string;
  payload: Record<string, any>;
}`}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Dynamic Content Validator Panel (Right Column) */}
              <div className="lg:col-span-7 bg-white border border-surface-dim rounded-3xl p-6 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
                        <Database className="w-4.5 h-4.5 text-accent-dark" />
                        Dynamic Content Schema Validator
                      </h3>
                      <p className="text-xs text-outline font-mono mt-0.5">
                        Audit structured page files against YMYL and visual token parameters
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-surface p-1 border border-surface-dim rounded-xl">
                      <button
                        onClick={() => handleTemplateSelect("compliant")}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                          schemaTemplate === "compliant"
                            ? "bg-white text-accent-dark border border-surface-container/60 shadow-xs"
                            : "text-outline"
                        }`}
                      >
                        Compliant Page
                      </button>
                      <button
                        onClick={() => handleTemplateSelect("non-compliant")}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                          schemaTemplate === "non-compliant"
                            ? "bg-white text-red-800 border border-surface-container/60 shadow-xs"
                            : "text-outline"
                        }`}
                      >
                        Non-Compliant Page
                      </button>
                    </div>
                  </div>

                  {/* JSON Editor Field */}
                  <div className="relative mt-4">
                    <textarea
                      value={validatorInput}
                      onChange={(e) => setValidatorInput(e.target.value)}
                      className="w-full h-80 bg-ink text-gold font-mono text-xs p-4 rounded-2xl border border-ink focus:outline-hidden focus:ring-1 focus:ring-accent-light/200 overflow-y-auto leading-relaxed"
                    />
                    <div className="absolute bottom-3 right-3 text-xs font-mono text-surface0 bg-ink/60 px-2 py-0.5 rounded-sm">
                      JSON Template Editor
                    </div>
                  </div>
                </div>

                {/* Validation Trigger Button & Validation Results */}
                <div className="space-y-4 pt-4 border-t border-surface-dim mt-4">
                  <button
                    onClick={runValidation}
                    className="w-full bg-accent-dark hover:bg-ink text-black font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Execute Schema Validation Audit</span>
                  </button>

                  {validationReport && (
                    <div className={`p-4 rounded-2xl border ${
                      validationReport.isValid
                        ? "bg-accent-light/20 border-accent-light text-ink"
                        : "bg-red-50 border-red-200 text-red-950"
                    }`}>
                      <div className="flex items-center justify-between border-b border-surface-container/30 pb-2 mb-2">
                        <div className="flex items-center gap-2">
                          {validationReport.isValid ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-accent-dark" />
                          ) : (
                            <XCircle className="w-4.5 h-4.5 text-red-800" />
                          )}
                          <span className="text-xs font-black">
                            {validationReport.isValid
                              ? "COMPLIATION PASSED - Conforms Perfectly to Schema Guidelines"
                              : "COMPLIATION FAILED - Critical Schema Violations Found"}
                          </span>
                        </div>
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                          validationReport.isValid ? "bg-accent-light/50 text-accent-dark" : "bg-red-200/50 text-red-900"
                        }`}>
                          {validationReport.isValid ? "VERIFIED" : "REJECTED"}
                        </span>
                      </div>

                      {/* Display Errors */}
                      {validationReport.errors.length > 0 && (
                        <div className="space-y-1.5 mb-2.5">
                          <p className="text-xs font-mono font-black text-red-800 uppercase tracking-wider">
                            Critical Errors ({validationReport.errors.length}):
                          </p>
                          <ul className="space-y-1 pl-4 list-disc text-[11px] leading-relaxed">
                            {validationReport.errors.map((err, idx) => (
                              <li key={idx} className="text-red-700">{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Display Warnings */}
                      {validationReport.warnings.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-mono font-black text-amber-800 uppercase tracking-wider">
                            E-E-A-T & Quality Advisory Warnings ({validationReport.warnings.length}):
                          </p>
                          <ul className="space-y-1 pl-4 list-disc text-[11px] leading-relaxed">
                            {validationReport.warnings.map((warn, idx) => (
                              <li key={idx} className="text-amber-700">{warn}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {validationReport.isValid && (
                        <div className="space-y-3">
                          <p className="text-xs text-accent-dark leading-normal pt-1.5">
                            All root properties validated. Slug naming conventions are optimal. Content versioning strings conform to semver. Verified paralegal E-E-A-T author details are established. Title and description tags fall inside optimal organic snippets length limits (120-160 chars). Content block structures match the strict discriminated union.
                          </p>

                          {parsedPageData && (
                            <div className="mt-4 pt-4 border-t border-accent-light/50 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-ink font-bold text-xs font-mono">
                                  <Eye className="w-4 h-4 text-accent-dark" />
                                  <span>LIVE ENGINE RENDER (STRICTOR COGNITIVE COOPERATIVE)</span>
                                </div>
                                <span className="text-xs font-mono bg-accent-light/40 text-accent-dark px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  Static Compiled Ready
                                </span>
                              </div>

                              <div className="border border-surface-container rounded-2xl bg-white max-h-[420px] overflow-y-auto">
                                <PageShell 
                                  page={parsedPageData} 
                                >
                                  <ArticleLayout blocks={parsedPageData.contentBlocks} />
                                </PageShell>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN TOKEN SCALE */}
          {activeTab === "tokens" && (
            <div className="bg-white border border-surface-dim rounded-3xl p-6 space-y-8">
              <div>
                <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
                  <Sliders className="w-4.5 h-4.5 text-accent-dark" />
                  Strict Design Token System
                </h3>
                <p className="text-xs text-outline font-mono mt-0.5">
                  Our typography, borders, and spacing parameters are locked to finite scales to eliminate UI drift
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Spacing Token Board */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-surface-dim pb-2">
                    <Maximize2 className="w-4 h-4 text-accent-dark" />
                    <h4 className="text-xs font-black text-ink">Locked Spacing Scale</h4>
                  </div>
                  <p className="text-xs text-surface0 leading-normal">
                    Arbitrary margins/paddings are forbidden. Developers are prohibited from introducing custom spacing values to enforce visual rhythm.
                  </p>

                  <div className="space-y-3 pt-2">
                    {Object.entries(DESIGN_TOKENS.spacing.scale).map(([name, val]) => (
                      <div key={name} className="flex items-center justify-between text-xs font-mono">
                        <span className="w-16 font-bold text-ink">{name}</span>
                        <div className="flex-1 px-4">
                          <div
                            className="bg-accent-dark h-2.5 rounded-sm"
                            style={{ width: name === "none" ? "0px" : name === "xs" ? "8px" : name === "sm" ? "16px" : name === "md" ? "24px" : name === "lg" ? "32px" : name === "xl" ? "48px" : name === "xxl" ? "64px" : "96px" }}
                          />
                        </div>
                        <span className="w-12 text-right text-outline">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 mt-4">
                    <Info className="w-4 h-4 text-amber-800 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800 leading-relaxed font-mono">
                      <strong>Rule</strong>: {DESIGN_TOKENS.spacing.rule}
                    </p>
                  </div>
                </div>

                {/* Typography System Board */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-surface-dim pb-2">
                    <Type className="w-4 h-4 text-accent-dark" />
                    <h4 className="text-xs font-black text-ink">Typography Scale & Families</h4>
                  </div>
                  <p className="text-xs text-surface0 leading-normal">
                    To maintain editorial-first credibility, typography utilizes strict hierarchy rules. Heading elements pair custom display tracking with neutral grey text.
                  </p>

                  <div className="space-y-3.5 pt-2">
                    {[
                      { size: "display", label: "Display / Page Title (H1)", css: "text-lg md:text-xl font-black text-ink", spec: `${DESIGN_TOKENS.typography.sizes.display} - Tight Lineheight` },
                      { size: "headMajor", label: "Major Section Heading (H2)", css: "text-base font-black text-ink", spec: `${DESIGN_TOKENS.typography.sizes.headMajor} - Strict leading` },
                      { size: "headMinor", label: "Minor Subsection Heading (H3)", css: "text-sm font-bold text-ink", spec: `${DESIGN_TOKENS.typography.sizes.headMinor}` },
                      { size: "subhead", label: "Card Headers / Subguides", css: "text-xs font-bold text-ink", spec: `${DESIGN_TOKENS.typography.sizes.subhead}` },
                      { size: "body", label: "Readable Body Paragraph", css: "text-xs text-muted leading-relaxed", spec: `${DESIGN_TOKENS.typography.sizes.body} - Relaxed Lineheight (1.7)` },
                      { size: "caption", label: "Tables & Form Captions", css: "text-[11px] text-outline", spec: `${DESIGN_TOKENS.typography.sizes.caption}` },
                      { size: "meta", label: "Status Badges / Timestamps", css: "text-xs font-mono text-outline", spec: `${DESIGN_TOKENS.typography.sizes.meta} - Tech Mono` }
                    ].map((item) => (
                      <div key={item.size} className="flex items-center justify-between border-b border-surface pb-2">
                        <div>
                          <div className={item.css}>{item.label}</div>
                          <div className="text-xs text-outline mt-0.5 font-mono">Font Token: {item.size}</div>
                        </div>
                        <span className="text-xs font-mono text-outline text-right">{item.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color System and Shadow Prohibitions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-surface-dim pt-8">
                
                {/* State Authority Color Swatches */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-ink">State Authority Palette</h4>
                  <p className="text-xs text-surface0 leading-normal">
                    Derived from official administrative social security environments. Bright SaaS secondary colors are completely omitted to reinforce administrative trustworthiness.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { hex: DESIGN_TOKENS.colors.surface, label: "Surface (Primary)", desc: "Card Background Base" },
                      { hex: DESIGN_TOKENS.colors.surfaceDim, label: "Surface Dim (Sub)", desc: "Interactive States" },
                      { hex: DESIGN_TOKENS.colors.gold, label: "Payout Gold (Accent)", desc: "Calendar Schedules" },
                      { hex: DESIGN_TOKENS.colors.muted, label: "Muted (Neutral)", desc: "Secondary Body Copy" },
                      { hex: DESIGN_TOKENS.colors.states.approved, label: "Approved (Success)", desc: "Audit Pass State" },
                      { hex: DESIGN_TOKENS.colors.states.pending, label: "Pending (Notice)", desc: "Verification State" },
                      { hex: DESIGN_TOKENS.colors.states.declined, label: "Declined (Alert)", desc: "Remedy/Appeal State" },
                      { hex: "#f8fafc", label: "Off-White (Canvas)", desc: "Background Surface" }
                    ].map((c) => (
                      <div key={c.hex} className="flex items-center gap-3 p-2 border border-surface-dim rounded-xl">
                        <div
                          className="w-10 h-10 rounded-lg border border-surface-container/50 flex-shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div>
                          <div className="text-xs font-bold text-ink leading-none">{c.label}</div>
                          <div className="text-xs font-mono text-outline mt-1">{c.hex}</div>
                          <div className="text-xs text-outline">{c.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Border Systems & Shadow Restrictions */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-ink">Borders & Elevation Parameters</h4>
                  <p className="text-xs text-surface0 leading-normal">
                    This platform operates under a flat, high-contrast, tactile design layout. Elevation is created through clean background offsets and borders, never shadows.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-2xl flex items-start gap-3">
                      <Lock className="w-5 h-5 text-red-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-black uppercase">Elevation Shadow Prohibition Rule</div>
                        <p className="text-[11px] leading-normal mt-1 text-red-700">
                          {DESIGN_TOKENS.borders.shadow}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-white border border-slate-150 rounded-md text-center">
                        <div className="text-xs font-mono font-bold text-outline">Radius Sharp</div>
                        <div className="h-6 w-full border border-outline-variant mt-2 rounded-xs flex items-center justify-center text-xs font-mono text-outline">4px</div>
                      </div>
                      <div className="p-3 bg-white border border-slate-150 rounded-xl text-center">
                        <div className="text-xs font-mono font-bold text-outline">Radius Standard</div>
                        <div className="h-6 w-full border border-outline-variant mt-2 rounded-xl flex items-center justify-center text-xs font-mono text-outline">12px</div>
                      </div>
                      <div className="p-3 bg-white border border-slate-150 rounded-full text-center">
                        <div className="text-xs font-mono font-bold text-outline">Radius Pill</div>
                        <div className="h-6 w-full border border-outline-variant mt-2 rounded-full flex items-center justify-center text-xs font-mono text-outline">99px</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPONENT CONTRACTS (VALID VS INVALID) */}
          {activeTab === "contracts" && (
            <div className="bg-white border border-surface-dim rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
                  <Scale className="w-4.5 h-4.5 text-accent-dark" />
                  Visual Governance Component Contracts
                </h3>
                <p className="text-xs text-outline font-mono mt-0.5">
                  Side-by-side verification: Conforming versus Non-Conforming UI pattern implementations
                </p>
              </div>

              {/* Show Side-by-Side examples for different components */}
              <div className="space-y-10">
                
                {/* BUTTON CONTRACT */}
                <div className="border-b border-surface-dim pb-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-dark"></span>
                    <h4 className="text-xs font-black text-ink">Component: Button Contract</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Compliant Button */}
                    <div className="p-5 border border-accent-light/40 bg-accent-light/20/25 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-dark" />
                          <span className="text-xs font-black text-accent-dark uppercase tracking-wider font-mono">CONFORMING (VALID)</span>
                        </div>
                        <p className="text-xs text-surface0 leading-normal">
                          Complies with typography size limits (discrete text-xs font-bold), corner radius (rounded-xl), and state authority contrast (6.8:1 white on emerald). Fully flat with no gradients or drop shadows.
                        </p>
                      </div>

                      <div className="pt-4 flex justify-center">
                        <button className="px-4 py-2.5 bg-accent-dark hover:bg-accent-dark text-black font-bold text-xs rounded-xl transition duration-200 min-h-[44px]">
                          Submit SASSA Appeal Form
                        </button>
                      </div>
                    </div>

                    {/* Non-Compliant Button */}
                    <div className="p-5 border border-red-100 bg-red-50/25 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-red-800" />
                          <span className="text-xs font-black text-red-800 uppercase tracking-wider font-mono">NON-CONFORMING (VIOLATION)</span>
                        </div>
                        <p className="text-xs text-surface0 leading-normal">
                          Violates multiple contracts: Introduces a SaaS-style purple gradient, high-depth drop shadow, uppercase tracking-widest, and oversized text.
                        </p>
                      </div>

                      <div className="pt-4 flex justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-black text-sm uppercase tracking-widest rounded-full shadow-xl transition-all hover:-translate-y-0.5">
                          SUBMIT APPEAL NOW!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD CONTRACT */}
                <div className="border-b border-surface-dim pb-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-dark"></span>
                    <h4 className="text-xs font-black text-ink">Component: Card Contract</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Compliant Card */}
                    <div className="p-5 border border-accent-light/40 bg-accent-light/20/25 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-dark" />
                          <span className="text-xs font-black text-accent-dark uppercase tracking-wider font-mono">CONFORMING (VALID)</span>
                        </div>
                        <p className="text-xs text-surface0 leading-normal mb-4">
                          Complies with strict card boundaries. Off-white card canvas with clean, high-contrast borders separating card details from parent layout.
                        </p>
                      </div>

                      <div className="p-5 bg-white border border-surface-dim rounded-3xl text-ink">
                        <h5 className="text-xs font-black text-ink">Disability Grant</h5>
                        <p className="text-xs text-surface0 mt-1">Temporary or permanent grants for citizens aged 18 to 59.</p>
                        <div className="mt-4 flex items-center justify-between text-[11px] border-t border-surface-dim pt-3">
                          <span className="font-mono text-outline">Monthly Value</span>
                          <span className="font-bold text-accent-dark font-mono">R2,400</span>
                        </div>
                      </div>
                    </div>

                    {/* Non-Compliant Card */}
                    <div className="p-5 border border-red-100 bg-red-50/25 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-red-800" />
                          <span className="text-xs font-black text-red-800 uppercase tracking-wider font-mono">NON-CONFORMING (VIOLATION)</span>
                        </div>
                        <p className="text-xs text-surface0 leading-normal mb-4">
                          Violates shadow restrictions (uses heavy drop-shadow-lg) and layout consistency. Omits required borders, creating a floating aesthetic that violates the strict design constitution.
                        </p>
                      </div>

                      <div className="p-6 bg-white rounded-lg shadow-2xl text-ink transform hover:scale-105 transition-transform duration-300">
                        <h5 className="text-sm font-semibold text-ink">Disability Grant</h5>
                        <p className="text-xs text-surface0 mt-1">Temporary or permanent grants for citizens aged 18 to 59.</p>
                        <div className="mt-4 flex items-center justify-between text-[11px] pt-3">
                          <span className="text-outline">Monthly Value</span>
                          <span className="font-bold text-purple-600">R2,400</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STATUS BADGE CONTRACT */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-dark"></span>
                    <h4 className="text-xs font-black text-ink">Component: Status Badge Contract</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Compliant Badges */}
                    <div className="p-5 border border-accent-light/40 bg-accent-light/20/25 rounded-2xl space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-dark" />
                          <span className="text-xs font-black text-accent-dark uppercase tracking-wider font-mono">CONFORMING (VALID)</span>
                        </div>
                        <p className="text-xs text-surface0 leading-normal">
                          Strict pill format utilizing discrete state authority color codes matching the specific application outcome status.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full font-mono uppercase tracking-wide bg-accent-light/20 text-accent-dark border border-accent-light/40">
                          Approved
                        </span>
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full font-mono uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-100">
                          Pending
                        </span>
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full font-mono uppercase tracking-wide bg-red-50 text-red-800 border border-red-100">
                          Declined
                        </span>
                      </div>
                    </div>

                    {/* Non-Compliant Badges */}
                    <div className="p-5 border border-red-100 bg-red-50/25 rounded-2xl space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-red-800" />
                          <span className="text-xs font-black text-red-800 uppercase tracking-wider font-mono">NON-CONFORMING (VIOLATION)</span>
                        </div>
                        <p className="text-xs text-surface0 leading-normal">
                          Fails due to flashing animations, custom border shapes (using sharp rounded-md), and massive text that breaks context.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 items-center">
                        <span className="px-4 py-2 text-xs font-extrabold rounded-md bg-green-500 text-white animate-bounce">
                          APPROVED!
                        </span>
                        <span className="px-4 py-2 text-xs font-extrabold rounded-md bg-yellow-400 text-ink animate-pulse">
                          PENDING...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: FOLDER STRUCTURE BLUEPRINT */}
          {activeTab === "storage" && (
            <div className="bg-white border border-surface-dim rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
                  <FolderOpen className="w-4.5 h-4.5 text-accent-dark" />
                  Static-First Content Folder Structure
                </h3>
                <p className="text-xs text-outline font-mono mt-0.5">
                  Proposed repository layout for hosting the platform&apos;s 5,000+ files efficiently
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Proposed Directory Tree */}
                <div className="bg-ink text-outline-variant p-5 rounded-2xl border border-ink font-mono text-xs space-y-2 leading-relaxed">
                  <div className="text-gold font-bold">SASSA_RESOURCE_ROOT/</div>
                  <div className="pl-4 text-surface0">├── app/</div>
                  <div className="pl-4 text-surface0">├── components/</div>
                  <div className="pl-4 text-outline font-bold">├── content/  (Static Resource Repository)</div>
                  <div className="pl-8 text-accent-light/200">├── payment-dates/</div>
                  <div className="pl-12 text-outline-variant">├── 2026-07-schedule.json</div>
                  <div className="pl-12 text-outline-variant">└── 2026-08-schedule.json</div>
                  <div className="pl-8 text-accent-light/200">├── grants/</div>
                  <div className="pl-12 text-outline-variant">├── older-person-grant-rules.json</div>
                  <div className="pl-12 text-outline-variant">└── child-support-grant-rules.json</div>
                  <div className="pl-8 text-accent-light/200">├── statuses/</div>
                  <div className="pl-12 text-outline-variant">├── pending-30-days-remedy.json</div>
                  <div className="pl-12 text-outline-variant">└── bank-verification-pending.json</div>
                  <div className="pl-8 text-accent-light/200">├── offices/</div>
                  <div className="pl-12 text-outline-variant">├── soweto-branch-times.json</div>
                  <div className="pl-12 text-outline-variant">└── pretoria-branch-times.json</div>
                  <div className="pl-8 text-accent-light/200">└── provinces/</div>
                  <div className="pl-12 text-outline-variant">├── gauteng-hub-seo.json</div>
                  <div className="pl-12 text-outline-variant">└── limpopo-hub-seo.json</div>
                  <div className="pl-4 text-surface0">├── lib/</div>
                  <div className="pl-8 text-outline">└── schema/</div>
                  <div className="pl-12 text-gold">├── contentSchema.ts</div>
                  <div className="pl-12 text-gold">└── designSystem.ts</div>
                </div>

                {/* Storage Specifications & Recommendations */}
                <div className="space-y-4 text-xs text-muted leading-relaxed">
                  <div className="bg-surface p-4 rounded-xl border border-surface-dim">
                    <span className="text-xs font-mono font-bold text-outline block mb-1">FILE CONVETION LIMITS</span>
                    <p className="font-mono text-ink">
                      {STORE_RECOMMENDATIONS.fileNamingConvention}
                    </p>
                  </div>

                  <div className="bg-surface p-4 rounded-xl border border-surface-dim">
                    <span className="text-xs font-mono font-bold text-outline block mb-1">BUILD BUILD-PHASE INTEGRATION</span>
                    <p className="font-sans text-surface0 mt-1">
                      {STORE_RECOMMENDATIONS.buildIntegration}
                    </p>
                  </div>

                  {/* Schema Versioning and Migration Strategy */}
                  <div className="bg-accent-light/20/50 p-4 rounded-xl border border-emerald-150/60 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-accent-dark" />
                      <span className="text-xs font-black text-ink">Content Versioning & Migration Strategy</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-ink font-sans">
                      To prevent structural breaks across 5,000 pages when content fields change:
                    </p>
                    <ul className="list-decimal pl-4 text-xs text-muted font-sans space-y-1">
                      <li>
                        <strong>Semantic Content Versioning</strong>: Every JSON/Markdown content file carries a `version` string (e.g. &quot;1.2.0&quot;).
                      </li>
                      <li>
                        <strong>Custom Block Fallbacks</strong>: New block components are registered in the extensible `CustomBlock` payload first, allowing the compile-phase engine to ignore them safely on older renderers.
                      </li>
                      <li>
                        <strong>Mandatory CI Audit</strong>: The compile pipeline executes `validateBasePage` on every single file in `/content` before executing Next.js build-export. If any validation fails, the build breaks immediately.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
