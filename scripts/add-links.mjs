/**
 * Adds internal cross-links across the SASSA content repo.
 * - Enriches paragraph blocks with `links` (only phrases that exist verbatim in the text).
 * - Appends a fallback link-grid on pages that would otherwise have <3 internal links.
 * Self-links and duplicate hrefs are skipped. Only links to slugs that exist.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, renameSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..", "content");

const SKIP = new Set(["/grants/srd-r370-grant"]);

function walk(dir) {
  let out = [];
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    const s = statSync(f);
    if (s.isDirectory()) out = out.concat(walk(f));
    else if (extname(e) === ".json") out.push(f);
  }
  return out;
}

const files = walk(ROOT);
const slugSet = new Set();
const meta = []; // {file, slug, classification}
for (const f of files) {
  try {
    const j = JSON.parse(readFileSync(f, "utf8"));
    if (typeof j.slug === "string") {
      slugSet.add(j.slug);
      meta.push({ file: f, slug: j.slug, classification: j.classification });
    }
  } catch {}
}

// Phrase -> href. Order matters: longer / more specific first.
const PHRASES = [
  ["War Veterans Grant", "/grants/war-veterans-grant"],
  ["Older Person Grant", "/grants/older-person-grant"],
  ["Disability Grant", "/grants/disability-grant"],
  ["Child Support Grant", "/grants/child-support-grant"],
  ["Foster Care Grant", "/grants/foster-care-grant"],
  ["Foster Child Grant", "/grants/foster-care-grant"],
  ["Care Dependency Grant", "/grants/care-dependency-grant"],
  ["Grant-in-Aid", "/grants/grant-in-aid"],
  ["Grant in Aid", "/grants/grant-in-aid"],
  ["SRD R370 Grant", "/grants/srd-r370-grant"],
  ["SRD R370", "/grants/srd-r370-grant"],
  ["Social Relief of Distress", "/grants/srd-r370-grant"],
  ["SRD grant", "/grants/srd-r370-grant"],
  ["SRD Grant", "/grants/srd-r370-grant"],
  ["the SRD", "/grants/srd-r370-grant"],
  ["SRD", "/grants/srd-r370-grant"],

  ["means test", "/guides/understanding-means-test"],
  ["Means Test", "/guides/understanding-means-test"],
  ["the means test", "/guides/understanding-means-test"],

  ["Independent Tribunal", "/appeals"],
  ["ITSAA", "/appeals"],
  ["appeal", "/appeals"],

  ["payment schedule", "/payment-dates"],
  ["payment dates", "/payment-dates"],
  ["payment date", "/payment-dates"],
  ["paymentDates", "/payment-dates"],

  ["SASSA card", "/banking/sassa-card-explained"],
  ["black card", "/banking/black-card-swap"],
  ["USSD", "/banking/sassa-ussd-codes"],

  ["Means Test Calculator", "/guides/sassa-grant-amounts-calculator"],
  ["grant amounts", "/guides/sassa-grant-amounts"],
  ["Eligibility Checker", "/eligibility"],
];

function existingHrefs(page) {
  const set = new Set();
  const scan = (v) => {
    if (Array.isArray(v)) v.forEach(scan);
    else if (v && typeof v === "object") {
      if (typeof v.href === "string") set.add(v.href);
      for (const k of Object.keys(v)) scan(v[k]);
    }
  };
  scan(page);
  return set;
}

function addParagraphLinks(text, ownSlug, used) {
  if (typeof text !== "string" || !text) return [];
  const lower = text.toLowerCase();
  const links = [];
  for (const [phrase, href] of PHRASES) {
    if (href === ownSlug) continue;
    if (!slugSet.has(href)) continue;
    if (used.has(href)) continue;
    const idx = lower.indexOf(phrase.toLowerCase());
    if (idx === -1) continue;
    const exact = text.slice(idx, idx + phrase.length);
    // avoid overlapping an already-added link range
    if (links.some((l) => idx >= l._i && idx < l._i + l._len)) continue;
    links.push({ text: exact, href, _i: idx, _len: phrase.length });
    used.add(href);
    if (links.length >= 4) break;
  }
  return links.map(({ text, href }) => ({ text, href }));
}

function fallbackLinks(page, ownSlug, used) {
  const c = page.classification;
  const grantSlugs = [
    "/grants/older-person-grant",
    "/grants/disability-grant",
    "/grants/child-support-grant",
    "/grants/foster-care-grant",
    "/grants/care-dependency-grant",
    "/grants/war-veterans-grant",
    "/grants/grant-in-aid",
    "/grants/srd-r370-grant",
  ];
  let cand = [];
  if (c === "grant-detail") {
    cand = ["/grants", "/appeals", "/payment-dates", "/tools", ...grantSlugs.filter((s) => s !== ownSlug).slice(0, 3)];
  } else if (c === "appeal-guide") {
    cand = ["/appeals", "/grants", "/grants/srd-r370-grant", "/guides/how-to-appeal", "/payment-dates"];
  } else if (c === "payment-date") {
    cand = ["/payment-dates", "/grants/older-person-grant", "/grants/disability-grant", "/grants/child-support-grant", "/grants/srd-r370-grant"];
  } else if (c === "hub-index") {
    cand = ["/grants", "/appeals", "/payment-dates", "/guides", "/eligibility", "/banking"];
  } else if (c === "status-meaning") {
    cand = ["/guides/how-to-check-sassa-status", "/appeals", "/grants/srd-r370-grant", "/payment-dates"];
  } else if (c === "eligibility-guide") {
    cand = ["/eligibility", "/grants", "/grants/srd-r370-grant", "/guides/understanding-means-test"];
  } else if (c === "banking-guide") {
    cand = ["/banking", "/grants", "/grants/srd-r370-grant/status-check", "/payment-dates"];
  } else if (c === "how-to-guide") {
    cand = ["/guides", "/grants", "/appeals", "/payment-dates", "/tools"];
  } else if (c === "downloadable-form") {
    cand = ["/downloads", "/guides/sassa-documents-checklist", "/grants", "/appeals"];
  } else if (c === "news-article") {
    cand = ["/news", "/payment-dates", "/grants/srd-r370-grant", "/appeals", "/guides/sassa-scam-alert-guide"];
  } else if (c === "office-location") {
    cand = ["/offices", "/provinces", "/payment-dates", "/grants"];
  } else if (c === "province-hub") {
    cand = ["/provinces", "/offices", "/grants", "/payment-dates"];
  } else if (c === "faq-page") {
    cand = ["/faq", "/appeals", "/grants", "/payment-dates"];
  } else if (c === "tool-page") {
    cand = ["/tools", "/grants", "/eligibility", "/guides"];
  } else {
    cand = ["/grants", "/appeals", "/payment-dates"];
  }
  const links = [];
  for (const href of cand) {
    if (href === ownSlug) continue;
    if (!slugSet.has(href)) continue;
    if (used.has(href)) continue;
    links.push({ title: titleFor(href), href });
    used.add(href);
    if (links.length >= 6) break;
  }
  return links;
}

function titleFor(href) {
  const map = {
    "/grants": "All SASSA Grants",
    "/appeals": "SASSA Appeals",
    "/payment-dates": "SASSA Payment Dates",
    "/guides": "How-To Guides",
    "/eligibility": "Eligibility Guides",
    "/banking": "Banking & Payments",
    "/tools": "SASSA Tools",
    "/downloads": "Forms & Downloads",
    "/news": "SASSA News",
    "/offices": "SASSA Offices",
    "/provinces": "Provincial Offices",
    "/faq": "FAQ",
    "/grants/srd-r370-grant": "SRD R370 Grant",
    "/grants/older-person-grant": "Older Person Grant",
    "/grants/disability-grant": "Disability Grant",
    "/grants/child-support-grant": "Child Support Grant",
    "/grants/foster-care-grant": "Foster Care Grant",
    "/grants/care-dependency-grant": "Care Dependency Grant",
    "/grants/war-veterans-grant": "War Veterans Grant",
    "/grants/grant-in-aid": "Grant-in-Aid",
    "/guides/how-to-appeal": "How to Appeal",
    "/guides/how-to-check-sassa-status": "Check Your Status",
    "/guides/understanding-means-test": "Understanding the Means Test",
    "/guides/sassa-documents-checklist": "Documents Checklist",
    "/guides/sassa-scam-alert-guide": "Scam Alert Guide",
    "/grants/srd-r370-grant/status-check": "SRD Status Check",
  };
  return map[href] || href;
}

function countInternal(page) {
  let n = 0;
  const scan = (v) => {
    if (Array.isArray(v)) v.forEach(scan);
    else if (v && typeof v === "object") {
      if (typeof v.href === "string" && v.href.startsWith("/")) n++;
      for (const k of Object.keys(v)) scan(v[k]);
    }
  };
  scan(page);
  return n;
}

let edited = 0;
let addedTotal = 0;

for (const f of files) {
  let page;
  try {
    page = JSON.parse(readFileSync(f, "utf8"));
  } catch {
    continue;
  }
  if (SKIP.has(page.slug)) continue;
  if (!Array.isArray(page.contentBlocks)) continue;

  const used = existingHrefs(page);
  const beforeCount = countInternal(page);
  const budget = Math.max(0, 8 - beforeCount); // keep total within ~8
  let addedThis = 0;

  for (const block of page.contentBlocks) {
    if (addedThis >= budget) break;
    if (block.type === "paragraph" && typeof block.text === "string") {
      const newLinks = addParagraphLinks(block.text, page.slug, used);
      if (newLinks.length) {
        if (!Array.isArray(block.links)) block.links = [];
        // avoid duplicates within the paragraph
        const have = new Set(block.links.map((l) => l.href));
        for (const l of newLinks) {
          if (addedThis >= budget) break;
          if (!have.has(l.href)) {
            block.links.push(l);
            have.add(l.href);
            addedThis++;
          }
        }
      }
    }
  }

  // fallback link-grid if still under 3 internal links
  const afterCount = beforeCount + addedThis;
  if (afterCount < 3) {
    const links = fallbackLinks(page, page.slug, used).slice(0, Math.max(0, 8 - afterCount));
    if (links.length) {
      page.contentBlocks.push({
        id: "related-pages-" + Math.random().toString(36).slice(2, 8),
        type: "link-grid",
        links,
      });
      addedThis += links.length;
    }
  }

  if (addedThis > 0) {
    writeFileSync(f, JSON.stringify(page, null, 2) + "\n", "utf8");
    edited++;
    addedTotal += addedThis;
  }
}

console.log(`Files edited: ${edited}`);
console.log(`Internal links added (approx): ${addedTotal}`);
