"use client"

import { useState } from "react"

import { cn } from "@/lib/cn"

export interface DemoPane {
  id: string
  tab: string
  title: string
  hint: string
}

const PANES: DemoPane[] = [
  { id: "explorer", tab: "Explorer", title: "zephyr", hint: "3 files, 1 folder" },
  { id: "terminal", tab: "Terminal", title: "PowerShell — 3 panes", hint: "ConPTY" },
  { id: "git", tab: "Source control", title: "main", hint: "4 changes" },
  { id: "agent", tab: "Agent", title: "opencode", hint: "context 41%" },
]

const TREE = [
  { depth: 0, name: "src", kind: "dir" },
  { depth: 1, name: "components", kind: "dir" },
  { depth: 2, name: "shell/", kind: "dir" },
  { depth: 3, name: "ZephyrLogo.tsx", kind: "file" },
  { depth: 2, name: "panes/BrowserPane.tsx", kind: "file" },
  { depth: 1, name: "lib/mcp.ts", kind: "file" },
  { depth: 1, name: "app.tsx", kind: "file" },
  { depth: 0, name: "src-tauri", kind: "dir" },
  { depth: 1, name: "src/mcp_server.rs", kind: "file" },
  { depth: 1, name: "Cargo.toml", kind: "file" },
  { depth: 0, name: "package.json", kind: "file" },
  { depth: 0, name: "README.md", kind: "file" },
]

const TERMINAL = [
  { prompt: "PS C:\\dev\\zephyr>", line: "npm run tauri build" },
  { prompt: "", line: "   Compiling zephyr v1.1.11 (C:\\dev\\zephyr)", tone: "dim" },
  { prompt: "", line: "   Finished release [optimized] target(s) in 41.2s", tone: "ok" },
  { prompt: "", line: "Bundling Zephyr_1.1.11_x64-setup.exe  (9.5 MB)", tone: "ok" },
  { prompt: "PS C:\\dev\\zephyr>", line: ".\\Zephyr_1.1.11_x64-setup.exe /S" },
  { prompt: "", line: "Zephyr installed to $env:LOCALAPPDATA\\Zephyr", tone: "ok" },
  { prompt: "PS C:\\dev\\zephyr>", line: "Invoke-RestMethod localhost:9222/health" },
  { prompt: "", line: "ok        : True", tone: "dim" },
  { prompt: "", line: "version   : 1.1.11", tone: "dim" },
  { prompt: "", line: "ui        : ready", tone: "accent" },
]

const GIT = [
  { status: "M", file: "src/lib/mcp.ts" },
  { status: "M", file: "src-tauri/src/mcp_server.rs" },
  { status: "A", file: "src/components/panes/AgentPane.tsx" },
  { status: "D", file: "src/legacy/old-api.ts" },
]

const AGENT = [
  { role: "plan", text: "Read the MCP server and add a /health route." },
  { role: "tool", text: "read_file  src-tauri/src/mcp_server.rs" },
  { role: "tool", text: "file_edit  mcp_server.rs  (+18 −2)" },
  { role: "note", text: "Buffer only — nothing written to disk yet." },
  { role: "tool", text: "cargo test --lib  → 42 passed" },
]

export function DemoWindow() {
  const [active, setActive] = useState(PANES[0].id)
  const pane = PANES.find((p) => p.id === active) ?? PANES[0]

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="truncate font-mono text-xs text-fg-3">
          {pane.title} — Zephyr
        </p>
        <span className="ml-auto hidden rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-fg-3 sm:inline-block">
          {pane.hint}
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Editor panes"
        className="flex gap-1 overflow-x-auto border-b border-line bg-ink-2 px-2 py-2"
      >
        {PANES.map((p) => {
          const selected = p.id === active
          return (
            <button
              key={p.id}
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={selected}
              aria-controls={`panel-${p.id}`}
              onClick={() => setActive(p.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-md px-3.5 py-2.5 text-xs font-medium transition-colors",
                selected
                  ? "bg-slab-2 text-fg"
                  : "text-fg-3 hover:bg-slab hover:text-fg-2",
              )}
            >
              {p.tab}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${pane.id}`}
        aria-labelledby={`tab-${pane.id}`}
        className="min-h-[22rem] bg-ink-2 p-3 sm:min-h-[24rem]"
      >
        {active === "explorer" ? <Explorer /> : null}
        {active === "terminal" ? <Terminal /> : null}
        {active === "git" ? <Git /> : null}
        {active === "agent" ? <Agent /> : null}
      </div>
    </div>
  )
}

function Explorer() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-slab">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
        Explorer
      </div>
      <ul className="p-2 font-mono text-[13px] leading-7">
        {TREE.map((node) => (
          <li
            key={`${node.depth}-${node.name}`}
            className="flex items-center gap-2 rounded px-1.5 text-fg-2"
            style={{ paddingLeft: `${node.depth * 14 + 6}px` }}
          >
            <span
              className={cn(
                "inline-block h-1.5 w-1.5 shrink-0 rounded-sm",
                node.kind === "dir" ? "bg-gust" : "bg-fg-3",
              )}
              aria-hidden="true"
            />
            <span className={node.kind === "dir" ? "text-fg" : undefined}>
              {node.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Terminal() {
  return (
    <div className="term-surface overflow-hidden rounded-lg border border-line">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2 font-mono text-[11px] text-fg-3">
        <span className="text-gust">PowerShell</span>
        <span>cmd</span>
        <span>WSL</span>
        <span>private</span>
        <span className="ml-auto">3 panes / 6</span>
      </div>
      <div className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6">
        {TERMINAL.map((row) => (
          <div
            key={row.line}
            className={cn(
              "whitespace-pre",
              row.tone === "dim" && "text-fg-3",
              row.tone === "ok" && "text-gain",
              row.tone === "accent" && "text-gust-3",
              !row.tone && "text-fg-2",
            )}
          >
            {row.prompt ? <span className="text-gust">{row.prompt} </span> : null}
            {row.line}
          </div>
        ))}
      </div>
    </div>
  )
}

function Git() {
  const tone: Record<string, string> = {
    M: "text-[#e5b357]",
    A: "text-gain",
    D: "text-[#e5726b]",
  }
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-slab">
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
          Changes
        </span>
        <span className="font-mono text-[11px] text-fg-2">main ↑2 ↓0</span>
      </div>
      <ul className="divide-y divide-line font-mono text-[13px]">
        {GIT.map((row) => (
          <li
            key={row.file}
            className="flex items-center gap-3 px-3 py-2.5 text-fg-2"
          >
            <span className={cn("w-3 shrink-0 font-bold", tone[row.status])}>
              {row.status}
            </span>
            <span className="truncate">{row.file}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-line p-3">
        <div className="rounded-md border border-line bg-slab-2 px-3 py-2 font-mono text-[12px] text-fg-3">
          <span className="text-fg-2">feat(mcp):</span> add /health route and
          retry on cold start
        </div>
      </div>
    </div>
  )
}

function Agent() {
  const tag: Record<string, string> = {
    plan: "text-gust-3",
    tool: "text-fg-2",
    note: "text-[#e5b357]",
  }
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-slab">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
          Agent
        </span>
        <span className="ml-auto font-mono text-[11px] text-fg-2">
          context 41%
        </span>
      </div>
      <ul className="space-y-3 p-4 font-mono text-[12.5px] leading-6">
        {AGENT.map((row) => (
          <li key={row.text} className="flex gap-3">
            <span className={cn("w-9 shrink-0 uppercase", tag[row.role])}>
              {row.role}
            </span>
            <span className="text-fg-2">{row.text}</span>
          </li>
        ))}
      </ul>
      <div className="mx-4 mb-4 rounded-md border border-line bg-slab-2 px-3 py-2 font-mono text-[12px] text-fg-3">
        <span className="animate-blink text-gust">▌</span> working — buffer edit,
        no disk write
      </div>
    </div>
  )
}
