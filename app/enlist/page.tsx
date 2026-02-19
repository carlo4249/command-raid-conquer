'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EnlistPage() {
  const [formData, setFormData] = useState({
    roblox_username: '',
    discord_username: '',
    age: '',
    play_duration: '',
    rebirths: '',
    previous_factions: '',
    role: '',
    contribution: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const sendDiscordNotification = async (data: typeof formData) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1472052557756235887/tUPsDeFhnwlZbos1aZ-4P3phFjl18L8sRC-V6Q18Ric3-TKGNeX6EwPxDNJDmU8wjKKe'
    
    const embed = {
      title: 'ðŸŽ–ï¸ New Enlistment Application',
      color: 0x3B82F6,
      fields: [
        { name: 'Roblox Username', value: data.roblox_username, inline: true },
        { name: 'Discord', value: data.discord_username, inline: true },
        { name: 'Age', value: data.age, inline: true },
        { name: 'Play Duration', value: data.play_duration, inline: false },
        { name: 'Rebirths', value: data.rebirths, inline: true },
        { name: 'Previous Factions', value: data.previous_factions || 'None', inline: false },
        { name: 'Role', value: data.role, inline: false },
        { name: 'Contribution', value: data.contribution, inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'CRC Enlistment System' }
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      })
      
      if (!response.ok) {
        console.error('Discord webhook failed:', response.status, await response.text())
      }
    } catch (error) {
      console.error('Failed to send Discord notification:', error)
      // Don't throw - we still want the DB save to succeed
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    if (!formData.roblox_username || !formData.discord_username || !formData.age || 
        !formData.play_duration || !formData.rebirths || !formData.role || !formData.contribution) {
      setStatus('error')
      setMessage('Please fill in all required fields')
      return
    }

    const age = parseInt(formData.age)
    if (age < 13) {
      setStatus('error')
      setMessage('You must be at least 13 years old to apply')
      return
    }

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('enlistment_requests')
        .insert([
          {
            roblox_username: formData.roblox_username,
            discord_username: formData.discord_username,
            age: age,
            play_duration: formData.play_duration,
            rebirths: formData.rebirths,
            previous_factions: formData.previous_factions,
            role: formData.role,
            contribution: formData.contribution,
            status: 'pending'
          }
        ])

      if (dbError) {
        console.error('Database error:', dbError)
        throw dbError
      }

      // Send Discord notification (non-blocking)
      sendDiscordNotification(formData).catch(err => {
        console.error('Discord notification failed but form saved:', err)
      })

      setStatus('success')
      setMessage('Application submitted. Staff will review it shortly.')
      setFormData({
        roblox_username: '',
        discord_username: '',
        age: '',
        play_duration: '',
        rebirths: '',
        previous_factions: '',
        role: '',
        contribution: ''
      })
    } catch (error: any) {
      console.error('Error submitting application:', error)
      setStatus('error')
      setMessage(`Failed to submit: ${error.message || 'Please try again'}`)
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
        <div className="tag" style={{ marginBottom: '16px' }}>// ENLISTMENT TERMINAL</div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          Apply to CRC
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
          <div style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</div>
          <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
        </div>
      </div>

      <div className="panel animate-fade-up-d1" style={{ padding: '40px' }}>

        {/* Warning */}
        <div className="alert-warning" style={{ marginBottom: '32px' }}>
          ⚠ NOTICE: This submission is reviewed by CRC staff. Do not include passwords or sensitive credentials.
        </div>

        {/* Progress indicator */}
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
          FORM REF: ENL-{new Date().getFullYear()}
          <span style={{ marginLeft: 'auto', color: 'var(--green)' }}>SECURE CHANNEL</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="field-label">
                Roblox Username <span style={{ color: '#c46060' }}>*</span>
              </label>
              <input
                type="text"
                name="roblox_username"
                value={formData.roblox_username}
                onChange={handleChange}
                className="field-input"
                placeholder="YourRobloxName"
                required
              />
            </div>
            <div>
              <label className="field-label">
                Discord Username <span style={{ color: '#c46060' }}>*</span>
              </label>
              <input
                type="text"
                name="discord_username"
                value={formData.discord_username}
                onChange={handleChange}
                className="field-input"
                placeholder="username"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="field-label">
                Age <span style={{ color: '#c46060' }}>*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="field-input"
                min="13"
                max="99"
                required
              />
            </div>
            <div>
              <label className="field-label">
                Rebirths <span style={{ color: '#c46060' }}>*</span>
              </label>
              <input
                type="text"
                name="rebirths"
                value={formData.rebirths}
                onChange={handleChange}
                className="field-input"
                placeholder='e.g., "48"'
                required
              />
            </div>
          </div>

          <div>
            <label className="field-label">
              How long have you played War Tycoon? <span style={{ color: '#c46060' }}>*</span>
            </label>
            <input
              type="text"
              name="play_duration"
              value={formData.play_duration}
              onChange={handleChange}
              className="field-input"
              placeholder='e.g., "2 years 3 months"'
              required
            />
          </div>

          <div>
            <label className="field-label">Previous Factions Served</label>
            <input
              type="text"
              name="previous_factions"
              value={formData.previous_factions}
              onChange={handleChange}
              className="field-input"
              placeholder='e.g., "Shadow Ops, Iron Brigade" — leave blank if none'
            />
          </div>

          <div>
            <label className="field-label">
              Primary Role / Specialization <span style={{ color: '#c46060' }}>*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="field-input"
              placeholder='e.g., "Engineer, Infantry, Pilot"'
              required
            />
          </div>

          <div>
            <label className="field-label">
              How will you contribute to CRC? <span style={{ color: '#c46060' }}>*</span>
            </label>
            <textarea
              name="contribution"
              value={formData.contribution}
              onChange={handleChange}
              className="field-input"
              rows={5}
              style={{ resize: 'vertical' }}
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
            {status === 'loading' ? '[ TRANSMITTING... ]' : '[ SUBMIT APPLICATION ]'}
          </button>

        </form>
      </div>
    </div>
  )
}
