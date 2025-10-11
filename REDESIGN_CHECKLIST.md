# Spider Fang — Redesign Pass 1 (branch: redesign-pass-1)

## Goals (1–2 hours)
- Tighten layout/visuals, keep flows working.
- Do NOT touch /api contracts or DB.
- Leave Instant Demo intact; just link to it.

## Pages to polish (order)
1) `/` (Home): hero, value prop, CTA buttons.
2) `/services`: package cards, copy, CTA hierarchy.
3) `/availability`: intro copy + embed spacing.
4) `/purchase/[slug]`: deposit card clarity.
5) `/instant-demo/sent`: CTA buttons wording.

## Quick wins
- **Typography:** increase line-height for paragraphs; ensure max-width ~72ch.
- **Header/Nav:** add sticky header with subtle backdrop blur.
- **Hero copy:** 1-liner promise + proof (UK spelling, £).
- **Primary CTA:** “Start Free Design” (links to `/` form), **Secondary:** “Instant Demo”.
- **Packages:** consistent names + prices; short bullet benefits (3–5).
- **Buttons:** use consistent rounded-2xl + shadow-sm; hover states.
- **Spacing:** 80–120px section rhythm desktop; 48–64px mobile.
- **Accessibility:** semantic headings (H1 per page), aria-labels on icon-only controls.
- **Performance:** lazy-load heavy components; compress background FX if any.

## Copy (UK tone)
- “organise”, “personalise”, “optimise”, “programme”, “defence”, “licence”
- Prices: £199 / £395 / £795 when referenced.

## Links to keep
- Instant Demo form: `/instant-demo`
- Booking link: env `NEXT_PUBLIC_BOOKING_URL` (fallback to mailto)
- Stripe deposit flow: `/purchase/[slug]`

## After polish
- Manual test:
  - Home → Services → Buy → Stripe opens.
  - Home → Instant Demo → form → preview opens (mock/live).
  - Sent page CTAs: Launch/Upgrade/Go Full Stack/Ask.
- Commit:
  - `git add -A && git commit -m "redesign pass 1: layout + copy polish"`

## Optional next
- Sync package prices in `lib/packages.ts` to £199/£395/£795.
- Add footer with contact + legal.
- Add FAQ section to Home or Services.

— End
