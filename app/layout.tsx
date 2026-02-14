import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Command Raid Conquer | Elite War Tycoon Faction',
  description: 'Official website of CRC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-900 text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Shadow Legion</h1>
            <div className="space-x-6">
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
              <Link href="/enlist" className="hover:text-blue-400 transition">Enlist</Link>
              <Link href="/roster" className="hover:text-blue-400 transition">Roster</Link>
              <Link href="/history" className="hover:text-blue-400 transition">History</Link>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
        <footer className="bg-gray-900 text-white text-center p-6">
          <p>&copy; 2026 Command Raid Conquer. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
