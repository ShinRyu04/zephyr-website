import Link from "next/link"

import { ZephyrMark } from "@/components/site/zephyr-mark"
import { Reveal } from "@/components/visuals/reveal"

const LINKS = [
  {
    label: "Back to the homepage",
    body: "The tour, the toolkit, and what the editor is for.",
    href: "/",
  },
  {
    label: "Download",
    body: "Windows installer or a Linux build.",
    href: "/download",
  },
  {
    label: "Docs",
    body: "Quickstart, the MCP server, and settings.",
    href: "/docs",
  },
] as const

export default function NotFound() {
  return (
    <main id="main" className="relative">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center">
            <ZephyrMark size={44} />
            <p className="mt-8 font-mono text-[clamp(4rem,18vw,9rem)] font-extrabold leading-none tracking-tight text-gust">
              404
            </p>
            <h1 className="mt-6 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tight">
              That page is not in this build.
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-2">
              The link is broken or the page moved. Nothing is wrong with your install,
              and nothing was sent anywhere to find out who clicked it.
            </p>

            <div className="mt-10 grid w-full max-w-2xl gap-px overflow-hidden rounded-2xl border border-line bg-line text-left sm:grid-cols-3">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-ink p-5 transition-colors hover:bg-slab"
                >
                  <span className="block text-sm font-semibold tracking-tight">
                    {link.label}
                  </span>
                  <span className="mt-2 block text-[13px] leading-relaxed text-fg-3">
                    {link.body}
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
              Apache-2.0 &middot; no telemetry &middot; no account
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
