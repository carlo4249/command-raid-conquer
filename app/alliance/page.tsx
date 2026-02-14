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
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Alliance Request
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-600 mb-6">
          Interested in forming an alliance with CRC? We accept serious, structured factions 
          that are active and have a solid track record. Please be prepared to share details 
          about your group.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            ⚠️ This form will be submitted to our leadership. Do not share passwords or other sensitive information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Faction Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="faction_name"
              value={formData.faction_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='e.g., "Iron Wolves"'
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Discord Server Invite <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="discord_invite"
              value={formData.discord_invite}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='e.g., "https://discord.gg/yourserver"'
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Faction Size <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="faction_size"
              value={formData.faction_size}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='e.g., "150 members"'
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Why do you want to ally with CRC? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder='e.g., "Support in raids, shared events, friendly relations"'
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Who will represent your faction? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="representative"
              value={formData.representative}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='e.g., "@Username#1234 - Faction Commander"'
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
