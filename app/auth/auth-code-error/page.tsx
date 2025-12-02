export default function AuthCodeError() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Authentication Error</h1>
        <p className="text-gray-600 mb-8">
          There was a problem signing you in. This could happen if:
        </p>
        <ul className="text-left text-gray-600 mb-8 space-y-2">
          <li>• The magic link has expired</li>
          <li>• The link has already been used</li>
          <li>• There was a network issue</li>
        </ul>
        <a
          href="/auth/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Try Again
        </a>
      </div>
    </main>
  )
}
