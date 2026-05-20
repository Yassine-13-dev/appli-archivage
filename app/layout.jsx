import './globals.css'

export const metadata = {
  title: 'Archivage des Notes — Faculté des Sciences',
  description: 'Application de gestion des relevés de notes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}