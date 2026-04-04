<Routes>
  {/* 👇 ESTA ES LA CLAVE */}
  <Route path="/" element={<Navigate to="/login" />} />

  {/* Rutas públicas */}
  <Route path="/login" element={<Login />} />
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

  {/* Ruta fallback */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>