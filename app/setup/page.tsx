import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { ChurchSetupForm } from '@/components/forms/ChurchSetupForm'

export default async function SetupPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user already has a church
  try {
    const existingMember = await prisma.member.findFirst({
      where: {
        email: user.email,
      },
      include: {
        church: true,
      },
    })

    if (existingMember) {
      // User already has a church, redirect to their dashboard
      const redirectUrl =
        existingMember.role === 'admin'
          ? `/${existingMember.church.slug}/admin`
          : `/${existingMember.church.slug}`
      redirect(redirectUrl)
    }
  } catch (error) {
    console.error('Error checking existing member:', error)
    // Continue to setup if database check fails
  }

  // Get church name from user metadata
  const churchName = user.user_metadata?.church_name || ''

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">Choose Your Church URL</h1>
        <p className="text-gray-600 mb-8 text-center">
          This will be your church's unique web address
        </p>
        <ChurchSetupForm churchName={churchName} userEmail={user.email!} />
      </div>
    </main>
  )
}
