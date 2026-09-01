import { UserCheck, Stethoscope, Scale } from "lucide-react";
import { TEAM } from "../lib/team";

/**
 * Byline — visible E-E-A-T signals for YMYL content pages.
 * Renders the named, credentialed author. Medical and legal review badges
 * are shown only when real, verified reviewers are configured in team.ts.
 */
export default function Byline() {
  const { author, medicalReviewer, legalReviewer } = TEAM;

  return (
    <div className="flex flex-col gap-3">
      {/* Author */}
      <div className="flex items-center gap-3 bg-surface border border-border rounded-lg p-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm bg-gold text-accent-foreground">
          {author.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-ink">By {author.name}</span>
            <UserCheck className="w-3.5 h-3.5 text-accent-dark" />
          </div>
          <p className="text-xs text-muted font-mono">
            {author.role} &bull; {author.credentials}
          </p>
        </div>
      </div>

      {/* Reviewer trust badges — only shown when real reviewers are configured */}
      {(medicalReviewer || legalReviewer) && (
        <div className="flex flex-wrap items-center gap-2">
          {medicalReviewer && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-surface border border-border rounded-md px-2.5 py-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-accent-dark" />
              Medically reviewed by <span className="font-semibold text-ink">{medicalReviewer.name}</span>
              <span className="text-muted-foreground font-mono">({medicalReviewer.credentials})</span>
            </span>
          )}
          {legalReviewer && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-surface border border-border rounded-md px-2.5 py-1.5">
              <Scale className="w-3.5 h-3.5 text-accent-dark" />
              Legally reviewed by <span className="font-semibold text-ink">{legalReviewer.name}</span>
              <span className="text-muted-foreground font-mono">({legalReviewer.credentials})</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
