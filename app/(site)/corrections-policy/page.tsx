import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { breadcrumbSchema, webpageSchema } from "@/lib/json-ld";

export const metadata = pageMetadata({
  title: "Corrections Policy",
  description:
    "How SASSA Grant Hub handles factual errors, outdated payment dates and reader reports, including what we change and how corrections are logged.",
  path: "/corrections-policy",
});

const corrections = [
  {
    date: "31 October 2026",
    summary: "Foster Care Grant amount corrected to R1,300 from 1 October 2026.",
    detail:
      "The grant library and several guides still showed R1,300. The 2026/27 budget allocation raised the grant to R1,290 in April and to R1,300 in October 2026. All affected pages now use the shared grant-amount data source.",
  },
  {
    date: "31 October 2026",
    summary: "Expired Postbank Gold Card deadline removed as an active notice.",
    detail:
      "A homepage banner still presented 31 August 2026 as an upcoming card-swap deadline. The deadline has passed. The banner was removed and the banking guide now explains what to do if a card has stopped working.",
  },
  {
    date: "31 October 2026",
    summary: "Unsupported ministerial attribution removed from review coverage.",
    detail:
      "Several review articles attributed a July 2026 announcement to a named minister without a linkable official statement. The attribution was removed while the underlying review guidance, which is separately sourced, was retained.",
  },
];

export default function CorrectionsPolicyPage() {
  const pageSchema = webpageSchema(
    "Corrections Policy",
    "How SASSA Grant Hub investigates, corrects and logs factual errors and outdated information.",
    "/corrections-policy"
  );
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Corrections Policy", url: "/corrections-policy" },
  ]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-slate text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Standards</p>
          <h1 className="text-[36px] md:text-[48px] font-black leading-[1.1] tracking-[-0.015em]">Corrections Policy</h1>
          <p className="text-[18px] text-white/80 mt-4 max-w-2xl leading-relaxed">
            Public benefit information has to be right. This page explains how we handle errors, how quickly we act,
            and what a correction changes on the page.
          </p>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="rounded-lg border border-border bg-background p-6">
            <h2 className="text-lg font-black text-carbon">How to report a problem</h2>
            <p className="text-sm text-body mt-2 leading-relaxed">
              Use the{" "}
              <Link href="/contact" className="font-bold text-violet hover:underline">contact page</Link>{" "}
              and include the page address, the sentence or figure you believe is wrong, and a link to an official
              source if you have one. You do not need to submit identity numbers, grant numbers or banking details.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-carbon">What happens next</h2>
            <ol className="mt-3 space-y-3">
              {[
                ["Acknowledge", "We aim to acknowledge a specific factual report within two working days."],
                ["Check the source", "The claim is compared with the latest SASSA, Department of Social Development, Government Gazette or Treasury publication available."],
                ["Correct or explain", "If the claim is wrong, we correct it. If official information is incomplete, we label the uncertainty instead of guessing."],
                ["Log the change", "Substantive corrections are recorded below and the page's review date is updated. Publication dates are never changed to make an article look newer."],
              ].map(([title, detail], index) => (
                <li key={title} className="flex gap-3 rounded-lg border border-border bg-background p-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet/10 text-violet text-xs font-black shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-carbon">{title}</p>
                    <p className="text-sm text-ash mt-1 leading-relaxed">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-black text-carbon">Correction log</h2>
            <p className="text-sm text-ash mt-1">Substantive factual corrections to published content.</p>
            <div className="mt-4 space-y-3">
              {corrections.map((entry) => (
                <div key={entry.summary} className="rounded-lg border border-border bg-background p-4">
                  <p className="text-xs font-mono text-ash">{entry.date}</p>
                  <p className="text-sm font-bold text-carbon mt-1">{entry.summary}</p>
                  <p className="text-sm text-ash mt-1 leading-relaxed">{entry.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/40">
            <p className="text-sm font-bold text-amber-950 dark:text-amber-100">What we cannot correct</p>
            <p className="text-sm text-amber-900 dark:text-amber-200 mt-1 leading-relaxed">
              We cannot change a SASSA decision, reopen an application, release a payment or correct your record.
              Those actions belong to SASSA and the Independent Tribunal for Social Assistance Appeals. We can only
              correct what this website says about them.
            </p>
          </div>

          <p className="text-sm">
            <Link href="/editorial-policy" className="inline-flex items-center gap-1.5 font-bold text-violet hover:underline">
              Read the full editorial policy <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
