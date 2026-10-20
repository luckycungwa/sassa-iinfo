/**
 * Regenerates every SASSA payment-date table from `lib/data/paymentDates.ts`.
 *
 * Usage:
 *   node scripts/sync-dates.mjs          # rewrite tables in place
 *   node scripts/sync-dates.mjs --check  # report drift, write nothing
 *
 * The month JSON is hand-written except for the `dates-table` block, which is
 * owned by this script. Prose, FAQs and metadata stay editable by hand.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { paymentMonths, PAYMENT_DATA_UPDATED } from "../lib/data/paymentDates.ts";
import { GRANT_PAGE_FILES, grantPageRow, monthPageTable } from "./lib/payment-dates.mjs";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONTENT = join(ROOT, "content", "payment-dates");
const CHECK = process.argv.includes("--check");

let changed = 0;
let drifted = 0;
const problems = [];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJson(path, value) {
  writeFileSync(path, JSON.stringify(value, null, 2) + "\n", "utf-8");
}

function findTable(page) {
  const blocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];
  const index = blocks.findIndex(
    (block) => block.type === "table" && (block.id === "dates-table" || block.id === "date-table"),
  );
  return { index, table: index === -1 ? null : blocks[index] };
}

function applyTable(page, table, index, expected, file) {
  const current = {
    caption: table.caption,
    headers: table.headers,
    rows: table.rows,
  };
  const next = {
    caption: expected.caption ?? table.caption,
    headers: expected.headers ?? table.headers,
    rows: expected.rows,
  };

  if (JSON.stringify(current) === JSON.stringify(next)) {
    console.log(`  ok     ${file}`);
    return;
  }

  drifted += 1;
  if (CHECK) {
    console.error(`  DRIFT  ${file} — table does not match lib/data/paymentDates.ts`);
    return;
  }

  page.contentBlocks[index] = { ...table, ...next };
  writeJson(join(CONTENT, file), page);
  changed += 1;
  console.log(`  sync   ${file}`);
}

console.log(`\nSASSA date sync — as of ${PAYMENT_DATA_UPDATED}${CHECK ? " (check only)" : ""}\n`);

for (const month of paymentMonths) {
  const file = `${month.slug}.json`;
  const path = join(CONTENT, file);
  if (!existsSync(path)) {
    problems.push(`${file} is missing but ${month.id} exists in paymentDates.ts`);
    continue;
  }
  const page = readJson(path);
  const { index, table } = findTable(page);
  if (!table) {
    problems.push(`${file} has no dates-table block`);
    continue;
  }
  applyTable(page, table, index, monthPageTable(month), file);
}

for (const [key, file] of Object.entries(GRANT_PAGE_FILES)) {
  const path = join(CONTENT, file);
  if (!existsSync(path)) {
    problems.push(`${file} is missing`);
    continue;
  }
  const page = readJson(path);
  const { index, table } = findTable(page);
  if (!table) {
    problems.push(`${file} has no dates-table block`);
    continue;
  }
  applyTable(page, table, index, { rows: paymentMonths.map((month) => grantPageRow(month, key)) }, file);
}

for (const problem of problems) console.error(`  ERROR  ${problem}`);

console.log(
  `\n${changed} file(s) updated, ${drifted} table(s) out of date${CHECK ? " (nothing written)" : ""}, ${problems.length} problem(s)\n`,
);

if (problems.length > 0 || (CHECK && drifted > 0)) process.exit(1);
