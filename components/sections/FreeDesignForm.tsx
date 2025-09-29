"use client";

import React, { useEffect, useMemo, useState } from "react";

type Slot = { startISO: string; endISO: string; label: string };
type Day = { date: string; slots: Slot[] };

export default function FreeDesignForm() {
  const [days, setDays] = useState<Day[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedStartISO, setSelectedStartISO] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/calendar/free-slots");
        const data = await res.json();
        if (data.ok) {
          setDays(data.days || []);
          // preselect first day with availability
          const firstWithSlots = (data.days || []).find((d: Day) => d.slots?.length);
          if (firstWithSlots) {
            setSelectedDate(firstWithSlots.date);
            setSelectedStartISO("");
          }
        } else {
          console.error(data.error);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const slotsForSelectedDay = useMemo(() => {
    const day = days.find((d) => d.date === selectedDate);
    return day?.slots ?? [];
  }, [days, selectedDate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      website: fd.get("website"),
      vision: fd.get("vision"),
      startISO: selectedStartISO,
    };

    try {
      const res = await fetch("/api/calendar/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Booking failed");
      setSuccess(`Booked ✅ Meet link: ${data.meetLink}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="free-prototype" className="py-16">
      <div className="mx-auto w-full max-w-[600px] px-4">
        <header className="mb-6">
          <h2 className="text-3xl font-extrabold text-red-500">Claim Your Free £500 Prototype</h2>
          <p className="mt-1 text-sm text-white/70">Pick a day, then choose a 30-minute slot (UK time).</p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input name="name" type="text" required placeholder="Name" className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none" />
          <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none" />
          <input name="website" type="url" placeholder="Website" className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none" />
          <textarea name="vision" required placeholder="Vision" className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none min-h-[120px] resize-vertical" />

          {/* Day dropdown */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-white/80">Day *</span>
            <select
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedStartISO("");
              }}
              required
              className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none"
            >
              <option value="" disabled>Select a day</option>
              {days.map((d) => {
                const label = new Date(d.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                });
                const disabled = (d.slots?.length ?? 0) === 0;
                return (
                  <option key={d.date} value={d.date} disabled={disabled}>
                    {label} {disabled ? "— no availability" : ""}
                  </option>
                );
              })}
            </select>
          </label>

          {/* Time dropdown (populated by selected day) */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-white/80">Time (UK) *</span>
            <select
              value={selectedStartISO}
              onChange={(e) => setSelectedStartISO(e.target.value)}
              required
              disabled={!selectedDate || slotsForSelectedDay.length === 0}
              className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none disabled:opacity-60"
            >
              <option value="" disabled>
                {selectedDate ? "Select a time" : "Choose a day first"}
              </option>
              {slotsForSelectedDay.map((s) => (
                <option key={s.startISO} value={s.startISO}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={loading || !selectedStartISO}
            className="mt-2 h-12 w-full rounded-lg bg-gradient-to-r from-red-600 to-red-500 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Selected Slot"}
          </button>

          {success && <p className="mt-2 text-green-400 text-sm">{success}</p>}
          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
        </form>
      </div>
    </section>
  );
}
