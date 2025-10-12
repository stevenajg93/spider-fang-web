# Spider Fang — Blueprint & Current State

## Vision
Generate a convincing **instant free design** (demo) fast, then push users to **Book a Call**. Quote per job after the call (no on-site payments).

## Current State (2025-10-12)
- **Model:** Quote-after-call (Stripe disabled in UI)
- **Hero:** Two CTAs — **Book a Call** (primary) + **Start Free Design** (secondary)
- **Footer CTA:** Same two options, consistent labels
- **Instant Demo:** `/instant-demo` + `/instant-demo/sent` working (V0_MOCK=1 ok), email preview link via proxy
- **Theme:** Dark enforced (light polish pending)
- **Packages:** Hidden (moving away from pay-now tiers)
- **Copy:** Not UK-limited; concise, modern; no outdated em-dashes
- **Branch/Tag:** `redesign-pass-1` merged; tag `milestone-quote-after-call-2025-10-11`

## Target Verticals / Modules
- **App pre-launch:** waitlist + roadmap/docs
- **Restaurant:** menu CMS + bookings embed (+ ordering later)
- **Estate agent:** property listings + enquiry + filters (later)
Modules: bookings, menu CMS, listings, filters, Stripe payment link/Checkout (when needed), blog/docs (MDX), case studies, reviews/gallery, map/locations, GA4 events, JSON-LD schema.

## Guardrails
- Outcomes over page-counts (Perf ≥ 90 mobile Lighthouse; INP ≤ 200ms; CLS < 0.1; WCAG 2.2 AA basics)
- Technical SEO (titles/meta/canonical/sitemap/JSON-LD)
- Microcopy only (no campaigns). Quote after call.

## Next Up
1) Light-theme contrast polish
2) Slim “Examples/Portfolio” strip
3) Add **Book a Call** to header & footer (header button)
4) Tighten “Why it works” copy & placement
