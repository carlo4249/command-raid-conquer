'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

// ── Types ────────────────────────────────────────────────

type RosterMember = {
  id: string
  roblox_username: string
  rank: string
  role: string
  joined_at: string
  status: 'active' | 'inactive'
}

type HistoryEvent = {
  id: string
  event_date: string
  title: string
  description: string
}

type Tab = 'roster' | 'history'

const RANKS = ['Commander', 'Lieutenant', 'Sergeant', 'Corporal', 'Private']

// ── Helpers ──────────────────────────────────────────────

const emptyMember = (): Omit<RosterMember, 'id'> => ({
  roblox_username: '',
  rank: 'Private',
  role: '',
  joined_at: new Date().toISOString().split('T')[0],
  status: 'active',
})

const emptyEvent = (): Omit<HistoryEvent, 'id'> => ({
  event_date: new Date().toISOString().split('T')[0],
  title: '',
  description: '',
})

// ── Auth gate ────────────────────────────────────────────

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.valid) {
        sessionStorage.setItem('crc_admin_auth', 'true')
        onAuth()
      } else {
        setError('Incorrect password.')
      }
    } catch {
      setError('Request failed. Try again.')
    }

    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-24" style={{ maxWidth: '400px', position: 'relative', zIndex: 10 }}>
      <div className="text-center" style={{ marginBottom: '32px' }}>
        <div className="tag" style={{ marginBottom: '14px' }}>Restricted</div>
        <h1 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: '2.4rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          Admin Access
        </h1>
      </div>

      <div className="panel" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="field-label">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="field-input"
              placeholder="Enter password"
              required
              autoFocus
            />
          </div>
          {error && <div className="alert-error">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '13px' }}>
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Roster section ───────────────────────────────────────

function RosterAdmin() {
  const [members, setMembers] = useState<RosterMember[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyMember())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('roster').select('*').order('joined_at', { ascending: false })
    setMembers((data as RosterMember[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const resetForm = () => {
    setForm(emptyMember())
    setEditingId(null)
    setShowForm(false)
    setMessage('')
  }

  const handleEdit = (m: RosterMember) => {
    setForm({
      roblox_username: m.roblox_username,
      rank: m.rank,
      role: m.role,
      joined_at: m.joined_at ? m.joined_at.split('T')[0] : '',
      status: m.status,
    })
    setEditingId(m.id)
    setShowForm(true)
    setMessage('')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const { error } = editingId
      ? await supabase.from('roster').update(form).eq('id', editingId)
      : await supabase.from('roster').insert(form)

    setSaving(false)

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage(editingId ? 'Member updated.' : 'Member added.')
      resetForm()
      load()
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the roster?`)) return
    await supabase.from('roster').delete().eq('id', id)
    load()
  }

  return (
    <div>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          {members.length} MEMBERS
        </div>
        <button
          className="btn-secondary"
          style={{ fontSize: '0.78rem', padding: '7px 18px', clipPath: 'none' }}
          onClick={() => { setShowForm(v => !v); if (showForm) resetForm() }}
        >
          {showForm ? 'Cancel' : '+ Add Member'}
        </button>
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div className="panel anim-up" style={{ padding: '28px', marginBottom: '24px' }}>
          <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--blue-bright)', letterSpacing: '0.14em', marginBottom: '20px' }}>
            {editingId ? 'EDIT MEMBER' : 'ADD MEMBER'}
          </div>

          <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="field-label">Roblox Username *</label>
              <input type="text" className="field-input" value={form.roblox_username}
                onChange={e => setForm({ ...form, roblox_username: e.target.value })} required />
            </div>
            <div>
              <label className="field-label">Role *</label>
              <input type="text" className="field-input" value={form.role} placeholder="Infantry, Pilot..."
                onChange={e => setForm({ ...form, role: e.target.value })} required />
            </div>
            <div>
              <label className="field-label">Rank</label>
              <select className="field-input" value={form.rank}
                onChange={e => setForm({ ...form, rank: e.target.value })}
                style={{ background: 'rgba(4,8,15,0.9)', color: 'var(--text-bright)', cursor: 'pointer' }}>
                {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Status</label>
              <select className="field-input" value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}
                style={{ background: 'rgba(4,8,15,0.9)', color: 'var(--text-bright)', cursor: 'pointer' }}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="field-label">Join Date</label>
              <input type="date" className="field-input" value={form.joined_at}
                onChange={e => setForm({ ...form, joined_at: e.target.value })} />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '10px 28px', fontSize: '0.88rem' }}>
                {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary"
                style={{ padding: '9px 20px', fontSize: '0.88rem', clipPath: 'none' }}>
                Cancel
              </button>
              {message && <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--blue-glow)' }}>{message}</span>}
            </div>
          </form>
        </div>
      )}

      {/* Members table */}
      {loading ? (
        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '24px 0' }}>Loading...</div>
      ) : (
        <div className="panel" style={{ overflow: 'hidden' }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            padding: '10px 16px',
            background: 'rgba(37,99,235,0.05)',
            borderBottom: '1px solid var(--border-dim)',
          }}>
            {['Callsign', 'Rank', 'Role', 'Status', ''].map((h, i) => (
              <div key={i} className="mono" style={{ fontSize: '0.55rem', color: 'var(--blue-glow)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {h}
              </div>
            ))}
          </div>

          {members.length === 0 ? (
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '24px 16px' }}>
              No members yet.
            </div>
          ) : (
            members.map((m, i) => (
              <div
                key={m.id}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                  padding: '12px 16px',
                  borderBottom: i < members.length - 1 ? '1px solid var(--border-dim)' : 'none',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'var(--text-bright)' }}>
                  {m.roblox_username}
                </div>
                <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text)' }}>{m.rank}</div>
                <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text)' }}>{m.role || '-'}</div>
                <span className={m.status === 'active' ? 'badge-active' : 'badge-inactive'}>{m.status}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(m)}
                    className="mono"
                    style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--blue-glow)', fontSize: '0.55rem', letterSpacing: '0.1em', padding: '4px 10px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.roblox_username)}
                    className="mono"
                    style={{ background: 'none', border: '1px solid rgba(220,38,38,0.3)', color: '#f87171', fontSize: '0.55rem', letterSpacing: '0.1em', padding: '4px 10px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  >
                    DEL
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ── History section ──────────────────────────────────────

function HistoryAdmin() {
  const [events, setEvents] = useState<HistoryEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyEvent())
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('clan_history').select('*').order('event_date', { ascending: false })
    setEvents((data as HistoryEvent[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const { error } = await supabase.from('clan_history').insert(form)
    setSaving(false)

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Event added.')
      setForm(emptyEvent())
      setShowForm(false)
      load()
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    await supabase.from('clan_history').delete().eq('id', id)
    load()
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          {events.length} EVENTS
        </div>
        <button
          className="btn-secondary"
          style={{ fontSize: '0.78rem', padding: '7px 18px', clipPath: 'none' }}
          onClick={() => { setShowForm(v => !v); setMessage('') }}
        >
          {showForm ? 'Cancel' : '+ Add Event'}
        </button>
      </div>

      {showForm && (
        <div className="panel anim-up" style={{ padding: '28px', marginBottom: '24px' }}>
          <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--blue-bright)', letterSpacing: '0.14em', marginBottom: '20px' }}>
            ADD EVENT
          </div>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              <div>
                <label className="field-label">Date *</label>
                <input type="date" className="field-input" value={form.event_date}
                  onChange={e => setForm({ ...form, event_date: e.target.value })} required />
              </div>
              <div>
                <label className="field-label">Title *</label>
                <input type="text" className="field-input" value={form.title} placeholder="Event name"
                  onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="field-label">Description *</label>
              <textarea className="field-input" value={form.description} rows={4}
                style={{ resize: 'vertical' }} placeholder="What happened..."
                onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '10px 28px', fontSize: '0.88rem' }}>
                {saving ? 'Saving...' : 'Add Event'}
              </button>
              {message && <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--blue-glow)' }}>{message}</span>}
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '24px 0' }}>Loading...</div>
      ) : events.length === 0 ? (
        <div className="panel" style={{ padding: '32px', textAlign: 'center' }}>
          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>No events recorded yet.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {events.map(ev => (
            <div
              key={ev.id}
              className="panel"
              style={{ padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
            >
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--blue-glow)', marginBottom: '6px', letterSpacing: '0.12em' }}>
                  {formatDate(ev.event_date)}
                </div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-bright)', marginBottom: '6px' }}>
                  {ev.title}
                </div>
                <p style={{ color: 'var(--text)', fontSize: '0.84rem', lineHeight: 1.65 }}>
                  {ev.description}
                </p>
              </div>
              <button
                onClick={() => handleDelete(ev.id, ev.title)}
                className="mono"
                style={{ background: 'none', border: '1px solid rgba(220,38,38,0.3)', color: '#f87171', fontSize: '0.55rem', letterSpacing: '0.1em', padding: '4px 10px', cursor: 'pointer', flexShrink: 0 }}
              >
                DEL
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main admin page ──────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('roster')

  useEffect(() => {
    if (sessionStorage.getItem('crc_admin_auth') === 'true') setAuthed(true)
  }, [])

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />

  return (
    <div className="container mx-auto px-4 py-16" style={{ maxWidth: '960px', position: 'relative', zIndex: 10 }}>

      {/* Header */}
      <div className="anim-up" style={{ marginBottom: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="tag" style={{ marginBottom: '12px' }}>Restricted</div>
          <h1 style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-bright)',
          }}>
            Admin Panel
          </h1>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem('crc_admin_auth'); setAuthed(false) }}
          className="mono"
          style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.6rem', letterSpacing: '0.12em', padding: '6px 14px', cursor: 'pointer' }}
        >
          SIGN OUT
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', borderBottom: '1px solid var(--border)' }}>
        {(['roster', 'history'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 20px',
              color: tab === t ? 'var(--text-bright)' : 'var(--text-muted)',
              borderBottom: tab === t ? '2px solid var(--blue-bright)' : '2px solid transparent',
              transition: 'color 0.2s',
              marginBottom: '-1px',
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'roster' ? <RosterAdmin /> : <HistoryAdmin />}
    </div>
  )
}
