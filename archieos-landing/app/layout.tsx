import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DebugProvider } from "@/components/debug/DebugProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ArchieOS",
  description: "The first AI that handles the entire back office.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <DebugProvider>{children}</DebugProvider>
      </body>
    </html>
  )
}
