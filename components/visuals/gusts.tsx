"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/cn"

interface GustsProps {
  className?: string
  intensity?: number
  speed?: number
  density?: number
  color1?: string
  color2?: string
  color3?: string
}

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uSpeed;
uniform float uDensity;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;

const float TAU = 6.28318530718;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    sum += amp * valueNoise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uResolution;
  vec2 p = (frag - 0.5 * uResolution) / uResolution.y;

  float t = uTime * uSpeed;

  float core = exp(-dot(p, p) * 1.15);

  vec2 q = vec2(
    fbm(p * 1.35 + vec2(0.0, t * 0.42)),
    fbm(p * 1.35 + vec2(5.2, -t * 0.31))
  );

  vec2 r = vec2(
    fbm(p * 2.10 + 3.9 * q + vec2(1.7, 9.2) + t * 0.28),
    fbm(p * 2.10 + 3.9 * q + vec2(8.3, 2.8) - t * 0.24)
  );

  float streak = fbm(p * vec2(1.0, uDensity) + 2.6 * r + vec2(t * 0.85, 0.0));
  streak = pow(streak, 2.15);
  streak = streak * streak * 1.6;

  float band = smoothstep(0.30, 0.98, streak + 0.34 * r.x);
  float glow = pow(core, 1.35);

  float weight = (band * 0.55 + 0.45) * (0.35 + 0.65 * glow);
  weight = clamp(weight * uIntensity, 0.0, 1.6);

  vec3 low  = uColor1;
  vec3 mid  = uColor2;
  vec3 high = uColor3;

  float ramp = clamp(band * 1.4 + length(r) * 0.35, 0.0, 1.0);
  vec3 col = mix(low, mid, smoothstep(0.0, 0.55, ramp));
  col = mix(col, high, smoothstep(0.55, 1.0, ramp));

  float fall = smoothstep(1.06, 0.18, length(p * vec2(0.82, 1.0)));
  float apex = smoothstep(0.0, 0.55, uv.y);
  col *= weight * (0.55 + 0.45 * apex) * fall;

  float grain = hash(frag + fract(t) * 41.0) / 255.0;
  col += grain;

  float alpha = clamp(max(max(col.r, col.g), col.b) * 1.25, 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim()
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ]
}

export function Gusts({
  className,
  intensity = 1,
  speed = 0.6,
  density = 3.4,
  color1 = "#05070c",
  color2 = "#1e5ac4",
  color3 = "#93bfff",
}: GustsProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host || reduced) return

    let disposed = false
    let frame: number | null = null
    let teardown: (() => void) | null = null

    const boot = async () => {
      const { Renderer, Program, Mesh, Triangle } = await import("ogl")
      if (disposed || !hostRef.current) return

      const renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio ?? 1, 1.75),
      })

      const gl = renderer.gl
      gl.clearColor(0, 0, 0, 0)

      const geometry = new Triangle(gl)

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        transparent: true,
        depthTest: false,
        uniforms: {
          uResolution: { value: [1, 1] },
          uTime: { value: 0 },
          uIntensity: { value: intensity },
          uSpeed: { value: speed },
          uDensity: { value: density },
          uColor1: { value: hexToRgb(color1) },
          uColor2: { value: hexToRgb(color2) },
          uColor3: { value: hexToRgb(color3) },
        },
      })

      const mesh = new Mesh(gl, { geometry, program })

      const resize = () => {
        const w = host.clientWidth || window.innerWidth
        const h = host.clientHeight || window.innerHeight
        renderer.setSize(w, h)
        program.uniforms.uResolution.value = [
          gl.canvas.width,
          gl.canvas.height,
        ]
      }

      resize()
      host.appendChild(gl.canvas)
      gl.canvas.style.width = "100%"
      gl.canvas.style.height = "100%"
      gl.canvas.style.display = "block"

      let visible = true
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visible = entry.isIntersecting
            if (visible && frame === null) {
              frame = requestAnimationFrame(loop)
            }
          }
        },
        { threshold: 0 },
      )
      io.observe(host)

      const start = performance.now()
      const loop = (now: number) => {
        if (!visible) {
          frame = null
          return
        }
        frame = requestAnimationFrame(loop)
        program.uniforms.uTime.value = (now - start) * 0.001
        renderer.render({ scene: mesh })
      }
      frame = requestAnimationFrame(loop)

      const onResize = () => resize()
      window.addEventListener("resize", onResize)

      teardown = () => {
        io.disconnect()
        window.removeEventListener("resize", onResize)
        if (frame !== null) cancelAnimationFrame(frame)
        if (gl.canvas.parentNode === host) host.removeChild(gl.canvas)
        gl.getExtension("WEBGL_lose_context")?.loseContext()
      }
    }

    boot()

    return () => {
      disposed = true
      teardown?.()
    }
  }, [reduced, intensity, speed, density, color1, color2, color3])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {reduced ? (
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 22%, rgba(77,148,255,0.18), transparent 70%)",
          }}
        />
      ) : null}
    </div>
  )
}
