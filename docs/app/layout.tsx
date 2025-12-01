import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { Metadata } from 'next'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ArchieOS Docs',
    template: '%s | ArchieOS Docs'
  },
  description: 'Documentation for ArchieOS - AI Operating System for Real Estate Teams'
}

const navbar = (
  <Navbar
    logo={<span style={{ fontWeight: 700 }}>ArchieOS Docs</span>}
  />
)

const footer = (
  <Footer>
    <div className="flex w-full justify-center">
      ArchieOS {new Date().getFullYear()}
    </div>
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/your-org/addis/tree/main/docs/content"
          sidebar={{
            defaultMenuCollapseLevel: 1,
            toggleButton: true
          }}
          toc={{
            backToTop: true
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
