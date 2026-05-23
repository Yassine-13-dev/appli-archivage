// ✏️ JUNIOR — Lis les commentaires et modifie uniquement les textes indiqués

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Edit, UserCheck } from 'lucide-react'

export default function Utilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtre, setFiltre] = useState('tous')

  useEffect(() => {
    fetchUtilisateurs()
  }, [])

  const fetchUtilisateurs = async () => {
    const { data } = await supabase
      .from('utilisateurs')
      .select('*')
      .order('created_at', { ascending: false })

    setUtilisateurs(data || [])
    setLoading(false)
  }

  const supprimerUtilisateur = async (id) => {
    if (!confirm('Confirmer la suppression ?')) return
    await supabase.from('utilisateurs').delete().eq('id', id)
    setUtilisateurs(prev => prev.filter(u => u.id !== id))
  }

  const changerRole = async (id, nouveauRole) => {
    await supabase
      .from('utilisateurs')
      .update({ role: nouveauRole })
      .eq('id', id)

    setUtilisateurs(prev =>
      prev.map(u => u.id === id ? { ...u, role: nouveauRole } : u)
    )
  }

  const roleColors = {
    admin: 'bg-red-100 text-red-700',
    enseignant: 'bg-yellow-100 text-yellow-700',
    etudiant: 'bg-green-100 text-green-700',
  }

  const utilisateursFiltres = filtre === 'tous'
    ? utilisateurs
    : utilisateurs.filter(u => u.role === filtre)

  return (
    <div>

      {/* ✏️ MODIFIE : Le titre de la page */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Gestion des Utilisateurs
      </h1>

      {/* ✏️ MODIFIE : Le sous-titre */}
      <p className="text-gray-500 text-sm mb-6">
        Gérez les comptes étudiants, enseignants et administrateurs.
      </p>

      {/* Filtres par rôle */}
      <div className="flex gap-2 mb-6">
        {/* ✏️ MODIFIE : Les labels des boutons de filtre si besoin */}
        {['tous', 'etudiant', 'enseignant', 'admin'].map((r) => (
          <button
            key={r}
            onClick={() => setFiltre(r)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filtre === r
                ? 'bg-[#1a1a1a] text-[#D4AF37]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {/* ✏️ MODIFIE : Les labels affichés */}
            {r === 'tous' ? 'Tous' :
             r === 'etudiant' ? 'Étudiants' :
             r === 'enseignant' ? 'Enseignants' : 'Admins'}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Chargement...</p>
      ) : utilisateursFiltres.length === 0 ? (

        // ✏️ MODIFIE : Le message quand aucun utilisateur
        <p className="text-gray-400 text-sm text-center py-12">
          Aucun utilisateur trouvé.
        </p>

      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1a1a] text-[#D4AF37]">
              <tr>
                {/* ✏️ MODIFIE : Les en-têtes du tableau si besoin */}
                <th className="text-left px-6 py-3 font-semibold">Nom complet</th>
                <th className="text-left px-6 py-3 font-semibold">Email</th>
                <th className="text-left px-6 py-3 font-semibold">Matricule</th>
                <th className="text-left px-6 py-3 font-semibold">Rôle</th>
                <th className="text-left px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {utilisateursFiltres.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {u.prenom} {u.nom}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{u.email}</td>
                  <td className="px-6 py-4 text-gray-500">{u.matricule || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                      {/* Changer le rôle */}
                      <select
                        value={u.role}
                        onChange={(e) => changerRole(u.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="etudiant">Étudiant</option>
                        <option value="enseignant">Enseignant</option>
                        <option value="admin">Admin</option>
                      </select>

                      {/* Supprimer */}
                      <button
                        onClick={() => supprimerUtilisateur(u.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}