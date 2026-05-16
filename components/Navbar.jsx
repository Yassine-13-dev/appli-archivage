'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

// Liens par rôle
const NAV_LINKS = {
  admin: [
    { href: '/dashboard',       label: 'Tableau de bord' },
    { href: '/releves',         label: 'Relevés' },
    { href: '/saisie-notes',    label: 'Saisie notes' },
    { href: '/sessions',        label: 'Sessions' },
    { href: '/utilisateurs',    label: 'Utilisateurs' },
    { href: '/recherche',       label: 'Recherche' },
    { href: '/notifications',   label: 'Notifications' },
  ],
  professeur: [
    { href: '/dashboard',       label: 'Tableau de bord' },
    { href: '/saisie-notes',    label: 'Saisie notes' },
    { href: '/releves',         label: 'Relevés' },
    { href: '/notifications',   label: 'Notifications' },
  ],
  etudiant: [
    { href: '/dashboard',       label: 'Tableau de bord' },
    { href: '/releves',         label: 'Mes relevés' },
    { href: '/recherche',       label: 'Recherche' },
    { href: '/notifications',   label: 'Notifications' },
  ],
}

export default function Navbar({ user, role }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const links = NAV_LINKS[role] ?? []

  async function handleLogout() {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
          <span className="bg-blue-600 text-white rounded-md px-2 py-0.5 text-sm font-bold tracking-wide">AN</span>
          <span className="hidden sm:inline">ArchiveNotes</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right side: user info + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900 leading-none">
              {user?.email ?? '—'}
            </span>
            <span className="text-xs text-gray-400 capitalize mt-0.5">{role}</span>
          </div>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="text-sm text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-md px-3 py-1.5 transition-colors disabled:opacity-50"
          >
            {loading ? 'Déconnexion…' : 'Déconnexion'}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden pb-3 pt-1 flex flex-col gap-1 border-t border-gray-100">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-md text-sm ${
                  active ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
