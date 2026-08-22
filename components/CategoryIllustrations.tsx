interface IllustrationProps {
  className?: string;
  accent?: string;
}

export function BankingIllustration({ className, accent = "#3b82f6" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="35" width="160" height="70" rx="6" className="fill-surface-dim" stroke={c} strokeWidth="1.5" />
      <rect x="20" y="35" width="160" height="16" rx="6" fill={`${c}20`} />
      <rect x="28" y="39" width="12" height="8" rx="2" fill={c} />
      <rect x="55" y="58" width="90" height="4" rx="2" className="fill-muted/30" />
      <rect x="55" y="68" width="70" height="4" rx="2" className="fill-muted/30" />
      <rect x="55" y="78" width="80" height="4" rx="2" className="fill-muted/30" />
      <rect x="55" y="88" width="40" height="4" rx="2" fill={`${c}80`} />
      <rect x="140" y="55" width="28" height="28" rx="6" fill={`${c}20`} />
      <path d="M154 62l-7 7 7 7M148 69l7 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="148" cy="69" r="14" stroke={`${c}60`} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function GrantIllustration({ className, accent = "#ffcc00" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="45" r="22" fill={`${c}1A`} stroke={`${c}80`} strokeWidth="1.5" />
      <path d="M100 35v20M90 45h20" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <rect x="55" y="76" width="90" height="30" rx="6" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <text x="100" y="95" textAnchor="middle" fill={c} className="text-[10px] font-bold font-mono">R370</text>
      <rect x="55" y="76" width="30" height="30" rx="6" fill={`${c}33`} />
      <text x="70" y="95" textAnchor="middle" fill={c} className="text-[10px] font-bold font-mono">ZA</text>
    </svg>
  );
}

export function StatusIllustration({ className, accent = "#22c55e" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="55" y="25" width="90" height="70" rx="8" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <circle cx="100" cy="55" r="14" fill={`${c}33`} stroke={c} strokeWidth="2" />
      <path d="M93 55l5 5 9-9" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="70" y="78" width="60" height="14" rx="4" fill={`${c}1A`} />
      <text x="100" y="88" textAnchor="middle" fill={c} className="text-[8px] font-bold font-mono">ACTIVE</text>
    </svg>
  );
}

export function AppealIllustration({ className, accent = "#ef4444" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="50" y="25" width="100" height="75" rx="6" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <path d="M70 35h60M70 45h40M70 55h50M70 65h30" className="stroke-muted/30" strokeWidth="2" strokeLinecap="round" />
      <rect x="130" y="80" width="18" height="12" rx="2" fill={`${c}33`} />
      <circle cx="139" cy="86" r="3" fill={c} />
      <path d="M60 35l-8 8 8 8M60 43l-8-8" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EligibilityIllustration({ className, accent = "#a855f7" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="40" y="20" width="120" height="80" rx="8" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <rect x="55" y="32" width="36" height="36" rx="6" fill={`${c}33`} />
      <text x="73" y="55" textAnchor="middle" fill={c} className="text-sm font-bold">?</text>
      <rect x="100" y="35" width="45" height="4" rx="2" className="fill-muted/40" />
      <rect x="100" y="45" width="35" height="4" rx="2" className="fill-muted/40" />
      <rect x="100" y="55" width="40" height="4" rx="2" className="fill-muted/40" />
      <circle cx="85" cy="82" r="12" fill={`${c}33`} />
      <path d="M80 82l4 4 7-7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GuideIllustration({ className, accent = "#06b6d4" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="50" y="25" width="100" height="75" rx="6" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <rect x="50" y="25" width="100" height="18" rx="6" fill={`${c}20`} />
      <circle cx="62" cy="34" r="3" fill={c} />
      <circle cx="72" cy="34" r="3" className="fill-muted/30" />
      <circle cx="82" cy="34" r="3" className="fill-muted/30" />
      <text x="100" y="56" textAnchor="middle" fill={c} className="text-[8px] font-bold font-mono">STEP 1</text>
      <rect x="60" y="63" width="80" height="4" rx="2" className="fill-muted/30" />
      <rect x="60" y="73" width="60" height="4" rx="2" className="fill-muted/30" />
      <text x="100" y="90" textAnchor="middle" fill={`${c}80`} className="text-[8px] font-bold font-mono">STEP 2</text>
      <rect x="60" y="95" width="70" height="4" rx="2" className="fill-muted/20" />
    </svg>
  );
}

export function OfficeIllustration({ className, accent = "#f97316" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="60" y="35" width="80" height="55" rx="4" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <rect x="75" y="45" width="50" height="35" rx="3" fill={`${c}1A`} />
      <rect x="90" y="58" width="20" height="22" rx="2" fill={`${c}33`} />
      <rect x="82" y="45" width="10" height="4" rx="1" fill={`${c}50`} />
      <rect x="108" y="45" width="10" height="4" rx="1" fill={`${c}50`} />
      <circle cx="100" cy="37" r="3" fill={`${c}60`} />
      <path d="M85 86l-5 5 5 5M115 86l5 5-5 5" stroke={`${c}60`} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ProvinceIllustration({ className, accent = "#14b8a6" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="55" r="28" fill={`${c}1A`} stroke={`${c}60`} strokeWidth="1.5" />
      <path d="M100 33c-12 0-22 18-22 22s10 22 22 22 22-18 22-22-10-22-22-22z" fill={`${c}33`} stroke={`${c}80`} strokeWidth="1.5" />
      <circle cx="100" cy="55" r="6" fill={`${c}60`} />
      <rect x="60" y="88" width="80" height="3" rx="1.5" className="fill-muted/20" />
      <rect x="70" y="93" width="60" height="3" rx="1.5" className="fill-muted/20" />
      <rect x="80" y="98" width="40" height="3" rx="1.5" className="fill-muted/20" />
    </svg>
  );
}

export function CalendarIllustration({ className, accent = "#ffcc00" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="50" y="30" width="100" height="65" rx="8" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <rect x="50" y="30" width="100" height="16" rx="8" fill={`${c}33`} />
      <text x="100" y="41" textAnchor="middle" fill={c} className="text-[8px] font-bold font-mono">2026</text>
      <text x="100" y="70" textAnchor="middle" className="fill-ink text-[20px] font-bold font-display">15</text>
      <text x="100" y="85" textAnchor="middle" className="fill-muted text-[7px] font-mono">APRIL</text>
    </svg>
  );
}

export function NewsIllustration({ className, accent = "#64748b" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="35" y="25" width="130" height="75" rx="6" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <rect x="35" y="25" width="130" height="18" rx="6" fill={`${c}20`} />
      <circle cx="48" cy="34" r="3" fill="#ef4444" />
      <circle cx="58" cy="34" r="3" className="fill-muted/20" />
      <circle cx="68" cy="34" r="3" className="fill-muted/20" />
      <rect x="45" y="50" width="110" height="4" rx="2" className="fill-muted/30" />
      <rect x="45" y="60" width="90" height="4" rx="2" className="fill-muted/30" />
      <rect x="45" y="70" width="100" height="4" rx="2" className="fill-muted/30" />
      <rect x="45" y="80" width="60" height="4" rx="2" fill={`${c}80`} />
      <rect x="145" y="50" width="10" height="34" rx="2" fill={`${c}33`} />
    </svg>
  );
}

export function FaqIllustration({ className, accent = "#8b5cf6" }: IllustrationProps) {
  const c = accent;
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="40" y="25" width="120" height="75" rx="8" className="fill-surface-dim" stroke={`${c}50`} strokeWidth="1.5" />
      <circle cx="60" cy="42" r="10" fill={`${c}33`} stroke={c} strokeWidth="1.5" />
      <text x="60" y="46" textAnchor="middle" fill={c} className="text-[10px] font-bold font-mono">?</text>
      <rect x="78" y="37" width="45" height="4" rx="2" className="fill-muted/30" />
      <rect x="78" y="47" width="30" height="4" rx="2" className="fill-muted/20" />
      <line x1="78" y1="56" x2="140" y2="56" className="stroke-border" strokeWidth="1" />
      <circle cx="60" cy="72" r="10" fill={`${c}1A`} stroke={`${c}80`} strokeWidth="1.5" />
      <text x="60" y="76" textAnchor="middle" fill={`${c}99`} className="text-[10px] font-bold font-mono">?</text>
      <rect x="78" y="67" width="40" height="4" rx="2" className="fill-muted/20" />
      <rect x="78" y="77" width="25" height="4" rx="2" className="fill-muted/20" />
      <line x1="78" y1="86" x2="130" y2="86" className="stroke-border" strokeWidth="1" />
    </svg>
  );
}
