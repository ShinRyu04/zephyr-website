export function ZephyrMark({
  size = 28,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      role="img"
      aria-label="Zephyr"
      className={className}
    >
      <defs>
        <linearGradient id="zmark-bg" x1="0" y1="0" x2="0" y2="1">
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
        fill="url(#zmark-bg)"
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
  )
}
