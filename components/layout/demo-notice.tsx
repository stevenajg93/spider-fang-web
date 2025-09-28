import { DEMO } from "@/lib/config"

export function DemoNotice() {
  if (!DEMO) return null

  return (
    <div className="bg-fang-red/10 border-b border-fang-red/20 px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-fang-red text-center">
          <span className="font-medium">Demo mode</span> — APIs not connected.
          <span className="hidden sm:inline"> All features work offline for testing.</span>
        </p>
      </div>
    </div>
  )
}
