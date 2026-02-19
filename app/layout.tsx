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
        <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
          {children}
        </main>
        <footer style={{
          background: 'var(--bg-panel)',
          borderTop: '1px solid var(--border)',
          padding: '28px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--blue), transparent)', marginBottom: '24px' }} />
          <p className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
            &copy; 2026 COMMAND RAID CONQUER
          </p>
        </footer>
      </body>
    </html>
  )
}
