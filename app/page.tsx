"use client";

import Link from 'next/link'

// Replace with your actual Discord invite link
const DISCORD_URL = 'https://discord.gg/your-server'

export default function Home() {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>

      {/* ── Hero with GIF background ─────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        overflow: 'hidden',
      }}>

        {/* GIF background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}>
          <img
            src="/Untitled_design.gif"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.35,
            }}
          />
          {/* Dark overlay gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(4,8,15,0.55) 0%, rgba(4,8,15,0.2) 40%, rgba(4,8,15,0.7) 80%, rgba(4,8,15,1) 100%)',
          }} />
          {/* Side vignettes */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 100% at 50% 50%, transparent 40%, rgba(4,8,15,0.8) 100%)',
          }} />
          {/* Blue tint overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(37,99,235,0.08) 0%, transparent 70%)',
          }} />
        </div>

        {/* Scanning line animation */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            left: 0, right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)',
            animation: 'sweep 6s ease-in-out infinite',
            animationDelay: '1s',
          }} />
        </div>

        {/* Corner decorations */}
        {[
          { top: 24, left: 24, borderTop: true, borderLeft: true },
          { top: 24, right: 24, borderTop: true, borderRight: true },
          { bottom: 24, left: 24, borderBottom: true, borderLeft: true },
          { bottom: 24, right: 24, borderBottom: true, borderRight: true },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 48,
            height: 48,
            borderTop: pos.borderTop ? '1px solid rgba(59,130,246,0.4)' : 'none',
            borderBottom: pos.borderBottom ? '1px solid rgba(59,130,246,0.4)' : 'none',
            borderLeft: pos.borderLeft ? '1px solid rgba(59,130,246,0.4)' : 'none',
            borderRight: pos.borderRight ? '1px solid rgba(59,130,246,0.4)' : 'none',
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right,
            zIndex: 2,
            animation: 'fadeIn 1.2s ease both',
            animationDelay: `${i * 0.15}s`,
          }} />
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3 }}>

          <div className="tag anim-down" style={{ marginBottom: '32px' }}>
            War Tycoon Faction
          </div>

          <h1
            className="anim-up d1"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 0.92,
              marginBottom: '24px',
            }}
          >
            <span style={{ display: 'block', color: 'var(--text-bright)' }}>Command</span>
            <span className="text-shimmer" style={{ display: 'block', fontSize: 'clamp(4rem, 14vw, 9.5rem)' }}>Raid</span>
            <span style={{ display: 'block', color: 'var(--text-bright)' }}>Conquer</span>
          </h1>

          <p
            className="mono anim-up d4"
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.14em',
              maxWidth: '360px',
              margin: '0 auto 40px',
              lineHeight: 1.8,
            }}
          >
            COORDINATED TACTICS / COMPETITIVE PLAY
          </p>

          <div className="anim-up d5" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/enlist" className="btn-primary">
              Enlist Now
            </Link>
            <Link href="/roster" className="btn-secondary">
              View Roster
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(0deg, var(--bg) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
      </section>

      {/* ── Stats strip ──────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-panel)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '0',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { value: 'ACTIVE', label: 'Status' },
            { value: 'DAILY', label: 'Operations' },
            { value: 'ELITE', label: 'Tier' },
            { value: 'OPEN', label: 'Recruiting' },
          ].map((stat, i) => (
            <div
              key={i}
              className="anim-up"
              style={{
                textAlign: 'center',
                padding: '28px 16px',
                borderRight: i < 3 ? '1px solid var(--border-dim)' : 'none',
                animationDelay: `${i * 0.08}s`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--blue), transparent)',
                transform: 'scaleX(0)',
                transformOrigin: 'center',
                transition: 'transform 0.4s',
              }} className="stat-underline" />
              <div style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: '1.5rem',
                letterSpacing: '0.1em',
                color: 'var(--blue-glow)',
              }}>
                {stat.value}
              </div>
              <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '2px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-20">
        <div className="section-header anim-right">
          <span className="tag">About</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="panel anim-left d1" style={{ padding: '32px' }}>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--blue-bright)', letterSpacing: '0.16em', marginBottom: '12px' }}>
              01 / OVERVIEW
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '14px' }}>Who We Are</h2>
            <p style={{ color: 'var(--text)', lineHeight: 1.75, fontSize: '0.95rem' }}>
              CRC is a War Tycoon faction built around coordinated gameplay and tactical combat.
              We prioritize skill development and teamwork above everything else.
            </p>
          </div>

          <div className="panel anim-right d1" style={{ padding: '32px' }}>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--blue-bright)', letterSpacing: '0.16em', marginBottom: '12px' }}>
              02 / STANDARDS
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '14px' }}>Expectations</h2>
            <p style={{ color: 'var(--text)', lineHeight: 1.75, fontSize: '0.95rem' }}>
              Members participate in operations, communicate effectively, and contribute
              to every deployment. We hold each other accountable.
            </p>
          </div>
        </div>
      </section>

      {/* ── Requirements ─────────────────────────────────── */}
      <section className="container mx-auto px-6 pb-20">
        <div className="section-header anim-right">
          <span className="tag">Requirements</span>
        </div>

        <div className="panel anim-up d1" style={{ padding: '40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            marginBottom: '36px',
          }}>
            {[
              'Active in War Tycoon',
              'Decent game knowledge',
              'Willingness to listen and improve',
              'Seasoned player',
              'Complete daily challenges',
            ].map((req, i) => (
              <div
                key={i}
                className="anim-up"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-dim)',
                  transition: 'border-color 0.25s, background 0.25s',
                  animationDelay: `${i * 0.06}s`,
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border-hi)'
                  el.style.background = 'rgba(37,99,235,0.06)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border-dim)'
                  el.style.background = 'var(--bg-surface)'
                }}
              >
                <span style={{
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: 'var(--blue-bright)',
                  flexShrink: 0,
                  animation: `dotPulse 2s ${i * 0.3}s infinite`,
                }} />
                <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{req}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(37,99,235,0.06)',
            border: '1px solid var(--border)',
            borderLeft: '2px solid var(--blue-bright)',
            padding: '24px',
          }}>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--blue-glow)', letterSpacing: '0.16em', marginBottom: '8px' }}>
              APPLICATION PROCESS
            </div>
            <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Staff will review your application and contact you if you meet our requirements.
              Accepted applicants complete a combat test before joining.
            </p>
            <Link href="/enlist" className="btn-primary" style={{ fontSize: '0.9rem', padding: '10px 24px' }}>
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Discord CTA ───────────────────────────────────── */}
      {/* Inspired by how Cloud9, Team Liquid, etc. always have a prominent community CTA */}
      <section className="container mx-auto px-6 pb-24">
        <div
          className="panel anim-up d1"
          style={{
            padding: '48px 40px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '32px',
            borderLeft: '3px solid var(--blue-bright)',
            background: 'linear-gradient(135deg, var(--bg-panel) 60%, rgba(37,99,235,0.06) 100%)',
          }}
        >
          <div style={{ flex: '1 1 280px' }}>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--blue-bright)', letterSpacing: '0.16em', marginBottom: '14px' }}>
              COMMS CHANNEL
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '14px', letterSpacing: '0.06em' }}>
              Join the Discord
            </h2>
            <p style={{ color: 'var(--text)', fontSize: '0.92rem', lineHeight: 1.75, maxWidth: '480px' }}>
              All operations, raid briefings, and faction coordination happen in our server.
              Active members are expected to stay connected.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.92rem', padding: '12px 32px', textAlign: 'center' }}
            >
              Join Server
            </a>
            <Link
              href="/enlist"
              className="btn-secondary"
              style={{ fontSize: '0.92rem', padding: '11px 32px', textAlign: 'center' }}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
