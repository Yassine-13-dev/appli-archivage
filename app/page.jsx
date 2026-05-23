import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1F3A] flex flex-col">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-yellow-800/20">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-universite.png"
            alt="Logo Université de Ngaoundéré"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-yellow-300 font-bold text-lg">
            ArchiveNotes
          </span>
        </div>
        <span className="text-yellow-200/60 text-sm">
          Faculté des Sciences
        </span>
      </nav>

      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1 text-yellow-300 text-xs tracking-widest uppercase mb-8">
          Université de Ngaoundéré
        </div>

        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Archivage des{' '}
          <span className="text-yellow-400">
            Relevés de Notes
          </span>
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed">
          Plateforme centralisée pour la consultation, la gestion 
          et l'archivage sécurisé des relevés de notes des étudiants 
          de la Faculté des Sciences.
        </p>

        <Link
          href="/login"
          className="bg-yellow-500 hover:bg-yellow-400 text-[#0B1F3A] font-bold px-8 py-3 rounded-lg transition-all duration-200 text-lg"
        >
          Se connecter →
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-4 text-yellow-400/30 text-xs">
        © 2025 Faculté des Sciences — Université de Ngaoundéré
      </footer>

    </main>
  )
}