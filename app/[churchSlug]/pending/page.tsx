import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function PendingPage({
  params,
}: {
  params: { churchSlug: string }
}) {
  // Verify church exists
  const church = await prisma.church.findUnique({
    where: { slug: params.churchSlug },
  })

  if (!church) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg border text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Registration Submitted!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for registering with <strong>{church.name}</strong>
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="font-semibold text-blue-900 mb-3">What's Next?</h2>
            <div className="text-left space-y-3 text-blue-800">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your registration is being reviewed by the church admin</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>You'll receive an email notification once your registration is approved</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>After approval, you'll have access to the member directory and church features</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-600 mb-4">
              This usually takes 1-2 business days. If you have questions, please contact your church admin.
            </p>
            <p className="text-sm text-gray-500">
              You can close this page. We'll email you when you're approved!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
