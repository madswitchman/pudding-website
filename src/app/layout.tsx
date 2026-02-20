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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
