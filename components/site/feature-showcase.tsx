"use client"

import { useState } from "react"

import { cn } from "@/lib/cn"

interface Feature {
  id: string
  index: string
  eyebrow: string
  headline: string
  body: string
  points: string[]
  accent: string
}

const FEATURES: Feature[] = [
  {
    id: "editor",
    index: "01",
    eyebrow: "Editor",
    headline: "An editor, not a text box.",
    body: "CodeMirror 6 with per-language LSP, so completion, hover, go-to-definition, rename, and format work the moment a language server is running. Files past 4 MB open read-only instead of freezing the window.",
    points: [
      "Encoding detection for UTF-8, BOM, Windows-1252, UTF-16 LE and BE",
      "Multi-file tabs, session restore, and split groups",
      "Regex find and replace with a step cap, multiple cursors, code actions",
      "Rendered Markdown plus image, PDF, and SVG preview",
    ],
    accent: "#4d94ff",
  },
  {
    id: "terminal",
    index: "02",
    eyebrow: "Terminal",
    headline: "Panes that hold a shell, a browser, or an agent.",
    body: "Up to six panes per tab over ConPTY. Run PowerShell, cmd, pwsh, bash, or WSL, open a private terminal that wipes its scrollback on close, or open a browser pane that reads the real page instead of an iframe.",
    points: [
      "Shell, private, agent, and browser panes in one grid",
      "Private terminal clears history when it closes",
      "A dedicated pane for opencode, Claude Code, Codex, Gemini, or Copilot",
      "Split with browser for a live preview beside the shell",
    ],
    accent: "#46c98d",
  },
  {
    id: "git",
    index: "03",
    eyebrow: "Source control",
    headline: "Git without leaving the tab.",
    body: "Stage, commit, branch, push, pull, and read history. Blame the active file, stash work, resolve conflicts, and rebase, all from the source control panel.",
    points: [
      "Status, diff, stage, unstage, commit, discard, branch, and log",
      "Inline blame for the active file, written to the Output panel",
      "Stash save, list, pop, and drop",
      "Conflict resolver with take ours or take theirs",
      "Write a commit message from the diff with one click",
    ],
    accent: "#e5b357",
  },
  {
    id: "mcp",
    index: "04",
    eyebrow: "MCP server",
    headline: "Let your CLI drive the window.",
    body: "An HTTP JSON-RPC server on port 9222 with a Bearer token, loopback only, and a switch to turn it off. More than twenty methods read panes, write the terminal, and edit buffers.",
    points: [
      "Register Zephyr with Claude Code, Codex, Gemini CLI, or opencode in one click",
      "editor_write changes the buffer only, never the file on disk",
      "Requests wait for the UI and retry, so a startup call is not lost",
      "/health needs no token and does no UI work",
    ],
    accent: "#a78bfa",
  },
  {
    id: "ai",
    index: "05",
    eyebrow: "AI workflow",
    headline: "Agents that read, plan, and run tools.",
    body: "Chat streaming, or an agent that works a task to the end: it reads files, runs commands, and calls tools. The workspace is summarized up front, so the model knows the stack and the file map before it starts.",
    points: [
      "Three adapter formats: OpenAI, Anthropic, and Gemini",
      "Inline XML tool calls are parsed too, so gateway models still run tools",
      "Subagents run in parallel, each with a role, step log, and cancel",
      "BYOK or a local endpoint, including Ollama and any OpenAI-compatible server",
      "Optional local RAG that feeds top project chunks as context",
    ],
    accent: "#4d94ff",
  },
  {
    id: "themes",
    index: "06",
    eyebrow: "Customization",
    headline: "Make it yours.",
    body: "Nineteen themes, including a High Contrast theme that passes WCAG AAA. Pick a background image with its own opacity, stored separately from the theme, and remap every shortcut with conflict detection.",
    points: [
      "19 themes, each setting every token at once",
      "Background image with adjustable opacity",
      "Customize Layout for menu bar, activity bar, sidebar, panel, and status bar",
      "UI in 10 languages, defaulting to English",
    ],
    accent: "#46c98d",
  },
]

export function FeatureShowcase() {
  const [active, setActive] = useState(FEATURES[0].id)
  const feature = FEATURES.find((f) => f.id === active) ?? FEATURES[0]

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
      <div className="flex flex-col gap-2">
        {FEATURES.map((f) => {
          const selected = f.id === active
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={selected}
              className={cn(
                "group rounded-xl border p-4 text-left transition-all duration-300 sm:p-5",
                selected
                  ? "border-line-2 bg-slab"
                  : "border-line bg-ink-2 hover:border-line-2 hover:bg-slab/60",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[11px] transition-colors"
                  style={{ color: selected ? f.accent : undefined }}
                >
                  {f.index}
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold tracking-tight transition-colors",
                    selected ? "text-fg" : "text-fg-2 group-hover:text-fg",
                  )}
                >
                  {f.eyebrow}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto font-mono text-xs text-fg-3 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  &rsaquo;
                </span>
              </div>
              {selected ? (
                <div className="mt-4 space-y-4 border-t border-line pt-4">
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {f.headline}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-2">{f.body}</p>
                  <ul className="space-y-2">
                    {f.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-fg-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                          style={{ background: f.accent }}
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </button>
          )
        })}
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-colors duration-700"
            style={{ background: feature.accent }}
          />
          <div
            aria-hidden="true"
            className="grid-field pointer-events-none absolute inset-0 opacity-30"
          />

          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              {feature.eyebrow}
            </p>
            <p className="mt-5 font-mono text-[13px] leading-7 text-fg-2">
              {feature.points[0]}
            </p>
            <div className="my-5 h-px hairline" />
            <p className="font-mono text-[13px] leading-7 text-fg-2">
              {feature.points[1]}
            </p>
            <div className="my-5 h-px hairline" />
            <p className="font-mono text-[13px] leading-7 text-fg-2">
              {feature.points[2]}
            </p>
          </div>

          <div className="relative mt-8 flex flex-wrap items-center gap-1">
            {FEATURES.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                aria-label={`Show ${f.eyebrow}`}
                aria-pressed={f.id === active}
                className="grid h-11 w-11 place-items-center rounded-md"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-500",
                    f.id === active ? "w-6" : "w-2.5 bg-line-2",
                  )}
                  style={f.id === active ? { background: f.accent } : undefined}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
