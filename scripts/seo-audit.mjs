#!/usr/bin/env node
/**
 * Read-only SEO crawl audit against a running production build.
 *
 *   PORT=4400 npm start
 *   node scripts/seo-audit.mjs http://localhost:4400
 *
 * Checks every sitemap URL for status, title, description, canonical, robots
 * directives, H1 count, Open Graph/Twitter tags, JSON-LD validity, image alt
 * text, internal links, redirects, orphans and thin content. Exit code 1 when
 * a blocking issue is found.
 */

const BASE = (process.argv[2] || "http://localhost:4400").replace(/\/+$/, "");
const CONCURRENCY = 6;
const SITE_HOST = new URL(BASE).host;

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const stripTags = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decode(m[2] ?? m[3] ?? "") : "";
};

const metaContent = (html, key, value) => {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const k = (attr(tag, "name") || attr(tag, "property") || "").toLowerCase();
    if (k === key.toLowerCase() && attr(tag, "content").length) return attr(tag, "content");
    if (k === key && value) return attr(tag, "content");
  }
  return "";
};

const allMeta = (html) => {
  const out = {};
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const k = (attr(tag, "name") || attr(tag, "property") || "").toLowerCase();
    if (k) out[k] = attr(tag, "content");
  }
  return out;
};

const collectJsonLd = (html) => {
  const blocks = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      blocks.push({ ok: true, data: JSON.parse(m[1]) });
    } catch (error) {
      blocks.push({ ok: false, error: String(error) });
    }
  }
  return blocks;
};

const typesOf = (node, acc = []) => {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    node.forEach((n) => typesOf(n, acc));
    return acc;
  }
  if (typeof node["@type"] === "string") acc.push(node["@type"]);
  if (Array.isArray(node["@type"])) acc.push(...node["@type"]);
  Object.values(node).forEach((v) => {
    if (v && typeof v === "object") typesOf(v, acc);
  });
  return acc;
};

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1].trim()));
const paths = urls.map((u) => new URL(u).pathname.replace(/\/+$/, "") || "/");

const pages = await mapLimit(paths, CONCURRENCY, async (path) => {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  const html = await res.text();
  const head = html.split("</head>")[0] || html;
  const titleRaw = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const canonical = (head.match(/<link[^>]+rel=["']canonical["'][^>]*>/i) || [])[0] || "";
  const description = metaContent(head, "description");
  const robots = metaContent(head, "robots");
  const meta = allMeta(head);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
  const jsonld = collectJsonLd(html);
  const types = [...new Set(jsonld.flatMap((b) => (b.ok ? typesOf(b.data) : ["INVALID"])))];
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => ({
    src: attr(m[0], "src"),
    alt: attr(m[0], "alt"),
    hasAlt: /\balt\s*=/i.test(m[0]),
  }));
  const links = [...html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
  const bodyText = stripTags(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " "),
  );

  return {
    path,
    status: res.status,
    title: stripTags(titleRaw),
    description,
    canonical: canonical ? attr(canonical, "href") : "",
    robots,
    meta,
    h1s,
    types,
    jsonldOk: jsonld.every((b) => b.ok),
    images,
    links,
    words: bodyText.split(/\s+/).filter(Boolean).length,
    lang: (html.match(/<html[^>]*lang=["']([^"']+)["']/i) || [])[1] || "",
    viewport: Boolean(meta.viewport),
  };
});

const failures = [];
const warnings = [];
const notes = [];

const seenTitle = new Map();
const seenDesc = new Map();
const linked = new Set();

for (const p of pages) {
  const expected = `https://www.sassagranthub.co.za${p.path === "/" ? "/" : p.path}`;
  const canonicalPath = p.canonical ? new URL(p.canonical).pathname.replace(/\/+$/, "") || "/" : null;

  if (p.status !== 200) failures.push(`${p.path} returned ${p.status}`);
  if (!p.title) failures.push(`${p.path} has no title`);
  if (p.title.length > 65) warnings.push(`${p.path} title ${p.title.length} chars: ${p.title}`);
  if (!p.description) failures.push(`${p.path} has no meta description`);
  if (p.description.length > 165) warnings.push(`${p.path} description ${p.description.length} chars`);
  if (p.description.length < 70) warnings.push(`${p.path} description only ${p.description.length} chars`);
  if (!p.canonical) failures.push(`${p.path} has no canonical`);
  else if (canonicalPath !== p.path) failures.push(`${p.path} canonical points to ${p.canonical}`);
  else if (!p.canonical.startsWith(expected.split(p.path)[0])) failures.push(`${p.path} canonical host wrong: ${p.canonical}`);
  if (/noindex/i.test(p.robots)) failures.push(`${p.path} is in the sitemap but noindex`);
  if (p.h1s.length !== 1) failures.push(`${p.path} has ${p.h1s.length} H1s`);
  if (!p.lang) failures.push(`${p.path} has no html lang`);
  if (!p.viewport) warnings.push(`${p.path} has no viewport meta`);
  if (!p.jsonldOk) failures.push(`${p.path} has invalid JSON-LD`);
  if (p.words < 250) warnings.push(`${p.path} thin: ${p.words} words`);

  for (const img of p.images) {
    if (!img.hasAlt) warnings.push(`${p.path} image without alt: ${img.src}`);
    else if (!img.alt.trim()) notes.push(`${p.path} decorative empty alt (check intentional): ${img.src}`);
  }

  const tkey = p.title.toLowerCase().replace(/\s+/g, " ").trim();
  if (seenTitle.has(tkey)) failures.push(`duplicate title: ${p.path} and ${seenTitle.get(tkey)}`);
  else seenTitle.set(tkey, p.path);

  const dkey = p.description.toLowerCase().replace(/\s+/g, " ").trim();
  if (dkey && seenDesc.has(dkey)) failures.push(`duplicate description: ${p.path} and ${seenDesc.get(dkey)}`);
  else if (dkey) seenDesc.set(dkey, p.path);

  if (!p.meta["og:title"] || !p.meta["og:description"] || !p.meta["og:image"]) {
    failures.push(`${p.path} missing Open Graph title/description/image`);
  }
  if (!p.meta["twitter:card"]) warnings.push(`${p.path} missing twitter:card`);

  for (const href of p.links) {
    if (!href || href.startsWith("#")) continue;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      const u = new URL(href, BASE);
      if (u.host !== SITE_HOST) {
        if (u.protocol === "http:") warnings.push(`${p.path} links to insecure ${href}`);
        continue;
      }
      linked.add(u.pathname.replace(/\/+$/, "") || "/");
    } catch {
      warnings.push(`${p.path} has malformed link ${href}`);
    }
  }
}

// Internal link status: report 4xx/5xx and links that redirect.
const internal = [...linked].filter((p) => !p.startsWith("/api") && p !== "/search");
const linkChecks = await mapLimit(internal, CONCURRENCY, async (path) => {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { path, status: res.status, location: res.headers.get("location") || "" };
});

for (const l of linkChecks) {
  if (l.status === 404 || l.status >= 500) failures.push(`broken internal link: ${l.path} (${l.status})`);
  else if ([301, 302, 307, 308].includes(l.status)) warnings.push(`internal link redirects: ${l.path} -> ${l.location}`);
  else if (l.status !== 200) warnings.push(`internal link ${l.path} returned ${l.status}`);
}

const sitemapSet = new Set(paths);
const orphans = paths.filter((p) => p !== "/" && !linked.has(p));
for (const o of orphans) warnings.push(`orphan sitemap URL (no internal link): ${o}`);

for (const p of pages) {
  if (!sitemapSet.has(p.path)) notes.push(`crawled path not in sitemap: ${p.path}`);
}

const legacyLinks = pages.flatMap((p) =>
  p.links.filter((h) => /sassagranttguide\.vercel\.app|sassagrantguide\.co\.za|www\.sassagranthub\.co\.za/.test(h)).map((h) => `${p.path} -> ${h}`),
);
for (const l of legacyLinks) warnings.push(`link to legacy host: ${l}`);

const noCanonical = pages.filter((p) => !p.canonical).length;

console.log(`SEO audit of ${pages.length} sitemap URLs at ${BASE}`);
console.log(`Status: ${pages.filter((p) => p.status === 200).length}/${pages.length} return 200`);
console.log(`Missing canonical: ${noCanonical}; duplicate titles: ${[...seenTitle].length !== pages.length ? "yes" : "no"}`);
console.log(`Internal links checked: ${linkChecks.length}; orphans: ${orphans.length}`);
console.log(`Blocking failures: ${failures.length}; warnings: ${warnings.length}`);

if (failures.length) {
  console.log("\nFAILURES");
  failures.forEach((f) => console.log(`  - ${f}`));
}
if (warnings.length) {
  console.log("\nWARNINGS");
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (notes.length) {
  console.log("\nNOTES");
  notes.forEach((n) => console.log(`  - ${n}`));
}

const schemaCounts = {};
for (const p of pages) for (const t of p.types) schemaCounts[t] = (schemaCounts[t] || 0) + 1;
console.log("\nSchema types:", schemaCounts);

process.exit(failures.length ? 1 : 0);
