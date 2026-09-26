const TOOLS = [
  {
    name: "LSP",
    body: "Per-language completion, hover, rename, and format. A language server starts when you open a file and stops after it goes idle.",
    span: "md:col-span-1",
  },
  {
    name: "Debugger",
    body: "DAP with breakpoints, stepping, watch expressions, and a call stack.",
    span: "md:col-span-1",
  },
  {
    name: "Snippets",
    body: "Reusable insertions, scoped per language.",
    span: "md:col-span-1",
  },
  {
    name: "Skills and memory",
    body: "Plain files under %APPDATA% that the agent can call. No database, no migration.",
    span: "md:col-span-1",
  },
  {
    name: "Tasks",
    body: "Detects build and test commands from the project, then runs them without you hunting for the right incantation.",
    span: "md:col-span-1",
  },
  {
    name: "Command palette",
    body: "Every action in one list, virtualized so a large command set still opens instantly.",
    span: "md:col-span-1",
  },
  {
    name: "Quick Open",
    body: "Fuzzy file search across the whole workspace, driven from the keyboard.",
    span: "md:col-span-1",
  },
  {
    name: "Extensions",
    body: "Bundled packs plus Open VSX .vsix install. Static contributions only, so extension JavaScript never runs.",
    span: "md:col-span-1",
  },
  {
    name: "Timeline",
    body: "File history with snapshots and restore.",
    span: "md:col-span-1",
  },
  {
    name: "Zen mode",
    body: "Editor only. Everything else moves out of the way.",
    span: "md:col-span-1",
  },
  {
    name: "Screen reader mode",
    body: "Reduced motion, forced high contrast, and visible focus rings throughout the window.",
    span: "md:col-span-1",
  },
  {
    name: "Tiny footprint",
    body: "About 9.5 MB on disk. No Electron, no bundled Chromium, no always-on extension host.",
    span: "md:col-span-3 lg:col-span-1",
  },
] as const

export function FeatureGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 md:grid-cols-3">
      {TOOLS.map((tool) => (
        <div
          key={tool.name}
          className={`group bg-ink p-5 transition-colors duration-300 hover:bg-slab ${tool.span}`}
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-gust transition-transform duration-300 group-hover:scale-150"
            />
            <h3 className="text-sm font-semibold tracking-tight">{tool.name}</h3>
          </div>
          <p className="mt-2.5 text-[13px] leading-relaxed text-fg-3 transition-colors group-hover:text-fg-2">
            {tool.body}
          </p>
        </div>
      ))}
    </div>
  )
}
