export default function VisitorPage({
  params,
}: {
  params: { churchSlug: string }
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome!</h1>
        <p className="text-gray-600 mb-8 text-center">
          We're so glad you're here. Let us know how to connect with you.
        </p>
        {/* Visitor form will be implemented in Phase 3 */}
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-500">Visitor form coming soon</p>
        </div>
      </div>
    </main>
  )
}
