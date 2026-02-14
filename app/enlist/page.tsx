'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EnlistPage() {
  const [formData, setFormData] = useState({
    roblox_username: '',
    discord_username: '',
    age: '',
    experience: '',
    why_join: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    // Validation
    if (!formData.roblox_username || !formData.discord_username || !formData.age) {
      setStatus('error')
      setMessage('Please fill in all required fields')
      return
    }

    const age = parseInt(formData.age)
    if (age < 13) {
      setStatus('error')
      setMessage('You must be at least 13 years old to enlist')
      return
    }

    try {
      const { error } = await supabase
        .from('enlistment_requests')
        .insert([
          {
            roblox_username: formData.roblox_username,
            discord_username: formData.discord_username,
            age: age,
            experience: formData.experience,
            why_join: formData.why_join,
            status: 'pending'
          }
        ])

      if (error) throw error

      setStatus('success')
      setMessage('Application submitted successfully! We will review your application and contact you on Discord.')
      setFormData({
        roblox_username: '',
        discord_username: '',
        age: '',
        experience: '',
        why_join: ''
      })
    } catch (error) {
      console.error('Error submitting application:', error)
      setStatus('error')
      setMessage('Failed to submit application. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Enlist in Shadow Legion
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-600 mb-6">
          Ready to join our ranks? Fill out the application below. Our recruitment team will review 
          your application and contact you within 24-48 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Roblox Username */}
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

          {/* Discord Username */}
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
              placeholder="username#1234 or @username"
              required
            />
          </div>

          {/* Age */}
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

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Roblox Gaming Experience
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner (0-6 months)</option>
              <option value="intermediate">Intermediate (6 months - 2 years)</option>
              <option value="experienced">Experienced (2+ years)</option>
              <option value="veteran">Veteran (5+ years)</option>
            </select>
          </div>

          {/* Why Join */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Why do you want to join Shadow Legion?
            </label>
            <textarea
              name="why_join"
              value={formData.why_join}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Tell us what interests you about our faction..."
            />
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  )
}
