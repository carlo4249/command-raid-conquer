'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AlliancePage() {
  const [formData, setFormData] = useState({
    faction_name: '',
    discord_invite: '',
    faction_size: '',
    reason: '',
    representative: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const sendDiscordNotification = async (data: typeof formData) => {
    // Webhook URL lives server-side in DISCORD_WEBHOOK_URL - never exposed to the client
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'alliance', data }),
      })
    } catch (error) {
      console.error('Failed to send Discord notification:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    if (!formData.faction_name || !formData.discord_invite || !formData.faction_size ||
        !formData.reason || !formData.representative) {
      setStatus('error')
      setMessage('Please fill in all required fields.')
      return
    }

    try {
      const { error } = await supabase
        .from('alliance_requests')
        .insert([
          {
            faction_name: formData.faction_name,
            discord_invite: formData.discord_invite,
            faction_size: formData.faction_size,
            reason: formData.reason,
            representative: formData.representative,
            status: 'pending'
          }
        ])

      if (error) throw error

      sendDiscordNotification(formData).catch(err => {
        console.error('Discord notification failed but form saved:', err)
      })

      setStatus('success')
      setMessage('Request submitted. Our leadership will review it and contact you.')
      setFormData({ faction_name: '', discord_invite: '', faction_size: '', reason: '', representative: '' })
    } catch (error) {
      console.error('Error submitting alliance request:', error)
      setStatus('error')
      setMessage('Failed to submit. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto px-4 py-16" style={{ maxWidth: '680px', position: 'relative', zIndex: 10 }}>

      <div className="text-center anim-up" style={{ marginBottom: '40px' }}>
        <div className="tag" style={{ marginBottom: '16px' }}>Diplomatic</div>
        <h1 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          Alliance Request
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, transparent, var(--blue))' }} />
          <div style={{ width: 6, height: 6, background: 'var(--blue-bright)', transform: 'rotate(45deg)' }} />
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, var(--blue), transparent)' }} />
        </div>
      </div>

      <div className="panel anim-up d1" style={{ padding: '40px' }}>

        <p style={{ color: 'var(--text)', marginBottom: '24px', fontSize: '0.92rem', lineHeight: 1.75 }}>
          We ally with serious, active factions that have a solid track record.
          Fill in the details below and our leadership will be in touch.
        </p>

        <div className="alert-warning" style={{ marginBottom: '28px' }}>
          This form is reviewed by CRC leadership. Do not share passwords or sensitive information.
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="field-label">Faction Name <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" name="faction_name" value={formData.faction_name} onChange={handleChange} className="field-input" placeholder='e.g., "Iron Wolves"' required />
            </div>
            <div>
              <label className="field-label">Faction Size <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" name="faction_size" value={formData.faction_size} onChange={handleChange} className="field-input" placeholder='e.g., "150 members"' required />
            </div>
          </div>

          <div>
            <label className="field-label">Discord Server Invite <span style={{ color: '#f87171' }}>*</span></label>
            <input type="text" name="discord_invite" value={formData.discord_invite} onChange={handleChange} className="field-input" placeholder="https://discord.gg/yourserver" required />
          </div>

          <div>
            <label className="field-label">Why do you want to ally with CRC? <span style={{ color: '#f87171' }}>*</span></label>
            <textarea name="reason" value={formData.reason} onChange={handleChange} className="field-input" rows={5} style={{ resize: 'vertical' }} placeholder='e.g., "Support in raids, shared events, friendly relations"' required />
          </div>

          <div>
            <label className="field-label">Faction Representative <span style={{ color: '#f87171' }}>*</span></label>
            <input type="text" name="representative" value={formData.representative} onChange={handleChange} className="field-input" placeholder='e.g., "@Username - Commander"' required />
          </div>

          {message && (
            <div className={status === 'success' ? 'alert-success' : 'alert-error'}>
              {message}
            </div>
          )}

          <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
            {status === 'loading' ? 'Submitting...' : 'Submit Request'}
          </button>

        </form>
      </div>
    </div>
  )
}
