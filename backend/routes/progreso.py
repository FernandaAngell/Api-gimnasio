from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Progreso, Usuario
from schemas import ProgresoCreate, ProgresoResponse
from datetime import date
from typing import Optional

router = APIRouter(prefix="/progreso", tags=["Progreso"])

# POST /progreso — Registrar progreso
@router.post("/", response_model=ProgresoResponse)
def registrar_progreso(data: ProgresoCreate, db: Session = Depends(get_db)):
    if not db.query(Usuario).filter(Usuario.id == data.usuario_id).first():
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    progreso = Progreso(
        usuario_id=data.usuario_id,
        peso=data.peso,
        fecha=data.fecha
    )
    db.add(progreso)
    db.commit()
    db.refresh(progreso)
    return progreso

# GET /progreso/{usuario_id} — Consultar progreso con filtro de fechas
@router.get("/{usuario_id}", response_model=list[ProgresoResponse])
def ver_progreso(
    usuario_id: int,
    fecha_inicio: Optional[date] = None,
    fecha_fin: Optional[date] = None,
    db: Session = Depends(get_db)
):
    if not db.query(Usuario).filter(Usuario.id == usuario_id).first():
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    query = db.query(Progreso).filter(Progreso.usuario_id == usuario_id)

    # Filtrar por fechas si se proporcionan
    if fecha_inicio:
        query = query.filter(Progreso.fecha >= fecha_inicio)
    if fecha_fin:
        query = query.filter(Progreso.fecha <= fecha_fin)

    registros = query.order_by(Progreso.fecha).all()

    return registros

# GET /progreso/{usuario_id}/cambio — Calcular cambio de peso
@router.get("/{usuario_id}/cambio")
def cambio_peso(usuario_id: int, db: Session = Depends(get_db)):
    registros = db.query(Progreso).filter(
        Progreso.usuario_id == usuario_id
    ).order_by(Progreso.fecha).all()

    if len(registros) < 2:
        raise HTTPException(
            status_code=400,
            detail="Se necesitan al menos 2 registros para calcular el cambio"
        )

    peso_inicial = registros[0].peso
    peso_actual  = registros[-1].peso
    cambio       = round(peso_actual - peso_inicial, 2)
    porcentaje   = round((cambio / peso_inicial) * 100, 2)

    return {
        "peso_inicial": peso_inicial,
        "peso_actual": peso_actual,
        "cambio_kg": cambio,
        "porcentaje": porcentaje,
        "tendencia": "bajó ⬇️" if cambio < 0 else "subió ⬆️" if cambio > 0 else "igual ➡️"
    }
