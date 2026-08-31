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
            Eligibility checker, grant calculator, payment lookup, deadline timer — all run in your browser. No data sent anywhere. No sign-up required.
          </p>
        </div>
      </section>

      <section className="bg-fog py-10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-body leading-relaxed max-w-3xl">
            Every tool on this page runs entirely in your browser. Nothing is stored or sent to a server.
            Use them to quickly check your eligibility, find your payment date, or work out what documents you need —
            before you visit a SASSA office or call the helpline.
          </p>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveTools />
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-4">What to do next</h2>
          <p className="text-sm text-body leading-relaxed mb-6 max-w-3xl">
            These tools help you prepare, but they do not submit anything on your behalf. Once you have your answers, here is where to go:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/guides/how-to-apply-sassa-grant" className="card p-5 hover:bg-yellow/30 transition group">
              <p className="text-sm font-bold text-carbon group-hover:text-violet transition">Apply for a grant</p>
              <p className="text-xs text-ash mt-1 leading-snug">Step-by-step walkthrough of the SASSA application process for every grant type.</p>
            </Link>
            <Link href="/grants/srd-r370-grant/status-check" className="card p-5 hover:bg-yellow/30 transition group">
              <p className="text-sm font-bold text-carbon group-hover:text-violet transition">Check your SRD status</p>
              <p className="text-xs text-ash mt-1 leading-snug">Online, WhatsApp, USSD, and in-person methods for checking your application.</p>
            </Link>
            <Link href="/payment-dates" className="card p-5 hover:bg-yellow/30 transition group">
              <p className="text-sm font-bold text-carbon group-hover:text-violet transition">Find your payment date</p>
              <p className="text-xs text-ash mt-1 leading-snug">Monthly payment schedules for all grant types, including SRD batch windows.</p>
            </Link>
            <Link href="/guides/srd-call-centre-kiosk-help" className="card p-5 hover:bg-yellow/30 transition group">
              <p className="text-sm font-bold text-carbon group-hover:text-violet transition">Need help? Call or visit</p>
              <p className="text-xs text-ash mt-1 leading-snug">Free call centre (0800 60 10 11) and self-service kiosks for people who struggle online.</p>
            </Link>
            <Link href="/appeals" className="card p-5 hover:bg-yellow/30 transition group">
              <p className="text-sm font-bold text-carbon group-hover:text-violet transition">Appeal a declined grant</p>
              <p className="text-xs text-ash mt-1 leading-snug">How to challenge a declined grant through ITSAA within 90 days.</p>
            </Link>
            <Link href="/guides/sassa-scam-alert-guide" className="card p-5 hover:bg-yellow/30 transition group">
              <p className="text-sm font-bold text-carbon group-hover:text-violet transition">Spot a SASSA scam</p>
              <p className="text-xs text-ash mt-1 leading-snug">Real examples of fake SMS, phishing sites, and fraud calls — and how to avoid them.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[19px] leading-relaxed max-w-2xl mx-auto">
            <strong>Struggling with the online system?</strong> You can call SASSA free on{" "}
            <a href="tel:0800601011" className="text-accent font-bold hover:underline">0800 60 10 11</a>{" "}
            or visit a SASSA office for in-person help.{" "}
            <Link href="/guides/srd-call-centre-kiosk-help" className="text-accent font-bold hover:underline">
              Full guide to call centres and kiosks
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
