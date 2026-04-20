from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import Usuario
from backend.schemas import UsuarioCreate, UsuarioResponse, LoginData
from backend.auth import hash_password, verify_password, create_token
import re

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


def password_valida(password: str) -> bool:
    return (
        len(password) >= 8 and
        len(password) <= 72 and
        re.search(r"[A-Z]", password) and
        re.search(r"[0-9]", password)
    )


@router.post("/", response_model=UsuarioResponse)
def registrar(data: UsuarioCreate, db: Session = Depends(get_db)):

    data.password = data.password.strip()  # 👈 CLAVE

    if db.query(Usuario).filter(Usuario.email == data.email).first():
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    if not password_valida(data.password):
        raise HTTPException(
            status_code=400,
            detail="La contraseña debe tener entre 8 y 72 caracteres, una mayúscula y un número"
        )

    try:
        nuevo = Usuario(
            nombre=data.nombre,
            email=data.email,
            password=hash_password(data.password)
        )

        db.add(nuevo)
        db.commit()
        db.refresh(nuevo)

        return nuevo

    except Exception as e:
        print("ERROR REAL:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=list[UsuarioResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(Usuario).all()


@router.post("/login")
def login(data: LoginData, db: Session = Depends(get_db)):

    data.password = data.password.strip()

    usuario = db.query(Usuario).filter(Usuario.email == data.email).first()

    if not usuario or not verify_password(data.password, usuario.password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    token = create_token({
        "sub": str(usuario.id),
        "nombre": usuario.nombre
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": usuario.nombre
    }