'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ChevronDown, ExternalLink } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { useTheme } from "./ThemeProvider";
import { SITE_NAME, OFFICIAL_LINKS } from "@/lib/site";

interface NavItem {
  href: string;
  label: string;
  description?: string;
}

interface NavGroup {
  href: string;
  label: string;
  items: NavItem[];
  align?: "left" | "right";
}

const primaryNav: NavGroup[] = [
  {
    href: "/status",
    label: "Check Status",
    items: [
      { href: "/status", label: "Status meanings", description: "What each SASSA status means" },
      { href: "/guides/how-to-check-sassa-status", label: "How to check your status", description: "Online, WhatsApp, USSD or office" },
      { href: "/status/pending", label: "Pending status" },
      { href: "/status/approved", label: "Approved but unpaid" },
      { href: "/status/declined", label: "Declined status" },
      { href: "/banking/payment-not-reflecting", label: "Payment not reflecting" },
    ],
  },
  {
    href: "/payment-dates",
    label: "Payment Dates",
    items: [
      { href: "/payment-dates", label: "2026 payment calendar", description: "Every month at a glance" },
      { href: "/payment-dates/2026-november", label: "November 2026 dates", description: "Revised election schedule" },
      { href: "/payment-dates/2026-december", label: "December 2026 dates", description: "Provisional festive schedule" },
      { href: "/payment-dates/older-persons-grant-payment-dates", label: "Older Persons dates" },
      { href: "/payment-dates/child-support-grant-payment-dates", label: "Children's grant dates" },
      { href: "/banking", label: "Banking and collection" },
    ],
  },
  {
    href: "/grants",
    label: "Grants",
    items: [
      { href: "/grants", label: "All SASSA grants" },
      { href: "/grants/srd-r370-grant", label: "SRD R370 grant" },
      { href: "/grants/older-person-grant", label: "Older Persons grant" },
      { href: "/grants/disability-grant", label: "Disability grant" },
      { href: "/grants/child-support-grant", label: "Child Support grant" },
      { href: "/eligibility", label: "Eligibility centre", description: "Check the main criteria" },
    ],
  },
  {
    href: "/guides/how-to-apply-sassa-grant",
    label: "Applications",
    items: [
      { href: "/guides/how-to-apply-sassa-grant", label: "How to apply", description: "Documents and office steps" },
      { href: "/banking/how-to-register-for-srd-portal", label: "Register for the SRD portal" },
      { href: "/guides/change-srd-phone-number", label: "Change your phone number" },
      { href: "/downloads", label: "Forms and downloads" },
    ],
  },
  {
    href: "/appeals",
    label: "Appeals",
    items: [
      { href: "/appeals", label: "Appeals centre" },
      { href: "/appeals/how-to-appeal", label: "How to appeal", description: "The 90-day ITSAA route" },
      { href: "/appeals/appeal-status-check", label: "Check appeal status" },
      { href: "/appeals/appeal-timeline", label: "Appeal timeline" },
      { href: "/grants/srd-r370-grant/monthly-review", label: "Grant reviews" },
    ],
  },
  {
    href: "/guides",
    label: "Guides",
    align: "right",
    items: [
      { href: "/guides", label: "All guides" },
      { href: "/banking", label: "Banking guides" },
      { href: "/tools", label: "Tools and calculators" },
      { href: "/faq", label: "Frequently asked questions" },
      { href: "/offices", label: "Find a SASSA office" },
    ],
  },
  {
    href: "/news",
    label: "Updates",
    align: "right",
    items: [
      { href: "/news", label: "All updates" },
      { href: "/news/sassa-november-2026-payment-dates-revised", label: "November dates revised", description: "Why pensioners were paid early" },
    ],
  },
];

const secondaryNav: NavItem[] = [
  { href: "/eligibility", label: "Eligibility centre" },
  { href: "/banking", label: "Banking and payment methods" },
  { href: "/tools", label: "Tools and calculators" },
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/offices", label: "Find a SASSA office" },
  { href: "/about", label: "About this resource" },
  { href: "/contact", label: "Contact and corrections" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-lg text-ash hover:text-ink hover:bg-fog/70 transition"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/grants") return pathname === "/grants" || pathname.startsWith("/grants/") || pathname.startsWith("/eligibility");
  if (href === "/guides") return pathname === "/guides" || (pathname.startsWith("/guides/") && pathname !== "/guides/how-to-apply-sassa-grant");
  return pathname === href || pathname.startsWith(href + "/");
}

function isGroupActive(pathname: string, group: NavGroup) {
  return isActive(pathname, group.href) || group.items.some((item) => isActive(pathname, item.href));
}

export default function TopNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsMenuOpen(false);
      setOpenGroup(null);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  function openMenu(href: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(href);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  }

  return (
    <>
      <header className="sticky top-0 z-30 print:hidden bg-paper/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 rounded-md" aria-label={`${SITE_NAME} — home`}>
            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-black">
              <Image src="/main-logo.svg" alt="" width={24} height={24} className="w-6 h-6" priority />
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5" aria-label="Primary">
            {primaryNav.map((group) => {
              const active = isGroupActive(pathname, group);
              const expanded = openGroup === group.href;
              return (
                <div
                  key={group.href}
                  className="relative"
                  onMouseEnter={() => openMenu(group.href)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openMenu(group.href)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenGroup(null);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpenGroup(null);
                      (event.currentTarget.querySelector("a") as HTMLElement | null)?.focus();
                    }
                  }}
                >
                  <Link
                    href={group.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-md text-[13px] font-bold transition ${
                      active ? "text-violet bg-violet/10" : "text-ash hover:text-ink hover:bg-fog/70"
                    }`}
                  >
                    {group.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                  </Link>

                  {expanded && (
                    <div className={`absolute top-full pt-2 w-64 z-50 ${group.align === "right" ? "right-0" : "left-0"}`}>
                      <div className="rounded-xl border border-border bg-paper shadow-xl p-2">
                        {group.items.map((item) => {
                          const itemActive = isActive(pathname, item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              aria-current={itemActive ? "page" : undefined}
                              className={`block rounded-lg px-3 py-2 transition ${
                                itemActive ? "bg-violet/10 text-violet" : "text-carbon hover:bg-fog"
                              }`}
                            >
                              <span className="block text-sm font-bold leading-snug">{item.label}</span>
                              {item.description && (
                                <span className="block text-xs text-ash mt-0.5 leading-snug">{item.description}</span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <SearchDialog />
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
              className="xl:hidden p-2 text-ash hover:text-ink hover:bg-fog/70 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 w-full h-full bg-carbon/60"
            tabIndex={-1}
          />
          <div
            ref={panelRef}
            id="mobile-nav-menu"
            className="relative ml-auto w-full max-w-sm bg-paper h-full p-5 flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <span className="font-black text-sm text-carbon">Menu</span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 -mr-2 text-ash hover:text-ink rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto space-y-2" aria-label="Mobile primary">
              {primaryNav.map((group) => {
                const active = isGroupActive(pathname, group);
                return (
                  <details key={group.href} className="group/mobile border-b border-border/70 pb-2">
                    <summary
                      className={`flex items-center justify-between gap-3 p-3 rounded-lg text-sm font-bold cursor-pointer list-none transition ${
                        active ? "bg-violet/10 text-violet" : "text-carbon hover:bg-fog"
                      }`}
                    >
                      {group.label}
                      <ChevronDown className="w-4 h-4 opacity-60 group-open/mobile:rotate-180 transition-transform" aria-hidden="true" />
                    </summary>
                    <div className="mt-1 ml-3 pl-3 border-l border-border space-y-0.5">
                      <Link href={group.href} className="block rounded-md px-3 py-2 text-sm font-bold text-violet hover:bg-fog">
                        Overview
                      </Link>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={isActive(pathname, item.href) ? "page" : undefined}
                          className="block rounded-md px-3 py-2 text-sm text-ash font-medium hover:bg-fog hover:text-ink transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              })}

              <p className="pt-4 pb-1 px-3 text-[11px] font-bold uppercase tracking-widest text-ash">More help</p>
              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block p-3 rounded-lg text-sm text-ash font-medium hover:bg-fog hover:text-ink transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <a
              href={OFFICIAL_LINKS.srd}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-violet text-white font-bold p-3 rounded-lg text-sm transition hover:opacity-90"
            >
              Official SRD status check <ExternalLink className="w-4 h-4" />
            </a>
            <p className="mt-2 text-center text-[11px] text-ash">Independent resource. Not affiliated with SASSA.</p>
          </div>
        </div>
      )}
    </>
  );
}
