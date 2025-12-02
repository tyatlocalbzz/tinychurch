import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Try to check if user is a church admin/member
      try {
        const member = await prisma.member.findFirst({
          where: {
            email: data.user.email,
          },
          include: {
            church: true,
          },
        })

        if (member && member.status === 'approved') {
          // Redirect to their church dashboard
          const redirectUrl = member.role === 'admin'
            ? `/${member.church.slug}/admin`
            : `/${member.church.slug}`

          return NextResponse.redirect(`${origin}${redirectUrl}`)
        }
      } catch (dbError) {
        // Database connection failed (e.g., local development with network issues)
        // Log the error but continue with auth
        console.error('Database lookup failed:', dbError)
        // Auth succeeded but couldn't look up member - redirect to home
      }

      // If not found, not approved, or database error - redirect to home
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
