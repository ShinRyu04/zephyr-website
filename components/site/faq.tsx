"use client"

import { useId, useState } from "react"

import { cn } from "@/lib/cn"

const FAQS = [
  {
    q: "Is this a VS Code fork, or an Electron app?",
    a: "Neither. It is built from scratch on Tauri 2, React, and Rust. The renderer uses WebView2, which already ships with Windows, so no Chromium is bundled. That bundled Chromium is exactly where Electron's size and memory come from.",
  },
  {
    q: "Why is the footprint so small?",
    a: "There is no always-on extension host and no bundled browser. A language server starts when you open a file of that type and shuts down after it goes idle, so you pay only for the languages you are actually editing.",
  },
  {
    q: "Can I install VS Code extensions?",
    a: "Through Open VSX or a manual .vsix. Version 1 supports static contributions: languages, themes, snippets, keymaps, and command palette entries. Extension JavaScript is never executed, so extensions that need the full extension host do not work yet.",
  },
  {
    q: "How do AI agent CLIs control Zephyr?",
    a: "Over the MCP server on port 9222: HTTP JSON-RPC with a Bearer token, loopback only. Claude Code, Codex CLI, Gemini CLI, or opencode can open files, read terminal panes, and change editor buffers. editor_write only touches the buffer, so you save manually and a wrong edit never changes the file on disk.",
  },
  {
    q: "Where is my data stored?",
    a: "Under %APPDATA%\\zephyr\\: settings, history, extensions, and logs. API keys are obfuscated with XOR and a BLAKE3 key, which is not real encryption. There is no telemetry, no analytics, and no crash reporting. Delete that folder for a full reset.",
  },
  {
    q: "SmartScreen warns me. Is it safe?",
    a: "The installer is not signed with a paid code-signing certificate, so Windows shows a warning. The source is open and can be read in the GitHub repo. If you would rather build it yourself: install Node and Rust, then run npm install and npm run tauri build.",
  },
  {
    q: "Does it update itself?",
    a: "Yes, from 1.1.1 onward. Open Settings, then About, then Check for updates. The app verifies the release signature before it installs. Version 1.1.0 has no update endpoint and needs a manual install.",
  },
  {
    q: "Which platforms are supported?",
    a: "Windows 10 and 11 are the primary supported target. WebView2 already ships with Windows 11, so the installer usually just runs. Linux AppImage and .deb are published as experimental community builds, not the tested target. There is no macOS build.",
  },
] as const

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQS.map((item, i) => {
        const expanded = open === i
        const btnId = `${baseId}-q-${i}`
        const panelId = `${baseId}-a-${i}`

        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-gust"
              >
                <span className="text-[15px] font-semibold tracking-tight sm:text-base">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 font-mono text-fg-3 transition-transform duration-300",
                    expanded && "rotate-45 text-gust",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 pr-8 text-sm leading-relaxed text-fg-2">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
