from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


# ======================
# 👤 USUARIO
# ======================
class Usuario(Base):
    __tablename__ = "usuarios"

    id       = Column(Integer, primary_key=True, index=True)
    nombre   = Column(String, nullable=False)
    email    = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    # Relaciones
    progresos = relationship("Progreso", back_populates="usuario", cascade="all, delete")
    rutinas   = relationship("UsuarioRutina", back_populates="usuario", cascade="all, delete")


# ======================
# 🏋️ RUTINA
# ======================
class Rutina(Base):
    __tablename__ = "rutinas"

    id            = Column(Integer, primary_key=True, index=True)
    nombre_rutina = Column(String, nullable=False)
    nivel         = Column(String, nullable=False)  # principiante/intermedio/avanzado

    asignaciones = relationship("UsuarioRutina", back_populates="rutina", cascade="all, delete")


# ======================
# 🔗 RELACIÓN USUARIO-RUTINA
# ======================
class UsuarioRutina(Base):
    __tablename__ = "usuario_rutinas"

    id         = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"))
    rutina_id  = Column(Integer, ForeignKey("rutinas.id", ondelete="CASCADE"))

    usuario = relationship("Usuario", back_populates="rutinas")
    rutina  = relationship("Rutina", back_populates="asignaciones")


# ======================
# 📊 PROGRESO
# ======================
class Progreso(Base):
    __tablename__ = "progreso"

    id         = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"))
    peso       = Column(Float, nullable=False)
    fecha      = Column(Date, nullable=False)

    usuario = relationship("Usuario", back_populates="progresos")
