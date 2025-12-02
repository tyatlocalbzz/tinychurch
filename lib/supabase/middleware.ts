import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes logic
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/signup',
    '/setup',
    '/auth/login',
    '/auth/callback',
    '/auth/auth-code-error',
  ]

  // Check if path is a visitor form (public)
  const isVisitorPath = path.match(/^\/[^/]+\/visitor$/)

  // Check if path is a join form (public)
  const isJoinPath = path.match(/^\/[^/]+\/join$/)

  // Allow public paths and specific public church routes
  if (
    publicPaths.includes(path) ||
    isVisitorPath ||
    isJoinPath ||
    path.startsWith('/_next') ||
    path.startsWith('/api')
  ) {
    return supabaseResponse
  }

  // For all other paths, require authentication
  if (!user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('next', path)
    return NextResponse.redirect(redirectUrl)
  }

  // Check if user is trying to access admin routes
  if (path.match(/^\/[^/]+\/admin/)) {
    // TODO: In future, check if user has admin role
    // For now, allow if authenticated
  }

  return supabaseResponse
}
