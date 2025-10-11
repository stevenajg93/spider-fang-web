"use client";

import { Suspense, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

type CheckoutResp =
  | { ok: true; url: string }
  | { ok: false; error?: string };

function SentInner() {
  const params = useSearchParams();
  const previewUrl = params.get("u") || "";
  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const reused = params.get("reused") === "1";

  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const askBookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "mailto:onboarding@resend.dev?subject=Spider%20Fang%20—%20Ask%20about%20AI/Web3/XR&body=Hi%2C%0A%0AI'd%20like%20to%20discuss%20an%20AI%2FWeb3%2FXR%20project.%0A%0AThanks!";

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Send me my instant demo link");
    const body = encodeURIComponent(
      [
        name ? `Hi, I'm ${name}.` : "Hi,",
        "Please send me my instant demo link:",
        previewUrl || "[no link provided]",
        "",
        "Thanks!",
      ].join("\n")
    );
    const to = email || "";
    if (to) return `mailto:${to}?subject=${subject}&body=${body}`;
    return `mailto:?subject=${subject}&body=${body}`;
  }, [name, email, previewUrl]);

  const doCheckout = useCallback(
    async (slug: "landing-page" | "three-page" | "five-page" | "custom", label: string) => {
      setErr(null);
      setBusy(slug);
      try {
        const res = await fetch("/api/checkout/route", { method: "HEAD" }); // noop to warm route
      } catch {}
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug,
            lead: {
              name: name || "Instant Demo Lead",
              email,
              website: "", // optional
              vision: "Instant demo conversion from /instant-demo/sent",
            },
          }),
        });
        const data: CheckoutResp = await res.json();
        if (!data.ok || !("url" in data)) {
          throw new Error((data as any)?.error || "Checkout failed");
        }
        try {
          window.open(data.url, "_blank", "noopener,noreferrer");
        } catch {
          window.location.href = data.url;
        }
      } catch (e: any) {
        setErr(e?.message || "Checkout failed. Please try again.");
      } finally {
        setBusy(null);
      }
    },
    [name, email]
  );

  return (
    <main className="min-h-[70vh] w-full flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          {reused ? "Your demo is ready (again)" : "Your demo is ready"}
        </h1>
        <p className="text-muted-foreground mb-6">
          We opened your preview in a new tab. Copy the link, or choose how you’d like us to take it live.
        </p>

        {err && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2">
            {err}
          </div>
        )}

        {/* Four CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => doCheckout("landing-page", "Launch £199")}
            disabled={busy !== null}
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-zinc-300 hover:bg-zinc-50 transition"
          >
            {busy === "landing-page" ? "Loading…" : "Launch (£199)"}
          </button>

          <button
            onClick={() => doCheckout("three-page", "Upgrade £395")}
            disabled={busy !== null}
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-zinc-300 hover:bg-zinc-50 transition"
          >
            {busy === "three-page" ? "Loading…" : "Upgrade (£395)"}
          </button>

          <button
            onClick={() => doCheckout("five-page", "Go Full Stack £795")}
            disabled={busy !== null}
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm bg-black text-white hover:opacity-90 transition"
          >
            {busy === "five-page" ? "Loading…" : "Go Full Stack (£795)"}
          </button>

          <a
            href={askBookingUrl}
            target={askBookingUrl.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-zinc-300 hover:bg-zinc-50 transition"
          >
            Ask (AI / Web3 / XR)
          </a>
        </div>

        {/* Existing actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          {previewUrl ? (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm bg-black text-white hover:opacity-90 transition"
            >
              Open Preview
            </a>
          ) : null}

          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-zinc-300 hover:bg-zinc-50 transition"
          >
            Tune my demo
          </a>

          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-zinc-300 hover:bg-zinc-50 transition"
          >
            Email me this link
          </a>
        </div>

        {previewUrl ? (
          <div className="mt-6">
            <p className="text-sm text-zinc-500 mb-2">Or copy your link:</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={previewUrl}
                className="w-full rounded-xl border border-zinc-300 bg-white/60 px-4 py-3 outline-none"
                onFocus={(e) => e.currentTarget.select()}
              />
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(previewUrl).catch(() => {});
                }}
                className="rounded-xl px-4 py-3 font-medium border border-zinc-300 hover:bg-zinc-50 transition"
              >
                Copy
              </button>
            </div>
          </div>
        ) : null}

        <p className="text-xs text-zinc-500 mt-8">
          Want it live on your domain with real content? We’ll tailor it and ship fast.
        </p>
      </div>
    </main>
  );
}

export default function InstantDemoSentPage() {
  return (
    <Suspense fallback={<main className="min-h-[60vh] flex items-center justify-center"><span className="text-sm text-zinc-500">Loading…</span></main>}>
      <SentInner />
    </Suspense>
  );
}
