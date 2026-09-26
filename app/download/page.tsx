import type { Metadata } from "next"
import Link from "next/link"

import { DownloadSection } from "@/components/site/download-section"
import { InstallSteps } from "@/components/site/install-steps"
import { Reveal } from "@/components/visuals/reveal"
import { PRIMARY_DOWNLOAD, SITE, VERSION } from "@/lib/site"

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Zephyr 1.1.11 for Windows 10 or 11 as an NSIS installer or MSI — the primary supported platform. Linux AppImage and .deb are experimental community builds. Signed releases, no account, no telemetry, no bundled browser.",
  alternates: { canonical: "/download" },
}

const CHECKS = [
  {
    title: "Every release is signed",
    body: "Each artifact is signed with a minisign key. Zephyr verifies that signature before it installs an update, so a tampered binary is rejected instead of run. The public key sits in the app data folder next to your settings.",
    mono: "%APPDATA%\\zephyr\\zephyr.pub",
  },
  {
    title: "SmartScreen will warn once",
    body: "The build is not signed with a paid code-signing certificate, so Windows SmartScreen calls it an unrecognized app. Choose More info, then Run anyway. Nothing is bundled that could explain the warning away.",
    mono: "More info \u2192 Run anyway",
  },
  {
    title: "Or build it yourself",
    body: "The whole editor is Apache-2.0 and builds from a clean checkout. You need Rust stable, Node 20 or newer, and the WebView2 Runtime. That path removes the SmartScreen question entirely, because you produced the binary.",
    mono: "npm run tauri build",
  },
  {
    title: "Every release is on GitHub",
    body: "This page shows the current version only. Older builds, checksums, and the signed asset for each tag are on the releases page, and each entry links to the commits it contains.",
    mono: SITE.releases,
  },
] as const

export default function DownloadPage() {
  return (
    <main id="main" className="relative">
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            Download &middot; v{VERSION}
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold tracking-[-0.02em]">
            Pick a build. Run it.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            One editor, about 9.5 MB on disk, no bundled Chromium. Windows 10 or 11
            is the primary supported platform: the NSIS and MSI installers below are
            the tested builds. The Linux AppImage and{" "}
            <span className="font-mono text-[13px]">.deb</span> builds are published
            as experimental community builds, and there is no macOS build. No account
            is created and nothing is reported back.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PRIMARY_DOWNLOAD.url}
              className="rounded-xl bg-gust px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gust-3"
            >
              Download v{VERSION} for Windows
            </a>
            <Link
              href="/docs#quickstart"
              className="rounded-xl border border-line-2 px-6 py-3 text-sm font-semibold transition-colors hover:border-fg-3"
            >
              Read the quickstart
            </Link>
          </div>
        </Reveal>
      </section>

      <section
        id="builds"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Builds
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Windows first, Linux when you want it.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-2">
              The same signed source builds every artifact below. Windows 10 or 11 is
              the primary and officially supported target, and it is the only platform
              the builds are tested on. Linux ships as an experimental community
              build, and there is no macOS build.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <DownloadSection />
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Install
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Three steps and you are in.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-2">
              Windows 10 or 11. WebView2 already ships with Windows 11, so on a fresh
              machine it usually just runs.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <InstallSteps />
        </Reveal>
      </section>

      <section
        id="verify"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-8"
      >
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Verify
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Check what you downloaded.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-2">
              Four things worth knowing before you run an unsigned installer.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {CHECKS.map((check, i) => (
              <li key={check.title} className="bg-ink p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line font-mono text-sm text-gust">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight">{check.title}</h3>
                </div>
                <p className="mt-3.5 text-[14px] leading-relaxed text-fg-2">{check.body}</p>
                <p className="mt-4 break-all rounded-md border border-line bg-slab px-2 py-1 font-mono text-xs text-fg-2">
                  {check.mono}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SITE.releases}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-line-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-fg-3"
            >
              All releases on GitHub
            </a>
            <a
              href={SITE.changelog}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-line-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-fg-3"
            >
              What changed in v{VERSION}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
