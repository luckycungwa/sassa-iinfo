'use client';

import { useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const headings = document.querySelectorAll("h2, h3");
      const tocItems: TOCItem[] = [];
      headings.forEach((h) => {
        if (!h.id) {
          h.id = h.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "";
        }
        tocItems.push({
          id: h.id,
          text: h.textContent || "",
          level: parseInt(h.tagName[1]),
        });
      });
      setItems(tocItems);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="bg-surface border border-border rounded-xl p-4 mb-8" aria-label="Page sections">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full lg:hidden"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-gold" />
          <span className="text-xs font-bold text-ink">On this page</span>
        </div>
        <ChevronDown className={"w-4 h-4 text-muted transition " + (isExpanded ? "rotate-180" : "")} />
      </button>
      <div className={"mt-3 lg:mt-0 " + (isExpanded ? "block" : "hidden lg:block")}>
        <div className="hidden lg:flex items-center gap-2 mb-3">
          <List className="w-4 h-4 text-gold" />
          <span className="text-xs font-bold text-ink">On this page</span>
        </div>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={"#" + item.id}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={
                  "block text-xs py-1.5 px-2 rounded-lg transition " +
                  (activeId === item.id
                    ? "bg-gold/10 text-gold font-bold"
                    : "text-muted hover:text-ink hover:bg-surface-dim")
                }
                style={{ paddingLeft: item.level === 3 ? "24px" : "8px" }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
