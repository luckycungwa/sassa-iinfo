"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GoldCardBanner() {
  const [afterDeadline, setAfterDeadline] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const deadline = new Date("2026-08-31T23:59:59");
      setAfterDeadline(new Date() > deadline);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (afterDeadline) {
    return (
      <section className="bg-midnight text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest px-2 py-1 rounded shrink-0 mt-0.5">
              Act now
            </span>
            <div>
              <p className="text-[17px] font-bold leading-snug">
                Gold Cards no longer work. Get your Black Card if you have not swapped yet.
              </p>
              <p className="text-sm text-muted mt-1">
                Your grant is safe, but you cannot withdraw or use it until you collect a free Black Card — bring your ID to any Postbank point or participating retailer.
              </p>
            </div>
          </div>
          <Link
            href="/banking/black-card-swap"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-sm font-bold hover:opacity-90 transition shrink-0"
          >
            How to get your Black Card <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-midnight text-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="bg-red-600 text-white text-[11px] font-black uppercase tracking-widest px-2 py-1 rounded shrink-0 mt-0.5">
            Deadline 31 Aug
          </span>
          <div>
            <p className="text-[17px] font-bold leading-snug">
              Swap your SASSA Gold Card for the new Postbank Black Card before it stops working.
            </p>
            <p className="text-sm text-muted mt-1">
              Free swap — just bring your ID to any Postbank service point or participating retailer.
            </p>
          </div>
        </div>
        <Link
          href="/banking/black-card-swap"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-sm font-bold hover:opacity-90 transition shrink-0"
        >
          How to swap your card <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}