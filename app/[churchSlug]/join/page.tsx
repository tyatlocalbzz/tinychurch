export default function JoinPage({
  params,
}: {
  params: { churchSlug: string }
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Join Our Church</h1>
        <p className="text-gray-600 mb-8 text-center">
          Fill out the form below to connect with us
        </p>
        {/* Member registration form will be implemented in Phase 2 */}
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-500">Member registration form coming soon</p>
        </div>
      </div>
    </main>
  )
}
