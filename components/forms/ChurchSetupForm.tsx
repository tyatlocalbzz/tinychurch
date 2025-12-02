'use client'

import { useState, useEffect } from 'react'
import { createChurch, checkSlugAvailability } from '@/lib/actions/church'
import { useRouter } from 'next/navigation'

interface Props {
  churchName: string
  userEmail: string
}

export function ChurchSetupForm({ churchName, userEmail }: Props) {
  const router = useRouter()
  const [slug, setSlug] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Generate initial slug from church name
  useEffect(() => {
    if (churchName && !slug) {
      const initialSlug = churchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setSlug(initialSlug)
    }
  }, [churchName, slug])

  // Check slug availability with debounce
  useEffect(() => {
    if (!slug || slug.length < 3) {
      setIsAvailable(null)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsChecking(true)
      const result = await checkSlugAvailability(slug)
      setIsAvailable(result.available)
      setIsChecking(false)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [slug])

  function handleSlugChange(value: string) {
    // Only allow lowercase letters, numbers, and hyphens
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setSlug(sanitized)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isAvailable) return

    setIsLoading(true)
    setError('')

    try {
      const result = await createChurch(churchName || 'My Church', slug)

      if (result.error) {
        setError(result.error)
      } else if (result.slug) {
        // Redirect to admin dashboard
        router.push(`/${result.slug}/admin`)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border">
      <div className="mb-6">
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
          Church URL
        </label>
        <div className="flex items-center">
          <span className="text-gray-500 text-sm mr-2">tinychurch.app/</span>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="my-church"
            disabled={isLoading}
            minLength={3}
            maxLength={50}
          />
        </div>

        {slug && slug.length >= 3 && (
          <div className="mt-2">
            {isChecking ? (
              <p className="text-sm text-gray-500">Checking availability...</p>
            ) : isAvailable === true ? (
              <p className="text-sm text-green-600">✓ Available!</p>
            ) : isAvailable === false ? (
              <p className="text-sm text-red-600">✗ Already taken</p>
            ) : null}
          </div>
        )}

        <p className="mt-2 text-xs text-gray-500">
          Use lowercase letters, numbers, and hyphens only. Must be at least 3 characters.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !isAvailable || isChecking}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-base"
      >
        {isLoading ? 'Creating Church...' : 'Complete Setup'}
      </button>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>What happens next:</strong>
        </p>
        <ul className="mt-2 text-sm text-blue-800 space-y-1">
          <li>• You'll become the church admin</li>
          <li>• We'll create your member directory</li>
          <li>• You'll get an invite link to share</li>
        </ul>
      </div>
    </form>
  )
}
