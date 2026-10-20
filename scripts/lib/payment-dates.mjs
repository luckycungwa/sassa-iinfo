/**
 * Shared row builders for SASSA payment-date tables.
 *
 * `lib/data/paymentDates.ts` is the single source of truth. Both
 * `scripts/sync-dates.mjs` (writer) and `scripts/validate-content.mjs`
 * (drift detector) use these builders, so a table can never disagree
 * with the data file.
 */

import {
  MONTH_NAMES,
  PAYMENT_REFERENCE_DATE,
  compareDateParts,
  formatDateParts,
  parseDisplayDate,
  parseDisplayRange,
  weekdayName,
} from "../../lib/data/paymentDates.ts";
import {
  DEFAULT_SRD_DAY_LABEL,
  getSrdWindow,
} from "../../lib/data/srd.ts";

const LABELS = {
  olderPersons: "Older Persons Grant (Pension)",
  disability: "Disability Grant",
  children: "Children's Grants (CSG, Foster Care, CDG)",
  review: "Review and verification cases",
  srd: "Social Relief of Distress (SRD R370)",
};

/** Grant-page content files that carry a full-year table. */
export const GRANT_PAGE_FILES = {
  olderPersons: "older-persons-grant-payment-dates.json",
  disability: "disability-grant-payment-dates.json",
};

function hasPassed(parts) {
  return Boolean(parts && PAYMENT_REFERENCE_DATE && compareDateParts(parts, PAYMENT_REFERENCE_DATE) < 0);
}

function isEarly(month, parts) {
  return Boolean(parts && (parts.month !== month.month || parts.year !== month.year));
}

function grantStatus(month, parts, { review = false, early = false } = {}) {
  if (month.status === "provisional") {
    return review ? "Provisional — notified beneficiaries" : "Provisional";
  }
  if (hasPassed(parts)) {
    return review ? "Paid — notified beneficiaries" : "Paid";
  }
  if (early) return "Confirmed — paid early";
  return review ? "Confirmed — notified beneficiaries" : "Confirmed";
}

function srdStatus(month, window) {
  if (month.status === "provisional") return "Provisional — confirm in SRD portal";
  if (!window) return "Expected — check your SRD status";
  if (hasPassed(window.end)) return "Paid — batches complete";
  if (hasPassed(window.start)) return "In progress — check your SRD status";
  return "Expected — check your SRD status";
}

function formatRange(value) {
  const window = parseDisplayRange(value);
  if (!window) return value;
  const { start, end } = window;
  if (start.year === end.year && start.month === end.month) {
    return `${start.day}-${end.day} ${MONTH_NAMES[end.month - 1]} ${end.year}`;
  }
  return `${formatDateParts(start, "short")} - ${formatDateParts(end, "short")}`;
}

function caption(month) {
  if (month.revisedOn) return `SASSA payment dates for ${month.label}, revised on ${isoLong(month.revisedOn)}`;
  if (month.confirmedOn) return `SASSA payment dates for ${month.label}, confirmed on ${isoLong(month.confirmedOn)}`;
  if (month.status === "provisional") return `Provisional SASSA payment dates for ${month.label}`;
  return `SASSA payment dates for ${month.label}`;
}

function isoLong(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return formatDateParts({ day, month, year });
}

/**
 * Table for a month page (`content/payment-dates/2026-november.json`).
 * Returns { caption, headers, rows } without an id, so callers keep the
 * id already in the file.
 */
export function monthPageTable(month) {
  const olderPersons = parseDisplayDate(month.dates.olderPersons);
  const disability = parseDisplayDate(month.dates.disability);
  const children = parseDisplayDate(month.dates.children);
  const review = month.review ? parseDisplayDate(month.review) : null;
  const srd = parseDisplayRange(month.dates.srd);

  const rows = [
    [LABELS.olderPersons, formatDateParts(olderPersons), weekdayName(olderPersons), grantStatus(month, olderPersons, { early: isEarly(month, olderPersons) })],
    [LABELS.disability, formatDateParts(disability), weekdayName(disability), grantStatus(month, disability)],
    [LABELS.children, formatDateParts(children), weekdayName(children), grantStatus(month, children)],
  ];

  if (review) {
    rows.push([LABELS.review, formatDateParts(review), weekdayName(review), grantStatus(month, review, { review: true })]);
  }

  rows.push([LABELS.srd, formatRange(month.dates.srd), getSrdWindow(month.id)?.dayLabel ?? DEFAULT_SRD_DAY_LABEL, srdStatus(month, srd)]);

  return {
    caption: caption(month),
    headers: ["Grant type", month.status === "provisional" ? "Expected date" : "Payment date", "Day", "Status"],
    rows,
  };
}

/** One row of a grant page's full-year table. */
export function grantPageRow(month, key) {
  const parts = parseDisplayDate(month.dates[key]);
  let note = "Confirmed";
  if (month.status === "provisional") note = "Provisional";
  else if (hasPassed(parts)) note = "Paid";
  else if (isEarly(month, parts)) note = "Confirmed — paid early";
  return [month.label, formatDateParts(parts), note];
}
