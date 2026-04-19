import axios from "axios";

const BASE_URL = "/api";

const api = axios.create({ baseURL: BASE_URL });

export const registrarUsuario = (data) => api.post("/usuarios/", data);
export const loginUsuario     = (data) => api.post("/usuarios/login", data);
export const listarUsuarios   = ()     => api.get("/usuarios/");

export const crearRutina    = (data)                  => api.post("/rutinas/", data);
export const listarRutinas  = ()                      => api.get("/rutinas/");
export const asignarRutina  = (usuario_id, rutina_id) =>
  api.post(`/rutinas/asignar?usuario_id=${usuario_id}&rutina_id=${rutina_id}`);

export const registrarProgreso = (data)       => api.post("/progreso/", data);
export const verProgreso       = (usuario_id) => api.get(`/progreso/${usuario_id}`);
export const verCambio         = (usuario_id) => api.get(`/progreso/${usuario_id}/cambio`);