from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import usuarios, rutinas, progreso

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="🏋️ API Gimnasio",
    description="Sistema de gestión de usuarios, rutinas y progreso físico",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ← permite cualquier origen (más fácil para desarrollo/deploy)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(rutinas.router)
app.include_router(progreso.router)

@app.get("/")
def root():
    return {"mensaje": "API Gimnasio funcionando ✅"}
