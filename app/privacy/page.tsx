import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/visuals/reveal"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "No telemetry, no analytics, no accounts, no cookies, no ad tracking. What Zephyr stores locally, what leaves your machine, and how to reset it.",
  alternates: { canonical: "/privacy" },
}

const NOT_COLLECTED = [
  "No telemetry, no usage counters, no unique or random identifiers.",
  "No analytics SDK, no crash reporter, no error-reporting service.",
  "No accounts. There is no sign-in, no email address, and no user record.",
  "No cookies and no local storage used for tracking in the app or on this site.",
  "No advertising, no ad tracking, no third-party ad or analytics scripts.",
  "No data sold, licensed, shared, or brokered. There is nothing collected to do it with.",
] as const

const STORED = [
  {
    label: "Settings",
    body: "Theme, layout, font size, keybindings, and editor preferences you change.",
  },
  {
    label: "Editor history",
    body: "Recently opened folders and files, kept so the window can reopen where you left off.",
  },
  {
    label: "Extension list",
    body: "The extensions found in your extensions folder, loaded at startup.",
  },
  {
    label: "Logs",
    body: "Local diagnostic output in the same folder. Never uploaded, never read by the project.",
  },
  {
    label: "Provider keys",
    body: "Only if you choose to store one, obfuscated with XOR and BLAKE3. That is reversible obfuscation, not encryption. See the security page for what that does and does not buy you.",
  },
] as const

export default function PrivacyPage() {
  return (
    <main id="main" className="relative">
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            Privacy
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] font-extrabold tracking-[-0.02em]">
            Nothing is collected. That is the whole policy.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            Zephyr has no backend, so there is nowhere for your data to go. This
            page says exactly what is written to disk, what leaves your machine
            if you choose to send it, what GitHub Pages records about visits to
            this site, and how to erase everything in one step.
          </p>
        </Reveal>
      </section>

      <section
        id="not-collected"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              The app
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              What Zephyr does not do.
            </h2>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="glass mt-10 rounded-xl p-5 sm:p-7">
            <ul className="space-y-2.5">
              {NOT_COLLECTED.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gain"
                  />
                  <span className="text-[15px] leading-relaxed text-fg-2">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section
        id="stored"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Stored locally
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Everything the app persists, in one folder.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              All of it lives under{" "}
              <span className="rounded-md border border-line bg-slab px-2 py-1 font-mono text-xs text-fg-2">
                %APPDATA%\zephyr
              </span>{" "}
              on your own machine. The project has no access to your disk, and
              the folder is not read by anything except Zephyr.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {STORED.map((item) => (
              <div key={item.label} className="bg-ink p-5">
                <p className="font-mono text-xs text-gust-3">{item.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="leaves"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              What leaves the machine
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Only what you deliberately send.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Zephyr itself has no endpoint to send anything to. Traffic leaves
              your machine only in two situations, and both start with you
              pointing the app at something.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-[15px] font-semibold">To your AI provider</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                If you use the built-in AI chat or an agent mode, the prompts and
                context you send go to the model provider you configured, under
                that provider's terms. Zephyr does not see, log, or forward a
                copy. Files the agent reads for you are included only in the
                request you asked for.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="text-[15px] font-semibold">To servers you run</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                A language server, a local MCP client, a dev server, and a git
                remote all talk to endpoints you chose. Those connections carry
                the data those services need, and they are governed by wherever
                they terminate. Uninstalling Zephyr stops them.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delayMs={140}>
          <div className="mt-4 rounded-2xl border border-line bg-ink p-6">
            <h3 className="text-[15px] font-semibold">The update check</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
              Checking for a new version fetches a small manifest and stops. No
              identifier, no machine details, and no usage data are included in
              that request. The signature is verified locally before anything is
              applied, so the check does not even need to succeed for the app to
              work.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        id="website"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              This website
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Static files, standard server logs.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              This site is static files served by GitHub Pages. Serving a page
              produces a normal access log on the GitHub side, containing the
              requested path, a timestamp, a user agent, and an IP address. That
              log is GitHub&rsquo;s, not the project&rsquo;s, and is handled under
              the GitHub privacy statement.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              The site itself runs no client-side tracking: no analytics script,
              no tag manager, no pixels, no consent banner because there is
              nothing to consent to. Fonts are self-hosted and there are no
              third-party embeds.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-xl p-5">
              <h3 className="text-[15px] font-semibold">Source is in the open</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                You do not have to take this page on trust. The website
                repository is the same place the claims are written down.
              </p>
              <div className="mt-4">
                <a
                  href={SITE.githubWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line-2 px-3 py-2 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Website source
                </a>
              </div>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-[15px] font-semibold">App source too</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                If you want to confirm that no telemetry call exists, grep the
                tree. There is no analytics dependency to find.
              </p>
              <div className="mt-4">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line-2 px-3 py-2 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  App repository
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="reset"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="rounded-2xl border border-line bg-ink p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Reset
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Delete the folder and you are done.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Close the window, then delete{" "}
              <span className="rounded-md border border-line bg-slab px-2 py-1 font-mono text-xs text-fg-2">
                %APPDATA%\zephyr
              </span>
              . That removes your settings, editor history, extension list, logs,
              and any key you stored, in one step. There is no server-side
              record to delete afterwards, because nothing was ever sent.
            </p>
            <ol className="mt-6 space-y-2.5">
              {[
                "Close Zephyr. On Windows, check the tray or Task Manager first.",
                "Open the folder in File Explorer and delete it.",
                "Reopen Zephyr when you want a clean install. It recreates the folder with defaults.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[3px] shrink-0 font-mono text-xs text-gust-3"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-relaxed text-fg-2">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[15px] leading-relaxed text-fg-2">
              If the machine is shared or you are unsure who had access, rotate
              any API key you had stored. Deleting the file obfuscates it away,
              but it does not un-share a key that was already copied.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Related: the{" "}
              <Link
                href="/security"
                className="text-fg underline decoration-gust/60 underline-offset-4 transition-colors hover:decoration-gust"
              >
                security page
              </Link>{" "}
              covers the MCP server and release signing, and the{" "}
              <Link
                href="/terms"
                className="text-fg underline decoration-gust/60 underline-offset-4 transition-colors hover:decoration-gust"
              >
                terms
              </Link>{" "}
              cover the license and warranty.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
