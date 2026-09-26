"use client"

import { useEffect, useRef, useState } from "react"

type Tone = "h1" | "h2" | "h3" | "p" | "span"

interface TyperProps {
  words: string[]
  as?: Tone
  className?: string
  typeMs?: number
  deleteMs?: number
  holdMs?: number
  startDelayMs?: number
  loop?: boolean
  showCursor?: boolean
}

export function Typer({
  words,
  as = "span",
  className,
  typeMs = 62,
  deleteMs = 30,
  holdMs = 1500,
  startDelayMs = 260,
  loop = true,
  showCursor = true,
}: TyperProps) {
  const Tag = as
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<"idle" | "type" | "hold" | "erase">("idle")
  const startedRef = useRef(false)
  const hostRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (startedRef.current) return
    const host = hostRef.current
    if (!host) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const timer = window.setTimeout(() => setPhase("type"), startDelayMs)
            io.disconnect()
            return () => window.clearTimeout(timer)
          }
        }
      },
      { threshold: 0.35 },
    )
    io.observe(host)
    return () => io.disconnect()
  }, [startDelayMs])

  useEffect(() => {
    if (phase === "idle") return

    const word = words[wordIndex] ?? ""
    const chars = Array.from(word)

    if (phase === "type") {
      if (charIndex < chars.length) {
        const t = window.setTimeout(() => {
          setText(chars.slice(0, charIndex + 1).join(""))
          setCharIndex((c) => c + 1)
        }, typeMs)
        return () => window.clearTimeout(t)
      }
      if (words.length > 1 || loop) {
        const t = window.setTimeout(() => setPhase("hold"), holdMs)
        return () => window.clearTimeout(t)
      }
      return
    }

    if (phase === "hold") {
      const t = window.setTimeout(() => setPhase("erase"), holdMs * 0.35)
      return () => window.clearTimeout(t)
    }

    if (phase === "erase") {
      if (charIndex > 0) {
        const t = window.setTimeout(() => {
          setText(chars.slice(0, charIndex - 1).join(""))
          setCharIndex((c) => c - 1)
        }, deleteMs)
        return () => window.clearTimeout(t)
      }
      const next = (wordIndex + 1) % Math.max(words.length, 1)
      setWordIndex(next)
      setPhase("type")
    }
  }, [phase, charIndex, wordIndex, words, typeMs, deleteMs, holdMs, loop])

  const active = words[wordIndex] ?? ""
  const done =
    !loop &&
    wordIndex === words.length - 1 &&
    charIndex >= Array.from(active).length &&
    phase !== "erase"

  const cursorVisible = showCursor && (loop || !done)

  return (
    <Tag ref={hostRef as never} className={className} aria-hidden="true">
      <span>{text}</span>
      {cursorVisible ? (
        <span
          aria-hidden="true"
          className="animate-blink ml-[0.08em] inline-block w-[0.09em] self-stretch bg-gust align-baseline"
          style={{ height: "1em", transform: "translateY(0.08em)" }}
        />
      ) : null}
    </Tag>
  )
}
