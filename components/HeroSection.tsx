'use client';

import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  description: string;
  readingTime?: string;
  lastUpdated?: string;
  image?: string;
  imageAlt?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function HeroSection({
  title,
  description,
  readingTime,
  lastUpdated,
  image,
  imageAlt,
  cta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface-dim via-surface to-surface dark:from-midnight dark:via-surface dark:to-surface border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        <div className={"grid gap-12 " + (image ? "md:grid-cols-2 md:items-center" : "")}>
          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.05] text-ink">
              {title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground-foreground leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
              {readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime}
                </span>
              )}
              {lastUpdated && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Last updated: {lastUpdated}
                </span>
              )}
            </div>
            {(cta || secondaryCta) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {cta && (
                  <Link
                    href={cta.href}
                    className="px-6 py-3 bg-gold text-accent-foreground rounded-lg font-bold hover:bg-gold-dark transition shadow-lg shadow-gold/25 text-sm"
                  >
                    {cta.label} <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="px-6 py-3 border border-border text-ink rounded-lg font-bold hover:bg-surface-dim transition text-sm"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
          {image && (
            <div className="hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={imageAlt || ""}
                width={800}
                height={640}
                className="rounded-xl w-full h-auto object-cover max-h-80"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
