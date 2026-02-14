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
      title: '🎖️ New Enlistment Application',
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
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Apply to CRC
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            ⚠️ This form will be submitted to our staff. Do not share passwords or other sensitive information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Roblox Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="roblox_username"
              value={formData.roblox_username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="YourRobloxName"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Discord Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="discord_username"
              value={formData.discord_username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="username or @username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="13"
              max="99"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              How long have you played War Tycoon? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="play_duration"
              value={formData.play_duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='e.g., "2 years 3 months"'
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              How many rebirths do you have? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="rebirths"
              value={formData.rebirths}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='e.g., "48"'
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Which factions have you served in before?
            </label>
            <input
              type="text"
              name="previous_factions"
              value={formData.previous_factions}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='e.g., "Shadow Ops, Iron Brigade"'
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              What role do you excel at? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='e.g., "Engineer, Infantry, Pilot"'
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              How can you contribute to CRC's success? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="contribution"
              value={formData.contribution}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${
              status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
