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
  const [prenom, setPrenom] = useState('')

  useEffect(() => {
    const getRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('utilisateurs')
        .select('role, prenom')
        .eq('id', user.id)
        .single()

      setRole(profile?.role)
      setPrenom(profile?.prenom)
    }
    getRole()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

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

  const roleBadge = {
    admin: { label: 'Administrateur', color: 'bg-red-100 text-red-700' },
    enseignant: { label: 'Enseignant', color: 'bg-yellow-100 text-yellow-700' },
    etudiant: { label: 'Étudiant', color: 'bg-green-100 text-green-700' },
  }

  return (
    <nav className="bg-[#1a1a1a] shadow-lg border-b-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">

          {/* Logo + Titre */}
          <div className="flex items-center gap-3">
            <div className="rounded-full border-2 border-[#D4AF37] p-0.5">
              <Image
                src="/images/logo.png"
                alt="Logo UNgaoundéré"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="leading-tight">
              <p className="text-white font-bold text-sm tracking-wide">
                Archivage des Notes
              </p>
              <p className="text-[#D4AF37] text-xs font-medium">
                Faculté des Sciences — UNgaoundéré
              </p>
            </div>
          </div>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-1">
            {currentLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? 'bg-[#D4AF37] text-[#1a1a1a] font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Profil + Déconnexion */}
          <div className="hidden md:flex items-center gap-3">
            {prenom && (
              <div className="text-right">
                <p className="text-white text-sm font-medium">{prenom}</p>
                {role && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge[role]?.color}`}>
                    {roleBadge[role]?.label}
                  </span>
                )}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1a1a1a] rounded-md transition-all duration-200"
            >
              <LogOut size={15} />
              Déconnexion
            </button>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden text-[#D4AF37]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#D4AF37]/30 bg-[#111111] px-4 py-3 flex flex-col gap-2">
          {currentLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-md text-sm transition ${
                pathname === href
                  ? 'bg-[#D4AF37] text-[#1a1a1a] font-bold'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#D4AF37] border border-[#D4AF37]/50 rounded-md mt-1"
          >
            <LogOut size={15} />
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  )
}