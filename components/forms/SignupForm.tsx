'use client'

import { useState } from 'react'
import { signupChurch } from '@/lib/actions/church'

export function SignupForm() {
  const [formData, setFormData] = useState({
    churchName: '',
    pastorEmail: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const result = await signupChurch(formData.churchName, formData.pastorEmail)

      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({
          type: 'success',
          text: 'Check your email for a magic link to continue setup!'
        })
        setFormData({ churchName: '', pastorEmail: '' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border">
      <div className="mb-6">
        <label htmlFor="churchName" className="block text-sm font-medium text-gray-700 mb-2">
          Church Name
        </label>
        <input
          id="churchName"
          name="churchName"
          type="text"
          required
          value={formData.churchName}
          onChange={(e) => setFormData({ ...formData, churchName: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          placeholder="First Baptist Church"
          disabled={isLoading}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="pastorEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Your Email (Pastor/Admin)
        </label>
        <input
          id="pastorEmail"
          name="pastorEmail"
          type="email"
          required
          value={formData.pastorEmail}
          onChange={(e) => setFormData({ ...formData, pastorEmail: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          placeholder="pastor@church.com"
          disabled={isLoading}
        />
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-base"
      >
        {isLoading ? 'Creating...' : 'Get Started'}
      </button>

      <p className="mt-6 text-sm text-gray-500 text-center">
        Already have a church? <a href="/auth/login" className="text-blue-600 hover:text-blue-700">Sign in</a>
      </p>
    </form>
  )
}
