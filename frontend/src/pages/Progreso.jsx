import { useState } from "react";
import { registrarProgreso, verProgreso, verCambio } from "../services/api";

export default function Progreso() {
  const [form, setForm]         = useState({ usuario_id:"", peso:"", fecha:"" });
  const [usuarioId, setUsuarioId] = useState("");
  const [registros, setRegistros] = useState([]);
  const [cambio, setCambio]       = useState(null);
  const [mensaje, setMensaje]     = useState("");
  const [error, setError]         = useState("");

  const handleRegistrar = async () => {
    setError(""); setMensaje("");
    try {
      await registrarProgreso(form);
      setMensaje("✅ Progreso registrado!");
    } catch (err) {
      setError(err.response?.data?.detail || "Error al registrar");
    }
  };

  const handleConsultar = async () => {
    setError(""); setCambio(null);
    try {
      const res = await verProgreso(usuarioId);
      setRegistros(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Error al consultar");
    }
  };

  const handleCambio = async () => {
    setError("");
    try {
      const res = await verCambio(usuarioId);
      setCambio(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Error al calcular cambio");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>📊 Progreso</h2>

      {/* Registrar progreso */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Registrar progreso</h3>
        <input style={styles.input} placeholder="ID del usuario" type="number"
          onChange={(e) => setForm({ ...form, usuario_id: e.target.value })} />
        <input style={styles.input} placeholder="Peso (kg)" type="number"
          onChange={(e) => setForm({ ...form, peso: e.target.value })} />
        <input style={styles.input} type="date"
          onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
        <button style={styles.btn} onClick={handleRegistrar}>Registrar</button>
        {mensaje && <p style={styles.ok}>{mensaje}</p>}
      </div>

      {/* Consultar progreso */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Consultar progreso</h3>
        <input style={styles.input} placeholder="ID del usuario" type="number"
          onChange={(e) => setUsuarioId(e.target.value)} />
        <div style={styles.btnGroup}>
          <button style={styles.btn} onClick={handleConsultar}>Ver registros</button>
          <button style={{...styles.btn, background:"#16213e"}} onClick={handleCambio}>
            Calcular cambio ⚖️
          </button>
        </div>

        {/* Tabla de registros */}
        {registros.length > 0 && (
          <table style={styles.tabla}>
            <thead>
              <tr>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Peso (kg)</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r) => (
                <tr key={r.id}>
                  <td style={styles.td}>{r.fecha}</td>
                  <td style={styles.td}>{r.peso} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Cambio de peso */}
        {cambio && (
          <div style={styles.cambio}>
            <p>Peso inicial: <strong>{cambio.peso_inicial} kg</strong></p>
            <p>Peso actual:  <strong>{cambio.peso_actual} kg</strong></p>
            <p>Cambio: <strong style={{color: cambio.cambio_kg < 0 ? "#6bff6b" : "#ff6b6b"}}>
              {cambio.cambio_kg} kg {cambio.tendencia}
            </strong></p>
            <p>Porcentaje: <strong>{cambio.porcentaje}%</strong></p>
          </div>
        )}
      </div>

      {error && <p style={styles.error}>{error}</p>}
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
  btnGroup:  { display:"flex", gap:"10px" },
  tabla:     { width:"100%", borderCollapse:"collapse", marginTop:"10px" },
  th:        { color:"#e94560", padding:"10px", textAlign:"left",
               borderBottom:"1px solid #333" },
  td:        { color:"white", padding:"10px", borderBottom:"1px solid #222" },
  cambio:    { background:"#16213e", padding:"16px", borderRadius:"8px", color:"white" },
  ok:        { color:"#6bff6b" },
  error:     { color:"#ff6b6b" }
};