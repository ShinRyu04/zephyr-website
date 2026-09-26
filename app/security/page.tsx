import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/visuals/reveal"
import { MCP_PORT, SITE, VERSION } from "@/lib/site"

export const metadata: Metadata = {
  title: "Security",
  description:
    "How to report a vulnerability in Zephyr, plus the MCP server model, release signing, and what the editor stores locally. No telemetry, no accounts.",
  alternates: { canonical: "/security" },
}

const MCP_CONTROLS = [
  {
    title: "Loopback only",
    body: `The server binds 127.0.0.1 on port ${MCP_PORT}. It is not reachable from another machine, and it is not listening on a public interface even if the firewall allows it.`,
  },
  {
    title: "Bearer token on every call",
    body: "A token is generated when the server starts. Every request must carry it in the Authorization header. Without a valid token the server answers with a rejection and does no work.",
  },
  {
    title: "It can be turned off",
    body: "There is a setting that disables the server entirely. When it is off, nothing binds the port and the feature is not reachable at all.",
  },
  {
    title: "editor_write stays in the buffer",
    body: "The write tool mutates the in-memory editor buffer. It does not call the file system, does not save, and does not touch your files on disk. Saving is a separate, explicit act.",
  },
  {
    title: "/health is inert",
    body: "The health endpoint needs no token and returns a small status document. It performs no UI work, reads no file, and exposes nothing beyond whether the server is alive.",
  },
] as const

const STORED = [
  {
    label: "Settings",
    body: "Theme, layout, font size, and editor preferences.",
  },
  {
    label: "Editor history",
    body: "Recently opened folders and files, so the window can reopen where you left it.",
  },
  {
    label: "Extension list",
    body: "The extensions found in the extensions folder, loaded at startup.",
  },
  {
    label: "Logs",
    body: "Local diagnostic output. These stay on the machine and are never uploaded.",
  },
  {
    label: "Provider keys",
    body: "Only if you enter one. See the note below on how it is written to disk.",
  },
] as const

export default function SecurityPage() {
  return (
    <main id="main" className="relative">
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            Security
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] font-extrabold tracking-[-0.02em]">
            What the attack surface is, and what it is not.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            Zephyr runs entirely on your machine. There is no Zephyr server, no
            account system, and no hosted API. That makes the surface small, and
            it makes it worth writing down precisely. This page describes the
            one network service the app runs, how it authenticates, how releases
            are signed, and what ends up in your profile folder.
          </p>
        </Reveal>
      </section>

      <section
        id="scope"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="rounded-2xl border border-line bg-ink p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Scope of this report
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              A local desktop app, not a web service.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Because Zephyr is a desktop application, the server-side attack
              surface is the loopback MCP endpoint and nothing else. There is no
              multi-user backend, no session store, no database, no file upload
              handler, and no auth service to compromise. Every other part of the
              app is client-side code running with the privileges of the user who
              launched it.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              If you are reviewing this for a deployment that runs Zephyr as a
              shared service on a server, note that Zephyr is not designed for
              that and you would be deploying something the project does not
              support.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        id="reporting"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Reporting
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Found something? Here is where to say it.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              For anything that looks exploitable, or that would expose data
              belonging to another user on the same machine, use GitHub Security
              Advisories so the report stays private until a fix exists.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-xl p-5">
              <h3 className="text-[15px] font-semibold">Private report</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                Use the security advisory flow on the repository for anything
                sensitive. It creates a private thread, so details are not
                public until a release exists.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line-2 px-3 py-2 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Open an advisory
                </a>
                <a
                  href={SITE.security}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line-2 px-3 py-2 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Read SECURITY.md
                </a>
              </div>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-[15px] font-semibold">Public issue</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                Crashes, install problems, hardening suggestions, and anything
                you are not sure about go in the issue tracker. Those are public
                and there is usually no need to keep a bug private.
              </p>
              <div className="mt-4">
                <a
                  href={SITE.issues}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line-2 px-3 py-2 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Open an issue
                </a>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delayMs={140}>
          <div className="mt-4 rounded-2xl border border-line bg-ink p-6">
            <h3 className="text-[15px] font-semibold">What to include</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "Version, shown in the About panel and in the window title area.",
                "Platform and Windows build, or Linux distribution.",
                "The MCP server state: on or off, port, and whether the token was present.",
                "Steps to reproduce, with the exact request that triggered it if one did.",
                "What an attacker gains, not just what breaks.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gust"
                  />
                  <span className="text-[15px] leading-relaxed text-fg-2">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Give the maintainer a reasonable window to ship a fix before
              disclosing publicly. There is one person on this project, so that
              window is measured in weeks, not hours.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        id="mcp"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              MCP server
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              {`The only network listener in the app, on port ${MCP_PORT}.`}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              The server speaks HTTP JSON-RPC. A CLI connects to it, sends
              tool calls, and gets editor state back. The controls below are the
              whole model; there is no TLS because the socket never leaves
              loopback.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="glass mt-10 rounded-xl p-5 sm:p-7">
            <ul className="space-y-2.5">
              {MCP_CONTROLS.map((item) => (
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
            <p className="mt-6 border-t border-line pt-5 text-[15px] leading-relaxed text-fg-2">
              The honest limitation: any process on the same machine running as
              your user can reach the port, and loopback offers no protection
              from a process that already has your privileges. The token raises
              the cost of an accidental or casual caller. It is not a boundary
              against malware, and it is not meant to be.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        id="releases"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Release signing
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Signature checked before the update runs.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Release artifacts are signed with minisign. The public key is
              compiled into the binary, and Zephyr verifies the signature before
              it applies an update. A download that was modified in transit, or
              an artifact that was replaced, fails verification and is discarded
              rather than installed.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-10 rounded-2xl border border-line bg-ink p-6">
            <h3 className="text-[15px] font-semibold">
              SmartScreen will probably warn you
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
              The installer is not signed with a paid CA certificate, so
              Windows Defender SmartScreen may show an unknown-publisher
              warning on first run. That is expected and it is not a defect. A
              code-signing certificate is a recurring cost for a solo project
              with no revenue behind it, and the minisign check on updates is
              the mechanism that actually protects the update path.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              For the same reason, the app is not notarized and may be refused
              by Gatekeeper on macOS. There is no macOS build, so this only
              matters if you are running it under a compatibility layer.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              {`Current release: v${VERSION}. Signatures and checksums are published on the`}{" "}
              <a
                href={SITE.releases}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-gust/60 underline-offset-4 transition-colors hover:decoration-gust"
              >
                releases page
              </a>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <section
        id="data"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Data handling
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              What sits on disk, and what does not leave it.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              Everything the app persists lives in one folder in your user
              profile:{" "}
              <span className="rounded-md border border-line bg-slab px-2 py-1 font-mono text-xs text-fg-2">
                %APPDATA%\zephyr
              </span>{" "}
              on Windows. Nothing is written anywhere else, and nothing is sent
              to the project or to any third party.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
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
        <Reveal delayMs={140}>
          <div className="mt-4 rounded-2xl border border-line bg-ink p-6">
            <h3 className="text-[15px] font-semibold">
              Stored keys are obfuscated, not encrypted
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
              If you paste a provider API key, it is obfuscated with XOR and
              BLAKE3 before it is written to disk. That is deliberately described
              as obfuscation: XOR is reversible by anyone who knows the key
              derivation, and the scheme exists to stop a key from being read
              out of a config file by accident. It is not cryptography and it is
              not a defense against anything deliberate. Any process running as
              your user can recover the key.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              If that trade-off does not work for your setup, do not store keys
              in the app. Set the environment variable your CLI expects and
              leave the field empty.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={200}>
          <div className="glass mt-4 rounded-xl p-5 sm:p-7">
            <h3 className="text-[15px] font-semibold">
              No telemetry, no analytics, no crash reporting
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "No usage counters, no unique identifiers, no device fingerprinting.",
                "No analytics or crash-reporting SDK anywhere in the build.",
                "No update pings. The updater fetches a manifest and stops there.",
                "No data sold, shared, or brokered, because there is no data to share.",
              ].map((item) => (
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
            <p className="mt-6 text-[15px] leading-relaxed text-fg-2">
              The full breakdown is on the{" "}
              <Link
                href="/privacy"
                className="text-fg underline decoration-gust/60 underline-offset-4 transition-colors hover:decoration-gust"
              >
                privacy page
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
