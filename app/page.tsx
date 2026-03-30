'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const DISCORD_URL = 'https://discord.gg/Y4GjEjCtnc'

const GAMES = [
  {
    platform: 'ROBLOX',
    name: 'War Tycoon',
    desc: 'Our founding game. Coordinated raids, faction warfare, and competitive deployments across active servers.',
    status: 'ACTIVE',
    statusColor: '#4ade80',
    statusBg: 'rgba(74,222,128,0.1)',
    href: '/enlist',
    cta: 'Apply Now',
  },
  {
    platform: 'PC',
    name: 'War Thunder',
    desc: 'Ground and air combined-arms combat. CRC is building a squadron for ranked battles and coordinated matches.',
    status: 'COMING SOON',
    statusColor: '#94a3b8',
    statusBg: 'rgba(251,191,36,0.1)',
    href: '/enlist',
  },
  {
    platform: 'JAVA / BEDROCK',
    name: 'Minecraft',
    desc: 'Faction PvP, base building, and territorial control on a dedicated CRC server. Opening soon.',
    status: 'COMING SOON',
    statusColor: '#94a3b8',
    statusBg: 'rgba(148,163,184,0.08)',
    href: '/enlist',
  },
]

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (target === 0) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const tick = () => {
      frame++
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3)
      setValue(Math.round(progress * target))
      if (frame < totalFrames) requestAnimationFrame(tick)
      else setValue(target)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return value
}

export default function Home() {
  const [memberTarget, setMemberTarget] = useState(0)
  const memberCount = useCountUp(memberTarget)

  useEffect(() => {
    supabase
      .from('roster')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .then(({ count }) => { if (count) setMemberTarget(count) })
  }, [])

  const STATS = [
    { value: memberTarget > 0 ? memberCount.toString() : '--', label: 'Members' },
    { value: '3', label: 'Games' },
    { value: 'ACTIVE', label: 'Status' },
    { value: 'OPEN', label: 'Recruiting' },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/Untitled_design.gif"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(4,8,15,0.6) 0%, rgba(4,8,15,0.1) 40%, rgba(4,8,15,0.75) 80%, var(--bg) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 90% at 50% 50%, transparent 40%, rgba(4,8,15,0.85) 100%)',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="tag anim-down" style={{ marginBottom: '28px' }}>
            Multi-Game Faction
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
              marginBottom: '20px',
            }}
          >
            <span style={{ display: 'block', color: 'var(--text-bright)' }}>Command</span>
            <span className="text-shimmer" style={{ display: 'block', fontSize: 'clamp(4rem, 14vw, 9.5rem)' }}>Raid</span>
            <span style={{ display: 'block', color: 'var(--text-bright)' }}>Conquer</span>
          </h1>

          <p
            className="mono anim-up d3"
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.16em',
              maxWidth: '360px',
              margin: '0 auto 36px',
              lineHeight: 1.8,
            }}
          >
            WAR TYCOON &nbsp;/&nbsp; WAR THUNDER &nbsp;/&nbsp; MINECRAFT
          </p>

          <div className="anim-up d4" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/enlist" className="btn-primary">Enlist Now</Link>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">Discord</a>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
          background: 'linear-gradient(0deg, var(--bg) 0%, transparent 100%)',
          zIndex: 1, pointerEvents: 'none',
        }} />
      </section>

      {/* ── Stats strip ──────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-panel)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="anim-up"
              style={{
                textAlign: 'center',
                padding: '24px 12px',
                borderRight: i < 3 ? '1px solid var(--border-dim)' : 'none',
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: '1.6rem',
                letterSpacing: '0.08em',
                color: 'var(--blue-glow)',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {stat.value}
              </div>
              <div className="mono" style={{
                fontSize: '0.55rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Games section ─────────────────────────────────── */}
      <section className="container mx-auto px-6 py-20">
        <div className="section-header anim-right">
          <span className="tag">Our Games</span>
        </div>

        <p className="anim-up d1" style={{
          color: 'var(--text)',
          fontSize: '0.95rem',
          lineHeight: 1.8,
          maxWidth: '540px',
          marginBottom: '28px',
        }}>
          CRC started in War Tycoon and is now expanding across platforms. Same standards, same structure, new theatres of war.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}>
          {GAMES.map((game, i) => (
            <div
              key={i}
              className="panel anim-up"
              style={{ padding: '28px', animationDelay: `${i * 0.08}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--blue-bright)', letterSpacing: '0.16em' }}>
                  {game.platform}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.52rem',
                  letterSpacing: '0.1em',
                  color: game.statusColor,
                  background: game.statusBg,
                  border: `1px solid ${game.statusColor}40`,
                  padding: '2px 8px',
                }}>
                  {game.status}
                </div>
              </div>

              <h2 style={{ fontSize: '1.6rem', marginBottom: '10px', letterSpacing: '0.04em' }}>
                {game.name}
              </h2>

              <p style={{ color: 'var(--text)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '22px' }}>
                {game.desc}
              </p>

              <Link
                href={game.href}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.63rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--blue-glow)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border-hi)',
                  paddingBottom: '2px',
                }}
              >
                {game.cta} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Application CTA ──────────────────────────────── */}
      <section className="container mx-auto px-6 pb-24">
        <div className="panel anim-up d1" style={{
          padding: '44px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '28px',
          borderLeft: '3px solid var(--blue-bright)',
        }}>
          <div style={{ flex: '1 1 260px' }}>
            <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--blue-bright)', letterSpacing: '0.16em', marginBottom: '12px' }}>
              JOIN THE FACTION
            </div>
            <h2 style={{ fontSize: '1.9rem', marginBottom: '10px' }}>Ready to enlist?</h2>
            <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.75 }}>
              Staff review all applications. Accepted candidates complete a combat evaluation before joining the active roster.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
            <Link href="/enlist" className="btn-primary" style={{ padding: '12px 32px' }}>
              Apply Now
            </Link>
            <Link href="/status" className="btn-secondary" style={{ padding: '11px 32px', textAlign: 'center', fontSize: '0.88rem' }}>
              Check Application
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
