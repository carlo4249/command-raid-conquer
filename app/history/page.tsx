import { supabase } from '@/lib/supabase'

type HistoryEvent = {
  id: string
  event_date: string
  title: string
  description: string
}

async function getHistory() {
  const { data, error } = await supabase
    .from('clan_history')
    .select('*')
    .order('event_date', { ascending: false })

  if (error) {
    console.error('Error fetching history:', error)
    return []
  }

  return data as HistoryEvent[]
}

export default async function HistoryPage() {
  const events = await getHistory()

  return (
    <div className="container mx-auto px-4 py-16" style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>

      {/* Header */}
      <div className="text-center animate-fade-up" style={{ marginBottom: '48px' }}>
        <div className="tag" style={{ marginBottom: '16px' }}>// OPERATION ARCHIVE</div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          History
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
          <div style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</div>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
        </div>
      </div>

      {events.length > 0 ? (
        <div style={{ position: 'relative' }}>
          {/* Vertical timeline line */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '0',
            bottom: '0',
            width: '1px',
            background: 'linear-gradient(180deg, var(--gold) 0%, var(--border) 60%, transparent 100%)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {events.map((event, i) => (
              <div
                key={event.id}
                className="animate-fade-up"
                style={{
                  paddingLeft: '40px',
                  paddingBottom: '40px',
                  position: 'relative',
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '4px',
                  width: '11px',
                  height: '11px',
                  background: i === 0 ? 'var(--gold)' : 'var(--bg)',
                  border: '1px solid var(--gold)',
                  transform: 'rotate(45deg)',
                }}/>

                {/* Date chip */}
                <div className="mono" style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: 'var(--gold)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>⬡</span>
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }).toUpperCase()}
                </div>

                {/* Card */}
                <div
                  style={{
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border)',
                    padding: '24px 28px',
                    position: 'relative',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,150,46,0.5)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
                >
                  {/* Corner accent */}
                  <div style={{
                    position: 'absolute', top: -1, left: -1,
                    width: 12, height: 12,
                    borderTop: '2px solid var(--gold)',
                    borderLeft: '2px solid var(--gold)',
                  }}/>

                  <h3 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text-bright)',
                    marginBottom: '10px',
                  }}>
                    {event.title}
                  </h3>
                  <p style={{
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                  }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline end marker */}
          <div style={{ paddingLeft: '40px', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '-4px', top: '0',
              width: '9px', height: '9px',
              background: 'var(--border-dim)',
              borderRadius: '50%',
            }}/>
            <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              — END OF RECORD —
            </span>
          </div>
        </div>
      ) : (
        <div className="panel animate-fade-up-d1" style={{ padding: '80px', textAlign: 'center' }}>
          <div className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '8px' }}>
            [ ARCHIVE EMPTY ]
          </div>
          <div className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.05em', opacity: 0.5 }}>
            No history recorded yet. Operations will be logged here.
          </div>
        </div>
      )}
    </div>
  )
}
