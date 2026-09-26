"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { SiteThemeToggle } from "@/components/site/theme-toggle"
import { ZephyrMark } from "@/components/site/zephyr-mark"
import { cn } from "@/lib/cn"
import { NAV, PRIMARY_DOWNLOAD, RELEASE } from "@/lib/site"

export function SiteHeader() {
  const pathname = usePathname()
  const [lifted, setLifted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        lifted ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md py-1 pr-1 font-semibold tracking-tight"
        >
          <ZephyrMark size={26} />
          <span className="text-[15px]">Zephyr</span>
        </Link>

        <span
          className="hidden rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-fg-2 sm:inline-block"
          title="Latest release"
        >
          {RELEASE}
        </span>

        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {NAV.map((item) => {
            const active =
              item.href.startsWith("/") &&
              !item.href.includes("#") &&
              pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "text-fg" : "text-fg-2 hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SiteThemeToggle />

          <a
            href={PRIMARY_DOWNLOAD.url}
            className="hidden items-center gap-2 rounded-lg bg-gust px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gust-3 md:inline-flex"
          >
            Download
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-fg-2 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 5h12M3 9h12M3 13h12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto grid max-w-6xl gap-1 px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm text-fg-2 transition-colors hover:bg-slab hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={PRIMARY_DOWNLOAD.url}
              className="mt-2 rounded-lg bg-gust px-3 py-3 text-center text-sm font-semibold text-ink"
            >
              Download for Windows
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
