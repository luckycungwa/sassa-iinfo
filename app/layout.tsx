import type { Metadata } from 'next';
import Script from 'next/script';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "SASSA Grant Guide",
        url: siteUrl,
        description: "Independent guide to SASSA social grants. Not affiliated with SASSA or any government department.",
        inLanguage: "en-ZA",
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
        logo: `${siteUrl}/favicon.svg`,
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
    <html lang="en-ZA" className={cn(manrope.variable, jetbrains.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("sassa-theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark")}var m=document.getElementById("theme-color-meta");if(m){m.setAttribute("content",d?"#131316":"#fafafa")}}catch(e){}})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="theme-color" content="#fafafa" id="theme-color-meta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-display antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <ToastProvider />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
