import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";

const ROOT = resolve(".next/server/app");
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 158;

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&#x0*27;/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? decodeHtml(match[1]) : "";
}

function metadata(html) {
  const tags = html.match(/<meta\\b[^>]*>/gi) ?? [];
  let description = "";
  let robots = "";
  for (const tag of tags) {
    const name = attribute(tag, "name").toLowerCase();
    if (name === "description") description = attribute(tag, "content");
    if (name === "robots") robots = attribute(tag, "content").toLowerCase();
  }
  const title = decodeHtml((html.match(/<title[^>]*>([\\s\\S]*?)<\\/title>/i)?.[1] ?? "").replace(/<[^>]+>/g, "").trim());
  return { title, description, robots };
}

async function collect(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await collect(full));
    else if (extname(entry.name) === ".html") files.push(full);
  }
  return files;
}

let files;
try {
  files = await collect(ROOT);
} catch (error) {
  console.error(`Cannot read built HTML at ${ROOT}: ${error.message}`);
  process.exit(1);
}

let audited = 0;
const failures = [];
for (const file of files) {
  const html = await readFile(file, "utf8");
  const { title, description, robots } = metadata(html);
  const rel = relative(ROOT, file).split(sep).join("/");
  if (/noindex/i.test(robots) || /(^|\\/)(404|500|not-found)(\\.html)?$/i.test(rel)) continue;
  audited++;
  const route = "/" + rel.replace(/(^|\\/)index\\.html$/i, "").replace(/\\.html$/i, "").replace(/^\\/+|\\/+$/g, "");
  const label = route === "/" ? "/" : route;
  if (!title) failures.push(`${label}: missing <title>`);
  else if (title.length > MAX_TITLE) failures.push(`${label}: title ${title.length} chars (max ${MAX_TITLE}) — ${title}`);
  if (!description) failures.push(`${label}: missing meta description`);
  else if (description.length > MAX_DESCRIPTION) failures.push(`${label}: description ${description.length} chars (max ${MAX_DESCRIPTION})`);
}

console.log(`Audited ${audited} indexable prerendered pages.`);
if (failures.length) {
  console.error(`\\nMetadata audit failed: ${failures.length} issue(s).\\n`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`All indexable pages have a title (≤${MAX_TITLE} characters) and description (≤${MAX_DESCRIPTION} characters).`);
