# ArchiveNotes 📋
### Système d'Archivage des Relevés de Notes — Faculté des Sciences, Université de Ngaoundéré

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styling-blue)

---

## 📖 Description

ArchiveNotes est une application web développée dans le cadre du module **Ingénierie des Applications Web (L3 Informatique)**. Elle permet l'archivage, la consultation et la gestion des relevés de notes des étudiants inscrits à la Faculté des Sciences de l'Université de Ngaoundéré.

---

## 👥 Équipe

| Membre | Rôle | Branche |
|---|---|---|
|Issah Mohamed Yassim | Lead Dev — Auth, Navbar, Dashboard, Architecture | `main` |
| Issa Abdel Aziz | Page Relevés de Notes | `feature/releves` |
| Soh Oumbe Styve | Page Saisie des Notes + Sessions | `feature/saisie-sessions` |
| Yingoum Junior | Page Gestion des Utilisateurs | `feature/utilisateurs` |
| Gonba Paulin | Page Recherche | `feature/recherche` |
| Parfaite | Page d'Accueil | `feature/accueil` |
| Modeste | Page Notifications | `feature/notifications` |
| Ndawa Prosper | Documentation | `feature/docs` |

---

## ⚙️ Stack Technique

- **Frontend** : Next.js 16 (App Router)
- **Style** : Tailwind CSS + shadcn/ui
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **Déploiement** : Vercel

---

## 🚀 Installation

### Prérequis
- Node.js 18+
- Un compte Supabase

### Étapes

```bash
# 1. Cloner le projet
git clone https://github.com/Yassine-13-dev/appli-archivage.git
cd appli-archivage

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# 4. Lancer le serveur de développement
npm run dev
```

### Variables d'environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service
```

---

## 🗄️ Structure de la Base de Données

| Table | Description |
|---|---|
| `utilisateurs` | Comptes étudiants, enseignants et admins |
| `matieres` | Matières avec crédits et coefficients |
| `sessions_examens` | Sessions d'examens (ouverte/clôturée) |
| `notes` | Notes par étudiant, matière et session |
| `notifications` | Alertes envoyées aux étudiants |

---

## 📱 Fonctionnalités

### 🎓 Étudiant
- Consulter ses relevés de notes par semestre
- Calculer sa moyenne générale
- Exporter son relevé en PDF
- Recevoir des notifications

### 👨‍🏫 Enseignant
- Saisir et modifier les notes par matière et session
- Rechercher un étudiant

### ⚙️ Administrateur
- Tableau de bord avec statistiques
- Gérer les sessions d'examens
- Gérer les comptes utilisateurs
- Rechercher et filtrer les étudiants

---

## 🌐 Déploiement

L'application est déployée sur **Vercel** :
👉 [https://appli-archivage.vercel.app](https://appli-archivage.vercel.app)

---

## 📁 Structure du Projet


appli-archivage/
├── app/
│   ├── (auth)/login/        # Page de connexion
│   ├── (dashboard)/         # Pages protégées
│   │   ├── dashboard/       # Tableau de bord admin
│   │   ├── releves/         # Relevés de notes
│   │   ├── saisie-notes/    # Saisie des notes
│   │   ├── sessions/        # Sessions d'examens
│   │   ├── utilisateurs/    # Gestion utilisateurs
│   │   ├── recherche/       # Recherche
│   │   └── notifications/   # Notifications
│   └── page.jsx             # Page d'accueil
├── components/
│   ├── Navbar.jsx
│   └── ui/
├── lib/
│   └── supabase.js
└── public/
└── images/