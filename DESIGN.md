# Design System: SASSA Resource Platform

## 1. Visual Theme & Atmosphere

Low density (3/10), asymmetric variance (6/10), fluid motion (6/10). A public assistance knowledge base designed with editorial restraint — authoritative without being bureaucratic, warm without being casual. Think a government services portal redesigned by a modern editorial studio. Airy layouts with generous whitespace, deliberate asymmetry in hero sections, and a single muted accent color. No decorative excess. Everything serves clarity and trust.

## 2. Color Palette & Roles

- **Canvas White** (#FAFAFA) — Primary page background, almost-white with a whisper of warmth
- **Pure Surface** (#FFFFFF) — Card and container fills
- **Deep Charcoal Ink** (#18181B) — Primary text, near-black with warmth
- **Muted Steel** (#71717A) — Secondary and supporting text
- **Faint Border** (rgba(228,228,231,0.6)) — Structural dividers, card borders
- **Sangoma Green** (#059669) — Single accent color. Muted emerald for links, buttons, active states. Saturation kept below 70%.
- **Sangoma Light** (#ECFDF5) — Accent background fills (hover states, callout backgrounds)
- **Sangoma Dark** (#065F46) — Accent hover and active states
- **Status Green** (#16A34A) — Approved / success states
- **Status Amber** (#D97706) — Pending / warning states
- **Status Red** (#DC2626) — Declined / error states

Maximum one accent color. No purple, no neon, no gradients on interactive elements. One palette throughout — no warm/cool gray shifts.

## 3. Typography Rules

- **Display:** Outfit — Variable font for all headings. Track-tight (-0.02em for display, -0.01em for H2-H3). Hierarchy through weight (ExtraBold → Bold) and color, never through font switching.
- **Body:** Outfit — Relaxed leading (1.6), max 65 characters per line for readability.
- **Mono:** JetBrains Mono — Metadata, status values, payment amounts, code blocks, high-density data displays.
- **Scale:** clamp() based. H1: clamp(1.75rem, 4vw, 2.5rem). Body minimum 0.875rem/14px.
- **Banned:** Inter, Times New Roman, Georgia, Garamond, Palatino, any generic serif in UI contexts.

## 4. Component Stylings

- **Buttons:** Flat background, no shadows. `rounded-lg` (8px). Active state: `scale-[0.97]` transform. Focus: 2px accent ring. No outer glow, no gradients, no custom cursors. Primary: Sangoma Green fill, white text. Secondary: transparent, 1px Faint Border.
- **Cards:** No shadows. Hierarchy communicated through border presence and background tint. Rounded-xl (12px). Surface-level cards: white bg + border. Elevated cards: Sangoma Light tint + border. Hover: subtle border darkening, no lift/translate.
- **Inputs:** Label above input in Muted Steel. Input: 1px Faint Border, rounded-lg. Focus: 2px Sangoma Green ring. Error below input in Status Red. Helper text below in Muted Steel.
- **Loaders:** Skeletal shimmer matching real layout dimensions. No generic spinners.
- **Empty states:** Composed guidance with clear next-step CTAs, not blank spaces.
- **Tags/Pills:** Rounded-full, bg-Sangoma Light, text-Sangoma Dark, border, text-[11px] font-mono.

## 5. Layout Principles

- **Grid-first:** CSS Grid for all multi-column layouts. No Flexbox percentage math, no `calc()` hacks.
- **Max-width:** 1280px container (`max-w-7xl`). Content panes capped at 768px for readability.
- **Asymmetry:** Hero sections never centered when variance > 4. Text-left with offset visual elements.
- **No 3-card equal rows:** Prefer 2-column grids, zig-zag patterns, or horizontal scroll.
- **Responsive:** Mobile-first collapse at 768px. All multi-column → single column. Headlines scale via `clamp()`. Interactive targets minimum 44px.
- **Vertical rhythm:** Section spacing via `clamp(2rem, 6vw, 4rem)`. Consistent padding: `p-4 sm:p-6 lg:p-8`.

## 6. Motion & Interaction

- **Spring defaults:** `stiffness: 100, damping: 20` for all motion animations. No linear easing ever.
- **Page transitions:** Fade + subtle vertical slide (8px, 200ms, spring).
- **List reveals:** Staggered children with 50ms delay between each.
- **Permanent micro-animations:** Pulsing heartbeat on the active accent indicator dot. Typewriter effect on tagline. 
- **Animation constraint:** Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`.
- **Hover states:** Border color transitions (200ms ease), no lift/translate/scaling on static elements.

## 7. Anti-Patterns (Banned)

- No emojis in UI
- No Inter font family
- No generic serif fonts (Times New Roman, Georgia, Garamond, Palatino)
- No pure black (#000000)
- No neon glow shadows (0 0 Xpx Ypx rgba(...) with blur)
- No outer glow box-shadows
- No oversaturated accent colors (HSL saturation > 80%)
- No heavy gradient text on large headers
- No custom mouse cursors
- No overlapping elements
- No 3-column equal card layouts side-by-side
- No generic placeholder names ("John Doe", "Acme", "Nexus")
- No fabricated numbers, metrics, or performance statistics
- No fake "system metrics" sections
- No "LABEL // YEAR" formatting
- No AI copywriting cliches ("Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionary")
- No filler prompt text ("Scroll to explore", "Swipe down", chevron bounce prompts)
- No broken image links; use inline SVG or placeholders only
- No linear easing in animations
