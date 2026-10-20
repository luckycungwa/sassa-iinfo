/**
 * SRD R370 payment windows.
 *
 * The Social Relief of Distress grant is paid in month-end batches rather
 * than on a single day, so its windows are modelled separately from the
 * per-grant payment dates in `paymentDates.ts`. Month pages derive their
 * SRD display string from here, which keeps the batch window in one place.
 */

export interface SrdWindow {
  /** Matches `PaymentMonth.id`, e.g. "2026-11". */
  monthId: string;
  /** First day of the batch window (ISO YYYY-MM-DD). */
  start: string;
  /** Last day of the batch window (ISO YYYY-MM-DD). */
  end: string;
  /** Day-column label for the SRD row when it is not the usual batches. */
  dayLabel?: string;
}

export const SRD_AMOUNT = "R370";
export const SRD_CHECK_URL = "https://srd.sassa.gov.za";

export const DEFAULT_SRD_DAY_LABEL = "Month-end batches";

export const srdWindows: SrdWindow[] = [
  { monthId: "2026-01", start: "2026-01-23", end: "2026-01-30" },
  { monthId: "2026-02", start: "2026-02-25", end: "2026-02-28" },
  { monthId: "2026-03", start: "2026-03-25", end: "2026-03-31" },
  { monthId: "2026-04", start: "2026-04-24", end: "2026-04-30" },
  { monthId: "2026-05", start: "2026-05-25", end: "2026-05-30" },
  { monthId: "2026-06", start: "2026-06-25", end: "2026-06-30" },
  { monthId: "2026-07", start: "2026-07-25", end: "2026-07-30" },
  { monthId: "2026-08", start: "2026-08-25", end: "2026-08-31" },
  { monthId: "2026-09", start: "2026-09-24", end: "2026-09-30" },
  { monthId: "2026-10", start: "2026-10-24", end: "2026-10-31" },
  { monthId: "2026-11", start: "2026-11-24", end: "2026-11-30" },
  { monthId: "2026-12", start: "2026-12-23", end: "2026-12-31", dayLabel: "Festive batches" },
];

const windowsById = new Map(srdWindows.map((w) => [w.monthId, w]));

export function getSrdWindow(monthId: string): SrdWindow | undefined {
  return windowsById.get(monthId);
}

const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parts(iso: string): { year: number; month: number; day: number } {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

/**
 * Display label for a month's SRD window, e.g. "24-30 Nov 2026".
 * Falls back to an empty string when a month has no window yet.
 */
export function srdWindowLabel(monthId: string): string {
  const window = getSrdWindow(monthId);
  if (!window) return "";
  const start = parts(window.start);
  const end = parts(window.end);
  if (start.year === end.year && start.month === end.month) {
    return `${start.day}-${end.day} ${SHORT_MONTHS[end.month - 1]} ${end.year}`;
  }
  const startLabel = `${start.day} ${SHORT_MONTHS[start.month - 1]} ${start.year}`;
  const endLabel = `${end.day} ${SHORT_MONTHS[end.month - 1]} ${end.year}`;
  return `${startLabel} - ${endLabel}`;
}
