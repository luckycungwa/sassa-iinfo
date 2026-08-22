import type { ContentBlock, BasePage, PageClassification } from "../lib/schema/contentSchema";
import PageShell from "./PageShell";
import TableOfContents from "./TableOfContents";
import HeroSection from "./HeroSection";
import { CATEGORY_THEMES } from "../lib/theme/category-theme";
import type { CategoryTheme } from "../lib/theme/category-theme";
import Image from "next/image";

function useCategoryTheme(classification?: string): CategoryTheme {
  if (classification && classification in CATEGORY_THEMES) {
    return CATEGORY_THEMES[classification as keyof typeof CATEGORY_THEMES];
  }
  return CATEGORY_THEMES["grant-detail"];
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function renderParagraphText(text: string, links?: { text: string; href: string }[]) {
  if (!links || links.length === 0) return text;
  let result = text;
  const parts: { text: string; href?: string }[] = [];
  let lastIndex = 0;
  const sorted = [...links].sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text));
  for (const link of sorted) {
    const idx = text.indexOf(link.text, lastIndex);
    if (idx === -1) continue;
    if (idx > lastIndex) parts.push({ text: text.slice(lastIndex, idx) });
    parts.push({ text: link.text, href: link.href });
    lastIndex = idx + link.text.length;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) });
  return parts.map((part, i) =>
    part.href ? (
      <a key={i} href={part.href} className="text-gold hover:text-gold-dark underline underline-offset-2 transition font-medium">
        {part.text}
      </a>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}

function Block({ block, classification }: { block: ContentBlock; classification?: string }) {
  const theme = useCategoryTheme(classification);
  const accent = theme.accent;
  switch (block.type) {
    case "hero":
      return (
        <HeroSection
          title={block.title}
          description={block.description}
          readingTime={block.readingTime}
          lastUpdated={block.lastUpdated}
          image={block.image}
          imageAlt={block.imageAlt}
          cta={block.cta}
          secondaryCta={block.secondaryCta}
        />
      );
    case "heading": {
      const Tag = ("h" + block.level) as keyof JSX.IntrinsicElements;
      const sizes: Record<number, string> = { 2: "text-xl sm:text-2xl", 3: "text-lg sm:text-xl", 4: "text-base sm:text-lg" };
      const id = block.text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      return <Tag id={id} className={cn("font-bold text-ink tracking-tight mt-10 mb-4", sizes[block.level])}>{block.text}</Tag>;
    }
    case "paragraph":
      return <p className="text-sm text-muted leading-relaxed mb-5">{renderParagraphText(block.text, block.links)}</p>;
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className={cn("space-y-2 mb-5", block.ordered ? "list-decimal list-inside" : "")}>
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted">
              {!block.ordered && <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />}
              {block.ordered && <span className="font-bold text-gold flex-shrink-0">{i + 1}.</span>}
              {item}
            </li>
          ))}
        </ListTag>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border-collapse">
            {block.caption && <caption className="text-xs text-muted text-left mb-2 font-mono">{block.caption}</caption>}
            <thead>
              <tr className="border-b border-border">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left font-bold text-ink p-3 text-xs bg-surface-dim/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border last:border-0 hover:bg-surface-dim/20 transition">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-3 text-xs text-muted">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      if (block.intent === "success") {
        return (
          <div className="border rounded-xl p-5 mb-5" style={{ borderColor: `${accent}40`, backgroundColor: `${accent}10` }}>
            {block.title && <p className="font-bold text-sm mb-1.5" style={{ color: accent }}>{block.title}</p>}
            <p className="text-sm leading-relaxed opacity-90" style={{ color: accent }}>{block.text}</p>
          </div>
        );
      }
      const colors: Record<string, string> = {
        info: "border-info/30 bg-info/10 text-ink",
        warning: "border-amber/40 bg-amber/10 text-ink",
        danger: "border-trading-down/30 bg-trading-down/10 text-ink",
      };
      return (
        <div className={cn("border rounded-xl p-5 mb-5", colors[block.intent] || "border-border bg-surface text-ink")}>
          {block.title && <p className="font-bold text-sm mb-1.5">{block.title}</p>}
          <p className="text-sm leading-relaxed opacity-90">{block.text}</p>
        </div>
      );
    }
    case "steps":
      return (
        <div className="space-y-4 mb-5">
          {block.steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-accent-foreground" style={{ backgroundColor: accent }}>
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{step.title}</p>
                <p className="text-sm text-muted mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "faq":
      return (
        <div className="space-y-3 mb-5">
          {block.faqs.map((faq, i) => (
            <details key={i} className="border border-border rounded-xl group">
              <summary className="text-sm font-bold text-ink p-4 cursor-pointer list-none flex items-center justify-between hover:bg-surface-dim/30 transition rounded-xl">
                {faq.question}
                <span className="text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </summary>
              <p className="text-sm text-muted px-4 pb-4 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      );
    case "link-grid":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {block.links.map((link, i) => (
            <a key={i} href={link.href} className="block border border-border rounded-xl p-4 hover:border-gold/50 hover:bg-surface-dim/30 transition-colors group">
              <p className="text-sm font-bold text-gold group-hover:text-gold-dark transition">{link.title}</p>
              {link.description && <p className="text-xs text-muted mt-1">{link.description}</p>}
            </a>
          ))}
        </div>
      );
    case "sources":
      return (
        <div className="mb-5 rounded-xl border border-border bg-surface-dim/40 p-5">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Sources used on this page</p>
          {block.note && <p className="text-xs text-muted mb-3 leading-relaxed">{block.note}</p>}
          <ul className="space-y-1.5">
            {block.sources.map((s, i) => (
              <li key={i} className="text-xs text-muted">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark hover:underline break-all">
                  {s.label}
                </a>
                {s.accessed && <span className="ml-1">(accessed {s.accessed})</span>}
              </li>
            ))}
          </ul>
        </div>
      );
    case "stat-bar":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {block.stats.map((stat, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5 text-center">
              <p className="text-2xl font-black text-gold">{stat.value}</p>
              <p className="text-xs font-bold text-ink mt-1">{stat.label}</p>
              {stat.description && <p className="text-xs text-muted mt-0.5">{stat.description}</p>}
            </div>
          ))}
        </div>
      );
    case "process-diagram":
      return (
        <div className="space-y-0 mb-5">
          {block.steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-accent-foreground" style={{ backgroundColor: accent }}>
                  {i + 1}
                </div>
                {i < block.steps.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
              </div>
              <div className={cn("pb-6", i === block.steps.length - 1 ? "pb-0" : "")}>
                <p className="text-sm font-bold text-ink">{step.label}</p>
                <p className="text-sm text-muted mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "comparison-table":
      return (
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border-collapse">
            {block.caption && <caption className="text-xs text-muted text-left mb-2 font-mono">{block.caption}</caption>}
            <thead>
              <tr style={{ borderBottom: `2px solid ${accent}80` }}>
                {block.headers.map((h, i) => (
                  <th key={i} className={cn("text-left font-bold text-ink p-3 text-xs", i === 0 ? "" : "text-center")}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border hover:bg-surface-dim/20 transition">
                  {row.map((cell, ci) => (
                    <td key={ci} className={cn("p-3 text-xs text-muted", ci === 0 ? "font-bold text-ink" : "text-center")}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "info-card":
      return (
        <div className="bg-surface border border-border rounded-xl p-5 mb-5">
          <h4 className="text-sm font-bold text-ink mb-2">{block.title}</h4>
          <p className="text-sm text-muted leading-relaxed">{block.text}</p>
        </div>
      );
    case "grant-summary":
      return (
        <div className="flex items-start justify-between gap-4 bg-surface border border-gold/20 rounded-xl p-5 mb-5">
          <div>
            <p className="text-xs font-bold text-ink mb-1">Target Group</p>
            <p className="text-xs text-muted">{block.targetGroup}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-black text-gold">{block.amount}</p>
            <p className="text-xs font-mono text-muted">{block.frequency}</p>
          </div>
        </div>
      );
    case "document-checklist":
      return (
        <ul className="space-y-2 mb-5">
          {block.documents.map((doc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted">
              <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", doc.required ? "bg-gold" : "bg-border")} />
              {doc.label}{!doc.required && <span className="text-muted ml-1">(optional)</span>}
              {doc.notes && <span className="text-muted ml-1">{'\u2014'} {doc.notes}</span>}
            </li>
          ))}
        </ul>
      );
    case "status-reference":
      return (
        <div className="bg-surface border border-border rounded-xl p-5 mb-5 space-y-3">
          <p className="text-sm text-muted leading-relaxed">{block.explanation}</p>
          <div>
            <p className="text-sm font-bold text-ink mb-1">Why it happens:</p>
            <ul className="space-y-1">{block.whyItHappens.map((w, i) => <li key={i} className="text-sm text-muted flex gap-1"><span className="text-gold">{'\u2022'}</span>{w}</li>)}</ul>
          </div>
          <div>
            <p className="text-sm font-bold text-ink mb-1">How long it lasts:</p>
            <p className="text-sm text-muted">{block.howLongItLasts}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-ink mb-1">What to do:</p>
            <ul className="space-y-1">{block.whatYouShouldDo.map((w, i) => <li key={i} className="text-sm text-muted flex gap-1"><span className="text-gold">{'\u2022'}</span>{w}</li>)}</ul>
          </div>
        </div>
      );
    case "divider":
      return <hr className="border-border my-8" />;
    case "quote":
      return (
        <blockquote className="border-l-4 border-gold pl-5 italic text-sm text-muted mb-5">
          <p>{block.text}</p>
          {block.attribution && <footer className="text-xs font-bold text-ink mt-2">{'\u2014'} {block.attribution}</footer>}
        </blockquote>
      );
    case "code":
      return (
        <pre className="bg-ink/90 text-white text-xs p-4 rounded-xl overflow-x-auto mb-5 font-mono">
          <code>{block.code}</code>
        </pre>
      );
    case "image":
      return (
        <figure className="mb-5">
          <Image src={block.src} alt={block.alt} width={800} height={450} className="rounded-xl w-full object-cover" loading="lazy" />
          {block.caption && <figcaption className="text-xs text-muted mt-2 text-center font-mono">{block.caption}</figcaption>}
        </figure>
      );
    case "news-meta":
      return (
        <div className="flex gap-2 mb-5">
          <span className="text-xs font-mono text-muted bg-surface border border-border rounded px-2 py-1">{block.date}</span>
          {block.tags.map((tag) => <span key={tag} className="text-xs font-mono text-muted bg-surface border border-border rounded px-2 py-1">{tag}</span>)}
        </div>
      );
    default:
      return null;
  }
}

interface EditorialRendererProps {
  page: BasePage;
  blocks: ContentBlock[];
}

export function EditorialRenderer({ page, blocks }: EditorialRendererProps) {
  const contentBlocks = blocks.filter((b) => b.type !== "hero");
  const heroBlock = blocks.find((b) => b.type === "hero") as (ContentBlock & { type: "hero" }) | undefined;

  return (
    <>
      {heroBlock && <Block block={heroBlock} classification={page.classification} />}
      <PageShell page={page}>
        <TableOfContents />
        {contentBlocks.map((block, i) => (
          <Block key={block.id || i} block={block} classification={page.classification} />
        ))}
        <OfficialAssistance />
      </PageShell>
    </>
  );
}

function OfficialAssistance() {
  return (
    <div className="mt-10 bg-surface border border-border rounded-xl p-6">
      <p className="font-bold text-ink mb-2 text-sm">Need Official Assistance?</p>
      <p className="text-sm text-muted leading-relaxed mb-4">
        This is an independent informational resource. For official services {'\u2014'} checking your grant status,
        updating your details, or submitting an appeal {'\u2014'} please use the official SASSA portals directly:
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 px-3 py-2 bg-gold text-accent-foreground rounded-lg text-xs font-bold hover:bg-gold-dark transition">
          SRD Portal &rarr;
        </a>
        <a href="https://srd.dsd.gov.za" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface border border-border text-ink rounded-lg text-xs font-bold hover:bg-surface-dim transition">
          Appeal Portal &rarr;
        </a>
        <a href="https://www.gov.za" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface border border-border text-ink rounded-lg text-xs font-bold hover:bg-surface-dim transition">
          gov.za &rarr;
        </a>
      </div>
    </div>
  );
}

export { EditorialRenderer as ContentBlockRenderer };
export { Block as ContentBlock };
