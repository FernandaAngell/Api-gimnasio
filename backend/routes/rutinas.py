from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Rutina, UsuarioRutina, Usuario
from schemas import RutinaCreate, RutinaResponse

router = APIRouter(prefix="/rutinas", tags=["Rutinas"])

@router.post("/", response_model=RutinaResponse)
def crear_rutina(data: RutinaCreate, db: Session = Depends(get_db)):
    niveles_validos = ["principiante", "intermedio", "avanzado"]
    if data.nivel.lower() not in niveles_validos:
        raise HTTPException(status_code=400, detail=f"Nivel inválido. Usa: {niveles_validos}")
    rutina = Rutina(nombre_rutina=data.nombre_rutina, nivel=data.nivel.lower())
    db.add(rutina)
    db.commit()
    db.refresh(rutina)
    return rutina

@router.get("/", response_model=list[RutinaResponse])
def listar_rutinas(db: Session = Depends(get_db)):
    return db.query(Rutina).all()

@router.post("/asignar")
def asignar_rutina(usuario_id: int, rutina_id: int, db: Session = Depends(get_db)):
    if not db.query(Usuario).filter(Usuario.id == usuario_id).first():
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    if not db.query(Rutina).filter(Rutina.id == rutina_id).first():
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    existe = db.query(UsuarioRutina).filter_by(usuario_id=usuario_id, rutina_id=rutina_id).first()
    if existe:
        raise HTTPException(status_code=400, detail="Rutina ya asignada a este usuario")
    asignacion = UsuarioRutina(usuario_id=usuario_id, rutina_id=rutina_id)
    db.add(asignacion)
    db.commit()
    return {"mensaje": "Rutina asignada correctamente"}