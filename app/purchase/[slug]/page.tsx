"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { PACKAGES } from "@/lib/packages";

type Lead = { name: string; email: string; website?: string; vision?: string } | null;

export default function PurchasePage() {
  const { slug } = useParams<{ slug: keyof typeof PACKAGES }>();
  const pkg = useMemo(() => PACKAGES[slug], [slug]);

  const [lead, setLead] = useState<Lead>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  // inline quick-form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [vision, setVision] = useState("");

  if (!pkg) return notFound();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sf_lead");
      if (raw) {
        const parsed = JSON.parse(raw);
        setLead(parsed);
        // hydrate quick-form so user can edit if needed
        setName(parsed?.name || "");
        setEmail(parsed?.email || "");
        setWebsite(parsed?.website || "");
        setVision(parsed?.vision || "");
      }
    } catch {}
  }, []);

  async function saveDetails() {
    setMsg("");
    if (!name.trim() || !email.trim()) {
      setMsg("Please add your name and email.");
      return;
    }
    setSaving(true);
    const payload = { name: name.trim(), email: email.trim(), website: website.trim(), vision: vision.trim(), source: "purchase-page" };

    try {
      // Persist locally for checkout & future visits
      localStorage.setItem("sf_lead", JSON.stringify(payload));
      setLead(payload);

      // Fire & forget to your existing endpoint (won’t block UX)
      fetch("/api/free-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
      setMsg("Details saved — you can pay the deposit now.");
    } catch (e: any) {
      setMsg(e?.message || "Unable to save details.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePay() {
    setMsg("");
    if (!lead || !lead?.name || !lead?.email) {
      setMsg("Add your details first (quick form above).");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, lead }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok || !data?.url) throw new Error(data?.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e: any) {
      setMsg(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-black/50 p-6 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-bold text-white">{pkg.title}</h1>

        <p className="mt-2 text-white/75">
          Reserve your build with a <span className="font-semibold text-emerald-400">50% deposit (£{pkg.depositGBP})</span>.
          The remaining balance is collected on delivery.
        </p>

        {/* Quick details panel */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-white/90 font-medium">Quick details (60s)</p>
            <span className={`text-xs ${lead ? "text-emerald-400" : "text-amber-300"}`}>
              {lead ? "Saved" : "Required before payment"}
            </span>
          </div>

          <div className="grid gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name *"
              className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-emerald-500"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email *"
              type="email"
              className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-emerald-500"
            />
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Current Website (optional)"
              className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-emerald-500"
            />
            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Vision / requirements (optional)"
              rows={4}
              className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-emerald-500"
            />
            <button
              onClick={saveDetails}
              disabled={saving}
              className="w-full rounded-md bg-white/10 px-4 py-2 font-semibold text-white transition hover:bg-white/15 disabled:opacity-60"
            >
              {saving ? "Saving..." : lead ? "Update details" : "Save details"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <button
            onClick={handlePay}
            disabled={loading || !lead}
            className="w-full rounded-md bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
            title={!lead ? "Add your details above to continue" : ""}
          >
            {loading ? "Redirecting to Stripe..." : `Pay £${pkg.depositGBP} Deposit`}
          </button>

          <a
            href="/"
            className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-center font-semibold text-white transition hover:bg-white/10"
          >
            Back to home
          </a>

          {msg && <p className="text-sm text-white/80">{msg}</p>}
        </div>

        <p className="mt-6 text-xs text-white/50">
          By reserving, you agree we’ll schedule your build and begin planning. Deposits are applied to the final
          invoice. If anything changes, just reply to the confirmation email — we’re friendly.
        </p>
      </div>
    </main>
  );
}
