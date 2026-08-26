'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import TopNavbar from "../../components/TopNavbar";
import WhatsAppButton from "../../components/WhatsAppButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <a href="#article-body-column" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-violet focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm">
        Skip to content
      </a>
      <TopNavbar />

      <div className="flex-1 flex">
        <main className="flex-1 min-w-0 print:p-0">
          {children}
        </main>
      </div>

      <WhatsAppButton />

      <footer className="border-t border-border mt-16 print:hidden bg-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-3">
              <img src="/main-logo.svg" alt="SASSA Grant Guide" className="w-8 h-8 mb-1" />
              <p className="text-sm leading-relaxed text-carbon">
                Independent SASSA grant guide. Not affiliated with SASSA or any government entity.
              </p>
              <p className="text-xs text-muted-foreground">Last verified: {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</p>
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
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SASSA Grant Guide. Built by Lucky Cungwa / 44tagstudios.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
