import { supabase } from '@/lib/supabase'

type RosterMember = {
  id: string
  roblox_username: string
  rank: string
  role: string
  joined_at: string
  status: 'active' | 'inactive'
}

async function getRoster() {
  const { data, error } = await supabase
    .from('roster')
    .select('*')
    .order('joined_at', { ascending: false })

  if (error) {
    console.error('Error fetching roster:', error)
    return []
  }

  return data as RosterMember[]
}

const RANK_ORDER = [
  'Commander',
  'Lieutenant',
  'Sergeant',
  'Corporal',
  'Private',
]

export default async function RosterPage() {
  const members = await getRoster()

  const active   = members.filter(m => m.status === 'active')
  const inactive = members.filter(m => m.status === 'inactive')

  // Group active members by rank
  const byRank: Record<string, RosterMember[]> = {}
  for (const member of active) {
    const key = member.rank ?? 'Unranked'
    if (!byRank[key]) byRank[key] = []
    byRank[key].push(member)
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
      <div className="text-center animate-fade-up" style={{ marginBottom: '48px' }}>
        <div className="tag" style={{ marginBottom: '16px' }}>// PERSONNEL DATABASE</div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          Roster
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
          <div style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</div>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
        </div>
      </div>

      {/* Summary bar */}
      <div
        className="panel animate-fade-up-d1"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginBottom: '40px',
          overflow: 'hidden',
        }}
      >
        {[
          { label: 'Total Personnel', value: members.length },
          { label: 'Active', value: active.length },
          { label: 'Inactive', value: inactive.length },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: '20px',
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid var(--border-dim)' : 'none',
            }}
          >
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2rem',
              color: 'var(--gold)',
              letterSpacing: '0.05em',
            }}>
              {s.value}
            </div>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 ? (
        <div className="panel animate-fade-up-d2" style={{ padding: '60px', textAlign: 'center' }}>
          <div className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            [ NO PERSONNEL DATA — DATABASE EMPTY ]
          </div>
        </div>
      ) : (
        <>
          {/* Active members grouped by rank */}
          {sortedRanks.map((rank, ri) => (
            <div key={rank} style={{ marginBottom: '32px' }}>
              <div className="section-header animate-fade-up" style={{ animationDelay: `${ri * 0.05}s` }}>
                <span className="tag">{rank.toUpperCase()}</span>
                <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {byRank[rank].length} OPERATOR{byRank[rank].length !== 1 ? 'S' : ''}
                </span>
              </div>

              <div className="panel animate-fade-up" style={{ overflow: 'hidden', animationDelay: `${ri * 0.08}s` }}>
                {/* Table header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr auto',
                  padding: '10px 20px',
                  background: 'rgba(184,150,46,0.05)',
                  borderBottom: '1px solid var(--border-dim)',
                }}>
                  {['Callsign', 'Role', 'Joined', 'Status'].map(h => (
                    <div key={h} className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {h}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {byRank[rank].map((member, mi) => (
                  <div
                    key={member.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr auto',
                      padding: '14px 20px',
                      borderBottom: mi < byRank[rank].length - 1 ? '1px solid var(--border-dim)' : 'none',
                      transition: 'background 0.15s',
                      alignItems: 'center',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(184,150,46,0.04)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'var(--text-bright)', letterSpacing: '0.04em' }}>
                      {member.roblox_username}
                    </div>
                    <div className="mono" style={{ fontSize: '0.78rem', color: 'var(--text)' }}>
                      {member.role ?? '—'}
                    </div>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {member.joined_at
                        ? new Date(member.joined_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                        : '—'
                      }
                    </div>
                    <span className={member.status === 'active' ? 'badge-active' : 'badge-inactive'}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Inactive section (collapsed, smaller) */}
          {inactive.length > 0 && (
            <div style={{ marginTop: '48px' }}>
              <div className="section-header animate-fade-up">
                <span className="tag" style={{ opacity: 0.5 }}>INACTIVE PERSONNEL</span>
                <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {inactive.length} OPERATOR{inactive.length !== 1 ? 'S' : ''}
                </span>
              </div>

              <div className="panel animate-fade-up-d1" style={{ overflow: 'hidden', opacity: 0.6 }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr auto',
                  padding: '10px 20px',
                  background: 'rgba(184,150,46,0.03)',
                  borderBottom: '1px solid var(--border-dim)',
                }}>
                  {['Callsign', 'Role', 'Joined', 'Status'].map(h => (
                    <div key={h} className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {h}
                    </div>
                  ))}
                </div>
                {inactive.map((member, mi) => (
                  <div
                    key={member.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr auto',
                      padding: '12px 20px',
                      borderBottom: mi < inactive.length - 1 ? '1px solid var(--border-dim)' : 'none',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                      {member.roblox_username}
                    </div>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {member.role ?? '—'}
                    </div>
                    <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {member.joined_at
                        ? new Date(member.joined_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                        : '—'
                      }
                    </div>
                    <span className="badge-inactive">{member.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
