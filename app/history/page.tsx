'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type HistoryEvent = {
  id: string
  event_date: string
  title: string
  description: string
}

export default function HistoryPage() {
  const [events, setEvents] = useState<HistoryEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('clan_history')
          .select('*')
          .order('event_date', { ascending: false })

        if (error) {
          console.error('Supabase error:', error)
          setError(error.message)
        } else {
          setEvents(data as HistoryEvent[])
        }
      } catch (err: any) {
        console.error('Fetch error:', err)
        setError(err.message ?? 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16" style={{ maxWidth: '780px', position: 'relative', zIndex: 10 }}>

      {/* Header */}
      <div className="text-center anim-up" style={{ marginBottom: '56px' }}>
        <div className="tag" style={{ marginBottom: '16px' }}>Archive</div>
        <h1 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          History
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, transparent, var(--blue))' }} />
          <div style={{ width: 6, height: 6, background: 'var(--blue-bright)', transform: 'rotate(45deg)' }} />
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, var(--blue), transparent)' }} />
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              height: '120px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-dim)',
              borderRadius: 0,
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 0, left: '-100%',
                width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.04), transparent)',
                animation: `shimmer 1.5s ${i * 0.2}s ease infinite`,
              }} />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="alert-error anim-up">
          Failed to load history: {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && events.length === 0 && (
        <div className="panel anim-scale" style={{ padding: '72px', textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '1px solid var(--border)', margin: '0 auto 20px', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 12, height: 12, background: 'var(--blue-dim)', transform: 'rotate(-45deg)' }} />
          </div>
          <div className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
            No events recorded yet.
          </div>
        </div>
      )}

      {/* Timeline */}
      {!loading && !error && events.length > 0 && (
        <div style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 0, top: 8, bottom: 0,
            width: '1px',
            background: 'linear-gradient(180deg, var(--blue-bright) 0%, var(--border) 60%, transparent 100%)',
            animation: 'lineGrowV 1.2s ease both',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {events.map((event, i) => (
              <div
                key={event.id}
                className="anim-left"
                style={{
                  paddingLeft: '40px',
                  paddingBottom: '36px',
                  position: 'relative',
                  animationDelay: `${i * 0.09}s`,
                }}
              >
                {/* Diamond marker */}
                <div style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '6px',
                  width: '11px',
                  height: '11px',
                  background: i === 0 ? 'var(--blue-bright)' : 'var(--bg)',
                  border: `1px solid ${i === 0 ? 'var(--blue-bright)' : 'var(--border-hi)'}`,
                  transform: 'rotate(45deg)',
                  boxShadow: i === 0 ? '0 0 10px rgba(59,130,246,0.6)' : 'none',
                }} />

                {/* Date */}
                <div className="mono" style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  color: 'var(--blue-glow)',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                }}>
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                {/* Card */}
                <div
                  style={{
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border)',
                    padding: '22px 26px',
                    position: 'relative',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border-hi)'
                    el.style.boxShadow = '0 0 20px rgba(59,130,246,0.1)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {/* Corner accent */}
                  <div style={{
                    position: 'absolute', top: -1, left: -1,
                    width: 14, height: 14,
                    borderTop: '2px solid var(--blue-bright)',
                    borderLeft: '2px solid var(--blue-bright)',
                  }} />

                  <h3 style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--text-bright)',
                    marginBottom: '8px',
                  }}>
                    {event.title}
                  </h3>
                  <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* End of record */}
          <div style={{ paddingLeft: '40px', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '-3px', top: '3px',
              width: '7px', height: '7px',
              borderRadius: '50%',
              background: 'var(--border)',
            }} />
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
              END OF RECORD
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
