import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  // Si non connecté et tente d'accéder à une page protégée
  if (!session && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Si déjà connecté et tente d'accéder au login
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/releves/:path*',
    '/saisie-notes/:path*',
    '/sessions/:path*',
    '/utilisateurs/:path*',
    '/recherche/:path*',
    '/notifications/:path*',
    '/login',
  ],
}