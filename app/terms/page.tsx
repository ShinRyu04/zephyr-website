import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/visuals/reveal"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Zephyr is Apache-2.0 open source, provided as-is with no warranty. The short version of the terms, and who the project is not affiliated with.",
  alternates: { canonical: "/terms" },
}

const CLAUSES = [
  {
    title: "The license is Apache-2.0",
    body: "The source code and the built binaries are provided under the Apache License 2.0. Keep the license file and the copyright notices with any copy or substantial portion. The full text ships in the repository.",
  },
  {
    title: "No warranty",
    body: "Zephyr is provided as is, without warranty of any kind, express or implied, including fitness for a particular purpose. Bugs, crashes, data loss, and breakage on your platform are possible. You decide whether it is fit for what you are doing.",
  },
  {
    title: "Your work is your backup",
    body: "The editor, the updater, and the MCP tools can all change the state of a buffer. Use version control. If you lose work to a bug, the project is not liable for it, and no open-source project would be.",
  },
  {
    title: "Not affiliated with anyone",
    body: "Zephyr is an independent project. It is not affiliated with, endorsed by, sponsored by, or associated with Microsoft, Anthropic, Google, or OpenAI. Support for a particular AI CLI means the protocol works, not that the vendor endorses or has reviewed this software.",
  },
  {
    title: "Third-party names and marks",
    body: "Product and company names mentioned here, including Windows, WebView2, Claude, Codex, Gemini, ChatGPT, Tauri, React, and CodeMirror, are trademarks of their respective owners. They are used descriptively to say what the software works with.",
  },
  {
    title: "Your keys and your providers",
    body: "API keys you enter are your responsibility and are held by the provider you chose. Zephyr stores them locally and obfuscated, which is not encryption. Zephyr never transmits a key to the project or anywhere else.",
  },
  {
    title: "Your data stays local",
    body: "Files you open, code you write, prompts, and settings are not uploaded by Zephyr. If you use the built-in AI features, whatever you send goes to the provider you configured, under that provider's terms rather than these.",
  },
  {
    title: "No service commitment",
    body: "There is no uptime promise, no support contract, and no compatibility guarantee across releases. A build may stop working after an update, and a feature may change or be removed in a later version.",
  },
  {
    title: "The project can change or end",
    body: "Zephyr may change direction, be paused, or be discontinued. Work you have contributed stays available under its license. If the project ends, nothing you rely on it for is guaranteed to keep working.",
  },
  {
    title: "This site is informational",
    body: "The documentation is provided on the same as-is basis as the software. If the site and the built application disagree, trust the source code, which is the only authoritative source.",
  },
  {
    title: "Changes to these terms",
    body: "These terms may be updated as the project changes. The version published in the website repository at the time you downloaded a build is the version that applies to that build.",
  },
] as const

export default function TermsPage() {
  return (
    <main id="main" className="relative">
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            Terms
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] font-extrabold tracking-[-0.02em]">
            Short terms for a small project.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            There is no service to sign up for and no data to hand over, so
            there is very little to say. This is the whole thing, written out
            plainly. The Apache-2.0 license is the actual legal document, and it
            is short and worth reading.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
            <a
              href={SITE.license}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line bg-slab px-2 py-1 font-mono text-xs text-fg-2 transition-colors hover:border-line-2"
            >
              LICENSE
            </a>
          </p>
        </Reveal>
      </section>

      <section
        id="clauses"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <ol className="max-w-3xl space-y-6">
            {CLAUSES.map((clause, index) => (
              <li key={clause.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-[3px] shrink-0 font-mono text-xs text-gust-3"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[15px] font-semibold">{clause.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-fg-2">
                    {clause.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl px-6 py-12 sm:px-10">
            <div
              aria-hidden="true"
              className="grid-field pointer-events-none absolute inset-0 opacity-25"
            />
            <div className="relative max-w-xl">
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
                Questions go in the issue tracker.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
                If a clause is unclear or you think it is wrong, open an issue
                and say so. The terms are not a legal defence to raise when the
                software is doing something you did not expect.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SITE.issues}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line-2 px-5 py-3 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Open an issue
                </a>
                <Link
                  href="/privacy"
                  className="rounded-xl border border-line-2 px-5 py-3 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Privacy
                </Link>
                <Link
                  href="/security"
                  className="rounded-xl border border-line-2 px-5 py-3 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Security
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
