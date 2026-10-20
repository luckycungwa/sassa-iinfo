import { srdWindowLabel } from "./srd.ts";

export type PaymentMonthStatus = "confirmed" | "provisional";

export interface PaymentMonth {
  id: string;
  slug: string;
  year: number;
  month: number;
  monthLabel: string;
  label: string;
  isCurrent: boolean;
  isFuture: boolean;
  status: PaymentMonthStatus;
  /** ISO date (YYYY-MM-DD) SASSA confirmed this schedule. */
  confirmedOn?: string;
  /** ISO date (YYYY-MM-DD) SASSA revised an already-published schedule. */
  revisedOn?: string;
  review?: string;
  dates: {
    olderPersons: string;
    disability: string;
    children: string;
    srd: string;
  };
  notes?: string;
  description?: string;
}

export const PAYMENT_DATA_UPDATED = "20 October 2026";

export const paymentMonths: PaymentMonth[] = [
  {
    id: "2026-01",
    slug: "2026-january",
    year: 2026,
    month: 1,
    monthLabel: "January",
    label: "January 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    review: "7 Jan 2026",
    dates: {
      olderPersons: "2 Jan 2026",
      disability: "5 Jan 2026",
      children: "6 Jan 2026",
      srd: srdWindowLabel("2026-01"),
    },
    notes: "New year schedule — first SRD batch of 2026 starts 23 Jan. Allow 1-3 days for bank transfers.",
    description: "January 2026 opens the new grant year. Permanent grants follow the standard first-week schedule. SRD R370 payments begin from the 23rd, with most beneficiaries receiving their batch payment by the 30th. Plan your January collection for the second week to avoid post-holiday queues at pay points.",
  },
  {
    id: "2026-02",
    slug: "2026-february",
    year: 2026,
    month: 2,
    monthLabel: "February",
    label: "February 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    review: "6 Feb 2026",
    dates: {
      olderPersons: "3 Feb 2026",
      disability: "4 Feb 2026",
      children: "5 Feb 2026",
      srd: srdWindowLabel("2026-02"),
    },
    notes: "Short month — compressed SRD window. Watch for the budget speech announcing grant increases.",
    description: "February is a short month, so SRD payments are compressed into the 25th-28th window. The annual budget speech typically occurs this month, where new grant amounts for the coming fiscal year are announced. Check the news section for budget updates affecting grant increases.",
  },
  {
    id: "2026-03",
    slug: "2026-march",
    year: 2026,
    month: 3,
    monthLabel: "March",
    label: "March 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    review: "6 Mar 2026",
    dates: {
      olderPersons: "3 Mar 2026",
      disability: "4 Mar 2026",
      children: "5 Mar 2026",
      srd: srdWindowLabel("2026-03"),
    },
    notes: "Last month of fiscal year — new grant amounts take effect from April. SRD reviews active.",
    description: "March 2026 is the last month of the current fiscal year. New grant amounts announced in the February budget typically take effect from April. SRD R370 beneficiaries should expect the standard March batch window. This is also a key month for grant review cycles.",
  },
  {
    id: "2026-04",
    slug: "2026-april",
    year: 2026,
    month: 4,
    monthLabel: "April",
    label: "April 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    review: "7 Apr 2026",
    dates: {
      olderPersons: "2 Apr 2026",
      disability: "3 Apr 2026",
      children: "6 Apr 2026",
      srd: srdWindowLabel("2026-04"),
    },
    notes: "New fiscal year — updated grant amounts apply. Database re-verifications may cause status changes.",
    description: "April marks the start of the new fiscal year. Updated grant amounts from the budget speech apply from this month. SRD R370 beneficiaries who rely on recurring monthly approval should check their status early, as the new fiscal year can trigger database re-verifications.",
  },
  {
    id: "2026-05",
    slug: "2026-may",
    year: 2026,
    month: 5,
    monthLabel: "May",
    label: "May 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    review: "7 May 2026",
    dates: {
      olderPersons: "4 May 2026",
      disability: "5 May 2026",
      children: "6 May 2026",
      srd: srdWindowLabel("2026-05"),
    },
    notes: "Standard schedule — check that April grant increases are reflected correctly.",
    description: "May follows the standard payment pattern with no public holidays affecting the schedule. The first week is reserved for permanent grants, with SRD batch payments in the last week. This is a good month to check if your grant increase from April has been applied correctly.",
  },
  {
    id: "2026-06",
    slug: "2026-june",
    year: 2026,
    month: 6,
    monthLabel: "June",
    label: "June 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    review: "8 Jun 2026",
    dates: {
      olderPersons: "3 Jun 2026",
      disability: "4 Jun 2026",
      children: "5 Jun 2026",
      srd: srdWindowLabel("2026-06"),
    },
    notes: "Youth Day (16 June) did not affect pay dates. Standard schedule applies.",
    description: "Youth Day (16 June) was a public holiday but did not affect the standard payment schedule. SRD beneficiaries checked their status mid-month for the June approval result, with payments starting from the 25th.",
  },
  {
    id: "2026-07",
    slug: "2026-july",
    year: 2026,
    month: 7,
    monthLabel: "July",
    label: "July 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    review: "7 Jul 2026",
    dates: {
      olderPersons: "3 Jul 2026",
      disability: "4 Jul 2026",
      children: "5 Jul 2026",
      srd: srdWindowLabel("2026-07"),
    },
    notes: "Q2 SRD review cycle active. 350,000 grants under review as of 21 July.",
    description: "The Q2 review cycle for SRD grants began in July, which resulted in more applications showing 'Under Review' status in the first two weeks. The 350,000-grant review announcement was made on 21 July by Social Development Minister Dina Pule.",
  },
  {
    id: "2026-08",
    slug: "2026-august",
    year: 2026,
    month: 8,
    monthLabel: "August",
    label: "August 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    confirmedOn: "2026-07-29",
    review: "7 Aug 2026",
    dates: {
      olderPersons: "4 Aug 2026",
      disability: "5 Aug 2026",
      children: "6 Aug 2026",
      srd: srdWindowLabel("2026-08"),
    },
    notes: "Fourth day added 7 Aug 2026 for grant reviews. Confirmed by SASSA 29 July 2026.",
    description: "SASSA confirmed August 2026 payment dates on 29 July 2026. A notable change: a fourth payment day on 7 August has been added for beneficiaries flagged for grant reviews or eLife certification verification. Beneficiaries who are not flagged receive payments on their standard dates (4-6 August). Women's Day (9 August) is a public holiday but does not shift payment dates.",
  },
  {
    id: "2026-09",
    slug: "2026-september",
    year: 2026,
    month: 9,
    monthLabel: "September",
    label: "September 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    confirmedOn: "2026-08-21",
    review: "7 Sep 2026",
    dates: {
      olderPersons: "2 Sep 2026",
      disability: "3 Sep 2026",
      children: "4 Sep 2026",
      srd: srdWindowLabel("2026-09"),
    },
    notes: "Confirmed by SASSA 21 August 2026. Review cycle day: Monday 7 Sep. Heritage Day (24 Sep) falls on the first day of the SRD window.",
    description: "SASSA confirmed September 2026 payment dates on 21 August 2026. Permanent grants are paid 2-4 September, the review-cycle window continues on Monday 7 September for review outcomes and backlog payments, and SRD R370 payments run from 24 to 30 September. Heritage Day (Thursday 24 September) falls on the first day of the SRD window — bank transfers processed that day typically reflect from Friday 25 September.",
  },
  {
    id: "2026-10",
    slug: "2026-october",
    year: 2026,
    month: 10,
    monthLabel: "October",
    label: "October 2026",
    isCurrent: false,
    isFuture: false,
    status: "confirmed",
    review: "7 Oct 2026",
    dates: {
      olderPersons: "2 Oct 2026",
      disability: "5 Oct 2026",
      children: "6 Oct 2026",
      srd: srdWindowLabel("2026-10"),
    },
    notes: "Permanent grants paid 2, 5 and 6 October. Review-process beneficiaries: 7 October. SRD R370 batches run from 24 October.",
    description: "October 2026 payments started on Friday 2 October with the Older Persons grant, followed by Disability grants on Monday 5 October and Children's grants on Tuesday 6 October. The review and verification day is Wednesday 7 October. SRD R370 batches run from 24 to 31 October. All permanent-grant dates have passed; SRD is the only payment still outstanding this month.",
  },
  {
    id: "2026-11",
    slug: "2026-november",
    year: 2026,
    month: 11,
    monthLabel: "November",
    label: "November 2026",
    isCurrent: false,
    isFuture: true,
    status: "confirmed",
    revisedOn: "2026-10-15",
    review: "5 Nov 2026",
    dates: {
      olderPersons: "30 Oct 2026",
      disability: "2 Nov 2026",
      children: "3 Nov 2026",
      srd: srdWindowLabel("2026-11"),
    },
    notes: "Confirmed and revised by SASSA on 15 October 2026. Older Persons move to Friday 30 October because 4 November is a public holiday for the Local Government Elections. Disability: 2 Nov, Children: 3 Nov, review-process: 5 Nov.",
    description: "SASSA revised the November 2026 schedule on 15 October 2026 after Wednesday 4 November was declared a public holiday for the Local Government Elections. Older Persons grants are paid early, on Friday 30 October. Disability grants follow on Monday 2 November, Children's grants on Tuesday 3 November, and review-process beneficiaries on Thursday 5 November. SRD R370 batches are expected from 24 to 30 November.",
  },
  {
    id: "2026-12",
    slug: "2026-december",
    year: 2026,
    month: 12,
    monthLabel: "December",
    label: "December 2026",
    isCurrent: false,
    isFuture: true,
    status: "provisional",
    review: "7 Dec 2026",
    dates: {
      olderPersons: "2 Dec 2026",
      disability: "3 Dec 2026",
      children: "4 Dec 2026",
      srd: srdWindowLabel("2026-12"),
    },
    notes: "Provisional — permanent grants follow the first-week pattern. SRD batches are expected from 23 December so money lands before Christmas. Confirm final dates with SASSA.",
    description: "December is the holiday season. Permanent grants are expected in the first week: Older Persons 2 December, Disability 3 December, Children's 4 December. SRD R370 batches are expected from 23 December so beneficiaries have funds before Christmas. Expect longer queues at retail pay points and slower bank transfers between Christmas and New Year. Dates are provisional until SASSA confirms.",
  },
];

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export interface DateParts {
  day: number;
  month: number;
  year: number;
}

const MONTH_INDEX = new Map<string, number>();
MONTH_NAMES.forEach((name, index) => {
  MONTH_INDEX.set(name.toLowerCase(), index + 1);
  MONTH_INDEX.set(name.slice(0, 3).toLowerCase(), index + 1);
});
MONTH_INDEX.set("sept", 9);

/** Parses display dates such as "30 Oct 2026", "2 January 2026" or "7 Oct 2026". */
export function parseDisplayDate(value: string): DateParts | null {
  const match = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(value.trim());
  if (!match) return null;
  const month = MONTH_INDEX.get(match[2].toLowerCase());
  if (!month) return null;
  return { day: Number(match[1]), month, year: Number(match[3]) };
}

/** Parses a display range such as "24-30 Nov 2026". */
export function parseDisplayRange(value: string): { start: DateParts; end: DateParts } | null {
  const range = /^(\d{1,2})\s*[-\u2013]\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(value.trim());
  if (!range) {
    const single = parseDisplayDate(value);
    return single ? { start: single, end: single } : null;
  }
  const month = MONTH_INDEX.get(range[3].toLowerCase());
  if (!month) return null;
  const year = Number(range[4]);
  return {
    start: { day: Number(range[1]), month, year },
    end: { day: Number(range[2]), month, year },
  };
}

/** Parses the end of a display range such as "24-30 Nov 2026". */
export function parseDisplayRangeEnd(value: string): DateParts | null {
  return parseDisplayRange(value)?.end ?? null;
}

export function formatDateParts(parts: DateParts, style: "long" | "short" = "long"): string {
  const month = style === "long" ? MONTH_NAMES[parts.month - 1] : MONTH_NAMES[parts.month - 1].slice(0, 3);
  return `${parts.day} ${month} ${parts.year}`;
}

export function isoToLong(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return formatDateParts({ day, month, year });
}

export function weekdayName(parts: DateParts): string {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  return new Intl.DateTimeFormat("en-ZA", { weekday: "long", timeZone: "UTC" }).format(date);
}

export function compareDateParts(a: DateParts, b: DateParts): number {
  if (a.year !== b.year) return a.year < b.year ? -1 : 1;
  if (a.month !== b.month) return a.month < b.month ? -1 : 1;
  if (a.day !== b.day) return a.day < b.day ? -1 : 1;
  return 0;
}

/** "As of" date used to decide whether a payment has already been made. */
export const PAYMENT_REFERENCE_DATE = parseDisplayDate(PAYMENT_DATA_UPDATED);

const SAST_DATE = new Intl.DateTimeFormat("en-ZA", {
  timeZone: "Africa/Johannesburg",
  year: "numeric",
  month: "numeric",
});

function sastYearMonth(now: Date): { year: number; month: number } {
  const parts = SAST_DATE.formatToParts(now);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  return { year, month };
}

function isFutureMonth(month: PaymentMonth, year: number, monthNumber: number): boolean {
  return month.year > year || (month.year === year && month.month > monthNumber);
}

export function getPaymentMonths(now: Date = new Date()): PaymentMonth[] {
  const { year, month } = sastYearMonth(now);
  return paymentMonths.map((entry) => ({
    ...entry,
    isCurrent: entry.year === year && entry.month === month,
    isFuture: isFutureMonth(entry, year, month),
  }));
}

export function getCurrentPaymentMonth(now: Date = new Date()): PaymentMonth | undefined {
  return getPaymentMonths(now).find((entry) => entry.isCurrent);
}

export function getNextPaymentMonth(now: Date = new Date()): PaymentMonth | undefined {
  const { year, month } = sastYearMonth(now);
  return paymentMonths.find((entry) => isFutureMonth(entry, year, month));
}

export function getUpcomingPaymentMonths(now: Date = new Date(), limit = 3): PaymentMonth[] {
  const { year, month } = sastYearMonth(now);
  return paymentMonths
    .filter((entry) => entry.year === year && entry.month >= month)
    .slice(0, limit);
}
