import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PUDDING - Provable Unified Data-Driven Intelligent Normative Governance',
  description: 'Human-Owned AI Memory with Built-In Data Governance. The proof is in the PUDDING.',
  keywords: ['AI governance', 'human-owned AI memory', 'data governance', 'compliance', 'agentic AI', 'open source'],
  openGraph: {
    title: 'PUDDING - AI Governance Framework',
    description: 'Human-Owned AI Memory with Built-In Data Governance. The proof is in the PUDDING.',
    url: 'https://getpudding.dev',
    siteName: 'PUDDING',
    images: [
      {
        url: 'https://getpudding.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PUDDING - Provable Unified Data-Driven Intelligent Normative Governance',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUDDING - AI Governance Framework',
    description: 'Human-Owned AI Memory with Built-In Data Governance. The proof is in the PUDDING.',
    images: ['https://getpudding.dev/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
