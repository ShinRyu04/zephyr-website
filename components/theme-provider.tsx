"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const THEME_BOOTSTRAP = `(function(){try{var s=localStorage.getItem("zephyr-theme");var m=window.matchMedia("(prefers-color-scheme: light)").matches;var t=s!=="light"&&s!=="dark"?(m?"light":"dark"):s;document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.dataset.theme=t}catch(e){}})()`

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const stored = localStorage.getItem("zephyr-theme")
    if (stored === "light" || stored === "dark") {
      setTheme(stored)
      return
    }
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches
    setTheme(prefersLight ? "light" : "dark")
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.dataset.theme = theme
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark"
      try {
        localStorage.setItem("zephyr-theme", next)
      } catch {}
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }
  return ctx
}
