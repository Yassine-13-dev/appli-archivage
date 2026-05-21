'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { FileDown, BookOpen } from 'lucide-react'

export default function Releves() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [semestre, setSemestre] = useState('tous')
  const [moyenne, setMoyenne] = useState(0)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('notes')
      .select(`
        *,
        matieres (intitule, credits, coefficient, semestre),
        sessions_examens (libelle, annee_academique)
      `)
      .eq('etudiant_id', user.id)
      .order('created_at', { ascending: false })

    setNotes(data || [])
    calculerMoyenne(data || [])
    setLoading(false)
  }

  const calculerMoyenne = (data) => {
    if (!data || data.length === 0) return
    const total = data.reduce((acc, n) => acc + (n.valeur * (n.matieres?.coefficient || 1)), 0)
    const totalCoeff = data.reduce((acc, n) => acc + (n.matieres?.coefficient || 1), 0)
    setMoyenne((total / totalCoeff).toFixed(2))
  }

  const notesFiltrees = semestre === 'tous'
    ? notes
    : notes.filter(n => n.matieres?.semestre === parseInt(semestre))

  const exportPDF = () => {
    window.print()
  }

  const getBadgeColor = (note) => {
    if (note >= 16) return 'bg-green-100 text-green-700'
    if (note >= 12) return 'bg-blue-100 text-blue-700'
    if (note >= 10) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <div>
      {/* En-tête */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mes Relevés de Notes</h1>
          <p className="text-gray-500 text-sm mt-1">
            Consultez vos notes par semestre et exportez votre relevé.
          </p>
        </div>
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 bg-[#1a1a1a] text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#D4AF37] hover:text-[#1a1a1a] transition"
        >
          <FileDown size={16} />
          Exporter PDF
        </button>
      </div>

      {/* Moyenne générale */}
      {!loading && notes.length > 0 && (
        <div className="bg-[#1a1a1a] text-white rounded-xl p-5 mb-6 flex justify-between items-center">
          <div>
            <p className="text-[#D4AF37] text-sm font-medium">Moyenne Générale</p>
            <p className="text-3xl font-bold mt-1">{moyenne} <span className="text-lg font-normal text-gray-400">/ 20</span></p>
          </div>
          <BookOpen size={40} className="text-[#D4AF37] opacity-50" />
        </div>
      )}

      {/* Filtre semestre */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['tous', '1', '2', '3', '4', '5', '6'].map((s) => (
          <button
            key={s}
            onClick={() => setSemestre(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              semestre === s
                ? 'bg-[#1a1a1a] text-[#D4AF37]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s === 'tous' ? 'Tous' : `Semestre ${s}`}
          </button>
        ))}
      </div>

      {/* Tableau des notes */}
      {loading ? (
        <p className="text-gray-400 text-sm">Chargement de vos notes...</p>
      ) : notesFiltrees.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <BookOpen size={40} className="mx-auto mb-3" />
          <p className="font-medium">Aucune note disponible</p>
          <p className="text-sm mt-1">Vos notes apparaîtront ici dès leur publication.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1a1a] text-[#D4AF37]">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Matière</th>
                <th className="text-left px-6 py-3 font-semibold">Session</th>
                <th className="text-left px-6 py-3 font-semibold">Semestre</th>
                <th className="text-left px-6 py-3 font-semibold">Crédits</th>
                <th className="text-left px-6 py-3 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notesFiltrees.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {n.matieres?.intitule || '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {n.sessions_examens?.libelle || '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    Semestre {n.matieres?.semestre || '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {n.matieres?.credits || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(n.valeur)}`}>
                      {n.valeur} / 20
                    </span>
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