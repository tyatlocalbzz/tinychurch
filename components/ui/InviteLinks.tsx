'use client'

import { useState } from 'react'

interface Props {
  churchSlug: string
}

export function InviteLinks({ churchSlug }: Props) {
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const memberJoinLink = `${baseUrl}/${churchSlug}/join`
  const visitorLink = `${baseUrl}/${churchSlug}/visitor`

  async function copyToClipboard(text: string, linkType: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLink(linkType)
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-4">
      {/* Member Join Link */}
      <div>
        <label className="block text-sm font-medium text-blue-900 mb-2">
          Member Join Link
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={memberJoinLink}
            className="flex-1 px-4 py-2 bg-white border border-blue-300 rounded-lg text-sm font-mono"
          />
          <button
            onClick={() => copyToClipboard(memberJoinLink, 'member')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold whitespace-nowrap"
          >
            {copiedLink === 'member' ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Share this link with people you want to join your church
        </p>
      </div>

      {/* Visitor Link */}
      <div>
        <label className="block text-sm font-medium text-blue-900 mb-2">
          Visitor Form Link
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={visitorLink}
            className="flex-1 px-4 py-2 bg-white border border-blue-300 rounded-lg text-sm font-mono"
          />
          <button
            onClick={() => copyToClipboard(visitorLink, 'visitor')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold whitespace-nowrap"
          >
            {copiedLink === 'visitor' ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          For first-time visitors to leave their contact info
        </p>
      </div>
    </div>
  )
}
