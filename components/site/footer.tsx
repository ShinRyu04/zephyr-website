import Link from "next/link"

import { ZephyrMark } from "@/components/site/zephyr-mark"
import { FOOTER_NAV, SITE, VERSION } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <ZephyrMark size={24} />
              <span className="font-semibold tracking-tight">Zephyr</span>
            </div>
            <p className="mt-4 text-sm text-fg-2">{SITE.tagline}.</p>
            <p className="mt-2 font-mono text-xs text-fg-3">
              {SITE.licenseName} &middot; v{VERSION} &middot; no telemetry
            </p>
            <p className="mt-6 text-xs text-fg-3">
              Built with Tauri 2, Rust, and React.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((group) => (
              <div key={group.heading}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                  {group.heading}
                </h2>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) => {
                    const external = "external" in link && link.external
                    return (
                      <li key={link.href}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-8 items-center text-sm text-fg-2 transition-colors hover:text-fg"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="inline-flex min-h-8 items-center text-sm text-fg-2 transition-colors hover:text-fg"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.author}. Zephyr is an independent
            open-source project.
          </p>
          <p className="font-mono">
            Not affiliated with Microsoft, Anthropic, Google, or OpenAI.
          </p>
        </div>
      </div>
    </footer>
  )
}
