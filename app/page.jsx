import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">

      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="Université de Ngaoundéré" width={52} height={52} className="rounded-full border border-[#D4AF37]" />
          <div className="hidden sm:block">
            <p className="text-white font-bold text-sm">Université de Ngaoundéré</p>
            <p className="text-[#D4AF37] text-xs">Faculté des Sciences</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Image src="/images/fs.png" alt="Faculté des Sciences" width={52} height={52} className="rounded-full border border-[#D4AF37]" />
          <div className="hidden sm:block text-right">
            <p className="text-white font-bold text-sm">Faculté des Sciences</p>
            <p className="text-[#D4AF37] text-xs">Univ-Ndéré</p>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">

        {/* Ligne dorée décorative */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-16 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase">Système de Gestion Académique</span>
          <div className="h-px w-16 bg-[#D4AF37]" />
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
          Archive<span className="text-[#D4AF37]">Notes</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed">
          La plateforme officielle d'archivage et de consultation des relevés
          de notes de la Faculté des Sciences de l'Université de Ngaoundéré.
        </p>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-transparent text-[#D4AF37] font-semibold px-10 py-3 rounded-lg border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1a1a1a] transition-all duration-300 text-lg"
        >
          Se connecter
          <span>→</span>
        </Link>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg w-full">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#D4AF37]">3</p>
            <p className="text-gray-500 text-xs mt-1">Rôles utilisateurs</p>
          </div>
          <div className="text-center border-x border-[#D4AF37]/20">
            <p className="text-3xl font-bold text-[#D4AF37]">100%</p>
            <p className="text-gray-500 text-xs mt-1">Sécurisé</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#D4AF37]">24/7</p>
            <p className="text-gray-500 text-xs mt-1">Disponible</p>
          </div>
        </div>

      </main>

      {/* FONCTIONNALITÉS */}
      <section className="px-8 py-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300">
            <div className="text-2xl mb-3"></div>
            <h3 className="font-bold text-white mb-2">Consulter ses notes</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Accédez à vos relevés par semestre, calculez vos moyennes et exportez en PDF.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300">
            <div className="text-2xl mb-3"></div>
            <h3 className="font-bold text-white mb-2">Saisir les notes</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Les enseignants saisissent les notes par matière et session directement en ligne.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300">
            <div className="text-2xl mb-3"></div>
            <h3 className="font-bold text-white mb-2">Recevoir des alertes</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Soyez notifié dès que vos notes sont publiées ou mises à jour.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D4AF37]/20 px-8 py-4 text-center">
        <p className="text-gray-600 text-xs">
          © 2026 Faculté des Sciences — Université de Ngaoundéré. Tous droits réservés.
        </p>
      </footer>

    </div>
  )
}