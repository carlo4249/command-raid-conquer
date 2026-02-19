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
      title: 'New Enlistment Application',
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
      footer: { text: 'CRC Enlistment' }
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
      setMessage('Please fill in all required fields.')
      return
    }

    const age = parseInt(formData.age)
    if (age < 13) {
      setStatus('error')
      setMessage('You must be at least 13 years old to apply.')
      return
    }

    try {
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
      setMessage(`Failed to submit: ${error.message || 'Please try again.'}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto px-4 py-16" style={{ maxWidth: '680px', position: 'relative', zIndex: 10 }}>

      <div className="text-center anim-up" style={{ marginBottom: '40px' }}>
        <div className="tag" style={{ marginBottom: '16px' }}>Enlistment</div>
        <h1 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--text-bright)',
        }}>
          Apply to CRC
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, transparent, var(--blue))' }} />
          <div style={{ width: 6, height: 6, background: 'var(--blue-bright)', transform: 'rotate(45deg)' }} />
          <div style={{ width: 48, height: '1px', background: 'linear-gradient(90deg, var(--blue), transparent)' }} />
        </div>
      </div>

      <div className="panel anim-up d1" style={{ padding: '40px' }}>

        <div className="alert-warning" style={{ marginBottom: '28px' }}>
          This form is reviewed by CRC staff. Do not share passwords or sensitive information.
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="field-label">Roblox Username <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" name="roblox_username" value={formData.roblox_username} onChange={handleChange} className="field-input" placeholder="YourRobloxName" required />
            </div>
            <div>
              <label className="field-label">Discord Username <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" name="discord_username" value={formData.discord_username} onChange={handleChange} className="field-input" placeholder="username" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="field-label">Age <span style={{ color: '#f87171' }}>*</span></label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="field-input" min="13" max="99" required />
            </div>
            <div>
              <label className="field-label">Rebirths <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" name="rebirths" value={formData.rebirths} onChange={handleChange} className="field-input" placeholder='e.g., "48"' required />
            </div>
          </div>

          <div>
            <label className="field-label">Time Played in War Tycoon <span style={{ color: '#f87171' }}>*</span></label>
            <input type="text" name="play_duration" value={formData.play_duration} onChange={handleChange} className="field-input" placeholder='e.g., "2 years 3 months"' required />
          </div>

          <div>
            <label className="field-label">Previous Factions</label>
            <input type="text" name="previous_factions" value={formData.previous_factions} onChange={handleChange} className="field-input" placeholder='e.g., "Shadow Ops, Iron Brigade" — leave blank if none' />
          </div>

          <div>
            <label className="field-label">Primary Role <span style={{ color: '#f87171' }}>*</span></label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="field-input" placeholder='e.g., "Engineer, Infantry, Pilot"' required />
          </div>

          <div>
            <label className="field-label">How will you contribute? <span style={{ color: '#f87171' }}>*</span></label>
            <textarea name="contribution" value={formData.contribution} onChange={handleChange} className="field-input" rows={5} style={{ resize: 'vertical' }} required />
          </div>

          {message && (
            <div className={status === 'success' ? 'alert-success' : 'alert-error'}>
              {message}
            </div>
          )}

          <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
          </button>

        </form>
      </div>
    </div>
  )
}
