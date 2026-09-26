const isProd = process.env.NODE_ENV === "production"

const repo = "zephyr-website"
const owner = "ShinRyu04"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "" : "")

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true, qualities: [75, 82, 90] },
  devIndicators: { position: "bottom-right" },
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ??
      `https://${owner.toLowerCase()}.github.io/${repo}`,
  },
}

export default nextConfig
