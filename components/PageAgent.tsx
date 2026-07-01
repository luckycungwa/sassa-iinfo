'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Loader2, RefreshCw, X, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; url: string }[];
}

interface PageAgentProps {
  pageContext: string;
  onClose?: () => void;
  titleContext?: string;
}

export default function PageAgent({ pageContext, onClose, titleContext = "Home" }: PageAgentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I am **PageAgent**, your SASSA assistant. I am grounded in the content of the **${titleContext}** section. 

How can I help you today? You can ask me to summarize this page, check eligibility, or guide you on what to do next.`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle section context change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          content: `I've updated my focus to the **${titleContext}** section. 

Ask me anything about this page, such as:
- *"Summarise this page"*
- *"What should I do next?"*
- *"What are the common issues?"*`
        }
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, [titleContext]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    if (!textToSend) setInput("");
    setError("");

    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          pageContext: pageContext,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.text, sources: data.sources }
      ]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while calling the PageAgent.");
    } finally {
      setLoading(false);
    }
  };

  const presetQuestions = [
    "Summarise this page",
    "What should I do next?",
    "What are the requirements?",
  ];

  return (
    <div className="flex flex-col h-full bg-surface border-l border-slate-200  overflow-hidden rounded-r-xl">
      {/* Header */}
      <div className="p-4 bg-accent-dark text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-400 text-emerald-950 rounded-lg">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide">PageAgent AI</h3>
            <p className="text-[10px] text-amber-300 font-mono tracking-tight">
              Grounded: {titleContext}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-lg transition"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-canvas scrollbar-thin">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-3.5  text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-tr-none"
                  : "bg-surface text-slate-800 border border-border rounded-tl-none"
              }`}
            >
              {/* Content rendering with support for basic markdown bolding & bullets */}
              <div className="space-y-2 whitespace-pre-wrap">
                {msg.content.split("\n").map((line, lIdx) => {
                  let formatted = line;
                  // Handle bold markers **
                  if (formatted.includes("**")) {
                    const parts = formatted.split("**");
                    return (
                      <p key={lIdx}>
                        {parts.map((part, pIdx) =>
                          pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-amber-500">{part}</strong> : part
                        )}
                      </p>
                    );
                  }
                  // Handle bullet point markers
                  if (formatted.startsWith("- ") || formatted.startsWith("* ")) {
                    return (
                      <li key={lIdx} className="list-disc ml-4 pl-1">
                        {formatted.substring(2)}
                      </li>
                    );
                  }
                  return <p key={lIdx}>{formatted}</p>;
                })}
              </div>

              {/* Citations / Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-border text-xs">
                  <p className="font-semibold text-muted mb-1 font-mono">Sources:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.sources.map((src, sIdx) => (
                      <a
                        key={sIdx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-dark hover:underline bg-accent-light/50 border border-emerald-100 px-2 py-0.5 rounded text-[11px]"
                      >
                        {src.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-border rounded-xl rounded-tl-none p-4  flex items-center gap-2 text-muted text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-accent-dark" />
              <span>PageAgent is searching and thinking...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Connection Error</p>
              <p className="mt-0.5">{error}</p>
              <button
                onClick={() => handleSend(messages[messages.length - 1]?.role === "user" ? messages[messages.length - 1].content : undefined)}
                className="mt-2 text-red-800 hover:underline font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Retry last question
              </button>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
        {presetQuestions.map((q, qIdx) => (
          <button
            key={qIdx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-xs bg-surface hover:bg-accent-light border border-slate-200 hover:border-emerald-200 px-2.5 py-1.5 rounded-full transition text-slate-600 hover:text-accent-dark font-medium"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-surface border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask SASSA PageAgent..."
          disabled={loading}
          className="flex-1 bg-canvas hover:bg-slate-100/50 focus:bg-surface border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 transition placeholder:text-muted"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="bg-accent hover:bg-accent-dark text-white p-2.5 rounded-xl transition disabled:opacity-50 disabled:hover:bg-accent"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
