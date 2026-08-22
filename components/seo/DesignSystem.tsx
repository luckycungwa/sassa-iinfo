'use client';

import { useState } from "react";
import { LayoutGrid, Sparkles, ChevronRight, Info, ShieldAlert, CheckCircle2, Search, Map, Compass, Share2, Printer, FileDown, FileText, ChevronDown, Award, Layers2, Braces } from "lucide-react";

function getComponentSpec(id: string) {
  const specs: Record<string, { purpose: string; props: string; variants: string[]; accessibility: string; responsive: string; reuse: string; future: string }> = {
    "status-badge": {
      purpose: "Renders standard government application outcomes with WCAG-compliant colors.",
      props: "interface StatusBadgeProps {\n  status: \"Pending\" | \"Approved\" | \"Declined\" | \"Bank Verification\";\n  size?: \"sm\" | \"md\";\n}",
      variants: ["Approved (Green) - Signifies processed payment", "Pending (Amber) - Queue processing or identity check", "Declined (Red) - Alternative income source", "Bank Verification (Blue) - Automated bank matching"],
      accessibility: "Achieves 4.5:1 minimum color contrast ratio.",
      responsive: "Compact block elements, adapts cleanly inside summary list items.",
      reuse: "Used across payment query pages, client timeline trackers.",
      future: "Add dynamic on-hover overlay describing typical days to resolution."
    },
    "breadcrumb": {
      purpose: "Renders programmatic hierarchical crumbs, guiding users and maximizing crawl budgets.",
      props: "interface BreadcrumbProps {\n  items: { label: string; href?: string }[];\n}",
      variants: ["Minimal gray text links with inline ChevronRight separators"],
      accessibility: "Wrapped in <nav aria-label='Breadcrumb'>. Icons are aria-hidden.",
      responsive: "Horizontally scrolls on compact viewports.",
      reuse: "Universal header component on all dynamic grant guides.",
      future: "Support deep JSON-LD breadcrumb schema generation."
    },
    "theme-switcher": {
      purpose: "Allows senior users to adjust high-contrast modes.",
      props: "interface ThemeSwitcherProps {\n  currentTheme: \"light\" | \"dark\" | \"contrast\";\n  onChange: (theme: \"light\" | \"dark\" | \"contrast\") => void;\n}",
      variants: ["Text buttons segment", "Icon-only dropdown selector"],
      accessibility: "Adheres to aria-live, uses keyboard focus ring traps.",
      responsive: "Collapses to simple icon on mobile viewports.",
      reuse: "Fixed in the primary site nav header.",
      future: "Store selection in localStorage to avoid hydration flash."
    },
    "action-triggers": {
      purpose: "Promotes social share loops, localized printing, and offline PDF exports.",
      props: "interface ActionTriggersProps {\n  articleId: string;\n  title: string;\n  onPrint?: () => void;\n  onExportPDF?: () => void;\n}",
      variants: ["Share trigger button", "Print inline shortcut", "PDF download trigger"],
      accessibility: "Buttons have min 44x44px mobile touch zones.",
      responsive: "Vertical stack on mobile; horizontal flex rows on desktop.",
      reuse: "Universal footer utility in all Status Guides.",
      future: "Integrate native navigator.share() API."
    },
    "gov-notice": {
      purpose: "High-visibility notice to frame official Gazette announcements.",
      props: "interface GovNoticeProps {\n  gazetteId?: string;\n  title: string;\n  date: string;\n  children: React.ReactNode;\n}",
      variants: ["Official Green Border Notice", "Alert Crimson Gazette Bulletin"],
      accessibility: "Uses role='region' with aria-label.",
      responsive: "Generous inner padding on tablet/desktop.",
      reuse: "Header block on major legal pages and payout increases.",
      future: "Link programmatically to official government PDF repository."
    },
    "callout": {
      purpose: "Highlights critical supplemental insights without interrupting content flow.",
      props: "interface CalloutProps {\n  title?: string;\n  type?: \"info\" | \"tip\" | \"caution\";\n  children: React.ReactNode;\n}",
      variants: ["Neutral Slate Outline", "Warm Amber Background Accent"],
      accessibility: "Maintains high contrast ratio. Uses unique icons.",
      responsive: "Fluid full-width padding adapts to layouts.",
      reuse: "Embedded inside policy tutorials and status guides.",
      future: "Add expand/collapse chevron for long passages."
    },
    "warning-alert": {
      purpose: "Warns users against security breaches and WhatsApp scams.",
      props: "interface WarningAlertProps {\n  title: string;\n  message: string;\n  critical?: boolean;\n}",
      variants: ["High-Contrast Red Callout", "Warning Icon Alert strip"],
      accessibility: "Renders with role='alert' for immediate screen reader notification.",
      responsive: "Highly visible borders ensure layout hierarchy.",
      reuse: "Placed on status results headers and banking verification panels.",
      future: "Support close/dismiss state mapped to session state."
    },
    "success-notice": {
      purpose: "Confirms positive process completions such as approved payments.",
      props: "interface SuccessNoticeProps {\n  title: string;\n  message: string;\n  transactionRef?: string;\n}",
      variants: ["Solid Green Banner", "Success Badge Checkbox Card"],
      accessibility: "Uses role='status' for assistive tech.",
      responsive: "Adapts cleanly within narrow dashboard columns.",
      reuse: "Completed application check screens.",
      future: "Include subtle celebratory micro-animations."
    },
    "info-box": {
      purpose: "Compact inline helper block for small system alerts.",
      props: "interface InfoBoxProps {\n  message: string;\n  pulseIndicator?: boolean;\n}",
      variants: ["Simple slate line", "Pulsing green status indicator"],
      accessibility: "Screen reader ignores pulsing indicator via aria-hidden.",
      responsive: "Inline layout wraps nicely on mobile.",
      reuse: "Footer and header bars on real-time tables.",
      future: "Hook up to edge-workers checking server syncing state."
    },
    "payment-card": {
      purpose: "Presents next/current month payout dates with currency amount figures.",
      props: "interface PaymentCardProps {\n  grantType: string;\n  amount: string;\n  currentDate: string;\n  nextDate: string;\n}",
      variants: ["Grid layout card", "List row indicator"],
      accessibility: "Uses large tabular numbers, clear headers.",
      responsive: "Two-column grid collapses to single on mobile.",
      reuse: "Homepage hero panels, payment date archive listings.",
      future: "Support native calendar invite generation (ICS files)."
    },
    "grant-card": {
      purpose: "Overview card showcasing specific grants and monthly cash value allowances.",
      props: "interface GrantCardProps {\n  name: string;\n  amount: string;\n  ageRange: string;\n  incomeLimit: string;\n}",
      variants: ["Minimal card with border", "Gradient background theme card"],
      accessibility: "Semantic layout with strong contrast.",
      responsive: "Fluid widths stretch inside grid columns.",
      reuse: "Silo landing pages, grant explorer indexes.",
      future: "Render comparative mini-charts for means-test limits."
    },
    "office-card": {
      purpose: "Displays operating hours, address, queue state, and phone lines.",
      props: "interface OfficeCardProps {\n  name: string;\n  province: string;\n  address: string;\n  hours: string;\n  isWheelchairAccessible: boolean;\n}",
      variants: ["Standard white card", "List item with expandable map"],
      accessibility: "Telephone numbers are clickable tel: links.",
      responsive: "Double-column collapses on mobile.",
      reuse: "Province hub page collections, office finder.",
      future: "Integrate waiting queue prediction indexes."
    },
    "province-card": {
      purpose: "Summarizes regional distribution metrics and local offices.",
      props: "interface ProvinceCardProps {\n  name: string;\n  officeCount: number;\n  regionalPhone: string;\n  regionalEmail: string;\n}",
      variants: ["Minimal outline", "Grid item with background vector"],
      accessibility: "Descriptive screen reader text for CTAs.",
      responsive: "Responsive column alignments.",
      reuse: "Province directory pages, main search hub.",
      future: "Add interactive SVG map highlighting."
    },
    "comparison-table": {
      purpose: "Compares means limits and payout caps across grant types.",
      props: "interface ComparisonTableProps {\n  headers: string[];\n  rows: { label: string; values: string[] }[];\n}",
      variants: ["Bordered comparison grid", "Scrollable data table"],
      accessibility: "Valid semantic HTML table tags with scope.",
      responsive: "Horizontal swipe on small screens.",
      reuse: "Grant Library index, student eligibility guides.",
      future: "Allow user to customize comparison columns."
    },
    "accordion-faq": {
      purpose: "Progressive disclosure for deep legal answers without clutter.",
      props: "interface AccordionFAQProps {\n  question: string;\n  answer: string;\n  isOpenDefault?: boolean;\n}",
      variants: ["Bordered accordion block", "Shadowless flat line"],
      accessibility: "Full keyboard. aria-expanded and aria-controls.",
      responsive: "Expands natively within page layout flows.",
      reuse: "Status Meaning templates, Help centres.",
      future: "Integrate fuzzy keyword search to auto-open accordions."
    },
    "downloads-hub": {
      purpose: "Lists forms with size metadata and download buttons.",
      props: "interface DownloadItemProps {\n  title: string;\n  fileSize: string;\n  fileType: \"PDF\" | \"DOCX\";\n  downloadUrl: string;\n}",
      variants: ["Row template checklist", "Grid box item"],
      accessibility: "Download buttons warn of file types and sizes.",
      responsive: "44px active hit spaces on touchscreens.",
      reuse: "Download centre landing, individual guide attachments.",
      future: "Offline browser sync for form pre-caching."
    },
    "related-articles": {
      purpose: "Injects lateral related content to lower bounce rates.",
      props: "interface RelatedArticlesProps {\n  links: { title: string; category: string; url: string }[];\n}",
      variants: ["Silo sidebar grid", "Footer carousel columns"],
      accessibility: "Clear heading hierarchy and anchor titles.",
      responsive: "Flex wrap from 4 columns to single row.",
      reuse: "Footer of all static informational articles.",
      future: "Automate relation matching via frontmatter tag arrays."
    },
    "eligibility-calc": {
      purpose: "Client-side tool checking age and income against means thresholds.",
      props: "interface EligibilityCalcProps {\n  grantFilter?: \"Child Support\" | \"Older Person\" | \"Disability\";\n}",
      variants: ["Interactive wizard layout", "Compact sidebar calculator"],
      accessibility: "Inputs use HTML5 labels. Outputs update aria-live.",
      responsive: "Large thumb sliders for easy touch interaction.",
      reuse: "Eligibility center directory, grant landing modules.",
      future: "Export results into downloadable PDF checklist."
    },
    "timeline-tracker": {
      purpose: "Visually tracks application milestones to ease anxiety.",
      props: "interface TimelineTrackerProps {\n  currentStepIndex: number;\n  steps: { label: string; date?: string; status: \"complete\" | \"active\" | \"pending\" }[];\n}",
      variants: ["Horizontal multi-dot line", "Vertical list milestone track"],
      accessibility: "Screen readers read 'Step 2 of 3: SARS Match Complete'.",
      responsive: "Horizontal shifts to vertical stack on mobile.",
      reuse: "Status check result panels, appeal milestone pages.",
      future: "Dynamic color pulses on active steps."
    },
    "empty-loading": {
      purpose: "Warm, helpful fallback pages for no-results searches.",
      props: "interface EmptyLoadingProps {\n  title: string;\n  description: string;\n  suggestedAction?: { label: string; onClick: () => void };\n}",
      variants: ["Search result fallback", "Portal 404 block", "Database empty alert"],
      accessibility: "Focus shifts to recommended CTA buttons.",
      responsive: "Centered layout on ultra-wide or mobile.",
      reuse: "Search result sheets, 404 routing handlers.",
      future: "Help feedback submission box for missing keywords."
    },
    "shimmer-skeletons": {
      purpose: "Maintains high perceived performance on slow connections.",
      props: "interface ShimmerSkeletonsProps {\n  type: \"card\" | \"table\" | \"details\";\n  linesCount?: number;\n}",
      variants: ["Rounded card shape loader", "Tabular row grid loader"],
      accessibility: "Container has aria-busy='true' and aria-live='polite'.",
      responsive: "Skeletons mirror the responsive grid of target components.",
      reuse: "Status checks, office list results, lazy loaded layouts.",
      future: "Pure CSS animations to avoid JS thread blocking."
    }
  };

  return specs[id] || { purpose: "Not Specified", props: "interface GeneralProps {}", variants: [], accessibility: "Standard WCAG compliance.", responsive: "Responsive alignment.", reuse: "Universal reuse.", future: "General improvements." };
}

export default function DesignSystem() {
  const [selectedDesignComp, setSelectedDesignComp] = useState<string>("status-badge");
  const [previewBadgeStatus, setPreviewBadgeStatus] = useState<"Pending" | "Approved" | "Declined" | "Bank Verification">("Approved");
  const [previewAccordionOpen, setPreviewAccordionOpen] = useState(false);
  const [calcMarried, setCalcMarried] = useState(false);
  const [calcIncome, setCalcIncome] = useState(4500);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-dim pb-5">
          <div>
            <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5"><LayoutGrid className="w-4.5 h-4.5 text-accent-dark" />SASSA Resource Platform Enterprise Design System</h3>
            <p className="text-xs text-outline font-mono mt-0.5">Production-Ready Reusable UI Component Specifications and Live Interactive Sandbox</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-accent-light/20 text-accent-dark font-mono px-2.5 py-1 rounded-full font-bold">WCAG AA Compliant</span>
            <span className="text-xs bg-surface-dim text-muted-foreground font-mono px-2.5 py-1 rounded-full font-bold">Responsive Framework</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-surface-dim rounded-3xl p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-black text-ink uppercase tracking-widest border-b border-slate-150 pb-2 flex items-center gap-1.5"><Layers2 className="w-4 h-4 text-accent-dark" />Component Library</h4>
            {[
              { label: "Core Atoms & Navigation", items: [
                { id: "status-badge", name: "Status Badge" }, { id: "breadcrumb", name: "Breadcrumb" },
                { id: "theme-switcher", name: "Theme Switcher" }, { id: "action-triggers", name: "Share / Print Actions" }
              ]},
              { label: "Alerts & Callouts", items: [
                { id: "gov-notice", name: "Government Gazette Notice" }, { id: "callout", name: "Callout Panel" },
                { id: "warning-alert", name: "Warning Alert Banner" }, { id: "success-notice", name: "Success Alert Card" },
                { id: "info-box", name: "Information Highlight" }
              ]},
              { label: "Public Assistance Cards", items: [
                { id: "payment-card", name: "Payment Date Card" }, { id: "grant-card", name: "Grant Details Card" },
                { id: "office-card", name: "SASSA Office Finder Card" }, { id: "province-card", name: "Province Hub Card" }
              ]},
              { label: "Data & FAQ Organizers", items: [
                { id: "comparison-table", name: "Side-by-Side Comparison" }, { id: "accordion-faq", name: "FAQ Accordion" },
                { id: "downloads-hub", name: "Downloads Hub Checklist" }, { id: "related-articles", name: "Related Articles Footer" }
              ]},
              { label: "Interactive & Utility", items: [
                { id: "eligibility-calc", name: "Grant Eligibility Tool" }, { id: "timeline-tracker", name: "Milestone Timeline Tracker" },
                { id: "empty-loading", name: "Search Results, Loading & 404" }, { id: "shimmer-skeletons", name: "Shimmer Loading Skeletons" }
              ]}
            ].map((section) => (
              <div key={section.label} className="space-y-1.5 pt-2">
                <span className="text-xs font-mono font-bold text-outline uppercase tracking-wider block">{section.label}</span>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button key={item.id} onClick={() => setSelectedDesignComp(item.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${selectedDesignComp === item.id ? "bg-accent-dark text-primary-foreground" : "text-muted-foreground hover:bg-surface hover:text-ink"}`}>
                      <span>{item.name}</span><ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-ink text-white rounded-3xl p-6 border border-ink space-y-4">
            <div className="flex items-center justify-between border-b border-ink pb-3">
              <div>
                <h4 className="text-xs font-mono font-bold text-gold uppercase tracking-widest">Reactive Preview Sandbox</h4>
                <h3 className="text-sm font-black text-surface-dim flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-gold" />{selectedDesignComp.replace("-", " ").toUpperCase()} Component</h3>
              </div>
              <span className="text-xs bg-ink text-outline font-mono px-2 py-0.5 rounded border border-ink font-bold">Interactive CSS Scope</span>
            </div>
            <div className="bg-ink p-6 rounded-2xl border border-ink/60 min-h-[160px] flex items-center justify-center">
              {selectedDesignComp === "status-badge" && (
                <div className="space-y-4 text-center">
                  <div className="inline-block px-3 py-1 rounded-full font-mono text-xs font-bold shadow-xs border transition-all duration-300 bg-ink text-white">
                    {previewBadgeStatus === "Approved" && <span className="text-gold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> Approved &bull; Paid</span>}
                    {previewBadgeStatus === "Pending" && <span className="text-amber flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber animate-pulse" /> Pending Verification</span>}
                    {previewBadgeStatus === "Declined" && <span className="text-trading-down flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-trading-down" /> Decline: Alternative Income</span>}
                    {previewBadgeStatus === "Bank Verification" && <span className="text-info flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-info animate-pulse" /> Bank Verification Delayed</span>}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-ink/40">
                    {(["Approved", "Pending", "Declined", "Bank Verification"] as const).map((st) => (
                      <button key={st} onClick={() => setPreviewBadgeStatus(st)} className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition ${previewBadgeStatus === st ? "bg-accent-dark text-primary-foreground" : "bg-ink text-outline hover:text-white"}`}>{st}</button>
                    ))}
                  </div>
                </div>
              )}
              {selectedDesignComp === "breadcrumb" && (
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-outline font-mono uppercase tracking-wider bg-ink px-4 py-2.5 rounded-xl border border-slate-850">
                  <span className="hover:text-gold cursor-pointer">Home</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <span className="hover:text-gold cursor-pointer">Status Meanings</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <span className="text-surface-container font-bold">Pending 30 Days</span>
                </nav>
              )}
              {selectedDesignComp === "theme-switcher" && (
                <div className="space-y-3 text-center w-full max-w-xs">
                  <div className="flex justify-between items-center bg-ink p-3 rounded-2xl border border-slate-850">
                    <span className="text-xs font-mono font-bold text-outline">Eye-Strain Comfort:</span>
                    <div className="flex gap-1 bg-ink p-1 rounded-xl border border-ink">
                      {["Light", "Dark", "Contrast"].map((theme) => (
                        <button key={theme} className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${theme === "Dark" ? "bg-accent-dark text-primary-foreground" : "text-surface0 hover:text-white"}`}>{theme}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "action-triggers" && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button className="flex items-center gap-1.5 bg-ink hover:bg-slate-850 text-surface-container text-xs px-3.5 py-2 rounded-xl border border-ink transition"><Share2 className="w-3.5 h-3.5 text-gold" /><span>Share Article</span></button>
                  <button className="flex items-center gap-1.5 bg-ink hover:bg-slate-850 text-surface-container text-xs px-3.5 py-2 rounded-xl border border-ink transition"><Printer className="w-3.5 h-3.5 text-amber" /><span>Print Guide</span></button>
                  <button className="flex items-center gap-1.5 bg-ink hover:bg-slate-850 text-surface-container text-xs px-3.5 py-2 rounded-xl border border-ink transition"><FileDown className="w-3.5 h-3.5 text-info" /><span>Save PDF</span></button>
                </div>
              )}
              {selectedDesignComp === "gov-notice" && (
                <div className="w-full">
                  <div className="bg-gradient-to-r from-amber/5 to-ink border-l-4 border-amber p-4 rounded-r-2xl space-y-2 border-y border-r border-ink">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono bg-amber/20 text-amber px-2 py-0.5 rounded font-bold border border-amber/30">REPUBLIC OF SOUTH AFRICA GAZETTE</span>
                      <span className="text-xs font-mono text-outline">Notice 104-2026</span>
                    </div>
                    <h4 className="text-xs font-black text-surface-dim uppercase tracking-tight">Official Social Assistance Grant Payout Increment Gazette</h4>
                    <p className="text-xs text-outline-variant leading-relaxed">Pursuant to Treasury Gazette Section 14, Older Person and Disability grants are adjusted up by R20 per month. Effective 1 July 2026.</p>
                  </div>
                </div>
              )}
              {selectedDesignComp === "callout" && (
                <div className="w-full">
                  <div className="bg-ink/80 p-4 rounded-2xl border border-ink flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent-light/200/10 flex items-center justify-center border border-accent-light/200/20 flex-shrink-0"><Info className="w-4 h-4 text-gold" /></div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-extrabold text-surface-container">Means Test Assessment Notice</h5>
                      <p className="text-xs text-outline leading-relaxed">SASSA conducts programmatic means assessments each month. This does not indicate application failure.</p>
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "warning-alert" && (
                <div className="w-full">
                  <div className="bg-trading-down/10 border border-trading-down/20 p-4 rounded-2xl flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-trading-down/10 flex items-center justify-center border border-trading-down/20 flex-shrink-0 mt-0.5"><ShieldAlert className="w-4 h-4 text-trading-down" /></div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-extrabold text-trading-down/60 uppercase tracking-tight">Warning: Avoid Whatsapp Verification Scams</h5>
                      <p className="text-xs text-trading-down/40 leading-relaxed">SASSA will never request your bank card PIN or full 16-digit number via SMS or Whatsapp.</p>
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "success-notice" && (
                <div className="w-full">
                  <div className="bg-ink/45 border border-accent-dark p-4 rounded-2xl flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-accent-light/200/10 flex items-center justify-center border border-accent-light/200/25 flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-gold" /></div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-extrabold text-accent-light">SASSA Payment Status: APPROVED</h5>
                      <p className="text-xs text-gold/80 leading-relaxed">Your June payment of <strong>R530</strong> has been processed. Transaction Ref: S-9481-C.</p>
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "info-box" && (
                <div className="w-full">
                  <div className="bg-ink border border-ink p-3.5 rounded-2xl flex gap-2.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-light/200 animate-ping flex-shrink-0" />
                    <p className="text-xs text-outline-variant leading-normal"><strong>Dynamic Sync:</strong> June Payout schedules are fully updated. Next update: 28 July.</p>
                  </div>
                </div>
              )}
              {selectedDesignComp === "payment-card" && (
                <div className="w-full max-w-xs">
                  <div className="bg-ink border border-ink rounded-2xl p-4 space-y-3 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-light/200/5 rounded-full blur-2xl"></div>
                    <div className="flex justify-between items-start border-b border-slate-850 pb-2.5">
                      <div><span className="text-xs font-mono text-gold font-bold uppercase block tracking-wider">Older Person Grant</span><h5 className="text-xs font-black text-surface-dim">June/July Cycles</h5></div>
                      <span className="text-xs font-black text-gold font-mono">R2,400</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-ink p-2 rounded-xl border border-slate-850"><span className="text-xs text-surface0 font-mono block">THIS MONTH</span><strong className="text-surface-container">03 June 2026</strong></div>
                      <div className="bg-ink p-2 rounded-xl border border-slate-850"><span className="text-xs text-surface0 font-mono block">NEXT MONTH</span><strong className="text-surface-container">02 July 2026</strong></div>
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "grant-card" && (
                <div className="w-full max-w-xs">
                  <div className="bg-ink border border-ink rounded-2xl p-4 space-y-3 shadow-md">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                      <h5 className="text-xs font-black text-surface-dim">Child Support Grant</h5>
                      <span className="text-xs bg-ink text-gold px-2 py-0.5 rounded font-mono border border-accent-dark">Age: 0 - 18</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-outline"><span>Monthly Amount:</span><strong className="text-surface-container">R580</strong></div>
                      <div className="flex justify-between text-outline"><span>Single Parent Limit:</span><strong className="text-surface-container">R105,600 /yr</strong></div>
                      <div className="flex justify-between text-outline"><span>Married parent Limit:</span><strong className="text-surface-container">R211,200 /yr</strong></div>
                    </div>
                    <button className="w-full py-1.5 bg-accent-dark hover:bg-accent-dark text-primary-foreground font-extrabold text-xs rounded-xl transition">Run Means Test Simulator</button>
                  </div>
                </div>
              )}
              {selectedDesignComp === "office-card" && (
                <div className="w-full max-w-sm">
                  <div className="bg-ink border border-ink rounded-2xl p-4 space-y-3 shadow-md">
                    <div className="flex justify-between items-start border-b border-slate-850 pb-2">
                      <div><h5 className="text-xs font-black text-surface-dim">Soweto Maponya Branch</h5><span className="text-xs text-surface0 font-mono">GAUTENG</span></div>
                      <span className="bg-ink text-gold text-xs font-mono px-2 py-0.5 rounded border border-accent-dark">Queue: Low Wait</span>
                    </div>
                    <p className="text-xs text-outline-variant leading-relaxed">Maponya Mall Civic Precinct, Chris Hani Rd, Soweto.</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-ink p-2 rounded-xl border border-slate-850 text-center"><span className="text-surface0 block">OPERATING HOURS</span><strong className="text-surface-container">07:30 - 16:00</strong></div>
                      <div className="bg-ink p-2 rounded-xl border border-slate-850 text-center flex items-center justify-center"><strong className="text-gold">♿ Wheelchair Access</strong></div>
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "province-card" && (
                <div className="w-full max-w-xs">
                  <div className="bg-ink border border-ink rounded-2xl p-4 space-y-3.5 shadow-md">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs font-black text-surface-dim flex items-center gap-1"><Map className="w-3.5 h-3.5 text-gold" /> Western Cape Hub</h5>
                      <span className="text-xs font-mono bg-ink border border-accent-dark text-gold px-2 py-0.5 rounded-full font-bold">42 Offices</span>
                    </div>
                    <div className="p-2.5 bg-ink rounded-xl border border-slate-850 text-xs text-outline space-y-1">
                      <p>Regional Phone: <strong>021 469 0200</strong></p>
                      <p>Email: <strong>GrantsEnquiriesWC@sassa.gov.za</strong></p>
                    </div>
                    <button className="w-full py-1.5 bg-ink hover:bg-slate-850 border border-ink text-surface-container text-xs font-black rounded-xl transition">Explore Regional Offices</button>
                  </div>
                </div>
              )}
              {selectedDesignComp === "comparison-table" && (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse bg-ink rounded-2xl overflow-hidden border border-ink">
                    <thead><tr className="bg-ink border-b border-ink text-outline uppercase tracking-widest font-mono text-xs"><th className="p-2 px-3">Criteria</th><th className="p-2">Child Support</th><th className="p-2">Foster Care</th></tr></thead>
                    <tbody className="divide-y divide-slate-850 text-outline-variant">
                      <tr><td className="p-2 px-3 font-bold text-surface-container bg-ink/20">Monthly Pay</td><td className="p-2">R580</td><td className="p-2">R1,295</td></tr>
                      <tr><td className="p-2 px-3 font-bold text-surface-container bg-ink/20">Means Tested?</td><td className="p-2 text-gold">Yes</td><td className="p-2 text-amber">No (Court Order)</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
              {selectedDesignComp === "accordion-faq" && (
                <div className="w-full space-y-2">
                  <div className="bg-ink border border-ink rounded-2xl overflow-hidden">
                    <button onClick={() => setPreviewAccordionOpen(!previewAccordionOpen)} className="w-full p-4 flex items-center justify-between text-left focus:outline-hidden hover:bg-ink transition">
                      <span className="text-xs font-black text-surface-dim">Can I appeal my declined SASSA status past the 90-day cut-off?</span>
                      <ChevronDown className={`w-4 h-4 text-gold transition-transform ${previewAccordionOpen ? "rotate-180" : ""}`} />
                    </button>
                    {previewAccordionOpen && (
                      <div className="px-4 pb-4 text-xs text-outline leading-relaxed border-t border-slate-850/60 pt-3 animate-fadeIn">No, the DSD strictly enforces a 90-day window from the original decline announcement date.</div>
                    )}
                  </div>
                </div>
              )}
              {selectedDesignComp === "downloads-hub" && (
                <div className="w-full space-y-2">
                  <div className="bg-ink border border-ink rounded-2xl p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center border border-ink"><FileText className="w-4.5 h-4.5 text-gold" /></div>
                      <div><h5 className="text-xs font-black text-surface-dim leading-none">Annexure C Bank Consent Form</h5><p className="text-xs text-surface0 font-mono mt-1">PDF &bull; 142 KB &bull; Verified 2026</p></div>
                    </div>
                    <button className="p-2 bg-ink hover:bg-slate-850 rounded-xl text-gold border border-ink transition"><FileDown className="w-4 h-4" /></button>
                  </div>
                </div>
              )}
              {selectedDesignComp === "related-articles" && (
                <div className="w-full space-y-2">
                  <h5 className="text-xs font-mono font-bold text-surface0 uppercase tracking-widest block mb-1">Keep Reading (Linked Silo)</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-ink border border-slate-850 hover:border-ink rounded-2xl cursor-pointer transition">
                      <span className="text-xs font-mono text-gold uppercase tracking-wider block">APPEALS</span>
                      <h6 className="text-xs font-bold text-surface-container mt-1 truncate">UIF Decline Appeal Steps</h6>
                    </div>
                    <div className="p-3 bg-ink border border-slate-850 hover:border-ink rounded-2xl cursor-pointer transition">
                      <span className="text-xs font-mono text-gold uppercase tracking-wider block">ELIGIBILITY</span>
                      <h6 className="text-xs font-bold text-surface-container mt-1 truncate">SASSA Student Allowances</h6>
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "eligibility-calc" && (
                <div className="w-full max-w-sm space-y-3">
                  <div className="bg-ink border border-ink rounded-2xl p-4 space-y-3 shadow-md">
                    <h5 className="text-xs font-black text-surface-dim flex items-center gap-1.5"><Compass className="w-4 h-4 text-gold" />Dynamic Caregiver Means Calculator</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-outline">
                        <span>Marital Status:</span>
                        <div className="flex gap-1.5">
                          <button onClick={() => setCalcMarried(false)} className={`px-2 py-0.5 rounded font-mono ${!calcMarried ? "bg-accent-dark text-primary-foreground" : "bg-ink text-surface0"}`}>Single</button>
                          <button onClick={() => setCalcMarried(true)} className={`px-2 py-0.5 rounded font-mono ${calcMarried ? "bg-accent-dark text-primary-foreground" : "bg-ink text-surface0"}`}>Married</button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-outline"><span>Monthly Personal Income:</span><strong className="text-surface-container font-mono">R{calcIncome}</strong></div>
                        <input type="range" min="0" max="15000" step="500" value={calcIncome} onChange={(e) => setCalcIncome(parseInt(e.target.value))} className="w-full accent-accent-light/200 bg-ink border border-ink rounded-lg" />
                      </div>
                    </div>
                    <div className="p-3 bg-ink rounded-xl border border-slate-850 text-center">
                      <span className="text-xs font-mono text-surface0 block uppercase">Means Test Outcome</span>
                      {calcIncome < (calcMarried ? 17600 : 8800) ? (
                        <strong className="text-xs text-gold font-extrabold flex items-center justify-center gap-1 mt-1">&#10003; ELIGIBLE (Below Income Limit)</strong>
                      ) : (
                        <strong className="text-xs text-trading-down font-extrabold flex items-center justify-center gap-1 mt-1">&#10007; NOT ELIGIBLE (Exceeds Means Threshold)</strong>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "timeline-tracker" && (
                <div className="w-full">
                  <div className="bg-ink border border-ink rounded-2xl p-4 flex justify-between items-center text-xs">
                    <div className="flex flex-col items-center flex-1 text-center relative">
                      <span className="w-5 h-5 rounded-full bg-accent-dark text-primary-foreground font-mono flex items-center justify-center font-bold">1</span>
                      <span className="text-surface-container font-extrabold mt-1">Submitted</span>
                      <div className="absolute top-2.5 left-1/2 w-full h-0.5 bg-accent-dark pointer-events-none"></div>
                    </div>
                    <div className="flex flex-col items-center flex-1 text-center relative">
                      <span className="w-5 h-5 rounded-full bg-accent-dark text-primary-foreground font-mono flex items-center justify-center font-bold">2</span>
                      <span className="text-surface-container font-extrabold mt-1">SARS Match</span>
                      <div className="absolute top-2.5 left-1/2 w-full h-0.5 bg-ink pointer-events-none"></div>
                    </div>
                    <div className="flex flex-col items-center flex-1 text-center relative">
                      <span className="w-5 h-5 rounded-full bg-ink border border-ink text-surface0 font-mono flex items-center justify-center">3</span>
                      <span className="text-surface0 mt-1">Paid</span>
                    </div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "empty-loading" && (
                <div className="w-full space-y-3">
                  <div className="bg-ink border border-ink rounded-2xl p-4 text-center space-y-2">
                    <div className="w-10 h-10 bg-ink rounded-full flex items-center justify-center border border-ink mx-auto"><Search className="w-5 h-5 text-surface0" /></div>
                    <div><h5 className="text-xs font-black text-surface-dim">No SASSA records matched &quot;zimbabwean ID&quot;</h5><p className="text-xs text-surface0 leading-relaxed max-w-xs mx-auto mt-1">Social assistance is reserved for SA citizens, permanent residents, or refugee status holders.</p></div>
                  </div>
                </div>
              )}
              {selectedDesignComp === "shimmer-skeletons" && (
                <div className="w-full space-y-2">
                  <div className="bg-ink border border-ink rounded-2xl p-4 space-y-3 animate-pulse">
                    <div className="h-3 w-1/3 bg-slate-850 rounded-md"></div>
                    <div className="h-6 w-3/4 bg-slate-850 rounded-md"></div>
                    <div className="grid grid-cols-2 gap-2"><div className="h-10 bg-slate-850 rounded-xl"></div><div className="h-10 bg-slate-850 rounded-xl"></div></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-5">
            <div className="border-b border-surface-dim pb-3 flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-ink flex items-center gap-1.5 font-mono uppercase tracking-wider"><Braces className="w-4 h-4 text-accent-dark" />Engineering Specifications Sheet</h4>
              <span className="text-xs font-mono text-accent-dark font-black">ID: sassa-{selectedDesignComp}</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-accent-dark font-bold uppercase block tracking-wider">Component Purpose</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{getComponentSpec(selectedDesignComp).purpose}</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-accent-dark font-bold uppercase block tracking-wider">TypeScript Props Interface</span>
              <pre className="bg-ink text-gold font-mono p-4 rounded-2xl text-xs overflow-x-auto border border-ink scrollbar-thin">{getComponentSpec(selectedDesignComp).props}</pre>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-surface-dim">
              <div className="space-y-1">
                <span className="text-xs font-mono text-accent-dark font-bold uppercase block tracking-wider">Design Variants</span>
                <ul className="text-xs text-muted-foreground pl-4 list-disc space-y-1">
                  {getComponentSpec(selectedDesignComp).variants.map((v, i) => <li key={i}>{v}</li>)}
                </ul>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-accent-dark font-bold uppercase block tracking-wider">Accessibility Guidelines</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{getComponentSpec(selectedDesignComp).accessibility}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-surface-dim">
              <div className="space-y-1">
                <span className="text-xs font-mono text-accent-dark font-bold uppercase block tracking-wider">Responsive Behavior</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{getComponentSpec(selectedDesignComp).responsive}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-accent-dark font-bold uppercase block tracking-wider">Enterprise Reuse</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{getComponentSpec(selectedDesignComp).reuse}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-surface-dim space-y-1">
              <span className="text-xs font-mono text-accent-dark font-bold uppercase block tracking-wider">Future Improvements</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{getComponentSpec(selectedDesignComp).future}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
