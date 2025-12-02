export default function PrayerPage({
  params,
}: {
  params: { churchSlug: string }
}) {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Submit Prayer Request</h1>
      {/* Prayer request submission will be implemented in Phase 6 */}
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-500">Prayer request form coming soon</p>
      </div>
    </main>
  )
}
