import type { Metadata } from 'next'
import './globals.css'
import NavClient from './NavClient'

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
      <body>
        <NavClient />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <footer className="relative z-10 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
          <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="tag">CRC // War Tycoon Faction</span>
            </div>
            <p className="mono text-xs" style={{ color: 'var(--text-muted)' }}>
              &copy; 2026 COMMAND RAID CONQUER — ALL RIGHTS RESERVED
            </p>
            <div className="flex gap-1 items-center">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#7ab369', animation: 'pulse-gold 2s infinite' }} />
              <span className="mono text-xs" style={{ color: 'var(--text-muted)' }}>SYSTEMS ONLINE</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
