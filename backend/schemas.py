from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

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

class RutinaCreate(BaseModel):
    nombre_rutina: str
    nivel: str

class RutinaResponse(BaseModel):
    id: int
    nombre_rutina: str
    nivel: str
    class Config:
        from_attributes = True

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