'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  BookOpen,
  Search,
  FileText,
  Building,
  Sparkles,
  Sliders,
  Compass,
  Briefcase,
  Menu,
  X,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Scale,
  TrendingUp
} from "lucide-react";

// Import custom components
import PaymentCentre from "../components/PaymentCentre";
import GrantLibrary from "../components/GrantLibrary";
import StatusMeaningCentre from "../components/StatusMeaningCentre";
import AppealsCentre from "../components/AppealsCentre";
import EligibilityCentre from "../components/EligibilityCentre";
import InteractiveTools from "../components/InteractiveTools";
import OfficeFinder from "../components/OfficeFinder";
import DownloadCentre from "../components/DownloadCentre";
import ProvinceHubs from "../components/ProvinceHubs";
import SEODominator from "../components/SEODominator";
import PageAgent from "../components/PageAgent";
import GovernanceHub from "../components/GovernanceHub";

type TabType =
  | "payment"
  | "grants"
  | "status"
  | "appeals"
  | "eligibility"
  | "tools"
  | "offices"
  | "downloads"
  | "provinces"
  | "seo"
  | "governance";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("payment");
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define tab navigation properties
  const navigationItems = [
    { id: "payment", label: "Payment Centre", icon: Calendar, description: "Payout Schedules" },
    { id: "grants", label: "Grant Library", icon: BookOpen, description: "Official Social Grants" },
    { id: "status", label: "Status Meaning Centre", icon: Search, description: "Outcome Status Codes" },
    { id: "appeals", label: "Appeals Centre", icon: Scale, description: "ITSAA Manual Appeal" },
    { id: "eligibility", label: "Eligibility Centre", icon: Sliders, description: "Browse by Situation" },
    { id: "tools", label: "Interactive Tools", icon: Sparkles, description: "8 Diagnostic Calculators" },
    { id: "offices", label: "Office Finder", icon: MapPin, description: "Provincial Branches" },
    { id: "downloads", label: "Download Centre", icon: FileText, description: "Official SASSA Templates" },
    { id: "provinces", label: "Province Hubs", icon: Compass, description: "Regional SEO Hubs" },
    { id: "seo", label: "SEO Dominance Hub", icon: TrendingUp, description: "Topical Authority Plan" },
    { id: "governance", label: "Governance Hub", icon: ShieldCheck, description: "Token & Schema Rules" }
  ];

  // Map active tab to current semantic context text so PageAgent is fully grounded
  const getPageContextText = () => {
    switch (activeTab) {
      case "payment":
        return "You are looking at the SASSA Payment Calendar. July and August 2026 dates are released. Older Persons starts on the 3rd of July, Disability on the 4th, Children on the 5th, and SRD R370 is scheduled between 25th and 30th of July. Beneficiaries do not need to withdraw funds on day one.";
      case "grants":
        return "You are looking at the Grant Library detailing the 8 types of social grants: Older Person, Child Support, Disability, Foster Care, Care Dependency, War Veterans, Grant-in-Aid, and SRD. Each has specific means test limits, age requirements, and applications forms.";
      case "status":
        return "You are looking at the Status Meaning Centre describing the 12 outcomes of applications: Approved, Pending, Cancelled, Bank Verification, Alternative Income Source, Means Test Failed, etc. Each explains why it occurs, duration, and instructions on how to remedy it.";
      case "appeals":
        return "You are looking at the Social Grant Appeals Centre. Appeals are handled by the Independent Social Assistance Tribunal (ITSAA). You must appeal within 90 days of decline. Appeal reasons include alternative income, NSFAS status, or UIF, and require official affidavits.";
      case "eligibility":
        return "You are looking at the Eligibility Centre providing situation-based guides: I am unemployed, student, disabled, over 60, receiving UIF, receiving NSFAS, or have no bank account. These guides suggest matching grants.";
      case "tools":
        return "You are looking at the Interactive Tools Suite containing 8 diagnostic calculators: Grant Eligibility Checker, Pay Date Lookup, Age Vetting, Child Support Expiry, Appeal Deadline, Household Estimator, Document Checklist, and Comparison Matrix.";
      case "offices":
        return "You are looking at the SASSA Office Finder, listing local provincial branches, addresses, contacts, operating hours, landmarks, and wheelchair accessibility notes across Pretoria, Soweto, Cape Town, Durban, Polokwane, and Gqeberha.";
      case "downloads":
        return "You are looking at the Download Centre listing official forms: SASSA social grant application form, bank transfer consent form, and SRD appeal template. You can print these form templates dynamically.";
      case "provinces":
        return "You are looking at the Province Hubs, which contains regional information, capital, regional head office contacts, and local collection info for Gauteng, Western Cape, KwaZulu-Natal, and Limpopo.";
      case "seo":
        return "You are looking at the SEO Dominance Hub detailing South Africa's most trusted public assistance topical map, keyword clusters, linking strategies, schema models, and 4-phase rollout timeline to dominate SASSA search engine rankings.";
      case "governance":
        return "You are looking at the Design System and Schema Governance Hub. This page defines the strict content validation rules, design token scales, spacing constraints, and visual component contracts (including valid vs invalid component UI tests) to prevent design system drift.";
      default:
        return "You are looking at South Africa’s most trusted public assistance knowledge base resource portal.";
    }
  };

  const getPageTitle = () => {
    const matched = navigationItems.find((item) => item.id === activeTab);
    return matched ? matched.label : "Home";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Banner Accent */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-800 via-amber-400 to-emerald-900 w-full print:hidden"></div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-100 shadow-xs sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* South African Color Accent Circle */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-sm font-black text-sm tracking-tighter border border-emerald-900/55">
              ZA
            </div>
            <div>
              <h1 className="font-extrabold text-sm md:text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                SASSA Resource Platform
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Public Base
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium font-mono">
                South Africa’s Most Trusted Assistance Guide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                isAssistantOpen
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                  : "bg-emerald-800 text-white hover:bg-emerald-950 shadow-sm"
              }`}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>PageAgent AI</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-slate-50 border border-slate-100 rounded-xl transition md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Middle Layout Grid */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 gap-6 min-h-[calc(100vh-4rem-6rem)]">
        {/* Left Navigation Column - Desktop Only */}
        <aside className="hidden md:block w-64 space-y-3 flex-shrink-0 print:hidden">
          <p className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase px-2">
            Resource Directory
          </p>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition group text-left ${
                    activeTab === item.id
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "bg-white hover:bg-slate-50 border border-transparent hover:border-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4.5 h-4.5 ${activeTab === item.id ? "text-amber-400" : "text-slate-400 group-hover:text-emerald-800"}`} />
                    <div>
                      <h4 className="text-xs font-extrabold tracking-tight leading-none">{item.label}</h4>
                      <p className={`text-[10px] mt-0.5 font-mono ${activeTab === item.id ? "text-emerald-200" : "text-slate-400"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition ${activeTab === item.id ? "text-amber-400 opacity-100" : "opacity-0 group-hover:opacity-100 text-slate-400"}`} />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Middle Main Content Pane */}
        <main className="flex-1 min-w-0 print:p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "payment" && <PaymentCentre />}
              {activeTab === "grants" && <GrantLibrary />}
              {activeTab === "status" && <StatusMeaningCentre />}
              {activeTab === "appeals" && <AppealsCentre />}
              {activeTab === "eligibility" && (
                <EligibilityCentre onNavigateToTools={() => setActiveTab("tools")} />
              )}
              {activeTab === "tools" && <InteractiveTools />}
              {activeTab === "offices" && <OfficeFinder />}
              {activeTab === "downloads" && <DownloadCentre />}
              {activeTab === "provinces" && <ProvinceHubs />}
              {activeTab === "seo" && <SEODominator />}
              {activeTab === "governance" && <GovernanceHub />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Right PageAgent Assistant Drawer - Desktop Only */}
        {isAssistantOpen && (
          <aside className="hidden lg:block w-80 flex-shrink-0 h-[calc(100vh-10rem)] sticky top-24 print:hidden">
            <PageAgent
              pageContext={getPageContextText()}
              titleContext={getPageTitle()}
              onClose={() => setIsAssistantOpen(false)}
            />
          </aside>
        )}
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden flex justify-end">
          <div className="w-72 bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-slideIn">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-extrabold text-[10px]">ZA</div>
                  <span className="font-extrabold text-xs text-slate-900">Directories</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 hover:bg-slate-50 border border-slate-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as TabType);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${
                        activeTab === item.id
                          ? "bg-emerald-800 text-white font-bold"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Footer Assistant Trigger */}
            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-bold p-3 rounded-xl transition flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Launch PageAgent AI</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Trigger for Desktop when Assistant is Closed */}
      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-emerald-800 hover:bg-emerald-950 text-white rounded-full shadow-xl transition border border-emerald-700/50 print:hidden flex items-center justify-center"
          title="Open AI Assistant"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Main Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-12 print:hidden">
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
              **Disclaimer**: This platform is an independent reference platform. We are not officially affiliated with SASSA, the Department of Social Development, or the South African Government. Always cross-verify critical administrative actions with official Government gazettes.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs font-mono uppercase tracking-wider">Quality Guarantees</h4>
            <div className="flex items-start gap-2 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p>Adheres strictly to search guidelines, ensuring helpful content and maximum accessibility standards without trackers, advertisements, or cookies.</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800 text-center text-[10px] font-mono">
          <p>© 2026 SASSA Resource Platform. South Africa’s Trusted Public Assistance Hub.</p>
        </div>
      </footer>
    </div>
  );
}
