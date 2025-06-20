import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { UserSync } from "@/components/user-sync"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PixelPerfect",
  description: "Master your learning journey with comprehensive tracks and articles",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <UserSync />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
