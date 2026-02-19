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
      className="relative z-50 sticky top-0"
      style={{
        background: 'rgba(8,10,9,0.92)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), var(--green), transparent)' }} />

      <div className="container mx-auto px-6 flex justify-between items-center" style={{ height: '60px' }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
          {/* Tactical icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="var(--gold)" strokeWidth="1.5"/>
            <polygon points="14,6 22,10 22,18 14,22 6,18 6,10" fill="none" stroke="var(--gold)" strokeWidth="0.75" opacity="0.5"/>
            <circle cx="14" cy="14" r="3" fill="var(--gold)" opacity="0.9"/>
          </svg>
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-bright)',
                lineHeight: 1,
              }}
            >
              Command Raid Conquer
            </div>
            <div className="mono" style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', opacity: 0.8 }}>
              WAR TYCOON // ELITE FACTION
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center" style={{ gap: '4px' }}>
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  color: isActive ? '#080a09' : 'var(--text)',
                  background: isActive ? 'var(--gold)' : 'transparent',
                  clipPath: isActive ? 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' : 'none',
                  transition: 'color 0.2s, background 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    ;(e.target as HTMLElement).style.color = 'var(--gold)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    ;(e.target as HTMLElement).style.color = 'var(--text)'
                  }
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/enlist"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '6px 18px',
              color: 'var(--gold)',
              border: '1px solid var(--border)',
              marginLeft: '8px',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => {
              ;(e.target as HTMLElement).style.background = 'rgba(184,150,46,0.1)'
            }}
            onMouseLeave={e => {
              ;(e.target as HTMLElement).style.background = 'transparent'
            }}
          >
            ⬡ Apply
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: i === 1 ? '16px' : '22px',
                height: '2px',
                background: 'var(--gold)',
                transition: 'transform 0.2s',
                marginLeft: i === 1 ? 'auto' : 0,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--bg-panel)',
            borderTop: '1px solid var(--border)',
            padding: '16px 24px',
          }}
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: pathname === link.href ? 'var(--gold)' : 'var(--text)',
                padding: '10px 0',
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
