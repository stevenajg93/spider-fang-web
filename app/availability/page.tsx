import AvailabilityEmbed from "@/components/AvailabilityEmbed";

export const metadata = {
  title: "Availability | Spider Fang",
  description: "View live availability in your local timezone.",
};

export default function AvailabilityPage() {
  return (
    <main className="py-12">
      <section className="mx-auto w-full max-w-6xl px-4 text-center">
        <h1 className="text-3xl font-bold">
          <span className="text-white">Live </span>
          <span className="text-red-500">Availability</span>
        </h1>
        <p className="mt-2 text-white/70">
          This calendar shows current availability (Europe/London). Times will auto-adjust to your device timezone.
        </p>
      </section>

      <section className="mt-6">
        <AvailabilityEmbed />
      </section>
    </main>
  );
}
