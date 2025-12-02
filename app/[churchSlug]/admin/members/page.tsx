export default function AdminMembersPage({
  params,
}: {
  params: { churchSlug: string }
}) {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Members</h1>
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-500">Member management coming soon</p>
      </div>
    </main>
  )
}
