import type { ContentBlock } from "../lib/schema/contentSchema";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading": {
      const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
      const sizes = { 2: "text-xl sm:text-2xl", 3: "text-lg sm:text-xl", 4: "text-base sm:text-lg" };
      return <Tag className={cn("font-bold text-ink tracking-tight mt-8 mb-3", sizes[block.level])}>{block.text}</Tag>;
    }
    case "paragraph":
      return <p className="text-sm text-muted leading-relaxed mb-4">{block.text}</p>;
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className={cn("space-y-2 mb-4", block.ordered ? "list-decimal list-inside" : "")}>
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted">
              {!block.ordered && <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />}
              {block.ordered && <span className="font-bold text-accent flex-shrink-0">{i + 1}.</span>}
              {item}
            </li>
          ))}
        </ListTag>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            {block.caption && <caption className="text-xs text-muted text-left mb-2">{block.caption}</caption>}
            <thead>
              <tr className="border-b border-border">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left font-bold text-ink p-2 text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-2 text-xs text-muted">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const colors = {
        info: "bg-blue-50 border-blue-200 text-blue-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        success: "bg-emerald-50 border-emerald-200 text-emerald-800",
        danger: "bg-red-50 border-red-200 text-red-800",
      };
      return (
        <div className={cn("border rounded-xl p-4 mb-4", colors[block.intent])}>
          {block.title && <p className="font-bold text-sm mb-1">{block.title}</p>}
          <p className="text-sm leading-relaxed">{block.text}</p>
        </div>
      );
    }
    case "steps":
      return (
        <div className="space-y-4 mb-4">
          {block.steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{step.title}</p>
                <p className="text-xs text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "faq":
      return (
        <div className="space-y-2 mb-4">
          {block.faqs.map((faq, i) => (
            <details key={i} className="border border-border rounded-lg group">
              <summary className="text-sm font-bold text-ink p-3 cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <span className="text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </summary>
              <p className="text-sm text-muted p-3 pt-0 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      );
    case "link-grid":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {block.links.map((link, i) => (
            <a key={i} href={link.href} className="block border border-border rounded-xl p-4 hover:border-accent transition-colors">
              <p className="text-sm font-bold text-accent">{link.title}</p>
              {link.description && <p className="text-xs text-muted mt-1">{link.description}</p>}
            </a>
          ))}
        </div>
      );
    case "grant-summary":
      return (
        <div className="flex items-start justify-between gap-4 bg-surface border border-border rounded-xl p-5 mb-4">
          <div>
            <p className="text-xs font-bold text-ink mb-1">Target Group</p>
            <p className="text-xs text-muted">{block.targetGroup}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-black text-accent-dark">{block.amount}</p>
            <p className="text-[10px] font-mono text-muted">{block.frequency}</p>
          </div>
        </div>
      );
    case "document-checklist":
      return (
        <ul className="space-y-2 mb-4">
          {block.documents.map((doc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted">
              <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", doc.required ? "bg-status-pending" : "bg-muted")} />
              {doc.label}{!doc.required && <span className="text-muted ml-1">(optional)</span>}
              {doc.notes && <span className="text-muted ml-1">— {doc.notes}</span>}
            </li>
          ))}
        </ul>
      );
    case "status-reference":
      return (
        <div className="bg-surface border border-border rounded-xl p-5 mb-4 space-y-3">
          <p className="text-sm text-muted leading-relaxed">{block.explanation}</p>
          <div>
            <p className="text-xs font-bold text-ink mb-1">Why it happens:</p>
            <ul className="space-y-1">{block.whyItHappens.map((w, i) => <li key={i} className="text-xs text-muted flex gap-1"><span className="text-accent">•</span>{w}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-bold text-ink mb-1">How long it lasts:</p>
            <p className="text-xs text-muted">{block.howLongItLasts}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-ink mb-1">What to do:</p>
            <ul className="space-y-1">{block.whatYouShouldDo.map((w, i) => <li key={i} className="text-xs text-muted flex gap-1"><span className="text-accent">•</span>{w}</li>)}</ul>
          </div>
        </div>
      );
    case "divider":
      return <hr className="border-border my-6" />;
    case "quote":
      return (
        <blockquote className="border-l-4 border-accent pl-4 italic text-sm text-muted mb-4">
          <p>{block.text}</p>
          {block.attribution && <footer className="text-xs font-bold text-ink mt-1">— {block.attribution}</footer>}
        </blockquote>
      );
    case "code":
      return (
        <pre className="bg-ink text-white text-xs p-4 rounded-xl overflow-x-auto mb-4 font-mono">
          <code>{block.code}</code>
        </pre>
      );
    case "image":
      return (
        <figure className="mb-4">
          <img src={block.src} alt={block.alt} className="rounded-xl w-full" loading="lazy" />
          {block.caption && <figcaption className="text-xs text-muted mt-1">{block.caption}</figcaption>}
        </figure>
      );
    case "news-meta":
      return (
        <div className="flex gap-2 mb-4">
          <span className="text-[10px] font-mono text-muted bg-surface border border-border rounded px-2 py-1">{block.date}</span>
          {block.tags.map((tag) => <span key={tag} className="text-[10px] font-mono text-muted bg-surface border border-border rounded px-2 py-1">{tag}</span>)}
        </div>
      );
    default:
      return null;
  }
}

export function ContentBlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="max-w-3xl">
      {blocks.map((block, i) => (
        <Block key={block.id || i} block={block} />
      ))}
    </div>
  );
}
