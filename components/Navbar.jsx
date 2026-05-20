'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Menu, X, LogOut } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const getRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('utilisateurs')
        .select('role')
        .eq('id', user.id)
        .single()

      setRole(profile?.role)
    }
    getRole()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Liens selon le rôle
  const links = {
    admin: [
      { href: '/dashboard', label: 'Tableau de bord' },
      { href: '/sessions', label: 'Sessions' },
      { href: '/utilisateurs', label: 'Utilisateurs' },
      { href: '/recherche', label: 'Recherche' },
    ],
    enseignant: [
      { href: '/saisie-notes', label: 'Saisie des notes' },
      { href: '/recherche', label: 'Recherche' },
    ],
    etudiant: [
      { href: '/releves', label: 'Mes relevés' },
      { href: '/notifications', label: 'Notifications' },
      { href: '/recherche', label: 'Recherche' },
    ],
  }

  const currentLinks = links[role] || []

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">Archivage des Notes</p>
            <p className="text-sm text-slate-500">Faculté des Sciences</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {currentLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                pathname === href
                  ? 'bg-sky-100 text-sky-800 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {role && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              {role}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 px-4 pb-4 pt-3 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-2">
            {currentLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  pathname === href
                    ? 'bg-sky-100 text-sky-800'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}