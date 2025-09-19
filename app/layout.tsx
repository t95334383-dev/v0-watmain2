import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Wat",
  description: "Crypto Exchange Platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.className} bg-[#0f1419] text-white m-0 p-0 overflow-x-hidden`}>
        <ThemeProvider>
          <div className="min-h-screen bg-[#0f1419]">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
