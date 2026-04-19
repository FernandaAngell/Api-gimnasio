from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id       = Column(Integer, primary_key=True, index=True)
    nombre   = Column(String, nullable=False)
    email    = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    progresos = relationship("Progreso", back_populates="usuario")
    rutinas   = relationship("UsuarioRutina", back_populates="usuario")

class Rutina(Base):
    __tablename__ = "rutinas"
    id            = Column(Integer, primary_key=True, index=True)
    nombre_rutina = Column(String, nullable=False)
    nivel         = Column(String, nullable=False)
    asignaciones  = relationship("UsuarioRutina", back_populates="rutina")

class UsuarioRutina(Base):
    __tablename__ = "usuario_rutinas"
    id         = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    rutina_id  = Column(Integer, ForeignKey("rutinas.id"))
    usuario    = relationship("Usuario", back_populates="rutinas")
    rutina     = relationship("Rutina", back_populates="asignaciones")

class Progreso(Base):
    __tablename__ = "progreso"
    id         = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    peso       = Column(Float, nullable=False)
    fecha      = Column(Date, nullable=False)
    usuario    = relationship("Usuario", back_populates="progresos")