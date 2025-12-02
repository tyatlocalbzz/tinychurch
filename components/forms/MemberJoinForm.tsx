'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { joinChurch } from '@/lib/actions/church'

interface Props {
  churchSlug: string
  churchId: string
}

interface FamilyMember {
  id: string
  name: string
  email: string
  phone: string
}

export function MemberJoinForm({ churchSlug, churchId }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Household info
  const [householdName, setHouseholdName] = useState('')
  const [address, setAddress] = useState('')

  // Family members
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: crypto.randomUUID(), name: '', email: '', phone: '' }
  ])

  function addFamilyMember() {
    setFamilyMembers([
      ...familyMembers,
      { id: crypto.randomUUID(), name: '', email: '', phone: '' }
    ])
  }

  function removeFamilyMember(id: string) {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter(member => member.id !== id))
    }
  }

  function updateFamilyMember(id: string, field: keyof FamilyMember, value: string) {
    setFamilyMembers(familyMembers.map(member =>
      member.id === id ? { ...member, [field]: value } : member
    ))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate at least one member has a name
    const validMembers = familyMembers.filter(m => m.name.trim())
    if (validMembers.length === 0) {
      setError('Please add at least one family member')
      setIsLoading(false)
      return
    }

    try {
      const result = await joinChurch(churchId, {
        householdName: householdName || validMembers[0].name.split(' ')[0] + ' Family',
        address,
        members: validMembers.map(m => ({
          name: m.name,
          email: m.email || undefined,
          phone: m.phone || undefined,
        }))
      })

      if (result.error) {
        setError(result.error)
      } else {
        // Redirect to pending page
        router.push(`/${churchSlug}/pending`)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border">
      {/* Household Information */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Household Information</h3>

        <div className="mb-4">
          <label htmlFor="householdName" className="block text-sm font-medium text-gray-700 mb-2">
            Household Name <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            id="householdName"
            name="householdName"
            type="text"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Smith Family"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave blank to auto-generate from first member's name
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123 Main St, City, State ZIP"
            rows={2}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Family Members */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Family Members</h3>
          <button
            type="button"
            onClick={addFamilyMember}
            className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
            disabled={isLoading}
          >
            + Add Member
          </button>
        </div>

        <div className="space-y-6">
          {familyMembers.map((member, index) => (
            <div key={member.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-700">Member {index + 1}</h4>
                {familyMembers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFamilyMember(member.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={member.name}
                    onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Smith"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateFamilyMember(member.id, 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={member.phone}
                    onChange={(e) => updateFamilyMember(member.id, 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-base"
      >
        {isLoading ? 'Submitting...' : 'Submit Registration'}
      </button>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>What happens next:</strong>
        </p>
        <ul className="mt-2 text-sm text-blue-800 space-y-1">
          <li>• Your registration will be reviewed by church admin</li>
          <li>• You'll receive an email once approved</li>
          <li>• Then you can access the member directory</li>
        </ul>
      </div>
    </form>
  )
}
