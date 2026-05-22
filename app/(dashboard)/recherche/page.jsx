"use client";

import { useState } from "react";

const donneesTest = [
  { nom: "Jean Dupont", matricule: "MAT001", semestre: "S1" },
  { nom: "Marie Curie", matricule: "MAT002", semestre: "S2" },
  { nom: "Paul Martin", matricule: "MAT003", semestre: "S1" },
  { nom: "Alice Bernard", matricule: "MAT004", semestre: "S3" },
  { nom: "David Nkomo", matricule: "MAT005", semestre: "S2" },
];

export default function RecherchePage() {
  const [recherche, setRecherche] = useState("");
  const [filtreSemestre, setFiltreSemestre] = useState("");

  const resultats = donneesTest.filter((etudiant) => {
    const matchRecherche =
      etudiant.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      etudiant.matricule.toLowerCase().includes(recherche.toLowerCase());
    const matchSemestre =
      filtreSemestre === "" || etudiant.semestre === filtreSemestre;
    return matchRecherche && matchSemestre;
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recherche</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom ou matricule..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Filtre par semestre */}
      <select
        value={filtreSemestre}
        onChange={(e) => setFiltreSemestre(e.target.value)}
        className="border p-2 rounded mb-6"
      >
        <option value="">Tous les semestres</option>
        <option value="S1">Semestre 1</option>
        <option value="S2">Semestre 2</option>
        <option value="S3">Semestre 3</option>
      </select>

      {/* Résultats */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nom</th>
            <th className="border p-2 text-left">Matricule</th>
            <th className="border p-2 text-left">Semestre</th>
          </tr>
        </thead>
        <tbody>
          {resultats.length > 0 ? (
            resultats.map((etudiant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2">{etudiant.nom}</td>
                <td className="border p-2">{etudiant.matricule}</td>
                <td className="border p-2">{etudiant.semestre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border p-2 text-center text-gray-500">
                Aucun résultat trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}