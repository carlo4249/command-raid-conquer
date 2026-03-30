'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type AppStatus = 'pending' | 'accepted' | 'rejected' | 'waitlisted'

const STATUS_CONFIG: Record<AppStatus, {
  label: string
  color: string
  bg: string
  border: string
  message: string
}> = {
  pending: {
    label: 'Under Review',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.07)',
    border: '#ca8a04',
    message: 'Your application has been received and is being reviewed by CRC staff. This typically takes 2 to 5 days.',
  },
  accepted: {
    label: 'Accepted',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.07)',
    border: '#16a34a',
    message: 'Your application was accepted. Check your Discord DMs for onboarding instructions from CRC staff.',
  },
  rejected: {
    label: 'Not Accepted',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.07)',
    border: '#dc2626',
    message: 'Your application was not successful at this time. You may reapply after 30 days.',
  },
  waitlisted: {
    label: 'Waitlisted',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.07)',
    border: '#2563eb',
    message: 'Your application is on the waitlist. We will reach out when a spot becomes available.',
  },
}

type ApplicationResult = {
  status: AppStatus
  role: string | null
  created_at: string | null
}

export default function StatusPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ApplicationResult | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = username.trim()
    if (!trimmed) return

    setLoading(true)
    setResult(null)
    setNotFound(false)
    setSearched(false)

    const { data, error } = await supabase
      .from('enlistment_requests')
      .select('status, role, created_at')
      .ilike('roblox_username', trimmed)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    setLoading(false)
    setSearched(true)

    if (error || !data) {
      setNotFound(true)
      return
    }

    setResult(data as ApplicationResult)
  }

  const config = result ? STATUS_CONFIG[result.status] : null

  const formatDate = (iso: string | null) => {
    if (!iso) return null
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="container mx-auto px-4 py-16" style={{ maxWidth: '560px', position: 'relative', zIndex: 10 }}>

      {/* Header */}
      <div className="text-center anim-up" style={{ marginBottom: '44px' }}>
        <div className="tag" style={{ marginBottom: '16px' }}>Applications</div>
        <h1 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 4rem)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          Application Status
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, transparent, var(--blue))' }} />
          <div style={{ width: 6, height: 6, background: 'var(--blue-bright)', transform: 'rotate(45deg)' }} />
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, var(--blue), transparent)' }} />
        </div>
      </div>

      {/* Search form */}
      <div className="panel anim-up d1" style={{ padding: '36px' }}>
        <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '24px' }}>
          Enter your Roblox username to check the status of your most recent application.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="field-label">
              Roblox Username <span style={{ color: '#f87171' }}>*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="field-input"
              placeholder="YourRobloxUsername"
              required
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="btn-primary"
            style={{ width: '100%', padding: '13px' }}
          >
            {loading ? 'Searching...' : 'Check Status'}
          </button>
        </form>
      </div>

      {/* Result */}
      {searched && !loading && (
        <div className="anim-scale" style={{ marginTop: '24px' }}>
          {notFound ? (
            <div className="panel" style={{ padding: '32px', textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '10px' }}>
                NO RECORD FOUND
              </div>
              <p style={{ color: 'var(--text)', fontSize: '0.88rem', lineHeight: 1.75 }}>
                No application found for <strong style={{ color: 'var(--text-bright)' }}>{username}</strong>. Double-check the spelling, or{' '}
                <a href="/enlist" style={{ color: 'var(--blue-glow)', textDecoration: 'none' }}>apply now</a> if you have not yet submitted.
              </p>
            </div>
          ) : result && config ? (
            <div style={{
              background: config.bg,
              border: `1px solid ${config.border}`,
              padding: '32px',
              position: 'relative',
            }}>
              {/* Corner accent */}
              <div style={{
                position: 'absolute', top: -1, left: -1,
                width: 14, height: 14,
                borderTop: `2px solid ${config.color}`,
                borderLeft: `2px solid ${config.color}`,
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.14em', marginBottom: '6px' }}>
                    APPLICATION STATUS
                  </div>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    color: config.color,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>
                    {config.label}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '4px' }}>
                    APPLICANT
                  </div>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--text-bright)',
                  }}>
                    {username}
                  </div>
                </div>
              </div>

              {result.role && (
                <div style={{ marginBottom: '12px' }}>
                  <span className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    APPLIED FOR:{' '}
                  </span>
                  <span className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-bright)' }}>
                    {result.role}
                  </span>
                </div>
              )}

              {result.created_at && (
                <div style={{ marginBottom: '16px' }}>
                  <span className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    SUBMITTED:{' '}
                  </span>
                  <span className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-bright)' }}>
                    {formatDate(result.created_at)}
                  </span>
                </div>
              )}

              <p style={{ color: 'var(--text)', fontSize: '0.88rem', lineHeight: 1.75, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                {config.message}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
