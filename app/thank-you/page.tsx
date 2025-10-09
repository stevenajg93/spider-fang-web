import { redirect } from "next/navigation";

export default function ThankYouPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const pkg = searchParams?.pkg || "";
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-extrabold text-white">Thanks — payment received!</h1>
      <p className="mt-3 text-white/70">
        We’ll email you shortly to kick things off{pkg ? ` for the ${pkg.replace("-", " ")} package` : ""}.
      </p>
      <a href="/" className="mt-8 inline-flex rounded-md bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-500">
        Back to home
      </a>
    </main>
  );
}
