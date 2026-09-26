import type { Metadata } from "next"

import { DemoWindow } from "@/components/site/demo-window"
import { DownloadSection } from "@/components/site/download-section"
import { Faq } from "@/components/site/faq"
import { FeatureGrid } from "@/components/site/feature-grid"
import { FeatureShowcase } from "@/components/site/feature-showcase"
import { Hero } from "@/components/site/hero"
import { InstallSteps } from "@/components/site/install-steps"
import { ScreenshotGallery } from "@/components/site/screenshot-gallery"
import { Reveal } from "@/components/visuals/reveal"
import { MCP_PORT, PLATFORM, PRIMARY_DOWNLOAD, SITE, VERSION } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  description: SITE.description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: PLATFORM.primaryVersions,
  featuredPlatform: PLATFORM.primary,
  softwareRequirements: `Zephyr ${VERSION} requires ${PLATFORM.primaryRequirement}. WebView2 is already present on Windows 11.`,
  softwareVersion: VERSION,
  downloadUrl: PRIMARY_DOWNLOAD.url,
  url: SITE.url,
  license: "https://opensource.org/licenses/Apache-2.0",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: SITE.author, url: SITE.github },
  featureList: [
    "CodeMirror 6 editor with per-language LSP",
    "ConPTY terminal with up to six panes",
    "Git status, diff, blame, stash, and rebase",
    `MCP server on port ${MCP_PORT}`,
    "AI chat and agent modes with parallel subagents",
    "Nineteen themes and ten languages",
  ],
}

export default function HomePage() {
  return (
    <main id="main" className="relative">
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
                00 &middot; Inside the window
              </p>
              <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
                Editor, terminal, agent, and git in one frame.
              </h2>
            </div>
            <p className="max-w-xs text-sm text-fg-2">
              Pick a pane to see what it holds. Everything below runs locally on
              your machine.
            </p>
          </div>
          <DemoWindow />
        </Reveal>
      </section>

      <section
        id="screenshots"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8"
      >
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Screenshots
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              The real window, not a mockup.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
              Every shot below is an actual capture of Zephyr running on Windows.
              Filter by surface to see how the editor, terminal, git, agents, and
              MCP fit together.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <ScreenshotGallery />
        </Reveal>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8">
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Features
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Six parts that had to work together, so they do.
            </h2>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <FeatureShowcase />
        </Reveal>
      </section>

      <section id="toolkit" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Toolkit
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              More built in. No plugin required.
            </h2>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <FeatureGrid />
        </Reveal>
      </section>

      <section id="download" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Download &middot; v{VERSION}
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Pick a build. Run it.
            </h2>
            <p className="mt-4 max-w-xl text-sm text-fg-2">
              {PLATFORM.primaryRequirement} is the tested target and every Windows
              build is the officially supported one. The Linux AppImage and{" "}
              <span className="font-mono text-xs">.deb</span> builds are
              community-supported and experimental. No account, no telemetry. Signed
              releases on GitHub, and the app verifies the signature before it
              updates.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <DownloadSection />
        </Reveal>
      </section>

      <section id="install" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Install
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Three steps and you are in.
            </h2>
            <p className="mt-4 max-w-xl text-sm text-fg-2">
              Windows 10 or 11. WebView2 already ships with Windows 11, so on a
              fresh machine it usually just runs.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <InstallSteps />
        </Reveal>
      </section>

      <section id="faq" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              FAQ
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              Questions, answered plainly.
            </h2>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <Faq />
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10 sm:py-20">
            <div
              aria-hidden="true"
              className="grid-field pointer-events-none absolute inset-0 opacity-25"
            />
            <div className="relative mx-auto max-w-xl">
              <h2 className="text-[clamp(1.6rem,3.4vw,2.3rem)] font-bold tracking-tight">
                Open a folder and let an agent take the first pass.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg-2">
                Register Zephyr with your CLI in one click, or download the
                installer and start typing. The source is open either way.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={PRIMARY_DOWNLOAD.url}
                  className="rounded-xl bg-gust px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gust-3"
                >
                  Download for Windows
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line-2 px-6 py-3 text-sm font-semibold transition-colors hover:border-fg-3"
                >
                  Read the source
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
