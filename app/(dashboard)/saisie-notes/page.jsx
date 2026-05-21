// ✏️ LE 9 Voici la Page de saisie des notes, un exemple que tu vas modifier lis les commentaires ca va te servir

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, CheckCircle } from 'lucide-react'

export default function SaisieNotes() {
  const [etudiants, setEtudiants] = useState([])
  const [matieres, setMatieres] = useState([])
  const [sessions, setSessions] = useState([])
  const [etudiantId, setEtudiantId] = useState('')
  const [matiereId, setMatiereId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [valeur, setValeur] = useState('')
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: ets }, { data: mats }, { data: sess }] = await Promise.all([
        supabase.from('utilisateurs').select('id, nom, prenom, matricule').eq('role', 'etudiant'),
        supabase.from('matieres').select('*'),
        supabase.from('sessions_examens').select('*').eq('statut', 'ouverte'),
      ])
      setEtudiants(ets || [])
      setMatieres(mats || [])
      setSessions(sess || [])
    }
    fetchData()
  }, [])

  const handleSaisie = async () => {
    if (!etudiantId || !matiereId || !sessionId || !valeur) {
      alert('Veuillez remplir tous les champs.')
      return
    }
    if (valeur < 0 || valeur > 20) {
      alert('La note doit être entre 0 et 20.')
      return
    }

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('notes').upsert({
      etudiant_id: etudiantId,
      matiere_id: matiereId,
      session_id: sessionId,
      enseignant_id: user.id,
      valeur: parseFloat(valeur),
    })

    setLoading(false)

    if (!error) {
      setSucces(true)
      setValeur('')
      setTimeout(() => setSucces(false), 3000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* ✏️ MODIFIE : Le titre */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Saisie des Notes
      </h1>

      {/* ✏️ MODIFIE : Le sous-titre */}
      <p className="text-gray-500 text-sm mb-8">
        Sélectionnez un étudiant, une matière et une session pour enregistrer une note.
      </p>

      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-5">

        {/* Étudiant */}
        <div>
          {/* ✏️ MODIFIE : Le label si besoin */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Étudiant
          </label>
          <select
            value={etudiantId}
            onChange={(e) => setEtudiantId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            {/* ✏️ MODIFIE : Le placeholder */}
            <option value="">-- Sélectionner un étudiant --</option>
            {etudiants.map((e) => (
              <option key={e.id} value={e.id}>
                {e.prenom} {e.nom} {e.matricule ? `(${e.matricule})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Matière */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matière
          </label>
          <select
            value={matiereId}
            onChange={(e) => setMatiereId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">-- Sélectionner une matière --</option>
            {matieres.map((m) => (
              <option key={m.id} value={m.id}>
                {m.intitule} — Semestre {m.semestre} ({m.credits} crédits)
              </option>
            ))}
          </select>
        </div>

        {/* Session */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session d'examen
          </label>
          <select
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">-- Sélectionner une session --</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.libelle} — {s.annee_academique}
              </option>
            ))}
          </select>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note (sur 20)
          </label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.25"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            placeholder="Ex: 14.5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Bouton */}
        <button
          onClick={handleSaisie}
          disabled={loading}
          className="w-full bg-[#1a1a1a] text-[#D4AF37] border border-[#D4AF37] font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#1a1a1a] transition disabled:opacity-50"
        >
          <Save size={16} />
          {/* ✏️ MODIFIE : Le texte du bouton */}
          {loading ? 'Enregistrement...' : 'Enregistrer la note'}
        </button>

        {/* Message succès */}
        {succes && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg text-sm">
            <CheckCircle size={16} />
            {/* ✏️ MODIFIE : Le message de succès */}
            Note enregistrée avec succès !
          </div>
        )}

      </div>
    </div>
  )
}