import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl

  // Laisser passer la page d'accueil et le login sans vérification
  if (pathname === '/' || pathname === '/login') {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
    '/releves/:path*',
    '/saisie-notes/:path*',
    '/sessions/:path*',
    '/utilisateurs/:path*',
    '/recherche/:path*',
    '/notifications/:path*',
  ],
}