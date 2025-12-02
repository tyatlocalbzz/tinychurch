export default function ChurchDashboard({
  params,
}: {
  params: { churchSlug: string }
}) {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-600">Welcome to {params.churchSlug}</p>
    </main>
  )
}
