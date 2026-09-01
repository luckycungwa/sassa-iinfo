'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, ArrowRight, Sun, Moon
} from "lucide-react";
import SearchDialog from "./SearchDialog";
import { useTheme } from "./ThemeProvider";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavItem {
  href: string;
  label: string;
  desc: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Grants",
    items: [
      { href: "/grants", label: "Grant Library", desc: "Official Social Grants" },
      { href: "/grants/srd-r370-grant", label: "SRD R370 Grant", desc: "R370 Grant Details" },
      { href: "/eligibility", label: "Eligibility Centre", desc: "Browse by Situation" },
    ],
  },
  {
    label: "Status",
    items: [
      { href: "/status", label: "Status Meanings", desc: "Application Status Codes" },
      { href: "/appeals", label: "Appeals Centre", desc: "ITSAA Appeal Process" },
    ],
  },
  {
    label: "Banking",
    items: [
      { href: "/banking", label: "Banking Details", desc: "Payment Methods" },
      { href: "/payment-dates", label: "Payment Dates", desc: "Payout Schedules" },
    ],
  },
  {
    label: "Resources",
    items: [
      { href: "/guides", label: "Guides", desc: "How-To Resources" },
      { href: "/faq", label: "FAQ", desc: "Common Questions" },
      { href: "/downloads", label: "Download Centre", desc: "Official Forms" },
      { href: "/news", label: "News", desc: "Official Announcements" },
      { href: "/banking", label: "Banking Details", desc: "Payment Methods" },
      { href: "/tools", label: "Interactive Tools", desc: "Calculators & Checkers" },
    ],
  },
  {
    label: "Locations",
    items: [
      { href: "/offices", label: "Office Finder", desc: "Provincial Branches" },
      { href: "/provinces", label: "Province Hubs", desc: "Regional Guides" },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/tools", label: "Interactive Tools", desc: "Calculators & Checkers" },
    ],
  },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-xl text-ash hover:text-ink hover:bg-fog/60 transition"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

export default function TopNavbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string[]>([]);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = mobilePanelRef.current;
    if (panel) {
      panel.querySelector<HTMLElement>("button, a[href]")?.focus();
    }
    document.body.style.overflow = "hidden";
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (openDropdown) {
        const el = dropdownRefs.current.get(openDropdown);
        if (el && !el.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleFocus = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownItemEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const toggleMobileSection = (label: string) => {
    setMobileExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      <header className="sticky top-0 z-30 print:hidden bg-paper/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0 flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-black">
              <img src="/main-logo.svg" alt="SRD Grant Guide" className="w-6 h-6" />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navGroups.map((group) => {
              const isOpen = openDropdown === group.label;
              const hasActive = group.items.some(
                (item) => pathname === item.href || pathname.startsWith(item.href + "/")
              );
              return (
                <div
                  key={group.label}
                  ref={(el) => {
                    if (el) dropdownRefs.current.set(group.label, el);
                  }}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.label)}
                  onMouseLeave={handleMouseLeave}
                  onFocus={() => handleFocus(group.label)}
                  onBlur={handleBlur}
                >
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : group.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 px-3 py-2 rounded-[6px] text-xs font-bold transition ${
                      isOpen || hasActive
                        ? "text-violet"
                        : "text-ash hover:text-ink hover:bg-fog/50"
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown className={`w-3 h-3 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                   {isOpen && (
                     <div
                       className="absolute top-full left-0 mt-1 w-72 bg-paper border border-border rounded-[6px] shadow-lg p-2 space-y-1 z-50"
                       onMouseEnter={handleDropdownItemEnter}
                       onMouseLeave={handleMouseLeave}
                     >
                       {group.items.map((item, idx) => {
                         const isItemActive =
                           pathname === item.href || pathname.startsWith(item.href + "/");
                         const isNewItem = idx >= 4;
                         return (
                           <React.Fragment key={item.href}>
                             {isNewItem && idx === 4 && (
                               <div className="border-t border-border my-1" />
                             )}
                             <Link
                               href={item.href}
                               onClick={() => setOpenDropdown(null)}
                               className={`flex items-center justify-between p-3 rounded-[6px] transition group ${
                                 isItemActive
                                   ? "bg-yellow/10 text-violet"
                                   : "text-ash hover:bg-fog/50 hover:text-ink"
                               }`}
                             >
                            <div>
                              <p className="text-xs font-bold">{item.label}</p>
                              <p className="text-xs text-ash">{item.desc}</p>
                            </div>
                            <ArrowRight
                              className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition ${
                                isItemActive ? "opacity-100" : ""
                              }`}
                            />
                          </Link>
                        </React.Fragment>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <SearchDialog />
            <LanguageSwitcher />
            <ThemeToggle />
            {/* <Link
              href="/grants"
              className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 bg-violet text-white rounded-[22px] text-xs font-bold hover:opacity-90 transition shadow-[0_2px_8px_rgba(119,0,255,0.25)]"
            >
              Browse Grants <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              ref={hamburgerRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className="lg:hidden p-2 text-ash hover:text-ink hover:bg-fog/60 rounded-[6px] transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button> */}
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-carbon/60 z-40 lg:hidden flex justify-end" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div
            ref={mobilePanelRef}
            id="mobile-nav-menu"
            className="w-full max-w-xs bg-paper h-full p-6 flex flex-col animate-slide-in"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <span className="font-bold text-sm text-carbon">Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-1 text-ash hover:text-ink rounded-[6px] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navGroups.map((group) => {
                const isExpanded = mobileExpanded.includes(group.label);
                const hasActive = group.items.some(
                  (item) => pathname === item.href || pathname.startsWith(item.href + "/")
                );
                return (
                  <div key={group.label}>
                    <button
                      onClick={() => toggleMobileSection(group.label)}
                      aria-expanded={isExpanded}
                      className={`w-full flex items-center justify-between p-3 rounded-[6px] text-xs font-bold transition ${
                        hasActive ? "text-violet" : "text-ash hover:text-ink hover:bg-fog/50"
                      }`}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="ml-4 space-y-1 mt-1 mb-2">
                        {group.items.map((item) => {
                          const isItemActive =
                            pathname === item.href || pathname.startsWith(item.href + "/");
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block p-3 rounded-[6px] transition text-xs ${
                                isItemActive
                                  ? "bg-yellow/10 text-violet font-bold"
                                  : "text-ash hover:bg-fog/50 hover:text-ink"
                              }`}
                            >
                              <p className="font-bold">{item.label}</p>
                              <p className="text-xs text-ash">{item.desc}</p>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <Link
              href="/grants"
              className="w-full bg-violet hover:opacity-90 text-white font-bold p-3 rounded-[22px] transition flex items-center justify-center gap-2 text-xs mt-4 shadow-[0_2px_8px_rgba(119,0,255,0.25)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Grants <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
