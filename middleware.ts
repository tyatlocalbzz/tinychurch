import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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

  // Check if path is a pending status page (public)
  const isPendingPath = path.match(/^\/[^/]+\/pending$/)

  // Allow public paths and specific public church routes
  if (
    publicPaths.includes(path) ||
    isVisitorPath ||
    isJoinPath ||
    isPendingPath ||
    path.startsWith('/_next') ||
    path.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  // For protected routes, check if user has Supabase auth cookie
  const hasAuthCookie = request.cookies.has('sb-access-token') ||
                         request.cookies.has('sb-dcnnwcnwakvrsydipokl-auth-token')

  if (!hasAuthCookie) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('next', path)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
