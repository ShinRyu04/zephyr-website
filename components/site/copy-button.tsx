"use client"

import { useState } from "react"

import { cn } from "@/lib/cn"

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      window.setTimeout(() => setDone(false), 1600)
    } catch {
      setDone(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={done ? "Copied" : "Copy file name"}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded transition-colors",
        done ? "text-gain" : "text-fg-3 hover:text-fg",
      )}
    >
      {done ? (
        <span aria-hidden="true" className="font-mono text-[10px]">
          OK
        </span>
      ) : (
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" fill="none">
          <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 4V2.5A1.5 1.5 0 0 0 6.5 1h-4A1.5 1.5 0 0 0 1 2.5v4A1.5 1.5 0 0 0 2.5 8H4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      )}
    </button>
  )
}
