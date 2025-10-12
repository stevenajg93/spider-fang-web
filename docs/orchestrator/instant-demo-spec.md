# Orchestrator Prompt (Instant Demo) — Reference

Paste your full internal prompt here (system, tools, SAFE_PLAN, specJson requirements, tool-call schema, critique checklist, etc.).  
Keep provider URLs out of UI; always proxy previews via `/api/preview?pid=...`.

**Key rules (summary):**
- `check_quota(email)` first; one demo per email
- Build `specJson` with required pages: Home, Services, **CTA (mandatory)**, Contact (opt: Portfolio, Pricing, FAQ)
- UK spelling/£ only when needed; otherwise neutral English
- CTA tiers (when used): Launch £199, Upgrade £395, Go Full Stack £795, Ask (booking)
- On any tool error → return `SAFE_PLAN` with booking link
- Final output must be either a tool call JSON or a `SAFE_PLAN` object

> Replace this placeholder with your original blueprint prompt from your engineer so it lives in the repo.
