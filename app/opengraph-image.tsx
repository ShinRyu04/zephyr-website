import { ImageResponse } from "next/og"

import { SITE, VERSION } from "@/lib/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamic = "force-static"

const MARKS = [
  `v${VERSION}`,
  SITE.licenseName,
  "No telemetry",
  "Tauri 2 + Rust + React",
]

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "76px 84px",
          backgroundColor: "#05070c",
          color: "#eef2fb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 860,
            height: 860,
            borderRadius: 430,
            background:
              "radial-gradient(circle, rgba(77,148,255,0.26) 0%, rgba(77,148,255,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -180,
            bottom: -300,
            width: 620,
            height: 620,
            borderRadius: 310,
            background:
              "radial-gradient(circle, rgba(47,111,228,0.18) 0%, rgba(47,111,228,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <svg width="136" height="136" viewBox="0 0 1024 1024">
            <defs>
              <linearGradient id="og-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#141b2c" />
                <stop offset="1" stopColor="#080c15" />
              </linearGradient>
            </defs>
            <rect
              x="2"
              y="2"
              width="1020"
              height="1020"
              rx="208"
              fill="url(#og-bg)"
              stroke="#263049"
              strokeWidth="4"
            />
            <path
              d="M150 300 Q425 352 700 300"
              fill="none"
              stroke="#4d94ff"
              strokeWidth="26"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              d="M330 756 Q605 808 880 756"
              fill="none"
              stroke="#4d94ff"
              strokeWidth="26"
              strokeLinecap="round"
              opacity="0.27"
            />
            <path
              d="M268 300 L756 300 L756 396 L464 628 L756 628 L756 724 L268 724 L268 628 L560 396 L268 396 Z"
              fill="#e8f0ff"
            />
            <circle cx="834" cy="296" r="38" fill="#4d94ff" />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#ffffff",
              }}
            >
              Zephyr
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 22,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#4d94ff",
              }}
            >
              {SITE.licenseName} licensed
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#a7b1c8",
            maxWidth: 900,
          }}
        >
          A code editor that AI CLIs can drive
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 22,
            color: "#6b7690",
          }}
        >
          {MARKS.map((mark, index) => (
            <div
              key={mark}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              {index > 0 ? (
                <span style={{ color: "#263049" }}>·</span>
              ) : null}
              <span>{mark}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
