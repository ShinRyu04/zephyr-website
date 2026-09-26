import { CheckIcon, Copy01Icon, Download01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { CopyButton } from "@/components/site/copy-button"
import { DOWNLOAD_GROUPS, DOWNLOADS_BY_PLATFORM, PLATFORMS, RELEASE } from "@/lib/site"

const NOTES: Record<string, string[]> = {
  "win-nsis": ["Recommended for most people", "SmartScreen may warn — choose More info, then Run anyway"],
  "win-msi": ["For managed or fleet deployments", "Same signed build as the NSIS installer"],
  "linux-appimage": ["chmod +x, then run", "No install step required"],
  "linux-deb": ["Debian, Ubuntu, and derivatives", "Installs system-wide"],
}

export function DownloadSection() {
  return (
    <div className="space-y-10">
      {DOWNLOAD_GROUPS.map((group) => {
        const items = DOWNLOADS_BY_PLATFORM[group.key]
        return (
          <div key={group.key}>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3
                className={
                  group.primary
                    ? "font-mono text-[11px] uppercase tracking-[0.16em] text-fg"
                    : "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3"
                }
              >
                {group.heading}
              </h3>
              <span
                className={
                  group.primary
                    ? "rounded-full bg-gust/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gust"
                    : "rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-3"
                }
              >
                {group.status}
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="glass flex flex-col gap-4 rounded-xl p-4 transition-colors hover:border-line-2 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-sm font-semibold tracking-tight">
                        {item.label}
                      </span>
                      <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-3">
                        {item.detail}
                      </span>
                      {item.primary ? (
                        <span className="rounded-full bg-gust/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gust">
                          Recommended
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 flex items-center gap-1.5 truncate font-mono text-xs text-fg-3">
                      {item.file}
                      <CopyButton text={item.file} />
                    </p>
                    <ul className="mt-2.5 space-y-1">
                      {NOTES[item.id]?.map((note) => (
                        <li
                          key={note}
                          className="flex items-start gap-1.5 text-xs text-fg-3"
                        >
                          <HugeiconsIcon
                            icon={CheckIcon}
                            strokeWidth={2}
                            className="mt-0.5 size-3 shrink-0 text-gain"
                          />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={item.url}
                    className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                      item.primary
                        ? "bg-gust text-ink hover:bg-gust-3"
                        : "border border-line-2 text-fg hover:border-fg-3"
                    }`}
                  >
                    <HugeiconsIcon icon={Download01Icon} strokeWidth={2} className="size-4" />
                    Download
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] leading-relaxed text-fg-3">
              {group.note}
            </p>
          </div>
        )
      })}

      <div className="glass rounded-xl p-5">
        <p className="text-sm text-fg-2">
          Signed releases live on GitHub. The app verifies the minisign signature
          before it installs an update.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-fg-3">
          <li>{RELEASE}</li>
          {PLATFORMS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
