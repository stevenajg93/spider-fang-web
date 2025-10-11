"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type GenResponse = {
  ok: boolean;
  previewUrl?: string;
  alreadyGenerated?: boolean;
  error?: string;
};

export default function InstantDemoPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      /\S+@\S+\.\S+/.test(email) &&
      prompt.trim().length >= 10 &&
      prompt.trim().length <= 2000
    );
  }, [name, email, prompt]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!canSubmit) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          prompt: prompt.trim(),
        }),
      });

      const data: GenResponse = await res.json().catch(() => ({ ok: false }));
      if (!data.ok || !data.previewUrl) {
        const msg = data?.error || "Failed to generate preview.";
        setErr(msg);
        setLoading(false);
        return;
      }

      try {
        window.open(data.previewUrl, "_blank", "noopener,noreferrer");
      } catch {}

      const qs = new URLSearchParams({
        u: data.previewUrl,
        name,
        email,
        reused: data.alreadyGenerated ? "1" : "0",
      }).toString();
      router.push(`/instant-demo/sent?${qs}`);
    } catch {
      setErr("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] w-full flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Get an instant demo</h1>
        <p className="text-muted-foreground mb-8">
          Describe your website and we’ll generate a live preview under our domain. One free demo per email.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your name</label>
              <input
                className="w-full rounded-xl border border-zinc-300 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                className="w-full rounded-xl border border-zinc-300 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
                placeholder="jane@company.com"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-zinc-500 mt-1">We enforce one demo per email.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company (optional)</label>
            <input
              className="w-full rounded-xl border border-zinc-300 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Spider Fang Ltd"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Describe your website</label>
            <textarea
              className="w-full min-h-[160px] rounded-xl border border-zinc-300 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="A cinematic agency site with a hero reel, services grid, case studies, and a bold contact section…"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              maxLength={2000}
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>Keep it clean — no NSFW/illegal content.</span>
              <span>{prompt.length}/2000</span>
            </div>
          </div>

          {err && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm bg-black text-white hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-80" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                Generating…
              </span>
            ) : (
              "Generate instant demo"
            )}
          </button>

          <p className="text-xs text-zinc-500">
            By generating, you agree to our fair use policy. You’ll see your preview in a new tab and a confirmation page with next steps.
          </p>
        </form>
      </div>
    </main>
  );
}
