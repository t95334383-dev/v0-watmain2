"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ThemeContextProps {
  theme: "dark" | "light"
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "dark" | "light" | null
    setTheme(storedTheme || "dark")
  }, [])

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.body.className = newTheme
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
