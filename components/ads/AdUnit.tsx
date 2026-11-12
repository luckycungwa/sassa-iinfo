"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  /** Numeric ad slot ID issued by AdSense. Empty or non-numeric renders nothing. */
  slotId: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({
  slotId,
  format = "auto",
  style,
  className = "",
  label = "Advertisement",
}: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const validSlot = /^\d+$/.test(slotId.trim()) ? slotId.trim() : null;

  useEffect(() => {
    if (!clientId || !validSlot || !ref.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      /* no-op */
    }
  }, [clientId, validSlot]);

  if (!clientId || !validSlot) return null;

  return (
    <div className={`ad-container my-6 text-center ${className}`} aria-label={label}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={clientId}
        data-ad-slot={validSlot}
        data-ad-format={format === "auto" ? "auto" : format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
