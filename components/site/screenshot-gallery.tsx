"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/cn"
import { BASE_PATH } from "@/lib/site"

interface Shot {
  src: string
  name: string
  group: string
  caption: string
  alt: string
  width: number
  height: number
}

const SHOTS: Shot[] = [
  {
    src: "/shots/editor.png",
    name: "Editor & Terminal",
    group: "Editor",
    caption: "Editor, file tree, and a multi-pane terminal",
    alt: "Zephyr editor showing the file tree beside an open file and a split multi-pane terminal below.",
    width: 2880,
    height: 1620,
  },
  {
    src: "/shots/command-palette.png",
    name: "Command Palette",
    group: "Editor",
    caption: "Command palette filtering the command list",
    alt: "Zephyr command palette open over the editor, filtering the command list as the user types.",
    width: 2880,
    height: 1620,
  },
  {
    src: "/shots/source-control.png",
    name: "Source Control",
    group: "Git",
    caption: "Source control with unstaged changes and an inline diff",
    alt: "Zephyr source control panel listing unstaged changes next to an inline diff of the selected file.",
    width: 2880,
    height: 1620,
  },
  {
    src: "/shots/ai-panel.png",
    name: "AI Panel",
    group: "AI",
    caption: "AI panel with a context meter, token count, and estimated cost",
    alt: "Zephyr AI panel showing a context meter, a running token count, and the estimated cost of the session.",
    width: 2880,
    height: 1620,
  },
  {
    src: "/shots/ai-panel-right.png",
    name: "AI Panel, Docked Right",
    group: "AI",
    caption: "AI panel docked to the right",
    alt: "Zephyr with the AI panel docked to the right edge of the window beside the editor.",
    width: 1920,
    height: 1200,
  },
  {
    src: "/shots/subagents.png",
    name: "Subagents",
    group: "Agents",
    caption: "Parallel subagents with roles, live steps, and cancel",
    alt: "Zephyr subagent view running several agents in parallel, each with a role label, live steps, and a cancel control.",
    width: 2880,
    height: 1620,
  },
  {
    src: "/shots/themes.png",
    name: "Themes",
    group: "Themes",
    caption: "Theme picker",
    alt: "Zephyr theme picker listing the available editor themes with a live preview.",
    width: 1920,
    height: 1200,
  },
  {
    src: "/shots/mcp.png",
    name: "MCP Server",
    group: "MCP",
    caption: "MCP server capture",
    alt: "Zephyr MCP server panel showing the local endpoint on port 9222 and its connection state.",
    width: 1920,
    height: 1200,
  },
  {
    src: "/shots/zen-mode.png",
    name: "Zen Mode",
    group: "Layout",
    caption: "Zen mode, editor only",
    alt: "Zephyr in Zen mode, showing only the editor with every other panel hidden.",
    width: 2880,
    height: 1620,
  },
  {
    src: "/shots/customize-layout.png",
    name: "Customize Layout",
    group: "Layout",
    caption: "Customize Layout panel",
    alt: "Zephyr Customize Layout panel with controls for arranging and docking the editor panes.",
    width: 2880,
    height: 1620,
  },
]

const FILTERS = [
  "All",
  "Editor",
  "Terminal",
  "Git",
  "AI",
  "Agents",
  "Themes",
  "MCP",
  "Layout",
] as const

const CHIP_CLASS =
              "inline-flex min-h-11 shrink-0 items-center rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]"

function matches(shot: Shot, filter: string) {
  if (filter === "All") return true
  if (filter === "Terminal") return shot.group === "Editor"
  return shot.group === filter
}

export function ScreenshotGallery() {
  const [filter, setFilter] = useState<string>("All")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = SHOTS.filter((shot) => matches(shot, filter))
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current
        return (current + delta + visible.length) % visible.length
      })
    },
    [visible.length],
  )

  return (
    <div>
      <div
        role="group"
        aria-label="Filter screenshots by surface"
        className="mask-fade-x flex gap-2 overflow-x-auto pb-1"
      >
        {FILTERS.map((item) => {
          const active = item === filter
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={cn(
                CHIP_CLASS,
                active
                  ? "border-gust bg-gust/15 text-gust-3"
                  : "border-line text-fg-3 hover:border-line-2 hover:text-fg-2",
              )}
            >
              {item}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-fg-3">
          No screenshots in this surface yet.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((shot) => (
            <li key={shot.src}>
              <button
                type="button"
                onClick={() => setOpenIndex(SHOTS.indexOf(shot))}
                className="group block w-full cursor-pointer text-left"
              >
                <figure>
                  <span className="block overflow-hidden rounded-xl border border-line transition-colors hover:border-line-2">
                    <Image
                      src={`${BASE_PATH}${shot.src}`}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      quality={82}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="block h-auto w-full"
                    />
                  </span>
                  <figcaption className="mt-3">
                    <span className="block text-sm font-medium text-fg">
                      {shot.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-fg-3">
                      {shot.caption}
                    </span>
                  </figcaption>
                </figure>
              </button>
            </li>
          ))}
        </ul>
      )}

      {isOpen ? (
        <Lightbox
          shot={visible[openIndex]}
          index={openIndex}
          total={visible.length}
          onClose={close}
          onStep={step}
        />
      ) : null}
    </div>
  )
}

function Lightbox({
  shot,
  index,
  total,
  onClose,
  onStep,
}: {
  shot: Shot
  index: number
  total: number
  onClose: () => void
  onStep: (delta: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    nextRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        onStep(1)
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        onStep(-1)
      } else if (event.key === "Tab") {
        event.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose, onStep])

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-2/92 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={shot.caption}
        onClick={(event) => event.stopPropagation()}
        className="glass flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fg">{shot.name}</p>
            <p className="truncate font-mono text-xs text-fg-3">{shot.caption}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close screenshot viewer"
            className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2 transition-colors hover:border-line-2 hover:text-fg"
          >
            Close
          </button>
        </div>

        <div className="bg-ink-2">
          <Image
            src={`${BASE_PATH}${shot.src}`}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            quality={90}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full"
          />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous screenshot"
            className="inline-flex min-h-11 items-center rounded-md border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2 transition-colors hover:border-line-2 hover:text-fg"
          >
            Prev
          </button>
          <span className="font-mono text-xs text-fg-3">
            {index + 1} / {total}
          </span>
          <button
            ref={nextRef}
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next screenshot"
            className="inline-flex min-h-11 items-center rounded-md border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2 transition-colors hover:border-line-2 hover:text-fg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
