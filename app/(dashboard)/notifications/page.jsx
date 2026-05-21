// ✏️ MODESTE — Lis les commentaires et modifie uniquement les textes indiqués

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Bell, BellOff } from 'lucide-react'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('etudiant_id', user.id)
        .order('date_envoi', { ascending: false })

      setNotifications(data || [])
      setLoading(false)
    }

    fetchNotifications()
  }, [])

  const marquerCommeLue = async (id) => {
    await supabase
      .from('notifications')
      .update({ lu: true })
      .eq('id', id)

    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, lu: true } : n)
    )
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* ✏️ MODIFIE : Le titre de la page si tu veux */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Mes Notifications
      </h1>

      {/* ✏️ MODIFIE : Le sous-titre */}
      <p className="text-gray-500 text-sm mb-6">
        Retrouvez ici toutes vos alertes et mises à jour concernant vos notes.
      </p>

      {loading ? (
        <p className="text-gray-400 text-sm">Chargement...</p>
      ) : notifications.length === 0 ? (

        // ✏️ MODIFIE : Le message quand il n'y a aucune notification
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <BellOff size={48} className="mb-4" />
          <p className="text-lg font-medium">Aucune notification pour le moment</p>
          <p className="text-sm mt-1">Vous serez alerté dès que vos notes seront publiées.</p>
        </div>

      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 flex items-start justify-between gap-4 transition ${
                notif.lu
                  ? 'border-gray-200 opacity-60'
                  : 'border-[#D4AF37]'
              }`}
            >
              <div className="flex items-start gap-3">
                <Bell
                  size={20}
                  className={notif.lu ? 'text-gray-400' : 'text-[#D4AF37]'}
                />
                <div>
                  <p className={`text-sm ${notif.lu ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.date_envoi).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Bouton marquer comme lue */}
              {!notif.lu && (
                <button
                  onClick={() => marquerCommeLue(notif.id)}
                  // ✏️ MODIFIE : Le texte du bouton si tu veux
                  className="text-xs text-[#D4AF37] border border-[#D4AF37] px-3 py-1 rounded-md hover:bg-[#D4AF37] hover:text-[#1a1a1a] transition whitespace-nowrap"
                >
                  Marquer lue
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


{}
