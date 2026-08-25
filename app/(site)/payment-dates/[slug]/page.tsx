import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl } from "@/lib/canonical";
import { paymentMonths } from "../../../../lib/data/paymentDates";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema, faqSchema } from "../../../../lib/json-ld";
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
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/payment-dates/${slug}`) } };
  }

  const month = paymentMonths.find((m) => m.slug === slug);
  if (!month) return {};
  return {
    title: `SASSA Payment Dates ${month.label} | Social Grant Payout Schedule`,
    description: `SASSA payment dates for ${month.label}. Older Persons: ${month.dates.olderPersons}, Disability: ${month.dates.disability}, Children: ${month.dates.children}, SRD R370: ${month.dates.srd}.`,
    alternates: { canonical: canonicalUrl(`/payment-dates/${slug}`) },
  };
}

export default async function PaymentMonthPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/payment-dates/${slug}`);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    const faqJsonLd = faqBlock ? faqSchema(faqBlock.faqs) : null;
    return (
      <>
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Payment Dates", url: "/payment-dates" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const month = paymentMonths.find((m) => m.slug === slug);
  if (!month) notFound();

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Payment Dates", url: "/payment-dates" },
    { name: month.label, url: `/payment-dates/${month.slug}` },
  ]);

  const formatDate = (d: string) => d;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-2xl font-black text-ink tracking-tight">SASSA Payment Dates — {month.label}</h1>
            <p className="text-sm text-muted mt-1">
              Complete schedule of social grant payout dates for {month.label}.
              {month.notes && <span className="block mt-1 text-xs font-medium text-gold-dark">{month.notes}</span>}
            </p>
          </div>
        </div>

        {month.description && (
          <div className="bg-surface border border-border rounded-xl p-5">
            <p className="text-sm text-muted leading-relaxed">{month.description}</p>
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
                <td className="p-4 text-muted font-mono">{formatDate(month.dates.olderPersons)}</td>
              </tr>
              <tr className="bg-surface">
                <td className="p-4 font-bold text-ink">Disability Grant</td>
                <td className="p-4 text-muted font-mono">{formatDate(month.dates.disability)}</td>
              </tr>
              <tr className="bg-surface">
                <td className="p-4 font-bold text-ink">Children&apos;s Grants (Child Support, Foster Care, Care Dependency)</td>
                <td className="p-4 text-muted font-mono">{formatDate(month.dates.children)}</td>
              </tr>
              <tr className="bg-surface">
                <td className="p-4 font-bold text-ink">Social Relief of Distress (SRD R370)</td>
                <td className="p-4 text-muted font-mono">{formatDate(month.dates.srd)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {month.notes && (
          <div className="bg-accent-light border border-border rounded-xl p-5">
            <h2 className="text-sm font-extrabold text-accent-dark mb-2">What to Know for {month.monthLabel}</h2>
            <p className="text-sm text-accent-dark leading-relaxed">{month.notes}</p>
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
                    : "bg-canvas text-muted border-border hover:bg-surface hover:text-ink"
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
