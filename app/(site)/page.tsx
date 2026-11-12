import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { webpageSchema } from "@/lib/json-ld";
import { loadAllContent } from "@/lib/content-loader";
import {
  getCurrentPaymentMonth,
  getPaymentMonths,
  PAYMENT_DATA_UPDATED,
  type PaymentMonth,
} from "@/lib/data/paymentDates";
import {
  grantAmounts,
  GRANT_AMOUNTS_EFFECTIVE,
  GRANT_AMOUNTS_SOURCE,
} from "@/lib/data/grantAmounts";
import { SITE_NAME, OFFICIAL_LINKS } from "@/lib/site";
import AdUnit from "@/components/ads/AdUnit";
import { AD_SLOTS } from "@/lib/ads";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Hourglass,
  RefreshCw,
  Scale,
  ShieldCheck,
  Smartphone,
  XCircle,
  Wallet,
} from "lucide-react";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "SASSA Grant Hub 2026 | Grant Status, Payment Dates & Appeals",
  description:
    "Understand your SASSA status, payment dates, grant amounts, applications and appeals. Independent guidance with direct links to official SASSA services.",
  path: "/",
  absoluteTitle: true,
  socialDescription:
    "Clear guidance on SASSA statuses, payment dates, grant amounts, applications and appeals. Independent, sourced and updated for November 2026.",
});

const commonProblems = [
  {
    href: "/status/pending",
    label: "Pending",
    title: "My status is pending",
    description: "What Pending means, how long it usually lasts, and when following up actually helps.",
    icon: Hourglass,
  },
  {
    href: "/status/declined",
    label: "Declined",
    title: "My application was declined",
    description: "Read the reason on your outcome letter, then check whether an appeal is the right next step.",
    icon: XCircle,
  },
  {
    href: "/banking/payment-not-reflecting",
    label: "Approved, unpaid",
    title: "Approved, but I have not been paid",
    description: "Work through payment method, bank verification and the official escalation route.",
    icon: Wallet,
  },
  {
    href: "/grants/srd-r370-grant/monthly-review",
    label: "Under review",
    title: "My grant is under review",
    description: "What a review notice means, what to send, and what happens if you miss the appointment.",
    icon: RefreshCw,
  },
  {
    href: "/appeals/appeal-status-check",
    label: "Appeal",
    title: "I need to check my appeal",
    description: "Where an ITSAA appeal is tracked, what the outcome statuses mean, and how long it can take.",
    icon: Scale,
  },
  {
    href: "/banking/update-bank-details",
    label: "Banking",
    title: "I need to update my banking details",
    description: "The official ways to change a bank account or payment method, and the documents to bring.",
    icon: Smartphone,
  },
];

function formatShortDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return value;
  }
}

function scheduleRows(month: PaymentMonth) {
  return [
    { label: "Older Persons Grant", value: month.dates.olderPersons },
    { label: "Disability Grant", value: month.dates.disability },
    { label: "Children's Grants", value: month.dates.children },
    { label: "Review and verification cases", value: month.review ?? "Announced separately" },
  ];
}

export default function HomePage() {
  const pageSchema = webpageSchema(
    "SASSA Grant Hub 2026 — Grant Status, Payment Dates & Appeals",
    "Independent guidance on SASSA statuses, payment dates, grant amounts, applications and appeals.",
    "/"
  );

  const latestNews = loadAllContent()
    .filter((page) => page.classification === "news-article" && page.status === "published")
    .map((article) => ({
      href: article.slug,
      title: article.title,
      updated: article.lastUpdated,
      description: article.description,
    }))
    .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    .slice(0, 5);

  const months = getPaymentMonths();
  const currentMonth = getCurrentPaymentMonth();
  const futureMonths = months.filter(
    (month) =>
      !currentMonth ||
      month.year > currentMonth.year ||
      (month.year === currentMonth.year && month.month > currentMonth.month)
  );
  const schedule = (futureMonths.length >= 2 ? futureMonths : months.slice(-2)).slice(0, 2);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      {/* A. Hero */}
      <section className="bg-slate text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/hero-bg.avif')] bg-cover bg-center opacity-[0.06]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 mb-4">
                Independent South African grant information
              </p>
              <h1 className="text-[38px] sm:text-[46px] lg:text-[56px] font-black leading-[1.08] tracking-[-0.02em] text-white max-w-2xl">
                Check Your SASSA Status. Understand Your Next Step.
              </h1>
              <p className="text-[18px] md:text-[20px] text-white/80 leading-relaxed mt-6 max-w-xl">
                Find clear, up-to-date guidance on SASSA grant statuses, payment dates, applications, appeals,
                eligibility, and banking details. Understand what your status means and where to find official assistance.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet text-white rounded-[28.5px] text-base font-bold hover:opacity-90 transition btn-violet"
                >
                  Check Your Status <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/grants"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white rounded-[28.5px] text-base font-bold hover:bg-white/10 transition"
                >
                  Explore SASSA Grants
                </Link>
              </div>

              <p className="flex items-start gap-2.5 text-sm text-white/70 mt-7 max-w-xl leading-relaxed">
                <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-white/60" aria-hidden="true" />
                Independent SASSA information resource. Not affiliated with SASSA or the South African government.
              </p>
            </div>

            <aside className="rounded-xl border border-white/15 bg-white/5 p-6 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Start with the right page</p>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href={OFFICIAL_LINKS.srd}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3"
                  >
                    <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-white/50 group-hover:text-white transition" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-bold text-white group-hover:underline">Check your own SRD record</span>
                      <span className="block text-xs text-white/60 mt-0.5">Official SASSA portal at srd.sassa.gov.za</span>
                    </span>
                  </a>
                </li>
                <li>
                  <Link href="/payment-dates/2026-november" className="group flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-white/50 group-hover:text-white transition" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-bold text-white group-hover:underline">November 2026 payment dates</span>
                      <span className="block text-xs text-white/60 mt-0.5">The revised schedule, and why it changed</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/status/declined" className="group flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-white/50 group-hover:text-white transition" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-bold text-white group-hover:underline">Declined? Read this first</span>
                      <span className="block text-xs text-white/60 mt-0.5">Reasons, the 90-day window, and how to appeal</span>
                    </span>
                  </Link>
                </li>
              </ul>
              <p className="text-xs text-white/55 mt-6 pt-5 border-t border-white/10 leading-relaxed">
                This site explains statuses and processes. It cannot look up your personal SASSA record.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <AdUnit slotId={AD_SLOTS.HOME_LEADERBOARD} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* B. Common problems */}
      <section className="bg-background py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-violet uppercase tracking-widest mb-2">Start with your situation</p>
            <h2 className="text-[28px] md:text-[36px] font-black text-carbon leading-[1.15] tracking-[-0.015em]">
              What is happening with your grant?
            </h2>
            <p className="text-base text-ash mt-3 leading-relaxed">
              Pick the closest match. Each guide explains the status in plain language and points to the official next step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
            {commonProblems.map((problem) => {
              const Icon = problem.icon;
              return (
                <Link
                  key={problem.href}
                  href={problem.href}
                  className="group flex flex-col rounded-lg border border-border bg-card p-5 hover:border-border-strong hover:bg-surface-dim transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-violet">
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      {problem.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-ash opacity-0 group-hover:opacity-100 transition" aria-hidden="true" />
                  </div>
                  <p className="text-[17px] font-black text-carbon mt-2.5 leading-snug">{problem.title}</p>
                  <p className="text-sm text-ash mt-1.5 leading-relaxed">{problem.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* C. Current payment information */}
      <section className="bg-paper py-14 md:py-20 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-bold text-violet uppercase tracking-widest mb-2">Payment schedule</p>
              <h2 className="text-[28px] md:text-[36px] font-black text-carbon leading-[1.15] tracking-[-0.015em]">
                Current SASSA payment dates
              </h2>
              <p className="text-base text-ash mt-3 leading-relaxed">
                Permanent grants are paid in the first week of the month. The SRD R370 grant runs in a separate
                month-end window and is confirmed per beneficiary.
              </p>
            </div>
            <Link href="/payment-dates" className="inline-flex items-center gap-1.5 text-sm font-bold text-violet hover:underline shrink-0">
              Full 2026 calendar <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            {schedule.map((month) => {
              const confirmed = month.status === "confirmed";
              return (
                <div key={month.id} className="rounded-lg border border-border bg-background p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-black text-carbon">{month.label}</h3>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${
                        confirmed
                          ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
                          : "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200"
                      }`}
                    >
                      {confirmed ? <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> : <Clock className="w-3 h-3" aria-hidden="true" />}
                      {confirmed ? "Confirmed" : "Provisional"}
                    </span>
                  </div>

                  <dl className="mt-4 divide-y divide-border">
                    {scheduleRows(month).map((row) => (
                      <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
                        <dt className="text-sm text-ash">{row.label}</dt>
                        <dd className="text-sm font-bold text-carbon text-right">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-sm text-ash">
                        SRD R370 <span className="text-xs">(separate window)</span>
                      </p>
                      <p className="text-sm font-bold text-carbon text-right">{month.dates.srd}</p>
                    </div>
                    {month.notes && <p className="text-xs text-ash mt-3 leading-relaxed">{month.notes}</p>}
                  </div>

                  <Link
                    href={`/payment-dates/${month.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-violet hover:underline mt-4"
                  >
                    {month.label} details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 sm:p-5 mt-4 dark:border-amber-800 dark:bg-amber-950/40">
            <p className="text-sm font-bold text-amber-950 dark:text-amber-100">
              The November schedule is a one-off arrangement
            </p>
            <p className="text-sm text-amber-900 dark:text-amber-200 mt-1 leading-relaxed">
              Older Persons grants moved to 30 October 2026 because 4 November is a public holiday for the Local
              Government Elections. This does not mean future pension payments will permanently move into the previous month.
              A payment date is the release date; the time it reflects in your account depends on your bank or payment method.
            </p>
          </div>

          <p className="text-xs text-ash mt-4">
            Schedule last reviewed {PAYMENT_DATA_UPDATED}. Source:{" "}
            <a href={OFFICIAL_LINKS.sassa} target="_blank" rel="noopener noreferrer" className="font-bold text-violet hover:underline">
              SASSA official announcements
            </a>
            . Always confirm changes on SASSA&apos;s website or by SMS.
          </p>
        </div>
      </section>

      {/* D. Grant amounts and eligibility */}
      <section className="bg-background py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-bold text-violet uppercase tracking-widest mb-2">Amounts and eligibility</p>
              <h2 className="text-[28px] md:text-[36px] font-black text-carbon leading-[1.15] tracking-[-0.015em]">
                SASSA grant amounts
              </h2>
              <p className="text-base text-ash mt-3 leading-relaxed">
                Amounts effective {GRANT_AMOUNTS_EFFECTIVE}. Eligibility depends on age, income, assets and your
                circumstances, not on the amount alone.
              </p>
            </div>
            <Link href="/eligibility" className="inline-flex items-center gap-1.5 text-sm font-bold text-violet hover:underline shrink-0">
              Check eligibility <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            {grantAmounts.map((grant) => (
              <Link
                key={grant.slug}
                href={grant.href}
                className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 hover:border-border-strong hover:bg-surface-dim transition"
              >
                <div>
                  <p className="text-sm font-bold text-ash">{grant.shortName}</p>
                  <p className="text-[28px] font-black text-carbon mt-1.5 leading-none">
                    {grant.amount}
                    <span className="text-xs font-medium text-ash ml-1">/ month</span>
                  </p>
                  {grant.note && <p className="text-xs text-ash mt-2 leading-relaxed">{grant.note}</p>}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-violet mt-4">
                  Eligibility and how to apply <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <p className="text-xs text-ash mt-4">
            Amounts are per beneficiary or per child as indicated. Source:{" "}
            <a href={GRANT_AMOUNTS_SOURCE.url} target="_blank" rel="noopener noreferrer" className="font-bold text-violet hover:underline">
              {GRANT_AMOUNTS_SOURCE.label}
            </a>
            . Confirm your own entitlement with SASSA before budgeting.
          </p>
        </div>
      </section>

      {/* E. Latest updates */}
      <section className="bg-paper py-14 md:py-20 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold text-violet uppercase tracking-widest mb-2">Editorial log</p>
              <h2 className="text-[28px] md:text-[36px] font-black text-carbon leading-[1.15] tracking-[-0.015em]">
                Latest SASSA updates
              </h2>
            </div>
            <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-bold text-violet hover:underline shrink-0">
              All updates <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {latestNews.map((article) => (
              <Link key={article.href} href={article.href} className="group grid gap-2 sm:grid-cols-[140px_1fr] py-4">
                <span className="text-xs text-ash font-mono sm:pt-1">Updated {formatShortDate(article.updated)}</span>
                <span>
                  <span className="block text-base font-bold text-carbon group-hover:text-violet transition leading-snug">
                    {article.title}
                  </span>
                  <span className="block text-sm text-ash mt-1 leading-relaxed line-clamp-2">{article.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* F. Trust and editorial information */}
      <section className="bg-background py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-violet uppercase tracking-widest mb-2">How to trust this page</p>
            <h2 className="text-[28px] md:text-[36px] font-black text-carbon leading-[1.15] tracking-[-0.015em]">
              Independent, sourced, and clear about its limits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-sm font-black text-carbon">Who operates this site</p>
              <p className="text-sm text-ash mt-2 leading-relaxed">
                {SITE_NAME} is an independent information resource written and maintained by Lucky Cungwa at
                44tagstudios. It is not a government service, an agent, or a grant intermediary.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1 text-sm font-bold text-violet hover:underline mt-3">
                About this resource <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-sm font-black text-carbon">How information is checked</p>
              <p className="text-sm text-ash mt-2 leading-relaxed">
                Time-sensitive claims are compared with SASSA, the Department of Social Development and Government
                publications. Pages carry a review date; provisional schedules are labelled as provisional.
              </p>
              <Link href="/editorial-policy" className="inline-flex items-center gap-1 text-sm font-bold text-violet hover:underline mt-3">
                Editorial standards <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-sm font-black text-carbon">Report an error</p>
              <p className="text-sm text-ash mt-2 leading-relaxed">
                If a date, amount or instruction is wrong or out of date, tell us. Corrections are logged and the
                page review date is updated rather than quietly rewritten.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-bold text-violet hover:underline">
                  Contact us <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
                <Link href="/corrections-policy" className="inline-flex items-center gap-1 text-sm font-bold text-violet hover:underline">
                  Corrections policy <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-carbon">Official SASSA services</p>
              <p className="text-sm text-ash mt-1">
                Status checks, applications, banking updates and appeals must be done through official channels.
                Never share a PIN, OTP or banking password with anyone.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a
                href={OFFICIAL_LINKS.srd}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-violet text-white rounded-lg text-xs font-bold hover:opacity-90 transition"
              >
                SRD portal <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a
                href={OFFICIAL_LINKS.sassa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-border text-carbon rounded-lg text-xs font-bold hover:bg-fog transition"
              >
                SASSA.gov.za <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick access to the wider library, kept crawlable */}
      <section className="bg-paper py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold text-carbon uppercase tracking-wider mb-4">Popular starting points</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/guides/how-to-check-sassa-status" className="card p-4 hover:bg-surface-dim transition">
              <p className="text-sm font-bold text-carbon">How to check your status</p>
              <p className="text-xs text-ash mt-1">Official channels and what you need</p>
            </Link>
            <Link href="/guides/how-to-apply-sassa-grant" className="card p-4 hover:bg-surface-dim transition">
              <p className="text-sm font-bold text-carbon">Apply for a grant</p>
              <p className="text-xs text-ash mt-1">Documents, forms and office steps</p>
            </Link>
            <Link href="/appeals/how-to-appeal" className="card p-4 hover:bg-surface-dim transition">
              <p className="text-sm font-bold text-carbon">Appeal a decision</p>
              <p className="text-xs text-ash mt-1">The 90-day ITSAA route</p>
            </Link>
            <Link href="/guides/sassa-scam-alert-guide" className="card p-4 hover:bg-surface-dim transition">
              <p className="text-sm font-bold text-carbon">Avoid SASSA scams</p>
              <p className="text-xs text-ash mt-1">What SASSA will never ask for</p>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-violet">
            <Link href="/tools" className="hover:underline">Tools &amp; calculators</Link>
            <Link href="/downloads" className="hover:underline">Forms &amp; downloads</Link>
            <Link href="/provinces" className="hover:underline">Province guides</Link>
            <Link href="/offices" className="hover:underline">Office finder</Link>
            <Link href="/faq" className="hover:underline">FAQ</Link>
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm leading-relaxed max-w-2xl">
              <strong>Independent resource.</strong> Not affiliated with SASSA or the South African government.
              For official applications and status checks, use{" "}
              <a href={OFFICIAL_LINKS.srd} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">
                srd.sassa.gov.za
              </a>{" "}
              or call {OFFICIAL_LINKS.helpline}.
            </p>
            <Link href="/guides/how-to-check-sassa-status" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline shrink-0">
              How status checks work <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
