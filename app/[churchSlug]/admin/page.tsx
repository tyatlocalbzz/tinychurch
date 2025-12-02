import { getCurrentUser } from '@/lib/utils/auth'
import { UserMenu } from '@/components/ui/UserMenu'
import { InviteLinks } from '@/components/ui/InviteLinks'

export default async function AdminDashboard({
  params,
}: {
  params: { churchSlug: string }
}) {
  const currentUser = await getCurrentUser()

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {currentUser?.user && <UserMenu userEmail={currentUser.user.email!} />}
        </div>

        {/* Welcome & Invite Links */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Welcome to TinyChurch! 🎉
          </h2>
          <p className="text-blue-800 mb-4">
            Your church is ready! Share these links with your congregation to get started.
          </p>
          <InviteLinks churchSlug={params.churchSlug} />
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Members</h3>
            <p className="text-3xl font-bold text-gray-900">1</p>
            <p className="text-sm text-gray-500 mt-1">You're the first!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Members</h3>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Recent Visitors</h3>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-2">Pending Members</h2>
            <p className="text-gray-500">No pending members yet. Share your invite link!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-2">Recent Visitors</h2>
            <p className="text-gray-500">Visitor tracking coming in Phase 3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-2">Prayer Requests</h2>
            <p className="text-gray-500">Prayer requests coming in Phase 6</p>
          </div>
        </div>
      </div>
    </main>
  )
}
