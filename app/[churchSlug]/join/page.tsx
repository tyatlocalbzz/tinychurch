import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MemberJoinForm } from '@/components/forms/MemberJoinForm'

export default async function JoinPage({
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{church.name}</h1>
          <h2 className="text-2xl text-gray-700 mb-4">Join Our Church Family</h2>
          <p className="text-gray-600">
            Welcome! Please fill out this form to join our church directory.
          </p>
        </div>
        <MemberJoinForm churchSlug={params.churchSlug} churchId={church.id} />
      </div>
    </main>
  )
}
