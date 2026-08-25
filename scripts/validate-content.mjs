/**
 * Build-time content validation script.
 * Reads every /content/**\/*.json file and validates against
 * the BasePage schema. Exits non-zero on any validation error.
 *
 * Usage: node scripts/validate-content.mjs
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..", "content");
const VALID_CLASSIFICATIONS = [
  "payment-date", "grant-detail", "status-meaning", "appeal-guide",
  "office-location", "province-hub", "eligibility-guide", "downloadable-form",
  "how-to-guide", "banking-guide", "news-article", "faq-page",
  "tool-page", "home-page", "hub-index",
];

let totalFiles = 0;
let passed = 0;
let failed = 0;
const allErrors = [];

function collectFiles(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...collectFiles(fullPath));
    } else if (extname(entry) === ".json") {
      files.push(fullPath);
    }
  }
  return files;
}

function validate(contents, path) {
  const errors = [];
  const warnings = [];

  if (!contents || typeof contents !== "object" || Array.isArray(contents)) {
    return { errors: ["Root must be a non-null object"], warnings: [] };
  }

  const required = ["id", "slug", "classification", "title", "description", "lastUpdated", "version", "status", "author", "seo", "contentBlocks"];
  for (const field of required) {
    if (contents[field] === undefined || contents[field] === null) {
      errors.push(`Missing required root property "${field}"`);
    }
  }

  if (contents.classification && !VALID_CLASSIFICATIONS.includes(contents.classification)) {
    errors.push(`Invalid classification "${contents.classification}"`);
  }

  if (typeof contents.slug === "string") {
    if (!contents.slug.startsWith("/")) errors.push(`Slug "${contents.slug}" must start with "/"`);
    if (/[A-Z]/.test(contents.slug)) errors.push(`Slug "${contents.slug}" contains uppercase letters`);
    if (/\s/.test(contents.slug)) errors.push(`Slug "${contents.slug}" contains spaces`);
  }

  if (typeof contents.version === "string" && !/^\d+\.\d+\.\d+$/.test(contents.version)) {
    errors.push(`Version "${contents.version}" is not valid semver`);
  }

  if (contents.status && !["draft", "published", "archived"].includes(contents.status)) {
    errors.push(`Status must be "draft", "published", or "archived"`);
  }

  if (contents.author && typeof contents.author === "object") {
    if (!contents.author.name) errors.push("Author name is required");
    if (contents.author.verified !== true) warnings.push("Author not verified");
  }

  if (contents.seo && typeof contents.seo === "object") {
    if (!contents.seo.metaTitle) errors.push("SEO metaTitle is required");
    if (!contents.seo.metaDescription) errors.push("SEO metaDescription is required");
  }

  if (Array.isArray(contents.contentBlocks)) {
    if (contents.contentBlocks.length === 0) warnings.push("contentBlocks array is empty");
    contents.contentBlocks.forEach((block, idx) => {
      if (!block.id) errors.push(`Block [${idx}] missing "id"`);
      if (!block.type) errors.push(`Block [${idx}] missing "type"`);
      findRawHtml(block, `contentBlocks[${idx}]`, errors);
    });
  } else if (contents.contentBlocks !== undefined) {
    errors.push("contentBlocks must be an array");
  }

  if (errors.length > 0) {
    allErrors.push({ path, errors, warnings });
  }

  return { errors, warnings };
}

function findRawHtml(value, path, errors) {
  if (typeof value === "string") {
    if (/<[a-zA-Z/][^>]*>/.test(value)) {
      errors.push(`${path} contains raw HTML — use the proper block type (e.g. link-grid) instead`);
    }
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => findRawHtml(item, `${path}[${i}]`, errors));
  } else if (value !== null && typeof value === "object") {
    for (const [key, val] of Object.entries(value)) {
      findRawHtml(val, `${path}.${key}`, errors);
    }
  }
}

const files = collectFiles(ROOT);
totalFiles = files.length;
console.log(`\nValidating ${totalFiles} content files...\n`);

const seenSlugs = new Map();

for (const file of files) {
  try {
    const raw = readFileSync(file, "utf-8");
    const parsed = JSON.parse(raw);
    const result = validate(parsed, file);
    if (typeof parsed.slug === "string") {
      const existing = seenSlugs.get(parsed.slug);
      if (existing) {
        result.errors.push(`Duplicate slug "${parsed.slug}" — already used by ${existing.replace(ROOT, "")}`);
      } else {
        seenSlugs.set(parsed.slug, file);
      }
    }
    if (result.errors.length > 0) {
      console.error(`  FAIL  ${file.replace(ROOT, "")} (${result.errors.length} error(s))`);
      for (const err of result.errors) console.error(`         - ${err}`);
      failed++;
    } else {
      console.log(`  PASS  ${file.replace(ROOT, "")}`);
      passed++;
    }
    if (result.warnings.length > 0) {
      for (const warn of result.warnings) console.warn(`  WARN  ${file.replace(ROOT, "")} — ${warn}`);
    }
  } catch (err) {
    console.error(`  FAIL  ${file.replace(ROOT, "")} — Parse error: ${err.message}`);
    failed++;
    allErrors.push({ path: file, errors: [err.message], warnings: [] });
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${totalFiles} files\n`);

if (failed > 0) {
  process.exit(1);
}
