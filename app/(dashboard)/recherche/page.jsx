// ✏️ PAULIN — Lis les commentaires et modifie uniquement les textes indiqués

'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Search } from 'lucide-react'

export default function Recherche() {
  const [query, setQuery] = useState('')
  const [filtre, setFiltre] = useState('nom')
  const [resultats, setResultats] = useState([])
  const [loading, setLoading] = useState(false)
  const [rechercheFaite, setRechercheFaite] = useState(false)

  const handleRecherche = async () => {
    if (!query.trim()) return
    setLoading(true)
    setRechercheFaite(true)

    let queryBuilder = supabase
      .from('utilisateurs')
      .select('id, nom, prenom, email, matricule, filiere, niveau, role')
      .eq('role', 'etudiant')

    if (filtre === 'nom') {
      queryBuilder = queryBuilder.ilike('nom', `%${query}%`)
    } else if (filtre === 'prenom') {
      queryBuilder = queryBuilder.ilike('prenom', `%${query}%`)
    } else if (filtre === 'matricule') {
      queryBuilder = queryBuilder.ilike('matricule', `%${query}%`)
    }

    const { data } = await queryBuilder
    setResultats(data || [])
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">

      {/* ✏️ MODIFIE : Le titre de la page */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Recherche d'étudiants
      </h1>

      {/* ✏️ MODIFIE : Le sous-titre */}
      <p className="text-gray-500 text-sm mb-6">
        Recherchez un étudiant par son nom, prénom ou matricule.
      </p>

      {/* Barre de recherche */}
      <div className="flex gap-3 mb-8">

        {/* Filtre */}
        <select
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
        >
          {/* ✏️ MODIFIE : Les options de filtre si besoin */}
          <option value="nom">Nom</option>
          <option value="prenom">Prénom</option>
          <option value="matricule">Matricule</option>
        </select>

        {/* Champ de recherche */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRecherche()}
          // ✏️ MODIFIE : Le placeholder
          placeholder="Entrez votre recherche..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />

        <button
          onClick={handleRecherche}
          className="bg-[#1a1a1a] text-[#D4AF37] px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#D4AF37] hover:text-[#1a1a1a] border border-[#D4AF37] transition"
        >
          <Search size={16} />
          {/* ✏️ MODIFIE : Le texte du bouton */}
          Rechercher
        </button>
      </div>

      {/* Résultats */}
      {loading ? (
        <p className="text-gray-400 text-sm">Recherche en cours...</p>
      ) : rechercheFaite && resultats.length === 0 ? (

        // ✏️ MODIFIE : Le message quand aucun résultat
        <div className="text-center py-16 text-gray-400">
          <Search size={40} className="mx-auto mb-3" />
          <p className="font-medium">Aucun étudiant trouvé</p>
          <p className="text-sm mt-1">Essayez avec un autre nom ou matricule.</p>
        </div>

      ) : (
        <div className="flex flex-col gap-3">
          {resultats.map((etudiant) => (
            <div
              key={etudiant.id}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:border-[#D4AF37] transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">
                    {etudiant.prenom} {etudiant.nom}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {etudiant.email}
                  </p>
                </div>
                <div className="text-right">
                  {/* ✏️ MODIFIE : Les labels si besoin */}
                  <p className="text-xs text-gray-400">
                    Matricule : <span className="font-medium text-gray-700">{etudiant.matricule || '—'}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Filière : <span className="font-medium text-gray-700">{etudiant.filiere || '—'}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Niveau : <span className="font-medium text-gray-700">{etudiant.niveau || '—'}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
