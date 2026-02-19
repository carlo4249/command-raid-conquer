'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type RosterMember = {
  id: string
  roblox_username: string
  rank: string
  role: string
  joined_at: string
  status: 'active' | 'inactive'
}

const RANK_ORDER = ['Commander', 'Lieutenant', 'Sergeant', 'Corporal', 'Private']

export default function RosterPage() {
  const [members, setMembers] = useState<RosterMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('roster')
          .select('*')
          .order('joined_at', { ascending: false })

        if (error) {
          setError(error.message)
        } else {
          setMembers(data as RosterMember[])
        }
      } catch (err: any) {
        setError(err.message ?? 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const active   = members.filter(m => m.status === 'active')
  const inactive = members.filter(m => m.status === 'inactive')

  const byRank: Record<string, RosterMember[]> = {}
  for (const m of active) {
    const k = m.rank ?? 'Unranked'
    if (!byRank[k]) byRank[k] = []
    byRank[k].push(m)
  }

  const sortedRanks = Object.keys(byRank).sort((a, b) => {
    const ia = RANK_ORDER.indexOf(a)
    const ib = RANK_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })

  return (
    <div className="container mx-auto px-4 py-16" style={{ maxWidth: '900px', position: 'relative', zIndex: 10 }}>

      {/* Header */}
      <div className="text-center anim-up" style={{ marginBottom: '48px' }}>
        <div className="tag" style={{ marginBottom: '16px' }}>Personnel</div>
        <h1 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          Roster
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, transparent, var(--blue))' }} />
          <div style={{ width: 6, height: 6, background: 'var(--blue-bright)', transform: 'rotate(45deg)' }} />
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, var(--blue), transparent)' }} />
        </div>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="panel anim-scale d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '40px', overflow: 'hidden' }}>
          {[
            { label: 'Total', value: members.length },
            { label: 'Active', value: active.length },
            { label: 'Inactive', value: inactive.length },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '22px',
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid var(--border-dim)' : 'none',
            }}>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: '2.2rem',
                color: 'var(--blue-glow)',
                letterSpacing: '0.05em',
              }}>
                {s.value}
              </div>
              <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              height: '80px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-dim)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '-100%',
                width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.05), transparent)',
                animation: `shimmer 1.5s ${i * 0.15}s ease infinite`,
              }} />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="alert-error anim-up">Failed to load roster: {error}</div>
      )}

      {/* Empty */}
      {!loading && !error && members.length === 0 && (
        <div className="panel anim-scale" style={{ padding: '72px', textAlign: 'center' }}>
          <div className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
            No members found.
          </div>
        </div>
      )}

      {/* Active members */}
      {!loading && !error && sortedRanks.map((rank, ri) => (
        <div key={rank} style={{ marginBottom: '32px' }}>
          <div className="section-header anim-right" style={{ animationDelay: `${ri * 0.05}s` }}>
            <span className="tag">{rank}</span>
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
              {byRank[rank].length} member{byRank[rank].length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="panel anim-up" style={{ overflow: 'hidden', animationDelay: `${ri * 0.07}s` }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto',
              padding: '10px 20px',
              background: 'rgba(37,99,235,0.05)',
              borderBottom: '1px solid var(--border-dim)',
            }}>
              {['Callsign', 'Role', 'Joined', 'Status'].map(h => (
                <div key={h} className="mono" style={{ fontSize: '0.58rem', color: 'var(--blue-glow)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  {h}
                </div>
              ))}
            </div>

            {byRank[rank].map((member, mi) => (
              <div
                key={member.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr auto',
                  padding: '14px 20px',
                  borderBottom: mi < byRank[rank].length - 1 ? '1px solid var(--border-dim)' : 'none',
                  alignItems: 'center',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.04)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-bright)', letterSpacing: '0.04em' }}>
                  {member.roblox_username}
                </div>
                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text)' }}>
                  {member.role ?? '-'}
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {member.joined_at ? new Date(member.joined_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                </div>
                <span className={member.status === 'active' ? 'badge-active' : 'badge-inactive'}>
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Inactive */}
      {!loading && !error && inactive.length > 0 && (
        <div style={{ marginTop: '40px', opacity: 0.55 }}>
          <div className="section-header anim-right">
            <span className="tag">Inactive</span>
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
              {inactive.length} member{inactive.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="panel anim-up d1" style={{ overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto',
              padding: '10px 20px',
              background: 'rgba(37,99,235,0.02)',
              borderBottom: '1px solid var(--border-dim)',
            }}>
              {['Callsign', 'Role', 'Joined', 'Status'].map(h => (
                <div key={h} className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  {h}
                </div>
              ))}
            </div>
            {inactive.map((member, mi) => (
              <div key={member.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr auto',
                padding: '12px 20px',
                borderBottom: mi < inactive.length - 1 ? '1px solid var(--border-dim)' : 'none',
                alignItems: 'center',
              }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                  {member.roblox_username}
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{member.role ?? '-'}</div>
                <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {member.joined_at ? new Date(member.joined_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                </div>
                <span className="badge-inactive">{member.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
