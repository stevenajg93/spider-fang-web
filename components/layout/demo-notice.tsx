import { DEMO } from "@/lib/config"

export function DemoNotice() {
  if (!DEMO) return null

  return (
    <div className="bg-fang-red/10 border-fang-red/20 border-b px-4 py-2">
      <div className="mx-auto max-w-7xl">
        <p className="text-fang-red text-center text-sm">
          <span className="font-medium">Demo mode</span> - APIs not connected.
          <span className="hidden sm:inline"> All features work offline for testing.</span>
        </p>
      </div>
    </div>
  )
}
