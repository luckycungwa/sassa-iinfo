import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'SASSA Resource Platform | South Africa\'s Trusted Public Assistance Knowledge Base',
  description: 'The complete, high-performance reference hub for SASSA social grants, status meaning lookups, payment calendars, appeal trackers, eligibility checkers, and interactive calculators.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SASSA Resource Platform",
    url: process.env.APP_URL || "https://sassa-resource.vercel.app",
    description: "An independent educational resource centre for South African social grant information.",
    inLanguage: "en-ZA",
    isAccessibleForFree: true,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.APP_URL || "https://sassa-resource.vercel.app"}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en-ZA" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-display antialiased bg-canvas text-ink" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
