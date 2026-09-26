import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/visuals/reveal"
import { MCP_PORT, SITE, VERSION } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Zephyr is a solo open-source project by Muhammad Khalid. The design thesis, the principles, the stack behind it, and where the editor stands today.",
  alternates: { canonical: "/about" },
}

const PRINCIPLES = [
  {
    title: "Small enough to read",
    body: "About 9.5 MB on disk, no bundled browser engine, no background service. If a feature needs something downloaded at runtime, it belongs in your hands, not in the binary.",
  },
  {
    title: "Local, and only local",
    body: "Files, git, terminal, and settings stay on the machine. The app has no endpoint of its own to send anything to.",
  },
  {
    title: "AI CLIs are first-class",
    body: `Claude Code, Codex, Gemini CLI, and opencode drive the same window you do, over an MCP server on port ${MCP_PORT}. The editor is something a tool can operate, not just something you look at.`,
  },
  {
    title: "No always-on extension host",
    body: "Extensions are static files you drop into a folder and the window loads at startup. No resident process wakes up to run your theme.",
  },
  {
    title: "Code you can audit",
    body: "Apache-2.0, readable Rust and TypeScript, no analytics package in the dependency tree, no phone-home call anywhere in the source.",
  },
] as const

const STACK = [
  { name: "Tauri 2", role: "Window, packaging, updater, webview host" },
  { name: "Rust", role: "Core, file system, process and terminal plumbing" },
  { name: "React 18", role: "Window UI" },
  { name: "CodeMirror 6", role: "Editing surface, per-language modes" },
  { name: "xterm.js", role: "Terminal emulation on top of ConPTY" },
  { name: "Zustand", role: "State across panes" },
  { name: "axum", role: `MCP server on port ${MCP_PORT}` },
  { name: "portable-pty", role: "Windows ConPTY and Unix PTY sessions" },
] as const

export default function AboutPage() {
  return (
    <main id="main" className="relative">
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            About
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] font-extrabold tracking-[-0.02em]">
            One editor, one maintainer, a few clear decisions.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            Zephyr is a code editor for Windows 10 or 11, which is the platform it
            is built and tested on. It runs in about 9.5 MB, it does not ship a
            browser engine, and it exposes an MCP server so an AI CLI can work in
            the same window you do. This page covers who writes it, why it is
            shaped this way, and what is done and not done.
          </p>
        </Reveal>
      </section>

      <section id="who" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Who builds it
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              A solo open-source project.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Zephyr is written and maintained by {SITE.author}, a single
              developer. It is not backed by a company, funded by investors, or
              run by a team. There is no roadmap deck and no release train. What
              ships is what got built and tested.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              The repository is public, the license is {SITE.licenseName}, and
              every decision above a bug fix is visible in the issue tracker.
              Issues are answered by the same person who wrote the code, which
              sometimes means slowly. Nobody is being paid to respond faster.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="thesis" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Design thesis
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Strip out the parts nobody asked for.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Most editors grew by acquiring things. Zephyr grew by declining
              them. The starting constraint was footprint, and every later
              decision was checked against it.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal delayMs={60}>
            <div className="glass rounded-xl p-5">
              <h3 className="text-[15px] font-semibold">No bundled Chromium</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                Zephyr uses the webview the operating system already has. On
                Windows 11, WebView2 is present out of the box, so there is no
                150 MB browser engine to download, patch, or keep current.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="glass rounded-xl p-5">
              <h3 className="text-[15px] font-semibold">
                No always-on extension host
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                Extensions are static files in a folder. Nothing runs in a
                background process while the window is closed, and there is no
                marketplace pushing code updates into your install without you
                asking.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={180}>
            <div className="glass rounded-xl p-5">
              <h3 className="text-[15px] font-semibold">
                AI CLIs as first-class citizens
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                {`An MCP server on port ${MCP_PORT} exposes the editor to Claude Code, Codex, Gemini CLI, and opencode. The window is addressable by a tool, so an agent can read the buffer, move the cursor, open a file, and drive the same UI you use.`}
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={240}>
            <div className="glass rounded-xl p-5">
              <h3 className="text-[15px] font-semibold">
                Everything stays on the machine
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                No account, no telemetry, no analytics, no crash reporting. The
                app does not know your email address and has nowhere to send
                your source code.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="principles"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Principles
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Five rules the codebase is held to.
            </h2>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="glass mt-10 rounded-xl p-5 sm:p-7">
            <ul className="space-y-2.5">
              {PRINCIPLES.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gust"
                  />
                  <div>
                    <p className="text-[15px] font-semibold">{item.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-fg-2">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section
        id="stack"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Stack
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              What it is built with.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Small, well-known pieces. If you want to read the whole thing, the
              source is short enough to read.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {STACK.map((item) => (
              <div key={item.name} className="bg-ink p-5">
                <p className="font-mono text-xs text-gust-3">{item.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="state"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Current state &middot; v{VERSION}
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Where the editor stands today.
            </h2>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-[15px] font-semibold">Platforms</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                Windows 10 or 11 is the primary and officially supported platform.
                The x86_64 NSIS installer and the MSI are published for every
                release, and they are the only builds that get tested. Linux x86_64
                AppImage and <span className="font-mono text-xs text-fg-2">.deb</span>{" "}
                are published as experimental community builds, so fixes land on
                Windows first. There is no macOS build.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-[15px] font-semibold">Extensions</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                In v1 extensions are static contributions only. Files go into
                the extensions folder and the window loads them at startup. There
                is no marketplace and no runtime package manager, which is a
                deliberate limitation rather than a missing feature.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-[15px] font-semibold">MCP server</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                {`On by default, bound to loopback on port ${MCP_PORT}, and switchable off from settings. When it is off, nothing is listening. The token and the transport are described on the`}{" "}
                <Link
                  href="/security"
                  className="text-fg underline decoration-gust/60 underline-offset-4 transition-colors hover:decoration-gust"
                >
                  security page
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-[15px] font-semibold">Not planned</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                No cloud sync, no collaboration, no plugin economy, no bundled
                terminal multiplexer with its own server. Features that would
                require a hosted service to work are out of scope for a project
                that has no servers.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10">
            <div
              aria-hidden="true"
              className="grid-field pointer-events-none absolute inset-0 opacity-25"
            />
            <div className="relative mx-auto max-w-xl">
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
                Read it, run it, or tell me what is wrong with it.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
                The source is the documentation. If something here is inaccurate
                or you want to change it, the issue tracker is the right place.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/download"
                  className="rounded-xl bg-gust px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gust-3"
                >
                  Download v{VERSION}
                </Link>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line-2 px-6 py-3 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  GitHub repository
                </a>
                <a
                  href={SITE.changelog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line-2 px-6 py-3 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Changelog
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
