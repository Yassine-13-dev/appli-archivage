'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Users, BookOpen, ClipboardList, Bell } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    etudiants: 0,
    enseignants: 0,
    sessions: 0,
    notifications: 0,
  })
  const [prenom, setPrenom] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      const { data: profile } = await supabase
        .from('utilisateurs')
        .select('prenom')
        .eq('id', user.id)
        .single()
      setPrenom(profile?.prenom)

      const [
        { count: etudiants },
        { count: enseignants },
        { count: sessions },
        { count: notifications },
      ] = await Promise.all([
        supabase.from('utilisateurs').select('*', { count: 'exact', head: true }).eq('role', 'etudiant'),
        supabase.from('utilisateurs').select('*', { count: 'exact', head: true }).eq('role', 'enseignant'),
        supabase.from('sessions_examens').select('*', { count: 'exact', head: true }),
        supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('lu', false),
      ])

      setStats({ etudiants, enseignants, sessions, notifications })
      setLoading(false)
    }

    fetchStats()
  }, [])

  const cards = [
    {
      label: 'Étudiants inscrits',
      value: stats.etudiants,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      border: 'border-l-4 border-blue-500',
    },
    {
      label: 'Enseignants',
      value: stats.enseignants,
      icon: BookOpen,
      color: 'bg-yellow-50 text-yellow-600',
      border: 'border-l-4 border-yellow-500',
    },
    {
      label: "Sessions d'examens",
      value: stats.sessions,
      icon: ClipboardList,
      color: 'bg-red-50 text-red-600',
      border: 'border-l-4 border-red-500',
    },
    {
      label: 'Notifications non lues',
      value: stats.notifications,
      icon: Bell,
      color: 'bg-green-50 text-green-600',
      border: 'border-l-4 border-green-500',
    },
  ]

  return (
    <div>
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Bonjour, {prenom} vous êtes connecté en tant qu'administrateur dans la plateforme d'archivage des relevés de notes de la Faculté des Sciences de l'Université de Ngaoundéré.
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Voici un résumé de l'activité de la plateforme.
        </p>
      </div>

      {/* Cartes stats */}
      {loading ? (
        <div className="text-gray-400 text-sm">Chargement des données...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map(({ label, value, icon: Icon, color, border }) => (
            <div
              key={label}
              className={`bg-white rounded-xl shadow-sm p-6 ${border} flex items-center gap-4`}
            >
              <div className={`p-3 rounded-full ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{value ?? 0}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions rapides */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/utilisateurs"
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:border-[#D4AF37] hover:shadow-md transition-all duration-200 group"
          >
            <Users size={24} className="text-[#D4AF37] mb-2" />
            <p className="font-semibold text-gray-800 group-hover:text-[#1a1a1a]">
              Gérer les utilisateurs
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Ajouter, modifier ou supprimer des comptes
            </p>
          </Link>
          <Link
            href="/sessions"
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:border-[#D4AF37] hover:shadow-md transition-all duration-200 group"
          >
            <ClipboardList size={24} className="text-[#D4AF37] mb-2" />
            <p className="font-semibold text-gray-800">
              Gérer les sessions
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Créer ou clôturer une session d'examens
            </p>
          </Link>
          <Link
            href="/recherche"
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:border-[#D4AF37] hover:shadow-md transition-all duration-200 group"
          >
            <BookOpen size={24} className="text-[#D4AF37] mb-2" />
            <p className="font-semibold text-gray-800">
              Rechercher un étudiant
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Trouver un relevé par nom ou matricule
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}