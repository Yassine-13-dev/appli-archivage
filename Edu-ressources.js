import { useState, useEffect } from "react";

const initialSessions = [
  { id: 1, nom: "Session 1 — Semestre 1", date: "2025-01-15", statut: "clôturée", matiere: "Mathématiques", nb_etudiants: 42 },
  { id: 2, nom: "Session 2 — Rattrapage S1", date: "2025-02-20", statut: "ouverte", matiere: "Informatique", nb_etudiants: 18 },
  { id: 3, nom: "Session 1 — Semestre 2", date: "2025-06-10", statut: "ouverte", matiere: "Physique", nb_etudiants: 35 },
];

const etudiants = [
  { id: 1, nom: "styve  lyon", matricule: "21L0001" },
  { id: 2, nom: "Oumbe Revis", matricule: "21L0042" },
  { id: 3, nom: "Hakim Elison", matricule: "21L0078" },
  { id: 4, nom: "Raym Fati", matricule: "21L0055" },
  { id: 5, nom: "ALIM Madir", matricule: "21L0033" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #050b18; }

  .aurora-bg {
    position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
  }
  .aurora-bg::before {
    content: '';
    position: absolute; width: 900px; height: 900px;
    top: -200px; left: -200px;
    background: radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%);
    animation: drift1 12s ease-in-out infinite alternate;
    border-radius: 50%;
  }
  .aurora-bg::after {
    content: '';
    position: absolute; width: 700px; height: 700px;
    bottom: -150px; right: -100px;
    background: radial-gradient(ellipse, rgba(16,185,129,0.13) 0%, transparent 70%);
    animation: drift2 15s ease-in-out infinite alternate;
    border-radius: 50%;
  }
  .aurora-orb {
    position: absolute; width: 500px; height: 500px;
    top: 40%; left: 50%; transform: translate(-50%,-50%);
    background: radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 70%);
    animation: drift3 18s ease-in-out infinite alternate;
    border-radius: 50%;
  }
  @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(80px,60px) scale(1.15); } }
  @keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-60px,-80px) scale(1.1); } }
  @keyframes drift3 { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-45%,-55%) scale(1.2); } }

  .glass {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.09);
  }
  .glass-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 20px;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .glass-card:hover {
    border-color: rgba(99,102,241,0.35);
    transform: translateY(-2px);
    box-shadow: 0 20px 60px rgba(99,102,241,0.12);
  }

  .tab-btn {
    padding: 10px 26px; border-radius: 12px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
    transition: all 0.25s;
  }
  .tab-btn.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    box-shadow: 0 4px 20px rgba(99,102,241,0.4);
  }
  .tab-btn.inactive {
    background: transparent; color: rgba(255,255,255,0.35);
  }
  .tab-btn.inactive:hover { color: rgba(255,255,255,0.7); }

  .stat-card {
    border-radius: 18px; padding: 22px 24px;
    display: flex; align-items: center; gap: 16px;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .stat-card:hover { transform: translateY(-4px); }

  .session-row {
    border-radius: 18px; padding: 20px 24px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 14px;
    transition: all 0.3s;
    margin-bottom: 12px;
  }

  .btn-primary {
    padding: 10px 22px; border-radius: 12px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff; font-weight: 700; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 4px 18px rgba(99,102,241,0.35);
    transition: all 0.25s;
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(99,102,241,0.5); }

  .btn-ghost {
    padding: 9px 18px; border-radius: 12px; cursor: pointer;
    background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.55);
    border: 1px solid rgba(255,255,255,0.10); font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.10); color: #fff; }

  .btn-danger {
    padding: 9px 18px; border-radius: 12px; cursor: pointer;
    background: rgba(239,68,68,0.12); color: #fca5a5;
    border: 1px solid rgba(239,68,68,0.25); font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .btn-danger:hover { background: rgba(239,68,68,0.22); }

  .btn-notes {
    padding: 9px 18px; border-radius: 12px; cursor: pointer;
    background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2));
    color: #a5b4fc; border: 1px solid rgba(99,102,241,0.3);
    font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .btn-notes:hover { background: linear-gradient(135deg, rgba(99,102,241,0.35), rgba(139,92,246,0.35)); color: #fff; }

  .search-input {
    padding: 10px 18px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    color: #e2e8f0; font-size: 14px; outline: none; width: 220px;
    font-family: 'DM Sans', sans-serif;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-input:focus { border-color: rgba(99,102,241,0.5); box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
  .search-input::placeholder { color: rgba(255,255,255,0.25); }

  .note-input {
    width: 78px; padding: 8px 10px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    color: #e2e8f0; font-size: 15px; font-weight: 700;
    outline: none; text-align: center;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .note-input:focus { border-color: rgba(99,102,241,0.6); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

  .select-input {
    padding: 11px 18px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    color: #e2e8f0; font-size: 14px; outline: none; width: 360px;
    font-family: 'DM Sans', sans-serif;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s;
  }
  .select-input:focus { border-color: rgba(99,102,241,0.5); }
  .select-input option { background: #1e293b; }

  .modal-input {
    width: 100%; padding: 11px 16px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    color: #e2e8f0; font-size: 14px; outline: none;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
  }
  .modal-input:focus { border-color: rgba(99,102,241,0.5); box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
  .modal-input::placeholder { color: rgba(255,255,255,0.2); }

  .table-row-even { background: rgba(255,255,255,0.025); }
  .table-row-odd { background: rgba(255,255,255,0.01); }
  .table-row-even:hover, .table-row-odd:hover { background: rgba(99,102,241,0.07); }

  .toast-enter {
    animation: toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(-16px) scale(0.9); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .page-enter {
    animation: fadeUp 0.5s ease forwards;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .badge {
    padding: 5px 14px; border-radius: 30px; font-size: 12px; font-weight: 600;
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px;
  }
  .badge-dot { width: 7px; height: 7px; border-radius: 50%; }

  .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 0; }

  .header-logo-glow {
    filter: drop-shadow(0 0 12px rgba(99,102,241,0.6));
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }
`;

export default function App() {
  const [sessions, setSessions] = useState(initialSessions);
  const [activeTab, setActiveTab] = useState("sessions");
  const [selectedSession, setSelectedSession] = useState(null);
  const [notes, setNotes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editSession, setEditSession] = useState(null);
  const [formData, setFormData] = useState({ nom: "", date: "", matiere: "", nb_etudiants: "" });
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const openCreate = () => {
    setEditSession(null);
    setFormData({ nom: "", date: "", matiere: "", nb_etudiants: "" });
    setShowModal(true);
  };

  const openEdit = (s) => {
    setEditSession(s);
    setFormData({ nom: s.nom, date: s.date, matiere: s.matiere, nb_etudiants: s.nb_etudiants });
    setShowModal(true);
  };

  const saveSession = () => {
    if (!formData.nom || !formData.date || !formData.matiere) {
      showToast("Veuillez remplir tous les champs.", "error");
      return;
    }
    if (editSession) {
      setSessions(sessions.map(s => s.id === editSession.id ? { ...s, ...formData } : s));
      showToast("Session modifiée avec succès !");
    } else {
      setSessions([...sessions, { id: Date.now(), ...formData, statut: "brouillon" }]);
      showToast("Session créée avec succès !");
    }
    setShowModal(false);
  };

  const cloturerSession = (id) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, statut: "clôturée" } : s));
    showToast("Session clôturée définitivement.");
  };

  const saveNote = (etudId, val) => {
    setNotes(n => ({ ...n, [`${selectedSession?.id}_${etudId}`]: val }));
  };

  const moyenne = () => {
    const vals = etudiants.map(e => parseFloat(notes[`${selectedSession?.id}_${e.id}`] || "")).filter(v => !isNaN(v));
    if (!vals.length) return "—";
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
  };

  const filtered = sessions.filter(s =>
    s.nom.toLowerCase().includes(search.toLowerCase()) ||
    s.matiere.toLowerCase().includes(search.toLowerCase())
  );

  const statutStyle = {
    ouverte:    { bg: "rgba(16,185,129,0.12)", text: "#6ee7b7", dot: "#10b981", border: "rgba(16,185,129,0.25)" },
    "clôturée": { bg: "rgba(239,68,68,0.10)",  text: "#fca5a5", dot: "#ef4444", border: "rgba(239,68,68,0.22)" },
    brouillon:  { bg: "rgba(245,158,11,0.10)", text: "#fcd34d", dot: "#f59e0b", border: "rgba(245,158,11,0.22)" },
  };

  const appreciationInfo = (val) => {
    if (isNaN(val)) return { label: "—", color: "rgba(255,255,255,0.25)" };
    if (val >= 16) return { label: "Très Bien ✦", color: "#6ee7b7" };
    if (val >= 14) return { label: "Bien", color: "#86efac" };
    if (val >= 12) return { label: "Assez Bien", color: "#fcd34d" };
    if (val >= 10) return { label: "Passable", color: "#fb923c" };
    return { label: "Insuffisant", color: "#fca5a5" };
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: "#050b18", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0", position: "relative" }}>

        {/* Aurora background */}
        <div className="aurora-bg"><div className="aurora-orb" /></div>

        {/* Toast */}
        {toast && (
          <div className="toast-enter" style={{
            position: "fixed", top: 24, right: 24, zIndex: 9999,
            background: toast.type === "error"
              ? "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(185,28,28,0.9))"
              : "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(5,150,105,0.9))",
            backdropFilter: "blur(20px)",
            color: "#fff", padding: "14px 24px", borderRadius: 14,
            fontWeight: 600, fontSize: 14,
            boxShadow: toast.type === "error" ? "0 8px 32px rgba(239,68,68,0.3)" : "0 8px 32px rgba(16,185,129,0.3)",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", gap: 10
          }}>
            <span style={{ fontSize: 18 }}>{toast.type === "error" ? "⚠️" : "✓"}</span>
            {toast.msg}
          </div>
        )}

        {/* Header */}
        <header className="glass" style={{
          position: "sticky", top: 0, zIndex: 100,
          padding: "0 40px", height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderLeft: "none", borderRight: "none", borderTop: "none"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="header-logo-glow" style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, boxShadow: "0 4px 20px rgba(99,102,241,0.4)"
            }}>🎓</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#f1f5f9", letterSpacing: "-0.3px" }}>
                EduGrade <span style={{ background: "linear-gradient(135deg, #a5b4fc, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pro</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Plateforme académique</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              padding: "6px 16px", borderRadius: 30,
              background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
              fontSize: 12, color: "#a5b4fc", fontWeight: 500
            }}>Enseignant</div>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, boxShadow: "0 4px 16px rgba(99,102,241,0.3)"
            }}>E</div>
          </div>
        </header>

        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>

          {/* Page Title */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 900,
              fontSize: 38, color: "#f1f5f9", lineHeight: 1.15,
              letterSpacing: "-0.5px"
            }}>
              Gestion des{" "}
              <span style={{
                background: "linear-gradient(135deg, #818cf8, #c4b5fd)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Évaluations</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, marginTop: 8, fontWeight: 300 }}>
              Administrez vos sessions d'examens et saisissez les notes en toute fluidité
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: "inline-flex", gap: 4, marginBottom: 36,
            background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 5,
            border: "1px solid rgba(255,255,255,0.07)"
          }}>
            {[
              { key: "sessions", label: "Sessions d'examens", icon: "◈" },
              { key: "notes",    label: "Saisie des notes",   icon: "✎" },
            ].map(t => (
              <button
                key={t.key}
                className={`tab-btn ${activeTab === t.key ? "active" : "inactive"}`}
                onClick={() => setActiveTab(t.key)}
              >
                <span style={{ marginRight: 7, opacity: 0.8 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          {/* ===== SESSIONS ===== */}
          {activeTab === "sessions" && (
            <div className="page-enter">
              {/* Top bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>
                    Sessions d'examens
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>
                    {sessions.length} sessions enregistrées
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input
                    className="search-input"
                    placeholder="⌕  Rechercher..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <button className="btn-primary" onClick={openCreate}>
                    ＋ Nouvelle session
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 30 }}>
                {[
                  { label: "Sessions ouvertes",  val: sessions.filter(s => s.statut === "ouverte").length,    color: "#6ee7b7", glow: "rgba(16,185,129,0.25)",  bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.18)", icon: "◉" },
                  { label: "Sessions clôturées", val: sessions.filter(s => s.statut === "clôturée").length,   color: "#fca5a5", glow: "rgba(239,68,68,0.2)",    bg: "rgba(239,68,68,0.06)",   border: "rgba(239,68,68,0.15)",  icon: "◎" },
                  { label: "Brouillons",          val: sessions.filter(s => s.statut === "brouillon").length,  color: "#fcd34d", glow: "rgba(245,158,11,0.2)",   bg: "rgba(245,158,11,0.06)",  border: "rgba(245,158,11,0.15)", icon: "◌" },
                ].map(stat => (
                  <div key={stat.label} className="stat-card" style={{
                    background: stat.bg, border: `1px solid ${stat.border}`,
                    boxShadow: `0 8px 32px ${stat.glow}`
                  }}>
                    <div style={{ fontSize: 32, color: stat.color, lineHeight: 1 }}>{stat.icon}</div>
                    <div>
                      <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, fontFamily: "'Playfair Display', serif" }}>{stat.val}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2, fontWeight: 400 }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sessions list */}
              {filtered.map(s => {
                const sc = statutStyle[s.statut] || statutStyle.brouillon;
                return (
                  <div key={s.id} className="glass-card session-row">
                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                      <div style={{
                        width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                        background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
                        border: "1px solid rgba(99,102,241,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22
                      }}>📋</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#f1f5f9", fontFamily: "'Playfair Display', serif" }}>{s.nom}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4, display: "flex", gap: 12 }}>
                          <span>📚 {s.matiere}</span>
                          <span>📅 {s.date}</span>
                          <span>👥 {s.nb_etudiants} étudiants</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span className="badge" style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                        <span className="badge-dot" style={{ background: sc.dot, boxShadow: `0 0 6px ${sc.dot}` }}></span>
                        {s.statut.charAt(0).toUpperCase() + s.statut.slice(1)}
                      </span>
                      <button className="btn-ghost" onClick={() => openEdit(s)}>✎ Modifier</button>
                      {s.statut !== "clôturée" && (
                        <button className="btn-danger" onClick={() => cloturerSession(s.id)}>⊘ Clôturer</button>
                      )}
                      <button className="btn-notes" onClick={() => { setSelectedSession(s); setActiveTab("notes"); }}>
                        ◈ Saisir notes
                      </button>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div style={{
                  textAlign: "center", padding: "72px 0",
                  background: "rgba(255,255,255,0.02)", borderRadius: 20,
                  border: "1px dashed rgba(255,255,255,0.08)"
                }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>✧</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 15 }}>Aucune session ne correspond à votre recherche</div>
                </div>
              )}
            </div>
          )}

          {/* ===== NOTES ===== */}
          {activeTab === "notes" && (
            <div className="page-enter">
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>
                  Saisie des notes
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>
                  Sélectionnez une session ouverte pour commencer
                </div>
              </div>

              {/* Selector */}
              <div style={{ marginBottom: 26 }}>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                  Session d'examen
                </label>
                <select
                  className="select-input"
                  value={selectedSession?.id || ""}
                  onChange={e => setSelectedSession(sessions.find(s => s.id === parseInt(e.target.value)) || null)}
                >
                  <option value="">— Choisir une session —</option>
                  {sessions.filter(s => s.statut !== "clôturée").map(s => (
                    <option key={s.id} value={s.id}>{s.nom} · {s.matiere}</option>
                  ))}
                </select>
              </div>

              {selectedSession ? (
                <>
                  {/* Session info banner */}
                  <div style={{
                    borderRadius: 18, padding: "18px 26px", marginBottom: 24,
                    background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.07))",
                    border: "1px solid rgba(99,102,241,0.2)",
                    display: "flex", gap: 36, flexWrap: "wrap", alignItems: "center"
                  }}>
                    {[
                      { label: "Session", val: selectedSession.nom },
                      { label: "Matière", val: selectedSession.matiere },
                      { label: "Date", val: selectedSession.date },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{item.val}</div>
                      </div>
                    ))}
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Moyenne classe</div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900,
                        background: "linear-gradient(135deg, #818cf8, #c4b5fd)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                      }}>{moyenne()}<span style={{ fontSize: 14, WebkitTextFillColor: "rgba(255,255,255,0.3)" }}> /20</span></div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="glass-card" style={{ overflow: "hidden", marginBottom: 22 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "rgba(0,0,0,0.2)" }}>
                          {["N°", "Matricule", "Nom complet", "Note /20", "Appréciation"].map((h, i) => (
                            <th key={h} style={{
                              padding: "14px 20px", textAlign: i === 3 ? "center" : "left",
                              fontSize: 11, color: "rgba(255,255,255,0.35)",
                              fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2,
                              fontFamily: "'DM Sans', sans-serif"
                            }}>{h}</th>
                          ))}
                        </tr>
                        <tr><td colSpan={5}><div className="divider" /></td></tr>
                      </thead>
                      <tbody>
                        {etudiants.map((e, i) => {
                          const key = `${selectedSession.id}_${e.id}`;
                          const val = parseFloat(notes[key]);
                          const app = appreciationInfo(val);
                          return (
                            <tr key={e.id} className={i % 2 === 0 ? "table-row-even" : "table-row-odd"} style={{ transition: "background 0.2s" }}>
                              <td style={{ padding: "14px 20px", color: "rgba(255,255,255,0.25)", fontSize: 13 }}>{String(i + 1).padStart(2, "0")}</td>
                              <td style={{ padding: "14px 20px" }}>
                                <span style={{
                                  fontFamily: "monospace", fontSize: 13,
                                  background: "rgba(99,102,241,0.12)", color: "#a5b4fc",
                                  padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(99,102,241,0.2)"
                                }}>{e.matricule}</span>
                              </td>
                              <td style={{ padding: "14px 20px", fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{e.nom}</td>
                              <td style={{ padding: "14px 20px", textAlign: "center" }}>
                                <input
                                  className="note-input"
                                  type="number" min="0" max="20" step="0.25"
                                  value={notes[key] || ""}
                                  onChange={ev => saveNote(e.id, ev.target.value)}
                                  placeholder="·"
                                />
                              </td>
                              <td style={{ padding: "14px 20px", color: app.color, fontWeight: 600, fontSize: 13 }}>{app.label}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                    <button className="btn-ghost" onClick={() => setNotes({})}>↺ Réinitialiser</button>
                    <button className="btn-primary" onClick={() => showToast("Notes enregistrées avec succès !")}>
                      ✓ Enregistrer les notes
                    </button>
                  </div>
                </>
              ) : (
                <div style={{
                  textAlign: "center", padding: "80px 0",
                  background: "rgba(255,255,255,0.02)", borderRadius: 20,
                  border: "1px dashed rgba(255,255,255,0.07)"
                }}>
                  <div style={{ fontSize: 52, marginBottom: 16, opacity: 0.4 }}>✎</div>
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 15 }}>Sélectionnez une session pour commencer la saisie des notes</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div className="glass-card" style={{
              width: 460, padding: 36,
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)"
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
                color: "#f1f5f9", marginBottom: 8
              }}>
                {editSession ? "Modifier la session" : "Créer une session"}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 28 }}>
                {editSession ? "Modifiez les informations de cette session" : "Renseignez les détails de la nouvelle session"}
              </div>

              {[
                { label: "Nom de la session", key: "nom", type: "text", ph: "Ex : Session 1 — Semestre 1" },
                { label: "Matière",           key: "matiere", type: "text", ph: "Ex : Mathématiques" },
                { label: "Date de la session",key: "date", type: "date", ph: "" },
                { label: "Nombre d'étudiants",key: "nb_etudiants", type: "number", ph: "Ex : 45" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 18 }}>
                  <label style={{
                    fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block",
                    marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1
                  }}>{f.label}</label>
                  <input
                    className="modal-input"
                    type={f.type}
                    value={formData[f.key]}
                    placeholder={f.ph}
                    onChange={e => setFormData(d => ({ ...d, [f.key]: e.target.value }))}
                  />
                </div>
              ))}

              <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Annuler</button>
                <button className="btn-primary" style={{ flex: 2 }} onClick={saveSession}>
                  {editSession ? "Enregistrer les modifications" : "Créer la session"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
