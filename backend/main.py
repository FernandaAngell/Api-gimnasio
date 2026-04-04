from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import usuarios

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="🏋️ API Gimnasio",
    description="Sistema de gestión de usuarios, rutinas y progreso físico",
    version="1.0.0"
)

# CORS 🔥
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://api-gimnasio.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(usuarios.router, prefix="/usuarios")