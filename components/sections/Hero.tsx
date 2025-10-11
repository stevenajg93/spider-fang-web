"use client";
import Link from "next/link";

const BOOK_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/availability";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28 lg:py-32 relative">
        <h1 className="max-w-3xl font-bebas text-5xl leading-tight tracking-wide text-white sm:text-6xl lg:text-7xl">
          Bring your vision <span className="text-red-500">to life</span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
          We design and build modern websites and apps for ambitious teams of any size. Clear pricing,
          quick turnaround, and straightforward next steps.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={BOOK_URL}
            target={BOOK_URL.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            Book a Call
          </a>

          <Link
            href="/instant-demo"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Start Free Design
          </Link>
        </div>
      </div>
    </section>
  );
}
