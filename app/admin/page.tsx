"use client"

import { useEffect } from "react"

import { useRouter } from "next/navigation"

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/connected")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
        <p className="text-gray-400">Redirecting to admin dashboard...</p>
      </div>
    </div>
  )
}
