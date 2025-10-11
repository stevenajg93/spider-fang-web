"use client";

const BOOK_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/availability";

export default function FinalCTA() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to move fast?</h2>
        <p className="mt-2 text-white/70">Pick what suits you best.</p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOK_URL}
            target={BOOK_URL.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            Book a Call
          </a>

          <a
            href="/instant-demo"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Start Free Design
          </a>
        </div>
      </div>
    </section>
  );
}
