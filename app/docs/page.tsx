import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/visuals/reveal"
import { MCP_PORT, SITE, VERSION } from "@/lib/site"

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Zephyr documentation: quickstart, the MCP server on port 9222, AI chat and agent modes, terminal and git, building from source, and where settings live.",
  alternates: { canonical: "/docs" },
}

const SECTIONS = [
  { id: "quickstart", label: "Quickstart" },
  { id: "mcp", label: "MCP" },
  { id: "ai", label: "AI" },
  { id: "terminal", label: "Terminal" },
  { id: "git", label: "Git" },
  { id: "build", label: "Build" },
  { id: "config", label: "Config" },
  { id: "support", label: "Support" },
] as const

function DocSection({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string
  index: string
  title: string
  lead: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14">
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            {index}
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
            {title}
          </h2>
        </div>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">{lead}</p>
        <div className="mt-8">{children}</div>
      </Reveal>
    </section>
  )
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-line bg-ink-2 p-4 font-mono text-xs leading-6 text-fg-2">
      {children}
    </pre>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-fg-2">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gust" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Code({ children }: { children: string }) {
  return (
    <code className="rounded-md border border-line bg-slab px-2 py-1 font-mono text-xs text-fg-2">
      {children}
    </code>
  )
}

const QUICKSTART_STEPS = [
  {
    title: "Install on Windows 10 or 11",
    body: "Windows 10 or 11 is the primary supported platform. Take the x86_64 NSIS installer, or the MSI for managed deployments. WebView2 already ships with Windows 11, so on a fresh machine the installer is usually the only step. A Linux AppImage and .deb are also published, but those are experimental community builds, not the tested target.",
  },
  {
    title: "Open a folder",
    body: "File, then Open Folder, loads a workspace. Quick Open searches every file in it from the keyboard, and the project tree on the left fills in as soon as the folder is indexed.",
  },
  {
    title: "Register your CLI",
    body: "Settings has a one-click registration for Claude Code, Codex, Gemini CLI, and opencode. It writes the config for you and tells you which file it touched.",
  },
] as const

const MCP_METHODS = [
  "editor_read, editor_write, editor_insert, editor_replace",
  "editor_search, editor_open, editor_active_file",
  "terminal_create, terminal_send, terminal_read, terminal_close",
  "git_status, git_diff, git_stage, git_commit, git_branch",
  "git_log, git_blame, git_stash, git_conflicts",
  "window_focus, panel_open, command_run, settings_read",
] as const

export default function DocsPage() {
  return (
    <main id="main" className="relative">
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            Docs &middot; v{VERSION}
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold tracking-[-0.02em]">
            How Zephyr works, end to end.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            Eight sections. The MCP server is the part most people care about, so it
            comes second. Everything here runs on your machine, and the source is the
            same code these pages describe.
          </p>
        </Reveal>
      </section>

      <div className="sticky top-16 z-40 border-y border-line bg-ink/85 backdrop-blur-xl">
        <nav
          aria-label="Documentation sections"
          className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 py-3 sm:px-8"
        >
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-[13px] text-fg-2 transition-colors hover:border-line-2 hover:text-fg"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <DocSection
          id="quickstart"
          index="01"
          title="Quickstart"
          lead="Windows 10 or 11 is the primary supported platform, so this quickstart assumes it. Install, open a folder, and know where your settings live. The Linux AppImage and .deb builds follow the same steps, but they are experimental community builds rather than the tested target."
        >
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              {QUICKSTART_STEPS.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line font-mono text-sm text-gust">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-fg-2">{step.body}</p>
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/download"
                  className="rounded-xl bg-gust px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gust-3"
                >
                  Get the installer
                </Link>
                <a
                  href={SITE.releases}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  All releases
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
                  Where settings live
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  Settings, keys, extensions, and logs are plain files in one folder.
                  No database, no migration step. On Windows that folder is
                  <Code> %APPDATA%\zephyr\</Code>.
                </p>
                <div className="mt-4">
                  <Pre>{"%APPDATA%\\zephyr\\"}</Pre>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                  Delete that folder and Zephyr starts clean on the next launch.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
                  Register from the shell
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  Settings has a one-click registration for each supported CLI. This is
                  the equivalent command if you would rather run it yourself.
                </p>
                <div className="mt-4">
                  <Pre>{`claude mcp add zephyr --transport http http://127.0.0.1:${MCP_PORT}/mcp`}</Pre>
                </div>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="mcp"
          index="02"
          title={`The MCP server on port ${MCP_PORT}`}
          lead="Any AI CLI that speaks MCP can read your buffers, open files, and drive the window. The server is HTTP JSON-RPC on loopback, guarded by a bearer token, and you can switch it off."
        >
          <div className="space-y-8">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "Transport", v: "HTTP JSON-RPC" },
                { k: "Bind", v: "127.0.0.1 only" },
                { k: "Auth", v: "Bearer token" },
                { k: "Methods", v: "More than 20" },
              ].map((item) => (
                <div key={item.k} className="bg-ink p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
                    {item.k}
                  </p>
                  <p className="mt-2 text-sm font-semibold tracking-tight">{item.v}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="text-sm font-semibold tracking-tight">A request and a reply</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  editor_write takes a path and text. It writes to the buffer, not
                  straight to disk, so unsaved changes and formatting stay intact. That
                  is the one behavior worth knowing: nothing the CLI does bypasses what
                  you see in the editor.
                </p>
                <div className="mt-4 space-y-3">
                  <Pre>{`POST http://127.0.0.1:${MCP_PORT}/mcp
Authorization: Bearer $ZEPHYR_TOKEN

{"jsonrpc":"2.0","id":7,"method":"editor_write",
 "params":{"path":"src/main.rs","text":"fn main() {}\\n"}}`}</Pre>
                  <Pre>{`{"jsonrpc":"2.0","id":7,
 "result":{"ok":true,"bytes":13,"buffer":true}}`}</Pre>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="text-sm font-semibold tracking-tight">Health, and turning it off</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  /health is the one route that needs no token and does no UI work, so a
                  CLI can check whether the editor is up before it tries anything else.
                </p>
                <div className="mt-4 space-y-3">
                  <Pre>{`GET http://127.0.0.1:${MCP_PORT}/health

{"status":"ok","version":"${VERSION}","pid":18422}`}</Pre>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                  A single switch in Settings stops the listener. The token is written
                  next to the settings, and a startup call that arrives before the window
                  is ready waits briefly and retries rather than failing outright.
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="text-sm font-semibold tracking-tight">The methods</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  Grouped by what they touch. The full list is longer than this; the
                  editor, terminal, and git groups cover most sessions.
                </p>
                <div className="mt-4">
                  <Pre>{MCP_METHODS.join("\n")}</Pre>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="text-sm font-semibold tracking-tight">One-click registration</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  Settings has a registration row for each supported CLI. It writes the
                  config, keeps the token in sync, and tells you the exact file it
                  changed.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {["Claude Code", "Codex", "Gemini CLI", "opencode"].map((cli) => (
                    <li
                      key={cli}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-2"
                    >
                      {cli}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Pre>{`{
  "mcpServers": {
    "zephyr": {
      "type": "http",
      "url": "http://127.0.0.1:${MCP_PORT}/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}`}</Pre>
                </div>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="ai"
          index="03"
          title="Chat, agent, and the local option"
          lead="Two modes, three adapter formats, and no key ever crossing into the UI. The provider you pick in Settings is the provider the agent uses."
        >
          <div className="space-y-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold tracking-tight">Streaming chat</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  Tokens arrive as they are produced, in the panel beside the editor. The
                  conversation is plain text in your app data, so you can read it, edit
                  it, or delete it without a tool.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold tracking-tight">Agent</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  The same panel, but the model can call editor, terminal, and git tools.
                  Each turn shows a status block with the plan, the step number, the
                  recent tool results, and anything that failed. A failed call comes back
                  with guidance instead of a silent retry.
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="text-sm font-semibold tracking-tight">Three adapter formats</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  Pick OpenAI, Anthropic, or Gemini and the request shape, the tool-call
                  encoding, and the streaming parser all follow that provider. Inline XML
                  tool calls from a local model work too: DSML, tool_calls, and antml
                  invoke are all parsed, and the tags never reach the visible reply.
                </p>
                <div className="mt-4">
                  <Bullets
                    items={[
                      "Bring your own key, or point at a local endpoint and keep everything on the machine.",
                      "Keys are held on the Rust side. Settings only ever renders a masked preview.",
                      "The model is reconciled from settings at boot and before every send, so a stale <Code>custom-model</Code> placeholder never reaches the provider.",
                    ]}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="text-sm font-semibold tracking-tight">Local endpoints</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                  Anything that speaks the OpenAI format works. Ollama is the common
                  case: set the base URL and the model name, leave the key blank.
                </p>
                <div className="mt-4">
                  <Pre>{`provider:  ollama
base_url: http://127.0.0.1:11434/v1
model:     qwen2.5-coder:14b
api_key:   (leave blank)`}</Pre>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                  Parallel subagents run against whichever provider is configured, and an
                  optional local RAG index can be built over the workspace without
                  anything leaving the disk.
                </p>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="terminal"
          index="04"
          title="Terminal"
          lead="Real PTYs over ConPTY, not a shell wrapper. Up to six panes per tab, each with its own working directory and its own process."
        >
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-sm font-semibold tracking-tight">What you get</h3>
              <div className="mt-4">
                <Bullets
                  items={[
                    "Up to six panes per tab, each with its own cwd and process.",
                    "PowerShell, cmd, pwsh, bash, and WSL in the same tab, chosen per pane.",
                    "A private terminal that wipes its scrollback when the pane closes.",
                    "A dedicated agent pane, so agent output never lands in your own shell history.",
                    "Split With Browser reads the real page over the network instead of embedding an iframe, so nothing is silently blocked.",
                  ]}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-sm font-semibold tracking-tight">Driving it from a CLI</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                The MCP terminal methods write to a pane and read it back, which is how
                an agent runs a build, reads the output, and reacts to it. A pane is
                addressed by id, so a long-running process is not tied to a tab you
                might close.
              </p>
              <div className="mt-4 space-y-3">
                <Pre>{`{"method":"terminal_create","params":{"shell":"pwsh","cwd":"src-tauri"}}
{"result":{"pane":1}}

{"method":"terminal_send","params":{"pane":1,"text":"cargo test --lib\\n"}}
{"result":{"ok":true}}`}</Pre>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                Output lands in the pane, and the agent reads the same text you see.
              </p>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="git"
          index="05"
          title="Git"
          lead="The workflow that lives inside the window: status, diff, stage, commit, branch, log, then the remote side with one deliberate prompt before you overwrite local work."
        >
          <div className="space-y-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold tracking-tight">Local</h3>
                <div className="mt-4">
                  <Bullets
                    items={[
                      "Status, diff, stage, commit, branch, and log, all in the sidebar.",
                      "Inline blame in the gutter, with author and date per line.",
                      "Stash: save, list, pop, and drop.",
                      "Rebase onto a branch without leaving the editor.",
                      "Write a commit message from the diff in one click, then edit it before it lands.",
                    ]}
                  />
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold tracking-tight">Remote and conflicts</h3>
                <div className="mt-4">
                  <Bullets
                    items={[
                      "Push, pull, fetch, and sync from the same panel.",
                      "Sync pulls first and asks before it discards anything, so local commits are never dropped quietly.",
                      "Merge conflicts resolve per file with take-ours and take-theirs.",
                      "Binary diffs are labelled with the size instead of rendered as broken text.",
                      "GitHub sign-in uses the OAuth device flow, or a personal access token if you would rather not.",
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-sm font-semibold tracking-tight">Cloning and remotes</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                Open Folder on a repository you already have works with no setup. To
                start from a remote, clone it first, then open the result.
              </p>
              <div className="mt-4">
                <Pre>{`git clone https://github.com/you/project
cd project`}</Pre>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                Then File, Open Folder on the clone. Nothing else is needed before you
                commit.
              </p>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="build"
          index="06"
          title="Building from source"
          lead="Tauri 2, Rust, and React, on the Windows 10 or 11 toolchain that the primary builds target. Three prerequisites, then the same three commands a contributor runs. Linux builds work on a best-effort basis."
        >
          <div className="space-y-8">
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-sm font-semibold tracking-tight">Prerequisites</h3>
              <div className="mt-4">
                <Bullets
                  items={[
                    "Rust stable, with the default toolchain.",
                    "Node 20 or newer, for the front end toolchain.",
                    "The WebView2 Runtime on Windows 10. It is already present on Windows 11, and it is required to build or run the Windows target.",
                  ]}
                />
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="text-sm font-semibold tracking-tight">Run it</h3>
                <div className="mt-4 space-y-3">
                  <Pre>{`git clone https://github.com/ShinRyu04/Zephyr
cd Zephyr
npm install
npm run tauri dev`}</Pre>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                  Dev mode hot-reloads the front end and restarts the Rust side when it
                  changes.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="text-sm font-semibold tracking-tight">Build a release</h3>
                <div className="mt-4 space-y-3">
                  <Pre>{"npm run tauri build"}</Pre>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                  Installers land in the Tauri bundle output directory, one per target
                  you enabled. The Windows target is the one that gets built and tested;
                  Linux bundles are best-effort.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-sm font-semibold tracking-tight">Before you push</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                Three checks, in the order that fails fastest.
              </p>
              <div className="mt-4 space-y-3">
                <Pre>{`npx tsc --noEmit
cd src-tauri && cargo test --lib
npm run verify`}</Pre>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="config"
          index="07"
          title="Settings, themes, and keys"
          lead="One folder of plain files. Delete it for a full reset, or edit it by hand while the app is closed. The path below is the Windows one."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-sm font-semibold tracking-tight">The app data folder</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-2">
                On Windows 10 or 11:
              </p>
              <div className="mt-4">
                <Pre>{"%APPDATA%\\zephyr\\"}</Pre>
              </div>
              <div className="mt-4">
                <Bullets
                  items={[
                    "Settings, provider keys, installed extensions, and logs all live here.",
                    "Writes are atomic: a temp file, then a rename, so a crash cannot leave a half-written settings file.",
                    "Files with a UTF-8 BOM are read correctly, and a patch is cancelled rather than applied if the current file cannot be read.",
                    "Delete the folder to reset everything. Nothing else is stored on the machine.",
                  ]}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-sm font-semibold tracking-tight">Appearance and input</h3>
              <div className="mt-4">
                <Bullets
                  items={[
                    "Nineteen themes, with a background image and an opacity slider if you want one.",
                    "Customize Layout, so you can show, hide, and resize each pane and keep that arrangement.",
                    "Remappable shortcuts with conflict detection: a binding that clashes is flagged before it is saved.",
                    "Ten languages, English by default, switchable without a restart.",
                  ]}
                />
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                Provider keys are masked in the UI and held in Rust. Copying one out is
                the only way to read it, which is the point.
              </p>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="support"
          index="08"
          title="Support"
          lead="The project is small and the tracker is public. A bug report with a log excerpt and a version number is genuinely useful."
        >
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              {
                title: "Report an issue",
                body: "Bugs, crashes, and regressions all belong on the tracker.",
                href: SITE.issues,
                cta: "Open issues",
                external: true,
              },
              {
                title: "Read the changelog",
                body: "What changed in each release, including the fixes.",
                href: "/changelog",
                cta: "Changelog",
                external: false,
              },
              {
                title: "Security policy",
                body: "How to report a vulnerability, and what to expect next.",
                href: SITE.security,
                cta: "SECURITY.md",
                external: true,
              },
            ].map((card) =>
              card.external ? (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-ink p-6 transition-colors hover:bg-slab"
                >
                  <h3 className="text-sm font-semibold tracking-tight">{card.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-fg-3 transition-colors group-hover:text-fg-2">
                    {card.body}
                  </p>
                  <p className="mt-4 font-mono text-xs text-gust">{card.cta}</p>
                </a>
              ) : (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group bg-ink p-6 transition-colors hover:bg-slab"
                >
                  <h3 className="text-sm font-semibold tracking-tight">{card.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-fg-3 transition-colors group-hover:text-fg-2">
                    {card.body}
                  </p>
                  <p className="mt-4 font-mono text-xs text-gust">{card.cta}</p>
                </Link>
              ),
            )}
          </div>
        </DocSection>
      </div>
    </main>
  )
}
