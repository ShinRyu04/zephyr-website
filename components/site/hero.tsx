import Link from "next/link"

import { Gusts } from "@/components/visuals/gusts"
import { Typer } from "@/components/visuals/typer"
import {
  MCP_PORT,
  PLATFORM,
  PLATFORM_BADGES,
  PRIMARY_DOWNLOAD,
  RELEASE,
  SITE,
  SIZE_ON_DISK,
  STATS,
} from "@/lib/site"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Gusts className="-z-10" />

      <div
        aria-hidden="true"
        className="grid-field mask-fade-y pointer-events-none absolute inset-0 -z-10 opacity-40"
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/changelog"
            className="glass inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 py-2 font-mono text-xs text-fg-2 transition-colors hover:text-fg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gain" />
            {RELEASE} — out now
            <span aria-hidden="true" className="text-fg-3">
              &rsaquo;
            </span>
          </Link>

          <h1 className="mt-8 text-[clamp(2.35rem,6.2vw,4.15rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            <span className="text-sheen">An editor that</span>
            <br />
            <span className="sr-only">AI CLIs can drive.</span>
            <span aria-hidden="true" className="text-gust">
              <Typer
                words={[
                  "AI CLIs can drive.",
                  "stays under 10 MB.",
                  "ships no telemetry.",
                  "speaks MCP on 9222.",
                ]}
              />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-fg-2">
            A {PLATFORM.primaryRequirement} code editor on Tauri 2, Rust, and
            React. About {SIZE_ON_DISK} on disk. An MCP server on port{" "}
            {MCP_PORT} lets Claude Code, Codex, Gemini CLI, or opencode drive the
            window.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PRIMARY_DOWNLOAD.url}
              className="inline-flex items-center gap-2 rounded-xl bg-gust px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gust-3"
            >
              Download for Windows
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-line-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
              </svg>
              View on GitHub
            </a>
          </div>

          <p className="mt-4 text-xs text-fg-3">
            Site and editor are open source. Apache-2.0. No account.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-fg-3">
            {PLATFORM_BADGES.map((badge) => (
              <span key={badge.id} className="flex items-center gap-1.5">
                <span className={badge.primary ? "text-gust" : "text-fg-3"}>$</span>
                <span className={badge.primary ? "text-fg" : undefined}>{badge.label}</span>
                <span
                  className={
                    badge.primary
                      ? "rounded-full bg-gust/15 px-2 py-0.5 uppercase tracking-wider text-gust"
                      : "rounded-full border border-line px-2 py-0.5 uppercase tracking-wider text-fg-3"
                  }
                >
                  {badge.status}
                </span>
              </span>
            ))}
          </div>
        </div>

        <dl className="glass mt-14 grid grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 border-b border-r border-line p-5 last:border-r-0 even:border-r-0 sm:border-b-0 sm:even:border-r"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-base font-semibold tracking-tight">
                {stat.value}
              </dd>
              <dd className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
