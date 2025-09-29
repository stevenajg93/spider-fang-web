"use client";

import React from "react";

export default function FreeDesignForm() {
  return (
    <section id="free-prototype" className="py-16">
      <div className="mx-auto w-full max-w-[560px] px-4">
        <header className="mb-4">
          <h2 className="text-2xl font-extrabold leading-tight">Claim Your Free £500 Prototype</h2>
          <p className="mt-1 text-sm opacity-70">No obligation. Yours to keep even if you do not proceed.</p>
        </header>

        <form className="mt-6 flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Name *</span>
            <input
              type="text"
              required
              className="w-full min-w-0 rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none"
              placeholder="Jane Smith"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Email *</span>
            <input
              type="email"
              required
              className="w-full min-w-0 rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none"
              placeholder="jane@company.com"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Current Website (optional)</span>
            <input
              type="url"
              className="w-full min-w-0 rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none"
              placeholder="https://example.com"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Vision *</span>
            <textarea
              required
              className="w-full min-w-0 rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none min-h-[120px] resize-vertical"
              placeholder="What do you do, who is it for, and what look/feel should the site have?"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Attach Files (optional)</span>
            <input
              type="file"
              multiple
              className="w-full min-w-0 rounded-lg border border-white/10 bg-black/30 px-3 py-2 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-white"
            />
            <small className="text-xs opacity-70">
              Up to 10 files • 25MB each • Accepted: .png, .jpg, .jpeg, .webp, .gif, .pdf, .doc, .docx, .ppt, .pptx, .key, .sketch, .fig, .zip
            </small>
          </label>

          <button
            type="submit"
            className="mt-2 h-12 w-full rounded-lg bg-red-600 font-semibold text-white"
          >
            Send & Book Kickoff Call
          </button>

          <small className="mx-auto mt-1 block text-center text-xs opacity-70">
            After sending, you will be invited to book a Google Meet to begin.
          </small>
        </form>
      </div>
    </section>
  );
}
