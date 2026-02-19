'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/enlist',   label: 'Enlist' },
  { href: '/alliance', label: 'Alliance' },
  { href: '/roster',   label: 'Roster' },
  { href: '/history',  label: 'History' },
]

export default function NavClient() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(4,8,15,0.88)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--blue-bright), transparent)',
      }} />

      <div className="container mx-auto px-6 flex justify-between items-center" style={{ height: '56px' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Hexagon icon */}
          <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'float 4s ease-in-out infinite' }}>
            <polygon
              points="13,1 25,7.5 25,22.5 13,29 1,22.5 1,7.5"
              fill="none"
              stroke="var(--blue-bright)"
              strokeWidth="1.5"
            />
            <polygon
              points="13,6 21,10.5 21,19.5 13,24 5,19.5 5,10.5"
              fill="none"
              stroke="var(--blue)"
              strokeWidth="1"
              opacity="0.5"
            />
            <text
              x="13" y="19"
              textAnchor="middle"
              fill="var(--blue-glow)"
              fontSize="10"
              fontFamily="Rajdhani, sans-serif"
              fontWeight="700"
            >
              CRC
            </text>
          </svg>
          <div>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-bright)',
              lineHeight: 1,
            }}>
              Command Raid Conquer
            </div>
            <div className="mono" style={{ fontSize: '0.52rem', letterSpacing: '0.22em', color: 'var(--blue-glow)', opacity: 0.7 }}>
              WAR TYCOON
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center" style={{ gap: '2px' }}>
          {NAV_LINKS.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  color: active ? '#fff' : 'var(--text)',
                  background: active ? 'var(--blue)' : 'transparent',
                  borderBottom: active ? 'none' : '1px solid transparent',
                  transition: 'color 0.2s, background 0.2s, border-color 0.2s',
                  position: 'relative',
                  clipPath: active ? 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--blue-glow)'
                    el.style.borderBottomColor = 'var(--blue)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--text)'
                    el.style.borderBottomColor = 'transparent'
                  }
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: i === 1 ? '14px' : '20px',
              height: '1.5px',
              background: 'var(--blue-bright)',
              marginLeft: i === 1 ? 'auto' : '0',
              transition: 'transform 0.2s',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-panel)',
          borderTop: '1px solid var(--border)',
          padding: '12px 24px 20px',
          animation: 'fadeDown 0.2s ease both',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: pathname === link.href ? 'var(--blue-glow)' : 'var(--text)',
                padding: '12px 0',
                borderBottom: '1px solid var(--border-dim)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
