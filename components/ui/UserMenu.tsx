'use client'

import { signOut } from '@/lib/actions/auth'

export function UserMenu({ userEmail }: { userEmail: string }) {
  async function handleSignOut() {
    await signOut()
    window.location.href = '/'
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">{userEmail}</span>
      <button
        onClick={handleSignOut}
        className="text-sm text-red-600 hover:text-red-700 font-medium"
      >
        Sign Out
      </button>
    </div>
  )
}
