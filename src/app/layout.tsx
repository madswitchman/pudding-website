import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PUDDING - Provable Unified Data-Driven Intelligent Normative Governance',
  description: 'The open-source compliance and governance framework for agentic AI. The proof is in the PUDDING.',
  keywords: ['AI governance', 'compliance', 'HIPAA', 'SOC 2', 'agentic AI', 'open source'],
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
