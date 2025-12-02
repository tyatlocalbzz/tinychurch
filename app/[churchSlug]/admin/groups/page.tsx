export default function AdminGroupsPage({
  params,
}: {
  params: { churchSlug: string }
}) {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Groups</h1>
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-500">Group management coming in Phase 4</p>
      </div>
    </main>
  )
}
