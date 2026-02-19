import Link from 'next/link'

export default async function Home() {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background radial glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(61,92,48,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Corner decorations */}
        <div style={{
          position: 'absolute', top: 32, left: 32,
          width: 60, height: 60,
          borderTop: '1px solid var(--border)',
          borderLeft: '1px solid var(--border)',
        }} />
        <div style={{
          position: 'absolute', top: 32, right: 32,
          width: 60, height: 60,
          borderTop: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
        }} />
        <div style={{
          position: 'absolute', bottom: 32, left: 32,
          width: 60, height: 60,
          borderBottom: '1px solid var(--border)',
          borderLeft: '1px solid var(--border)',
        }} />
        <div style={{
          position: 'absolute', bottom: 32, right: 32,
          width: 60, height: 60,
          borderBottom: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
        }} />

        {/* Content */}
        <div className="animate-fade-in" style={{ position: 'relative' }}>
          <div className="tag animate-fade-up" style={{ marginBottom: '24px' }}>
            WAR TYCOON // ACTIVE FACTION
          </div>

          <h1
            className="animate-fade-up-d1"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-bright)',
              lineHeight: 0.95,
              marginBottom: '8px',
            }}
          >
            Command
          </h1>
          <h1
            className="animate-fade-up-d2"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              lineHeight: 0.95,
              marginBottom: '8px',
            }}
          >
            Raid
          </h1>
          <h1
            className="animate-fade-up-d3"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-bright)',
              lineHeight: 0.95,
              marginBottom: '32px',
            }}
          >
            Conquer
          </h1>

          <p
            className="animate-fade-up-d4"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              maxWidth: '480px',
              margin: '0 auto 40px',
            }}
          >
            ELITE COMPETITIVE FACTION — COORDINATED TACTICS — PROVEN RESULTS
          </p>

          <div className="animate-fade-up-d5 flex justify-center gap-4 flex-wrap">
            <Link href="/enlist" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              ⬡ Enlist Now
            </Link>
            <Link href="/roster" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              View Roster
            </Link>
          </div>
        </div>

        {/* Bottom separator */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
          <div style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</div>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-panel)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '24px',
        }}
      >
        <div
          className="container mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0',
          }}
        >
          {[
            { value: 'ACTIVE', label: 'Status' },
            { value: 'DAILY', label: 'Operations' },
            { value: 'ELITE', label: 'Tier' },
            { value: 'OPEN', label: 'Recruiting' },
          ].map((stat, i) => (
            <div
              key={i}
              className="animate-fade-up"
              style={{
                textAlign: 'center',
                padding: '16px',
                borderRight: i < 3 ? '1px solid var(--border-dim)' : 'none',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '1.6rem',
                letterSpacing: '0.1em',
                color: 'var(--gold)',
              }}>
                {stat.value}
              </div>
              <div className="mono" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-20">
        <div className="section-header animate-fade-up">
          <span className="tag">// ABOUT</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div className="panel animate-fade-up-d1" style={{ padding: '32px' }}>
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '12px' }}>
              DIRECTIVE 01 // OVERVIEW
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>About CRC</h2>
            <p style={{ color: 'var(--text)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              CRC is a War Tycoon faction focused on coordinated gameplay and tactical combat.
              We prioritize skill development and teamwork.
            </p>
          </div>

          <div className="panel animate-fade-up-d2" style={{ padding: '32px' }}>
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '12px' }}>
              DIRECTIVE 02 // STANDARDS
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Expectations</h2>
            <p style={{ color: 'var(--text)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Members are expected to participate in operations, communicate effectively, and
              contribute to the faction&apos;s success on every deployment.
            </p>
          </div>
        </div>
      </section>

      {/* ── Requirements ───────────────────────────────────────── */}
      <section className="container mx-auto px-6 pb-24">
        <div className="section-header animate-fade-up">
          <span className="tag">// ENLISTMENT REQUIREMENTS</span>
        </div>

        <div className="panel animate-fade-up-d1" style={{ padding: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {[
              { id: '01', text: 'Active in War Tycoon' },
              { id: '02', text: 'Decent game knowledge' },
              { id: '03', text: 'Willingness to listen and improve' },
              { id: '04', text: 'Seasoned player' },
              { id: '05', text: 'Complete daily challenges' },
            ].map((req) => (
              <div
                key={req.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-dim)',
                }}
              >
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.7rem',
                  color: 'var(--gold)',
                  opacity: 0.6,
                  minWidth: '24px',
                }}>
                  {req.id}
                </span>
                <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{req.text}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(184,150,46,0.06)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--gold)',
            padding: '24px',
          }}>
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '8px' }}>
              APPLICATION PROCESS
            </div>
            <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Staff will review your application and contact you if you meet our requirements.
              Accepted applicants complete a combat test before joining.
            </p>
            <div style={{ marginTop: '20px' }}>
              <Link href="/enlist" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.85rem' }}>
                Submit Application
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
