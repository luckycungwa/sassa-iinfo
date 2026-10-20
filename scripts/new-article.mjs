/**
 * Scaffolds a new news article as a schema-valid draft.
 *
 *   npm run article:new -- --slug my-article --title "My article title"
 *
 * Optional: --description "One-sentence summary", --date 2026-10-20
 *
 * The draft is created with `status: "draft"`, so it is excluded from the
 * news hub, homepage, sitemap and search until someone flips it to
 * "published" after the content and sources are in place.
 */

import fs from "node:fs";
import path from "node:path";

const NEWS_DIR = path.resolve(process.cwd(), "content", "news");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      args[key] = "true";
    } else {
      args[key] = value;
      i += 1;
    }
  }
  return args;
}

function fail(message) {
  console.error(`article:new — ${message}`);
  process.exit(1);
}

function today() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const args = parseArgs(process.argv.slice(2));

if (args.help === "true") {
  console.log(`Usage: npm run article:new -- --slug my-article --title "My article title"
       [--description "One-sentence summary"] [--date YYYY-MM-DD]`);
  process.exit(0);
}

const slug = String(args.slug ?? "").trim();
const title = String(args.title ?? "").trim();
const date = String(args.date ?? today()).trim();

if (!slug) fail("missing --slug");
if (!SLUG_PATTERN.test(slug)) fail(`slug "${slug}" must be lowercase letters, numbers and single hyphens`);
if (!title) fail("missing --title");
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`date "${date}" must be YYYY-MM-DD`);

const description = String(args.description ?? title).trim();
const filePath = path.join(NEWS_DIR, `${slug}.json`);

if (fs.existsSync(filePath)) {
  fail(`${path.relative(process.cwd(), filePath)} already exists`);
}

const article = {
  id: slug,
  slug: `/news/${slug}`,
  classification: "news-article",
  title,
  description,
  lastUpdated: date,
  version: "1.0.0",
  status: "draft",
  author: {
    name: "Lucky Cungwa",
    role: "Senior Editor",
    credentials: "Verified against official SASSA publications",
    verified: true,
  },
  seo: {
    metaTitle: title,
    metaDescription: description,
    keywords: [],
  },
  contentBlocks: [
    {
      id: "hero-1",
      type: "hero",
      title,
      description,
      readingTime: "4 min read",
      lastUpdated: date,
    },
    {
      id: "h1",
      type: "heading",
      level: 2,
      text: "What changed",
    },
    {
      id: "p1",
      type: "paragraph",
      text: "Draft: replace this paragraph with the article's lead. State the change, the date it takes effect and who it affects in the first two sentences.",
    },
    {
      id: "callout1",
      type: "callout",
      intent: "info",
      title: "Draft checklist",
      text: "Before publishing: add the remaining sections, cite official SASSA sources below, set status to published, and bump lastUpdated.",
    },
  ],
  sources: [],
  relatedPages: [],
};

fs.mkdirSync(NEWS_DIR, { recursive: true });
fs.writeFileSync(filePath, `${JSON.stringify(article, null, 2)}\n`, "utf8");

console.log(`Created ${path.relative(process.cwd(), filePath)} (status: draft)`);
console.log("Next:");
console.log("  1. Write the content blocks and add official sources.");
console.log('  2. Set "status": "published" when the article is accurate.');
console.log("  3. Run npm run validate:content");
