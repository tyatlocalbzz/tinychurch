export default function DirectoryPage({
  params,
}: {
  params: { churchSlug: string }
}) {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Member Directory</h1>
      {/* Directory view will be implemented in Phase 2 */}
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-500">Directory coming soon</p>
      </div>
    </main>
  )
}
