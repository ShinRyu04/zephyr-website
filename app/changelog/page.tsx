import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/visuals/reveal"
import { SITE, VERSION } from "@/lib/site"

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every Zephyr release newest first: inline XML tool calls, workspace summaries, agent status blocks, git stash and rebase, and the MCP startup fixes in 1.1.11.",
  alternates: { canonical: "/changelog" },
}

type ReleaseCategory = {
  label: string
  items: string[]
}

type Release = {
  version: string
  title: string
  summary: string
  latest?: boolean
  categories: ReleaseCategory[]
}

const RELEASES: Release[] = [
  {
    version: "1.1.11",
    title: "Tool calls that actually run, and an agent that knows where it is",
    summary:
      "The agent release. Inline XML tool calls are parsed and executed instead of being printed as text, the workspace is summarized before the first turn, every project rules file is read, and each turn reports its plan, step, and recent results. Git gains stash, rebase, take-ours, and one-click commit messages. The MCP server no longer loses a call that lands during startup.",
    latest: true,
    categories: [
      {
        label: "AI",
        items: [
          "Inline XML tool calls now run. DSML <|DSML| invoke>, <tool_calls>, and <antml:invoke> are all parsed, and the tags are stripped from both the visible reply and the stored history.",
          "The workspace is summarized before the first turn: detected stack, entry points, top-level layout, and a short file list, with node_modules, .vite, .git, dist, and target left out.",
          "Every project rules file is read. AGENTS.md, CLAUDE.md, ZEPHYR.md, and .cursorrules are all loaded instead of stopping at the first one found.",
          "Each agent turn gets a status block carrying the plan, the step number, the recent tool results, and the calls that failed.",
          "A failed tool call returns explicit guidance to try a different approach rather than letting the loop retry the same thing.",
          "file_edit replaces every occurrence and no longer treats $&, $`, or $1 as replacement patterns.",
          "The active editor file is passed to the agent as context while agent mode is on.",
          "A provider with no API key shows a banner with a button that jumps to the exact settings section it needs.",
          "The Chat or Agent choice is remembered across restarts instead of resetting to Chat.",
          "The subagent runner has a 90-second idle watchdog, so a silent worker is reclaimed instead of hanging the turn.",
        ],
      },
      {
        label: "Features",
        items: [
          "Git blame for the active file is printed to the Output panel.",
          "Git stash: save, list, pop, and drop.",
          "Merge conflicts resolve per file with take-ours and take-theirs.",
          "Rebase the current branch onto another one without leaving the editor.",
          "Write a commit message from the diff in one click.",
        ],
      },
      {
        label: "Interface",
        items: [
          "The startup splash paints immediately and closes on React mount, with a timeout fallback so it can never get stuck on screen.",
          "Feature panels (sidebar, settings, command palette, dialogs) load on demand, which shortens the time to the first usable frame.",
          "The subagent panel shows a progress bar while workers run.",
          "The browser pane starts with an empty address bar instead of a hardcoded localhost:3000.",
          "The Chat and Agent buttons have tooltips.",
        ],
      },
      {
        label: "MCP",
        items: [
          "Requests wait briefly for the front end and retry, so a call that arrives during startup is not lost with \"UI did not answer\".",
          "/health performs no UI work and needs no token, and no longer holds the MCP lock for up to eight seconds.",
          "Pending requests are cleared on every failure path, not just the happy one.",
        ],
      },
      {
        label: "Fixes",
        items: [
          "Settings files with a UTF-8 BOM are read correctly. They were previously moved aside as .broken-*, which silently reset your preferences.",
          "A settings patch is cancelled when the current file cannot be read, instead of writing over it.",
          "Settings are written atomically through a temp file and a rename.",
          "The AI model is reconciled from settings at boot and before every send. A stale custom-model placeholder was causing 401s.",
          "Non-ASCII paths no longer panic. The relative path helper was slicing a string by byte offset.",
          "An extension id such as C:evil is rejected, so it cannot resolve outside the extensions directory.",
          "A subagent that never replies now fails with a clear timeout instead of an empty result.",
        ],
      },
    ],
  },
  {
    version: "1.1.10",
    title: "Agent mode and subagents",
    summary:
      "Agent mode arrives with tool calling across the editor, the terminal, and git, plus a subagent runner that can work in parallel.",
    categories: [
      {
        label: "Highlights",
        items: [
          "Agent mode: the model calls editor, terminal, and git tools instead of describing what you should do.",
          "Parallel subagents, with a panel that lists every worker and what it is holding.",
          "Any OpenAI-compatible base URL works, so Ollama and other local servers are first class.",
          "API keys live on the Rust side. The settings UI only ever shows a masked preview.",
          "Fixed: long agent turns could trip the request timeout on large files.",
        ],
      },
    ],
  },
  {
    version: "1.1.9",
    title: "Terminal depth and a wider git surface",
    summary:
      "Multi-pane terminals over ConPTY, WSL alongside PowerShell, and the git workflow the earlier versions were missing.",
    categories: [
      {
        label: "Highlights",
        items: [
          "Up to six terminal panes per tab, each with its own working directory and process.",
          "PowerShell, cmd, pwsh, bash, and WSL in the same tab, switchable per pane.",
          "Git: status, diff, stage, commit, branch, log, push, pull, and fetch from inside the window.",
          "Inline blame in the gutter, with the author and date per line.",
          "Self-update verifies the minisign signature before it installs anything.",
        ],
      },
    ],
  },
  {
    version: "1.1.7",
    title: "The buffer becomes the source of truth",
    summary:
      "Writes go through the editor buffer instead of the file on disk, and a batch of path handling bugs stops being fatal.",
    categories: [
      {
        label: "Highlights",
        items: [
          "file_edit goes through the buffer, so unsaved changes survive an edit from a tool or an MCP call.",
          "The relative path helper no longer slices by byte offset, which panicked on non-ASCII paths.",
          "Extension ids are validated before resolution and cannot escape the extensions directory.",
          "The Output panel was rebuilt around virtualized rows and stays quick with long builds.",
        ],
      },
    ],
  },
  {
    version: "1.1.6",
    title: "First MCP server",
    summary:
      "The HTTP JSON-RPC server on port 9222 lands, with a token, a disable switch, and one-click CLI registration.",
    categories: [
      {
        label: "Highlights",
        items: [
          "HTTP JSON-RPC on port 9222, bound to loopback only.",
          "A bearer token is issued at first launch and stored with the rest of the app data.",
          "First methods: editor_read, editor_write, editor_search, and terminal_send.",
          "One-click registration for Claude Code and Codex.",
          "A disable switch in Settings for when the server should not be listening at all.",
        ],
      },
    ],
  },
]

export default function ChangelogPage() {
  return (
    <main id="main" className="relative">
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            Changelog
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold tracking-[-0.02em]">
            Every release, newest first.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            Signed builds under {SITE.licenseName}, no telemetry, and no account. Each
            entry is written from the release notes, with the fixes kept as visible as the
            features.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <Reveal>
          <nav
            aria-label="Releases"
            className="flex flex-wrap gap-2 border-y border-line py-4"
          >
            {RELEASES.map((release) => (
              <a
                key={release.version}
                href={`#v${release.version}`}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                  release.latest
                    ? "border-gust/45 bg-gust/10 text-gust-3 hover:bg-gust/20"
                    : "border-line text-fg-3 hover:border-line-2 hover:text-fg-2"
                }`}
              >
                v{release.version}
              </a>
            ))}
            <a
              href={SITE.changelog}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-3 transition-colors hover:border-line-2 hover:text-fg-2"
            >
              CHANGELOG.md
            </a>
          </nav>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div className="space-y-5">
          {RELEASES.map((release) => (
            <Reveal key={release.version}>
              <article
                id={`v${release.version}`}
                className={`scroll-mt-24 rounded-2xl p-6 transition-colors sm:p-8 ${
                  release.latest
                    ? "border border-gust/40 bg-slab/60 shadow-[0_0_0_1px_rgba(77,148,255,0.08),0_18px_60px_-30px_rgba(77,148,255,0.55)]"
                    : "border border-line bg-ink"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-mono text-lg font-semibold tracking-tight text-fg">
                    v{release.version}
                  </h2>
                  {release.latest ? (
                    <span className="rounded-full bg-gust px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">
                      Latest
                    </span>
                  ) : null}
                  {release.version === VERSION ? null : (
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
                      Previous
                    </span>
                  )}
                </div>

                <p className="mt-2 text-[15px] font-semibold tracking-tight">
                  {release.title}
                </p>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-fg-2">
                  {release.summary}
                </p>

                <div className="mt-8 space-y-7">
                  {release.categories.map((category) => (
                    <div key={category.label}>
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
                        {category.label}
                      </h3>
                      <ul className="mt-3.5 space-y-2.5">
                        {category.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[14px] leading-relaxed text-fg-2"
                          >
                            <span
                              aria-hidden="true"
                              className={`mt-2 size-1.5 shrink-0 rounded-full ${
                                release.latest ? "bg-gust" : "bg-fg-3"
                              }`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {release.latest ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`https://github.com/ShinRyu04/Zephyr/releases/tag/v${release.version}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-gust px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gust-3"
                    >
                      Download v{release.version}
                    </a>
                    <Link
                      href="/docs"
                      className="rounded-xl border border-line-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-fg-3"
                    >
                      Read the docs
                    </Link>
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
