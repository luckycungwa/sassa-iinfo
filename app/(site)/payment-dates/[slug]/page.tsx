import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { pageMetadata } from "@/lib/metadata";
import { paymentMonths, isoToLong, PAYMENT_DATA_UPDATED } from "../../../../lib/data/paymentDates";
import { OFFICIAL_LINKS } from "@/lib/site";

export const revalidate = 3600;
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema, faqSchema, articleSchema, webpageSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/payment-dates/"))
    .map((p) => ({ slug: p.slug.replace("/payment-dates/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = paymentMonths
    .filter((m) => !existingSlugs.has(m.slug))
    .map((m) => ({ slug: m.slug }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/payment-dates/${slug}`);
  if (content) {
    return pageMetadata({ title: content.seo.metaTitle, description: content.seo.metaDescription, path: `/payment-dates/${slug}`, absoluteTitle: true });
  }

  const month = paymentMonths.find((m) => m.slug === slug);
  if (!month) return {};
  const statusLabel = month.status === "provisional" ? "Provisional" : "Confirmed";
  const title = `SASSA Payment Dates ${month.label} — ${statusLabel} Schedule`;
  const description = `SASSA payment dates for ${month.label}: Older Persons ${month.dates.olderPersons}, Disability ${month.dates.disability}, Children ${month.dates.children}, SRD R370 ${month.dates.srd}. ${statusLabel} schedule with official links.`;
  return pageMetadata({
    title,
    description,
    path: `/payment-dates/${slug}`,
    absoluteTitle: true,
  });
}

export default async function PaymentMonthPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const schedule = paymentMonths.find((m) => m.slug === slug);
  const provenance = schedule?.revisedOn
    ? `Revised by SASSA on ${isoToLong(schedule.revisedOn)}.`
    : schedule?.confirmedOn
      ? `Confirmed by SASSA on ${isoToLong(schedule.confirmedOn)}.`
      : null;
  const notice = provenance ? (
    <p className="text-xs font-mono text-muted-foreground bg-surface border border-border rounded-lg px-3 py-2">
      {provenance} Always confirm your own payment date in the SRD portal or at your pay point.
    </p>
  ) : null;

  const content = getPageBySlug(`/payment-dates/${slug}`);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    const faqJsonLd = faqBlock ? faqSchema(faqBlock.faqs) : null;
    const schema = articleSchema(content.seo?.metaTitle || content.title, content.seo?.metaDescription || content.description, content.lastUpdated, `/payment-dates/${slug}`, content.lastUpdated);
    return (
      <>
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Payment Dates", url: "/payment-dates" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} notice={notice} />
      </>
    );
  }

  const month = paymentMonths.find((m) => m.slug === slug);
  if (!month) notFound();

  const statusLabel = month.status === "provisional" ? "Provisional" : "Confirmed";
  const faqs = [
    {
      question: `When is the Older Persons grant paid in ${month.label}?`,
      answer: `The Older Persons grant is paid on ${month.dates.olderPersons} in ${month.label}. This is the release date; a bank transfer can reflect one to three business days later.`,
    },
    {
      question: `When is the Disability grant paid in ${month.label}?`,
      answer: `The Disability grant is paid on ${month.dates.disability} in ${month.label}. If the payment has not reflected after five business days, check your status before visiting an office.`,
    },
    {
      question: `When are Children's grants paid in ${month.label}?`,
      answer: `Child Support, Foster Care and Care Dependency grants are paid on ${month.dates.children} in ${month.label}. The date is shared across the children's grants.`,
    },
    {
      question: `When does SRD R370 pay in ${month.label}?`,
      answer: `SRD R370 payments run from ${month.dates.srd}. SRD is paid in batches, so your own date depends on your approved batch rather than the first day of the window.`,
    },
    ...(month.revisedOn
      ? [{
          question: `Why did the ${month.label} SASSA payment dates change?`,
          answer: `SASSA revised the ${month.label} schedule on ${isoToLong(month.revisedOn)}. ${month.notes ?? ""}`.trim(),
        }]
      : []),
    {
      question: "Do I need to re-apply because the payment date changed?",
      answer: "No. A date change affects timing only. Your grant is paid automatically and your eligibility is unchanged. Apply again only if SASSA has told you that you must re-apply.",
    },
  ];
  const faqJsonLd = faqSchema(faqs);
  const pageSchema = webpageSchema(
    `SASSA Payment Dates ${month.label} — ${statusLabel} Schedule`,
    `The ${statusLabel.toLowerCase()} SASSA payment schedule for ${month.label}, including Older Persons, Disability, Children's and SRD R370 dates.`,
    `/payment-dates/${month.slug}`
  );

  const previousMonth = paymentMonths[paymentMonths.findIndex((m) => m.slug === month.slug) - 1];
  const nextMonth = paymentMonths[paymentMonths.findIndex((m) => m.slug === month.slug) + 1];

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Payment Dates", url: "/payment-dates" },
    { name: month.label, url: `/payment-dates/${month.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-surface border border-border rounded-lg px-4 py-3 space-y-1.5">
          <p className="text-xs font-mono text-muted-foreground">
            <span className={`font-bold ${month.status === "provisional" ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300"}`}>
              {statusLabel}
            </span>
            {" "}schedule · last checked {PAYMENT_DATA_UPDATED}
            {provenance ? ` · ${provenance}` : ""}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Source:{" "}
            <a href={OFFICIAL_LINKS.sassa} target="_blank" rel="noopener noreferrer" className="font-bold text-violet hover:underline">
              SASSA official announcements
            </a>
            . Always confirm your own payment date in the SRD portal or at your pay point.
          </p>
        </div>
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-2xl font-black text-ink tracking-tight">SASSA Payment Dates — {month.label}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Complete schedule of social grant payout dates for {month.label}.
              {month.notes && <span className="block mt-1 text-xs font-medium text-gold-dark">{month.notes}</span>}
            </p>
            {month.status === "provisional" && (
              <p className="text-xs text-amber-800 dark:text-amber-200 mt-2 leading-relaxed">
                These dates are provisional. SASSA has not yet confirmed the final schedule, so check again before making a payment decision.
              </p>
            )}
          </div>
        </div>

        {month.description && (
          <div className="bg-surface border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">{month.description}</p>
          </div>
        )}

        <div className="overflow-hidden border border-border rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-canvas border-b border-border">
                <th className="text-left p-4 font-extrabold text-ink font-mono text-xs uppercase tracking-wider">Grant Type</th>
                <th className="text-left p-4 font-extrabold text-ink font-mono text-xs uppercase tracking-wider">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="bg-surface">
                <td className="p-4 font-bold text-ink">Older Persons Grant (Pension)</td>
                <td className="p-4 text-muted-foreground font-mono">{month.dates.olderPersons}</td>
              </tr>
              <tr className="bg-surface">
                <td className="p-4 font-bold text-ink">Disability Grant</td>
                <td className="p-4 text-muted-foreground font-mono">{month.dates.disability}</td>
              </tr>
              <tr className="bg-surface">
                <td className="p-4 font-bold text-ink">Children&apos;s Grants (Child Support, Foster Care, Care Dependency)</td>
                <td className="p-4 text-muted-foreground font-mono">{month.dates.children}</td>
              </tr>
              <tr className="bg-surface">
                <td className="p-4 font-bold text-ink">Social Relief of Distress (SRD R370)</td>
                <td className="p-4 text-muted-foreground font-mono">{month.dates.srd}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {month.notes && (
          <div className="bg-accent-light border border-border rounded-xl p-5">
            <h2 className="text-sm font-extrabold text-accent-dark mb-2">What to Know for {month.monthLabel}</h2>
            <p className="text-sm text-accent-dark leading-relaxed">{month.notes}</p>
            {month.slug === "2026-november" && (
              <Link href="/news/sassa-november-2026-payment-dates-revised" className="inline-flex text-sm font-bold text-accent-dark underline underline-offset-2 mt-3">
                Read why SASSA moved the November payment dates
              </Link>
            )}
          </div>
        )}

        <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
          <h2 className="text-sm font-extrabold text-ink">Questions about {month.label}</h2>
          <div className="space-y-2">
            {faqs.map((item) => (
              <details key={item.question} className="group border border-border rounded-lg bg-canvas overflow-hidden">
                <summary className="text-sm font-bold text-ink p-3 cursor-pointer list-none flex items-center justify-between gap-3">
                  {item.question}
                  <svg className="w-4 h-4 text-ash shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="bg-violet/5 border border-violet/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-carbon leading-relaxed">
            This page explains the schedule. To see your own payment date and status, use the official SRD portal or WhatsApp line.
          </p>
          <a href={OFFICIAL_LINKS.srd} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-violet text-white rounded-lg text-xs font-bold hover:opacity-90 transition shrink-0">
            Check your own status
          </a>
        </div>

        {(previousMonth || nextMonth) && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
            {previousMonth ? (
              <Link href={`/payment-dates/${previousMonth.slug}`} className="text-violet hover:underline">← {previousMonth.label}</Link>
            ) : <span />}
            {nextMonth && (
              <Link href={`/payment-dates/${nextMonth.slug}`} className="text-violet hover:underline">{nextMonth.label} →</Link>
            )}
          </div>
        )}

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Other Months</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {paymentMonths.map((m) => (
              <Link
                key={m.id}
                href={`/payment-dates/${m.slug}`}
                className={`text-xs font-bold px-3 py-2 rounded-lg border transition ${
                  m.slug === month.slug
                    ? "bg-accent text-black border-accent"
                    : "bg-canvas text-muted-foreground border-border hover:bg-surface hover:text-ink"
                }`}
              >
                {m.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
