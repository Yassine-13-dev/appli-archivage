'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Menu, X, LogOut, Bell } from 'lucide-react'

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
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo + Titre */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="font-bold text-gray-800 text-sm leading-tight">
              Archivage des Notes<br />
              <span className="text-xs font-normal text-gray-500">
                Faculté des Sciences
              </span>
            </span>
          </div>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-1">
            {currentLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  pathname === href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Bouton déconnexion desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>

          {/* Menu burger mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
          {currentLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-md text-sm ${
                pathname === href
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  )
}