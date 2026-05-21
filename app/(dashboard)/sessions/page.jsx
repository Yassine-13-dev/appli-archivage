// ✏️ Le 9 voici la Page sessions d'examens un exemple que tu vas modifier

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Lock, Unlock } from 'lucide-react'

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [libelle, setLibelle] = useState('')
  const [annee, setAnnee] = useState('')
  const [creation, setCreation] = useState(false)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    const { data } = await supabase
      .from('sessions_examens')
      .select('*')
      .order('created_at', { ascending: false })
    setSessions(data || [])
    setLoading(false)
  }

  const creerSession = async () => {
    if (!libelle || !annee) return
    await supabase.from('sessions_examens').insert({
      libelle,
      annee_academique: annee,
      statut: 'ouverte',
    })
    setLibelle('')
    setAnnee('')
    setCreation(false)
    fetchSessions()
  }

  const toggleStatut = async (id, statut) => {
    const nouveau = statut === 'ouverte' ? 'cloturee' : 'ouverte'
    await supabase.from('sessions_examens').update({ statut: nouveau }).eq('id', id)
    setSessions(prev =>
      prev.map(s => s.id === id ? { ...s, statut: nouveau } : s)
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          {/* ✏️ MODIFIE : Le titre */}
          <h1 className="text-2xl font-bold text-gray-800">Sessions d'examens</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gérez les sessions d'examens et leur statut.
          </p>
        </div>
        <button
          onClick={() => setCreation(!creation)}
          className="flex items-center gap-2 bg-[#1a1a1a] text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#D4AF37] hover:text-[#1a1a1a] transition"
        >
          <Plus size={16} />
          Nouvelle session
        </button>
      </div>

      {/* Formulaire création */}
      {creation && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col gap-4">
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            placeholder="Ex: Session Normale Semestre 1"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
          <input
            type="text"
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            placeholder="Année académique — Ex: 2025-2026"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
          <button
            onClick={creerSession}
            className="bg-[#1a1a1a] text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#1a1a1a] transition"
          >
            Créer la session
          </button>
        </div>
      )}

      {/* Liste sessions */}
      {loading ? (
        <p className="text-gray-400 text-sm">Chargement...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center border border-gray-100"
            >
              <div>
                <p className="font-semibold text-gray-800">{s.libelle}</p>
                <p className="text-sm text-gray-500 mt-0.5">{s.annee_academique}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  s.statut === 'ouverte'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {s.statut === 'ouverte' ? 'Ouverte' : 'Clôturée'}
                </span>
                <button
                  onClick={() => toggleStatut(s.id, s.statut)}
                  className="text-gray-500 hover:text-[#D4AF37] transition"
                  title={s.statut === 'ouverte' ? 'Clôturer' : 'Réouvrir'}
                >
                  {s.statut === 'ouverte' ? <Lock size={18} /> : <Unlock size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}