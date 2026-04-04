from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from database import engine, Base
from routes import usuarios, rutinas, progreso

Base.metadata.create_all(bind=engine)

app = FastAPI(title="🏋️ API Gimnasio", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(rutinas.router)
app.include_router(progreso.router)

@app.get("/")
def root():
    return {"mensaje": "API Gimnasio funcionando ✅"}