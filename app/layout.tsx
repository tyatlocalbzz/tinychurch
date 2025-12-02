import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TinyChurch',
  description: 'Church directory and communication tool for small churches',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
