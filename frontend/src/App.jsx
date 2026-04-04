import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Rutinas from "./pages/Rutinas";
import Progreso from "./pages/Progreso";

// Proteger rutas privadas
function RutaPrivada({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ background:"#0f0f1a", minHeight:"100vh" }}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login"    element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas privadas */}
          <Route path="/rutinas" element={
            <RutaPrivada>
              <Navbar />
              <Rutinas />
            </RutaPrivada>
          }/>
          <Route path="/progreso" element={
            <RutaPrivada>
              <Navbar />
              <Progreso />
            </RutaPrivada>
          }/>

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
