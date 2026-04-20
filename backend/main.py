from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine, Base
from backend.routes import usuarios, rutinas, progreso

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="🏋️ API Gimnasio",
    version="1.0.0"
)

# 🔥 CORS BIEN CONFIGURADO
origins = [
    "http://localhost:5173",
    "https://api-gimnasio-5r3u-qwtnj950h-fernandaangells-projects.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(usuarios.router)
app.include_router(rutinas.router)
app.include_router(progreso.router)

@app.get("/")
def root():
    return {"mensaje": "API Gimnasio funcionando ✅"}