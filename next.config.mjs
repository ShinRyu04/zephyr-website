const repo = "zephyr-website"
const owner = "ShinRyu04"

const isProd = process.env.NODE_ENV === "production"

const isUserSite =
  repo.toLowerCase() === `${owner.toLowerCase()}.github.io`.toLowerCase()

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd && !isUserSite ? `/${repo}` : "")

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  `https://${owner.toLowerCase()}.github.io${isUserSite ? "" : `/${repo}`}`

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true, qualities: [75, 82, 90] },
  devIndicators: { position: "bottom-right" },
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
}

export default nextConfig
