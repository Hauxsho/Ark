import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { HeroHighlight } from "@/components/ui/hero-highlight"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DSA Roadmap Tracker",
  description: "Track your Data Structures & Algorithms learning progress",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HeroHighlight>
            <Header />
            <main className="min-h-screen">{children}</main>
          </HeroHighlight>
        </ThemeProvider>
      </body>
    </html>
  )
}
