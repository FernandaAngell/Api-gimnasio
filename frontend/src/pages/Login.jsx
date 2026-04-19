import { useState } from "react";
import { loginUsuario } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm]   = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const navigate          = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await loginUsuario(form);
      localStorage.setItem("token",  res.data.access_token);
      localStorage.setItem("nombre", res.data.usuario);
      navigate("/rutinas");
    } catch (err) {
      setError(err.response?.data?.detail || "Error al iniciar sesión");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>Iniciar sesión 🔐</h2>
        <input style={styles.input} name="email" placeholder="Email"
          type="email" onChange={handleChange} />
        <input style={styles.input} name="password" placeholder="Contraseña"
          type="password" onChange={handleChange} />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.btn} onClick={handleSubmit}>Entrar</button>
        <p style={styles.link}>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
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
  btn:       { padding:"12px", background:"#e94560", color:"white", border:"none",
               borderRadius:"8px", cursor:"pointer", fontWeight:"bold", fontSize:"16px" },
  error:     { color:"#ff6b6b", fontSize:"14px" },
  link:      { color:"#aaa", textAlign:"center", fontSize:"14px" }
};