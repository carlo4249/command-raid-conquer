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
    const webhookUrl = 'https://discord.com/api/webhooks/1472052557756235887/tUPsDeFhnwlZbos1aZ-4P3phFjl18L8sRC-V6Q18Ric3-TKGNeX6EwPxDNJDmU8wjKKe'
    
    const embed = {
      title: 'ðŸ¤ New Alliance Request',
      color: 0x10B981, // Green
      fields: [
        { name: 'Faction Name', value: data.faction_name, inline: true },
        { name: 'Faction Size', value: data.faction_size, inline: true },
        { name: 'Discord Invite', value: data.discord_invite, inline: false },
        { name: 'Reason for Alliance', value: data.reason, inline: false },
        { name: 'Representative', value: data.representative, inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'CRC Alliance System' }
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
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
      setMessage('Please fill in all required fields')
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

      // Send Discord notification
      await sendDiscordNotification(formData)

      setStatus('success')
      setMessage('Alliance request submitted. Our leadership will review it and contact you.')
      setFormData({
        faction_name: '',
        discord_invite: '',
        faction_size: '',
        reason: '',
        representative: ''
      })
    } catch (error) {
      console.error('Error submitting alliance request:', error)
      setStatus('error')
      setMessage('Failed to submit request. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-16" style={{ maxWidth: '680px', position: 'relative', zIndex: 10 }}>

      {/* Header */}
      <div className="text-center animate-fade-up" style={{ marginBottom: '40px' }}>
        <div className="tag" style={{ marginBottom: '16px' }}>// DIPLOMATIC CHANNEL</div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          Alliance Request
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
          <div style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</div>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
        </div>
      </div>

      <div className="panel animate-fade-up-d1" style={{ padding: '40px' }}>

        <p style={{ color: 'var(--text)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Interested in forming an alliance with CRC? We accept serious, structured factions
          that are active and have a solid track record. Please be prepared to share details
          about your group.
        </p>

        {/* Warning */}
        <div className="alert-warning" style={{ marginBottom: '32px' }}>
          ⚠ NOTICE: Submission reviewed by CRC leadership. Do not share passwords or sensitive information.
        </div>

        {/* Ref bar */}
        <div className="mono" style={{
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ color: 'var(--gold)' }}>■</span>
          FORM REF: ALY-{new Date().getFullYear()}
          <span style={{ marginLeft: 'auto', color: 'var(--green)' }}>SECURE CHANNEL</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="field-label">
                Faction Name <span style={{ color: '#c46060' }}>*</span>
              </label>
              <input
                type="text"
                name="faction_name"
                value={formData.faction_name}
                onChange={handleChange}
                className="field-input"
                placeholder='e.g., "Iron Wolves"'
                required
              />
            </div>
            <div>
              <label className="field-label">
                Faction Size <span style={{ color: '#c46060' }}>*</span>
              </label>
              <input
                type="text"
                name="faction_size"
                value={formData.faction_size}
                onChange={handleChange}
                className="field-input"
                placeholder='e.g., "150 members"'
                required
              />
            </div>
          </div>

          <div>
            <label className="field-label">
              Discord Server Invite <span style={{ color: '#c46060' }}>*</span>
            </label>
            <input
              type="text"
              name="discord_invite"
              value={formData.discord_invite}
              onChange={handleChange}
              className="field-input"
              placeholder='e.g., "https://discord.gg/yourserver"'
              required
            />
          </div>

          <div>
            <label className="field-label">
              Why do you want to ally with CRC? <span style={{ color: '#c46060' }}>*</span>
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="field-input"
              rows={5}
              style={{ resize: 'vertical' }}
              placeholder='e.g., "Support in raids, shared events, friendly relations"'
              required
            />
          </div>

          <div>
            <label className="field-label">
              Faction Representative <span style={{ color: '#c46060' }}>*</span>
            </label>
            <input
              type="text"
              name="representative"
              value={formData.representative}
              onChange={handleChange}
              className="field-input"
              placeholder='e.g., "@Username#1234 - Faction Commander"'
              required
            />
          </div>

          {message && (
            <div className={status === 'success' ? 'alert-success' : 'alert-error'}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary"
            style={{ width: '100%', fontSize: '1rem', padding: '14px' }}
          >
            {status === 'loading' ? '[ TRANSMITTING... ]' : '[ SUBMIT REQUEST ]'}
          </button>

        </form>
      </div>
    </div>
  )
}
