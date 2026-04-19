import { useState } from "react";
import { registrarUsuario } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Registro() {
  const [form, setForm]   = useState({ nombre:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [ok, setOk]       = useState("");
  const navigate          = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError(""); setOk("");
    try {
      await registrarUsuario(form);
      setOk("✅ Usuario registrado. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.detail || "Error al registrar");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>Crear cuenta 🏋️</h2>
        <input style={styles.input} name="nombre" placeholder="Nombre"
          onChange={handleChange} />
        <input style={styles.input} name="email" placeholder="Email"
          type="email" onChange={handleChange} />
        <input style={styles.input} name="password" placeholder="Contraseña"
          type="password" onChange={handleChange} />
        <small style={styles.hint}>Mínimo 8 caracteres, 1 mayúscula y 1 número</small>
        {error && <p style={styles.error}>{error}</p>}
        {ok    && <p style={styles.ok}>{ok}</p>}
        <button style={styles.btn} onClick={handleSubmit}>Registrarse</button>
        <p style={styles.link}>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:"flex", justifyContent:"center", alignItems:"center",
               minHeight:"100vh", background:"#0f0f1a" },
  card:      { background:"#1a1a2e", padding:"40px", borderRadius:"12px",
               width:"360px", display:"flex", flexDirection:"column", gap:"12px" },
  titulo:    { color:"white", textAlign:"center", marginBottom:"10px" },
  input:     { padding:"12px", borderRadius:"8px", border:"1px solid #333",
               background:"#16213e", color:"white", fontSize:"14px" },
  hint:      { color:"#888", fontSize:"12px" },
  btn:       { padding:"12px", background:"#e94560", color:"white", border:"none",
               borderRadius:"8px", cursor:"pointer", fontWeight:"bold", fontSize:"16px" },
  error:     { color:"#ff6b6b", fontSize:"14px" },
  ok:        { color:"#6bff6b", fontSize:"14px" },
  link:      { color:"#aaa", textAlign:"center", fontSize:"14px" }
};