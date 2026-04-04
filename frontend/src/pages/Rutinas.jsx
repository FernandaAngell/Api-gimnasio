import { useState, useEffect } from "react";
import { listarRutinas, crearRutina, asignarRutina } from "../services/api";

export default function Rutinas() {
  const [rutinas, setRutinas]         = useState([]);
  const [form, setForm]               = useState({ nombre_rutina:"", nivel:"principiante" });
  const [usuarioId, setUsuarioId]     = useState("");
  const [rutinaId, setRutinaId]       = useState("");
  const [mensaje, setMensaje]         = useState("");
  const [error, setError]             = useState("");

  useEffect(() => { cargarRutinas(); }, []);

  const cargarRutinas = async () => {
    const res = await listarRutinas();
    setRutinas(res.data);
  };

  const handleCrear = async () => {
    setError(""); setMensaje("");
    try {
      await crearRutina(form);
      setMensaje("✅ Rutina creada!");
      cargarRutinas();
    } catch (err) {
      setError(err.response?.data?.detail || "Error al crear rutina");
    }
  };

  const handleAsignar = async () => {
    setError(""); setMensaje("");
    try {
      await asignarRutina(usuarioId, rutinaId);
      setMensaje("✅ Rutina asignada correctamente!");
    } catch (err) {
      setError(err.response?.data?.detail || "Error al asignar");
    }
  };

  const coloresNivel = {
    principiante: "#6bff6b",
    intermedio:   "#ffd700",
    avanzado:     "#ff6b6b"
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>🏋️ Rutinas</h2>

      {/* Crear rutina */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Crear nueva rutina</h3>
        <input style={styles.input} placeholder="Nombre de la rutina"
          onChange={(e) => setForm({ ...form, nombre_rutina: e.target.value })} />
        <select style={styles.input}
          onChange={(e) => setForm({ ...form, nivel: e.target.value })}>
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
        <button style={styles.btn} onClick={handleCrear}>Crear Rutina</button>
      </div>

      {/* Asignar rutina */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Asignar rutina a usuario</h3>
        <input style={styles.input} placeholder="ID del usuario" type="number"
          onChange={(e) => setUsuarioId(e.target.value)} />
        <input style={styles.input} placeholder="ID de la rutina" type="number"
          onChange={(e) => setRutinaId(e.target.value)} />
        <button style={styles.btn} onClick={handleAsignar}>Asignar</button>
      </div>

      {mensaje && <p style={styles.ok}>{mensaje}</p>}
      {error   && <p style={styles.error}>{error}</p>}

      {/* Lista de rutinas */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Rutinas disponibles</h3>
        {rutinas.length === 0 ? (
          <p style={styles.vacio}>No hay rutinas aún</p>
        ) : (
          rutinas.map((r) => (
            <div key={r.id} style={styles.rutina}>
              <span style={styles.nombre}>{r.nombre_rutina}</span>
              <span style={{ ...styles.nivel, color: coloresNivel[r.nivel] }}>
                {r.nivel}
              </span>
              <span style={styles.id}>ID: {r.id}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth:"700px", margin:"0 auto", padding:"30px" },
  titulo:    { color:"white", marginBottom:"20px" },
  subtitulo: { color:"#e94560", marginBottom:"12px" },
  card:      { background:"#1a1a2e", padding:"24px", borderRadius:"12px",
               marginBottom:"20px", display:"flex", flexDirection:"column", gap:"10px" },
  input:     { padding:"12px", borderRadius:"8px", border:"1px solid #333",
               background:"#16213e", color:"white", fontSize:"14px" },
  btn:       { padding:"12px", background:"#e94560", color:"white", border:"none",
               borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
  rutina:    { display:"flex", justifyContent:"space-between", alignItems:"center",
               background:"#16213e", padding:"12px", borderRadius:"8px" },
  nombre:    { color:"white", fontWeight:"bold" },
  nivel:     { fontWeight:"bold", textTransform:"capitalize" },
  id:        { color:"#888", fontSize:"12px" },
  ok:        { color:"#6bff6b" },
  error:     { color:"#ff6b6b" },
  vacio:     { color:"#888" }
};