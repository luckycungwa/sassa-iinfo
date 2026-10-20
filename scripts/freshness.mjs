/**
 * Freshness report for content pages.
 *
 *   npm run freshness           → report only
 *   npm run freshness -- --strict → exit 1 when any published page is stale
 *
 * Age is measured from `lastReviewed` when present, otherwise `lastUpdated`,
 * against the payment reference date so the report is deterministic for a
 * given data snapshot rather than drifting with the clock.
 */

import fs from "node:fs";
import path from "node:path";
import { PAYMENT_REFERENCE_DATE } from "../lib/data/paymentDates.ts";

const CONTENT_DIR = path.resolve("content");
const STRICT = process.argv.includes("--strict");

const THRESHOLDS = {
  "payment-date": 35,
  "news-article": 90,
  "grant-detail": 180,
  "status-meaning": 180,
  "appeal-guide": 180,
  "banking-guide": 180,
  "how-to-guide": 180,
  "eligibility-guide": 180,
  "province-hub": 365,
  "office-location": 365,
  "downloadable-form": 365,
  "faq-page": 180,
  "hub-page": 180,
  "home-page": 90,
};

const DEFAULT_THRESHOLD = 180;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

function toDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function daysBetween(from, to) {
  return Math.round((to - from) / 86_400_000);
}

const reference = new Date(
  Date.UTC(PAYMENT_REFERENCE_DATE.year, PAYMENT_REFERENCE_DATE.month - 1, PAYMENT_REFERENCE_DATE.day),
);

const rows = [];

for (const file of walk(CONTENT_DIR)) {
  let page;
  try {
    page = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    continue;
  }
  if (!page.classification || !page.slug) continue;
  const reviewed = page.lastReviewed || page.lastUpdated;
  if (!reviewed) continue;
  const limit = THRESHOLDS[page.classification] ?? DEFAULT_THRESHOLD;
  const age = daysBetween(toDate(reviewed), reference);
  rows.push({
    file: path.relative(CONTENT_DIR, file),
    slug: page.slug,
    classification: page.classification,
    status: page.status ?? "published",
    reviewed,
    age,
    limit,
    stale: age > limit,
  });
}

rows.sort((a, b) => b.age - a.age);

const published = rows.filter((r) => r.status === "published");
const stale = published.filter((r) => r.stale);

console.log(`\nContent freshness — reference date ${PAYMENT_REFERENCE_DATE}\n`);
for (const row of rows) {
  const marker = row.stale ? (row.status === "published" ? "STALE" : "stale (draft)") : "ok";
  console.log(
    `  ${marker.padEnd(14)} ${String(row.age).padStart(4)}d / ${String(row.limit).padStart(3)}d  ${row.classification.padEnd(18)} ${row.slug}`,
  );
}

console.log(`\n${published.length} published page(s), ${stale.length} stale.\n`);

if (STRICT && stale.length > 0) {
  console.error("Freshness check failed: review the pages listed as STALE above.");
  process.exit(1);
}
