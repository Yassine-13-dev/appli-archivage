"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Releves() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semestreFiltré, setSemestreFiltré] = useState("Tous");
  const [semestres, setSemestres] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("notes")
        .select(`
          id,
          valeur,
          date_saisie,
          matiere_id,
          session_id,
          matieres!notes_matiere_id_fkey ( intitule, credits, coefficient, semestre ),
          sessions_examens!notes_session_id_fkey ( libelle, annee_academique )
        `)
        .eq("etudiant_id", user.id);

      if (error) {
        console.error("Erreur:", error);
      } else {
        setNotes(data);
        const listeSemestres = [...new Set(data.map(n => n.matieres?.semestre))];
        setSemestres(listeSemestres);
      }
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const notesFiltrees = semestreFiltré === "Tous"
    ? notes
    : notes.filter(n => n.matieres?.semestre === semestreFiltré);

  const calculerMoyenne = (notesDuSemestre) => {
    const total = notesDuSemestre.reduce((acc, n) => acc + n.valeur * (n.matieres?.credits || 1), 0);
    const credits = notesDuSemestre.reduce((acc, n) => acc + (n.matieres?.credits || 1), 0);
    return (total / credits).toFixed(2);
  };

  const groupParSemestre = (notes) => {
    return notes.reduce((acc, note) => {
      const sem = note.matieres?.semestre || "Inconnu";
      if (!acc[sem]) acc[sem] = [];
      acc[sem].push(note);
      return acc;
    }, {});
  };

  if (loading) return <p style={{ padding: "30px" }}>Chargement des notes...</p>;

  const groupées = groupParSemestre(notesFiltrees);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1a1a2e", marginBottom: "20px" }}>
        📋 Relevé de Notes
      </h1>

      {/* Filtre par semestre */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Filtrer par semestre :
        </label>
        <select
          value={semestreFiltré}
          onChange={(e) => setSemestreFiltré(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="Tous">Tous</option>
          {semestres.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Tableau des notes */}
      {Object.entries(groupées).map(([semestre, notesGroupe]) => (
        <div key={semestre} style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#16213e", borderBottom: "2px solid #0f3460", paddingBottom: "5px" }}>
            {semestre}
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#0f3460", color: "white" }}>
                <th style={thStyle}>Matière</th>
                <th style={thStyle}>Session</th>
                <th style={thStyle}>Note /20</th>
                <th style={thStyle}>Crédits</th>
                <th style={thStyle}>Résultat</th>
              </tr>
            </thead>
            <tbody>
              {notesGroupe.map((n, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white" }}>
                  <td style={tdStyle}>{n.matieres?.nom}</td>
                  <td style={tdStyle}>{n.sessions_examens?.nom}</td>
                  <td style={{ ...tdStyle, textAlign: "center", fontWeight: "bold",
                    color: n.valeur >= 10 ? "green" : "red" }}>
                    {n.valeur}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{n.matieres?.credits}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    {n.valeur >= 10 ? "✅ Validé" : "❌ Non validé"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ textAlign: "right", fontWeight: "bold", marginTop: "8px", color: "#0f3460" }}>
            Moyenne : {calculerMoyenne(notesGroupe)} / 20
          </p>
        </div>
      ))}

      {notes.length === 0 && (
        <p style={{ color: "#888" }}>Aucune note disponible pour le moment.</p>
      )}

      {/* Bouton Export PDF */}
      <button
        onClick={() => window.print()}
        style={{ backgroundColor: "#0f3460", color: "white", padding: "12px 24px",
          border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}
      >
        📄 Exporter en PDF
      </button>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px 12px",
  borderBottom: "1px solid #ddd",
};