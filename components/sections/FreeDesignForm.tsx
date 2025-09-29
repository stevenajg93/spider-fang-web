"use client";

import { useState } from "react";

const BOOKING_URL = "https://calendar.app.google/gHKSUZSsUMBvM6no8"; // your booking link

export default function FreeDesignForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [vision, setVision] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !email.trim() || !vision.trim()) {
      setMessage("Please complete Name, Email and Vision.");
      return;
    }

    setLoading(true);

    // Open a blank tab synchronously (avoids popup blockers), we'll navigate it after submit succeeds
    const bookingTab = window.open("about:blank");

    try {
      const form = new FormData();
      form.set("name", name.trim());
      form.set("email", email.trim());
      form.set("website", website.trim());
      form.set("vision", vision.trim());
      if (files) {
        Array.from(files).slice(0, 10).forEach((f) => form.append("files", f));
      }

      const res = await fetch("/api/free-design", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send details");
      }

      // Navigate the tab to Google booking
      if (bookingTab) bookingTab.location.href = BOOKING_URL;
      else window.location.href = BOOKING_URL;

      // Optional: clear form
      setName(""); setEmail(""); setWebsite(""); setVision(""); setFiles(null);
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong. Please try again.");
      // If submission failed and we opened a blank tab, close it
      try { bookingTab?.close(); } catch {}
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl">
      <h2 className="mb-1 text-center text-3xl font-extrabold">
        <span className="text-white">Claim Your </span>
        <span className="text-red-500">FREE £500</span>
        <span className="text-white"> Prototype</span>
      </h2>
      <p className="mb-6 text-center text-white/70">
        No obligation. Yours to keep even if you do not proceed.
      </p>

      <form onSubmit={handleBook} className="space-y-4">
        <input
          type="text"
          placeholder="Name *"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="email"
          placeholder="Email *"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="url"
          placeholder="Current Website (optional)"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <textarea
          placeholder="Vision *"
          required
          rows={6}
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Attach Files (optional)
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full cursor-pointer rounded-md border border-white/10 bg-black/60 px-3 py-2 text-sm text-white file:mr-3 file:rounded-md file:border file:border-white/10 file:bg-white/5 file:px-3 file:py-2 file:text-white hover:file:bg-white/10"
          />
          <p className="mt-2 text-xs text-white/60">
            Up to 10 files • 25MB each • Accepted: .png, .jpg, .jpeg, .webp, .gif, .pdf, .doc, .docx, .ppt, .pptx, .key, .sketch, .fig, .zip
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
        >
          {loading ? "Sending & Opening Booking..." : "Send & Book Kickoff Call"}
        </button>

        {message && <p className="mt-3 text-center text-sm text-white/80">{message}</p>}
      </form>
    </section>
  );
}
