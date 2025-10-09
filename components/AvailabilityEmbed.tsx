"use client"

export default function AvailabilityEmbed() {
  const src =
    "https://calendar.google.com/calendar/embed?src=s.gillespie%40gecslabs.com&ctz=Europe%2FLondon"
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="rounded-xl border border-white/10 bg-black/40 p-3 shadow-xl">
        <div className="h-[80vh] w-full overflow-hidden rounded-lg">
          <iframe
            src={src}
            className="h-full w-full"
            frameBorder="0"
            scrolling="no"
            title="Spider Fang – Calendar"
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          Open in Google Calendar
        </a>
      </div>
    </div>
  )
}
