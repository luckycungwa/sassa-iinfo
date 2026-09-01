import type { Metadata } from 'next';
import Script from 'next/script';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";
import TopNavbar from "@/components/TopNavbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import NavigationProgress from "@/components/NavigationProgress";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

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

const siteUrl = process.env.APP_URL || "https://sassagrantguide.co.za";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

export const metadata: Metadata = {
  title: {
    default: 'SASSA Grant Guide — Independent South African Social Grant Resource',
    template: '%s | SASSA Grant Guide',
  },
  description: 'Clear, practical guide to every SASSA social grant: eligibility, payment dates, application steps, and appeals. Written in plain language and verified against official sources.',
  metadataBase: new URL(siteUrl),
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
    languages: {
      'en-ZA': siteUrl,
      'zu-ZA': `${siteUrl}/zu`,
      'xh-ZA': `${siteUrl}/xh`,
      'af-ZA': `${siteUrl}/af`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: 'SASSA Grant Guide',
    title: 'SASSA Grant Guide — Independent South African Social Grant Resource',
    description: 'Clear, practical guide to every SASSA social grant: eligibility, payment dates, application steps, and appeals.',
    url: siteUrl,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'SASSA Grant Guide — Independent South African Social Grant Resource',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SASSA Grant Guide — Independent South African Social Grant Resource',
    description: 'Clear, practical guide to every SASSA social grant: eligibility, payment dates, application steps, and appeals.',
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const htmlLang = locale === 'en' ? 'en-ZA' : locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "SASSA Grant Guide",
        url: siteUrl,
        description: "Independent guide to SASSA social grants. Not affiliated with SASSA or any government department.",
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
        name: "SASSA Grant Guide",
        description: "Independent guide to SASSA social grants in South Africa. Created by 44tagstudios.",
        url: siteUrl,
        logo: `${siteUrl}/main-logo.svg`,
        foundingDate: "2025",
        founder: {
          "@type": "Person",
          name: "Lucky Cungwa",
          url: "https://44tagstudios.co.za",
        },
        sameAs: [
          "https://44tagstudios.co.za",
        ],
      },
    ],
  };

  return (
    <html lang={htmlLang} className={cn(manrope.variable, jetbrains.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("sassa-theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark")}var m=document.getElementById("theme-color-meta");if(m){m.setAttribute("content",d?"#131316":"#fafafa")}}catch(e){}})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="theme-color" content="#fafafa" id="theme-color-meta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-display antialiased" suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider>
            <NavigationProgress />
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
                      <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-black">
                        <img src="/main-logo.svg" alt="SASSA Grant Guide" className="w-5 h-5" />
                      </span>
                      <p className="text-sm leading-relaxed text-carbon">
                        Independent SASSA grant guide. Not affiliated with SASSA or any government entity.
                      </p>
                      <p className="text-xs text-muted-foreground">Last verified: {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-carbon uppercase tracking-wider">Grants</p>
                      <nav className="space-y-1.5">
                        <a href="/grants" className="block text-sm text-muted-foreground hover:text-violet transition">All Grants</a>
                        <a href="/grants/srd-r370-grant" className="block text-sm text-muted-foreground hover:text-violet transition">SRD R370 Grant</a>
                        <a href="/grants/older-person-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Older Person Grant</a>
                        <a href="/grants/child-support-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Child Support Grant</a>
                        <a href="/grants/disability-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Disability Grant</a>
                        <a href="/grants/foster-care-grant" className="block text-sm text-muted-foreground hover:text-violet transition">Foster Care Grant</a>
                        <a href="/eligibility" className="block text-sm text-muted-foreground hover:text-violet transition">Eligibility Checker</a>
                      </nav>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-carbon uppercase tracking-wider">Status & Appeals</p>
                      <nav className="space-y-1.5">
                        <a href="/status" className="block text-sm text-muted-foreground hover:text-violet transition">Status Meanings</a>
                        <a href="/status/pending" className="block text-sm text-muted-foreground hover:text-violet transition">Pending Status</a>
                        <a href="/status/approved" className="block text-sm text-muted-foreground hover:text-violet transition">Approved Status</a>
                        <a href="/status/declined" className="block text-sm text-muted-foreground hover:text-violet transition">Declined Status</a>
                        <a href="/appeals" className="block text-sm text-muted-foreground hover:text-violet transition">Appeals Centre</a>
                        <a href="/appeals/how-to-appeal" className="block text-sm text-muted-foreground hover:text-violet transition">How to Appeal</a>
                        <a href="/appeals/appeal-timeline" className="block text-sm text-muted-foreground hover:text-violet transition">Appeal Timeline</a>
                      </nav>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-carbon uppercase tracking-wider">Resources</p>
                      <nav className="space-y-1.5">
                        <a href="/payment-dates" className="block text-sm text-muted-foreground hover:text-violet transition">Payment Dates 2026</a>
                        <a href="/guides" className="block text-sm text-muted-foreground hover:text-violet transition">How-To Guides</a>
                        <a href="/banking" className="block text-sm text-muted-foreground hover:text-violet transition">Banking Details</a>
                        <a href="/faq" className="block text-sm text-muted-foreground hover:text-violet transition">FAQ</a>
                        <a href="/tools" className="block text-sm text-muted-foreground hover:text-violet transition">Interactive Tools</a>
                        <a href="/downloads" className="block text-sm text-muted-foreground hover:text-violet transition">Download Forms</a>
                        <a href="/offices" className="block text-sm text-muted-foreground hover:text-violet transition">Office Finder</a>
                        <a href="/news" className="block text-sm text-muted-foreground hover:text-violet transition">News & Updates</a>
                      </nav>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-carbon uppercase tracking-wider">Company</p>
                      <nav className="space-y-1.5">
                        <a href="/about" className="block text-sm text-muted-foreground hover:text-violet transition">About</a>
                        <a href="/contact" className="block text-sm text-muted-foreground hover:text-violet transition">Contact</a>
                        <a href="/editorial-policy" className="block text-sm text-muted-foreground hover:text-violet transition">Editorial Policy</a>
                        <a href="/provinces" className="block text-sm text-muted-foreground hover:text-violet transition">Province Hubs</a>
                        <a href="/privacy" className="block text-sm text-muted-foreground hover:text-violet transition">Privacy Policy</a>
                        <a href="/terms" className="block text-sm text-muted-foreground hover:text-violet transition">Terms of Service</a>
                        <a href="/disclaimer" className="block text-sm text-muted-foreground hover:text-violet transition">Disclaimer</a>
                      </nav>
                    </div>
                  </div>
                  <div className="border-t border-border mt-10 pt-6 text-center">
                    <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SASSA Grant Guide. Built by Lucky Cungwa / 44tagstudios.</p>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
