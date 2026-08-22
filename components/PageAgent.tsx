'use client';

import { useEffect, useRef, useState } from "react";

interface PageAgentProps {
  pageContext?: string;
  titleContext?: string;
  onClose?: () => void;
}

export default function PageAgent({ pageContext, titleContext = "Home" }: PageAgentProps) {
  const initialized = useRef(false);
  const agentRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function init() {
      try {
        const { PageAgent } = await import("page-agent");

        const agent = new (PageAgent as any)({
          model: process.env.NEXT_PUBLIC_PAGE_AGENT_MODEL || "qwen3.5-plus",
          baseURL: "/api/page-agent",
          apiKey: "server-proxied",
          language: "en-US",
        });

        agentRef.current = agent;
        agent.panel.show();
        setReady(true);

        if (pageContext) {
          agent.execute(
            `You are focused on: "${titleContext}". Context: ${pageContext}. Guide the user through SASSA grant information. Respond helpfully.`
          );
        }
      } catch (err) {
        console.error("Failed to initialize PageAgent:", err);
      }
    }

    init();

    return () => {
      if (agentRef.current) {
        try { agentRef.current.panel.hide(); } catch {}
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready && agentRef.current && pageContext) {
      agentRef.current.execute(
        `The user navigated to: "${titleContext}". Context: ${pageContext}. Update your focus.`
      );
    }
  }, [pageContext, titleContext, ready]);

  return null;
}
