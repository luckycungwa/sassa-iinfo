'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import PageAgent from "../../components/PageAgent";
import TopNavbar from "../../components/TopNavbar";

const pageContextMap: Record<string, string> = {
  "/": "You are on the SASSA Grant Guide home page. Browse grants, status meanings, payment dates, office locations, appeal guides, eligibility checkers, and more.",
  "/payment-dates": "You are viewing the SASSA Payment Calendar page. Monthly payout schedules for all grant types including Older Persons, Disability, Children, and SRD R370.",
  "/grants": "You are viewing the Grant Library. Detailed guides for 8 social grants including Older Person, Child Support, Disability, Foster Care, Care Dependency, War Veterans, Grant-in-Aid, and SRD R370.",
  "/status": "You are viewing the Status Meaning Centre. Detailed explanations for SRD and social grant application statuses including Pending, Approved, Cancelled, Bank Verification, Alternative Income Source, and more.",
  "/appeals": "You are viewing the Appeals Centre. Guides on appealing declined SASSA grants through the Independent Tribunal for Social Assistance Appeals (ITSAA) within 90 days.",
  "/eligibility": "You are viewing the Eligibility Centre. Situation-based guides for unemployed individuals, students, seniors, and disabled persons to find matching grants.",
  "/tools": "You are viewing the Interactive Tools suite. Grant eligibility checker, payment date lookup, age calculator, appeal deadline timer, document checklist generator, and more.",
  "/offices": "You are viewing the SASSA Office Finder. Local branch information including addresses, phone numbers, operating hours, services offered, and accessibility notes.",
  "/downloads": "You are viewing the Download Centre. Official SASSA forms including grant application forms, bank consent forms, and SRD appeal templates.",
  "/provinces": "You are viewing Province Hubs. Regional information for Gauteng, Western Cape, KwaZulu-Natal, Limpopo, and other provinces with local office and collection details.",
  "/guides": "You are viewing the Guides section. Step-by-step how-to resources for navigating SASSA processes and applications.",
  "/banking": "You are viewing the Banking information page. Payment methods, bank verification processes, and how to update your payment details with SASSA.",
  "/faq": "You are viewing the Frequently Asked Questions page covering all aspects of SASSA grants, applications, appeals, and payments.",
  "/news": "You are viewing the SASSA News and Announcements page. Official updates on grant changes, payment schedules, and policy changes.",
};

function getPageContext(pathname: string): string {
  const exact = pageContextMap[pathname];
  if (exact) return exact;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length >= 2) {
    const base = pageContextMap[`/${segments[0]}`];
    if (base) return base + ` You are on a detailed page within the ${segments[0]} section.`;
  }
  return "You are on the SASSA Resource Platform. Browse grants, status meanings, payment dates, and more.";
}

function getPageTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Home";
  const label = segments[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  if (segments.length >= 2) {
    const sub = segments.slice(1).join(" ").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return `${label} — ${sub}`;
  }
  return label;
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <a href="#article-body-column" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-violet focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm">
        Skip to content
      </a>
      <TopNavbar
        isAssistantOpen={isAssistantOpen}
        onToggleAssistant={() => setIsAssistantOpen(!isAssistantOpen)}
      />

      <div className="flex-1 flex">
        <main className="flex-1 min-w-0 print:p-0">
          {children}
        </main>
      </div>

      {isAssistantOpen && (
        <PageAgent
          pageContext={getPageContext(pathname)}
          titleContext={getPageTitle(pathname)}
          onClose={() => setIsAssistantOpen(false)}
        />
      )}

      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-amber text-accent-foreground rounded-xl transition print:hidden flex items-center justify-center shadow-lg hover:bg-amber-dark"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}

      <footer className="border-t border-border mt-16 print:hidden bg-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-[2px] bg-yellow flex items-center justify-center text-accent-foreground font-black text-xs mb-1">ZA</div>
              <p className="text-sm leading-relaxed text-carbon">
                Independent SASSA grant guide. Not affiliated with SASSA or any government entity.
              </p>
              <p className="text-xs text-muted-foreground">Last verified: July 2026</p>
            </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-carbon uppercase tracking-wider">Grants</p>
                <nav className="space-y-1.5">
                  <Link href="/grants" className="block text-sm text-muted-foreground hover:text-violet transition">All Grants</Link>
                  <Link href="/grants/srd-r370-grant" className="block text-sm text-muted-foreground hover:text-violet transition">SRD R370 Grant</Link>
                  <Link href="/grants/older-person-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Older Person Grant</Link>
                  <Link href="/grants/child-support-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Child Support Grant</Link>
                  <Link href="/grants/disability-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Disability Grant</Link>
                  <Link href="/grants/foster-care-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Foster Care Grant</Link>
                  <Link href="/eligibility" className="block text-sm text-muted-foreground hover:text-violet transition">Eligibility Checker</Link>
                </nav>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-carbon uppercase tracking-wider">Status & Appeals</p>
                <nav className="space-y-1.5">
                  <Link href="/status" className="block text-sm text-muted-foreground hover:text-violet transition">Status Meanings</Link>
                  <Link href="/status/pending" className="block text-sm text-muted-foreground hover:text-violet transition">Pending Status</Link>
                  <Link href="/status/approved" className="block text-sm text-muted-foreground hover:text-violet transition">Approved Status</Link>
                  <Link href="/status/declined" className="block text-sm text-muted-foreground hover:text-violet transition">Declined Status</Link>
                  <Link href="/appeals" className="block text-sm text-muted-foreground hover:text-violet transition">Appeals Centre</Link>
                  <Link href="/appeals/how-to-appeal" className="block text-sm text-muted-foreground hover:text-violet transition">How to Appeal</Link>
                  <Link href="/appeals/appeal-timeline" className="block text-sm text-muted-foreground hover:text-violet transition">Appeal Timeline</Link>
                </nav>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-carbon uppercase tracking-wider">Resources</p>
                <nav className="space-y-1.5">
                  <Link href="/payment-dates" className="block text-sm text-muted-foreground hover:text-violet transition">Payment Dates 2026</Link>
                  <Link href="/guides" className="block text-sm text-muted-foreground hover:text-violet transition">How-To Guides</Link>
                  <Link href="/banking" className="block text-sm text-muted-foreground hover:text-violet transition">Banking Details</Link>
                  <Link href="/faq" className="block text-sm text-muted-foreground hover:text-violet transition">FAQ</Link>
                  <Link href="/tools" className="block text-sm text-muted-foreground hover:text-violet transition">Interactive Tools</Link>
                  <Link href="/downloads" className="block text-sm text-muted-foreground hover:text-violet transition">Download Forms</Link>
                  <Link href="/offices" className="block text-sm text-muted-foreground hover:text-violet transition">Office Finder</Link>
                  <Link href="/news" className="block text-sm text-muted-foreground hover:text-violet transition">News & Updates</Link>
                </nav>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-carbon uppercase tracking-wider">Company</p>
                <nav className="space-y-1.5">
                  <Link href="/about" className="block text-sm text-muted-foreground hover:text-violet transition">About</Link>
                  <Link href="/contact" className="block text-sm text-muted-foreground hover:text-violet transition">Contact</Link>
                  <Link href="/editorial-policy" className="block text-sm text-muted-foreground hover:text-violet transition">Editorial Policy</Link>
                  <Link href="/provinces" className="block text-sm text-muted-foreground hover:text-violet transition">Province Hubs</Link>
                  <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-violet transition">Privacy Policy</Link>
                  <Link href="/terms" className="block text-sm text-muted-foreground hover:text-violet transition">Terms of Service</Link>
                  <Link href="/disclaimer" className="block text-sm text-muted-foreground hover:text-violet transition">Disclaimer</Link>
                </nav>
              </div>
          </div>
          <div className="border-t border-border mt-10 pt-6 text-center">
            <p className="text-xs text-muted-foreground">&copy; 2026 SASSA Grant Guide. Built by Lucky Cungwa / 44tagstudios.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
