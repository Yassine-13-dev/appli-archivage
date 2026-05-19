import { NextResponse } from 'next/server'

export async function middleware(req) {
  const { pathname } = req.nextUrl

  // Récupérer le cookie de session Supabase
  const token = req.cookies.get('sb-access-token') ||
                req.cookies.getAll().find(c => c.name.includes('auth-token'))

  // Si non connecté et tente d'accéder à une page protégée
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Si déjà connecté et tente d'accéder au login
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
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