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
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="font-display antialiased bg-canvas text-ink" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
