// ✏️ PARFAITE — Lis les commentaires et modifie uniquement les textes indiqués

export default function Accueil() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

      {/* SECTION HERO */}
      <div className="text-center max-w-2xl">

        {/* ✏️ MODIFIE : Le titre principal de l'application */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenue sur ArchiveNotes
        </h1>

        {/* ✏️ MODIFIE : Une courte description de l'application (1-2 phrases) */}
        <p className="text-gray-500 text-lg mb-8">
          La plateforme officielle d'archivage et de consultation des relevés
          de notes de la Faculté des Sciences de l'Université de Ngaoundéré.
        </p>

        {/* ✏️ MODIFIE : Le texte du bouton si tu veux */}
        <a
          href="/login"
          className="inline-block bg-[#1a1a1a] text-[#D4AF37] font-semibold px-8 py-3 rounded-lg border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1a1a1a] transition-all duration-200 text-lg"
        >
          Se connecter
        </a>
      </div>

      {/* SECTION FONCTIONNALITÉS */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">

        {/* ✏️ MODIFIE : Le titre et la description de chaque carte */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <h3 className="font-bold text-gray-800 mb-2">📋 Consulter ses notes</h3>
          {/* ✏️ MODIFIE : Description de cette fonctionnalité */}
          <p className="text-gray-500 text-sm">
            Les étudiants peuvent consulter leurs relevés de notes par semestre
            à tout moment depuis n'importe quel appareil.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#D4AF37]">
          <h3 className="font-bold text-gray-800 mb-2">✏️ Saisir les notes</h3>
          {/* ✏️ MODIFIE : Description de cette fonctionnalité */}
          <p className="text-gray-500 text-sm">
            Les enseignants saisissent les notes directement sur la plateforme
            pour chaque matière et session d'examen.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <h3 className="font-bold text-gray-800 mb-2">🔔 Recevoir des alertes</h3>
          {/* ✏️ MODIFIE : Description de cette fonctionnalité */}
          <p className="text-gray-500 text-sm">
            Les étudiants reçoivent une notification dès que leurs notes
            sont publiées ou mises à jour.
          </p>
        </div>

      </div>

      {/* ✏️ MODIFIE : Le texte du footer */}
      <p className="mt-16 text-gray-400 text-xs text-center">
        © 2026 Faculté des Sciences — Université de Ngaoundéré. Tous droits réservés.
      </p>

    </div>
  )
}


{/*N'oublies pas d'adapter le style de la page en fonction des couleurs du logo de l'université stp ma U16*/}