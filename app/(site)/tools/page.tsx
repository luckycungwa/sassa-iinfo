import type { Metadata } from "next";
import Link from "next/link";
import InteractiveTools from "../../../components/InteractiveTools";
import { canonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "SASSA Interactive Tools | Grant Checker, Payment Lookup & Calculators",
  description: "Free SASSA interactive tools: Grant Eligibility Checker, Payment Date Lookup, Age Calculator, Appeal Deadline Timer, Document Checklist Generator, and more. All run in your browser.",
  alternates: { canonical: canonicalUrl("/tools") },
};

export default function ToolsPage() {
  return (
    <div>
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">tools</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            Interactive tools
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Eligibility checker, grant calculator, payment lookup, deadline timer â€” all run in your browser.
          </p>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveTools />
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[19px] leading-relaxed max-w-2xl mx-auto">
            <Link href="/" className="text-accent-dark font-bold hover:underline">Return to homepage</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
