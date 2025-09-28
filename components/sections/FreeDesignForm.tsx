"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

type FormValues = {
  name: string
  email: string
  website?: string
  vision: string
}

const ACCEPT = [
  ".png",".jpg",".jpeg",".webp",".gif",
  ".pdf",".doc",".docx",".ppt",".pptx",".key",
  ".sketch",".fig",".zip"
].join(",")

const MAX_FILES = 10
const MAX_MB = 25

export default function FreeDesignForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState<FormValues>({
    name: "",
    email: "",
    website: "",
    vision: "",
  })
  const [files, setFiles] = React.useState<File[]>([])

  function onChange<T extends keyof FormValues>(key: T, value: FormValues[T]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  function onFilesSelected(list: FileList | null) {
    if (!list) return
    const selected = Array.from(list)
    if (selected.length + files.length > MAX_FILES) {
      toast({ title: "Too many files", description: `Attach up to ${MAX_FILES} files.` })
      return
    }
    const tooBig = selected.find((f) => f.size > MAX_MB * 1024 * 1024)
    if (tooBig) {
      toast({ title: "File too large", description: `“${tooBig.name}” exceeds ${MAX_MB}MB.` })
      return
    }
    setFiles((prev) => [...prev, ...selected])
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    toast({
      title: "Request received",
      description: "Next: book your kickoff call to start your free £500 prototype.",
    })
    setTimeout(() => {
      setLoading(false)
      router.push("/thank-you?via=free")
    }, 900)
  }

  return (
    <section id="free-design" className="relative scroll-mt-24 md:scroll-mt-28 border-t bg-background">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(800px_400px_at_70%_-10%,hsl(var(--primary)/.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(1.5rem,4.8vw,2.5rem)] font-extrabold tracking-tight">
            Claim Your Free £500 Prototype
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            No obligation. Yours to keep even if you do not proceed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8"
        >
          <Card className="border border-white/10 bg-card/70 backdrop-blur-md">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <form onSubmit={onSubmit} className="grid gap-5 sm:gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className="h-12 text-base"
                    value={values.name}
                    onChange={(e) => onChange("name", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    enterKeyHint="send"
                    placeholder="jane@company.com"
                    className="h-12 text-base"
                    value={values.email}
                    onChange={(e) => onChange("email", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="website">Current Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    autoComplete="url"
                    placeholder="https://example.com"
                    className="h-12 text-base"
                    value={values.website}
                    onChange={(e) => onChange("website", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="vision">Vision *</Label>
                  <Textarea
                    id="vision"
                    required
                    placeholder="What do you do, who is it for, and what look/feel should the site have?"
                    className="min-h-32 text-base"
                    value={values.vision}
                    onChange={(e) => onChange("vision", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="files">Attach Files (optional)</Label>
                  <Input
                    id="files"
                    type="file"
                    multiple
                    accept={ACCEPT}
                    className="h-12 text-base"
                    onChange={(e) => onFilesSelected(e.target.files)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Up to {MAX_FILES} files • {MAX_MB}MB each • Accepted: {ACCEPT.replace(/\./g, ".")}
                  </p>

                  {!!files.length && (
                    <ul className="mt-2 grid gap-1 text-sm">
                      {files.map((f) => (
                        <li
                          key={f.name}
                          className="flex items-center justify-between rounded-md border border-white/10 bg-background/40 px-3 py-2"
                        >
                          <span className="truncate">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(f.name)}
                            className="text-xs underline underline-offset-4 hover:no-underline"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" disabled={loading} className="h-12 w-full sm:w-auto">
                    {loading ? "Submitting..." : "Send & Book Kickoff Call"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground sm:text-sm">
                    After sending, you will be invited to book a Google Meet to begin.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
