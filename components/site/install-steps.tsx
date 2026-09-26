const STEPS = [
  {
    title: "Download the installer",
    body: "Grab the .exe or .msi from the download table above, or open the releases page directly.",
  },
  {
    title: "Run it",
    body: "SmartScreen may warn because the build is not signed with a paid certificate. Choose More info, then Run anyway.",
  },
  {
    title: "Open a folder",
    body: "Zephyr opens. Use Open Folder to load a project. Settings, keys, extensions, and logs live under %APPDATA%\\zephyr — delete that folder for a full reset.",
  },
] as const

export function InstallSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
      {STEPS.map((step, i) => (
        <li key={step.title} className="bg-ink p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg border border-line font-mono text-sm text-gust">
              {i + 1}
            </span>
            <h3 className="text-sm font-semibold tracking-tight">{step.title}</h3>
          </div>
          <p className="mt-3.5 text-[13px] leading-relaxed text-fg-2">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}
