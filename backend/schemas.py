from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

# ── Usuarios ──────────────────────────
class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    password: str

class UsuarioResponse(BaseModel):
    id: int
    nombre: str
    email: str

    class Config:
        from_attributes = True

class LoginData(BaseModel):
    email: EmailStr
    password: str

# ── Rutinas ───────────────────────────
class RutinaCreate(BaseModel):
    nombre_rutina: str
    nivel: str  # principiante | intermedio | avanzado

class RutinaResponse(BaseModel):
    id: int
    nombre_rutina: str
    nivel: str

    class Config:
        from_attributes = True

# ── Progreso ──────────────────────────
class ProgresoCreate(BaseModel):
    usuario_id: int
    peso: float
    fecha: date

class ProgresoResponse(BaseModel):
    id: int
    usuario_id: int
    peso: float
    fecha: date

    class Config:
        from_attributes = True