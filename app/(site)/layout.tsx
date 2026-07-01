'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar, BookOpen, Search, Scale, Sliders, Sparkles, MapPin, FileText,
  Compass, Briefcase, HelpCircle, Newspaper, Menu, X, ChevronRight, ShieldCheck,
} from "lucide-react";
import PageAgent from "../../components/PageAgent";
import SearchDialog from "../../components/SearchDialog";

const navItems = [
  { href: "/payment-dates", label: "Payment Dates", icon: Calendar, desc: "Payout Schedules" },
  { href: "/grants", label: "Grant Library", icon: BookOpen, desc: "Official Social Grants" },
  { href: "/status", label: "Status Meanings", icon: Search, desc: "Application Status Codes" },
  { href: "/appeals", label: "Appeals Centre", icon: Scale, desc: "ITSAA Appeal Process" },
  { href: "/eligibility", label: "Eligibility Centre", icon: Sliders, desc: "Browse by Situation" },
  { href: "/tools", label: "Interactive Tools", icon: Sparkles, desc: "Calculators & Checkers" },
  { href: "/offices", label: "Office Finder", icon: MapPin, desc: "Provincial Branches" },
  { href: "/downloads", label: "Download Centre", icon: FileText, desc: "Official Forms" },
  { href: "/provinces", label: "Province Hubs", icon: Compass, desc: "Regional Guides" },
  { href: "/guides", label: "Guides", icon: BookOpen, desc: "How-To Resources" },
  { href: "/banking", label: "Banking", icon: Briefcase, desc: "Payment Methods" },
  { href: "/faq", label: "FAQ", icon: HelpCircle, desc: "Common Questions" },
  { href: "/news", label: "News", icon: Newspaper, desc: "Official Announcements" },
];

const pageContextMap: Record<string, string> = {
  "/": "You are on the SASSA Resource Platform home page. Browse grants, status meanings, payment dates, office locations, appeal guides, eligibility checkers, and more.",
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
  const match = navItems.find((item) => pathname.startsWith(item.href) && (pathname === item.href || pathname.startsWith(item.href + "/")));
  if (match) {
    const rest = pathname.slice(match.href.length).replace(/^\/+/g, "");
    if (rest) return `${match.label} — ${rest.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`;
    return match.label;
  }
  return "Home";
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-canvas">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <header className="bg-surface border-b border-border sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm tracking-tight">
              ZA
            </div>
            <div>
              <p className="font-bold text-sm tracking-tight text-ink flex items-center gap-1.5">
                SASSA Resource Platform
                <span className="bg-accent-light text-accent-dark border border-border text-[10px] px-2 py-0.5 rounded-full font-bold font-mono">
                  Public Base
                </span>
              </p>
              <p className="text-[10px] text-muted font-mono">
                South Africa&rsquo;s Trusted Assistance Guide
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <SearchDialog />
            <button
              onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                isAssistantOpen
                  ? "bg-accent-light text-accent-dark border border-border"
                  : "bg-accent text-white hover:bg-accent-dark"
              }`}
            >
              <Sparkles className="w-4 h-4 animate-pulse-subtle" />
              <span>PageAgent AI</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-canvas border border-border rounded-lg transition md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 gap-6 min-h-[calc(100vh-4rem-6rem)]">
        <aside className="hidden md:block w-64 space-y-3 flex-shrink-0 print:hidden">
          <p className="text-[10px] font-bold text-muted font-mono tracking-wider uppercase px-2">
            Resource Directory
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition group text-left ${
                    isActive
                      ? "bg-accent text-white"
                      : "bg-surface hover:bg-canvas border border-border text-muted hover:text-ink"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-muted group-hover:text-accent"}`} />
                    <div>
                      <h4 className="text-xs font-bold tracking-tight leading-none">{item.label}</h4>
                      <p className={`text-[10px] mt-0.5 font-mono ${isActive ? "text-white/70" : "text-muted"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition ${isActive ? "text-white/70" : "opacity-0 group-hover:opacity-100 text-muted"}`} />
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 print:p-0">
          {children}
        </main>

        {isAssistantOpen && (
          <aside className="hidden lg:block w-80 flex-shrink-0 h-[calc(100vh-10rem)] sticky top-24 print:hidden">
            <PageAgent
              pageContext={getPageContext(pathname)}
              titleContext={getPageTitle(pathname)}
              onClose={() => setIsAssistantOpen(false)}
            />
          </aside>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-ink/40 z-40 md:hidden flex justify-end">
          <div className="w-72 bg-surface h-full p-6 flex flex-col justify-between animate-slide-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-accent flex items-center justify-center text-white font-bold text-[10px]">ZA</div>
                  <span className="font-bold text-xs text-ink">Directories</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-canvas border border-border rounded-lg transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive ? "bg-accent text-white font-bold" : "bg-canvas text-muted hover:bg-border"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={() => { setIsAssistantOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full bg-accent hover:bg-accent-dark text-white font-bold p-3 rounded-lg transition flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch PageAgent AI</span>
            </button>
          </div>
        </div>
      )}

      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-accent hover:bg-accent-dark text-white rounded-xl transition print:hidden flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}

      <footer className="bg-ink text-muted py-10 border-t border-border mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide">SASSA Resource Platform</h4>
            <p className="text-xs leading-relaxed">
              This platform serves as a complete static public assistance reference directory and knowledge base. All guidelines, payment dates, status codes, and calculations are compiled directly from verified social assistance frameworks in South Africa.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs font-mono uppercase tracking-wider">Independent Disclaimers</h4>
            <p className="text-xs leading-relaxed">
              This platform is an independent reference platform. We are not affiliated with SASSA, the Department of Social Development, or the South African Government. Always cross-verify critical administrative actions with official Government gazettes.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs font-mono uppercase tracking-wider">Quality Guarantees</h4>
            <div className="flex items-start gap-2 text-xs">
              <ShieldCheck className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <p>Adheres strictly to search guidelines, ensuring helpful content and maximum accessibility standards without trackers, advertisements, or cookies.</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-border text-center text-[10px] font-mono">
          <p>&copy; 2026 SASSA Resource Platform. South Africa&rsquo;s Trusted Public Assistance Hub.</p>
        </div>
      </footer>
    </div>
  );
}
