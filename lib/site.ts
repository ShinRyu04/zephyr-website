export const SITE = {
  name: "Zephyr",
  tagline: "A code editor that AI CLIs can drive",
  description:
    "Zephyr is a lightweight Windows 10/11 desktop code editor built on Tauri 2, Rust, and React. About 9.5 MB on disk, with an MCP server on port 9222 so Claude Code, Codex, Gemini CLI, or opencode can read and drive the window. WebView2 ships with Windows 11. Linux AppImage and .deb builds are experimental community builds. No telemetry, no account.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shinryu04.github.io/zephyr-website",
  github: "https://github.com/ShinRyu04/Zephyr",
  githubWebsite: "https://github.com/ShinRyu04/zephyr-website",
  releases: "https://github.com/ShinRyu04/Zephyr/releases",
  issues: "https://github.com/ShinRyu04/Zephyr/issues",
  security: "https://github.com/ShinRyu04/Zephyr/blob/main/SECURITY.md",
  license: "https://github.com/ShinRyu04/Zephyr/blob/main/LICENSE",
  changelog: "https://github.com/ShinRyu04/Zephyr/blob/main/CHANGELOG.md",
  author: "Muhammad Khalid",
  licenseName: "Apache-2.0",
} as const

export const VERSION = "1.1.11"
export const SIZE_ON_DISK = "9.5 MB"
export const MCP_PORT = 9222

export const RELEASE = `v${VERSION}`
export const RELEASE_TAG = `v${VERSION}`

export const PLATFORM = {
  primary: "Windows",
  primaryRequirement: "Windows 10 or 11",
  primaryVersions: "Windows 10, Windows 11",
  primaryLabel: "Primary platform",
  primaryNote: "The tested target. Fixes are built and verified on Windows first.",
  secondary: "Linux",
  secondaryRequirement: "AppImage or .deb on x86_64",
  secondaryLabel: "Experimental",
  secondaryStatus: "Experimental community build",
  secondaryNote: "Not the tested target. Builds are best-effort, and issues are best filed against Windows.",
  noBuild: "There is no macOS build.",
  webview: "WebView2 already ships with Windows 11, so the installer usually just runs.",
} as const

const asset = (name: string) =>
  `https://github.com/ShinRyu04/Zephyr/releases/download/${RELEASE_TAG}/${name}`

export interface DownloadItem {
  id: string
  platform: "windows" | "linux"
  label: string
  detail: string
  file: string
  url: string
  primary?: boolean
}

export const DOWNLOADS: DownloadItem[] = [
  {
    id: "win-nsis",
    platform: "windows",
    label: "x86_64",
    detail: "NSIS installer",
    file: `Zephyr_${VERSION}_x64-setup.exe`,
    url: asset(`Zephyr_${VERSION}_x64-setup.exe`),
    primary: true,
  },
  {
    id: "win-msi",
    platform: "windows",
    label: "x86_64",
    detail: "MSI installer",
    file: `Zephyr_${VERSION}_x64_en-US.msi`,
    url: asset(`Zephyr_${VERSION}_x64_en-US.msi`),
  },
  {
    id: "linux-appimage",
    platform: "linux",
    label: "AppImage",
    detail: "x86_64",
    file: `Zephyr_${VERSION}_amd64.AppImage`,
    url: asset(`Zephyr_${VERSION}_amd64.AppImage`),
  },
  {
    id: "linux-deb",
    platform: "linux",
    label: ".deb",
    detail: "Debian / Ubuntu",
    file: `Zephyr_${VERSION}_amd64.deb`,
    url: asset(`Zephyr_${VERSION}_amd64.deb`),
  },
]

export const DOWNLOADS_BY_PLATFORM = {
  windows: DOWNLOADS.filter((d) => d.platform === "windows"),
  linux: DOWNLOADS.filter((d) => d.platform === "linux"),
} as const

export interface DownloadGroup {
  key: "windows" | "linux"
  heading: string
  status: string
  primary: boolean
  note: string
}

export const DOWNLOAD_GROUPS: DownloadGroup[] = [
  {
    key: "windows",
    heading: PLATFORM.primary,
    status: PLATFORM.primaryLabel,
    primary: true,
    note: PLATFORM.primaryNote,
  },
  {
    key: "linux",
    heading: PLATFORM.secondary,
    status: PLATFORM.secondaryStatus,
    primary: false,
    note: PLATFORM.secondaryNote,
  },
]

export const PRIMARY_DOWNLOAD =
  DOWNLOADS.find((d) => d.primary) ?? DOWNLOADS[0]

export const NAV = [
  { label: "Features", href: "/#features" },
  { label: "Toolkit", href: "/#toolkit" },
  { label: "Download", href: "/download" },
  { label: "Docs", href: "/docs" },
] as const

export const FOOTER_NAV = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Toolkit", href: "/#toolkit" },
      { label: "Download", href: "/download" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Project",
    links: [
      { label: "GitHub", href: SITE.github, external: true },
      { label: "Issues", href: SITE.issues, external: true },
      { label: "Releases", href: SITE.releases, external: true },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Security", href: "/security" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "License", href: SITE.license, external: true },
    ],
  },
] as const

export const STATS = [
  { value: `~${SIZE_ON_DISK}`, label: "on disk" },
  { value: "No telemetry", label: "ever" },
  { value: SITE.licenseName, label: "open source" },
  { value: `Port ${MCP_PORT}`, label: "MCP server" },
] as const

export const PLATFORMS = [
  PLATFORM.primaryRequirement,
  `${PLATFORM.secondary} AppImage`,
  `${PLATFORM.secondary} .deb`,
] as const

export interface PlatformBadge {
  id: string
  label: string
  status: string
  primary: boolean
}

export const PLATFORM_BADGES: PlatformBadge[] = [
  {
    id: "windows",
    label: PLATFORM.primaryRequirement,
    status: PLATFORM.primaryLabel,
    primary: true,
  },
  {
    id: "linux-appimage",
    label: "Linux AppImage",
    status: PLATFORM.secondaryLabel,
    primary: false,
  },
  {
    id: "linux-deb",
    label: "Linux .deb",
    status: PLATFORM.secondaryLabel,
    primary: false,
  },
]

