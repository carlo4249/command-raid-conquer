import type { Metadata } from 'next'
import './globals.css'
import NavClient from './NavClient'

export const metadata: Metadata = {
  title: 'Command Raid Conquer | Elite War Tycoon Faction',
  description: 'Official website of CRC',
}

// Replace with your actual Discord invite link
const DISCORD_URL = 'https://discord.gg/your-server'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/enlist',   label: 'Enlist' },
  { href: '/alliance', label: 'Alliance' },
  { href: '/roster',   label: 'Roster' },
  { href: '/history',  label: 'History' },
]

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
          padding: '48px 24px 28px',
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Top accent line */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--blue), transparent)',
            marginBottom: '44px',
          }} />

          {/* Footer columns */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto 44px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '36px 48px',
          }}>

            {/* Brand */}
            <div>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-bright)',
                marginBottom: '12px',
              }}>
                CRC
              </div>
              <p className="mono" style={{
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                lineHeight: 1.9,
                letterSpacing: '0.04em',
              }}>
                Elite War Tycoon faction.<br />
                Coordinated tactics.<br />
                Competitive play.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <div className="mono" style={{
                fontSize: '0.57rem',
                color: 'var(--blue-glow)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Navigation
              </div>
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Faction */}
            <div>
              <div className="mono" style={{
                fontSize: '0.57rem',
                color: 'var(--blue-glow)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Faction
              </div>
              <a href="/enlist" className="footer-link">Join CRC</a>
              <a href="/alliance" className="footer-link">Request Alliance</a>
              <a href="/roster" className="footer-link">Active Roster</a>
            </div>

            {/* Connect */}
            <div>
              <div className="mono" style={{
                fontSize: '0.57rem',
                color: 'var(--blue-glow)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Connect
              </div>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Discord
              </a>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            borderTop: '1px solid var(--border-dim)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            <p className="mono" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.14em' }}>
              &copy; 2026 COMMAND RAID CONQUER
            </p>
            <p className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', opacity: 0.45, letterSpacing: '0.1em' }}>
              WAR TYCOON FACTION
            </p>
          </div>

        </footer>
      </body>
    </html>
  )
}
