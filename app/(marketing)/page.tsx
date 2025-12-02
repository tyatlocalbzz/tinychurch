export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">TinyChurch</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Church directory and communication tool for small churches
        </p>
        <p className="text-lg text-gray-500 mb-12">
          Designed for solo pastors with zero admin time. Keep your congregation connected.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/signup"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </main>
  )
}
