import type { Metadata } from 'next';
import Image from "next/image";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE, SITE_OPERATOR, SITE_OPERATOR_URL, OFFICIAL_LINKS } from "@/lib/site";
import Script from 'next/script';
import Link from 'next/link';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";
import TopNavbar from "@/components/TopNavbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import NavigationProgress from "@/components/NavigationProgress";
import { PAYMENT_DATA_UPDATED } from "@/lib/data/paymentDates";

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = SITE_URL;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

export const metadata: Metadata = {
  title: {
    default: 'SASSA Grant Hub 2026 — Grant Status, Payment Dates & Appeals',
    template: '%s | SASSA Grant Hub',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: SITE_NAME,
    title: 'SASSA Grant Hub 2026 — Grant Status, Payment Dates & Appeals',
    description: SITE_DESCRIPTION,
    url: siteUrl,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'SASSA Grant Hub — independent South African grant information',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SASSA Grant Hub 2026 — Grant Status, Payment Dates & Appeals',
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { other: { 'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const htmlLang = 'en-ZA';

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: SITE_NAME,
        alternateName: "SASSAGrantHub.co.za",
        url: siteUrl,
        description: SITE_DESCRIPTION,
        inLanguage: htmlLang,
        isAccessibleForFree: true,
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: SITE_NAME,
        description: `Independent South African SASSA information resource operated by ${SITE_OPERATOR}. Not affiliated with SASSA or the South African government.`,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/main-logo.svg`,
        },
        foundingDate: "2025",
        founder: {
          "@type": "Person",
          name: "Lucky Cungwa",
          url: SITE_OPERATOR_URL,
        },
        sameAs: [SITE_OPERATOR_URL],
      },
    ],
  };

  return (
    <html lang={htmlLang} className={cn(manrope.variable, jetbrains.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("sassa-theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark")}var m=document.getElementById("theme-color-meta");if(m){m.setAttribute("content",d?"#0c1725":"#f4f7f9")}}catch(e){}})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="theme-color" content="#f4f7f9" id="theme-color-meta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-display antialiased" suppressHydrationWarning>
          <ThemeProvider>
            <NavigationProgress />
            <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-violet focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm">
                Skip to content
              </a>
              <TopNavbar />
              <div className="flex-1 flex">
                <main id="main-content" className="flex-1 min-w-0 print:p-0">
                  {children}
                </main>
              </div>
              <WhatsAppButton />
              <footer className="border-t border-border mt-16 print:hidden bg-paper">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
                    <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                      <Link href="/" className="flex items-center gap-2.5 w-fit">
                        <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-black">
                          <Image src="/main-logo.svg" alt="" width={20} height={20} className="w-5 h-5" />
                        </span>
                        <span className="text-sm font-black text-carbon">SASSA Grant Hub</span>
                      </Link>
                      <p className="text-sm leading-relaxed text-carbon">
                        {SITE_TAGLINE} Independent guidance on grant statuses, payment dates, applications and appeals.
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Not affiliated with SASSA or the South African government. We do not process applications or check individual records.
                      </p>
                      <p className="text-xs text-muted-foreground">Schedule reviewed: {PAYMENT_DATA_UPDATED}</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-bold text-carbon uppercase tracking-wider">Grants</p>
                      <nav className="space-y-1.5" aria-label="Grants">
                        <Link href="/grants" className="block text-sm text-muted-foreground hover:text-violet transition">All Grants</Link>
                        <Link href="/grants/srd-r370-grant" className="block text-sm text-muted-foreground hover:text-violet transition">SRD R370 Grant</Link>
                        <Link href="/grants/older-person-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Older Person Grant</Link>
                        <Link href="/grants/child-support-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Child Support Grant</Link>
                        <Link href="/grants/disability-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Disability Grant</Link>
                        <Link href="/grants/foster-care-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Foster Care Grant</Link>
                        <Link href="/eligibility" className="block text-sm text-muted-foreground hover:text-violet transition">Eligibility Centre</Link>
                      </nav>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-bold text-carbon uppercase tracking-wider">Status & Appeals</p>
                      <nav className="space-y-1.5" aria-label="Status and appeals">
                        <Link href="/status" className="block text-sm text-muted-foreground hover:text-violet transition">Status Meanings</Link>
                        <Link href="/status/pending" className="block text-sm text-muted-foreground hover:text-violet transition">Pending Status</Link>
                        <Link href="/status/approved" className="block text-sm text-muted-foreground hover:text-violet transition">Approved Status</Link>
                        <Link href="/status/declined" className="block text-sm text-muted-foreground hover:text-violet transition">Declined Status</Link>
                        <Link href="/appeals" className="block text-sm text-muted-foreground hover:text-violet transition">Appeals Centre</Link>
                        <Link href="/appeals/how-to-appeal" className="block text-sm text-muted-foreground hover:text-violet transition">How to Appeal</Link>
                        <Link href="/appeals/appeal-status-check" className="block text-sm text-muted-foreground hover:text-violet transition">Check an Appeal</Link>
                      </nav>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-bold text-carbon uppercase tracking-wider">Payment & Help</p>
                      <nav className="space-y-1.5" aria-label="Payments and help">
                        <Link href="/payment-dates" className="block text-sm text-muted-foreground hover:text-violet transition">Payment Dates 2026</Link>
                        <Link href="/payment-dates/2026-november" className="block text-sm text-muted-foreground hover:text-violet transition">November 2026 Dates</Link>
                        <Link href="/payment-dates/2026-december" className="block text-sm text-muted-foreground hover:text-violet transition">December 2026 Dates</Link>
                        <Link href="/banking" className="block text-sm text-muted-foreground hover:text-violet transition">Banking Details</Link>
                        <Link href="/banking/update-bank-details" className="block text-sm text-muted-foreground hover:text-violet transition">Update Bank Details</Link>
                        <Link href="/guides" className="block text-sm text-muted-foreground hover:text-violet transition">How-To Guides</Link>
                        <Link href="/faq" className="block text-sm text-muted-foreground hover:text-violet transition">FAQ</Link>
                        <Link href="/offices" className="block text-sm text-muted-foreground hover:text-violet transition">Office Finder</Link>
                      </nav>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-bold text-carbon uppercase tracking-wider">About & Policies</p>
                      <nav className="space-y-1.5" aria-label="About and policies">
                        <Link href="/about" className="block text-sm text-muted-foreground hover:text-violet transition">About</Link>
                        <Link href="/contact" className="block text-sm text-muted-foreground hover:text-violet transition">Contact & Corrections</Link>
                        <Link href="/editorial-policy" className="block text-sm text-muted-foreground hover:text-violet transition">Editorial Policy</Link>
                        <Link href="/corrections-policy" className="block text-sm text-muted-foreground hover:text-violet transition">Corrections Policy</Link>
                        <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-violet transition">Privacy Policy</Link>
                        <Link href="/terms" className="block text-sm text-muted-foreground hover:text-violet transition">Terms of Use</Link>
                        <Link href="/disclaimer" className="block text-sm text-muted-foreground hover:text-violet transition">Disclaimer</Link>
                      </nav>
                      <p className="pt-2 text-xs font-bold text-carbon uppercase tracking-wider">Official resources</p>
                      <nav className="space-y-1.5" aria-label="Official SASSA resources">
                        <a href={OFFICIAL_LINKS.sassa} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-violet transition">SASSA.gov.za</a>
                        <a href={OFFICIAL_LINKS.srd} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-violet transition">SRD status portal</a>
                        <a href={OFFICIAL_LINKS.dsd} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-violet transition">Department of Social Development</a>
                      </nav>
                    </div>
                  </div>

                  <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                      &copy; {new Date().getFullYear()} {SITE_NAME}. Built by Lucky Cungwa / {SITE_OPERATOR}.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Independent information. Official services:{" "}
                      <a href={OFFICIAL_LINKS.srd} target="_blank" rel="noopener noreferrer" className="font-bold text-violet hover:underline">srd.sassa.gov.za</a>
                      {" "}·{" "}
                      <span className="whitespace-nowrap">{OFFICIAL_LINKS.helpline}</span>
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </ThemeProvider>
          <ToastProvider />
          {gaId && (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
              <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
              </Script>
            </>
          )}
          {adsenseId && (
            <Script
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
              strategy="afterInteractive"
              crossOrigin="anonymous"
            />
          )}
      </body>
    </html>
  );
}
