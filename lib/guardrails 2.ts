// lib/guardrails.ts
// Basic prompt/content guardrails. Extend as needed.
const bannedPatterns = [
  // NSFW / explicit
  /\b(nude|porn|sex|xxx|erotic)\b/i,
  // Hate/violence/illegal
  /\b(terror|bomb|kill|murder|genocide|child sexual|cp)\b/i,
  /\b(hack(?:ing)?|crack(?:ing)?|warez|pirated)\b/i,
  /\b(drugs?|hard drugs|cocaine|heroin|meth)\b/i,
];

export function validatePrompt(prompt: string) {
  const trimmed = (prompt || "").trim();
  if (!trimmed) {
    return { ok: false, reason: "Empty prompt" as const };
  }
  for (const rx of bannedPatterns) {
    if (rx.test(trimmed)) {
      return { ok: false, reason: "Contains disallowed content" as const };
    }
  }
  // Reasonable length guard
  if (trimmed.length > 2000) {
    return { ok: false, reason: "Prompt too long" as const };
  }
  return { ok: true as const };
}
