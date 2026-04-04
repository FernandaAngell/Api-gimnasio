import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("nombre");

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🏋️ GimApp</h2>
      <div style={styles.links}>
        <Link to="/rutinas" style={styles.link}>Rutinas</Link>
        <Link to="/progreso" style={styles.link}>Progreso</Link>
        {usuario && (
          <span style={styles.usuario}>
            👤 {usuario}
            <button onClick={cerrarSesion} style={styles.btn}>Salir</button>
          </span>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav:     { display:"flex", justifyContent:"space-between", alignItems:"center",
             background:"#1a1a2e", padding:"12px 24px", color:"white" },
  logo:    { margin:0, color:"#e94560" },
  links:   { display:"flex", gap:"20px", alignItems:"center" },
  link:    { color:"white", textDecoration:"none", fontWeight:"bold" },
  usuario: { color:"#aaa", display:"flex", alignItems:"center", gap:"10px" },
  btn:     { background:"#e94560", color:"white", border:"none",
             padding:"6px 12px", borderRadius:"6px", cursor:"pointer" }
};